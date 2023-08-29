import { ChatsState } from '../../types/roomTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ChatsState = {
  chats: [],
};

const chatsSlice = createSlice({
  name: 'chatsSlice',
  initialState,
  reducers: {},
});

export const {} = chatsSlice.actions;

export default chatsSlice.reducer;
