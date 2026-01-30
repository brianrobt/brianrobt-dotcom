"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[var(--accent)] font-mono text-xl block mb-2">05.</span>
            Get In Touch
          </h2>

          <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto mb-8">
            Have a question, a project idea, or interested in working together?
            I&apos;m always happy to connect and discuss how I can help. Feel free
            to reach out!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[var(--accent)]/10 rounded-lg">
                <MapPin className="text-[var(--accent)]" size={20} />
              </div>
              <span className="text-[var(--muted)]">St. Louis, MO</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:brianrobt@pm.me"
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8 py-4 rounded-lg font-medium transition-colors text-lg"
            >
              <Mail size={20} />
              Email Me
            </a>

            <div className="px-6 py-4 bg-[var(--card)] rounded-lg border border-[var(--border)]">
              <p className="text-[var(--accent)] font-mono text-sm mb-1">
                {"// Current status"}
              </p>
              <p className="text-[var(--foreground)]">
                🟢 Open to consulting
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
