/**
 * Created by Long ND on 3/8/21.
 */

 export const USER_LOGIN = 'USER_LOGIN'
 export function userLogin(username, password) {
   return {
     type: USER_LOGIN,
     username,
     password,
   }
 }
 export const USER_LOGIN_NEW = 'USER_LOGIN_NEW'
 export function userLoginNew(username, password) {
   return {
     type: USER_LOGIN_NEW,
     username,
     password,
   }
 }

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export function userLoginSuccess(payload) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload,
  }
}

export const USER_LOGOUT = 'USER_LOGOUT'
export function userLogout() {
  return {
    type: USER_LOGOUT,
  }
}

export const USER_VERIFY = 'USER_VERIFY'
 export function userVerify(email, phone, answer) {
   return {
     type: USER_VERIFY,
     email,
     phone,
     answer
   }
 }