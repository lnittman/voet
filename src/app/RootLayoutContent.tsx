'use client';

import * as React from 'react';
import Link from 'next/link';
import styles from '@components/page/root.module.scss';
import { useTheme } from '@components/ThemeProvider';
import { HotkeysProvider } from '@modules/hotkeys/hotkeys-provider';
import ActionListItem from '@components/ActionListItem';
import DropdownMenu from '@components/DropdownMenu';
import PixelArt from '@components/PixelArt';
import CommandPalette from '@components/CommandPalette';
import useHotkeys from '@modules/hotkeys/use-hotkeys';

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

export default function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const [isCmdkOpen, setIsCmdkOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { setTheme } = useTheme();

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

  useHotkeys('space', (e) => {
    e.preventDefault();
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, { enabled: isMenuOpen });

  const handleMenuItemClick = (item: any) => {
    if (item.submenu) {
      return; // Allow submenu to open naturally
    } else if (item.href) {
      // Handle links
      window.open(item.href, '_blank');
      setIsMenuOpen(false);
    } else if (item.children && typeof item.children === 'string') {
      // Handle theme selection
      setTheme(item.children as 'light' | 'dark' | 'solarized' | 'grass' | 'dusk' | 'ocean' | 'sepia' | 'nord');
      setIsMenuOpen(false);
    }
  };

  return (
    <HotkeysProvider>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Link href="/" className={styles.logo}>voet</Link>
          </div>
          <div className={styles.headerCenter}>
            {/* Breadcrumbs will be handled by individual pages */}
          </div>
          <div className={styles.headerRight}>
            <span className={styles.command} onClick={() => setIsCmdkOpen(true)}>command</span>
          </div>
        </div>

        <main className={styles.main}>
          {children}
        </main>

        <div className={styles.footer}>
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
                items={MENU_ITEMS}
                onClose={() => setIsMenuOpen(false)}
                onItemClick={handleMenuItemClick}
              />
            )}
          </div>
          <div className={styles.pixelArtContainer}>
            <PixelArt
              src="/app-icon.png"
              alt="pixel art icon"
              pixelSize={6}
              width={48}
              height={48}
            />
          </div>
        </div>

        {isCmdkOpen && (
          <CommandPalette
            isOpen={isCmdkOpen}
            onClose={() => setIsCmdkOpen(false)}
          />
        )}
      </div>
    </HotkeysProvider>
  );
} 