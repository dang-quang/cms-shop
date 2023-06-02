import { SELECTED_VOUCHERS } from '../actions/voucher';

export default function product(state = {}, action) {
  switch (action.type) {
    case SELECTED_VOUCHERS:
      return {
        ...state,
        selectedVouchers: action.selectedVouchers,
      };
    default:
      return state;
  }
}
