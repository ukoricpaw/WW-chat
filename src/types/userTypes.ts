export interface CountAndRows<T> {
  count: number;
  rows: T[];
}

export interface UserFieldsForPostingToServer {
  email: string;
  password: string;
  isLogin: boolean;
}

export interface UserStateForSlice {
  isAuth: boolean;
  isLoading: boolean;
  isError: null | string;
  data: UserType;
  theme: 'light' | 'dark';
}

export interface UserType {
  id: number;
  email: string;
  avatar: null | string;
  isActivated: boolean;
}

export type TokenData = {
  accessToken: string;
  refreshToken: string;
  user: UserType;
};
