"use client";

import { motion, useInView } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import { publishedReviews } from "@/data/reviews";

export default function Reviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          quote: data.get("quote"),
          website: data.get("website"),
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Could not send your review. Please email me instead.");
    }
  }

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
            <span className="text-[var(--accent)] font-mono text-xl">05.</span>
            Client reviews
            <span className="flex-1 h-px bg-[var(--border)] ml-4 hidden sm:block" />
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-2xl mt-4 mb-12">
            If we&apos;ve worked together, I&apos;d value a public note about the
            engagement. Reviews are moderated before they appear here.
          </p>

          {publishedReviews.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 mb-16">
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
          )}

          <div className="max-w-xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-bold mb-2">Leave a review</h3>
            <p className="text-[var(--muted)] text-sm mb-6">
              For people I&apos;ve already worked with. New projects start at{" "}
              <a href="#contact" className="text-[var(--accent)] hover:underline">
                Get in touch
              </a>
              .
            </p>

            {status === "success" ? (
              <p className="text-[var(--foreground)]">
                Thank you for taking the time to leave a review! I greatly
                appreciate it. It should appear in a little while.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="relative space-y-5">
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={80}
                    className="w-full rounded-lg bg-[var(--background)] border border-[var(--border)] px-4 py-2.5 focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg bg-[var(--background)] border border-[var(--border)] px-4 py-2.5 focus:outline-none focus:border-[var(--accent)]"
                  />
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Used only if I need to follow up. Not shown on the site.
                  </p>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company{" "}
                    <span className="text-[var(--muted)] font-normal">(optional)</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    maxLength={120}
                    className="w-full rounded-lg bg-[var(--background)] border border-[var(--border)] px-4 py-2.5 focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label htmlFor="quote" className="block text-sm font-medium mb-2">
                    Your review
                  </label>
                  <textarea
                    id="quote"
                    name="quote"
                    required
                    minLength={20}
                    maxLength={2000}
                    rows={5}
                    placeholder="What did we work on, and how did it go?"
                    className="w-full rounded-lg bg-[var(--background)] border border-[var(--border)] px-4 py-2.5 focus:outline-none focus:border-[var(--accent)] resize-y"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm" role="alert">
                    {errorMessage}{" "}
                    <a
                      href="mailto:brianrobt@pm.me?subject=Client%20review"
                      className="underline"
                    >
                      Email me
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {status === "submitting" ? "Sending…" : "Submit review"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
