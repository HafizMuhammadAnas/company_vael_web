import { Link } from "react-router-dom";

import home from "@/components/sections/home/Home.module.css";
import { Card } from "@/components/ui";
import type { Project } from "@/content/work";

import styles from "./Work.module.css";

/** Project card shared by the Work landing and Portfolio grid. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <div className={home.cardNum}>{project.order}</div>
      <div className={home.cardCategory}>{project.category}</div>
      <div className={home.cardTitle}>{project.title}</div>
      <p className={home.cardText}>{project.description}</p>

      {project.aiFocus && project.aiFocus.length > 0 && (
        <>
          <div className={styles.bulletLabel}>AI Focus</div>
          <ul className={styles.bulletList}>
            {project.aiFocus.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </>
      )}

      <div className={home.cardChips}>
        {project.technologies.map((tech) => (
          <span key={tech} className={home.chip}>
            {tech}
          </span>
        ))}
      </div>

      {project.hasCaseStudy && (
        <Link to={`/work/case-studies/${project.slug}`} className={home.cardCta}>
          View Case Study →
        </Link>
      )}
    </Card>
  );
}
