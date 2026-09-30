'use client';

import React, { useRef, useMemo, useEffect } from 'react';
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
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, t * 0.15 + my * 0.35, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, t * 0.2 + mx * 0.35, 0.05);
      meshRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.02);
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = THREE.MathUtils.lerp(wireframeRef.current.rotation.x, -t * 0.12 + my * 0.3, 0.05);
      wireframeRef.current.rotation.y = THREE.MathUtils.lerp(wireframeRef.current.rotation.y, t * 0.18 + mx * 0.3, 0.05);
      wireframeRef.current.scale.setScalar(1.06 + Math.cos(t * 1.2) * 0.02);
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.3;
      innerRef.current.rotation.z = -t * 0.25;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.4) * 0.15 + my * 0.2;
      outerRingRef.current.rotation.y = t * 0.25 + mx * 0.3;
    }

    if (midRingRef.current) {
      midRingRef.current.rotation.x = -Math.PI / 4 + Math.cos(t * 0.35) * 0.15 - my * 0.15;
      midRingRef.current.rotation.z = -t * 0.2 - mx * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Gyro Ring */}
      <group ref={outerRingRef}>
        <mesh>
          <torusGeometry args={[2.5, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>

      {/* Mid Gyro Ring */}
      <group ref={midRingRef}>
        <mesh>
          <torusGeometry args={[2.1, 0.012, 16, 100]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.25}
          />
        </mesh>
      </group>

      {/* Main Solid Faceted Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color="#121212"
          roughness={0.2}
          metalness={0.85}
          wireframe={false}
          flatShading={true}
        />
      </mesh>

      {/* Floating Wireframe Shell */}
      <lineSegments ref={wireframeRef} geometry={wireframeGeo}>
        <lineBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
      </lineSegments>

      {/* Inner Glowing Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.65, 0]} />
        <meshBasicMaterial color="#FFFFFF" wireframe={true} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Cinematic Ambient Orbiting Points
function OrbitingParticles({ count = 250 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.0 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return [pos];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.015;
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
        size={0.03}
        color="#FAFAFA"
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene() {
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      mouse.current = { x, y };
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="w-full h-full relative pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[-10, -5, -5]} intensity={0.5} color="#888888" />
        <pointLight position={[0, 0, 0]} intensity={1.5} color="#FFFFFF" distance={4} />

        <CoreGeometry mouse={mouse} />
        <OrbitingParticles count={220} />
      </Canvas>
    </div>
  );
}
