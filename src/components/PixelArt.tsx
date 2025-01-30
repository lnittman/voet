'use client';

import * as React from 'react';
import styles from '@components/PixelArt.module.scss';

interface PixelArtProps {
  src: string;
  alt?: string;
  pixelSize?: number;
  width?: number;
  height?: number;
}

const PixelArt: React.FC<PixelArtProps> = ({
  src,
  alt = '',
  pixelSize = 8,
  width = 320,
  height = 180
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Calculate aspect ratio preserving dimensions
      const scale = Math.min(width / img.width, height / img.height);
      const scaledWidth = Math.round(img.width * scale);
      const scaledHeight = Math.round(img.height * scale);
      const x = (width - scaledWidth) / 2;
      const y = (height - scaledHeight) / 2;

      // Set canvas size
      canvas.width = width;
      canvas.height = height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw original image centered
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

      // Get image data
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // Clear canvas again
      ctx.clearRect(0, 0, width, height);

      // Draw pixelated version
      for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
          // Get the color of the first pixel in each block
          const pixelIndex = (y * width + x) * 4;
          const r = data[pixelIndex];
          const g = data[pixelIndex + 1];
          const b = data[pixelIndex + 2];
          const a = data[pixelIndex + 3];

          if (a > 0) { // Only draw non-transparent pixels
            ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
            ctx.fillRect(x, y, pixelSize, pixelSize);
          }
        }
      }
    };

    img.onerror = () => {
      setError(true);
      console.error('Error loading image:', src);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, pixelSize, width, height]);

  if (error) {
    return <div className={styles.container} aria-label={`Error loading ${alt}`} />;
  }

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={width}
        height={height}
        aria-label={alt}
      />
    </div>
  );
};

export default PixelArt; 