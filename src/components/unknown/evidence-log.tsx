import { ArrowRight, AudioLines, FileText, Film, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { evidence, type Evidence } from '@/lib/investigation';
import { Link } from '@tanstack/react-router';

export function EvidenceThumbnail({ item }: { item: Evidence }) {
  return item.image ? <img src={item.image} alt={item.title} /> : <div className="audio-wave" aria-label="Intercepted audio waveform">{Array.from({ length: 37 }, (_, i) => <i key={i} className={`wave-bar wave-${i % 9}`}/>)}</div>;
}
export function EvidenceIcon({ type }: { type: string }) {
  const Icon = type === 'Video' ? Film : type === 'Audio' ? AudioLines : type === 'Photo' ? Image : FileText;
  return <Icon size={14}/>;
}
export function EvidenceLog({ onSelect }: { onSelect: (item: Evidence) => void }) {
  return <section className="evidence-log technical-panel"><div className="panel-heading"><span>EVIDENCE LOG</span><Button variant="ghost" asChild className="view-all"><Link to="/evidence">VIEW ALL <ArrowRight size={12}/></Link></Button></div><div className="evidence-rows">{evidence.slice(0, 3).map(item => <Button variant="evidence" key={item.id} className={item.isNew ? 'evidence-row is-new' : 'evidence-row'} onClick={() => onSelect(item)}><div className="evidence-thumb"><EvidenceThumbnail item={item}/></div><div className="evidence-row-info"><span>EVIDENCE #{item.id}</span><strong>{item.title}</strong><small>{item.date} {item.time}</small></div>{item.isNew && <span className="new-label">NEW</span>}</Button>)}</div></section>;
}