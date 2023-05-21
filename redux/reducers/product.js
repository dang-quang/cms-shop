import { SELECTED_PRODUCTS } from '../actions/product';

export default function product(state = {}, action) {
  switch (action.type) {
    case SELECTED_PRODUCTS:
      return {
        ...state,
        selectedProducts: action.selectedProducts,
      };
    default:
      return state;
  }
}
