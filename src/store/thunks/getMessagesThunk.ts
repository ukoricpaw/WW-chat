import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../axios/config';
import { isAxiosError } from 'axios';

interface MessagesRequestInterface {
  page: number;
  limit: number;
  roomId: number;
}

export const getMessagesThunk = createAsyncThunk(
  'messagesThunk',
  async ({ page, limit, roomId }: MessagesRequestInterface, { rejectWithValue }) => {
    try {
      const messages = await $api.get(`${process.env.REACT_APP_API_URL}/api/messages/${roomId}`, {
        params: {
          limit,
          page,
        },
      });
      return messages;
    } catch (err) {
      if (isAxiosError(err)) {
        rejectWithValue(err.response?.data.message);
      } else {
        rejectWithValue('Произошла ошибка');
      }
    }
  },
);
