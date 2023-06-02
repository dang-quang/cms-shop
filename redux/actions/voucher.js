import { EAppKey } from 'constants/types';
import _ from 'lodash';
import Router from 'next/router';
import { NotificationManager } from 'react-light-notifications';
import { setShowLoader } from 'store/slices/appSlice';
import { requestApproveVoucherShopRegisterProgram } from 'utilities/ApiManage';

export const SELECTED_VOUCHERS = 'SELECTED_VOUCHERS';

export function setSelectedVouchers(selectedVouchers) {
  return {
    type: SELECTED_VOUCHERS,
    selectedVouchers,
  };
}

export const approveVouchers = () => {
  return async (dispatch, getState) => {
    try {
      const { selectedVouchers } = getState().voucher;
      const ids = _.flatMap(selectedVouchers, 'vouchers').map(({ id }) => id);

      dispatch(setShowLoader(true));

      if (ids.length) {
        const res = await requestApproveVoucherShopRegisterProgram({
          ids: ids,
          type: EAppKey.APPROVE,
        });

        if (res && res.code === EAppKey.MSG_SUCCESS) {
          let notificationDisplayed = false; // Flag variable to track notification display

          if (!notificationDisplayed) {
            dispatch(setShowLoader(false));
            NotificationManager.success({
              title: 'Successful',
              message: 'The vouchers have been approved successfully',
            });
            notificationDisplayed = true; // Set flag to true after displaying the notification
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
          Router.push('/admin/voucher-program-approval');
        }
      }
    } catch (error) {
      console.log('approve vouchers error', error);
    } finally {
      dispatch(setShowLoader(false));
    }
  };
};

export const rejectVouchers = () => {
  return async (dispatch, getState) => {
    try {
      const { selectedVouchers } = getState().voucher;
      const ids = _.flatMap(selectedVouchers, 'vouchers').map(({ id }) => id);

      dispatch(setShowLoader(true));

      if (ids.length) {
        const res = await requestApproveVoucherShopRegisterProgram({
          ids: ids,
          type: EAppKey.REJECT,
        });

        if (res && res.code === EAppKey.MSG_SUCCESS) {
          let notificationDisplayed = false; // Flag variable to track notification display

          if (!notificationDisplayed) {
            NotificationManager.success({
              title: 'Successful',
              message: 'The vouchers have been rejected successfully',
            });
            notificationDisplayed = true; // Set flag to true after displaying the notification
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
          Router.push('/admin/voucher-program-approval');
        }
      }
    } finally {
      dispatch(setShowLoader(false));
    }
  };
};
