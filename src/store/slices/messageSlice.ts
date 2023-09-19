import { MessageType, MessagesState } from '../../types/messageTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { pushNotification } from './roomsSlice';
import { getMessagesThunk } from '../thunks/getMessagesThunk';

const initialState: MessagesState = {
  messages: [],
  roomId: null,
  isLoading: true,
  totalCount: 0,
  page: 1,
};

const messageSlice = createSlice({
  name: 'messageSlice',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    getRoomId(state, action: PayloadAction<number>) {
      state.roomId = action.payload;
    },
    getMessages(state, action: PayloadAction<MessageType[]>) {
      state.messages = action.payload.reverse();
    },
    clearMessages(state) {
      state.roomId = null;
      state.messages = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(pushNotification, (state, action) => {
      if (state.roomId !== action.payload.data.room.id) {
        return;
      }
      state.messages.push(action.payload.data.lastMessage);
    });
    builder.addCase(getMessagesThunk.fulfilled, (state, action) => {
      state.messages.push(action.payload?.data);
    });
  },
});

export const { setIsLoading, clearMessages, getMessages, getRoomId } = messageSlice.actions;
export default messageSlice.reducer;
