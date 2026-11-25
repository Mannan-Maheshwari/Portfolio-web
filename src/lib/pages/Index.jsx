import { useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from 'sonner';
import FogScene from '../../components/FogScene';
import Navigation from '../../components/Navigation';
import HeroSection from '../../components/HeroSection';
import AboutSection from '../../components/AboutSection';
import SkillsSection from '../../components/SkillsSection';
import ProjectsSection from '../../components/ProjectsSection';
import AchievementsSection from '../../components/AchievementsSection';
import ResumeSection from '../../components/ResumeSection';
import ContactSection from '../../components/ContactSection';
import RecruiterDialog from '../../components/RecruiterDialog';
import ResumeDialog, { useResumeAvailability } from '../../components/ResumeDialog';
import CommandPalette from '../../components/CommandPalette';
import { links, profile } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

function BootScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      return undefined;
    }
    const timeout = window.setTimeout(() => setVisible(false), 650);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[100] grid place-content-center bg-background text-center" role="status" aria-live="polite">
      <p className="font-cinzel text-3xl tracking-[0.25em] text-primary text-shadow-glow">MANNAN</p>
      <p className="mt-3 font-typewriter text-xs tracking-widest text-muted-foreground">INITIALIZING FIELD LINK...</p>
      <div className="mx-auto mt-5 h-px w-40 overflow-hidden bg-border">
        <div className="h-full w-full origin-left animate-pulse bg-merchant" />
      </div>
    </div>
  );
}

export default function Index() {
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const resumeAvailable = useResumeAvailability();

  useEffect(() => {
    ScrollTrigger.refresh();
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}`);
      toast.success('Portfolio link copied');
    } catch (error) {
      toast.error('Could not copy the link. Check clipboard permissions and try again.');
      console.error('Unable to copy portfolio URL.', error);
    }
  }, []);

  const runCommand = useCallback((action) => {
    const section = ['home', 'about', 'skills', 'projects', 'achievements', 'resume-section', 'contact'].find((item) => item === action);
    if (section) {
      document.getElementById(section === 'home' ? 'hero' : section === 'resume-section' ? 'resume' : section)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
      return;
    }
    if (action === 'recruiter') setRecruiterOpen(true);
    if (action === 'resume' && resumeAvailable) setResumeOpen(true);
    if (action === 'download' && resumeAvailable) {
      const anchor = document.createElement('a');
      anchor.href = profile.resumePath;
      anchor.download = 'Mannan_Maheshwari_Resume.pdf';
      anchor.click();
    }
    if (action === 'copy-link') void copyLink();
    const destinations = {
      'github-link': links.github,
      linkedin: links.linkedin,
      leetcode: links.leetcode,
      email: links.email,
    };
    if (destinations[action]) window.open(destinations[action], action === 'email' ? '_self' : '_blank', 'noopener,noreferrer');
  }, [copyLink, resumeAvailable]);

  useEffect(() => {
    const handleShortcut = (event) => {
      const target = event.target;
      const isTyping = target instanceof HTMLElement && (
        target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
      );
      if (event.key === 'Escape') {
        setCommandOpen(false);
        setRecruiterOpen(false);
        setResumeOpen(false);
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen(true);
        return;
      }
      if (event.key.toLowerCase() === 'r' && !event.metaKey && !event.ctrlKey && !event.altKey && !isTyping) {
        event.preventDefault();
        setRecruiterOpen(true);
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <BootScreen />
      <FogScene />
      <Navigation
        onOpenRecruiter={() => setRecruiterOpen(true)}
        onOpenCommand={() => setCommandOpen(true)}
        onCopyLink={copyLink}
      />
      <main className="relative z-10">
        <HeroSection
          onOpenRecruiter={() => setRecruiterOpen(true)}
          onOpenResume={resumeAvailable ? () => setResumeOpen(true) : null}
          onDownloadResume={resumeAvailable ? () => runCommand('download') : null}
        />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ResumeSection available={resumeAvailable} onPreview={() => setResumeOpen(true)} />
        <ContactSection onOpenRecruiter={() => setRecruiterOpen(true)} />
      </main>
      <footer className="relative z-10 border-t border-border py-8 pb-24 text-center lg:pb-8">
        <div className="container mx-auto px-6">
          <p className="font-typewriter text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Built with React &amp; Three.js
          </p>
          <p className="mt-2 font-typewriter text-xs text-muted-foreground">
            &quot;Heh heh heh... Thank you.&quot;
          </p>
        </div>
      </footer>
      <RecruiterDialog
        open={recruiterOpen}
        onOpenChange={setRecruiterOpen}
        onPreviewResume={() => { setRecruiterOpen(false); setResumeOpen(true); }}
        resumeAvailable={resumeAvailable}
      />
      <ResumeDialog open={resumeOpen} onOpenChange={setResumeOpen} available={resumeAvailable} />
      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onAction={runCommand}
        resumeAvailable={resumeAvailable}
      />
    </div>
  );
}
