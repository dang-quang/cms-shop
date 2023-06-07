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
} from '@chakra-ui/react';
import { usePagination } from '@ajna/pagination';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';
import { setShowLoader } from 'redux/actions/app';
import { NotificationManager } from 'react-light-notifications';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { ModalConfirm, PaginationPanel, RangeDatePickerItem, VoucherShopItem } from 'components';
import { isEmpty } from 'lodash';
import Images from 'assets';

const data_all = [
  {
    banner: 'natshop/voucher/20230603/voucher_1685772984515.jpg',
    createAt: 1685772905000,
    description: null,
    discountLimit: null,
    discountValue: 200000,
    id: 24,
    maxDiscount: null,
    maxOrderPrice: null,
    maxShopRegister: 0,
    minDiscount: null,
    minOrderPrice: 10000000,
    name: 'Voucher 100k',
    programEnd: 1685970000000,
    programStart: 1685883600000,
    quantityVoucher: 1000,
    registerEnd: 1685970000000,
    registerPrice: 100000,
    registerStart: 1685859300000,
    shopRegister: null,
    status: 'UPCOMING',
    typeDiscount: 'CASH',
    typeLimit: 'AMOUNT',
    updateAt: 1685772984000,
  },
  {
    banner: 'natshop/voucher/20230603/voucher_1685771075742.jpg',
    createAt: 1685771075000,
    description: 'Test',
    discountLimit: null,
    discountValue: 20000,
    id: 7,
    maxDiscount: null,
    maxOrderPrice: null,
    maxShopRegister: 0,
    minDiscount: null,
    minOrderPrice: 2000,
    name: 'Voucher 50k',
    programEnd: 1685775180000,
    programStart: 1685771580000,
    quantityVoucher: 1000,
    registerEnd: 1685775180000,
    registerPrice: 200000,
    registerStart: 1685771580000,
    shopRegister: null,
    status: 'UPCOMING',
    typeDiscount: 'CASH',
    typeLimit: 'AMOUNT',
    updateAt: null,
  },
  {
    banner: 'natshop/shop/20230601/voucher_1685593735779.jpg',
    createAt: 1685593735000,
    description: null,
    discountLimit: null,
    discountValue: 100000,
    id: 22,
    maxDiscount: null,
    maxOrderPrice: null,
    maxShopRegister: 10000,
    minDiscount: null,
    minOrderPrice: 10000,
    name: 'name',
    programEnd: 1685597880000,
    programStart: 1685594280000,
    quantityVoucher: 1000,
    registerEnd: 1685597880000,
    registerPrice: 10000,
    registerStart: 1685594280000,
    shopRegister: null,
    status: 'UPCOMING',
    typeDiscount: 'CASH',
    typeLimit: 'AMOUNT',
    updateAt: null,
  },
];

