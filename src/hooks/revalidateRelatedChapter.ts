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
        revalidatePath(`/${chapter.slug}`, "page");
        revalidatePath("/", "layout");
      }
    } else if (doc.isGlobal) {
      // For global things like some testimonials, revalidate all chapters or just home

      revalidatePath("/", "layout");
    }
  } catch (err) {}

  return doc;
};
