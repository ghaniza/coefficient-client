/* eslint-disable @next/next/no-img-element */
'use client';

import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './sidebar.module.scss';
import Dropdown from '../dropdown';
import {
    Bell,
    Calendar,
    Home,
    MessageCircle,
    Power,
    Settings,
    Users,
} from 'react-feather';
import { usePathname, useRouter } from 'next/navigation';
import ProfilePicture from '../profile-picture';
import { useUser } from '@/hooks/user.hook';
import { getIO } from '@/services/socket-io';

const MENU = [
    {
        label: 'Home',
        value: 'home',
        icon: () => <Home size={18} />,
        notification: false,
    },
    {
        label: 'Chat',
        value: 'chat',
        icon: () => <MessageCircle size={18} />,
        notification: false,
    },
    {
        label: 'Contacts',
        value: 'contacts',
        icon: () => <Users size={18} />,
        notification: false,
    },
    {
        label: 'Notifications',
        value: 'notifications',
        icon: () => <Bell size={18} />,
        notification: false,
    },
    {
        label: 'Calendar',
        value: 'calendar',
        icon: () => <Calendar size={18} />,
        notification: false,
    },
    {
        label: 'Settings',
        value: 'settings',
        icon: () => <Settings size={18} />,
        notification: false,
    },
];

const Sidebar: FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useUser();
    const [notification, setNotification] = useState<
        ('notifications' | 'chat')[]
    >([]);

    const menu = useMemo(() => {
        return MENU.map((item) => ({
            ...item,
            notification: notification.includes(item.value as any),
        }));
    }, [notification]);

    const handleNotificationOn = useCallback(
        (type: 'notifications' | 'chat') => {
            return (msg: any) => {
                if (!user || msg.fromId === user.id) return;
                setNotification((notification) => [...notification, type]);
            };
        },
        [user, notification]
    );

    const handleNotificationOff = useCallback(
        (type: 'notifications' | 'chat') => {
            return ({ fromId }: any) => {
                if (fromId === user?.id) return;

                setNotification((notification) =>
                    notification.filter((n) => n !== type)
                );
            };
        },
        [user, notification]
    );

    const handleOnClick = (page: string) => {
        return () => {
            router.push('/' + page);
        };
    };

    const handleOnDropdownChange = (value: any) => {
        console.log(value);
    };

    const handleLogoff = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        router.push('/');
    };

    const items = useMemo(() => {
        if (!user) return [];
        return [
            {
                label: user.name,
                value: user.id,
                invisible: true,
            },
            {
                label: 'Profile',
                value: 'profile',
            },
            {
                label: 'Profile',
                value: 'profile',
            },
        ];
    }, [user]);

    useEffect(() => {
        const socketIo = getIO();

        socketIo.on('chat-update', handleNotificationOn('chat'));
        socketIo.on('chat-ack', handleNotificationOff('chat'));

        return () => {
            socketIo.off('chat-update', handleNotificationOn('chat'));
            socketIo.off('chat-ack', handleNotificationOff('chat'));
        };
    }, [handleNotificationOn, handleNotificationOff]);

    return (
        <aside className={styles.container}>
            <div className={styles.profileHeader}>
                <ProfilePicture
                    className={styles.profilePicture}
                    online
                    email={user?.email}
                    size={5}
                />
                <Dropdown
                    style={{ width: '10rem', color: '#0D1C2E' }}
                    items={items}
                    onChange={handleOnDropdownChange}
                />
            </div>
            <ul className={styles.listItems}>
                {menu.map((menuItem) => (
                    <li
                        key={menuItem.value}
                        onClick={handleOnClick(menuItem.value)}
                        data-selected={pathname === '/' + menuItem.value}
                    >
                        {menuItem.notification ? (
                            <span className={styles.notification}></span>
                        ) : (
                            <></>
                        )}
                        {menuItem.icon()}
                        {menuItem.label}
                    </li>
                ))}
            </ul>
            <ul className={`${styles.listItems} ${styles.logout}`}>
                <li onClick={handleLogoff}>
                    <Power size={18} />
                    Log out
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
