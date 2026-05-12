import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. /admin (Payload CMS admin)
     * 6. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
     */
    "/((?!api|_next|_static|_vercel|admin|[\\w-]+\\.\\w+).*)",
  ],
};

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";

  // Define your production domain
  const productionDomain = "nia-surat.propelius.tech";

  // Extract subdomain
  // For local: innovator.localhost:3000 -> innovator
  // For production: innovator.nia-surat.propelius.tech -> innovator
  let subdomain = "";

  if (host.includes("localhost")) {
    subdomain = host.replace(".localhost:3000", "");
  } else {
    subdomain = host.replace(`.${productionDomain}`, "");
  }

  // If the subdomain is just the domain itself or empty, it's the root chapter
  const rootChapter = process.env.NEXT_PUBLIC_ROOT_CHAPTER_SLUG || "innovators";
  if (subdomain === host || subdomain === productionDomain || !subdomain) {
    subdomain = rootChapter;
  }

  // Create a new response and set the subdomain header
  const response = NextResponse.next();
  response.headers.set("x-subdomain", subdomain);

  // You can also rewrite internally if you want a clean dynamic route structure
  // But since you asked for headers, we'll stick to that for now.

  return response;
}
