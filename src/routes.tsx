import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RoutesPaths } from "./utils/constants.tsx";
import { useUtilsContext } from "./providers/utils-providers.tsx";

/**
 * Elements
 */
import Home from "@/pages/landing//home.tsx";
import Preloader from "@/components/custom/preloader.tsx";

export function AppRoutes() {
  const { preloader } = useUtilsContext();
  return (
    <Router>
      {preloader && <Preloader />}
      <Routes>
        <Route path={RoutesPaths.HOME} element={<Home />} />
      </Routes>
    </Router>
  );
}
