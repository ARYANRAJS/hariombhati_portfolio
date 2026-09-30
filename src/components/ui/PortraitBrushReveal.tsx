'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { PaintBrush, Sparkle } from '@phosphor-icons/react';
import { getAssetPath } from '@/lib/paths';

interface PortraitBrushRevealProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

interface BrushStamp {
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

export default function PortraitBrushReveal({
  src,
  alt,
  className = '',
  priority = true,
}: PortraitBrushRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorImgRef = useRef<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [paintCount, setPaintCount] = useState(0);

  const stampsRef = useRef<BrushStamp[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const isLoopRunningRef = useRef(false);
  const rafIdRef = useRef<number>(0);

  // Preload color image for high-speed canvas drawing
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = getAssetPath(src);
    img.onload = () => {
      colorImgRef.current = img;
      setImageLoaded(true);
    };
  }, [src]);

  // Synchronize canvas size with element display size
  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  useEffect(() => {
    syncCanvasSize();
    window.addEventListener('resize', syncCanvasSize);
    return () => window.removeEventListener('resize', syncCanvasSize);
  }, [syncCanvasSize]);

  // Main animation / render loop for the brush reveal & smooth un-reveal
  const renderLoop = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const colorImg = colorImgRef.current;

    if (!canvas || !container || !colorImg) {
      isLoopRunningRef.current = false;
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      isLoopRunningRef.current = false;
      return;
    }

    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // Clear previous canvas
    ctx.clearRect(0, 0, w, h);

    const stamps = stampsRef.current;

    if (stamps.length > 0) {
      // Step 1: Draw the brush alpha mask (white feathered circles)
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';

      for (let i = stamps.length - 1; i >= 0; i--) {
        const stamp = stamps[i];

        // Smooth gradual un-reveal / decay
        stamp.opacity *= 0.982; // gentle heal back (~2.5 seconds)

        if (stamp.opacity < 0.008) {
          stamps.splice(i, 1);
          continue;
        }

        // Feathered circular brush stroke
        const grad = ctx.createRadialGradient(
          stamp.x,
          stamp.y,
          0,
          stamp.x,
          stamp.y,
          stamp.radius
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${stamp.opacity})`);
        grad.addColorStop(0.5, `rgba(255, 255, 255, ${stamp.opacity * 0.75})`);
        grad.addColorStop(0.85, `rgba(255, 255, 255, ${stamp.opacity * 0.3})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(stamp.x, stamp.y, stamp.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Step 2: Use source-in to crop the colorful original image ONLY within the brush strokes
      ctx.globalCompositeOperation = 'source-in';

      // Cover-fit math for color image
      const imgAspect = colorImg.width / colorImg.height;
      const containerAspect = w / h;
      let renderW = w;
      let renderH = h;
      let offsetX = 0;
      let offsetY = 0;

      if (containerAspect > imgAspect) {
        renderW = w;
        renderH = w / imgAspect;
        offsetY = (h - renderH) / 2;
      } else {
        renderH = h;
        renderW = h * imgAspect;
        offsetX = (w - renderW) / 2;
      }

      ctx.drawImage(colorImg, offsetX, offsetY, renderW, renderH);
      ctx.restore();

      // Keep animation running as long as strokes exist
      rafIdRef.current = requestAnimationFrame(renderLoop);
      isLoopRunningRef.current = true;
    } else {
      // Loop ends when all paint has healed
      isLoopRunningRef.current = false;
    }
  }, []);

  const startLoopIfNeeded = useCallback(() => {
    if (!isLoopRunningRef.current) {
      isLoopRunningRef.current = true;
      rafIdRef.current = requestAnimationFrame(renderLoop);
    }
  }, [renderLoop]);

  // Add brush strokes along the path of cursor movement
  const addStroke = useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const currentX = clientX - rect.left;
      const currentY = clientY - rect.top;

      const prev = lastPosRef.current || { x: currentX, y: currentY };
      const dx = currentX - prev.x;
      const dy = currentY - prev.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Interpolate points so fast sweeps paint continuous strokes
      const step = 8;
      const count = Math.max(1, Math.floor(dist / step));

      for (let i = 0; i <= count; i++) {
        const t = count === 0 ? 1 : i / count;
        const x = prev.x + dx * t;
        const y = prev.y + dy * t;

        // Realistic brush radius with slight organic variation
        const radius = 55 + Math.random() * 20;

        stampsRef.current.push({
          x,
          y,
          radius,
          opacity: 1.0,
        });
      }

      // Bound stamp memory
      if (stampsRef.current.length > 500) {
        stampsRef.current = stampsRef.current.slice(-400);
      }

      lastPosRef.current = { x: currentX, y: currentY };
      setPaintCount((prev) => prev + 1);
      startLoopIfNeeded();
    },
    [startLoopIfNeeded]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    addStroke(e.clientX, e.clientY);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    lastPosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    addStroke(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    lastPosRef.current = null;
  };

  // Touch support for mobile / tablets
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      addStroke(touch.clientX, touch.clientY);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      lastPosRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
      addStroke(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    lastPosRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative select-none overflow-hidden cursor-crosshair group ${className}`}
      data-cursor="PAINT"
    >
      {/* ── Layer 1 (Underneath): Black & White Grayscale Base ── */}
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 420px"
          className="object-cover object-top filter grayscale contrast-115 brightness-90 transition-all duration-700"
        />
      </div>

      {/* ── Layer 2 (Top Overlay): Canvas Masked Full Vibrant Color ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* ── Subtle Cinematic Vignette ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/25 opacity-75 pointer-events-none z-20" />

      {/* ── Floating Brush Hint Badge (Appears when not painted yet or fades on interaction) ── */}
      <div
        className={`absolute top-4 right-4 z-30 transition-all duration-500 pointer-events-none ${
          paintCount > 8 && !isHovered ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          <PaintBrush size={12} weight="fill" className="text-amber-400 animate-bounce" />
          <span>{isHovered ? 'Painting In Color...' : 'Hover / Brush To Reveal Color'}</span>
        </div>
      </div>
    </div>
  );
}
