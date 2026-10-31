"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
const NODES = [
  { position: [-1.75, 0.82, 0.05], color: "#66c4be" },
  { position: [1.75, 0.82, -0.02], color: "#ef7e43" },
  { position: [-1.75, -0.78, 0], color: "#73ba8f" },
  { position: [1.75, -0.78, 0.05], color: "#d7f36c" },
];
const PARTICLES = Array.from({ length: 45 }, (_, index) => {
  const angle = index * 2.39996;
  const radius = 1.35 + (index % 5) * 0.16;
  return [
    Math.cos(angle) * radius,
    Math.sin(angle * 1.31) * 1.15,
    ((index % 7) - 3) * 0.12,
  ];
});
function Connection({ points, color, opacity }) {
  const positions = new Float32Array(points.flat());
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  );
}
function ParticleField() {
  const positions = new Float32Array(PARTICLES.flat());
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLES.length}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#d7f36c"
        size={0.025}
        transparent
        opacity={0.56}
        sizeAttenuation
      />
    </points>
  );
}
function FlowScene() {
  const group = useRef();
  const core = useRef();
  const rings = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!group.current) return;
    group.current.rotation.y = Math.sin(time * 0.28) * 0.18;
    group.current.rotation.x = Math.cos(time * 0.2) * 0.045;
    group.current.position.y = Math.sin(time * 0.55) * 0.045;
    if (core.current)
      core.current.scale.setScalar(1 + Math.sin(time * 2.3) * 0.07);
    if (rings.current) rings.current.rotation.z = time * 0.28;
  });
  return (
    <group ref={group}>
      <Connection
        points={[NODES[0].position, [0, 0, 0], NODES[1].position]}
        color="#66c4be"
        opacity={0.54}
      />
      <Connection
        points={[NODES[2].position, [0, 0, 0], NODES[3].position]}
        color="#66c4be"
        opacity={0.45}
      />
      <Connection
        points={[NODES[0].position, [0, 0, 0], NODES[2].position]}
        color="#d7f36c"
        opacity={0.2}
      />
      <Connection
        points={[NODES[1].position, [0, 0, 0], NODES[3].position]}
        color="#ef7e43"
        opacity={0.2}
      />
      <group ref={core}>
        <mesh>
          <icosahedronGeometry args={[0.48, 2]} />
          <meshStandardMaterial
            color="#d7f36c"
            emissive="#657f1d"
            emissiveIntensity={0.58}
            metalness={0.72}
            roughness={0.2}
          />
        </mesh>
      </group>
      <group ref={rings}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.72, 0.018, 8, 64]} />
          <meshBasicMaterial color="#d7f36c" transparent opacity={0.65} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, Math.PI / 5]}>
          <torusGeometry args={[0.62, 0.012, 8, 64]} />
          <meshBasicMaterial color="#66c4be" transparent opacity={0.55} />
        </mesh>
      </group>
      {NODES.map((node) => (
        <mesh key={node.color} position={node.position}>
          <sphereGeometry args={[0.16, 20, 20]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.55}
            metalness={0.55}
            roughness={0.25}
          />
        </mesh>
      ))}
      <ParticleField />
    </group>
  );
}
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.7], fov: 46 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      frameloop="always"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 4]} intensity={1.8} color="#e9fff0" />
      <pointLight
        position={[-3, -1, 2]}
        intensity={3.4}
        distance={7}
        color="#56aaa6"
      />
      <pointLight
        position={[3, 1, 1]}
        intensity={2.8}
        distance={6}
        color="#f08b54"
      />
      <FlowScene />
    </Canvas>
  );
}