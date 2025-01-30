'use client';

import * as React from 'react';
import styles from '@components/PixelHero.module.scss';

interface PixelHeroProps {
  images: { src: string; alt: string }[];
  pixelSize?: number;
}

const PixelHero: React.FC<PixelHeroProps> = ({
  images,
  pixelSize = 8
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = React.useState(0);

  const height = 240; // Fixed height for all images

  const drawImages = React.useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate total width needed based on aspect ratios
    let totalWidth = 0;
    const imagePromises = images.map(async (image) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = image.src;
      });
      const aspectRatio = img.width / img.height;
      const width = Math.round(height * aspectRatio);
      totalWidth += width;
      return { img, width };
    });

    // Load all images and get their dimensions
    const loadedImages = await Promise.all(imagePromises);

    // Set canvas size
    canvas.width = Math.max(totalWidth, window.innerWidth);
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, height);

    // Draw images sequentially without gaps
    let currentX = 0;
    loadedImages.forEach(({ img, width }) => {
      ctx.drawImage(img, currentX, 0, width, height);
      currentX += width;
    });

    // Apply pixelation effect
    const imageData = ctx.getImageData(0, 0, canvas.width, height);
    const data = imageData.data;
    ctx.clearRect(0, 0, canvas.width, height);

    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < canvas.width; x += pixelSize) {
        const i = (y * canvas.width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a > 0) {
          ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
          ctx.fillRect(
            Math.round(x),
            Math.round(y),
            pixelSize,
            pixelSize
          );
        }
      }
    }
  }, [images, pixelSize, height]);

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      drawImages();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawImages]);

  // Initial draw
  React.useEffect(() => {
    drawImages();
  }, [drawImages]);

  // Handle scroll
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollPosition(container.scrollLeft);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={styles.container}
      style={{
        '--scroll-position': `${scrollPosition}px`,
        '--hero-height': `${height}px`
      } as React.CSSProperties}
    >
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        height={height}
      />
    </div>
  );
};

export default PixelHero; 