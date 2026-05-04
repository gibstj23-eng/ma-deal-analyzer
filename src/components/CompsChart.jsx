import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function CompsChart({ target, comps, targetEvEbitda }) {
  const targetVal = parseFloat(String(targetEvEbitda).replace('x', '')) || 0
  const labels = [target, ...comps.map(c => c.name)]
  const evEbitdaVals = [targetVal, ...comps.map(c => c.ev_ebitda)]
  const peVals = [null, ...comps.map(c => c.pe)]

  const data = {
    labels,
    datasets: [
      {
        label: 'EV/EBITDA',
        data: evEbitdaVals,
        backgroundColor: labels.map((_, i) =>
          i === 0 ? 'rgba(59, 130, 246, 0.85)' : 'rgba(59, 130, 246, 0.25)'
        ),
        borderColor: labels.map((_, i) =>
          i === 0 ? 'rgba(59, 130, 246, 1)' : 'rgba(59, 130, 246, 0.5)'
        ),
        borderWidth: 1.5,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111d35',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        titleColor: '#fff',
        bodyColor: 'rgba(255,255,255,0.7)',
        padding: 12,
        callbacks: {
          label: ctx => ` ${ctx.parsed.y.toFixed(1)}x EV/EBITDA`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: 'rgba(255,255,255,0.5)',
          font: { family: 'Inter', size: 12 },
        },
        border: { color: 'rgba(255,255,255,0.06)' },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: {
          color: 'rgba(255,255,255,0.4)',
          font: { family: 'JetBrains Mono', size: 11 },
          callback: v => `${v}x`,
        },
        border: { color: 'rgba(255,255,255,0.06)' },
      },
    },
  }

  const peData = {
    labels,
    datasets: [
      {
        label: 'P/E',
        data: peVals,
        backgroundColor: labels.map((_, i) =>
          i === 0 ? 'rgba(34, 197, 94, 0.85)' : 'rgba(34, 197, 94, 0.25)'
        ),
        borderColor: labels.map((_, i) =>
          i === 0 ? 'rgba(34, 197, 94, 1)' : 'rgba(34, 197, 94, 0.5)'
        ),
        borderWidth: 1.5,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  }

  const peOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      tooltip: {
        ...options.plugins.tooltip,
        callbacks: {
          label: ctx => ctx.parsed.y != null ? ` ${ctx.parsed.y.toFixed(1)}x P/E` : ' N/A',
        },
      },
    },
    scales: {
      ...options.scales,
      y: {
        ...options.scales.y,
        ticks: {
          ...options.scales.y.ticks,
          callback: v => `${v}x`,
        },
      },
    },
  }

  return (
    <div style={{
      background: 'var(--navy-3)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '24px 28px',
      marginBottom: 24,
    }}>
      <h3 style={{
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--white-50)',
        marginBottom: 20,
      }}>Trading Comps — Valuation Multiples</h3>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, marginBottom: 12, letterSpacing: '0.04em' }}>
            EV / EBITDA
          </div>
          <div style={{ height: 200 }}>
            <Bar data={data} options={options} />
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600, marginBottom: 12, letterSpacing: '0.04em' }}>
            PRICE / EARNINGS
          </div>
          <div style={{ height: 200 }}>
            <Bar data={peData} options={peOptions} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
        {comps.map(c => (
          <div key={c.name} style={{ display: 'flex', gap: 16, alignItems: 'center', minWidth: 200 }}>
            <span style={{ fontSize: 12, color: 'var(--white-50)' }}>{c.name}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--white-80)' }}>{c.ev_ebitda}x</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--white-50)' }}>{c.pe}x P/E</span>
          </div>
        ))}
      </div>
    </div>
  )
}
