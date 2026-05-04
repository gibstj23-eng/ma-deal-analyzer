const ICONS = {
  rationale: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  synergies: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),
  risks: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
}

const COLORS = {
  rationale: { icon: 'var(--accent)', bg: 'var(--accent-dim)', border: 'var(--accent-glow)' },
  synergies: { icon: 'var(--green)', bg: 'var(--green-dim)', border: 'rgba(34,197,94,0.3)' },
  risks: { icon: 'var(--red)', bg: 'var(--red-dim)', border: 'rgba(239,68,68,0.3)' },
}

function BulletCard({ title, items, type }) {
  const c = COLORS[type]
  return (
    <div style={{
      background: 'var(--navy-3)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '22px 24px',
      flex: 1,
      minWidth: 260,
    }}>
      <h3 style={{
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        color: c.icon,
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{
          background: c.bg,
          border: `1px solid ${c.border}`,
          borderRadius: 6,
          width: 26,
          height: 26,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: c.icon,
        }}>{ICONS[type]}</span>
        {title}
      </h3>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{
              flexShrink: 0,
              marginTop: 3,
              width: 18,
              height: 18,
              borderRadius: 4,
              background: c.bg,
              border: `1px solid ${c.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--mono)',
              fontSize: 10,
              fontWeight: 700,
              color: c.icon,
            }}>{i + 1}</span>
            <span style={{ fontSize: 14, color: 'var(--white-80)', lineHeight: 1.55 }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function BulletSection({ rationale, synergies, risks }) {
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
      <BulletCard title="Strategic Rationale" items={rationale} type="rationale" />
      <BulletCard title="Synergy Opportunities" items={synergies} type="synergies" />
      <BulletCard title="Key Risks" items={risks} type="risks" />
    </div>
  )
}
