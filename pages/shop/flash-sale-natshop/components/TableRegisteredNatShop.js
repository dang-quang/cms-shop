import React from 'react';
import { Box, Flex, Icon, Text, useToast } from '@chakra-ui/react';
import { usePagination } from '@ajna/pagination';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setShowLoader } from 'redux/actions/app';
import { useRouter } from 'next/router';
import {
  EmptyListItem,
  FlashSaleProgramItem,
  LoadingProgramItem,
  PaginationPanel,
} from 'components';
import { isEmpty } from 'lodash';
import { EAppKey, EFlashSaleRegisterStatus } from 'constants/types';
import { requestGetShopListProgramFlashSale } from 'utilities/ApiShop';

import dayjs from 'dayjs';
import { IconNoData } from 'components/Icons/Icons';
import { setDoSearchFlashSale } from 'redux/actions/flashSale';

const TableRegisteredNatShop = () => {
  const formatDate = 'YYYY/MM/DD';
  const shopId = 143;
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const pageSize = 50;

  const { loading, showLoader } = useSelector((state) => state.app);
  const isLoading = loading || showLoader;

  const [flashSales, setFlashSales] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalRecords, setTotalRecords] = React.useState(0);

  const { doSearchFlashSale, searchProgramFlashSaleName, searchProgramFlashSaleDate } = useSelector(
    (state) => state.flashSale
  );

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
          type: EFlashSaleRegisterStatus.APPROVED,
        };

        const res = await requestGetShopListProgramFlashSale(params);

        if (res.code === EAppKey.MSG_SUCCESS) {
          if (res.data && res.data.results) {
            setFlashSales(res.data.results);
            setTotalPage(res.data.totalPages);
            setTotalRecords(res.data.totalRecords);
          } else {
            setFlashSales([]);
            setTotalPage(1);
            setTotalRecords(0);
          }
        } else {
          setFlashSales([]);
          setTotalPage(1);
          setTotalRecords(0);
          toast({
            position: 'top',
            title: t('error'),
            description: t('no_data_exists'),
            status: 'error',
            duration: 2000,
            isClosable: true,
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
        let params = { shopId: shopId, page: currentPage, type: EFlashSaleRegisterStatus.APPROVED };

        if (doSearchFlashSale) {
          dispatch(setShowLoader(true));
          dispatch(setLoading(true));
          if (!!searchProgramFlashSaleName) {
            params.keyWord = searchProgramFlashSaleName;
          }

          if (searchProgramFlashSaleDate.length > 1) {
            params.fromDate = dayjs(searchProgramFlashSaleDate[0]).format(formatDate);
            params.toDate = dayjs(searchProgramFlashSaleDate[1]).format(formatDate);
          }

          const res = await requestGetShopListProgramFlashSale(params);

          if (res.code === EAppKey.MSG_SUCCESS) {
            if (res.data && res.data.results) {
              setFlashSales(res.data.results);
              setTotalPage(res.data.totalPages);
              setTotalRecords(res.data.totalRecords);
            } else {
              setFlashSales([]);
              setTotalPage(1);
              setTotalRecords(0);
            }
          } else {
            setFlashSales([]);
            setTotalPage(1);
            setTotalRecords(0);
            toast({
              position: 'top',
              title: t('no_results_found'),
              description: t('no_results_found_for_your_search'),
              status: 'error',
              duration: 2000,
              isClosable: true,
            });
          }
        }
      } finally {
        dispatch(setDoSearchFlashSale(false));
        dispatch(setShowLoader(false));
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 2000);
      }
    })();
  }, [
    shopId,
    doSearchFlashSale,
    currentPage,
    searchProgramFlashSaleName,
    searchProgramFlashSaleDate,
  ]);

  return (
    <Box>
      <Box mt="6" position="relative" minH={isEmpty(flashSales) || isLoading ? '300px' : 'unset'}>
        {isLoading ? (
          <>
            {Array(4)
              .fill(4)
              .map((item, index) => {
                return <LoadingProgramItem key={index} />;
              })}
          </>
        ) : isEmpty(flashSales) ? (
          <EmptyListItem title={t('no_data')}>
            <Icon as={IconNoData} w="93px" h="87px" />
          </EmptyListItem>
        ) : (
          <>
            {flashSales.map((item, index) => {
              return (
                <FlashSaleProgramItem
                  item={item}
                  index={index}
                  isLast={index === flashSales.length - 1}
                  onClick={() =>
                    router.push({
                      pathname: '/shop/flash-sale-natshop/program-flash-sale',
                      query: item,
                    })
                  }
                />
              );
            })}
          </>
        )}
      </Box>
      {!isEmpty(flashSales) && !isLoading && (
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
      )}
    </Box>
  );
};

export default TableRegisteredNatShop;
