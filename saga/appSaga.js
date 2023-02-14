/**
 * Created by Long ND on 3/8/21.
 */

import { push } from 'connected-next-router';
import { call, put, takeLatest } from "redux-saga/effects";
import {
  CHANGE_LANGUAGE,
  CHANNEL, LOAD_BOOTSTRAP, SET_SIDEBAR, SHOW_SIDEBAR
} from "../redux/actions/app";
import { userLoginSuccess, userLogout } from "../redux/actions/user";
import store from '../redux/store';
import routes from "../routes.js";
import { getUserProfile } from "../utilities/ApiManage";

const getSideBar = async (pathName) => {
  let sidebar = ""
  routes.map((item) => {
    if (pathName.indexOf(item.layout + "/" + item.parent) > -1) {
      sidebar = item.parent;
    }
    else {
      if (item.subMenu) {
        item.subMenu.map((sub) => {
          if (pathName.indexOf(sub.layout + sub.path) > -1) {
            sidebar = sub.parent;
          }
        })
      } else {
        if (pathName.indexOf(item.path) > -1) {
          sidebar = item.parent;
        }
      }
    }
  })
  return sidebar
};

function* loadBootstrap() {
  const pathName = store.getState().router.location.pathname
  const sidebar = yield call(getSideBar, pathName);
  if (sidebar) {
    yield put({
      type: SET_SIDEBAR,
      sidebar: sidebar
    });
  }
  const showSidebar = store.getState().app.showSidebar
  if (showSidebar == undefined) {
    yield put({
      type: SHOW_SIDEBAR,
      showSidebar: true
    });
  }
  const token = localStorage.getItem("TOKEN");
  const language = localStorage.getItem("LANGUAGE") || 'en';
  const channel = localStorage.getItem("CHANNEL");
  if (channel) {
    yield put({
      type: CHANNEL,
      channel: channel
    });
  }
  if (language) {
    yield put({
      type: CHANGE_LANGUAGE,
      language: language
    });
  }
  if (token) {
    const res = yield call(getUserProfile);
    if (res?.email) {
      yield put(userLoginSuccess(res));
    }
    else {
      yield put(userLogout())
      yield put(push('/admin/login'));
    }
  }
  else {
    yield put(push('/admin/login'));
  }
}


export default [
  takeLatest(LOAD_BOOTSTRAP, loadBootstrap),
];

