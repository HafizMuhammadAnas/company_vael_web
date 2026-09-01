import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { LeadActions } from "@/components/admin/LeadActions";
import { LeadKpiCards } from "@/components/admin/LeadKpiCards";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { Select, TextInput } from "@/components/ui/FormField";
import { formatFormType } from "@/lib/leadLabels";
import { fetchLeadStats, fetchLeads } from "@/services/leads";
import type { LeadFormType, LeadStatus } from "@/types/lead";

import styles from "./LeadsPage.module.css";

const FORM_TYPES: Array<{ value: LeadFormType | ""; label: string }> = [
  { value: "", label: "All types" },
  { value: "contact", label: "Contact Us" },
  { value: "consultation", label: "Consultation" },
  { value: "proposal", label: "Proposal Request" },
];

const STATUSES: Array<{ value: LeadStatus | ""; label: string }> = [
  { value: "", label: "All statuses" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "archived", label: "Archived" },
];

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;
const DEFAULT_PAGE_SIZE = 10;

function parsePageSize(value: string | null): number {
  const size = Number(value ?? DEFAULT_PAGE_SIZE);
  return PAGE_SIZE_OPTIONS.includes(size as (typeof PAGE_SIZE_OPTIONS)[number])
    ? size
    : DEFAULT_PAGE_SIZE;
}

export function LeadsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const formType = (searchParams.get("form_type") ?? "") as LeadFormType | "";
  const status = (searchParams.get("status") ?? "") as LeadStatus | "";
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
    queryKey: ["admin-lead-stats"],
    queryFn: fetchLeadStats,
  });

  const leadsQuery = useQuery({
    queryKey: ["admin-leads", formType, status, query, page, pageSize],
    queryFn: () =>
      fetchLeads({
        form_type: formType || undefined,
        status: status || undefined,
        q: query || undefined,
        page,
        page_size: pageSize,
      }),
  });

  const { data, isLoading, isError } = leadsQuery;

  function applyFilter(nextFormType: LeadFormType | "", nextStatus: LeadStatus | "") {
    const next = new URLSearchParams(searchParams);
    if (nextFormType) next.set("form_type", nextFormType);
    else next.delete("form_type");
    if (nextStatus) next.set("status", nextStatus);
    else next.delete("status");
    next.set("page", "1");
    setSearchParams(next);
  }

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

  function updatePageSize(value: string) {
    const next = new URLSearchParams(searchParams);
    next.set("page_size", value);
    next.set("page", "1");
    setSearchParams(next);
  }

  function formatDate(value: string) {
    return new Date(value).toLocaleString();
  }

  return (
    <section>
      <h1 className={styles.title}>Leads</h1>

      {statsQuery.isLoading && <p className={styles.empty}>Loading summary…</p>}
      {statsQuery.isError && <p className={styles.error}>Could not load summary counts.</p>}
      {statsQuery.data && (
        <LeadKpiCards
          stats={statsQuery.data}
          activeFormType={formType}
          activeStatus={status}
          onFilter={applyFilter}
        />
      )}

      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <Select
            id="form_type"
            className={styles.filterControl}
            aria-label="Form type"
            value={formType}
            onChange={(e) => updateFilter("form_type", e.target.value)}
          >
            {FORM_TYPES.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            id="status"
            className={styles.filterControl}
            aria-label="Status"
            value={status}
            onChange={(e) => updateFilter("status", e.target.value)}
          >
            {STATUSES.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <TextInput
          id="lead-search"
          className={styles.searchInput}
          type="search"
          placeholder="Search name, email, company…"
          aria-label="Search leads"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {isError && <p className={styles.error}>Could not load leads.</p>}
      {isLoading && <p className={styles.empty}>Loading leads…</p>}

      {!isLoading && data && data.items.length === 0 && (
        <p className={styles.empty}>No leads match your filters.</p>
      )}

      {data && data.items.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>Form</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Files</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((lead) => (
                <tr key={lead.id}>
                  <td className={styles.nameCell}>{lead.full_name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone ?? "—"}</td>
                  <td>{lead.country ?? "—"}</td>
                  <td>{formatFormType(lead.form_type)}</td>
                  <td>
                    <LeadStatusBadge status={lead.status} />
                  </td>
                  <td>{formatDate(lead.created_at)}</td>
                  <td>{lead.attachment_count}</td>
                  <td>
                    <LeadActions leadId={lead.id} status={lead.status} compact showView />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data && (
        <div className={styles.pagination}>
          <div className={styles.paginationMeta}>
            <label className={styles.pageSizeLabel} htmlFor="page_size">
              Rows
            </label>
            <Select
              id="page_size"
              className={styles.pageSizeSelect}
              aria-label="Rows per page"
              value={String(pageSize)}
              onChange={(e) => updatePageSize(e.target.value)}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Select>
            <span>
              Page {data.page} of {Math.max(data.pages, 1)} · {data.total} total
            </span>
          </div>
          <span className={styles.paginationBtns}>
            <button
              type="button"
              className={styles.pageBtn}
              disabled={data.page <= 1}
              onClick={() => goToPage(data.page - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              className={styles.pageBtn}
              disabled={data.pages === 0 || data.page >= data.pages}
              onClick={() => goToPage(data.page + 1)}
            >
              Next
            </button>
          </span>
        </div>
      )}
    </section>
  );
}
