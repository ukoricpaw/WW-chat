import { ButtonHTMLAttributes, FC } from 'react';
import styles from '../../styles/UI.module.scss';
import { UIType } from '../../types/UITypes';

interface ButtonIProps extends ButtonHTMLAttributes<HTMLButtonElement>, UIType {}

export const Button: FC<ButtonIProps> = ({ onClick, disabled, children, variant }) => {
  return (
    <button className={`${styles[`button_${variant}`]} ${styles.ownButton}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
