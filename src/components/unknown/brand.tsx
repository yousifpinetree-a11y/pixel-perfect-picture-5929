export function Brand({ large = false }: { large?: boolean }) {
  return <div className={large ? 'brand brand-large' : 'brand'} aria-label="UNKNOWN"><span className="brand-bracket">[</span><span>UNKN<span className="brand-o">O</span>WN</span><span className="brand-bracket">]</span></div>;
}