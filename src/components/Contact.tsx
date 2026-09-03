"use client";

import { motion, useInView } from "framer-motion";
import { FormEvent, useRef, useState } from "react";

const fieldClass =
  "w-full rounded-lg bg-[var(--background)] border border-[var(--border)] px-4 py-2.5 focus:outline-none focus:border-[var(--accent)]";

export default function Contact() {
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          business: data.get("business"),
          city: data.get("city"),
          website: data.get("website"),
          problem: data.get("problem"),
          email: data.get("email"),
          phone: data.get("phone"),
          honey: data.get("honey"),
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
      setErrorMessage("Could not send your message. Please email me instead.");
    }
  }

  return (
    <section id="contact" className="py-32">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[var(--accent)] font-mono text-xl block mb-2">
              05.
            </span>
            Want more calls from people already searching near you?
          </h2>

          <p className="text-[var(--muted)] text-lg mb-8">
            Tell me about the business. I&apos;ll reply with a straight yes/no on
            fit, what I&apos;d change on your current site or Google listing, and
            a price.
          </p>

          <div className="mb-8 px-5 py-4 bg-[var(--card)] rounded-lg border border-[var(--border)]">
            <p className="text-[var(--accent)] font-mono text-sm mb-1">
              {"// Current status"}
            </p>
            <p className="text-[var(--foreground)]">
              Taking a few new St. Louis businesses this month.
            </p>
          </div>

          {status === "success" ? (
            <p className="text-[var(--foreground)] text-lg">
              Got it. I&apos;ll reply within one business day.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="relative space-y-5 bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 md:p-8"
            >
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="honey">Leave blank</label>
                <input
                  id="honey"
                  name="honey"
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
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="business" className="block text-sm font-medium mb-2">
                  Business
                </label>
                <input
                  id="business"
                  name="business"
                  type="text"
                  required
                  minLength={2}
                  maxLength={120}
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2">
                  City / area
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  minLength={2}
                  maxLength={80}
                  placeholder="e.g. St. Charles, Kirkwood"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium mb-2">
                  Website or Google listing
                </label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  maxLength={300}
                  placeholder="URL or Google Business Profile link"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="problem" className="block text-sm font-medium mb-2">
                  What&apos;s not working
                </label>
                <textarea
                  id="problem"
                  name="problem"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={4}
                  placeholder="Not enough calls, outdated site, hard to find on Google…"
                  className={`${fieldClass} resize-y`}
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
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone{" "}
                  <span className="text-[var(--muted)] font-normal">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength={40}
                  className={fieldClass}
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm" role="alert">
                  {errorMessage}{" "}
                  <a
                    href="mailto:brianrobt@pm.me?subject=Free%20site%20check"
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
                {status === "submitting"
                  ? "Sending…"
                  : "Send. I'll reply within one business day"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
