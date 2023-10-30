/* eslint-disable @next/next/no-img-element */
'use client';

import Button from '@/components/button';
import Dropdown from '@/components/dropdown';
import { Plus } from 'react-feather';
import SearchBar from '@/components/search-bar';
import Chat from '@/components/message';
import React, { useEffect, useMemo, useState } from 'react';
import { useChat } from '@/hooks/chat.hook';
import { getIO } from '@/services/socket-io';
import styles from './chat.module.scss';
import { useMessages } from '@/hooks/message.hook';
import ChatView from '@/app/(main-application)/chat/chat-view';
import CreateChat from '@/components/create-chat';

const SEARCH_BAR_ITEMS = [
    {
        id: '0',
        label: 'All',
        value: 'all',
    },
    {
        id: '1',
        label: 'Messages',
        value: 'messages',
    },
    {
        id: '2',
        label: 'People',
        value: 'people',
    },
    {
        id: '3',
        label: 'Files',
        value: 'files',
    },
];

export default function ChatPage() {
    const [selected, setSelected] = useState('');
    const [connected, setConnected] = useState(false);
    const [unreadChatOnly, setUnreadChatOnly] = useState(false);
    const [createChatOpen, setCreateChatOpen] = useState(false);

    const chats = useChat(unreadChatOnly);

    const currentChat = useMemo(
        () => chats.chats.find((c) => c.id === selected),
        [selected, chats]
    );

    const items = [
        {
            label: 'Recent chats',
            value: 'recent',
        },
        {
            label: 'Archived',
            value: 'archived',
        },
        {
            label: 'Unread chats',
            value: 'unread',
        },
    ];

    const handleSelectChat = (id: string) => {
        console.log(id);
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

    const handleChatFilter = (item: any) => {
        setUnreadChatOnly(item.value === 'unread');
        setSelected('');
    };

    const handleChatAck = async () => {
        await chats.revalidate();
    };

    const handleChatUpdate = async () => {
        const { appWindow, UserAttentionType } = await import(
            '@tauri-apps/api/window'
        );
        await appWindow.requestUserAttention(UserAttentionType.Informational);
        await chats.revalidate();
    };

    const handleCreateChatClose = async (chatId?: string) => {
        setCreateChatOpen(false);
        await chats.revalidate();

        if (chatId) setSelected(chatId);
    };

    const handleCreateChatOpen = () => {
        setCreateChatOpen(true);
    };

    useEffect(() => {
        const socketIo = getIO();

        socketIo.on('connect', handleConnect);
        socketIo.on('disconnect', handleDisconnect);
        socketIo.on('chat-update', handleChatUpdate);
        socketIo.on('chat-ack', handleChatAck);

        return () => {
            socketIo.off('connect', handleConnect);
            socketIo.off('disconnect', handleDisconnect);
            socketIo.off('chat-update', handleChatUpdate);
            socketIo.off('chat-ack', handleChatAck);
        };
    }, []);

    useEffect(() => {
        if (selected)
            getIO().emit('join-chat', {
                chatId: selected,
            });
    }, [selected, connected]);

    return (
        <>
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
                            <Button onClick={handleCreateChatOpen}>
                                <Plus />
                                <span style={{ marginLeft: '0.375rem' }}>
                                    Create new chat
                                </span>
                            </Button>
                        </div>
                    </div>
                    <SearchBar items={SEARCH_BAR_ITEMS} />
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
                    {currentChat ? (
                        <ChatView currentChat={currentChat} />
                    ) : (
                        <></>
                    )}
                </section>
            </div>
            <CreateChat
                modalOpen={createChatOpen}
                onModalClose={handleCreateChatClose}
            />
        </>
    );
}
