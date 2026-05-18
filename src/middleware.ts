import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

export const config = {
  matcher: ["/((?!api|_next|_static|_vercel|favicon.ico).*)"],
};

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";

  let subdomain = "";

  if (host.includes("localhost")) {
    const parts = host.split(".");
    if (parts.length > 1) {
      subdomain = parts[0];
    }
  } else {
    if (host !== ROOT_DOMAIN && host !== `www.${ROOT_DOMAIN}`) {
      subdomain = host.replace(`.${ROOT_DOMAIN}`, "");
    }
  }

  const requestHeaders = new Headers(req.headers);

  requestHeaders.set("x-subdomain", subdomain);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// import { NextRequest, NextResponse } from "next/server";

// export const config = {
//   matcher: ["/((?!api|_next|_static|_vercel|admin|[\\w-]+\\.\\w+).*)"],
// };

// export default function middleware(req: NextRequest) {
//   const host = req.headers.get("host") || "";

//   const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN!;

//   let subdomain = "";
//   if (host.includes("localhost")) {
//     if (host !== `localhost:${process.env.PORT}`) {
//       subdomain = host.replace(`.localhost:${process.env.PORT}`, "");
//     }
//   } else {
//     if (host !== ROOT_DOMAIN && host !== `www.${ROOT_DOMAIN}`) {
//       subdomain = host.replace(`.${ROOT_DOMAIN}`, "");
//     }
//   }

//   const response = NextResponse.next();
//   response.headers.set("x-subdomain", subdomain);

//   return response;
// }
