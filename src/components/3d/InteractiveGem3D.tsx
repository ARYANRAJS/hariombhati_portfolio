'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface InteractiveGem3DProps {
  className?: string;
}

export default function InteractiveGem3D({ className = '' }: InteractiveGem3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || 120;
    let height = container.clientHeight || 120;

    // 1. Scene, Camera, WebGLRenderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0x1e3a8a, 1.4);
    scene.add(ambientLight);

    // Key bright specular light
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    // Front cobalt fill light
    const fillLight = new THREE.DirectionalLight(0x3b82f6, 2.0);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    // Bottom ice-blue rim light
    const rimLight = new THREE.PointLight(0x93c5fd, 2.5, 12);
    rimLight.position.set(0, -3, -2);
    scene.add(rimLight);

    // Top glint point light
    const glintLight = new THREE.PointLight(0xffffff, 1.8, 8);
    glintLight.position.set(1.5, 3, 2);
    scene.add(glintLight);

    // 3. Faceted Brilliant Gemstone Mesh
    const gemGroup = new THREE.Group();
    // Default dynamic tilt like in the user's reference screenshot
    gemGroup.rotation.x = 0.22;
    gemGroup.rotation.z = -0.18;
    scene.add(gemGroup);

    // High-specular faceted cobalt blue material
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#2563eb'),
      emissive: new THREE.Color('#1d4ed8'),
      emissiveIntensity: 0.32,
      roughness: 0.08,
      metalness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      flatShading: true,
    });

    // Top Crown (Cylinder with table facet)
    const crownGeo = new THREE.CylinderGeometry(0.5, 1.05, 0.58, 7);
    const crownMesh = new THREE.Mesh(crownGeo, gemMat);
    crownMesh.position.y = 0.29 + 0.35;
    gemGroup.add(crownMesh);

    // Bottom Pavilion (Inverted Cone tapering to point)
    const pavilionGeo = new THREE.ConeGeometry(1.05, 1.28, 7);
    pavilionGeo.rotateX(Math.PI);
    const pavilionMesh = new THREE.Mesh(pavilionGeo, gemMat);
    pavilionMesh.position.y = -0.64 + 0.35;
    gemGroup.add(pavilionMesh);

    // Subtle luminous wireframe edges
    const wireMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#93c5fd'),
      transparent: true,
      opacity: 0.4,
    });
    const crownEdges = new THREE.LineSegments(new THREE.EdgesGeometry(crownGeo), wireMat);
    crownEdges.position.y = 0.29 + 0.35;
    gemGroup.add(crownEdges);

    const pavilionEdges = new THREE.LineSegments(new THREE.EdgesGeometry(pavilionGeo), wireMat);
    pavilionEdges.position.y = -0.64 + 0.35;
    gemGroup.add(pavilionEdges);

    // 4. Sparkling ambient glint stars orbiting the gem
    const starCount = 8;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const angle = (i / starCount) * Math.PI * 2;
      const r = 1.45 + Math.random() * 0.3;
      starPos[i * 3] = Math.cos(angle) * r;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      starPos[i * 3 + 2] = Math.sin(angle) * r;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));

    // Circular sparkle dot texture
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 32;
    starCanvas.height = 32;
    const sCtx = starCanvas.getContext('2d');
    if (sCtx) {
      const g = sCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      g.addColorStop(0, 'rgba(255, 255, 255, 1)');
      g.addColorStop(0.3, 'rgba(147, 197, 253, 0.9)');
      g.addColorStop(0.7, 'rgba(37, 99, 235, 0.4)');
      g.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = g;
      sCtx.fillRect(0, 0, 32, 32);
    }
    const starTex = new THREE.CanvasTexture(starCanvas);
    const starMat = new THREE.PointsMaterial({
      size: 0.14,
      map: starTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 5. Physics & Interaction State
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let velX = 0;
    let velY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let animId = 0;
    let lastTime = performance.now();

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      velX = 0;
      velY = 0;
      canvas.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetTiltX = ny * 0.4;
      targetTiltY = nx * 0.4;

      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      velX = dx * 0.012;
      velY = dy * 0.012;

      gemGroup.rotation.y += velX;
      gemGroup.rotation.x += velY;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      canvas.releasePointerCapture?.(e.pointerId);
    };

    const onClick = () => {
      // Satisfying playful spin burst on click
      velX += (Math.random() > 0.5 ? 1 : -1) * 0.16;
      velY += 0.12;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('click', onClick);

    // 6. Animation Loop
    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const time = now * 0.001;

      // Gentle floating levitation
      gemGroup.position.y = Math.sin(time * 2.2) * 0.09;

      // When dragging or momentum active
      if (!isDragging) {
        // Continuous ambient rotation
        gemGroup.rotation.y += 0.008 + velX;
        gemGroup.rotation.x += velY;

        // Inertia damping
        velX *= 0.94;
        velY *= 0.94;

        // Smooth subtle cursor tracking tilt
        gemGroup.rotation.x = THREE.MathUtils.lerp(gemGroup.rotation.x, targetTiltX + 0.2, 0.05);
      }

      // Orbit sparkling stars
      starPoints.rotation.y = time * 0.25;
      starPoints.rotation.x = Math.sin(time * 0.4) * 0.15;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      width = container.clientWidth || 120;
      height = container.clientHeight || 120;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('click', onClick);
      renderer.dispose();
      crownGeo.dispose();
      pavilionGeo.dispose();
      gemMat.dispose();
      wireMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      starTex.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
      title="Click & Drag to rotate 3D Cobalt Gem"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        style={{ pointerEvents: 'auto' }}
      />
    </div>
  );
}
