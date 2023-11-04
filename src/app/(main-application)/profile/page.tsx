import { FC } from 'react';
import Button from '@/components/button';
import styles from './profile.module.scss';

const ProfilePage: FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.profilePicture}></div>
            <input placeholder={'Name'} />
            <input placeholder={'Email'} />
            <Button>Save</Button>
        </div>
    );
};

export default ProfilePage;
