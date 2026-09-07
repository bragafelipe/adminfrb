import type { ClientConfig } from '@/types/config'

export function applyBrandToDocument(
  config: ClientConfig,
  options?: { isDark?: boolean },
): () => void {
  if (typeof document === 'undefined') {
    return () => {}
  }

  const root = document.documentElement
  const colors = config.colors
  const isDark =
    options?.isDark !== undefined
      ? options.isDark
      : root.getAttribute('data-theme') === 'dark' ||
        (typeof window !== 'undefined' &&
          typeof window.matchMedia === 'function' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)

  const appliedProperties: string[] = []

  const setCssVar = (name: string, value?: string) => {
    if (value) {
      root.style.setProperty(name, value)
      appliedProperties.push(name)
    }
  }

  if (colors) {
    const activeColors = isDark && colors.dark ? colors.dark : colors

    setCssVar('--color-accent', activeColors.accent ?? colors.accent)
    setCssVar(
      '--color-background',
      activeColors.background ?? colors.background,
    )
    setCssVar('--color-surface', activeColors.surface ?? colors.surface)
    setCssVar('--color-text', activeColors.text ?? colors.text)
    setCssVar('--color-text-muted', activeColors.textMuted ?? colors.textMuted)
    setCssVar('--color-border', activeColors.border ?? colors.border)
    setCssVar('--color-success', activeColors.success ?? colors.success)
    setCssVar(
      '--color-success-surface',
      activeColors.successSurface ?? colors.successSurface,
    )

    if (colors.customVariables) {
      for (const [key, value] of Object.entries(colors.customVariables)) {
        setCssVar(key, value)
      }
    }
  }

  // Update document title
  const originalTitle = document.title
  if (config.meta?.title) {
    document.title = config.meta.title
  } else if (config.companyName) {
    document.title = config.tagline
      ? `${config.companyName} | ${config.tagline}`
      : config.companyName
  }

  // Update favicon
  let originalFavicon: string | null = null
  let faviconLink = document.querySelector<HTMLLinkElement>("link[rel~='icon']")
  if (config.faviconUrl) {
    if (!faviconLink) {
      faviconLink = document.createElement('link')
      faviconLink.rel = 'icon'
      document.head.appendChild(faviconLink)
    } else {
      originalFavicon = faviconLink.href
    }
    faviconLink.href = config.faviconUrl
  }

  // Update meta description
  let metaDesc = document.querySelector<HTMLMetaElement>(
    "meta[name='description']",
  )
  const originalMetaDesc = metaDesc?.content ?? null
  const newDescription = config.meta?.description ?? config.description
  if (newDescription) {
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = newDescription
  }

  // Return cleanup function to revert changes if needed
  return () => {
    for (const prop of appliedProperties) {
      root.style.removeProperty(prop)
    }
    if (originalTitle) {
      document.title = originalTitle
    }
    if (faviconLink && originalFavicon) {
      faviconLink.href = originalFavicon
    }
    if (metaDesc && originalMetaDesc !== null) {
      metaDesc.content = originalMetaDesc
    }
  }
}
