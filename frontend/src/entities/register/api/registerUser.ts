"use server";
import { Register, RegisterResponse } from "../types/register";
import { post, setAuthCookieOnClient } from "@/src/shared/api";

export const registerUser = async (
  data: Register
): Promise<RegisterResponse> => {
  const response = await post<RegisterResponse>("/auth/register", data, {
    proxyServerCookies: ["refreshToken"],
  });
  setAuthCookieOnClient(response.accessToken);
  return response;
};
