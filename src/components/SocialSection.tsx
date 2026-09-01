"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { playSound } from "@/utils/sound";

export default function SocialSection() {
  return (
    <section id="social" className="social-section py-20 px-6 relative overflow-hidden">
      <div className="content-wrapper w-full">
        <div className="section-divider mb-12 mx-auto md:mx-0" />
        
        <p className="social-label text-[10px] font-mono text-[var(--accent-primary)] uppercase tracking-wider block mb-2">08. Digital Influence</p>
        <h2 className="social-title text-gradient-primary mb-12">Social Hub & Community Reach</h2>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left: Holographic profile card image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[250px] shrink-0 flex justify-center"
          >
            <div className="relative w-full max-w-[240px] aspect-square rounded-2xl overflow-hidden border border-[rgba(232,168,73,0.2)] shadow-[0_0_25px_rgba(232,168,73,0.1)] bg-[rgba(10,10,15,0.4)] group">
              <Image
                src="/new_instaprofilecard_image_usethis_directly.jpg"
                alt="Instagram Profile Card - Gong Yoo"
                fill
                sizes="(max-width: 1024px) 240px, 240px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              {/* Theme Gradient overlay hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(232,168,73,0.15)] via-[rgba(62,232,181,0.05)] to-[rgba(232,90,110,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* Right: Channel stats and description for online clients */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col gap-6"
          >
            <div className="glassmorphic-card p-8 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(10,10,15,0.4)]">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <span>📸</span> @krishhu.exe
              </h3>
              
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                Active content creator with a community of <strong>11,000+ developers, designers, and tech enthusiasts</strong>. I merge engineering with digital reach, sharing interactive code tutorials, design systems, and developer aesthetics.
              </p>

              {/* Stats Block Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border border-[rgba(255,255,255,0.05)] p-4 rounded-xl bg-[rgba(255,255,255,0.01)]">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block mb-1">AUDIENCE</span>
                  <span className="text-xl font-bold text-[var(--accent-secondary)]">11K+ Followers</span>
                </div>
                <div className="border border-[rgba(255,255,255,0.05)] p-4 rounded-xl bg-[rgba(255,255,255,0.01)]">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block mb-1">NICHE</span>
                  <span className="text-base font-bold text-[var(--accent-primary)]">Creative Dev / UI</span>
                </div>
              </div>

              <div className="border-t border-[rgba(255,255,255,0.05)] pt-6">
                <h4 className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase mb-3">Client Value & Sponsor Synergy:</h4>
                <ul className="flex flex-col gap-2.5 text-xs text-[var(--text-muted)]">
                  <li className="flex gap-2">
                    <span className="text-[var(--accent-secondary)]">✦</span>
                    <span><strong>High Visibility</strong>: Instantly showcase custom applications, billing products, and web systems to a direct tech audience.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--accent-secondary)]">✦</span>
                    <span><strong>Influencer Credibility</strong>: Proven ability to explain complex code schemas simply, building client trust.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--accent-secondary)]">✦</span>
                    <span><strong>Sponsorship Ready</strong>: Open for tech tools integrations, SaaS promotions, and developer advocacy.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://www.instagram.com/krishhu.exe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("select")}
                  onMouseEnter={() => playSound("hover")}
                  className="btn-primary flex items-center gap-2"
                >
                  <span>📷</span> Explore Channel
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
