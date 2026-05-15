import { Payload, Field } from "payload";

/**
 * Recursively find all relationship fields that point to the 'chapters' collection.
 */
const findChapterRelationFields = (fields: Field[]): string[] => {
  const relationshipFields: string[] = [];

  const traverse = (fieldList: Field[]) => {
    for (const field of fieldList) {
      // 1. Check direct relationship fields
      if (field.type === "relationship" && field.relationTo === "chapters") {
        if ("name" in field) {
          relationshipFields.push(field.name);
        }
      }

      // 2. Handle nested fields (rows, tabs, groups, arrays)
      if ("fields" in field && Array.isArray(field.fields)) {
        traverse(field.fields);
      }

      // 3. Handle tabs specifically
      if (field.type === "tabs" && Array.isArray(field.tabs)) {
        for (const tab of field.tabs) {
          traverse(tab.fields);
        }
      }
    }
  };

  traverse(fields);
  return relationshipFields;
};

/**
 * Dynamically find and delete all documents in other collections
 * that have a relationship pointing to the specified chapter.
 */
export const deleteChapterDependencies = async (payload: Payload, chapterId: string | number) => {
  const collections = payload.config.collections;

  for (const collection of collections) {
    // Skip the chapters collection itself
    if (collection.slug === "chapters") continue;

    // Dynamically find all fields referencing 'chapters'
    const chapterFields = findChapterRelationFields(collection.fields);

    if (chapterFields.length === 0) continue;

    for (const fieldName of chapterFields) {
      try {
        // Find all documents referencing this chapter in this field
        const docs = await payload.find({
          collection: collection.slug,
          where: {
            [fieldName]: {
              equals: chapterId,
            },
          },
          limit: 2000, // Handle large chapters
          depth: 0, // We only need IDs
        });

        if (docs.totalDocs > 0) {
          // Soft Delete: Instead of deleting or just dissociating,
          // we mark records as deleted and record the timestamp.
          for (const doc of docs.docs) {
            await payload.update({
              collection: collection.slug,
              id: doc.id,
              data: {
                isDeleted: true,
                status: "deleted",
                deletedAt: new Date(),
              },
              overrideAccess: true,
            });
          }
        }
      } catch (err) {}
    }
  }
};
