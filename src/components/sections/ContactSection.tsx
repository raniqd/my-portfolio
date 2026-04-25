'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';

const RECIPIENT = 'danilavasilenko15@gmail.com';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/raniqd', icon: '⌥' },
  { label: 'Email', href: `mailto:${RECIPIENT}`, icon: '@' },
];

export default function ContactSection() {
  const { t } = useI18n();
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build a mailto link with the filled-in message body
    const subject = encodeURIComponent(`Portfolio inquiry from ${senderEmail}`);
    const body = encodeURIComponent(`From: ${senderEmail}\n\n${message}`);
    window.open(`mailto:${RECIPIENT}?subject=${subject}&body=${body}`, '_blank');

    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setSenderEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(139,92,246,0.12)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-violet-400 font-mono text-sm tracking-widest uppercase mb-4"
          >
            {'>'} contact
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-none"
          >
            Let&apos;s<br />
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Build
            </span>{' '}
            Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg mb-12"
          >
            Have a project in mind? Let&apos;s create something extraordinary.
          </motion.p>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4 mb-12"
          >
            <div className="relative">
              <input
                id="contact-email"
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-white/25 font-mono text-sm focus:outline-none focus:border-violet-500/60 transition-all"
              />
            </div>

            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project..."
                required
                rows={4}
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-white/25 font-mono text-sm focus:outline-none focus:border-violet-500/60 transition-all resize-none"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold tracking-wide shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow relative overflow-hidden"
            >
              {sent ? (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-300"
                >
                  ✓ Opening mail client...
                </motion.span>
              ) : (
                'Send Message →'
              )}
            </motion.button>

            {/* Email hint */}
            <p className="text-white/25 text-xs font-mono">
              or write directly to{' '}
              <a
                href={`mailto:${RECIPIENT}`}
                className="text-violet-400/70 hover:text-violet-400 transition-colors underline underline-offset-2"
              >
                {RECIPIENT}
              </a>
            </p>
          </motion.form>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            {SOCIAL_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i + 0.5 }}
                whileHover={{ y: -4, scale: 1.1 }}
                className="w-12 h-12 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-200 font-mono font-bold"
                aria-label={link.label}
                title={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
