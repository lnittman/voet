'use client';

import * as React from 'react';
import styles from '@components/page/root.module.scss';
import ActionListItem from '@components/ActionListItem';
import DropdownMenu from '@components/DropdownMenu';
import PixelArt from '@components/PixelArt';
import { useTheme } from '@components/ThemeProvider';

const MENU_ITEMS = [
  { icon: '⊹', children: 'docs', href: '#' },
  { icon: '⊹', children: 'api', href: '#' },
  { icon: '⊹', children: 'github', href: '#' },
  { icon: '⊹', children: 'support', href: '#' }
];

const Footer: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const themeItems = [
    { 
      icon: '☀️', 
      children: 'light',
      onClick: () => setTheme('light')
    },
    { 
      icon: '🌙', 
      children: 'dark',
      onClick: () => setTheme('dark')
    },
    { 
      icon: '🌿', 
      children: 'grass',
      onClick: () => setTheme('grass')
    }
  ];

  return (
    <div className={styles.footer}>
      <div className={styles.footerLeft}>
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
          />
        )}
      </div>
      <div className={styles.footerCenter}>
        <PixelArt
          src="/app-icon.png"
          alt="App icon"
          pixelSize={4}
          width={32}
          height={32}
        />
      </div>
      <div className={styles.footerRight}>
        {!isThemeMenuOpen && (
          <ActionListItem 
            icon="⚙️" 
            onClick={() => setIsThemeMenuOpen(true)}
          >
            theme
          </ActionListItem>
        )}
        {isThemeMenuOpen && (
          <DropdownMenu
            items={themeItems}
            onClose={() => setIsThemeMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Footer; 