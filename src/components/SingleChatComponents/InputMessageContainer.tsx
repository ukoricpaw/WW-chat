import { FC, useEffect, useRef } from 'react';
import styles from '../../styles/SingleChat.module.scss';
import { useContext } from 'react';
import { WebSocketEventsContext } from '../GeneralComponents/WebSocketLayout';
import useFormFields from '../../hooks/useFormFields';
import useDebounce from '../../hooks/useDebounce';
import { UserType } from '../../types/userTypes';

interface InputMessageContainerIProps {
  roomId: number;
  userData: UserType;
}

const InputMessageContainer: FC<InputMessageContainerIProps> = ({ roomId, userData }) => {
  const [value, setState] = useFormFields({ messageValue: '' });
  const changeMessage = setState('messageValue');
  const debouncedValue = useDebounce({ value: value.messageValue, delay: 750 });
  const refValue = useRef<string>('');

  useEffect(() => {
    if (value.messageValue !== refValue.current && value.messageValue.trim().length) {
      wsEvents?.emitEventsHandler('typeMessageToRoom')(roomId, userData);
    }
  }, [refValue.current]);

  useEffect(() => {
    wsEvents?.emitEventsHandler('stopTypingMessageToRoom')(roomId, userData);
    refValue.current = debouncedValue;
  }, [debouncedValue]);

  const sendMessageHandler = () => {
    wsEvents?.emitEventsHandler('sendMessage')(value.messageValue, roomId as number);
    wsEvents?.emitEventsHandler('stopTypingMessageToRoom')(roomId, userData);
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
        onChange={changeMessage}
        value={value.messageValue}
        rows={1}
        className={styles.inputMessage}
      />
    </div>
  );
};

export default InputMessageContainer;
