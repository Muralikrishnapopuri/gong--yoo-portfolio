"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSound } from "@/utils/sound";

const testimonials = [
  {
    name: "Deva",
    role: "Engineering Lead, YoungMinds Tech Solutions",
    quote: "Murali's work on RestoSoft POS was a masterclass in offline-first systems. He designed the SQLite local replication engine and silent thermal printing queue, resulting in zero-latency billing operations with zero internet.",
    avatar: "👤",
    glow: "rgba(232, 168, 73, 0.2)"
  },
  {
    name: "Vamsi",
    role: "Project Manager, YoungMinds Tech Solutions",
    quote: "Murali is a highly resourceful full-stack engineer. He delivered our 4 role-based web modules on time, and his real-time order updates system using long polling was extremely stable.",
    avatar: "👤",
    glow: "rgba(62, 232, 181, 0.2)"
  },
  {
    name: "Anjali Rao",
    role: "CS Advisor, Amrita Sai CS Department",
    quote: "Murali is a dedicated problem solver. His contribution as a Chegg Subject Matter Expert resolving 150+ complex web queries shows his deep mastery of algorithms and software engineering.",
    avatar: "👤",
    glow: "rgba(232, 90, 110, 0.2)"
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % testimonials.length;
        playSound("hover");
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    playSound("click");
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    playSound("click");
  };


  return (
    <section id="testimonials" className="testimonials-section py-20 px-6 relative overflow-hidden">
      <div className="content-wrapper w-full">
        <div className="section-divider mb-12 mx-auto md:mx-0" />
        
        <div className="testimonials-layout">
          {/* LEFT: Section Description + Navigation Buttons */}
          <div className="testimonials-info">
            <p className="testimonials-label">08. Client Reviews</p>
            <h2 className="testimonials-title text-gradient-primary mb-6">Testimonials</h2>
            <p className="testimonials-desc text-sm text-[var(--text-secondary)] leading-relaxed mb-8 max-w-sm">
              Here is what colleagues and leaders say about collaborating with me to ship web applications.
            </p>
            
            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                className="p-3.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.06)] hover:border-[var(--accent-primary)] active:scale-95 transition-all text-xs"
                aria-label="Previous Review"
              >
                ◀
              </button>
              <button
                onClick={handleNext}
                className="p-3.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.06)] hover:border-[var(--accent-primary)] active:scale-95 transition-all text-xs"
                aria-label="Next Review"
              >
                ▶
              </button>
            </div>
          </div>

          {/* RIGHT: Slide Card containing Quote */}
          <div className="testimonials-carousel flex items-center justify-center min-h-[280px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="testimonial-card glassmorphic-card p-8 rounded-2xl w-full max-w-[500px] border border-[rgba(255,255,255,0.05)] flex flex-col justify-between"
                style={{
                  boxShadow: `0 10px 40px -10px ${testimonials[activeIndex].glow}`
                }}
              >
                {/* Quote details */}
                <div>
                  <span className="quote-mark text-6xl text-[rgba(255,255,255,0.05)] font-serif select-none leading-[0] block h-4">
                    &ldquo;
                  </span>
                  <p className="text-sm sm:text-base italic text-[var(--text-secondary)] leading-relaxed mb-6 pt-4">
                    {testimonials[activeIndex].quote}
                  </p>
                </div>

                {/* Footer detailing the Person */}
                <div className="flex items-center gap-4 border-t border-[rgba(255,255,255,0.05)] pt-5">
                  <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-lg select-none">
                    {testimonials[activeIndex].avatar}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">
                      {testimonials[activeIndex].name}
                    </h3>
                    <p className="text-xs text-[var(--accent-primary)]">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
