"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-4">
            <span className="text-[var(--accent)] font-mono text-xl">02.</span>
            Work
            <span className="flex-1 h-px bg-[var(--border)] ml-4 hidden sm:block" />
          </h2>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mt-12"
          >
            <p className="text-[var(--accent)] font-mono text-sm mb-2">
              St. Charles County
            </p>
            <h3 className="text-2xl font-bold mb-4">
              <a
                href="https://stirupespresso.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors"
              >
                Stir Up Espresso
              </a>
            </h3>
            <div className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-lg mb-4">
              <p className="text-[var(--muted)] leading-relaxed">
                A mobile coffee cafe that needed a site the owner could update,
                that loads fast, and that helps people book events.
              </p>
            </div>
            <a
              href="https://stirupespresso.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline font-medium"
            >
              stirupespresso.com
              <ExternalLink size={16} />
            </a>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
