// All site copy lives here so it can be edited without touching components.

export const profile = {
  name: 'Eyimofe Orimolade',
  nickname: 'Ted',
  role: 'Software & AI Engineer',
  email: 'eyimofeokikiola@gmail.com',
  resume: 'resume.pdf', // drop the PDF into /public to enable this link
  photo: '', // e.g. 'me.jpg' in /public; empty shows the monogram
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/eyimofe-orimolade-9717b51ba' },
    { label: 'GitHub', href: 'https://github.com/lyon-zas' },
    { label: 'X', href: 'https://x.com/Tedtecch' },
    { label: 'Dev.to', href: 'https://dev.to/tedtecch' },
  ],
}

export const services = [
  { title: 'AI Agents & LLM Apps', tag: 'agents, tools, workflows', body: 'Multi-agent systems, conversational assistants and LLM automations built with LangChain, n8n and generative AI APIs.' },
  { title: 'Mobile Engineering', tag: 'iOS & Android, shipped', body: 'Cross-platform apps in Flutter and React Native, plus native Kotlin and Swift where it counts. Store releases end to end.' },
  { title: 'Backend & Cloud', tag: 'APIs that scale', body: 'FastAPI and Node.js services, WebSockets, Supabase, Railway and Cloudflare edge hosting, monolith to cloud-native.' },
  { title: 'Machine Learning & Vision', tag: 'models that see', body: 'CNNs, YOLO, OpenCV and pose estimation, evaluated properly with precision, recall and F1, not vibes.' },
  { title: 'Fintech & Web3', tag: 'money moves safely', body: 'NFC tap-to-pay, Kotlin payment SDKs, wallet integrations and smart contracts for real transaction volume.' },
  { title: 'DevOps & Quality', tag: 'CI/CD, tests, speed', body: 'Pipelines, automated testing and performance tuning. At Nearpays this cut app crashes by 97%.' },
]

export type Screen = { src?: string; mock?: MockKind; pos?: string }
export type MockKind = 'wallet' | 'nfc' | 'exchange' | 'lms' | 'health' | 'rides' | 'community' | 'web3' | 'site' | 'clinic'

export type Links = { appStore?: string; playStore?: string; website?: string }

export type App = {
  kind?: 'mobile' | 'web'
  site?: 'wtc' | 'clinic' // which website mock to draw
  domain?: string // shown in the mock browser bar when there is no website link
  slug: string
  name: string
  backedBy?: string // investor tag shown next to the name, like "YC W24"
  tagline: string
  description: string
  role: string
  years: string
  stack: string[]
  stats?: { value: string; label: string }[]
  accent: string
  bg: string
  screens: [Screen, Screen]
  platforms: string
  links?: Links
  highlights: string[]
  gallery?: Screen[]
}

