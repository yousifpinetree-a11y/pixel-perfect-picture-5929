import warehouse from '@/assets/warehouse.webp.asset.json';
import records from '@/assets/records.webp.asset.json';
import vehicle from '@/assets/vehicle.webp.asset.json';

export type Section = 'overview' | 'investigations' | 'evidence' | 'intelligence' | 'archive' | 'settings';
export const cases = [
  { id: '001', name: 'UNKNOWN', operation: 'The silent observer', status: 'ACTIVE', threat: 'HIGH', location: 'Los Angeles, USA', date: '14.11.2026', file: 'UNK-001-7742', notes: 'Subject remains at large. All known associates are under surveillance. Additional resources requested.' },
  { id: '002', name: 'GHOST SIGNAL', operation: 'The midnight transmission', status: 'ACTIVE', threat: 'ELEVATED', location: 'Berlin, Germany', date: '13.11.2026', file: 'GST-002-8193', notes: 'Encrypted transmissions intercepted near the eastern sector. Signal repeats every 72 hours. Source remains unconfirmed.' },
  { id: '003', name: 'BLACK WATER', operation: 'The missing manifest', status: 'UNDER REVIEW', threat: 'MODERATE', location: 'Hong Kong', date: '12.11.2026', file: 'BLW-003-6021', notes: 'Unregistered vessel entered port at 03:17. Cargo manifest was altered. Two witnesses are in protective custody.' },
  { id: '004', name: 'NIGHTFALL', operation: 'The last rendezvous', status: 'CLOSED', threat: 'LOW', location: 'London, UK', date: '08.11.2026', file: 'NGT-004-1108', notes: 'Subject identified and detained. All collected evidence has been transferred to the secure archive. Operation concluded.' },
];
export type CaseFile = (typeof cases)[number];
export const evidence = [
  { id: '047', title: 'Security footage — Warehouse', type: 'Video', date: '14.11.2026', time: '22:17:33', image: warehouse.url, caseId: '001', location: 'Los Angeles · Sector 07', detail: 'Camera 04 captured an unidentified individual entering the east loading bay. The subject remained inside for 17 minutes. Footage has been preserved; facial identification is inconclusive.', source: 'CCTV / CAM-04', isNew: true },
  { id: '046', title: 'Financial records', type: 'Document', date: '13.11.2026', time: '09:12:17', image: records.url, caseId: '001', location: 'Zurich · Financial district', detail: 'Recovered ledger links three shell companies to a series of unreported transfers. Account identifiers are redacted pending cross-agency authorization.', source: 'FIELD RECOVERY / AGENT 09', isNew: false },
  { id: '045', title: 'Communication log', type: 'Audio', date: '12.11.2026', time: '17:45:09', image: '', caseId: '002', location: 'Berlin · Eastern sector', detail: 'Intercepted transmission, 43 seconds. Transcript: “The observer is in position. Do not use the original route. Wait for the third signal.” Voice attribution remains pending.', source: 'SIGNAL INTELLIGENCE / FREQ 87.4', isNew: false },
  { id: '044', title: 'Unidentified vehicle', type: 'Photo', date: '12.11.2026', time: '02:31:48', image: vehicle.url, caseId: '001', location: 'Los Angeles · Warehouse district', detail: 'Black sedan observed outside the warehouse perimeter. License plate is obscured. Vehicle matches a sighting near the subject’s last known address.', source: 'SURVEILLANCE / UNIT 12', isNew: false },
];
export type Evidence = (typeof evidence)[number];
export function filterEvidence(query: string, type: string) {
  const needle = query.trim().toLowerCase();
  return evidence.filter(item => (type === 'All' || item.type === type) && `${item.id} ${item.title} ${item.location}`.toLowerCase().includes(needle));
}
export const events = [
  { title: 'Initial alert', date: '11.11.2026', time: '06:42 UTC', detail: 'An anonymous source submitted a photograph and a single coordinate. Case UNK-001-7742 was opened under restricted clearance.' },
  { title: 'First contact', date: '12.11.2026', time: '14:08 UTC', detail: 'Field agent 09 made contact with an associate of the subject. The source confirmed activity in the warehouse district.' },
  { title: 'Surveillance begins', date: '13.11.2026', time: '00:15 UTC', detail: 'Surveillance units deployed to sectors 04 and 07. Communications monitoring established across three locations.' },
  { title: 'Evidence found', date: '14.11.2026', time: '22:17 UTC', detail: 'Security footage recovered from camera 04. Subject’s movements are consistent with the original intelligence report.' },
  { title: 'Status: active', date: 'Ongoing', time: 'AWAITING ANALYSIS', detail: 'Analyze the recovered warehouse footage and cross-reference financial records. The subject is still at large.' },
];
export const locations = [
  { name: 'Los Angeles', lat: '34.0522° N', lon: '118.2437° W', x: 123, y: 112, detail: 'Primary surveillance zone. Last confirmed subject sighting.', agents: '04', position: 'marker-la' },
  { name: 'Berlin', lat: '52.5200° N', lon: '13.4050° E', x: 387, y: 75, detail: 'Encrypted signal detected. Source under investigation.', agents: '02', position: 'marker-berlin' },
  { name: 'Hong Kong', lat: '22.3193° N', lon: '114.1694° E', x: 588, y: 135, detail: 'Port surveillance active. Unregistered cargo under review.', agents: '03', position: 'marker-hk' },
];