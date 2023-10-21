import { FC, useMemo } from "react";
import styles from "./time-splitter.module.scss";

type TimeSplitterProps = {
  time: Date;
};

const TimeSplitter: FC<TimeSplitterProps> = ({ time }) => {
  const timeStr = useMemo(() => {
    const now = Date.now();
    const diff = (now - time.getTime()) / 1000;

    if (diff < 3_600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
    if (diff < 86_400) {
      const hours = Math.floor(diff / 3_600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(diff / 86_400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }, [time]);

  return (
    <div className={styles.splitter}>
      <span>{timeStr}</span>
    </div>
  );
};

export default TimeSplitter;
