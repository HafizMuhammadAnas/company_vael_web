import { useQuery } from "@tanstack/react-query";

import type { PortfolioProject } from "@/content/portfolio";
import { PORTFOLIO_PROJECTS } from "@/content/portfolio";
import { fetchPublishedProjects } from "@/services/projects";
import type { Project } from "@/types/project";

function toPortfolioProject(project: Project): PortfolioProject {
  return {
    id: project.slug,
    industry: project.industry,
    service: project.service,
    title: project.title,
    location: project.location,
    image: project.image_url,
    imageAlt: project.image_alt || project.title,
    liveUrl: project.live_url,
  };
}

/**
 * Published portfolio projects from the CMS.
 * Uses static content as a temporary fallback while loading or if the API fails.
 */
export function usePublishedProjects() {
  const query = useQuery({
    queryKey: ["published-projects"],
    queryFn: () => fetchPublishedProjects(100),
    staleTime: 60_000,
    retry: 1,
  });

  const projects: PortfolioProject[] = query.isSuccess
    ? query.data.map(toPortfolioProject)
    : PORTFOLIO_PROJECTS;

  return {
    projects,
    isLoading: query.isLoading,
    isError: query.isError,
    source: query.isSuccess ? ("api" as const) : ("fallback" as const),
  };
}
