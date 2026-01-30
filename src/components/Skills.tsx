"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const skills = [
  // Frontend
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  // Backend
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "GraphQL", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  // Database
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Redis", category: "Database" },
  { name: "Prisma", category: "Database" },
  // Mobile
  { name: "React Native", category: "Mobile" },
  { name: "Expo", category: "Mobile" },
  { name: "iOS", category: "Mobile" },
  { name: "Android", category: "Mobile" },
  // AI / ML
  { name: "OpenAI APIs", category: "AI / ML" },
  { name: "LangChain", category: "AI / ML" },
  { name: "TensorFlow", category: "AI / ML" },
  { name: "Prompt Engineering", category: "AI / ML" },
  // DevOps
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "DevOps" },
  { name: "CI/CD", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
];

const categories = [
  { name: "Frontend", color: "from-blue-500 to-cyan-400" },
  { name: "Backend", color: "from-green-500 to-emerald-400" },
  { name: "Database", color: "from-orange-500 to-amber-400" },
  { name: "Mobile", color: "from-pink-500 to-rose-400" },
  { name: "AI / ML", color: "from-purple-500 to-violet-400" },
  { name: "DevOps", color: "from-red-500 to-orange-400" },
];

function SkillBubble({
  skill,
  index,
  isInView,
}: {
  skill: (typeof skills)[0];
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const category = categories.find((c) => c.name === skill.category);

  const floatDelay = index * 0.3;
  const floatDuration = 3 + (index % 3);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0],
      }}

      transition={{
        opacity: { duration: 0.3 },
        scale: { duration: 0.3, type: "spring", stiffness: 300 },
        y: {
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <motion.div
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
        className={`
          px-4 py-2 rounded-full cursor-default
          bg-gradient-to-r ${category?.color}
          text-white font-medium text-sm
          shadow-lg hover:shadow-xl
          transition-shadow duration-300
        `}
      >
        {skill.name}
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredSkills = activeFilter
    ? skills.filter((s) => s.category === activeFilter)
    : skills;

  return (
    <section id="skills" className="py-32 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-4">
            <span className="text-[var(--accent)] font-mono text-xl">04.</span>
            Skills & Technologies
            <span className="flex-1 h-px bg-[var(--border)] ml-4 hidden sm:block" />
          </h2>

          <p className="text-[var(--muted)] text-lg max-w-2xl mt-4 mb-8">
            I&apos;ve worked with a variety of technologies across the full stack.
            Here&apos;s an overview of the tools and frameworks I use.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveFilter(null)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${
                  activeFilter === null
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--card)] text-[var(--muted)] hover:bg-[var(--card-hover)]"
                }
              `}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveFilter(cat.name)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${
                    activeFilter === cat.name
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--card)] text-[var(--muted)] hover:bg-[var(--card-hover)]"
                  }
                `}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Bubble Cloud */}
          <div className="flex flex-wrap justify-center gap-3 min-h-[200px]">
            {filteredSkills.map((skill, index) => (
              <SkillBubble
                key={`${activeFilter}-${skill.name}`}
                skill={skill}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {categories.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${cat.color}`}
                />
                <span className="text-sm text-[var(--muted)]">{cat.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
