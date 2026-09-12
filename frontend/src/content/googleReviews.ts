/**
 * Google reviews block for the homepage (after Hero).
 *
 * Replace reviews / rating / reviewCount / profileUrl with your live
 * Google Business profile data when available.
 */

export interface GoogleReview {
  id: string;
  author: string;
  /** Relative time label as shown on Google, e.g. "2 months ago". */
  relativeTime: string;
  /** Integer 1–5. */
  rating: number;
  text: string;
  /** Optional initials override; otherwise derived from author. */
  initials?: string;
  /** Optional avatar image URL; otherwise colored initials circle. */
  avatarSrc?: string;
  /** Avatar background when using initials. */
  avatarColor?: string;
}

export const GOOGLE_REVIEWS = {
  heading: "We're proud of our 5-star Google rating, and we keep working to earn it.",
  summaryLabel: "EXCELLENT",
  rating: 5,
  reviewCount: 76,
  /** Google Business / Maps reviews URL. Used by “Read more” / “View on Google”. */
  profileUrl: "https://www.google.com/maps",
  reviews: [
    {
      id: "r1",
      author: "Neil Griffiths",
      relativeTime: "1 year ago",
      rating: 5,
      initials: "N",
      avatarColor: "#4285F4",
      text: "Very good knowledgeable service that has really helped my business grow online. Clear advice and a site that converts.",
    },
    {
      id: "r2",
      author: "Helen Morgan",
      relativeTime: "10 months ago",
      rating: 5,
      initials: "H",
      avatarColor: "#EA4335",
      text: "Professional from the first call. They understood what we needed and delivered a clean website on schedule.",
    },
    {
      id: "r3",
      author: "Sam Patel",
      relativeTime: "8 months ago",
      rating: 5,
      initials: "S",
      avatarColor: "#34A853",
      text: "Great communication throughout the project. The team made technical choices easy to follow and the result looks excellent.",
    },
    {
      id: "r4",
      author: "Priya Nair",
      relativeTime: "6 months ago",
      rating: 5,
      initials: "P",
      avatarColor: "#FBBC05",
      text: "Our new site is faster, clearer, and much easier for customers to use. Would happily recommend VAELKODE.",
    },
    {
      id: "r5",
      author: "James Walker",
      relativeTime: "4 months ago",
      rating: 5,
      initials: "J",
      avatarColor: "#4285F4",
      text: "They translated a messy brief into a practical plan and a polished website, without the jargon, and with visible progress each week.",
    },
    {
      id: "r6",
      author: "Ayesha Khan",
      relativeTime: "2 months ago",
      rating: 5,
      initials: "A",
      avatarColor: "#EA4335",
      text: "Clear updates, strong design, and solid engineering. Launch felt calm and our team can manage the site themselves.",
    },
  ] as GoogleReview[],
};
