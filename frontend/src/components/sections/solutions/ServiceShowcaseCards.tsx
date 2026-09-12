import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import editorial from "@/components/sections/editorial/Editorial.module.css";
import { Eyebrow, Section } from "@/components/ui";
import { SOL_CORE } from "@/content/solutions";

import styles from "./ServiceShowcaseCards.module.css";

type PreviewKind = (typeof SOL_CORE.solutions)[number]["preview"];
type Accent = (typeof SOL_CORE.solutions)[number]["accent"];

const ACCENT_CLASS: Record<Accent, string> = {
  sky: styles.accentSky,
  violet: styles.accentViolet,
  fuchsia: styles.accentFuchsia,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  rose: styles.accentRose,
};

function Preview({ kind }: { kind: PreviewKind }) {
  switch (kind) {
    case "web":
      return (
        <div className={`${styles.preview} ${styles.previewWeb}`} aria-hidden>
          <div className={styles.chrome}>
            <span className={styles.dotR} />
            <span className={styles.dotY} />
            <span className={styles.dotG} />
            <em>vaelkode.com</em>
            <b />
          </div>
          <div className={styles.webLayout}>
            <aside>
              <i /><i /><i /><i />
            </aside>
            <main>
              <div className={styles.webBanner}>
                <strong>Grow online</strong>
                <em>Book a call</em>
              </div>
              <div className={styles.webTiles}>
                <div><b /><span>Store</span></div>
                <div><b /><span>Portal</span></div>
                <div><b /><span>CMS</span></div>
              </div>
            </main>
          </div>
        </div>
      );
    case "software":
      return (
        <div className={`${styles.preview} ${styles.previewSoftware}`} aria-hidden>
          <div className={styles.softTop}>
            <span>Workspace</span>
            <div className={styles.softTabs}>
              <em className={styles.softTabOn}>Flow</em>
              <em>Team</em>
              <em>APIs</em>
            </div>
          </div>
          <div className={styles.softBody}>
            <div className={styles.softSidebar}>
              <i className={styles.softActive} />
              <i /><i /><i />
            </div>
            <div className={styles.softMain}>
              <div className={styles.softProgress}>
                <span>Sprint board</span>
                <div><b style={{ width: "68%" }} /></div>
              </div>
              <div className={styles.softMetrics}>
                <div><em>Queue</em><strong>Live</strong></div>
                <div><em>Approvals</em><strong>Open</strong></div>
                <div><em>Systems</em><strong>Linked</strong></div>
              </div>
            </div>
          </div>
        </div>
      );
    case "ai":
      return (
        <div className={`${styles.preview} ${styles.previewAi}`} aria-hidden>
          <div className={styles.aiShell}>
            <header>
              <span className={styles.aiAvatar} />
              <div>
                <strong>Document assistant</strong>
                <em>Connected · Ready</em>
              </div>
            </header>
            <div className={styles.aiThread}>
              <p className={styles.aiUser}>Extract vendor, amount, and due date from this invoice.</p>
              <div className={styles.aiBot}>
                <span>Done</span>
                <ul>
                  <li>Vendor · Acme Supplies</li>
                  <li>Amount · ready to route</li>
                  <li>Due · next approval step</li>
                </ul>
              </div>
            </div>
            <footer>
              <i>Ask about a workflow…</i>
              <b>Send</b>
            </footer>
          </div>
        </div>
      );
    case "mobile":
      return (
        <div className={`${styles.preview} ${styles.previewMobile}`} aria-hidden>
          <div className={styles.phoneStage}>
            <div className={`${styles.device} ${styles.deviceBack}`}>
              <div className={styles.deviceNotch} />
              <div className={styles.deviceUi}>
                <span /><span /><span />
              </div>
            </div>
            <div className={`${styles.device} ${styles.deviceFront}`}>
              <div className={styles.deviceNotch} />
              <div className={styles.deviceUi}>
                <div className={styles.deviceHero} />
                <div className={styles.deviceRow} />
                <div className={styles.deviceRow} />
                <div className={styles.deviceCta}>Open app</div>
              </div>
              <em>iOS · Android</em>
            </div>
          </div>
        </div>
      );
    case "cloud":
      return (
        <div className={`${styles.preview} ${styles.previewCloud}`} aria-hidden>
          <div className={styles.cloudTop}>
            <span>Deploy pipeline</span>
            <em>Healthy</em>
          </div>
          <div className={styles.cloudStages}>
            {["Build", "Test", "Ship", "Watch"].map((step, i) => (
              <div key={step} className={i < 3 ? styles.cloudDone : styles.cloudNow}>
                <b>{i + 1}</b>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <div className={styles.cloudGraph}>
            <svg viewBox="0 0 200 56" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cloudFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 40 C24 38 36 22 52 24 C72 26 84 12 104 16 C128 21 140 34 160 26 L200 18 V56 H0 Z"
                fill="url(#cloudFill)"
              />
              <path
                d="M0 40 C24 38 36 22 52 24 C72 26 84 12 104 16 C128 21 140 34 160 26 L200 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      );
    case "consulting":
      return (
        <div className={`${styles.preview} ${styles.previewConsulting}`} aria-hidden>
          <div className={styles.consultMap}>
            <div className={styles.consultStep}>
              <span>01</span>
              <div>
                <strong>Discover</strong>
                <em>Problem · users · constraints</em>
              </div>
            </div>
            <div className={styles.consultStep}>
              <span>02</span>
              <div>
                <strong>Decide</strong>
                <em>Build vs buy · options</em>
              </div>
            </div>
            <div className={`${styles.consultStep} ${styles.consultFocus}`}>
              <span>03</span>
              <div>
                <strong>Architect</strong>
                <em>Stack · phases · risks</em>
              </div>
            </div>
            <div className={styles.consultStep}>
              <span>04</span>
              <div>
                <strong>Roadmap</strong>
                <em>What ships first</em>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function ServiceShowcaseCards() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const count = SOL_CORE.solutions.length;

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = max <= 0 ? 1 : el.scrollLeft / max;
    setProgress(ratio);
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(`.${styles.slide}`) as HTMLElement | null;
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <Section className={[editorial.altBg, styles.stage].join(" ")}>
      <div className={`${styles.shell} reveal`}>
        <header className={styles.header}>
          <div className={styles.headerCopy}>
            <Eyebrow>{SOL_CORE.label}</Eyebrow>
            <h2 className={styles.heading}>
              Six services.{" "}
              <span className={styles.headingAccent}>Plain outcomes.</span>
            </h2>
            <p className={styles.supporting}>{SOL_CORE.supporting}</p>
          </div>
          <div className={styles.headerMeta} aria-hidden>
            <span className={styles.metaCount}>{count}</span>
            <span className={styles.metaLabel}>service lines</span>
          </div>
        </header>

        <div className={styles.gallery}>
          <ul
            ref={trackRef}
            className={styles.track}
            aria-label="Service lines"
          >
            {SOL_CORE.solutions.map((service, index) => {
              const num = String(index + 1).padStart(2, "0");
              return (
                <li key={service.id} className={styles.slide}>
                  <Link
                    to={service.to}
                    className={[styles.card, ACCENT_CLASS[service.accent]].join(" ")}
                    aria-label={`${service.title}. ${service.cta}`}
                  >
                    <div className={styles.cardTop}>
                      <span className={styles.pathTag}>{service.pathTag}</span>
                      <span className={styles.serviceMeta}>
                        SERVICE · {num}
                        <ArrowUpRight size={14} aria-hidden className={styles.expandIcon} />
                      </span>
                    </div>

                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <p className={styles.cardText}>{service.description}</p>

                    <Preview kind={service.preview} />

                    <div className={styles.cardFooter}>
                      <ul className={styles.tags}>
                        {service.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                      <div className={styles.highlight}>
                        <span>{service.highlightLabel}</span>
                        <strong>{service.highlightValue}</strong>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.controls}>
            <div className={styles.progressTrack} aria-hidden>
              <div
                className={styles.progressFill}
                style={{ width: `${Math.max(14, progress * 100)}%` }}
              />
            </div>
            <div className={styles.controlMeta}>
              <p className={styles.hint}>Scroll · {count} services</p>
              <div className={styles.nav}>
                <button
                  type="button"
                  className={styles.navBtn}
                  aria-label="Previous services"
                  disabled={!canPrev}
                  onClick={() => scrollByCard(-1)}
                >
                  <ChevronLeft size={18} aria-hidden />
                </button>
                <button
                  type="button"
                  className={styles.navBtn}
                  aria-label="Next services"
                  disabled={!canNext}
                  onClick={() => scrollByCard(1)}
                >
                  <ChevronRight size={18} aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
