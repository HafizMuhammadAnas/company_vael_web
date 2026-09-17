import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Select, TextInput } from "@/components/ui/FormField";
import { useAuth } from "@/hooks/useAuth";
import { deleteProject, fetchProjectStats, fetchProjects } from "@/services/projects";
import type { ProjectStatus } from "@/types/project";

import styles from "./ProjectsPage.module.css";

const STATUSES: Array<{ value: ProjectStatus | ""; label: string }> = [
  { value: "", label: "All statuses" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;
const DEFAULT_PAGE_SIZE = 20;

function parsePageSize(value: string | null): number {
  const size = Number(value ?? DEFAULT_PAGE_SIZE);
  return PAGE_SIZE_OPTIONS.includes(size as (typeof PAGE_SIZE_OPTIONS)[number])
    ? size
    : DEFAULT_PAGE_SIZE;
}

export function ProjectsPage() {
  const { user } = useAuth();
  const canEdit = user?.role === "admin" || user?.role === "editor";
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const status = (searchParams.get("status") ?? "") as ProjectStatus | "";
  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const pageSize = parsePageSize(searchParams.get("page_size"));
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (searchInput === query) return;
      const next = new URLSearchParams(searchParams);
      if (searchInput.trim()) next.set("q", searchInput.trim());
      else next.delete("q");
      next.set("page", "1");
      setSearchParams(next);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchInput, query, searchParams, setSearchParams]);

  const statsQuery = useQuery({
    queryKey: ["admin-project-stats"],
    queryFn: fetchProjectStats,
  });

  const projectsQuery = useQuery({
    queryKey: ["admin-projects", status, query, page, pageSize],
    queryFn: () =>
      fetchProjects({
        status: status || undefined,
        q: query || undefined,
        page,
        page_size: pageSize,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-project-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["published-projects"] });
    },
  });

  const { data, isLoading, isError } = projectsQuery;
  const stats = statsQuery.data;

  function updateFilter(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set("page", "1");
    setSearchParams(next);
  }

  function goToPage(nextPage: number) {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
  }

  function onDelete(id: number, title: string) {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return;
    deleteMutation.mutate(id);
  }

  return (
    <section>
      <div className={styles.headingRow}>
        <div>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>Portfolio entries shown on the public site.</p>
        </div>
        {canEdit ? (
          <Button variant="primary" to="/admin/projects/new">
            Add project
          </Button>
        ) : null}
      </div>

      {stats ? (
        <div className={styles.kpis}>
          <div className={styles.kpi}>
            <span>Total</span>
            <strong>{stats.total}</strong>
          </div>
          <div className={styles.kpi}>
            <span>Published</span>
            <strong>{stats.published}</strong>
          </div>
          <div className={styles.kpi}>
            <span>Draft</span>
            <strong>{stats.draft}</strong>
          </div>
          <div className={styles.kpi}>
            <span>Featured</span>
            <strong>{stats.featured}</strong>
          </div>
        </div>
      ) : null}

      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <Select
            className={styles.filterControl}
            value={status}
            onChange={(e) => updateFilter("status", e.target.value)}
            aria-label="Filter by status"
          >
            {STATUSES.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
          <Select
            className={styles.filterControl}
            value={String(pageSize)}
            onChange={(e) => updateFilter("page_size", e.target.value)}
            aria-label="Rows per page"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </Select>
        </div>
        <TextInput
          className={styles.searchInput}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search title, industry, location…"
          aria-label="Search projects"
        />
      </div>

      {isLoading ? <p>Loading projects…</p> : null}
      {isError ? <p className={styles.error}>Could not load projects.</p> : null}

      {data ? (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Industry</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.items.length === 0 ? (
                  <tr>
                    <td colSpan={6}>No projects found.</td>
                  </tr>
                ) : (
                  data.items.map((project) => (
                    <tr key={project.id}>
                      <td>
                        <div className={styles.projectCell}>
                          <img src={project.image_url} alt="" className={styles.thumb} />
                          <div>
                            <strong>{project.title}</strong>
                            <span className={styles.muted}>{project.location}</span>
                          </div>
                        </div>
                      </td>
                      <td>{project.industry}</td>
                      <td>{project.service}</td>
                      <td>
                        <span
                          className={
                            project.status === "published" ? styles.badgeLive : styles.badgeDraft
                          }
                        >
                          {project.status}
                          {project.featured ? " · featured" : ""}
                        </span>
                      </td>
                      <td>{project.sort_order}</td>
                      <td>
                        <div className={styles.actions}>
                          <Link to={`/admin/projects/${project.id}`}>Edit</Link>
                          {canEdit ? (
                            <button
                              type="button"
                              className={styles.danger}
                              onClick={() => onDelete(project.id, project.title)}
                              disabled={deleteMutation.isPending}
                            >
                              Delete
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <span>
              Page {data.page} of {data.pages} · {data.total} total
            </span>
            <div className={styles.pageBtns}>
              <Button
                variant="outline"
                disabled={data.page <= 1}
                onClick={() => goToPage(data.page - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={data.page >= data.pages}
                onClick={() => goToPage(data.page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
