const BASE = 'https://financialmodelingprep.com/stable'

async function fmpFetch(path, apiKey) {
  const sep = path.includes('?') ? '&' : '?'
  const res = await fetch(`${BASE}${path}${sep}apikey=${apiKey}`)
  if (!res.ok) throw new Error(`FMP API error: ${res.status}`)
  const data = await res.json()
  if (data?.['Error Message']) throw new Error(data['Error Message'])
  return data
}

export async function searchCompany(query, apiKey) {
  const data = await fmpFetch(`/search-name?query=${encodeURIComponent(query)}&limit=5`, apiKey)
  const usListed = data.filter(d => ['NASDAQ', 'NYSE', 'AMEX'].includes(d.exchange))
  const results = usListed.length ? usListed : data
  if (!results.length) throw new Error(`No public company found for "${query}". Try a ticker symbol like AAPL or MSFT.`)
  return results[0]
}

export async function getProfile(symbol, apiKey) {
  const data = await fmpFetch(`/profile?symbol=${symbol}`, apiKey)
  if (!data.length) throw new Error(`No profile found for ${symbol}`)
  return data[0]
}

export async function getKeyMetrics(symbol, apiKey) {
  const data = await fmpFetch(`/key-metrics-ttm?symbol=${symbol}`, apiKey)
  if (!data.length) return null
  return data[0]
}

export async function getRatios(symbol, apiKey) {
  const data = await fmpFetch(`/ratios-ttm?symbol=${symbol}`, apiKey)
  if (!data.length) return null
  return data[0]
}

export async function getPeers(symbol, apiKey) {
  const data = await fmpFetch(`/stock-peers?symbol=${symbol}`, apiKey)
  if (!data.length) return []
  return data.slice(0, 5).map(p => p.symbol)
}
