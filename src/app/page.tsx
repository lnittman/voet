'use client';

import * as React from 'react';
import styles from '@components/page/root.module.scss';
import DefaultLayout from '@components/page/DefaultLayout';
import LeagueSelector from '@components/LeagueSelector';
import CommandPalette from '@components/CommandPalette';
import PixelArt from '@components/PixelArt';
import { HotkeysProvider } from '@modules/hotkeys/hotkeys-provider';

const FOOTBALL_IMAGES = [
  {
    src: '/images/hero/henry.jpeg',
    alt: 'thierry henry iconic celebration'
  },
  {
    src: '/images/hero/messi.jpeg',
    alt: 'lionel messi iconic dribble'
  },
  {
    src: '/images/hero/zidane.jpeg',
    alt: 'zinedine zidane masterclass'
  },
  {
    src: '/images/hero/brazil.jpg',
    alt: 'brazil iconic celebration'
  },
  {
    src: '/images/hero/alonso.jpeg',
    alt: 'xabi alonso midfield control'
  },
  {
    src: '/images/hero/nl.jpeg',
    alt: 'netherlands total football'
  },
];

export default function Home() {
  const [isCmdkOpen, setIsCmdkOpen] = React.useState(false);
  const [selectedLeague, setSelectedLeague] = React.useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % FOOTBALL_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCmdkOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleLeagueSelect = (leagueId: string) => {
    setSelectedLeague(leagueId);
  };

  return (
    <HotkeysProvider>
      <DefaultLayout previewPixelSRC="/app-icon.png">
        <div className={styles.content}>
          <div className='w-[600px] h-[337.5px] overflow-hidden'>
            {FOOTBALL_IMAGES.map((image, index) => (
              <div
                key={image.src}
                style={{
                  display: index === currentImageIndex ? 'block' : 'none',
                  width: '600px',
                  height: '337.5px'
                }}
              >
                <PixelArt
                  src={image.src}
                  alt={image.alt}
                  pixelSize={8}
                />
              </div>
            ))}
          </div>

          <div className={styles.selectorSection}>
            <LeagueSelector onSelectLeague={handleLeagueSelect} />
          </div>
        </div>

        {isCmdkOpen && (
          <CommandPalette
            isOpen={isCmdkOpen}
            onClose={() => setIsCmdkOpen(false)}
          />
        )}
      </DefaultLayout>
    </HotkeysProvider>
  );
}
