import { BASE_API_URL } from './const';
import { postWithCheckingToken } from './NetworkingAuth';

export function requestGetListCategory(payload) {
  return postWithCheckingToken(`${BASE_API_URL}/shop/list-category`, {}, payload);
}

export function requestCreateUpdateProduct(payload) {
  console.log('create update product parma==>', payload);
  return postWithCheckingToken(`${BASE_API_URL}/shop/add-product`, {}, payload);
}
