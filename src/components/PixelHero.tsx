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
  const [totalWidth, setTotalWidth] = React.useState(0);

  const height = 240; // Fixed height for all images

  const drawImages = React.useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // First pass: load images and calculate base widths
    const imagePromises = images.map(async (image) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = image.src;
      });
      const aspectRatio = img.width / img.height;
      const baseWidth = Math.round(height * aspectRatio);
      return { img, baseWidth, aspectRatio };
    });

    const loadedImages = await Promise.all(imagePromises);
    const baseWidth = loadedImages.reduce((sum, { baseWidth }) => sum + baseWidth, 0);
    
    // Calculate scale factor to ensure minimum width
    const minWidth = window.innerWidth;
    const scale = Math.max(1, minWidth / baseWidth);
    const actualWidth = Math.max(baseWidth, minWidth);
    
    // Set canvas size
    canvas.width = actualWidth;
    canvas.height = height;
    setTotalWidth(actualWidth);

    // Clear canvas
    ctx.clearRect(0, 0, actualWidth, height);

    // Draw images sequentially without gaps
    let currentX = 0;
    loadedImages.forEach(({ img, baseWidth, aspectRatio }) => {
      const scaledWidth = Math.round(baseWidth * scale);
      const scaledHeight = height;
      ctx.drawImage(img, currentX, 0, scaledWidth, scaledHeight);
      currentX += scaledWidth;
    });

    // Apply pixelation effect
    const imageData = ctx.getImageData(0, 0, actualWidth, height);
    const data = imageData.data;
    ctx.clearRect(0, 0, actualWidth, height);

    // Scale pixel size with viewport
    const adjustedPixelSize = Math.max(pixelSize, Math.floor(scale * pixelSize));

    for (let y = 0; y < height; y += adjustedPixelSize) {
      for (let x = 0; x < actualWidth; x += adjustedPixelSize) {
        const i = (y * actualWidth + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a > 0) {
          ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
          ctx.fillRect(
            Math.round(x),
            Math.round(y),
            adjustedPixelSize,
            adjustedPixelSize
          );
        }
      }
    }
  }, [images, pixelSize, height]);

  // Handle window resize
  React.useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    let lastWidth = window.innerWidth;

    const handleResize = () => {
      // Debounce resize events
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const container = containerRef.current;
        if (!container) return;
        
        const newWidth = window.innerWidth;
        const isWidthChange = newWidth !== lastWidth;
        lastWidth = newWidth;

        if (isWidthChange) {
          // Calculate scroll percentage before resize
          const scrollPercentage = container.scrollLeft / (totalWidth - container.clientWidth);
          
          // Redraw images
          drawImages().then(() => {
            // Restore scroll position by percentage
            if (container && totalWidth > container.clientWidth) {
              const newScrollLeft = scrollPercentage * (totalWidth - container.clientWidth);
              container.scrollLeft = newScrollLeft;
              setScrollPosition(newScrollLeft);
            }
          });
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [drawImages, totalWidth]);

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
    <>
      <div className={styles.spacer} />
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
    </>
  );
};

export default PixelHero; 