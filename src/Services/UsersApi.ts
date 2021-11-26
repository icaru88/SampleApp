import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {User} from 'src/Model/User';

type ListResponse<T> = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
};

type pageDetail = {
  page: number;
  per_page: number;
};
export const UsersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://reqres.in/api/'}),
  tagTypes: ['Users'],
  endpoints: builder => ({
    listUsers: builder.query<ListResponse<User>, pageDetail>({
      query: ({page = 1, per_page}) =>
        `users?page=${page}&per_page=${per_page}`,
    }),
  }),
});

export const {useListUsersQuery} = UsersApi;