// Real screenshots live in /public/apps/<slug>/. Apps without them render a
// designed mock screen until real ones are added.
export const apps: App[] = [
  {
    slug: 'kulawise',
    name: 'Kulawise',
    tagline: 'Fitness is better with people.',
    description: 'A social fitness app where people join Circles, take on challenges with prize pools, track steps and streaks, and chat with others on the same journey. Creators can run paid subscription Circles of their own.',
    role: 'Co-founder & Mobile Engineer',
    years: '2026',
    stack: ['Flutter', 'Dart', 'Realtime chat', 'Health data'],
    stats: [{ value: 'Circles', label: 'paid communities' }, { value: 'Live', label: 'group chat' }],
    accent: '#22b573',
    bg: '#e9f8ef',
    screens: [{ src: 'apps/kulawise/screens/dashboard.jpg' }, { src: 'apps/kulawise/screens/leaderboard.jpg' }],
    platforms: 'iOS · Android',
    links: { appStore: 'https://apps.apple.com/ng/app/kulawise/id6761377214', playStore: 'https://play.google.com/store/apps/details?id=com.kulawise.app' },
    highlights: [
      'Circles where people with the same goal chat and keep each other going',
      'Challenges with entry fees and a shared prize pool',
      'Step, distance and streak tracking that earns Kula points',
      'Paid subscription Circles that creators can run themselves',
    ],
    gallery: [{ src: 'apps/kulawise/screens/dashboard.jpg' }, { src: 'apps/kulawise/screens/leaderboard.jpg' }, { src: 'apps/kulawise/screens/chat.jpg' }, { src: 'apps/kulawise/screens/activity-log.jpg' }, { src: 'apps/kulawise/screens/circles.jpg' }, { src: 'apps/kulawise/screens/topicsA.jpg' }, { src: 'apps/kulawise/screens/explore.jpg' }, { src: 'apps/kulawise/screens/home.jpg' }, { src: 'apps/kulawise/screens/activity.jpg' }, { src: 'apps/kulawise/screens/topicsB.jpg' }, { src: 'apps/kulawise/screens/welcome.jpg' }],
  },
  {
    slug: 'nearpays',
    name: 'Nearpays',
    backedBy: 'Visa ’24',
    tagline: 'Tap, scan or dial to pay.',
    description: 'Contactless payments for West Africa with NFC tap-to-pay, scan-to-pay and USSD. I led the mobile team, built the Kotlin NFC SDKs and launched four cross-platform apps.',
    role: 'Mobile Team Lead',
    years: '2023 – 2024',
    stack: ['Flutter', 'Kotlin', 'NFC', 'USSD', 'CI/CD'],
    stats: [{ value: '$3M+', label: 'processed' }, { value: '10k+', label: 'txns in 6 months' }, { value: '−97%', label: 'crashes' }],
    accent: '#3b5bfd',
    bg: '#e8ecff',
    screens: [{ src: 'apps/nearpays/screens/home.jpg' }, { src: 'apps/nearpays/screens/savings.jpg' }],
    platforms: 'iOS · Android',
    links: { appStore: 'https://apps.apple.com/ng/app/nearpays/id6446233465', playStore: 'https://play.google.com/store/apps/details?id=com.nearpays.nearpays' },
    highlights: [
      'Built NFC tap-to-pay with Kotlin SDKs, plus scan-to-pay and USSD fallbacks',
      'Processed over $3M and handled 10,000+ transactions in the first 6 months',
      'Led the mobile team and launched 4 cross-platform apps',
      'Cut crashes by 97% with automated testing, stricter error handling and a streamlined CI/CD pipeline',
      'Carl, an in-app AI assistant that answers questions about tax and spending',
      'Separate Nearpays Business (owner and staff sign-in) and Nearpays Ghana (MoMo) apps',
    ],
    gallery: [{ src: 'apps/nearpays/screens/home.jpg' }, { src: 'apps/nearpays/screens/savings.jpg' }, { src: 'apps/nearpays/screens/carl.jpg' }, { src: 'apps/nearpays/screens/card.jpg' }, { src: 'apps/nearpays/screens/carl-new.jpg' }, { src: 'apps/nearpays/screens/business-welcome.jpg' }, { src: 'apps/nearpays/screens/business-home.jpg' }, { src: 'apps/nearpays/screens/ghana-home.jpg' }, { src: 'apps/nearpays/screens/ghana-momo.jpg' }],
  },
  {
    slug: 'owego',
    name: 'Owego',
    tagline: 'Money without borders.',
    description: 'Owego by Ribh Finance is a stablecoin wallet for spending, global payouts and earning. Hold USDC, send it to any wallet or straight to a Nigerian bank account, and pay merchants by QR. I built it with Web3 wallet authentication and on-chain transaction flows that give real-time feedback, and owned releases to both stores.',
    role: 'Mobile Engineer',
    years: '2026',
    stack: ['Flutter', 'React Native', 'Web3', 'Wallets'],
    accent: '#0f9d8a',
    bg: '#e3f5f2',
    screens: [{ src: 'apps/owego/screens/welcome.jpg' }, { src: 'apps/owego/screens/home-dark.jpg' }],
    platforms: 'iOS · Android',
    links: { appStore: 'https://apps.apple.com/ng/app/owego/id6753685517', playStore: 'https://play.google.com/store/apps/details?id=app.owego.superapp' },
    highlights: [
      'Built secure cross-platform fintech apps in Flutter and React Native',
      'Integrated Web3 wallets for authentication and blockchain transactions',
      'Designed on-chain flows with real-time monitoring and user feedback',
      'Owned testing, QA and releases to the App Store and Google Play',
    ],
    gallery: [{ src: 'apps/owego/screens/welcome.jpg' }, { src: 'apps/owego/screens/home-dark.jpg' }, { src: 'apps/owego/screens/home.jpg' }, { src: 'apps/owego/screens/success.jpg' }, { src: 'apps/owego/screens/pay.jpg' }, { src: 'apps/owego/screens/send.jpg' }, { src: 'apps/owego/screens/history.jpg' }],
  },
  {
    slug: 'gamichq',
    name: 'PingApp',
    tagline: 'Chat, call and explore Web3.',
    description: 'PingApp (formerly Gamic) is a social app for Web3 communities, with messaging, community spaces and a built-in multichain wallet. I built its design system and CI/CD pipeline, and tuned performance to cut load times.',
    role: 'Mobile Engineer',
    years: '2024 – 2025',
    stack: ['Flutter', 'Design system', 'Smart contracts', 'CI/CD'],
    accent: '#8b5cf6',
    bg: '#f0eaff',
    screens: [{ src: 'apps/gamichq/screens/welcome.jpg' }, { src: 'apps/gamichq/screens/wallet.jpg' }],
    platforms: 'iOS · Android',
    links: { appStore: 'https://apps.apple.com/ng/app/gamic-spaces-chat-connect/id1673683070', playStore: 'https://play.google.com/store/apps/details?id=app.pingapp', website: 'https://gamic.app' },
    highlights: [
      'Set up the CI/CD pipeline and tuned performance to cut load times',
      'Designed and built the app design system',
      'Built in-app messaging and community features that lifted retention',
      'Integrated smart contracts and a multichain Web3 wallet',
      'Encrypted voice and group video calls alongside chat',
    ],
    gallery: [{ src: 'apps/gamichq/screens/welcome.jpg' }, { src: 'apps/gamichq/screens/wallet.jpg' }, { src: 'apps/gamichq/screens/chat.jpg' }, { src: 'apps/gamichq/screens/token.jpg' }, { src: 'apps/gamichq/screens/group-call.jpg' }, { src: 'apps/gamichq/screens/calls.jpg' }, { src: 'apps/gamichq/screens/withdraw.jpg' }, { src: 'apps/gamichq/screens/send-cash.jpg' }, { src: 'apps/gamichq/screens/summary.jpg' }, { src: 'apps/gamichq/screens/receive.jpg' }, { src: 'apps/gamichq/screens/ringing.jpg' }],
  },
  {
    slug: 'shawnx',
    name: 'ShawnX',
    tagline: 'Crypto and gift cards, one tap.',
    description: 'A crypto and gift card exchange. I led the Flutter build and coordinated the launch; the client grew their team by 200% and signed a new contract after release.',
    role: 'Flutter Engineer',
    years: '2023',
    stack: ['Flutter', 'Dart', 'Payments'],
    stats: [{ value: '+200%', label: 'client team growth' }],
    accent: '#f59e0b',
    bg: '#fff3dc',
    screens: [{ src: 'apps/shawnx/screens/onboarding.jpg' }, { src: 'apps/shawnx/screens/home.jpg' }],
    platforms: 'iOS · Android',
    links: { appStore: 'https://apps.apple.com/ng/app/shawnx/id6472331224', playStore: 'https://play.google.com/store/apps/details?id=com.shawnexchange.shawnapp', website: 'https://www.shawnexchange.com' },
    highlights: [
      'Led the Flutter build of the crypto and gift card exchange',
      'Coordinated the launch with the client team',
      'Crypto to Naira, gift card trading, transfers and bill payments in one app',
      'The client grew their team by 200% and signed a new contract after launch',
    ],
    gallery: [{ src: 'apps/shawnx/screens/onboarding.jpg' }, { src: 'apps/shawnx/screens/home.jpg' }, { src: 'apps/shawnx/screens/login.jpg' }, { src: 'apps/shawnx/screens/virtual-account.jpg' }, { src: 'apps/shawnx/screens/airtime.jpg' }],
  },
  {
    slug: 'novacrust',
    name: 'Novacrust',
    tagline: 'Crypto to cash, in 50+ countries.',
    description: 'One app for USD, local currencies and crypto. People deposit USDT, USDC, BTC, ETH or SOL from any wallet, convert it to cash, open a US dollar account, and send money home to 50+ countries by bank transfer, mobile money, ACH, SEPA or Interac.',
    role: 'Mobile Engineer',
    years: '2025',
    stack: ['Mobile', 'Payments', 'Crypto', 'FX'],
    stats: [{ value: '50+', label: 'countries' }, { value: '40+', label: 'currencies' }],
    accent: '#0f3d3e',
    bg: '#e4f1ee',
    screens: [{ src: 'apps/novacrust/screens/home.jpg' }, { src: 'apps/novacrust/screens/receive.jpg' }],
    platforms: 'iOS · Android',
    links: { appStore: 'https://apps.apple.com/ng/app/novacrust-send-receive-spend/id6739316366', playStore: 'https://play.google.com/store/apps/details?id=com.nc.mobile' },
    highlights: [
      'Crypto deposits in USDT, USDC, BTC, ETH and SOL, converted to cash in about a minute',
      'US dollar accounts for getting paid by US banks, payroll and platforms like Upwork',
      'Payouts to 50+ countries by bank transfer, mobile money, ACH, SEPA and Interac',
      'Live rates for 29 currencies and a guided three-step onboarding',
    ],
    gallery: [{ src: 'apps/novacrust/screens/home.jpg' }, { src: 'apps/novacrust/screens/receive.jpg' }, { src: 'apps/novacrust/screens/rates.jpg' }, { src: 'apps/novacrust/screens/recipient.jpg' }, { src: 'apps/novacrust/screens/transactions.jpg' }, { src: 'apps/novacrust/screens/onboarding.jpg' }, { src: 'apps/novacrust/screens/signup.jpg' }],
  },
  {
    slug: 'tritek',
    name: 'MyTritek LMS',
    tagline: 'Learning that works offline.',
    description: 'A learning app with real-time communication, gamification and offline storage so lessons keep working on patchy networks. Shipped through a CI/CD pipeline I set up.',
    role: 'Software Engineer',
    years: '2021 – 2023',
    stack: ['Flutter', 'Realtime', 'Offline-first'],
    accent: '#ef4444',
    bg: '#ffe9e7',
    screens: [{ mock: 'lms' }, { mock: 'community' }],
    platforms: 'iOS · Android',
    links: {},
    highlights: [
      'Built the MyTritek LMS app with real-time communication',
      'Added gamification to keep learners coming back',
      'Offline storage so lessons work on unreliable networks',
      'Configured CI/CD pipelines to streamline releases',
    ],
  },
  {
    kind: 'web',
    site: 'clinic',
    domain: 'premierhospital',
    slug: 'premier',
    name: 'Premier Hospital',
    tagline: 'Appointments without the queue.',
    description: 'A hospital website that lets patients book appointments online and keeps patient records secure, built at Tritek Consulting.',
    role: 'Software Engineer',
    years: '2022',
    stack: ['Web', 'Online booking', 'Secure records'],
    accent: '#0ea5e9',
    bg: '#e3f4fd',
    screens: [{ mock: 'clinic' }, { mock: 'clinic' }],
    platforms: 'Web',
    links: {},
    highlights: [
      'Online appointment booking for patients, with schedules for staff',
      'Secure storage and access for patient records',
      'Responsive layout that works on phones and desktops',
    ],
  },
  {
    slug: 'yourrider',
    name: 'YourRider',
    tagline: 'Ride, refuel, earn tokens.',
    description: 'A gas delivery and rider app with a Polygon ERC-20 token rewards system, backed by smart contracts I wrote and deployed.',
    role: 'Software Developer',
    years: '2020 – 2021',
    stack: ['Flutter', 'Solidity', 'Polygon'],
    accent: '#16a34a',
    bg: '#e6f6ea',
    screens: [{ mock: 'rides' }, { mock: 'web3' }],
    platforms: 'iOS · Android',
    links: {},
    highlights: [
      'Built the YourRider mobile app for gas delivery',
      'Designed a Polygon ERC-20 token rewards system',
      'Wrote and deployed the smart contracts behind it',
    ],
  },
  {
    kind: 'web',
    site: 'wtc',
    slug: 'wtc-abuja',
    name: 'WTC Abuja',
    tagline: 'A landmark, rebuilt for the edge.',
    description: 'I led the move of the World Trade Center Abuja website suite from a monolith to a secure, decoupled, edge-hosted architecture built on Next.js, Supabase, Railway and Cloudflare.',
    role: 'AI Transformation Lead',
    years: '2026',
    stack: ['Next.js', 'Supabase', 'Railway', 'Cloudflare'],
    accent: '#c8a24a',
    bg: '#f4eedf',
    screens: [{ mock: 'site' }, { mock: 'site' }],
    platforms: 'Web',
    links: { website: 'https://wtcabuja.com' },
    highlights: [
      'Split a monolithic site into decoupled front ends and services',
      'Next.js front ends with Supabase data and Railway-hosted services',
      'Served from Cloudflare at the edge for speed and security',
    ],
  },
]

