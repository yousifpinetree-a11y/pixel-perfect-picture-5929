import { useState } from 'react';
import { Crosshair, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { worldPaths } from '@/assets/world-map';
import { locations } from '@/lib/investigation';

export function TrackingMap({ expanded = false }: { expanded?: boolean }) {
  const [active, setActive] = useState(0);
  const location = locations[active] ?? locations[0];
  if (!location) return null;
  return <section className={`tracking-panel technical-panel ${expanded ? 'tracking-expanded' : ''}`}>
    <div className="panel-heading"><span><Crosshair size={13} /> GLOBAL TRACKING</span><span className="tiny-live">LIVE FEED</span></div>
    <div className="tracking-graphic">
      <svg viewBox="0 0 720 360" preserveAspectRatio="xMidYMid meet" className="world-map" aria-label="Global surveillance map">
        <defs><pattern id="map-grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M 36 0 L 0 0 0 36" className="map-grid-line" fill="none" /></pattern></defs>
        <rect width="720" height="360" fill="url(#map-grid)" />
        <g>{worldPaths.map((path, index) => <path key={index} d={path} className="country" />)}</g>
        <path d="M123 112 Q260 0 387 75 Q500 10 588 135" className="tracking-route" />
        {locations.map((point, index) => <g key={point.name} className={index === active ? 'map-point active' : 'map-point'}><circle cx={point.x} cy={point.y} r={index === active ? 33 : 12} className="map-ring" /><circle cx={point.x} cy={point.y} r={index === active ? 20 : 5} className="map-ring" /><circle cx={point.x} cy={point.y} r="4" className="map-dot" /><path d={`M${point.x - 42} ${point.y}h84M${point.x} ${point.y - 42}v84`} className="map-crosshair" /></g>)}
      </svg>
      {locations.map((point, index) => <Button key={point.name} variant="ghost" size="icon" className={`map-marker ${point.position}`} aria-label={`Track ${point.name}`} title={`Track ${point.name}`} onClick={() => setActive(index)}><span className="sr-only">{point.name}</span></Button>)}
      <div className="map-coordinates"><span>LAT {location.lat}</span><span>LON {location.lon}</span></div>
      <span className="map-sector">SAT-LINK 07 / ENCRYPTED</span>
    </div>
    <div className="tracking-location"><Radio size={12}/><span>{location.name.toUpperCase()}</span><span className="location-state">TRACKING</span></div>
    {expanded && <div className="tracking-details"><p>{location.detail}</p><span>{location.agents} FIELD AGENTS DEPLOYED</span></div>}
  </section>;
}