import { useEffect, useMemo, useRef, useState } from "react";

export const useTimeDifference = (date?: Date) => {
    const [ref, setRef] = useState(new Date());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        if(intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setRef(new Date());
        }, 60_000);
    }

    const computeValue = () => {
        if(!date) return '';

        const diff = (new Date(ref).getTime() - new Date(date).getTime()) / 1000;

        if (diff < 60) {
            return `a few seconds ago`;
        }
        if (diff < 3_600) {
            const minutes = Math.floor(diff / 60);
            return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        }
        if (diff < 86_400) {
            const hours = Math.floor(diff / 3_600);
            return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        }
        if(diff < 86_400 * 7) {
            const days = Math.floor(diff / 86_400);
            return `${days} day${days > 1 ? "s" : ""} ago`;
        }

        const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    useEffect(() => {
        startTimer();
    }, [date]);

    return useMemo<string>(computeValue, [date, ref]);
}