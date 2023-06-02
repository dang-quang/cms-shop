/**
 * Created by Long ND on 3/8/21.
 */
import md5 from 'md5';
import moment from 'moment';
import { getWithTimeout, postWithTimeout, putWithTimeout } from './networking';
import {
  getFileWithCheckingToken,
  getWithCheckingToken,
  postWithCheckingToken,
  putWithCheckingToken,
  postFileWithCheckingToken,
  deleteWithCheckingToken,
} from './NetworkingAuth';
import store from '../redux/store';
import Cookies from 'js-cookie';
import { BASE_API_URL } from './const';

let stagingUrl = 'https://node.tigerate.com/v1';
let baseUrl = stagingUrl;
const deviceModel = 'iPhone 13';
const osName = 'iOS';
const osVersion = '15.4';
const appVersion = '0.1';

function getUserInfoRedux() {
  return store.getState().user.userInfo;
}

export function verifyLogin(email, phone, answer) {
  return postWithCheckingToken(
    `${baseUrl}/users/verify`,
    {},
    {
      email,
      phone,
      answer,
    }
  );
}

export function getUserProfile() {
  return postWithCheckingToken(`${BASE_API_URL}/user/info`, {}, {});
}

export function getShopConnectURL(channel) {
  return postWithCheckingToken(`${baseUrl}/shop/auth`, {}, { channel: channel });
}

export function getShopConnectCrmUrl(shopId, channel) {
  Cookies.set('shop_id', shopId);
  return postWithCheckingToken(`${baseUrl}/shop/authCrm`, {}, { channel: channel });
}

export function addShop(shopId, auth_code, channel) {
  var body = {
    shopId: parseInt(shopId ?? 0),
    auth_code: auth_code,
    channel: channel,
    bus: getUserInfoRedux()?.bus ? getUserInfoRedux().bus : '',
    active: 1,
    editor: getUserInfoRedux()?.bus ? getUserInfoRedux().bus : '',
  };
  return postWithCheckingToken(`${baseUrl}/shop/verify`, {}, body);
}

export function syncProduct(body) {
  var params = {
    shopId: body.shopId,
  };
  return postWithCheckingToken(`${baseUrl}/shop/syncProduct`, {}, params);
}

export function activeCrm(id, active_crm, auth_code) {
  Cookies.remove('shop_id');
  return putWithCheckingToken(
    `${baseUrl}/shop/${id}`,
    {},
    {
      active_crm,
      auth_code,
    }
  );
}

export function getAllShop() {
  return getWithCheckingToken(
    `${baseUrl}/shop/bus/${getUserInfoRedux()?.bus ? getUserInfoRedux().bus : ''}`,
    {},
    {}
  );
}

export function getShop(id) {
  return getWithCheckingToken(`${baseUrl}/shop/${id}`, {}, {});
}

export function updateShop(id, name, code) {
  return putWithCheckingToken(
    `${baseUrl}/shop/${id}`,
    {},
    {
      name,
      code,
    }
  );
}

export function getOperationScreen() {
  return postWithCheckingToken(
    `${baseUrl}/dashboard/operation`,
    {},
    {
      time_to: '2021-09-16',
    }
  );
}

export function getOrderScreen() {
  return postWithCheckingToken(`${baseUrl}/order/getOrderScreen`, {}, {});
}

export function getOrderList(params) {
  return postWithCheckingToken(
    `${baseUrl}/order/getOrderList`,
    {},
    {
      ...params,
    }
  );
}

export function getRequestPayment(params) {
  return postWithTimeout(
    `${BASE_API_URL}/payment-request/get-list`,
    {
      'x-device-id': localStorage.getItem('DEVICEID'),
      language: localStorage.getItem('LANGUAGE'),
      Authorization: `${localStorage.getItem('ENCACCESSTOKEN')}##${localStorage.getItem(
        'LOGINTOKEN'
      )}`,
    },
    {
      ...params,
    }
  );
}

export function updateConfirmPayment(params) {
  return postWithCheckingToken(
    `${baseUrl}/payment/updateConfirm`,
    {},
    {
      ...params,
    }
  );
}

export function updateNotePayment(params) {
  return postWithCheckingToken(
    `${baseUrl}/payment/updateNote`,
    {},
    {
      ...params,
    }
  );
}
export function getOrderDetail(ordersn) {
  return postWithCheckingToken(
    `${baseUrl}/order/getOrderDetail`,
    {},
    {
      order_sn: ordersn,
    }
  );
}

