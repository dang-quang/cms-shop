import React from 'react';
import {
  Box,
  Input,
  Icon,
  Flex,
  InputGroup,
  InputRightElement,
  useBoolean,
  Text,
  Image,
  Center,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react';
import { usePagination } from '@ajna/pagination';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';
import { setShowLoader } from 'redux/actions/app';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import Images from 'assets';
import dayjs from 'dayjs';
import { PaginationPanel, RangeDatePickerItem, SmsMessageItem } from 'components';
import { ESMSStatus } from 'constants/types';

const data_awaiting_registration = [
  {
    image:
      'https://user-images.githubusercontent.com/42206067/243565384-c6f7df0a-8d76-43c9-82d0-0c41e72ffd23.png',
    code: 'SMS01',
    quantity: 30,
    startDate: dayjs().unix(),
    endDate: dayjs().add(2, 'months').unix(),
    price: 50000,
    status: ESMSStatus.AWAITING_REGISTRATION,
  },
  {
    image:
      'https://user-images.githubusercontent.com/42206067/243565384-c6f7df0a-8d76-43c9-82d0-0c41e72ffd23.png',
    code: 'SMS01',
    quantity: 30,
    startDate: dayjs().unix(),
    endDate: dayjs().add(2, 'months').unix(),
    price: 50000,
    status: ESMSStatus.AWAITING_REGISTRATION,
  },
  {
    image:
      'https://user-images.githubusercontent.com/42206067/243565384-c6f7df0a-8d76-43c9-82d0-0c41e72ffd23.png',
    code: 'SMS01',
    quantity: 30,
    startDate: dayjs().unix(),
    endDate: dayjs().add(2, 'months').unix(),
    price: 50000,
    status: ESMSStatus.AWAITING_REGISTRATION,
  },
];

const TableAwaitingRegistration = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const pageSize = 50;

  const refInputSearch = React.useRef(null);
  const refInputFrom = React.useRef(null);
  const refInputTo = React.useRef(null);
  const [messages, setMessages] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [doSearch, { on: onSearch, off: offSearch }] = useBoolean(false);

  const formatDate = 'YYYY-MM-DD';
  const FROM_DATE = dayjs().subtract(30, 'days').toDate();
  const TO_DATE = dayjs().toDate();

  const [selectedDates, setSelectedDates] = React.useState([FROM_DATE, TO_DATE]);

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
        setMessages(data_awaiting_registration);
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
  }, [data_awaiting_registration]);

  React.useEffect(() => {
    (async () => {
      try {
        let key;
        if (doSearch) {
          // dispatch(setShowLoader(true));
          // if (doSearch && refInput.current) {
          //   key = refInput?.current.value;
          // }
          // const res = await requestGetListVoucher({
          //   keyWord: key,
          //   page: currentPage,
          // });
          // if (res.code === EAppKey.MSG_SUCCESS && res.data && res.data.results) {
          //   setSelectedMessage(res.data.results === null ? [] : res.data.results);
          //   setTotalPage(res.data.totalPages);
          //   setTotalRecords(res.data.totalRecords);
          // } else {
          //   setSelectedMessage([]);
          //   setTotalPage(1);
          //   setTotalRecords(0);
          //   NotificationManager.error({
          //     title: t('no_results_found'),
          //     message: t('no_results_found_for_your_search'),
          //   });
          // }
        }
      } finally {
        dispatch(setShowLoader(false));
        offSearch();
      }
    })();
  }, [doSearch, currentPage, refInputSearch.current]);

  return (
    <Box>
      <InputGroup maxW="570px" borderRadius="4px" overflow="hidden">
        <Input ref={refInputSearch} placeholder="Search message code" />
        <InputRightElement borderRadius="4px" cursor="pointer" h="full" bg="primary.100" w="100px">
          <Center onClick={onSearch}>
            <Icon as={AiOutlineSearch} w="24px" h="24px" color="white" />
          </Center>
        </InputRightElement>
      </InputGroup>
      <Flex
        mt="6"
        gap="4"
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'unset', md: 'center' }}>
        <RangeDatePickerItem selectedDates={selectedDates} onDateChange={setSelectedDates} />
        <HStack gap="2">
          <Input ref={refInputFrom} autoComplete="off" placeholder="Price From" type="number" />
          <Input ref={refInputTo} autoComplete="off" placeholder="Price To" type="number" />
        </HStack>
      </Flex>
      <Box mt="6" flex="1" h="full" minH="60vh">
        {isEmpty(messages) ? (
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
          <SimpleGrid
            columns={{ base: 2, md: 3, xl: 4, '2xl': 5 }}
            spacing={{ base: '6', md: '8', xl: '10' }}>
            {messages.map((item, index) => {
              return <SmsMessageItem item={item} key={index} />;
            })}
          </SimpleGrid>
        )}
      </Box>
      {!isEmpty(messages) && (
        <Flex justifyContent="space-between" alignItems="center">
          <PaginationPanel
            pagesCount={pagesCount}
            currentPage={currentPage}
            isDisabled={isDisabled}
            onPageChange={(page) => {
              setMessages([]);
              setCurrentPage(page);
            }}
            pages={pages}
            mt="24px"
            mb="8px"
          />
          <Text textStyle="h4-m">
            {t('results_page', {
              start: (currentPage - 1) * 50 + 1,
              end: (currentPage - 1) * 50 + messages.length,
              total: totalRecords,
            })}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default TableAwaitingRegistration;