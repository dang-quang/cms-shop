import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Link from 'next/link';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// layout for this page
import Admin from 'layouts/Admin';
// core components
import { Icon } from '@material-ui/core';
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
import { Input } from '@chakra-ui/react';

const data_product = [
  {
    id: '1',
    name: 'Sữa Meiji số 0/9 - 800g',
    industry: 'Thực Phẩm chức năng',
    trademark: 'Fami',
    origin: 'Việt Nam',
    status: 1,
    create_at: '2022-08-12',
  },
  {
    id: '2',
    name: 'Sữa Meiji số 0/9 - 800g',
    industry: 'Thực Phẩm chức năng',
    trademark: 'Vinamilk',
    origin: 'Mỹ',
    status: 1,
    create_at: '2022-08-12',
  },
  {
    id: '3',
    name: 'Sữa Meiji số 0/9 - 800g',
    industry: 'Thực Phẩm chức năng',
    trademark: 'Fami',
    origin: 'Nhật bản',
    status: 1,
    create_at: '2022-08-12',
  },
];

const ShopUserProduct = () => {
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
    t('shopUser.product_id'),
    t('shopUser.name'),
    t('shopUser.industry'),
    t('shopUser.trademark'),
    t('shopUser.origin'),
    t('shopUser.status'),
    t('shopUser.publish_time'),
    t('shopUser.action'),
  ];

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
    const { id, name, industry, trademark, origin, status, create_at } = item;

    return (
      <TableRow
        key={index}
        className={tableClasses.tableBodyRow}
        style={{
          backgroundColor: checked.indexOf(item) !== -1 ? '#fff6f0' : '#fff',
        }}>
        <TableCell className={tableClasses.tableCell} key="id">
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{id}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key="name">
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{name}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key="industry">
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{industry}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key="trademark">
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{trademark}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key="origin">
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{origin}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key="status">
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>
              {status === 1 ? t('active') : t('inactive')}
            </p>
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
                        {/* <MenuItem
                          className={classes.dropdownItem}
                          onClick={() => {
                            Router.push({
                              pathname: '/admin/shop/addshop',
                              query: item,
                            });
                          }}>
                          {t('detail')}
                        </MenuItem> */}
                        <MenuItem
                          className={classes.dropdownItem}
                          onClick={() => {
                            router.push({
                              pathname: '/shop/product/update',
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
        <h4 className={classes.cardTitleWhite}>{t('shopUser.product')}</h4>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        <div className={dashClasses.filterSelections + ' ' + classes.flex_center_between}>
          <div>
            <FormControl className={dashClasses.formControl}>
              <div style={{ marginRight: '15px' }}>
                <Input
                  variant="search"
                  placeholder={t('findBy')}
                  onChange={handleInputSearch}
                  maxW="180px"
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
          <FormControl
            className={dashClasses.formControl}
            style={{
              marginRight: '25px',
              position: isMobile ? 'static' : 'absolute',
              right: '0',
            }}>
            <Link href={'/shop/product/create'}>
              <Button id="update-label" color="green">
                {t('shopUser.create_product')}
              </Button>
            </Link>
          </FormControl>
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
  );
};

ShopUserProduct.layout = Admin;

export default WithAuthentication(ShopUserProduct);