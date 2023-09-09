import { FC } from 'react';
import { MessageType } from '../../types/messageTypes';

import styles from '../../styles/SingleChat.module.scss';
import { getMessageTime } from '../../utils/getMessageTime';

interface MessageItemIProps {
  messageData: MessageType;
  userId: number;
}

const MessageItem: FC<MessageItemIProps> = ({ userId, messageData }) => {
  const messageTime = getMessageTime(messageData.createdAt);

  return (
    <li
      className={`${styles.messageItem} ${
        userId === messageData.receiverId ? styles.ownDirection : styles.directionOfOther
      }`}
      key={messageData.id}
    >
      {messageData.text}
      <span className={`${styles.timeOfMessage} ${userId === messageData.receiverId ? styles.ownMessageTime : ''}`}>
        {messageTime}
      </span>
    </li>
  );
};

export default MessageItem;
