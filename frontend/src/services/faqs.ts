import { apiClient } from "@/services/apiClient";
import type {
  FaqCategory,
  FaqCategoryFormValues,
  FaqItem,
  FaqItemFormValues,
  FaqStats,
  PaginatedFaqItems,
  PublicFaqBlock,
  PublicFaqCategory,
} from "@/types/faq";

export async function fetchFaqStats(): Promise<FaqStats> {
  const { data } = await apiClient.get<FaqStats>("/admin/faqs/stats");
  return data;
}

export async function fetchFaqCategories(isActive?: boolean | ""): Promise<FaqCategory[]> {
  const { data } = await apiClient.get<FaqCategory[]>("/admin/faqs/categories", {
    params: {
      is_active: isActive === "" || isActive === undefined ? undefined : isActive,
    },
  });
  return data;
}

export async function fetchFaqCategory(id: number): Promise<FaqCategory> {
  const { data } = await apiClient.get<FaqCategory>(`/admin/faqs/categories/${id}`);
  return data;
}

export async function createFaqCategory(values: FaqCategoryFormValues): Promise<FaqCategory> {
  const { data } = await apiClient.post<FaqCategory>("/admin/faqs/categories", values);
  return data;
}

export async function updateFaqCategory(
  id: number,
  values: FaqCategoryFormValues,
): Promise<FaqCategory> {
  const { data } = await apiClient.patch<FaqCategory>(`/admin/faqs/categories/${id}`, values);
  return data;
}

export async function deleteFaqCategory(id: number): Promise<void> {
  await apiClient.delete(`/admin/faqs/categories/${id}`);
}

export async function fetchFaqItems(params: {
  category_id?: number | "";
  is_active?: boolean | "";
  q?: string;
  page?: number;
  page_size?: number;
} = {}): Promise<PaginatedFaqItems> {
  const { data } = await apiClient.get<PaginatedFaqItems>("/admin/faqs/items", {
    params: {
      category_id:
        params.category_id === "" || params.category_id === undefined
          ? undefined
          : params.category_id,
      is_active:
        params.is_active === "" || params.is_active === undefined ? undefined : params.is_active,
      q: params.q || undefined,
      page: params.page ?? 1,
      page_size: params.page_size ?? 20,
    },
  });
  return data;
}

export async function fetchFaqItem(id: number): Promise<FaqItem> {
  const { data } = await apiClient.get<FaqItem>(`/admin/faqs/items/${id}`);
  return data;
}

export async function createFaqItem(values: FaqItemFormValues): Promise<FaqItem> {
  const { data } = await apiClient.post<FaqItem>("/admin/faqs/items", values);
  return data;
}

export async function updateFaqItem(id: number, values: FaqItemFormValues): Promise<FaqItem> {
  const { data } = await apiClient.patch<FaqItem>(`/admin/faqs/items/${id}`, values);
  return data;
}

export async function deleteFaqItem(id: number): Promise<void> {
  await apiClient.delete(`/admin/faqs/items/${id}`);
}

export async function fetchPublicFaqs(): Promise<PublicFaqBlock> {
  const { data } = await apiClient.get<PublicFaqBlock>("/public/faqs");
  return data;
}

export async function fetchPublicFaqCategory(slug: string): Promise<PublicFaqCategory> {
  const { data } = await apiClient.get<PublicFaqCategory>(`/public/faqs/${slug}`);
  return data;
}
