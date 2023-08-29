import { FC, ReactNode } from 'react';
import styles from '../../styles/UI.module.scss';
import { UIType } from '../../types/UITypes';

interface ContainerIProps extends UIType {
  children: ReactNode;
  gap: number;
}

export const Container: FC<ContainerIProps> = ({ variant, children, gap }) => {
  return (
    <div style={{ gap: `${gap}px` }} className={`${styles.ownContainer} ${styles[`container_${variant}`]}`}>
      {children}
    </div>
  );
};
