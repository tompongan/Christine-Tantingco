import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Camera, Loader2, Heart } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const CAPTIONS = [
  { short: "The beginning of us 🌸", long: "The moment I knew — you were the one I'd been waiting for." },
  { short: "My favorite smile 💛", long: "No matter what kind of day I'm having, your smile fixes everything." },
  { short: "Together feels like home 🏡", long: "Wherever you are, that's exactly where I want to be." },
  { short: "Laughing with you 😄", long: "Your laugh is genuinely my favorite sound in the entire world." },
  { short: "Stolen moments 🌙", long: "The little in-between moments with you are the ones I treasure most." },
  { short: "My person ❤️", long: "Out of everyone in the world, I'm so lucky you chose me." },
  { short: "Pure happiness ✨", long: "This is what joy looks like — it looks like you." },
  { short: "Us, always 🌹", long: "I'd choose this, choose you, over and over again without hesitation." },
];

function PhotoCard({ photo, caption, onOpen, index }) {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center mb-16`}
    >
      {/* Photo */}
      <motion.button
        onClick={() => onOpen(photo)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full md:w-1/2 rounded-3xl overflow-hidden shadow-2xl group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 flex-shrink-0"
      style={{ aspectRatio: '4/3' }}
      >
        <img
          src={photo.url}
          alt={photo.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        {/* Corner heart */}
        <motion.div
          className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart size={22} fill="currentColor" className="text-pink-300 drop-shadow-lg" />
        </motion.div>
        {/* Glowing border ring */}
        <div className="absolute inset-0 rounded-3xl ring-2 ring-amber-300/30 group-hover:ring-amber-400/60 transition-all duration-500" />
      </motion.button>

      {/* Caption */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.08 + 0.2 }}
        className="w-full md:w-1/2 text-center md:text-left px-2"
      >
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400" />
          <Heart size={12} fill="currentColor" className="text-pink-400" />
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-400" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-cormorant italic font-light text-slate-900 mb-3">
          {caption.short}
        </h3>
        <p className="font-inter text-slate-500 text-sm sm:text-base leading-relaxed italic">
          "{caption.long}"
        </p>
      </motion.div>
    </motion.div>
  );
}

function PlaceholderCard({ caption, index }) {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center mb-16`}
    >
      <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-pink-100 via-amber-50 to-yellow-100 flex items-center justify-center shadow-xl flex-shrink-0">
        <div className="text-center">
          <Camera size={48} className="mx-auto text-amber-600 mb-2 opacity-30" />
          <p className="text-sm font-inter text-amber-700 opacity-40">Photo coming soon</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left px-2">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400" />
          <Heart size={12} fill="currentColor" className="text-pink-400" />
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-400" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-cormorant italic font-light text-slate-900 mb-3">
          {caption.short}
        </h3>
        <p className="font-inter text-slate-500 text-sm sm:text-base leading-relaxed italic">
          "{caption.long}"
        </p>
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
      .then(res => setPhotos(res.data.photos || []))
      .finally(() => setLoading(false));
  }, []);

  const slots = Array.from({ length: Math.max(6, photos.length) }, (_, i) => photos[i] || null);

  return (
    <section className="relative w-full py-24 bg-gradient-to-b from-white via-pink-50 to-white overflow-hidden px-4 sm:px-8">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-0 w-72 h-72 rounded-full bg-pink-200 opacity-15 blur-3xl" />
        <div className="absolute bottom-20 right-0 w-72 h-72 rounded-full bg-amber-200 opacity-15 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Heart size={16} fill="currentColor" className="text-pink-400" />
            <span className="text-xs font-inter uppercase tracking-widest text-pink-400">Our Story in Photos</span>
            <Heart size={16} fill="currentColor" className="text-pink-400" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-cormorant italic font-light text-slate-900 mb-4">
            Gallery of Moments
          </h2>
          <p className="text-slate-500 font-inter italic text-sm sm:text-base max-w-xl mx-auto">
            "A thousand words couldn't capture what a single photo of us holds."
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
          </div>
        ) : (
          <div>
            {slots.map((photo, idx) => {
              const caption = CAPTIONS[idx % CAPTIONS.length];
              return photo
                ? <PhotoCard key={photo.id} photo={photo} caption={caption} onOpen={setSelectedPhoto} index={idx} />
                : <PlaceholderCard key={`placeholder-${idx}`} caption={caption} index={idx} />;
            })}
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
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
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
                className="w-full h-auto max-h-[85vh] object-contain bg-black block"
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