/**
 * Sampatti Constants
 */

export const HTTP = "http://";
export const HTTPS = "https://";
export const HOST = "127.0.0.1:";
export const PORT = "8000/";
export const ApiUrl = HTTP + HOST + PORT;

export const UrlPaths = {
  LOGIN: "users/login",
  REFRESH: "users/login/refresh",
  REGISTER: "users/register",
  AUTH_USER: "api/v1/users/me/",
  CODESPACE: "api/v1/codespaces/",
  SYNTAXES: "api/v1/syntax/",
};

export const getApiUrl = (path: string) => {
  const urlPath = UrlPaths[path as keyof typeof UrlPaths];
  if (!urlPath) {
    throw new Error(`Invalid URL path: ${path}`);
  }
  return ApiUrl + urlPath;
};

export const ignoreUrls = ["/login", "/login/", "/register", "/register/"];

export const RoutesPaths = {
  HOME: "/",
};
