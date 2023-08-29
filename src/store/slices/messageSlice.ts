import { MessageType, MessagesState } from '../../types/messageTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { clearRoom } from './roomSlice';

const initialState: MessagesState = {
  messages: [],
};

const messageSlice = createSlice({
  name: 'messageSlice',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<MessageType>) {
      state.messages.push(action.payload);
    },
    getMessages(state, action: PayloadAction<MessageType[]>) {
      state.messages = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(clearRoom, state => {
      state.messages = [];
    });
  },
});

export const { addMessage, clearMessages, getMessages } = messageSlice.actions;
export default messageSlice.reducer;
