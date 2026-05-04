const SAMPLE_ANALYSES = {
  default: {
    target: "Figma",
    acquirer: "Adobe",
    sector: "Information Technology",
    headline: "Design platform consolidation play — Adobe locks in next-gen creative tooling before competition scales.",
    metrics: { ev_ebitda: "48.2x", pe_ratio: "N/A", premium: "32%", deal_size: "$20.0B" },
    strategic_rationale: [
      "Neutralizes fastest-growing competitor in core creative tools market, protecting Adobe's $15B ARR base.",
      "Adds browser-native collaborative design — a capability Adobe has failed to build organically despite 3+ years of investment.",
      "Captures 4M+ power users (product designers, developers) who increasingly bypass Adobe's desktop-first workflow."
    ],
    synergies: [
      "Cross-sell Figma's design platform into Adobe's 30M+ Creative Cloud subscribers — estimated $800M incremental ARR within 3 years.",
      "Consolidate overlapping R&D in prototyping and handoff tools, saving ~$150M annually while accelerating product roadmap.",
      "Integrate FigJam whiteboarding with Adobe Express to create an end-to-end ideation-to-production pipeline for enterprise teams."
    ],
    risks: [
      "Regulatory scrutiny is near-certain — EU and UK antitrust bodies may block on market concentration grounds given 80%+ combined share in vector design.",
      "Cultural integration risk: Figma's startup-speed engineering culture may clash with Adobe's enterprise cadence, risking key talent attrition.",
      "Premium of 32% over last funding round invites shareholder pushback and sets a high bar for synergy realization within the earn-out window."
    ],
    scorecard: { strategic_fit: 88, financial_attractiveness: 52, synergy_potential: 78, execution_risk: 72, market_timing: 61 },
    verdict: "Cautious",
    verdict_rationale: "Strategically compelling but regulatory risk and rich valuation demand significant execution discipline to create value.",
    comps: [
      { name: "Canva", ev_ebitda: 55.3, pe: 0 },
      { name: "Miro", ev_ebitda: 42.1, pe: 0 },
      { name: "InVision", ev_ebitda: 18.7, pe: 0 }
    ]
  },
  tech: {
    target: "Datadog",
    acquirer: "Cisco",
    sector: "Information Technology",
    headline: "Cloud observability bolt-on gives Cisco a modern monitoring stack to pair with its networking dominance.",
    metrics: { ev_ebitda: "62.5x", pe_ratio: "78.3x", premium: "25%", deal_size: "$52.8B" },
    strategic_rationale: [
      "Fills Cisco's critical gap in cloud-native observability — AppDynamics is legacy and losing share to Datadog's unified platform.",
      "Datadog's 27,000+ enterprise customers overlap heavily with Cisco's installed base, creating immediate upsell and bundling leverage.",
      "Positions Cisco as the full-stack infrastructure vendor: network + security (Splunk) + observability (Datadog)."
    ],
    synergies: [
      "Bundle Datadog monitoring with Cisco networking and Splunk security for a $500M+ cross-sell opportunity in the first 18 months.",
      "Retire AppDynamics R&D spend (~$200M/yr) and migrate customers to Datadog's platform, improving margin profile.",
      "Leverage Cisco's 30,000-person sales force to accelerate Datadog's enterprise penetration outside the developer-led bottoms-up motion."
    ],
    risks: [
      "62.5x EV/EBITDA is a steep premium — Cisco would need 5+ years of flawless integration to earn back the cost of capital on this deal.",
      "Datadog's engineering culture is radically different from Cisco's; founder Olivier Pomel's retention is critical and uncertain post-acquisition.",
      "AWS, Azure, and GCP all have competing native monitoring tools that could accelerate customer migration if integration stumbles."
    ],
    scorecard: { strategic_fit: 82, financial_attractiveness: 38, synergy_potential: 74, execution_risk: 68, market_timing: 55 },
    verdict: "Cautious",
    verdict_rationale: "Strong strategic logic but eye-watering valuation and cloud-provider competition make this a high-wire act for Cisco.",
    comps: [
      { name: "Dynatrace", ev_ebitda: 45.2, pe: 58.1 },
      { name: "New Relic", ev_ebitda: 28.7, pe: 42.3 },
      { name: "Splunk", ev_ebitda: 38.9, pe: 51.6 }
    ]
  },
  finance: {
    target: "Stripe",
    acquirer: "JPMorgan Chase",
    sector: "Financials",
    headline: "JPM acquires the internet's payment rail to own commerce infrastructure from bank account to checkout button.",
    metrics: { ev_ebitda: "85.0x", pe_ratio: "120.5x", premium: "18%", deal_size: "$70.0B" },
    strategic_rationale: [
      "Captures the dominant online payments API processing $1T+ annually — a market JPM participates in but doesn't control.",
      "Stripe's developer ecosystem (3.4M+ businesses) becomes a distribution channel for JPM treasury, lending, and banking-as-a-service products.",
      "Defensive move: prevents a tech giant (Apple, Google) from acquiring Stripe and disintermediating traditional banks from digital commerce."
    ],
    synergies: [
      "Embed JPM banking products (corporate cards, instant payouts, FX) directly into Stripe's platform — estimated $2B+ incremental revenue in 3 years.",
      "Stripe's fraud and risk models combined with JPM's transaction data create the most powerful payments intelligence platform globally.",
      "Consolidate payment processing infrastructure to reduce interchange and network costs by ~$400M annually."
    ],
    risks: [
      "At 85x EBITDA, this deal destroys value unless Stripe maintains 30%+ revenue growth for 5+ years — historically rare at $25B+ revenue scale.",
      "Regulatory complexity is extreme: banking regulators (OCC, Fed) and antitrust (DOJ) will scrutinize a deal that merges banking and fintech infrastructure.",
      "Stripe's 8,000+ engineers have significant equity upside in an independent IPO — retention risk is material if deal terms disappoint."
    ],
    scorecard: { strategic_fit: 92, financial_attractiveness: 31, synergy_potential: 86, execution_risk: 78, market_timing: 48 },
    verdict: "Cautious",
    verdict_rationale: "Transformative strategic vision but valuation is prohibitive and regulatory gauntlet makes execution a multi-year uncertainty.",
    comps: [
      { name: "Adyen", ev_ebitda: 52.1, pe: 68.4 },
      { name: "Block (Square)", ev_ebitda: 35.8, pe: 45.2 },
      { name: "PayPal", ev_ebitda: 14.3, pe: 18.7 }
    ]
  },
  healthcare: {
    target: "Illumina",
    acquirer: "Roche",
    sector: "Healthcare",
    headline: "Roche acquires genomics leader to vertically integrate diagnostics from sequencing hardware to therapeutic decision-making.",
    metrics: { ev_ebitda: "32.4x", pe_ratio: "45.8x", premium: "30%", deal_size: "$38.5B" },
    strategic_rationale: [
      "Vertical integration play: Roche pairs its #1 diagnostics franchise with Illumina's dominant sequencing platform (80% market share in high-throughput).",
      "Genomic data from Illumina's installed base of 20,000+ sequencers accelerates Roche's precision oncology drug development pipeline.",
      "Blocks competitors (Thermo Fisher, PacBio) from acquiring the sequencing platform that underpins modern clinical genomics."
    ],
    synergies: [
      "Embed Illumina sequencing into Roche's companion diagnostics for oncology drugs — creates a closed-loop system that competitors cannot replicate.",
      "Combine Roche's clinical data (2M+ patients) with Illumina's genomic datasets to build the world's largest multi-omic research platform.",
      "Consolidate overlapping salesforces in clinical genomics labs, saving ~$250M annually while improving market coverage."
    ],
    risks: [
      "Antitrust regulators previously blocked Illumina-Grail; a Roche deal faces similar scrutiny on vertical foreclosure concerns in diagnostics.",
      "Illumina's core sequencing business faces margin pressure from emerging competitors (Element Biosciences, Ultima Genomics) — 32x EBITDA may overpay for a decelerating monopoly.",
      "Integration of a hardware/consumables company into a pharma organization requires bridging fundamentally different R&D and go-to-market cultures."
    ],
    scorecard: { strategic_fit: 85, financial_attractiveness: 55, synergy_potential: 80, execution_risk: 65, market_timing: 62 },
    verdict: "Compelling",
    verdict_rationale: "Unique vertical integration opportunity with strong synergy logic — valuation is fair if Roche can navigate regulatory hurdles.",
    comps: [
      { name: "Thermo Fisher", ev_ebitda: 22.1, pe: 30.5 },
      { name: "Agilent", ev_ebitda: 25.8, pe: 33.2 },
      { name: "Danaher", ev_ebitda: 27.3, pe: 35.8 }
    ]
  },
  energy: {
    target: "Enphase Energy",
    acquirer: "NextEra Energy",
    sector: "Energy",
    headline: "NextEra acquires residential solar microinverter leader to control distributed energy from generation to grid.",
    metrics: { ev_ebitda: "22.8x", pe_ratio: "31.5x", premium: "26%", deal_size: "$14.2B" },
    strategic_rationale: [
      "Adds residential and commercial distributed generation to NextEra's utility-scale portfolio — creating a full-spectrum clean energy platform.",
      "Enphase's 4M+ installed microinverter systems become an aggregated virtual power plant that NextEra can dispatch to manage grid load.",
      "Defensive acquisition: prevents a tech company (Tesla, Google) from owning the intelligence layer of residential energy."
    ],
    synergies: [
      "Bundle NextEra's retail energy plans with Enphase solar+battery systems — estimated $600M incremental revenue from cross-sell in 24 months.",
      "Use Enphase's real-time energy data from millions of homes to optimize NextEra's grid operations and trading positions.",
      "Consolidate supply chain procurement for battery cells and power electronics, reducing COGS by ~$120M annually."
    ],
    risks: [
      "Residential solar demand is cyclical and sensitive to interest rates — Enphase's 2023-24 revenue decline shows vulnerability to macro conditions.",
      "Utility acquiring a distributed energy company may trigger regulatory concerns about vertical market power in states with restructured energy markets.",
      "Technology risk: Enphase's microinverter architecture competes with string inverters and emerging power optimizers — market share is not guaranteed."
    ],
    scorecard: { strategic_fit: 79, financial_attractiveness: 64, synergy_potential: 72, execution_risk: 48, market_timing: 70 },
    verdict: "Compelling",
    verdict_rationale: "Well-timed acquisition at reasonable valuation with clear strategic logic and manageable integration complexity.",
    comps: [
      { name: "SolarEdge", ev_ebitda: 15.2, pe: 22.8 },
      { name: "Generac", ev_ebitda: 18.5, pe: 25.3 },
      { name: "SunPower", ev_ebitda: 12.1, pe: 19.4 }
    ]
  },
}

