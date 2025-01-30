'use client';

import * as React from 'react';

interface DynamicFaviconProps {
  images: { src: string; alt: string }[];
}

const FAVICON_SIZE = 32;
const ROTATION_INTERVAL = 5000; // 5 seconds
const PIXEL_SIZE = 2; // Size of each pixel block

const DynamicFavicon: React.FC<DynamicFaviconProps> = ({ images }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const updateFavicon = React.useCallback(async (imageSrc: string) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = FAVICON_SIZE;
    canvas.height = FAVICON_SIZE;

    // Clear canvas
    ctx.clearRect(0, 0, FAVICON_SIZE, FAVICON_SIZE);

    // Load image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    try {
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageSrc;
      });

      // Calculate aspect ratio preserving dimensions
      const scale = Math.min(FAVICON_SIZE / img.width, FAVICON_SIZE / img.height);
      const scaledWidth = Math.round(img.width * scale);
      const scaledHeight = Math.round(img.height * scale);
      const x = (FAVICON_SIZE - scaledWidth) / 2;
      const y = (FAVICON_SIZE - scaledHeight) / 2;

      // Draw scaled image centered
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

      // Get image data for pixelation
      const imageData = ctx.getImageData(0, 0, FAVICON_SIZE, FAVICON_SIZE);
      const data = imageData.data;

      // Clear canvas for pixelation
      ctx.clearRect(0, 0, FAVICON_SIZE, FAVICON_SIZE);

      // Apply pixelation effect
      for (let y = 0; y < FAVICON_SIZE; y += PIXEL_SIZE) {
        for (let x = 0; x < FAVICON_SIZE; x += PIXEL_SIZE) {
          const i = (y * FAVICON_SIZE + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          if (a > 0) { // Only draw non-transparent pixels
            ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
            ctx.fillRect(
              Math.round(x), 
              Math.round(y), 
              PIXEL_SIZE, 
              PIXEL_SIZE
            );
          }
        }
      }

      // Update favicon
      const existingLink = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      const link = existingLink || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = canvas.toDataURL();
      if (!existingLink) {
        document.head.appendChild(link);
      }
    } catch (error) {
      console.error('Error updating favicon:', error);
    }
  }, []);

  React.useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [images.length]);

  React.useEffect(() => {
    if (!images.length) return;
    updateFavicon(images[currentIndex].src);
  }, [currentIndex, images, updateFavicon]);

  return (
    <canvas
      ref={canvasRef}
      width={FAVICON_SIZE}
      height={FAVICON_SIZE}
      style={{ display: 'none' }}
    />
  );
};

export default DynamicFavicon; 