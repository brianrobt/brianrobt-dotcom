"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-4">
            <span className="text-[var(--accent)] font-mono text-xl">03.</span>
            About
            <span className="flex-1 h-px bg-[var(--border)] ml-4 hidden sm:block" />
          </h2>

          <div className="grid md:grid-cols-3 gap-12 mt-12">
            <div className="md:col-span-2 space-y-4">
              <p className="text-[var(--muted)] text-lg leading-relaxed">
                I&apos;m Brian: husband, dad of two, based in St. Louis. I spent
                14 years building systems at Mastercard and SSM Health. I started
                this so owners around here can get a site that actually brings in
                work, without hiring a full-time tech person.
              </p>
            </div>

            <div className="relative group">
              <div className="relative z-10">
                <div className="aspect-square rounded-lg overflow-hidden bg-[var(--accent)]/20 border-2 border-[var(--accent)]">
                  <Image
                    src="/profile.jpg"
                    alt="Brian Thompson"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
