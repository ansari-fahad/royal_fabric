"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { FrameSequenceLoader } from "@/components/FrameLoader";

export interface ScrollSequenceProps {
  framePath?: string;
  framePrefix?: string;
  frameCount?: number;
  frameExtension?: string;
  framePadding?: number;
  fit?: "cover" | "contain";
  containerHeight?: string;
  onProgress?: (progress: number, currentFrame: number) => void;
  children?: (props: {
    progress: number;
    currentFrame: number;
    isLoading: boolean;
    loadProgress: number;
  }) => React.ReactNode;
}

export const ScrollSequence: React.FC<ScrollSequenceProps> = ({
  framePath = "/frames",
  framePrefix = "ezgif-frame-",
  frameCount = 240,
  frameExtension = "jpg",
  framePadding = 3,
  fit = "cover",
  containerHeight = "480vh",
  onProgress,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<FrameSequenceLoader | null>(null);

  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const animFrameIdRef = useRef<number | null>(null);
  const hasDrawnFirstFrameRef = useRef<boolean>(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameState, setCurrentFrameState] = useState(1);

  // Direct canvas drawing function preserving aspect ratio and preventing black gaps
  const drawImageToCanvas = useCallback(
    (img: HTMLImageElement | null) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;

      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      if (fit === "cover") {
        const scale = Math.max(cw / nw, ch / nh);
        drawW = nw * scale;
        drawH = nh * scale;
        drawX = (cw - drawW) / 2;
        drawY = (ch - drawH) / 2;
      } else {
        const scale = Math.min(cw / nw, ch / nh);
        drawW = nw * scale;
        drawH = nh * scale;
        drawX = (cw - drawW) / 2;
        drawY = (ch - drawH) / 2;
      }

      // If this is the very first draw, clear background; otherwise directly draw over without black gap
      if (!hasDrawnFirstFrameRef.current) {
        ctx.fillStyle = "#0A0A0C";
        ctx.fillRect(0, 0, cw, ch);
        hasDrawnFirstFrameRef.current = true;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    [fit]
  );

  // Initialize FrameSequenceLoader
  useEffect(() => {
    const loader = new FrameSequenceLoader({
      framePath,
      framePrefix,
      frameCount,
      frameExtension,
      framePadding,
      onProgress: (percent) => {
        setLoadProgress(percent);
      },
      onFirstFrameReady: (firstImg) => {
        setIsLoading(false);
        drawImageToCanvas(firstImg);
      },
    });

    loaderRef.current = loader;
    loader.startProgressivePreload();

    return () => {
      loader.destroy();
      loaderRef.current = null;
    };
  }, [framePath, framePrefix, frameCount, frameExtension, framePadding, drawImageToCanvas]);

  // Handle Resize and DPR
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      if (loaderRef.current) {
        const img = loaderRef.current.getFrameSync(Math.round(currentFrameRef.current));
        drawImageToCanvas(img);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [drawImageToCanvas]);

  // High performance smooth render loop using requestAnimationFrame
  useEffect(() => {
    let running = true;

    const renderLoop = () => {
      if (!running) return;

      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.04) {
        currentFrameRef.current += diff * 0.35;
        const frameIndex = Math.round(currentFrameRef.current);

        if (loaderRef.current) {
          const img = loaderRef.current.getFrameSync(frameIndex);
          if (img) {
            drawImageToCanvas(img);
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      running = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawImageToCanvas]);

  // Scroll progress handler
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = containerRef.current;
          if (!container) {
            ticking = false;
            return;
          }

          const rect = container.getBoundingClientRect();
          const totalScrollDistance = rect.height - window.innerHeight;

          if (totalScrollDistance <= 0) {
            ticking = false;
            return;
          }

          const currentScrolled = -rect.top;
          const rawProgress = currentScrolled / totalScrollDistance;
          const clampedProgress = Math.max(0, Math.min(1, rawProgress));

          setScrollProgress(clampedProgress);

          const nextTargetFrame = Math.max(
            1,
            Math.min(
              frameCount,
              Math.floor(clampedProgress * (frameCount - 1)) + 1
            )
          );

          targetFrameRef.current = nextTargetFrame;
          setCurrentFrameState(nextTargetFrame);

          if (loaderRef.current) {
            loaderRef.current.prioritizeFrameRange(nextTargetFrame, 15);
          }

          if (onProgress) {
            onProgress(clampedProgress, nextTargetFrame);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [frameCount, onProgress]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: containerHeight }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#0A0A0C]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block object-cover z-0"
        />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C]/60 z-10" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0A0A0C]/70 via-transparent to-[#0A0A0C]/70 z-10" />

        {children && (
          <div className="relative z-20 w-full h-full pointer-events-none">
            {children({
              progress: scrollProgress,
              currentFrame: currentFrameState,
              isLoading,
              loadProgress,
            })}
          </div>
        )}

        {isLoading && (
          <div className="absolute bottom-10 right-10 z-30 flex items-center space-x-3 px-4 py-2 rounded-full bg-[#0A0A0C]/80 border border-[#D4AF37]/30 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#F3E8D2] font-mono">
              WEAVING SEQUENCE {loadProgress}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
