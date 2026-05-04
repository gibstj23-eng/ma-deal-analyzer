const BASE = 'https://financialmodelingprep.com/stable'

const wait = (ms) => new Promise(r => setTimeout(r, ms))

async function fmpFetch(path, apiKey, retries = 2) {
  const sep = path.includes('?') ? '&' : '?'
  const res = await fetch(`${BASE}${path}${sep}apikey=${apiKey}`)
  if (res.status === 429 || res.status === 402) {
    if (retries > 0) {
      await wait(2000)
      return fmpFetch(path, apiKey, retries - 1)
    }
    return null
  }
  if (!res.ok) throw new Error(`FMP API error: ${res.status}`)
  const data = await res.json()
  if (data?.['Error Message']) throw new Error(data['Error Message'])
  return data
}

export async function searchCompany(query, apiKey) {
  const nameResults = await fmpFetch(`/search-name?query=${encodeURIComponent(query)}&limit=5`, apiKey)
  const symbolResults = await fmpFetch(`/search-symbol?query=${encodeURIComponent(query)}&limit=5`, apiKey)

  const combined = []
  const seen = new Set()
  for (const r of [...(symbolResults || []), ...(nameResults || [])]) {
    if (!seen.has(r.symbol)) {
      seen.add(r.symbol)
      combined.push(r)
    }
  }

  const usListed = combined.filter(d =>
    ['NASDAQ', 'NYSE', 'AMEX', 'NASDAQ Global Select'].includes(d.exchange || d.exchangeFullName)
  )
  const noEtfs = (usListed.length ? usListed : combined).filter(d => {
    const name = (d.name || d.companyName || '').toLowerCase()
    return !name.includes(' etf') && !name.includes(' fund') && !name.includes(' index')
  })

  const results = noEtfs.length ? noEtfs : (usListed.length ? usListed : combined)
  if (!results.length) throw new Error(`No public company found for "${query}". Try a ticker symbol like AAPL or MSFT.`)
  return results[0]
}

export async function getProfile(symbol, apiKey) {
  const data = await fmpFetch(`/profile?symbol=${symbol}`, apiKey)
  if (!data?.length) throw new Error(`No profile found for ${symbol}`)
  return data[0]
}

export async function getKeyMetrics(symbol, apiKey) {
  await wait(300)
  const data = await fmpFetch(`/key-metrics-ttm?symbol=${symbol}`, apiKey)
  if (!data?.length) return null
  return data[0]
}

export async function getRatios(symbol, apiKey) {
  await wait(300)
  const data = await fmpFetch(`/ratios-ttm?symbol=${symbol}`, apiKey)
  if (!data?.length) return null
  return data[0]
}

export async function getPeers(symbol, apiKey) {
  const data = await fmpFetch(`/stock-peers?symbol=${symbol}`, apiKey)
  if (!data?.length) return []
  return data.slice(0, 3)
}
