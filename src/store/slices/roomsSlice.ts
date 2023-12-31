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
import { UserType } from '../../types/userTypes';

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
        const room = state.rooms.at(indexOfRoom);
        if (room) {
          room.lastMessage = action.payload.data.lastMessage;
        }
        if (indexOfRoom !== 0) {
          const [roomId] = state.roomIds.splice(indexOfRoom, 1);
          const [room] = state.rooms.splice(indexOfRoom, 1);
          state.roomIds.unshift(roomId);
          state.rooms.unshift(room);
        }
      } else {
        state.roomIds.unshift(action.payload.data.room.id);
        state.rooms.unshift({
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
    userIsTyping(state, action: PayloadAction<{ roomId: number; userData: UserType }>) {
      const room = state.rooms.find(room => room.roomId == action.payload.roomId);
      if (room) {
        if (room.userInfo) {
          room.userInfo.isTyping = true;
        }
      }
    },

    userIsNotTyping(state, action: PayloadAction<{ roomId: number; userData: UserType }>) {
      const room = state.rooms.find(room => room.roomId == action.payload.roomId);
      if (room) {
        if (room.userInfo) {
          room.userInfo.isTyping = false;
        }
      }
    },
  },
});

export const { userIsNotTyping, userIsTyping, setLoading, getRooms, getNewRoom, clearRoomById, pushNotification } =
  roomsSlice.actions;

export default roomsSlice.reducer;
