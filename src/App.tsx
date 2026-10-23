import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { aiWork, apps, education, journey, numbers, profile, services, traits } from './data'
import { FlatPhone, PhonePair, WebShowcase } from './components/Phone3D'
import { LinkButtons } from './components/LinkButtons'
import type { App as AppT } from './data'
import { Glyph } from './components/Glyph'
import { ThemeToggle } from './components/ThemeToggle'

const HeroScene = lazy(() => import('./components/HeroScene'))

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={`mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${dark ? 'text-white/60' : 'text-ink-2'}`}>
      <span className="h-2 w-2 rounded-full bg-lime ring-1 ring-black/20" />
      {children}
    </div>
  )
}

function Avatar({ className }: { className?: string }) {
  return profile.photo ? (
    <img src={profile.photo} alt={profile.name} className={`rounded-full object-cover ${className}`} />
  ) : (
    <span className={`inline-grid place-items-center rounded-full bg-coal font-sans font-black text-lime ring-1 ring-white/10 ${className}`} aria-label={profile.name}>EO</span>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-300 ${scrolled ? 'bg-paper/80 shadow-[0_8px_30px_rgba(0,0,0,.06)] ring-1 ring-black/5 backdrop-blur-xl' : ''}`}>
        <a href="#top" className="grid h-10 w-10 place-items-center rounded-full bg-coal font-sans text-sm font-black tracking-tight text-lime ring-1 ring-white/10" aria-label="Home">EO</a>
        <div className="flex items-center gap-1 text-sm font-medium sm:gap-2">
          <a href="#work" className="rounded-full px-3 py-2 hover:bg-black/5">Work</a>
          <a href="#ai" className="hidden rounded-full px-3 py-2 hover:bg-black/5 sm:inline">AI</a>
          <a href="#about" className="rounded-full px-3 py-2 hover:bg-black/5">About</a>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="hidden rounded-full px-3 py-2 hover:bg-black/5 sm:inline">Resume</a>
          <ThemeToggle />
          <a href={`mailto:${profile.email}`} className="ml-1 rounded-full bg-ink px-4 py-2 text-paper transition hover:bg-cobalt">Get in touch</a>
        </div>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden px-4 pt-28 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex items-center gap-3 font-serif text-3xl italic sm:text-5xl">
          Hey, I’m <Avatar className="h-12 w-12 text-base not-italic sm:h-16 sm:w-16 sm:text-xl" /> {profile.nickname}.
        </motion.div>

        <h1 className="relative mt-4 leading-[0.82]">
          <motion.span initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="block font-serif text-[13vw] italic tracking-tight sm:text-[8.5rem] lg:text-[10rem]">
            Software <span className="text-cobalt">&amp;</span> AI
          </motion.span>
          <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }} className="block font-display text-[17.5vw] uppercase sm:text-[8.5rem] lg:text-[11rem]">
            Engineer
          </motion.span>
        </h1>

        <div className="mt-8 max-w-md pb-6 lg:mt-10 lg:min-h-[480px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}>
            <p className="text-lg leading-relaxed text-ink-2 sm:text-xl">
              I build <strong className="font-semibold text-ink">intelligent multi-agent systems</strong> that run real operations, and <strong className="font-semibold text-ink">mobile apps people use every day</strong>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-cobalt">See my work</a>
              <a href={`mailto:${profile.email}`} className="rounded-full px-6 py-3.5 text-sm font-semibold ring-1 ring-ink/20 transition hover:bg-lime hover:ring-transparent">Let’s talk</a>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-ink-2">
              <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" /></span>
              Open to AI engineering roles
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3D phones: beside the headline on desktop, below it on phones */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.3 }}
        className="relative h-[440px] sm:h-[560px] lg:absolute lg:right-[-1%] lg:top-[400px] lg:h-[640px] lg:w-[56%]"
      >
        <Suspense fallback={<div className="h-full w-full" />}>
          <HeroScene />
        </Suspense>
      </motion.div>

      <ScreenMarquee />
    </section>
  )
}

// Investor tag beside an app name, the way startups write "YC W24".
function Backed({ label, inline = true }: { label: string; inline?: boolean }) {
  return (
    <span className={`${inline ? 'ml-3 translate-y-[-0.35em] ' : ''}inline-block rounded-full bg-[#1a1f71] px-3 py-1 align-middle font-sans text-xs font-semibold normal-case tracking-normal text-white sm:text-sm`}>
      {label}
    </span>
  )
}

function ScreenMarquee() {
  // Only real screenshots here; mock screens stay on the concept pages.
  const strip = apps.flatMap((a) => (a.gallery ?? a.screens).filter((s) => s.src).slice(0, 3).map((s, i) => ({ s, a, key: `${a.slug}-${i}` })))
  return (
    <div className="relative -mx-4 mt-4 overflow-hidden pb-16 pt-6 sm:-mx-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="animate-marquee flex w-max gap-6" style={{ ['--marquee-duration' as string]: '70s' }}>
        {[...strip, ...strip].map(({ s, a, key }, i) => (
          <div key={key + i} className="w-[150px] shrink-0 sm:w-[180px]" style={{ transform: `rotate(${i % 2 ? 3 : -3}deg)` }}>
            <FlatPhone screen={s} accent={a.accent} name={a.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Services() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <Eyebrow>What I do</Eyebrow>
            <h2 className="font-serif text-5xl leading-[0.95] sm:text-6xl">Idea <span className="italic text-cobalt">→</span> production, end to end.</h2>
            <p className="mt-6 max-w-sm text-ink-2">I work across the stack: the model, the API behind it, and the app in someone’s pocket. That means AI features that actually ship, not demos that stall.</p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-3xl bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05} className="group bg-paper p-6 transition hover:bg-card sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <span className="font-display text-sm text-ink/25 transition group-hover:text-cobalt">0{i + 1}</span>
                </div>
                <div className="mt-1 font-serif text-lg italic text-ink-2">{s.tag}</div>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Apps() {
  return (
    <section id="work" className="relative bg-night px-4 py-24 text-white sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <Eyebrow dark>Selected works · Apps & web</Eyebrow>
          <h2 className="font-display text-[11vw] uppercase leading-[0.95] sm:text-7xl lg:text-8xl">Apps in <span className="font-serif normal-case italic text-lime">the wild</span></h2>
          <p className="mt-6 text-white/60">Fintech, Web3, health, learning and fitness. Cross-platform apps I’ve built and shipped to the App Store and Google Play, plus websites. Tap any project for the details.</p>
        </Reveal>

        <div className="mt-20 space-y-24 sm:space-y-32">
          {apps.map((a, i) => {
            const flip = i % 2 === 1
            return (
              <article key={a.slug} className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16`}>
                <Reveal className={flip ? 'lg:order-2' : ''}>
                  <a href={`#app-${a.slug}`} aria-label={`${a.name} details`} className="block">
                    <Showcase app={a} flip={flip} />
                  </a>
                </Reveal>
                <Reveal delay={0.1} className={flip ? 'lg:order-1' : ''}>
                  <div className="flex items-center gap-3 text-sm text-white/50">
                    <span className="font-display text-lg text-white/30">{String(i + 1).padStart(2, '0')}</span>
                    <span className="h-px w-8 bg-white/20" />
                    {a.role} · {a.years}
                  </div>
                  <h3 className="mt-4 font-display text-[10vw] uppercase sm:text-5xl lg:text-6xl"><a href={`#app-${a.slug}`} className="transition hover:text-lime">{a.name}</a>{a.backedBy && <Backed label={a.backedBy} />}</h3>
                  <p className="mt-2 font-serif text-2xl italic" style={{ color: a.accent === '#3b5bfd' ? '#8aa0ff' : a.accent }}>{a.tagline}</p>
                  <p className="mt-5 max-w-lg leading-relaxed text-white/70">{a.description}</p>
                  {a.stats && (
                    <div className="mt-7 flex flex-wrap gap-6">
                      {a.stats.map((s) => (
                        <div key={s.label}>
                          <div className="font-display text-3xl text-lime">{s.value}</div>
                          <div className="text-xs uppercase tracking-wider text-white/50">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-7 flex flex-wrap gap-2">
                    {a.stack.map((t) => (
                      <span key={t} className="rounded-full px-3 py-1 text-xs text-white/80 ring-1 ring-white/15">{t}</span>
                    ))}
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">{a.platforms}</span>
                  </div>
                  <div className="mt-8"><LinkButtons links={a.links} web={a.kind === 'web'} dark size="sm" /></div>
                  <a href={`#app-${a.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-lime decoration-2 underline-offset-8 transition hover:text-lime">View project <span aria-hidden="true">→</span></a>
                </Reveal>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Showcase({ app: a, flip = false }: { app: AppT; flip?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] p-2 sm:p-6" style={{ background: `radial-gradient(120% 90% at 50% 10%, ${a.bg}, ${a.bg}cc 50%, #1a1a1f 100%)` }}>
      {a.kind === 'web' ? (
        <WebShowcase screen={a.screens[0]} accent={a.accent} name={a.name} variant={a.site} domain={a.links?.website ? new URL(a.links.website).hostname.replace(/^www\./, '') : (a.domain ?? a.name)} />
      ) : (
        <PhonePair screens={a.screens} accent={a.accent} name={a.name} flip={flip} />
      )}
      {!a.screens.some((s) => s.src) && (
        <span className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur">Concept screens</span>
      )}
    </div>
  )
}

function Details({ app: a }: { app: AppT }) {
  const idx = apps.findIndex((x) => x.slug === a.slug)
  const next = apps[(idx + 1) % apps.length]
  const gallery = a.gallery ?? a.screens
  return (
    <section className="px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <a href="#work" className="inline-flex items-center gap-2 text-sm font-medium text-ink-2 transition hover:text-ink">← All work</a>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="text-sm text-ink-2">{a.role} · {a.years} · {a.platforms}</div>
            <h1 className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-[13vw] uppercase leading-[0.95] sm:text-7xl lg:text-8xl">{a.name}{a.backedBy && <Backed label={a.backedBy} inline={false} />}</h1>
            <p className="mt-3 font-serif text-3xl italic text-cobalt">{a.tagline}</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">{a.description}</p>
            <div className="mt-8"><LinkButtons links={a.links} web={a.kind === 'web'} /></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <Showcase app={a} />
          </motion.div>
        </div>

        {a.stats && (
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-ink/10 ring-1 ring-ink/10" style={{ gridTemplateColumns: `repeat(${a.stats.length}, minmax(0, 1fr))` }}>
            {a.stats.map((s) => (
              <div key={s.label} className="bg-paper p-6">
                <div className="font-display text-4xl">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-ink-2">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <Eyebrow>What I did</Eyebrow>
            <ul className="space-y-4">
              {a.highlights.map((h) => (
                <li key={h} className="flex gap-4 border-b border-ink/10 pb-4 text-lg leading-snug">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lime ring-1 ring-black/20" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Built with</Eyebrow>
            <div className="flex flex-wrap gap-2">
              {a.stack.map((t) => <span key={t} className="rounded-full bg-card px-4 py-2 text-sm ring-1 ring-ink/10">{t}</span>)}
            </div>
          </Reveal>
        </div>

        {a.kind !== 'web' && (
          <div className="mt-20">
            <Reveal>
              <Eyebrow>Screens{a.screens.some((s) => s.src) ? '' : ' · concept'}</Eyebrow>
            </Reveal>
            <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
              {gallery.map((s, i) => (
                <div key={i} className="w-[180px] shrink-0 sm:w-[220px]">
                  <FlatPhone screen={s} accent={a.accent} name={a.name} />
                </div>
              ))}
            </div>
          </div>
        )}

        <a href={`#app-${next.slug}`} className="group mt-20 flex items-center justify-between gap-6 rounded-3xl bg-night p-8 text-white transition hover:bg-[#1c1c22] sm:p-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Next project</div>
            <div className="mt-2 font-display text-[10vw] uppercase sm:text-5xl lg:text-6xl">{next.name}</div>
            <div className="font-serif text-xl italic text-lime">{next.tagline}</div>
          </div>
          <span className="text-4xl transition group-hover:translate-x-2" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}

function useRoute() {
  const read = () => window.location.hash.replace(/^#/, '')
  const [hash, setHash] = useState(read)
  useEffect(() => {
    const on = () => setHash(read())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return hash
}

function AIWork() {
  return (
    <section id="ai" className="px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Selected works · AI & systems</Eyebrow>
            <h2 className="font-display text-[11vw] uppercase leading-[0.95] sm:text-7xl lg:text-8xl">Intelligent <span className="font-serif normal-case italic text-cobalt">systems</span></h2>
          </div>
          <p className="max-w-sm text-ink-2">Agents, assistants and models in production and in research, from WhatsApp banking to self-healing CI/CD pipelines.</p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {aiWork.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 0.08}>
              <div className={`group flex h-full flex-col rounded-3xl p-7 transition duration-300 hover:-translate-y-1 ${i === 0 ? 'bg-coal text-bone ring-1 ring-white/10' : 'bg-card ring-1 ring-ink/5 hover:shadow-[0_20px_50px_rgba(0,0,0,.08)]'}`}>
                <div className={`grid h-24 place-items-center rounded-2xl ${i === 0 ? 'bg-white/5' : 'bg-paper'}`}>
                  <Glyph kind={w.glyph} dark={i === 0} />
                </div>
                <div className={`mt-6 text-xs font-semibold uppercase tracking-[0.16em] ${i === 0 ? 'text-lime' : 'text-cobalt'}`}>{w.kicker}</div>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{w.title}</h3>
                <p className={`mt-3 flex-1 text-sm leading-relaxed ${i === 0 ? 'text-bone/70' : 'text-ink-2'}`}>{w.body}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {w.stack.map((t) => (
                    <span key={t} className={`rounded-full px-2.5 py-1 text-[11px] ${i === 0 ? 'bg-white/10' : 'bg-paper'}`}>{t}</span>
                  ))}
                </div>
                {'project' in w && w.project && (
                  <a href={`#app-${w.project}`} className="mt-5 text-sm font-semibold underline decoration-lime decoration-2 underline-offset-4">View project →</a>
                )}
                {w.link && (
                  <a href={w.link} target="_blank" rel="noreferrer" className="mt-5 text-sm font-semibold underline decoration-lime decoration-2 underline-offset-4">Read the paper ↗</a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="bg-paper-2 px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-coal ring-1 ring-white/10">
            {profile.photo ? (
              <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full place-items-center">
                <span className="font-sans text-[8rem] font-black leading-none tracking-tighter text-lime">EO</span>
              </div>
            )}
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-paper/90 px-5 py-4 backdrop-blur">
              <div className="font-serif text-2xl italic">{profile.name}</div>
              <div className="text-sm text-ink-2">{profile.role}</div>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h2 className="font-serif text-4xl leading-[1.05] sm:text-5xl">
              5+ years turning hard problems into software people trust, <span className="italic text-cobalt">from mechatronics to multi-agent AI.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-2">
              {traits.map((t) => (
                <span key={t} className="rounded-full bg-paper px-4 py-2 text-sm font-medium ring-1 ring-ink/10">{t}</span>
              ))}
            </div>
            <div className="mt-8 space-y-4 leading-relaxed text-ink-2">
              <p>I started in mechatronics, building machine-vision systems and robots, then spent years shipping mobile fintech and Web3 apps that move real money for real people across West Africa.</p>
              <p>Today I focus on AI engineering: LLM agents, automation and the backends that make them reliable. My M.Sc. research on agentic DevSecOps earned a distinction, and I bring the same rigor to every production system I touch.</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-4">
              {numbers.map((n) => (
                <div key={n.label} className="bg-paper-2 p-5">
                  <div className="font-display text-3xl">{n.value}</div>
                  <div className="mt-1 text-xs leading-snug text-ink-2">{n.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section className="px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Experience</Eyebrow>
          <h2 className="font-display text-[11vw] uppercase leading-[0.95] sm:text-7xl lg:text-8xl">The journey <span className="font-serif normal-case italic text-cobalt">so far</span></h2>
        </Reveal>
        <ol className="mt-14 border-t border-ink/15">
          {journey.map((j, i) => (
            <Reveal key={j.company} delay={i * 0.04}>
              <li className="group grid gap-3 border-b border-ink/15 py-8 transition sm:grid-cols-[180px_1fr_1.3fr] sm:gap-8">
                <div className="text-sm text-ink-2">{j.dates}</div>
                <div>
                  <div className="text-xl font-semibold transition group-hover:text-cobalt">{j.company}</div>
                  <div className="font-serif text-lg italic text-ink-2">{j.role}</div>
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-ink-2">{j.body}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {j.tags.map((t) => <span key={t} className="rounded-full bg-paper-2 px-2.5 py-1 text-[11px]">{t}</span>)}
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-card p-7 ring-1 ring-ink/5">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt">Education · {e.dates}</div>
                <div className="mt-3 text-xl font-semibold">{e.title}</div>
                <div className="font-serif text-lg italic text-ink-2">{e.place}</div>
                <p className="mt-3 text-sm text-ink-2">{e.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-night px-4 pb-10 pt-24 text-white sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow dark>Contact</Eyebrow>
          <h2 className="font-display text-[11.5vw] uppercase leading-[0.9] sm:text-[6.5rem] lg:text-[7.5rem]">
            Let’s build <br /><span className="font-serif normal-case italic text-lime">something intelligent.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col justify-between gap-8 border-t border-white/15 pt-10 sm:flex-row sm:items-center">
            <div>
              <p className="text-white/60">Have a product, an AI idea or a role in mind?</p>
              <a href={`mailto:${profile.email}`} className="mt-2 inline-block text-2xl font-semibold underline decoration-lime decoration-2 underline-offset-8 transition hover:text-lime sm:text-3xl">{profile.email}</a>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="rounded-full px-5 py-2.5 text-sm ring-1 ring-white/20 transition hover:bg-lime hover:text-ink hover:ring-transparent">{s.label} ↗</a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
      <a href={`mailto:${profile.email}`} className="mt-20 block overflow-hidden border-y border-white/10 py-5 sm:-mx-6 -mx-4">
        <div className="animate-marquee flex w-max" style={{ ['--marquee-duration' as string]: '28s' }}>
          {Array.from({ length: 2 }, (_, k) => (
            <div key={k} className="flex shrink-0">
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i} className="px-6 font-display text-4xl uppercase text-white/90 sm:text-6xl">Get in touch <span className="text-lime">•</span></span>
              ))}
            </div>
          ))}
        </div>
      </a>
      <footer className="mx-auto mt-10 flex max-w-6xl flex-col justify-between gap-2 text-sm text-white/40 sm:flex-row">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Designed and built by me, with React, Three.js and a lot of coffee.</span>
      </footer>
    </section>
  )
}

export default function App() {
  const hash = useRoute()
  const detail = hash.startsWith('app-') ? apps.find((a) => `app-${a.slug}` === hash) : undefined

  // Project pages open at the top; section links scroll to their section.
  useEffect(() => {
    if (detail) { window.scrollTo({ top: 0, behavior: 'instant' }); return }
    if (!hash) return
    requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView())
  }, [hash, detail])

  if (detail) {
    return (
      <>
        <Nav />
        <main key={detail.slug}>
          <Details app={detail} />
        </main>
        <Contact />
      </>
    )
  }

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Apps />
        <AIWork />
        <About />
        <Journey />
        <Contact />
      </main>
    </>
  )
}
