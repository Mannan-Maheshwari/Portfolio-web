import { useMemo, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { projects } from '../data/portfolio';

const categoryLabel = (category) =>
  category === 'fullstack' ? 'Full-Stack' : category.charAt(0).toUpperCase() + category.slice(1);

const orderedProjects = [...projects].sort(
  (first, second) => Number(second.featured) - Number(first.featured) || first.order - second.order,
);

export default function ProjectsSection() {
  const categories = useMemo(
    () => [...new Set(orderedProjects.flatMap((project) => project.categories))],
    [],
  );
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const visibleProjects = orderedProjects.filter(
    (project) => filter === 'all' || project.categories.includes(filter),
  );

  return (
    <section id="projects" className="relative py-32 gradient-fog section-transition">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <span className="font-typewriter text-sm tracking-widest text-merchant">— THE MERCHANT&apos;S WARES —</span>
          <h2 className="mt-4 mb-6 font-cinzel text-4xl text-foreground md:text-5xl">
            What Are Ya <span className="text-primary text-shadow-glow">Buyin&apos;</span>?
          </h2>
          <p className="mx-auto max-w-2xl font-crimson text-xl text-muted-foreground">
            A field inventory of shipped work and systems in progress.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3" aria-label="Filter projects">
          {['all', ...categories].map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
              className={`border px-4 py-2 font-typewriter text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                filter === category
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card/70 text-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {category === 'all' ? 'All' : categoryLabel(category)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative flex min-w-0 cursor-pointer flex-col overflow-hidden border-2 border-village bg-card p-6 box-shadow-merchant transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-5 flex h-40 items-center justify-center overflow-hidden border border-border bg-gradient-to-br from-secondary via-background to-village/70">
                {project.image ? (
                  <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <div className="px-6 text-center font-typewriter text-sm tracking-[0.2em] text-merchant/80">
                    <span className="block text-3xl text-primary/80">✦</span>
                  </div>
                )}
              </div>

              <div className="mb-3 flex flex-wrap items-center gap-2">
                {project.featured && <span className="border border-merchant/60 px-2 py-1 font-typewriter text-[10px] text-merchant">FEATURED</span>}
                {project.status && (
                  <span className="border border-border px-2 py-1 font-typewriter text-[10px] text-muted-foreground">
                    {project.status === 'in-progress' ? 'IN PROGRESS' : project.status.toUpperCase()}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                aria-label={`Open details for ${project.title}`}
              >
                <h3 className="mb-3 font-cinzel text-xl text-primary text-shadow-glow">{project.title}</h3>
                <p className="mb-5 font-crimson leading-relaxed text-foreground/80">{project.tagline}</p>
              </button>

              {project.tech.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span key={item} className="border border-border bg-secondary px-3 py-1 font-typewriter text-[11px] text-parchment">
                      {item}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border/70 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="font-typewriter text-xs text-foreground/70 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  Click to inspect
                </button>
                {project.links.live && (
                  <a href={project.links.live} onClick={(event) => event.stopPropagation()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-typewriter text-xs text-merchant hover:text-primary">
                    Live <ExternalLink size={13} />
                  </a>
                )}
                {project.links.github && (
                  <a href={project.links.github} onClick={(event) => event.stopPropagation()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-typewriter text-xs text-merchant hover:text-primary">
                    GitHub <Github size={13} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        <p className="mt-16 text-center font-typewriter text-sm italic text-muted-foreground">
          &quot;Ahhh... I&apos;ll buy it at a high price!&quot;
        </p>
      </div>

      <Dialog open={Boolean(selectedProject)} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-2 border-village bg-card text-foreground">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="font-cinzel text-2xl text-primary">{selectedProject.title}</DialogTitle>
                <DialogDescription className="font-crimson text-muted-foreground">{selectedProject.tagline}</DialogDescription>
              </DialogHeader>
              {selectedProject.description && <p className="font-crimson leading-relaxed text-foreground/90">{selectedProject.description}</p>}
              {selectedProject.tech.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((item) => <span key={item} className="border border-border px-3 py-1 font-typewriter text-xs text-parchment">{item}</span>)}
                </div>
              )}
              {selectedProject.highlights?.length > 0 && (
                <ul className="list-inside list-disc space-y-2 font-crimson text-foreground/80">
                  {selectedProject.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              )}
              <div className="flex flex-wrap gap-4">
                {selectedProject.links.live && <a className="font-typewriter text-sm text-merchant hover:text-primary" href={selectedProject.links.live} target="_blank" rel="noreferrer">Open live project ↗</a>}
                {selectedProject.links.github && <a className="font-typewriter text-sm text-merchant hover:text-primary" href={selectedProject.links.github} target="_blank" rel="noreferrer">Open source ↗</a>}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
