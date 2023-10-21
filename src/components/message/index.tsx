/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import styles from "./message.module.scss";
import ProfilePicture from "../profile-picture";

type UserDTO = {
  id: string;
  username: string;
  lastOnline: Date;
};

type FileDTO = {
  filename: string;
  mimetype: string;
  size: number;
};

type VoiceClipDTO = {
  length: number;
  content: Buffer;
};

type MessageData = {
  from: UserDTO;
  lastMessage: {
    read: boolean;
    content: string;
    timestamp: Date;
    files: FileDTO[];
    voiceClip?: VoiceClipDTO;
  };
  unreadMessageCount: number;
};

type MessageProps = {
  message: MessageData;
  selected?: boolean;
  onSelect?: (selected: string) => void;
};

const Message: FC<MessageProps> = ({ message, selected, onSelect }) => {
  const handleOnClick = () => {
    onSelect && onSelect(message.from.id);
  };

  return (
    <div
      className={styles.container}
      data-selected-message={selected}
      onClick={handleOnClick}
    >
      <div className={styles.header}>
        <ProfilePicture email="" online />
        <div className={styles.userInfo}>
          <span>{message.from.username}</span>
          <small>last online 5 hours ago</small>
        </div>
        <small className={styles.lastOnline}>1 minute ago</small>
      </div>
      <div className={styles.text}>
        {message.lastMessage.content}
        {message.unreadMessageCount ? (
          <span>
            {message.unreadMessageCount > 9 ? "9+" : message.unreadMessageCount}
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Message;
