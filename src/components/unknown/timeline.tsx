import { events } from '@/lib/investigation';
import { Button } from '@/components/ui/button';

export function Timeline({ onSelect, progress }: { onSelect: (index: number) => void; progress: number }) {
  return <section className="timeline technical-panel"><div className="panel-heading"><span>INVESTIGATION TIMELINE</span><span className="timeline-case">UNK-001</span></div><div className="timeline-events">{events.map((event, index) => <Button variant="ghost" key={event.title} className={`timeline-event ${index === 0 || index === progress ? 'highlighted' : ''}`} onClick={() => onSelect(index)}><span className="timeline-node"/><strong>{event.title.toUpperCase()}</strong><small>{event.date}</small></Button>)}</div></section>;
}