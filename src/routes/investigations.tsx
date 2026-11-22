import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/unknown/workspace';

export const Route = createFileRoute('/investigations')({
  head: () => ({ meta: [
    { title: 'UNKNOWN — Investigations' },
    { name: 'description', content: 'Explore active classified case dossiers and unresolved operations in UNKNOWN.' },
    { property: 'og:title', content: 'UNKNOWN — Investigations' },
    { property: 'og:description', content: 'Explore active classified case dossiers and unresolved operations in UNKNOWN.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Page,
});

function Page() { return <Workspace section="investigations"/>; }
