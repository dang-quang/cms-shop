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

export interface ISMSMessage {
  image: string;
  code: string;
  quantity: number;
  startDate: number;
  endDate: number;
  price: number;
  status: ESMSStatus;
}

export interface IVoucher {
  banner?: string;
  createAt?: number;
  description?: string;
  discountLimit?: number;
  discountValue: number;
  id?: number;
  maxDiscount?: number;
  maxOrderPrice?: number;
  maxShopRegister?: number;
  minDiscount?: number;
  minOrderPrice?: number;
  name?: string;
  programEnd: number;
  programStart: number;
  quantityVoucher: number;
  registerEnd: number;
  registerPrice: number;
  registerStart: number;
  shopRegister?: null;
  status: EVoucherStatus;
  typeDiscount?: EDiscountType;
  typeLimit?: EDiscountLimitType;
  updateAt?: number;
}

export interface IProduct {
  id: number;
  name: string;
  image: string;
  sales: number;
  price: number;
  stock: number;
}

export enum EAppKey {
  LOGIN_TOKEN = 'LOGIN_TOKEN',
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  MSG_SUCCESS = 'MSG_SUCCESS',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  LANGUAGE = 'LANGUAGE',
  CHANNEL = 'CHANNEL',
}

export enum EDiscountType {
  PERCENT = 'PERCENT',
  CASH = 'CASH',
}

export enum EShopLimitType {
  SHOP_LIMIT = 'SHOP_LIMIT',
  NO_LIMIT = 'NO_LIMIT',
}

export enum EDiscountLimitType {
  AMOUNT = 'AMOUNT',
  NO_LIMIT = 'NO_LIMIT',
}

export enum EVoucherStatus {
  HAPPENING = 'HAPPENING',
  UPCOMING = 'UPCOMING',
  FINISHED = 'FINISHED',
}

export enum EMode {
  ADD = 'add',
  UPDATE = 'update',
}

export enum ESMSStatus {
  UNREGISTERED = 'UNREGISTERED',
  AWAITING_REGISTRATION = 'AWAITING_REGISTRATION',
  REGISTERED = 'REGISTERED',
}

export enum ActionTypes {
  APPROVE_PRODUCTS = 'APPROVE_PRODUCTS',
  MODAL_SELECT_PRODUCTS = 'MODAL_SELECT_PRODUCTS',
  SELECTED_PRODUCTS = 'SELECTED_PRODUCTS',
}
