import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/unknown/workspace';

export const Route = createFileRoute('/intelligence')({
  head: () => ({ meta: [
    { title: 'UNKNOWN — Global Intelligence' },
    { name: 'description', content: 'Track surveillance locations and examine intelligence intercepts across the global network.' },
    { property: 'og:title', content: 'UNKNOWN — Global Intelligence' },
    { property: 'og:description', content: 'Track surveillance locations and examine intelligence intercepts across the global network.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Page,
});

function Page() { return <Workspace section="intelligence"/>; }
