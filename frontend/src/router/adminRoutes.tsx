import type { RouteObject } from "react-router-dom";

import { GuestRoute, ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminLayout } from "@/layouts/AdminLayout";
import { LeadDetailPage } from "@/pages/admin/LeadDetailPage";
import { LeadsPage } from "@/pages/admin/LeadsPage";
import { LoginPage } from "@/pages/admin/LoginPage";

/** CSR-only admin routes — excluded from SSG prerender list. */
export const adminRoutes: RouteObject[] = [
  {
    path: "/admin/login",
    element: <GuestRoute />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <LeadsPage /> },
          { path: "leads", element: <LeadsPage /> },
          { path: "leads/:id", element: <LeadDetailPage /> },
        ],
      },
    ],
  },
];
