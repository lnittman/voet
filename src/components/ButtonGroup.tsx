'use client';

import styles from '@components/ButtonGroup.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import ActionButton from '@components/ActionButton';
import DropdownMenuTrigger from '@components/DropdownMenuTrigger';
import useHotkeys from '@modules/hotkeys/use-hotkeys';

interface ButtonGroupItem {
  body: string;
  onClick?: () => void;
  selected?: boolean;
  items?: ButtonGroupItem[];
  hotkey?: string;
  openHotkey?: string;
}

interface ButtonGroupProps {
  items: ButtonGroupItem[];
  isFull?: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ items, isFull }) => {
  if (!items?.length) return null;

  const selectedIndex = items.findIndex(item => item.selected);

  // Handle Ctrl+Arrow navigation
  useHotkeys('ctrl+left', (e) => {
    e.preventDefault();
    const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : items.length - 1;
    items[prevIndex]?.onClick?.();
  });

  useHotkeys('ctrl+right', (e) => {
    e.preventDefault();
    const nextIndex = selectedIndex < items.length - 1 ? selectedIndex + 1 : 0;
    items[nextIndex]?.onClick?.();
  });

  // Add number shortcuts (Ctrl+1, Ctrl+2, etc.)
  items.forEach((_, index) => {
    useHotkeys(`ctrl+${index + 1}`, (e) => {
      e.preventDefault();
      items[index]?.onClick?.();
    });
  });

  return (
    <div className={Utilities.classNames(styles.root, isFull ? styles.full : null)}>
      {items.map((each, index) => {
        const shortcut = `^${index + 1}`;
        
        if (each.items) {
          return (
            <DropdownMenuTrigger key={each.body} items={each.items} hotkey={each.openHotkey}>
              <ActionButton hotkey={shortcut} isSelected={each.selected}>
                {each.body}
              </ActionButton>
            </DropdownMenuTrigger>
          );
        }

        return (
          <ActionButton 
            key={each.body} 
            onClick={each.onClick} 
            hotkey={shortcut}
            isSelected={each.selected}
          >
            {each.body}
          </ActionButton>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
