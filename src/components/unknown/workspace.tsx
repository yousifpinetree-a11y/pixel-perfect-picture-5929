import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, Archive, Bell, Check, ChevronLeft, ChevronRight, CircleDot, Crosshair, FileSearch, Fingerprint, FolderClosed, Globe2, LockKeyhole, Menu, Radio, Search, Settings2, ShieldCheck, Signal, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Brand } from './brand';
import { Dossier } from './dossier';
import { TrackingMap } from './tracking-map';
import { EvidenceIcon, EvidenceLog, EvidenceThumbnail } from './evidence-log';
import { Timeline } from './timeline';
import { cases, events, filterEvidence, type CaseFile, type Evidence, type Section } from '@/lib/investigation';
import operationsRoom from '@/assets/operations-room.png.asset.json';

const navigation = [
  { name: 'Overview', to: '/', icon: CircleDot },
  { name: 'Investigations', to: '/investigations', icon: FileSearch },
  { name: 'Evidence', to: '/evidence', icon: Fingerprint },
  { name: 'Intelligence', to: '/intelligence', icon: Globe2 },
  { name: 'Archive', to: '/archive', icon: Archive },
  { name: 'Settings', to: '/settings', icon: Settings2 },
] as const;

export function Workspace({ section = 'overview' }: { section?: Section }) {
  const [entered, setEntered] = useState(false);
  const [entering, setEntering] = useState(false);
  const [ready, setReady] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [file, setFile] = useState<CaseFile>(cases[0] ?? { id: '001', name: 'UNKNOWN', operation: 'The silent observer', status: 'ACTIVE', threat: 'HIGH', location: 'Los Angeles', date: '14.11.2026', file: 'UNK-001-7742', notes: 'Subject remains at large.' });
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [dossierOpen, setDossierOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [progress, setProgress] = useState(3);
  const [briefing, setBriefing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [scanlines, setScanlines] = useState(true);
  const [motion, setMotion] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [clock, setClock] = useState('14:37:22');

  useEffect(() => {
    setEntered(sessionStorage.getItem('unknown-access') === 'granted');
    setReady(true);
    const tick = () => setClock(new Date().toISOString().slice(11, 19));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  function enter() {
    setEntering(true);
    sessionStorage.setItem('unknown-access', 'granted');
    window.setTimeout(() => { setEntered(true); setEntering(false); }, 1100);
  }

  const event = selectedEvent === null ? null : events[selectedEvent];
  const filteredEvidence = filterEvidence(query, filter);
  const sectionTitle = section === 'overview' ? 'OPERATIONS OVERVIEW' : section.toUpperCase();

  return <div className={`unknown-app ${scanlines ? 'has-scanlines' : ''} ${!motion ? 'motion-disabled' : ''}`}>
    {!entered ? <div className={`opening ${entering ? 'opening-exit' : ''}`}>
      <img className="opening-background" src={operationsRoom.url} alt="Classified investigation files in a dimly lit intelligence operations room"/>
      <div className="opening-shade"/>
      <header className="opening-header"><span><span className="live-dot"/> INTELLIGENCE DIVISION</span><span><LockKeyhole size={12}/> RESTRICTED ACCESS</span></header>
      <main className="opening-content"><div className="opening-eyebrow"><span className="short-rule"/> NOTHING IS WHAT IT SEEMS</div><Brand large/><p className="opening-subtitle">Every trace tells a story.<br/>Some were never meant to be found.</p><Button variant="agency" className="start-button" onClick={enter} disabled={!ready || entering}>{entering ? <><span className="loading-spinner"/> ESTABLISHING SECURE CONNECTION</> : <>START INVESTIGATION <ArrowRight size={20}/></>}</Button><div className="opening-clearance"><ShieldCheck size={13}/><span>CLASSIFIED ACCESS ONLY · CLEARANCE LEVEL 04</span></div></main>
      <footer className="opening-footer"><span>UNKNOWN INTELLIGENCE PLATFORM <b>v1.0.0</b></span><span><span className="live-dot"/> SECURE ENVIRONMENT <span className="footer-divider">/</span> FICTIONAL SIMULATION</span></footer>
      <div className="opening-edge-code">UNK / 001 / 7742</div>
    </div> : <>
      <header className="app-header"><div className="header-identity"><Button variant="ghost" size="icon" className="mobile-menu" title="Toggle navigation" aria-label="Toggle navigation" onClick={() => setCollapsed(!collapsed)}><Menu/></Button><Link to="/" className="brand-home"><Brand/></Link><div className="platform-label">INTELLIGENCE PLATFORM <span>v1.0.0</span><br/>CLASSIFIED ACCESS ONLY</div></div><div className="header-status"><span className="header-live"><span className="live-dot"/> LIVE</span><span className="header-clock">{clock} UTC</span><Signal size={21}/><span className="agent-avatar">A<span>07</span></span></div></header>
      <div className={`workspace-layout ${collapsed ? 'nav-collapsed' : ''}`}>
        <aside className="agency-sidebar"><div className="sidebar-topline"><span>COMMAND CENTER</span><Button variant="ghost" size="icon" title={collapsed ? 'Expand navigation' : 'Collapse navigation'} aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'} onClick={() => setCollapsed(!collapsed)}>{collapsed ? <ChevronRight size={13}/> : <ChevronLeft size={13}/>}</Button></div><nav>{navigation.map(item => <Button variant="navigation" asChild key={item.name} title={item.name}><Link to={item.to} activeOptions={{exact: true}} activeProps={{className:'is-active'}}><item.icon size={17}/><span>{item.name.toUpperCase()}</span></Link></Button>)}</nav><div className="sidebar-stats"><div className="sidebar-stat"><span>ACTIVE CASES</span><div className="case-count">12 <small>+2</small><svg viewBox="0 0 90 28" aria-hidden="true"><path d="M0 25L8 20L16 23L24 10L32 18L40 14L48 21L56 8L64 15L72 5L80 10L90 0"/></svg></div></div><div className="sidebar-stat"><span>THREAT LEVEL</span><strong>ELEVATED</strong><div className="threat-meter"/></div></div><div className="sidebar-globe"><svg viewBox="0 0 240 240" aria-hidden="true"><defs><radialGradient id="globe-shade"><stop offset="0" stopColor="var(--globe-fill)"/><stop offset="1" stopColor="var(--background)"/></radialGradient></defs><circle cx="120" cy="120" r="104" fill="url(#globe-shade)"/><g className="globe-grid"><circle cx="120" cy="120" r="104"/><ellipse cx="120" cy="120" rx="42" ry="104"/><ellipse cx="120" cy="120" rx="78" ry="104"/><ellipse cx="120" cy="120" rx="104" ry="35"/><ellipse cx="120" cy="120" rx="104" ry="72"/><path d="M16 120h208M120 16v208"/><path className="globe-land" d="M60 45l20-10 17 10-4 15 20 7-15 16 4 23-20 5-10-18-19-2-11-19zM94 124l22-8 20 15-7 25-14 14-4 28-10-15-4-30zM144 61l25-9 23 15-1 22 12 11-13 10-21-5-12 17-20-13 6-20-15-8z"/></g><path className="globe-route" d="M65 83Q150 5 186 79Q210 150 107 166Q30 149 65 83"/><g className="globe-dots"><circle cx="65" cy="83" r="3"/><circle cx="186" cy="79" r="3"/><circle cx="107" cy="166" r="3"/></g></svg><span>GLOBAL OPERATIONS<br/><b>NETWORK SECURE</b></span></div><div className="sidebar-agent"><ShieldCheck size={18}/><div>AGENT 007<span>LEVEL 04 CLEARANCE</span></div></div></aside>
        <main className="workspace-main"><div className="workspace-topline"><span><span className="red-square"/> {sectionTitle}</span><span className="workspace-clearance"><LockKeyhole size={11}/> EYES ONLY <span>/</span> SECTOR 07</span></div>
          <div className="page-transition" key={section}>
          {section === 'overview' && <><div className="overview-grid"><div className="case-area"><div className="case-area-heading"><span>CASE <b>#{file.id}</b></span><span><span className="live-dot"/> INVESTIGATION ACTIVE</span></div><Dossier file={file} onOpen={() => setDossierOpen(true)}/></div><div className="overview-intelligence"><TrackingMap/><EvidenceLog onSelect={setSelectedEvidence}/></div></div><div className="overview-bottom"><Timeline onSelect={setSelectedEvent} progress={progress}/><Button variant="agency" className="continue-button" onClick={() => setBriefing(true)}>CONTINUE INVESTIGATION <ArrowRight size={18}/></Button></div><div className="operations-note"><Radio size={12}/><span>LATEST INTELLIGENCE</span><p>Unidentified activity detected in Sector 07. Warehouse footage requires analysis.</p><span className="note-time">22:17 UTC</span></div></>}
          {(section === 'investigations' || section === 'archive') && <><SectionHeader eyebrow={section === 'archive' ? 'CLOSED OPERATIONS' : 'FIELD OPERATIONS'} title={section === 'archive' ? 'Secure archive' : 'Case directory'} subtitle={section === 'archive' ? 'Concluded investigations. Restricted records.' : 'Active files. Unresolved questions.'}/><div className="case-directory">{cases.filter(item => section === 'archive' ? item.status === 'CLOSED' : item.status !== 'CLOSED').map(item => <Button variant="evidence" className="case-card" key={item.id} onClick={() => {setFile(item); setDossierOpen(true);}}><span className="case-card-top"><FolderClosed size={26}/><span>CASE #{item.id}</span><ArrowUpRight size={17}/></span><h2>{item.name}</h2><p>{item.operation}</p><div className="case-card-meta"><span>{item.location}</span><span>{item.date}</span></div><div className="case-card-footer"><span className="status-tag"><span className="live-dot"/>{item.status}</span><span>{item.threat} THREAT</span></div></Button>)}</div><div className="directory-footer"><LockKeyhole size={12}/> ALL RECORDS ARE CLASSIFIED · LEVEL 04 AUTHORIZATION</div></>}
          {section === 'evidence' && <><SectionHeader eyebrow="COLLECTED INTELLIGENCE" title="Evidence registry" subtitle="Every detail matters. Follow the trace."/><div className="evidence-toolbar"><div className="evidence-search"><Search size={17}/><Input aria-label="Search evidence" placeholder="Search evidence, ID, or location…" value={query} onChange={e => setQuery(e.target.value)}/></div><div className="evidence-filters">{['All', 'Video', 'Document', 'Audio', 'Photo'].map(type => <Button variant="ghost" key={type} className={filter === type ? 'filter-active' : ''} onClick={() => setFilter(type)}>{type}</Button>)}</div></div><div className="result-count"><SlidersHorizontal size={12}/>{filteredEvidence.length.toString().padStart(2,'0')} RECORDS FOUND</div><div className="evidence-grid">{filteredEvidence.map(item => <Button variant="evidence" className="evidence-card" key={item.id} onClick={() => setSelectedEvidence(item)}><div className="evidence-card-image"><EvidenceThumbnail item={item}/><span className="image-evidence-id">EVIDENCE #{item.id}</span>{item.isNew && <span className="new-label">NEW</span>}</div><div className="evidence-card-body"><span className="evidence-type"><EvidenceIcon type={item.type}/>{item.type.toUpperCase()} <span>CASE #{item.caseId}</span></span><h3>{item.title}</h3><p>{item.location}</p><footer><span>{item.date} · {item.time}</span><ArrowUpRight size={15}/></footer></div></Button>)}</div>{filteredEvidence.length === 0 && <div className="empty-state"><FileSearch size={34}/><h3>No matching evidence</h3><p>No records match your current search.</p><Button variant="agency" onClick={() => {setQuery(''); setFilter('All');}}>CLEAR FILTERS <X size={14}/></Button></div>}</>}
          {section === 'intelligence' && <><SectionHeader eyebrow="SURVEILLANCE NETWORK" title="Global intelligence" subtitle="Three locations. One interconnected operation."/><TrackingMap expanded/><div className="intel-reports"><h3>SIGNAL INTERCEPTS</h3>{[{label:'SECTOR 07 / LOS ANGELES',title:'Subject movement confirmed',text:'Warehouse entry recorded at 22:17. Field units maintaining a perimeter. No direct contact authorized.'},{label:'EASTERN SECTOR / BERLIN',title:'Encrypted transmission detected',text:'A repeating signal matches a previously intercepted communication. Cross-reference with evidence #045.'}].map(report => <article key={report.label}><Radio size={19}/><div><span>{report.label}</span><h4>{report.title}</h4><p>{report.text}</p></div><span className="status-tag">VERIFIED</span></article>)}</div></>}
          {section === 'settings' && <><SectionHeader eyebrow="AGENT PREFERENCES" title="System configuration" subtitle="Local terminal settings. Clearance level 04."/><div className="settings-section"><h3>DISPLAY & OPERATIONS</h3>{[{id:'scanlines', title:'Surveillance overlay',description:'Scan-line texture on the terminal display.',value:scanlines,change:setScanlines},{id:'motion',title:'Cinematic motion',description:'Opening transitions and interface animations.',value:motion,change:setMotion},{id:'alerts',title:'Intelligence alerts',description:'Show the local notification indicator.',value:alerts,change:setAlerts}].map(setting => <div className="setting-row" key={setting.id}><div><label htmlFor={setting.id}>{setting.title}</label><p>{setting.description}</p></div><Switch id={setting.id} checked={setting.value} onCheckedChange={setting.change}/></div>)}</div><div className="settings-section"><h3>TERMINAL SESSION</h3><div className="terminal-info"><span>AGENT ID<b>007</b></span><span>CLEARANCE<b>LEVEL 04</b></span><span>ENVIRONMENT<b>LOCAL SIMULATION</b></span></div><Button variant="agency" onClick={() => {sessionStorage.removeItem('unknown-access');setEntered(false);}}>LOCK TERMINAL <LockKeyhole size={15}/></Button></div></>}
          </div>
          <footer className="workspace-footer"><span><ShieldCheck size={12}/> ENCRYPTED CONNECTION <span className="footer-divider">/</span> LOCAL SIMULATION</span><span>UNKNOWN INTELLIGENCE DIVISION <span className="footer-divider">©</span> 2026 {alerts && <Bell size={12}/>}</span></footer>
        </main>
      </div>
    </>}
    <Dialog open={selectedEvidence !== null} onOpenChange={open => {if (!open) setSelectedEvidence(null);}}><DialogContent className="agency-dialog">{selectedEvidence && <><span className="dialog-eyebrow">CLASSIFIED / EVIDENCE #{selectedEvidence.id}</span><DialogTitle>{selectedEvidence.title}</DialogTitle><DialogDescription>{selectedEvidence.location} · {selectedEvidence.date} {selectedEvidence.time}</DialogDescription><div className="evidence-detail-image"><EvidenceThumbnail item={selectedEvidence}/></div><div className="dialog-detail-meta"><span><EvidenceIcon type={selectedEvidence.type}/>{selectedEvidence.type.toUpperCase()}</span><span>CASE #{selectedEvidence.caseId}</span><span>VERIFIED</span></div><p className="detail-narrative">{selectedEvidence.detail}</p><div className="chain-of-custody"><ShieldCheck size={16}/><div>CHAIN OF CUSTODY INTACT<span>{selectedEvidence.source}</span></div></div></>}</DialogContent></Dialog>
    <Dialog open={dossierOpen} onOpenChange={setDossierOpen}><DialogContent className="agency-dialog dossier-dialog"><span className="dialog-eyebrow">RESTRICTED FILE / {file.file}</span><DialogTitle>Case #{file.id} — {file.name}</DialogTitle><DialogDescription>{file.operation} · {file.location}</DialogDescription><Dossier file={file} compact/><Button variant="agency" onClick={() => {setDossierOpen(false);setBriefing(true);}}>REVIEW NEXT DIRECTIVE <ArrowRight size={15}/></Button></DialogContent></Dialog>
    <Dialog open={selectedEvent !== null} onOpenChange={open => {if (!open) setSelectedEvent(null);}}><DialogContent className="agency-dialog">{event && <><span className="dialog-eyebrow">OPERATION CHRONOLOGY / CASE UNK-001</span><DialogTitle>{event.title}</DialogTitle><DialogDescription>{event.date} · {event.time}</DialogDescription><div className="event-detail"><CircleDot size={25}/><p>{event.detail}</p></div><span className="dialog-footnote">ENTRY VERIFIED / INTELLIGENCE DIVISION</span></>}</DialogContent></Dialog>
    <Dialog open={briefing} onOpenChange={setBriefing}><DialogContent className="agency-dialog"><span className="dialog-eyebrow">NEXT DIRECTIVE / CASE #{file.id}</span><DialogTitle>{analysisComplete ? 'Analysis complete' : 'Follow the warehouse trail'}</DialogTitle><DialogDescription>{analysisComplete ? 'The investigation timeline has been updated.' : 'PRIORITY HIGH · AUTHORIZATION LEVEL 04'}</DialogDescription><div className="briefing-icon">{analysisComplete ? <Check size={32}/> : <Crosshair size={32}/>}</div><p className="detail-narrative">{analysisComplete ? 'A vehicle in the recovered footage matches evidence #044. A new surveillance lead has been established in Sector 07. The subject remains at large.' : 'The subject entered the warehouse at 22:17. Review the recovered footage and compare the vehicle outside with existing surveillance records.'}</p><div className="directive-steps"><span><Check size={14}/> Recover warehouse footage</span><span><Check size={14}/> Verify chain of custody</span><span><CircleDot size={14}/> Cross-reference vehicle identity</span></div><Button variant="agency" onClick={() => {if (analysisComplete) setBriefing(false); else {setAnalysisComplete(true);setProgress(4);}}}>{analysisComplete ? 'RETURN TO OPERATIONS' : 'ANALYZE EVIDENCE'} <ArrowRight size={15}/></Button><span className="dialog-footnote">SIMULATED ANALYSIS / NO EXTERNAL SYSTEMS CONNECTED</span></DialogContent></Dialog>
  </div>;
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return <header className="section-header"><span>{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></header>;
}