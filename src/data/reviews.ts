export type PublishedReview = {
  name: string;
  role?: string;
  company?: string;
  quote: string;
  date?: string;
};

/**
 * Approved client reviews shown on the site.
 * Collect via email, then add entries here when you want them public.
 */
export const publishedReviews: PublishedReview[] = [];
