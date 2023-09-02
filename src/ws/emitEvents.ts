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
  };
}
