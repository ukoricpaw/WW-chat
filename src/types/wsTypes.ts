import { MessageType } from './messageTypes';

export type WebSocketEventsContextType = {
  emitEventsHandler: <T extends keyof WebSocketEmitEvents>(key: T) => WebSocketEmitEvents[T];
};

export interface WebSocketEmitEvents {
  sendMessage: (message: string, roomId: number) => void;
  joinChat: (email: string) => void;
}
