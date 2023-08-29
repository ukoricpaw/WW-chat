import {
  FetchUserType,
  useFetchAllFriendsBySearchQuery,
  useFetchAllUsersBySearchQuery,
} from '../store/api/contactsApi';
import { SearchState } from '../types/searchTypes';

export const FetchingUserDataBySearch = (): { [key in SearchState['typeOfResult']]: FetchUserType } => {
  return {
    users: useFetchAllUsersBySearchQuery,
    friends: useFetchAllFriendsBySearchQuery,
  };
};
