"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CONTACT_MAILTO =
  "mailto:brianrobt@pm.me?subject=Free%20site%20check&body=Name%3A%0ABusiness%3A%0ACity%20%2F%20area%3A%0AWebsite%20or%20Google%20listing%3A%0A%0AWhat%27s%20not%20working%3A%0A%0AEmail%3A%0APhone%20(optional)%3A%0A";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            Email me about the business. I&apos;ll reply with a straight yes/no
            on fit, what I&apos;d change on your current site or Google listing,
            and a price.
          </p>

          <div className="mb-8 px-5 py-4 bg-[var(--card)] rounded-lg border border-[var(--border)]">
            <p className="text-[var(--accent)] font-mono text-sm mb-1">
              {"// Current status"}
            </p>
            <p className="text-[var(--foreground)]">
              Taking a few new St. Louis businesses this month.
            </p>
          </div>

          <a
            href={CONTACT_MAILTO}
            className="inline-flex bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Email me for a free site check
          </a>
          <p className="text-[var(--muted)] text-sm mt-4">
            I usually reply within one business day.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
