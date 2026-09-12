import { CLIENT_LOGOS, CLIENT_LOGOS_SECTION, type ClientLogo } from "@/content/clients";

import styles from "./ClientLogos.module.css";

function LogoMark({ logo }: { logo: ClientLogo }) {
  return (
    <img
      className={styles.logoImg}
      src={logo.logoSrc}
      alt={logo.logoAlt ?? logo.name}
      loading="lazy"
      decoding="async"
    />
  );
}

type ClientLogosProps = {
  /** `marquee` = home/portfolio dark scrolling band. `panel` = portfolio section with heading. */
  variant?: "marquee" | "panel";
};

/** Infinite client logo strip — data from content/clients.ts. */
export function ClientLogos({ variant = "marquee" }: ClientLogosProps) {
  if (CLIENT_LOGOS.length === 0) return null;

  const loop = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  const track = (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {loop.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className={styles.item}
            aria-hidden={index >= CLIENT_LOGOS.length || undefined}
          >
            <LogoMark logo={logo} />
          </div>
        ))}
      </div>
    </div>
  );

  if (variant === "marquee") {
    return (
      <section className={styles.band} aria-label="Client logos">
        {track}
      </section>
    );
  }

  return (
    <section className={styles.panel} aria-labelledby="client-logos-heading">
      <div className={styles.panelInner}>
        <header className={`${styles.panelIntro} reveal`}>
          <p className={styles.badge}>+ {CLIENT_LOGOS_SECTION.label}</p>
          <h2 id="client-logos-heading" className={styles.panelHeading}>
            {CLIENT_LOGOS_SECTION.heading}
          </h2>
          <p className={styles.panelSupporting}>{CLIENT_LOGOS_SECTION.supporting}</p>
        </header>
      </div>
      <div className={`${styles.band} ${styles.bandInPanel} reveal`}>{track}</div>
    </section>
  );
}
