'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Sparkle, GlobeHemisphereWest, Cpu } from '@phosphor-icons/react';

export default function InteractiveGlobe3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Dotted Globe / Wireframe Sphere
    const globeRadius = 1.35;
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 24, 24);
    const wireframe = new THREE.WireframeGeometry(sphereGeo);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
    });
    const globeLines = new THREE.LineSegments(wireframe, lineMat);
    mainGroup.add(globeLines);

    // 2. Inner Core with subtle metallic reflectivity
    const innerGeo = new THREE.IcosahedronGeometry(globeRadius * 0.75, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      roughness: 0.2,
      metalness: 0.8,
      flatShading: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 3. Orbiting Gyro Ring (Attribution Orbit)
    const orbitGeo = new THREE.TorusGeometry(globeRadius * 1.3, 0.015, 16, 100);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
    });
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
    orbitMesh.rotation.x = Math.PI / 3;
    mainGroup.add(orbitMesh);

    // 4. Data Nodes / Pulsing Hubs on Surface
    const nodeCoords = [
      { lat: 22.7196, lon: 75.8577, label: 'Indore (Hub)' }, // Indore
      { lat: 28.6139, lon: 77.209, label: 'Delhi NCR' },
      { lat: 19.076, lon: 72.8777, label: 'Mumbai D2C' },
      { lat: 40.7128, lon: -74.006, label: 'Global Remote' },
    ];

    const nodesGroup = new THREE.Group();
    nodeCoords.forEach((coord) => {
      const phi = (90 - coord.lat) * (Math.PI / 180);
      const theta = (coord.lon + 180) * (Math.PI / 180);

      const x = -(globeRadius * Math.sin(phi) * Math.cos(theta));
      const z = globeRadius * Math.sin(phi) * Math.sin(theta);
      const y = globeRadius * Math.cos(phi);

      // Node point
      const dotGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, y, z);
      nodesGroup.add(dot);

      // Node beacon spike
      const spikeGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.2, 8);
      const spikeMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
      const spike = new THREE.Mesh(spikeGeo, spikeMat);
      spike.position.set(x * 1.08, y * 1.08, z * 1.08);
      spike.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(x, y, z).normalize());
      nodesGroup.add(spike);
    });
    mainGroup.add(nodesGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Interactive Drag to Rotate
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0.2;
    let targetRotationY = 0;
    let autoRotateSpeed = 0.005;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize listener
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 340;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        targetRotationY += autoRotateSpeed;
      }

      // Smooth damping / inertia
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.08;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.08;

      orbitMesh.rotation.z = elapsed * 0.2;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      sphereGeo.dispose();
      wireframe.dispose();
      lineMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      orbitGeo.dispose();
      orbitMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[400px] rounded-3xl bg-[#0c0c0c] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] select-none group"
      data-cursor="DRAG 3D"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Telemetry Header */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono text-white">
          <GlobeHemisphereWest size={14} className="text-white animate-spin" style={{ animationDuration: '10s' }} />
          <span>Interactive 3D Attribution Core</span>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/10">
          Drag To Rotate
        </div>
      </div>

      {/* Bottom Live Metrics Bar */}
      <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2 pointer-events-none z-10">
        <div className="px-3.5 py-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
          <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">Live Match</div>
          <div className="text-xs font-mono font-bold text-white">95%+ CAPI</div>
        </div>
        <div className="px-3.5 py-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
          <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">Signal Nodes</div>
          <div className="text-xs font-mono font-bold text-white">8 Active</div>
        </div>
        <div className="px-3.5 py-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
          <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">Attribution</div>
          <div className="text-xs font-mono font-bold text-white">100% Real-Time</div>
        </div>
      </div>
    </div>
  );
}
