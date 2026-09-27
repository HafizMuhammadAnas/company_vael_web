import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { GoogleReview } from "@/content/googleReviews";
import { usePublicGoogleReviews } from "@/hooks/usePublicGoogleReviews";

import styles from "./GoogleReviews.module.css";

function GoogleMark({ className, size = 22 }: { className?: string; size?: number }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GoogleWordmark({ className }: { className?: string }) {
  return (
    <span className={className} aria-label="Google">
      <GoogleMark size={28} />
      <span className={styles.googleWord}>Google</span>
    </span>
  );
}

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path
            fill={i < rating ? "#FABB05" : "#DADCE0"}
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      ))}
    </span>
  );
}

function initialsFor(review: GoogleReview) {
  if (review.initials) return review.initials;
  return review.author
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function ReviewCard({ review, profileUrl }: { review: GoogleReview; profileUrl: string }) {
  const href = profileUrl || undefined;

  return (
    <article className={styles.card}>
      <header className={styles.cardHead}>
        {review.avatarSrc ? (
          <img
            className={styles.avatarImg}
            src={review.avatarSrc}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span
            className={styles.avatar}
            style={{ background: review.avatarColor ?? "#4285F4" }}
            aria-hidden
          >
            {initialsFor(review)}
          </span>
        )}
        <div className={styles.cardMeta}>
          <p className={styles.author}>{review.author}</p>
          <p className={styles.time}>{review.relativeTime}</p>
        </div>
        <GoogleMark className={styles.cardGoogle} size={18} />
      </header>
      <Stars rating={review.rating} size={15} />
      <p className={styles.cardText}>{review.text}</p>
      {href ? (
        <a className={styles.readMore} href={href} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      ) : (
        <span className={styles.readMore}>Read more</span>
      )}
    </article>
  );
}

type GoogleReviewsProps = {
  /** Match marketing page shell padding (equal sides, full usable width). */
  aligned?: boolean;
};

/** Google-style reviews row — sits directly under the homepage hero. */
export function GoogleReviews({ aligned = false }: GoogleReviewsProps) {
  const {
    heading,
    summaryLabel,
    rating,
    reviewCount,
    profileUrl,
    reviews,
  } = usePublicGoogleReviews();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, reviews.length]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector(`.${styles.scrollerItem}`) as HTMLElement | null;
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  if (reviews.length === 0) return null;

  const count = reviewCount ?? reviews.length;
  const displayRating = rating ?? 5;

  return (
    <section
      className={[styles.section, aligned ? styles.aligned : ""].filter(Boolean).join(" ")}
      aria-labelledby="google-reviews-heading"
    >
      <div className={[styles.inner, aligned ? styles.alignedInner : ""].filter(Boolean).join(" ")}>
        <h2 id="google-reviews-heading" className={`${styles.heading} reveal`}>
          {heading}
        </h2>

        <div className={`${styles.row} reveal`}>
          <aside className={styles.summary}>
            <p className={styles.summaryLabel}>{summaryLabel}</p>
            <Stars rating={Math.round(displayRating)} size={24} />
            <p className={styles.basedOn}>Based on {count} reviews</p>
            <GoogleWordmark className={styles.summaryGoogle} />
          </aside>

          <div className={styles.carousel}>
            <button
              type="button"
              className={`${styles.navBtn} ${styles.navPrev}`}
              aria-label="Previous reviews"
              disabled={!canPrev}
              onClick={() => scrollByCard(-1)}
            >
              <ChevronLeft size={20} aria-hidden />
            </button>

            <div
              ref={scrollerRef}
              className={styles.scroller}
              role="list"
              aria-label="Google reviews"
            >
              {reviews.map((review) => (
                <div key={review.id} role="listitem" className={styles.scrollerItem}>
                  <ReviewCard review={review} profileUrl={profileUrl} />
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`${styles.navBtn} ${styles.navNext}`}
              aria-label="Next reviews"
              disabled={!canNext}
              onClick={() => scrollByCard(1)}
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
