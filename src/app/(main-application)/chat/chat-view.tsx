import styles from '@/app/(main-application)/chat/chat.module.scss';
import ProfilePicture from '@/components/profile-picture';
import UserInfo from '@/components/user-info';
import RoundButton from '@/components/round-button';
import {
    File,
    Image,
    MoreVertical,
    Paperclip,
    Plus,
    Send,
    Smile,
    Video,
} from 'react-feather';
import React, {
    FC,
    Fragment,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import Balloon from '@/components/balloon';
import FloatingActionButton from '@/components/floating-action-button';
import { MessageDTO } from '@/hooks/message.hook';
import { ChatDataDTO } from '@/hooks/chat.hook';
import { useUser } from '@/hooks/user.hook';
import {
    messagesByChatIdRequest,
    registerAck,
    registerMessage,
} from '@/services/message/message.api';
import LoadingSpinner from '@/components/loading-spinner';
import { getIO } from '@/services/socket-io';
import EmojiList from '@/components/emoji-list';

type ChatViewProps = {
    currentChat?: ChatDataDTO;
};

const ChatView: FC<ChatViewProps> = ({ currentChat }) => {
    const { user } = useUser();
    const [chatMessages, setChatMessages] = useState<MessageDTO[]>([]);
    const [emojiOpen, setEmojiOpen] = useState(false);

    const chatDataRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const sender = useMemo(() => {
        if (currentChat) {
            return currentChat.participants.find((p) => p.id !== user?.id);
        }
    }, [currentChat, user]);

    const loadMessages = async () => {
        const messages = await messagesByChatIdRequest(
            currentChat?.id,
            chatMessages.length
        );
        setChatMessages((previous) => [...previous, ...messages]);
    };

    const sendMessage = async () => {
        if ((window as any).sendingMessage) return;

        const text = inputRef.current?.value;
        if (!inputRef.current || !text || !currentChat) return;

        (window as any).sendingMessage = true;
        await registerMessage(currentChat.id, text);
        inputRef.current.value = '';
        (window as any).sendingMessage = false;
    };

    const scrollToBottom = useCallback(() => {
        if (chatDataRef.current) {
            chatDataRef.current.scrollTo({
                top: chatDataRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [chatDataRef]);

    const handleOpenEmojiTab = () => {
        setEmojiOpen((open) => !open);
    };

    const handleEmojiSelect = (emojiId: string) => {
        if (inputRef.current) {
            inputRef.current.value += String.fromCodePoint(
                parseInt(emojiId, 16)
            );
        }
        setEmojiOpen(false);
    };

    const handleChatKeyDown = async (event: React.KeyboardEvent) => {
        if (event.key !== 'Enter') return;
        await sendMessage();
    };

    const handleSubmitMessage = async () => {
        await sendMessage();
    };

    const handleChatClick = async () => {
        currentChat && (await registerAck(currentChat.id));
    };

    const handleChatScroll = async (event: React.UIEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;

        if (target.scrollTop + target.scrollHeight === target.clientHeight) {
            await loadMessages();
        }
    };

    const handleMessage = (message: MessageDTO) => {
        setChatMessages((previous) => [message, ...previous]);
    };

    const handleChatUpdate = () => {};

    const handleChatAck = () => {};

    useEffect(() => {
        scrollToBottom();
    }, [scrollToBottom]);

    useEffect(() => {
        if (currentChat) loadMessages().catch(console.error);
    }, [currentChat]);

    useEffect(() => {
        const socketIo = getIO();

        socketIo.on('message', handleMessage);
        socketIo.on('chat-update', handleChatUpdate);
        socketIo.on('chat-ack', handleChatAck);

        return () => {
            socketIo.off('message', handleMessage);
            socketIo.off('chat-update', handleChatUpdate);
            socketIo.off('chat-ack', handleChatAck);
        };
    }, []);

    return (
        <>
            <div className={styles.messengerHeader}>
                <ProfilePicture
                    size={2.75}
                    online={sender?.online}
                    email={sender?.email}
                />
                <UserInfo
                    name={sender?.name}
                    lastOnline={sender?.lastOnline}
                    online={sender?.online}
                />
                <div className={styles.messengerActions}>
                    <RoundButton color="secondary">
                        <Paperclip size={18} />
                    </RoundButton>
                    <RoundButton color="secondary">
                        <MoreVertical size={18} />
                    </RoundButton>
                </div>
            </div>
            <div
                className={styles.messengerData}
                ref={chatDataRef}
                onScroll={handleChatScroll}
            >
                {chatMessages.map((msg, index, array) => {
                    const withTime =
                        index === 0 || msg.from.id !== array[index - 1].from.id;
                    const withProfilePicture =
                        index === array.length - 1 ||
                        msg.from.id !== array[index + 1].from.id;
                    const mine = user?.id === msg.from.id;

                    return (
                        <Fragment key={msg.id}>
                            <Balloon
                                mine={mine}
                                message={msg}
                                withProfilePicture={withProfilePicture}
                                withTime={withTime}
                            />
                        </Fragment>
                    );
                })}
            </div>
            <div className={styles.messengerInput}>
                <div className={styles.inputFieldWrapper}>
                    <FloatingActionButton
                        icon={() => <Plus size={18} />}
                        actions={[
                            {
                                title: 'Upload a video',
                                icon: () => <Video size={18} />,
                                action: () => {},
                            },
                            {
                                title: 'Upload an image',
                                icon: () => <Image size={18} />,
                                action: () => {},
                            },
                            {
                                title: 'Upload a file',
                                icon: () => <File size={18} />,
                                action: () => {},
                            },
                        ]}
                    />
                    <input
                        data-emoji={true}
                        ref={inputRef}
                        placeholder="Type a message here"
                        onClick={handleChatClick}
                        onKeyDown={handleChatKeyDown}
                    />
                    <div>
                        <RoundButton color="none" onClick={handleOpenEmojiTab}>
                            <Smile size={18} />
                        </RoundButton>
                        <RoundButton onClick={handleSubmitMessage}>
                            <Send size={18} />
                        </RoundButton>
                    </div>
                    <EmojiList open={emojiOpen} onSelect={handleEmojiSelect} />
                </div>
            </div>
            <div
                className={`${styles.loadingOverlay}${
                    sender ? ' ' + styles.loadingHidden : ''
                }`}
            >
                <LoadingSpinner />
            </div>
        </>
    );
};

export default ChatView;
