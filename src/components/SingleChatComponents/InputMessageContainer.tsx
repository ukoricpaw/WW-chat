import { FC } from 'react';
import styles from '../../styles/SingleChat.module.scss';
import { useContext } from 'react';
import { WebSocketEventsContext } from '../GeneralComponents/WebSocketLayout';
import useFormFields from '../../hooks/useFormFields';
import { useAppSelector } from '../../hooks/reduxHooks';
import { roomIdSelector } from '../../store/selectors/roomSelectors';

const InputMessageContainer: FC = () => {
  const roomId = useAppSelector(roomIdSelector);
  const [value, setState] = useFormFields({ messageValue: '' });
  const changeMessage = setState('messageValue');

  const sendMessageHandler = () => {
    if (value.messageValue.trim().length) {
      wsEvents?.emitEventsHandler('sendMessage')(value.messageValue, roomId as number);
      changeMessage('');
    }
  };

  const wsEvents = useContext(WebSocketEventsContext);
  return (
    <div
      onKeyDown={e => {
        if (e.key === 'Enter') {
          sendMessageHandler();
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
