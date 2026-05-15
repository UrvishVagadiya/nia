import { CollectionAfterChangeHook } from "payload";
import { revalidatePath } from "next/cache";

export const revalidateChapter: CollectionAfterChangeHook = ({ doc }) => {
  if (doc.slug) {
    // Revalidate the specific chapter page (under [slug] in website group)
    revalidatePath(`/${doc.slug}`, "page");

    // Revalidate the home page and other layouts
    revalidatePath("/", "layout");
  }

  return doc;
};
