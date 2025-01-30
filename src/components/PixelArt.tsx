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

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      // Set canvas size to match desired dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw original image
      ctx.drawImage(img, 0, 0, width, height);

      // Get image data
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // Clear canvas
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

          // Draw a rectangle for each pixel block
          ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
      }
    };
  }, [src, pixelSize, width, height]);

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