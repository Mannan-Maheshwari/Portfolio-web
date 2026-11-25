import { useEffect, useState } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { profile } from '../data/portfolio';

export function useResumeAvailability() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(profile.resumePath, { method: 'HEAD', signal: controller.signal })
      .then((response) => {
        const contentType = response.headers.get('content-type') || '';
        setAvailable(response.ok && contentType.toLowerCase().includes('application/pdf'));
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setAvailable(false);
      });
    return () => controller.abort();
  }, []);

  return available;
}

export default function ResumeDialog({ open, onOpenChange, available }) {
  const [inlineFailed, setInlineFailed] = useState(false);

  useEffect(() => {
    if (open) setInlineFailed(false);
  }, [open]);

  if (!available) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[92vh] max-w-5xl flex-col border-2 border-village bg-card text-foreground">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-2xl text-primary">Resume // Personnel File</DialogTitle>
          <DialogDescription className="font-typewriter text-xs text-muted-foreground">Mannan Maheshwari</DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-3">
          <a href={profile.resumePath} download className="inline-flex items-center gap-2 border border-merchant px-4 py-2 font-typewriter text-xs text-merchant hover:bg-merchant/10">
            <Download size={14} /> Download
          </a>
          <a href={profile.resumePath} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-border px-4 py-2 font-typewriter text-xs text-foreground hover:border-primary">
            <ExternalLink size={14} /> Open in new tab
          </a>
        </div>
        {!inlineFailed ? (
          <iframe
            title="Mannan Maheshwari resume"
            src={`${profile.resumePath}#toolbar=0&view=FitH`}
            onError={() => setInlineFailed(true)}
            className="min-h-[55vh] w-full border border-border bg-white"
          />
        ) : (
          <div className="grid min-h-[45vh] place-content-center gap-4 border border-border bg-background p-6 text-center">
            <p className="font-crimson text-lg text-muted-foreground">Inline preview is unavailable in this browser. Open or download the PDF instead.</p>
            <a href={profile.resumePath} target="_blank" rel="noreferrer" className="font-typewriter text-sm text-merchant hover:text-primary">Open resume in new tab ↗</a>
          </div>
        )}
        <p className="font-crimson text-sm text-muted-foreground">
          If the preview does not render on this device, use Open in new tab or Download.
        </p>
      </DialogContent>
    </Dialog>
  );
}
