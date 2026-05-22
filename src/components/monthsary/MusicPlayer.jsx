import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Music, Upload } from 'lucide-react';
import { useState } from 'react';

export default function MusicPlayer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section ref={ref} className="relative w-full py-20 bg-gradient-to-b from-white via-pink-50 to-white overflow-hidden px-4 sm:px-8">
      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-pink-300 opacity-15 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        <h2 className="text-4xl sm:text-5xl font-cormorant italic font-light text-center mb-12 text-slate-900">
          Our Love Song
        </h2>

        <div className="glass rounded-3xl p-8 sm:p-12 glow-pink">
          {/* Vinyl Record */}
          <div className="flex justify-center mb-8">
            <motion.div
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={isPlaying ? { duration: 4, repeat: Infinity, ease: 'linear' } : { duration: 0.5 }}
              className="relative w-48 h-48 sm:w-56 sm:h-56"
            >
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800 to-black shadow-2xl border-8 border-amber-900" />

              {/* Vinyl grooves effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-slate-700/50"
                    style={{
                      inset: `${i * 8}px`,
                    }}
                  />
                ))}
              </div>

              {/* Center label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg flex items-center justify-center">
                  <Music size={40} className="text-white" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Player Controls */}
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-slate-700 font-inter mb-2">Now Playing</p>
              <h3 className="text-2xl font-cormorant italic text-slate-900 mb-1">
                Our Romantic Playlist
              </h3>
              <p className="text-sm text-slate-600 font-inter">Coming soon...</p>
            </div>

            {/* Play Button */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg hover:shadow-xl transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 flex items-center justify-center"
              >
                {isPlaying ? (
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ scaleY: [1, 1.5, 1, 0.8, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-1 h-6 bg-white rounded-sm"
                    />
                    <motion.div
                      animate={{ scaleY: [1, 0.8, 1, 1.5, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-1 h-6 bg-white rounded-sm"
                    />
                    <motion.div
                      animate={{ scaleY: [1, 1.2, 0.9, 1, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-1 h-6 bg-white rounded-sm"
                    />
                  </div>
                ) : (
                  <span className="text-2xl">▶</span>
                )}
              </motion.button>
            </div>

            {/* Upload area */}
            <div className="border-2 border-dashed border-amber-300/50 rounded-xl p-6 hover:border-amber-400 hover:bg-amber-50/50 transition-all duration-300 cursor-pointer group">
              <label className="flex flex-col items-center justify-center gap-3 cursor-pointer">
                <Upload size={32} className="text-amber-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-center">
                  <p className="font-inter font-medium text-slate-900">Add Your Favorite Song</p>
                  <p className="text-sm text-slate-600">Click to upload audio</p>
                </span>
                <input type="file" accept="audio/*" className="hidden" />
              </label>
            </div>

            {/* Progress bar placeholder */}
            <div className="space-y-2">
              <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  animate={isPlaying ? { width: ['0%', '100%'] } : { width: '0%' }}
                  transition={isPlaying ? { duration: 30, ease: 'linear' } : { duration: 0 }}
                  className="h-full bg-gradient-to-r from-amber-400 to-pink-400"
                />
              </div>
              <div className="flex justify-between text-xs text-slate-600 font-inter">
                <span>0:00</span>
                <span>--:--</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}