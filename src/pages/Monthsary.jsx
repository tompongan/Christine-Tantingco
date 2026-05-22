import { useRef, useState, useEffect } from 'react';
import Hero from '@/components/monthsary/Hero';
import LoveLetter from '@/components/monthsary/LoveLetter';

import Gallery from '@/components/monthsary/Gallery';
import MusicPlayer from '@/components/monthsary/MusicPlayer';
import ReasonsWhy from '@/components/monthsary/ReasonsWhy';
import InteractiveHeart from '@/components/monthsary/InteractiveHeart';
import Closing from '@/components/monthsary/Closing';

export default function Monthsary() {
  const loveLetterRef = useRef(null);
  const [heartOpened, setHeartOpened] = useState(false);

  // Lock scroll until heart is opened
  useEffect(() => {
    if (!heartOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [heartOpened]);

  const handleOpenHeart = () => {
    setHeartOpened(true);
    setTimeout(() => {
      if (loveLetterRef.current) {
        loveLetterRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="w-full overflow-hidden">
      <Hero onOpenHeart={handleOpenHeart} heartOpened={heartOpened} />
      <div ref={loveLetterRef}>
        <LoveLetter />
      </div>

      <Gallery />
      <MusicPlayer />
      <ReasonsWhy />
      <InteractiveHeart />
      <Closing />
    </div>
  );
}