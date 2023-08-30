import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { messagesSelector } from '../../store/selectors/messagesSelectors';
import { userIDSelector } from '../../store/selectors/userSelectors';

import styles from '../../styles/SingleChat.module.scss';
import MessageItem from './MessageItem';

const MessagesContainer: FC = () => {
  const messages = useAppSelector(messagesSelector);
  const id = useAppSelector(userIDSelector);
  return (
    <ul className={styles.messagesContainer}>
      {messages.map(messageData => {
        return <MessageItem key={messageData.id} messageData={messageData} userId={id} />;
      })}
    </ul>
  );
};

export default MessagesContainer;
