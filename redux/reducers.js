/**
 * Created by Long ND on 3/8/21.
 */

 import {combineReducers} from 'redux'
 import appReducer from './reducers/app'
 import userReducer from './reducers/user'
 import { routerReducer } from 'connected-next-router'
 
 export default combineReducers({
   app: appReducer,
   user: userReducer,
   router: routerReducer,
 })
 