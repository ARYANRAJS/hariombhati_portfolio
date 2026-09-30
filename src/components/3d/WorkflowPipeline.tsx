'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Line, Float } from '@react-three/drei';
import * as THREE from 'three';

const stages = [
  { name: 'Meta Ads', color: '#06B6D4', position: [-4.5, 0, 0] },
  { name: 'Tracking', color: '#3B82F6', position: [-1.5, 0, 0] },
  { name: 'Analytics', color: '#A855F7', position: [1.5, 0, 0] },
  { name: 'Revenue', color: '#10B981', position: [4.5, 0, 0] },
];

function Pipeline() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }

    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      const count = 15;
      for (let i = 0; i < count; i++) {
        const startX = -4.5;
        const endX = 4.5;
        const dist = endX - startX;
        
        const t = ((time * 0.5 + i / count) % 1);
        const x = startX + t * dist;
        const y = Math.sin(x * 2 + time * 2) * 0.2;
        
        dummy.position.set(x, y, 0);
        dummy.scale.setScalar(Math.sin(t * Math.PI)); 
        dummy.updateMatrix();
        particlesRef.current.setMatrixAt(i, dummy.matrix);
      }
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {stages.map((stage, i) => (
        <Float key={stage.name} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <group position={new THREE.Vector3(...stage.position as [number, number, number])}>
            <mesh>
              <boxGeometry args={[2, 1, 1]} />
              <meshStandardMaterial 
                color={stage.color} 
                transparent 
                opacity={0.8}
                emissive={stage.color}
                emissiveIntensity={0.2}
              />
            </mesh>
            <Text
              position={[0, 0, 0.6]}
              fontSize={0.25}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {stage.name}
            </Text>
          </group>
        </Float>
      ))}

      <Line
        points={[[-4.5, 0, -0.5], [4.5, 0, -0.5]]}
        color="#ffffff"
        opacity={0.2}
        transparent
        lineWidth={2}
      />

      <instancedMesh ref={particlesRef} args={[undefined, undefined, 15]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </instancedMesh>

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </group>
  );
}

export default function WorkflowPipeline({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
        <Pipeline />
      </Canvas>
    </div>
  );
}
