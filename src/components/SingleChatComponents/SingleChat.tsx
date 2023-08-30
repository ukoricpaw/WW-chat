import { FC } from 'react';
import styles from '../../styles/SingleChat.module.scss';
import ContactInfo from './ContactInfo';
import InputMessageContainer from './InputMessageContainer';
import MessagesContainer from './MessagesContainer';
import { useEffect, useContext } from 'react';
import { WebSocketEventsContext } from '../GeneralComponents/WebSocketLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { roomIsLoadingSelector } from '../../store/selectors/roomSelectors';
import { setLoading } from '../../store/slices/roomSlice';

const SingleChat: FC = () => {
  const { email } = useParams();
  const wsContext = useContext(WebSocketEventsContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(roomIsLoadingSelector);
  useEffect(() => {
    if (!email) {
      navigate('/chat');
      return;
    }
    wsContext?.emitEventsHandler('joinDialogChat')(email as string);

    return () => {
      dispatch(setLoading());
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
