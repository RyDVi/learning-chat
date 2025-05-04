"use server";

import { getRequestUrl } from "./getRequestUrl";
import { proxyServerCookies } from "./proxyServerCookies";

export const post = async <ResponseData>(
  path: string,
  data: object,
  options?: {
    proxyServerCookies?: string[];
  }
): Promise<ResponseData> => {
  let result: ResponseData;
  try {
    const response = await fetch(getRequestUrl(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) =>
      options?.proxyServerCookies
        ? proxyServerCookies(options?.proxyServerCookies, response)
        : response
    );

    result = await response.json();
    if (!response.ok) {
      throw result;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err?.message || err);
  }

  return result;
};
