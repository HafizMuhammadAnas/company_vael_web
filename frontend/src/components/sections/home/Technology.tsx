import {
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  LayoutDashboard,
} from "lucide-react";

import { Section, SectionHeader } from "@/components/ui";
import { TECHNOLOGY } from "@/content/home";

import styles from "./Technology.module.css";

const ICONS = [BrainCircuit, LayoutDashboard, Code2, Cloud, Database];

export function Technology() {
  return (
    <Section id="technology" className={styles.stage}>
      <div className="reveal">
        <SectionHeader label={TECHNOLOGY.label} title={TECHNOLOGY.heading} supporting={TECHNOLOGY.supporting} />
      </div>

      <ul className={`${styles.stack} reveal`}>
        {TECHNOLOGY.categories.map((cat, i) => {
          const Icon = ICONS[i] ?? Code2;
          return (
            <li key={cat.title} className={styles.row}>
              <div className={styles.meta}>
                <span className={styles.num}>0{i + 1}</span>
                <span className={styles.icon} aria-hidden>
                  <Icon size={16} />
                </span>
                <h3 className={styles.title}>{cat.title}</h3>
              </div>
              <div className={styles.chips}>
                {cat.items.map((item) => (
                  <span key={item} className={styles.chip}>
                    {item}
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
