import { DataByJoiningToDialog, RoomsResponse, RoomsState } from '../../types/roomTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getDialogRooms, getGroupRooms, getRoomIds } from '../../utils/getRooms';
import clearRoomByIdUtil from '../../utils/clearRoomByIdUtil';
import { pushNewRoom } from '../../utils/pushNewRoom';

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
      pushNewRoom(state, action.payload);
    },
  },
});

export const { setLoading, getRooms, getNewRoom, clearRoomById } = roomsSlice.actions;

export default roomsSlice.reducer;
