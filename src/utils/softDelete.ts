import {
  Field,
  Access,
  CollectionBeforeOperationHook,
  CollectionBeforeChangeHook,
  CollectionAfterOperationHook,
  Payload,
  PayloadRequest,
  Where,
} from "payload";

/**
 * Extended request type to store soft deleted documents during the delete operation.
 */
interface SoftDeleteRequest extends PayloadRequest {
  _softDeletedDoc?: Record<string, string | number | boolean | null | object>;
  _softDeletedDocs?: Record<string, string | number | boolean | null | object>[];
}

/**
 * Arguments for the beforeOperation hook during a delete operation.
 */
interface BeforeDeleteOperationArgs {
  id?: string | number | null;
  where?: Where;
  req: SoftDeleteRequest;
}

export const softDeleteFields: Field[] = [
  {
    name: "status",
    type: "select",
    defaultValue: "active",
    options: [
      { label: "Active", value: "active" },
      { label: "Deleted", value: "deleted" },
    ],
    admin: {
      position: "sidebar",
      components: {
        Cell: "@/components/admin/StatusCell",
      },
    },
    label: "Is Deleted Status",
  },
  {
    name: "isDeleted",
    type: "checkbox",
    defaultValue: false,
    admin: {
      hidden: true,
    },
    label: "Is Deleted (Boolean)",
    index: true,
  },
  {
    name: "deletedAt",
    type: "date",
    admin: {
      hidden: true,
      readOnly: true,
    },
    label: "Deleted At",
  },
];

export const softDeleteAccess: Access = ({ req: { user } }) => {
  // If there is a user (logged into Admin), show all records so they can restore them
  if (user) return true;

  // Otherwise (public frontend), only show non-deleted records
  return {
    isDeleted: {
      not_equals: true,
    },
  };
};

/**
 * Hook to handle manual changes to isDeleted or status fields in the admin panel.
 * Ensures that if a user manually changes 'status' or 'isDeleted', the other fields stay in sync.
 */
export const beforeChangeSoftDelete: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  operation,
}) => {
  if (operation === "update") {
    const wasDeleted = originalDoc?.isDeleted === true || originalDoc?.status === "deleted";

    // Check if any restoration signal is present
    const isRestoring =
      data.isDeleted === false ||
      data.status === "active" ||
      (data.deletedAt === null && wasDeleted);

    // Check if any deletion signal is present
    const isDeleting = data.isDeleted === true || data.status === "deleted";

    if (isRestoring && wasDeleted) {
      // Perform full restoration
      data.isDeleted = false;
      data.status = "active";
      data.deletedAt = null;
    } else if (isDeleting && !wasDeleted) {
      // Perform soft delete
      data.isDeleted = true;
      data.status = "deleted";
      data.deletedAt = data.deletedAt || new Date();
    } else if (data.status === "deleted" || data.isDeleted === true) {
      // Force sync if already deleted but one field changed
      data.isDeleted = true;
      data.status = "deleted";
    } else if (data.status === "active" || data.isDeleted === false) {
      // Force sync if already active but one field changed
      data.isDeleted = false;
      data.status = "active";
    }
  } else if (operation === "create") {
    if (data.isDeleted === true || data.status === "deleted") {
      data.isDeleted = true;
      data.status = "deleted";
      data.deletedAt = data.deletedAt || new Date();
    } else {
      data.isDeleted = false;
      data.status = "active";
      data.deletedAt = null;
    }
  }
  return data;
};

export const onSoftDelete = (
  collection: string,
  onComplete?: (payload: Payload, id: string | number) => Promise<void>
): CollectionBeforeOperationHook => {
  return async ({ args, operation }) => {
    if (operation === "delete") {
      const deleteArgs = args as BeforeDeleteOperationArgs;
      const id = deleteArgs.id;
      const where = deleteArgs.where;

      try {
        if (id) {
          const doc = await args.req.payload.update({
            collection,
            id,
            data: {
              isDeleted: true,
              status: "deleted",
              deletedAt: new Date(),
            },
            overrideAccess: true,
            req: args.req,
          });
          // Store for the afterOperation hook to fix the "Deleted 0" message
          deleteArgs.req._softDeletedDoc = doc as Record<
            string,
            string | number | boolean | null | object
          >;

          if (onComplete) await onComplete(deleteArgs.req.payload, id);
        } else if (where) {
          const result = await args.req.payload.update({
            collection,
            where,
            data: {
              isDeleted: true,
              status: "deleted",
              deletedAt: new Date(),
            },
            overrideAccess: true,
            req: args.req,
          });
          deleteArgs.req._softDeletedDocs = result.docs as Record<
            string,
            string | number | boolean | null | object
          >[];
        }

        // Neuter the original delete operation
        if (deleteArgs.id) deleteArgs.id = null;
        deleteArgs.where = { id: { in: [] } };

        return args;
      } catch (err) {
        throw err;
      }
    }
    return args;
  };
};

export const afterSoftDelete: CollectionAfterOperationHook = async ({ operation, result, req }) => {
  if (operation === "delete") {
    const softReq = req as SoftDeleteRequest;
    const softDeletedDoc = softReq._softDeletedDoc;
    const softDeletedDocs = softReq._softDeletedDocs;

    if (softDeletedDoc || softDeletedDocs) {
      return {
        ...result,
        docs: softDeletedDocs || [softDeletedDoc],
        totalDocs: softDeletedDocs?.length || 1,
      };
    }
  }
  return result;
};

/**
 * Utility to wrap a CollectionConfig with soft delete logic.
 */
import { CollectionConfig } from "payload";

export function withSoftDelete(
  config: CollectionConfig,
  onDelete?: (payload: Payload, id: string | number) => Promise<void>
): CollectionConfig {
  return {
    ...config,
    access: {
      ...config.access,
      read: softDeleteAccess,
    },
    hooks: {
      ...config.hooks,
      beforeOperation: [
        ...(config.hooks?.beforeOperation || []),
        onSoftDelete(config.slug, onDelete),
      ],
      beforeChange: [...(config.hooks?.beforeChange || []), beforeChangeSoftDelete],
      afterOperation: [...(config.hooks?.afterOperation || []), afterSoftDelete],
    },
    fields: [...(config.fields || []), ...softDeleteFields],
  };
}
