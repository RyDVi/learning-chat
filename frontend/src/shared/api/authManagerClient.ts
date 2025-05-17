"use client";

export const getAccessToken = () => {
  if (typeof window !== "object") return null;
  if (!document?.cookie) return null;
  return new URLSearchParams(document.cookie.replace(/;\s*/g, "&")).get(
    "accessToken"
  );
};
