import { FC } from 'react';
import { MessageType } from '../../types/messageTypes';

import styles from '../../styles/SingleChat.module.scss';

interface MessageItemIProps {
  messageData: MessageType;
  userId: number;
}

const MessageItem: FC<MessageItemIProps> = ({ userId, messageData }) => {
  return (
    <li
      className={`${styles.messageItem} ${
        userId === messageData.receiverId ? styles.ownDirection : styles.directionOfOther
      }`}
      key={messageData.id}
    >
      {messageData.text}
    </li>
  );
};

export default MessageItem;
