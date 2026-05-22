import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import { useState } from 'react';

const SPOTIFY_PLAYLIST_ID = '5FstYDysoBiN1mTEODAqT1';

export default function MusicPlayer() {
  const [playlistId, setPlaylistId] = useState(SPOTIFY_PLAYLIST_ID);

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

        <div className="glass rounded-3xl p-6 sm:p-10 glow-pink">
          {/* Spotify Embed */}
          <div className="rounded-2xl overflow-hidden shadow-xl mb-8" style={{ borderRadius: '12px' }}>
            <iframe
              key={playlistId}
              src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: '12px' }}
            />
          </div>

          <div className="text-center">
            <p className="text-xs font-inter text-slate-500 uppercase tracking-widest">Curated with Love</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}