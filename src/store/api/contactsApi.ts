import { CountAndRows, UserType } from '../../types/userTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type SearchUsersQueryIParams = {
  search: string;
  page: number;
};

export const contactsApi = createApi({
  reducerPath: 'api/contacts',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL as string }),
  tagTypes: ['contacts', 'friendContacts'],
  endpoints: builder => ({
    fetchAllUsersBySearch: builder.query<CountAndRows<Omit<UserType, 'isActivated'>>, SearchUsersQueryIParams>({
      query: ({ search, page }) => ({
        url: '/api/search/getusers',
        params: {
          page,
          search,
        },
        credentials: 'include',
      }),
      providesTags: [{ type: 'contacts', id: 'LIST' }],
    }),
    fetchAllFriendsBySearch: builder.query<CountAndRows<Omit<UserType, 'isActivated'>>, SearchUsersQueryIParams>({
      query: ({ search, page }) => ({
        url: '/api/search/getfriendcontacts',
        params: {
          page,
          search,
        },
        credentials: 'include',
      }),
      providesTags: [{ type: 'friendContacts', id: 'LIST' }],
    }),
  }),
});

export const { useFetchAllUsersBySearchQuery, useFetchAllFriendsBySearchQuery } = contactsApi;

export type FetchUserType = typeof useFetchAllFriendsBySearchQuery;
