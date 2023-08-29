import { MessagesState } from '../../types/messageTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { clearRoom } from './roomSlice';

const initialState: MessagesState = {
  messages: [],
};

const messageSlice = createSlice({
  name: 'messageSlice',
  initialState,
  reducers: {
    // addMessage(state, action: PayloadAction<MessageType>) {
    addMessage(state, action: PayloadAction<string>) {
      state.messages.push({
        createdAt: new Date().toDateString(),
        message: action.payload,
      });
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

export const { addMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
