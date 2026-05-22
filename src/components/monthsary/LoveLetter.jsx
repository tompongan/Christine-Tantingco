import { motion } from 'framer-motion';

export default function LoveLetter() {
  const letterText = `Happy 5th Monthsary, Christine.

These past five months have been some of the happiest moments of my life. Thank you for your love, your patience, your laughter, and for making ordinary days feel special.

Every smile you give me, every moment we share, and every memory we create together means more to me than words can explain.

No matter where life takes us, I want you to know that you are deeply appreciated, loved, and cherished.

This page may only contain photos and words, but every part of it was made with love — especially for you.

I love you always. ❤️`;

  return (
    <section className="relative min-h-screen w-full py-20 flex items-center justify-center bg-gradient-to-b from-white via-amber-50 to-white overflow-hidden px-4 sm:px-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-200 opacity-20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="glass rounded-3xl p-8 sm:p-12 lg:p-16 glow-gold">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-cormorant italic font-light text-slate-900 mb-8 text-center"
          >
            A Love Letter
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="space-y-6"
          >
            {letterText.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-base sm:text-lg font-inter text-slate-800 leading-relaxed tracking-wide">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-center text-amber-700 font-cormorant italic text-2xl"
          >
            With All My Love ✨
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}