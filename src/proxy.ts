import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next|_static|_vercel|admin|[\\w-]+\\.\\w+).*)"],
};

export default function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";

  const productionDomain = "nia-surat.propelius.tech";

  let subdomain = "";
  if (host.includes("localhost")) {
    if (host !== "localhost:3000") {
      subdomain = host.replace(".localhost:3000", "");
    }
  } else {
    if (host !== productionDomain && host !== `www.${productionDomain}`) {
      subdomain = host.replace(`.${productionDomain}`, "");
    }
  }

  const response = NextResponse.next();
  response.headers.set("x-subdomain", subdomain);

  return response;
}
