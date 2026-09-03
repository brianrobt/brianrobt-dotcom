"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cloud, Cpu, Globe } from "lucide-react";

const services = [
  {
    icon: Cpu,
    title: "Production AI systems",
    description:
      "RAG, LLMOps, and application frameworks that teams can actually run: monitoring, cost control, and a path from prototype to production.",
  },
  {
    icon: Cloud,
    title: "Cloud & platform engineering",
    description:
      "AWS landing zones, Terraform, CI/CD, and the operational backbone so your product isn't stuck on one person's laptop.",
  },
  {
    icon: Globe,
    title: "Software for businesses",
    description:
      "Websites and custom apps for owners who need something reliable, fast, and easy to update. Not a science project.",
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
            <span className="text-[var(--accent)] font-mono text-xl">02.</span>
            How I can help
            <span className="flex-1 h-px bg-[var(--border)] ml-4 hidden sm:block" />
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-2xl mt-4 mb-12">
            Independent consulting for teams and business owners who need senior
            engineering without a full-time hire.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--accent)]/40 transition-colors"
                >
                  <div className="p-3 bg-[var(--accent)]/10 rounded-lg w-fit mb-4">
                    <Icon className="text-[var(--accent)]" size={22} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-[var(--muted)] leading-relaxed">
                    {service.description}
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
