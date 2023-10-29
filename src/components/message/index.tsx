/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useMemo } from 'react';
import styles from './message.module.scss';
import ProfilePicture from '../profile-picture';
import { UserDTO, useUser } from '@/hooks/user.hook';
import { ChatDataDTO } from '@/hooks/chat.hook';
import { useTimeDifference } from '@/hooks/time.hook';

export type FileDTO = {
    filename: string;
    mimetype: string;
    size: number;
};

export type VoiceClipDTO = {
    length: number;
    content: Buffer;
};

type MessageProps = {
    chat: ChatDataDTO;
    selected?: boolean;
    onSelect?: (selected: string) => void;
};

const Chat: FC<MessageProps> = ({ chat, selected, onSelect }) => {
    const user = useUser();
    const lastMessage = useTimeDifference(chat.lastMessage?.timestamp);

    const handleOnClick = () => {
        onSelect && onSelect(chat.id);
    };

    const sender = useMemo(() => {
        return chat.participants.find(
            (participant) => participant.id !== user.user?.id
        );
    }, [chat, user]);
    const lastOnline = useTimeDifference(sender?.lastOnline);

    return (
        <div
            className={styles.container}
            data-selected-message={selected}
            onClick={handleOnClick}
        >
            <div className={styles.header}>
                <ProfilePicture email={sender?.email} online={sender?.online} />
                <div className={styles.userInfo}>
                    <span>{sender?.name}</span>
                    <small>
                        {sender?.online
                            ? 'online'
                            : `last online ${lastOnline}`}
                    </small>
                </div>
                <small className={styles.lastOnline}>{lastMessage}</small>
            </div>
            <div className={styles.text}>
                {chat.lastMessage?.fromId === user?.user?.id ? 'You: ' : ''}
                {chat.lastMessage?.content}
                {chat.unreadMessageCount ? (
                    <span>
                        {chat.unreadMessageCount > 9
                            ? '9+'
                            : chat.unreadMessageCount}
                    </span>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Chat;
