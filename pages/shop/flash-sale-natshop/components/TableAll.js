import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Input,
  Icon,
  Flex,
  InputGroup,
  InputRightElement,
  useBoolean,
  Text,
  Image,
  Center,
  Td,
  AspectRatio,
  HStack,
  Button,
} from '@chakra-ui/react';
import { usePagination } from '@ajna/pagination';
import { useTranslation } from 'react-i18next';

import { requestDeleteVoucher, requestGetListVoucher, requestGetListFlashSaleNatShop } from 'utilities/ApiManage';
import { useDispatch } from 'react-redux';
import { setShowLoader } from 'redux/actions/app';
import { EAppKey, EVoucherStatus } from 'constants/types';
import { NotificationManager } from 'react-light-notifications';
import { AiFillEdit, AiOutlineSearch } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { ModalConfirm, PaginationPanel } from 'components';
import { isEmpty } from 'lodash';
import Images from 'assets';
import { FiTrash2 } from 'react-icons/fi';
import { BASE_API_URL } from 'utilities/const';
import { formatCurrency } from 'utilities/utils';
import dayjs from 'dayjs';

export const TableAll = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const pageSize = 50;

  const [flashSale, setFlashSale] = React.useState([]);
  const [selectedVoucher, setSelectedVoucher] = React.useState(null);
  const [isShowModal, { on: onShowModal, off: offShowModal }] = useBoolean(false);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [search, setSearch] = React.useState('');
  const [doSearch, { on: onSearch, off: offSearch }] = useBoolean(false);

  const headers = [
    t('serial_number'),
    'Flash Sale Name',
    'Product',
    'Status | Claiming Period',
    'Actions',
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
        const res = await requestGetListFlashSaleNatShop({ page: 1, shopId: 143 });
        console.log('requestGetListFlashSaleNatShop', res);
        if (res.code === EAppKey.MSG_SUCCESS && res.data && res.data.results) {
          setFlashSale(res.data.results);
          setTotalPage(res.data.totalPages);
          setTotalRecords(res.data.totalRecords);
        } else {
          NotificationManager.error({
            title: t('error'),
            message: `No data exists`,
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
        let key;
        if (doSearch) {
          dispatch(setShowLoader(true));
          if (doSearch) {
            key = search;
          }

          const res = await requestGetListVoucher({
            keyWord: key,
            page: currentPage,
          });

          if (res.code === EAppKey.MSG_SUCCESS && res.data && res.data.results) {
            setFlashSale(res.data.results === null ? [] : res.data.results);
            setTotalPage(res.data.totalPages);
            setTotalRecords(res.data.totalRecords);
          } else {
            setFlashSale([]);
            setTotalPage(1);
            setTotalRecords(0);
            NotificationManager.error({
              title: t('no_results_found'),
              message: t('no_results_found_for_your_search'),
            });
          }
        }
      } finally {
        dispatch(setShowLoader(false));
        offSearch();
      }
    })();
  }, [doSearch, currentPage, search]);

  const handleDeleteVoucher = React.useCallback(async () => {
    try {
      offShowModal();
      dispatch(setShowLoader(true));
      const res = await requestDeleteVoucher({ id: selectedVoucher.id });
      if (res.code === EAppKey.MSG_SUCCESS) {
        setSelectedVoucher(null);
        router.push('/admin/voucher');
      } else {
        NotificationManager.error({
          title: t('error'),
          message: res.message ? res.message.text : 'Error',
        });
      }
    } catch (error) {
      console.log('delete voucher error');
    } finally {
      dispatch(setShowLoader(false));
    }
  }, [selectedVoucher]);

  return (
    <Box>
      <InputGroup maxW="570px" borderRadius="4px" overflow="hidden">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search flash sale name"
        />
        <InputRightElement borderRadius="4px" cursor="pointer" h="full" bg="primary.100" w="100px">
          <Center onClick={onSearch}>
            <Icon as={AiOutlineSearch} w="24px" h="24px" color="white" />
          </Center>
        </InputRightElement>
      </InputGroup>
      <Box
        mt="6"
        bg="white"
        borderRadius="4px"
        overflow="auto"
        borderWidth="1px"
        borderColor="gray.400"
        pb="4">
        <Table variant="simple">
          {isEmpty(flashSale) ? (
            <Box />
          ) : (
            // <Center minH="200px" alignSelf="center">
            //   <Image w="80px" h="80px" src={Images.no_data} />
            // </Center>
            <>
              {flashSale.map((itemFlashSale, index) => {
                let item = itemFlashSale.flashSaleProgram;
                if (!item) {
                  return;
                }

                let _image = '';

                if (item && item.banner) {
                  let firstChar = item.banner.substring(0, 4);

                  if (firstChar === 'http' || firstChar === 'https') {
                    _image = item.banner;
                  } else {
                    _image = BASE_API_URL + '/assets/' + item.banner;
                  }

                }
                console.log('flashSale banner', item);

                return (
                  <Tr key={index}>
                    <Td borderColor="gray.1300">
                      <Flex>
                        <AspectRatio
                          w="180px"
                          ratio={2 / 1}
                          mr="2"
                          borderRadius="8px"
                          overflow="hidden">
                          <Image w="100%" h="100%" objectFit="cover" src={_image} />
                        </AspectRatio>
                      </Flex>
                    </Td>
                    <Td borderColor="gray.1300">
                      {item && (
                        <Center flexDirection="column" alignItems="flex-start">
                          <Flex>
                            <Flex
                              flexDirection={{ base: 'column', xl: 'row' }}
                              py="1"
                              px="2"
                              bg={
                                item.status === EVoucherStatus.UPCOMING
                                  ? 'red.700'
                                  : item.status === EVoucherStatus.HAPPENING
                                    ? 'green.200'
                                    : 'gray.2000'
                              }
                              alignItems="center"
                              borderRadius="full">
                              <Text
                                textStyle="h2-m"
                                color={
                                  item.status === EVoucherStatus.UPCOMING
                                    ? 'red.600'
                                    : item.status === EVoucherStatus.HAPPENING
                                      ? 'green.100'
                                      : 'gray.100'
                                }
                                textTransform="capitalize">
                                {item.status === EVoucherStatus.UPCOMING
                                  ? 'Upcoming'
                                  : item.status === EVoucherStatus.HAPPENING
                                    ? 'Happening'
                                    : 'Finished'}
                              </Text>
                            </Flex>
                            <Text textStyle="h5" color="text-basic" style={{ marginLeft: 10 }}>
                              {formatCurrency(item.name)}
                            </Text>
                          </Flex>
                          <Flex flexDirection="row">
                            <Text textStyle="h3" color="text-basic">
                              Thời gian chương trình:
                            </Text>
                            <Text mr='2' textStyle="h3" color="text-basic">
                              {dayjs(item.programStart).format('DD-MM-YYYY HH:MM')}
                            </Text>
                            <Text>-</Text>
                            <Text ml='2' textStyle="h3" color="text-basic">
                              {dayjs(item.programEnd).format('DD-MM-YYYY HH:MM')}
                            </Text>
                          </Flex>
                          <Text color="#333333">
                            {/* {formatCurrency(item.discountValue ?? 0)} */}
                            Đăng ký: 7 Khung giờ đang có sẵn, thời gian kết thúc đề đăng kí gần nhất
                            trong 19 ngày 3 giờ.
                          </Text>
                        </Center>
                      )}
                    </Td>
                    <Td isNumeric borderColor="gray.1300">
                      <Button
                        variant="primary"
                        children="Register now"
                        onClick={() =>
                          router.push({
                            pathname: '/shop/flash-sale-natshop/product-approval-flashsale',
                            query: item,
                          })
                        }
                      />
                    </Td>
                  </Tr>
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
            setFlashSale([]);
            setCurrentPage(page);
          }}
          pages={pages}
          mt="24px"
          mb="8px"
        />
        <Text textStyle="h4-m">
          {t('results_page', {
            start: (currentPage - 1) * 50 + 1,
            end: (currentPage - 1) * 50 + flashSale.length,
            total: totalRecords,
          })}
        </Text>
      </Flex>
      <ModalConfirm
        isOpen={isShowModal}
        onClose={offShowModal}
        title="Confirm Deletion"
        description={t('deleteConfirm')}
        buttonLeft={{ title: t('cancel'), onClick: offShowModal }}
        buttonRight={{ title: t('confirm'), onClick: handleDeleteVoucher }}
      />
    </Box>
  );
};

export default TableAll;
