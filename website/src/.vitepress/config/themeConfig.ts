import type { DefaultTheme } from 'vitepress'

import nav from './navigation/navbar'
import sidebar from './navigation/sidebar'

const themeConfig: DefaultTheme.Config = {
  logo: {
    src: '/img/logo-128px.png',
    width: 24,
    height: 24,
  },

  nav,
  sidebar,

  outline: [2, 3],

  socialLinks: [
    {
      icon: 'github',
      link: 'https://github.com/komikku-app/komikku',
      ariaLabel: 'Project GitHub',
    },
    {
      icon: 'discord',
      link: 'https://discord.gg/85jB7V5AJR',
      ariaLabel: 'Discord Server',
    },
  ],

  footer: {
    message: '<a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank">Open-source Apache Licensed</a> <span class="divider">|</span> <a href="/privacy/">Privacy policy</a>',
    copyright: `Copyright © ${new Date().getFullYear()} Mihon App`,
  },

  editLink: {
    pattern: 'https://github.com/komikku-app/komikku-app.github.io/edit/main/website/src/:path',
    text: 'Help us improve this page',
  },

  lastUpdated: {
    text: 'Last updated',
    formatOptions: {
      forceLocale: true,
      dateStyle: 'long',
      timeStyle: 'short',
    },
  },

  search: {
    provider: 'algolia',
    options: {
      appId: 'Q86TZCK22S',
      apiKey: '374776fdc4ecd4e72c1ea3a91b71e213',
      indexName: 'komikku',
    },
  },
}

export default themeConfig
