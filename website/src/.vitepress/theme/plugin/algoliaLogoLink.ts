// DocSearch hardcodes the "Search by Algolia" logo link in its modal footer
// and has no option to change it, so rewrite the link whenever the modal renders.

function rewriteLogoLinks(href: string) {
  for (const link of document.querySelectorAll<HTMLAnchorElement>('.DocSearch-Logo a')) {
    if (link.href !== href)
      link.href = href
  }
}

export default function ({ href }: { href: string }) {
  if (typeof window === 'undefined')
    return

  const observer = new MutationObserver(() => rewriteLogoLinks(href))
  observer.observe(document.body, { childList: true, subtree: true })
}
