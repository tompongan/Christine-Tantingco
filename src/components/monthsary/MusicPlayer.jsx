import { motion } from 'framer-motion';
import { Music, Upload } from 'lucide-react';
import { useState } from 'react';

const songs = [
  { category: 'Romantic & Sweet Love Songs', tracks: [
    'Until I Found You — Stephen Sanchez',
    'Palagi — TJ Monterde',
    'Ikaw at Ako — Johnoy Danao',
    'Araw-Araw — Ben&Ben',
    'Perfect — Ed Sheeran',
    'You Are the Reason — Calum Scott',
    'Beautiful Scars — Maximillian',
  ] },
  { category: 'Soft & Emotional Vibes', tracks: [
    'Tahanan — Adie',
    'Bawat Piyesa — Munimuni',
    'Maybe The Night',
    'Make It With You',
    'The One — Kodaline',
  ] },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-white via-pink-50 to-white overflow-hidden px-4 sm:px-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-pink-300 opacity-15 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <h2 className="text-4xl sm:text-5xl font-cormorant italic font-light text-center mb-12 text-slate-900">
          My Song for You
        </h2>

        <div className="glass rounded-3xl p-8 sm:p-12 glow-pink">
          <div className="flex justify-center mb-8">
            <motion.div
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={isPlaying ? { duration: 4, repeat: Infinity, ease: 'linear' } : { duration: 0.5 }}
              className="relative w-48 h-48 sm:w-56 sm:h-56"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800 to-black shadow-2xl border-8 border-amber-900" />
              <div className="absolute inset-0 rounded-full overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="absolute rounded-full border border-slate-700/50" style={{ inset: `${i * 8}px` }} />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg flex items-center justify-center">
                  <Music size={40} className="text-white" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-slate-700 font-inter mb-2">Now Playing</p>
              <h3 className="text-2xl font-cormorant italic text-slate-900 mb-1">Our Romantic Playlist</h3>
              <p className="text-sm text-slate-600 font-inter">Coming soon...</p>
            </div>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
              >
                {isPlaying ? (
                  <div className="flex gap-1">
                    <motion.div animate={{ scaleY: [1, 1.5, 1, 0.8, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-1 h-6 bg-white rounded-sm" />
                    <motion.div animate={{ scaleY: [1, 0.8, 1, 1.5, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-1 h-6 bg-white rounded-sm" />
                    <motion.div animate={{ scaleY: [1, 1.2, 0.9, 1, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-1 h-6 bg-white rounded-sm" />
                  </div>
                ) : (
                  <span className="text-2xl">▶</span>
                )}
              </motion.button>
            </div>

            <div className="mt-8 space-y-6">
              {songs.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="border border-amber-200/50 rounded-xl p-5 bg-white/50"
                >
                  <h3 className="text-lg font-cormorant italic font-light text-slate-900 mb-4">
                    {section.category}
                  </h3>
                  <ul className="space-y-2">
                    {section.tracks.map((track, trackIdx) => (
                      <li key={trackIdx} className="text-sm font-inter text-slate-700 flex items-start gap-3">
                        <span className="text-amber-500 mt-1 flex-shrink-0">♪</span>
                        <span>{track}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}