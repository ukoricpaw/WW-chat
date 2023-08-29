import { DataByJoiningToDialog, RoomState } from '../types/roomTypes';

export default function joinToDialogFunc(state: RoomState, data: DataByJoiningToDialog) {
  state.roomType = 'dialog';
  state.roomId = data.data.room.id;
  state.userInfo = { ...data.data.user, isOnline: false, isTyping: false };
}
