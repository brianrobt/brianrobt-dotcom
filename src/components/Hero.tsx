"use client";

import { motion } from "framer-motion";
import { ArrowDown, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-purple-500/10 pointer-events-none" />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--accent)]/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto px-6 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[var(--accent)] font-mono text-sm mb-4"
          >
            Greater St. Louis
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Get found. Get booked. Stay visible.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[var(--muted)] text-lg md:text-xl max-w-2xl mx-auto mb-8"
          >
            I build and look after websites for local small businesses, so
            people can find you, call you, and hire you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-6 mb-12"
          >
            <a
              href="https://www.linkedin.com/in/brian-r-thompson/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:brianrobt@pm.me"
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Get a free site check
            </a>
            <a
              href="#services"
              className="border border-[var(--border)] hover:border-[var(--accent)] text-[var(--foreground)] px-8 py-3 rounded-lg font-medium transition-colors"
            >
              See what&apos;s included
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#services"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDown size={24} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
