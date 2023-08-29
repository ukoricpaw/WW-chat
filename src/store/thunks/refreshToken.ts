import { AppDispatch } from '..';
import { $api } from '../../axios/config';
import { TokenData } from '../../types/userTypes';
import { fetchUser, fetchUserWithError, fetchUserWithSuccess } from '../slices/userSlice';
import { isAxiosError } from 'axios';

export default function refreshToken() {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchUser());
      const userData = await $api.get<TokenData>(`${process.env.REACT_APP_API_URL}/api/user/refresh`);
      dispatch(fetchUserWithSuccess(userData.data.user));
      return 'success';
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(fetchUserWithError(err.response?.data.message));
      } else {
        dispatch(fetchUserWithError('Произошла ошибка'));
      }
    }
  };
}
