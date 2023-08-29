import { FC } from 'react';
import styles from '../../styles/SingleChat.module.scss';
import { useAppSelector } from '../../hooks/reduxHooks';
import { messagesSelector } from '../../store/selectors/messagesSelectors';

const MessagesContainer: FC = () => {
  const messages = useAppSelector(messagesSelector);
  return (
    <ul className={styles.messagesContainer}>
      {messages.map(messageData => {
        return <li key={messageData.message}>{messageData.message}</li>;
      })}
    </ul>
  );
};

export default MessagesContainer;
