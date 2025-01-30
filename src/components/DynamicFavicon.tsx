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

      // Calculate square crop dimensions
      const size = Math.min(img.width, img.height);
      const x = (img.width - size) / 2;
      const y = (img.height - size) / 2;

      // Draw cropped image
      ctx.drawImage(
        img,
        x, y, size, size, // Source crop
        0, 0, FAVICON_SIZE, FAVICON_SIZE // Destination size
      );

      // Apply pixelation effect
      const imageData = ctx.getImageData(0, 0, FAVICON_SIZE, FAVICON_SIZE);
      ctx.clearRect(0, 0, FAVICON_SIZE, FAVICON_SIZE);

      for (let y = 0; y < FAVICON_SIZE; y += PIXEL_SIZE) {
        for (let x = 0; x < FAVICON_SIZE; x += PIXEL_SIZE) {
          // Get the color of the first pixel in the block
          const i = (y * FAVICON_SIZE + x) * 4;
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          const a = imageData.data[i + 3];

          // Fill the entire block with this color
          ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
          ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
        }
      }

      // Update favicon
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = canvas.toDataURL();
      document.head.appendChild(link);
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