import { useEffect, useMemo, useRef, useState } from 'react';
import dateToTimespan from '@/helpers/date-to-timespan';

export const useDate = (date = new Date()) => {
    const [ref, setRef] = useState(date);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setRef(new Date());
        }, 60_000);
    };

    useEffect(() => {
        startTimer();
    }, [date]);

    return ref;
};

export const useTimeDifference = (date?: Date) => {
    const ref = useDate();
    return useMemo<string>(() => dateToTimespan(date, ref), [date, ref]);
};
