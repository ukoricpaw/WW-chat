import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import { contactsApi } from './api/contactsApi';
import searchSlice from './slices/searchSlice';
import messageSlice from './slices/messageSlice';
import roomSlice from './slices/roomsSlice';

const rootReducer = combineReducers({
  roomReducer: roomSlice,
  messagesReducer: messageSlice,
  searchReducer: searchSlice,
  userReducer: userSlice,
  [contactsApi.reducerPath]: contactsApi.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat([contactsApi.middleware]);
    },
  });

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
