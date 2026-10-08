"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { animationFrames } from "@/data/frames";

export interface ScrollFrameSequenceProps {
  id?: string;
  framePath?: string;
  frameCount?: number;
  extension?: string;
  padding?: number;
  prefix?: string;
  containerHeight?: string;
  showDebug?: boolean;
  children?: (props: {
    progress: number;
    currentFrame: number;
    loadedCount: number;
    frameCount: number;
  }) => React.ReactNode;
}

export const ScrollFrameSequence: React.FC<ScrollFrameSequenceProps> = ({
  id = "story",
  framePath = animationFrames.path,
  frameCount = animationFrames.count,
  extension = animationFrames.extension,
  padding = animationFrames.padding,
  prefix = animationFrames.prefix,
  containerHeight = "500vh",
  showDebug = Boolean(import.meta.env?.DEV),
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Core Animation References (Avoid React re-render lag during scrolling)
  const frameCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadPromisesRef = useRef<Map<number, Promise<HTMLImageElement | null>>>(new Map());
  const lastRenderedFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const currentRenderedFrameRef = useRef<number>(1);
  const animFrameIdRef = useRef<number | null>(null);
  const isDestroyedRef = useRef<boolean>(false);

  // Light State for Overlay & Debug HUD
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFrame, setActiveFrame] = useState(1);
  const [loadedCount, setLoadedCount] = useState(0);

  // Helper to generate full URL path for a frame index (1-indexed)
  const getFrameUrl = useCallback(
    (index: number) => {
      const paddedNumber = String(index).padStart(padding, "0");
      return `${framePath}/${prefix}${paddedNumber}.${extension}`;
    },
    [framePath, prefix, padding, extension]
  );

  // Core Drawing Function (Guarantees NO BLACK FRAME, NO FLICKERING)
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      // 1. Check if the exact requested frame is in cache
      let img = frameCacheRef.current.get(frameIndex);

      // 2. If requested frame is not ready, fall back to last successfully rendered frame
      if (!img || !img.complete || img.naturalWidth === 0) {
        img = frameCacheRef.current.get(lastRenderedFrameRef.current);
      }

      // 3. If still not ready, search backward for the closest loaded frame
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let i = frameIndex - 1; i >= 1; i--) {
          const fallback = frameCacheRef.current.get(i);
          if (fallback && fallback.complete && fallback.naturalWidth > 0) {
            img = fallback;
            break;
          }
        }
      }

      // 4. If still not ready, search forward
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let i = frameIndex + 1; i <= frameCount; i++) {
          const fallback = frameCacheRef.current.get(i);
          if (fallback && fallback.complete && fallback.naturalWidth > 0) {
            img = fallback;
            break;
          }
        }
      }

      // CRITICAL: If no image is ready at all, RETURN IMMEDIATELY.
      // NEVER CLEAR THE CANVAS TO BLACK!
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Development console logging for inspection (Requirement #19)
      if (import.meta.env?.DEV) {
        console.log(
          `[ScrollFrameSequence] frame path: ${framePath}, frame count: ${frameCount}, requested frame: ${frameIndex}, last rendered frame: ${lastRenderedFrameRef.current}`
        );
      }

      lastRenderedFrameRef.current = frameIndex;
      currentRenderedFrameRef.current = frameIndex;

      // Cover Calculation to avoid any black bars or image stretching
      const cw = canvas.width;
      const ch = canvas.height;
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;

      const scale = Math.max(cw / nw, ch / nh);
      const drawW = nw * scale;
      const drawH = nh * scale;
      const drawX = (cw - drawW) / 2;
      const drawY = (ch - drawH) / 2;

      // Directly draw over canvas without clearRect to prevent black gaps
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    [frameCount, framePath]
  );

  // Frame Loading with Cache
  const loadSingleFrame = useCallback(
    (index: number): Promise<HTMLImageElement | null> => {
      if (frameCacheRef.current.has(index)) {
        return Promise.resolve(frameCacheRef.current.get(index)!);
      }

      if (loadPromisesRef.current.has(index)) {
        return loadPromisesRef.current.get(index)!;
      }

      const promise = new Promise<HTMLImageElement | null>((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(index);

        img.onload = () => {
          if (isDestroyedRef.current) {
            resolve(null);
            return;
          }
          frameCacheRef.current.set(index, img);
          setLoadedCount((prev) => prev + 1);

          // If frame 1 just loaded, draw it immediately
          if (index === 1 && lastRenderedFrameRef.current === 1) {
            drawFrame(1);
          } else if (index === targetFrameRef.current) {
            drawFrame(index);
          }

          resolve(img);
        };

        img.onerror = () => {
          // If prefixed fails, try un-prefixed alias
          if (prefix) {
            const fallbackImg = new Image();
            fallbackImg.src = `${framePath}/${String(index).padStart(padding, "0")}.${extension}`;
            fallbackImg.onload = () => {
              if (isDestroyedRef.current) {
                resolve(null);
                return;
              }
              frameCacheRef.current.set(index, fallbackImg);
              setLoadedCount((prev) => prev + 1);
              if (index === 1) drawFrame(1);
              resolve(fallbackImg);
            };
            fallbackImg.onerror = () => resolve(null);
          } else {
            resolve(null);
          }
        };
      });

      loadPromisesRef.current.set(index, promise);
      return promise;
    },
    [getFrameUrl, drawFrame, prefix, framePath, padding, extension]
  );

  // Prioritize frames around current scroll position
  const prioritizeWindow = useCallback(
    (center: number, radius = 20) => {
      const start = Math.max(1, center - radius);
      const end = Math.min(frameCount, center + radius);
      for (let i = start; i <= end; i++) {
        if (!frameCacheRef.current.has(i) && !loadPromisesRef.current.has(i)) {
          loadSingleFrame(i);
        }
      }
    },
    [frameCount, loadSingleFrame]
  );

  // Progressive Preloading Orchestration
  useEffect(() => {
    isDestroyedRef.current = false;

    // Phase 1: Immediately load first 10 frames
    const initialBatch = Array.from({ length: Math.min(10, frameCount) }, (_, i) => i + 1);
    Promise.all(initialBatch.map(loadSingleFrame)).then(() => {
      if (isDestroyedRef.current) return;

      // Phase 2: Load keyframes across entire sequence
      const keyframes: number[] = [];
      const step = Math.max(1, Math.floor(frameCount / 24));
      for (let i = 1; i <= frameCount; i += step) {
        keyframes.push(i);
      }
      if (!keyframes.includes(frameCount)) keyframes.push(frameCount);

      Promise.all(keyframes.map(loadSingleFrame)).then(() => {
        if (isDestroyedRef.current) return;

        // Phase 3: Background preload of remaining frames
        const remaining: number[] = [];
        for (let i = 1; i <= frameCount; i++) {
          if (!frameCacheRef.current.has(i)) {
            remaining.push(i);
          }
        }

        const chunkSize = 10;
        let chunkIndex = 0;

        const loadNextChunk = () => {
          if (isDestroyedRef.current || chunkIndex * chunkSize >= remaining.length) return;
          const slice = remaining.slice(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize);
          chunkIndex++;
          Promise.all(slice.map(loadSingleFrame)).then(() => {
            if (!isDestroyedRef.current) {
              setTimeout(loadNextChunk, 25);
            }
          });
        };

        loadNextChunk();
      });
    });

    return () => {
      isDestroyedRef.current = true;
    };
  }, [frameCount, loadSingleFrame]);

  // Canvas Resize Handler using DPR
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

      drawFrame(lastRenderedFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // RequestAnimationFrame Render Loop
  const requestRender = useCallback(() => {
    if (animFrameIdRef.current !== null) return;

    animFrameIdRef.current = requestAnimationFrame(() => {
      animFrameIdRef.current = null;

      const target = targetFrameRef.current;
      const current = currentRenderedFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) >= 0.05) {
        // Smooth frame interpolation
        const next = current + diff * 0.45;
        const rounded = Math.round(next);
        drawFrame(rounded);

        // If not settled yet, keep animating
        if (Math.abs(target - next) >= 0.05) {
          requestRender();
        }
      } else {
        drawFrame(target);
      }
    });
  }, [drawFrame]);

  // Scroll Listener
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
          const totalDistance = rect.height - window.innerHeight;

          if (totalDistance <= 0) {
            ticking = false;
            return;
          }

          const currentScrolled = -rect.top;
          const progress = Math.max(0, Math.min(1, currentScrolled / totalDistance));

          const calculatedFrame = Math.min(
            frameCount,
            Math.max(1, Math.floor(progress * (frameCount - 1)) + 1)
          );

          targetFrameRef.current = calculatedFrame;
          prioritizeWindow(calculatedFrame, 15);
          requestRender();

          // Update lighter state for text overlays
          setScrollProgress(progress);
          setActiveFrame(calculatedFrame);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [frameCount, prioritizeWindow, requestRender]);

  return (
    <section
      id={id}
      ref={containerRef}
      className="sequence-section relative w-full bg-[#0A0A0C]"
      style={{ height: containerHeight }}
    >
      {/* Sticky Stage: 100vh Full Viewport with dvh support */}
      <div className="sticky-stage sticky top-0 left-0 w-full h-screen h-[100dvh] overflow-hidden bg-[#0A0A0C]">
        {/* Instant Fallback Poster (guarantees frame 1 is visible immediately on load, never black) */}
        <img
          src={`${framePath}/${prefix}001.${extension}`}
          alt="Ansari Fabric Atelier"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          loading="eager"
        />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block object-cover z-0"
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C]/50 z-10" />

        {/* Overlay Content (Children) */}
        {children && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {children({
              progress: scrollProgress,
              currentFrame: activeFrame,
              loadedCount,
              frameCount,
            })}
          </div>
        )}

        {/* Development Debug HUD */}
        {showDebug && (
          <div className="hidden md:flex absolute top-24 left-6 z-30 pointer-events-none bg-black/80 border border-[#D4AF37]/40 px-3 py-1.5 rounded text-[10px] font-mono text-[#F3E8D2] items-center space-x-3 backdrop-blur-md shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
            <span>
              Frame: {activeFrame} / {frameCount}
            </span>
            <span className="text-white/40">•</span>
            <span>Loaded: {loadedCount}</span>
            <span className="text-white/40">•</span>
            <span>{Math.round(scrollProgress * 100)}%</span>
          </div>
        )}
      </div>
    </section>
  );
};
