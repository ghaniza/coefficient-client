'use client';

import { FC } from 'react';
import { useUser } from '@/hooks/user.hook';
import styles from './home.module.scss';
import Accordion from '@/components/accordion';

const HomePage: FC = () => {
    const { user } = useUser();
    const today = new Date().toLocaleDateString('en-US', {
        dateStyle: 'full',
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Welcome, {user?.name}</h1>
                <h2>{today}</h2>
            </div>
            <div className={styles.sections}>
                <Accordion
                    title={'Latest updates'}
                    cleanMessage={'No updates so far'}
                ></Accordion>
                <Accordion
                    title={'Meetings'}
                    cleanMessage={'No meetings today'}
                ></Accordion>
                <Accordion
                    title={'Shared with you'}
                    cleanMessage={'No new items shared with you'}
                ></Accordion>
            </div>
        </div>
    );
};

export default HomePage;
