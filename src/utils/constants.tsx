/**
 * Sampatti Constants
 */

export const HTTP = "http://";
export const HTTPS = "https://";
export const HOST = "127.0.0.1:";
export const PORT = "8000/";
// export const ApiUrl = HTTP + HOST + PORT;
export const DOMAIN = "devloka.pythonanywhere.com/";
export const ApiUrl = HTTPS + DOMAIN;
export const UrlPaths = {
  LOGIN: "api/v1/login/",
  REFRESH: "api/v1/token/refresh/",
  REGISTER: "api/v1/users/",
  AUTH_USER: "api/v1/users/me/",
  UPDATE_USER: "api/v1/users/",
  CODESPACE: "api/v1/codespaces/",
  USER_DEVSPACES: "api/v1/codespaces/user-devspaces/",
  SYNTAXES: "api/v1/syntax/",
  CREATE_CODESPACE: "api/v1/codespaces/create-codespace/",
};

export const getApiUrl = (path: string) => {
  const urlPath = UrlPaths[path as keyof typeof UrlPaths];
  if (!urlPath) {
    throw new Error(`Invalid URL path: ${path}`);
  }
  return ApiUrl + urlPath;
};

export const ignoreUrls = ["/login", "/login/", "/register", "/register/"];
export const appUrls = ["/account/", "/account"];

export const RoutesPaths = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  REGISTER: "/register",
  ACCOUNT: "/account",
};
