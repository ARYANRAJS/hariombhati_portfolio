'use client';
import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function SphereScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.5, 0.1);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, mouse.x * -0.5, 0.1);
    }
  });

  const nodes = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 2.5;
    return (
      <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle * 2) * 1, Math.sin(angle) * radius]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2} />
      </mesh>
    );
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Icosahedron args={[1.5, 3]}>
          <MeshDistortMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={0.5}
            wireframe
            distort={0.3}
            speed={2}
          />
        </Icosahedron>
        {nodes}
      </Float>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </group>
  );
}

export default function HeroSphere({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
        <SphereScene />
      </Canvas>
    </div>
  );
}
