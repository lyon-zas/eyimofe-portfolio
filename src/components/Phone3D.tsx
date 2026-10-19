import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionStyle, type MotionValue } from 'framer-motion'
import type { Screen } from '../data'
import { MockScreen, MockSite } from './MockScreen'

const DEPTH = 12

// Framed screens ship a 600px copy in screens/sm/ (see scripts/frame_screenshot.py).
const smallSrc = (src: string) => src.replace('/screens/', '/screens/sm/')

function PhoneBody({ screen, accent, name }: { screen: Screen; accent: string; name: string }) {
  return (
    <>
      {Array.from({ length: DEPTH }, (_, i) => (
        <div
          key={i}
          className="phone-layer"
          style={{ transform: `translateZ(${-(i + 1)}px)`, background: i === DEPTH - 1 ? '#0b0b0d' : `hsl(240 4% ${16 - i * 0.6}%)` }}
        />
      ))}
      <div className="phone-face">
        <div className="phone-screen" style={{ containerType: 'inline-size' }}>
          {screen.src ? (
            <img src={smallSrc(screen.src)} alt={`${name} app screen`} loading="lazy" decoding="async" draggable={false} className="h-full w-full object-cover" style={{ objectPosition: screen.pos ?? 'top', backfaceVisibility: 'hidden' }} />
          ) : (
            <MockScreen kind={screen.mock ?? 'wallet'} accent={accent} name={name} />
          )}
        </div>
        <div className="phone-island" />
      </div>
    </>
  )
}

type Tilt = { rx: number; ry: number; rz: number }

function TiltedPhone({ screen, accent, name, base, mx, my, scrollRot, style, className }: {
  screen: Screen
  accent: string
  name: string
  base: Tilt
  mx: MotionValue<number>
  my: MotionValue<number>
  scrollRot: MotionValue<number>
  style?: MotionStyle
  className?: string
}) {
  const rotateY = useTransform([mx, scrollRot], ([m, s]: number[]) => base.ry + m * 14 + s)
  const rotateX = useTransform(my, (m) => base.rx - m * 10)
  return (
    <motion.div className={`phone ${className ?? ''}`} style={{ rotateX, rotateY, rotateZ: base.rz, ...style }}>
      <PhoneBody screen={screen} accent={accent} name={name} />
    </motion.div>
  )
}

/** Two phones floating in 3D, tilting with the pointer and turning slightly on scroll. */
export function PhonePair({ screens, accent, name, flip = false }: { screens: [Screen, Screen]; accent: string; name: string; flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 120, damping: 18 })
  const my = useSpring(rawY, { stiffness: 120, damping: 18 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scrollRot = useTransform(scrollYProgress, [0, 1], flip ? [-10, 10] : [10, -10])
  const s = flip ? -1 : 1

  return (
    <div
      ref={ref}
      className="phone-scene relative mx-auto flex aspect-[5/4] w-full max-w-[560px] items-center justify-center"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        rawX.set((e.clientX - r.left) / r.width - 0.5)
        rawY.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => { rawX.set(0); rawY.set(0) }}
    >
      <div className="absolute inset-[12%] rounded-full blur-3xl" style={{ background: accent, opacity: 0.22 }} />
      <div className="absolute bottom-[6%] left-1/2 h-6 w-[60%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-xl" />
      <div className="animate-float absolute w-[28%]" style={{ left: flip ? '50%' : '22%', top: '7%', animationDelay: '-2s' }}>
        <TiltedPhone screen={screens[1]} accent={accent} name={name} base={{ rx: 12, ry: -26 * s, rz: 6 * s }} mx={mx} my={my} scrollRot={scrollRot} />
      </div>
      <div className="animate-float absolute w-[30%]" style={{ left: flip ? '20%' : '48%', top: '13%' }}>
        <TiltedPhone screen={screens[0]} accent={accent} name={name} base={{ rx: 10, ry: -22 * s, rz: -4 * s }} mx={mx} my={my} scrollRot={scrollRot} style={{ z: 60 }} />
      </div>
    </div>
  )
}

/** A single static phone used in marquees. */
export function FlatPhone({ screen, accent, name, className }: { screen: Screen; accent: string; name: string; className?: string }) {
  return (
    <div className={`phone ${className ?? ''}`}>
      <PhoneBody screen={screen} accent={accent} name={name} />
    </div>
  )
}

/** A website shown as a tilted browser window with its mobile view in front. */
export function WebShowcase({ screen, accent, name, domain, variant }: { screen: Screen; accent: string; name: string; domain: string; variant?: 'wtc' | 'clinic' }) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 120, damping: 18 })
  const my = useSpring(rawY, { stiffness: 120, damping: 18 })
  const ry = useTransform(mx, (m) => -16 + m * 12)
  const rx = useTransform(my, (m) => 8 - m * 8)
  const zero = useMotionValue(0)
  return (
    <div
      className="phone-scene relative mx-auto flex aspect-[5/4] w-full max-w-[560px] items-center justify-center"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        rawX.set((e.clientX - r.left) / r.width - 0.5)
        rawY.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => { rawX.set(0); rawY.set(0) }}
    >
      <div className="absolute inset-[12%] rounded-full blur-3xl" style={{ background: accent, opacity: 0.25 }} />
      <div className="absolute bottom-[6%] left-1/2 h-6 w-[70%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-xl" />
      <motion.div className="animate-float absolute left-[6%] top-[16%] w-[80%]" style={{ rotateY: ry, rotateX: rx, rotateZ: -2, transformStyle: 'preserve-3d' }}>
        <div className="overflow-hidden rounded-xl bg-[#1b1b1f] shadow-[0_30px_60px_rgba(0,0,0,.35)] ring-1 ring-white/10">
          <div className="flex items-center gap-1.5 px-3 py-2">
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />)}
            <span className="ml-3 flex-1 truncate rounded-md bg-white/10 px-2 py-0.5 text-[10px] text-white/60">{domain}</span>
          </div>
          <div className="relative aspect-[16/10]"><MockSite accent={accent} variant={variant} /></div>
        </div>
      </motion.div>
      <div className="animate-float absolute right-[8%] top-[30%] w-[24%]" style={{ animationDelay: '-2s' }}>
        <TiltedPhone screen={screen} accent={accent} name={name} base={{ rx: 8, ry: -20, rz: 3 }} mx={mx} my={my} scrollRot={zero} style={{ z: 80 }} />
      </div>
    </div>
  )
}
