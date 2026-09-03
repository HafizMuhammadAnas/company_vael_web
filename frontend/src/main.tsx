import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import { App } from "@/App";
import "@/styles/global.css";

const rootEl = document.getElementById("root")!;

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Hydrate when SSG pre-rendered HTML is present; otherwise mount (dev / CSR).
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
