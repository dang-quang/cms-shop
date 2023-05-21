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

export const approveProducts = () => async (dispatch, getState) => {
  try {
    const { selectedProducts } = product(getState());
    // dispatch(setShowLoader(true));
    // const res = await requestApproveProduct({ ids: idsSelected, type: 'APPROVE' });
    // if (res && res.code === 'MSG_SUCCESS') {
    //   NotificationManager.success({
    //     title: 'Successful',
    //     message: 'The products have been approved successfully',
    //   });
    //   setTimeout(() => {
    //     Router.push('/admin/product-approval');
    //   }, 1000);
    // }
  } finally {
    dispatch(setShowLoader(false));
  }
};

export const rejectProduct = () => async (dispatch, getState) => {
  try {
    const { selectedProducts } = product(getState());
    // dispatch(setShowLoader(true));
    // const res = await requestApproveProduct({ ids: idsSelected, type: 'REJECT' });
    // if (res && res.code === 'MSG_SUCCESS') {
    //   NotificationManager.success({
    //     title: 'Successful',
    //     message: 'The products have been rejected successfully',
    //   });
    //   setTimeout(() => {
    //     router.push('/admin/product-approval');
    //   }, 1000);
    // }
  } finally {
    dispatch(setShowLoader(false));
  }
};
