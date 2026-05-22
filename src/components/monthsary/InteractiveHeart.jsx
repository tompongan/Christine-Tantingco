import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

export default function InteractiveHeart() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleHeartClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FADADD', '#C9A84C', '#FFD700', '#FF69B4'],
    });

    // Show toast message
    toast.success('You will always be my favorite person ❤️', {
      duration: 3000,
      position: 'top-center',
    });

    // Floating hearts animation
    createFloatingHearts();

    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  const createFloatingHearts = () => {
    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.style.position = 'fixed';
      heart.style.left = Math.random() * window.innerWidth + 'px';
      heart.style.top = window.innerHeight - 50 + 'px';
      heart.style.fontSize = Math.random() * 20 + 20 + 'px';
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '9999';
      document.body.appendChild(heart);

      motion.animate(
        {
          y: [0, -window.innerHeight - 100],
          x: [0, (Math.random() - 0.5) * 200],
          opacity: [1, 0],
        },
        {
          duration: 2 + Math.random() * 1,
          onComplete: () => heart.remove(),
        }
      );
    }
  };

  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-white via-pink-50 to-white overflow-hidden px-4 sm:px-8 flex items-center justify-center min-h-screen">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-cormorant italic font-light mb-8 text-slate-900"
        >
          A Little Something Special
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl font-inter text-slate-700 mb-12"
        >
          Click the heart below and feel the love ✨
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={handleHeartClick}
          disabled={isAnimating}
          className="group relative p-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:opacity-75"
        >
          <motion.div
            animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Glow circles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-pink-400"
                animate={isAnimating ? { scale: [1, 2, 3], opacity: [1, 0.5, 0] } : {}}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                }}
              />
            ))}

            {/* Main heart */}
            <motion.div
              animate={isAnimating ? { scale: 1.2 } : { scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 10,
              }}
              className="text-9xl sm:text-[200px] animate-heartbeat"
            >
              <Heart
                size={160}
                className="text-pink-500 fill-pink-500 drop-shadow-lg"
                strokeWidth={1}
              />
            </motion.div>
          </motion.div>

          {/* Orbiting hearts */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`orbit-${i}`}
              className="absolute"
              animate={isAnimating ? { rotate: 360, opacity: [1, 0] } : { rotate: 0 }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
              }}
              style={{
                width: 120,
                height: 120,
                left: '50%',
                top: '50%',
                marginLeft: -60,
                marginTop: -60,
              }}
            >
              <div
                className="absolute w-6 h-6 text-pink-400"
                style={{
                  left: 60,
                  top: 0,
                  animation: isAnimating ? 'none' : '',
                }}
              >
                ❤️
              </div>
            </motion.div>
          ))}
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-sm text-slate-600 font-inter"
        >
          {isAnimating ? '💕 Love overflowing! 💕' : 'Spread the love!'}
        </motion.p>
      </div>
    </section>
  );
}