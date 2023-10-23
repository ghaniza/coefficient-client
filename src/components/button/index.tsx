"use client";
import styles from "./button.module.scss";
import {useMemo} from "react";

type ButtonProps = {
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'tertiary' | 'none'
};

const Button: WithChildren<ButtonProps> = ({ children, onClick, color }) => {
  const handleOnClick = () => {
    onClick && onClick();
  };

  const classNames = useMemo(() => {
    const classes = [styles.button]

    switch (color) {
      case 'secondary':
        classes.push(styles.secondary);
        break;
      case 'tertiary':
        classes.push(styles.tertiary);
        break;
      case 'none':
        classes.push(styles.none);
        break;
      default:
        classes.push(styles.primary);
        break
    }

    return classes.join(" ");
  }, [color])

  return (
    <button onClick={handleOnClick} className={classNames}>
      {children}
    </button>
  );
};

export default Button;
