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
import styles from "./chat.module.scss";
import RoundButton from "@/components/round-button";
import SearchBar from "@/components/search-bar";
import Message from "@/components/message";
import { useState } from "react";
import Balloon from "@/components/balloon";
import TimeSplitter from "@/components/time-splitter";
import ProfilePicture from "@/components/profile-picture";
import FloatingActionButton from "@/components/floating-action-button";

export default function Chat() {
  const [selected, setSelected] = useState("0");
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

  const messages = [
    {
      from: {
        id: "0",
        username: "Ghaniza",
        lastOnline: new Date(Date.now() - 120000),
      },
      lastMessage: {
        read: false,
        content: "my messsage here",
        timestamp: new Date(Date.now() - 120000),
        files: [],
      },
      unreadMessageCount: 1,
    },
    {
      from: {
        id: "1",
        username: "Ghaniza",
        lastOnline: new Date(Date.now() - 120000),
      },
      lastMessage: {
        read: false,
        content:
          "my messsage here gwgionbewin wef vwqwdq qwd qw d qwd qwdqwdqwdqwdqwdq d qw dwq dqwdqwd qw dqw dqw dqwdqwdqw dq wd qwd wq dwqdqwdqw d qwd qw dq wd qwdqw",
        timestamp: new Date(Date.now() - 120000),
        files: [],
      },
      unreadMessageCount: 0,
    },
    {
      from: {
        id: "2",
        username: "Ghaniza",
        lastOnline: new Date(Date.now() - 120000),
      },
      lastMessage: {
        read: false,
        content: "my messsage here",
        timestamp: new Date(Date.now() - 120000),
        files: [],
      },
      unreadMessageCount: 1,
    },
    {
      from: {
        id: "3",
        username: "Ghaniza",
        lastOnline: new Date(Date.now() - 120000),
      },
      lastMessage: {
        read: false,
        content: "my messsage here",
        timestamp: new Date(Date.now() - 120000),
        files: [],
      },
      unreadMessageCount: 1,
    },
    {
      from: {
        id: "4",
        username: "Ghaniza",
        lastOnline: new Date(Date.now() - 120000),
      },
      lastMessage: {
        read: false,
        content: "my messsage here",
        timestamp: new Date(Date.now() - 120000),
        files: [],
      },
      unreadMessageCount: 1,
    },
    {
      from: {
        id: "5",
        username: "Ghaniza",
        lastOnline: new Date(Date.now() - 120000),
      },
      lastMessage: {
        read: false,
        content: "my messsage here",
        timestamp: new Date(Date.now() - 120000),
        files: [],
      },
      unreadMessageCount: 18,
    },
  ];

  const handleSelectChat = (id: string) => {
    setSelected(id);
  };

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
          {messages.map((message) => (
            <Message
              key={message.from.id}
              message={message}
              selected={message.from.id === selected}
              onSelect={handleSelectChat}
            />
          ))}
        </div>
      </section>
      <section className={styles.messenger}>
        <div className={styles.messengerHeader}>
          <ProfilePicture size={2.75} online />
          <div className={styles.messengerUserInfo}>
            <span>Ghanizadev</span>
            <small>last online 5 hours ago</small>
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
        <div className={styles.messengerData}>
          <Balloon
            mine={false}
            message={messages[0].lastMessage}
            withProfilePicture
          />
          <Balloon mine={false} message={messages[1].lastMessage} withTime />
          <TimeSplitter time={new Date(Date.now() - 3_600_000)} />
          <Balloon
            mine={true}
            message={messages[2].lastMessage}
            withProfilePicture
          />
          <Balloon mine={true} message={messages[3].lastMessage} withTime />
          <Balloon
            mine={true}
            message={messages[2].lastMessage}
            withProfilePicture
          />
          <Balloon mine={true} message={messages[3].lastMessage} withTime />
          <Balloon
            mine={true}
            message={messages[2].lastMessage}
            withProfilePicture
          />
          <Balloon mine={true} message={messages[3].lastMessage} withTime />
          <Balloon
            mine={true}
            message={messages[2].lastMessage}
            withProfilePicture
          />
          <Balloon mine={true} message={messages[3].lastMessage} withTime />
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
            <input placeholder="Type a message here" />
            <div>
              <RoundButton color="none">
                <Smile size={18} />
              </RoundButton>
              <RoundButton>
                <Send size={18} />
              </RoundButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
