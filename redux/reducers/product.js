import { ActionTypes } from 'constants/types';

export default function product(state = {}, action) {
  switch (action.type) {
    case ActionTypes.APPROVE_PRODUCTS:
      return {
        ...state,
        approveProducts: action.approveProducts,
      };
    case ActionTypes.SELECTED_PRODUCTS:
      return {
        ...state,
        selectedProducts: action.selectedProducts,
      };
    case ActionTypes.MODAL_SELECT_PRODUCTS:
      return {
        ...state,
        isOpenModalSelectProducts: action.isOpenModalSelectProducts,
      };
    case ActionTypes.SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.selectedCategory,
      };
    case ActionTypes.SEARCH_PRODUCT_NAME:
      return {
        ...state,
        searchProductName: action.searchProductName,
      };
    case ActionTypes.SEARCH_PRODUCT_STOCK_MIN:
      return {
        ...state,
        searchProductStockMin: action.searchProductStockMin,
      };
    case ActionTypes.SEARCH_PRODUCT_STOCK_MAX:
      return {
        ...state,
        searchProductStockMax: action.searchProductStockMax,
      };
    case ActionTypes.DO_SEARCH_PRODUCT:
      return {
        ...state,
        doSearchProduct: action.doSearchProduct,
      };
    default:
      return state;
  }
}
