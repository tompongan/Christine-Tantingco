import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Hero({ onOpenHeart, heartOpened }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-pink-50 to-yellow-50 flex items-center justify-center">
      {/* Animated Bokeh Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-30"
            style={{
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              background: ['rgba(250, 218, 221, 0.5)', 'rgba(201, 168, 76, 0.4)', 'rgba(255, 251, 242, 0.3)'][i % 3],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Floating Hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-pink-300 opacity-40"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        >
          <Heart size={20 + Math.random() * 20} fill="currentColor" />
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 sm:px-8 max-w-4xl"
      >
        <motion.h1
          variants={textVariants}
          className="text-4xl sm:text-6xl lg:text-8xl font-cormorant italic font-light leading-tight mb-6 text-slate-900"
        >
          To My Love,<br />
          <span className="bg-gradient-to-r from-pink-500 to-amber-600 bg-clip-text text-transparent">
            Christine
          </span>
        </motion.h1>

        <motion.p
          variants={textVariants}
          className="text-lg sm:text-xl lg:text-2xl font-inter text-slate-700 mb-12 leading-relaxed"
        >
          "Every moment with you becomes my favorite memory."
        </motion.p>

        <motion.div
          variants={textVariants}
          className="flex justify-center"
        >
          <motion.button
            onClick={onOpenHeart}
            className="group relative px-8 py-4 text-lg font-inter font-medium text-amber-900 hover:text-white transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Glowing ring background */}
            <div className="absolute inset-0 rounded-full border-2 border-amber-500 group-hover:border-amber-400 group-hover:shadow-lg group-hover:shadow-amber-400/50 transition-all duration-300" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/10 to-pink-500/10 group-hover:from-amber-500/20 group-hover:to-pink-500/20 transition-all duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              <Heart size={20} className="group-hover:animate-heartbeat" />
              Open My Heart
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator — only shown after heart is opened */}
      {heartOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="text-amber-600 text-sm font-inter">Scroll to continue</div>
          <div className="text-amber-600 text-2xl text-center">↓</div>
        </motion.div>
      )}
    </div>
  );
}