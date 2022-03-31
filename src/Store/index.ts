import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {createInjectorsEnhancer} from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import {UsersApi} from 'src/Services/UsersApi';
import rootSaga from '../Saga';
import createReducer from './reducers';

const reduxSagaMonitorOptions = {};
const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
const {run: runSaga} = sagaMiddleware;

const middlewares = [sagaMiddleware, UsersApi.middleware];

const enhancers = [
  createInjectorsEnhancer({
    createReducer,
    runSaga,
  }),
];
export const store = configureStore({
  reducer: createReducer(),
  // middlewares,
  middleware: getDefaultMiddleware => {
    // const customMiddleware = [AuthApi.middleware, UsersApi.middleware];
    return getDefaultMiddleware({
      // thunk: false,
      // serializableCheck: false,
    }).concat(middlewares);
  },
  enhancers,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// TODO - might needed - for yield put action error
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
