const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const SIZES = [32, 180, 192, 512];

function generateIcon(size: number): Buffer {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Clear canvas
  ctx.clearRect(0, 0, size, size);

  // Draw soccer ball emoji with large font
  ctx.font = `${size}px Arial`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText('⚽', size / 2, size / 2);

  // Apply pixelation effect
  const imageData = ctx.getImageData(0, 0, size, size);
  const pixelSize = Math.max(2, Math.floor(size / 32)); // Scale pixel size with image size

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

  return canvas.toBuffer('image/png');
}

// Create public directory if it doesn't exist
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Generate icons in different sizes
SIZES.forEach(size => {
  const buffer = generateIcon(size);
  const filename = size === 32 ? 'app-icon.png' : `app-icon-${size}.png`;
  fs.writeFileSync(path.join(publicDir, filename), buffer);
  console.log(`Generated ${filename}`);
}); 
