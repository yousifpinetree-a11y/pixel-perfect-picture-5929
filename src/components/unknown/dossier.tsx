import { ArrowUpRight, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import portrait from '@/assets/subject.png.asset.json';
import type { CaseFile } from '@/lib/investigation';

export function Dossier({ file, onOpen, compact = false }: { file: CaseFile; onOpen?: () => void; compact?: boolean }) {
  return <div className={`dossier-stage ${compact ? 'dossier-compact' : ''}`}>
    <div className="stage-corner top-left"/><div className="stage-corner bottom-right"/>
    <span className="stage-label">RESTRICTED / LEVEL 04</span>
    <div className="dossier-stack"><article className="case-dossier">
      <div className="paperclip"/>
      <header className="dossier-heading"><span>CASE FILE</span><span>No. {file.id}</span></header>
      <div className="dossier-content">
        <div className="subject-photo"><img src={portrait.url} alt="Redacted surveillance portrait of the unidentified subject" /><span>SUBJECT IDENTIFICATION: UNCONFIRMED</span></div>
        <div className="subject-information">
          <dl><div><dt>SUBJECT:</dt><dd>{file.name}</dd></div><div><dt>STATUS:</dt><dd>{file.status}</dd></div><div><dt>THREAT:</dt><dd className="paper-red">{file.threat}</dd></div></dl>
          <dl className="last-seen"><div><dt>LAST SEEN:</dt><dd>{file.date}</dd></div><div><dt>LOCATION:</dt><dd>{file.id === '001' ? 'UNKNOWN' : file.location}</dd></div></dl>
          <div className="intelligence-notes"><h3>INTELLIGENCE NOTES:</h3><p>{file.notes}</p></div>
        </div>
      </div>
      <div className="classified-stamp">CLASSIFIED</div>
      <footer className="dossier-footer"><span className="barcode"/><span>FILE: {file.file}</span><Fingerprint size={30}/></footer>
    </article></div>
    {onOpen && <Button variant="ghost" className="open-dossier" onClick={onOpen}>OPEN DOSSIER <ArrowUpRight size={14}/></Button>}
    <span className="stage-bottom-label">INTELLIGENCE DIVISION / ORIGINAL DOCUMENT</span>
  </div>;
}