export function getShipOrder(ordersn) {
  return postWithCheckingToken(
    `${baseUrl}/order/getShipOrder`,
    {},
    {
      order_sn: ordersn,
    }
  );
}

export function shipOrder(ordersn, pickup) {
  return postWithCheckingToken(
    `${baseUrl}/order/shipOrder`,
    {},
    {
      order_sn: ordersn,
      pickup: pickup,
    }
  );
}

export function cancelOrder(ordersn, reason) {
  return postWithCheckingToken(
    `${baseUrl}/order/cancelOrder`,
    {},
    {
      order_sn: ordersn,
      cancel_reason: reason,
    }
  );
}

export function getAirwayBill(ordersn) {
  return getFileWithCheckingToken(
    `${baseUrl}/order/getAirwayBill`,
    {},
    {
      order_sn: ordersn,
    }
  );
}

export function createAirwayBill(ordersn) {
  return postWithCheckingToken(
    `${baseUrl}/order/createAirwayBill`,
    {},
    {
      order_sn: ordersn,
    }
  );
}

export function getCreateItemScreen() {
  return postWithCheckingToken(`${baseUrl}/inventory/getCreateItemScreen`, {}, {});
}

export function createInventoryProp(propName, obj) {
  return postWithCheckingToken(
    `${baseUrl}/inventory/create/` + propName,
    {},
    {
      ...obj,
    }
  );
}

export function uploadImage(files) {
  return postFileWithCheckingToken(`${baseUrl}/media/uploadImage`, {}, files);
}

export function createInventoryItem(obj) {
  return postWithCheckingToken(
    `${baseUrl}/inventory/createItem`,
    {},
    {
      ...obj,
    }
  );
}

export function getCreateItemEcomScreen() {
  return postWithCheckingToken(`${baseUrl}/inventory/getCreateItemEcomScreen`, {}, {});
}

export function createItemFromEcom(shopId, sameSku, sameName) {
  return postWithCheckingToken(
    `${baseUrl}/inventory/createItemFromEcom`,
    {},
    {
      shop_id: shopId,
      same_sku: sameSku,
      same_name: sameName,
    }
  );
}

export function getInventoryScreen() {
  return postWithCheckingToken(`${baseUrl}/inventory/getInventoryScreen`, {}, {});
}

export function changePassword(email, new_password, password) {
  return putWithCheckingToken(
    `${baseUrl}/users/`,
    {},
    {
      email,
      new_password,
      password,
    }
  );
}

export function getInventoryItemList(obj) {
  return postWithCheckingToken(
    `${baseUrl}/inventory/getInventoryItemList`,
    {},
    {
      ...obj,
    }
  );
}

export function getInventoryItemDetail(id) {
  return postWithCheckingToken(
    `${baseUrl}/inventory/getInventoryItemDetail`,
    {},
    {
      item_id: id,
    }
  );
}

export function searchShopItem(keyword) {
  return postWithCheckingToken(
    `${baseUrl}/inventory/searchShopItem`,
    {},
    {
      keyword,
    }
  );
}

export function getAllSupplier() {
  return getWithCheckingToken(`${baseUrl}/supplier`, {}, {});
}

export function getAllStock() {
  return getWithCheckingToken(`${baseUrl}/stock`, {}, {});
}

export function getAllPurchaseOrder(obj) {
  return postWithCheckingToken(
    `${baseUrl}/purchase_order/getAllPurchaseOrder`,
    {},
    {
      ...obj,
    }
  );
}

export function createNewPurchaseOrder(obj) {
  obj.bus = getUserInfoRedux()?.bus ? getUserInfoRedux().bus : '';
  return postWithCheckingToken(
    `${baseUrl}/purchase_order`,
    {},
    {
      ...obj,
    }
  );
}

export function updatePurchaseOrder(obj) {
  return putWithCheckingToken(`${baseUrl}/purchase_order/${obj._id}`, {}, { ...obj });
}

export function getProductScreen() {
  return postWithCheckingToken(`${baseUrl}/product/getProductScreen`, {}, {});
}

export function getProductList(params) {
  return postWithCheckingToken(
    `${baseUrl}/product/getProductList`,
    {},
    {
      ...params,
    }
  );
}

export function getProductDetail(id) {
  return postWithCheckingToken(
    `${baseUrl}/product/getProductDetail`,
    {},
    {
      item_id: id,
    }
  );
}

export function copyProduct(list_id, shop_id, autoRename) {
  return postWithCheckingToken(
    `${baseUrl}/product/copyProduct`,
    {},
    {
      item_id_list: list_id,
      to_shop_id: shop_id,
      auto_rename: autoRename,
    }
  );
}

