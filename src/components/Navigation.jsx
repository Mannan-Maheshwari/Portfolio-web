import { useEffect, useState } from 'react';
import { Copy, Menu, Search, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];
const mobileNav = [
  { label: 'Home', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation({ onOpenRecruiter, onOpenCommand, onCopyLink }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
      setIsScrolled(window.scrollY > 50);
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    const sections = navItems.map(({ href }) => document.querySelector(href)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.15, 0.35, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener('scroll', updateScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeMenu = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeMenu);
    return () => window.removeEventListener('keydown', closeMenu);
  }, [menuOpen]);

  const goTo = (event, href) => {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
    setMenuOpen(false);
  };

  return (
    <>
      <div aria-hidden="true" className="fixed left-0 right-0 top-0 z-[70] h-1 origin-left bg-primary" style={{ transform: `scaleX(${progress})` }} />
      <nav className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b border-border bg-background/95 backdrop-blur-sm' : 'bg-background/40'}`} aria-label="Main navigation">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#hero" onClick={(event) => goTo(event, '#hero')} className="shrink-0 font-cinzel text-lg text-primary text-shadow-glow">MANNAN</a>
          <div className="hidden items-center gap-4 lg:flex xl:gap-6">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => goTo(event, item.href)}
                aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
                className={`font-typewriter text-xs transition-colors hover:text-primary xl:text-sm ${activeSection === item.href.slice(1) ? 'text-primary' : 'text-foreground/70'}`}
              >
                <span className="mr-1 text-merchant/50">{String(index + 1).padStart(2, '0')}.</span>{item.label}
              </a>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button type="button" onClick={() => { setMenuOpen(false); onOpenCommand(); }} className="inline-flex items-center gap-2 border border-border px-3 py-2 font-typewriter text-xs text-foreground hover:border-primary hover:text-primary" aria-label="Open command palette">
              <Search size={14} /><span className="hidden sm:inline">⌘K</span>
            </button>
            <button type="button" onClick={onOpenRecruiter} className="hidden border border-merchant px-3 py-2 font-typewriter text-xs text-merchant hover:bg-merchant/10 sm:block">
              RECRUITER
            </button>
            <button type="button" onClick={onCopyLink} className="hidden items-center gap-2 border border-border px-3 py-2 font-typewriter text-xs text-foreground hover:border-primary hover:text-primary sm:inline-flex">
              <Copy size={13} /> LINK
            </button>
            <button type="button" onClick={() => setMenuOpen((open) => !open)} className="inline-flex items-center justify-center border border-border p-2 text-primary lg:hidden" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-border bg-background/95 px-5 py-4 lg:hidden">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={(event) => goTo(event, item.href)} className="border border-border/70 px-3 py-3 font-typewriter text-xs text-foreground hover:border-primary hover:text-primary">
                  {item.label}
                </a>
              ))}
              <button type="button" onClick={() => { setMenuOpen(false); onCopyLink(); }} className="border border-border/70 px-3 py-3 text-left font-typewriter text-xs text-foreground">Copy Link</button>
              <button type="button" onClick={() => { setMenuOpen(false); onOpenRecruiter(); }} className="border border-merchant px-3 py-3 text-left font-typewriter text-xs text-merchant">Recruiter View</button>
            </div>
          </div>
        )}
      </nav>
      <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-5 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" aria-label="Mobile navigation">
        {mobileNav.map((item) => (
          <a key={item.href} href={item.href} onClick={(event) => goTo(event, item.href)} aria-current={activeSection === item.href.slice(1) ? 'location' : undefined} className={`py-3 text-center font-typewriter text-[9px] ${activeSection === item.href.slice(1) ? 'text-primary' : 'text-foreground/70'}`}>
            {item.label}
          </a>
        ))}
        <button type="button" onClick={onOpenRecruiter} className="py-3 font-typewriter text-[9px] text-merchant">Recruiter</button>
      </nav>
    </>
  );
}
