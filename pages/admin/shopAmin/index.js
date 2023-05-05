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
import Router from 'next/router';
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
  const [isMobile, setIsMobile] = React.useState(false);
  const [checked, setChecked] = React.useState([]);
  const [shops, setShops] = React.useState([]);
  const [selectedShop, setSelectedShop] = React.useState(null);

  const TABLE_HEAD = [
    t('qrManagement.stt'),
    'Shop code',
    'Shop name',
    'Address',
    'Phone',
    'Status',
    'Type',
    t('action'),
  ];

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        setIsMobile(window.innerWidth < 1570);
      },
      false
    );
  }, []);

  React.useEffect(() => {
    (async () => {
      dispatch(setShowLoader(true));
      let from;
      let to;
      let key;
      if (search) {
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
        NotificationManager.error({
          title: t('error'),
          message: `No search data exists`,
        });
      }
      dispatch(setShowLoader(false));
    })();
  }, [doSearch, filterDate, doFilter, currentPage]);

  const handleDeleteShop = React.useCallback(async () => {
    try {
      dispatch(setShowLoader(true));
      const res = await requestDeleteShop({ id: selectedShop.id });
      if (res.code === 'MSG_SUCCESS') {
        setSelectedShop(null);
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
        <TableCell className={tableClasses.tableCell} key={'shopInfo3'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{index}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'shopCode'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{shopCode}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'shopName'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{shopName}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'address'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{address}</p>
          </div>
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
                            Router.push({
                              pathname: '/admin/shop/addshop',
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
        <h4 className={classes.cardTitleWhite}>{t('sideBar.shopManagement')}</h4>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        <div className={dashClasses.filterSelections + ' ' + classes.flex_center_between}>
          <div>
            <FormControl className={dashClasses.formControl}>
              <div style={{ marginRight: '15px' }}>
                <CustomInput
                  formControlProps={{
                    className: adminClasses.margin + ' ' + classes.searchContainer,
                  }}
                  inputProps={{
                    placeholder: t('findBy'),
                    onChange: handleInputSearch,
                  }}
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
            <Link href={'/admin/shop/addshop'}>
              <Button id="update-label" color="green">
                CREATE NEW SHOP
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
