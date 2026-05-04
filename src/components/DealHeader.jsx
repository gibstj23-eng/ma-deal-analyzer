export default function DealHeader({ data }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--navy-3) 0%, var(--navy-4) 100%)',
      border: '1px solid var(--border-strong)',
      borderRadius: 16,
      padding: '32px 36px',
      marginBottom: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              background: 'var(--accent-dim)',
              padding: '3px 10px',
              borderRadius: 4,
              border: '1px solid var(--accent-glow)',
            }}>{data.sector}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--white)' }}>
              {data.target}
            </h1>
            {data.acquirer && data.acquirer !== 'Strategic Buyer TBD' && (
              <>
                <span style={{ color: 'var(--white-20)', fontSize: 24, fontWeight: 300 }}>×</span>
                <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--accent)' }}>
                  {data.acquirer}
                </h1>
              </>
            )}
          </div>
          <p style={{ fontSize: 15, color: 'var(--white-50)', fontStyle: 'italic', marginTop: 8, maxWidth: 600 }}>
            {data.headline}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--white-20)',
            marginBottom: 4,
          }}>Implied Deal Size</div>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 32,
            fontWeight: 700,
            color: 'var(--white)',
            letterSpacing: '-0.02em',
          }}>{data.metrics.deal_size}</div>
        </div>
      </div>
    </div>
  )
}
