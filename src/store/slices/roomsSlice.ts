import { RoomsResponse, RoomsState } from '../../types/roomTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getDialogRooms, getGroupRooms, getRoomIds } from '../../utils/getRooms';

const initialState: RoomsState = {
  rooms: [],
  roomIds: [],
  isLoading: true,
};

const roomsSlice = createSlice({
  name: 'roomSlice',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    getRooms(state, action: PayloadAction<RoomsResponse>) {
      getDialogRooms(state, action.payload);
      getGroupRooms(state, action.payload);
      getRoomIds(state, action.payload);
      state.isLoading = false;
    },
  },
});

export const { setLoading, getRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
