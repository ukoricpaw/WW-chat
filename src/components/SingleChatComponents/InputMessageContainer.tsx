import { FC } from 'react';
import { Button } from '../UIComponents/Button';
import styles from '../../styles/SingleChat.module.scss';
import { useContext } from 'react';
import { WebSocketEventsContext } from '../GeneralComponents/WebSocketLayout';
import useFormFields from '../../hooks/useFormFields';

const InputMessageContainer: FC = () => {
  const [value, setState] = useFormFields({ messageValue: '' });

  const changeMessage = setState('messageValue');

  const sendMessageHandler = () => {
    wsEvents?.emitEventsHandler('sendMessage')(value.messageValue, 1);
    changeMessage('');
  };

  const wsEvents = useContext(WebSocketEventsContext);
  return (
    <div className={styles.inputMessageContainer}>
      <textarea
        onKeyDown={e => {
          if (e.key === 'Enter') {
            sendMessageHandler();
          }
        }}
        onChange={changeMessage}
        value={value.messageValue}
        rows={1}
        className={styles.inputMessage}
      />
      <Button onClick={sendMessageHandler} variant={'accent'}>
        Отправить
      </Button>
    </div>
  );
};

export default InputMessageContainer;
