import styles from '@components/ActionListItem.module.scss';
import * as React from 'react';
import * as Utilities from '@common/utilities';

interface ActionListItemProps {
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
  className?: string;
  isActive?: boolean;
}

const ActionListItem: React.FC<ActionListItemProps> = (props) => {
  const { href, target, onClick, children, icon, style, className, isActive } = props;

  if (href) {
    return (
      <a 
        className={Utilities.classNames(styles.item, className)} 
        href={href} 
        target={target} 
        style={style} 
        tabIndex={0} 
        role="link"
      >
        <figure className={styles.icon}>{icon}</figure>
        <span className={styles.text}>{children}</span>
      </a>
    );
  }

  return (
    <div 
      className={Utilities.classNames(styles.item, className)} 
      onClick={onClick} 
      style={style} 
      tabIndex={0} 
      role="button"
      data-active={isActive}
    >
      <figure className={styles.icon}>{icon}</figure>
      <span className={styles.text}>{children}</span>
    </div>
  );
};

export default ActionListItem;
