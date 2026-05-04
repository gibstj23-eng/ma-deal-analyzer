const BASE = 'https://financialmodelingprep.com/api/v3'

async function fmpFetch(path, apiKey) {
  const sep = path.includes('?') ? '&' : '?'
  const res = await fetch(`${BASE}${path}${sep}apikey=${apiKey}`)
  if (!res.ok) throw new Error(`FMP API error: ${res.status}`)
  return res.json()
}

export async function searchCompany(query, apiKey) {
  const data = await fmpFetch(`/search?query=${encodeURIComponent(query)}&limit=5&exchange=NASDAQ,NYSE`, apiKey)
  if (!data.length) throw new Error(`No public company found for "${query}". Try a ticker symbol like AAPL or MSFT.`)
  return data[0]
}

export async function getProfile(symbol, apiKey) {
  const data = await fmpFetch(`/profile/${symbol}`, apiKey)
  if (!data.length) throw new Error(`No profile found for ${symbol}`)
  return data[0]
}

export async function getKeyMetrics(symbol, apiKey) {
  const data = await fmpFetch(`/key-metrics-ttm/${symbol}`, apiKey)
  if (!data.length) return null
  return data[0]
}

export async function getRatios(symbol, apiKey) {
  const data = await fmpFetch(`/ratios-ttm/${symbol}`, apiKey)
  if (!data.length) return null
  return data[0]
}

export async function getPeers(symbol, apiKey) {
  const data = await fmpFetch(`/stock_peers?symbol=${symbol}`, apiKey)
  if (!data.length || !data[0].peersList?.length) return []
  return data[0].peersList.slice(0, 5)
}
