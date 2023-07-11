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
  image?: string;
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
  quantity?: number;
  startDate?: number;
  endDate?: number;
  voucherCode?: string;
  type?: EVoucherType;
}

export interface IProgramVoucher {
  id?: number;
  banner?: string;
  description?: string;
  discountLimit?: number;
  discountValue?: number;
  maxDiscount?: number;
  maxOrderPrice?: number;
  maxShopRegister?: number;
  minDiscount?: number;
  minOrderPrice?: number;
  name?: string;
  programEnd: number;
  programStart: number;
  quantityVoucher?: number;
  registerEnd: number;
  registerPrice: number;
  registerStart: number;
  shopRegister?: null;
  status: EVoucherStatus;
  statusRegister: number;
  statusRegisterName: EVoucherRegisterStatus;
  typeDiscount: EDiscountType;
  typeLimit?: string;
}

export interface IShopProduct {
  categoryId?: number;
  categoryName?: string;
  countLike?: number;
  countView?: number;
  createAt?: number;
  createBy?: number;
  description?: string;
  discount?: number;
  discountType?: string;
  distance?: number;
  id?: number;
  image?: string;
  like?: string;
  listImage?: string;
  location?: string;
  name?: string;
  price?: number;
  productCode?: number;
  productDetail?: string;
  rating?: number;
  shopCode?: string;
  shopId?: number;
  shopName?: string;
  soldQuantity?: number;
  status?: string;
  stock?: number;
  isShow?: EShowProductType;
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

export enum EFlashSaleStatus {
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
  SELECTED_CATEGORY = 'SELECTED_CATEGORY',
  SELECTED_CATEGORY_SEARCH = 'SELECTED_CATEGORY_SEARCH',
  SEARCH_PRODUCT_NAME = 'SEARCH_PRODUCT_NAME',
  SEARCH_PRODUCT_STOCK_MIN = 'SEARCH_PRODUCT_STOCK_MIN',
  SEARCH_PRODUCT_STOCK_MAX = 'SEARCH_PRODUCT_STOCK_MAX',
  SEARCH_PRODUCT_CATEGORY = 'SEARCH_PRODUCT_CATEGORY',
  DO_SEARCH_PRODUCT = 'DO_SEARCH_PRODUCT',
  SELECTED_VOUCHERS = 'SELECTED_VOUCHERS',
  SEARCH_VOUCHER_NAME = 'SEARCH_VOUCHER_NAME',
  SEARCH_PROGRAM_VOUCHER_NAME = 'SEARCH_PROGRAM_VOUCHER_NAME',
  SEARCH_PROGRAM_VOUCHER_DATE = 'SEARCH_PROGRAM_VOUCHER_DATE',
  DO_SEARCH_VOUCHER = 'DO_SEARCH_VOUCHER',
}

export enum EProductType {
  STOCK = 'STOCK',
  SOLD_OUT = 'SOLD_OUT',
  DELIST = 'DELIST',
  DELETE = 'DELETE',
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
}

export enum EShowProductType {
  DELISTED = 'DELISTED',
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
}

export enum EShowFlashSaleType {
  TURN_ON = 'TURN_ON',
  TURN_OFF = 'TURN_OFF',
}

export enum EVoucherType {
  VOUCHER_SHOP = 'VOUCHER_SHOP',
  VOUCHER_PRODUCT = 'VOUCHER_PRODUCT',
}

export enum EVoucherRegisterStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  UNREGISTERED = 'UNREGISTERED',
  UNAPPROVED = 'UNAPPROVED',
}
