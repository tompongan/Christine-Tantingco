import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const reasons = [
  { text: 'Your beautiful smile', icon: '😊', color: 'from-pink-400 to-pink-600' },
  { text: 'Your kindness', icon: '💚', color: 'from-emerald-400 to-emerald-600' },
  { text: 'The way you care', icon: '🤲', color: 'from-red-400 to-red-600' },
  { text: 'Your laugh', icon: '😄', color: 'from-yellow-400 to-yellow-600' },
  { text: 'The happiness you bring into my life', icon: '✨', color: 'from-purple-400 to-purple-600' },
  { text: 'Simply because you are you', icon: '💕', color: 'from-rose-400 to-rose-600' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ReasonsWhy() {
  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-white via-amber-50 to-white overflow-hidden px-4 sm:px-8">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-pink-200 opacity-20 blur-3xl" />
        <div className="absolute bottom-32 left-10 w-40 h-40 rounded-full bg-amber-200 opacity-20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <h2 className="text-4xl sm:text-5xl font-cormorant italic font-light text-center mb-6 text-slate-900">
          Reasons Why I Love You
        </h2>
        <p className="text-center text-slate-700 font-inter mb-16 max-w-2xl mx-auto">
          There are infinite reasons, but here are just a few that make my heart skip a beat...
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason, idx) => (
            <motion.div key={idx} variants={cardVariants} whileHover={{ y: -8, scale: 1.02 }} className="group">
              <div className="glass rounded-2xl p-8 glow-pink hover:glow-gold transition-all duration-300 h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <motion.div
                  className="text-5xl mb-4 relative z-10"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.15 }}
                >
                  {reason.icon}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-cormorant italic font-light text-slate-900 relative z-10">
                  {reason.text}
                </h3>
                <motion.div
                  className="absolute -top-2 -right-2 text-amber-400 opacity-0 group-hover:opacity-100 relative z-20"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles size={20} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}