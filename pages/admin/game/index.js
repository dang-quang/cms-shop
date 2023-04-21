import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
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
import styles from 'assets/jss/natcash/views/game/gameIndexStyle';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddUpdatePrize from './addUpdatePrize';
import { useDispatch } from 'react-redux';
import { setShowLoader } from '../../../redux/actions/app';
import {
  deleteGames,
  deletePrize,
  deleteShopQr,
  getListGames,
  getPrizesList,
} from '../../../utilities/ApiManage';
import Router from 'next/router';
import AddGame from './addGame';
import { formatNumber } from '../../../utilities/utils';
import imgGift from 'assets/img/gift.png';
import { BASE_API_URL } from 'utilities/const.js';

function Game() {
  const useShopStyles = makeStyles(shopStyle);
  const shopClasses = useShopStyles();
  const useStyles = makeStyles(styles);
  const [isShowModal, setIsShowModal] = useState(null);
  const useAdminStyles = makeStyles(adminStyles);
  const useTableStyles = makeStyles(tableStyles);
  const adminClasses = useAdminStyles();
  const classes = useStyles();
  const tableClasses = useTableStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const [showAction, setShowAction] = useState([]);
  const [doFilter, setDoFilter] = useState(0);
  const [doSearch, setDoSearch] = useState(false);
  const [filterDate, setFilterDate] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedPrize, setSelectedPrize] = React.useState(null);

  const TABLE_LUCKY_HEAD = [
    t('qrManagement.stt'),
    t('game.image'),
    t('name'),
    // t('game.prize'),
    t('quantity'),
    t('amount'),
    t('game.order'),
    // t('game.style'),
    t('action'),
  ];

  const MENU_TITLE_INFO = [
    {
      name: t('all'),
      value: null,
    },
    {
      name: t('qrManagement.notActive'),
      value: 0,
    },
    {
      name: t('qrManagement.active'),
      value: 1,
    },
  ];

  const [table, setTable] = useState({
    tableHead: [],
    tableBody: [],
  });

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [txtSearch, setTxtSearch] = useState('');
  const [fromDate, setFromDate] = useState(moment().subtract(30, 'days').format());
  const [toDate, setToDate] = useState(moment().format());
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTab, setSelectedTab] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [listGame, setListGame] = useState([]);
  const [isGameDialog, setIsGameDialog] = useState('');

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        setIsMobile(window.innerWidth < 1570);
      },
      false
    );
  }, []);

  useEffect(async () => {
    dispatch(setShowLoader(true));
    const status = selectedTitle.value;
    let from;
    let to;
    let key;
    if (doFilter) {
      from = moment(fromDate).format('YYYY-MM-DD');
      to = moment(toDate).format('YYYY-MM-DD');
    }
    if (txtSearch) {
      key = txtSearch;
    }
    const res = await getListGames(key, from, to, status);
    if (res.status === 0 && res?.list) {
      setListGame(res?.list);
      setSelectedTab(res?.list[0]);
      setSelectedId(res?.list[0].id);
    }
    dispatch(setShowLoader(false));
  }, [doSearch, doFilter, selectedTitle]);

  useEffect(async () => {
    dispatch(setShowLoader(true));
    // let params = {};
    // params.current_page = currentPage;
    if (selectedTab?.id) {
      const res = await getPrizesList(selectedTab.id);
      //console.log('getPrizesList', res.code === 'MSG_SUCCESS' && res.infoList !== null);
      if (res.code === 'MSG_SUCCESS') {
        // if (res.infoList.length > 0) {
        setTable({
          tableHead: res.infoList === null ? [] : TABLE_LUCKY_HEAD,
          tableBody: res.infoList === null ? [] : res.infoList.sort((a, b) => a.id - b.id),
        });

        // }
        // setCurrentPage(res.data.data_page.current_page);
        // setTotalPage(res.data.data_page.total_page);
      }
    } else {
      setTable({ tableHead: [], tableBody: [] });
    }

    dispatch(setShowLoader(false));
  }, [selectedTab]);

  const handleGetPrizesList = React.useCallback(async () => {
    dispatch(setShowLoader(true));
    if (selectedTab.id) {
      const res = await getPrizesList(selectedTab.id);
      if (res.code === 'MSG_SUCCESS') {
        setTable({
          tableHead: res.infoList === null ? [] : TABLE_LUCKY_HEAD,
          tableBody: res.infoList === null ? [] : res.infoList.sort((a, b) => a.id - b.id),
        });
      }
    } else {
      setTable({ tableHead: [], tableBody: [] });
    }
    dispatch(setShowLoader(false));
  }, [selectedTab]);

  const onDeleteGame = async () => {
    dispatch(setShowLoader(true));
    let res;
    if (isShowModal.type === 'game') {
      res = await deleteGames(isShowModal.id);
    } else {
      res = await deletePrize(isShowModal.id);
    }
    if (res.code === 'MSG_SUCCESS') {
      Router.push('/admin/game');
    } else {
      NotificationManager.error({
        title: t('error'),
        message: res.message ? res.message.text : 'Error',
      });
    }
    dispatch(setShowLoader(false));
  };
  const resetFilterDate = () => {
    setFromDate(moment().subtract(30, 'days').format());
    setToDate(moment().format());
    setFilterDate(false);
    setDoFilter(0);
  };
  const handleSelectPage = (event, value) => {
    setCurrentPage(value);
  };
  const handleTab = (item) => {
    setSelectedTab(item);
    setCurrentPage(1);
    setSelectedId(item.id);
  };
  const handleTitle = (item) => {
    setSelectedTitle(item);
    setCurrentPage(1);
    setSelectedId(item.id);
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
    setTxtSearch(event.target.value);
    setCurrentPage(1);
  };
  const renderGame = (item, index) => {
    const str = BASE_API_URL + '/assets/' + item.image;

    return (
      <TableRow key={index} className={tableClasses.tableBodyRow}>
        <TableCell className={tableClasses.tableCell} key={'id'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{item.id}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'image'}>
          <div className={classes.proInfoContainer}>
            <img src={item?.image ? str : imgGift} className={classes.gameImage} />
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'name'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{item?.name}</p>
          </div>
        </TableCell>
        {/* <TableCell className={tableClasses.tableCell} key={'prize'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{item.value}</p>
          </div>
        </TableCell> */}
        <TableCell className={tableClasses.tableCell} key={'quantity'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{item.quantity}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'amount'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{item.amount}</p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'order'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{item.levels}</p>
          </div>
        </TableCell>
        {/* <TableCell className={tableClasses.tableCell} key={'style'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{item.style}</p>
          </div>
        </TableCell> */}
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
                            setIsShowEdit(true);
                            setSelectedId(item.id);
                          }}>
                          {t('detail')}
                        </MenuItem> */}
                        <MenuItem
                          className={classes.dropdownItem}
                          onClick={() => {
                            setIsShowEdit(true);
                            setSelectedId(item.id);
                            setSelectedPrize(item);
                          }}>
                          {t('edit')}
                        </MenuItem>
                        <MenuItem
                          className={classes.dropdownItem}
                          onClick={() => {
                            setIsShowModal({ id: item.id, type: 'prize' });
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
        <h4 className={classes.cardTitleWhite}>{t('sideBar.game')}</h4>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        <div
          className={dashClasses.filterSelections + ' ' + classes.flex_center_between}
          style={{
            marginLeft: '25px',
            position: 'relative',
            display: 'block',
          }}>
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
              aria-owns={filterDate ? 'filter-date' : null}
              aria-haspopup="true"
              className={classes.filteTritle}
              onClick={() => setFilterDate(true)}>
              {moment(fromDate).format('DD/MM/yyyy') + ' - ' + moment(toDate).format('DD/MM/yyyy')}
            </Button>
            <Poppers
              open={Boolean(filterDate)}
              anchorEl={filterDate}
              transition
              disablePortal
              className={
                classNames({
                  [classes.popperClose]: filterDate != true,
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
                    <ClickAwayListener onClickAway={() => setFilterDate(false)}>
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
                                  value={fromDate}
                                  onChange={(value) => setFromDate(value)}
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
                                  value={toDate}
                                  onChange={(value) => setToDate(value)}
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
                                setDoFilter(doFilter + 1);
                                setFilterDate(false);
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
          <FormControl
            className={dashClasses.formControl}
            onClick={() => {
              setIsShowEdit(true);
              setSelectedId(selectedTab.id);
            }}
            style={{
              marginRight: '180px',
              position: isMobile ? 'static' : 'absolute',
              right: '0',
            }}>
            <Button id="update-label" color="green">
              {t('game.addNewPrize')}
            </Button>
          </FormControl>
          <FormControl
            className={dashClasses.formControl}
            style={{
              marginRight: '25px',
              position: isMobile ? 'static' : 'absolute',
              right: '0',
            }}>
            <Button id="update-label" color="primary" onClick={() => setShowUpdate(true)}>
              {t('action')}
              <Icon className={classes.btnFilter}>expand_more_outlined</Icon>
            </Button>
            <Poppers
              open={Boolean(showUpdate)}
              anchorEl={showUpdate}
              transition
              disablePortal
              className={
                classNames({ [classes.popperClose]: !showUpdate }) + ' ' + classes.popperNav
              }>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="notification-menu-list-grow"
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}>
                  <Paper>
                    <ClickAwayListener onClickAway={() => setShowUpdate(false)}>
                      <MenuList role="menu">
                        <MenuItem
                          className={classes.dropdownItem}
                          onClick={() => {
                            setIsGameDialog('addNewGame');
                          }}>
                          {t('game.addNewGame')}
                        </MenuItem>
                        <MenuItem
                          className={classes.dropdownItem}
                          onClick={() => {
                            setIsGameDialog('editGame');
                          }}>
                          {t('game.editGame')}
                        </MenuItem>
                        <MenuItem
                          className={classes.dropdownItem}
                          onClick={() => {
                            setIsShowModal({ id: selectedTab.id, type: 'game' });
                          }}>
                          {t('game.deleteGame')}
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Poppers>
          </FormControl>
        </div>
        <ModalCustom
          width={600}
          title={t('confirmation')}
          subTitle={''}
          // isShow={true}
          isShow={isShowModal}
          handleClose={() => setIsShowModal(null)}>
          <div className={classes.flex_center}>
            <FormControl variant="outlined" size="small" style={{ flex: 1 }}>
              <p style={{ flex: 1 }}>{t('deleteConfirm')}</p>
            </FormControl>
          </div>
          <div
            className={tableClasses.tableResponsive}
            style={{ marginTop: '0', flexDirection: 'row-reverse', display: 'flex' }}>
            <div className={classes.buttonContainer}>
              <Button color="primary" onClick={onDeleteGame}>
                {t('submit')}
              </Button>
            </div>
            <div className={classes.buttonContainer}>
              <Button color="gray" onClick={() => setIsShowModal(null)}>
                {t('cancel')}
              </Button>
            </div>
          </div>
        </ModalCustom>
      </CardBody>
      <CardFooter>
        <div className={classes.sideBarContainer}>
          <List className={classes.listContainer}>
            {listGame.map((item, index) => {
              return (
                <a className={classes.item} onClick={() => handleTab(item)}>
                  <ListItem
                    button
                    className={classNames(
                      classes.itemLink,
                      selectedTab?.code === item.code ? classes.white : ''
                    )}>
                    <ListItemText
                      primary={item.name}
                      className={classNames(
                        classes.itemText,
                        selectedTab?.code === item.code ? classes.whiteFont : ''
                      )}
                      disableTypography={true}
                    />
                  </ListItem>
                </a>
              );
            })}
          </List>
        </div>
        <div
          className={tableClasses.tableResponsive}
          style={{ marginTop: '0', marginLeft: '20px' }}>
          <Table className={tableClasses.table}>
            {data !== undefined ? (
              <TableHead className={tableClasses['primary' + 'TableHeader']}>
                <TableRow className={tableClasses.tableHeadRow}>
                  {table.tableHead.map((prop, key) => {
                    return (
                      <TableCell
                        className={tableClasses.tableCell + ' ' + tableClasses.tableHeadCell}
                        style={{
                          textAlign: 'left',
                        }}
                        key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
            ) : null}
            <TableBody>
              {table.tableBody.map((item, index) => {
                return renderGame(item, index);
              })}
            </TableBody>
          </Table>
          {table.tableBody.length > 0 ? (
            <div style={{ margin: '15px 0' }}>
              <Pagination count={totalPage} page={currentPage} onChange={handleSelectPage} />
            </div>
          ) : null}
        </div>
      </CardFooter>
      <ModalCustom
        width={1000}
        title={selectedPrize ? t('game.updatePrize') : t('game.addNewPrize')}
        subTitle={''}
        // isShow={true}
        isShow={isShowEdit}
        handleClose={() => {
          setIsShowEdit(false);
          setSelectedId(null);
          setSelectedPrize(null);
        }}>
        <AddUpdatePrize
          closeDialog={() => {
            setIsShowEdit(false);
            setSelectedId(null);
            setSelectedPrize(null);
          }}
          onUpdated={handleGetPrizesList}
          prize={selectedPrize}
          selectedTab={selectedTab}
          gameId={selectedId}
        />
      </ModalCustom>
      <ModalCustom
        width={1000}
        title={t(`game.${isGameDialog}`)}
        subTitle={''}
        // isShow={true}
        isShow={!_.isEmpty(isGameDialog)}
        handleClose={() => {
          setIsGameDialog('');
        }}>
        <AddGame
          closeDialog={() => {
            setIsGameDialog('');
          }}
          selectedTab={isGameDialog === 'editGame' ? selectedTab : undefined}
        />
      </ModalCustom>
    </Card>
  );
}

Game.layout = Admin;

export default WithAuthentication(Game);
