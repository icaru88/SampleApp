import {fork} from 'redux-saga/effects';
import watchLoginFlow from './login';
import registerSaga from './register';

export default function* AuthSaga() {
  yield fork(watchLoginFlow);
  yield fork(registerSaga);
}
