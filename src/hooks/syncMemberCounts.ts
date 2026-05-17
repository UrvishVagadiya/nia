import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

export const syncMemberCounts: CollectionAfterChangeHook = async ({ doc, req: { payload } }) => {
  if (doc.chapter) {
    const chapterId =
      typeof doc.chapter === "object" ? (doc.chapter as { id: string | number }).id : doc.chapter;

    const result = await payload.find({
      collection: "members",
      where: {
        and: [
          {
            chapter: {
              equals: chapterId,
            },
          },
          {
            isDeleted: {
              not_equals: true,
            },
          },
        ],
      },
      limit: 1,
    });
    payload.logger.info(`Active members count for chapter ${chapterId}: ${result.totalDocs}`);
  }

  return doc;
};

export const syncMemberCountsOnDelete: CollectionAfterDeleteHook = async ({
  doc,
  req: { payload },
}) => {
  if (doc.chapter) {
    const chapterId =
      typeof doc.chapter === "object" ? (doc.chapter as { id: string | number }).id : doc.chapter;

    const result = await payload.find({
      collection: "members",
      where: {
        chapter: {
          equals: chapterId,
        },
      },
      limit: 1,
    });
    payload.logger.info(
      `Total members count for chapter ${chapterId} on delete: ${result.totalDocs}`
    );
  }
};
