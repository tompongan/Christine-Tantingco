import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { X, Camera } from 'lucide-react';

const galleryItems = [
  { id: 1, ratio: '2/3' },
  { id: 2, ratio: '1/1' },
  { id: 3, ratio: '3/2' },
  { id: 4, ratio: '2/3' },
  { id: 5, ratio: '1/1' },
  { id: 6, ratio: '3/2' },
];

function ImagePlaceholder({ item, onOpen, index }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onOpen(item)}
      className="group relative h-64 bg-gradient-to-br from-pink-200 via-amber-100 to-yellow-100 rounded-2xl overflow-hidden glass glow-pink hover:glow-gold transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative text-center">
        <Camera size={40} className="mx-auto text-amber-700 mb-2 opacity-60 group-hover:opacity-100 transition-opacity" />
        <p className="text-sm font-inter text-amber-800 opacity-70 group-hover:opacity-100 transition-opacity">Add Photo</p>
      </div>
    </motion.button>
  );
}

export default function Gallery() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section ref={ref} className="relative w-full py-20 bg-gradient-to-b from-white via-yellow-50 to-white overflow-hidden px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl sm:text-5xl font-cormorant italic font-light text-center mb-16 text-slate-900">
          Gallery of Moments
        </h2>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-max">
          {galleryItems.map((item, idx) => (
            <ImagePlaceholder
              key={item.id}
              item={item}
              onOpen={setSelectedItem}
              index={idx}
            />
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full aspect-square bg-gradient-to-br from-pink-200 to-amber-100 rounded-3xl glass glow-gold flex items-center justify-center overflow-hidden"
            >
              <div className="flex items-center justify-center w-full h-full">
                <div className="text-center">
                  <Camera size={60} className="mx-auto text-amber-700 mb-4 opacity-50" />
                  <p className="text-lg font-inter text-amber-800 opacity-70">Add Your Photo Here</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                <X size={24} className="text-slate-900" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}