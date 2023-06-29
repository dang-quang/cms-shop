import React from 'react';
import { Box, Table, Thead, Tr, Th, Flex, useBoolean, Text } from '@chakra-ui/react';
import { usePagination } from '@ajna/pagination';
import { useTranslation } from 'react-i18next';

import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setSelectedFlashSaleTabIndex, setShowLoader } from 'redux/actions/app';
import { EAppKey, EFlashSaleStatus, EShowFlashSaleType } from 'constants/types';
import { NotificationManager } from 'react-light-notifications';
import { useRouter } from 'next/router';
import {
  EmptyListItem,
  FlashSaleShopItem,
  ModalConfirm,
  PaginationPanel,
  RangeDatePickerItem,
  LoadingFlashSaleItem,
} from 'components';
import { isEmpty } from 'lodash';
import {
  requestGetListFlashSale,
  requestDeleteFlashSale,
  requestUpdateStatusFlashSaleShop,
} from 'utilities/ApiShop';

const TableHappening = () => {
  //TODO add shop Id - need update authentication flow
  const shopId = 143;
  const formatDate = 'YYYY-MM-DD';
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const pageSize = 50;

  const { loading, showLoader } = useSelector((state) => state.app);
  const isLoading = loading || showLoader;

  const [flashSales, setFlashSales] = React.useState([]);
  const [selectedFlashSale, setSelectedFlashSale] = React.useState(null);
  const [isShowModal, { on: onShowModal, off: offShowModal }] = useBoolean(false);
  const [isShowEnableModal, { on: onShowEnableModal, off: offShowEnableModal }] = useBoolean(false);
  const [isShowDisableModal, { on: onShowDisableModal, off: offShowDisableModal }] =
    useBoolean(false);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [selectedDates, setSelectedDates] = React.useState([]);

  const headers = [t('time'), t('products'), t('status'), t('enable_disable'), t('actions')];

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

        const res = await requestGetListFlashSale({
          page: 1,
          shopId: shopId,
          type: EFlashSaleStatus.HAPPENING,
        });

        if (res.code === EAppKey.MSG_SUCCESS && res.data && res.data.results) {
          setFlashSales(res.data.results);
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
  }, []);

  const handleClearSearch = React.useCallback(async () => {
    try {
      setSelectedDates([]);
      dispatch(setShowLoader(true));

      const res = await requestGetListFlashSale({
        page: 1,
        shopId: shopId,
        type: EFlashSaleStatus.HAPPENING,
      });

      if (res.code === EAppKey.MSG_SUCCESS && res.data && res.data.results) {
        setFlashSales(res.data.results);
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
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        if (selectedDates.length < 2) {
          return;
        }
        dispatch(setShowLoader(true));

        const res = await requestGetListFlashSale({
          page: 1,
          shopId: shopId,
          type: EFlashSaleStatus.HAPPENING,
          fromDate: dayjs(selectedDates[0]).format(formatDate),
          toDate: dayjs(selectedDates[1]).format(formatDate),
        });

        if (res.code === EAppKey.MSG_SUCCESS && res.data && res.data.results) {
          setFlashSales(res.data.results);
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
  }, [selectedDates]);

  const handleReload = React.useCallback(async () => {
    let params = { page: 1, shopId: shopId, type: EFlashSaleStatus.HAPPENING };

    if (selectedDates.length === 2) {
      params.fromDate = dayjs(selectedDates[0]).format(formatDate);
      params.toDate = dayjs(selectedDates[1]).format(formatDate);
    }

    const res = await requestGetListFlashSale(params);

    if (res.code === EAppKey.MSG_SUCCESS && res.data && res.data.results) {
      setFlashSales(res.data.results);
      setTotalPage(res.data.totalPages);
      setTotalRecords(res.data.totalRecords);
      router.push('/shop/flash-sale-shop');
      dispatch(setSelectedFlashSaleTabIndex(1));
    } else {
      NotificationManager.error({
        title: t('error'),
        message: t('no_data_exists'),
      });
    }
  }, [selectedDates]);

  const handleDeleteFlashSale = React.useCallback(async () => {
    try {
      dispatch(setShowLoader(true));
      const res = await requestDeleteFlashSale({ id: selectedFlashSale.id });
      if (res.code === EAppKey.MSG_SUCCESS) {
        setSelectedFlashSale(null);
        handleReload();
      } else {
        NotificationManager.error({
          title: t('error'),
          message: res.message ? res.message.text : t('error'),
        });
      }
    } catch (error) {
      console.log('delete flash sale error');
    } finally {
      offShowModal();
      dispatch(setShowLoader(false));
    }
  }, [selectedFlashSale]);

  const handleDisableFlashSale = React.useCallback(async () => {
    try {
      if (!selectedFlashSale) {
        return;
      }

      dispatch(setShowLoader(true));
      const res = await requestUpdateStatusFlashSaleShop({
        ids: [selectedFlashSale.id],
        type: EShowFlashSaleType.TURN_OFF,
      });
      if (res.code === EAppKey.MSG_SUCCESS) {
        setSelectedFlashSale(null);
        handleReload();
      } else {
        NotificationManager.error({
          title: t('error'),
          message: res.message ? res.message.text : t('error'),
        });
      }
    } catch (error) {
      console.log('disable flash sale error');
    } finally {
      offShowDisableModal();
      dispatch(setShowLoader(false));
    }
  }, [selectedFlashSale]);

  const handleEnableFlashSale = React.useCallback(async () => {
    try {
      if (!selectedFlashSale) {
        return;
      }

      dispatch(setShowLoader(true));
      const res = await requestUpdateStatusFlashSaleShop({
        ids: [selectedFlashSale.id],
        type: EShowFlashSaleType.TURN_ON,
      });
      if (res.code === EAppKey.MSG_SUCCESS) {
        setSelectedFlashSale(null);
        handleReload();
      } else {
        NotificationManager.error({
          title: t('error'),
          message: res.message ? res.message.text : t('error'),
        });
      }
    } catch (error) {
      console.log('disable flash sale error');
    } finally {
      offShowEnableModal();
      dispatch(setShowLoader(false));
    }
  }, [selectedFlashSale]);

  return (
    <Box>
      <RangeDatePickerItem
        selectedDates={selectedDates}
        onDateChange={setSelectedDates}
        onClear={handleClearSearch}
      />
      <Box
        mt="6"
        bg="white"
        minH={isEmpty(flashSales) || isLoading ? '300px' : 'unset'}
        borderRadius="4px"
        overflow="auto"
        borderWidth="1px"
        borderColor="border-5"
        position="relative">
        <Table variant="simple">
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
                    isNumeric={index === headers.length - 1}>
                    {item}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          {isLoading ? (
            <LoadingFlashSaleItem />
          ) : isEmpty(flashSales) ? (
            <EmptyListItem title={t('no_shop_flash_sales_found')} />
          ) : (
            <>
              {flashSales.map((item, index) => {
                return (
                  <FlashSaleShopItem
                    item={item}
                    key={index}
                    isLast={index === flashSales.length - 1}
                    onUpdate={() => {
                      router.push({
                        pathname: '/shop/flash-sale-shop/update',
                        query: item,
                      });
                    }}
                    onDelete={() => {
                      setSelectedFlashSale(item);
                      onShowModal();
                    }}
                    onChange={() => {
                      setSelectedFlashSale(item);
                      if (item.isShow === EShowFlashSaleType.TURN_ON) {
                        onShowDisableModal();
                      } else {
                        onShowEnableModal();
                      }
                    }}
                  />
                );
              })}
            </>
          )}
        </Table>
      </Box>
      <Flex justifyContent="space-between" alignItems="center">
        <PaginationPanel
          pagesCount={pagesCount}
          currentPage={currentPage}
          isDisabled={isDisabled}
          onPageChange={(page) => {
            setFlashSales([]);
            setCurrentPage(page);
          }}
          pages={pages}
          mt="24px"
          mb="8px"
        />
        <Text textStyle="h4-m">
          {t('results_page', {
            start: (currentPage - 1) * 50 + 1,
            end: (currentPage - 1) * 50 + flashSales.length,
            total: totalRecords,
          })}
        </Text>
      </Flex>
      <ModalConfirm
        isOpen={isShowModal}
        onClose={offShowModal}
        title={t('flash_sale_shop.delete_shop_flash_sale')}
        description={t('flash_sale_shop.delete_shop_flash_sale_description')}
        buttonLeft={{ title: t('cancel'), onClick: offShowModal }}
        buttonRight={{ title: t('delete'), onClick: handleDeleteFlashSale }}
      />
      <ModalConfirm
        isOpen={isShowDisableModal}
        onClose={offShowDisableModal}
        title={t('flash_sale_shop.title_disable_flash_sale')}
        description={t('flash_sale_shop.description_disable_flash_sale')}
        buttonLeft={{ title: t('cancel'), onClick: offShowDisableModal }}
        buttonRight={{ title: t('disable'), onClick: handleDisableFlashSale }}
      />
      <ModalConfirm
        isOpen={isShowEnableModal}
        onClose={offShowEnableModal}
        title={t('flash_sale_shop.title_enable_flash_sale')}
        description={t('flash_sale_shop.description_enable_flash_sale')}
        buttonLeft={{ title: t('cancel'), onClick: offShowEnableModal }}
        buttonRight={{ title: t('flash_sale_shop.enable_items'), onClick: handleEnableFlashSale }}
      />
    </Box>
  );
};

export default TableHappening;
