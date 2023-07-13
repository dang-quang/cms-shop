import { BASE_API_URL } from './const';
import { postWithCheckingToken } from './NetworkingAuth';

export function requestGetListCategory(payload) {
  return postWithCheckingToken(`${BASE_API_URL}/shop/list-category`, {}, payload);
}

export function requestCreateUpdateProduct(payload) {
  console.log('create update product params ========>', payload);
  return postWithCheckingToken(`${BASE_API_URL}/shop/add-product`, {}, payload);
}

export function requestGetListShopProduct(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/shop/list-product`, {}, obj);
}

export function requestUpdateStatusProduct(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/shop/update-status-product`, {}, obj);
}

export function requestGetListFlashSale(obj) {
  console.log('get list flash sale params ========>', obj);
  return postWithCheckingToken(`${BASE_API_URL}/flash-sale/shop-list-flash-sale`, {}, obj);
}

export function requestShopDeleteFlashSale(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/flash-sale/shop-delete-flash-sale`, {}, obj);
}

export function requestCreateShopFlashSale(payload) {
  console.log('create shop flash sale params ========>', payload);
  return postWithCheckingToken(`${BASE_API_URL}/flash-sale/shop-save-flash-sale`, {}, payload);
}

export function requestGetListCategoryShop(payload) {
  return postWithCheckingToken(`${BASE_API_URL}/shop/list-category-in-shop`, {}, payload);
}

export function requestUpdateStatusFlashSaleShop(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/flash-sale/shop-update-status`, {}, obj);
}

export function requestGetProductInfo(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/product/product-info`, {}, obj);
}

export function requestGetListVoucherShop(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/voucher/shop-list-voucher`, {}, obj);
}

export function requestCreateUpdateVoucherShop(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/voucher/shop-save-voucher`, {}, obj);
}

export function requestDeleteVoucherShop(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/voucher/delete`, {}, obj);
}

export function requestGetShopListProgram(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/voucher/shop-list-program`, {}, obj);
}

export function requestRegisterShopProgramVoucher(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/voucher/shop-register-program`, {}, obj);
}

export function requestGetFlashSaleDetailsShop(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/flash-sale/shop-detail-flash-sale`, {}, obj);
}
