# M&A Deal Analyzer

AI-powered mergers & acquisitions analysis tool. Enter any public company name and get a full deal analysis — valuation multiples, trading comps, strategic rationale, synergies, risk assessment, and a final deal verdict.

Built by John Gibson · Powered by [Claude](https://anthropic.com)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/ma-deal-analyzer&env=VITE_ANTHROPIC_API_KEY&envDescription=Your%20Anthropic%20API%20key&envLink=https://console.anthropic.com/)

---

## Screenshot

![M&A Deal Analyzer Screenshot](screenshot-placeholder.png)

---

## Features

- **Valuation snapshot** — EV/EBITDA, P/E ratio, control premium, implied deal size
- **Trading comps chart** — Bar chart comparing target vs. 3 real peer companies
- **Strategic analysis** — Rationale, synergy opportunities, and key risks (3 bullets each)
- **Weighted scorecard** — Five dimensions scored 0–100 with animated progress bars
- **Deal verdict** — Compelling / Cautious / Avoid with one-line rationale
- **Responsive** — Works on mobile and desktop

## Tech Stack

- **Vite + React** (no CRA, no Next.js)
- **Chart.js + react-chartjs-2** for the comps bar chart
- **Anthropic JS SDK** (`@anthropic-ai/sdk`) for Claude API calls
- Zero UI libraries — pure CSS custom properties

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/ma-deal-analyzer.git
cd ma-deal-analyzer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Open `.env` and add your Anthropic API key:

```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

Get a key at [console.anthropic.com](https://console.anthropic.com).

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Deploy to Vercel

### Option A — One-click (after pushing to GitHub)

1. Push your repo to GitHub
2. Click the **Deploy with Vercel** button above
3. When prompted, set the `VITE_ANTHROPIC_API_KEY` environment variable

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel
```

When asked for the build command, use `npm run build`.  
When asked for the output directory, use `dist`.

Add your env var in the Vercel dashboard:  
**Project → Settings → Environment Variables → Add** `VITE_ANTHROPIC_API_KEY`

Then redeploy:

```bash
vercel --prod
```

## Security Note

This app calls the Anthropic API from the browser using a `VITE_` prefixed key, which means the key is visible in the client bundle. This is fine for personal tools and demos. For a production app with public traffic, proxy API calls through a server-side function (Vercel Edge Functions, etc.).

## License

MIT
