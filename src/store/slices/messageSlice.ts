import { MessageType, MessagesState } from '../../types/messageTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: MessagesState = {
  messages: [],
  isLoading: true,
};

const messageSlice = createSlice({
  name: 'messageSlice',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    addMessage(state, action: PayloadAction<MessageType>) {
      state.messages.push(action.payload);
    },
    getMessages(state, action: PayloadAction<MessageType[]>) {
      state.messages = action.payload.reverse();
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const { setIsLoading, addMessage, clearMessages, getMessages } = messageSlice.actions;
export default messageSlice.reducer;
