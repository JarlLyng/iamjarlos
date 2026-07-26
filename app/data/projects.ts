// Single source of truth for all projects shown on the site.
// Consumed by app/components/Projects.vue (cards) and nuxt.config.ts
// (JSON-LD ItemList). Keep public/llms.txt in sync when editing.

export interface Project {
  id: number
  title: string
  description: string
  /** Filename under public/img/projects/ */
  thumbnail: string
  url: string
  schemaType: 'SoftwareApplication' | 'WebApplication' | 'WebSite' | 'VideoGame'
  applicationCategory?: string
  operatingSystem?: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Running From Horses',
    description:
      'An independent record label website showcasing releases, artists, and the vibrant world of independent music.',
    thumbnail: 'Running-from-Horses.webp',
    url: 'https://runningfromhorses.com/',
    schemaType: 'WebSite',
  },
  {
    id: 2,
    title: 'BeerTuner',
    description:
      'Ever wondered how many beers it takes before a song becomes a masterpiece? Rate songs based on how many beers (or drinks) you think they need to sound their best.',
    thumbnail: 'BeerTuner.webp',
    url: 'https://beertuner.iamjarl.com/',
    schemaType: 'WebApplication',
  },
  {
    id: 3,
    title: 'Made by Human',
    description:
      'A positive movement celebrating human creativity and the meaningful choices we make in our creative work, with free badges for projects.',
    thumbnail: 'Made-by-Human.webp',
    url: 'https://madebyhuman.iamjarl.com/',
    schemaType: 'WebSite',
  },
  {
    id: 4,
    title: "It's mono, yo!",
    description:
      'An elegant macOS app to convert WAV files to mono while preserving sample rates. Perfect for hardware samplers.',
    thumbnail: 'It-s-mono-yo.webp',
    url: 'https://itsmonoyo.iamjarl.com/',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'macOS',
  },
  {
    id: 5,
    title: 'TrimrPix',
    description:
      'Modern image optimization for macOS. Optimize JPEG, PNG, GIF, WebP, and AVIF with intelligent compression and batch processing.',
    thumbnail: 'TrimrPix.webp',
    url: 'https://trimrpix.iamjarl.com/',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'macOS',
  },
  {
    id: 6,
    title: 'Nostromo UI',
    description:
      'A comprehensive UI library built with React, TypeScript and Tailwind CSS. Features powerful theming, dark mode, accessibility, and a collection of ready-to-use components.',
    thumbnail: 'Nostromo-UI.webp',
    url: 'https://jarllyng.github.io/nostromo-ui/',
    schemaType: 'WebApplication',
  },
  {
    id: 7,
    title: 'WODrounds',
    description:
      'A minimal EMOM and interval timer for CrossFit, HIIT, and Tabata. Runs natively on iPhone, iPad, Apple Watch, Mac, and Apple TV. No accounts or subscriptions.',
    thumbnail: 'WODrounds.webp',
    url: 'https://wodrounds.iamjarl.com/',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'iOS, watchOS, macOS, tvOS',
  },
  {
    id: 8,
    title: 'Wean Nicotine',
    description:
      'A free iOS app that helps you gradually reduce snus and nicotine pouch consumption through daily tracking, a declining allowance system, and supportive tools.',
    thumbnail: 'WeanNicotine.webp',
    url: 'https://weannicotine.iamjarl.com/',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'iOS',
  },
  {
    id: 9,
    title: 'Get to the Movie!',
    description:
      'An Arnold Schwarzenegger movie recommendation quiz that suggests the perfect film based on your mood and preferences.',
    thumbnail: 'Get-to-the-Movie.webp',
    url: 'https://gettothemovie.iamjarl.com/',
    schemaType: 'WebApplication',
  },
  {
    id: 10,
    title: 'Emotionwave',
    description:
      'Visualizes global sentiment in real-time by analyzing live news data and displaying it through dynamic visuals and ambient soundscapes.',
    thumbnail: 'EmotionWave.webp',
    url: 'https://emotionwave.iamjarl.com/',
    schemaType: 'WebApplication',
  },
  {
    id: 11,
    title: 'Anvil Workout',
    description:
      'An iPhone app for strength training. Plan workouts, track sets and reps in real time, and monitor progress with charts and personal records. One-time purchase, fully offline, no accounts or ads.',
    thumbnail: 'Anvil-Workout.webp',
    url: 'https://anvilworkout.iamjarl.com/',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'iOS',
  },
  {
    id: 12,
    title: 'Little Rocket',
    description:
      'A tiny browser game built with Three.js. Fly a rocket through procedurally placed planets while a slow, melancholy story unfolds. No score, no fail state. Just the long dark.',
    thumbnail: 'Little-Rocket.webp',
    url: 'https://littlerocket.iamjarl.com/',
    schemaType: 'VideoGame',
    applicationCategory: 'GameApplication',
  },
  {
    id: 13,
    title: 'TrimrPix for iOS',
    description:
      'Compress photos on iPhone without duplicates. Shrink JPEGs and HEICs in place, keep your library tidy, and reclaim storage without flooding Photos with copies.',
    thumbnail: 'TrimrPix-iOS.webp',
    url: 'https://trimrpixforios.iamjarl.com/',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'iOS',
  },
  {
    id: 14,
    title: 'Walkful',
    description:
      'A calm, private step and walking tracker for iPhone. Turns your daily walks into something meaningful. No accounts, no cloud, entirely on your phone.',
    thumbnail: 'Walkful.webp',
    url: 'https://walkful.iamjarl.com/',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'iOS',
  },
  {
    id: 15,
    title: 'BotLens',
    description:
      'A free, open-source Chrome extension that shows how LLMs, crawlers, and bots see any page. Checks robots.txt, structured data, semantics, and JS-hidden content, with an actionable AI readability score.',
    thumbnail: 'BotLens.webp',
    url: 'https://botlens.iamjarl.com/',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Chrome',
  },
  {
    id: 16,
    title: 'PageLens',
    description:
      'A Chrome extension that estimates the carbon footprint of any web page. Turns digital emissions into an A-F Eco Score with concrete ways to make the page lighter. Powered by CO2.js and The Green Web Foundation.',
    thumbnail: 'PageLens.webp',
    url: 'https://pagelens.iamjarl.com/',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Chrome',
  },
]
