import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

export default function TypewriterText({ 
  text, 
  className = '', 
  speed = 50, 
  delay = 0,
  showCursor = true,
  onComplete
}) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Prevent re-running if already started
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    let currentIndex = 0;
    let timeoutId;

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextChar, speed + Math.random() * 30);
      } else {
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    };

    timeoutId = setTimeout(typeNextChar, delay);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text, speed, delay]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, delay: delay / 1000 }
      );
    }
  }, [delay]);

  return (
    <span ref={containerRef} className={`font-typewriter ${className}`}>
      {displayText}
      {showCursor && !isComplete && (
        <span className="animate-pulse text-primary">|</span>
      )}
    </span>
  );
}
