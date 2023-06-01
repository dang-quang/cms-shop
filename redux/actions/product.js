import { Router } from 'next/router';
import { NotificationManager } from 'react-light-notifications';
import product from 'redux/reducers/product';

export const SELECTED_PRODUCTS = 'SELECTED_PRODUCTS';
export const APPROVE_PRODUCT = 'APPROVE_PRODUCT';
export const REJECT_PRODUCT = 'REJECT_PRODUCT';

export function setSelectedProducts(selectedProducts) {
  return {
    type: SELECTED_PRODUCTS,
    selectedProducts,
  };
}
