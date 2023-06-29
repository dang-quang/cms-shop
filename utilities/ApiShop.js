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

export function requestDeleteFlashSale(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/flash-sale/delete`, {}, obj);
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
