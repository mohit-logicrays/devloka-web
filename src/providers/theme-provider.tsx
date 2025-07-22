import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

  /**
   * The ThemeProvider component sets up a context for themes and
   * applies the theme to the document's root element.
   *
   * @param children The children elements to render.
   * @param defaultTheme The default theme to use if no theme is stored in
   *                     localStorage or if the storage key is not found.
   *                     Defaults to "system".
   * @param storageKey The key to use for storing the theme in localStorage.
   *                   Defaults to "vite-ui-theme".
   * @returns A JSX element with the children and theme context.
   */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    /**
     * Set the theme to the given value and persist it to localStorage.
     * @param theme The theme to set. Can be "light", "dark", or "system".
     */
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

/**
 * Custom hook to access the theme context.
 * 
 * This hook provides access to the current theme and a function to update it.
 * It must be used within a `ThemeProvider` to provide the necessary context value.
 * 
 * @throws Will throw an error if used outside of a `ThemeProvider`.
 * @returns The current theme and a function to set the theme.
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}