import { AppDispatch } from '../store';
import { MessageType } from '../types/messageTypes';
import { addMessage, getMessages } from '../store/slices/messageSlice';
import { DataByJoiningToDialog } from '../types/roomTypes';
import { joinToDialog } from '../store/slices/roomSlice';

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
        dispatch(joinToDialog(data));
        console.log(data);
        dispatch(getMessages(data.data.messages.rows));
      },
    },
  ];
}
