import { motion } from 'framer-motion';
import { Music, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const songs = [
  { category: 'Romantic & Sweet Love Songs', tracks: [
    { title: 'Until I Found You', artist: 'Stephen Sanchez', yt: 'https://www.youtube.com/watch?v=YuFtFMkHgkc' },
    { title: 'Palagi', artist: 'TJ Monterde', yt: 'https://www.youtube.com/watch?v=Ic8luawDSNA' },
    { title: 'Ikaw at Ako', artist: 'Johnoy Danao', yt: 'https://www.youtube.com/watch?v=yY1OXVCMbpg' },
    { title: 'Araw-Araw', artist: 'Ben&Ben', yt: 'https://www.youtube.com/watch?v=MjMt2bNdWEY' },
    { title: 'Perfect', artist: 'Ed Sheeran', yt: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g' },
    { title: 'You Are the Reason', artist: 'Calum Scott', yt: 'https://www.youtube.com/watch?v=ShZ978fBl6Y' },
    { title: 'Beautiful Scars', artist: 'Maximillian', yt: 'https://www.youtube.com/watch?v=P_yUGBxVsSQ' },
  ] },
  { category: 'Soft & Emotional Vibes', tracks: [
    { title: 'Tahanan', artist: 'Adie', yt: 'https://www.youtube.com/watch?v=qNBn8HCTMGY' },
    { title: 'Bawat Piyesa', artist: 'Munimuni', yt: 'https://www.youtube.com/watch?v=5uNHiCVzeiY' },
    { title: 'Maybe The Night', artist: 'Ben&Ben', yt: 'https://www.youtube.com/watch?v=XMtmFCTFp4Y' },
    { title: 'Make It With You', artist: 'Bread', yt: 'https://www.youtube.com/watch?v=6l9yHNMKcvY' },
    { title: 'The One', artist: 'Kodaline', yt: 'https://www.youtube.com/watch?v=9LKqBBCMFLs' },
  ] },
];

function getYouTubeId(url) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

export default function MusicPlayer() {
  const allTracks = songs.flatMap(s => s.tracks);
  const [selected, setSelected] = useState(allTracks[0]);

  const embedId = getYouTubeId(selected.yt);

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

        <div className="glass rounded-3xl p-6 sm:p-10 glow-pink space-y-8">
          {/* YouTube Embed Player */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe
              key={embedId}
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${embedId}?autoplay=1`}
              title={`${selected.title} - ${selected.artist}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            />
          </div>

          {/* Now Playing label */}
          <div className="text-center">
            <p className="text-xs font-inter text-slate-500 uppercase tracking-widest mb-1">Now Playing</p>
            <p className="text-2xl font-cormorant italic text-slate-900">{selected.title}</p>
            <p className="text-sm font-inter text-slate-600">{selected.artist}</p>
          </div>

          {/* Song List */}
          <div className="space-y-6">
            {songs.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="border border-amber-200/50 rounded-xl p-5 bg-white/50"
              >
                <h3 className="text-base font-cormorant italic font-light text-slate-700 mb-3">
                  {section.category}
                </h3>
                <ul className="space-y-1">
                  {section.tracks.map((track, trackIdx) => (
                    <li key={trackIdx}>
                      <button
                        onClick={() => setSelected(track)}
                        className={`w-full text-left text-sm font-inter flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                          selected.yt === track.yt
                            ? 'bg-amber-100 text-amber-800 font-medium'
                            : 'text-slate-700 hover:bg-amber-50'
                        }`}
                      >
                        <span className={`flex-shrink-0 ${selected.yt === track.yt ? 'text-amber-500' : 'text-amber-300'}`}>♪</span>
                        <span className="flex-1">{track.title}</span>
                        <span className="text-xs text-slate-400">{track.artist}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}