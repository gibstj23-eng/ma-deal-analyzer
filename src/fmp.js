const BASE = 'https://financialmodelingprep.com/stable'

const wait = (ms) => new Promise(r => setTimeout(r, ms))

async function fmpFetch(path, apiKey, retries = 2) {
  const sep = path.includes('?') ? '&' : '?'
  const res = await fetch(`${BASE}${path}${sep}apikey=${apiKey}`)
  if (res.status === 429 || res.status === 402) {
    if (retries > 0) {
      await wait(2500)
      return fmpFetch(path, apiKey, retries - 1)
    }
    return null
  }
  if (!res.ok) throw new Error(`FMP API error: ${res.status}`)
  const data = await res.json()
  if (data?.['Error Message']) throw new Error(data['Error Message'])
  return data
}

const JUNK_PATTERNS = /\b(etf|fund|index|trust|fd\b|cl [a-z]|class [a-z]|series|preferred|warrant|note|bond|debenture)\b/i

function isRealCompany(name) {
  return !JUNK_PATTERNS.test(name || '')
}

function scoreName(name, query) {
  const n = (name || '').toLowerCase()
  const q = query.toLowerCase()
  if (n === q) return 100
  if (n.startsWith(q)) return 80
  if (n.includes(q)) return 60
  return 0
}

export async function searchCompany(query, apiKey) {
  const q = query.trim()

  const directProfile = await fmpFetch(`/profile?symbol=${q.toUpperCase()}`, apiKey)
  if (directProfile?.length && isRealCompany(directProfile[0].companyName)) {
    return { symbol: directProfile[0].symbol, name: directProfile[0].companyName }
  }

  const [nameResults, symbolResults] = await Promise.all([
    fmpFetch(`/search-name?query=${encodeURIComponent(q)}&limit=10`, apiKey),
    fmpFetch(`/search-symbol?query=${encodeURIComponent(q)}&limit=10`, apiKey),
  ])

  const combined = []
  const seen = new Set()
  for (const r of [...(symbolResults || []), ...(nameResults || [])]) {
    if (!seen.has(r.symbol)) {
      seen.add(r.symbol)
      combined.push(r)
    }
  }

  const usExchanges = new Set(['NASDAQ', 'NYSE', 'AMEX', 'NASDAQ Global Select'])
  const filtered = combined
    .filter(d => usExchanges.has(d.exchange || d.exchangeFullName || ''))
    .filter(d => isRealCompany(d.name || d.companyName))

  if (filtered.length) {
    filtered.sort((a, b) => {
      const aName = a.name || a.companyName || ''
      const bName = b.name || b.companyName || ''
      return scoreName(bName, q) - scoreName(aName, q)
    })
    return filtered[0]
  }

  const anyReal = combined.filter(d => isRealCompany(d.name || d.companyName))
  if (anyReal.length) return anyReal[0]
  if (combined.length) return combined[0]

  throw new Error(`No public company found for "${q}". Try a ticker symbol like AAPL or MSFT.`)
}

export async function getProfile(symbol, apiKey) {
  const data = await fmpFetch(`/profile?symbol=${symbol}`, apiKey)
  if (!data?.length) throw new Error(`No profile found for ${symbol}`)
  return data[0]
}

export async function getKeyMetrics(symbol, apiKey) {
  await wait(500)
  const data = await fmpFetch(`/key-metrics-ttm?symbol=${symbol}`, apiKey)
  if (!data?.length) return null
  return data[0]
}

export async function getRatios(symbol, apiKey) {
  await wait(500)
  const data = await fmpFetch(`/ratios-ttm?symbol=${symbol}`, apiKey)
  if (!data?.length) return null
  return data[0]
}

export async function getPeers(symbol, apiKey) {
  const data = await fmpFetch(`/stock-peers?symbol=${symbol}`, apiKey)
  if (!data?.length) return []
  return data.slice(0, 3)
}
