import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface IUserVerifyPayload {
  email: string;
  phone: string;
  answer: string;
}

export interface UserState {
  login: ILoginPayload | undefined;
  user: any | undefined;
  userVerify: IUserVerifyPayload | undefined;
}

const initialState: UserState = {
  login: undefined,
  user: undefined,
  userVerify: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state: UserState, { payload }: PayloadAction<ILoginPayload>) => {
      state.login = payload;
    },
    loginSuccess: (state: UserState, { payload }: PayloadAction<any>) => {
      state.user = payload;
    },
    logout: (state: UserState, { payload }: PayloadAction) => {},
    userVerify: (state: UserState, { payload }: PayloadAction<IUserVerifyPayload>) => {
      state.user = payload;
    },
  },
});

export const { userLogin, loginSuccess, logout, userVerify } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
