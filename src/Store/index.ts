import {configureStore} from '@reduxjs/toolkit';
import {AuthApi} from 'src/Services/AuthApi';
import {UsersApi} from 'src/Services/UsersApi';
import {AuthSlice} from 'src/Store/AuthSlice';
import {UsersSlice} from 'src/Store/UserSlice';

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    users: UsersSlice.reducer,
    [UsersApi.reducerPath]: UsersApi.reducer,
  },
  middleware: getDefaultMiddleware => {
    const customMiddleware = [AuthApi.middleware, UsersApi.middleware];
    return getDefaultMiddleware().concat(customMiddleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
