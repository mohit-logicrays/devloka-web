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
 * Providers
 */
import { ThemeProvider } from "@/providers/theme-provider";
import { UtilsProvider } from "./providers/utils-providers";
import { CodespaceProvider } from "./providers/codespace-provider";
import { AuthProvider } from "./providers/auth-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UtilsProvider>
      <AuthProvider>
        <CodespaceProvider>
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
        </CodespaceProvider>
      </AuthProvider>
    </UtilsProvider>
  </StrictMode>
);
