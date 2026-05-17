import { CollectionAfterChangeHook } from "payload";
import { revalidatePath } from "next/cache";

export const revalidateRelatedChapter: CollectionAfterChangeHook = async ({
  doc,
  req: { payload },
}) => {
  try {
    const chapterId = doc.chapter;

    if (chapterId) {
      const id =
        typeof chapterId === "object" ? (chapterId as { id: string | number }).id : chapterId;

      const chapter = await payload.findByID({
        collection: "chapters",
        id,
      });

      if (chapter && chapter.slug) {
        revalidatePath(`/${chapter.slug}`, "page");
        revalidatePath("/", "layout");
      }
    } else if (doc.isGlobal) {
      revalidatePath("/", "layout");
    }
  } catch (err) {
    payload.logger.error(err instanceof Error ? err.message : String(err));
  }

  return doc;
};
