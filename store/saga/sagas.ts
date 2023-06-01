import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import appSaga from './appSaga';

function* rootSaga() {
  yield all([...authSaga, ...appSaga]);
}

export default rootSaga;
