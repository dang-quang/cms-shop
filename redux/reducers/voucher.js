import { ActionTypes } from 'constants/types';

const initialState = {
  selectedVouchers: [],
  searchProgramVoucherDate: [],
  doSearchVoucher: false,
};

export default function product(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SELECTED_VOUCHERS:
      return {
        ...state,
        selectedVouchers: action.selectedVouchers,
      };
    case ActionTypes.SEARCH_VOUCHER_NAME:
      return {
        ...state,
        searchVoucherName: action.searchVoucherName,
      };
    case ActionTypes.SEARCH_PROGRAM_VOUCHER_NAME:
      return {
        ...state,
        searchProgramVoucherName: action.searchProgramVoucherName,
      };
    case ActionTypes.SEARCH_PROGRAM_VOUCHER_DATE:
      return {
        ...state,
        searchProgramVoucherDate: action.searchProgramVoucherDate,
      };
    case ActionTypes.DO_SEARCH_VOUCHER:
      return {
        ...state,
        doSearchVoucher: action.doSearchVoucher,
      };
    default:
      return state;
  }
}
