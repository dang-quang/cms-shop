export interface IUser {
  accountType?: number;
  allowChangeDevice?: number;
  allowMultipleDevice?: number;
  avatarUrl?: null;
  checkLoginFailTime?: number;
  clientType?: number;
  consumerQrCode?: string;
  createTime?: number;
  expiredToken?: number;
  fullName?: string;
  id?: number;
  language?: string;
  lastLoginTime?: number;
  merchantQrCode?: string;
  msisdn?: string;
  numLoginFail?: number;
  otpType?: number;
  status?: number;
}

export interface IShop {
  address: string;
  avatar: string;
  createAt: number;
  description: string;
  email: string;
  id: number;
  nameOwnerShop: string;
  ownerShop: number;
  phone: string;
  shopCode: string;
  shopName: string;
  shopType: string;
  status: number;
}

export enum EAppKey {
  MSG_SUCCESS = 'MSG_SUCCESS',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}
