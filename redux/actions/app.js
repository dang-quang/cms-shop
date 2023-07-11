export const LOAD_BOOTSTRAP = 'LOAD_BOOTSTRAP';
export const LOAD_BOOTSTRAP_SUCCESS = 'LOAD_BOOTSTRAP_SUCCESS';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const CHANNEL = 'CHANNEL';
export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';
export const SET_SIDEBAR = 'SET_SIDEBAR';
export const SHOW_LOADER = 'SHOW_LOADER';
export const GAME_TAB = 'GAME_TAB';
export const SHOP_FLASH_SALE_TAB = 'SHOP_FLASH_SALE_TAB';
export const SHOP_PRODUCT_TAB = 'SHOP_PRODUCT_TAB';
export const SHOP_VOUCHER_TAB = 'SHOP_VOUCHER_TAB';
export const SHOP_MY_SHOP_TAB = 'SHOP_MY_SHOP_TAB';
export const SHOP_NAT_SHOP_TAB = 'SHOP_NAT_SHOP_TAB';
export const LOADING = 'LOADING';

export function setShowLoader(showLoader) {
  return {
    type: SHOW_LOADER,
    showLoader,
  };
}

export function setSelectedGameTab(selectedGameTab) {
  return {
    type: GAME_TAB,
    selectedGameTab,
  };
}

export function setShopPlashSaleTabIndex(shopFlashSaleTabIndex) {
  return {
    type: SHOP_FLASH_SALE_TAB,
    shopFlashSaleTabIndex,
  };
}

export function setShopProductTabIndex(shopProductTabIndex) {
  return {
    type: SHOP_PRODUCT_TAB,
    shopProductTabIndex,
  };
}

export function setShopVoucherTabIndex(shopVoucherTabIndex) {
  return {
    type: SHOP_VOUCHER_TAB,
    shopVoucherTabIndex,
  };
}

export function setMyShopVoucherTabIndex(myShopVoucherTabIndex) {
  return {
    type: SHOP_MY_SHOP_TAB,
    myShopVoucherTabIndex,
  };
}

export function setNatShopVoucherTabIndex(natShopVoucherTabIndex) {
  return {
    type: SHOP_NAT_SHOP_TAB,
    natShopVoucherTabIndex,
  };
}

export function setLoading(loading) {
  return {
    type: LOADING,
    loading,
  };
}
