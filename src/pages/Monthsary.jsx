import { useRef } from 'react';
import Hero from '@/components/monthsary/Hero';
import LoveLetter from '@/components/monthsary/LoveLetter';
import Timeline from '@/components/monthsary/Timeline';
import Gallery from '@/components/monthsary/Gallery';
import MusicPlayer from '@/components/monthsary/MusicPlayer';
import ReasonsWhy from '@/components/monthsary/ReasonsWhy';
import InteractiveHeart from '@/components/monthsary/InteractiveHeart';
import Closing from '@/components/monthsary/Closing';

export default function Monthsary() {
  const loveLetterRef = useRef(null);

  const handleOpenHeart = () => {
    if (loveLetterRef.current) {
      loveLetterRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <Hero onOpenHeart={handleOpenHeart} />
      <div ref={loveLetterRef}>
        <LoveLetter />
      </div>
      <Timeline />
      <Gallery />
      <MusicPlayer />
      <ReasonsWhy />
      <InteractiveHeart />
      <Closing />
    </div>
  );
}