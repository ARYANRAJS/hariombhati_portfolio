'use client';

import React, { useEffect, useRef, useCallback } from 'react';

/**
 * ColorReveal — a canvas overlay that paints a rich chromatic gradient
 * wherever the cursor travels, then smoothly fades it back to transparent.
 * 
 * The effect: dark hero background → cursor moves → vibrant colors bloom
 * beneath the cursor in a soft radial wash → cursor leaves → colors gently
 * dissolve back into darkness.
 * 
 * Uses window-level mousemove listener scoped to hero bounds for maximum
 * compatibility with all event systems.
 */

interface Spot {
  x: number;
  y: number;
  opacity: number;
  radius: number;
  hue: number;
}

export default function ColorReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotsRef = useRef<Spot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const rafRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);
  const parentRectRef = useRef({ left: 0, top: 0, width: 0, height: 0 });
  const globalHueRef = useRef(0);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    parentRectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  useEffect(() => {
    // Only run on non-touch devices
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    resize();

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use window-level mousemove, scoped to hero section bounds
    const handleMouseMove = (e: MouseEvent) => {
      const pr = parentRectRef.current;
      const localX = e.clientX - pr.left;
      const localY = e.clientY - pr.top;

      // Check if cursor is within hero bounds
      const isInside = localX >= 0 && localX <= pr.width && localY >= 0 && localY <= pr.height;

      if (isInside) {
        mouseRef.current.x = localX;
        mouseRef.current.y = localY;
        mouseRef.current.active = true;

        // Spawn new color spots at a throttled rate (~every 16ms)
        const now = performance.now();
        if (now - lastSpawnRef.current > 16) {
          lastSpawnRef.current = now;
          globalHueRef.current = (globalHueRef.current + 1.8) % 360;

          spotsRef.current.push({
            x: localX,
            y: localY,
            opacity: 0.6,
            radius: 90 + Math.random() * 100,
            hue: globalHueRef.current + Math.random() * 40,
          });

          // Keep array bounded
          if (spotsRef.current.length > 120) {
            spotsRef.current = spotsRef.current.slice(-100);
          }
        }
      } else {
        mouseRef.current.active = false;
      }
    };

    // Recalculate bounds on scroll
    const handleScroll = () => {
      const rect = parent.getBoundingClientRect();
      parentRectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    };

    const animate = () => {
      if (!ctx) return;
      const w = parentRectRef.current.width;
      const h = parentRectRef.current.height;

      // Clear entire canvas each frame
      ctx.clearRect(0, 0, w, h);

      // Draw and fade each spot
      const spots = spotsRef.current;
      for (let i = spots.length - 1; i >= 0; i--) {
        const spot = spots[i];

        // Fade out smoothly
        spot.opacity *= 0.97;
        spot.radius += 0.3;

        // Remove fully faded spots
        if (spot.opacity < 0.005) {
          spots.splice(i, 1);
          continue;
        }

        // Draw radial gradient blob with chromatic hue shift
        const gradient = ctx.createRadialGradient(
          spot.x, spot.y, 0,
          spot.x, spot.y, spot.radius
        );

        const h = spot.hue % 360;
        gradient.addColorStop(0, `hsla(${h}, 90%, 65%, ${spot.opacity * 0.75})`);
        gradient.addColorStop(0.3, `hsla(${(h + 45) % 360}, 85%, 55%, ${spot.opacity * 0.45})`);
        gradient.addColorStop(0.6, `hsla(${(h + 90) % 360}, 80%, 50%, ${spot.opacity * 0.2})`);
        gradient.addColorStop(1, `hsla(${(h + 135) % 360}, 70%, 40%, 0)`);

        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(spot.x, spot.y, spot.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Live cursor glow — brighter and more immediate when cursor is active
      if (mouseRef.current.active) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const lh = globalHueRef.current;

        const liveGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
        liveGrad.addColorStop(0, `hsla(${lh}, 100%, 72%, 0.4)`);
        liveGrad.addColorStop(0.25, `hsla(${(lh + 60) % 360}, 95%, 58%, 0.2)`);
        liveGrad.addColorStop(0.55, `hsla(${(lh + 120) % 360}, 85%, 52%, 0.08)`);
        liveGrad.addColorStop(1, 'hsla(0, 0%, 0%, 0)');

        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = liveGrad;
        ctx.beginPath();
        ctx.arc(mx, my, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Window-level listeners for maximum event capture reliability
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resize);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [resize]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}
