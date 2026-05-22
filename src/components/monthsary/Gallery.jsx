import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Camera, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

function PhotoItem({ photo, onOpen, index }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onOpen(photo)}
      className="group relative w-full aspect-square rounded-2xl overflow-hidden glass glow-pink hover:glow-gold transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <img
        src={photo.url}
        alt={photo.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
}

function PlaceholderItem({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ delay: index * 0.05 }}
      className="relative w-full aspect-square bg-gradient-to-br from-pink-200 via-amber-100 to-yellow-100 rounded-2xl overflow-hidden glass glow-pink flex items-center justify-center"
    >
      <div className="text-center">
        <Camera size={40} className="mx-auto text-amber-700 mb-2 opacity-40" />
        <p className="text-sm font-inter text-amber-800 opacity-50">No photo</p>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    base44.functions.invoke('getDrivePhotos', {})
      .then(res => {
        setPhotos(res.data.photos || []);
      })
      .finally(() => setLoading(false));
  }, []);

  // Show 6 slots minimum, fill with real photos
  const slots = Array.from({ length: Math.max(6, photos.length) }, (_, i) => photos[i] || null);

  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-white via-yellow-50 to-white overflow-hidden px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl sm:text-5xl font-cormorant italic font-light text-center mb-16 text-slate-900">
          Gallery of Moments
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {slots.map((photo, idx) =>
              photo
                ? <PhotoItem key={photo.id} photo={photo} onOpen={setSelectedPhoto} index={idx} />
                : <PlaceholderItem key={`placeholder-${idx}`} index={idx} />
            )}
          </div>
        )}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.name}
                className="w-full h-auto max-h-[85vh] object-contain bg-black"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
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