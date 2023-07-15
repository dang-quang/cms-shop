/**
 * Created by Long ND on 3/8/21.
 */

import { combineReducers } from 'redux';
import appReducer from './reducers/app';
import userReducer from './reducers/user';
import productReducer from './reducers/product';
import voucher from './reducers/voucher';
import flashSale from './reducers/flashSale';
import { routerReducer } from 'connected-next-router';

export default combineReducers({
  app: appReducer,
  user: userReducer,
  product: productReducer,
  router: routerReducer,
  voucher,
  flashSale,
});
