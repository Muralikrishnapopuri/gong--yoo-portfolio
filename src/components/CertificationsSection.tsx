"use client";

import { motion } from "framer-motion";

const certifications = [
  {
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    year: "2023",
    icon: "☁️",
    color: "rgba(232, 168, 73, 0.15)",
    glow: "rgba(232, 168, 73, 0.3)"
  },
  {
    title: "Meta Front-End Developer Professional",
    issuer: "Coursera",
    year: "2022",
    icon: "♾️",
    color: "rgba(62, 232, 181, 0.15)",
    glow: "rgba(62, 232, 181, 0.3)"
  },
  {
    title: "Google UX Design Certificate",
    issuer: "Coursera",
    year: "2021",
    icon: "🎨",
    color: "rgba(232, 90, 110, 0.15)",
    glow: "rgba(232, 90, 110, 0.3)"
  },
  {
    title: "MongoDB Certified Developer Associate",
    issuer: "MongoDB University",
    year: "2021",
    icon: "🍃",
    color: "rgba(62, 232, 181, 0.15)",
    glow: "rgba(62, 232, 181, 0.3)"
  },
  {
    title: "Certified Scrum Developer",
    issuer: "Scrum Alliance",
    year: "2020",
    icon: "⚙️",
    color: "rgba(232, 168, 73, 0.15)",
    glow: "rgba(232, 168, 73, 0.3)"
  }
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="certifications-section py-20 px-6 relative overflow-hidden">
      <div className="content-wrapper w-full">
        <div className="section-divider mb-12 mx-auto md:mx-0" />
        
        <p className="certifications-label">07. Credentials</p>
        <h2 className="certifications-title text-gradient-primary mb-12">Professional Certifications</h2>

        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -5,
                borderColor: cert.glow,
                boxShadow: `0 10px 30px ${cert.glow}`
              }}
              className="cert-card glassmorphic-card p-6 rounded-2xl flex items-center gap-5 border border-[rgba(255,255,255,0.05)] cursor-default transition-all duration-300"
            >
              {/* Badge Icon Cylinder */}
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-[rgba(255,255,255,0.08)]"
                style={{ 
                  background: cert.color,
                  boxShadow: `0 0 15px ${cert.color}`
                }}
              >
                {cert.icon}
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug mb-1 truncate">
                  {cert.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  {cert.issuer}
                </p>
              </div>

              {/* Year Stamp */}
              <span className="text-xs font-mono text-[var(--accent-primary)] bg-[rgba(232,168,73,0.08)] py-1 px-3.5 rounded-full border border-[rgba(232,168,73,0.12)]">
                {cert.year}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
