// Small line illustrations for the AI work cards.
export function Glyph({ kind, dark }: { kind: string; dark?: boolean }) {
  const ink = dark ? '#f3f0e8' : 'var(--color-ink)'
  const card = dark ? '#121212' : 'var(--color-card)'
  const lime = '#d4ff3a'
  const cobalt = '#3b5bfd'
  const common = { width: 150, height: 70, viewBox: '0 0 150 70', fill: 'none', stroke: ink, strokeWidth: 1.5, strokeLinecap: 'round' as const }

  switch (kind) {
    case 'agents':
      return (
        <svg {...common}>
          <path d="M40 35 L75 15 L110 35 L75 55 Z M75 15 L75 55 M40 35 L110 35" strokeDasharray="3 4" opacity=".6" />
          {[[40, 35], [75, 15], [110, 35], [75, 55]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 0 ? 8 : 6} fill={i === 0 ? lime : card} />
          ))}
          <circle cx="75" cy="35" r="3" fill={cobalt} stroke="none">
            <animateMotion dur="3s" repeatCount="indefinite" path="M-35 0 L0 -20 L35 0 L0 20 Z" />
          </circle>
        </svg>
      )
    case 'chat':
      return (
        <svg {...common}>
          <rect x="22" y="12" width="64" height="22" rx="11" />
          <rect x="64" y="38" width="64" height="22" rx="11" fill={lime} stroke={ink} />
          {[36, 46, 56].map((x, i) => (
            <circle key={x} cx={x} cy="23" r="2.4" fill={ink} stroke="none">
              <animate attributeName="opacity" values=".2;1;.2" dur="1.2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <path d="M76 49 h40" stroke="#121212" />
        </svg>
      )
    case 'flow':
      return (
        <svg {...common}>
          <rect x="10" y="25" width="26" height="20" rx="6" />
          <rect x="62" y="10" width="26" height="20" rx="6" fill={lime} stroke={ink} />
          <rect x="62" y="40" width="26" height="20" rx="6" />
          <rect x="114" y="25" width="26" height="20" rx="6" fill={cobalt} stroke={cobalt} />
          <path d="M36 35 C 50 35, 48 20, 62 20 M36 35 C 50 35, 48 50, 62 50 M88 20 C 102 20, 100 35, 114 35 M88 50 C 102 50, 100 35, 114 35" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1s" repeatCount="indefinite" />
          </path>
        </svg>
      )
    case 'pulse':
      return (
        <svg {...common}>
          <path d="M5 40 H40 L50 18 L62 58 L72 30 L80 40 H100" />
          <path d="M100 40 H145" strokeDasharray="3 5" opacity=".5" />
          <circle cx="122" cy="40" r="9" fill={lime} stroke={ink} />
          <path d="M122 35 v6 M122 44 v.5" strokeWidth="2" stroke="#121212" />
        </svg>
      )
    case 'vision':
      return (
        <svg {...common}>
          {[30, 62, 94, 126].map((x, i) => (
            <g key={x}>
              <path d={`M${x - 7} 14 h14 v6 l3 6 v32 a3 3 0 0 1 -3 3 h-14 a3 3 0 0 1 -3 -3 v-32 l3 -6 z`} />
              <rect x={x - 9} y={58 - (i + 1) * 8} width="18" height={(i + 1) * 8} rx="2" fill={i === 2 ? lime : cobalt} stroke="none" opacity={i === 2 ? 1 : 0.35} />
            </g>
          ))}
          <rect x="82" y="8" width="24" height="56" rx="4" stroke={cobalt} strokeDasharray="3 3" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <path d="M45 50 a14 14 0 0 1 2 -28 a20 20 0 0 1 38 -4 a15 15 0 0 1 18 32 z" fill={lime} stroke={ink} />
          <path d="M20 62 h110" strokeDasharray="3 4" opacity=".5" />
          {[30, 75, 120].map((x) => <circle key={x} cx={x} cy="62" r="4" fill={card} />)}
        </svg>
      )
  }
}
