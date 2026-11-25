import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import leonPortrait from '@/assets/leon-portrait.png';

export default function LeonModel() {
  const imageRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const floating = gsap.to(imageRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    const glow = gsap.to(glowRef.current, {
      opacity: 0.6,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
    return () => {
      floating.kill();
      glow.kill();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      {/* Glow effect behind Leon */}
      <div 
        ref={glowRef}
        className="absolute inset-0 flex items-center justify-center opacity-40"
      >
        <div className="w-64 h-64 rounded-full bg-primary/30 blur-3xl" />
      </div>
      
      {/* Leon portrait */}
      <img
        ref={imageRef}
        src={leonPortrait}
        alt="Leon Kennedy"
        className="relative z-10 w-auto h-[450px] object-contain drop-shadow-2xl"
        style={{
          filter: 'drop-shadow(0 0 30px rgba(139, 90, 43, 0.4))'
        }}
      />
    </div>
  );
}
