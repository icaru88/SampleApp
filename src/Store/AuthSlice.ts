import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthApi} from 'src/Services/AuthApi';
import {RootState} from 'src/Store';

type AuthState = {
  token: string | null;
};

const initialState: AuthState = {
  token: null,
};

export const AuthSlice = createSlice({
  //auto generate action creators that correspond to each case reducer function
  name: 'Auth',
  initialState,
  reducers: {
    // direct mutate or immutable updates is safe in redux-toolkit (createSlice and createReducer) using Immer
    setAuthDetails: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
    },
    clearAuthDetails: state => {
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      AuthApi.endpoints.login.matchFulfilled,
      (state, {payload}) => {
        state.token = payload.token;
      },
    );
  },
});
export const getCurrentAuthUserToken = (state: RootState) => state.auth.token;
