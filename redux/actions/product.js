import { EAppKey } from 'constants/types';
import _ from 'lodash';
import Router from 'next/router';
import { NotificationManager } from 'react-light-notifications';
import { requestApproveProduct } from 'utilities/ApiManage';
import { setShowLoader } from './app';

export const APPROVE_PRODUCTS = 'APPROVE_PRODUCTS';
export const MODAL_SELECT_PRODUCTS = 'MODAL_SELECTED_PRODUCTS';
export const SELECTED_PRODUCTS = 'SELECTED_PRODUCTS';

export function setApproveProducts(approveProducts) {
  return {
    type: APPROVE_PRODUCTS,
    approveProducts,
  };
}

export function setModalSelectProducts(isOpenModalSelectProducts) {
  return {
    type: MODAL_SELECT_PRODUCTS,
    isOpenModalSelectProducts,
  };
}

export function setSelectedProducts(selectedProducts) {
  return {
    type: SELECTED_PRODUCTS,
    selectedProducts,
  };
}

export const approveProducts = () => {
  return async (dispatch, getState) => {
    try {
      const { selectedProducts } = getState().product;
      const ids = _.flatMap(selectedProducts, 'products').map(({ id }) => id);

      dispatch(setShowLoader(true));

      if (ids.length) {
        const res = await requestApproveProduct({ ids: ids, type: EAppKey.APPROVE });

        if (res && res.code === EAppKey.MSG_SUCCESS) {
          let notificationDisplayed = false; // Flag variable to track notification display

          if (!notificationDisplayed) {
            dispatch(setShowLoader(false));
            NotificationManager.success({
              title: 'Successful',
              message: 'The products have been approved successfully',
            });
            notificationDisplayed = true; // Set flag to true after displaying the notification
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
          Router.push('/admin/product-approval');
        }
      }
    } catch (error) {
      console.log('approve products error', error);
    } finally {
      dispatch(setShowLoader(false));
    }
  };
};

export const rejectProducts = () => {
  return async (dispatch, getState) => {
    try {
      const { selectedProducts } = getState().product;
      const ids = _.flatMap(selectedProducts, 'products').map(({ id }) => id);

      dispatch(setShowLoader(true));

      if (ids.length) {
        const res = await requestApproveProduct({ ids: ids, type: EAppKey.REJECT });

        if (res && res.code === EAppKey.MSG_SUCCESS) {
          let notificationDisplayed = false; // Flag variable to track notification display

          if (!notificationDisplayed) {
            NotificationManager.success({
              title: 'Successful',
              message: 'The products have been rejected successfully',
            });
            notificationDisplayed = true; // Set flag to true after displaying the notification
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
          Router.push('/admin/product-approval');
        }
      }
    } finally {
      dispatch(setShowLoader(false));
    }
  };
};
