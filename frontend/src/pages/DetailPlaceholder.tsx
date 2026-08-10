import { useParams } from "react-router-dom";

import { PagePlaceholder } from "./PagePlaceholder";

/** Placeholder for dynamic detail routes (case study / blog article). */
export function DetailPlaceholder({ kicker }: { kicker: string }) {
  const { slug } = useParams<{ slug: string }>();
  return <PagePlaceholder kicker={kicker} title={slug ?? "Detail"} />;
}
