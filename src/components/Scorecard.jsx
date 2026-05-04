const LABELS = {
  strategic_fit: 'Strategic Fit',
  financial_attractiveness: 'Financial Attractiveness',
  synergy_potential: 'Synergy Potential',
  execution_risk: 'Execution Risk',
  market_timing: 'Market Timing',
}

function getBarColor(key, value) {
  if (key === 'execution_risk') {
    if (value >= 70) return 'var(--red)'
    if (value >= 40) return 'var(--yellow)'
    return 'var(--green)'
  }
  if (value >= 70) return 'var(--green)'
  if (value >= 40) return 'var(--accent)'
  return 'var(--red)'
}

function ScoreRow({ label, value, scoreKey }) {
  const color = getBarColor(scoreKey, value)
  const isRisk = scoreKey === 'execution_risk'

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: 'var(--white-80)', fontWeight: 500 }}>
          {label}
          {isRisk && (
            <span style={{ fontSize: 11, color: 'var(--white-20)', marginLeft: 8, fontWeight: 400 }}>(lower is better)</span>
          )}
        </span>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: 14,
          fontWeight: 700,
          color,
        }}>{value}</span>
      </div>
      <div style={{
        height: 6,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 3,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${value}%`,
          background: color,
          borderRadius: 3,
          transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: `0 0 8px ${color}60`,
        }} />
      </div>
    </div>
  )
}

export default function Scorecard({ scorecard }) {
  const keys = Object.keys(LABELS)
  const weightedScore = Math.round(
    keys.reduce((sum, k) => sum + scorecard[k], 0) / keys.length
  )

  return (
    <div style={{
      background: 'var(--navy-3)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '24px 28px',
      marginBottom: 24,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h3 style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--white-50)',
        }}>Deal Scorecard</h3>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--white-20)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>
            Composite Score
          </div>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 32,
            fontWeight: 800,
            color: weightedScore >= 60 ? 'var(--green)' : weightedScore >= 40 ? 'var(--yellow)' : 'var(--red)',
            lineHeight: 1,
          }}>{weightedScore}<span style={{ fontSize: 16, fontWeight: 400, color: 'var(--white-20)' }}>/100</span></div>
        </div>
      </div>
      {keys.map(k => (
        <ScoreRow key={k} scoreKey={k} label={LABELS[k]} value={scorecard[k]} />
      ))}
    </div>
  )
}
