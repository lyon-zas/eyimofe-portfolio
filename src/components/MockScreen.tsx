import type { CSSProperties, ReactNode } from 'react'
import type { MockKind } from '../data'

// Stand-in app screens, drawn in HTML so they stay crisp at any size.
// Sizes use cqw (container query width) so they scale with the phone.

const u = (n: number) => `${n}cqw`

function Bar({ w, c = '#e7e7ea', h = 2.6 }: { w: string; c?: string; h?: number }) {
  return <div style={{ width: w, height: u(h), borderRadius: u(2), background: c }} />
}

function Status({ dark }: { dark?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: `${u(4)} ${u(8)} ${u(2)}`, fontSize: u(3.6), fontWeight: 600, color: dark ? '#fff' : '#111' }}>
      <span>9:41</span>
      <span style={{ letterSpacing: u(0.5) }}>●●● ▮</span>
    </div>
  )
}

function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ borderRadius: u(5), padding: u(5), background: '#fff', boxShadow: '0 1px 0 rgba(0,0,0,.04)', ...style }}>{children}</div>
}

function Row({ icon, title, sub, amt, accent }: { icon: string; title: string; sub: string; amt: string; accent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: u(3), padding: `${u(2.5)} 0` }}>
      <div style={{ width: u(10), height: u(10), borderRadius: u(3), background: accent + '22', color: accent, display: 'grid', placeItems: 'center', fontSize: u(4.5) }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: u(3.8), fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: u(3), color: '#8a8a90' }}>{sub}</div>
      </div>
      <div style={{ fontSize: u(3.8), fontWeight: 700 }}>{amt}</div>
    </div>
  )
}

function TabBar({ accent, dark }: { accent: string; dark?: boolean }) {
  return (
    <div style={{ position: 'absolute', left: u(5), right: u(5), bottom: u(5), height: u(14), borderRadius: u(7), background: dark ? '#1d1d22' : '#fff', display: 'flex', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,.08)' }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ width: u(5), height: u(5), borderRadius: u(1.6), background: i === 0 ? accent : dark ? '#3a3a42' : '#d6d6db' }} />
      ))}
    </div>
  )
}

