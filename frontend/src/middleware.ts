import { paths } from "@/src/shared/lib";
import { isAuthorized, refreshAccessToken } from "./shared/api";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const isStaticAsset = (url: string) => {
  return url.startsWith("/_next") || url.startsWith("/static");
};

// middleware располагается в src потому что nextjs не понимает, что его необходимо искать в app при наличии src
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    isStaticAsset(pathname)
  ) {
    return NextResponse.next();
  }

  await refreshAccessToken();

  const url = request.nextUrl.clone();
  const _isAuthorized = await isAuthorized();
  if (_isAuthorized) {
    if (!url.pathname.includes(paths.main({}))) {
      url.pathname = paths.main({});
      return NextResponse.redirect(url);
    }
  } else {
    if (!url.pathname.includes(paths.auth({}))) {
      url.pathname = paths.login({});
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/:path*"],
};
