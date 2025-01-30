'use client';

import styles from '@components/TreeView.module.scss';
import * as React from 'react';
import useHotkeys from '@modules/hotkeys/use-hotkeys';

interface TreeViewProps {
  children?: React.ReactNode;
  defaultValue?: boolean;
  depth?: number;
  isFile?: boolean;
  isLastChild?: boolean;
  isRoot?: boolean;
  parentLines?: boolean[];
  style?: any;
  title: string;
  onClick?: () => void;
  onToggle?: () => void;
  isFocused?: boolean;
  onNavigate?: (direction: 'up' | 'down') => void;
}

const TreeView: React.FC<TreeViewProps> = ({
  defaultValue = false,
  title,
  children,
  depth = 0,
  isFile = false,
  isRoot = false,
  isLastChild = false,
  style,
  parentLines = [],
  onClick,
  onToggle,
  isFocused,
  onNavigate
}) => {
  const [show, setShow] = React.useState<boolean>(defaultValue);
  const itemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.focus();
      itemRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [isFocused]);

  const handleClick = () => {
    if (isFile && onClick) {
      onClick();
    } else if (onToggle) {
      onToggle();
      setShow(!show);
    } else {
      setShow(!show);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleClick();
    } else if (onNavigate && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      onNavigate(e.key === 'ArrowUp' ? 'up' : 'down');
    }
  };

  const hasChildren = React.Children.count(children) > 0;
  const isEmptyFolder = !isFile && !hasChildren;

  const spacing = parentLines.map((line) => (line ? '│ . ' : '. . ')).join('');
  const endPrefix = isLastChild ? '└───' : '├───';
  const prefix = `${spacing}${endPrefix}`;
  const icon = isFile ? ' ' : show ? '╦ ' : '╤ ';

  const updatedParentLines = [...parentLines, !isLastChild];

  return (
    <div className={styles.root} style={style}>
      <div
        ref={itemRef}
        tabIndex={0}
        role="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`${styles.item} ${isFocused ? styles.focused : ''}`}
        aria-expanded={show}
      >
        {prefix}
        {icon}
        {title}
      </div>
      {show && hasChildren && (
        <div>
          {React.Children.map(children, (child, index) =>
            React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<TreeViewProps>, {
                  depth: depth + 1,
                  isLastChild: index === React.Children.count(children) - 1,
                  parentLines: updatedParentLines,
                })
              : child
          )}
        </div>
      )}
    </div>
  );
};

export default TreeView;