export function createNewSupplier(obj) {
  return postWithCheckingToken(
    `${baseUrl}/supplier`,
    {},
    {
      ...obj,
    }
  );
}

export function createNewStock(obj) {
  return postWithCheckingToken(
    `${baseUrl}/stock`,
    {},
    {
      ...obj,
    }
  );
}

export function getChannelData() {
  return postWithCheckingToken(`${baseUrl}/shop/getChannel`, {}, {});
}

export function updateShippingFee(obj) {
  return putWithCheckingToken(`${baseUrl}/shipping_fee/${obj._id}`, {}, { ...obj });
}

//Deal Shock
export function getAllDealShock(obj) {
  return postWithCheckingToken(`${baseUrl}/dealshock/getAllDealShock`, {}, { ...obj });
}

export function createNewDealShock(obj) {
  obj.bus = getUserInfoRedux()?.bus ? getUserInfoRedux().bus : '';
  return postWithCheckingToken(
    `${baseUrl}/dealshock/insertDealShock`,
    {},
    {
      ...obj,
    }
  );
}

export function getAllPromotionMarketing(obj) {
  return postWithCheckingToken(`${baseUrl}/promotion/getAllPromotionMarketing`, {}, { ...obj });
}

export function createNewPromotionMarketing(obj) {
  obj.bus = getUserInfoRedux()?.bus ? getUserInfoRedux().bus : '';
  return postWithCheckingToken(
    `${baseUrl}/promotion/insertPromotionMarketing`,
    {},
    {
      ...obj,
    }
  );
}

export function updatePromotionMarketing(obj) {
  return putWithCheckingToken(
    `${baseUrl}/promotion/updatePromotionMarketing/${obj._id}`,
    {},
    { ...obj }
  );
}

export function deletePromotionMarketing(id) {
  return postWithCheckingToken(`${baseUrl}/promotion/deletePromotionMarketing/${id}`, {}, {});
}

export function getCrmScreen() {
  return postWithCheckingToken(`${baseUrl}/crm/getCrmScreen`, {}, {});
}

export function getRateScreen() {
  return postWithCheckingToken(`${baseUrl}/crm/getRateScreen`, {}, {});
}

export function getCommentList(obj) {
  return postWithCheckingToken(
    `${baseUrl}/crm/getCommentList`,
    {},
    {
      ...obj,
    }
  );
}

export function replyComment(obj) {
  return postWithCheckingToken(
    `${baseUrl}/crm/replyComment`,
    {},
    {
      ...obj,
    }
  );
}

export function getTaskScreen() {
  return postWithCheckingToken(`${baseUrl}/task_manage/getTaskScreen`, {}, {});
}

export function getListUser() {
  return postWithCheckingToken(`${baseUrl}/task_manage/getListUser`, {}, {});
}

export function createTask(obj) {
  return postWithCheckingToken(
    `${baseUrl}/task_manage/createTask`,
    {},
    {
      ...obj,
    }
  );
}

export function updateTask(obj) {
  return postWithCheckingToken(
    `${baseUrl}/task_manage/updateTask`,
    {},
    {
      ...obj,
    }
  );
}

export function deleteTask(id) {
  return postWithCheckingToken(
    `${baseUrl}/task_manage/deleteTask`,
    {},
    {
      id: id,
    }
  );
}

export function getTaskDetail(obj) {
  return postWithCheckingToken(
    `${baseUrl}/task_manage/getTaskDetail`,
    {},
    {
      ...obj,
    }
  );
}

export function addMemberTask(id, list_member) {
  return postWithCheckingToken(
    `${baseUrl}/task_manage/addMemberTask`,
    {},
    {
      id: id,
      list_member: list_member,
    }
  );
}

export function removeMemberTask(id, member_id) {
  return postWithCheckingToken(
    `${baseUrl}/task_manage/removeMemberTask`,
    {},
    {
      id: id,
      member_id: member_id,
    }
  );
}

export function moveGroup(id, position) {
  return postWithCheckingToken(
    `${baseUrl}/task_manage/moveGroup`,
    {},
    {
      id: id,
      position: position,
    }
  );
}

export function createSubTask(obj) {
  return postWithCheckingToken(
    `${baseUrl}/task_manage/createSubTask`,
    {},
    {
      ...obj,
    }
  );
}

export function updateSubTask(obj) {
  return postWithCheckingToken(
    `${baseUrl}/task_manage/updateSubTask`,
    {},
    {
      ...obj,
    }
  );
}

