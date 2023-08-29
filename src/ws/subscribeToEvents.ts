import { Socket } from 'socket.io-client';
import onEvents from './onEvents';

export default function subscribeToEvents(onEventsHandlers: ReturnType<typeof onEvents>, socket: Socket) {
  onEventsHandlers.forEach(onEventHandler => {
    socket.on(onEventHandler.eventName, onEventHandler.event);
  });
}
