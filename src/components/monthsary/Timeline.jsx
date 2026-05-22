import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const timelineItems = [
  { title: 'The Day We Started', icon: '✨' },
  { title: 'Our First Date', icon: '🌙' },
  { title: 'Late Night Conversations', icon: '💬' },
  { title: 'Our Favorite Memories', icon: '📸' },
  { title: '5 Beautiful Months Together', icon: '💕' },
];

export default function Timeline() {
  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-white via-pink-50 to-white overflow-hidden px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl sm:text-5xl font-cormorant italic font-light text-center mb-16 text-slate-900">
          Our Journey Together
        </h2>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-400 via-amber-300 to-pink-300" />
            <div className="space-y-12">
              {timelineItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className={`flex items-center gap-8 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="glass rounded-2xl p-6 glow-gold">
                      <p className="text-2xl mb-3">{item.icon}</p>
                      <h3 className="text-2xl font-cormorant italic font-light text-slate-900 mb-4">
                        {item.title}
                      </h3>
                      <div className="w-full aspect-square bg-gradient-to-br from-pink-200 to-amber-100 rounded-xl flex items-center justify-center border-2 border-dashed border-amber-300/50 hover:border-amber-400 hover:shadow-lg transition-all duration-300">
                        <div className="text-center">
                          <Camera size={32} className="mx-auto text-amber-600 mb-2 opacity-50" />
                          <p className="text-sm text-amber-700 opacity-70">Add Photo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    className="w-6 h-6 rounded-full bg-amber-400 border-4 border-white shadow-lg"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="absolute left-3 w-1 h-full bg-gradient-to-b from-amber-400 via-amber-300 to-pink-300" />
            <div className="space-y-8 pl-16">
              {timelineItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    className="absolute -left-[55px] top-2 w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-lg"
                  />
                  <div className="glass rounded-2xl p-5 glow-gold">
                    <p className="text-xl mb-2">{item.icon}</p>
                    <h3 className="text-xl font-cormorant italic font-light text-slate-900 mb-3">
                      {item.title}
                    </h3>
                    <div className="w-full aspect-square bg-gradient-to-br from-pink-200 to-amber-100 rounded-lg flex items-center justify-center border-2 border-dashed border-amber-300/50">
                      <div className="text-center">
                        <Camera size={24} className="mx-auto text-amber-600 mb-2 opacity-50" />
                        <p className="text-xs text-amber-700 opacity-70">Add Photo</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}