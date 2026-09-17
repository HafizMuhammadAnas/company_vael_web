import { Eyebrow } from "@/components/ui";
import { CLIENT_LOGOS_SECTION, type ClientLogo } from "@/content/clients";
import { useActiveClients } from "@/hooks/useActiveClients";

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

/** Infinite client logo strip — data from CMS (with static fallback). */
export function ClientLogos({ variant = "marquee" }: ClientLogosProps) {
  const { logos } = useActiveClients();
  if (logos.length === 0) return null;

  const loop = [...logos, ...logos];

  const track = (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {loop.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className={styles.item}
            aria-hidden={index >= logos.length || undefined}
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
          <Eyebrow>{CLIENT_LOGOS_SECTION.label}</Eyebrow>
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
