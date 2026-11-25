import { Download, ExternalLink, FileText } from 'lucide-react';
import { profile } from '../data/portfolio';

export default function ResumeSection({ available, onPreview }) {
  return (
    <section id="resume" className="relative py-24 gradient-fog section-transition">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-9 text-center">
            <span className="font-typewriter text-sm tracking-widest text-merchant">— PERSONNEL FILE —</span>
            <h2 className="mt-4 font-cinzel text-4xl text-foreground md:text-5xl">Resume</h2>
          </div>
          <div className="relative overflow-hidden border-2 border-village bg-card p-7 box-shadow-merchant sm:p-9">
            <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-10 opacity-[0.06]">
              <FileText size={190} strokeWidth={0.7} />
            </div>
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="font-typewriter text-xs tracking-widest text-merchant">MANNAN MAHESHWARI · {profile.role.toUpperCase()}</p>
                <p className="mt-3 font-crimson text-lg leading-relaxed text-foreground/85">
                  View or download my resume for a concise summary of my education, projects, and technical experience.
                </p>
                {!available && (
                  <p className="mt-4 border-l-2 border-merchant/70 pl-3 font-typewriter text-xs leading-relaxed text-muted-foreground">
                    Resume PDF not added yet. Add it to <code className="text-parchment">public\resume\</code> as <code className="text-parchment">Mannan_Maheshwari_Resume.pdf</code>.
                  </p>
                )}
              </div>
              {available && (
                <div className="flex shrink-0 flex-col gap-3 sm:min-w-48">
                  <button type="button" onClick={onPreview} className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 font-cinzel text-xs tracking-wider text-primary-foreground transition-colors hover:bg-merchant focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    <FileText size={15} /> PREVIEW RESUME
                  </button>
                  <a href={profile.resumePath} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 border border-border px-5 py-3 font-typewriter text-xs text-foreground transition-colors hover:border-primary hover:text-primary">
                    <ExternalLink size={14} /> OPEN IN NEW TAB
                  </a>
                  <a href={profile.resumePath} download className="inline-flex items-center justify-center gap-2 border border-merchant/70 px-5 py-3 font-typewriter text-xs text-merchant transition-colors hover:bg-merchant/10">
                    <Download size={14} /> DOWNLOAD PDF
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
