import { BriefcaseBusiness, Github, Linkedin, Mail } from 'lucide-react';
import { links, profile } from '../data/portfolio';

export default function ContactSection({ onOpenRecruiter }) {
  return (
    <section id="contact" className="relative py-28 noise-overlay section-transition">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="font-typewriter text-sm tracking-widest text-merchant">— SAVE POINT —</span>
            <h2 className="mt-4 mb-5 font-cinzel text-4xl text-foreground md:text-5xl"><span className="text-primary text-shadow-glow">Contact</span> Me</h2>
            <p className="font-crimson text-xl text-muted-foreground">Have a mission in mind? Let&apos;s make a deal.</p>
          </div>
          <div className="border-rustic bg-card p-7 text-center sm:p-10">
            <p className="font-typewriter text-xs tracking-widest text-merchant">DIRECT CHANNEL</p>
            <a href={links.email} className="mt-4 inline-flex max-w-full items-center gap-3 break-all font-cinzel text-xl text-foreground hover:text-primary sm:text-2xl">
              <Mail className="shrink-0" size={20} />{profile.email}
            </a>
            <p className="mt-3 font-typewriter text-xs text-muted-foreground">{profile.location}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-border px-5 py-3 font-typewriter text-xs text-foreground hover:border-primary hover:text-primary"><Linkedin size={15} /> LinkedIn</a>
              <a href={links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-border px-5 py-3 font-typewriter text-xs text-foreground hover:border-primary hover:text-primary"><Github size={15} /> GitHub</a>
              <button type="button" onClick={onOpenRecruiter} className="inline-flex items-center gap-2 border border-merchant px-5 py-3 font-typewriter text-xs text-merchant hover:bg-merchant/10"><BriefcaseBusiness size={15} /> Recruiter Quick View</button>
            </div>
          </div>
          <p className="mt-12 text-center font-typewriter text-sm italic text-muted-foreground">&quot;Come back anytime.&quot;</p>
        </div>
      </div>
    </section>
  );
}
