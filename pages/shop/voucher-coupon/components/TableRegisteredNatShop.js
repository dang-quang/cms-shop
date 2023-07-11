import React from 'react';
import { Box, Flex, Icon, Text, useToast } from '@chakra-ui/react';
import { usePagination } from '@ajna/pagination';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setShowLoader } from 'redux/actions/app';
import { useRouter } from 'next/router';
import {
  EmptyListItem,
  LoadingNatShopVoucherItem,
  PaginationPanel,
  VoucherNatShopItem,
} from 'components';
import { isEmpty } from 'lodash';
import { EAppKey, EVoucherRegisterStatus } from 'constants/types';
import { requestGetShopListProgram } from 'utilities/ApiShop';
import { setDoSearchVoucher } from 'redux/actions/voucher';
import dayjs from 'dayjs';
import { IconNoData } from 'components/Icons/Icons';

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

  const [vouchers, setVouchers] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalRecords, setTotalRecords] = React.useState(0);

  const { doSearchVoucher, searchProgramVoucherName, searchProgramVoucherDate } = useSelector(
    (state) => state.voucher
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
          type: EVoucherRegisterStatus.APPROVED,
        };

        const res = await requestGetShopListProgram(params);

        if (res.code === EAppKey.MSG_SUCCESS) {
          if (res.data && res.data.results) {
            setVouchers(res.data.results);
            setTotalPage(res.data.totalPages);
            setTotalRecords(res.data.totalRecords);
          } else {
            setVouchers([]);
            setTotalPage(1);
            setTotalRecords(0);
          }
        } else {
          setVouchers([]);
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
        let params = { shopId: shopId, page: currentPage, type: EVoucherRegisterStatus.APPROVED };

        if (doSearchVoucher) {
          dispatch(setShowLoader(true));
          dispatch(setLoading(true));
          if (!!searchProgramVoucherName) {
            params.keyWord = searchProgramVoucherName;
          }

          if (searchProgramVoucherDate.length > 1) {
            params.fromDate = dayjs(searchProgramVoucherDate[0]).format(formatDate);
            params.toDate = dayjs(searchProgramVoucherDate[1]).format(formatDate);
          }

          const res = await requestGetShopListProgram(params);

          if (res.code === EAppKey.MSG_SUCCESS) {
            if (res.data && res.data.results) {
              setVouchers(res.data.results);
              setTotalPage(res.data.totalPages);
              setTotalRecords(res.data.totalRecords);
            } else {
              setVouchers([]);
              setTotalPage(1);
              setTotalRecords(0);
            }
          } else {
            setVouchers([]);
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
        dispatch(setDoSearchVoucher(false));
        dispatch(setShowLoader(false));
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 2000);
      }
    })();
  }, [shopId, doSearchVoucher, currentPage, searchProgramVoucherName]);

  return (
    <Box>
      <Box mt="6" position="relative" minH={isEmpty(vouchers) || isLoading ? '300px' : 'unset'}>
        {isLoading ? (
          <>
            {Array(4)
              .fill(4)
              .map((item, index) => {
                return <LoadingNatShopVoucherItem key={index} />;
              })}
          </>
        ) : isEmpty(vouchers) ? (
          <EmptyListItem title={t('no_data')}>
            <Icon as={IconNoData} w="93px" h="87px" />
          </EmptyListItem>
        ) : (
          <>
            {vouchers.map((item, index) => {
              return (
                <VoucherNatShopItem
                  item={item}
                  index={index}
                  isLast={index === vouchers.length - 1}
                  onClick={() =>
                    router.push({ pathname: '/shop/voucher-coupon/program-voucher', query: item })
                  }
                />
              );
            })}
          </>
        )}
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
    </Box>
  );
};

export default TableRegisteredNatShop;
