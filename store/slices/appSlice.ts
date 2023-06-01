import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EAppKey } from '../../constants/types';
import { RootState } from '../store';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AppState {
  appStack: any;
  language: any;
  channel: any;
  showSidebar: boolean;
  sideBar: any;
  showLoader: boolean;
  selectedGameTab: boolean;
}

const initialState: AppState = {
  appStack: '',
  language: '',
  channel: '',
  showSidebar: false,
  sideBar: '',
  showLoader: false,
  selectedGameTab: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStack: (state: AppState, { payload }: PayloadAction<string>) => {
      state.appStack = payload;
    },
    setLanguage: (state: AppState, { payload }: PayloadAction<string>) => {
      localStorage.setItem(EAppKey.LANGUAGE, payload);
      state.language = payload;
    },
    setChanel: (state: AppState, { payload }: PayloadAction<string>) => {
      localStorage.setItem(EAppKey.CHANNEL, payload);
      state.channel = payload;
    },
    setShowSidebar: (state: AppState, { payload }: PayloadAction<boolean>) => {
      state.showSidebar = payload;
    },
    setSideBar: (state: AppState, { payload }: PayloadAction<any>) => {
      state.sideBar = payload;
    },
    setShowLoader: (state: AppState, { payload }: PayloadAction<boolean>) => {
      state.showLoader = payload;
    },
    setSelectedGameTab: (state: AppState, { payload }: PayloadAction<boolean>) => {
      state.selectedGameTab = payload;
    },
  },
});

export const {
  setAppStack,
  setLanguage,
  setChanel,
  setShowSidebar,
  setSideBar,
  setShowLoader,
  setSelectedGameTab,
} = appSlice.actions;

export const appSelector = (state: RootState) => state.app;

export default appSlice.reducer;
