import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RoutesPaths } from "./utils/constants.tsx";
import { useUtilsContext } from "./providers/utils-providers.tsx";

/**
 * Elements
 */
import Home from "@/pages/landing//home.tsx";
import Preloader from "@/components/custom/preloader.tsx";
import Codespace from "./pages/codespace/codespace.tsx";

/**
 * AppRoutes component.
 * This component renders the main routes for the application.
 * It uses the react-router-dom library to render the routes.
 * The routes are defined in the RoutesPaths constants file.
 * The preloader is rendered if the preloader state is true.
 * The Home and Codespace components are rendered as the elements for the
 * HOME and /hello routes respectively.
 */
export function AppRoutes() {
  const { preloader } = useUtilsContext();
  return (
    <Router>
      {preloader && <Preloader />}
      <Routes>
        <Route path={RoutesPaths.HOME} element={<Home />} />
        <Route path="/:codespaceId" element={<Codespace />} />
      </Routes>
    </Router>
  );
}
