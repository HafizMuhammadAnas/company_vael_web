import { useQuery } from "@tanstack/react-query";

import { CLIENT_LOGOS, type ClientLogo } from "@/content/clients";
import { fetchActiveClients } from "@/services/clients";
import type { Client } from "@/types/client";

function toClientLogo(client: Client): ClientLogo {
  return {
    id: client.slug,
    name: client.name,
    logoSrc: client.logo_url,
    logoAlt: client.logo_alt || client.name,
  };
}

/** Active client logos from the CMS, with static fallback while loading / on error. */
export function useActiveClients() {
  const query = useQuery({
    queryKey: ["active-clients"],
    queryFn: () => fetchActiveClients(100),
    staleTime: 60_000,
    retry: 1,
  });

  const logos: ClientLogo[] = query.isSuccess ? query.data.map(toClientLogo) : CLIENT_LOGOS;

  return {
    logos,
    isLoading: query.isLoading,
    isError: query.isError,
    source: query.isSuccess ? ("api" as const) : ("fallback" as const),
  };
}
