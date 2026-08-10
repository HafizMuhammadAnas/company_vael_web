import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";

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
import { PagePlaceholder } from "@/pages/PagePlaceholder";
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

interface StubRoute {
  path: string;
  title: string;
  kicker?: string;
}

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

/** Routes whose real content is not built yet — rendered as neutral scaffolds. */
const stubRoutes: StubRoute[] = [
  // ─── Resources / Legal (footer) ───
  { path: "cookie-settings", title: "Cookie Settings", kicker: "Legal" },
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

  // About / Company
  { path: "about", element: <AboutPage /> },
  { path: "about/process", element: <ProcessPage /> },
  { path: "careers", element: <CareersPage /> },

  // Lead generation
  { path: "contact", element: <ContactPage /> },
  { path: "consultation", element: <ConsultationPage /> },
  { path: "request-proposal", element: <RequestProposalPage /> },

  // Work
  { path: "work", element: <WorkPage /> },
  { path: "work/portfolio", element: <PortfolioPage /> },
  { path: "work/case-studies", element: <CaseStudiesPage /> },
  { path: "work/case-studies/:slug", element: <CaseStudyDetailPage /> },

  // Insights (single page; child routes redirect to anchors)
  { path: "insights", element: <InsightsPage /> },
  { path: "insights/blog", element: <Navigate to="/insights#blog" replace /> },
  { path: "insights/resources", element: <Navigate to="/insights#resources" replace /> },

  // Resources
  { path: "faqs", element: <FaqsPage /> },

  // Legal
  { path: "privacy-policy", element: <LegalPage doc={PRIVACY_POLICY} /> },
  { path: "terms-and-conditions", element: <LegalPage doc={TERMS_AND_CONDITIONS} /> },
  { path: "cookie-policy", element: <LegalPage doc={COOKIE_POLICY} /> },

  ...stubRoutes.map((route) => ({
    path: route.path,
    element: <PagePlaceholder title={route.title} kicker={route.kicker} />,
  })),

  // Dynamic detail routes
  { path: "insights/blog/:slug", element: <DetailPlaceholder kicker="Blog" /> },

  // System pages
  { path: "thank-you", element: <ThankYouPage /> },
  { path: "contact/success", element: <ThankYouPage /> },

  // Catch-all 404
  { path: "*", element: <NotFoundPage /> },
];

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children,
  },
]);
