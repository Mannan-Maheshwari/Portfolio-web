import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import LeonModel from './LeonModel';
import useCountUp from '../hooks/useCountUp';
import { achievements, profile, projects } from '../data/portfolio';

function HeroStat({ stat }) {
  const [valueRef, count] = useCountUp(stat.value);
  return (
    <div className="min-w-28 border border-border/80 bg-card/70 px-4 py-3 text-center">
      <strong ref={valueRef} className="block font-cinzel text-xl text-primary">{count}</strong>
      <span className="font-typewriter text-[10px] text-muted-foreground">{stat.label}</span>
    </div>
  );
}

export default function HeroSection({ onOpenRecruiter, onOpenResume, onDownloadResume }) {
  const heroRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const shippedCount = projects.filter((project) => project.status === 'live').length;
  const stats = [
    { value: achievements.codingPlatforms[0]?.solved, label: 'Problems solved' },
    { value: shippedCount, label: 'Live projects' },
    { value: achievements.competitions.length, label: 'Confirmed podiums' },
  ].filter((stat) => Number.isFinite(stat.value));

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    const tl = gsap.timeline();

    tl.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.out' }
    );

    gsap.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: 'power3.out' }
    );

    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 2
    });

    return () => tl.kill();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center vignette"
    >
      <div className="container relative z-10 mx-auto px-6 pt-20 lg:pt-0">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="text-center lg:text-left">
            <p className="mb-4 font-typewriter text-sm tracking-widest text-merchant">FIELD OPERATIVE // DELHI NCR</p>
            <h1 className="mb-6 font-cinzel text-4xl text-foreground text-shadow-glow sm:text-5xl md:text-7xl">
              MANNAN<br className="hidden sm:block" /> MAHESHWARI
            </h1>
            <p className="font-typewriter text-lg text-parchment/80 md:text-xl">
              &lt; Backend Software Engineer · Applied AI /&gt;
            </p>
            <p className="mx-auto mt-4 max-w-2xl font-crimson text-xl text-muted-foreground md:text-2xl lg:mx-0">
              {profile.heroStatement}
              <span className="text-primary"> What can I do for ya?</span>
            </p>
            <div className="mt-9 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#projects"
                className="group relative px-8 py-4 font-cinzel text-sm tracking-wider bg-primary text-primary-foreground overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <span className="relative z-10">VIEW MY WARES</span>
                <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-merchant transition-transform group-hover:scale-x-100" />
              </a>
              <button
                type="button"
                onClick={onOpenRecruiter}
                className="px-8 py-4 font-cinzel text-sm tracking-wider border-2 border-border text-foreground hover:border-primary hover:text-primary transition-all duration-300"
              >
                RECRUITER BRIEF
              </button>
              <a
                href="#about"
                className="px-6 py-4 font-cinzel text-sm tracking-wider border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                ABOUT ME
              </a>
              {onOpenResume && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="px-6 py-4 font-cinzel text-sm tracking-wider border border-merchant text-merchant transition-colors hover:bg-merchant/10"
                >
                  PREVIEW RESUME
                </button>
              )}
              {onDownloadResume && (
                <button
                  type="button"
                  onClick={onDownloadResume}
                  className="px-6 py-4 font-cinzel text-sm tracking-wider border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  DOWNLOAD RESUME
                </button>
              )}
            </div>
            {stats.length > 0 && (
              <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
                {stats.map((stat) => <HeroStat key={stat.label} stat={stat} />)}
              </div>
            )}
          </div>

          <div className="hidden h-[500px] lg:block">
            <LeonModel />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-typewriter text-xs text-muted-foreground">
          SCROLL DOWN
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
