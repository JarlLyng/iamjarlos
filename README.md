# I am Jarl - Portfolio Website

[![Co-created with AI](https://madebyhuman.iamjarl.com/badges/co-created-white.svg)](https://madebyhuman.iamjarl.com)

Portfolio website for I am Jarl - Full stack digital designer with more than 15 years of experience in design strategy, UX/UI, and interaction design.

**Live site:** [iamjarl.com](https://iamjarl.com)

## Tech Stack

- **Nuxt 3** - Vue.js framework for SSR/SSG
- **VueUse Motion** - Animation library for scroll-triggered animations
- **Nuxt Icon** - Icon component library (Phosphor Icons)
- **TypeScript** - Type safety
- **Betterlytics** - Privacy-first analytics
- **logo.dev** - Dynamic logo API integration

## Features

- **Custom cursor interaction** - Interactive cursor with smooth animations
- **Canvas-based grid animation** - Interactive mouse-reactive grid in "What" section
- **Smooth scroll animations** - VueUse Motion for scroll-triggered animations
- **Responsive design** - Mobile-first approach with breakpoints
- **SEO optimized** - Meta tags, Open Graph, canonical links, sitemap
- **Performance optimized** - Lazy loading, async image decoding, requestAnimationFrame
- **Accessibility** - ARIA labels, semantic HTML, focus states
- **Security** - Content Security Policy (CSP), X-Frame-Options
- **Automated deployment** - GitHub Actions for CI/CD to GitHub Pages
- **Dependency management** - Dependabot for automated updates

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## Environment Variables

Create a `.env` file in the root directory (see `.env.example` for reference):

```bash
# Logo.dev API Key (for dynamic logo fetching)
LOGO_DEV_API_KEY=your_api_key_here

# Base URL (optional, defaults to '/' for custom domain)
# Use '/IAMJARL/' for GitHub Pages project pages
NUXT_PUBLIC_BASE_URL=/
```

### Setting up Environment Variables

1. Copy `.env.example` to `.env`
2. Add your `LOGO_DEV_API_KEY` from [logo.dev](https://logo.dev)
3. For GitHub Actions, add `LOGO_DEV_API_KEY` as a repository secret

## Deployment

### GitHub Pages (Current Setup)

The project is configured for automated deployment to GitHub Pages via GitHub Actions:

1. **Custom Domain Setup:**
   - Configure DNS records (A records and CNAME) in your domain provider
   - Add custom domain in GitHub Pages settings
   - Set `NUXT_PUBLIC_BASE_URL=/` in environment variables

2. **GitHub Actions:**
   - Workflow automatically builds and deploys on push to `main` branch
   - Located in `.github/workflows/deploy.yml`
   - Requires `LOGO_DEV_API_KEY` secret in repository settings

3. **Manual Deployment:**
   ```bash
   npm run generate
   # Deploy .output/public to your hosting provider
   ```

### Other Hosting Options

- **Netlify:** Connect repository, set build command: `npm run generate`, publish directory: `.output/public`
- **Vercel:** Connect repository, framework preset: Nuxt.js
- **Cloudflare Pages:** Connect repository, build command: `npm run generate`, output directory: `.output/public`

Check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Project Structure

```
├── .github/
│   ├── workflows/        # GitHub Actions workflows
│   └── dependabot.yml    # Dependabot configuration
├── assets/
│   ├── animation/        # Lottie animations
│   ├── css/              # Global styles
│   └── img/              # Source images
├── components/           # Vue components
│   ├── Contact.vue       # Contact section
│   ├── Cursor.vue        # Custom cursor component
│   ├── Explaine.vue      # Services/disciplines section
│   ├── Footer.vue        # Footer component
│   ├── Hero.vue          # Hero section
│   ├── Projects.vue      # Side projects showcase
│   ├── Proof.vue         # Client logos
│   ├── Tools.vue         # (Legacy) Tools component
│   ├── Tools2.vue        # Tools with logo.dev integration
│   └── What.vue          # About section with canvas grid
├── plugins/              # Nuxt plugins
│   └── betterlytics.client.ts  # Analytics plugin
├── public/
│   ├── img/              # Static images (projects, etc.)
│   └── logos/            # Client logo SVGs
├── app.vue               # Main app component
├── nuxt.config.ts        # Nuxt configuration
└── package.json          # Dependencies
```

## Development

### Code Quality

- **Linting:** No linter errors (TypeScript strict mode)
- **Best Practices:** 
  - SSR-safe checks (`typeof window !== 'undefined'`)
  - Proper cleanup in `beforeUnmount`
  - Performance optimizations (requestAnimationFrame, throttling)
  - Accessibility (ARIA labels, semantic HTML)

### Key Components

- **Cursor.vue:** Custom cursor with smooth interpolation using requestAnimationFrame
- **What.vue:** Canvas-based interactive grid with mouse tracking
- **Tools2.vue:** Dynamic logo fetching via logo.dev API
- **Projects.vue:** Project showcase with lazy-loaded images

## Dependencies

### Production
- `@betterlytics/tracker` - Analytics
- `@nuxtjs/sitemap` - Sitemap generation
- `@vueuse/motion` - Animation library
- `core-js` - Polyfills

### Development
- `@nuxt/devtools` - Development tools
- `nuxt` - Framework
- `nuxt-icon` - Icon component
- `vue` - Vue.js
- `vue-router` - Routing

## Browser Support

Target browsers (configured in `nuxt.config.ts`):
- Chrome 87+
- Firefox 78+
- Safari 13.1+
- Edge 88+

## License

Private project - All rights reserved
