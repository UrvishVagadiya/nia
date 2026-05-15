import { CollectionAfterChangeHook } from "payload";
import { revalidatePath } from "next/cache";

export const revalidateRelatedChapter: CollectionAfterChangeHook = async ({
  doc,
  req: { payload },
  collection,
}) => {
  try {
    const chapterId = doc.chapter;

    // Some collections might have different relationship field names or structures
    // but based on what I've seen, it's usually 'chapter'.

    if (chapterId) {
      const id = typeof chapterId === "object" ? chapterId.id : chapterId;

      // Fetch the chapter to get its slug
      const chapter = await payload.findByID({
        collection: "chapters",
        id,
      });

      if (chapter && chapter.slug) {
        payload.logger.info(
          `Revalidating chapter: /${chapter.slug} due to change in ${collection.slug}`
        );
        revalidatePath(`/${chapter.slug}`, "page");
        revalidatePath("/", "layout");
      }
    } else if (doc.isGlobal) {
      // For global things like some testimonials, revalidate all chapters or just home
      payload.logger.info(`Revalidating home/layout due to global change in ${collection.slug}`);
      revalidatePath("/", "layout");
    }
  } catch (err) {
    payload.logger.error(`Error revalidating related chapter: ${err}`);
  }

  return doc;
};
