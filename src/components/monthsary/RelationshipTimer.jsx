import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const START_DATE = new Date('2026-01-03T18:30:00');

function getElapsed() {
  const now = new Date();
  let diff = Math.floor((now - START_DATE) / 1000);

  const months = Math.floor(diff / (30.4375 * 24 * 3600));
  diff -= months * Math.floor(30.4375 * 24 * 3600);
  const days = Math.floor(diff / (24 * 3600));
  diff -= days * 24 * 3600;
  const hours = Math.floor(diff / 3600);
  diff -= hours * 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff - minutes * 60;

  return { months, days, hours, minutes, seconds };
}

function TimeUnit({ value, label }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="glass glow-gold rounded-2xl w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center mb-2">
        <motion.span
          key={value}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="text-2xl sm:text-3xl font-cormorant italic font-light text-amber-800"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </div>
      <span className="text-xs font-inter uppercase tracking-widest text-slate-500">{label}</span>
    </motion.div>
  );
}

export default function RelationshipTimer() {
  const [elapsed, setElapsed] = useState(getElapsed());

  useEffect(() => {
    const interval = setInterval(() => setElapsed(getElapsed()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-24 bg-gradient-to-b from-white via-pink-50 to-amber-50 overflow-hidden px-4 sm:px-8">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-200 opacity-20 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-64 h-64 rounded-full bg-amber-200 opacity-20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.9 }}
        className="max-w-3xl mx-auto relative z-10 text-center"
      >
        {/* Label */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart size={18} className="text-pink-400" fill="currentColor" />
          <span className="text-xs font-inter uppercase tracking-widest text-pink-400">Since You Said Yes</span>
          <Heart size={18} className="text-pink-400" fill="currentColor" />
        </motion.div>

        <h2 className="text-4xl sm:text-5xl font-cormorant italic font-light text-slate-900 mb-4">
          Time Together
        </h2>
        <p className="text-base font-inter text-slate-500 mb-12 italic">
          "Every second with you is my favorite moment."
        </p>

        {/* Timer Card */}
        <div className="glass glow-pink rounded-3xl p-8 sm:p-12">
          <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-6">
            <TimeUnit value={elapsed.months} label="Months" />
            <Dot />
            <TimeUnit value={elapsed.days} label="Days" />
            <Dot />
            <TimeUnit value={elapsed.hours} label="Hours" />
            <Dot />
            <TimeUnit value={elapsed.minutes} label="Minutes" />
            <Dot />
            <TimeUnit value={elapsed.seconds} label="Seconds" />
          </div>

          <motion.div
            className="mt-10 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />

          <p className="mt-6 text-sm font-inter text-slate-500 italic">
            Started January 3, 2026 · 6:30 PM ❤️
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function Dot() {
  return (
    <span className="text-amber-400 text-2xl font-light pb-7 hidden sm:block">·</span>
  );
}