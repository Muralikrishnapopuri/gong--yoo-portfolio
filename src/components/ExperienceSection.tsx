"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { playSound } from "@/utils/sound";

const jobs = [
  {
    id: 1,
    title: "Full-Stack Developer",
    company: "YoungMinds Technology Solutions",
    duration: "Feb 2025 – Present",
    status: "Active Campaign",
    responsibilities: [
      "Built offline-first Windows POS (Electron, React/TS, SQLite) operating with zero internet and thermal network printing.",
      "Designed real-time LAN sync system between cashier server terminals and waiter mobile applications.",
      "Engineered bi-directional sync engine for cloud-DB replication with duplication checks and auto-retry queues.",
      "Created 4 role-based web apps (Admin, Cashier, Waiter, Digital Menu) covering QSR and home delivery flows.",
      "Implemented SaaS controls, long-polling order updates, AWS S3 uploads, and WhatsApp integrations."
    ]
  },
  {
    id: 2,
    title: "Full-Stack Developer Intern",
    company: "Codtech IT Solutions",
    duration: "Sep 2024 – Oct 2024",
    status: "Quest Completed",
    responsibilities: [
      "Developed a responsive beverage e-commerce app using React, Node.js, Express, and MongoDB with REST integrations.",
      "Collaborated in an Agile team to write unit/integration tests and coordinate merges using Git version control."
    ]
  },
  {
    id: 3,
    title: "Subject Matter Expert",
    company: "Chegg India",
    duration: "Oct 2022 – Jan 2023",
    status: "Quest Completed",
    responsibilities: [
      "Resolved 150+ complex computer science and web development queries, providing detailed verified code scripts."
    ]
  }
];

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Cycle center card automatically every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % jobs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="experience" className="experience-section min-h-screen relative overflow-hidden py-24 px-6 flex items-center">
      {/* Floating decorative image badge */}
      <div className="absolute top-8 right-8 w-16 h-16 rounded-full overflow-hidden border border-[rgba(232,168,73,0.2)] shadow-[0_0_15px_rgba(232,168,73,0.1)] flex items-center justify-center bg-[rgba(10,10,15,0.6)] backdrop-blur-md z-20 group hover:scale-110 transition-transform duration-300">
        <Image
          src="/character_biography.jpg"
          alt="Murali Krishna Profile accent"
          width={64}
          height={64}
          className="object-cover w-full h-full rounded-full grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>

      <div className="content-wrapper w-full">
        <div className="section-divider mb-16 mx-auto md:mx-0" />
        
        <p className="experience-label">04. Professional Achievements</p>
        <h2 className="experience-title text-gradient-primary mb-12">Quest Log (Experience)</h2>

        <div className="experience-layout-grid">
          
          {/* LEFT: Experience List Cards adding one-by-one */}
          <motion.div 
            className="experience-list-col flex flex-col gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                className="experience-card glassmorphic-card cursor-pointer"
                onMouseEnter={() => playSound("hover")}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
                }}
              >
                <div className="experience-card-header flex justify-between items-start gap-4 flex-wrap mb-4">
                  <div>
                    <span className="text-[9px] font-mono text-[var(--accent-secondary)] uppercase tracking-wider block mb-1">
                      {job.status}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{job.title}</h3>
                    <p className="text-sm text-[var(--accent-primary)] font-medium">{job.company}</p>
                  </div>
                  <span className="experience-duration text-xs font-mono bg-[rgba(232,168,73,0.1)] text-[var(--accent-primary)] py-1 px-3 rounded-full border border-[rgba(232,168,73,0.15)]">
                    {job.duration}
                  </span>
                </div>
                <ul className="experience-responsibilities-list flex flex-col gap-2.5">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <span className="text-[var(--accent-secondary)] mt-1.5 shrink-0">❖</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* RIGHT: Moving 3D Loop Cards Showcase */}
          <div className="experience-loop-col flex flex-col justify-center items-center relative min-h-[460px] w-full">
            <div className="carousel-container relative w-full h-[400px] flex items-center justify-center overflow-visible">
              {jobs.map((job, i) => {
                // Calculate position relative to activeIndex
                const offset = (i - activeIndex + jobs.length) % jobs.length;
                
                // Map offsets to positions:
                // 0: Active Center Card
                // 1: Right Card
                // 2: Left Card
                let xPosition = 0;
                let scale = 0.85;
                let zIndex = 1;
                let opacity = 0.4;
                let blur = "blur(4px)";

                if (offset === 0) {
                  xPosition = 0;
                  scale = 1.0;
                  zIndex = 10;
                  opacity = 1.0;
                  blur = "blur(0px)";
                } else if (offset === 1) {
                  xPosition = 120; // right position
                  scale = 0.85;
                  zIndex = 5;
                  opacity = 0.55;
                  blur = "blur(2px)";
                } else {
                  xPosition = -120; // left position
                  scale = 0.85;
                  zIndex = 2; // lowest z-index so it goes behind
                  opacity = 0.35;
                  blur = "blur(3px)";
                }

                return (
                  <motion.div
                    key={`carousel-${job.id}`}
                    className="absolute w-[280px] sm:w-[320px] experience-carousel-card glassmorphic-card p-6 rounded-2xl flex flex-col justify-between cursor-pointer"
                    onMouseEnter={() => playSound("hover")}
                    onClick={() => { setActiveIndex(i); playSound("click"); }}
                    style={{
                      height: "340px",
                      transformStyle: "preserve-3d",
                      zIndex,
                    }}
                    animate={{
                      x: xPosition,
                      scale,
                      opacity,
                      filter: blur,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 70,
                      damping: 18,
                    }}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-secondary)]" />
                        <h4 className="text-xs font-mono text-[var(--accent-secondary)] uppercase tracking-wider">Highlight</h4>
                      </div>
                      <h3 className="text-lg font-bold text-[var(--text-primary)] leading-snug">{job.title}</h3>
                      <p className="text-sm font-medium text-[var(--accent-primary)]">{job.company}</p>
                    </div>

                    <div className="border-t border-[rgba(255,255,255,0.06)] pt-4 mt-4 flex-1 overflow-hidden">
                      <p className="text-xs text-[var(--text-secondary)] italic leading-relaxed line-clamp-4">
                        &ldquo;{job.responsibilities[0]}&rdquo;
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <span className="text-xs font-mono text-[var(--text-muted)]">{job.duration}</span>
                      <div className="flex gap-1 shrink-0">
                        {jobs.map((_, idx) => (
                          <span
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              idx === i ? "bg-[var(--accent-primary)] w-3" : "bg-[rgba(255,255,255,0.15)]"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
