import type { RouteObject } from "react-router-dom";

import { GuestRoute, ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminLayout } from "@/layouts/AdminLayout";
import { ClientFormPage } from "@/pages/admin/ClientFormPage";
import { ClientsPage } from "@/pages/admin/ClientsPage";
import { FaqCategoriesPage } from "@/pages/admin/FaqCategoriesPage";
import { FaqCategoryFormPage } from "@/pages/admin/FaqCategoryFormPage";
import { FaqItemFormPage } from "@/pages/admin/FaqItemFormPage";
import { FaqsAdminPage } from "@/pages/admin/FaqsAdminPage";
import { InsightFormPage } from "@/pages/admin/InsightFormPage";
import { InsightsAdminPage } from "@/pages/admin/InsightsAdminPage";
import { LeadDetailPage } from "@/pages/admin/LeadDetailPage";
import { LeadsPage } from "@/pages/admin/LeadsPage";
import { LoginPage } from "@/pages/admin/LoginPage";
import { ProjectFormPage } from "@/pages/admin/ProjectFormPage";
import { ProjectsPage } from "@/pages/admin/ProjectsPage";
import { ReviewFormPage } from "@/pages/admin/ReviewFormPage";
import { ReviewsAdminPage } from "@/pages/admin/ReviewsAdminPage";

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
          { path: "projects", element: <ProjectsPage /> },
          { path: "projects/new", element: <ProjectFormPage /> },
          { path: "projects/:id", element: <ProjectFormPage /> },
          { path: "clients", element: <ClientsPage /> },
          { path: "clients/new", element: <ClientFormPage /> },
          { path: "clients/:id", element: <ClientFormPage /> },
          { path: "insights", element: <InsightsAdminPage /> },
          { path: "insights/new", element: <InsightFormPage /> },
          { path: "insights/:id", element: <InsightFormPage /> },
          { path: "reviews", element: <ReviewsAdminPage /> },
          { path: "reviews/new", element: <ReviewFormPage /> },
          { path: "reviews/:id", element: <ReviewFormPage /> },
          { path: "faqs", element: <FaqsAdminPage /> },
          { path: "faqs/categories", element: <FaqCategoriesPage /> },
          { path: "faqs/categories/new", element: <FaqCategoryFormPage /> },
          { path: "faqs/categories/:id", element: <FaqCategoryFormPage /> },
          { path: "faqs/items/new", element: <FaqItemFormPage /> },
          { path: "faqs/items/:id", element: <FaqItemFormPage /> },
        ],
      },
    ],
  },
];
