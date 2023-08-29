import { FC } from 'react';
import styles from '../../styles/SingleChat.module.scss';
import ContactInfo from './ContactInfo';
import InputMessageContainer from './InputMessageContainer';
import MessagesContainer from './MessagesContainer';
import { useEffect, useState, useContext } from 'react';
import { WebSocketEventsContext } from '../GeneralComponents/WebSocketLayout';
import { useParams, useNavigate } from 'react-router-dom';

const SingleChat: FC = () => {
  const { email } = useParams();
  const [isLoading, setLoading] = useState<boolean>(false);
  const wsContext = useContext(WebSocketEventsContext);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    if (!email) {
      navigate('/chat');
      return;
    }
    wsContext?.emitEventsHandler('joinDialogChat')(email as string);
    setLoading(false);

    return () => {
      wsContext?.emitEventsHandler('leaveDialogChat')();
    };
  }, [email]);

  if (isLoading) {
    return <></>;
  }

  return (
    <section className={styles.singleChatContainer}>
      <ContactInfo />
      <div className={styles.dialogContainer}>
        <MessagesContainer />
        <InputMessageContainer />
      </div>
    </section>
  );
};

export default SingleChat;