export function MockScreen({ kind, accent, name }: { kind: MockKind; accent: string; name: string }) {
  const base: CSSProperties = { position: 'absolute', inset: 0, containerType: 'inline-size', fontFamily: 'var(--font-sans)', color: '#111', overflow: 'hidden' }

  if (kind === 'nfc') {
    return (
      <div style={{ ...base, background: `linear-gradient(170deg, ${accent}, #101a4d)`, color: '#fff' }}>
        <Status dark />
        <div style={{ padding: u(8), paddingTop: u(10) }}>
          <div style={{ fontSize: u(4), opacity: 0.75 }}>{name}</div>
          <div style={{ fontSize: u(7.5), fontWeight: 700, marginTop: u(1) }}>Tap to pay</div>
        </div>
        <div style={{ position: 'relative', height: u(80), display: 'grid', placeItems: 'center' }}>
          {[62, 46, 30].map((s, i) => (
            <div key={s} style={{ position: 'absolute', width: u(s), height: u(s), borderRadius: '50%', border: `${u(0.6)} solid rgba(255,255,255,${0.18 + i * 0.18})` }} />
          ))}
          <div style={{ width: u(20), height: u(20), borderRadius: '50%', background: '#fff', color: accent, display: 'grid', placeItems: 'center', fontSize: u(8), fontWeight: 800 }}>))</div>
        </div>
        <div style={{ textAlign: 'center', fontSize: u(12), fontWeight: 800, letterSpacing: u(-0.3) }}>₦25,000</div>
        <div style={{ textAlign: 'center', fontSize: u(3.6), opacity: 0.7, marginTop: u(1) }}>Hold card near the phone</div>
        <div style={{ display: 'flex', gap: u(3), padding: u(8), position: 'absolute', bottom: u(4), left: 0, right: 0 }}>
          {['Scan', 'USSD'].map((t) => (
            <div key={t} style={{ flex: 1, textAlign: 'center', padding: u(3.5), borderRadius: u(4), background: 'rgba(255,255,255,.14)', fontSize: u(3.8), fontWeight: 600 }}>{t}</div>
          ))}
        </div>
      </div>
    )
  }

  if (kind === 'wallet' || kind === 'exchange') {
    const ex = kind === 'exchange'
    return (
      <div style={{ ...base, background: '#f4f4f6' }}>
        <Status />
        <div style={{ padding: `${u(4)} ${u(6)}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: u(4.2), fontWeight: 600 }}>Hi, Ted 👋</div>
            <div style={{ width: u(8), height: u(8), borderRadius: '50%', background: accent + '33' }} />
          </div>
          <div style={{ marginTop: u(5), borderRadius: u(6), padding: u(6), color: '#fff', background: `linear-gradient(135deg, ${accent}, #111)` }}>
            <div style={{ fontSize: u(3.4), opacity: 0.8 }}>{ex ? 'Portfolio value' : 'Available balance'}</div>
            <div style={{ fontSize: u(9), fontWeight: 800, marginTop: u(1) }}>{ex ? '$4,812.50' : '₦1,248,300'}</div>
            <div style={{ display: 'flex', gap: u(2), marginTop: u(5) }}>
              {(ex ? ['Buy', 'Sell', 'Gift cards'] : ['Send', 'Receive', 'Bills']).map((t) => (
                <div key={t} style={{ padding: `${u(2)} ${u(3.5)}`, borderRadius: u(4), background: 'rgba(255,255,255,.16)', fontSize: u(3.3), fontWeight: 600 }}>{t}</div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: u(4), fontWeight: 700, margin: `${u(6)} 0 ${u(1)}` }}>{ex ? 'Markets' : 'Recent'}</div>
          <Card style={{ padding: `${u(2)} ${u(4)}` }}>
            {ex ? (
              <>
                <Row icon="₿" title="Bitcoin" sub="BTC · +2.4%" amt="$67,120" accent="#f7931a" />
                <Row icon="Ξ" title="Ethereum" sub="ETH · +1.1%" amt="$3,402" accent="#627eea" />
                <Row icon="▣" title="Amazon card" sub="Gift card · rate 92%" amt="$100" accent={accent} />
                <Row icon="₮" title="Tether" sub="USDT · 0.0%" amt="$1.00" accent="#26a17b" />
              </>
            ) : (
              <>
                <Row icon="↗" title="Transfer to Ada" sub="Today, 10:24" amt="-₦15,000" accent={accent} />
                <Row icon="⚡" title="Electricity" sub="Yesterday" amt="-₦8,500" accent="#f59e0b" />
                <Row icon="↙" title="From Musa" sub="Mon, 18:02" amt="+₦42,000" accent="#16a34a" />
                <Row icon="◎" title="Airtime" sub="Sun, 09:15" amt="-₦2,000" accent="#8b5cf6" />
              </>
            )}
          </Card>
        </div>
        <TabBar accent={accent} />
      </div>
    )
  }

  if (kind === 'web3') {
    return (
      <div style={{ ...base, background: '#0e0f13', color: '#fff' }}>
        <Status dark />
        <div style={{ padding: `${u(4)} ${u(6)}` }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: u(2), padding: `${u(1.8)} ${u(3.5)}`, borderRadius: u(5), background: '#1c1d24', fontSize: u(3.3) }}>
            <span style={{ width: u(2.4), height: u(2.4), borderRadius: '50%', background: '#22c55e' }} />0x7a3…e91F
          </div>
          <div style={{ fontSize: u(3.6), opacity: 0.6, marginTop: u(7) }}>Wallet balance</div>
          <div style={{ fontSize: u(10), fontWeight: 800 }}>2.481 <span style={{ fontSize: u(5), opacity: 0.6 }}>ETH</span></div>
          <svg viewBox="0 0 100 34" style={{ width: '100%', marginTop: u(3) }}>
            <defs>
              <linearGradient id={`g-${name}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor={accent} stopOpacity=".5" />
                <stop offset="1" stopColor={accent} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 28 L10 24 L20 26 L30 18 L40 20 L50 12 L60 15 L70 8 L80 11 L90 4 L100 6 L100 34 L0 34Z" fill={`url(#g-${name})`} />
            <path d="M0 28 L10 24 L20 26 L30 18 L40 20 L50 12 L60 15 L70 8 L80 11 L90 4 L100 6" fill="none" stroke={accent} strokeWidth="1.2" />
          </svg>
          <div style={{ marginTop: u(5), borderRadius: u(5), padding: u(5), background: '#17181e' }}>
            <div style={{ fontSize: u(3.4), opacity: 0.6 }}>Pending transaction</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: u(2), fontSize: u(4), fontWeight: 600 }}>
              <span>Swap → USDC</span><span style={{ color: accent }}>Confirming</span>
            </div>
            <div style={{ marginTop: u(3), height: u(1.6), borderRadius: u(1), background: '#2a2b33' }}>
              <div style={{ width: '64%', height: '100%', borderRadius: u(1), background: accent }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: u(3), marginTop: u(4) }}>
            {['Stake', 'Bridge', 'Send', 'NFTs'].map((t) => (
              <div key={t} style={{ padding: u(4), borderRadius: u(4), background: '#17181e', fontSize: u(3.8), fontWeight: 600 }}>{t}</div>
            ))}
          </div>
        </div>
        <TabBar accent={accent} dark />
      </div>
    )
  }

  if (kind === 'lms') {
    return (
      <div style={{ ...base, background: '#fff' }}>
        <Status />
        <div style={{ padding: `${u(4)} ${u(6)}` }}>
          <div style={{ fontSize: u(3.6), color: '#8a8a90' }}>Continue learning</div>
          <div style={{ fontSize: u(7), fontWeight: 800, lineHeight: 1.1 }}>Data Analysis<br />Fundamentals</div>
          <div style={{ marginTop: u(4), borderRadius: u(5), padding: u(5), background: accent, color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: u(3.4) }}><span>Module 4 of 9</span><span>🔥 12 day streak</span></div>
            <div style={{ marginTop: u(3), height: u(1.8), borderRadius: u(1), background: 'rgba(255,255,255,.3)' }}><div style={{ width: '44%', height: '100%', borderRadius: u(1), background: '#fff' }} /></div>
            <div style={{ fontSize: u(4.2), fontWeight: 700, marginTop: u(3) }}>▶ Resume lesson</div>
          </div>
          <div style={{ fontSize: u(4), fontWeight: 700, margin: `${u(5)} 0 ${u(2)}` }}>Your courses</div>
          {['Business Analysis', 'Scrum Master', 'Cybersecurity'].map((c, i) => (
            <div key={c} style={{ display: 'flex', gap: u(3), alignItems: 'center', padding: `${u(2.5)} 0`, borderBottom: '1px solid #f0f0f2' }}>
              <div style={{ width: u(12), height: u(12), borderRadius: u(3), background: [accent + '22', '#3b5bfd22', '#16a34a22'][i] }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: u(3.8), fontWeight: 600 }}>{c}</div>
                <Bar w={`${70 - i * 18}%`} c={accent} h={1.4} />
              </div>
              <div style={{ fontSize: u(3.2), color: '#8a8a90' }}>{['70%', '52%', '34%'][i]}</div>
            </div>
          ))}
          <div style={{ marginTop: u(4), display: 'flex', gap: u(2) }}>
            {['🏆 1,240 XP', '⬇ Offline'].map((t) => (
              <div key={t} style={{ padding: `${u(2)} ${u(3.5)}`, borderRadius: u(4), background: '#f4f4f6', fontSize: u(3.3), fontWeight: 600 }}>{t}</div>
            ))}
          </div>
        </div>
        <TabBar accent={accent} />
      </div>
    )
  }

  if (kind === 'health') {
    return (
      <div style={{ ...base, background: '#f3f8fb' }}>
        <Status />
        <div style={{ padding: `${u(4)} ${u(6)}` }}>
          <div style={{ fontSize: u(6.5), fontWeight: 800 }}>Book a visit</div>
          <div style={{ display: 'flex', gap: u(2), marginTop: u(4) }}>
            {['Mon\n12', 'Tue\n13', 'Wed\n14', 'Thu\n15', 'Fri\n16'].map((d, i) => (
              <div key={d} style={{ flex: 1, whiteSpace: 'pre', textAlign: 'center', padding: `${u(2.5)} 0`, borderRadius: u(3.5), fontSize: u(3.3), fontWeight: 600, background: i === 2 ? accent : '#fff', color: i === 2 ? '#fff' : '#111' }}>{d}</div>
            ))}
          </div>
          <Card style={{ marginTop: u(5) }}>
            <div style={{ display: 'flex', gap: u(3), alignItems: 'center' }}>
              <div style={{ width: u(12), height: u(12), borderRadius: '50%', background: accent + '33', display: 'grid', placeItems: 'center', fontSize: u(5) }}>🩺</div>
              <div>
                <div style={{ fontSize: u(4), fontWeight: 700 }}>Dr. A. Bello</div>
                <div style={{ fontSize: u(3.2), color: '#8a8a90' }}>General practice</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: u(2), marginTop: u(4) }}>
              {['09:00', '10:30', '11:15', '13:00', '14:45', '16:00'].map((t, i) => (
                <div key={t} style={{ textAlign: 'center', padding: `${u(2)} 0`, borderRadius: u(3), fontSize: u(3.4), fontWeight: 600, border: `1px solid ${i === 1 ? accent : '#e5e7eb'}`, color: i === 1 ? accent : '#111' }}>{t}</div>
              ))}
            </div>
          </Card>
          <Card style={{ marginTop: u(4) }}>
            <div style={{ fontSize: u(3.4), color: '#8a8a90' }}>Records</div>
            <div style={{ fontSize: u(4), fontWeight: 700, marginTop: u(1) }}>🔒 3 lab results, encrypted</div>
          </Card>
          <div style={{ marginTop: u(5), textAlign: 'center', padding: u(4), borderRadius: u(5), background: accent, color: '#fff', fontSize: u(4.2), fontWeight: 700 }}>Confirm 10:30</div>
        </div>
      </div>
    )
  }

  if (kind === 'rides') {
    return (
      <div style={{ ...base, background: '#e9efe6' }}>
        <svg viewBox="0 0 100 120" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '68%' }}>
          <rect width="100" height="120" fill="#e3eadf" />
          {[15, 40, 70, 95].map((y) => <path key={y} d={`M-5 ${y} Q 50 ${y - 12} 105 ${y + 6}`} stroke="#fff" strokeWidth="3" fill="none" />)}
          {[20, 55, 82].map((x) => <path key={x} d={`M${x} -5 L ${x + 8} 125`} stroke="#fff" strokeWidth="2.4" fill="none" />)}
          <path d="M22 98 C 35 80, 48 70, 58 52 S 72 30, 80 20" stroke={accent} strokeWidth="2.2" fill="none" strokeDasharray="0" />
          <circle cx="22" cy="98" r="3" fill="#111" />
          <circle cx="80" cy="20" r="4" fill={accent} stroke="#fff" strokeWidth="1.5" />
        </svg>
        <div style={{ position: 'relative' }}><Status /></div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', borderRadius: `${u(7)} ${u(7)} 0 0`, padding: u(6) }}>
          <div style={{ width: u(10), height: u(1.2), borderRadius: u(1), background: '#ddd', margin: `0 auto ${u(4)}` }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: u(3.4), color: '#8a8a90' }}>Gas delivery · 12.5kg</div>
              <div style={{ fontSize: u(5.5), fontWeight: 800 }}>Arriving in 8 min</div>
            </div>
            <div style={{ fontSize: u(6) }}>🛵</div>
          </div>
          <div style={{ marginTop: u(4), padding: u(4), borderRadius: u(4), background: accent + '18', display: 'flex', justifyContent: 'space-between', fontSize: u(3.8), fontWeight: 600 }}>
            <span>Rewards earned</span><span style={{ color: accent }}>+25 RIDE</span>
          </div>
          <div style={{ marginTop: u(3), textAlign: 'center', padding: u(4), borderRadius: u(5), background: '#111', color: '#fff', fontSize: u(4), fontWeight: 700 }}>Track rider</div>
        </div>
      </div>
    )
  }

  if (kind === 'clinic') {
    return (
      <div style={{ ...base, background: '#f3f8fb' }}>
        <Status />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${u(3)} ${u(6)}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: u(2), fontSize: u(4), fontWeight: 800 }}>
            <span style={{ width: u(6), height: u(6), borderRadius: u(1.5), background: accent, color: '#fff', display: 'grid', placeItems: 'center', fontSize: u(4.5) }}>+</span>Premier
          </div>
          <div style={{ display: 'grid', gap: u(1) }}>{[0, 1, 2].map((i) => <div key={i} style={{ width: u(5), height: u(0.6), background: '#111' }} />)}</div>
        </div>
        <div style={{ margin: `${u(2)} ${u(5)}`, padding: u(6), borderRadius: u(5), background: `linear-gradient(150deg, ${accent}, #0b5f8a)`, color: '#fff' }}>
          <div style={{ fontSize: u(7), fontWeight: 800, lineHeight: 1.08 }}>Care that fits your schedule</div>
          <div style={{ fontSize: u(3.4), opacity: 0.85, marginTop: u(2) }}>Book a doctor in under a minute.</div>
          <div style={{ marginTop: u(4), display: 'inline-block', padding: `${u(2.5)} ${u(5)}`, borderRadius: u(5), background: '#fff', color: '#0b5f8a', fontSize: u(3.6), fontWeight: 700 }}>Book appointment</div>
        </div>
        <div style={{ padding: `${u(3)} ${u(5)}` }}>
          <div style={{ fontSize: u(4), fontWeight: 700, marginBottom: u(2) }}>Departments</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: u(2.5) }}>
            {['🩺 General', '❤️ Cardiology', '👶 Paediatrics', '🦷 Dental'].map((t) => (
              <div key={t} style={{ padding: u(3.5), borderRadius: u(3), background: '#fff', fontSize: u(3.4), fontWeight: 600 }}>{t}</div>
            ))}
          </div>
          <Card style={{ marginTop: u(3), padding: u(4) }}>
            <div style={{ fontSize: u(3.2), color: '#8a8a90' }}>Next appointment</div>
            <div style={{ fontSize: u(4), fontWeight: 700, marginTop: u(1) }}>Wed 14 · 10:30 · Dr. A. Bello</div>
          </Card>
        </div>
      </div>
    )
  }

  if (kind === 'site') {
    return (
      <div style={{ ...base, background: '#0c1526', color: '#fff' }}>
        <Status dark />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${u(3)} ${u(6)}` }}>
          <div style={{ fontSize: u(4), fontWeight: 800, letterSpacing: u(0.4) }}>WTC <span style={{ color: accent }}>ABUJA</span></div>
          <div style={{ display: 'grid', gap: u(1) }}>{[0, 1, 2].map((i) => <div key={i} style={{ width: u(5), height: u(0.6), background: '#fff' }} />)}</div>
        </div>
        <Towers accent={accent} height={u(70)} />
        <div style={{ padding: `${u(4)} ${u(6)}` }}>
          <div style={{ fontSize: u(3), color: accent, letterSpacing: u(0.5), fontWeight: 700 }}>CENTRAL BUSINESS DISTRICT</div>
          <div style={{ fontSize: u(7.5), fontWeight: 800, lineHeight: 1.05, marginTop: u(1.5) }}>Where global trade meets Abuja</div>
          <div style={{ marginTop: u(4), display: 'inline-block', padding: `${u(2.5)} ${u(5)}`, borderRadius: u(5), background: accent, color: '#0c1526', fontSize: u(3.6), fontWeight: 700 }}>Book a space</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: u(2.5), marginTop: u(5) }}>
            {['Trade services', 'Offices', 'Residences', 'Events'].map((t) => (
              <div key={t} style={{ padding: u(3.5), borderRadius: u(3), background: '#16223a', fontSize: u(3.4), fontWeight: 600 }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // community
  return (
    <div style={{ ...base, background: '#f6f5fb' }}>
      <Status />
      <div style={{ padding: `${u(3)} ${u(6)}` }}>
        <div style={{ fontSize: u(6.5), fontWeight: 800 }}>Communities</div>
        <div style={{ display: 'flex', gap: u(2.5), marginTop: u(4) }}>
          {[accent, '#f59e0b', '#22c55e', '#ef4444', '#0ea5e9'].map((c, i) => (
            <div key={c} style={{ width: u(13), height: u(13), borderRadius: '50%', background: c, border: `${u(0.8)} solid ${i === 0 ? '#111' : '#fff'}` }} />
          ))}
        </div>
        {[
          ['Squad night 🎮', 'Who is on tonight? Ranked at 9', '12'],
          ['Tournament hub', 'Bracket is live, check your slot', '4'],
          ['Clip of the week', '🔥 that last-second clutch', '28'],
        ].map(([t, m, n]) => (
          <Card key={t} style={{ marginTop: u(3.5), padding: u(4) }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: u(4), fontWeight: 700 }}>{t}</div>
              <div style={{ minWidth: u(6), height: u(6), padding: `0 ${u(1.5)}`, borderRadius: u(3), background: accent, color: '#fff', fontSize: u(3), fontWeight: 700, display: 'grid', placeItems: 'center' }}>{n}</div>
            </div>
            <div style={{ fontSize: u(3.4), color: '#6b6b72', marginTop: u(1) }}>{m}</div>
          </Card>
        ))}
        <div style={{ marginTop: u(4), display: 'flex', gap: u(2), alignItems: 'center', padding: u(3), borderRadius: u(6), background: '#fff' }}>
          <div style={{ flex: 1, fontSize: u(3.4), color: '#9a9aa0', paddingLeft: u(2) }}>Message the squad…</div>
          <div style={{ width: u(9), height: u(9), borderRadius: '50%', background: accent, color: '#fff', display: 'grid', placeItems: 'center', fontSize: u(4) }}>↑</div>
        </div>
      </div>
      <TabBar accent={accent} />
    </div>
  )
}

function Towers({ accent, height }: { accent: string; height: string }) {
  return (
    <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMax slice" style={{ display: 'block', width: '100%', height }}>
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1f3a66" />
          <stop offset="1" stopColor="#0c1526" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#sky)" />
      <circle cx="160" cy="28" r="10" fill={accent} opacity=".35" />
      <rect x="62" y="22" width="26" height="98" fill="#2a4675" />
      <rect x="96" y="10" width="30" height="110" fill="#33558c" />
      <rect x="134" y="40" width="22" height="80" fill="#244069" />
      <rect x="30" y="58" width="24" height="62" fill="#1d3558" />
      {Array.from({ length: 16 }, (_, i) => (
        <rect key={i} x={99 + (i % 4) * 6.5} y={16 + Math.floor(i / 4) * 12} width="3.5" height="7" fill={accent} opacity={(i * 7) % 3 === 0 ? 0.9 : 0.35} />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={`b${i}`} x={65 + (i % 3) * 7.5} y={30 + Math.floor(i / 3) * 14} width="4" height="8" fill="#fff" opacity={(i * 5) % 4 === 0 ? 0.6 : 0.15} />
      ))}
    </svg>
  )
}

/** Landscape stand-in for a website's home page. */
export function MockSite({ accent, variant = 'wtc' }: { accent: string; variant?: 'wtc' | 'clinic' }) {
  if (variant === 'clinic') return <ClinicSite accent={accent} />
  return (
    <div style={{ position: 'absolute', inset: 0, containerType: 'inline-size', background: '#0c1526', color: '#fff', fontFamily: 'var(--font-sans)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${u(2)} ${u(4)}` }}>
        <div style={{ fontSize: u(2.2), fontWeight: 800, letterSpacing: u(0.2) }}>WTC <span style={{ color: accent }}>ABUJA</span></div>
        <div style={{ display: 'flex', gap: u(2.5), fontSize: u(1.4), opacity: 0.8 }}>
          {['Trade services', 'Offices', 'Residences', 'Events', 'Contact'].map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: u(3), padding: `${u(3)} ${u(4)}` }}>
        <div>
          <div style={{ fontSize: u(1.3), color: accent, letterSpacing: u(0.25), fontWeight: 700 }}>CENTRAL BUSINESS DISTRICT</div>
          <div style={{ fontSize: u(4.4), fontWeight: 800, lineHeight: 1.05, marginTop: u(1) }}>Where global trade meets Abuja</div>
          <div style={{ fontSize: u(1.5), opacity: 0.7, marginTop: u(1.5), lineHeight: 1.4 }}>Grade A offices, luxury residences and trade services at the heart of the capital.</div>
          <div style={{ display: 'flex', gap: u(1.2), marginTop: u(2.5) }}>
            <div style={{ padding: `${u(1)} ${u(2.2)}`, borderRadius: u(2), background: accent, color: '#0c1526', fontSize: u(1.5), fontWeight: 700 }}>Book a space</div>
            <div style={{ padding: `${u(1)} ${u(2.2)}`, borderRadius: u(2), border: '1px solid rgba(255,255,255,.3)', fontSize: u(1.5), fontWeight: 600 }}>Take a tour</div>
          </div>
        </div>
        <div style={{ borderRadius: u(1.5), overflow: 'hidden' }}><Towers accent={accent} height={u(26)} /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: u(1.5), padding: `${u(1)} ${u(4)}` }}>
        {['Export Launchpad', 'Trade missions', 'Business lounge', 'Conference hall'].map((t) => (
          <div key={t} style={{ padding: u(1.8), borderRadius: u(1.2), background: '#16223a', fontSize: u(1.4), fontWeight: 600 }}>{t}</div>
        ))}
      </div>
    </div>
  )
}

