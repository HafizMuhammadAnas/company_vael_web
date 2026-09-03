import { RouterProvider } from "react-router-dom";

import { AppShell } from "@/AppShell";
import { router } from "@/router/client";

export function App() {
  return (
    <AppShell>
      <RouterProvider router={router} />
    </AppShell>
  );
}
