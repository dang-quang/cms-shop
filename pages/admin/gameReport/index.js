import React, { useEffect, useState } from 'react';
// react plugin for creating charts
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import Link from 'next/link';
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Admin from 'layouts/Admin.js';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import Button from 'components/CustomButtons/Button.js';
import moment from 'moment';
import tableStyles from 'assets/jss/natcash/components/tableStyle.js';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import useWindowSize from 'components/Hooks/useWindowSize.js';
import dashStyles from 'assets/jss/natcash/views/dashboardStyle.js';
import styles from 'assets/jss/natcash/views/dashboardStyle.js';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import vi from 'date-fns/locale/vi';
import { addShop, getGameResultReward, getOperationScreen } from '../../../utilities/ApiManage';
import adminStyles from 'assets/jss/natcash/components/headerLinksStyle.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';
import DateFnsUtils from '@date-io/date-fns';
import classNames from 'classnames';
import { primaryColor } from '../../../assets/jss/natcash';

// utilities
import { formatCurrency, formatNumber } from '../../../utilities/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';
import { ClickAwayListener, FormControl, Grow, Paper } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Poppers from '@material-ui/core/Popper';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { setShowLoader } from '../../../redux/actions/app';
import { Pagination } from '@material-ui/lab';

function GameReport() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const useStyles = makeStyles(styles);
  const useAdminStyles = makeStyles(adminStyles);
  const adminClasses = useAdminStyles();
  const classes = useStyles();
  const useTableStyles = makeStyles(tableStyles);
  const tableClasses = useTableStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const formatDate = 'YYYY-MM-DD';

  const FROM_DATE = moment().subtract(30, 'days').format(formatDate);
  const TO_DATE = moment().format(formatDate);

  const [search, setSearch] = React.useState('');
  const [doSearch, setDoSearch] = React.useState(false);
  const [showDate, setShowDate] = React.useState(false);
  const [doFilter, setDoFilter] = React.useState(0);
  const [filterDate, setFilterDate] = React.useState({
    fromDate: moment().subtract(30, 'days').format(formatDate),
    toDate: moment().format(formatDate),
  });

  const [gameRewards, setGameRewards] = React.useState([]);
  const [isMobile, setIsMobile] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        setIsMobile(window.innerWidth < 1570);
      },
      false
    );
  }, []);

  const handleInputSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const resetFilterDate = React.useCallback(() => {
    setFilterDate({ ...filterDate, fromDate: FROM_DATE });
    setFilterDate({ ...filterDate, toDate: TO_DATE });
    setShowDate(false);
    setDoFilter(0);
  }, [filterDate]);

  const GAME_REWARD_TABLE_HEAD = [
    t('gameReport.phoneNumber'),
    t('gameReport.fullName'),
    t('gameReport.prize'),
    t('gameReport.date'),
  ];

  React.useEffect(() => {
    (async () => {
      dispatch(setShowLoader(true));
      const res = await getGameResultReward({
        keyWord: '',
        fromDate: FROM_DATE,
        toDate: TO_DATE,
        page: 1,
      });

      dispatch(setShowLoader(false));
      if (res && res.code === 'MSG_SUCCESS') {
        setGameRewards(res.list === null ? [] : res.list.sort((a, b) => b.playDate - a.playDate));
        setTotalPage(3);
      }
    })();
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
      const res = await getGameResultReward({
        keyWord: key,
        fromDate: from,
        toDate: to,
        page: currentPage,
      });
      if (res.status === 0 && res?.list) {
        setGameRewards(res.list === null ? [] : res.list.sort((a, b) => b.playDate - a.playDate));
      }
      dispatch(setShowLoader(false));
    })();
  }, [doSearch, filterDate, doFilter, currentPage]);

  const handleSelectPage = (event, value) => {
    setCurrentPage(value);
  };

  const renderReward = (item, index) => {
    const { fullName, gameName, playDate, msisdn, name } = item;
    return (
      <React.Fragment key={index}>
        <TableRow className={tableClasses.tableBodyRow}>
          <TableCell className={tableClasses.tableCell} key="msisdn">
            {msisdn}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key="fullName">
            {fullName}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key="gameName">
            {gameName}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key="name">
            {name}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key="playDate">
            {moment(playDate).format('YYYY-MM-DD, hh:mm:ss')}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <Card>
      <NotificationContainer />
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Game Reward</h4>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
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
                  onClick={() => setShowDate(true)}>
                  {moment(filterDate.fromDate).format('DD/MM/yyyy') +
                    ' - ' +
                    moment(filterDate.toDate).format('DD/MM/yyyy')}
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
                                    setDoFilter(doFilter + 1);
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
            <div className={tableClasses.tableResponsive}>
              <Table className={tableClasses.table}>
                {!isEmpty(gameRewards) ? (
                  <TableHead className={tableClasses['primary' + 'TableHeader']}>
                    <TableRow className={tableClasses.tableHeadRow}>
                      {GAME_REWARD_TABLE_HEAD.map((prop, key) => {
                        return (
                          <TableCell
                            className={tableClasses.tableCell + ' ' + tableClasses.tableHeadCell}
                            key={'tableHeadRow' + key}>
                            {prop}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                ) : null}
                <TableBody>
                  {gameRewards.length > 0 &&
                    gameRewards.map((item, index) => {
                      return renderReward(item, index);
                    })}
                </TableBody>
              </Table>
              {gameRewards.length > 0 ? (
                <div style={{ margin: '15px 0' }}>
                  <Pagination count={totalPage} page={currentPage} onChange={handleSelectPage} />
                </div>
              ) : null}
            </div>
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
}

GameReport.layout = Admin;

export default WithAuthentication(GameReport);
