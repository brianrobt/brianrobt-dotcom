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
export const publishedReviews: PublishedReview[] = [
  {
    name: "Stirup Espresso",
    quote:
      "Brian helped update our small business website. The process was fast and Brian understood what we needed. I would highly recommend, especially with so many changes happening in the tech world. Brian stays up to date and is very knowledgeable!",
    date: "September 2026",
  },
];
