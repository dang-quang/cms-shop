import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Link from 'next/link';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// layout for this page
import Admin from 'layouts/Admin';
// core components
import { Box } from '@material-ui/core';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import CustomInput from 'components/CustomInput/CustomInput.js';
import shopStyle from 'assets/jss/natcash/views/shoplist/shoplistStyle.js';
import ModalCustom from 'components/ModalCustom/ModalCustom.js';
import Search from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import GridContainer from 'components/Grid/GridContainer.js';
import adminStyles from 'assets/jss/natcash/components/headerLinksStyle.js';
import tableStyles from 'assets/jss/natcash/components/tableStyle.js';
import dashStyles from 'assets/jss/natcash/views/dashboardStyle.js';
import styles from 'assets/jss/natcash/views/qrshop/qrshopIndexStyle';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import vi from 'date-fns/locale/vi';
import Poppers from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import classNames from 'classnames';
import Pagination from '@material-ui/lab/Pagination';
import { setShowLoader } from 'redux/actions/app';
import { NotificationContainer } from 'react-light-notifications';
import { primaryColor } from 'assets/jss/natcash';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useMobile } from 'hooks';
import { Flex, Icon, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { IconOrder } from 'components/Icons/Icons';
import { IoMdSettings } from 'react-icons/io';

const data_product = [
  {
    id: '1',
    number_order: 299045978638333,
    status: 'Đã nhận',
    name_user: 'Nguyễn Văn A',
    address: 'Hồ Chí Minh',
    total: 123000,
    create_at: '2022-08-12',
  },
  {
    id: '2',
    number_order: 299045978638333,
    status: 'Đã hủy',
    name_user: 'Nguyễn Thị C',
    address: 'Hà Nội',
    total: 123000,
    create_at: '2022-08-12',
  },
  {
    id: '3',
    number_order: 299045978638333,
    status: 'Thành công',
    name_user: 'Giang dinh li',
    address: 'Hồ Chí Minh',
    total: 123000,
    create_at: '2022-08-12',
  },
];

const OrderManagement = () => {
  const formatDate = 'YYYY-MM-DD';
  const useShopStyles = makeStyles(shopStyle);
  const shopClasses = useShopStyles();
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const { t } = useTranslation();
  const useAdminStyles = makeStyles(adminStyles);
  const useTableStyles = makeStyles(tableStyles);
  const adminClasses = useAdminStyles();
  const classes = useStyles();
  const tableClasses = useTableStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const router = useRouter();

  const FROM_DATE = moment().subtract(30, 'days').format(formatDate);
  const TO_DATE = moment().format(formatDate);

  const [showDate, setShowDate] = React.useState(false);
  const [filterDate, setFilterDate] = React.useState({ fromDate: FROM_DATE, toDate: TO_DATE });
  const [showAction, setShowAction] = React.useState([]);
  const [doFilter, setDoFilter] = React.useState(false);
  const [doSearch, setDoSearch] = React.useState(false);
  const [isShowModal, setIsShowModal] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [search, setSearch] = React.useState('');
  const { isMobile } = useMobile();
  const [checked, setChecked] = React.useState([]);
  const [shops, setShops] = React.useState([]);
  const [selectedShop, setSelectedShop] = React.useState(null);

  const TABLE_HEAD = [
    //t('qrManagement.stt'),
    'Number Order',
    'Status',
    'User Name',
    'Address',
    'Total',
    'Create At',
    t('action'),
  ];

  const overview_order = React.useMemo(
    () => [
      {
        title: 'All Orders',
        number_order: 1018,
      },
      {
        title: 'Successful Orders',
        number_order: 1018,
      },
      {
        title: 'Canceled Orders',
        number_order: 1018,
      },
    ],
    []
  );

  React.useEffect(() => {
    (async () => {
      //       dispatch(setShowLoader(true));
      //       let from;
      //       let to;
      //       let key;
      //       if (search) {
      //         key = search;
      //       }
      //       if (doFilter) {
      //         from = moment(filterDate.fromDate).format(formatDate);
      //         to = moment(filterDate.toDate).format(formatDate);
      //       }
      //       const res = await requestsGetShopList({
      //         keyWord: key,
      //         fromDate: from,
      //         toDate: to,
      //         page: currentPage,
      //       });
      //       if (res.code === 'MSG_SUCCESS' && res.result && res.result.results) {
      //         setShops(res.result.results === null ? [] : res.result.results);
      //         setTotalPage(res?.result.totalPages);
      //         setTotalRecords(res.result.totalRecords);
      //       } else {
      //         NotificationManager.error({
      //           title: t('error'),
      //           message: `No search data exists`,
      //         });
      //       }
      //       dispatch(setShowLoader(false));
    })();
  }, [doSearch, filterDate, doFilter, currentPage]);

  const handleDeleteProduct = React.useCallback(async () => {
    try {
      //       dispatch(setShowLoader(true));
      //       const res = await requestDeleteShop({ id: selectedShop.id });
      //       if (res.code === 'MSG_SUCCESS') {
      //         setSelectedShop(null);
      //       } else {
      //         NotificationManager.error({
      //           title: t('error'),
      //           message: res.message ? res.message.text : 'Error',
      //         });
      //       }
    } finally {
      setIsShowModal(false);
      dispatch(setShowLoader(false));
    }
  }, [selectedShop]);

  const resetFilterDate = React.useCallback(() => {
    setFilterDate({ fromDate: FROM_DATE, toDate: TO_DATE });
    setShowDate(false);
    setDoFilter(false);
  }, [filterDate]);

  const handleSelectPage = (event, value) => {
    setCurrentPage(value);
  };

  const handleAction = (item) => {
    const currentIndex = showAction.indexOf(item);
    const newAction = [...showAction];
    if (currentIndex === -1) {
      newAction.push(item);
    } else {
      newAction.splice(currentIndex, 1);
    }
    setShowAction(newAction);
  };
  const handleInputSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };
  const renderShop = (item, index) => {
    const { number_order, status, name_user, address, total, create_at } = item;

    return (
      <TableRow
        key={index}
        className={tableClasses.tableBodyRow}
        style={{
          backgroundColor: checked.indexOf(item) !== -1 ? '#fff6f0' : '#fff',
        }}>
        {/* <TableCell className={tableClasses.tableCell} key="id">
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{id}</p>
          </div>
        </TableCell> */}
        <TableCell className={tableClasses.tableCell} key="order_number">
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{number_order}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key="industry">
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{status}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key="trademark">
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{name_user}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key="origin">
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{address}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key="status">
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{total}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key="create_at">
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{create_at}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          <div className={classes.text + ' ' + classes.infoTextStatus + ' ' + classes.flex_center}>
            <a
              target="_blank"
              className={
                tableClasses.tableCell + ' ' + classes.txtOrderCode + ' ' + classes.cursor
              }>
              <Button
                id={'action-label' + item?.id}
                aria-owns={showAction.indexOf(item) !== -1 ? 'action-list-grow' + item?.id : null}
                aria-haspopup="true"
                color="white"
                size="sm"
                onClick={() => handleAction(item)}>
                <Icon as={IoMdSettings} w="24px" h="24px" color="text-body" />
              </Button>
            </a>
            <Poppers
              open={Boolean(showAction.indexOf(item) !== -1)}
              anchorEl={showAction.indexOf(item) !== -1}
              transition
              disablePortal
              className={
                classNames({
                  [shopClasses.popperClose]: !showAction.indexOf(item) !== -1,
                }) +
                ' ' +
                classes.actionPopperNav
              }>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id={'action-list-grow' + item?.order_sn}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}>
                  <Paper>
                    <ClickAwayListener onClickAway={() => handleAction(item)}>
                      <MenuList role="menu">
                        <MenuItem
                          className={classes.dropdownItem}
                          onClick={() => {
                            router.push({ pathname: '/shop/order-management/order-information' });
                          }}>
                          {t('detail')}
                        </MenuItem>
                        <MenuItem
                          className={classes.dropdownItem}
                          onClick={() => {
                            setSelectedShop(item);
                            setIsShowModal(true);
                          }}>
                          {t('delete')}
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Poppers>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Box>
      <NotificationContainer />
      <Flex alignItems="center">
        <Icon as={IconOrder} w="34px" h="40px" color="text-basic" />
        <Text ml="5" textStyle="h7" color="text-basic">
          {t('sideBar.order_management')}
        </Text>
      </Flex>
      <SimpleGrid
        mt="8"
        mb="10"
        columns={{ base: 1, sm: 2, lg: 3 }}
        maxW={{ base: '100%', xl: '50%' }}
        gap={{ base: '4', sm: '6', xl: '10' }}>
        {overview_order.map((item, index) => {
          const { title, number_order } = item;

          return (
            <Flex
              bg="bg-2"
              key={index}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              shadow="md"
              p="6">
              <Text textStyle="h3" textTransform="uppercase" color="text-body">
                {title}
              </Text>
              <Text textStyle="h3" color="text-body">
                {number_order} orders
              </Text>
            </Flex>
          );
        })}
      </SimpleGrid>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Orders</h4>
        </CardHeader>
        <CardBody className={classes.cardBody}>
          <div className={dashClasses.filterSelections + ' ' + classes.flex_center_between}>
            <div>
              <FormControl className={dashClasses.formControl}>
                <div style={{ marginRight: '15px' }}>
                  <Input
                    value={search}
                    variant="search"
                    onChange={handleInputSearch}
                    placeholder={t('findBy')}
                    width="190px"
                    mr="6"
                  />
                  <Button
                    color="white"
                    aria-label="edit"
                    justIcon
                    round
                    onClick={() => setDoSearch(!doSearch)}>
                    <Search />
                  </Button>
                </div>
              </FormControl>
              <FormControl className={dashClasses.formControl} style={{ marginRight: '25px' }}>
                <Button
                  color="white"
                  id={'filter-date-label'}
                  aria-owns={showDate ? 'filter-date' : null}
                  aria-haspopup="true"
                  className={classes.filteTritle}
                  onClick={() => setShowDate(true)}>
                  {moment(filterDate.fromDate).format(formatDate) +
                    ' - ' +
                    moment(filterDate.toDate).format(formatDate)}
                </Button>
                <Poppers
                  open={Boolean(showDate)}
                  anchorEl={showDate}
                  transition
                  disablePortal
                  className={
                    classNames({
                      [classes.popperClose]: showDate != true,
                    }) +
                    ' ' +
                    classes.datePopperNav
                  }>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id={'filter-date'}
                      style={{
                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                      }}>
                      <Paper>
                        <ClickAwayListener onClickAway={() => setShowDate(false)}>
                          <div style={{ width: isMobile ? '190px' : '460px' }}>
                            <div style={{ padding: '7px 15px', borderRadius: '4px' }}>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: '17px',
                                  fontWeight: '400',
                                  color: primaryColor[0],
                                }}>
                                {t('chooseDate')}
                              </p>
                              <div style={{ marginTop: '10px' }}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={vi}>
                                  <GridContainer>
                                    <KeyboardDatePicker
                                      disableToolbar
                                      variant="inline"
                                      format="dd/MM/yyyy"
                                      margin="normal"
                                      id="date-picker-inline"
                                      label={t('from')}
                                      value={filterDate.fromDate}
                                      onChange={(value) =>
                                        setFilterDate({ ...filterDate, fromDate: value })
                                      }
                                      KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                      }}
                                      style={{ margin: '0 40px', width: '150px' }}
                                    />
                                    <KeyboardDatePicker
                                      disableToolbar
                                      variant="inline"
                                      format="dd/MM/yyyy"
                                      margin="normal"
                                      id="date-picker-inline"
                                      label={t('to')}
                                      value={filterDate.toDate}
                                      onChange={(value) =>
                                        setFilterDate({ ...filterDate, toDate: value })
                                      }
                                      KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                      }}
                                      style={{ margin: '0 40px', width: '150px' }}
                                    />
                                  </GridContainer>
                                </MuiPickersUtilsProvider>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  marginTop: '15px',
                                  justifyContent: 'flex-end',
                                }}>
                                <Button
                                  color="white"
                                  size="sm"
                                  style={{ marginRight: '10px' }}
                                  onClick={() => resetFilterDate()}>
                                  {t('reset')}
                                </Button>
                                <Button
                                  color="primary"
                                  size="sm"
                                  onClick={() => {
                                    setDoFilter(true);
                                    setShowDate(false);
                                  }}>
                                  {t('apply')}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Poppers>
              </FormControl>
            </div>
          </div>
          <ModalCustom
            width={600}
            title={t('confirmation')}
            subTitle={''}
            isShow={isShowModal}
            handleClose={() => setIsShowModal(false)}>
            <div className={classes.flex_center}>
              <FormControl variant="outlined" size="small" style={{ flex: 1 }}>
                <p style={{ flex: 1 }}>{t('deleteConfirm')}</p>
              </FormControl>
            </div>
            <div
              className={tableClasses.tableResponsive}
              style={{ marginTop: '0', flexDirection: 'row-reverse', display: 'flex' }}>
              <div className={classes.buttonContainer}>
                <Button color="primary" onClick={handleDeleteProduct}>
                  {t('submit')}
                </Button>
              </div>
              <div className={classes.buttonContainer}>
                <Button color="gray" onClick={() => setIsShowModal(false)}>
                  {t('cancel')}
                </Button>
              </div>
            </div>
          </ModalCustom>
        </CardBody>
        <CardFooter>
          <div
            className={tableClasses.tableResponsive}
            style={{ marginTop: '0', marginLeft: '20px' }}>
            <Table className={tableClasses.table}>
              {data_product && data_product.length > 0 && (
                <TableHead className={tableClasses['primary' + 'TableHeader']}>
                  <TableRow className={tableClasses.tableHeadRow}>
                    {TABLE_HEAD.map((prop, key) => {
                      return (
                        <TableCell
                          className={tableClasses.tableCell + ' ' + tableClasses.tableHeadCell}
                          style={{ textAlign: 'left' }}
                          key={key}>
                          {prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                {data_product &&
                  data_product.length > 0 &&
                  data_product.map((item, index) => {
                    return renderShop(item, index);
                  })}
              </TableBody>
            </Table>
            <div style={{ margin: '15px 0' }}>
              <Pagination count={totalPage} page={currentPage} onChange={handleSelectPage} />
            </div>
          </div>
        </CardFooter>
      </Card>
    </Box>
  );
};

OrderManagement.layout = Admin;

export default WithAuthentication(OrderManagement);
