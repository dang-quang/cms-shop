import React, { useEffect, useState } from 'react';
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
import styles from 'assets/jss/natcash/views/category/categoryIndexStyle';
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
import { NotificationContainer, NotificationManager } from 'react-light-notifications';
import { primaryColor } from '../../../assets/jss/natcash';
import { useTranslation } from 'react-i18next';
import Router from 'next/router';
import { requestsGetCategoryList, requestDeleteCategory } from '../../../utilities/ApiManage';
import { useDispatch } from 'react-redux';
import { setShowLoader } from '../../../redux/actions/app';
import { BASE_API_URL } from '../../../utilities/const';
import imgGift from 'assets/img/gift.png';
import { Box, Flex, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { useMobile } from 'hooks';

function ProductCategory() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const useShopStyles = makeStyles(shopStyle);
  const shopClasses = useShopStyles();
  const useStyles = makeStyles(styles);
  const [isShowModal, setIsShowModal] = useState(false);
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

  const [categories, setCategories] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [search, setSearch] = React.useState('');
  const { isMobile } = useMobile();
  const [showDate, setShowDate] = React.useState(false);
  const [filterDate, setFilterDate] = React.useState({ fromDate: FROM_DATE, toDate: TO_DATE });
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [showAction, setShowAction] = useState([]);
  const [doFilter, setDoFilter] = useState(false);
  const [doSearch, setDoSearch] = useState(false);

  const TABLE_HEAD = [
    t('qrManagement.stt'),
    t('image'),
    t('category.code'),
    t('name'),
    t('category.parent'),
    t('status'),
    t('category.applyPromotion'),
    t('qrManagement.publishTime'),
    t('action'),
  ];

  React.useEffect(() => {
    (async () => {
      try {
        dispatch(setShowLoader(true));
        const res = await requestsGetCategoryList({ page: 1 });
        if (res.code === 'MSG_SUCCESS' && res.result && res.result.results) {
          setCategories(res.result.results === null ? [] : res.result.results);
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

          const res = await requestsGetCategoryList({
            keyWord: key,
            fromDate: from,
            toDate: to,
            page: currentPage,
          });

          if (res.code === 'MSG_SUCCESS' && res.result && res.result.results) {
            setCategories(res.result.results === null ? [] : res.result.results);
            setTotalPage(res?.result.totalPages);
            setTotalRecords(res.result.totalRecords);
          } else {
            setCategories([]);
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

  const resetFilterDate = React.useCallback(() => {
    setFilterDate({ fromDate: FROM_DATE, toDate: TO_DATE });
    setShowDate(false);
    setDoFilter(false);
  }, [filterDate]);

  const handleSelectPage = React.useCallback((event, value) => {
    setCurrentPage(value);
  }, []);

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

  const handleDeleteCategory = React.useCallback(async () => {
    try {
      setIsShowModal(false);
      dispatch(setShowLoader(true));
      const res = await requestDeleteCategory(selectedCategory.id);
      if (res.code === 'MSG_SUCCESS') {
        setSelectedCategory(null);
        Router.push('/admin/category');
      } else {
        NotificationManager.error({
          title: t('error'),
          message: res.message ? res.message.text : 'Error',
        });
      }
    } catch (error) {
      console.log('delete category error');
    } finally {
      dispatch(setShowLoader(false));
    }
  }, [selectedCategory]);

  const renderCategory = (item, index) => {
    const { code, publishDate, id, image, name, parentId, promotion, status } = item;

    const str = BASE_API_URL + '/assets/' + image;

    return (
      <TableRow key={index} className={tableClasses.tableBodyRow}>
        <TableCell className={tableClasses.tableCell} key={'id'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{id}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'image'}>
          <img
            src={image ? str : imgGift}
            style={{ width: 80, height: 80, objectFit: 'contain' }}
          />
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'code'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{code}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'name'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{name}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'parentId'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>
              {parentId ? parentId : t('notSet')}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'status'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>
              {status === 1 ? t('qrManagement.active') : t('qrManagement.notActive')}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'promotion'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>
              {promotion ? t('yes') : t('no')}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'publishDate'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>
              {moment(publishDate).format('DD/MM/YYYY')}
            </p>
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
                id={'action-label' + id}
                aria-owns={showAction.indexOf(item) !== -1 ? 'action-list-grow' + id : null}
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
                  id={'action-list-grow' + id}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}>
                  <Paper>
                    <ClickAwayListener onClickAway={() => handleAction(item)}>
                      <MenuList role="menu">
                        <MenuItem
                          className={classes.dropdownItem}
                          onClick={() => {
                            Router.push({
                              pathname: '/admin/category/update',
                              query: item,
                            });
                          }}>
                          {t('edit')}
                        </MenuItem>
                        <MenuItem
                          className={classes.dropdownItem}
                          onClick={() => {
                            setSelectedCategory(item);
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
          {t('sideBar.category')}
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
                placeholder="Enter category code, name"
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
                {moment(filterDate.fromDate).format('DD/MM/YYYY') +
                  ' - ' +
                  moment(filterDate.toDate).format('DD/MM/YYYY')}
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
          <Link href={'/admin/category/add'}>
            <Button id="update-label" color="green">
              CREATE CATEGORY
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
              <Button color="primary" onClick={handleDeleteCategory}>
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
            {categories.length > 0 && (
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
              {categories.map((item, index) => {
                return renderCategory(item, index);
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

ProductCategory.layout = Admin;

export default WithAuthentication(ProductCategory);
