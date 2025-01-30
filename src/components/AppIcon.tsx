'use client';

import * as React from 'react';
import PixelArt from '@components/PixelArt';

interface AppIconProps {
  size?: number;
}

const AppIcon: React.FC<AppIconProps> = ({ size = 32 }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw soccer ball emoji with large font
    ctx.font = `${size}px Arial`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText('⚽', size / 2, size / 2);

    // Apply pixelation effect
    const imageData = ctx.getImageData(0, 0, size, size);
    const pixelSize = 2; // Size of each pixel block
    
    for (let y = 0; y < size; y += pixelSize) {
      for (let x = 0; x < size; x += pixelSize) {
        // Get the color of the first pixel in the block
        const i = (y * size + x) * 4;
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const a = imageData.data[i + 3];

        // Fill the entire block with this color
        ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    }
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
};

export default AppIcon; 