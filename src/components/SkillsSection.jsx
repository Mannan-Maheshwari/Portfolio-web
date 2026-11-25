import { skills } from '../data/portfolio';

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 gradient-fog section-transition">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <span className="font-typewriter text-sm tracking-widest text-merchant">— TECH ARSENAL —</span>
          <h2 className="mt-4 font-cinzel text-4xl text-foreground md:text-5xl">Equipment &amp; Skills</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {skills.map((group) => (
            <article key={group.group} className="border-rustic bg-card p-6">
              <h3 className="font-cinzel text-xl text-primary">{group.group}</h3>
              <p className="mb-5 mt-2 font-typewriter text-xs text-muted-foreground">{group.description}</p>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li key={skill} className="border border-border bg-secondary/70 px-3 py-2 font-typewriter text-xs text-parchment">
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
