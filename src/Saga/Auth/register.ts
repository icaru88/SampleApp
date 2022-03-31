// saga
import {call, put, takeLatest} from '@redux-saga/core/effects';
import {createAction, PayloadAction} from '@reduxjs/toolkit';
import api from 'src/Services/Auth/api';
import {AuthDetails, AuthResult} from 'src/Services/AuthApi';
import {authActions} from 'src/Store/AuthSlice';
import {storeUserEmail} from 'src/Utils/EncryptedStorage';

function* handleRegister(action: PayloadAction<AuthDetails>) {
  const data: AuthResult = yield call(api.register, action.payload);
  console.log(data);
  if (data.token) {
    yield put(
      authActions.setAuthDetails({
        token: data.token,
      }),
    );
    yield call(storeUserEmail, action.payload.email);
  }
}

export default function* registerSaga() {
  yield takeLatest(registerAction.toString(), handleRegister);
}

export const registerAction = createAction<AuthDetails>('Auth/registerSaga');
