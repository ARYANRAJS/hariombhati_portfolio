'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Network() {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    return [
      [-2, 1, 0], [2, 1.5, -1], [1, -1.5, 1], [-1.5, -1, -0.5], [0, 0, 2]
    ] as [number, number, number][];
  }, []);

  const lines = useMemo(() => {
    return [
      [nodes[0], nodes[1]],
      [nodes[1], nodes[2]],
      [nodes[2], nodes[3]],
      [nodes[3], nodes[0]],
      [nodes[0], nodes[4]],
      [nodes[2], nodes[4]]
    ];
  }, [nodes]);

  const packetsRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    if (packetsRef.current) {
      const time = state.clock.elapsedTime;
      lines.forEach((line, i) => {
        const start = new THREE.Vector3(...line[0]);
        const end = new THREE.Vector3(...line[1]);
        const t = (time * 0.5 + i * 0.2) % 1;
        const pos = start.lerp(end, t);
        dummy.position.copy(pos);
        dummy.updateMatrix();
        packetsRef.current!.setMatrixAt(i, dummy.matrix);
      });
      packetsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <Sphere key={`node-${i}`} position={pos} args={[0.15, 16, 16]}>
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={1} />
        </Sphere>
      ))}
      
      {lines.map((line, i) => (
        <Line key={`line-${i}`} points={line} color="#ffffff" opacity={0.2} transparent lineWidth={1} />
      ))}

      <instancedMesh ref={packetsRef} args={[undefined, undefined, lines.length]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#10B981" />
      </instancedMesh>
      
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={0.5} />
    </group>
  );
}

export default function DataFlowScene({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 60 }}>
        <Network />
      </Canvas>
    </div>
  );
}
