'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import * as THREE from 'three';

interface StageData {
  id: number;
  name: string;
  sub: string;
  metric: string;
  color: string;
  emissive: string;
  position: [number, number, number];
}

const STAGES: StageData[] = [
  {
    id: 0,
    name: 'Paid Influx',
    sub: 'Meta & Google CBO',
    metric: '24k Clicks',
    color: '#06B6D4',
    emissive: '#0891B2',
    position: [-5.1, 0.2, 0],
  },
  {
    id: 1,
    name: 'CAPI Tracking',
    sub: 'Server-Side GTM',
    metric: '98.4% Match',
    color: '#3B82F6',
    emissive: '#2563EB',
    position: [-1.7, -0.2, 0.4],
  },
  {
    id: 2,
    name: 'Optimization',
    sub: 'CRO & Bid Caps',
    metric: '-$90 CPA',
    color: '#A855F7',
    emissive: '#7E22CE',
    position: [1.7, 0.2, -0.2],
  },
  {
    id: 3,
    name: 'Scaled Revenue',
    sub: 'ROAS & WhatsApp LTV',
    metric: '7.25x ROAS',
    color: '#10B981',
    emissive: '#059669',
    position: [5.1, -0.1, 0],
  },
];

// Interactive 3D Node with geometry and rotating gyro rings
function NodeObject({
  stage,
  isActive,
  onHover,
  onClick,
}: {
  stage: StageData;
  isActive: boolean;
  onHover: (id: number | null) => void;
  onClick: (id: number) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (hovered || isActive ? 1.5 : 0.6);
      meshRef.current.rotation.y += delta * (hovered || isActive ? 2.0 : 0.8);
      
      const targetScale = hovered || isActive ? 1.3 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (hovered ? 2.5 : 1.0);
      ringRef.current.rotation.x += delta * 0.5;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y += delta * (hovered ? -2.0 : -0.7);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group position={stage.position}>
        {/* Core 3D Interactive Shape */}
        <mesh
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            onHover(stage.id);
            if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            onHover(null);
            if (typeof document !== 'undefined') document.body.style.cursor = 'auto';
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick(stage.id);
          }}
        >
          {stage.id === 0 && <octahedronGeometry args={[0.9, 0]} />}
          {stage.id === 1 && <boxGeometry args={[1.1, 1.1, 1.1]} />}
          {stage.id === 2 && <dodecahedronGeometry args={[0.9, 0]} />}
          {stage.id === 3 && <icosahedronGeometry args={[0.95, 1]} />}

          <meshStandardMaterial
            color={stage.color}
            emissive={stage.emissive}
            emissiveIntensity={hovered || isActive ? 1.4 : 0.6}
            roughness={0.2}
            metalness={0.8}
            wireframe={stage.id === 3 ? false : hovered || isActive ? false : true}
          />
        </mesh>

        {/* Orbiting Gyro Ring 1 */}
        <mesh ref={ringRef}>
          <ringGeometry args={[1.35, 1.42, 32]} />
          <meshBasicMaterial
            color={stage.color}
            side={THREE.DoubleSide}
            transparent
            opacity={hovered || isActive ? 0.8 : 0.3}
          />
        </mesh>

        {/* Orbiting Gyro Ring 2 */}
        <mesh ref={ringRef2} rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[1.5, 1.55, 32]} />
          <meshBasicMaterial
            color="#ffffff"
            side={THREE.DoubleSide}
            transparent
            opacity={hovered || isActive ? 0.6 : 0.15}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Data Particles flowing along the curved bezier pipeline
function DataStreamCurve() {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const count = 36;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Create curved path through the 4 stages
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5.1, 0.2, 0),
      new THREE.Vector3(-3.4, 0.5, 0.2),
      new THREE.Vector3(-1.7, -0.2, 0.4),
      new THREE.Vector3(0, 0.3, 0),
      new THREE.Vector3(1.7, 0.2, -0.2),
      new THREE.Vector3(3.4, -0.4, 0.1),
      new THREE.Vector3(5.1, -0.1, 0),
    ]);
  }, []);

  const curvePoints = useMemo(() => {
    return curve.getPoints(70).map(p => [p.x, p.y, p.z] as [number, number, number]);
  }, [curve]);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const time = state.clock.elapsedTime * 0.35;

    for (let i = 0; i < count; i++) {
      const t = (time + i / count) % 1;
      const point = curve.getPoint(t);

      dummy.position.copy(point);
      // Pulsing particle scale
      const s = 0.08 + Math.sin(t * Math.PI) * 0.07;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();

      particlesRef.current.setMatrixAt(i, dummy.matrix);
    }
    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* Visual Conduit Path */}
      <Line
        points={curvePoints}
        color="#38bdf8"
        lineWidth={1.5}
        transparent
        opacity={0.35}
      />
      {/* Secondary glowing conduit */}
      <Line
        points={curvePoints}
        color="#34d399"
        lineWidth={0.8}
        transparent
        opacity={0.2}
      />

      {/* Instanced Glowing Particles Traveling Along Stream */}
      <instancedMesh ref={particlesRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#67e8f9" />
      </instancedMesh>
    </group>
  );
}

// Main 3D Canvas Scene
function Scene({
  activeStage,
  onSelectStage,
}: {
  activeStage: number;
  onSelectStage: (id: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth interactive camera parallax with mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.25,
        delta * 3
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.2,
        delta * 3
      );
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-6, 2, 4]} intensity={2.0} color="#06B6D4" />
      <pointLight position={[6, -2, 4]} intensity={2.0} color="#10B981" />

      {/* Flowing Laser Data Conduits */}
      <DataStreamCurve />

      {/* 4 Interactive 3D Nodes */}
      {STAGES.map((stage) => (
        <NodeObject
          key={stage.id}
          stage={stage}
          isActive={activeStage === stage.id}
          onHover={(id) => {
            if (id !== null) onSelectStage(id);
          }}
          onClick={onSelectStage}
        />
      ))}
    </group>
  );
}

export function InteractiveGrowthScene({
  activeStage,
  onSelectStage,
}: {
  activeStage: number;
  onSelectStage: (id: number) => void;
}) {
  return (
    <div className="w-full relative select-none">
      {/* Station Badges at Top of 3D Scene */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2 px-2 relative z-20">
        {STAGES.map((stage) => {
          const isActive = activeStage === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => onSelectStage(stage.id)}
              className={`p-3 rounded-2xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer ${
                isActive
                  ? 'bg-white/[0.08] border-white/20 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                  : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06]'
              } border backdrop-blur-md`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: stage.color }}
                />
                <span className="font-mono text-xs font-bold text-white">
                  {stage.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-gray-400 uppercase">
                {stage.sub} • <strong style={{ color: stage.color }}>{stage.metric}</strong>
              </span>
            </button>
          );
        })}
      </div>

      {/* 3D WebGL Canvas with responsive mouse camera parallax */}
      <div className="w-full h-[320px] sm:h-[380px] relative">
        {/* Ambient background glow behind 3D elements (No harsh box border) */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/5 to-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
        
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 9.5], fov: 46 }}
          className="w-full h-full"
        >
          <Scene activeStage={activeStage} onSelectStage={onSelectStage} />
        </Canvas>
      </div>

      {/* Bottom Hint */}
      <div className="flex items-center justify-center pointer-events-none mt-1">
        <span className="text-[11px] font-mono text-gray-500 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
          ✦ Move mouse to tilt 3D perspective • Hover nodes or cards to inspect stages
        </span>
      </div>
    </div>
  );
}
