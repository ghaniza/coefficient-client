import { FC, useMemo } from 'react';
import styles from './time-splitter.module.scss';
import { useTimeDifference } from '@/hooks/time.hook';

type TimeSplitterProps = {
    time: Date;
};

const TimeSplitter: FC<TimeSplitterProps> = ({ time }) => {
    const timeStr = useTimeDifference(time);

    return (
        <div data-timestamp={time.getTime()} className={styles.splitter}>
            <span>{timeStr}</span>
        </div>
    );
};

export default TimeSplitter;
