"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSound } from "@/utils/sound";

export default function EducationSection() {
  const [pageIndex, setPageIndex] = useState(0); // 0 = Spread 1, 1 = Spread 2
  const [isAutoTurning, setIsAutoTurning] = useState(true);

  // Automatic page turning cycle (every 6 seconds)
  useEffect(() => {
    if (!isAutoTurning) return;
    const interval = setInterval(() => {
      setPageIndex((prev) => {
        const nextIdx = prev === 0 ? 1 : 0;
        playSound("hover");
        return nextIdx;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoTurning]);

  // Turn page forward
  const turnNext = () => {
    setIsAutoTurning(false);
    setPageIndex(1);
    playSound("click");
  };

  // Turn page backward
  const turnPrev = () => {
    setIsAutoTurning(false);
    setPageIndex(0);
    playSound("click");
  };

  return (
    <section id="education" className="education-section min-h-screen relative overflow-hidden py-24 px-6 flex items-center">
      <div className="content-wrapper w-full">
        <div className="section-divider mb-16 mx-auto md:mx-0" />
        
        <p className="education-label">06. Academic Foundation</p>
        <h2 className="education-title text-gradient-primary mb-16">Education & Learning</h2>

        <div className="education-book-wrapper flex flex-col items-center justify-center">
          
          {/* Responsive scale container for mobile compatibility */}
          <div className="book-scale-container">
            <div className="book-perspective">
              
              <div className="book-wrap">
                {/* Book Spine Centerline */}
                <div className="book-spine" />

                {/* STATIC LEFT PAGE (Always visible underneath on the left; displays Spread 1 details) */}
                <div className="absolute top-0 left-0 w-[320px] h-full book-page book-page-left cursor-pointer" onClick={turnPrev}>
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <span className="text-[10px] font-mono text-[var(--accent-primary)] uppercase tracking-wider block mb-1">
                        Higher Education
                      </span>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] leading-tight mb-2">
                        Bachelor of Technology in Computer Science
                      </h3>
                      <p className="text-sm font-semibold text-[var(--accent-secondary)] mb-4">
                        Amrita Sai Institute of Science & Technology
                      </p>
                    </div>

                    <div className="border-t border-[rgba(255,255,255,0.06)] pt-4 flex-1">
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
                        Focused on software engineering, data structures, database management systems, and core computer science fundamentals.
                      </p>
                      <span className="inline-block text-[10px] font-mono bg-[rgba(62,232,181,0.1)] text-[var(--accent-secondary)] py-1 px-3 rounded-full border border-[rgba(62,232,181,0.15)]">
                        CGPA: 7.35 / 10
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)] mt-4">
                      <span>2019 – 2023</span>
                      <span>Page 01</span>
                    </div>
                  </div>
                </div>

                {/* STATIC RIGHT PAGE (Always visible underneath on the right; displays Spread 2 details) */}
                <div className="absolute top-0 right-0 w-[320px] h-full book-page book-page-right cursor-pointer" onClick={turnNext}>
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <span className="text-[10px] font-mono text-[var(--accent-secondary)] uppercase tracking-wider block mb-1">
                        Practical Application
                      </span>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] leading-tight mb-2">
                        Technical Milestones
                      </h3>
                      <p className="text-sm font-semibold text-[var(--accent-primary)] mb-4">
                        Offline-First Systems
                      </p>
                    </div>

                    <div className="border-t border-[rgba(255,255,255,0.06)] pt-4 flex-1">
                      <ul className="flex flex-col gap-2.5 text-xs text-[var(--text-secondary)]">
                        <li className="flex gap-2">
                          <span className="text-[var(--accent-primary)]">✔</span>
                          Developed RestoSoft POS operating offline with zero internet
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[var(--accent-primary)]">✔</span>
                          Resolved 150+ queries as Chegg CS Subject Matter Expert
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[var(--accent-primary)]">✔</span>
                          Built real-time messaging structures with custom pools
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)] mt-4">
                      <span>Self-Guided Quest</span>
                      <span>Page 04</span>
                    </div>
                  </div>
                </div>

                {/* 3D FLIPPING PAGE SHEET */}
                <motion.div
                  className="absolute top-0 right-0 w-[320px] h-full"
                  style={{
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    zIndex: pageIndex === 0 ? 30 : 5,
                  }}
                  animate={{ rotateY: pageIndex === 0 ? 0 : -180 }}
                  transition={{ duration: 1.0, ease: "easeInOut" }}
                >
                  {/* FRONT SIDE (visible on the right in Spread 1) */}
                  <div 
                    className="absolute inset-0 w-full h-full book-page book-page-right cursor-pointer"
                    style={{ backfaceVisibility: "hidden" }}
                    onClick={turnNext}
                  >
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <span className="text-[10px] font-mono text-[var(--accent-primary)] uppercase tracking-wider block mb-1">
                          Academic Note
                        </span>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] leading-tight mb-2">
                          Core Focus Areas
                        </h3>
                        <p className="text-sm font-semibold text-[var(--text-secondary)] mb-4">
                          Amrita Sai CS Dept
                        </p>
                      </div>

                      <div className="border-t border-[rgba(255,255,255,0.06)] pt-4 flex-1">
                        <ul className="flex flex-col gap-2.5 text-xs text-[var(--text-secondary)]">
                          <li className="flex gap-2">
                            <span className="text-[var(--accent-primary)]">★</span>
                            Distributed LAN networks & real-time sync systems
                          </li>
                          <li className="flex gap-2">
                            <span className="text-[var(--accent-primary)]">★</span>
                            Relational database schema indexing & structure
                          </li>
                          <li className="flex gap-2">
                            <span className="text-[var(--accent-primary)]">★</span>
                            High-speed dynamic filters (HTML5 Canvas)
                          </li>
                        </ul>
                      </div>

                      <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)] mt-4">
                        <span>Academic Records</span>
                        <span>Page 02</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE (visible on the left in Spread 2 after flip) */}
                  <div 
                    className="absolute inset-0 w-full h-full book-page book-page-left cursor-pointer"
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)" 
                    }}
                    onClick={turnPrev}
                  >
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <span className="text-[10px] font-mono text-[var(--accent-secondary)] uppercase tracking-wider block mb-1">
                          Continuous Learning
                        </span>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] leading-tight mb-2">
                          Real-World Deployments
                        </h3>
                        <p className="text-sm font-semibold text-[var(--accent-secondary)] mb-4">
                          RestoSoft & Zestchat Specializations
                        </p>
                      </div>

                      <div className="border-t border-[rgba(255,255,255,0.06)] pt-4 flex-1">
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
                          Successfully built and deployed live apps (zestchat.vercel.app, pixelpolish.vercel.app, biz.restosoftindia.in) demonstrating expert integration of Node, React, and local environments.
                        </p>
                        <span className="inline-block text-[10px] font-mono bg-[rgba(232,168,73,0.1)] text-[var(--accent-primary)] py-1 px-3 rounded-full border border-[rgba(232,168,73,0.15)]">
                          Production Ready
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)] mt-4">
                        <span>2019 – Present</span>
                        <span>Page 03</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>

          {/* Book navigation controllers */}
          <div className="flex items-center gap-6 mt-8">
            <button
              onClick={turnPrev}
              disabled={pageIndex === 0}
              className={`p-2 rounded-full border border-[rgba(255,255,255,0.15)] flex items-center justify-center transition-all ${
                pageIndex === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[var(--accent-primary)] active:scale-95"
              }`}
              style={{ width: "40px", height: "40px" }}
              aria-label="Previous Page"
            >
              <span className="text-sm text-[var(--text-primary)]">◀</span>
            </button>

            {/* Page indicators */}
            <div className="flex gap-1.5">
              <span
                onClick={() => {
                  setIsAutoTurning(false);
                  setPageIndex(0);
                }}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                  pageIndex === 0 ? "bg-[var(--accent-primary)] w-5" : "bg-[rgba(255,255,255,0.2)]"
                }`}
              />
              <span
                onClick={() => {
                  setIsAutoTurning(false);
                  setPageIndex(1);
                }}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                  pageIndex === 1 ? "bg-[var(--accent-primary)] w-5" : "bg-[rgba(255,255,255,0.2)]"
                }`}
              />
            </div>

            <button
              onClick={turnNext}
              disabled={pageIndex === 1}
              className={`p-2 rounded-full border border-[rgba(255,255,255,0.15)] flex items-center justify-center transition-all ${
                pageIndex === 1
                  ? "opacity-30 cursor-not-allowed"
                  : "bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[var(--accent-primary)] active:scale-95"
              }`}
              style={{ width: "40px", height: "40px" }}
              aria-label="Next Page"
            >
              <span className="text-sm text-[var(--text-primary)]">▶</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
