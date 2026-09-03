import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  ShoppingBag,
  Sprout,
  Truck,
} from "lucide-react";

import { Section, SectionHeader } from "@/components/ui";
import { INDUSTRIES } from "@/content/home";

import styles from "./Industries.module.css";

const ICONS = [Building2, GraduationCap, HeartPulse, Sprout, Landmark, Truck, ShoppingBag];

export function Industries() {
  return (
    <Section id="industries" className={styles.stage}>
      <div className="reveal">
        <SectionHeader label={INDUSTRIES.label} title={INDUSTRIES.heading} supporting={INDUSTRIES.supporting} />
      </div>

      <ul className={`${styles.grid} reveal`}>
        {INDUSTRIES.cards.map((card, i) => {
          const Icon = ICONS[i] ?? Building2;
          return (
            <li key={card.title}>
              <Link to={card.to} className={styles.tile}>
                <span className={styles.tileBar} aria-hidden />
                <span className={styles.tileTop}>
                  <span className={styles.tileIcon}>
                    <Icon size={18} aria-hidden />
                  </span>
                  <span className={styles.tileNum}>0{i + 1}</span>
                </span>
                <h3 className={styles.tileTitle}>{card.title}</h3>
                <p className={styles.tileText}>{card.text}</p>
                <span className={styles.tileCta}>
                  Explore industry
                  <ArrowUpRight size={15} aria-hidden />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
