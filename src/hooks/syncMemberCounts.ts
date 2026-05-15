import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

export const syncMemberCounts: CollectionAfterChangeHook = async ({ doc, req: { payload } }) => {
  if (doc.chapter) {
    const chapterId = typeof doc.chapter === "object" ? doc.chapter.id : doc.chapter;

    // Count active members for this chapter
    const { totalDocs } = await payload.find({
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
  }

  return doc;
};

export const syncMemberCountsOnDelete: CollectionAfterDeleteHook = async ({
  doc,
  req: { payload },
}) => {
  if (doc.chapter) {
    const chapterId = typeof doc.chapter === "object" ? doc.chapter.id : doc.chapter;

    const { totalDocs } = await payload.find({
      collection: "members",
      where: {
        chapter: {
          equals: chapterId,
        },
      },
      limit: 1,
    });
  }
};
