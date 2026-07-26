"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSound } from "@/utils/sound";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const copyEmail = () => {
    navigator.clipboard.writeText("popurimurali16@gmail.com");
    setCopied(true);
    playSound("select");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    playSound("click");
    setIsSubmitting(true);
    setErrorMessage("");
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        playSound("levelUp");
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setErrorMessage(data.error || "Failed to dispatch email. SMTP not configured.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An unexpected error occurred. Check backend network.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section py-24 px-6 relative overflow-hidden">
      <div className="content-wrapper w-full">
        <div className="section-divider mb-16 mx-auto md:mx-0" />
        
        <p className="contact-label">09. Connection</p>
        <h2 className="contact-title text-gradient-primary mb-12">Let&apos;s Work Together</h2>

        <div className="contact-layout-grid">
          {/* LEFT: Dynamic Glassmorphic Contact Form */}
          <div className="contact-form-container">
            <div className="glassmorphic-card p-8 rounded-2xl border border-[rgba(255,255,255,0.05)] w-full">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-secondary)]" />
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    className="sandbox-input w-full"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="sandbox-input w-full"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="I want to discuss a project..."
                    className="sandbox-input w-full resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <span>Transmit Message</span>
                  )}
                </button>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs font-mono text-[var(--accent-secondary)] mt-2 text-center"
                    >
                      ✓ Message transmitted successfully!
                    </motion.div>
                  )}
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs font-mono text-[var(--accent-tertiary)] mt-2 text-center"
                    >
                      ⚠ {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

          {/* RIGHT: Contact Information HUD Grid Card */}
          <div className="contact-details-container flex flex-col gap-6">
            <div className="glassmorphic-card p-8 rounded-2xl border border-[rgba(255,255,255,0.05)] w-full flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2"> Murali Krishna Popuri </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-8">
                  Have a quest in mind or want to collaborate on hybrid, offline-first architectures? I&apos;d love to connect.
                </p>

                <div className="flex flex-col gap-5">
                  {/* Email with copy toast button */}
                  <div className="flex items-start gap-4">
                    <span className="text-xl">📧</span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Email Address</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          popurimurali16@gmail.com
                        </span>
                        <button
                          onClick={copyEmail}
                          className="text-[10px] font-mono bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] py-0.5 px-2 rounded active:scale-95 transition-all text-[var(--accent-primary)]"
                        >
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <span className="text-xl">📞</span>
                    <div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Phone Contact</span>
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        +91 9347796811
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <span className="text-xl">📍</span>
                    <div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Current Location</span>
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        Vijayawada, Andhra Pradesh, India (Open to Remote Worldwide)
                      </span>
                    </div>
                  </div>

                  {/* Social links */}
                  <div className="flex items-start gap-4">
                    <span className="text-xl">🔗</span>
                    <div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Social Pipelines</span>
                      <div className="flex gap-4 mt-1">
                        <a
                          href="https://linkedin.com/in/murali-krishna-popuri"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-[var(--accent-secondary)] hover:underline"
                          onMouseEnter={() => playSound("hover")}
                        >
                          LinkedIn
                        </a>
                        <a
                          href="https://github.com/Muralikrishnapopuri"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-[var(--accent-secondary)] hover:underline"
                          onMouseEnter={() => playSound("hover")}
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability Indicator Badge */}
              <div className="mt-12 pt-6 border-t border-[rgba(255,255,255,0.05)] flex items-center gap-3">
                <span className="status-dot bg-emerald-500 animate-pulse" />
                <div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Uptime / Availability</span>
                  <span className="text-xs font-semibold text-[var(--accent-secondary)]">
                    Ready to deploy to your development team immediately
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
