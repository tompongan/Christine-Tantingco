import { motion } from 'framer-motion';

export default function Closing() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-950 overflow-hidden flex items-center justify-center px-4 sm:px-8">
      {/* Animated stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Floating light orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-96 h-96 rounded-full blur-3xl"
            style={{
              background: [
                'radial-gradient(circle, rgba(250, 218, 221, 0.3), transparent)',
                'radial-gradient(circle, rgba(201, 168, 76, 0.2), transparent)',
                'radial-gradient(circle, rgba(236, 72, 153, 0.25), transparent)',
                'radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent)',
              ][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ x: [0, 100, -50, 0], y: [0, -100, 50, 0] }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 max-w-3xl text-center"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-cormorant italic font-light text-white mb-6 leading-tight"
        >
          Five months down,
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-cormorant italic font-light bg-gradient-to-r from-pink-300 via-amber-300 to-pink-300 bg-clip-text text-transparent mb-12"
        >
          Forever to go.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-12 max-w-md mx-auto"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-2xl sm:text-3xl font-cormorant italic text-pink-200 mb-16"
        >
          Happy Monthsary, Christine Hilario Tantingco ❤️
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-base sm:text-lg font-inter text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8"
        >
          Thank you for being my favorite person, my greatest adventure, and my most cherished memory. Here's to creating infinite more beautiful moments together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.3 }}
          className="relative"
        >
          <div className="inline-block">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400 mb-3" />
            <p className="text-xl sm:text-2xl font-cormorant italic text-amber-200">With All My Love,</p>
            <p className="text-2xl sm:text-3xl font-cormorant italic font-light text-amber-300 mt-2">Alsthom</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-0 right-0 text-center z-10"
      >
        <p className="text-sm sm:text-base font-inter text-slate-400">Made with love by Alsthom C. Pongan ✨</p>
        <p className="text-xs text-slate-500 mt-2">June 3, 2026</p>
      </motion.footer>
    </section>
  );
}