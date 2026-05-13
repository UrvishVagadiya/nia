import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

export const syncMemberCounts: CollectionAfterChangeHook = async ({ doc, req: { payload } }) => {
  if (doc.chapter) {
    const chapterId = typeof doc.chapter === "object" ? doc.chapter.id : doc.chapter;

    // Count members for this chapter
    const { totalDocs } = await payload.find({
      collection: "members",
      where: {
        chapter: {
          equals: chapterId,
        },
      },
      limit: 1,
    });

    // Update chapter stats or any other logic
    payload.logger.info(`Chapter ${chapterId} now has ${totalDocs} members.`);
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

    payload.logger.info(`Chapter ${chapterId} now has ${totalDocs} members after deletion.`);
  }
};
