/**
 * Created by Long ND on 3/8/21.
 */

import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  USER_LOGIN,
  USER_LOGOUT,
  userLoginSuccess,
  USER_VERIFY,
} from "../redux/actions/user";
import { userLogin, userLoginNew, getUserProfile, verifyLogin } from "../utilities/ApiManage";
import {
  NotificationContainer,
  NotificationManager,
} from "react-light-notifications";
import {
  push,
  replace,
  goBack,
  goForward,
  prefetch,
} from "connected-next-router";
import Cookies from 'js-cookie';
import { setShowLoader } from "../redux/actions/app";
import {decryptString, encryptString} from "../utilities/utils";

function* userLoginSaga(action) {
  yield put(setShowLoader(true));
  const language = localStorage.getItem("LANGUAGE");
  try {
    const res = yield call(userLogin, "truonglq@knic.vn", "Knic#2021", Cookies.get('_ati'));

    const res1 = yield call(userLoginNew, action.username, action.password); // tam thu

    if (res?.token && !res?.twoverify && res1?.accessToken) {
      localStorage.setItem("TOKEN", res.token);
      // yield put(userLoginSuccess(res?.user));

      //tam thu
      localStorage.setItem("ACCESSSTOKEN", res1.accessToken);
      yield put(userLoginSuccess(res1?.userInfo));
   
      const decrypt = yield call(decryptString, res1.accessToken, localStorage.getItem("RSAPRIVATE"));
      const encrypt = yield call(encryptString, decrypt, localStorage.getItem("RSAPUBLIC"));

      localStorage.setItem('LOGINTOKEN', encrypt);
      // end

      yield put(push("/admin/operation"));
    } else {
      if (res?.twoverify) {
        NotificationManager.error({
          title: "Login",
          message: "Login failed, please verify your account!",
        });
        yield put(push("/admin/verify"));
      }
      switch (language) {
        case "en":
          NotificationManager.error({
            title: "Login",
            message: "Username or Password is incorrect!",
          });
          break;
        case "vi":
          NotificationManager.error({
            title: "Đăng nhập",
            message: "Tài khoản hoặc Mật khẩu không chính xác!",
          });
          break;
        default:
          NotificationManager.error({
            title: "Login",
            message: "Username or Password is incorrect!",
          });
      }
    }
    yield put(setShowLoader(false));
  } catch (e) {
    (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
      console.log("userLogin: ", e);
  }
}

function* userLogoutSaga() {
  try {
    yield put(userLoginSuccess(undefined));
    localStorage.removeItem("TOKEN");
    yield put(push("/admin/login"));
  } catch (e) { }
}

function* userVerifySaga(action) {
  yield put(setShowLoader(true));
  const language = localStorage.getItem("LANGUAGE");
  try {
    const res = yield call(verifyLogin, action.email, action.phone, action.answer);
    if (res?.verify) {
      localStorage.setItem("TOKEN", res.token);
      yield put(userLoginSuccess(res?.user));
      yield put(push("/admin/operation"));
    } else {
      switch (language) {
        case "en":
          NotificationManager.error({
            title: "Verify",
            message: "Information is incorrect!",
          });
          break;
        case "vi":
          NotificationManager.error({
            title: "Xác thực",
            message: "Thông tin không chính xác!",
          });
          break;
        default:
          NotificationManager.error({
            title: "Verify",
            message: "Information is incorrect!",
          });
      }
    }
    yield put(setShowLoader(false));
  } catch (e) {
    (!process.env.NODE_ENV || process.env.NODE_ENV === "development") &&
      console.log("userVerify: ", e);
  }
}

function handleError () {
  const language = localStorage.getItem("LANGUAGE");

  switch (language) {
    case "en":
      NotificationManager.error({
        title: "Error",
        message: "Network Error",
      });
      break;
    case "vi":
      NotificationManager.error({
        title: "Error",
        message: "Network Error",
      });
      break;
    default:
      NotificationManager.error({
        title: "Error",
        message: "Network Error",
      });
  }
}



export default [
  takeLatest(USER_LOGIN, userLoginSaga),
  takeLatest(USER_LOGOUT, userLogoutSaga),
  takeLatest(USER_VERIFY, userVerifySaga),
];
