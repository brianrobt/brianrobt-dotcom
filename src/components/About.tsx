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
            <span className="text-[var(--accent)] font-mono text-xl">01.</span>
            About Me
            <span className="flex-1 h-px bg-[var(--border)] ml-4 hidden sm:block" />
          </h2>

          <div className="grid md:grid-cols-3 gap-12 mt-12">
            <div className="md:col-span-2 space-y-4">
              <p className="text-[var(--muted)] text-lg leading-relaxed">
                Hi, my name&apos;s Brian. I&apos;m a husband, father of two, and driven
                software engineer. Ever since I was a young kid, I&apos;ve been
                fascinated by computers and learning how they work. That fascination
                has carried over to my profession and is what keeps me rooted
                whenever I&apos;m learning a new technology, writing code, or solving
                problems. I&apos;ve learned that great software engineers know way more
                than just software. They know about networking, how to implement
                algorithms, what good architecture and design looks like, how to be
                a team player, how to translate technical jargon to product and
                business-oriented people, and how to get the job done even when
                there&apos;s huge obstacles to overcome. I don&apos;t claim to be a great
                software engineer, but I strive everyday to become better than I was
                the day before.
              </p>
              <p className="text-[var(--muted)] text-lg leading-relaxed">
                Outside of my career, I enjoy spending time with my family and pets
                (I have two daughters, one dog, and three cats), contributing to
                open source projects, reading (philosophy, religion, history,
                current events, technology, self-improvement, novels), weightlifting,
                running, hiking, and hanging out with friends (whenever I get a chance).
              </p>
              <p className="text-[var(--muted)] text-lg leading-relaxed">
                My primary goal in this life is to try to be better than I was the
                day before so that I can set a good example for my family and
                community. It&apos;s impossible to predict what life will throw at us,
                but the most important thing is to never give up in the face of
                adversity. Wherever I go, I strive to carry these values with me,
                and I hope that I can share them with you, too.
              </p>

              <div className="pt-4">
                <p className="text-[var(--foreground)] mb-4">
                  Here are some AI/ML technologies I&apos;ve been working with recently:
                </p>
                <ul className="grid grid-cols-2 gap-2">
                  {[
                    "LangChain",
                    "Langfuse",
                    "PySpark",
                    "MLflow",
                    "RAG Pipelines",
                    "OpenAI APIs",
                    "Hugging Face",
                    "Vector Databases",
                  ].map((tech) => (
                    <li
                      key={tech}
                      className="flex items-center gap-2 text-[var(--muted)] text-sm"
                    >
                      <span className="text-[var(--accent)]">▹</span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
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
