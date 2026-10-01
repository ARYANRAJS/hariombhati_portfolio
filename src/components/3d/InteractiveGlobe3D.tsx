'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GlobeHemisphereWest } from '@phosphor-icons/react';
import { DOTTED_LAND_COORDS, GLOBE_HUBS, HubPoint } from './globeData';

export default function InteractiveGlobe3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 400;

    // 1. Scene, Camera, Renderer
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
    // Tilt slightly so Northern Hemisphere / India / Europe is clearly framed
    mainGroup.rotation.x = 0.28;
    // Rotate so India (lon 75.8E) faces directly towards the camera on initial load
    mainGroup.rotation.y = -THREE.MathUtils.degToRad(75.8);
    scene.add(mainGroup);

    const GLOBE_RADIUS = 1.45;

    // 2. High-brightness Circular Dot Sprite Texture
    const createDotTexture = () => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 28);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
      gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.45)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    };
    const dotTexture = createDotTexture();

    // 3. Solid Dark Planet Body (Occludes backside points cleanly)
    const innerCoreGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.985, 48, 48);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x060608,
      depthWrite: true,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    mainGroup.add(innerCore);

    // 4. Subtle Latitude / Longitude Wireframe Ring Guides
    const gridGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.992, 24, 16);
    const gridWire = new THREE.WireframeGeometry(gridGeo);
    const gridMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.04,
    });
    const gridLines = new THREE.LineSegments(gridWire, gridMat);
    mainGroup.add(gridLines);

    // 5. Outer Atmospheric Ring
    const haloGeo = new THREE.TorusGeometry(GLOBE_RADIUS * 1.15, 0.005, 16, 100);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.22,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2.2;
    mainGroup.add(haloMesh);

    // 6. Dotted World Map Continents (4,600+ Golden-Ratio Sampled Dots)
    const positions = new Float32Array(DOTTED_LAND_COORDS.length);
    const colors = new Float32Array(DOTTED_LAND_COORDS.length);

    // Highlight area around India / South Asia with subtle emerald glow
    const indiaHub = GLOBE_HUBS.find((h) => h.isHQ);
    const indiaVec = indiaHub
      ? new THREE.Vector3(indiaHub.x, indiaHub.y, indiaHub.z).normalize()
      : new THREE.Vector3(0.89, 0.38, 0.22).normalize();

    for (let i = 0; i < DOTTED_LAND_COORDS.length; i += 3) {
      const px = DOTTED_LAND_COORDS[i];
      const py = DOTTED_LAND_COORDS[i + 1];
      const pz = DOTTED_LAND_COORDS[i + 2];

      positions[i] = px * GLOBE_RADIUS;
      positions[i + 1] = py * GLOBE_RADIUS;
      positions[i + 2] = pz * GLOBE_RADIUS;

      const ptVec = new THREE.Vector3(px, py, pz).normalize();
      const distToIndia = ptVec.distanceTo(indiaVec);

      // Color variation: Points near India get a subtle bright emerald tint
      if (distToIndia < 0.45) {
        colors[i] = 0.35;
        colors[i + 1] = 0.95;
        colors[i + 2] = 0.65;
      } else {
        // Bright crisp white
        colors[i] = 0.95;
        colors[i + 1] = 0.95;
        colors[i + 2] = 0.98;
      }
    }

    const landGeometry = new THREE.BufferGeometry();
    landGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    landGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const landMaterial = new THREE.PointsMaterial({
      size: 0.044,
      map: dotTexture || undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      blending: THREE.NormalBlending,
      depthTest: true,
      depthWrite: false,
    });

    const landPointsMesh = new THREE.Points(landGeometry, landMaterial);
    mainGroup.add(landPointsMesh);

    // 7. Global Campaign Hubs & Animated Beacons
    const hubsGroup = new THREE.Group();
    const pulseRings: { mesh: THREE.Mesh; baseScale: number; speed: number }[] = [];

    const hqHub = GLOBE_HUBS.find((h) => h.isHQ) || GLOBE_HUBS[0];
    const hqPos = new THREE.Vector3(
      hqHub.x * GLOBE_RADIUS,
      hqHub.y * GLOBE_RADIUS,
      hqHub.z * GLOBE_RADIUS
    );

    GLOBE_HUBS.forEach((hub: HubPoint) => {
      const pos = new THREE.Vector3(
        hub.x * GLOBE_RADIUS,
        hub.y * GLOBE_RADIUS,
        hub.z * GLOBE_RADIUS
      );

      // Center Beacon Point
      const beaconGeo = new THREE.SphereGeometry(hub.isHQ ? 0.038 : 0.024, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: hub.isHQ ? 0x34d399 : 0xffffff,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(pos);
      hubsGroup.add(beacon);

      // Vertical Beacon Spike
      const spikeNormal = pos.clone().normalize();
      const spikeGeo = new THREE.CylinderGeometry(0.005, 0.005, hub.isHQ ? 0.3 : 0.18, 8);
      const spikeMat = new THREE.MeshBasicMaterial({
        color: hub.isHQ ? 0x34d399 : 0xffffff,
        transparent: true,
        opacity: 0.8,
      });
      const spike = new THREE.Mesh(spikeGeo, spikeMat);
      spike.position.copy(pos.clone().add(spikeNormal.clone().multiplyScalar(hub.isHQ ? 0.15 : 0.09)));
      spike.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), spikeNormal);
      hubsGroup.add(spike);

      // Expanding Pulsing Halo Ring on surface
      const ringGeo = new THREE.RingGeometry(0.035, 0.05, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: hub.isHQ ? 0x34d399 : 0xffffff,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos.clone().multiplyScalar(1.002));
      ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), spikeNormal);
      hubsGroup.add(ring);
      pulseRings.push({ mesh: ring, baseScale: 1, speed: hub.isHQ ? 2.4 : 1.7 });
    });

    mainGroup.add(hubsGroup);

    // 8. 3D Curved Attribution Arcs (Indore HQ to Global Markets)
    const arcsGroup = new THREE.Group();
    const arcPulses: { curve: THREE.QuadraticBezierCurve3; mesh: THREE.Mesh; progress: number; speed: number }[] = [];

    const targetHubs = GLOBE_HUBS.filter(
      (h) => !h.isHQ && ['Dubai (GCC)', 'London', 'New York', 'Singapore'].includes(h.name)
    );

    targetHubs.forEach((hub, idx) => {
      const destPos = new THREE.Vector3(
        hub.x * GLOBE_RADIUS,
        hub.y * GLOBE_RADIUS,
        hub.z * GLOBE_RADIUS
      );

      const mid = new THREE.Vector3().addVectors(hqPos, destPos).multiplyScalar(0.5);
      const distance = hqPos.distanceTo(destPos);
      const arcHeight = GLOBE_RADIUS * (1.16 + distance * 0.16);
      mid.normalize().multiplyScalar(arcHeight);

      const curve = new THREE.QuadraticBezierCurve3(hqPos, mid, destPos);
      const curvePoints = curve.getPoints(45);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);

      const curveMat = new THREE.LineBasicMaterial({
        color: 0x34d399,
        transparent: true,
        opacity: 0.32,
      });
      const arcLine = new THREE.Line(curveGeo, curveMat);
      arcsGroup.add(arcLine);

      // Moving photon pulse bead along each arc
      const photonGeo = new THREE.SphereGeometry(0.024, 12, 12);
      const photonMat = new THREE.MeshBasicMaterial({
        color: 0x34d399,
      });
      const photon = new THREE.Mesh(photonGeo, photonMat);
      arcsGroup.add(photon);

      arcPulses.push({
        curve,
        mesh: photon,
        progress: (idx * 0.25) % 1,
        speed: 0.007 + idx * 0.002,
      });
    });

    mainGroup.add(arcsGroup);

    // 9. Interactive Dragging Controls (Mouse + Touch)
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };
    let targetRotationX = mainGroup.rotation.x;
    let targetRotationY = mainGroup.rotation.y;
    const autoRotateSpeed = 0.0024;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointer = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPointer.x;
      const deltaY = e.clientY - prevPointer.y;

      targetRotationY += deltaX * 0.007;
      targetRotationX += deltaY * 0.007;

      // Limit pitch to prevent flipping
      targetRotationX = Math.max(-0.7, Math.min(0.7, targetRotationX));

      prevPointer = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 10. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        targetRotationY += autoRotateSpeed;
      }

      // Smooth inertia damping
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.07;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.07;

      // Animate pulsing rings
      pulseRings.forEach((p, idx) => {
        const cycle = (elapsed * p.speed + idx * 0.4) % 1;
        const scale = 1 + cycle * 1.5;
        p.mesh.scale.set(scale, scale, scale);
        const mat = p.mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, 1 - cycle) * 0.85;
      });

      // Animate photon beads along arcs
      arcPulses.forEach((ap) => {
        ap.progress += ap.speed;
        if (ap.progress > 1) ap.progress = 0;
        const pt = ap.curve.getPoint(ap.progress);
        ap.mesh.position.copy(pt);
      });

      haloMesh.rotation.z = elapsed * 0.1;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      landGeometry.dispose();
      landMaterial.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      gridGeo.dispose();
      gridWire.dispose();
      gridMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      dotTexture?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[420px] rounded-3xl bg-[#08080a] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] select-none group touch-pan-y"
      data-cursor="DRAG GLOBE"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y" />

      {/* Top Telemetry Header */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs font-mono text-white">
          <GlobeHemisphereWest size={15} className="text-emerald-400 animate-spin" style={{ animationDuration: '14s' }} />
          <span>Interactive Dotted World Globe</span>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/10">
          Drag To Rotate 360°
        </div>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2 pointer-events-none z-10">
        <div className="px-3 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/10">
          <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">World Map</div>
          <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            4,600+ Dots
          </div>
        </div>
        <div className="px-3 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/10">
          <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">Global Scale</div>
          <div className="text-xs font-mono font-bold text-white mt-0.5">
            India • GCC • US • UK
          </div>
        </div>
        <div className="px-3 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/10">
          <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">Infrastructure</div>
          <div className="text-xs font-mono font-bold text-white mt-0.5">
            Meta CAPI + GA4
          </div>
        </div>
      </div>
    </div>
  );
}
