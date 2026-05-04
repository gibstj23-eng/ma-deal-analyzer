const VERDICT_CONFIG = {
  Compelling: {
    color: 'var(--green)',
    bg: 'var(--green-dim)',
    border: 'rgba(34, 197, 94, 0.35)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
  Cautious: {
    color: 'var(--yellow)',
    bg: 'var(--yellow-dim)',
    border: 'rgba(234, 179, 8, 0.35)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  Avoid: {
    color: 'var(--red)',
    bg: 'var(--red-dim)',
    border: 'rgba(239, 68, 68, 0.35)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    ),
  },
}

export default function VerdictBadge({ verdict, rationale }) {
  const cfg = VERDICT_CONFIG[verdict] || VERDICT_CONFIG.Cautious

  return (
    <div style={{
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderRadius: 12,
      padding: '20px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      flexWrap: 'wrap',
    }}>
      <div style={{
        width: 52,
        height: 52,
        borderRadius: 12,
        background: 'rgba(0,0,0,0.2)',
        border: `1px solid ${cfg.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: cfg.color,
        flexShrink: 0,
      }}>{cfg.icon}</div>
      <div style={{ flex: 1, minWidth: 200 }}>
        <div style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: 4,
        }}>Final Verdict</div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}>
          <span style={{
            fontSize: 22,
            fontWeight: 800,
            color: cfg.color,
            letterSpacing: '-0.01em',
          }}>{verdict}</span>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
            {rationale}
          </span>
        </div>
      </div>
    </div>
  )
}
