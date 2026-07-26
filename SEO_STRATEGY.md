# SEO & GEO Strategy — IAMJARL Portfolio

> **This document is the single source of truth for the SEO/GEO state of iamjarl.com.**
> It is maintained for use by developers and AI agents working on the site.
> Bugs, features, and improvements are tracked in [GitHub Issues](https://github.com/JarlLyng/IAMJARL/issues).
> Last updated: 2026-07-07

---

## 1. Site Overview

| Field | Value |
|-------|-------|
| **URL** | https://iamjarl.com |
| **Repository** | https://github.com/JarlLyng/IAMJARL |
| **Framework** | Nuxt 4 (Vue 3, Options API, `app/` srcDir) |
| **Rendering** | Static generation (`nuxt generate`) → GitHub Pages |
| **Hosting** | GitHub Pages with custom domain (CNAME: `iamjarl.com`) |
| **Deploy** | GitHub Actions (`.github/workflows/deploy.yml`) |
| **Analytics** | Umami (self-hosted on Vercel) |
| **Owner** | Jarl Lyng — Full Stack Designer & Developer, Copenhagen, Denmark |
| **Contact** | jarl@iamjarl.com |

---

## 2. Site Structure

Single-page portfolio (`app.vue`) with this component order:

```
<Cursor />        — Custom cursor (desktop only, respects prefers-reduced-motion)
<main>
  <Hero />         — h1: "Hi! I am Jarl", particle field canvas animation
  <What />         — h2: "I do creative projects", first-person bio, grid canvas animation
  <Explaine />     — h2: "What I do", 4 discipline cards (h3 each)
  <Tools2 />       — h2: "Weapons of choice", 22 tool logos via logo.dev API
  <Projects />     — h2: "Some side projects", 16 project cards with thumbnails
  <AppStore />     — h2: "Apps on the App Store", link to Apple developer page
  <Proof />        — h2: "Previous clients", 18 company logos
  <Contact />      — h2: "Who you gonna call", email + LinkedIn/Medium/GitHub cards
</main>
<Footer />         — Copyright
```

### Design System

| Token | Value |
|-------|-------|
| `--color-black` | `#252525` |
| `--color-white` | `#fafafa` |
| `--color-accent` | `#D0FF00` |
| Heading font | Space Grotesk (700) |
| Body font | Inter (100, 200, 900) |

---

## 3. Projects (16 displayed on site)

Listed in `app/components/Projects.vue` and `public/llms.txt`.
⚠️ The JSON-LD `ItemList` in `nuxt.config.ts` is stale (12 entries, old Iron Workouts URL) — tracked in [#65](https://github.com/JarlLyng/IAMJARL/issues/65); a single data source is proposed in [#68](https://github.com/JarlLyng/IAMJARL/issues/68).

| # | Name | URL | Schema Type | Platforms | Thumbnail |
|---|------|-----|-------------|-----------|-----------|
| 1 | Running From Horses | https://runningfromhorses.com/ | WebSite | Web | Running-from-Horses.webp |
| 2 | BeerTuner | https://beertuner.iamjarl.com/ | WebApplication | Web | BeerTuner.webp |
| 3 | Made by Human | https://madebyhuman.iamjarl.com/ | WebSite | Web | Made-by-Human.webp |
| 4 | It's mono, yo! | https://itsmonoyo.iamjarl.com/ | SoftwareApplication | macOS | It-s-mono-yo.webp |
| 5 | TrimrPix | https://trimrpix.iamjarl.com/ | SoftwareApplication | macOS | TrimrPix.webp |
| 6 | Nostromo UI | https://jarllyng.github.io/nostromo-ui/ | WebApplication | Web | Nostromo-UI.webp |
| 7 | WODrounds | https://wodrounds.iamjarl.com/ | SoftwareApplication | iOS, watchOS, macOS, tvOS | WODrounds.webp |
| 8 | Wean Nicotine | https://weannicotine.iamjarl.com/ | SoftwareApplication | iOS | WeanNicotine.webp |
| 9 | Get to the Movie! | https://gettothemovie.iamjarl.com/ | WebApplication | Web | Get-to-the-Movie.webp |
| 10 | Emotionwave | https://emotionwave.iamjarl.com/ | WebApplication | Web | EmotionWave.webp |
| 11 | Anvil Workout | https://anvilworkout.iamjarl.com/ | SoftwareApplication | iOS | Anvil-Workout.webp |
| 12 | Little Rocket | https://littlerocket.iamjarl.com/ | VideoGame | Web | Little-Rocket.webp |
| 13 | TrimrPix for iOS | https://trimrpixforios.iamjarl.com/ | SoftwareApplication | iOS | TrimrPix-iOS.webp |
| 14 | Walkful | https://walkful.iamjarl.com/ | SoftwareApplication | iOS | Walkful.webp |
| 15 | BotLens | https://botlens.iamjarl.com/ | SoftwareApplication | Chrome extension | BotLens.webp |
| 16 | PageLens | https://pagelens.iamjarl.com/ | SoftwareApplication | Chrome extension | PageLens.webp |

### Subdomain ecosystem (hub-and-spoke)

```
iamjarl.com (HUB)
├── gettothemovie.iamjarl.com
├── madebyhuman.iamjarl.com
├── emotionwave.iamjarl.com
├── beertuner.iamjarl.com
├── itsmonoyo.iamjarl.com
├── trimrpix.iamjarl.com
├── trimrpixforios.iamjarl.com
├── wodrounds.iamjarl.com
├── weannicotine.iamjarl.com
├── anvilworkout.iamjarl.com
├── littlerocket.iamjarl.com
├── walkful.iamjarl.com
├── botlens.iamjarl.com
├── pagelens.iamjarl.com
└── runningfromhorses.com (separate domain, cross-linked)
```

---

## 4. Previous Clients

Listed in `components/Proof.vue`. 18 companies:

Carlsberg, Danske Bank, Københavns Universitet, Native Instruments, Psykiatrifonden, Roskilde Festival, TDC, YouSee, Rockwool, DSB, Skattestyrelsen, 3, MobilePay, ATP, Forsvaret, Output, BMS, SUS

---

## 5. Tools & Technologies

Listed in `components/Tools2.vue`. 22 tools rendered via logo.dev API:

Figma, Adobe Creative Cloud, Xcode, Swift, GitHub, VS Code, Vue.js, Nuxt, React, TypeScript, Tailwind CSS, Firebase, Svelte, Astro, Blender, Three.js, Ableton, Claude, OpenAI, Hugging Face, Cursor, GitHub Copilot

---

## 6. Disciplines

Listed in `components/Explaine.vue`:

1. **Digital Strategy** — User needs, market analysis, stakeholder alignment
2. **Creative Coding** — Generative design, interactive experiences, experiments
3. **Concept Development** — Ideation, prototyping, pushing boundaries
4. **Digital Design** — UX flows, UI components, micro-interactions, motion design, design systems

---

## 7. Implemented SEO/GEO

### Meta Tags (`nuxt.config.ts → app.head.meta`)

| Tag | Value |
|-----|-------|
| `<title>` | `Digital Designer & Developer \| I am Jarl` (via titleTemplate) |
| `description` | Full stack digital designer with more than 15 years of experience in design strategy, UX/UI, and interaction design. Specialized in crafting user-centric, effective digital solutions. |
| `author` | Jarl Lyng |
| `keywords` | digital designer, UX designer, UI designer, interaction design, design strategy, frontend developer, portfolio, creative director |
| `robots` | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |
| `google-site-verification` | VzifTd_LseMkFGzv8F-MNPoeUv91GBezS3qZ |
| `theme-color` | #252525 |

### Open Graph

| Property | Value |
|----------|-------|
| `og:type` | website |
| `og:site_name` | I am Jarl |
| `og:locale` | en_US |
| `og:title` | I am Jarl - Digital Designer & Developer |
| `og:description` | (same as meta description) |
| `og:url` | https://iamjarl.com |
| `og:image` | https://iamjarl.com/img/og-image.png (1200x630) |

### Twitter Card

| Property | Value |
|----------|-------|
| `twitter:card` | summary_large_image |
| `twitter:site` | @iamjarl |
| `twitter:creator` | @iamjarl |

### Canonical & Resource Hints

- `<link rel="canonical" href="https://iamjarl.com">`
- `<link rel="preconnect" href="https://fonts.googleapis.com">`
- `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
- `<link rel="dns-prefetch" href="https://img.logo.dev">`
- `<link rel="dns-prefetch" href="https://umami-iamjarl.vercel.app">`
- `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`

### Structured Data (JSON-LD `@graph`)

Single `<script type="application/ld+json">` in `nuxt.config.ts` containing:

1. **Person** (`@id: #person`) — Jarl Lyng, jobTitle, description, email, knowsAbout (17 skills), workLocation (Copenhagen, Denmark), sameAs (LinkedIn, GitHub, CodePen, App Store)
2. **WebSite** (`@id: #website`) — IAMJARL, creator → Person
3. **ProfilePage** (`@id: #profilepage`) — mainEntity → Person, isPartOf → WebSite
4. **ItemList** — 10 projects with typed schema (SoftwareApplication/WebApplication/WebSite), descriptions, URLs, author → Person
5. **FAQPage** — 4 Q&A pairs:
   - "Who is Jarl Lyng?"
   - "What projects has Jarl Lyng built?"
   - "What are Jarl Lyng's main skills?"
   - "How can I hire Jarl Lyng?"

### robots.txt

Allows all crawlers + explicit Allow for AI bots (ChatGPT-User, Claude-SearchBot, PerplexityBot, Applebot, Google-Extended, Anthropic-AI). References sitemap.

### llms.txt

`public/llms.txt` provides AI-readable summary: person info, all projects with URLs, skills, previous clients, and contact details.

⚠️ **Expectation check:** Google has [stated explicitly](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) that Google Search (including AI Overviews and AI Mode) does **not** use llms.txt or other AI-specific files — they "neither harm nor help" visibility there. We keep the file because it is near-zero cost and *may* be read by other AI crawlers (Anthropic, OpenAI, Perplexity), but no major provider has formally committed to it. Do not invest significant effort here; structured data and crawlable HTML are what Google's AI surfaces actually consume.

### Sitemap

`@nuxtjs/sitemap` module. Root URL `/` with priority 1, changefreq monthly, auto-generated lastmod.

### Security Headers (Nitro routeRules)

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- CSP via meta tag (allows fonts.googleapis.com, img.logo.dev, umami)

### Heading Hierarchy

```
h1: "Hi! I am Jarl" (Hero — one per page)
  h2: "I do creative projects" (What)
  h2: "Apps on the App Store" (AppStore)
  h2: "Weapons of choice" (Tools2)
  h2: "What I do" (Explaine)
    h3: "Digital Strategy", "Creative coding", "Concept development", "Digital design"
  h2: "Some side projects" (Projects)
    h3: [project title] (per project card)
  h2: "Previous clients" (Proof)
  h2: "Who you gonna call" (Contact)
```

Subtitles use `<p class="light-heading">` to maintain correct hierarchy.

### Accessibility

- `aria-hidden="true"` on decorative canvas elements (Hero, What)
- `aria-label` on sections (Tools2), interactive buttons, and links
- `sr-only` class for screen reader text (Contact)
- `loading="lazy"` and `decoding="async"` on images below the fold
- `prefers-reduced-motion` support (disables all animations)
- `focus-visible` outlines on interactive elements

### Performance

- IntersectionObserver pauses canvas animations when offscreen
- Particle count reduced on mobile (100 → 40)
- Debounced resize handlers (250ms)
- Google Fonts with `display=swap`

---

## 8. GEO — AI-passage Optimization

iamjarl.com is the hub for the IAMJARL ecosystem. AI engines should cite this site for:

- "Who is Jarl Lyng?" → Person JSON-LD + FAQPage
- "Jarl Lyng portfolio" → homepage
- "IAMJARL projects" → ItemList JSON-LD
- "Danish designer developer" → Person JSON-LD (workLocation: Copenhagen)
- "WODrounds developer" / "BeerTuner creator" → ItemList

### Guidance from Google on AI Search (2025-2026)

Distilled from Google's [AI features optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) and [gen-AI content guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content). **Caveat: this is Google's stance only** — it governs AI Overviews/AI Mode/Gemini, not how Anthropic, OpenAI, or Perplexity crawl and cite.

What matters (and maps to this site):

1. **Standard technical SEO is the whole game** — indexable, snippet-eligible, crawlable HTML. No separate "AI SEO" layer exists for Google. Our static Nuxt output satisfies this; the JS-rendered content risk is low since everything critical is in the generated HTML.
2. **Valid, accurate structured data** — Google calls it out for machine-readability. Stale structured data (see [#65](https://github.com/JarlLyng/IAMJARL/issues/65)) is therefore an actual GEO bug, not a nice-to-have.
3. **Page experience and load times count** — the multi-MB project thumbnails ([#67](https://github.com/JarlLyng/IAMJARL/issues/67)) work directly against AI-surface eligibility.
4. **Do NOT over-engineer for AI**: no llms.txt reliance (see §7), no content chunking, no writing "for the machines", no page-per-query-variation. Our single-page, human-voice approach is aligned.
5. **AI-assisted content is fine** if it is original, accurate, and adds value; mass-produced low-effort pages violate spam policy. Not a risk for this hand-written portfolio — keep it that way.

---

## 9. File Reference

| File | Purpose |
|------|---------|
| `nuxt.config.ts` | Meta tags, OG, Twitter Card, JSON-LD, sitemap, security headers, preconnect |
| `app/app.vue` | Page layout, component order |
| `app/components/Hero.vue` | h1, particle canvas, hero section |
| `app/components/What.vue` | Bio text (GEO content), grid canvas |
| `app/components/AppStore.vue` | App Store link section |
| `app/components/Tools2.vue` | 22 tool logos via logo.dev API |
| `app/components/Explaine.vue` | 4 discipline cards |
| `app/components/Projects.vue` | 16 project cards with thumbnails, URLs, descriptions |
| `app/components/Proof.vue` | 18 client logos |
| `app/components/Contact.vue` | Email, LinkedIn, Medium, GitHub links |
| `app/components/Footer.vue` | Copyright |
| `app/components/Cursor.vue` | Custom cursor (desktop only) |
| `app/assets/css/global.css` | Colors, fonts, selection styling |
| `public/robots.txt` | Crawler rules (incl. AI bots) |
| `public/llms.txt` | AI-readable site summary |
| `public/CNAME` | GitHub Pages custom domain (`iamjarl.com`) |
| `public/apple-touch-icon.png` | 180x180 Apple touch icon |
| `public/img/projects/` | Project thumbnails (webp, max 1400px wide) |
| `public/logos/` | Client logos (svg + png) |
| `.github/workflows/deploy.yml` | CI/CD to GitHub Pages |
| `.github/dependabot.yml` | Weekly npm dependency updates |
| `.github/workflows/dependabot-auto-merge.yml` | Auto-merge patch/minor PRs |

---

## 10. Social Profiles & External Links

| Platform | URL |
|----------|-----|
| LinkedIn | https://www.linkedin.com/in/jarl-lyng-0a364719/ |
| GitHub | https://github.com/JarlLyng |
| Medium | https://medium.com/@jarllyng |
| CodePen | https://codepen.io/JarlLyng (exists, no longer linked on site) |
| App Store | https://apps.apple.com/us/developer/iamjarl/id1874114386 |
| Email | jarl@iamjarl.com |
