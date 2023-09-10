import { UserType } from './userTypes';

export type WebSocketEventsContextType = {
  emitEventsHandler: <T extends keyof WebSocketEmitEvents>(key: T) => WebSocketEmitEvents[T];
};

export interface WebSocketEmitEvents {
  sendMessage: (message: string, roomId: number) => void;
  joinDialogChat: (email: string) => void;
  clearDialogChat: (roomId: number) => void;
  typeMessageToRoom: (roomId: number, userData: UserType) => void;
  stopTypingMessageToRoom: (roomId: number, userData: UserType) => void;
}