function ClinicSite({ accent }: { accent: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, containerType: 'inline-size', background: '#f3f8fb', color: '#111', fontFamily: 'var(--font-sans)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${u(2)} ${u(4)}`, background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: u(1), fontSize: u(2.2), fontWeight: 800 }}>
          <span style={{ width: u(3), height: u(3), borderRadius: u(0.8), background: accent, color: '#fff', display: 'grid', placeItems: 'center', fontSize: u(2.2) }}>+</span>Premier Hospital
        </div>
        <div style={{ display: 'flex', gap: u(2.5), fontSize: u(1.4), color: '#555', alignItems: 'center' }}>
          {['Services', 'Doctors', 'Patients', 'Contact'].map((t) => <span key={t}>{t}</span>)}
          <span style={{ padding: `${u(0.8)} ${u(1.8)}`, borderRadius: u(2), background: accent, color: '#fff', fontWeight: 700 }}>Book now</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: u(3), alignItems: 'center', padding: `${u(3.5)} ${u(4)}` }}>
        <div>
          <div style={{ fontSize: u(4.2), fontWeight: 800, lineHeight: 1.05 }}>Care that fits your schedule</div>
          <div style={{ fontSize: u(1.5), color: '#555', marginTop: u(1.2), lineHeight: 1.4 }}>Book a doctor online, see available times instantly and keep your records in one secure place.</div>
          <div style={{ display: 'flex', gap: u(1.2), marginTop: u(2.2) }}>
            <span style={{ padding: `${u(1)} ${u(2.2)}`, borderRadius: u(2), background: accent, color: '#fff', fontSize: u(1.5), fontWeight: 700 }}>Book appointment</span>
            <span style={{ padding: `${u(1)} ${u(2.2)}`, borderRadius: u(2), border: '1px solid #cfd8de', fontSize: u(1.5), fontWeight: 600 }}>Patient portal</span>
          </div>
        </div>
        <div style={{ padding: u(2), borderRadius: u(1.5), background: '#fff', boxShadow: '0 6px 20px rgba(0,0,0,.06)' }}>
          <div style={{ fontSize: u(1.4), color: '#8a8a90' }}>Choose a time · Wed 14</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: u(0.8), marginTop: u(1.2) }}>
            {['09:00', '10:30', '11:15', '13:00', '14:45', '16:00'].map((t, i) => (
              <span key={t} style={{ textAlign: 'center', padding: `${u(0.8)} 0`, borderRadius: u(0.8), fontSize: u(1.4), fontWeight: 600, border: `1px solid ${i === 1 ? accent : '#e5e7eb'}`, color: i === 1 ? accent : '#111' }}>{t}</span>
            ))}
          </div>
          <div style={{ marginTop: u(1.4), textAlign: 'center', padding: `${u(0.9)} 0`, borderRadius: u(1), background: accent, color: '#fff', fontSize: u(1.4), fontWeight: 700 }}>Confirm 10:30</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: u(1.5), padding: `0 ${u(4)}` }}>
        {['🩺 General practice', '❤️ Cardiology', '👶 Paediatrics', '🦷 Dental care'].map((t) => (
          <div key={t} style={{ padding: u(1.8), borderRadius: u(1.2), background: '#fff', fontSize: u(1.4), fontWeight: 600 }}>{t}</div>
        ))}
      </div>
    </div>
  )
}
