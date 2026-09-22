import { brand } from "@/data/site";

/** Builds route head() metadata with a consistent title suffix. */
export function pageMeta(title: string, description: string) {
  const full = `${title} — ${brand.name}`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
    ],
  };
}
