/**
 * Sampatti Web Utilities
 */
export const setLocalStorage = (instance: any) => {
  for (const key in instance) {
    localStorage.setItem(key, instance[key]);
  }
};


/**
 * Retrieves the value associated with the specified key from the local storage.
 *
 * @param key - The key for the value to be retrieved.
 * @returns The value associated with the key, or null if the key does not exist.
 */
export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

/**
 * Removes the specified key-value pair from the local storage.
 *
 * @param key - The key for the value to be removed.
 */
export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

/**
 * Clears all key-value pairs from the local storage.
 */
export const clearLocalStorage = () => {
  localStorage.clear();
};

/**
 * Redirects the browser to a specified URL.
 *
 * @param url - The URL to redirect to.
 */
export const redirectPage = (url: string) => {
  window.location.href = url;
};

/**
 * Redirects the browser to a specified URL after a delay.
 *
 * @param url - The URL to redirect to.
 * 
 * This function uses a delay of 1000 milliseconds before changing the
 * window's location to the specified URL. Useful for lazy redirects
 * where immediate navigation is not required.
 */
export const redirectPageLazy = (url: string) => {
  setTimeout(() => {
    window.location.href = url;
  }, 1000);
};

/**
 * Get Access Token Header
 */
export function getAccessTokenHeader() {
  return {
    headers: {
      Authorization: `Bearer ${getLocalStorage("access")}`,
    },
  };
}

/**
 * Logs out the user by removing the access and refresh tokens from localStorage
 * and then redirecting to the login page.
 */
export function logOut() {
  removeLocalStorage("access");
  removeLocalStorage("refresh");
  redirectPage("/login");
}