export const aiWork = [
  {
    kicker: 'M.Sc. thesis · Distinction',
    title: 'Agentic DevSecOps',
    body: 'An autonomous multi-agent LLM framework that finds and remediates security issues in CI/CD pipelines and optimises software testing, making decisions without a human in the loop.',
    stack: ['Multi-agent', 'LLMs', 'CI/CD', 'Python'],
    glyph: 'agents',
  },
  {
    kicker: 'Nearpays',
    title: 'Carl, the WhatsApp banker',
    body: 'A conversational AI assistant built natively into WhatsApp that handles customer support, bill payments and transfers in plain language, cutting support costs.',
    stack: ['Conversational AI', 'WhatsApp API', 'Payments'],
    glyph: 'chat',
  },
  {
    kicker: 'World Trade Center Abuja',
    title: 'AI Lead Engine',
    body: 'n8n and LLM workflows that clean, enrich and route Freshsales CRM data automatically, improving deal conversion and contact reachability.',
    stack: ['n8n', 'LLM workflows', 'CRM'],
    glyph: 'flow',
  },
  {
    kicker: 'World Trade Center Abuja',
    title: 'Predictive Maintenance',
    body: 'An AI engine that reads operational data to forecast equipment anomalies and schedule resources before things break.',
    stack: ['Python', 'FastAPI', 'Forecasting'],
    glyph: 'pulse',
  },
  {
    kicker: 'Peer-reviewed · 98% accuracy',
    title: 'Bottle fill-level vision',
    body: 'A sequential CNN that classifies bottle fill levels for industrial sorting, beating pre-trained ResNet-50 and VGG-19. Published in FUOYE Journal of Engineering and Technology.',
    stack: ['CNN', 'Computer vision', 'Colab'],
    glyph: 'vision',
    link: 'https://doi.org/10.46792/fuoyejet.v8i3.1077',
  },
  {
    kicker: 'World Trade Center Abuja',
    title: 'Cloud-native WTC Abuja',
    body: 'Moved the WTC Abuja website suite from a monolith to a decoupled, edge-hosted stack on Next.js, Supabase, Railway and Cloudflare.',
    stack: ['Next.js', 'Supabase', 'Cloudflare'],
    glyph: 'cloud',
    project: 'wtc-abuja',
  },
]

