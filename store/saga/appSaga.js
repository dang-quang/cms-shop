import { push } from 'connected-next-router';
import { call, put, takeLatest } from 'redux-saga/effects';
import routes from '../../routes';
import { setLanguage, setShowSidebar, setSideBar } from '../slices/appSlice';
import { loginSuccess, logout } from '../slices/userSlice';
import { getUserProfile } from 'utilities/ApiManage';
import store from 'store/store';
import { EAppKey } from 'constants/types';

const LOAD_BOOTSTRAP = 'LOAD_BOOTSTRAP';

const getSideBar = async (pathName) => {
  let sidebar = '';
  routes.map((item) => {
    if (pathName.indexOf(item.layout + '/' + item.parent) > -1) {
      sidebar = item.parent;
    } else {
      if (item.subMenu) {
        item.subMenu.map((sub) => {
          if (pathName.indexOf(sub.layout + sub.path) > -1) {
            sidebar = sub.parent;
          }
        });
      } else {
        if (pathName.indexOf(item.path) > -1) {
          sidebar = item.parent;
        }
      }
    }
  });
  return sidebar;
};

function* loadBootstrap() {
  const pathName = store.getState().app.appStack.location.pathname;
  const sidebar = yield call(getSideBar, pathName);
  if (sidebar) {
    yield put(setSideBar(sidebar));
  }
  const showSidebar = store.getState().app.showSidebar;
  if (showSidebar == undefined) {
    yield put(setShowSidebar(true));
  }
  //const token = localStorage.getItem(EAppKey.LOGIN_TOKEN);
  const token = localStorage.getItem('LOGINTOKEN');
  const language = localStorage.getItem(EAppKey.LANGUAGE) || 'en';

  if (language) {
    yield put(setLanguage(language));
  }
  if (token) {
    const res = yield call(getUserProfile);
    if (res?.userInfo) {
      yield put(loginSuccess(res?.userInfo));
    } else {
      yield put(logout());
      yield put(push('/login'));
    }
  } else {
    yield put(push('/login'));
  }
}

export default [takeLatest(LOAD_BOOTSTRAP, loadBootstrap)];
