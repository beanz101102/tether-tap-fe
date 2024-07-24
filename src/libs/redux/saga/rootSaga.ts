import { all } from 'redux-saga/effects';
import { watchSendSocketRequest } from './socketSaga';

export default function* rootSaga() {
  yield all([watchSendSocketRequest()]);
}
