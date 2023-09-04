import { DataByJoiningToDialog, RoomsState } from '../types/roomTypes';

export const pushNewRoom = (state: RoomsState, payload: DataByJoiningToDialog) => {
  if (payload.data.room && payload.data.user) {
    state.roomIds.push(payload.data.room?.id);
    state.rooms.push({
      groupInfo: null,
      lastMessage: null,
      userInfo: {
        ...payload.data.user,
        isOnline: false,
        isTyping: false,
      },
      roomId: payload.data.room.id,
      roomType: 'dialog',
    });
  }
};