const TableAllMyShop = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const pageSize = 50;
  const refInputSearch = React.useRef(null);
  const [vouchers, setVouchers] = React.useState([]);
  const [selectedVoucher, setSelectedVoucher] = React.useState(null);
  const [isShowModal, { on: onShowModal, off: offShowModal }] = useBoolean(false);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [doSearch, { on: onSearch, off: offSearch }] = useBoolean(false);
  const [selectedDates, setSelectedDates] = React.useState([]);

  const headers = [
    t('serial_number'),
    'Voucher Name',
    'Discount Amount',
    'Usage quantity',
    'Usage',
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
        setVouchers(data_all);

        // const res = await requestGetListVoucher({ page: 1 });

        // if (res.code === EAppKey.MSG_SUCCESS && res.data && res.data.results) {
        //   setVouchers(res.data.results);
        //   setTotalPage(res.data.totalPages);
        //   setTotalRecords(res.data.totalRecords);
        // } else {
        //   NotificationManager.error({
        //     title: t('error'),
        //     message: `No data exists`,
        //   });
        // }
      } finally {
        dispatch(setShowLoader(false));
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        let key;
        // if (doSearch) {
        //   dispatch(setShowLoader(true));
        //   if (doSearch) {
        //     key = search;
        //   }

        //   const res = await requestGetListVoucher({
        //     keyWord: key,
        //     page: currentPage,
        //   });

        //   if (res.code === EAppKey.MSG_SUCCESS && res.data && res.data.results) {
        //     setVouchers(res.data.results === null ? [] : res.data.results);
        //     setTotalPage(res.data.totalPages);
        //     setTotalRecords(res.data.totalRecords);
        //   } else {
        //     setVouchers([]);
        //     setTotalPage(1);
        //     setTotalRecords(0);
        //     NotificationManager.error({
        //       title: t('no_results_found'),
        //       message: t('no_results_found_for_your_search'),
        //     });
        //   }
        // }
      } finally {
        dispatch(setShowLoader(false));
        offSearch();
      }
    })();
  }, [doSearch, currentPage, refInputSearch.current]);

  const handleDeleteVoucher = React.useCallback(async () => {
    try {
      offShowModal();
      //       dispatch(setShowLoader(true));
      //       const res = await requestDeleteVoucher({ id: selectedVoucher.id });
      //       if (res.code === EAppKey.MSG_SUCCESS) {
      //         setSelectedVoucher(null);
      //         router.push('/admin/voucher');
      //       } else {
      //         NotificationManager.error({
      //           title: t('error'),
      //           message: res.message ? res.message.text : 'Error',
      //         });
      //       }
    } catch (error) {
      console.log('delete voucher error');
    } finally {
      dispatch(setShowLoader(false));
    }
  }, [selectedVoucher]);

  return (
    <Box>
      <Flex gap="6" flexDirection={{ base: 'column', xl: 'row' }}>
        <InputGroup maxW="570px" borderRadius="4px" overflow="hidden">
          <Input ref={refInputSearch} placeholder="Search Voucher Name/Code" />
          <InputRightElement
            borderRadius="4px"
            cursor="pointer"
            h="full"
            bg="primary.100"
            w="100px">
            <Center onClick={onSearch}>
              <Icon as={AiOutlineSearch} w="24px" h="24px" color="white" />
            </Center>
          </InputRightElement>
        </InputGroup>
        <RangeDatePickerItem
          selectedDates={selectedDates}
          onDateChange={setSelectedDates}
          onClear={() => setSelectedDates([])}
        />
      </Flex>
      <Box
        mt="6"
        bg="white"
        borderRadius="4px"
        overflow="auto"
        borderWidth="1px"
        borderColor="gray.400"
        pb="4">
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
          {isEmpty(vouchers) ? (
            <Box minH="220px">
              <Center
                h="220px"
                position="absolute"
                insetX="0"
                flexDirection="column"
                alignSelf="center">
                <Image w="150px" h="100px" src={Images.no_data} />
                <Text textStyle="body" textAlign="center" color="primary.100" mt="1">
                  No Data Found
                </Text>
              </Center>
            </Box>
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
                        pathname: '/admin/voucher/update',
                        query: item,
                      });
                    }}
                    onDelete={() => {
                      setSelectedVoucher(item);
                      onShowModal();
                    }}
                  />
                );
                // if (!item) {
                //   return;
                // }

                // let _image = '';

                // if (item && item.banner) {
                //   let firstChar = item.banner.substring(0, 4);

                //   if (firstChar === 'http' || firstChar === 'https') {
                //     _image = item.banner;
                //   } else {
                //     _image = BASE_API_URL + '/assets/' + item.banner;
                //   }
                // }

                // return (
                //   <Tr key={index}>
                //     <Td borderColor="gray.1300">
                //       <Text textStyle="h3" color="text-basic">
                //         {index + 1}
                //       </Text>
                //     </Td>
                //     <Td borderColor="gray.1300">
                //       <Flex>
                //         <AspectRatio
                //           w="180px"
                //           ratio={2 / 1}
                //           mr="2"
                //           borderRadius="8px"
                //           overflow="hidden">
                //           <Image w="100%" h="100%" objectFit="cover" src={_image} />
                //         </AspectRatio>
                //         <Text textStyle="h3-m" color="text-basic">
                //           {item ? item.name : ''}
                //         </Text>
                //       </Flex>
                //     </Td>
                //     <Td isNumeric borderColor="gray.1300">
                //       {item && item.discountValue && (
                //         <Text textStyle="h3" color="text-basic">
                //           {formatCurrency(item.discountValue ?? 0)}
                //         </Text>
                //       )}
                //     </Td>
                //     <Td isNumeric borderColor="gray.1300">
                //       {item && item.quantityVoucher && (
                //         <Text textStyle="h3" color="text-basic">
                //           {item.quantityVoucher}
                //         </Text>
                //       )}
                //     </Td>
                //     <Td borderColor="gray.1300">
                //       <Center>
                //         <Text textStyle="h3" color="text-basic">
                //           {item.shopRegister ?? 0}
                //         </Text>
                //       </Center>
                //     </Td>
                //     <Td borderColor="gray.1300">
                //       {item && (
                //         <Center flexDirection="column" alignItems="flex-start">
                //           <Flex
                //             py="1"
                //             px="2"
                //             bg={
                //               item.status === EVoucherStatus.UPCOMING
                //                 ? 'red.700'
                //                 : item.status === EVoucherStatus.HAPPENING
                //                 ? 'green.200'
                //                 : 'gray.2000'
                //             }
                //             alignItems="center"
                //             borderRadius="full">
                //             <Text
                //               textStyle="h2-m"
                //               color={
                //                 item.status === EVoucherStatus.UPCOMING
                //                   ? 'red.600'
                //                   : item.status === EVoucherStatus.HAPPENING
                //                   ? 'green.100'
                //                   : 'gray.100'
                //               }
                //               textTransform="capitalize">
                //               {item.status === EVoucherStatus.UPCOMING
                //                 ? 'Upcoming'
                //                 : item.status === EVoucherStatus.HAPPENING
                //                 ? 'Happening'
                //                 : 'Finished'}
                //             </Text>
                //           </Flex>
                //           {item && item.programStart && item.programEnd && (
                //             <HStack mt="2">
                //               <Text textStyle="h3" color="text-basic">
                //                 {dayjs(item.programStart).format('DD-MM-YYYY HH:MM')}
                //               </Text>
                //               <Text>-</Text>
                //               <Text textStyle="h3" color="text-basic">
                //                 {dayjs(item.programEnd).format('DD-MM-YYYY HH:MM')}
                //               </Text>
                //             </HStack>
                //           )}
                //         </Center>
                //       )}
                //     </Td>
                //     <Td isNumeric borderColor="gray.1300">
                //       <Flex justifyContent="flex-end">
                //         <HStack>
                //           <Center
                //             boxSize="40px"
                //             cursor="pointer"
                //             onClick={() => {
                //               router.push({
                //                 pathname: '/admin/voucher/update',
                //                 query: item,
                //               });
                //             }}>
                //             <Icon
                //               as={AiFillEdit}
                //               w="18px"
                //               h="18px"
                //               color="text-basic"
                //               cursor="pointer"
                //             />
                //           </Center>
                //           <Center
                //             boxSize="40px"
                //             cursor="pointer"
                //             onClick={() => {
                //               setSelectedVoucher(item);
                //               onShowModal();
                //             }}>
                //             <Icon
                //               as={FiTrash2}
                //               w="18px"
                //               h="18px"
                //               color="red.600"
                //               cursor="pointer"
                //             />
                //           </Center>
                //         </HStack>
                //       </Flex>
                //     </Td>
                //   </Tr>
                // );
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

export default TableAllMyShop;
