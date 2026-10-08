export interface FrameLoaderOptions {
  framePath: string;
  framePrefix?: string;
  frameCount: number;
  frameExtension: string;
  framePadding: number;
  onProgress?: (progressPercent: number, loadedCount: number) => void;
  onFirstFrameReady?: (firstImage: HTMLImageElement) => void;
}

export class FrameSequenceLoader {
  private options: FrameLoaderOptions;
  private cache: Map<number, HTMLImageElement> = new Map();
  private loadPromises: Map<number, Promise<HTMLImageElement | null>> = new Map();
  private loadedCount = 0;
  private lastValidFrame: HTMLImageElement | null = null;
  private isDestroyed = false;

  constructor(options: FrameLoaderOptions) {
    this.options = {
      framePrefix: "",
      ...options,
    };
  }

  public getFrameUrl(index: number): string {
    const padded = String(index).padStart(this.options.framePadding, "0");
    const prefix = this.options.framePrefix || "";
    return `${this.options.framePath}/${prefix}${padded}.${this.options.frameExtension}`;
  }

  public loadFrame(index: number): Promise<HTMLImageElement | null> {
    if (this.cache.has(index)) {
      return Promise.resolve(this.cache.get(index)!);
    }

    if (this.loadPromises.has(index)) {
      return this.loadPromises.get(index)!;
    }

    const promise = new Promise<HTMLImageElement | null>((resolve) => {
      const img = new Image();
      img.src = this.getFrameUrl(index);

      img.onload = () => {
        if (this.isDestroyed) {
          resolve(null);
          return;
        }
        this.cache.set(index, img);
        this.loadedCount++;
        this.lastValidFrame = img;

        if (index === 1 && this.options.onFirstFrameReady) {
          this.options.onFirstFrameReady(img);
        }

        if (this.options.onProgress) {
          const percent = Math.floor((this.loadedCount / this.options.frameCount) * 100);
          this.options.onProgress(percent, this.loadedCount);
        }

        resolve(img);
      };

      img.onerror = () => {
        if (this.isDestroyed) {
          resolve(null);
          return;
        }
        // Graceful handling of missing frames
        this.loadedCount++;
        if (this.options.onProgress) {
          const percent = Math.floor((this.loadedCount / this.options.frameCount) * 100);
          this.options.onProgress(percent, this.loadedCount);
        }
        resolve(null);
      };
    });

    this.loadPromises.set(index, promise);
    return promise;
  }

  public getFrameSync(index: number): HTMLImageElement | null {
    // 1. Direct hit
    if (this.cache.has(index)) {
      const img = this.cache.get(index)!;
      if (img.complete && img.naturalWidth > 0) {
        this.lastValidFrame = img;
        return img;
      }
    }

    // 2. Look backwards for the closest loaded frame to prevent black gap
    for (let i = index - 1; i >= 1; i--) {
      const fallback = this.cache.get(i);
      if (fallback && fallback.complete && fallback.naturalWidth > 0) {
        this.lastValidFrame = fallback;
        return fallback;
      }
    }

    // 3. Look forward for nearest available frame
    for (let i = index + 1; i <= this.options.frameCount; i++) {
      const fallback = this.cache.get(i);
      if (fallback && fallback.complete && fallback.naturalWidth > 0) {
        this.lastValidFrame = fallback;
        return fallback;
      }
    }

    // 4. Return last valid frame ever rendered
    return this.lastValidFrame;
  }

  public startProgressivePreload() {
    // Step 1: Immediately load frame 1
    this.loadFrame(1).then((firstImg) => {
      if (this.isDestroyed || !firstImg) return;

      // Step 2: Load keyframes distributed across the entire 0-100% scroll range
      const keyframes = [
        1, 10, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240,
      ].filter((n) => n <= this.options.frameCount);

      Promise.all(keyframes.map((k) => this.loadFrame(k))).then(() => {
        if (this.isDestroyed) return;

        // Step 3: Progressive batch loading for all remaining frames
        const remainingIndices: number[] = [];
        for (let i = 1; i <= this.options.frameCount; i++) {
          if (!this.cache.has(i)) {
            remainingIndices.push(i);
          }
        }

        const batchSize = 12;
        let batchIndex = 0;

        const loadNextBatch = () => {
          if (this.isDestroyed || batchIndex * batchSize >= remainingIndices.length) {
            return;
          }
          const batch = remainingIndices.slice(
            batchIndex * batchSize,
            (batchIndex + 1) * batchSize
          );
          batchIndex++;
          Promise.all(batch.map((idx) => this.loadFrame(idx))).then(() => {
            if (!this.isDestroyed) {
              setTimeout(loadNextBatch, 30);
            }
          });
        };

        loadNextBatch();
      });
    });
  }

  public prioritizeFrameRange(centerIndex: number, windowRadius = 15) {
    const min = Math.max(1, centerIndex - windowRadius);
    const max = Math.min(this.options.frameCount, centerIndex + windowRadius);
    for (let i = min; i <= max; i++) {
      if (!this.cache.has(i) && !this.loadPromises.has(i)) {
        this.loadFrame(i);
      }
    }
  }

  public destroy() {
    this.isDestroyed = true;
    this.cache.clear();
    this.loadPromises.clear();
    this.lastValidFrame = null;
  }
}
