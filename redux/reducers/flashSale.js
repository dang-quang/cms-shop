import { ActionTypes } from 'constants/types';

const initialState = {
  natShopFlashSaleTabIndex: 0,
  searchProgramFlashSaleName: '',
  searchProgramFlashSaleDate: [],
  doSearchFlashSale: false,
};

export default function flashSale(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.NAT_SHOP_FLASH_SALE_TAB_INDEX:
      return {
        ...state,
        natShopFlashSaleTabIndex: action.natShopFlashSaleTabIndex,
      };
    case ActionTypes.SEARCH_PROGRAM_FLASH_SALE_NAME:
      return {
        ...state,
        searchProgramFlashSaleName: action.searchProgramFlashSaleName,
      };
    case ActionTypes.SEARCH_PROGRAM_FLASH_SALE_DATE:
      return {
        ...state,
        searchProgramFlashSaleDate: action.searchProgramFlashSaleDate,
      };
    case ActionTypes.DO_SEARCH_FLASH_SALE:
      return {
        ...state,
        doSearchFlashSale: action.doSearchFlashSale,
      };
    default:
      return state;
  }
}
