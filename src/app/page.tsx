'use client';

import * as React from 'react';
import styles from '@components/page/root.module.scss';
import DefaultLayout from '@components/page/DefaultLayout';
import LeagueSelector from '@components/LeagueSelector';
import CommandPalette from '@components/CommandPalette';
import PixelHero from '@components/PixelHero';
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
  }
];

export default function Home() {
  const [isCmdkOpen, setIsCmdkOpen] = React.useState(false);
  const [selectedLeague, setSelectedLeague] = React.useState<string | null>(null);

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
          <PixelHero images={FOOTBALL_IMAGES} pixelSize={8} />

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
