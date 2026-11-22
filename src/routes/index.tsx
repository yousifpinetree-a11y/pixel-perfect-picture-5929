import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/unknown/workspace';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'UNKNOWN — Operations' },
    { name: 'description', content: 'Enter the classified UNKNOWN investigation. Examine case files, follow evidence, and uncover a hidden network.' },
    { property: 'og:title', content: 'UNKNOWN — Operations' },
    { property: 'og:description', content: 'Enter the classified UNKNOWN investigation. Examine case files, follow evidence, and uncover a hidden network.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Page,
});

function Page() { return <Workspace/>; }
