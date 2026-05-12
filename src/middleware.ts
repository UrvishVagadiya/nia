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
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  // Define your production domain
  const productionDomain = "nia-surat.propelius.tech";
  const rootChapter = process.env.NEXT_PUBLIC_ROOT_CHAPTER_SLUG || "innovators";

  // Extract subdomain
  let subdomain = "";
  if (host.includes("localhost")) {
    subdomain = host.replace(".localhost:3000", "");
    // If it's just localhost:3000, redirect to innovator.localhost:3000
    if (subdomain === "localhost:3000") {
      url.host = `innovator.localhost:3000`;
      return NextResponse.redirect(url);
    }
  } else {
    subdomain = host.replace(`.${productionDomain}`, "");
    // If it's the naked production domain, redirect to innovator subdomain
    if (subdomain === productionDomain || subdomain === host || !subdomain) {
      url.host = `innovator.${productionDomain}`;
      return NextResponse.redirect(url);
    }
  }

  // Map 'innovator' subdomain to 'innovators' slug if needed
  if (subdomain === "innovator") {
    subdomain = "innovators";
  }

  // Create a new response and set the subdomain header
  const response = NextResponse.next();
  response.headers.set("x-subdomain", subdomain);

  return response;
}
