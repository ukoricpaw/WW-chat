import { RoomState } from '../../types/roomTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: RoomState = {
  groupInfo: null,
  userInfo: null,
  roomType: 'dialog',
};

const roomSlice = createSlice({
  name: 'roomSlice',
  initialState,
  reducers: {
    clearRoom(state) {
      state.groupInfo = null;
      state.userInfo = null;
    },
  },
});

export const { clearRoom } = roomSlice.actions;

export default roomSlice.reducer;
