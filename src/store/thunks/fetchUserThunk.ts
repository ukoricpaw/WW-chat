import { $api, $publicApi } from '../../axios/config';
import { TokenData, UserFieldsForPostingToServer } from '../../types/userTypes';
import { isAxiosError } from 'axios';
import { AppDispatch } from '..';
import { fetchUser, fetchUserWithError, fetchUserWithSuccess } from '../slices/userSlice';

export const fetchUserThunk = (body: UserFieldsForPostingToServer) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchUser());
      const authBody = {
        email: body.email,
        password: body.password,
      };
      const neededUrl = checkIsLoginAndReturnUrl(body.isLogin);
      const userData = await $api.post<TokenData>(`${process.env.REACT_APP_API_URL}/api/user/${neededUrl}`, authBody);
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
};

function checkIsLoginAndReturnUrl(isLogin: boolean) {
  return isLogin ? 'login' : 'registration';
}
