/* eslint-disable @next/next/no-img-element */
"use client";

import Button from "@/components/button";
import Dropdown from "@/components/dropdown";
import {
  File,
  Image,
  MoreVertical,
  Paperclip,
  Plus,
  Send,
  Smile,
  Video,
} from "react-feather";
import RoundButton from "@/components/round-button";
import SearchBar from "@/components/search-bar";
import Chat from "@/components/message";
import React, {useEffect, useRef, useState} from "react";
import ProfilePicture from "@/components/profile-picture";
import FloatingActionButton from "@/components/floating-action-button";
import { useChat, useMessages} from "@/hooks/chat.hook";
import Balloon from "@/components/balloon";

import socketIo from "@/services/socket-io";
import styles from "./chat.module.scss";
import {useUser} from "@/hooks/user.hook";
import {registerMessage} from "@/services/user";
import {useTimeDifference} from "@/hooks/time.hook";

export default function ChatPage() {
  const chatMessages = useMessages('939ae835-a4f6-43b9-91a6-798d2565ffd2');
  const user = useUser('7cd78353-1e70-4632-b2cc-9f644f25d4a6');
  const chats = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const chatDataRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState("0");
  const lastOnline = useTimeDifference(user.user?.lastOnline);

  const items = [
    {
      label: "Recent chats",
      value: "recent",
    },
    {
      label: "Unread chats",
      value: "unread",
    },
    {
      label: "People",
      value: "people",
    },
  ];

  const sendMessage = async () => {
    const text= inputRef.current?.value;

    if(!inputRef.current || !text) return;
    await registerMessage('939ae835-a4f6-43b9-91a6-798d2565ffd2', user.user?.id, text);
    inputRef.current.value = "";
  }

  const handleChatKeyDown = async (event: React.KeyboardEvent) => {
    if(event.key !== 'Enter') return
    await sendMessage();
  }

  const handleSubmitMessage = async () => {
    await sendMessage();
  }

  const handleSelectChat = (id: string) => {
    setSelected(id);
  };

  const handleConnect = () => {
    socketIo.emit('join-chat', { chatId: '939ae835-a4f6-43b9-91a6-798d2565ffd2' });
  }

  const handleMessage = async (message: any) => {
    await chatMessages.revalidate();
  }

  useEffect(() => {
    socketIo.on('connect', handleConnect);
    socketIo.on('message', handleMessage);

    socketIo.connect();

    return () => {
      socketIo.off('connect', handleConnect);
      socketIo.off('message', handleMessage);
    }
  }, []);

  useEffect(() => {
    if(chatDataRef.current) {
      chatDataRef.current.scrollTo({
        top: chatDataRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [chatDataRef, chatMessages]);

  return (
    <div className={styles.content}>
      <section className={styles.previousChats}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h2>Chats</h2>
            <Dropdown
              style={{ width: "8rem", fontSize: "0.8rem", paddingLeft: 0 }}
              items={items}
            />
          </div>
          <div>
            <Button>
              <Plus />
              <span style={{ marginLeft: "0.375rem" }}>Create new chat</span>
            </Button>
          </div>
        </div>
        <SearchBar />
        <div className={styles.messageContainer}>
          {chats.chats.map((chat) => (
            <Chat
              key={chat.lastMessage?.id}
              chat={chat}
              selected={chat.lastMessage?.fromId === selected}
              onSelect={handleSelectChat}
            />
          ))}
        </div>
      </section>
      <section className={styles.messenger}>
        <div className={styles.messengerHeader}>
          <ProfilePicture size={2.75} online email={user.user?.email} />
          <div className={styles.messengerUserInfo}>
            <span>{user.user?.name}</span>
            <small>last online {lastOnline}</small>
          </div>
          <div className={styles.messengerActions}>
            <RoundButton color="secondary">
              <Paperclip size={18} />
            </RoundButton>
            <RoundButton color="secondary">
              <MoreVertical size={18} />
            </RoundButton>
          </div>
        </div>
        <div className={styles.messengerData} ref={chatDataRef}>
          {chatMessages.messages.map((message, index, array) => {
            const withProfilePicture = index === 0 || message.from.id !== array[index - 1].from.id;
            const withTime = index === array.length - 1 || message.from.id !== array[index + 1].from.id;
            const mine = user.user?.id === message.from.id;

            return (
              <Balloon
                key={message.id}
                mine={mine}
                message={message}
                withProfilePicture={withProfilePicture}
                withTime={withTime}
              />
            )
          })}
        </div>
        <div className={styles.messengerInput}>
          <div className={styles.inputFieldWrapper}>
            <FloatingActionButton
              icon={() => <Plus size={18} />}
              actions={[
                {
                  title: "Upload a video",
                  icon: () => <Video size={18} />,
                  action: () => {},
                },
                {
                  title: "Upload an image",
                  icon: () => <Image size={18} />,
                  action: () => {},
                },
                {
                  title: "Upload a file",
                  icon: () => <File size={18} />,
                  action: () => {},
                },
              ]}
            />
            <input
                ref={inputRef}
                placeholder="Type a message here"
                onKeyDown={handleChatKeyDown}
            />
            <div>
              <RoundButton color="none">
                <Smile size={18} />
              </RoundButton>
              <RoundButton onClick={handleSubmitMessage}>
                <Send size={18} />
              </RoundButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
