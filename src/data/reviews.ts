export type PublishedReview = {
  name: string;
  role?: string;
  company?: string;
  quote: string;
  date?: string;
};

/**
 * Approved client reviews shown on the site.
 * Submissions from the form are emailed for moderation. Add them here after you OK them.
 */
export const publishedReviews: PublishedReview[] = [];
