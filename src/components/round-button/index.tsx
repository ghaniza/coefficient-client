import styles from "./round-button.module.scss";

type RoundButtonProps = {
  color?: "primary" | "secondary" | "tertiary" | "none";
  onClick?: () => void;
};

const RoundButton: WithChildren<RoundButtonProps> = ({
  children,
  color,
  onClick,
}) => {
  const handleOnClick = () => {
    onClick && onClick();
  };

  return (
    <button
      className={`${styles.roundButton} ${styles[color ?? "primary"]}`}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};

export default RoundButton;
