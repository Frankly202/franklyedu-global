import { brand, siteUrl } from "@/data/site";

export interface PageMetaOptions {
  /** Route path used for the canonical URL, e.g. "/about". */
  path?: string;
  /** Exclude the page from search indexes (prototype or error pages). */
  noindex?: boolean;
}

/** Converts a root-relative path into an absolute production URL. */
export function absoluteUrl(path: string) {
  return path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
}

/** Builds route head() metadata with a consistent title suffix. */
export function pageMeta(title: string, description: string, options: PageMetaOptions = {}) {
  const full = `${title} — ${brand.name}`;
  const canonical = options.path && !options.noindex ? absoluteUrl(options.path) : undefined;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      ...(canonical ? [{ property: "og:url", content: canonical }] : []),
      { name: "twitter:title", content: full },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: absoluteUrl(brand.ogImage) },
      ...(options.noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: canonical ? [{ rel: "canonical", href: canonical }] : [],
  };
}
