import { useEffect } from 'react';

type HotkeyCallback = (event: KeyboardEvent) => void;

export function useHotkeys(key: string, callback: HotkeyCallback) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keys = key.toLowerCase().split('+');
      const pressedKey = event.key.toLowerCase();

      // Check for modifier keys
      const hasCtrl = keys.includes('ctrl') && event.ctrlKey;
      const hasShift = keys.includes('shift') && event.shiftKey;
      const hasAlt = keys.includes('alt') && event.altKey;
      const hasMeta = keys.includes('meta') && event.metaKey;

      // Get the main key (last one in the combination)
      const mainKey = keys[keys.length - 1];

      // Check if all conditions match
      if (pressedKey === mainKey) {
        const modifiersMatch = (
          (!keys.includes('ctrl') || hasCtrl) &&
          (!keys.includes('shift') || hasShift) &&
          (!keys.includes('alt') || hasAlt) &&
          (!keys.includes('meta') || hasMeta)
        );

        if (modifiersMatch) {
          event.preventDefault();
          callback(event);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [key, callback]);
} 