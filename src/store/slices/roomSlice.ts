import { DataByJoiningToDialog, RoomState } from '../../types/roomTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import joinToDialogFunc from '../../utils/joinToDialog';

const initialState: RoomState = {
  groupInfo: null,
  userInfo: null,
  roomId: null,
  roomType: 'dialog',
  isLoading: true,
};

const roomSlice = createSlice({
  name: 'roomSlice',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    clearRoom(state) {
      state.roomId = null;
      state.groupInfo = null;
      state.userInfo = null;
    },
    joinToDialog(state, action: PayloadAction<DataByJoiningToDialog>) {
      joinToDialogFunc(state, action.payload);
      state.isLoading = false;
    },
  },
});

export const { clearRoom, joinToDialog, setLoading } = roomSlice.actions;

export default roomSlice.reducer;
