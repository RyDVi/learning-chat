export const getRequestUrl = (path: string) =>
  `${process.env.BACKEND_API_URL}${path}`.replaceAll("//", "/");
