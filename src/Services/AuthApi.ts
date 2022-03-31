import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export type AuthDetails = {
  email: string;
  password: string;
};
export type AuthResult = {
  id?: string;
  token: string;
};

export const AuthApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://reqres.in/api/'}),
  tagTypes: ['Auth'],
  endpoints: builder => ({
    register: builder.mutation<AuthResult, AuthDetails>({
      query: ({email, password}) => ({
        url: 'register',
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),
    login: builder.mutation<AuthResult, AuthDetails>({
      query: body => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useRegisterMutation, useLoginMutation} = AuthApi;
