'use client';

import * as React from 'react';
import styles from '@components/page/root.module.scss';
import Link from 'next/link';

import DefaultLayout from '@components/page/DefaultLayout';
import LeagueSelector from '@components/LeagueSelector';
import BreadCrumbs from '@components/BreadCrumbs';
import CommandPalette from '@components/CommandPalette';
import PixelArt from '@components/PixelArt';
import ActionListItem from '@components/ActionListItem';
import DropdownMenu from '@components/DropdownMenu';
import useHotkeys from '@modules/hotkeys/use-hotkeys';
import { HotkeysProvider } from '@modules/hotkeys/hotkeys-provider';
import { useTheme } from '@components/ThemeProvider';

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

const MENU_ITEMS = [
  { icon: '⊹', children: 'docs', href: '#' },
  { icon: '⊹', children: 'api', href: '#' },
  { icon: '⊹', children: 'github', href: '#' },
  { icon: '⊹', children: 'support', href: '#' },
  { 
    icon: '⊹', 
    children: 'theme',
    submenu: [
      { icon: '⊹', children: 'light' },
      { icon: '⊹', children: 'dark' },
      { icon: '⊹', children: 'grass' },
      { icon: '⊹', children: 'dusk' },
      { icon: '⊹', children: 'solarized' },
      { icon: '⊹', children: 'ocean' },
      { icon: '⊹', children: 'sepia' },
      { icon: '⊹', children: 'nord' }
    ]
  }
];

interface League {
  name: string;
  country: string;
}

const LEAGUES: Record<string, League> = {
  'eng.1': { name: 'premier league', country: 'england' },
  'esp.1': { name: 'la liga', country: 'spain' },
  'ger.1': { name: 'bundesliga', country: 'germany' },
  'ita.1': { name: 'serie a', country: 'italy' },
  'fra.1': { name: 'ligue 1', country: 'france' },
};

export default function Home() {
  const [isCmdkOpen, setIsCmdkOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedLeague, setSelectedLeague] = React.useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const { setTheme } = useTheme();
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % FOOTBALL_IMAGES.length);
    }, 6000);

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

  const breadcrumbItems = [
    { name: 'home', url: '/' },
    ...(selectedLeague && LEAGUES[selectedLeague] 
      ? [{ name: LEAGUES[selectedLeague].name, url: `/league/${selectedLeague}` }] 
      : []),
  ];

  // Add hotkey for closing menu with space
  useHotkeys('space', (e) => {
    e.preventDefault();
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, { enabled: isMenuOpen });

  const handleMenuItemClick = (item: any) => {
    if (item.submenu) {
      setActiveSubmenu(activeSubmenu === item.children ? null : item.children);
    } else if (activeSubmenu === 'theme') {
      setTheme(item.children as 'light' | 'dark' | 'solarized' | 'grass');
      setActiveSubmenu(null);
      setIsMenuOpen(false);
    }
  };

  const getMenuItems = () => {
    if (activeSubmenu === 'theme') {
      return MENU_ITEMS.find(item => item.children === 'theme')?.submenu || [];
    }
    return MENU_ITEMS;
  };

  return (
    <HotkeysProvider>
      <DefaultLayout previewPixelSRC="/app-icon.png">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Link href="/" className={styles.logo}>voet</Link>
          </div>
          <div className={styles.headerCenter}>
            <BreadCrumbs items={breadcrumbItems} />
          </div>
          <div className={styles.headerRight}>
            <span className={styles.command} onClick={() => setIsCmdkOpen(true)}>command</span>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.mainContent}>
            <div className={styles.leftContent}>
              <LeagueSelector onSelectLeague={handleLeagueSelect} />
            </div>
            <div className={styles.rightContent}>
              {FOOTBALL_IMAGES.map((image, index) => (
                <div
                  key={image.src}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: index === currentImageIndex ? 'block' : 'none'
                  }}
                >
                  <PixelArt
                    src={image.src}
                    alt={image.alt}
                    pixelSize={6}
                    width={480}
                    height={270}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.menuContainer}>
            {!isMenuOpen && (
              <ActionListItem 
                icon="⊹" 
                onClick={() => setIsMenuOpen(true)}
              >
                menu
              </ActionListItem>
            )}
            {isMenuOpen && (
              <DropdownMenu
                items={getMenuItems()}
                onClose={() => {
                  setIsMenuOpen(false);
                  setActiveSubmenu(null);
                }}
                onItemClick={handleMenuItemClick}
              />
            )}
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
