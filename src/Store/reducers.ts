import {combineReducers} from '@reduxjs/toolkit';
import {AuthApi} from 'src/Services/AuthApi';
import {UsersApi} from 'src/Services/UsersApi';
import authReducer from './AuthSlice';
import userReducer from './UserSlice';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    auth: authReducer,
    // [AuthApi.reducerPath]: AuthApi.reducer,
    users: userReducer,
    [UsersApi.reducerPath]: UsersApi.reducer,
    ...injectedReducers,
  });
  return rootReducer;
}
