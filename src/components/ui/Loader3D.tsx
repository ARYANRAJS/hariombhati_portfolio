'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface Loader3DProps {
  onLoadingComplete?: () => void;
}

const TELEMETRY_LOGS = [
  'INITIALIZING SYSTEM ARCHITECTURE...',
  'CALIBRATING META ADVANTAGE+ & GA4 TELEMETRY...',
  'IMPORTING PERFORMANCE METRICS (7.25X PEAK ROAS)...',
  'ESTABLISHING SECURE VISUAL CORE...',
  'EXPERIENCE READY. WELCOME.',
];

export default function Loader3D({ onLoadingComplete }: Loader3DProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const isExitedRef = useRef(false);

  // Three.js 3D Wireframe Scene
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 4.8;

    // Renderer with high DPR
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(220, 220);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Outer Gyro Ring
    const ringGeo = new THREE.TorusGeometry(1.6, 0.015, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ringMesh);

    // Mid Gyro Ring
    const midRingGeo = new THREE.TorusGeometry(1.3, 0.012, 16, 80);
    const midRingMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
    });
    const midRingMesh = new THREE.Mesh(midRingGeo, midRingMat);
    scene.add(midRingMesh);

    // Inner Wireframe Icosahedron
    const icosaGeo = new THREE.IcosahedronGeometry(0.9, 1);
    const wireframeGeo = new THREE.WireframeGeometry(icosaGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    });
    const wireframeMesh = new THREE.LineSegments(wireframeGeo, wireframeMat);
    scene.add(wireframeMesh);

    // Center glowing core point
    const coreGeo = new THREE.SphereGeometry(0.25, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Ambient particles
    const particleCount = 60;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 4;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      if (isExitedRef.current) return;
      const elapsed = clock.getElapsedTime();

      ringMesh.rotation.x = elapsed * 0.35;
      ringMesh.rotation.y = elapsed * 0.2;

      midRingMesh.rotation.x = -elapsed * 0.4;
      midRingMesh.rotation.z = elapsed * 0.3;

      wireframeMesh.rotation.y = elapsed * 0.5;
      wireframeMesh.rotation.x = elapsed * 0.25;

      const scalePulse = 1 + Math.sin(elapsed * 2) * 0.08;
      coreMesh.scale.set(scalePulse, scalePulse, scalePulse);

      particles.rotation.y = elapsed * 0.08;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      midRingGeo.dispose();
      midRingMat.dispose();
      icosaGeo.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  // GSAP Counter & Progress Animation
  useEffect(() => {
    const progressObj = { value: 0 };

    const tl = gsap.timeline({
      onUpdate: () => {
        const val = Math.round(progressObj.value);
        setProgress(val);
        const idx = Math.min(
          TELEMETRY_LOGS.length - 1,
          Math.floor((val / 100) * TELEMETRY_LOGS.length)
        );
        setLogIndex(idx);
      },
      onComplete: () => {
        handleExit();
      },
    });

    tl.to(progressObj, {
      value: 100,
      duration: 1.6,
      ease: 'power2.inOut',
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      tl.kill();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleExit = () => {
    if (isExiting) return;
    setIsExiting(true);
    isExitedRef.current = true;

    // Immediately disable pointer events on root container so touch/scroll is never blocked
    if (containerRef.current) {
      containerRef.current.style.pointerEvents = 'none';
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
        if (onLoadingComplete) onLoadingComplete();
      },
    });

    // Content fade-out and subtle scale up
    tl.to('.loader-content', {
      opacity: 0,
      scale: 0.95,
      duration: 0.35,
      ease: 'power2.in',
    });

    // Curtains split open vertically
    if (curtainTopRef.current && curtainBottomRef.current) {
      tl.to(
        curtainTopRef.current,
        {
          yPercent: -100,
          duration: 0.7,
          ease: 'power4.inOut',
        },
        '-=0.1'
      );
      tl.to(
        curtainBottomRef.current,
        {
          yPercent: 100,
          duration: 0.7,
          ease: 'power4.inOut',
        },
        '<'
      );
    }

    // Completely remove container from layout and mouse events
    if (containerRef.current) {
      tl.set(containerRef.current, { display: 'none' });
    }
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="loader-curtain-root fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto overflow-hidden select-none bg-[#060606]"
    >
      {/* SEO & Search Crawler Safeguard: If JavaScript is disabled or for search bots, hide loader immediately */}
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: '.loader-curtain-root { display: none !important; }' }} />
      </noscript>

      {/* Top Split Curtain */}
      <div
        ref={curtainTopRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#060606] border-b border-white/[0.08]"
      />

      {/* Bottom Split Curtain */}
      <div
        ref={curtainBottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#060606] border-t border-white/[0.08]"
      />

      {/* Subtle background ambient grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Loader Content */}
      <div className="loader-content relative z-10 flex flex-col items-center justify-center px-6 max-w-md w-full text-center">
        {/* 3D Wireframe Canvas */}
        <div className="relative w-[220px] h-[220px] mb-4 flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full" />
          <div className="absolute inset-0 bg-radial from-transparent to-[#060606] pointer-events-none opacity-40" />
        </div>

        {/* Brand Meta Identifier */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-400">
            Hariom Bhati • Growth Engineer
          </span>
        </div>

        {/* Large Percentage Counter */}
        <div className="font-mono text-5xl sm:text-6xl font-bold tracking-tight text-white mb-4">
          <span ref={counterRef}>{String(progress).padStart(2, '0')}</span>
          <span className="text-xl sm:text-2xl text-neutral-600 font-light ml-1">%</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-white/[0.08] rounded-full overflow-hidden mb-4 relative">
          <div
            ref={barRef}
            className="h-full bg-white transition-all duration-75 shadow-[0_0_12px_rgba(255,255,255,0.9)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Telemetry Log */}
        <div className="h-5 flex items-center justify-center mb-6">
          <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest truncate">
            {TELEMETRY_LOGS[logIndex]}
          </p>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleExit}
          className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 hover:text-white px-4 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.02] transition-colors"
        >
          Skip Intro [ESC]
        </button>
      </div>
    </div>
  );
}
