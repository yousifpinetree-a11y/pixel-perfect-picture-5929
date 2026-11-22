import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/unknown/workspace';

export const Route = createFileRoute('/evidence')({
  head: () => ({ meta: [
    { title: 'UNKNOWN — Evidence Registry' },
    { name: 'description', content: 'Search surveillance footage, financial records, photographs and intercepted communications.' },
    { property: 'og:title', content: 'UNKNOWN — Evidence Registry' },
    { property: 'og:description', content: 'Search surveillance footage, financial records, photographs and intercepted communications.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Page,
});

function Page() { return <Workspace section="evidence"/>; }
