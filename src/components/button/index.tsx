"use client";
import styles from "./button.module.scss";

type ButtonProps = {
  onClick?: () => void;
};

const Button: WithChildren<ButtonProps> = ({ children, onClick }) => {
  const handleOnClick = () => {
    onClick && onClick();
  };

  return (
    <button onClick={handleOnClick} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
