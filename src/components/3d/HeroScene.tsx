'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Morphing crystalline Core with wireframe and glass reflections
function CoreGeometry({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const midRingRef = useRef<THREE.Group>(null);

  // Wireframe geometry
  const wireframeGeo = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.6, 2);
    return new THREE.WireframeGeometry(geo);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const mx = mouse.current?.x || 0;
    const my = mouse.current?.y || 0;

    // Smooth rotation with mouse influence
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, t * 0.2 + my * 0.5, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, t * 0.25 + mx * 0.5, 0.05);
      meshRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.03);
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = THREE.MathUtils.lerp(wireframeRef.current.rotation.x, -t * 0.15 + my * 0.4, 0.05);
      wireframeRef.current.rotation.y = THREE.MathUtils.lerp(wireframeRef.current.rotation.y, t * 0.2 + mx * 0.4, 0.05);
      wireframeRef.current.scale.setScalar(1.08 + Math.cos(t * 1.2) * 0.02);
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.4;
      innerRef.current.rotation.z = -t * 0.3;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.2 + my * 0.3;
      outerRingRef.current.rotation.y = t * 0.35 + mx * 0.4;
    }

    if (midRingRef.current) {
      midRingRef.current.rotation.x = -Math.PI / 4 + Math.cos(t * 0.4) * 0.2 - my * 0.2;
      midRingRef.current.rotation.z = -t * 0.25 - mx * 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Gyro Ring */}
      <group ref={outerRingRef}>
        <mesh>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>

      {/* Mid Gyro Ring */}
      <group ref={midRingRef}>
        <mesh>
          <torusGeometry args={[2.1, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>

      {/* Main Solid Faceted Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#161616"
          roughness={0.15}
          metalness={0.85}
          wireframe={false}
          flatShading={true}
        />
      </mesh>

      {/* Floating Wireframe Shell */}
      <lineSegments ref={wireframeRef} geometry={wireframeGeo}>
        <lineBasicMaterial color="#FFFFFF" transparent opacity={0.35} />
      </lineSegments>

      {/* Inner Glowing Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color="#FFFFFF" wireframe={true} />
      </mesh>
    </group>
  );
}

// Cinematic Ambient Orbiting Points
function OrbitingParticles({ count = 350 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 2.0 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      sc[i] = Math.random() * 0.04 + 0.01;
    }
    return [pos, sc];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#FAFAFA"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene() {
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouse.current = { x, y };
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
    >
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1.8} color="#FFFFFF" />
        <directionalLight position={[-10, -5, -5]} intensity={0.6} color="#888888" />
        <pointLight position={[0, 0, 0]} intensity={2.0} color="#FFFFFF" distance={4} />

        <CoreGeometry mouse={mouse} />
        <OrbitingParticles count={300} />
      </Canvas>
    </div>
  );
}
