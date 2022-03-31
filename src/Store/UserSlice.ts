import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from 'src/Model/User';
import {UsersApi} from 'src/Services/UsersApi';
import {RootState} from 'src/Store';

type UserState = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
};

const initialState: UserState = {
  page: 0,
  per_page: 0,
  total: 0,
  total_pages: 0,
  data: [],
};

const UsersSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    setUsersDetails: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
    reset: state => (state = initialState),
    // fetchUserList: (state, action: PayloadAction<UserState>) => {
    //   const payload = action.payload;
    //   state.page = payload.page;
    //   state.per_page = payload.per_page;
    //   state.total = payload.total;
    //   state.total_pages = payload.total_pages;
    //   state.data = state.data.concat(payload.data);
    // },
  },
  extraReducers: builder => {
    builder
      .addCase('Auth/clearAuthDetails', () => {
        return initialState;
      })
      // TODO - to remove
      .addMatcher(
        UsersApi.endpoints.listUsers.matchFulfilled,
        (state, {payload}) => {
          state.page = payload.page;
          state.per_page = payload.per_page;
          state.total = payload.total;
          state.total_pages = payload.total_pages;
          state.data = state.data.concat(payload.data);
        },
      );
  },
});
// Actions
export const userActions = UsersSlice.actions;

// Selectors
export const getCurrentUsersListingPage = (state: RootState) =>
  state.users.page;
export const getTotalUsersListingPage = (state: RootState) =>
  state.users.total_pages;
export const getUsersListing = (state: RootState) => state.users.data;

// Reducer
const userReducer = UsersSlice.reducer;
export default userReducer;
