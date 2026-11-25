import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PageTransition({ children, sectionId }) {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for the section transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Fade in the ink/blood splatter overlay effect
      tl.fromTo(
        overlayRef.current,
        { 
          clipPath: 'circle(0% at 50% 50%)',
          opacity: 0.8,
        },
        { 
          clipPath: 'circle(150% at 50% 50%)',
          opacity: 0,
          duration: 1.5,
          ease: 'power2.out',
        }
      );

      // Content reveal with stagger
      tl.fromTo(
        containerRef.current.querySelectorAll('.transition-child'),
        { 
          opacity: 0, 
          y: 60,
          filter: 'blur(10px)',
        },
        { 
          opacity: 1, 
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=1'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Transition overlay - ink splatter effect */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-50 pointer-events-none bg-gradient-radial from-blood/80 via-background/60 to-transparent"
        style={{ mixBlendMode: 'multiply' }}
      />
      {children}
    </div>
  );
}
