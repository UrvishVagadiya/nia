import { FieldHook } from "payload";

const format = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .toLowerCase();

const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    // If there's a value already, just format it and return
    if (value && typeof value === "string") {
      return format(value);
    }

    // Otherwise, try to use the fallback field (e.g. 'name')
    const fallbackData = data?.[fallback] || originalDoc?.[fallback];

    if (fallbackData && typeof fallbackData === "string") {
      return format(fallbackData);
    }

    return value;
  };

export default formatSlug;
