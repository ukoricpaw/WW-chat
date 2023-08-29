import { UserStateForSlice, UserType } from '../../types/userTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserThunk } from '../thunks/fetchUserThunk';

const initialState: UserStateForSlice = {
  isAuth: false,
  isLoading: false,
  isError: null,
  theme: 'light',
  data: {} as UserType,
};

const userSlice = createSlice({
  name: 'slices/user',
  initialState,
  reducers: {
    returnErrorToNull(state) {
      state.isError = null;
    },
    fetchUser(state) {
      state.data = {} as UserType;
      state.isError = null;
      state.isLoading = true;
      state.isAuth = false;
    },
    fetchUserWithSuccess(state, action: PayloadAction<UserType>) {
      state.isAuth = true;
      state.data = action.payload;
      state.isLoading = false;
    },
    fetchUserWithError(state, action: PayloadAction<string>) {
      state.isError = action.payload;
      state.isLoading = false;
    },
  },
});

export const { returnErrorToNull, fetchUser, fetchUserWithError, fetchUserWithSuccess } = userSlice.actions;
export default userSlice.reducer;
