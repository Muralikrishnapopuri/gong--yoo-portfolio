"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { playSound } from "@/utils/sound";

export default function AboutSection() {
  return (
    <section id="about" className="about-section min-h-screen relative z-10 py-24 px-6 flex items-center">
      <div className="content-wrapper w-full">
        <div className="section-divider mb-16 mx-auto md:mx-0" />
        
        <div className="about-layout">
          {/* LEFT — Biography/Origin story column */}
          <div className="about-article">
            <p className="about-label">
              03. Character Biography
            </p>
            <h2 className="about-title text-gradient-primary">
              At the Intersection of Local Hardware and Distributed Networks
            </h2>
            
            <div className="about-article-grid font-sans">
              {/* Image Showcase Column */}
              <div className="about-image-col">
                <div className="relative w-[210px] h-[260px] rounded-2xl overflow-hidden border border-[rgba(232,168,73,0.15)] shadow-[0_0_20px_rgba(232,168,73,0.08)] bg-[rgba(10,10,15,0.4)] shrink-0">
                  <Image
                    src="/character_biography.jpg"
                    alt="Murali Krishna — Character Biography"
                    fill
                    sizes="210px"
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>

              {/* Description Text Column */}
              <div className="about-content text-sm leading-relaxed">
                <p className="about-lead">
                  I&apos;m a full-stack systems engineer who builds hybrid, highly-resilient architectures.
                </p>
                <p>
                  With 2 years of hands-on experience, I specialize in crafting offline-first environments. In my current role at YoungMinds Tech, I architected a Windows POS billing application that operates natively on local databases (SQLite) and synchronizes bidirectionally with cloud servers once connectivity is restored.
                </p>
                <p>
                  I enjoy solving real-world challenges, such as establishing local network cashier and waiter synchronization, integrating silent thermal receipt printing, and building comprehensive SaaS administration panels. Beyond my primary developer quest, I have resolved 150+ complex web development queries as a Chegg Subject Matter Expert.
                </p>
                <p className="about-quote">
                  Origin Story: Armed with a B.Tech in Computer Science and a passion for network sync protocols, I turn complex web designs into fluid, game-like desktop systems.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Passive Perks Column */}
          <div className="about-showcase">
            <div 
              className="about-card group"
              onMouseEnter={() => playSound("hover")}
            >
              <div className="card-twinkle-glow opacity-30" />
              <div className="about-card-inner">
                <div className="about-card-header">
                  <span className="about-card-icon">👑</span>
                  <h3>Passive Perks (Buffs)</h3>
                </div>
                <div className="about-card-body">
                  <div className="philosophy-item">
                    <span className="philosophy-num text-[var(--accent-secondary)]">P1</span>
                    <div>
                      <h4 className="font-bold text-xs text-[var(--text-primary)]">Offline-First Resiliency</h4>
                      <p className="text-xs text-[var(--text-secondary)]">Designing POS apps that guarantee 100% billing functionality with zero active internet connection.</p>
                    </div>
                  </div>
                  <div className="philosophy-item">
                    <span className="philosophy-num text-[var(--accent-primary)]">P2</span>
                    <div>
                      <h4 className="font-bold text-xs text-[var(--text-primary)]">Hardware Integration</h4>
                      <p className="text-xs text-[var(--text-secondary)]">Interfacing directly with thermal network printers and cash drawers for instant, silent outputs.</p>
                    </div>
                  </div>
                  <div className="philosophy-item">
                    <span className="philosophy-num text-[var(--accent-tertiary)]">P3</span>
                    <div>
                      <h4 className="font-bold text-xs text-[var(--text-primary)]">Data Architech</h4>
                      <p className="text-xs text-[var(--text-secondary)]">Architecting PostgreSQL schemas using connection pooling to optimize complex data access and speed.</p>
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
