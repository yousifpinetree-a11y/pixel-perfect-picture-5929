import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/unknown/workspace';

export const Route = createFileRoute('/settings')({
  head: () => ({ meta: [
    { title: 'UNKNOWN — Terminal Settings' },
    { name: 'description', content: 'Configure your UNKNOWN intelligence terminal and local agent preferences.' },
    { property: 'og:title', content: 'UNKNOWN — Terminal Settings' },
    { property: 'og:description', content: 'Configure your UNKNOWN intelligence terminal and local agent preferences.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Page,
});

function Page() { return <Workspace section="settings"/>; }
