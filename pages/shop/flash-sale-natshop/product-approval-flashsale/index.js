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
import {
  AspectRatio,
  Box,
  Center,
  Checkbox,
  Flex,
  Image,
  Input,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { formatCurrency, formatNumber } from 'utilities/utils';
import { requestApproveProduct, requestGetListProductApprove } from 'utilities/ApiManage';
import { setShowLoader } from 'redux/actions/app';
import dayjs from 'dayjs';
import router from 'next/router';
import { RangeDatePickerItem } from 'components';
import { BASE_API_URL } from 'utilities/const';
import { setSelectedProducts } from 'redux/actions/product';
import _ from 'lodash';
import { EAppKey } from 'constants/types';
import { Formik, Form, Field, FieldArray } from 'formik';

function ProductApproval() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const useTableStyles = makeStyles(tableStyles);
  const classes = useStyles();
  const tableClasses = useTableStyles();
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();

  // const TABLE_HEAD = [
  //   t('serial_number'),
  //   t('name'),
  //   t('sideBar.category'),
  //   t('price'),
  //   t('code_shop'),
  //   t('created_by'),
  //   t('qrManagement.publishTime'),
  // ];
  const TABLE_HEAD = [
    'Tên sản phẩm',
    'Giá gốc',
    'Giá sau giảm',
    'Giảm giá',
    'Kho hàng',
    'Số lượng sản phẩm',
    'Giới hạn mua tối đa',
  ];
  const tabs = ['Chi tiết chương trình', 'Điều kiện tham gia'];

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
  const selectedProducts = useSelector((state) => state.product.selectedProducts);

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
          dispatch(setSelectedProducts(_initSelectedProducts));
          setProducts(res.result.results === null ? [] : res.result.results);
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
          const res = await requestGetListProductApprove({
            keyWord: refInput.current.value,
            page: currentPage,
          });

          if (res.code === EAppKey.MSG_SUCCESS && res.result && res.result.results) {
            // let _initSelectedProducts = [];
            // for (let i = 0; i < res?.result.totalPages; i++) {
            //   _initSelectedProducts.push({ isSelectAll: false, products: [] });
            // }
            //dispatch(setSelectedProducts(_initSelectedProducts));
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
            // dispatch(setSelectedProducts(_initSelectedProducts));
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
    if (selectedProducts[currentPage - 1].isSelectAll) {
      const updatedSelectedProducts = [...selectedProducts];
      updatedSelectedProducts[currentPage - 1] = {
        products: [],
        isSelectAll: false,
      };
      dispatch(setSelectedProducts(updatedSelectedProducts));
    } else {
      const updatedSelectedProducts = [...selectedProducts];
      updatedSelectedProducts[currentPage - 1] = {
        products: products,
        isSelectAll: true,
      };
      dispatch(setSelectedProducts(updatedSelectedProducts));
    }
  }, [selectedProducts, currentPage, products]);

  const handleSelect = React.useCallback(
    async (item) => {
      const updatedSelectedProducts = [...selectedProducts];
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

      dispatch(setSelectedProducts(updatedSelectedProducts));
    },
    [selectedProducts, currentPage]
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

        if (selectedProducts) {
          dispatch(setSelectedProducts(selectedProducts));
        } else {
          dispatch(setSelectedProducts(_initSelectedProducts));
        }

        setProducts(res.result.results === null ? [] : res.result.results);
        setTotalPage(res?.result.totalPages);
        setTotalRecords(res.result.totalRecords);
      }
    },
    [selectedProducts]
  );

  const renderProduct = React.useCallback(
    (item, index) => {
      const { categoryName, createAt, createBy, image, name, price, shopCode, productCode } = item;

      let _image = '';

      var firstChar = image.substring(0, 4);

      if (firstChar === 'http' || firstChar === 'https') {
        _image = image;
      } else {
        _image = BASE_API_URL + '/assets/' + image;
      }

      const isItemChecked = (() => {
        for (let i = 0; i < selectedProducts[currentPage - 1]?.products?.length; i++) {
          if (selectedProducts[currentPage - 1]?.products[i].id === item.id) {
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
            <TableCell className={tableClasses.tableCell} key="shopCode">
              <Flex alignItems="center">
                <AspectRatio
                  overflow="hidden"
                  w="80px"
                  ratio={1 / 1}
                  shadow="sm"
                  borderRadius="6px">
                  <Image src={_image} w="100%" h="100%" objectFit="contain" />
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
            <TableCell className={tableClasses.tableCell} key="shopCode">
              <Text textStyle="h3" color="text-basic">
                {formatCurrency(price ?? 0)}
              </Text>
            </TableCell>
            <TableCell className={tableClasses.tableCell} key="shopCode">
              <InputGroup style={{ width: 110 }}>
                <Input
                  placeholder="Input"
                  autoComplete="off"
                  // style={{ }}
                  value={0}
                  onChange={() => {}}
                />
                <InputRightElement w="30px" borderLeftWidth="1px">
                  <Center h="full">
                    <Text textStyle="h2">HTG</Text>
                  </Center>
                </InputRightElement>
              </InputGroup>
            </TableCell>
            <TableCell className={tableClasses.tableCell} key="shopCode">
              <InputGroup style={{ width: 110 }}>
                <Input placeholder="Input" autoComplete="off" value={0} onChange={() => {}} />
                <InputRightElement w="60px" borderLeftWidth="1px">
                  <Center h="full">
                    <Text textStyle="h2">% Giảm</Text>
                  </Center>
                </InputRightElement>
              </InputGroup>
            </TableCell>

            <TableCell className={tableClasses.tableCell} key="createBy">
              <Text textStyle="h3" color="text-basic">
                1000
              </Text>
            </TableCell>
            <TableCell className={tableClasses.tableCell} key={'publish'}>
              <Text textStyle="h3" color="text-basic">
                30
              </Text>
            </TableCell>
            <TableCell className={tableClasses.tableCell} key={'publish'}>
              <Text textStyle="h3" color="text-basic">
                5
              </Text>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    },
    [selectedProducts, currentPage]
  );

  return (
    <Card>
      <CardHeader color="primary">
        <Text textStyle="h5" color="white">
          {t('sideBar.productApproval')}
        </Text>
      </CardHeader>

      <CardBody className={classes.cardBody}>
        <Box>
          <Text textStyle="h5" color="text-basic" marginBottom={'10px'}>
            [NGÀNH HÀNG THỜI TRANG] - [SIÊU SALE HÀNG HIỆU] - [00:00 09/09/2022 - 23:59 09/09/2022]
          </Text>
        </Box>
        <Box
          w={'70%'}
          borderWidth="0.3px"
          overflow="hidden"
          borderColor="#B4B4B4"
          justifyContent={'center'}
          alignItems={'center'}>
          <Flex m={'2px'} justifyContent={'space-between'}>
            <AspectRatio w="210px" ratio={2 / 1} mr="2" borderRadius="8px" overflow="hidden">
              <Image
                w="100%"
                h="100%"
                objectFit="cover"
                src={'https://cf.shopee.vn/file/sg-11134004-7qvg9-lh7djcs0g92vb7'}
              />
            </AspectRatio>
            <Box>
              <Flex
                h="100%"
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}>
                <Text textStyle="h5" color="text-basic">
                  Thời gian đăng ký
                </Text>
                <Text textStyle="h2" color="text-basic">
                  00:00 16-08-2022 - 13:30 05-09-2022
                </Text>
                <Text textStyle="h2" color="text-basic">
                  Hiện tại bạn có thể đăng ký 7 Khung giờ
                </Text>
              </Flex>
            </Box>
            <Box marginRight={'20px'}>
              <Flex
                h="100%"
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}>
                <Text textStyle="h5" color="text-basic">
                  Thời gian diễn ra
                </Text>
                <Text textStyle="h2" color="text-basic">
                  00:00 09-09-2022 - 23:59 09-09-2022
                </Text>
                <Text textStyle="h2" color="text-basic">
                  0 Khung giờ bạn đã đăng ký đang diễn ra
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Tabs variant="soft-rounded" mt="8">
          <Flex justifyContent="space-between">
            <TabList w="auto" mb="16px" borderRadius="full" bg="white" p="1">
              {tabs.map((name, index) => (
                <Tab
                  key={index}
                  borderRadius="3px"
                  textStyle="b-lg"
                  fontWeight="500"
                  textTransform="capitalize"
                  _focus={{ border: 'none' }}
                  _selected={{
                    bg: 'primary.100',
                    color: 'white',
                  }}
                  color="text-body">
                  {name}
                </Tab>
              ))}
            </TabList>
          </Flex>
          <TabPanels>
            <TabPanel p="0">
              <Box w={'50%'}>
                <Text>
                  [NGÀNH HÀNG THỜI TRANG] - [SIÊU SALE HÀNG HIỆU] - [00:00 09/09/2022 - 23:59
                  09/09/2022] - GIÁ TRÊN 199K Đây là chương trình diễn ra vào ngày 09.09 dành riêng
                  cho Ngành hàng Thời Trang Hỗ trợ Người bán tăng doanh số và thu hút thêm khách
                  hàng mới. Shopee không trợ giá. Freeship từ 0Đ toàn sàn + Thời gian đăng kí:
                  [00:00 - 16/08/2022] đến [13:30 - 05/09/2022] + Thời gian xét duyệt: [13:31 -
                  05/09/2022] đến [16:00 - 05/09/2022] thêm
                </Text>
              </Box>
            </TabPanel>
            <TabPanel p="0">
              <Box w={'50%'}>
                <Text>
                  Điều kiện của shop Không giới hạn Điều kiện Mã giảm giá Số mã có thể sử dụng : 30
                  ~ 100 Giá trị đơn hàng tối thiểu : ₫0 ~ ₫0 Thời gian bắt đầu lưu Mã giảm giá : Sớm
                  hơn hoặc đúng 2023/06/01 00:00:00 Thời gian kết thúc lưu Mã giảm giá : Muộn hơn
                  hoặc đúng 2023/06/06 23:59:59 Loại Mã giảm giá : Mã giảm giá toàn Shop Thiết lập
                  hiển thị mã giảm giá : Hiển thị nhiều nơi Loại Mã giảm giá Giảm theo phần trăm
                  Phần trăm giảm : 10%GIẢM ~ 10%GIẢM Giảm tối đa : ₫10.000 ~ ₫100.000 Hoàn xu Phần
                  trăm giảm : 10% ~ 10% Giảm tối đa : ₫10.000 ~ ₫100.000
                </Text>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>

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
            <Formik
              initialValues={products}
              onSubmit={(values) => {
                console.log('onSubmit', values);
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                }, 500);
              }}
              render={({ values }) => (
                <Form>
                  <FieldArray
                    // name="friends"
                    render={(arrayHelpers) => (
                      <div className={tableClasses.tableResponsive} style={{ marginTop: '0' }}>
                        <Table className={tableClasses.table}>
                          <TableHead className={tableClasses['primary' + 'TableHeader']}>
                            <TableRow className={tableClasses.tableHeadRow}>
                              <TableCell
                                className={
                                  tableClasses.tableCell + ' ' + tableClasses.tableHeadCell
                                }>
                                <Checkbox
                                  isChecked={selectedProducts[currentPage - 1].isSelectAll}
                                  tabIndex={-1}
                                  onChange={() => handleCheckAll()}
                                  ml="2"
                                />
                              </TableCell>
                              {TABLE_HEAD.map((prop, key) => {
                                return (
                                  <TableCell
                                    style={{ width: key === 5 || key === 6 ? '7%' : null }}
                                    className={
                                      tableClasses.tableCell + ' ' + tableClasses.tableHeadCell
                                    }
                                    key={key}>
                                    <Text textStyle="h3">{prop}</Text>
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          </TableHead>
                          {values.map((friend, index) => {
                            if (index < 2) {
                              return <TableBody>{renderProduct(friend, index)};</TableBody>;
                            }
                          })}
                        </Table>
                        <div>
                          <button type="submit">Submit</button>
                        </div>
                      </div>
                    )}
                  />
                </Form>
              )}
            />
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
      <NotificationContainer />
    </Card>
  );
}

ProductApproval.layout = Admin;

// export default ProductApproval;
export default WithAuthentication(ProductApproval);