function pickAnalysis(target, acquirer) {
  const t = target.toLowerCase()
  const a = (acquirer || '').toLowerCase()
  const combined = `${t} ${a}`

  if (combined.match(/figma|adobe|design/)) return customize(SAMPLE_ANALYSES.default, target, acquirer)
  if (combined.match(/datadog|cisco|observ|monitor|splunk|dynatrace/)) return customize(SAMPLE_ANALYSES.tech, target, acquirer)
  if (combined.match(/stripe|jpmorgan|payment|fintech|paypal|adyen|block|square/)) return customize(SAMPLE_ANALYSES.finance, target, acquirer)
  if (combined.match(/illumina|roche|genom|health|pharma|medic|biotech/)) return customize(SAMPLE_ANALYSES.healthcare, target, acquirer)
  if (combined.match(/enphase|nextera|solar|energy|clean|grid|battery/)) return customize(SAMPLE_ANALYSES.energy, target, acquirer)

  const keys = Object.keys(SAMPLE_ANALYSES)
  const pick = keys[Math.floor(Math.random() * keys.length)]
  return customize(SAMPLE_ANALYSES[pick], target, acquirer)
}

function customize(base, target, acquirer) {
  const result = JSON.parse(JSON.stringify(base))
  if (target?.trim()) result.target = target.trim()
  if (acquirer?.trim()) result.acquirer = acquirer.trim()
  return result
}

export async function analyzeDeal(target, acquirer) {
  await new Promise(r => setTimeout(r, 1500 + Math.random() * 1500))
  return pickAnalysis(target, acquirer)
}
