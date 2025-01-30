import styles from '@components/DropdownMenu.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import ActionButton from '@components/ActionButton';
import ActionListItem from '@components/ActionListItem';
import ModalTrigger from '@components/ModalTrigger';

import { useHotkeys } from '@/modules/hotkeys';

interface DropdownMenuItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  target?: string;
  onClick?: () => void;
  modal?: any;
  modalProps?: Record<string, unknown>;
  submenu?: DropdownMenuItemProps[];
}

interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: (event?: MouseEvent | TouchEvent | KeyboardEvent) => void;
  items?: DropdownMenuItemProps[];
  onItemClick?: (item: DropdownMenuItemProps) => void;
  level?: number;
}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>((props, ref) => {
  const { onClose, items, style, onItemClick, level = 0, ...rest } = props;
  const [activeSubmenu, setActiveSubmenu] = React.useState<number | null>(null);

  const handleHotkey = () => {
    if (onClose) onClose();
  };

  useHotkeys('space', handleHotkey);

  const handleItemClick = (item: DropdownMenuItemProps, index: number) => {
    if (item.submenu) {
      setActiveSubmenu(activeSubmenu === index ? null : index);
      return;
    }

    if (onItemClick) {
      onItemClick(item);
    } else if (item.onClick) {
      item.onClick();
    }

    if (!item.submenu && onClose) {
      onClose();
    }
  };

  return (
    <div 
      ref={ref} 
      className={Utilities.classNames(
        styles.root,
        level > 0 && styles.submenu
      )} 
      style={style} 
      {...rest}
    >
      {items &&
        items.map((each, index) => {
          if (each.modal) {
            return (
              <ModalTrigger key={`action-items-${index}`} modal={each.modal} modalProps={each.modalProps}>
                <ActionListItem children={each.children} icon={each.icon} />
              </ModalTrigger>
            );
          }

          return (
            <React.Fragment key={`action-items-${index}`}>
              <ActionListItem
                children={each.children}
                icon={each.icon}
                href={each.href}
                target={each.target}
                onClick={() => handleItemClick(each, index)}
                isActive={activeSubmenu === index}
              />
              {each.submenu && activeSubmenu === index && (
                <DropdownMenu
                  items={each.submenu}
                  onItemClick={onItemClick}
                  onClose={onClose}
                  level={level + 1}
                />
              )}
            </React.Fragment>
          );
        })}

      {level === 0 && (
        <footer className={styles.footer}>
          Press space to{' '}
          <ActionButton
            hotkey="␣"
            onClick={() => {
              if (onClose) onClose();
            }}
          >
            Close
          </ActionButton>
        </footer>
      )}
    </div>
  );
});

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
