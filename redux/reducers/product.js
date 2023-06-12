import { APPROVE_PRODUCTS, MODAL_SELECT_PRODUCTS, SELECTED_PRODUCTS } from 'redux/actions/product';

export default function product(state = {}, action) {
  switch (action.type) {
    case APPROVE_PRODUCTS:
      return {
        ...state,
        approveProducts: action.approveProducts,
      };
    case SELECTED_PRODUCTS:
      return {
        ...state,
        selectedProducts: action.selectedProducts,
      };
    case MODAL_SELECT_PRODUCTS:
      return {
        ...state,
        isOpenModalSelectProducts: action.isOpenModalSelectProducts,
      };
    default:
      return state;
  }
}
