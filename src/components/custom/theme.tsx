import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * A toggle for switching between light and dark theme.
 *
 * This component uses the `useTheme` hook to read the current theme
 * and the `setTheme` function to switch between light and dark theme.
 *
 * @returns a button with a moon or sun icon, depending on the current theme
 */
export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    theme === "dark" ? (
      <Moon
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-4 rounded-full",
        )}
        onClick={() => {
          setTheme("light");
        }}
      />
    ) : (
      <Sun
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-4 rounded-full",
        )}
        onClick={() => {
          setTheme("dark");
        }}
      />
    )

  );
}