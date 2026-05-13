import { CollectionAfterChangeHook } from "payload";
import { revalidatePath } from "next/cache";

export const revalidateChapter: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc.slug) {
    payload.logger.info(`Revalidating chapter: ${doc.slug}`);

    // Revalidate the specific chapter page
    revalidatePath(`/(chapters)/${doc.slug}`, "page");

    // Revalidate the home page or any other relevant paths
    revalidatePath("/", "layout");
  }

  return doc;
};
