import { AppDispatch } from '../store';
import { MessageType } from '../types/messageTypes';
import { addMessage } from '../store/slices/messageSlice';
import { DataByJoiningRoom } from '../types/roomTypes';

export default function onEvents(dispatch: AppDispatch) {
  return [
    {
      eventName: 'message:getMessage',
      event: ({ userId, data }: { userId: number; data: { message: string } }) => {
        dispatch(addMessage(data.message));
      },
    },
    {
      eventName: 'chat-client:join',
      event: (data: DataByJoiningRoom) => {
        dispatch(addMessage(data.message));
      },
    },
  ];
}
