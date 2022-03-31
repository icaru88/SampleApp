// saga
import {call, put} from '@redux-saga/core/effects';
import {createAction, PayloadAction} from '@reduxjs/toolkit';
import {fork, take} from 'redux-saga/effects';
import api from 'src/Services/Auth/api';
import {AuthDetails, AuthResult} from 'src/Services/AuthApi';
import {authActions, AuthState} from 'src/Store/AuthSlice';
import {
  retrieveUserToken,
  storeUserEmail,
  storeUserToken,
} from 'src/Utils/EncryptedStorage';

function* handleLogin(payload: AuthDetails) {
  const data: AuthResult = yield call(api.login, payload);
  console.log(data);

  if (data.token) {
    yield put(authActions.setAuthDetails({token: data.token}));
    yield call(storeUserToken, data.token);
    yield call(storeUserEmail, payload.email);
  }
}

export default function* watchLoginFlow() {
  while (true) {
    // const userToken: string = yield call(retrieveUserToken);
    // console.log(userToken);
    // if (!userToken) {
    const action: PayloadAction<AuthDetails> = yield take(
      loginAction.toString(),
      // authActions.login.type,
    );
    console.log(action);
    yield fork(handleLogin, action.payload);
    // }
  }
}

export const loginAction = createAction<AuthDetails>('Auth/loginSaga');
