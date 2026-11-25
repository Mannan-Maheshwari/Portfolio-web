import { journey, profile, skills } from '../data/portfolio';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 noise-overlay section-transition">
      <div className="container mx-auto px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <span className="font-typewriter text-sm tracking-widest text-merchant">— OPERATIVE PROFILE —</span>
            <h2 className="mb-8 mt-4 font-cinzel text-4xl text-foreground md:text-5xl">
              Building beyond <span className="text-primary text-shadow-glow">the interface.</span>
            </h2>
            <div className="space-y-6">
              <div className="relative overflow-hidden border-rustic bg-card p-6 box-shadow-merchant">
                <div className="absolute inset-0 opacity-10" aria-hidden="true">
                  {Array.from({ length: 8 }, (_, index) => <div key={index} className="h-6 border-b border-foreground/20" />)}
                </div>
                <div className="relative space-y-3 font-typewriter text-sm leading-loose text-typewriter">
                  <p><span className="text-merchant">&gt; NAME:</span> {profile.name}</p>
                  <p><span className="text-merchant">&gt; FOCUS:</span> {profile.role}, {profile.focus}</p>
                  <p><span className="text-merchant">&gt; LOCATION:</span> {profile.location}</p>
                  <p><span className="text-merchant">&gt; EDUCATION:</span> {profile.education.degree}</p>
                </div>
              </div>
              <p className="border-l-2 border-primary pl-5 font-crimson text-xl leading-relaxed text-foreground">
                {profile.aboutIntro}
              </p>
              {profile.aboutDetails.map((detail) => (
                <p key={detail} className="font-crimson text-lg leading-relaxed text-muted-foreground">
                  {detail}
                </p>
              ))}
            </div>
          </div>
          <aside className="border border-border bg-card/70 p-7 box-shadow-merchant">
            <span className="font-typewriter text-xs tracking-widest text-merchant">CURRENT OBJECTIVE</span>
            <blockquote className="mt-5 font-crimson text-2xl italic leading-relaxed text-foreground">
              &ldquo;{profile.missionQuote}&rdquo;
            </blockquote>
            <p className="mt-5 font-typewriter text-xs text-muted-foreground">
              B.Tech IT · Bharati Vidyapeeth&apos;s College of Engineering · GGSIPU · 2024–2028
            </p>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Areas of focus">
              {skills[0].items.slice(0, 4).map((skill) => (
                <span key={skill} className="border border-border bg-background/70 px-3 py-1.5 font-typewriter text-[10px] text-parchment">
                  {skill}
                </span>
              ))}
              <span className="border border-merchant/50 bg-background/70 px-3 py-1.5 font-typewriter text-[10px] text-merchant">
                Applied AI
              </span>
            </div>
          </aside>
        </div>
        {journey.length > 0 && (
          <div className="mt-16">
            <h3 className="mb-6 font-cinzel text-2xl text-primary">My Journey</h3>
            <ol className="grid gap-4 md:grid-cols-2">
              {journey.map((milestone) => (
                <li key={`${milestone.year}-${milestone.title}`} className="border border-border bg-card p-5">
                  <span className="font-typewriter text-xs text-merchant">{milestone.year}</span>
                  <h4 className="mt-2 font-cinzel text-lg text-foreground">{milestone.title}</h4>
                  {milestone.description && <p className="mt-2 font-crimson text-muted-foreground">{milestone.description}</p>}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
