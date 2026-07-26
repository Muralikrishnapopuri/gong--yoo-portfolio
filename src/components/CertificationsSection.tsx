"use client";

import { motion } from "framer-motion";
import { playSound } from "@/utils/sound";
import Image from "next/image";

const achievements = [
  {
    title: "Offline POS Architect",
    issuer: "YoungMinds Technology",
    year: "POS Quest",
    icon: "🔌",
    color: "rgba(232, 168, 73, 0.15)",
    glow: "rgba(232, 168, 73, 0.3)",
    desc: "Built local offline POS with Electron/SQLite working without internet."
  },
  {
    title: "Speed Canvas Filter",
    issuer: "Pixel Polish Project",
    year: "Canvas Quest",
    icon: "⚡",
    color: "rgba(62, 232, 181, 0.15)",
    glow: "rgba(62, 232, 181, 0.3)",
    desc: "Engineered client-side canvas photo filter operations under 50ms."
  },
  {
    title: "CS Query Crusher",
    issuer: "Chegg India",
    year: "Mentor Quest",
    icon: "🎓",
    color: "rgba(232, 90, 110, 0.15)",
    glow: "rgba(232, 90, 110, 0.3)",
    desc: "Resolved 150+ complex computer science and web queries."
  },
  {
    title: "LAN Sync Connector",
    issuer: "YoungMinds Technology",
    year: "Network Quest",
    icon: "🌐",
    color: "rgba(62, 232, 181, 0.15)",
    glow: "rgba(62, 232, 181, 0.3)",
    desc: "Established real-time terminal synchronization over local IP."
  },
  {
    title: "Real-time Redux Chat",
    issuer: "Zestchat Project",
    year: "Social Quest",
    icon: "💬",
    color: "rgba(232, 168, 73, 0.15)",
    glow: "rgba(232, 168, 73, 0.3)",
    desc: "Built full real-time messaging with active guest cleanup."
  }
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="certifications-section py-20 px-6 relative overflow-hidden">
      <div className="content-wrapper w-full">
        <div className="section-divider mb-12 mx-auto md:mx-0" />
        
        <p className="certifications-label">07. Campaign Achievements</p>
        <h2 className="certifications-title text-gradient-primary mb-12">Trophy Room (Key Achievements)</h2>

        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Left: Card grid list of achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => playSound("hover")}
                onClick={() => playSound("select")}
                whileHover={{ 
                  y: -5,
                  borderColor: item.glow,
                  boxShadow: `0 10px 30px ${item.glow}`
                }}
                className="cert-card glassmorphic-card p-6 rounded-2xl flex items-center gap-5 border border-[rgba(255,255,255,0.05)] cursor-pointer transition-all duration-300"
              >
                {/* Badge Icon Cylinder */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-[rgba(255,255,255,0.08)]"
                  style={{ 
                    background: item.color,
                    boxShadow: `0 0 15px ${item.color}`
                  }}
                >
                  {item.icon}
                </div>

                {/* Text Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] font-medium mb-1">
                    {item.issuer}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Year Stamp */}
                <span className="text-[10px] font-mono text-[var(--accent-primary)] bg-[rgba(232,168,73,0.08)] py-1 px-3.5 rounded-full border border-[rgba(232,168,73,0.12)] shrink-0 self-start mt-1">
                  {item.year}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Right: Small achievements accent image */}
          <div className="lg:w-[320px] w-full shrink-0 flex items-center justify-center">
            <div 
              className="relative w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden border border-[rgba(232,168,73,0.15)] shadow-[0_0_25px_rgba(232,168,73,0.08)] bg-[rgba(10,10,15,0.4)]"
              style={{ minHeight: "340px" }}
            >
              <Image
                src="/professional_achievements.jpg"
                alt="Murali Krishna — Professional Achievements Accent"
                fill
                sizes="(max-width: 1024px) 320px, 320px"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
