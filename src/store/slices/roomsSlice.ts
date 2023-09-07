import {
  DataByJoiningToDialog,
  DialogRoomResponse,
  RoomNotificationMessageResponse,
  RoomsResponse,
  RoomsState,
} from '../../types/roomTypes';
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
    pushNotification(state, action: PayloadAction<RoomNotificationMessageResponse>) {
      let indexOfRoom: number | null = null;
      const roomIdIfIsExist = state.roomIds.find((roomId, index) => {
        if (roomId === action.payload.data.room.id) {
          indexOfRoom = index;
          return true;
        }
        return false;
      });
      if (roomIdIfIsExist && indexOfRoom !== null) {
        const [roomId] = state.roomIds.splice(indexOfRoom, 1);
        const [room] = state.rooms.splice(indexOfRoom, 1);
        room.lastMessage = action.payload.data.lastMessage;
        state.roomIds.unshift(roomId);
        state.rooms.unshift(room);
      } else {
        state.roomIds.push(action.payload.data.room.id);
        state.rooms.push({
          groupInfo: null,
          lastMessage: action.payload.data.lastMessage,
          userInfo: {
            ...(action.payload.data as DialogRoomResponse).user,
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

export const { setLoading, getRooms, getNewRoom, clearRoomById, pushNotification } = roomsSlice.actions;

export default roomsSlice.reducer;
