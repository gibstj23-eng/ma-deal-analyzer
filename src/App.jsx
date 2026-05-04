import { useState } from 'react'
import { analyzeDeal } from './analyze.js'
import DealHeader from './components/DealHeader.jsx'
import MetricCards from './components/MetricCards.jsx'
import CompsChart from './components/CompsChart.jsx'
import BulletSection from './components/BulletSection.jsx'
import Scorecard from './components/Scorecard.jsx'
import VerdictBadge from './components/VerdictBadge.jsx'

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ animation: 'spin 0.8s linear infinite' }}>
      <path d="M21 12a9 9 0 11-6.219-8.56"/>
    </svg>
  )
}

export default function App() {
  const [target, setTarget] = useState('')
  const [acquirer, setAcquirer] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function handleAnalyze(e) {
    e.preventDefault()
    if (!target.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await analyzeDeal(target, acquirer)
      setResult(data)
    } catch (err) {
      setError(err.message || 'Analysis failed. Check your API key and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .analyze-btn:hover:not(:disabled) { background: #2563eb !important; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(59,130,246,0.4) !important; }
        .analyze-btn:active:not(:disabled) { transform: translateY(0); }
        .analyze-btn { transition: all 0.18s ease; }
        .input-field:focus { border-color: rgba(59,130,246,0.6) !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.12); outline: none; }
        .input-field { transition: border-color 0.15s, box-shadow 0.15s; }
        .result-section { animation: fadeIn 0.4s ease forwards; }
        @media (max-width: 640px) {
          .hero-title { font-size: 28px !important; }
          .form-row { flex-direction: column !important; }
        }
      `}</style>

      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--border)',
        background: 'rgba(10,15,30,0.9)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 800,
              color: '#fff',
              fontFamily: 'var(--mono)',
              flexShrink: 0,
            }}>M</div>
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>M&A Deal Analyzer</span>
          </div>
          <div style={{
            fontSize: 11,
            color: 'var(--white-20)',
            letterSpacing: '0.04em',
          }}>Built by John Gibson</div>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 64px' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '60px 0 48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'var(--accent-dim)',
            border: '1px solid var(--accent-glow)',
            borderRadius: 100,
            padding: '4px 14px',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: 20,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 6px var(--accent)',
              animation: 'pulse 2s infinite',
            }}/>
            Powered by Claude
          </div>
          <h1 className="hero-title" style={{
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--white)',
            marginBottom: 14,
          }}>
            AI-Powered M&A<br />
            <span style={{ color: 'var(--accent)' }}>Deal Analysis</span>
          </h1>
          <p style={{
            fontSize: 16,
            color: 'var(--white-50)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Enter any public company to generate a full acquisition analysis — valuation, comps, synergies, risks, and deal verdict.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleAnalyze} style={{ marginBottom: 48 }}>
          <div style={{
            background: 'var(--navy-3)',
            border: '1px solid var(--border-strong)',
            borderRadius: 16,
            padding: '28px 32px',
          }}>
            <div className="form-row" style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
              <div style={{ flex: 2 }}>
                <label style={{
                  display: 'block',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--white-20)',
                  marginBottom: 8,
                }}>Target Company *</label>
                <input
                  className="input-field"
                  type="text"
                  value={target}
                  onChange={e => setTarget(e.target.value)}
                  placeholder="e.g. Adobe Inc."
                  required
                  style={{
                    width: '100%',
                    background: 'var(--navy-2)',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    padding: '12px 16px',
                    fontSize: 15,
                    color: 'var(--white)',
                    '::placeholder': { color: 'var(--white-20)' },
                  }}
                />
              </div>
              <div style={{ flex: 2 }}>
                <label style={{
                  display: 'block',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--white-20)',
                  marginBottom: 8,
                }}>Acquirer (optional)</label>
                <input
                  className="input-field"
                  type="text"
                  value={acquirer}
                  onChange={e => setAcquirer(e.target.value)}
                  placeholder="e.g. Salesforce"
                  style={{
                    width: '100%',
                    background: 'var(--navy-2)',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    padding: '12px 16px',
                    fontSize: 15,
                    color: 'var(--white)',
                  }}
                />
              </div>
              <div style={{ flex: 0, display: 'flex', alignItems: 'flex-end' }}>
                <button
                  className="analyze-btn"
                  type="submit"
                  disabled={loading || !target.trim()}
                  style={{
                    background: loading || !target.trim() ? 'rgba(59,130,246,0.4)' : 'var(--accent)',
                    color: 'var(--white)',
                    border: 'none',
                    borderRadius: 10,
                    padding: '12px 24px',
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    whiteSpace: 'nowrap',
                    cursor: loading || !target.trim() ? 'not-allowed' : 'pointer',
                    height: 48,
                  }}
                >
                  {loading ? <SpinnerIcon /> : <SearchIcon />}
                  {loading ? 'Analyzing...' : 'Analyze Deal'}
                </button>
              </div>
            </div>
            {loading && (
              <div style={{
                fontSize: 12,
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <SpinnerIcon />
                Generating full M&A analysis — this takes ~10 seconds…
              </div>
            )}
          </div>
        </form>

        {/* Error */}
        {error && (
          <div style={{
            background: 'var(--red-dim)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 10,
            padding: '14px 20px',
            fontSize: 14,
            color: 'var(--red)',
            marginBottom: 24,
          }}>
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="result-section">
            <DealHeader data={result} />
            <MetricCards metrics={result.metrics} />
            <CompsChart
              target={result.target}
              comps={result.comps}
              targetEvEbitda={result.metrics.ev_ebitda}
            />
            <BulletSection
              rationale={result.strategic_rationale}
              synergies={result.synergies}
              risks={result.risks}
            />
            <Scorecard scorecard={result.scorecard} />
            <VerdictBadge verdict={result.verdict} rationale={result.verdict_rationale} />
          </div>
        )}

        {/* Empty state */}
        {!result && !loading && !error && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--white-20)' }}>
            <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.3 }}>⟳</div>
            <div style={{ fontSize: 14 }}>Enter a company name above to generate your analysis</div>
          </div>
        )}

      </main>

      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '20px 24px',
        textAlign: 'center',
        fontSize: 12,
        color: 'var(--white-20)',
      }}>
        M&A Deal Analyzer · Built by John Gibson · Powered by Claude AI
        <span style={{ marginLeft: 8, color: 'var(--red-dim)', fontSize: 11 }}>
          For informational purposes only. Not financial advice.
        </span>
      </footer>
    </>
  )
}
