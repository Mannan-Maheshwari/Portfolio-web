import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useCountUp from '../hooks/useCountUp';
import { achievements, certifications } from '../data/portfolio';

function CodingPlatformCard({ platform }) {
  const [ref, count] = useCountUp(platform.solved, Number.isFinite(platform.solved));
  return (
    <a href={platform.url} target="_blank" rel="noreferrer" className="block border-rustic bg-card p-6 transition-colors hover:border-primary">
      <span className="font-typewriter text-xs tracking-widest text-merchant">CODING PLATFORM</span>
      <h3 className="mt-3 font-cinzel text-xl text-primary">{platform.name}</h3>
      <strong ref={ref} className="mt-5 block font-cinzel text-4xl text-foreground">{count}</strong>
      <span className="font-typewriter text-xs text-muted-foreground">{platform.label}</span>
    </a>
  );
}

export default function AchievementsSection() {
  const [selected, setSelected] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const competitions = achievements.competitions;

  return (
    <section id="achievements" className="relative py-28 gradient-fog section-transition">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <span className="font-typewriter text-sm tracking-widest text-merchant">— CONFIRMED RECORD —</span>
          <h2 className="mt-4 font-cinzel text-4xl text-foreground md:text-5xl">Achievements</h2>
        </div>

        <div className="mb-14">
          <h3 className="mb-5 font-cinzel text-2xl text-primary">Coding Platforms</h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.codingPlatforms.map((platform) => <CodingPlatformCard key={platform.name} platform={platform} />)}
          </div>
        </div>

        {competitions.length > 0 && (
          <div className="mb-14">
            <h3 className="mb-5 font-cinzel text-2xl text-primary">Hackathons &amp; Ideathons</h3>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {competitions.map((award) => (
                <button
                  key={award.name}
                  type="button"
                  onClick={() => setSelected(award)}
                  className="border-2 border-village bg-card p-6 text-left box-shadow-merchant transition-colors hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  {award.certificate && (
                    <div className="mb-5 flex h-48 items-center justify-center overflow-hidden border border-border bg-white">
                      <img src={award.certificate} alt={`${award.name} certificate`} className="h-full w-full object-contain" loading="lazy" />
                    </div>
                  )}
                  <span className="font-typewriter text-xs tracking-widest text-muted-foreground">COMPETITION RESULT</span>
                  <h4 className="mt-3 font-cinzel text-xl text-foreground">{award.name}</h4>
                  <p className="mt-2 font-crimson text-muted-foreground">{award.organizer}</p>
                  <span className="mt-5 inline-block border border-merchant px-3 py-2 font-typewriter text-xs text-merchant">{award.result}</span>
                  <span className="mt-4 block font-typewriter text-[10px] text-muted-foreground">Open verified details</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {achievements.internships.length > 0 && (
          <div className="mb-14">
            <h3 className="mb-5 font-cinzel text-2xl text-primary">Internships</h3>
            <div className="grid gap-5 md:grid-cols-2">
              {achievements.internships.map((internship) => (
                <article key={internship.id || internship.organization} className="border-rustic bg-card p-6">
                  <h4 className="font-cinzel text-xl text-foreground">{internship.title}</h4>
                  <p className="mt-2 font-crimson text-muted-foreground">{internship.organization}</p>
                  {internship.period && <p className="mt-2 font-typewriter text-xs text-muted-foreground">{internship.period}</p>}
                  {internship.description && <p className="mt-4 font-crimson text-foreground/80">{internship.description}</p>}
                </article>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="mb-14">
            <h3 className="mb-5 font-cinzel text-2xl text-primary">Certifications</h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((certificate) => (
                <button
                  key={certificate.id || certificate.title}
                  type="button"
                  onClick={() => setSelectedCertificate(certificate)}
                  className="border-rustic bg-card p-6 text-left transition-colors hover:border-primary"
                >
                  <h4 className="font-cinzel text-lg text-foreground">{certificate.title}</h4>
                  <p className="mt-2 font-crimson text-muted-foreground">{certificate.issuer}</p>
                  {certificate.year && <p className="mt-2 font-typewriter text-xs text-muted-foreground">{certificate.year}</p>}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="mb-5 font-cinzel text-2xl text-primary">Academic</h3>
          <article className="border-rustic bg-card p-6 md:flex md:items-center md:justify-between">
            <div>
              <h4 className="font-cinzel text-xl text-foreground">{achievements.academic.degree}</h4>
              <p className="mt-2 font-crimson text-muted-foreground">{achievements.academic.institution}</p>
              <p className="mt-1 font-typewriter text-xs text-muted-foreground">{achievements.academic.location} · {achievements.academic.years}</p>
            </div>
            <p className="mt-5 font-cinzel text-lg text-merchant md:mt-0">CGPA {achievements.academic.cgpa}</p>
          </article>
        </div>
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-xl border-2 border-village bg-card text-foreground">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-cinzel text-2xl text-primary">{selected.name}</DialogTitle>
                <DialogDescription className="font-crimson text-base text-muted-foreground">
                  {selected.organizer} · {selected.result}
                </DialogDescription>
              </DialogHeader>
              {selected.certificate && (
                <img src={selected.certificate} alt={`${selected.name} certificate`} className="max-h-[70vh] w-full object-contain" />
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={Boolean(selectedCertificate)} onOpenChange={(open) => !open && setSelectedCertificate(null)}>
        <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto border-2 border-village bg-card text-foreground">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle className="font-cinzel text-2xl text-primary">{selectedCertificate.title}</DialogTitle>
                <DialogDescription className="font-crimson text-muted-foreground">{selectedCertificate.issuer}{selectedCertificate.year ? ` · ${selectedCertificate.year}` : ''}</DialogDescription>
              </DialogHeader>
              {selectedCertificate.file && (
                selectedCertificate.file.match(/\.(png|jpe?g|webp|gif)$/i) ? (
                  <img src={selectedCertificate.file} alt={`${selectedCertificate.title} certificate`} className="max-h-[70vh] w-full object-contain" />
                ) : (
                  <iframe title={`${selectedCertificate.title} certificate`} src={selectedCertificate.file} className="h-[70vh] w-full border border-border bg-white" />
                )
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
