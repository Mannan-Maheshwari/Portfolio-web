import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MerchantCard({ 
  title, 
  description, 
  tech = [], 
  link,
  index = 0 
}) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          y: 50,
          rotateX: -10
        },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, [index]);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glowRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    gsap.to(glowRef.current, {
      x: x - 100,
      y: y - 100,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 1,
        duration: 0.3
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.3
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-card border-2 border-village p-6 cursor-pointer group box-shadow-merchant"
      style={{ perspective: '1000px' }}
    >
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute w-52 h-52 rounded-full pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, hsl(35 90% 55% / 0.3) 0%, transparent 70%)',
        }}
      />
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-merchant" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-merchant" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-merchant" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-merchant" />

      <div className="relative z-10">
        <h3 className="font-cinzel text-xl text-primary mb-3 text-shadow-glow">
          {title}
        </h3>
        
        <p className="font-crimson text-foreground/80 mb-4 leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-typewriter bg-secondary border border-border text-parchment"
            >
              {item}
            </span>
          ))}
        </div>
        
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-typewriter text-sm text-merchant hover:text-primary transition-colors group"
          >
            <span>What are ya buyin&apos;?</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        )}
      </div>
    </div>
  );
}
