import { useEffect, useRef, useState } from 'react';

export default function useCountUp(target, enabled = true) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    const element = elementRef.current;
    if (!element) {
      setCount(target);
      return undefined;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setCount(target);
      return undefined;
    }

    let frameId;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const duration = 900;
      const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        setCount(Math.round(target * (1 - (1 - progress) ** 3)));
        if (progress < 1) frameId = requestAnimationFrame(update);
      };
      frameId = requestAnimationFrame(update);
      observer.disconnect();
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [target, enabled]);

  return [elementRef, count];
}
