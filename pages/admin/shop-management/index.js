import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Link from 'next/link';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// layout for this page
import Admin from 'layouts/Admin.js';
// core components
import { Icon } from '@material-ui/core';
import Card from 'components/Card/Card.js';
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
import { requestsGetShopList, requestDeleteShop } from 'utilities/ApiManage';
import Pagination from '@material-ui/lab/Pagination';
import { setShowLoader } from 'redux/actions/app';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';
import { primaryColor } from 'assets/jss/natcash';
import { useTranslation } from 'react-i18next';
import Router, { useRouter } from 'next/router';
import { Box, Flex, GridItem, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { useMobile } from 'hooks';
function ShopListPage() {
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
  const formatDate = 'YYYY-MM-DD';
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
    t('serial_number'),
    'Shop code',
    'Shop name',
    'Address',
    'Phone',
    'Status',
    'Type',
    t('action'),
  ];

  React.useEffect(() => {
    (async () => {
      try {
        dispatch(setShowLoader(true));
        const res = await requestsGetShopList({ page: 1 });
        if (res.code === 'MSG_SUCCESS' && res.result && res.result.results) {
          setShops(res.result.results === null ? [] : res.result.results);
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
        let from;
        let to;
        let key;
        if (doSearch || doFilter) {
          dispatch(setShowLoader(true));
          if (doSearch) {
            key = search;
          }

          if (doFilter) {
            from = moment(filterDate.fromDate).format(formatDate);
            to = moment(filterDate.toDate).format(formatDate);
          }

          const res = await requestsGetShopList({
            keyWord: key,
            fromDate: from,
            toDate: to,
            page: currentPage,
          });

          if (res.code === 'MSG_SUCCESS' && res.result && res.result.results) {
            setShops(res.result.results === null ? [] : res.result.results);
            setTotalPage(res?.result.totalPages);
            setTotalRecords(res.result.totalRecords);
          } else {
            setShops([]);
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
        setDoFilter(false);
      }
    })();
  }, [doSearch, filterDate, doFilter, currentPage, search]);

  const handleDeleteShop = React.useCallback(async () => {
    try {
      dispatch(setShowLoader(true));
      const res = await requestDeleteShop({ id: selectedShop.id });
      if (res.code === 'MSG_SUCCESS') {
        setSelectedShop(null);
        router.push('/admin/shop-management');
      } else {
        NotificationManager.error({
          title: t('error'),
          message: res.message ? res.message.text : 'Error',
        });
      }
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
    const { address, phone, shopCode, shopName, shopType, status } = item;

    return (
      <TableRow
        key={index}
        className={tableClasses.tableBodyRow}
        style={{
          backgroundColor: checked.indexOf(item) !== -1 ? '#fff6f0' : '#fff',
        }}>
        <TableCell className={tableClasses.tableCell} key="serial_number">
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{index + 1}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'shopCode'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{shopCode}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'shopName'} style={{ width: '20%' }}>
          <Text textStyle="c-md" color="text-basic" noOfLines={1}>
            {shopName}
          </Text>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'address'} style={{ width: '20%' }}>
          <Text textStyle="c-md" color="text-basic" noOfLines={1}>
            {address}
          </Text>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'phone'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{phone}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'status'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>
              {status === 1 ? t('qrManagement.active') : t('qrManagement.notActive')}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'shopType'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{shopType}</p>
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
                <Icon className={shopClasses.btnFilter}>settings</Icon>
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
                            router.push({
                              pathname: '/admin/shop-management/details',
                              query: item,
                            });
                          }}>
                          {t('detail')}
                        </MenuItem>
                        <MenuItem
                          className={classes.dropdownItem}
                          onClick={() => {
                            router.push({
                              pathname: '/admin/shop-management/update',
                              query: item,
                            });
                          }}>
                          {t('edit')}
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
    <Card>
      <NotificationContainer />
      <CardHeader color="primary">
        <Text textStyle="h5" color="text-white">
          {t('sideBar.shopManagement')}
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
            <Flex mx={{ base: 'unset', sm: '2' }} flex="1" alignItems="center" maxW="400px">
              <Input
                variant="search"
                placeholder="Enter shop code, shop name, phone number"
                onChange={handleInputSearch}
                mr="2"
              />
              <Button
                color="white"
                aria-label="edit"
                justIcon
                round
                onClick={() => {
                  setDoSearch(!doSearch);
                }}>
                <Search />
              </Button>
            </Flex>
            <Box>
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
                        <Box>
                          <div style={{ padding: '7px 15px', borderRadius: '4px' }}>
                            <Text textStyle="h5" color="primary.100">
                              {t('chooseDate')}
                            </Text>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={vi}>
                              <SimpleGrid
                                gap={{ base: 'unset', md: '6' }}
                                columns={{ base: 1, md: 2 }}>
                                <KeyboardDatePicker
                                  disableToolbar
                                  variant="inline"
                                  format="dd/MM/yyyy"
                                  margin="normal"
                                  id="date-picker-inline"
                                  label={t('from')}
                                  maxDate={moment(filterDate.toDate).toDate()}
                                  value={filterDate.fromDate}
                                  onChange={(value) =>
                                    setFilterDate({ ...filterDate, fromDate: value })
                                  }
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                />
                                <KeyboardDatePicker
                                  disableToolbar
                                  variant="inline"
                                  format="dd/MM/yyyy"
                                  margin="normal"
                                  id="date-picker-inline"
                                  label={t('to')}
                                  minDate={moment(filterDate.fromDate).toDate()}
                                  maxDate={moment().toDate()}
                                  value={filterDate.toDate}
                                  onChange={(value) =>
                                    setFilterDate({ ...filterDate, toDate: value })
                                  }
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                />
                              </SimpleGrid>
                            </MuiPickersUtilsProvider>
                            <Flex alignItems="center" mt="4" justifyContent="flex-end">
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
                            </Flex>
                          </div>
                        </Box>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Poppers>
            </Box>
          </Flex>
          <Link href={'/admin/shop-management/add'}>
            <Button id="update-label" color="green">
              CREATE NEW SHOP
            </Button>
          </Link>
        </Flex>
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
              <Button color="primary" onClick={handleDeleteShop}>
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
            {shops && shops.length > 0 && (
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
              {shops &&
                shops.length > 0 &&
                shops.map((item, index) => {
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
  );
}

ShopListPage.layout = Admin;

export default WithAuthentication(ShopListPage);
