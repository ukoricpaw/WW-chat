import { DataByJoiningToDialog, RoomsResponse, RoomsState } from '../../types/roomTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getDialogRooms, getGroupRooms, getRoomIds } from '../../utils/getRooms';
import clearRoomByIdUtil from '../../utils/clearRoomByIdUtil';

const initialState: RoomsState = {
  rooms: [],
  roomIds: [],
  isLoading: true,
};

const roomsSlice = createSlice({
  name: 'roomSlice',
  initialState,
  reducers: {
    clearRoomById(state, action: PayloadAction<number>) {
      clearRoomByIdUtil(state, action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    getRooms(state, action: PayloadAction<RoomsResponse>) {
      getDialogRooms(state, action.payload);
      getGroupRooms(state, action.payload);
      getRoomIds(state, action.payload);
      state.isLoading = false;
    },
    getNewRoom(state, action: PayloadAction<DataByJoiningToDialog>) {
      if (action.payload.data.room && action.payload.data.user) {
        state.roomIds.push(action.payload.data.room?.id);
        state.rooms.push({
          groupInfo: null,
          lastMessage: null,
          userInfo: {
            ...action.payload.data.user,
            isOnline: false,
            isTyping: false,
          },
          roomId: action.payload.data.room.id,
          roomType: 'dialog',
        });
      }
    },
  },
});

export const { setLoading, getRooms, getNewRoom, clearRoomById } = roomsSlice.actions;

export default roomsSlice.reducer;
