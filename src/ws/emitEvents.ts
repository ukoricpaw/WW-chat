import { UserType } from '../types/userTypes';
import { WebSocketEmitEvents } from '../types/wsTypes';
import { Socket } from 'socket.io-client';

export default function emitEvents(socket: Socket): WebSocketEmitEvents {
  return {
    sendMessage: (message: string, roomId: number) => {
      socket.emit('message:sendToRoom', { roomId, message });
    },
    joinDialogChat: (email: string) => {
      socket.emit('chat:joinDialogChat', email);
    },
    clearDialogChat: (roomId: number) => {
      socket.emit('chat:clearDialogChat', roomId);
    },
    typeMessageToRoom: (roomId: number, userData: UserType) => {
      socket.emit('chat:userTypingMessage', { roomId, userData });
    },
    stopTypingMessageToRoom: (roomId: number, userData: UserType) => {
      socket.emit('chat:userStoppingToTypeMessage', { roomId, userData });
    },
  };
}
