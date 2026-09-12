/**
 * Mobile — How we work as a phone journey rail (idea → app store).
 * Unique to this page (not road / board / lab pipeline).
 */

import {
  CheckCircle2,
  Code2,
  Flag,
  MessageSquare,
  Pencil,
  Smartphone,
  Store,
  type LucideIcon,
} from "lucide-react";

import { Eyebrow, Section } from "@/components/ui";
import { MOB_PROCESS } from "@/content/mobileDevelopment";

import styles from "./MobileProcess.module.css";

const STEP_ICONS: LucideIcon[] = [MessageSquare, Pencil, Code2, Flag];

const TONE_CLASS: Record<(typeof MOB_PROCESS.steps)[number]["tone"], string> = {
  sky: styles.toneSky,
  violet: styles.toneViolet,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
};

const STATION_HINTS = [
  { label: "Brief", kind: "brief" as const },
  { label: "Screens", kind: "screens" as const },
  { label: "Builds", kind: "builds" as const },
  { label: "Stores", kind: "stores" as const },
];

export function MobileProcessSection() {
  return (
    <Section className={styles.stage}>
      <div className={`${styles.wrap} reveal`}>
        <header className={styles.head}>
          <Eyebrow>{MOB_PROCESS.label}</Eyebrow>
          <h2 className={styles.title}>
            {MOB_PROCESS.headingBefore}{" "}
            <span className={styles.accent}>{MOB_PROCESS.headingAccent}</span>
          </h2>
          <p className={styles.lede}>{MOB_PROCESS.supporting}</p>
          <div className={styles.focus}>
            <Smartphone size={15} aria-hidden />
            <span>Mobile development</span>
          </div>
        </header>

        <div className={styles.journey} aria-label="Mobile delivery journey">
          <div className={styles.journeyTop} aria-hidden>
            <div className={styles.phoneDock}>
              <div className={styles.phoneBody}>
                <span className={styles.phoneNotch} />
                <div className={styles.phoneScreen}>
                  <span className={styles.screenDot} />
                  <span className={styles.screenLine} />
                  <span className={styles.screenLine} />
                  <span className={styles.screenCard} />
                </div>
                <span className={styles.phoneHome} />
              </div>
              <p className={styles.phoneCaption}>Product in hand</p>
            </div>

            <div className={styles.storeEnd}>
              <Store size={16} strokeWidth={1.85} aria-hidden />
              <div>
                <strong>App store ready</strong>
                <em>iOS · Android · PWA</em>
              </div>
            </div>
          </div>

          <div className={styles.rail} aria-hidden>
            <span className={styles.railTrack} />
            {MOB_PROCESS.steps.map((step, i) => (
              <span
                key={step.num}
                className={[styles.railStop, TONE_CLASS[step.tone]].join(" ")}
                style={{ ["--stop-i" as string]: i }}
              />
            ))}
          </div>

          <ol className={styles.stations}>
            {MOB_PROCESS.steps.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? MessageSquare;
              const hint = STATION_HINTS[i] ?? STATION_HINTS[0];

              return (
                <li
                  key={step.num}
                  className={[styles.station, TONE_CLASS[step.tone]].join(" ")}
                  style={{ ["--station-i" as string]: i }}
                >
                  <div className={styles.stationPin} aria-hidden>
                    <span className={styles.pinDot} />
                    <span className={styles.pinStem} />
                  </div>

                  <article className={styles.card}>
                    <div className={styles.cardTop}>
                      <span className={styles.nodeIcon} aria-hidden>
                        <Icon size={15} strokeWidth={1.75} />
                      </span>
                      <span className={styles.nodeNum}>{step.num}</span>
                      <span className={styles.hint}>{hint.label}</span>
                    </div>

                    <h3>{step.title}</h3>
                    <p>{step.text}</p>

                    {hint.kind === "brief" ? (
                      <div className={styles.miniBrief} aria-hidden>
                        <span />
                        <span />
                        <span />
                      </div>
                    ) : null}

                    {hint.kind === "screens" ? (
                      <div className={styles.miniScreens} aria-hidden>
                        <i />
                        <i />
                        <i />
                      </div>
                    ) : null}

                    {hint.kind === "builds" ? (
                      <div className={styles.miniBuild} aria-hidden>
                        <em>Demo build</em>
                        <span className={styles.buildBars}>
                          <i />
                          <i />
                          <i />
                        </span>
                      </div>
                    ) : null}

                    {hint.kind === "stores" ? (
                      <div className={styles.miniStores} aria-hidden>
                        <span>App Store</span>
                        <span>Play</span>
                      </div>
                    ) : null}

                    {step.milestone ? (
                      <span className={styles.milestone}>
                        <CheckCircle2 size={12} aria-hidden />
                        {step.milestone}
                      </span>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
