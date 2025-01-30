'use client';

import * as React from 'react';
import Link from 'next/link';
import styles from '@components/page/root.module.scss';
import { useTheme } from '@components/ThemeProvider';
import { HotkeysProvider } from '@modules/hotkeys/hotkeys-provider';
import ActionListItem from '@components/ActionListItem';
import DropdownMenu from '@components/DropdownMenu';
import CommandPalette from '@components/CommandPalette';
import useHotkeys from '@modules/hotkeys/use-hotkeys';

const MENU_ITEMS = [
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
  },
  { 
    icon: '⊹', 
    children: 'command',
    onClick: () => setIsCmdkOpen(true)
  },
  { icon: '⊹', children: 'account', href: '#' },
  { icon: '⊹', children: 'support', href: '#' }
];

export default function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const [isCmdkOpen, setIsCmdkOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null);
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
      setActiveSubmenu(null);
    }
  }, { enabled: isMenuOpen });

  const handleMenuItemClick = (item: any) => {
    if (item.submenu) {
      setActiveSubmenu(item.children);
    } else if (item.onClick) {
      item.onClick();
      setIsMenuOpen(false);
      setActiveSubmenu(null);
    } else if (item.href) {
      window.open(item.href, '_blank');
      setIsMenuOpen(false);
      setActiveSubmenu(null);
    } else if (item.children && typeof item.children === 'string') {
      if (activeSubmenu === 'theme') {
        setTheme(item.children as 'light' | 'dark' | 'solarized' | 'grass' | 'dusk' | 'ocean' | 'sepia' | 'nord');
      }
      setIsMenuOpen(false);
      setActiveSubmenu(null);
    }
  };

  const getCurrentMenuItems = () => {
    if (activeSubmenu) {
      const parentItem = MENU_ITEMS.find(item => item.children === activeSubmenu);
      return parentItem?.submenu || [];
    }
    return MENU_ITEMS;
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
            {!isMenuOpen && (
              <ActionListItem 
                icon="⊹" 
                onClick={() => setIsMenuOpen(true)}
                className={styles.menuButton}
              >
                menu
              </ActionListItem>
            )}
            {isMenuOpen && (
              <div className={styles.menuDropdown}>
                <DropdownMenu
                  items={getCurrentMenuItems()}
                  onClose={() => {
                    setIsMenuOpen(false);
                    setActiveSubmenu(null);
                  }}
                  onItemClick={handleMenuItemClick}
                />
              </div>
            )}
          </div>
        </div>

        <main className={styles.main}>
          {children}
        </main>

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