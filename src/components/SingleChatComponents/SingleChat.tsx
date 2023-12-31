import { FC } from 'react';
import styles from '../../styles/SingleChat.module.scss';
import ContactInfo from './ContactInfo';
import InputMessageContainer from './InputMessageContainer';
import MessagesContainer from './MessagesContainer';
import { useEffect, useContext } from 'react';
import { WebSocketEventsContext } from '../GeneralComponents/WebSocketLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { roomIdSelectorByEmail } from '../../store/selectors/roomSelectors';
import { clearMessages, getRoomId, setIsLoading } from '../../store/slices/messageSlice';
import { messageIsLoadingSelector } from '../../store/selectors/messagesSelectors';
import { clearRoomById } from '../../store/slices/roomsSlice';
import { userSelector } from '../../store/selectors/userSelectors';

const SingleChat: FC = () => {
  const { email } = useParams();
  const wsContext = useContext(WebSocketEventsContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(messageIsLoadingSelector);
  const roomId = useAppSelector(state => roomIdSelectorByEmail(state, String(email)));
  const userData = useAppSelector(userSelector);
  useEffect(() => {
    if (!email) {
      navigate('/chat');
      return;
    }
    wsContext?.emitEventsHandler('joinDialogChat')(email as string);
  }, [email]);

  useEffect(() => {
    if (roomId) {
      dispatch(getRoomId(roomId as number));
    }
    return () => {
      if (roomId) {
        dispatch(setIsLoading(true));
        wsContext?.emitEventsHandler('clearDialogChat')(roomId as number);
        dispatch(clearMessages());
        dispatch(clearRoomById(roomId));
      }
    };
  }, [roomId]);

  if (isLoading || !roomId) {
    return <></>;
  }

  return (
    <section className={styles.singleChatContainer}>
      <ContactInfo roomId={roomId} />
      <div className={styles.dialogContainer}>
        <MessagesContainer />
        <InputMessageContainer roomId={roomId} userData={userData} />
      </div>
    </section>
  );
};

export default SingleChat;
