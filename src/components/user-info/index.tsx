import React, { FC } from 'react';
import { useTimeDifference } from '@/hooks/time.hook';

import styles from './user-info.module.scss';

type UserInfoProps = {
    name?: string;
    lastOnline?: Date;
    online?: boolean;
};

const UserInfo: FC<UserInfoProps> = ({ name, lastOnline, online }) => {
    const lastOnlineString = useTimeDifference(lastOnline);

    return (
        <div className={styles.container}>
            <span>{name}</span>
            <small>
                {online ? 'online' : `last online ${lastOnlineString}`}
            </small>
        </div>
    );
};

export default UserInfo;
