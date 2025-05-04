import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { paths } from "@/src/shared/lib";

// middleware располагается в src потому что nextjs не понимает, что его необходимо искать в app при наличии src
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (!url.pathname.includes(paths.auth({}))) {
    url.pathname = paths.login({});
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/"],
};
