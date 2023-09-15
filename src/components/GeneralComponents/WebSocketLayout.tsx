import { WebSocketEmitEvents, WebSocketEventsContextType } from '../../types/wsTypes';
import emitEvents from '../../ws/emitEvents';
import { ReactNode, FC, useEffect, useRef, createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import onEvents from '../../ws/onEvents';
import subscribeToEvents from '../../ws/subscribeToEvents';
import { userSelector } from '../../store/selectors/userSelectors';

export const WebSocketEventsContext = createContext<WebSocketEventsContextType | null>(null);
const WebSocketEventsProvider = WebSocketEventsContext.Provider;

const WebSocketLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  const emitEventsRef = useRef<ReturnType<typeof emitEvents> | null>(null);

  const data = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const onEventsHandlers = onEvents(dispatch);
  useEffect(() => {
    socketRef.current = io('http://192.168.8.108:5000', {
      withCredentials: true,
      query: { userId: data.id },
    });
    emitEventsRef.current = emitEvents(socketRef.current);
    subscribeToEvents(onEventsHandlers, socketRef.current);
    return () => {
      onEventsHandlers.forEach(handler => {
        socketRef.current?.off(handler.eventName, handler.event);
      });
      socketRef.current?.disconnect();
    };
  }, []);

  const emitEventsHandler = <T extends keyof WebSocketEmitEvents>(key: T) => {
    return (emitEventsRef.current as ReturnType<typeof emitEvents>)[key];
  };

  return <WebSocketEventsProvider value={{ emitEventsHandler }}>{children}</WebSocketEventsProvider>;
};

export default WebSocketLayout;
