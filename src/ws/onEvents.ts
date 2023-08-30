import { AppDispatch } from '../store';
import { MessageType } from '../types/messageTypes';
import { addMessage, getMessages } from '../store/slices/messageSlice';
import { DataByJoiningToDialog, RoomsResponse } from '../types/roomTypes';
import { getRooms } from '../store/slices/roomsSlice';

export default function onEvents(dispatch: AppDispatch) {
  return [
    {
      eventName: 'message:getMessage',
      event: ({ userId, data }: { userId: number; data: MessageType }) => {
        dispatch(addMessage(data));
      },
    },
    {
      eventName: 'chat-client:join',
      event: (data: DataByJoiningToDialog) => {
        console.log(data);
        dispatch(getMessages(data.data.messages.rows));
      },
    },
    {
      eventName: 'chat:provide-all-rooms',
      event: (data: RoomsResponse) => {
        dispatch(getRooms(data));
      },
    },
  ];
}
