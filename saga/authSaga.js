/**
 * Created by Long ND on 3/8/21.
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { USER_LOGIN, USER_LOGOUT, USER_VERIFY, userLoginSuccess } from '../redux/actions/user';
import { userLoginNew, userLoginOtp, verifyLogin } from '../utilities/ApiManage';
import { NotificationManager } from 'react-light-notifications';
import { push } from 'connected-next-router';
import { setShowLoader } from '../redux/actions/app';
import { decryptString, encryptSha256, encryptString } from '../utilities/utils';

function* userLoginSaga(action) {
  yield put(setShowLoader(true));
  try {
    const res = yield call(userLoginNew, action.username, action.password);

    if (res?.transId) {
      const otpText = `${res?.transId}123456`;
      const otpSign = yield call(encryptSha256, otpText, localStorage.getItem('RSASIGNATURE'));
      const loginResponse = yield call(userLoginOtp, otpSign.toString(), res?.transId, '123456');
      if (loginResponse?.accessToken && loginResponse?.status === 0) {
        localStorage.setItem('ACCESSSTOKEN', loginResponse.accessToken);
        yield put(userLoginSuccess(loginResponse?.userInfo));
        const decrypt = yield call(
          decryptString,
          loginResponse.accessToken,
          localStorage.getItem('RSAPRIVATE')
        );
        const encrypt = yield call(encryptString, decrypt, localStorage.getItem('RSAPUBLIC'));

        localStorage.setItem('LOGINTOKEN', encrypt);
        // end

        yield put(push('/admin/operation'));
      }
    } else {
      NotificationManager.error({
        title: 'Login',
        message: 'Username or Password is incorrect!',
      });
    }
  } catch (e) {
    (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') &&
      console.log('userLogin: ', e);
  }
  yield put(setShowLoader(false));
}

function* userLogoutSaga() {
  try {
    yield put(userLoginSuccess(undefined));
    localStorage.removeItem('ACCESSSTOKEN');
    localStorage.removeItem('LOGINTOKEN');
    yield put(push('/login'));
  } catch (e) {}
}

function* userVerifySaga(action) {
  yield put(setShowLoader(true));
  const language = localStorage.getItem('LANGUAGE');
  try {
    const res = yield call(verifyLogin, action.email, action.phone, action.answer);
    if (res?.verify) {
      localStorage.setItem('TOKEN', res.token);
      yield put(userLoginSuccess(res?.user));
      yield put(push('/admin/operation'));
    } else {
      switch (language) {
        case 'en':
          NotificationManager.error({
            title: 'Verify',
            message: 'Information is incorrect!',
          });
          break;
        case 'vi':
          NotificationManager.error({
            title: 'Xác thực',
            message: 'Thông tin không chính xác!',
          });
          break;
        default:
          NotificationManager.error({
            title: 'Verify',
            message: 'Information is incorrect!',
          });
      }
    }
    yield put(setShowLoader(false));
  } catch (e) {
    (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') &&
      console.log('userVerify: ', e);
  }
}

export default [
  takeLatest(USER_LOGIN, userLoginSaga),
  takeLatest(USER_LOGOUT, userLogoutSaga),
  takeLatest(USER_VERIFY, userVerifySaga),
];
