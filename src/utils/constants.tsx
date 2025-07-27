/**
 * Sampatti Constants
 */

export const HTTP = "http://";
export const HTTPS = "https://";
export const HOST = "127.0.0.1:";
// export const HOST = "192.168.1.111:";
export const PORT = "8000/";
export const ApiUrl = HTTP + HOST + PORT;

export const UrlPaths = {
  LOGIN: "api/v1/login/",
  REFRESH: "api/v1/token/refresh/",
  REGISTER: "api/v1/users/",
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
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  REGISTER: "/register",
};
