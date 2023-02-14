/*eslint-disable*/
/**
 * Created by Long ND on 3/8/21.
 */

 import {call, put, takeLatest, all, select} from 'redux-saga/effects'
 import authSaga from './authSaga'
 import appSaga from './appSaga'
 
 function* rootSaga() {
   yield all([...authSaga, ...appSaga])
 }
 
 export default rootSaga