import { cookies } from "next/headers";
import { post } from "./post";

export const setAuthCookieOnClient = async (accessToken: string) => {
  (await cookies()).set("accessToken", accessToken, {});
};

export const isAuthorized = async () => (await cookies()).has("accessToken");

export const refreshAccessToken = async () => {
  if (await isAuthorized()) return;

  if (!(await cookies()).has("refreshToken")) {
    console.error("refreshToken not found in cookies");
    return;
  }
  try {
    // TODO: not woking
    const response = await post<{ accessToken: string }>(
      "/auth/refresh",
      {},
      { proxyServerCookies: ["refreshToken"] }
    );
    await setAuthCookieOnClient(response.accessToken);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    // nothing
  }
};
