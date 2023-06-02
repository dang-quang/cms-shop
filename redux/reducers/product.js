export const SELECTED_PRODUCTS = 'SELECTED_PRODUCTS';

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