export function deleteSubTask(id) {
  return postWithCheckingToken(
    `${baseUrl}/task_manage/deleteSubTask`,
    {},
    {
      id: id,
    }
  );
}

export function moveTask(id, task_id, position) {
  return postWithCheckingToken(
    `${baseUrl}/task_manage/moveTask`,
    {},
    {
      id: id,
      task_id: task_id,
      position: position,
    }
  );
}

export function addMemberSubTask(id, list_member) {
  return postWithCheckingToken(
    `${baseUrl}/task_manage/addMemberSubTask`,
    {},
    {
      id: id,
      list_member: list_member,
    }
  );
}

export function removeMemberSubTask(id, member_id) {
  return postWithCheckingToken(
    `${baseUrl}/task_manage/removeMemberSubTask`,
    {},
    {
      id: id,
      member_id: member_id,
    }
  );
}

// export function getFirstToken() {
//   return postWithTimeout(
//     `${BASE_API_URL}/tools/enc-first-token`,
//     {},
//     {
//       deviceId: localStorage.getItem("DEVICEID"),
//       buildKey: buildKey,
//     }
//   );
// }

export function initData() {
  return postWithTimeout(
    `${BASE_API_URL}/init-data`,
    {
      'x-device-id': localStorage.getItem('DEVICEID'),
      language: localStorage.getItem('LANGUAGE'),
      Authorization: localStorage.getItem('INITTOKEN'),
    },
    {
      deviceModel: deviceModel,
      osName: osName,
      osVersion: osVersion,
      appVersion: appVersion,
      firebaseToken: 'Firebase token test',
    }
  );
}

// export function getEncToken() {
//   return postWithTimeout(
//     `${BASE_API_URL}/tools/enc-access-token`,
//     {},
//     {
//       deviceId: localStorage.getItem("DEVICEID"),
//       buildKey: buildKey,
//       rsaPublicKey: localStorage.getItem("RSAPUBLIC"),
//     }
//   );
// }
// export function generateSignature(phoneNumber, password) {
//   return postWithTimeout(
//     `${BASE_API_URL}/tools/generate-signature`,
//     {},
//     {
//       signatureKey: localStorage.getItem("RSASIGNATURE"),
//       signatureData: `${phoneNumber}${password}`,
//     }
//   );
// }

export function userLoginNew(email, password) {
  return postWithTimeout(
    `${BASE_API_URL}/auth/login`,
    {
      'x-device-id': localStorage.getItem('DEVICEID'),
      language: localStorage.getItem('LANGUAGE'),
      Authorization: localStorage.getItem('ENCACCESSTOKEN'),
    },
    {
      accountNumber: email,
      pin: password,
      signature: localStorage.getItem('SIGNATUREKEY'),
      // orgId: "1",
      // branchId: "1",
    }
  );
}

export function userLoginOtp(signature, transId, otp) {
  return postWithTimeout(
    `${BASE_API_URL}/auth/login-otp`,
    {
      'x-device-id': localStorage.getItem('DEVICEID'),
      language: localStorage.getItem('LANGUAGE'),
      Authorization: localStorage.getItem('ENCACCESSTOKEN'),
    },
    {
      signature: signature,
      transId: transId,
      otp: otp,
      deactiveOthersDevice: 0,
    }
  );
}
// export function decryptToken() {
//   return postWithTimeout(
//     `${BASE_API_URL}/tools/decrypt`,
//     {},
//     {
//       deviceId: localStorage.getItem("DEVICEID"),
//       buildKey: buildKey,
//       cryptData: localStorage.getItem("ACCESSSTOKEN"),
//       rsaPrivateKey: localStorage.getItem("RSAPRIVATE"),
//     }
//   );
// }
// export function encryptToken(cryptDataDecrypt) {
//   return postWithTimeout(
//     `${BASE_API_URL}/tools/encrypt`,
//     {},
//     {
//       deviceId: localStorage.getItem("DEVICEID"),
//       buildKey: buildKey,
//       cryptData: cryptDataDecrypt,
//       rsaPublicKey: localStorage.getItem("RSAPUBLIC"),
//       rsaPrivateKey: localStorage.getItem("RSAPRIVATE"),
//     }
//   );
// }

export function getListShopQr(keyWord, fromDate, toDate, status) {
  return postWithCheckingToken(
    `${BASE_API_URL}/shop-qr/list`,
    {},
    {
      keyWord: keyWord,
      fromDate: fromDate,
      toDate: toDate,
      status: status,
    }
  );
}

