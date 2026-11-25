import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { achievements, links, profile, projects, skills } from '../data/portfolio';

const topProjects = [...projects]
  .sort((first, second) => Number(second.featured) - Number(first.featured) || first.order - second.order)
  .slice(0, 3);
const topSkills = skills.slice(0, 2).flatMap((group) => group.items).slice(0, 10);

function createSummary() {
  const projectsSummary = topProjects.map((project) => `- ${project.title}: ${project.tagline}`).join('\n');
  const awardsSummary = achievements.competitions.map((award) => `- ${award.result}, ${award.name} (${award.organizer})`).join('\n');
  return [
    `${profile.name} — ${profile.role}, ${profile.focus}`,
    `Location: ${profile.location}`,
    ...profile.pitch,
    `Education: ${profile.education.degree}, ${profile.education.institution}, ${profile.education.years}, CGPA ${profile.education.cgpa}`,
    `Top skills: ${topSkills.join(', ')}`,
    'Selected projects:',
    projectsSummary,
    'Highlights:',
    awardsSummary,
    `LeetCode: ${achievements.codingPlatforms[0].solved} problems solved`,
  ].join('\n');
}

export default function RecruiterDialog({ open, onOpenChange, onPreviewResume, resumeAvailable }) {
  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(createSummary());
      toast.success('Recruiter summary copied');
    } catch (error) {
      toast.error('Could not copy the summary. Check clipboard permissions and try again.');
      console.error('Unable to copy recruiter summary.', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto border-2 border-village bg-card text-foreground">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-2xl text-primary md:text-3xl">Mission File // {profile.name}</DialogTitle>
          <DialogDescription className="font-typewriter text-xs text-merchant">60-SECOND RECRUITER BRIEF</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-6">
            <div>
              <p className="font-cinzel text-lg text-foreground">{profile.role} · {profile.focus}</p>
              <p className="mt-1 font-typewriter text-xs text-muted-foreground">{profile.location}{profile.availability ? ` · ${profile.availability}` : ''}</p>
              <div className="mt-4 space-y-1 font-crimson text-base text-foreground/85">
                {profile.pitch.map((line) => <p key={line}>{line}</p>)}
              </div>
            </div>

            <section className="border border-border bg-background/70 p-4">
              <h3 className="font-typewriter text-xs tracking-widest text-merchant">EDUCATION</h3>
              <p className="mt-2 font-cinzel text-base text-foreground">{profile.education.degree}</p>
              <p className="font-crimson text-muted-foreground">{profile.education.institution}, {profile.education.location}</p>
              <p className="mt-1 font-typewriter text-xs text-muted-foreground">{profile.education.years} · CGPA {profile.education.cgpa}</p>
            </section>

            <section>
              <h3 className="mb-3 font-typewriter text-xs tracking-widest text-merchant">TOP SKILLS</h3>
              <div className="flex flex-wrap gap-2">{topSkills.map((skill) => <span key={skill} className="border border-border px-2 py-1 font-typewriter text-[10px] text-parchment">{skill}</span>)}</div>
            </section>

            <section>
              <h3 className="mb-3 font-typewriter text-xs tracking-widest text-merchant">SELECTED PROJECTS</h3>
              <div className="space-y-3">
                {topProjects.map((project) => (
                  <article key={project.id} className="border border-border bg-background/60 p-3">
                    <h4 className="font-cinzel text-base text-primary">{project.title}</h4>
                    <p className="mt-1 font-crimson text-sm text-foreground/80">{project.tagline}</p>
                    {project.tech.length > 0 && <p className="mt-2 font-typewriter text-[10px] text-muted-foreground">{project.tech.join(' · ')}</p>}
                    <div className="mt-2 flex gap-4 font-typewriter text-[10px]">
                      {project.links.live && <a href={project.links.live} target="_blank" rel="noreferrer" className="text-merchant hover:text-primary">Live ↗</a>}
                      {project.links.github && <a href={project.links.github} target="_blank" rel="noreferrer" className="text-merchant hover:text-primary">GitHub ↗</a>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="border border-border bg-background/70 p-4">
              <h3 className="font-typewriter text-xs tracking-widest text-merchant">HIGHLIGHTS</h3>
              <ul className="mt-3 space-y-3 font-crimson text-sm text-foreground/85">
                {achievements.competitions.map((award) => <li key={award.name}><strong className="text-foreground">{award.result}</strong> — {award.name}</li>)}
                <li><strong className="text-foreground">{achievements.codingPlatforms[0].solved}</strong> LeetCode problems solved</li>
              </ul>
            </section>
            <div className="grid grid-cols-2 gap-2">
              {resumeAvailable && <button type="button" onClick={onPreviewResume} className="border border-merchant px-3 py-3 font-typewriter text-[10px] text-merchant hover:bg-merchant/10">Preview Resume</button>}
              {resumeAvailable && <a href={profile.resumePath} download className="border border-merchant px-3 py-3 text-center font-typewriter text-[10px] text-merchant hover:bg-merchant/10">Download Resume</a>}
              <a href={links.email} className="border border-border px-3 py-3 text-center font-typewriter text-[10px] text-foreground hover:border-primary">Email</a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="border border-border px-3 py-3 text-center font-typewriter text-[10px] text-foreground hover:border-primary">LinkedIn</a>
              <a href={links.github} target="_blank" rel="noreferrer" className="border border-border px-3 py-3 text-center font-typewriter text-[10px] text-foreground hover:border-primary">GitHub</a>
              <a href={links.leetcode} target="_blank" rel="noreferrer" className="border border-border px-3 py-3 text-center font-typewriter text-[10px] text-foreground hover:border-primary">LeetCode</a>
            </div>
            <button type="button" onClick={copySummary} className="w-full border border-primary bg-primary/10 px-4 py-3 font-typewriter text-xs text-primary hover:bg-primary/20">Copy summary</button>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}
