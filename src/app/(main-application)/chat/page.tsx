/* eslint-disable @next/next/no-img-element */
'use client';

import Button from '@/components/button';
import Dropdown from '@/components/dropdown';
import { Plus } from 'react-feather';
import SearchBar from '@/components/search-bar';
import Chat from '@/components/message';
import React, { useEffect, useState } from 'react';
import { useChat } from '@/hooks/chat.hook';
import { getIO } from '@/services/socket-io';
import styles from './chat.module.scss';
import { useMessages } from '@/hooks/message.hook';
import ChatView from '@/app/(main-application)/chat/chat-view';
import { useUser } from '@/hooks/user.hook';

export default function ChatPage() {
    const [selected, setSelected] = useState('');
    const [connected, setConnected] = useState(false);
    const [unreadChatOnly, setUnreadChatOnly] = useState(false);

    const { user } = useUser();
    const chats = useChat(unreadChatOnly);
    const chatMessages = useMessages(selected ?? '');

    const items = [
        {
            label: 'Recent chats',
            value: 'recent',
        },
        {
            label: 'Unread chats',
            value: 'unread',
        },
    ];

    const handleSelectChat = (id: string) => {
        setSelected(id);
    };

    const handleConnect = () => {
        console.log('Connect');
        setConnected(true);
    };

    const handleDisconnect = () => {
        console.log('Disconnect');
        setConnected(false);
    };

    const handleMessage = async () => {
        await chatMessages.revalidate();
    };

    const handleChatFilter = (item: any) => {
        setUnreadChatOnly(item.value === 'unread');
        setSelected('');
    };

    const handleChatAck = async ({ chatId, fromId }: any) => {
        await chats.revalidate();
    };

    const handleChatUpdate = async () => {
        const { appWindow, UserAttentionType } = await import(
            '@tauri-apps/api/window'
        );
        await appWindow.requestUserAttention(UserAttentionType.Informational);
        await chats.revalidate();
    };

    useEffect(() => {
        const socketIo = getIO();

        socketIo.on('connect', handleConnect);
        socketIo.on('disconnect', handleDisconnect);
        socketIo.on('message', handleMessage);
        socketIo.on('chat-update', handleChatUpdate);
        socketIo.on('chat-ack', handleChatAck);

        return () => {
            socketIo.off('connect', handleConnect);
            socketIo.off('disconnect', handleDisconnect);
            socketIo.off('message', handleMessage);
            socketIo.off('chat-update', handleChatUpdate);
            socketIo.off('chat-ack', handleChatAck);
        };
    }, []);

    useEffect(() => {
        if (connected && selected)
            getIO().emit('join-chat', {
                chatId: selected,
            });
    }, [connected, selected]);

    return (
        <div className={styles.content}>
            <section className={styles.previousChats}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h2>Chats</h2>
                        <Dropdown
                            style={{
                                width: '8rem',
                                fontSize: '0.8rem',
                                paddingLeft: 0,
                            }}
                            items={items}
                            onChange={handleChatFilter}
                        />
                    </div>
                    <div>
                        <Button>
                            <Plus />
                            <span style={{ marginLeft: '0.375rem' }}>
                                Create new chat
                            </span>
                        </Button>
                    </div>
                </div>
                <SearchBar />
                <div className={styles.messageContainer}>
                    {chats.chats.map((chat) => (
                        <Chat
                            key={chat.id}
                            chat={chat}
                            selected={chat.id === selected}
                            onSelect={handleSelectChat}
                        />
                    ))}
                </div>
            </section>
            <section className={styles.messenger}>
                {selected ? (
                    <ChatView
                        currentChat={chats.chats.find((c) => (c.id = selected))}
                    />
                ) : (
                    <></>
                )}
            </section>
        </div>
    );
}
