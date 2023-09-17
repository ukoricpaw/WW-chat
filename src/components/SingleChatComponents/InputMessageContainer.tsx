import { FC, useEffect, useState } from 'react';
import styles from '../../styles/SingleChat.module.scss';
import { useContext } from 'react';
import { WebSocketEventsContext } from '../GeneralComponents/WebSocketLayout';
import useFormFields from '../../hooks/useFormFields';
import { UserType } from '../../types/userTypes';

interface InputMessageContainerIProps {
  roomId: number;
  userData: UserType;
}

const InputMessageContainer: FC<InputMessageContainerIProps> = ({ roomId, userData }) => {
  const [value, setState] = useFormFields({ messageValue: '' });
  const changeMessage = setState('messageValue');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    if (isTyping) {
      wsEvents?.emitEventsHandler('typeMessageToRoom')(roomId, userData);
    }
  }, [isTyping]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      wsEvents?.emitEventsHandler('stopTypingMessageToRoom')(roomId, userData);
      setIsTyping(false);
    }, 750);
    return () => {
      clearTimeout(timeout);
    };
  }, [value.messageValue]);

  const sendMessageHandler = () => {
    wsEvents?.emitEventsHandler('sendMessage')(value.messageValue, roomId as number);
    wsEvents?.emitEventsHandler('stopTypingMessageToRoom')(roomId, userData);
    setIsTyping(false);
    changeMessage('');
  };

  const wsEvents = useContext(WebSocketEventsContext);
  return (
    <div
      onKeyDown={e => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (!value.messageValue.trim().length) {
            changeMessage('');
          } else {
            sendMessageHandler();
          }
        }
      }}
      className={styles.inputMessageContainer}
    >
      <textarea
        placeholder="Сообщение"
        onChange={e => {
          setIsTyping(true);
          changeMessage(e);
        }}
        value={value.messageValue}
        rows={1}
        className={styles.inputMessage}
      />
    </div>
  );
};

export default InputMessageContainer;
