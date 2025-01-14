import { ActionTypes, EAppKey } from 'constants/types';
import _ from 'lodash';
import Router from 'next/router';
import { NotificationManager } from 'react-light-notifications';
import { requestApproveProduct } from 'utilities/ApiManage';
import { setShowLoader } from './app';

export function setApproveProducts(approveProducts) {
  return {
    type: ActionTypes.APPROVE_PRODUCTS,
    approveProducts,
  };
}

export function setModalSelectProducts(isOpenModalSelectProducts) {
  return {
    type: ActionTypes.MODAL_SELECT_PRODUCTS,
    isOpenModalSelectProducts,
  };
}

export function setSelectedProducts(selectedProducts) {
  return {
    type: ActionTypes.SELECTED_PRODUCTS,
    selectedProducts,
  };
}

export function setSelectedCategory(selectedCategory) {
  return {
    type: ActionTypes.SELECTED_CATEGORY,
    selectedCategory,
  };
}

export function setSelectedCategorySearch(selectedCategorySearch) {
  return {
    type: ActionTypes.SELECTED_CATEGORY_SEARCH,
    selectedCategorySearch,
  };
}

export function setSearchProductName(searchProductName) {
  return {
    type: ActionTypes.SEARCH_PRODUCT_NAME,
    searchProductName,
  };
}

export function setSearchProductStockMin(searchProductStockMin) {
  return {
    type: ActionTypes.SEARCH_PRODUCT_STOCK_MIN,
    searchProductStockMin,
  };
}

export function setSearchProductStockMax(searchProductStockMax) {
  return {
    type: ActionTypes.SEARCH_PRODUCT_STOCK_MAX,
    searchProductStockMax,
  };
}

export function setSearchProductCategory(searchProductCategory) {
  return {
    type: ActionTypes.SEARCH_PRODUCT_CATEGORY,
    searchProductCategory,
  };
}

export function setDoSearchProduct(doSearchProduct) {
  return {
    type: ActionTypes.DO_SEARCH_PRODUCT,
    doSearchProduct,
  };
}

export const approveProducts = () => {
  return async (dispatch, getState) => {
    try {
      const { approveProducts } = getState().product;
      const ids = _.flatMap(approveProducts, 'products').map(({ id }) => id);

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
      const { approveProducts } = getState().product;
      const ids = _.flatMap(approveProducts, 'products').map(({ id }) => id);

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

export const resetSearchProduct = () => {
  return async (dispatch) => {
    dispatch(setSearchProductName(''));
    dispatch(setSearchProductStockMin(''));
    dispatch(setSearchProductStockMax(''));
    dispatch(setSelectedCategorySearch([]));
    dispatch(setSearchProductCategory(''));
    dispatch(setDoSearchProduct(true));
  };
};
