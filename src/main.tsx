import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRoutes } from "@/routes";

/**
 * Third party Components
 * 1. react-toastify
 */
import { ToastContainer, Slide } from "react-toastify";

/**
 * Sampatti App Providers
 * 1. Theme provider
 * 2. Utils provider
 * 3. Token provider
 * 4. Auth provider
 */
import { ThemeProvider } from "@/providers/theme-provider";
import { UtilsProvider } from "./providers/utils-providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UtilsProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ToastContainer
          draggablePercent={60}
          draggable
          stacked
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="colored"
          transition={Slide}
        />
        <AppRoutes />
      </ThemeProvider>
    </UtilsProvider>
  </StrictMode>
);