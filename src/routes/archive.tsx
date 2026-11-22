import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/unknown/workspace';

export const Route = createFileRoute('/archive')({
  head: () => ({ meta: [
    { title: 'UNKNOWN — Secure Archive' },
    { name: 'description', content: 'Review concluded UNKNOWN investigations and restricted archived case records.' },
    { property: 'og:title', content: 'UNKNOWN — Secure Archive' },
    { property: 'og:description', content: 'Review concluded UNKNOWN investigations and restricted archived case records.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Page,
});

function Page() { return <Workspace section="archive"/>; }
