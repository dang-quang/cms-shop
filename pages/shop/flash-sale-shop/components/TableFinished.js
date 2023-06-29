import React from 'react';
import { Box, Table, Thead, Tr, Th, Flex, Text } from '@chakra-ui/react';
import { usePagination } from '@ajna/pagination';
import { useTranslation } from 'react-i18next';

import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { setShowLoader } from 'redux/actions/app';
import { EAppKey, EFlashSaleStatus } from 'constants/types';
import { NotificationManager } from 'react-light-notifications';
import { useRouter } from 'next/router';
import {
  EmptyListItem,
  FlashSaleShopItem,
  LoadingFlashSaleItem,
  PaginationPanel,
  RangeDatePickerItem,
} from 'components';
import { isEmpty } from 'lodash';
import { requestGetListFlashSale } from 'utilities/ApiShop';

const TableFinished = () => {
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
          type: EFlashSaleStatus.FINISHED,
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
          type: EFlashSaleStatus.FINISHED,
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

  const handleClearSearch = React.useCallback(async () => {
    try {
      setSelectedDates([]);
      dispatch(setShowLoader(true));

      const res = await requestGetListFlashSale({
        page: 1,
        shopId: shopId,
        type: EFlashSaleStatus.FINISHED,
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
    </Box>
  );
};

export default TableFinished;
