import { AppDispatch } from '../store';
import { getMessages, setIsLoading } from '../store/slices/messageSlice';
import { DataByJoiningToDialog, RoomNotificationMessageResponse, RoomsResponse } from '../types/roomTypes';
import { getNewRoom, getRooms, pushNotification, userIsNotTyping, userIsTyping } from '../store/slices/roomsSlice';
import { UserType } from '../types/userTypes';

export default function onEvents(dispatch: AppDispatch) {
  return [
    {
      eventName: 'chat-client:join',
      event: (data: DataByJoiningToDialog) => {
        if (!data.data.room) {
          dispatch(getMessages((data.data.messages as Exclude<(typeof data)['data']['messages'], null>).rows));
        } else {
          dispatch(getNewRoom(data));
        }
        dispatch(setIsLoading(false));
      },
    },
    {
      eventName: 'chat:provide-all-rooms',
      event: (data: RoomsResponse) => {
        dispatch(getRooms(data));
      },
    },
    {
      eventName: 'message:getNotificationMessage',
      event: (room: RoomNotificationMessageResponse) => {
        dispatch(pushNotification(room));
      },
    },
    {
      eventName: 'chat:userIsTypingMessageToTheFullRoom',
      event: (response: { data: { roomId: number; userData: UserType } }) => {
        dispatch(userIsTyping(response.data));
      },
    },
    {
      eventName: 'chat:userIsStoppingToTypeMessageToTheFullRoom',
      event: (response: { data: { roomId: number; userData: UserType } }) => {
        dispatch(userIsNotTyping(response.data));
      },
    },
  ];
}
