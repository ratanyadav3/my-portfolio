"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function useRevealOnScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  return containerRef;
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [wipeActive, setWipeActive] = useState(false);

  const onToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.getBoundingClientRect();
    const x = target.left + target.width / 2;
    const y = target.top + target.height / 2 + window.scrollY;
    document.documentElement.style.setProperty("--x", `${x}px`);
    document.documentElement.style.setProperty("--y", `${y}px`);
    setWipeActive(true);
    const next = theme === "dark" ? "light" : "dark";
    // Switch theme immediately; overlay will mask the transition
    setTheme(next);
    setTimeout(() => setWipeActive(false), 800);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {wipeActive && (
          <motion.div
            key="theme-wipe"
            initial={{ y: "100%" }}
            animate={{ y: "-100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ background: "rgb(var(--bg))" }}
          />
        )}
      </AnimatePresence>
      <button
        onClick={onToggle}
        aria-label="Toggle theme"
        className="rounded-full border p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10 border-black/10 dark:border-white/20"
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.span
              key="sun"
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              <SunIcon className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              <MoonIcon className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

export default function Home() {
  const containerRef = useRevealOnScroll();

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-backdrop-filter:bg-white/70 dark:supports-backdrop-filter:bg-[rgba(10,12,20,0.45)] border-b border-slate-200 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="#home" className="font-semibold tracking-tight">
            Ratan Yadav
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:opacity-80">About</a>
            <a href="#experience" className="hover:opacity-80">Experience</a>
            <a href="#skills" className="hover:opacity-80">Skills</a>
            <a href="#projects" className="hover:opacity-80">Projects</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              className="text-sm rounded-full px-4 py-2 border border-slate-300 text-hero hover:bg-slate-50 dark:border-white/20 dark:hover:bg-white/10"
              href="#contact"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
          <p className="text-sm uppercase tracking-widest text-muted dark:text-white/60">Hi, I&apos;m</p>
          <h1 className="mt-2 text-4xl md:text-6xl font-bold leading-tight text-hero dark:text-white heading-glow">
            Ratan Yadav
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-hero dark:text-white/80">
            Full‑stack Developer passionate about building impactful products. I specialize in Next.js, Express.js, and TypeScript.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-full bg-[rgb(var(--accent))] text-[rgb(var(--accent-contrast))] px-5 py-2 text-sm hover:brightness-110 shadow-sm">
              View Projects
            </a>
            <a href="#contact" className="rounded-full border px-5 py-2 text-sm border-slate-400 text-hero bg-white shadow-sm hover:bg-slate-50 hover:shadow-md dark:border-white/20 dark:bg-transparent dark:hover:bg-white/10">
              Get in Touch
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm">
            <a href="https://www.linkedin.com/in/ratan-here/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 underline underline-offset-4 hover:opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.85 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.82-2.2 3.75-2.2 4 0 4.7 2.6 4.7 6V24h-4v-7.8c0-1.86-.03-4.24-2.58-4.24-2.58 0-2.98 2.02-2.98 4.1V24h-4V8z"/></svg>
              LinkedIn
            </a>
            <a href="https://github.com/ratanyadav3" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 underline underline-offset-4 hover:opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 .5C5.73.5.77 5.46.77 11.73c0 4.9 3.18 9.05 7.6 10.52.56.1.77-.24.77-.54v-2.1c-3.09.67-3.74-1.32-3.74-1.32-.51-1.29-1.26-1.63-1.26-1.63-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.18 1.74 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.73-1.54-2.47-.28-5.06-1.24-5.06-5.53 0-1.22.43-2.21 1.14-2.99-.11-.28-.5-1.42.11-2.96 0 0 .95-.3 3.12 1.14.9-.25 1.86-.38 2.82-.38.96 0 1.92.13 2.82.38 2.17-1.44 3.12-1.14 3.12-1.14.6 1.54.22 2.68.11 2.96.71.78 1.14 1.77 1.14 2.99 0 4.29-2.6 5.24-5.07 5.52.41.35.78 1.04.78 2.1v3.12c0 .3.21.65.78.54 4.41-1.47 7.59-5.61 7.59-10.52C23.23 5.46 18.27.5 12 .5z"/></svg>
              GitHub
            </a>
            <a href="https://x.com/ratan_he" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 underline underline-offset-4 hover:opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 0 0 1.87-2.37 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.33 3.9A12.14 12.14 0 0 1 3.15 4.6a4.27 4.27 0 0 0 1.32 5.7 4.27 4.27 0 0 1-1.94-.54v.06a4.28 4.28 0 0 0 3.43 4.2c-.47.13-.96.2-1.47.2-.35 0-.7-.03-1.03-.1a4.29 4.29 0 0 0 4 2.98 8.58 8.58 0 0 1-6.32 1.77A12.1 12.1 0 0 0 8.29 20c7.9 0 12.22-6.54 12.22-12.22 0-.19 0-.38-.01-.57A8.72 8.72 0 0 0 22.46 6z"/></svg>
              Twitter
            </a>
            <a href="https://drive.google.com/file/d/1x5cFN6gI8yxubWKdF0PdNT4OYizMKEuo/view?usp=drivesdk" className="inline-flex items-center gap-2 underline underline-offset-4 hover:opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16l6-3 6 3V8l-2-2z"/></svg>
              Resume
            </a>
            <a href="mailto:ratanyadavvkr@gmail.com" className="inline-flex items-center gap-2 underline underline-offset-4 hover:opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v1l10 6 10-6V6a2 2 0 0 0-2-2z"/><path d="M22 8l-10 6L2 8v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8z"/></svg>
              ratanyadavvkr@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <motion.section
        id="about"
        className="mx-auto max-w-5xl px-4 py-16 md:py-24 text-hero dark:text-white"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold">About Me</h2>
        <p className="mt-4 text-hero dark:text-white">
         Hi, I am Ratan Yadav. I have completed my undergraduation studies with Bachelor of Technology (B.tech) degree in Information Technology in 2025 from Rajkiya Engineering College Bijnor , a government institution affiliated with Abdul Kalam Technical University . I am a Full-Stack Devloper with passion for creating and delivering projects that have meaningful impact on real world.
           </p>
        <p className="mt-4 text-hero dark:text-white">
          Have an idea, want to collaborate, or have an internship opportunity? Feel free to message me! I&apos;m always excited to connect and work on great projects.
        </p>
      </motion.section>
      {/* Achievements */}
<motion.section
  id="achievements"
  className="mx-auto max-w-5xl px-4 py-16 md:py-24 text-hero dark:text-white"
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
>
  <h2 className="text-2xl md:text-3xl font-semibold">Achievements</h2>

  <div className="mt-6 grid gap-4">
    <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 md:p-6 bg-white dark:bg-transparent">
      
      <ul className="space-y-3 text-sm md:text-[15px] text-hero dark:text-white">
  
  <li>
    Shortlisted for the <span className="font-medium">TCS Ninja Hiring Process (2025)</span> and successfully completed technical and HR interview rounds.
  </li>
  <li>
    <span className="font-medium">TCS iON National Qualifier Test (NQT – IT 2026) </span> — Scored <span className="font-medium">87% in Programming</span> and <span className="font-medium">65% in Foundation Aptitude</span>
  </li>


 
</ul>

    </div>
  </div>
</motion.section>

      {/* Skills */}
      <motion.section
        id="skills"
        className="mx-auto max-w-6xl px-4 py-16 md:py-24 text-hero dark:text-white"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold">Skills & Tools</h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            "TailwindCSS",
            "Javascript",
            "Typescript",
            "React",
            "Next.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "Mongoose",
            "NextAuth",
            "Linux",
            "Postman",
            "Git",
            "VS Code",
            "C++",
          ].map((skill) => (
            <div
              key={skill}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-center bg-white text-hero shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              {skill}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section
        id="projects"
        className="mx-auto max-w-6xl px-4 py-16 md:py-24 text-hero dark:text-white"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold">Projects</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            {
              title: "DevTube",
              desc:
                "A video streaming platform with user management.",
              stack:
                "React, Node.js, Express.js, MongoDB, Multer, JWT, RESTful APIs, TailwindCSS",
              links: { github: "https://github.com/ratanyadav3/youtube_clone", live: "https://video-streaming-app-v1.netlify.app/", demo: "#" },
            },
            {
              title: "LegalMate",
              desc:
                "AI-Powered legal document assistant.",
              stack:
                "React, Node.js, Express.js, MongoDB, Multer, RESTful APIs,TogetherAI, TailwindCSS",
              links: { github: "https://github.com/CoderRedwing/Legal-Document-Analysis-System", live: "https://legal-document-analysis-system.vercel.app/", demo: "#" },
            },
            
          ].map((p) => (
            <article key={p.title} className="rounded-2xl border border-slate-300 p-5 bg-white text-hero shadow-sm hover:shadow-md transition-shadow dark:border-white/10 dark:bg-transparent dark:text-white">
              <h3 className="text-lg font-medium">{p.title}</h3>
              <p className="mt-2 text-sm text-hero dark:text-white/70">{p.desc}</p>
              <p className="mt-3 text-xs text-muted dark:text-white/60">{p.stack}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <a className="underline underline-offset-4 hover:opacity-80" href={p.links.github} target="_blank" rel="noreferrer">GitHub</a>
                <a className="underline underline-offset-4 hover:opacity-80" href={p.links.live} target="_blank" rel="noreferrer">Live</a>
                <a className="underline underline-offset-4 hover:opacity-80" href={p.links.demo} target="_blank" rel="noreferrer">Demo</a>
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        id="contact"
        className="mx-auto max-w-5xl px-4 py-16 md:py-24 text-hero dark:text-white"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold">Reach out to me</h2>
        <p className="mt-4 text-hero dark:text-white">
          Feel free to reach out via email, LinkedIn, or Twitter for any queries, collaboration opportunities, or further details.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a className="rounded-full border px-5 py-2 border-slate-400 text-hero bg-white shadow-sm hover:bg-slate-50 hover:shadow-md dark:border-white/20 dark:bg-transparent dark:hover:bg-white/10" href="https://x.com/ratan_he" target="_blank" rel="noreferrer">Twitter</a>
          <a className="rounded-full border px-5 py-2 border-slate-400 text-hero bg-white shadow-sm hover:bg-slate-50 hover:shadow-md dark:border-white/20 dark:bg-transparent dark:hover:bg-white/10" href="https://www.linkedin.com/in/ratan-here/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="rounded-full border px-5 py-2 border-slate-400 text-hero bg-white shadow-sm hover:bg-slate-50 hover:shadow-md dark:border-white/20 dark:bg-transparent dark:hover:bg-white/10" href="mailto:ratanyadavvkr@gmail.com">Email</a>
        </div>
      </motion.section>

     <footer
         className="mx-auto max-w-6xl px-4 py-10 text-xs transition-colors duration-300"
         style={{ color: "rgb(var(--fg))" }}
       >
       © {new Date().getFullYear()} Ratan Yadav. All rights reserved.
      </footer>

    </div>
  );
}
