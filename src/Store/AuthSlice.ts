import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'src/Store';

import {AuthDetails, AuthResult} from '~/Services/AuthApi';

export type AuthState = {
  token: string | null;
};

const initialState: AuthState = {
  token: null,
};

const AuthSlice = createSlice({
  // auto generate action creators that correspond to each case reducer function
  name: 'Auth',
  initialState,
  reducers: {
    // direct mutate or immutable updates is safe in redux-toolkit (createSlice and createReducer) using Immer
    setAuthDetails: (state, action: PayloadAction<AuthState>) => {
      console.log('setAuthDetails', action);
      state.token = action?.payload?.token;
    },
    clearAuthDetails: state => {
      state.token = null;
    },
    // register: (state, action) => {},
    // login: (state, action: PayloadAction<AuthDetails>) => {},
  },
  // extraReducers: builder => {
  //   builder.addMatcher(
  //     AuthApi.endpoints.login.matchFulfilled,
  //     (state, {payload}) => {
  //       state.token = payload.token;
  //     },
  //   );
  // },
});
export const authActions = AuthSlice.actions;

export const getCurrentAuthUserToken = (state: RootState) => state.auth.token;

const authReducer = AuthSlice.reducer;
export default authReducer;
