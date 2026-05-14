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

export default function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";

  // Define your production domain
  const productionDomain = "nia-surat.propelius.tech";

  // Extract subdomain
  let subdomain = "";
  if (host.includes("localhost")) {
    // If it's localhost:3000, subdomain is empty
    if (host !== "localhost:3000") {
      subdomain = host.replace(".localhost:3000", "");
    }
  } else {
    // If it's the naked production domain, subdomain is empty
    if (host !== productionDomain && host !== `www.${productionDomain}`) {
      subdomain = host.replace(`.${productionDomain}`, "");
    }
  }

  // Create a new response and set the subdomain header
  const response = NextResponse.next();
  response.headers.set("x-subdomain", subdomain);

  return response;
}
