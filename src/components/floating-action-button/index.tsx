import { FC, ReactNode, useRef, useState } from "react";
import RoundButton from "../round-button";
import styles from "./floation-action-button.module.scss";

type FloatingActionButtonProps = {
  icon: () => ReactNode;
  actions: {
    title: string;
    icon: () => ReactNode;
    action: () => void;
  }[];
};

const FloatingActionButton: FC<FloatingActionButtonProps> = ({
  icon,
  actions,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const element = event.target as HTMLElement;

    if (containerRef.current && !containerRef.current.contains(element))
      clearOpenState();
  };

  const clearOpenState = () => {
    setOpen(false);
    document.removeEventListener("click", handleClickOutside);
  };

  const handleOnClick = () => {
    if (open) {
      clearOpenState();
      return;
    }

    setOpen(true);
    document.addEventListener("click", handleClickOutside);
  };

  return (
    <div>
      <div ref={containerRef} className={styles.container}>
        {open ? (
          <div className={styles.modal}>
            {actions.map((action) => (
              <RoundButton
                key={action.title}
                color="tertiary"
                onClick={action.action}
              >
                {action.icon()}
              </RoundButton>
            ))}
          </div>
        ) : (
          <></>
        )}
        <RoundButton onClick={handleOnClick}>{icon()}</RoundButton>
      </div>
    </div>
  );
};

export default FloatingActionButton;
