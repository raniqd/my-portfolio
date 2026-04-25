'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Data ──────────────────────────────────────────────────────────────────
const NODES = [
  { id: 'frontend', label: 'Frontend', pos: [-2.8,  1.2, 0] as [number,number,number], color: '#8b5cf6' },
  { id: 'api',      label: 'API',      pos: [ 0.0,  0.0, 0] as [number,number,number], color: '#06b6d4' },
  { id: 'db',       label: 'Database', pos: [ 2.8,  1.2, 0] as [number,number,number], color: '#10b981' },
  { id: 'cache',    label: 'Cache',    pos: [ 2.8, -1.2, 0] as [number,number,number], color: '#f59e0b' },
  { id: 'auth',     label: 'Auth',     pos: [-2.8, -1.2, 0] as [number,number,number], color: '#ef4444' },
  { id: 'cdn',      label: 'CDN',      pos: [ 0.0,  2.5, 0] as [number,number,number], color: '#ec4899' },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [1, 3], [1, 4], [0, 5], [5, 1], [2, 3],
];

// ─── Single glowing node ────────────────────────────────────────────────────
function Node({
  node,
  mousePos,
}: {
  node: (typeof NODES)[0];
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const coreRef   = useRef<THREE.Mesh>(null);
  const glowRef   = useRef<THREE.Mesh>(null);
  const baseX = node.pos[0];
  const baseY = node.pos[1];
  const baseZ = node.pos[2];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const floatY = Math.sin(t * 0.8 + baseX) * 0.12;

    if (coreRef.current) {
      coreRef.current.position.set(
        baseX + mousePos.current.x * 0.10,
        baseY + floatY,
        baseZ + mousePos.current.y * 0.06,
      );
    }
    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 2 + baseX) * 0.08;
      glowRef.current.position.set(baseX + mousePos.current.x * 0.05, baseY + floatY, baseZ);
      glowRef.current.scale.setScalar(pulse * 2.2);
    }
  });

  const color = useMemo(() => new THREE.Color(node.color), [node.color]);

  return (
    <group>
      {/* Glow halo */}
      <mesh ref={glowRef} position={node.pos}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>

      {/* Core sphere */}
      <mesh ref={coreRef} position={node.pos}>
        <sphereGeometry args={[0.13, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
}

// ─── Edge between two nodes ─────────────────────────────────────────────────
function Edge({ a, b }: { a: (typeof NODES)[0]; b: (typeof NODES)[0] }) {
  const ref = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...a.pos),
      new THREE.Vector3(...b.pos),
    ]);
    return geo;
  }, [a.pos, b.pos]);

  const material = useMemo(() =>
    new THREE.LineBasicMaterial({
      color: new THREE.Color(a.color),
      transparent: true,
      opacity: 0.28,
    }),
  [a.color]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      (ref.current.material as THREE.LineBasicMaterial).opacity =
        0.18 + Math.sin(t * 1.2 + a.pos[0]) * 0.10;
    }
  });

  return <lineSegments ref={ref} geometry={geometry} material={material} />;
}

// ─── Particle field (replaces drei <Stars>) ──────────────────────────────────
function Particles({ count = 400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#10b981'),
      new THREE.Color('#ffffff'),
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);

  const mat = useMemo(() =>
    new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.6 }),
  []);

  return <points ref={ref} geometry={geo} material={mat} />;
}

// ─── Scene ───────────────────────────────────────────────────────────────────
function Scene({
  mousePos,
  mouseTarget,
}: {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
  mouseTarget: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Lerp current toward target
    mousePos.current.x += (mouseTarget.current.x - mousePos.current.x) * 0.05;
    mousePos.current.y += (mouseTarget.current.y - mousePos.current.y) * 0.05;

    groupRef.current.rotation.y = mousePos.current.x * 0.20 + t * 0.04;
    groupRef.current.rotation.x = -mousePos.current.y * 0.12;
  });

  return (
    <group ref={groupRef}>
      {/* Edges */}
      {EDGES.map(([ai, bi]) => (
        <Edge key={`${ai}-${bi}`} a={NODES[ai]} b={NODES[bi]} />
      ))}

      {/* Nodes */}
      {NODES.map((node) => (
        <Node key={node.id} node={node} mousePos={mousePos} />
      ))}

      {/* Particle field */}
      <Particles count={350} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 5, 5]}   intensity={2} color="#8b5cf6" />
      <pointLight position={[-5, -3, 2]} intensity={1} color="#06b6d4" />
      <pointLight position={[5, -3, 2]}  intensity={1} color="#10b981" />
    </group>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────
export default function ArchitectureGraph() {
  const mousePos   = useRef({ x: 0, y: 0 });
  const mouseTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current = {
        x:  (e.clientX / window.innerWidth  - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    const onLeave = () => { mouseTarget.current = { x: 0, y: 0 }; };

    window.addEventListener('mousemove', onMove,  { passive: true });
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        frameloop="always"
      >
        <Scene mousePos={mousePos} mouseTarget={mouseTarget} />
      </Canvas>
    </div>
  );
}
