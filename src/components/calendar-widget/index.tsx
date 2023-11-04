import { FC, useCallback, useEffect, useRef } from 'react';
import styles from './calendar-widget.module.scss';
import { useDate } from '@/hooks/time.hook';

const CalendarWidget: FC = () => {
    const ulRef = useRef<HTMLUListElement>(null);
    const markerRef = useRef<HTMLDivElement>(null);

    const hours = [];
    const offset = new Date().getTimezoneOffset() / 20;
    const now = useDate();

    for (let i = offset; i < 48 + offset; i++) {
        hours.push(i * 1_800_000);
    }

    const updateMarker = useCallback(() => {
        if (ulRef.current && markerRef.current) {
            const day = 86_400_000;
            const height = ulRef.current.scrollHeight;
            const clientHeight = ulRef.current.clientHeight;
            const currentHour =
                (now.getHours() * 3600 + now.getMinutes() * 60) * 1000;
            const pc = (currentHour * height) / day;

            markerRef.current.style.top = `${pc}px`;

            ulRef.current.scrollTo({ top: pc - clientHeight / 2 });
        }
    }, [ulRef, markerRef, now]);

    useEffect(() => {
        updateMarker();
    }, [updateMarker]);

    return (
        <ul ref={ulRef} className={styles.container}>
            {hours.map((time) => {
                const date = new Date(time);
                const h = date.getHours().toString();
                const m = date.getMinutes().toString();
                const t = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;

                return (
                    <li key={time}>
                        <small>{t}</small>
                    </li>
                );
            })}
            <div ref={markerRef} className={styles.marker}></div>
        </ul>
    );
};

export default CalendarWidget;
