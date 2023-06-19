import { BASE_API_URL } from './const';
import { postWithCheckingToken } from './NetworkingAuth';

export function requestGetListCategory({ payload, shopId }) {
  return postWithCheckingToken(`${BASE_API_URL}/${shopId}/list-category`, {}, payload);
}

export function requestCreateUpdateProduct({ product }) {
  console.log('create update product parma==>', product);
  return postWithCheckingToken(`${BASE_API_URL}/shop/add-product`, {}, product);
}
