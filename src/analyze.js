import { searchCompany, getProfile, getKeyMetrics, getRatios, getPeers } from './fmp.js'

function fmt(n, prefix = '', suffix = '') {
  if (n == null || isNaN(n)) return 'N/A'
  return `${prefix}${Number(n).toFixed(1)}${suffix}`
}

function fmtBig(n) {
  if (n == null || isNaN(n)) return 'N/A'
  if (n >= 1e12) return `$${(n / 1e12).toFixed(1)}T`
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`
  return `$${n.toLocaleString()}`
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)) }

function generateHeadline(target, acquirer, sector, evEbitda, peerAvgEvEbitda) {
  const premium = evEbitda && peerAvgEvEbitda ? ((evEbitda / peerAvgEvEbitda - 1) * 100) : 0
  const acqName = acquirer || 'a strategic buyer'
  if (premium > 20) return `${acqName} pays a premium for ${target}'s market position in ${sector} — valuation demands strong synergy execution.`
  if (premium < -10) return `${target} trades at a discount to ${sector} peers — an opportunistic acquisition for ${acqName}.`
  return `${acqName} targets ${target} in a ${sector} consolidation play at in-line peer multiples.`
}

function generateRationale(target, acquirer, sector, profile) {
  const acq = acquirer || 'The acquirer'
  const mktCap = fmtBig(profile.marketCap)
  return [
    `${acq} gains immediate scale in ${sector} by acquiring ${target}'s ${mktCap} market-cap platform and established customer base.`,
    `Combines complementary product portfolios — ${acq} fills capability gaps and strengthens competitive positioning against larger rivals.`,
    `Defensive consolidation prevents a competing bidder from acquiring ${target} and disrupting ${acq}'s core market.`,
  ]
}

function generateSynergies(target, acquirer, profile) {
  const acq = acquirer || 'The combined entity'
  const rev = profile.revenue ? fmtBig(profile.revenue * 0.05) : 'significant'
  return [
    `Cross-sell ${target}'s products into ${acq}'s distribution channels — estimated ${rev}+ incremental revenue within 2 years.`,
    `Consolidate overlapping G&A and operations functions for ~15% cost savings on combined overhead.`,
    `Combine R&D teams to accelerate product development and reduce time-to-market for next-generation offerings.`,
  ]
}

function generateRisks(target, evEbitda, peerAvgEvEbitda, sector) {
  const risks = []
  if (evEbitda && peerAvgEvEbitda && evEbitda > peerAvgEvEbitda * 1.2) {
    risks.push(`${target} trades at ${fmt(evEbitda, '', 'x')} EV/EBITDA — a ${((evEbitda / peerAvgEvEbitda - 1) * 100).toFixed(0)}% premium to peers that demands aggressive synergy capture to justify.`)
  } else if (evEbitda) {
    risks.push(`At ${fmt(evEbitda, '', 'x')} EV/EBITDA, valuation is in line with peers — limited margin of safety if integration falters.`)
  } else {
    risks.push(`Limited financial visibility — inability to assess EBITDA-based valuation increases execution uncertainty.`)
  }
  risks.push(`Regulatory review in ${sector} could delay closing by 6–12 months, creating uncertainty for employees and customers.`)
  risks.push(`Integration complexity: merging cultures, systems, and go-to-market strategies historically destroys value in 50%+ of deals.`)
  return risks
}

function computeScorecard(evEbitda, pe, peerAvgEvEbitda, peerAvgPe, profile) {
  let strategicFit = 65
  let financialAttractiveness = 55
  let synergyPotential = 60
  let executionRisk = 50
  let marketTiming = 55

  if (evEbitda && peerAvgEvEbitda) {
    const valRatio = evEbitda / peerAvgEvEbitda
    financialAttractiveness = clamp(Math.round(80 - (valRatio - 1) * 60), 15, 90)
    if (valRatio < 0.9) strategicFit += 10
    if (valRatio > 1.3) executionRisk += 15
  }

  if (pe && peerAvgPe) {
    const peRatio = pe / peerAvgPe
    if (peRatio < 0.85) financialAttractiveness = clamp(financialAttractiveness + 12, 15, 90)
    if (peRatio > 1.25) financialAttractiveness = clamp(financialAttractiveness - 10, 15, 90)
  }

  if (profile.marketCap) {
    if (profile.marketCap > 200e9) executionRisk = clamp(executionRisk + 15, 15, 90)
    else if (profile.marketCap < 10e9) executionRisk = clamp(executionRisk - 10, 15, 90)
    synergyPotential = profile.marketCap > 50e9 ? clamp(synergyPotential + 10, 15, 90) : synergyPotential
  }

  const beta = profile.beta || 1
  if (beta < 0.9) marketTiming = clamp(marketTiming + 12, 15, 90)
  else if (beta > 1.3) marketTiming = clamp(marketTiming - 10, 15, 90)

  const changesYTD = profile.change || 0
  if (changesYTD < -5) marketTiming = clamp(marketTiming + 10, 15, 90)

  return {
    strategic_fit: clamp(strategicFit, 15, 95),
    financial_attractiveness: clamp(financialAttractiveness, 15, 95),
    synergy_potential: clamp(synergyPotential, 15, 95),
    execution_risk: clamp(executionRisk, 15, 95),
    market_timing: clamp(marketTiming, 15, 95),
  }
}

