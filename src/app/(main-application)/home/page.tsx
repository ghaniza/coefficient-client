'use client';

import { FC } from 'react';
import { useUser } from '@/hooks/user.hook';
import styles from './home.module.scss';
import CalendarWidget from '@/components/calendar-widget';

const HomePage: FC = () => {
    const { user } = useUser();
    const today = new Date().toLocaleDateString('en-US', {
        dateStyle: 'full',
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Welcome, {user?.name}</h1>
                <h4>{today}</h4>
            </div>
            <div className={styles.updates}>
                <h3>Latest updates</h3>
            </div>
            <div className={styles.calendar}>
                <h3>Today</h3>
                <CalendarWidget />
            </div>
        </div>
    );
};

export default HomePage;
