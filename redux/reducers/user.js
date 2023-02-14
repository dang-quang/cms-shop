/**
 * Created by Long ND on 3/8/21.
 */
 import {USER_LOGIN_SUCCESS, USER_LOGOUT} from '../actions/user'

 const initialState = {
 }
 export default function user(state = initialState, action) {
   switch (action.type) {
     case USER_LOGOUT:
       return {
         ...state,
         userInfo: '',
       }
     case USER_LOGIN_SUCCESS:
       return {
         ...state,
         userInfo: action.payload,
       }
     default:
       return state
   }
 }