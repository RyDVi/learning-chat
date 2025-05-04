import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";

export const proxyServerCookies = async (
  cookieNames: string[],
  response: Response
) => {
  if (!response.headers.has("set-cookie")) return response;

  const cookieString = response.headers.get("set-cookie")!;
  const cookieObject = setCookieParser.parse(
    setCookieParser.splitCookiesString(cookieString),
    {
      map: true,
    }
  );
  for (const cookieName of cookieNames) {
    if (cookieObject[cookieName]) {
      const cookie = cookieObject[cookieName];

      console.debug(`[API Request] Proxying cookie ${cookieName} to client.`);
      (await cookies()).set(cookieName, cookie.value, {
        path: cookie.path,
        domain: cookie.domain,
        maxAge: cookie.maxAge,
        sameSite: 'lax',
        // sameSite: cookie.sameSite as
        //   | "lax"
        //   | "strict"
        //   | "none"
        //   | boolean
        //   | undefined,
        expires: cookie.expires,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
      });
    }
  }

  return response;
};
