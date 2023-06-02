import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Admin from 'layouts/Admin.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Search from '@material-ui/icons/Search';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import tableStyles from 'assets/jss/natcash/components/tableStyle.js';
import Pagination from '@material-ui/lab/Pagination';
import { useTranslation } from 'react-i18next';
import styles from 'assets/jss/natcash/views/productApproval/productApprovalStyle';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';
import {
  AspectRatio,
  Box,
  Center,
  Checkbox,
  Flex,
  HStack,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { formatCurrency } from 'utilities/utils';
import { requestGetListVoucherApprove } from 'utilities/ApiManage';
import { setShowLoader } from 'redux/actions/app';
import dayjs from 'dayjs';
import { BASE_API_URL } from 'utilities/const';
import _ from 'lodash';
import { EAppKey, EVoucherStatus } from 'constants/types';
import { setSelectedVouchers } from 'redux/actions/voucher';

function VoucherProgramApproval() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const useTableStyles = makeStyles(tableStyles);
  const classes = useStyles();
  const tableClasses = useTableStyles();

  const TABLE_HEAD = [
    t('serial_number'),
    'Voucher Name',
    'Shop Name',
    'Discount Amount',
    'Quantity',
    'Voucher Status | Date Range',
  ];

  const formatDate = 'YYYY-MM-DD';
  const FROM_DATE = dayjs().subtract(30, 'days').toDate();
  const TO_DATE = dayjs().toDate();

  const refInput = React.useRef();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [search, setSearch] = React.useState('');
  const [showDate, setShowDate] = React.useState(false);
  const [selectedDates, setSelectedDates] = React.useState([FROM_DATE, TO_DATE]);
  const [doFilter, setDoFilter] = React.useState(false);
  const [doSearch, setDoSearch] = React.useState(false);
  const [vouchers, setVouchers] = React.useState([]);
  const selectedVouchers = useSelector((state) => state.voucher.selectedVouchers);

  React.useEffect(() => {
    (async () => {
      try {
        dispatch(setShowLoader(true));
        const res = await requestGetListVoucherApprove({ page: 1 });

        if (res.code === EAppKey.MSG_SUCCESS && res.result && res.result.results) {
          let _initSelectedVouchers = [];
          for (let i = 0; i < res?.result.totalPages; i++) {
            _initSelectedVouchers.push({ isSelectAll: false, vouchers: [] });
          }
          dispatch(setSelectedVouchers(_initSelectedVouchers));
          setVouchers(res.result.results === null ? [] : res.result.results);
          setTotalPage(res?.result.totalPages);
          setTotalRecords(res.result.totalRecords);
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
        if (doSearch) {
          dispatch(setShowLoader(true));
          const res = await requestGetListVoucherApprove({
            keyWord: refInput?.current?.value,
            page: currentPage,
          });

          if (res.code === EAppKey.MSG_SUCCESS && res.result && res.result.results) {
            setVouchers(res.result.results === null ? [] : res.result.results);
            setTotalPage(res?.result.totalPages);
            setTotalRecords(res.result.totalRecords);
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
        dispatch(setShowLoader(false));
        setDoSearch(false);
      }
    })();
  }, [doSearch, currentPage, refInput.current]);

  React.useEffect(() => {
    (async () => {
      try {
        if (doFilter) {
          dispatch(setShowLoader(true));
          const res = await requestGetListVoucherApprove({
            fromDate: dayjs(selectedDates[0]).format(formatDate),
            toDate: dayjs(selectedDates[1]).format(formatDate),
            page: currentPage,
          });

          if (res.code === EAppKey.MSG_SUCCESS && res.result && res.result.results) {
            setVouchers(res.result.results === null ? [] : res.result.results);
            setTotalPage(res?.result.totalPages);
            setTotalRecords(res.result.totalRecords);
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
        dispatch(setShowLoader(false));
        setDoFilter(false);
      }
    })();
  }, [doFilter, currentPage, selectedDates]);

  const resetFilterDate = React.useCallback(() => {
    setSelectedDates([FROM_DATE, TO_DATE]);
    setShowDate(false);
    setDoFilter(false);
  }, []);

  const handleCheckAll = React.useCallback(async () => {
    if (selectedVouchers[currentPage - 1].isSelectAll) {
      const updatedSelectedVouchers = [...selectedVouchers];
      updatedSelectedVouchers[currentPage - 1] = {
        vouchers: [],
        isSelectAll: false,
      };
      dispatch(setSelectedVouchers(updatedSelectedVouchers));
    } else {
      const updatedSelectedVouchers = [...selectedVouchers];
      updatedSelectedVouchers[currentPage - 1] = {
        vouchers: vouchers,
        isSelectAll: true,
      };
      dispatch(setSelectedVouchers(updatedSelectedVouchers));
    }
  }, [selectedVouchers, currentPage, vouchers]);

  const handleSelect = React.useCallback(
    async (item) => {
      const updatedSelectedVouchers = [...selectedVouchers];
      const currentPageVouchers = updatedSelectedVouchers[currentPage - 1];

      const updatedVouchers = currentPageVouchers.vouchers.filter(
        (voucher) => voucher.id !== item.id
      );

      if (updatedVouchers.length === currentPageVouchers.vouchers.length) {
        currentPageVouchers.vouchers.push(item);
      } else {
        currentPageVouchers.vouchers = updatedVouchers;
        currentPageVouchers.isSelectAll = false;
      }

      dispatch(setSelectedVouchers(updatedSelectedVouchers));
    },
    [selectedVouchers, currentPage]
  );

  const handleSelectTab = React.useCallback(
    async (e, value) => {
      setCurrentPage(value);
      const res = await requestGetListVoucherApprove({ page: value });
      if (res.code === EAppKey.MSG_SUCCESS && res.result && res.result.results) {
        let _initSelectedVouchers = [];
        for (let i = 0; i < res?.result.totalPages; i++) {
          _initSelectedVouchers.push({ isSelectAll: false, vouchers: [] });
        }

        if (selectedVouchers) {
          dispatch(setSelectedVouchers(selectedVouchers));
        } else {
          dispatch(setSelectedVouchers(_initSelectedVouchers));
        }

        setVouchers(res.result.results === null ? [] : res.result.results);
        setTotalPage(res?.result.totalPages);
        setTotalRecords(res.result.totalRecords);
      }
    },
    [selectedVouchers]
  );

  const renderVoucher = React.useCallback(
    (item, index) => {
      const {
        banner,
        programEnd,
        programName,
        programStart,
        programStatus,
        quantityVoucher,
        registerPrice,
        shopName,
      } = item;

      let _image = '';

      let firstChar = banner.substring(0, 4);

      if (firstChar === 'http' || firstChar === 'https') {
        _image = banner;
      } else {
        _image = BASE_API_URL + '/assets/' + banner;
      }

      const isItemChecked = (() => {
        for (let i = 0; i < selectedVouchers[currentPage - 1]?.vouchers?.length; i++) {
          if (selectedVouchers[currentPage - 1]?.vouchers[i].id === item.id) {
            return true;
          }
        }
        return false;
      })();

      return (
        <React.Fragment key={index}>
          <TableRow
            key={index}
            onClick={() => handleSelect(item)}
            className={tableClasses.tableBodyRow}
            style={{
              cursor: 'pointer',
              backgroundColor: isItemChecked ? '#fff6f0' : '#fff',
              height: 100,
            }}>
            <TableCell key="check">
              <Checkbox isChecked={isItemChecked} onChange={() => handleSelect(item)} />
            </TableCell>
            <TableCell className={tableClasses.tableCell} key="serial_number">
              <Text textStyle="h4" color="text-basic">
                {index + 1}
              </Text>
            </TableCell>
            <TableCell className={tableClasses.tableCell} key="voucher-info">
              <Flex>
                <AspectRatio w="180px" ratio={2 / 1} mr="2" borderRadius="8px" overflow="hidden">
                  <Image w="100%" h="100%" objectFit="cover" src={_image} />
                </AspectRatio>
                <Flex flexDirection="column" ml="3" flex="1">
                  <Text textStyle="h4" color="text-basic" noOfLines={2}>
                    {programName}
                  </Text>
                </Flex>
              </Flex>
            </TableCell>
            <TableCell className={tableClasses.tableCell} key="categoryName">
              <Text textStyle="h4" noOfLines={1}>
                {shopName}
              </Text>
            </TableCell>
            <TableCell className={tableClasses.tableCell} key="price">
              <Text textStyle="h3" color="text-basic">
                {formatCurrency(registerPrice)}
              </Text>
            </TableCell>
            <TableCell className={tableClasses.tableCell} key="shopCode">
              <Text textStyle="h3" color="text-basic">
                {quantityVoucher}
              </Text>
            </TableCell>
            <TableCell className={tableClasses.tableCell} key={'publish'}>
              <Center flexDirection="column" alignItems="flex-start">
                {/* <Flex
                  py="1"
                  px="2"
                  bg={
                    programStatus === EVoucherStatus.UPCOMING
                      ? 'red.700'
                      : programStatus === EVoucherStatus.HAPPENING
                      ? 'green.200'
                      : 'gray.2000'
                  }
                  alignItems="center"
                  borderRadius="full">
                  <Text
                    textStyle="h2-m"
                    color={
                      programStatus === EVoucherStatus.UPCOMING
                        ? 'red.600'
                        : programStatus === EVoucherStatus.HAPPENING
                        ? 'green.100'
                        : 'gray.100'
                    }
                    textTransform="capitalize">
                    {programStatus === EVoucherStatus.UPCOMING
                      ? 'Upcoming'
                      : programStatus === EVoucherStatus.HAPPENING
                      ? 'Happening'
                      : 'Finished'}
                  </Text>
                </Flex> */}
                <HStack mt="2">
                  <Text textStyle="h3" color="text-basic">
                    {dayjs(programStart).format('DD-MM-YYYY HH:MM')}
                  </Text>
                  <Text>-</Text>
                  <Text textStyle="h3" color="text-basic">
                    {dayjs(programEnd).format('DD-MM-YYYY HH:MM')}
                  </Text>
                </HStack>
              </Center>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    },
    [selectedVouchers, currentPage]
  );

  return (
    <Card>
      <CardHeader color="primary">
        <Text textStyle="h5" color="white">
          {t('sideBar.voucherProgramApproval')}
        </Text>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'unset', md: 'center' }}
          justifyContent={{ base: 'flex-start', md: 'space-between' }}>
          <Flex
            flexDirection={{ base: 'column', sm: 'row' }}
            alignItems={{ base: 'unset', sm: 'center' }}
            flex="1">
            <Flex mx={{ base: 'unset', sm: '2' }} flex="1" alignItems="center">
              <Input
                ref={refInput}
                variant="search"
                placeholder="Enter voucher code, name."
                flex="1"
                maxW="400px"
              />
              <Center
                h="100%"
                mx="2"
                cursor="pointer"
                boxSize="40px"
                w="40px"
                borderRadius="full"
                color="gray.400"
                shadow="md"
                onClick={() => setDoSearch(!doSearch)}>
                <Search />
              </Center>
              {/* <RangeDatePickerItem
                selectedDates={selectedDates}
                onDateChange={setSelectedDates}
                maxDate={moment().toDate()}
              /> */}
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
      {vouchers && vouchers.length > 0 && (
        <CardFooter>
          <div className={tableClasses.tableResponsive} style={{ marginTop: '0' }}>
            <Table className={tableClasses.table}>
              <TableHead className={tableClasses['primary' + 'TableHeader']}>
                <TableRow className={tableClasses.tableHeadRow}>
                  <TableCell className={tableClasses.tableCell + ' ' + tableClasses.tableHeadCell}>
                    <Checkbox
                      isChecked={selectedVouchers[currentPage - 1].isSelectAll}
                      tabIndex={-1}
                      onChange={() => handleCheckAll()}
                      ml="2"
                    />
                  </TableCell>
                  {TABLE_HEAD.map((prop, key) => {
                    return (
                      <TableCell
                        style={{ width: key === 1 ? '30%' : null }}
                        className={tableClasses.tableCell + ' ' + tableClasses.tableHeadCell}
                        key={key}>
                        <Text textStyle="b-md">{prop}</Text>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {vouchers.map((item, index) => {
                  return renderVoucher(item, index);
                })}
              </TableBody>
            </Table>
            <Flex justifyContent="space-between" pt="6" pr="6" pb="6">
              <Pagination count={totalPage} page={currentPage} onChange={handleSelectTab} />
              <Box>
                <Text>
                  {t('results_page', {
                    start: (currentPage - 1) * 50 + 1,
                    end: (currentPage - 1) * 50 + vouchers.length,
                    total: totalRecords,
                  })}
                </Text>
              </Box>
            </Flex>
          </div>
        </CardFooter>
      )}
      <NotificationContainer />
    </Card>
  );
}

VoucherProgramApproval.layout = Admin;

export default WithAuthentication(VoucherProgramApproval);
