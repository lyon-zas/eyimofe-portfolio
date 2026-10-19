import type { Links } from '../data'

const Apple = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.86-.76-1.47.02-2.83.86-3.59 2.17-1.53 2.65-.39 6.58 1.1 8.73.73 1.05 1.6 2.23 2.73 2.19 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.28-.88-2.3-3.48zM14.2 6.13c.6-.74 1.01-1.75.9-2.77-.87.04-1.93.58-2.55 1.31-.56.64-1.05 1.68-.92 2.67.97.08 1.97-.49 2.57-1.21z" /></svg>
)
const Play = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.6 2.3 13.4 12l-9.8 9.7c-.35-.2-.6-.6-.6-1.1V3.4c0-.5.25-.9.6-1.1z" fill="#00d7fe" /><path d="m16.8 8.6-3.4 3.4-9.8-9.7c.3-.17.7-.2 1.07 0z" fill="#00f076" /><path d="m16.8 15.4-12.13 6.3c-.37.2-.77.17-1.07 0L13.4 12z" fill="#ff3a44" /><path d="m20.4 10.5c.8.45.8 1.6 0 2.05l-3.6 1.85-3.4-3.4 3.4-3.4z" fill="#ffd400" /></svg>
)
const Globe = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" /></svg>
)

/**
 * Mobile apps always show App Store and Google Play; websites show a website
 * button. A missing link renders as a muted "Coming soon" button.
 */
export function LinkButtons({ links, dark, web, size = 'md' }: { links?: Links; dark?: boolean; web?: boolean; size?: 'sm' | 'md' }) {
  const items: { href?: string; top: string; label: string; icon: React.ReactNode }[] = web
    ? [{ href: links?.website, top: 'Visit the', label: 'Website ↗', icon: <Globe /> }]
    : [
        { href: links?.appStore, top: 'Download on the', label: 'App Store', icon: <Apple /> },
        { href: links?.playStore, top: 'Get it on', label: 'Google Play', icon: <Play /> },
        ...(links?.website ? [{ href: links.website, top: 'Visit the', label: 'Website ↗', icon: <Globe /> }] : []),
      ]
  const pad = size === 'sm' ? 'px-4 py-2' : 'px-5 py-2.5'
  const live = dark ? 'bg-white text-[#121212] hover:bg-lime' : 'bg-ink text-paper hover:bg-cobalt'
  const muted = dark ? 'text-white/45 ring-1 ring-white/15' : 'text-ink-2 ring-1 ring-ink/15'
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((it) => {
        const inner = (
          <>
            {it.icon}
            <span className="leading-tight">
              <span className="block text-[10px] opacity-70">{it.href ? it.top : 'Coming soon'}</span>
              <span className="block text-sm font-semibold">{it.label}</span>
            </span>
          </>
        )
        return it.href ? (
          <a key={it.label} href={it.href} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-3 rounded-2xl ${pad} transition hover:-translate-y-0.5 ${live}`}>{inner}</a>
        ) : (
          <span key={it.label} aria-disabled="true" title="Link coming soon" className={`inline-flex cursor-default items-center gap-3 rounded-2xl ${pad} ${muted}`}>{inner}</span>
        )
      })}
    </div>
  )
}
