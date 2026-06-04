"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

/* ─── Floating Code Snippets ─── */
const codeSnippets = [
  { text: 'const developer = "Gong Yoo";', x: "5%", y: "15%", delay: 0 },
  { text: "async function buildApp() {", x: "75%", y: "10%", delay: 2 },
  { text: "  return <Portfolio />", x: "80%", y: "55%", delay: 4 },
  { text: "npm run deploy --prod", x: "8%", y: "70%", delay: 6 },
  { text: "git commit -m 'perfection'", x: "65%", y: "80%", delay: 3 },
  { text: "export default function Hero()", x: "12%", y: "42%", delay: 5 },
  { text: "const stack = [React, Next, Node]", x: "70%", y: "35%", delay: 1 },
  { text: "// building the future", x: "3%", y: "88%", delay: 7 },
];

/* ─── Particle System ─── */
function Particles() {
  const [particles, setParticles] = useState<
    { w: number; h: number; left: number; top: number; color: string; dur: number; del: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        return {
          w: size,
          h: size,
          left: Math.random() * 100,
          top: Math.random() * 100,
          color:
            i % 3 === 0
              ? "rgba(232, 168, 73, 0.3)"
              : i % 3 === 1
              ? "rgba(62, 232, 181, 0.25)"
              : "rgba(232, 90, 110, 0.2)",
          dur: 6 + Math.random() * 8,
          del: Math.random() * 5,
        };
      })
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${p.w}px`,
            height: `${p.h}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: p.color,
            animation: `particle-float ${p.dur}s ease-in-out infinite`,
            animationDelay: `${p.del}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Terminal Code Widget ─── */
function TerminalWidget() {
  const [visibleLines, setVisibleLines] = useState(0);

  const lines = [
    { prompt: true, text: "whoami" },
    { prompt: false, text: "Gong Yoo — Full Stack Developer" },
    { prompt: true, text: "cat skills.json" },
    { prompt: false, text: '{ "frontend": "React, Next.js, TS" }' },
    { prompt: false, text: '{ "backend": "Node.js, Python, Go" }' },
    { prompt: true, text: "echo $STATUS" },
    { prompt: false, text: "✓ Available for hire", isGreen: true },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= lines.length) {
          setTimeout(() => setVisibleLines(0), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [lines.length]);

  return (
    <motion.div
      className="terminal-widget w-full"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.8, duration: 0.8 }}
    >
      <div className="terminal-header">
        <div className="terminal-dot" style={{ background: "#e85a6e" }} />
        <div className="terminal-dot" style={{ background: "#e8a849" }} />
        <div className="terminal-dot" style={{ background: "#3ee8b5" }} />
        <span
          className="ml-3 text-xs"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          gongyoo@dev ~
        </span>
      </div>
      <div className="terminal-body">
        {lines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-2"
          >
            {line.prompt ? (
              <>
                <span style={{ color: "var(--accent-secondary)" }}>❯</span>
                <span style={{ color: "var(--text-primary)" }}>{line.text}</span>
              </>
            ) : (
              <span
                className="ml-4"
                style={{
                  color: line.isGreen
                    ? "var(--accent-secondary)"
                    : "var(--text-secondary)",
                }}
              >
                {line.text}
              </span>
            )}
          </motion.div>
        ))}
        {visibleLines < lines.length && (
          <span
            className="inline-block w-2 h-4 ml-4"
            style={{
              background: "var(--accent-primary)",
              animation: "typewriter-cursor 1s ease-in-out infinite",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

/* ─── HERO SECTION ─── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleFade = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  /* GSAP entrance animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title-line",
        { y: 80, opacity: 0, skewY: 3 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        ".hero-bio",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.9, ease: "power2.out" }
      );

      gsap.fromTo(
        ".hero-btn",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 1.2,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".hero-tech",
        { y: 20, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          delay: 1.5,
          ease: "back.out(1.7)",
        }
      );

      gsap.fromTo(
        ".hero-image-gsap",
        { x: 80, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: 0.5,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".code-float",
        { opacity: 0 },
        {
          opacity: 0.12,
          duration: 2,
          stagger: 0.3,
          delay: 2,
          ease: "power1.inOut",
        }
      );

      gsap.to(".scanline", {
        y: "100vh",
        duration: 4,
        repeat: -1,
        ease: "none",
        delay: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Mouse parallax for image */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 15;
      const y = (clientY / innerHeight - 0.5) * 15;

      gsap.to(imageRef.current, {
        rotateY: x,
        rotateX: -y,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const techStack = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Docker",
    "AWS",
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-section"
      style={{ perspective: "1000px" }}
    >
      {/* Ambient Orbs */}
      <motion.div
        className="orb orb-primary"
        style={{
          width: "500px",
          height: "500px",
          top: "-10%",
          right: "-10%",
          y: yParallaxSlow,
        }}
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb-secondary"
        style={{
          width: "350px",
          height: "350px",
          bottom: "5%",
          left: "-5%",
          y: yParallax,
        }}
        animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb-tertiary"
        style={{
          width: "250px",
          height: "250px",
          top: "50%",
          left: "40%",
        }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Code Elements — hidden on small screens */}
      <div className="hidden md:block">
        {codeSnippets.map((snippet, i) => (
          <motion.div
            key={i}
            className="code-float cursor-grab active:cursor-grabbing"
            style={{
              left: snippet.x,
              top: snippet.y,
              zIndex: 10,
            }}
            drag
            dragConstraints={sectionRef}
            dragElastic={0.2}
            whileHover={{ scale: 1.1, color: "var(--accent-secondary)" }}
            whileDrag={{ scale: 1.2, color: "var(--accent-primary)", zIndex: 100 }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.08, 0.18, 0.08],
            }}
            transition={{
              y: {
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: {
                duration: 8 + i,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {snippet.text}
          </motion.div>
        ))}
      </div>

      {/* Scan Line */}
      <div
        className="scanline absolute left-0 w-full h-[1px] z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(232, 168, 73, 0.06), transparent)",
          top: "-100%",
        }}
      />

      {/* Particles */}
      <Particles />

      {/* ═══ MAIN CONTENT ═══ */}
      <motion.div
        className=""
        style={{ opacity: opacityFade, scale: scaleFade }}
      >
        {/* ── Two-column hero layout ── */}
        <div className="hero-layout">
          {/* LEFT — Text Content */}
          <div className="hero-text">
            {/* Status Badge */}
            <motion.div
              className="hero-title-line hero-status-badge cursor-grab active:cursor-grabbing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.4}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="status-dot animate-pulse" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent-secondary)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                }}
              >
                Available for work
              </span>
            </motion.div>

            {/* Name */}
            <div className="flex items-center gap-x-4 mb-1 overflow-hidden">
              <h1
                ref={titleRef}
                className="hero-title-line hero-name"
              >
                <span className="text-gradient-primary text-glow">Gong</span>
              </h1>
              <h1 className="hero-title-line hero-name">
                <span className="text-gradient-warm text-glow">Yoo</span>
                <span className="hero-name-dot" />
              </h1>
            </div>
            <div className="overflow-hidden mb-3">
           
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden mb-5">
              <p className="hero-title-line hero-subtitle">
                Full Stack{" "}
                <span className="text-gradient-cool" style={{ fontWeight: 500 }}>
                  Web Developer
                </span>
              </p>
            </div>

            {/* Bio */}
            <p className="hero-bio hero-bio-text">
              Crafting powerful web experiences from front to back. I build fast,
              scalable, and user-friendly web applications with mastery of both
              client-side and server-side technologies.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons">
              <motion.a
                href="#projects"
                className="hero-btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="hero-btn btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Get In Touch
              </motion.a>
            </div>

            {/* Tech Tags */}
            <div className="hero-tags">
              {techStack.map((tech) => (
                <motion.span
                  key={tech}
                  className="hero-tech tech-tag"
                  whileHover={{ scale: 1.08, y: -2 }}
                >
                  <span
                    style={{ color: "var(--accent-primary)", fontSize: "0.5rem" }}
                  >
                    ●
                  </span>
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* RIGHT — Image + Terminal */}
          <div className="hero-visual flex flex-col md:flex-row items-center gap-8 w-full md:max-w-[760px]">
            {/* Image */}
            <div
              className="hero-image-gsap hero-image-wrap"
              ref={imageRef}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="corner-decoration top-left" />
              <div className="corner-decoration top-right" />
              <div className="corner-decoration bottom-left" />
              <div className="corner-decoration bottom-right" />

              <div className="hero-image-container">
                <Image
                  src="/Main_pic.jpeg"
                  alt="Gong Yoo — Full Stack Web Developer"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 480px) 200px, (max-width: 768px) 240px, (max-width: 1024px) 280px, 340px"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10, 10, 15, 0.6), transparent 40%)",
                  }}
                />
              </div>

              {/* Location badge */}
              <motion.div
                className="hero-location-badge"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent-primary)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {"{ "}Seoul, KR{" }"}
                </span>
              </motion.div>
            </div>

            {/* Terminal Widget */}
            <TerminalWidget />
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          {[
            { value: "6+", label: "Years Experience" },
            { value: "50K+", label: "Users Served" },
            { value: "15+", label: "Projects Built" },
            { value: "5", label: "Certifications" },
          ].map((stat) => (
            <div key={stat.label} className="hero-stat-item">
              <p className="hero-stat-value text-gradient-primary">
                {stat.value}
              </p>
              <p className="hero-stat-label">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <div className="scroll-line" />
        <span className="scroll-text">Scroll</span>
      </motion.div>
    </section>
  );
}
