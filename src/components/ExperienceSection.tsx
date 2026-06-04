"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const jobs = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "NexaCloud Solutions",
    duration: "2022 – Present",
    responsibilities: [
      "Led development of a SaaS platform serving 50,000+ users.",
      "Architected microservices backend with Node.js and PostgreSQL.",
      "Built dynamic React dashboards with real-time data using WebSockets.",
      "Reduced page load time by 40% through code splitting and lazy loading."
    ]
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "BrightByte Agency",
    duration: "2020 – 2022",
    responsibilities: [
      "Developed and maintained 15+ client web applications.",
      "Collaborated with UI/UX designers to implement pixel-perfect interfaces.",
      "Built RESTful APIs consumed by both web and mobile clients.",
      "Integrated third-party services including Stripe, Twilio, and Mapbox."
    ]
  },
  {
    id: 3,
    title: "Junior Web Developer",
    company: "DevStart Labs",
    duration: "2018 – 2020",
    responsibilities: [
      "Assisted in building e-commerce websites using React and Django.",
      "Maintained and improved legacy codebases.",
      "Wrote unit and integration tests using Jest and Pytest."
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
          src="/Pic_2.jpeg"
          alt="Gong Yoo Profile accent"
          width={64}
          height={64}
          className="object-cover w-full h-full rounded-full grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>

      <div className="content-wrapper w-full">
        <div className="section-divider mb-16 mx-auto md:mx-0" />
        
        <p className="experience-label">04. Professional Journey</p>
        <h2 className="experience-title text-gradient-primary mb-12">Employment History</h2>

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
                className="experience-card glassmorphic-card"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
                }}
              >
                <div className="experience-card-header flex justify-between items-start gap-4 flex-wrap mb-4">
                  <div>
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
                    className="absolute w-[280px] sm:w-[320px] experience-carousel-card glassmorphic-card p-6 rounded-2xl flex flex-col justify-between"
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
