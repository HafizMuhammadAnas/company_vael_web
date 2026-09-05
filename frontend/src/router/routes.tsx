import { Navigate, type RouteObject } from "react-router-dom";

import { PublicLayout } from "@/layouts/PublicLayout";
import { AboutPage } from "@/pages/AboutPage";
import { CareersPage } from "@/pages/CareersPage";
import { CaseStudiesPage } from "@/pages/CaseStudiesPage";
import { CaseStudyDetailPage } from "@/pages/CaseStudyDetailPage";
import { ConsultationPage } from "@/pages/ConsultationPage";
import { ContactPage } from "@/pages/ContactPage";
import { DetailPlaceholder } from "@/pages/DetailPlaceholder";
import { FaqsPage } from "@/pages/FaqsPage";
import { HomePage } from "@/pages/HomePage";
import { IndustriesPage } from "@/pages/IndustriesPage";
import { InsightsPage } from "@/pages/InsightsPage";
import { LegalPage } from "@/pages/LegalPage";
import { PortfolioPage } from "@/pages/PortfolioPage";
import { ProcessPage } from "@/pages/ProcessPage";
import { RequestProposalPage } from "@/pages/RequestProposalPage";
import { SolutionsPage } from "@/pages/SolutionsPage";
import { WorkPage } from "@/pages/WorkPage";
import { AiAutomationPage } from "@/pages/solutions/AiAutomationPage";
import { CustomSoftwarePage } from "@/pages/solutions/CustomSoftwarePage";
import { WebDevelopmentPage } from "@/pages/solutions/WebDevelopmentPage";
import { MobileDevelopmentPage } from "@/pages/solutions/MobileDevelopmentPage";
import { CloudDevOpsPage } from "@/pages/solutions/CloudDevOpsPage";
import { TechnologyConsultingPage } from "@/pages/solutions/TechnologyConsultingPage";
import { NotFoundPage } from "@/pages/system/NotFoundPage";
import { ThankYouPage } from "@/pages/system/ThankYouPage";
import { COOKIE_POLICY, PRIVACY_POLICY, TERMS_AND_CONDITIONS } from "@/content/legal";
import { adminRoutes } from "@/router/adminRoutes";

/**
 * Legacy per-industry routes now redirect to the single /industries page
 * anchors, so existing links/bookmarks keep working without duplicate content.
 */
const industryAnchors = [
  "government",
  "education",
  "healthcare",
  "agriculture",
  "finance",
  "logistics",
  "retail",
];

/** Routes that redirect until a dedicated page exists. */
const redirectRoutes: { path: string; to: string }[] = [
  { path: "cookie-settings", to: "/cookie-policy" },
];

const children: RouteObject[] = [
  { index: true, element: <HomePage /> },
  { path: "solutions", element: <SolutionsPage /> },
  { path: "solutions/ai-automation", element: <AiAutomationPage /> },
  { path: "solutions/custom-software", element: <CustomSoftwarePage /> },
  { path: "solutions/web-development", element: <WebDevelopmentPage /> },
  { path: "solutions/mobile-development", element: <MobileDevelopmentPage /> },
  { path: "solutions/cloud-devops", element: <CloudDevOpsPage /> },
  { path: "solutions/technology-consulting", element: <TechnologyConsultingPage /> },
  { path: "industries", element: <IndustriesPage /> },

  ...industryAnchors.map((anchor) => ({
    path: `industries/${anchor}`,
    element: <Navigate to={`/industries#${anchor}`} replace />,
  })),

  { path: "about", element: <AboutPage /> },
  { path: "about/process", element: <ProcessPage /> },
  { path: "careers", element: <CareersPage /> },

  { path: "contact", element: <ContactPage /> },
  { path: "consultation", element: <ConsultationPage /> },
  { path: "request-proposal", element: <RequestProposalPage /> },

  { path: "work", element: <WorkPage /> },
  { path: "work/portfolio", element: <PortfolioPage /> },
  { path: "work/case-studies", element: <CaseStudiesPage /> },
  { path: "work/case-studies/:slug", element: <CaseStudyDetailPage /> },

  { path: "insights", element: <InsightsPage /> },
  { path: "insights/blog", element: <Navigate to="/insights#blog" replace /> },
  { path: "insights/resources", element: <Navigate to="/insights#resources" replace /> },

  { path: "faqs", element: <FaqsPage /> },

  { path: "privacy-policy", element: <LegalPage doc={PRIVACY_POLICY} /> },
  { path: "terms-and-conditions", element: <LegalPage doc={TERMS_AND_CONDITIONS} /> },
  { path: "cookie-policy", element: <LegalPage doc={COOKIE_POLICY} /> },

  ...redirectRoutes.map((route) => ({
    path: route.path,
    element: <Navigate to={route.to} replace />,
  })),

  { path: "insights/blog/:slug", element: <DetailPlaceholder kicker="Blog" /> },

  { path: "thank-you", element: <ThankYouPage /> },
  { path: "contact/success", element: <ThankYouPage /> },

  { path: "*", element: <NotFoundPage /> },
];

/** Shared route tree for client router and SSG prerender. */
export const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children,
  },
  ...adminRoutes,
];
