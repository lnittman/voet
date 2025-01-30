'use client';

import * as React from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import styles from '@components/CommandPalette.module.scss';
import { useTheme } from '@components/ThemeProvider';
import { useModals } from '@components/page/ModalContext';
import ModalFeedback from '@components/modals/ModalFeedback';

const LEAGUES = [
  { name: 'Premier League', path: '/england/premier-league' },
  { name: 'La Liga', path: '/spain/la-liga' },
  { name: 'Bundesliga', path: '/germany/bundesliga' },
  { name: 'Serie A', path: '/italy/serie-a' },
  { name: 'Ligue 1', path: '/france/ligue-1' }
];

const THEMES = [
  'light',
  'dark',
  'grass',
  'dusk',
  'solarized',
  'ocean',
  'sepia',
  'nord'
] as const;

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { open } = useModals();
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        isOpen ? onClose() : onClose();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, onClose]);

  const handleThemeChange = (theme: typeof THEMES[number]) => {
    setTheme(theme);
    onClose();
  };

  const handleLeagueSelect = (path: string) => {
    router.push(path);
    onClose();
  };

  const openFeedback = () => {
    open(ModalFeedback, {});
    onClose();
  };

  const handleSelect = (callback: () => void) => {
    callback();
    onClose();
  };

  return (
    <Command.Dialog
      open={isOpen}
      onOpenChange={onClose}
      className={styles.dialog}
      label="Global Command Menu"
    >
      <Command.Input 
        className={styles.input} 
        placeholder="Type a command or search..."
        value={search}
        onValueChange={setSearch}
      />
      <Command.List className={styles.list}>
        <Command.Empty className={styles.empty}>No results found.</Command.Empty>
        
        <Command.Group heading="Leagues" className={styles.group}>
          {LEAGUES.map((league) => (
            <Command.Item 
              key={league.path} 
              className={styles.item} 
              onSelect={() => handleSelect(() => router.push(league.path))}
            >
              {league.name}
              <span className={styles.shortcut}>enter</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Theme" className={styles.group}>
          {THEMES.map((theme) => (
            <Command.Item 
              key={theme} 
              className={styles.item} 
              onSelect={() => handleSelect(() => setTheme(theme))}
            >
              {theme}
              <span className={styles.shortcut}>enter</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Actions" className={styles.group}>
          <Command.Item 
            className={styles.item} 
            onSelect={() => handleSelect(() => router.push('/transfers'))}
          >
            View All Transfers
            <span className={styles.shortcut}>T</span>
          </Command.Item>
          <Command.Item 
            className={styles.item} 
            onSelect={() => handleSelect(() => router.push('/players'))}
          >
            Top Players
            <span className={styles.shortcut}>P</span>
          </Command.Item>
          <Command.Item 
            className={styles.item} 
            onSelect={() => handleSelect(() => router.push('/tables'))}
          >
            League Tables
            <span className={styles.shortcut}>L</span>
          </Command.Item>
          <Command.Item 
            className={styles.item} 
            onSelect={() => handleSelect(() => open(ModalFeedback, {}))}
          >
            Help & Feedback
            <span className={styles.shortcut}>H</span>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
};

export default CommandPalette; 