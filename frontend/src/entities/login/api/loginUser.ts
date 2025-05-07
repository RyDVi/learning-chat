"use server";
import { Login, LoginResponse } from "../types/login";
import { post, setAuthCookieOnClient } from "@/src/shared/api";

export const loginUser = async (data: Login): Promise<LoginResponse> => {
  const response = await post<LoginResponse>("/auth/login", data, {
    proxyServerCookies: ["refreshToken"],
  });
  setAuthCookieOnClient(response.accessToken);
  return response;
};
