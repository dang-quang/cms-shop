import React from 'react';
import { Box, Table, Thead, Tr, Th, Flex, useBoolean, Text, Icon } from '@chakra-ui/react';
import { usePagination } from '@ajna/pagination';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setMyShopVoucherTabIndex, setShowLoader } from 'redux/actions/app';
import { useRouter } from 'next/router';
import {
  EmptyListItem,
  LoadingShopVoucherItem,
  ModalConfirm,
  PaginationPanel,
  VoucherShopItem,
} from 'components';
import { isEmpty } from 'lodash';
import { EAppKey } from 'constants/types';
import { requestDeleteVoucherShop, requestGetListVoucherShop } from 'utilities/ApiShop';
//@ts-ignore
import { NotificationManager } from 'react-light-notifications';
import { setDoSearchVoucher } from 'redux/actions/voucher';
import { IconVoucher } from 'components/Icons/Icons';

const TableAllMyShop = () => {
  const shopId = 143;
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const pageSize = 50;
  const { loading, showLoader } = useSelector((state) => state.app);
  const isLoading = loading || showLoader;

  const [vouchers, setVouchers] = React.useState([]);
  const [selectedVoucher, setSelectedVoucher] = React.useState(null);
  const [isShowModal, { on: onShowModal, off: offShowModal }] = useBoolean(false);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalRecords, setTotalRecords] = React.useState(0);

  const { doSearchVoucher, searchVoucherName } = useSelector((state) => state.voucher);

  const headers = [
    //t('serial_number'),
    t('voucher.voucher_name_code'),
    t('voucher.voucher_type'),
    t('voucher.discount_amount'),
    t('voucher.usage_quantity'),
    t('voucher.usage'),
    t('voucher.status_claiming_period'),
    t('voucher.actions'),
  ];

  const { pages, pagesCount, currentPage, setCurrentPage, isDisabled } = usePagination({
    total: totalRecords,
    limits: {
      outer: 1,
      inner: 2,
    },
    initialState: {
      pageSize: pageSize,
      isDisabled: false,
      currentPage: 1,
    },
  });

  React.useEffect(() => {
    (async () => {
      try {
        dispatch(setShowLoader(true));

        let params = {
          page: 1,
          shopId: shopId,
        };

        if (!!searchVoucherName) {
          params.keyWord = searchVoucherName;
        }

        const res = await requestGetListVoucherShop(params);

        if (res.code === EAppKey.MSG_SUCCESS && res.data && res.data.results) {
          setVouchers(res.data.results);
          setTotalPage(res.data.totalPages);
          setTotalRecords(res.data.totalRecords);
        } else {
          NotificationManager.error({
            title: t('error'),
            message: t('no_data_exists'),
          });
        }
      } finally {
        dispatch(setShowLoader(false));
      }
    })();
  }, [searchVoucherName]);

  React.useEffect(() => {
    (async () => {
      try {
        let params = { shopId: shopId, page: currentPage };

        if (doSearchVoucher) {
          dispatch(setShowLoader(true));
          dispatch(setLoading(true));
          if (!!searchVoucherName) {
            params.keyWord = searchVoucherName;
          }

          const res = await requestGetListVoucherShop(params);

          if (res.code === EAppKey.MSG_SUCCESS && res.data && res.data.results) {
            setVouchers(res.data.results);
            setTotalPage(res.data.totalPages);
            setTotalRecords(res.data.totalRecords);
          } else {
            setVouchers([]);
            setTotalPage(1);
            setTotalRecords(0);
            NotificationManager.error({
              title: t('no_results_found'),
              message: t('no_results_found_for_your_search'),
            });
          }
        }
      } finally {
        dispatch(setDoSearchVoucher(false));
        dispatch(setShowLoader(false));
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 2000);
      }
    })();
  }, [shopId, doSearchVoucher, currentPage, searchVoucherName]);

  const handleReload = React.useCallback(async () => {
    let params = { shopId: shopId, page: 1 };

    if (searchVoucherName) {
      params.keyWord = searchVoucherName;
    }

    const res = await requestGetListVoucherShop(params);

    if (res.code === EAppKey.MSG_SUCCESS && res.data && res.data.results) {
      setVouchers(res.data.results);
      setTotalPage(res.data.totalPages);
      setTotalRecords(res.data.totalRecords);
      dispatch(setMyShopVoucherTabIndex(0));
    } else {
      setVouchers([]);
      setTotalPage(1);
      setTotalRecords(0);
      NotificationManager.error({
        title: t('error'),
        message: t('no_data_exists'),
      });
    }
  }, [shopId, currentPage, searchVoucherName]);

  const handleDeleteVoucher = React.useCallback(async () => {
    try {
      offShowModal();
      dispatch(setShowLoader(true));
      const res = await requestDeleteVoucherShop({ id: selectedVoucher.id });
      if (res.code === EAppKey.MSG_SUCCESS) {
        setSelectedVoucher(null);
        handleReload();
      } else {
        NotificationManager.error({
          title: t('error'),
          message: res.message ? res.message.text : t('error'),
        });
      }
    } catch (e) {
      console.log('delete voucher shop error', e);
    } finally {
      dispatch(setShowLoader(false));
    }
  }, [selectedVoucher]);

  return (
    <Box>
      <Box
        mt="6"
        position="relative"
        bg="white"
        minH={isEmpty(vouchers) || isLoading ? '300px' : 'unset'}
        borderRadius="4px"
        overflow="auto"
        borderWidth="1px"
        borderColor="border-5">
        <Table variant="simple" minW="1200px">
          <Thead h="52px" bg="primary.100">
            <Tr>
              {headers.map((item, index) => {
                return (
                  <Th
                    borderBottomWidth="0px"
                    key={index}
                    color="white"
                    textStyle="b-md"
                    textTransform="capitalize"
                    isNumeric={index === 2 || index === 3 || index === headers.length - 1}>
                    {item}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          {isLoading ? (
            <LoadingShopVoucherItem />
          ) : isEmpty(vouchers) ? (
            <EmptyListItem title={t('no_voucher_found')}>
              <Icon as={IconVoucher} w="92px" h="86px" />
            </EmptyListItem>
          ) : (
            <>
              {vouchers.map((item, index) => {
                return (
                  <VoucherShopItem
                    item={item}
                    key={index}
                    index={index}
                    onUpdate={() => {
                      router.push({
                        pathname: '/shop/voucher-coupon/update',
                        query: item,
                      });
                    }}
                    onDelete={() => {
                      setSelectedVoucher(item);
                      onShowModal();
                    }}
                  />
                );
              })}
            </>
          )}
        </Table>
      </Box>
      {!isEmpty(vouchers) && !isLoading && (
        <Flex justifyContent="space-between" alignItems="center">
          <PaginationPanel
            pagesCount={pagesCount}
            currentPage={currentPage}
            isDisabled={isDisabled}
            onPageChange={(page) => {
              setVouchers([]);
              setCurrentPage(page);
            }}
            pages={pages}
            mt="24px"
            mb="8px"
          />
          <Text textStyle="h4-m">
            {t('results_page', {
              start: (currentPage - 1) * 50 + 1,
              end: (currentPage - 1) * 50 + vouchers.length,
              total: totalRecords,
            })}
          </Text>
        </Flex>
      )}
      <ModalConfirm
        isOpen={isShowModal}
        onClose={offShowModal}
        title={t('voucher.delete_voucher')}
        description={t('voucher.description_delete_voucher')}
        buttonLeft={{ title: t('cancel'), onClick: offShowModal }}
        buttonRight={{ title: t('delete'), onClick: handleDeleteVoucher }}
      />
    </Box>
  );
};

export default TableAllMyShop;
