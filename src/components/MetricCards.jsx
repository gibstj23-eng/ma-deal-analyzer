function MetricCard({ label, value, sub }) {
  return (
    <div style={{
      background: 'var(--navy-3)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '20px 24px',
      flex: 1,
      minWidth: 160,
    }}>
      <div style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--white-20)',
        marginBottom: 8,
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: 28,
        fontWeight: 700,
        color: 'var(--white)',
        letterSpacing: '-0.01em',
        lineHeight: 1,
      }}>{value}</div>
      {sub && (
        <div style={{ fontSize: 12, color: 'var(--white-50)', marginTop: 6 }}>{sub}</div>
      )}
    </div>
  )
}

export default function MetricCards({ metrics }) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
      <MetricCard label="EV / EBITDA" value={metrics.ev_ebitda} sub="Acquisition multiple" />
      <MetricCard label="P / E Ratio" value={metrics.pe_ratio} sub="Price-to-earnings" />
      <MetricCard label="Control Premium" value={metrics.premium} sub="vs. 30-day VWAP" />
      <MetricCard label="Deal Size" value={metrics.deal_size} sub="Enterprise value" />
    </div>
  )
}
