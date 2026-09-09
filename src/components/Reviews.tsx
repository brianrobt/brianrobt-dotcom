"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { publishedReviews } from "@/data/reviews";

const REVIEW_MAILTO =
  "mailto:brianrobt@pm.me?subject=Client%20review&body=Name%3A%0ACompany%20(optional)%3A%0A%0AYour%20review%3A%0A";

export default function Reviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="reviews" className="py-32 bg-[var(--card)]/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-4">
            <span className="text-[var(--accent)] font-mono text-xl">04.</span>
            Client reviews
            <span className="flex-1 h-px bg-[var(--border)] ml-4 hidden sm:block" />
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-2xl mt-4 mb-12">
            A few notes from people I&apos;ve worked with. If we&apos;ve done a
            project together and you&apos;d like to add one, email me and I&apos;ll
            post it here after a quick look.
          </p>

          {publishedReviews.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {publishedReviews.map((review) => (
                <blockquote
                  key={`${review.name}-${review.quote.slice(0, 24)}`}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6"
                >
                  <p className="text-[var(--foreground)] text-lg leading-relaxed mb-6">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <footer className="text-sm">
                    <cite className="not-italic font-medium">{review.name}</cite>
                    {(review.role || review.company) && (
                      <p className="text-[var(--muted)] mt-1">
                        {[review.role, review.company].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    {review.date && (
                      <p className="text-[var(--muted)] mt-1">{review.date}</p>
                    )}
                  </footer>
                </blockquote>
              ))}
            </div>
          ) : (
            <p className="text-[var(--muted)] mb-12 max-w-xl">
              No public reviews listed yet. The first ones will show up here.
            </p>
          )}

          <div className="max-w-xl">
            <a
              href={REVIEW_MAILTO}
              className="inline-flex bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Email me a review
            </a>
            <p className="text-[var(--muted)] text-sm mt-4">
              For people I&apos;ve already worked with. New projects start at{" "}
              <a href="#contact" className="text-[var(--accent)] hover:underline">
                Get in touch
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