export function getShopQrDetail(id) {
  return postWithCheckingToken(
    `${BASE_API_URL}/shop-qr/get`,
    {},
    {
      id: id,
    }
  );
}

export function saveShopQr(code, name, type, description, image, value, pointExchange, status) {
  return postWithCheckingToken(
    `${BASE_API_URL}/shop-qr/save`,
    {},
    {
      code: code,
      name: name,
      type: type,
      description: description,
      image: image,
      value: value,
      pointExchange: pointExchange,
      status: status,
    }
  );
}

export function deleteShopQr(id) {
  return postWithCheckingToken(
    `${BASE_API_URL}/shop-qr/delete`,
    {},
    {
      id: id,
    }
  );
}

export function updateQrStatus(id, status) {
  return postWithCheckingToken(
    `${BASE_API_URL}/shop-qr/update-status`,
    {},
    {
      id: id,
      status: status,
    }
  );
}

export function getListGames(keyWord, fromDate, toDate, status) {
  console.log('list game=>>>>>>', {
    keyWord: keyWord,
    fromDate: fromDate,
    toDate: toDate,
    status: status,
  });
  return postWithCheckingToken(
    `${BASE_API_URL}/games/list`,
    {},
    {
      keyWord: keyWord,
      fromDate: fromDate,
      toDate: toDate,
      status: status,
    }
  );
}

export function saveGames(code, name, type, startTime, endTime, description, image, amount) {
  return postWithCheckingToken(
    `${BASE_API_URL}/games/save`,
    {},
    {
      code: code,
      name: name,
      type: type,
      startTime: startTime,
      endTime: endTime,
      description: description,
      image: image,
      amount: amount,
    }
  );
}

export function editGames(id, code, name, type, startTime, endTime, description, image, amount) {
  return postWithCheckingToken(
    `${BASE_API_URL}/games/save`,
    {},
    {
      id: id,
      code: code,
      name: name,
      type: type,
      startTime: startTime,
      endTime: endTime,
      description: description,
      image: image,
      amount: amount,
    }
  );
}

export function savePrizes(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/prizes/save`, {}, obj);
}

export function deleteGames(id) {
  return postWithCheckingToken(`${BASE_API_URL}/games/delete`, {}, { id: id });
}

export function getPrizesList(id) {
  return postWithCheckingToken(`${BASE_API_URL}/games/list-prizes`, {}, { id: id });
}

export function deletePrize(id) {
  return postWithCheckingToken(`${BASE_API_URL}/prizes/delete`, {}, { id: id });
}

export function getGameDetail(id) {
  return postWithCheckingToken(`${BASE_API_URL}/games/get`, {}, { id: id });
}

export function getGameChartReport(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/games/chart-report`, {}, obj);
}

export function getGameResultReward(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/games/result-reward`, {}, obj);
}

export function requestsGetCategoryList(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/cms-category/list`, {}, obj);
}

export function requestCreateEditCategory(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/cms-category/save`, {}, obj);
}

export function requestDeleteCategory(id) {
  return postWithCheckingToken(`${BASE_API_URL}/cms-category/delete`, {}, { id: id });
}

export function requestsGetParentCategory() {
  return postWithCheckingToken(`${BASE_API_URL}/cms-category/dropdown`, {}, {});
}

export function requestsGetShopList(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/cms-shop/list`, {}, obj);
}

export function requestsCreateEditShop(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/cms-shop/save`, {}, obj);
}

export function requestDeleteShop(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/cms-shop/delete`, {}, obj);
}

export function requestGetOwnerShop() {
  return postWithCheckingToken(`${BASE_API_URL}/user/list`, {}, {});
}

export function requestGetListProductApprove(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/cms-admin/list-product-approve`, {}, obj);
}

export function requestApproveProduct(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/cms-admin/approve-product`, {}, obj);
}

export function requestGetListVoucher(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/voucher/list-program`, {}, obj);
}

export function requestCreateUpdateVoucher(obj) {
  console.log('create update voucher  parma==>', obj);
  return postWithCheckingToken(`${BASE_API_URL}/voucher/save-program`, {}, obj);
}

export function requestDeleteVoucher(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/voucher/delete-program`, {}, obj);
}

export function requestGetListVoucherApprove(obj) {
  console.log('get voucher approve list parma==>', obj);
  return postWithCheckingToken(`${BASE_API_URL}/voucher/list-shop-approve`, {}, obj);
}

export function requestApproveVoucherShopRegisterProgram(obj) {
  return postWithCheckingToken(`${BASE_API_URL}/voucher/approve-shop-register-program`, {}, obj);
}
