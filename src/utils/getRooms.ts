import { RoomsResponse, RoomsState } from '../types/roomTypes';

export const getDialogRooms = (state: RoomsState, payload: RoomsResponse) => {
  payload.dialogRooms.rows.forEach(dialogRoom => {
    state.rooms.push({
      groupInfo: null,
      lastMessage: dialogRoom.lastMessage,
      userInfo: { ...dialogRoom.user, isOnline: false, isTyping: false },
      roomId: dialogRoom.room.id,
      roomType: 'dialog',
    });
  });
};

export const getGroupRooms = (state: RoomsState, payload: RoomsResponse) => {
  payload.groupRooms.rows.forEach(groupRoom => {
    state.rooms.push({
      groupInfo: {
        avatar: groupRoom.room.avatar,
        description: groupRoom.room.description,
        members: [],
        membersCount: 0,
        name: groupRoom.room.name as string,
      },
      lastMessage: groupRoom.lastMessage,
      roomId: groupRoom.room.id,
      roomType: 'group',
      userInfo: null,
    });
  });
};

export const getRoomIds = (state: RoomsState, payload: RoomsResponse) => {
  const allRooms = [...payload.groupRooms.rows, ...payload.dialogRooms.rows];
  allRooms.forEach(room => {
    state.roomIds.push(room.room.id);
  });
};
