import Anthropic from '@anthropic-ai/sdk'

const SCHEMA = `{
  "target": "string — company name",
  "acquirer": "string — acquirer name or 'Strategic Buyer TBD'",
  "sector": "string — GICS sector",
  "headline": "string — one-line deal thesis (≤120 chars)",
  "metrics": {
    "ev_ebitda": "string e.g. '14.2x'",
    "pe_ratio": "string e.g. '22.1x'",
    "premium": "string e.g. '28%'",
    "deal_size": "string e.g. '$8.4B'"
  },
  "strategic_rationale": ["string", "string", "string"],
  "synergies": ["string", "string", "string"],
  "risks": ["string", "string", "string"],
  "scorecard": {
    "strategic_fit": 0,
    "financial_attractiveness": 0,
    "synergy_potential": 0,
    "execution_risk": 0,
    "market_timing": 0
  },
  "verdict": "Compelling | Cautious | Avoid",
  "verdict_rationale": "string — one-line verdict explanation (≤140 chars)",
  "comps": [
    { "name": "string", "ev_ebitda": 0, "pe": 0 },
    { "name": "string", "ev_ebitda": 0, "pe": 0 },
    { "name": "string", "ev_ebitda": 0, "pe": 0 }
  ]
}`

export async function analyzeDeal(target, acquirer) {
  const client = new Anthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  const acquirerLine = acquirer?.trim()
    ? `Acquirer: ${acquirer.trim()}`
    : 'No specific acquirer specified — assume a well-capitalized strategic buyer in the same sector.'

  const prompt = `You are a senior M&A investment banker. Produce a rigorous deal analysis for the following:

Target company: ${target.trim()}
${acquirerLine}

Return ONLY valid JSON that strictly matches this schema — no markdown, no commentary, no trailing text:

${SCHEMA}

Rules:
- scorecard values are integers 0–100; execution_risk represents risk level (higher = more risky)
- comps must include exactly 3 real peer companies with realistic current-market EV/EBITDA multiples and P/E ratios
- metrics must reflect realistic current-market valuations
- verdict must be exactly one of: Compelling, Cautious, Avoid
- all strings must be properly escaped JSON`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].text.trim()
  return JSON.parse(text)
}
