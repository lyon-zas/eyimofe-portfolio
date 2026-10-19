import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Float, Line, RoundedBox, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useIsDark } from '../theme'

const W = 1.1
const SCREEN_INSET = 0.05
// Screens are 1179x2556 (iPhone 15); size the body so they fit exactly.
const SCREEN_RATIO = 1179 / 2556
const H = (W - SCREEN_INSET * 2) / SCREEN_RATIO + SCREEN_INSET * 2

function roundedRectGeometry(w: number, h: number, r: number) {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.quadraticCurveTo(x + w, y, x + w, y + r)
  s.lineTo(x + w, y + h - r)
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  s.lineTo(x + r, y + h)
  s.quadraticCurveTo(x, y + h, x, y + h - r)
  s.lineTo(x, y + r)
  s.quadraticCurveTo(x, y, x + r, y)
  const g = new THREE.ShapeGeometry(s, 12)
  // ShapeGeometry UVs are raw positions; normalise them to 0..1.
  const uv = g.attributes.uv as THREE.BufferAttribute
  const pos = g.attributes.position as THREE.BufferAttribute
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) - x) / w, (pos.getY(i) - y) / h)
  return g
}

function Phone({ src, position, rotation, speed = 1 }: { src: string; position: [number, number, number]; rotation: [number, number, number]; speed?: number }) {
  const tex = useTexture(src)
  const sw = W - SCREEN_INSET * 2
  const sh = H - SCREEN_INSET * 2
  const geo = useMemo(() => roundedRectGeometry(sw, sh, 0.13), [sw, sh])
  const island = useMemo(() => roundedRectGeometry(0.28, 0.075, 0.0375), [])
  // Silver body in dark theme so the phones stand out from the page.
  const dark = useIsDark()
  const maxAniso = useThree((st) => st.gl.capabilities.getMaxAnisotropy())

  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = maxAniso
    tex.minFilter = THREE.LinearMipmapLinearFilter
    const img = tex.image as { width: number; height: number }
    const ia = img.width / img.height
    const a = sw / sh
    // object-fit: cover, anchored to the top of the screenshot
    if (ia > a) {
      tex.repeat.set(a / ia, 1)
      tex.offset.set((1 - a / ia) / 2, 0)
    } else {
      tex.repeat.set(1, ia / a)
      tex.offset.set(0, 1 - ia / a)
    }
    tex.needsUpdate = true
  }, [tex, sw, sh, maxAniso])

  return (
    <Float speed={speed} rotationIntensity={0.25} floatIntensity={0.6}>
      <group position={position} rotation={rotation}>
        <RoundedBox args={[W, H, 0.11]} radius={0.16} smoothness={6}>
          <meshStandardMaterial color={dark ? '#d8d5ce' : '#16161a'} metalness={dark ? 0.35 : 0.6} roughness={dark ? 0.35 : 0.28} />
        </RoundedBox>
        <mesh geometry={geo} position={[0, 0, 0.0565]}>
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
        <mesh geometry={island} position={[0, H / 2 - SCREEN_INSET - 0.066, 0.058]}>
          <meshBasicMaterial color="#050506" />
        </mesh>
      </group>
    </Float>
  )
}

// A small "agent graph" orbiting the phones: the AI half of the story.
function AgentGraph() {
  const group = useRef<THREE.Group>(null)
  const ink = useIsDark() ? '#f1eee6' : '#121212'
  const nodes = useMemo<[number, number, number][]>(() => [
    [-2.3, 1.3, -0.6], [-1.6, 2.0, 0.4], [2.2, 1.6, -0.2], [2.6, 0.2, 0.5], [1.9, -1.5, 0.2], [-2.5, -1.2, 0.3], [0, 2.5, -1.2],
  ], [])
  const edges: [number, number][] = [[0, 1], [1, 6], [6, 2], [2, 3], [3, 4], [0, 5], [1, 2]]
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.25
  })
  return (
    <group ref={group}>
      {edges.map(([a, b], i) => (
        <Line key={i} points={[nodes[a], nodes[b]]} color={ink} lineWidth={1} transparent opacity={0.3} dashed dashSize={0.08} gapSize={0.06} />
      ))}
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[i % 3 === 0 ? 0.11 : 0.07, 24, 24]} />
          <meshStandardMaterial color={i % 3 === 0 ? '#d4ff3a' : ink} roughness={0.4} emissive={i % 3 === 0 ? '#9fcc00' : '#000'} emissiveIntensity={0.25} />
        </mesh>
      ))}
    </group>
  )
}

function Rig() {
  useFrame((state) => {
    const { camera, pointer } = state
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.8, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.2 + pointer.y * 0.5, 0.05)
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0.2, 7.2], fov: 38 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} />
      <directionalLight position={[-4, -2, 2]} intensity={0.6} color="#d4ff3a" />
      <pointLight position={[0, 0, 3]} intensity={6} color="#ffffff" />
      <Phone src="apps/kulawise/screens/chat.jpg" position={[-1.35, -0.1, -0.6]} rotation={[0.06, 0.38, 0.05]} speed={1.2} />
      <Phone src="apps/kulawise/screens/topicsA.jpg" position={[1.35, -0.05, -0.6]} rotation={[0.06, -0.38, -0.05]} speed={1.1} />
      <Phone src="apps/kulawise/screens/home.jpg" position={[0, 0.1, 0.4]} rotation={[0.04, -0.12, 0]} speed={1.4} />
      <AgentGraph />
      <ContactShadows position={[0, -1.9, 0]} opacity={0.35} scale={9} blur={2.6} far={3} />
      <Rig />
    </Canvas>
  )
}
