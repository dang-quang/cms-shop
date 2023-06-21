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
    default:
      return state;
  }
}
