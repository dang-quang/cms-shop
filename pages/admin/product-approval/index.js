import React, { useState } from 'react';
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
import taskStyles from 'assets/jss/natcash/components/tasksStyle.js';
import Pagination from '@material-ui/lab/Pagination';
import { useTranslation } from 'react-i18next';
import styles from 'assets/jss/natcash/views/productApproval/productApprovalStyle';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';
import { AspectRatio, Box, Center, Checkbox, Flex, Image, Input, Text } from '@chakra-ui/react';
import { formatCurrency, formatNumber } from 'utilities/utils';
import { requestApproveProduct, requestGetListProductApprove } from 'utilities/ApiManage';
import { setShowLoader } from 'redux/actions/app';
import dayjs from 'dayjs';
import router from 'next/router';
import { RangeDatePickerItem } from 'components';
import { BASE_API_URL } from 'utilities/const';
import _ from 'lodash';
import { EAppKey } from 'constants/types';
import { setApproveProducts } from 'redux/actions/product';
import { useImageHandler } from 'hooks';
import imageHandler from 'utilities/imageHandler';

function ProductApproval() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const useTableStyles = makeStyles(tableStyles);
  const classes = useStyles();
  const tableClasses = useTableStyles();
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();

  const TABLE_HEAD = [
    t('serial_number'),
    t('name'),
    t('sideBar.category'),
    t('price'),
    t('code_shop'),
    t('created_by'),
    t('qrManagement.publishTime'),
  ];

  const formatDate = 'YYYY-MM-DD';
  const FROM_DATE = dayjs().subtract(30, 'days').toDate();
  const TO_DATE = dayjs().toDate();

  const refInput = React.useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [search, setSearch] = React.useState('');
  const [showDate, setShowDate] = React.useState(false);
  const [selectedDates, setSelectedDates] = React.useState([FROM_DATE, TO_DATE]);
  const [doFilter, setDoFilter] = useState(false);
  const [doSearch, setDoSearch] = useState(false);
  const [products, setProducts] = React.useState([]);
  const approveProducts = useSelector((state) => state.product.approveProducts);

  React.useEffect(() => {
    (async () => {
      try {
        dispatch(setShowLoader(true));
        const res = await requestGetListProductApprove({ page: 1 });
        if (res.code === EAppKey.MSG_SUCCESS && res.result && res.result.results) {
          let _initSelectedProducts = [];
          for (let i = 0; i < res?.result.totalPages; i++) {
            _initSelectedProducts.push({ isSelectAll: false, products: [] });
          }
          dispatch(setApproveProducts(_initSelectedProducts));
          setProducts(res.result.results === null ? [] : res.result.results);
          setTotalPage(res?.result.totalPages);
          setTotalRecords(res.result.totalRecords);
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
        if (doSearch) {
          dispatch(setShowLoader(true));
          const res = await requestGetListProductApprove({
            keyWord: refInput.current.value,
            page: currentPage,
          });

          if (res.code === EAppKey.MSG_SUCCESS && res.result && res.result.results) {
            // let _initSelectedProducts = [];
            // for (let i = 0; i < res?.result.totalPages; i++) {
            //   _initSelectedProducts.push({ isSelectAll: false, products: [] });
            // }
            //dispatch(setApproveProducts(_initSelectedProducts));
            setProducts(res.result.results === null ? [] : res.result.results);
            setTotalPage(res?.result.totalPages);
            setTotalRecords(res.result.totalRecords);
          } else {
            setProducts([]);
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
          const res = await requestGetListProductApprove({
            fromDate: dayjs(selectedDates[0]).format(formatDate),
            toDate: dayjs(selectedDates[1]).format(formatDate),
            page: currentPage,
          });

          if (res.code === EAppKey.MSG_SUCCESS && res.result && res.result.results) {
            let _initSelectedProducts = [];
            // for (let i = 0; i < res?.result.totalPages; i++) {
            //   _initSelectedProducts.push({ isSelectAll: false, products: [] });
            // }
            // dispatch(setApproveProducts(_initSelectedProducts));
            setProducts(res.result.results === null ? [] : res.result.results);
            setTotalPage(res?.result.totalPages);
            setTotalRecords(res.result.totalRecords);
          } else {
            setProducts([]);
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
    if (approveProducts[currentPage - 1].isSelectAll) {
      const updatedSelectedProducts = [...approveProducts];
      updatedSelectedProducts[currentPage - 1] = {
        products: [],
        isSelectAll: false,
      };
      dispatch(setApproveProducts(updatedSelectedProducts));
    } else {
      const updatedSelectedProducts = [...approveProducts];
      updatedSelectedProducts[currentPage - 1] = {
        products: products,
        isSelectAll: true,
      };
      dispatch(setApproveProducts(updatedSelectedProducts));
    }
  }, [approveProducts, currentPage, products]);

  const handleSelect = React.useCallback(
    async (item) => {
      const updatedSelectedProducts = [...approveProducts];
      const currentPageProducts = updatedSelectedProducts[currentPage - 1];

      const updatedProducts = currentPageProducts.products.filter(
        (product) => product.id !== item.id
      );

      if (updatedProducts.length === currentPageProducts.products.length) {
        currentPageProducts.products.push(item);
      } else {
        currentPageProducts.products = updatedProducts;
        currentPageProducts.isSelectAll = false;
      }

      dispatch(setApproveProducts(updatedSelectedProducts));
    },
    [approveProducts, currentPage]
  );

  const handleSelectTab = React.useCallback(
    async (e, value) => {
      setCurrentPage(value);
      const res = await requestGetListProductApprove({ page: value });
      if (res.code === EAppKey.MSG_SUCCESS && res.result && res.result.results) {
        let _initSelectedProducts = [];
        for (let i = 0; i < res?.result.totalPages; i++) {
          _initSelectedProducts.push({ isSelectAll: false, products: [] });
        }

        if (approveProducts) {
          dispatch(setApproveProducts(approveProducts));
        } else {
          dispatch(setApproveProducts(_initSelectedProducts));
        }

        setProducts(res.result.results === null ? [] : res.result.results);
        setTotalPage(res?.result.totalPages);
        setTotalRecords(res.result.totalRecords);
      }
    },
    [approveProducts]
  );

  const renderProduct = React.useCallback(
    (item, index) => {
      const { categoryName, createAt, createBy, image, name, price, shopCode, productCode } = item;

      const isItemChecked = (() => {
        for (let i = 0; i < approveProducts[currentPage - 1]?.products?.length; i++) {
          if (approveProducts[currentPage - 1]?.products[i].id === item.id) {
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
            <TableCell className={tableClasses.tableCell} key={'productInfo'}>
              <Flex alignItems="center">
                <AspectRatio
                  overflow="hidden"
                  w="80px"
                  ratio={1 / 1}
                  shadow="sm"
                  borderRadius="6px">
                  <Image src={imageHandler(image)} w="100%" h="100%" objectFit="contain" />
                </AspectRatio>
                <Flex flexDirection="column" ml="3" flex="1">
                  <Text textStyle="h4" color="text-basic" noOfLines={2}>
                    {name}
                  </Text>
                  <Text mt="2" textStyle="c-sm" color="text-body" mr="1">
                    {shopCode}
                    <Text as="span" mx="3">
                      -
                    </Text>
                    <Text as="span" textStyle="c-sm" color="text-body">
                      {productCode}
                    </Text>
                  </Text>
                </Flex>
              </Flex>
            </TableCell>
            <TableCell className={tableClasses.tableCell} key="categoryName">
              <Text textStyle="h4" noOfLines={1}>
                {categoryName}
              </Text>
            </TableCell>
            <TableCell className={tableClasses.tableCell} key="price">
              <Text textStyle="h3" color="text-basic">
                {formatCurrency(price)}
              </Text>
            </TableCell>
            <TableCell className={tableClasses.tableCell} key="shopCode">
              <Text textStyle="h3" color="text-basic">
                {shopCode}
              </Text>
            </TableCell>
            <TableCell className={tableClasses.tableCell} key="createBy">
              <Text textStyle="h3" color="text-basic">
                {createBy}
              </Text>
            </TableCell>
            <TableCell className={tableClasses.tableCell} key={'publish'}>
              <Text textStyle="h3" color="text-basic">
                {dayjs(createAt).format('DD/MM/YYYY')}
              </Text>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    },
    [approveProducts, currentPage]
  );

  return (
    <Card>
      <CardHeader color="primary">
        <Text textStyle="h5" color="white">
          {t('sideBar.productApproval')}
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
                placeholder="Enter product code, name."
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
      {products && products.length > 0 && (
        <CardFooter>
          <div className={tableClasses.tableResponsive} style={{ marginTop: '0' }}>
            <Table className={tableClasses.table}>
              <TableHead className={tableClasses['primary' + 'TableHeader']}>
                <TableRow className={tableClasses.tableHeadRow}>
                  <TableCell className={tableClasses.tableCell + ' ' + tableClasses.tableHeadCell}>
                    <Checkbox
                      isChecked={approveProducts[currentPage - 1].isSelectAll}
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
                {products.map((item, index) => {
                  return renderProduct(item, index);
                })}
              </TableBody>
            </Table>
            <Flex justifyContent="space-between" pt="6" pr="6" pb="6">
              <Pagination count={totalPage} page={currentPage} onChange={handleSelectTab} />
              <Box>
                <Text>
                  {t('results_page', {
                    start: (currentPage - 1) * 50 + 1,
                    end: (currentPage - 1) * 50 + products.length,
                    total: totalRecords,
                  })}
                </Text>
              </Box>
            </Flex>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

ProductApproval.layout = Admin;

export default WithAuthentication(ProductApproval);
