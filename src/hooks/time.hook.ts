import { useEffect, useMemo, useRef, useState } from 'react';
import dateToTimespan from '@/helpers/date-to-timespan';

export const useTimeDifference = (date?: Date) => {
    const [ref, setRef] = useState(new Date());
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

    return useMemo<string>(() => dateToTimespan(date, ref), [date, ref]);
};
