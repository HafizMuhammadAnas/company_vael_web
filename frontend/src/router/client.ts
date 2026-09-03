import { createBrowserRouter } from "react-router-dom";

import { routes } from "@/router/routes";

/** Browser-only router — do not import from the SSR entry. */
export const router = createBrowserRouter(routes);