export const traits = ['Ships to production', 'Systems thinker', 'Research-minded', 'Detail obsessed']

export const numbers = [
  { value: '5+', label: 'years shipping software' },
  { value: '$3M+', label: 'processed through apps I built' },
  { value: '98%', label: 'accuracy on a published CNN' },
  { value: 'Top 1%', label: 'of my M.Sc. department' },
]

export const journey = [
  { dates: '2026 – Present', company: 'Churchgate Group & WTC Abuja', role: 'AI Transformation Lead', body: 'Building LLM-driven automation across the group: an AI lead engine, predictive maintenance, autonomous internal workflows, and a cloud-native rebuild of the WTC Abuja web suite.', tags: ['LLM workflows', 'n8n', 'FastAPI', 'Cloud migration'] },
  { dates: 'Mar 2026 – Sep 2026', company: 'Ribh Finance', role: 'Mobile Engineer', body: 'Secure cross-platform fintech apps with Web3 wallet auth and on-chain transaction flows, released to both app stores.', tags: ['Flutter', 'React Native', 'Web3'] },
  { dates: 'Sep 2024 – 2025', company: 'GamicHQ', role: 'Mobile Engineer', body: 'Design system, CI/CD and performance work, plus in-app messaging and community features that lifted retention.', tags: ['Design systems', 'Performance', 'Web3'] },
  { dates: 'Feb 2023 – Aug 2024', company: 'Nearpays', role: 'Software Engineer & Mobile Team Lead', body: 'Co-built Carl, the WhatsApp AI assistant. Built NFC payments and Kotlin SDKs that processed $3M+, launched 4 apps, and cut crashes by 97%.', tags: ['Conversational AI', 'NFC', 'Kotlin', 'Leadership'] },
  { dates: '2021 – Dec 2023', company: 'Tritek Consulting', role: 'Software Engineer', body: 'Built the MyTritek LMS app, with CI/CD and offline-first storage, and the Premier Hospital website.', tags: ['Flutter', 'Realtime', 'CI/CD'] },
  { dates: 'May 2020 – Dec 2021', company: 'TedTech', role: 'Software Developer', body: 'Built YourRider with a Polygon ERC-20 token rewards system and the smart contracts behind it.', tags: ['Solidity', 'Polygon', 'Mobile'] },
]

export const education = [
  { title: 'M.Sc. Software Engineering', place: 'Nile University of Nigeria', note: 'Distinction (4.5/5), top 1% of department. Thesis on agentic DevSecOps.', dates: '2024 – 2026' },
  { title: 'B.Eng. Mechatronics Engineering', place: 'Federal University Oye-Ekiti', note: 'Capstone on machine-vision bottle fill-level detection.', dates: '2016 – 2023' },
]
