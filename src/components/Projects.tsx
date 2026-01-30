"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";

const featuredProjects = [
  {
    title: "AI-Powered Agentic Framework",
    description:
      "A modular framework for building AI agents with specialized capabilities. Features multi-agent orchestration, RAG pipelines, and integration with various LLM providers for intelligent task automation. Currently in active development.",
    tech: ["Python", "LangChain", "OpenAI", "RAG", "Vector DB"],
    github: "",
    live: "",
  },
  {
    title: "Client Business Website",
    description:
      "A modern, responsive business website built for a client. Features a clean design, optimized performance, SEO best practices, and a custom CMS for easy content management.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    github: "",
    live: "",
  },
  {
    title: "MLOps Pipeline Platform",
    description:
      "End-to-end machine learning pipeline for model training, versioning, and deployment. Includes automated data validation, experiment tracking with MLflow, and CI/CD integration.",
    tech: ["Python", "MLflow", "PySpark", "Docker", "AWS"],
    github: "https://github.com/brianrobt",
    live: "",
  },
];

const otherProjects = [
  {
    title: "aurvt",
    description: "A CLI tool to check if newer versions are available for AUR packages hosted on GitHub. Features PKGBUILD parsing, variable substitution, and dual endpoint support for releases and tags.",
    tech: ["Go", "GitHub API"],
    github: "https://github.com/brianrobt/aurvt",
  },
  {
    title: "AUR PKGBUILDs",
    description: "A collection of 20+ PKGBUILDs for packages I maintain in the Arch User Repository. Includes automated builds with Docker and GitHub Actions for continuous AUR updates.",
    tech: ["Shell", "Docker", "GitHub Actions"],
    github: "https://github.com/brianrobt/aur-pkgbuilds",
  },

  {
    title: "Portfolio Website",
    description: "This website! A modern portfolio built with Next.js, featuring smooth animations, dark mode, and responsive design.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/brianrobt",
    live: "",
  },
];

function FeaturedProject({
  project,
  index,
}: {
  project: (typeof featuredProjects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="max-w-2xl mx-auto"
    >
      <p className="text-[var(--accent)] font-mono text-sm mb-2">
        Featured Project
      </p>
      <h3 className="text-2xl font-bold mb-4">
        <a
          href={project.live || project.github || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--accent)] transition-colors"
        >
          {project.title}
        </a>
      </h3>
      <div className="bg-[var(--card)] p-6 rounded-lg shadow-xl mb-4">
        <p className="text-[var(--muted)]">{project.description}</p>
      </div>
      <ul className="flex flex-wrap gap-3 text-sm font-mono text-[var(--muted)] mb-4">
        {project.tech.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <div className="flex gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            aria-label="Live Demo"
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

function OtherProject({
  project,
  index,
}: {
  project: (typeof otherProjects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-[var(--card)] hover:bg-[var(--card-hover)] p-6 rounded-lg transition-all hover:-translate-y-2 group"
    >
      <div className="flex items-center justify-between mb-6">
        <Folder
          size={40}
          className="text-[var(--accent)]"
          strokeWidth={1}
        />
        <div className="flex gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              aria-label="Live Demo"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
        {project.title}
      </h3>
      <p className="text-[var(--muted)] text-sm mb-4 line-clamp-3">
        {project.description}
      </p>
      <ul className="flex flex-wrap gap-2 text-xs font-mono text-[var(--muted)]">
        {project.tech.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-4">
            <span className="text-[var(--accent)] font-mono text-xl">03.</span>
            Some Things I&apos;ve Built
            <span className="flex-1 h-px bg-[var(--border)] ml-4 hidden sm:block" />
          </h2>

          {/* Featured Projects */}
          <div className="space-y-32 mt-16">
            {featuredProjects.map((project, index) => (
              <FeaturedProject key={project.title} project={project} index={index} />
            ))}
          </div>

          {/* Other Projects */}
          <div className="mt-32">
            <h3 className="text-2xl font-bold text-center mb-12">
              Other Noteworthy Projects
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherProjects.map((project, index) => (
                <OtherProject key={project.title} project={project} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
