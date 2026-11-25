import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

const commands = [
  { label: 'Go to Home', action: 'home' },
  { label: 'Go to About', action: 'about' },
  { label: 'Go to Skills', action: 'skills' },
  { label: 'Go to Projects', action: 'projects' },
  { label: 'Go to Achievements', action: 'achievements' },
  { label: 'Go to Resume', action: 'resume-section' },
  { label: 'Go to Contact', action: 'contact' },
  { label: 'Open Recruiter View', action: 'recruiter' },
  { label: 'Preview Resume', action: 'resume' },
  { label: 'Download Resume', action: 'download' },
  { label: 'Copy Link', action: 'copy-link' },
  { label: 'Open GitHub', action: 'github-link' },
  { label: 'Open LinkedIn', action: 'linkedin' },
  { label: 'Open LeetCode', action: 'leetcode' },
  { label: 'Email Mannan', action: 'email' },
];

export default function CommandPalette({ open, onOpenChange, onAction, resumeAvailable }) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search the field manual..." className="font-typewriter" />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty className="font-typewriter text-sm text-muted-foreground">No matching order.</CommandEmpty>
        <CommandGroup heading="Commands">
          {commands.filter((command) => resumeAvailable || !['resume', 'download'].includes(command.action)).map((command) => (
            <CommandItem
              key={command.action}
              value={command.label}
              onSelect={() => {
                onOpenChange(false);
                onAction(command.action);
              }}
              className="font-typewriter text-sm data-[selected=true]:bg-secondary data-[selected=true]:text-primary"
            >
              {command.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
