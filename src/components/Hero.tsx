'use client';

import * as React from 'react';
import styles from '@components/Hero.module.scss';
import PixelArt from '@components/PixelArt';

const FOOTBALL_IMAGES = [
  {
    src: '/images/hero/zidane-2006.jpg',
    alt: 'zidane headbutt moment - 2006 world cup final'
  },
  {
    src: '/images/hero/iniesta-2010.jpg',
    alt: 'iniesta world cup winning goal - 2010'
  },
  {
    src: '/images/hero/gotze-2014.jpg',
    alt: 'götze world cup winning goal - 2014'
  },
  {
    src: '/images/hero/messi-2022.jpg',
    alt: 'messi lifting world cup - 2022'
  }
];

interface HeroProps {
  title: string;
  description: string;
}

const Hero: React.FC<HeroProps> = ({ title, description }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % FOOTBALL_IMAGES.length);
    }, 6000); // Slightly longer duration to read the moments

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.visual}>
        <div className={styles.imageContainer}>
          {FOOTBALL_IMAGES.map((image, index) => (
            <div
              key={image.src}
              className={styles.imageWrapper}
              style={{
                opacity: index === currentImageIndex ? 1 : 0,
                transition: 'opacity 1s ease-in-out'
              }}
            >
              <PixelArt
                src={image.src}
                alt={image.alt}
                pixelSize={4}
                width={640}
                height={360}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero; 