"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, RefreshCw, Wrench } from "lucide-react";

const offerings = [
  {
    icon: MapPin,
    title: "Local Presence Care",
    pricing: "Setup ~$1,500 · then ~$129/month",
    description:
      "A 5–7 page site, Google Business Profile tune-up, local search basics, clear calls-to-action, and analytics. You get found. You get calls. I keep it from going stale.",
  },
  {
    icon: RefreshCw,
    title: "Monthly care",
    pricing: "Included with Local Presence Care",
    description:
      "Hosting, updates, small copy changes, and a monthly check that Google still lists you correctly.",
  },
  {
    icon: Wrench,
    title: "When you need more",
    pricing: "Priced when you need it",
    description:
      "Booking, forms, internal tools, custom software, after the site is earning its keep.",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 bg-[var(--card)]/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-4">
            <span className="text-[var(--accent)] font-mono text-xl">01.</span>
            What&apos;s included
            <span className="flex-1 h-px bg-[var(--border)] ml-4 hidden sm:block" />
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-2xl mt-4 mb-12">
            A website that works like a storefront: easy to find, easy to call,
            easy for you to update. Built for owners in Greater St. Louis who
            don&apos;t have a tech team.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {offerings.map((offering, index) => {
              const Icon = offering.icon;
              return (
                <motion.article
                  key={offering.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--accent)]/40 transition-colors"
                >
                  <div className="p-3 bg-[var(--accent)]/10 rounded-lg w-fit mb-4">
                    <Icon className="text-[var(--accent)]" size={22} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{offering.title}</h3>
                  <p className="text-[var(--accent)] text-sm font-medium mb-3">
                    {offering.pricing}
                  </p>
                  <p className="text-[var(--muted)] leading-relaxed">
                    {offering.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
