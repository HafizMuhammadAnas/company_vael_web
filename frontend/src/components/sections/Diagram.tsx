import { Fragment } from "react";

import styles from "./Diagram.module.css";

interface PipelineProps {
  items: string[];
  /** Number the stages (01, 02, …). Defaults to true. */
  numbered?: boolean;
}

/** Linear left→right pipeline (wraps to a vertical stack on small screens). */
export function PipelineDiagram({ items, numbered = true }: PipelineProps) {
  return (
    <div className={styles.pipeline}>
      {items.map((item, i) => (
        <Fragment key={item}>
          <div className={styles.pipeNode}>
            {numbered && <span className={styles.pipeNum}>{String(i + 1).padStart(2, "0")}</span>}
            <span className={styles.pipeLabel}>{item}</span>
          </div>
          {i < items.length - 1 && (
            <span className={styles.pipeArrow} aria-hidden="true">
              →
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

interface ArchLayer {
  nodes: string[];
}

interface ArchitectureProps {
  layers: ArchLayer[];
}

/** Layered architecture diagram: a neon spine with parallel components per layer. */
export function ArchitectureDiagram({ layers }: ArchitectureProps) {
  return (
    <div className={styles.arch}>
      {layers.map((layer) => (
        <div key={layer.nodes.join("|")} className={styles.archLayer}>
          <div className={`${styles.archPanel} ${layer.nodes.length === 1 ? styles.solo : ""}`}>
            {layer.nodes.map((node) => (
              <span key={node} className={styles.archNode}>
                {node}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
