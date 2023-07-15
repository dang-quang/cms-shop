import { ActionTypes } from 'constants/types';
import _ from 'lodash';

export function setNatShopFlashSaleTabIndex(natShopFlashSaleTabIndex) {
  return {
    type: ActionTypes.NAT_SHOP_FLASH_SALE_TAB_INDEX,
    natShopFlashSaleTabIndex,
  };
}

export function setSearchProgramFlashSaleName(searchProgramFlashSaleName) {
  return {
    type: ActionTypes.SEARCH_PROGRAM_FLASH_SALE_NAME,
    searchProgramFlashSaleName,
  };
}

export function setSearchProgramFlashSaleDate(searchProgramFlashSaleDate) {
  return {
    type: ActionTypes.SEARCH_PROGRAM_FLASH_SALE_DATE,
    searchProgramFlashSaleDate,
  };
}

export function setDoSearchFlashSale(doSearchFlashSale) {
  return {
    type: ActionTypes.DO_SEARCH_FLASH_SALE,
    doSearchFlashSale,
  };
}

export const resetSearchProgramFlashSale = () => {
  return async (dispatch) => {
    dispatch(setSearchProgramFlashSaleName(''));
    dispatch(setSearchProgramFlashSaleDate([]));
    dispatch(setDoSearchFlashSale(true));
  };
};
