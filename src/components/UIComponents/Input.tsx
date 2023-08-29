import { UIType } from '../../types/UITypes';
import { FC, InputHTMLAttributes } from 'react';
import styles from '../../styles/UI.module.scss';

interface InputIProps extends InputHTMLAttributes<HTMLInputElement>, UIType {
  width?: string;
}

export const Input: FC<InputIProps> = ({ onChange, value, variant, placeholder, type, children, width }) => {
  return (
    <div style={{ width: `${width}px` }} className={`${styles[`input_${variant}`]} ${styles.ownInput__container}`}>
      {children}
      <input
        className={`${styles[`input_${variant}`]} ${styles.ownInput}`}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
