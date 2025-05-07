import type { HeadConfig } from 'vitepress'

const headConfig: HeadConfig[] = [
  ['meta', { name: 'darkreader-lock' }],
  ['meta', { name: 'theme-color', content: '#0058A0' }],
  ['meta', { name: 'msapplication-TileColor', content: '#0058A0' }],
  ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
  ['meta', { name: 'algolia-site-verification', content: '037010E1F9C05EF7' }],
  ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
  ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
  ['link', { rel: 'manifest', href: '/site.webmanifest' }],
  ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#0058A0' }],
  ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
  ['meta', { name: 'twitter:card', content: 'summary' }],
  ['meta', { property: 'og:site_name', content: 'Komikku' }],
  ['meta', { property: 'og:description', content: 'Discover and read manga, webtoons, comics, and more – easier than ever on your Android device.' }],
  ['meta', { property: 'og:locale', content: 'en_US' }],
  ['meta', { property: 'og:type', content: 'website' }],
]

export default headConfig
