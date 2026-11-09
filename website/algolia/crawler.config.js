/* global Crawler */
/* eslint-disable no-new */

/**
 * Algolia Crawler configuration for the site search (DocSearch).
 *
 * VitePress' Algolia search box only understands DocSearch-formatted records
 * (`hierarchy.lvl0`-`lvl6`, `content`, `type`, `url`, `lang`) and always filters
 * results with `facetFilters: ['lang:en-US']`. The generic "website" crawler
 * template produces a different record shape, which is why search showed no results.
 *
 * To apply it: Algolia dashboard -> Data sources -> Crawler -> your crawler -> Editor,
 * replace the config with this file (keep the `apiKey` your editor already has),
 * save, then click "Restart crawling".
 *
 * `initialIndexSettings` are only applied when the crawler creates an index,
 * so the records go into a new index instead of reusing the old `*_pages` one.
 * The index name must match `search.options.indexName` in
 * `src/.vitepress/config/themeConfig.ts`.
 */
new Crawler({
  appId: 'Q86TZCK22S',
  apiKey: '<crawler API key: keep the one already in your crawler editor>',
  rateLimit: 8,
  startUrls: ['https://komikku-app.github.io/'],
  sitemaps: ['https://komikku-app.github.io/sitemap.xml'],
  discoveryPatterns: ['https://komikku-app.github.io/**'],
  exclusionPatterns: [
    'https://komikku-app.github.io/sandbox/**',
    // Client-side redirect to the newest changelog page, which is crawled on its own.
    'https://komikku-app.github.io/changelogs/latest',
  ],
  renderJavaScript: false,
  ignoreCanonicalTo: false,
  schedule: 'at 05:10 on Saturday',
  actions: [
    {
      indexName: 'komikku_docs',
      pathsToMatch: ['https://komikku-app.github.io/**'],
      // The crawler runs this function on its own, so it must not use anything declared outside of it.
      recordExtractor: ({ url, $, helpers }) => {
        const doc = $('.vp-doc')
        // Pages without Markdown content (e.g. the home page, which is only a hero) have nothing to index.
        if (!doc.text().trim()) {
          return []
        }

        // Drop the zero-width-space permalink VitePress appends to every heading, so it doesn't end up in titles.
        doc.find('.header-anchor').remove()

        // News posts render their title outside the page body: restore it so their records have a title.
        if (doc.find('h1').length === 0) {
          const title = $('meta[property="og:title"]').attr('content') || $('title').text().split(' | ')[0]
          doc.prepend($('<h1></h1>').text(title))
        }

        const path = url.pathname
        let section = 'Komikku'
        if (path.startsWith('/changelogs/')) {
          section = 'Changelogs'
        }
        else if (path.startsWith('/news/')) {
          section = 'News'
        }
        else if (path.startsWith('/forks/')) {
          section = 'Forks'
        }

        return helpers.docsearch({
          recordProps: {
            // Sidebar group of the current page ("Frequently Asked Questions", "Guides"), else the site section.
            lvl0: {
              selectors: 'section.has-active div h2',
              defaultValue: section,
            },
            lvl1: '.vp-doc h1',
            lvl2: '.vp-doc h2',
            lvl3: '.vp-doc h3',
            lvl4: '.vp-doc h4',
            lvl5: '.vp-doc h5',
            lvl6: '.vp-doc h6',
            content: '.vp-doc p, .vp-doc li',
            // VitePress filters every search with `lang:<html lang>`, so each record needs that value.
            lang: {
              defaultValue: $('html').attr('lang') || 'en-US',
            },
          },
          indexHeadings: true,
        })
      },
    },
  ],
  initialIndexSettings: {
    komikku_docs: {
      attributesForFaceting: ['type', 'lang'],
      attributesToRetrieve: ['hierarchy', 'content', 'anchor', 'url'],
      attributesToHighlight: ['hierarchy', 'hierarchy_camel', 'content'],
      attributesToSnippet: ['content:10'],
      camelCaseAttributes: ['hierarchy', 'hierarchy_radio', 'content'],
      searchableAttributes: [
        'unordered(hierarchy_radio_camel.lvl0)',
        'unordered(hierarchy_radio.lvl0)',
        'unordered(hierarchy_radio_camel.lvl1)',
        'unordered(hierarchy_radio.lvl1)',
        'unordered(hierarchy_radio_camel.lvl2)',
        'unordered(hierarchy_radio.lvl2)',
        'unordered(hierarchy_radio_camel.lvl3)',
        'unordered(hierarchy_radio.lvl3)',
        'unordered(hierarchy_radio_camel.lvl4)',
        'unordered(hierarchy_radio.lvl4)',
        'unordered(hierarchy_radio_camel.lvl5)',
        'unordered(hierarchy_radio.lvl5)',
        'unordered(hierarchy_radio_camel.lvl6)',
        'unordered(hierarchy_radio.lvl6)',
        'unordered(hierarchy_camel.lvl0)',
        'unordered(hierarchy.lvl0)',
        'unordered(hierarchy_camel.lvl1)',
        'unordered(hierarchy.lvl1)',
        'unordered(hierarchy_camel.lvl2)',
        'unordered(hierarchy.lvl2)',
        'unordered(hierarchy_camel.lvl3)',
        'unordered(hierarchy.lvl3)',
        'unordered(hierarchy_camel.lvl4)',
        'unordered(hierarchy.lvl4)',
        'unordered(hierarchy_camel.lvl5)',
        'unordered(hierarchy.lvl5)',
        'unordered(hierarchy_camel.lvl6)',
        'unordered(hierarchy.lvl6)',
        'content',
      ],
      distinct: true,
      attributeForDistinct: 'url',
      customRanking: [
        'desc(weight.pageRank)',
        'desc(weight.level)',
        'asc(weight.position)',
      ],
      ranking: [
        'words',
        'filters',
        'typo',
        'attribute',
        'proximity',
        'exact',
        'custom',
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: '</span>',
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: 'allOptional',
    },
  },
})
