import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'
const KEY = 'theme'

const media = () => window.matchMedia('(prefers-color-scheme: dark)')

/** The theme in effect: an explicit data-theme on <html>, else the OS setting. */
export function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme
  if (set === 'light' || set === 'dark') return set
  return media().matches ? 'dark' : 'light'
}

export function setTheme(t: Theme) {
  document.documentElement.dataset.theme = t
  try { localStorage.setItem(KEY, t) } catch { /* storage unavailable */ }
}

export function useIsDark() {
  const [dark, setDark] = useState(() => currentTheme() === 'dark')
  useEffect(() => {
    const update = () => setDark(currentTheme() === 'dark')
    const obs = new MutationObserver(update)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const m = media()
    m.addEventListener('change', update)
    return () => { obs.disconnect(); m.removeEventListener('change', update) }
  }, [])
  return dark
}
