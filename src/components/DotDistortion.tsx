"use client";

import { useRef, useEffect, useState } from "react";

interface DotDistortionProps {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  dotSpacing?: number;
  distortionStrength?: number;
  distortionRadius?: number;
}

export function DotDistortion({
  className = "",
  dotColor = "rgba(251, 113, 133, 0.4)", // rose-400 with opacity
  dotSize = 2,
  dotSpacing = 20,
  distortionStrength = 15,
  distortionRadius = 80,
}: DotDistortionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const animationRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    interface Dot {
      baseX: number;
      baseY: number;
      currentX: number;
      currentY: number;
    }

    const dots: Dot[] = [];

    // Generate dot grid - only right half of card
    const startX = dimensions.width * 0.5; // Start from middle
    for (let x = startX + dotSpacing / 2; x < dimensions.width; x += dotSpacing) {
      for (let y = dotSpacing / 2; y < dimensions.height; y += dotSpacing) {
        dots.push({ baseX: x, baseY: y, currentX: x, currentY: y });
      }
    }

    const easeAmount = 0.2; // Smoothing factor for mouse
    const dotEase = 0.12; // Smoothing factor for dots returning

    const draw = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Update mouse position directly for responsiveness
      if (isHoveringRef.current) {
        mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * easeAmount;
        mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * easeAmount;
      }

      dots.forEach((dot) => {
        const dx = mouseRef.current.x - dot.baseX;
        const dy = mouseRef.current.y - dot.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetX = dot.baseX;
        let targetY = dot.baseY;

        if (isHoveringRef.current && distance < distortionRadius) {
          // Smooth easing function for force
          const normalizedDist = distance / distortionRadius;
          const easedForce = Math.pow(1 - normalizedDist, 2) * distortionStrength;
          const angle = Math.atan2(dy, dx);
          targetX = dot.baseX - Math.cos(angle) * easedForce;
          targetY = dot.baseY - Math.sin(angle) * easedForce;
        }

        // Smoothly interpolate dot position
        dot.currentX += (targetX - dot.currentX) * dotEase;
        dot.currentY += (targetY - dot.currentY) * dotEase;

        // Calculate fade based on x position (fade from right to middle)
        const fadeStart = dimensions.width * 0.5;
        const fadeEnd = dimensions.width;
        const fadeProgress = (dot.baseX - fadeStart) / (fadeEnd - fadeStart);
        const alpha = fadeProgress; // 0 at middle, 1 at right edge

        // Parse the base color and apply fade
        const baseColor = dotColor.match(/[\d.]+/g);
        if (baseColor && baseColor.length >= 4) {
          const r = baseColor[0];
          const g = baseColor[1];
          const b = baseColor[2];
          const baseAlpha = parseFloat(baseColor[3]);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${baseAlpha * alpha})`;
        } else {
          ctx.fillStyle = dotColor;
        }

        ctx.beginPath();
        ctx.arc(dot.currentX, dot.currentY, dotSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, dotColor, dotSize, dotSpacing, distortionStrength, distortionRadius]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    isHoveringRef.current = true;
    targetMouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
  };

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ zIndex: 0 }}
    />
  );
}
