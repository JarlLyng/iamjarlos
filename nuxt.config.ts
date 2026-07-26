// https://nuxt.com/docs/api/configuration/nuxt-config
import { projects } from './app/data/projects'

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/css/global.css"],
  modules: [
    "@vueuse/motion/nuxt",
    "@nuxt/icon",
    '@nuxtjs/sitemap',
  ],

  site: {
    url: 'https://os.iamjarl.com',
  },

  app: {
    baseURL: process.env.NUXT_PUBLIC_BASE_URL || '/',
    head: {
      titleTemplate: '%s',
      title: 'iamjarlOS — the portfolio operating system',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: 'utf-8' },
        {
          name: 'description',
          content: 'Solo builder shipping iOS, macOS, and web apps: Anvil Workout, Walkful, TrimrPix, WODrounds, and more. 15+ years in digital design from Copenhagen.'
        },
        { name: 'author', content: 'Jarl Lyng' },
        { name: 'keywords', content: 'digital designer, UX designer, UI designer, interaction design, design strategy, frontend developer, portfolio, creative director' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'google-site-verification', content: 'VzifTd_LseMkFGzv8F-MNPoeUv91GBezS3qZ' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'I am Jarl' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Jarl Lyng – Indie Apps & Digital Design from Copenhagen' },
        { property: 'og:description', content: 'Solo builder shipping iOS, macOS, and web apps: Anvil Workout, Walkful, TrimrPix, WODrounds, and more. 15+ years in digital design from Copenhagen.' },
        { property: 'og:url', content: 'https://iamjarl.com' },
        { property: 'og:image', content: 'https://iamjarl.com/img/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Jarl Lyng – Indie Apps & Digital Design from Copenhagen' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@iamjarl' },
        { name: 'twitter:creator', content: '@iamjarl' },
        { name: 'twitter:title', content: 'Jarl Lyng – Indie Apps & Digital Design from Copenhagen' },
        { name: 'twitter:description', content: 'Solo builder shipping iOS, macOS, and web apps: Anvil Workout, Walkful, TrimrPix, WODrounds, and more. 15+ years from Copenhagen.' },
        { name: 'twitter:image', content: 'https://iamjarl.com/img/og-image.png' },
        { name: 'twitter:image:alt', content: 'Jarl Lyng – Indie Apps & Digital Design from Copenhagen' },
        // Security and technical
        {
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://umami-iamjarl.vercel.app; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: https://img.logo.dev; connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://cdnjs.cloudflare.com https://img.logo.dev https://umami-iamjarl.vercel.app;"
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#252525' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      link: [
        { rel: 'canonical', href: 'https://os.iamjarl.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'dns-prefetch', href: 'https://img.logo.dev' },
        { rel: 'dns-prefetch', href: 'https://umami-iamjarl.vercel.app' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
      script: [
        {
          src: 'https://umami-iamjarl.vercel.app/script.js',
          defer: true,
          'data-website-id': '788a7d61-ee15-43c9-a7fe-e2cf44bb88cc'
        },
        // Structured Data — @graph (Person + WebSite + ItemList + FAQPage)
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Person',
                '@id': 'https://iamjarl.com/#person',
                name: 'Jarl Lyng',
                alternateName: 'I am Jarl',
                url: 'https://iamjarl.com',
                image: 'https://iamjarl.com/img/og-image.png',
                jobTitle: 'Full Stack Designer & Developer',
                description: 'Full stack digital designer and developer based in Copenhagen, Denmark with more than 15 years of experience. Solo indie builder who designs, develops, and ships digital products — from native iOS/macOS apps to web applications and open-source tools.',
                email: 'jarl@iamjarl.com',
                knowsAbout: [
                  'UX Design', 'UI Design', 'Interaction Design', 'Design Strategy',
                  'Frontend Development', 'User Experience', 'Design Systems', 'Motion Design',
                  'iOS Development', 'Swift', 'Vue.js', 'Nuxt', 'React',
                  'Creative Coding', 'TypeScript', 'Product Design', 'Music Production'
                ],
                workLocation: {
                  '@type': 'City',
                  name: 'Copenhagen',
                  containedInPlace: { '@type': 'Country', name: 'Denmark' }
                },
                sameAs: [
                  'https://www.linkedin.com/in/jarl-lyng-0a364719/',
                  'https://github.com/JarlLyng',
                  'https://medium.com/@jarllyng',
                  'https://codepen.io/JarlLyng',
                  'https://apps.apple.com/us/developer/iamjarl/id1874114386'
                ]
              },
              {
                '@type': 'WebSite',
                '@id': 'https://iamjarl.com/#website',
                name: 'IAMJARL',
                url: 'https://iamjarl.com',
                description: 'Portfolio and project hub for full stack designer and developer Jarl Lyng',
                creator: { '@id': 'https://iamjarl.com/#person' }
              },
              {
                '@type': 'ProfilePage',
                '@id': 'https://iamjarl.com/#profilepage',
                name: 'I am Jarl',
                url: 'https://iamjarl.com',
                description: 'Portfolio website of Jarl Lyng — Full Stack Designer & Developer based in Copenhagen, Denmark',
                mainEntity: { '@id': 'https://iamjarl.com/#person' },
                isPartOf: { '@id': 'https://iamjarl.com/#website' }
              },
              {
                '@type': 'ItemList',
                name: 'Projects by Jarl Lyng',
                description: 'Apps, tools, and creative projects built by Jarl Lyng',
                itemListElement: projects.map((project, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  item: {
                    '@type': project.schemaType,
                    name: project.title,
                    url: project.url,
                    ...(project.applicationCategory && { applicationCategory: project.applicationCategory }),
                    ...(project.operatingSystem && { operatingSystem: project.operatingSystem }),
                    description: project.description,
                    author: { '@id': 'https://iamjarl.com/#person' },
                  },
                })),
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Who is Jarl Lyng?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Jarl Lyng is a full stack designer and developer based in Copenhagen, Denmark with more than 15 years of experience. He is a solo indie builder who creates digital products, designs interfaces, builds native iOS and macOS apps, and ships web applications and open-source tools.' }
                  },
                  {
                    '@type': 'Question',
                    name: 'What projects has Jarl Lyng built?',
                    acceptedAnswer: { '@type': 'Answer', text: `Jarl has built ${projects.length}+ projects including WODrounds (CrossFit timer for Apple devices), Wean Nicotine (quit nicotine app), Anvil Workout (strength training app), TrimrPix for macOS and iOS (image compression), Walkful (private step tracker), BotLens (AI readability checker), PageLens (web page carbon footprint), Get to the Movie! (Arnold Schwarzenegger movie quiz), Emotionwave (real-time sentiment visualization), BeerTuner (music rating app), Made by Human (AI transparency badges), Nostromo UI (React component library), Little Rocket (Three.js browser game), and Running From Horses (independent record label).` }
                  },
                  {
                    '@type': 'Question',
                    name: 'What are Jarl Lyng\'s main skills?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Full stack development (Vue.js, Nuxt, React, Swift), UI/UX design, product design, design systems, creative coding, motion design, iOS and macOS development, TypeScript, frontend architecture, and music production.' }
                  },
                  {
                    '@type': 'Question',
                    name: 'How can I hire Jarl Lyng?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Contact Jarl directly at jarl@iamjarl.com or connect via LinkedIn. He takes on freelance design and development projects and collaborations with companies and other creators.' }
                  }
                ]
              }
            ]
          })
        }
      ]
    },
  },

  compatibilityDate: "2024-08-07",

  runtimeConfig: {
    public: {
      siteUrl: 'https://iamjarl.com',
      logoDevApiKey: process.env.LOGO_DEV_API_KEY || '',
    }
  },

  sitemap: {
    urls: [
      {
        loc: '/',
        changefreq: 'monthly',
        priority: 1,
      }
    ],
    defaults: {
      changefreq: 'monthly',
      priority: 0.8,
    }
  },

  vite: {
    build: {
      target: ['es2015', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
    }
  },

  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        },
      },
    },
  },

});
