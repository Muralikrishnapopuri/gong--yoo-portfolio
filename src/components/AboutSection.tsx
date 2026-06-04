"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const images = ["/Pic_3.jpeg", "/Pic_4.jpeg"];

export default function AboutSection() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="about-section min-h-screen relative z-10 py-24 px-6 flex items-center">
      <div className="content-wrapper w-full">
        <div className="section-divider mb-16 mx-auto md:mx-0" />
        
        <div className="about-layout">
          {/* LEFT — Responsive Article Column with looping images and description */}
          <div className="about-article">
            <p className="about-label">
              03. About Me
            </p>
            <h2 className="about-title text-gradient-primary">
              A Developer at the Intersection of Design and Technology
            </h2>
            
            <div className="about-article-grid">
              {/* Image Showcase Column with white wave effect border */}
              <div className="about-image-col">
                <div className="about-wave-container-wrapper">
                  <div className="about-wave-outline" />
                  <div className="about-wave-container">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImgIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1.0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <Image
                          src={images[currentImgIndex]}
                          alt={`Gong Yoo — Profile ${currentImgIndex + 3}`}
                          fill
                          className="object-cover w-full h-full"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Description Text Column */}
              <div className="about-content">
                <p className="about-lead">
                  I&apos;m a full stack developer who thrives at the intersection of design and technology.
                </p>
                <p>
                  With years of hands-on experience building production-grade web applications, I&apos;ve developed a deep understanding of how great software works — not just on the surface, but under the hood.
                </p>
                <p>
                  I&apos;m a problem-solver at heart, constantly learning new tools and pushing the boundaries of what the web can do. When I&apos;m not coding, I&apos;m exploring new frameworks, contributing to open-source projects, or mentoring aspiring developers.
                </p>
                <p className="about-quote">
                  My philosophy is simple: write clean code, ship fast, and never stop improving.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Showcase Cards Column */}
          <div className="about-showcase">
            <div className="about-card group">
              <div className="card-twinkle-glow opacity-30" />
              <div className="about-card-inner">
                <div className="about-card-header">
                  <span className="about-card-icon">⚡</span>
                  <h3>Core Philosophy</h3>
                </div>
                <div className="about-card-body">
                  <div className="philosophy-item">
                    <span className="philosophy-num">01</span>
                    <div>
                      <h4>Clean Execution</h4>
                      <p>Writing readable, self-documenting code that scales effortlessly.</p>
                    </div>
                  </div>
                  <div className="philosophy-item">
                    <span className="philosophy-num">02</span>
                    <div>
                      <h4>Fast Shipping</h4>
                      <p>Iterating rapidly without sacrificing quality or stability.</p>
                    </div>
                  </div>
                  <div className="philosophy-item">
                    <span className="philosophy-num">03</span>
                    <div>
                      <h4>Constant Iteration</h4>
                      <p>Treating learning as a continuous process to build better web products.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
