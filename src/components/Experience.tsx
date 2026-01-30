"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Staff AI Engineer",
    company: "SSM Health",
    location: "Remote",
    period: "Sep 2025 – Present",
    description: [
      "Lead a team of 5 engineers building production AI systems; established architectural standards and mentorship programs that accelerated team velocity by 40%",
      "Architected high-availability RAG systems using pgvector and Amazon Bedrock with Claude 3.5/4, processing 10K+ queries daily with sub-2s latency",
      "Built standardized AI application framework (React/Tailwind + FastAPI) deployed on AWS Lambda, reducing time-to-production from weeks to days",
      "Implemented Langfuse-based monitoring stack driving 30% cost reduction through prompt optimization",
    ],
    tech: ["Amazon Bedrock", "Claude", "RAG", "pgvector", "FastAPI", "Langfuse"],
  },
  {
    title: "Senior AI Infrastructure Engineer",
    company: "SSM Health",
    location: "Remote",
    period: "Jun 2024 – Sep 2025",
    description: [
      "Designed enterprise AI Landing Zone in AWS—a multi-tenant platform serving 200+ data scientists with standardized security guardrails",
      "Built end-to-end LLMOps infrastructure using Amazon SageMaker, Bedrock, and Q Business with Delta Sharing integration",
      "Architected self-hosted GitHub Actions runners on Kubernetes, achieving 99% reduction in CI/CD costs ($180K annual savings)",
      "Authored production-grade Terraform modules reducing new project setup from 2 weeks to 2 hours",
    ],
    tech: ["AWS", "SageMaker", "Terraform", "Kubernetes", "GitHub Actions"],
  },
  {
    title: "Staff Site Reliability Engineer",
    company: "Mastercard",
    location: "O'Fallon, MO",
    period: "Jun 2022 – Feb 2024",
    description: [
      "Led design of Luna HSM AWS hybrid cloud infrastructure, enabling cryptographic services processing $9T+ in annual transactions",
      "Mentored team of 4 engineers; established runbooks and incident response procedures that reduced MTTR by 45%",
      "Built custom Python automation framework managing 100+ HSMs and 50+ VMs with 99.99% uptime SLA",
    ],
    tech: ["AWS", "Azure", "Python", "Jenkins", "HSM", "Terraform"],
  },
  {
    title: "Senior Cloud Infrastructure Consultant",
    company: "Ocelot Consulting",
    location: "St. Louis, MO",
    period: "Oct 2021 – Apr 2022",
    description: [
      "Delivered AWS infrastructure modernization for Fortune 500 client using Terraform IaC",
      "Built production Databricks pipelines processing 500GB+ datasets, reducing model training iteration time by 60%",
    ],
    tech: ["AWS", "Terraform", "Databricks", "RedShift", "Lambda"],
  },
  {
    title: "Senior DevOps Engineer",
    company: "Mastercard",
    location: "O'Fallon, MO",
    period: "Nov 2018 – Oct 2021",
    description: [
      "Architected enterprise Application Release Automation platform serving 500+ developers",
      "Led migration from SaltStack to Chef Habitat, reducing deployment times by 70% and improving reliability to 99.9%",
      "Owned Jenkins infrastructure including shared libraries; standardized pipeline patterns adopted across 50+ teams",
    ],
    tech: ["SaltStack", "Chef Habitat", "Jenkins", "Splunk"],
  },
  {
    title: "Software Engineer",
    company: "Mastercard",
    location: "O'Fallon, MO",
    period: "Jul 2015 – Nov 2018",
    description: [
      "Core developer on banking platform that generated $400M revenue in first year",
      "Built Angular frontend and transaction-based Java microservices",
      "Established team's first CI/CD infrastructure before company-wide adoption",
    ],
    tech: ["Java", "Angular", "Jenkins", "REST APIs"],
  },
  {
    title: "Software Engineer (Part-Time)",
    company: "Tapestry Solutions",
    location: "Remote",
    period: "Jun 2012 – Mar 2015",
    description: [
      "Built ETL pipelines (Kettle/Jenkins) and AWS infrastructure while completing degree",
      "Early adopter of cloud technologies and automation",
    ],
    tech: ["AWS", "Kettle", "Jenkins", "EC2", "S3"],
  },
];

function ExperienceCard({
  experience,
  index,
  isActive,
  onClick,
}: {
  experience: (typeof experiences)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline connector */}
      {index < experiences.length - 1 && (
        <div className="absolute left-[11px] top-12 w-0.5 h-full bg-[var(--border)]" />
      )}

      <div className="flex gap-4">
        {/* Timeline dot */}
        <div
          className={`relative z-10 w-6 h-6 rounded-full border-2 flex-shrink-0 mt-1 transition-colors ${
            isActive
              ? "bg-[var(--accent)] border-[var(--accent)]"
              : "bg-[var(--background)] border-[var(--border)]"
          }`}
        />

        {/* Content */}
        <div
          onClick={onClick}
          className={`flex-1 pb-8 cursor-pointer group`}
        >
          <div
            className={`p-6 rounded-lg transition-all ${
              isActive
                ? "bg-[var(--card)] border border-[var(--accent)]/50"
                : "hover:bg-[var(--card)]"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="text-lg font-bold group-hover:text-[var(--accent)] transition-colors">
                {experience.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <Calendar size={14} />
                {experience.period}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
              <div className="flex items-center gap-2 text-[var(--accent)]">
                <Briefcase size={16} />
                <span className="font-medium">{experience.company}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <MapPin size={14} />
                {experience.location}
              </div>
            </div>

            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <ul className="space-y-2 mb-4">
                  {experience.description.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[var(--muted)] text-sm"
                    >
                      <span className="text-[var(--accent)] mt-1">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {experience.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono bg-[var(--accent)]/10 text-[var(--accent)] rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="experience" className="py-32 bg-[var(--card)]/30">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-4">
            <span className="text-[var(--accent)] font-mono text-xl">02.</span>
            Work Experience
            <span className="flex-1 h-px bg-[var(--border)] ml-4 hidden sm:block" />
          </h2>

          <p className="text-[var(--muted)] text-lg max-w-2xl mt-4 mb-12">
            14+ years of experience across AI/ML, DevOps, and Site Reliability Engineering.
            Click on any role to see more details.
          </p>

          <div className="relative">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={`${experience.company}-${experience.title}`}
                experience={experience}
                index={index}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