function computeVerdict(scorecard) {
  const { strategic_fit, financial_attractiveness, synergy_potential, execution_risk, market_timing } = scorecard
  const positive = (strategic_fit + financial_attractiveness + synergy_potential + market_timing) / 4
  const adjusted = positive - (execution_risk * 0.3)

  if (adjusted >= 55) return 'Compelling'
  if (adjusted >= 35) return 'Cautious'
  return 'Avoid'
}

function verdictRationale(verdict, scorecard, evEbitda, peerAvgEvEbitda) {
  const valNote = evEbitda && peerAvgEvEbitda && evEbitda > peerAvgEvEbitda * 1.15
    ? 'premium valuation requires disciplined synergy execution'
    : 'valuation is reasonable relative to peers'
  if (verdict === 'Compelling') return `Strong strategic fit with ${valNote} — well-positioned for value creation.`
  if (verdict === 'Cautious') return `Strategic merit exists but ${valNote} and integration risks warrant careful due diligence.`
  return `Weak strategic case compounded by ${valNote} — capital better deployed elsewhere.`
}

export async function analyzeDeal(target, acquirer, apiKey) {
  const targetResult = await searchCompany(target, apiKey)
  const targetSymbol = targetResult.symbol

  let acquirerProfile = null
  if (acquirer?.trim()) {
    try {
      const acqResult = await searchCompany(acquirer, apiKey)
      acquirerProfile = await getProfile(acqResult.symbol, apiKey)
    } catch {
      // acquirer not found — proceed without it
    }
  }

  const profile = await getProfile(targetSymbol, apiKey)
  const metrics = await getKeyMetrics(targetSymbol, apiKey)
  const ratios = await getRatios(targetSymbol, apiKey)
  const peers = await getPeers(targetSymbol, apiKey)

  const evEbitda = metrics?.evToEBITDATTM
  const pe = ratios?.priceToEarningsRatioTTM

  const peerData = []
  for (const peer of peers) {
    const sym = peer.symbol
    try {
      const pMetrics = await getKeyMetrics(sym, apiKey)
      const pRatios = await getRatios(sym, apiKey)
      const pEvEbitda = pMetrics?.evToEBITDATTM || 0
      const pPe = pRatios?.priceToEarningsRatioTTM || 0
      if (pEvEbitda > 0 || pPe > 0) {
        peerData.push({
          name: peer.companyName || sym,
          symbol: sym,
          ev_ebitda: pEvEbitda,
          pe: pPe,
        })
      }
    } catch {
      // skip peers with no data
    }
    if (peerData.length >= 3) break
  }

  const validPeerEvEbitda = peerData.filter(p => p.ev_ebitda > 0).map(p => p.ev_ebitda)
  const peerAvgEvEbitda = validPeerEvEbitda.length
    ? validPeerEvEbitda.reduce((a, b) => a + b, 0) / validPeerEvEbitda.length
    : null

  const validPeerPe = peerData.filter(p => p.pe > 0).map(p => p.pe)
  const peerAvgPe = validPeerPe.length
    ? validPeerPe.reduce((a, b) => a + b, 0) / validPeerPe.length
    : null

  const premium = peerAvgEvEbitda && evEbitda
    ? Math.round((evEbitda / peerAvgEvEbitda - 1) * 100)
    : 25

  const dealSize = profile.marketCap
    ? fmtBig(profile.marketCap * (1 + Math.max(premium, 15) / 100))
    : 'N/A'

  const sector = profile.sector || 'N/A'
  const targetName = profile.companyName || target
  const acquirerName = acquirerProfile?.companyName || acquirer || null

  const scorecard = computeScorecard(evEbitda, pe, peerAvgEvEbitda, peerAvgPe, profile)
  const verdict = computeVerdict(scorecard)

  return {
    target: targetName,
    acquirer: acquirerName || 'Strategic Buyer TBD',
    sector,
    headline: generateHeadline(targetName, acquirerName, sector, evEbitda, peerAvgEvEbitda),
    metrics: {
      ev_ebitda: fmt(evEbitda, '', 'x'),
      pe_ratio: fmt(pe, '', 'x'),
      premium: `${premium > 0 ? '+' : ''}${premium}%`,
      deal_size: dealSize,
    },
    strategic_rationale: generateRationale(targetName, acquirerName, sector, profile),
    synergies: generateSynergies(targetName, acquirerName, profile),
    risks: generateRisks(targetName, evEbitda, peerAvgEvEbitda, sector),
    scorecard,
    verdict,
    verdict_rationale: verdictRationale(verdict, scorecard, evEbitda, peerAvgEvEbitda),
    comps: peerData.map(p => ({
      name: p.name,
      ev_ebitda: Math.round(p.ev_ebitda * 10) / 10,
      pe: Math.round(p.pe * 10) / 10,
    })),
  }
}
