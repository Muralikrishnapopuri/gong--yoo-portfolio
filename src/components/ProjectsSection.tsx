"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { playSound } from "@/utils/sound";

const projects = [
  {
    id: 1,
    name: "RestoSoft Offline POS",
    letter: "R",
    description: "An offline-first Windows POS system featuring local LAN synchronization, bidirectionally replicated cloud databases, and hardware-level silent thermal printing.",
    tech: ["Electron", "React", "TypeScript", "Node.js", "SQLite"]
  },
  {
    id: 2,
    name: "Zestchat Messenger",
    letter: "Z",
    description: "A real-time messaging application featuring custom database architectures (connection pools), Sharp media compression, guest session cleanup cron jobs, and custom emoji integrations.",
    tech: ["React", "Redux", "Node.js", "Express", "PostgreSQL", "Cloudinary"]
  },
  {
    id: 3,
    name: "Pixel Polish Editor",
    letter: "P",
    description: "A real-time client-side image editor performing fast canvas operations under 50ms, backed by robust uploads and cloud-based file delivery.",
    tech: ["React.js", "HTML5 Canvas", "Express", "Multer", "Cloudinary"]
  },
  {
    id: 4,
    name: "Beverage E-Commerce",
    letter: "B",
    description: "A responsive beverage e-commerce platform featuring secure user flows, order processing, MongoDB document queries, and API endpoints.",
    tech: ["React", "Node.js", "Express", "MongoDB", "REST APIs"]
  }
];

export default function ProjectsSection() {
  const [angle, setAngle] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [radius, setRadius] = useState(130);

  // Resize handler for responsive orbit radius
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(100);
      } else {
        setRadius(140);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Frame tick for smooth clockwise orbit rotation (pauses on hover)
  useEffect(() => {
    if (hoveredIndex !== null) return;

    let lastTime = performance.now();
    let frameId: number;

    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      // Clockwise rotation: increase the angle
      setAngle((prev) => (prev + delta * 0.0005) % (2 * Math.PI));
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [hoveredIndex]);

  return (
    <section id="projects" className="projects-section min-h-screen relative overflow-hidden py-24 px-6 flex items-center">
      <div className="content-wrapper w-full">
        <div className="section-divider mb-16 mx-auto md:mx-0" />
        
        <p className="projects-label">05. Inventory Vault</p>
        <h2 className="projects-title text-gradient-primary mb-16">Legendary Gear & Projects</h2>

        <div className="projects-layout-grid">
          
          {/* FIRST DIV: Orbiting projects container */}
          <div className="projects-orbit-container">
            {/* Center glowing orange magic ball */}
            <div 
              className="absolute w-8 h-8 rounded-full bg-[var(--accent-primary)] z-0 pointer-events-none"
              style={{
                boxShadow: "0 0 45px 18px rgba(232, 168, 73, 0.45)",
                filter: hoveredIndex !== null ? "blur(6px)" : "none",
                opacity: hoveredIndex !== null ? 0.15 : 1,
                transition: "all 0.5s ease",
              }}
            />

            {/* Orbiting Square Project Objects */}
            {projects.map((project, i) => {
              const isHovered = hoveredIndex === i;
              const isAnyHovered = hoveredIndex !== null;
              
              // Base angle calculation for 4 projects distributed symmetrically
              const angleRad = angle + (i * Math.PI) / 2;
              
              // Coordinates: if hovered, slide to the center. Otherwise, orbit.
              const x = isHovered ? 0 : radius * Math.cos(angleRad);
              const y = isHovered ? 0 : radius * Math.sin(angleRad);

              // Responsive size constraints
              const width = isHovered ? (typeof window !== "undefined" && window.innerWidth < 480 ? 280 : 340) : 64;
              const height = isHovered ? 230 : 64;
              const opacity = isHovered ? 1 : (isAnyHovered ? 0.05 : 0.85);

              return (
                <motion.div
                  key={project.id}
                  style={{
                    x,
                    y,
                    width,
                    height,
                    position: "absolute",
                    zIndex: isHovered ? 100 : 10,
                  }}
                  animate={{
                    x,
                    y,
                    width,
                    height,
                    opacity,
                    filter: isAnyHovered && !isHovered ? "blur(4px)" : "blur(0px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 85,
                    damping: 16,
                  }}
                  onMouseEnter={() => {
                    setHoveredIndex(i);
                    playSound("hover");
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => playSound("select")}
                  className="experience-carousel-card glassmorphic-card rounded-2xl overflow-hidden flex flex-col justify-center items-center cursor-pointer border border-[rgba(255,255,255,0.08)] shadow-lg"
                >
                  <AnimatePresence mode="wait">
                    {!isHovered ? (
                      // Small orbiting square object with big iconic letter
                      <motion.div
                        key="icon-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center w-full h-full"
                      >
                        <span className="text-xl font-bold text-gradient-primary font-mono select-none">
                          {project.letter}
                        </span>
                      </motion.div>
                    ) : (
                      // Hovered expanded details card (rectangle shape)
                      <motion.div
                        key="details-state"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1.0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full p-6 flex flex-col justify-between items-start text-left"
                      >
                        <div className="w-full">
                          <span className="text-[10px] font-mono text-[var(--accent-secondary)] uppercase tracking-widest mb-1 block">
                            EQUIPMENT SLOT {project.id}
                          </span>
                          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                            {project.name}
                          </h3>
                          <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-4">
                            {project.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-4 w-full">
                          {project.tech.map((t, idx) => (
                            <span key={idx} className="tech-tag text-[9px] py-0.5 px-2 rounded-md">
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* SECOND DIV: Glow color-shifting image widget */}
          <div className="projects-image-col flex items-center justify-center">
            <div className="projects-image-container">
              <Image
                src="/inventory_vault.jpg"
                alt="Murali Krishna — Projects Accent"
                fill
                sizes="(max-width: 1024px) 220px, 220px"
                className="object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
