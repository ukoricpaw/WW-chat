import { FC } from 'react';
import styles from '../../styles/SingleChat.module.scss';
import { useContext } from 'react';
import { WebSocketEventsContext } from '../GeneralComponents/WebSocketLayout';
import useFormFields from '../../hooks/useFormFields';

interface InputMessageContainerIProps {
  roomId: number;
}

const InputMessageContainer: FC<InputMessageContainerIProps> = ({ roomId }) => {
  const [value, setState] = useFormFields({ messageValue: '' });
  const changeMessage = setState('messageValue');

  const sendMessageHandler = () => {
    wsEvents?.emitEventsHandler('sendMessage')(value.messageValue, roomId as number);
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
