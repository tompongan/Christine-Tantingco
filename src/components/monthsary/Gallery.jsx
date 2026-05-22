import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Camera, Loader2, Heart } from 'lucide-react';
import { base44 } from '@/api/base44Client';

// Each category defines a theme with photos assigned by filename keywords or position
const CATEGORIES = [
  {
    id: 'beginning',
    title: 'The Beginning of Us',
    subtitle: 'Where it all started — the first spark, the first smile.',
    emoji: '🌸',
    keywords: ['begin', 'start', 'first', '1'],
    color: 'from-pink-100 to-rose-50',
    accent: 'text-rose-400',
  },
  {
    id: 'smile',
    title: 'Your Beautiful Smile',
    subtitle: 'No matter what kind of day I have, your smile fixes everything.',
    emoji: '💛',
    keywords: ['smile', 'laugh', 'happy', '2', '3'],
    color: 'from-amber-100 to-yellow-50',
    accent: 'text-amber-500',
  },
  {
    id: 'together',
    title: 'Together Feels Like Home',
    subtitle: 'Wherever you are, that\'s exactly where I want to be.',
    emoji: '🏡',
    keywords: ['together', 'us', 'home', '4', '5'],
    color: 'from-sky-100 to-blue-50',
    accent: 'text-sky-400',
  },
  {
    id: 'moments',
    title: 'Stolen Moments',
    subtitle: 'The little in-between moments with you are the ones I treasure most.',
    emoji: '🌙',
    keywords: ['moment', 'candid', 'stolen', '6', '7'],
    color: 'from-violet-100 to-purple-50',
    accent: 'text-violet-400',
  },
  {
    id: 'myperson',
    title: 'My Person',
    subtitle: 'Out of everyone in the world, I\'m so lucky you chose me.',
    emoji: '❤️',
    keywords: ['person', 'mine', 'love', '8', '9'],
    color: 'from-red-100 to-pink-50',
    accent: 'text-red-400',
  },
];

function matchCategory(photo, index) {
  const name = (photo?.name || '').toLowerCase();
  for (const cat of CATEGORIES) {
    if (cat.keywords.some(k => name.includes(k))) return cat.id;
  }
  // Fallback: distribute evenly by index
  return CATEGORIES[index % CATEGORIES.length].id;
}

function SectionHeader({ category, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.7, delay }}
      className="text-center mb-10"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="text-3xl mb-3"
      >
        {category.emoji}
      </motion.div>
      <h3 className={`text-3xl sm:text-4xl font-cormorant italic font-light text-slate-900 mb-2`}>
        {category.title}
      </h3>
      <p className={`font-inter text-sm italic ${category.accent} max-w-md mx-auto`}>
        "{category.subtitle}"
      </p>
      <div className="flex items-center justify-center gap-3 mt-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300" />
        <Heart size={10} fill="currentColor" className="text-pink-300" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300" />
      </div>
    </motion.div>
  );
}

function PhotoGrid({ photos, onOpen, onError, categoryColor }) {
  if (photos.length === 0) {
    return (
      <div className={`rounded-3xl bg-gradient-to-br ${categoryColor} flex items-center justify-center aspect-[4/3] max-w-md mx-auto shadow-inner mb-4`}>
        <div className="text-center">
          <Camera size={40} className="mx-auto text-amber-400 mb-2 opacity-30" />
          <p className="text-sm font-inter text-amber-700 opacity-40">Photos coming soon</p>
        </div>
      </div>
    );
  }

  // 1 photo: full width. 2: side by side. 3+: first large, rest grid below
  if (photos.length === 1) {
    return <SinglePhoto photo={photos[0]} onOpen={onOpen} onError={onError} />;
  }
  if (photos.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {photos.map((p, i) => <GridPhoto key={p.id} photo={p} onOpen={onOpen} onError={onError} delay={i * 0.1} />)}
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <SinglePhoto photo={photos[0]} onOpen={onOpen} onError={onError} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {photos.slice(1).map((p, i) => <GridPhoto key={p.id} photo={p} onOpen={onOpen} onError={onError} delay={i * 0.08} />)}
      </div>
    </div>
  );
}

function SinglePhoto({ photo, onOpen, onError }) {
  return (
    <motion.button
      onClick={() => onOpen(photo)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
      style={{ aspectRatio: '16/9' }}
    >
      <img
        src={photo.url}
        alt={photo.name}
        className="absolute inset-0 w-full h-full object-contain bg-gradient-to-br from-pink-50 to-amber-50 transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        onError={() => onError(photo.id)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <div className="absolute inset-0 rounded-3xl ring-2 ring-amber-300/30 group-hover:ring-amber-400/60 transition-all duration-500" />
      <motion.div
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Heart size={20} fill="currentColor" className="text-pink-300 drop-shadow-lg" />
      </motion.div>
    </motion.button>
  );
}

function GridPhoto({ photo, onOpen, onError, delay }) {
  return (
    <motion.button
      onClick={() => onOpen(photo)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative rounded-2xl overflow-hidden shadow-lg group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
      style={{ aspectRatio: '1/1' }}
    >
      <img
        src={photo.url}
        alt={photo.name}
        className="absolute inset-0 w-full h-full object-contain bg-gradient-to-br from-pink-50 to-amber-50 transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        onError={() => onError(photo.id)}
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-amber-300/20 group-hover:ring-amber-400/50 transition-all duration-400" />
    </motion.button>
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

  const handleImageError = (photoId) => {
    setPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  // Group photos into categories
  const grouped = CATEGORIES.map(cat => ({
    ...cat,
    photos: [],
  }));

  photos.forEach((photo, idx) => {
    const catId = matchCategory(photo, idx);
    const group = grouped.find(g => g.id === catId);
    if (group) group.photos.push(photo);
  });

  // If all photos fell into first category (no filename matches), distribute evenly
  const allInFirst = grouped[0].photos.length === photos.length && photos.length > 0;
  if (allInFirst) {
    grouped.forEach(g => { g.photos = []; });
    photos.forEach((photo, idx) => {
      grouped[idx % CATEGORIES.length].photos.push(photo);
    });
  }

  return (
    <section className="relative w-full py-24 bg-gradient-to-b from-white via-pink-50 to-white overflow-hidden px-4 sm:px-8">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-0 w-72 h-72 rounded-full bg-pink-200 opacity-15 blur-3xl" />
        <div className="absolute bottom-20 right-0 w-72 h-72 rounded-full bg-amber-200 opacity-15 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
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
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
          </div>
        ) : (
          <div className="space-y-24">
            {grouped.map((cat, catIdx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: catIdx * 0.05 }}
                className={`rounded-3xl p-8 sm:p-12 bg-gradient-to-br ${cat.color} shadow-sm`}
              >
                <SectionHeader category={cat} delay={0} />
                <PhotoGrid
                  photos={cat.photos}
                  onOpen={setSelectedPhoto}
                  onError={handleImageError}
                  categoryColor={cat.color}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

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