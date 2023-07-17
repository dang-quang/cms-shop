import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Link from 'next/link';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
// @material-ui/core components
import {} from '@material-ui/core/styles';
import {
  primaryColor,
  whiteColor,
  blackColor,
  hexToRgb,
  successColor,
  infoColor,
  orangeColor,
  grayColor,
} from 'assets/jss/natcash.js';
// layout for this page
import Admin from 'layouts/Admin.js';
// core components
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import GridItem from 'components/Grid/GridItem.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import {
  Modal,
  Tab,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tooltip,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  makeStyles,
  withStyles,
  useTheme,
  Typography,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Poppers from '@material-ui/core/Popper';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import GridContainer from 'components/Grid/GridContainer.js';
import TextField from '@material-ui/core/TextField';
import adminStyles from 'assets/jss/natcash/components/headerLinksStyle.js';
import tableStyles from 'assets/jss/natcash/components/tableStyle.js';
import taskStyles from 'assets/jss/natcash/components/tasksStyle.js';
import shopStyle from 'assets/jss/natcash/views/shoplist/shoplistStyle.js';
import { Icon } from '@material-ui/core';
import dashStyles from 'assets/jss/natcash/views/dashboardStyle.js';
import vi from 'date-fns/locale/vi';
import classNames from 'classnames';
import useWindowSize from 'components/Hooks/useWindowSize.js';
import CartTotalInfo from 'components/CartTotalInfo/CartTotalInfo.js';
import PropTypes from 'prop-types';
import Switch from 'components/CustomSwitch/Switch.js';
import { formatCurrency, formatNumber } from '../../../utilities/utils';

import { useRouter } from 'next/router';
import styles from 'assets/jss/natcash/views/flashsale/flashsaleStyle.js';

import imgMoney from 'assets/img/money.png';
import imgPercent from 'assets/img/percent.png';

function FlashSalePage() {
  const router = useRouter();
  const { shop_id, code } = router.query;
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useShopStyles = makeStyles(shopStyle);
  const shopClasses = useShopStyles();
  const useAdminStyles = makeStyles(adminStyles);
  const useTableStyles = makeStyles(tableStyles);
  const adminClasses = useAdminStyles();
  const tableClasses = useTableStyles();
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const theme = useTheme();
  const [showAction, setShowAction] = useState([]);
  //filter date
  const [filterDate, setFilterDate] = useState(false);
  const [fromDate, setFromDate] = useState(moment().subtract(30, 'days').format());
  const [toDate, setToDate] = useState(moment().format());
  const [isMobile, setIsMobile] = useState(false);
  const [doFilter, setDoFilter] = useState(0);
  const [filterType, setFilterType] = useState('promotion_name');
  const [filterValue, setFilterValue] = useState('');

  const language = useSelector((state) => state.app.language);

  const FORM = [
    {
      id: 'en',
      value: ['Name', 'Search'],
    },
    {
      id: 'vi',
      value: ['Tên', 'Tìm kiếm'],
    },
  ];

  const TOOLTIP = [
    {
      id: 'en',
      value: [
        'The total value of orders including products from the confirmed Promotion Combo (including shipping but excluding other promotions), calculated during the selected time period.',
        'The total number of confirmed orders including products from the Promotion Combo, calculated during the selected time period.',
        'The total number of Promotional Combos sold across all confirmed orders, calculated during the selected time period.',
        'The total number of products from the Promotion Combo sold across all confirmed orders, calculated during the selected time period.',
      ],
    },
    {
      id: 'vi',
      value: [
        'Tổng giá trị của các đơn hàng bao gồm sản phẩm từ Combo Khuyến Mãi được xác nhận (bao gồm phí vận chuyển nhưng không bao gồm những khuyến mãi khác), tính trong khoảng thời gian đã chọn.',
        'Tổng số lượng các đơn hàng bao gồm sản phẩm từ Combo Khuyến Mãi được xác nhận, tính trong khoảng thời gian đã chọn.',
        'Tổng số lượng Combo Khuyến Mãi đã bán tính trên toàn bộ các đơn hàng được xác nhận, tính trong khoảng thời gian đã chọn.',
        'Tổng số lượng sản phẩm từ Combo Khuyến Mãi đã bán tính trên toàn bộ các đơn hàng được xác nhận, tính trong khoảng thời gian đã chọn.',
      ],
    },
  ];

  const LIST_TITLE_VALUE = [
    {
      id: 'en',
      value: ['Product Views', 'Product clicks', 'Click-through rate', 'Buyer'],
    },
    {
      id: 'vi',
      value: ['Lượt xem sản phẩm', 'Lượt click sản phẩm', 'Tỷ lệ click', 'Người mua'],
    },
  ];

  const SHOP_FILTER = [
    {
      id: 'en',
      value: ['Channel', 'Shop'],
    },
    {
      id: 'vi',
      value: ['Kênh', 'Gian hàng'],
    },
  ];

  const TAB_LIST = [
    {
      id: 'en',
      value: ['All', 'Happenning', 'Upcoming', 'Finished'],
    },
    {
      id: 'vi',
      value: ['Tất cả', 'Đang diễn ra', 'Sắp diễn ra', 'Đã kết thúc'],
    },
  ];
  const TAB_FILTER = [
    {
      id: 'en',
      value: ['Time frame from: ', 'To'],
    },
    {
      id: 'vi',
      value: ['Khung giờ từ: ', 'Đến'],
    },
  ];

  const TABLE_HEAD = [
    {
      id: 'en',
      value: [
        'Time frame',
        'Product',
        'Reminders Bookings',
        'Clicks/views',
        'Status',
        'On/Off',
        'Action',
      ],
    },
    {
      id: 'vi',
      value: [
        'Khung giờ',
        'Sản Phẩm',
        'Lượt đặt Nhắc nhở',
        'Lượt nhấp chuột/xem',
        'Trạng thái',
        'Bật/Tắt',
        'Thao tác',
      ],
    },
  ];

  const BUTTON = [
    {
      id: 'en',
      value: ['Add new', 'Apply', 'Reset', 'Search', 'Retype'],
    },
    {
      id: 'vi',
      value: ['Thêm mới', 'Áp dụng', 'Đặt lại', 'Tìm', 'Nhập lại'],
    },
  ];

  const DATE_FILTER = [
    {
      id: 'en',
      value: ['Choose date', 'Apply', 'Reset'],
    },
    {
      id: 'vi',
      value: ['Chọn ngày', 'Từ ngày', 'Đến ngày'],
    },
  ];

  const FILTER_BOX = [
    {
      id: 'en',
      title: 'Add products',
      button: ['Search', 'Reset', 'Confirm'],
      select: ['By promotion name', 'By product name, By product id'],
    },
    {
      id: 'vi',
      title: 'Thêm sản phẩm',
      button: ['Tìm', 'Nhập lại', 'Xác nhận'],
      select: ['Tên chương trình', 'Tên sản phẩm', 'Mã sản phẩm'],
    },
  ];

  const TABLE_BUTTON = [
    {
      id: 'en',
      value: ['Detail', 'Copy', 'Data', 'Edit', 'Delete'],
    },
    {
      id: 'vi',
      value: ['Chi tiết', 'Sao chép', 'Dữ liệu', 'Chỉnh sửa', 'Xóa'],
    },
  ];

  const listText = [
    {
      id: 'en',
      title: 'Flash Sale (From September 16, 2021 to September 23, 2021 GMT+7)',
      title2: 'List Flash Sale',
      subTitle2: "Run the Shop's own Flash Sale program to increase sales",
      compareText: 'Compared to 7 days ago',
      tooltip: TOOLTIP[0].value,
      listTitleValue: LIST_TITLE_VALUE[0].value,
      shopFilter: SHOP_FILTER[0].value,
      tabFilterr: TAB_FILTER[0].value,
      tabList: TAB_LIST[0].value,
      tabFilter: FORM[0].value,
      tableHead: TABLE_HEAD[0].value,
      button: BUTTON[0].value,
      dateFilter: DATE_FILTER[0].value,
      textAll: 'All',
      filter_box_button: FILTER_BOX[0].button,
      filter_box_select: FILTER_BOX[0].select,
      placeholder: 'Enter here',
      table_button: TABLE_BUTTON[0].value,
    },
    {
      id: 'vi',
      title: 'Flash Sale (Từ 16-09-2021 đến 23-09-2021 GMT+7)',
      title2: 'Danh sách chương trình',
      subTitle2: 'Chạy chương trình Flash Sale của riêng Shop để tăng doanh số',
      compareText: 'So với 7 ngày trước',
      tooltip: TOOLTIP[1].value,
      listTitleValue: LIST_TITLE_VALUE[1].value,
      shopFilter: SHOP_FILTER[1].value,
      tabFilterr: TAB_FILTER[1].value,
      tabList: TAB_LIST[1].value,
      tabFilter: FORM[1].value,
      tableHead: TABLE_HEAD[1].value,
      button: BUTTON[1].value,
      dateFilter: DATE_FILTER[1].value,
      textAll: 'All',
      filter_box_button: FILTER_BOX[1].button,
      filter_box_select: FILTER_BOX[1].select,
      placeholder: 'Nhập vào',
      table_button: TABLE_BUTTON[1].value,
    },
  ];
  const [text, setText] = useState(listText[0]);
  useEffect(() => {
    for (let i = 0; i < listText.length; i++) {
      if (language == listText[i].id) {
        setText(listText[i]);
        break;
      }
    }
  }, [language]);

  const listValue = [
    {
      title: text.listTitleValue[0],
      tooltip: text.tooltip[0],
      value: 9.576,
      compareValue: '81.92%',
      type: 'down',
    },
    {
      title: text.listTitleValue[1],
      tooltip: text.tooltip[1],
      value: 123,
      compareValue: '0.00%',
      type: 'down',
    },
    {
      title: text.listTitleValue[2],
      tooltip: text.tooltip[2],
      value: '0.01%',
      compareValue: '56.45%',
      type: 'down',
    },
    {
      title: text.listTitleValue[3],
      tooltip: text.tooltip[3],
      value: formatCurrency(114368),
      compareValue: '72.29%',
      type: 'up',
    },
  ];

  const ecomData = [
    {
      title: 'Shopee',
      value: 'Shopee',
      shop: [
        {
          title: 'ShopTreTho MienNam Shopee',
          value: 'ShopTreTho MienNam Shopee',
        },
        {
          title: 'ShopTreTho MienBac Shopee',
          value: 'ShopTreTho MienBac Shopee',
        },
      ],
    },
    {
      title: 'Lazada',
      value: 'Lazada',
      shop: [
        {
          title: 'ShopTreTho MienNam Lazada',
          value: 'ShopTreTho MienNam Lazada',
        },
        {
          title: 'ShopTreTho MienBac Lazada',
          value: 'ShopTreTho MienBac Lazada',
        },
      ],
    },
  ];

  const [ecom, setEcom] = useState(-1);
  const [shop, setShop] = useState(-1);
  const [shopData, setShopData] = useState(ecomData[0].shop);

  const handleChangeEcom = (event) => {
    setEcom(event.target.value);
    for (let i = 0; i < ecomData.length; i++) {
      if (event.target.value == ecomData[i].value) {
        setShopData(ecomData[i].shop);
        setShop(-1);
      }
    }
  };

  const handleChangeShop = (event) => {
    setShop(event.target.value);
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

  const resetFilterDate = () => {
    setFromDate(moment().subtract(30, 'days').format());
    setToDate(moment().format());
    setFilterDate(false);
    setDoFilter(0);
  };

  const ShopFilter = () => {
    return (
      <div className={classes.shopFilterContainer}>
        <FormControl className={dashClasses.formControl} style={{ marginRight: '25px' }}>
          <InputLabel id="ecom-select-label">{text.shopFilter[0]}</InputLabel>
          <Select
            labelId="ecom-select-label"
            id="ecom-select"
            defaultValue={-1}
            value={ecom}
            onChange={handleChangeEcom}>
            <MenuItem className={classes.dropdownItem} value={-1} key="all">
              {text.textAll}
            </MenuItem>
            {ecomData.map((item) => (
              <MenuItem className={classes.dropdownItem} value={item.value} key={item.title}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={dashClasses.formControl} style={{ marginRight: '25px' }}>
          <InputLabel id="shop-select-label-2">{text.shopFilter[1]}</InputLabel>
          <Select
            labelId="shop-select-label-2"
            id="shop-select-2"
            defaultValue={-1}
            value={shop}
            onChange={handleChangeShop}>
            <MenuItem className={classes.dropdownItem} value={-1} key="all">
              {text.textAll}
            </MenuItem>
            {shopData?.map((item) => (
              <MenuItem className={classes.dropdownItem} value={item.value} key={item.title}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* filter date */}
        <FormControl>
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
              classes.popperNav
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
                          {text.dateFilter[0]}
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
                                label={text.dateFilter[1]}
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
                                label={text.dateFilter[2]}
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
                            {text.button[2]}
                          </Button>
                          <Button
                            color="primary"
                            size="sm"
                            onClick={() => {
                              setDoFilter(doFilter + 1);
                              setFilterDate(false);
                            }}>
                            {text.button[1]}
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
    );
  };

  const [data, setData] = useState([
    {
      id: 312313,
      code: 'Bật Flash Sale 5',
      name: 'Số sản phẩm tham gia 2',
      remindersBookings: '1',
      click_view: '1',
      on_off: true,

      time_from: '01:00 15/09/2021',
      time_to: '06:00',
      status: 'Happenning',
    },
    {
      id: 124122,
      code: 'Bật Flash Sale 5',
      name: 'Số sản phẩm tham gia 2',
      remindersBookings: '1',
      click_view: '1',
      on_off: false,
      time_from: '06:00 15/09/2021',
      time_to: '09:00',
      status: 'Finished',
    },
    {
      id: 124333,
      code: 'Bật Flash Sale 5',
      name: 'Số sản phẩm tham gia 2',
      remindersBookings: '1',
      click_view: '1',
      on_off: true,
      time_from: '15:00 15/09/2021',
      time_to: '18:00',
      status: 'Upcoming',
    },
  ]);

  //on_off
  const handleChangeClassifiedValue = (item, stt, value, type) => (event) => {
    let data = [...values.useState];
    let cloneData = [...data[stt].classified];
    let index = values.useState[stt].classified.indexOf(item);
    let cloneItem = { ...cloneData[index] };
    if (type == 'bool') {
      cloneItem[value] = event.target.checked;
    } else {
      cloneItem[value] = event.target.value;
    }
    cloneData[index] = cloneItem;
    data[stt].classified = cloneData;
    setValues({ ...values, ['useState']: data });
    setIsCheckAll_2(false);
    setChecked_2([]);
  };

  const StatusText = (text, color) => {
    return (
      <p className={classes.text + ' ' + classes.infoTextStatus} style={{ color: color }}>
        {text}
      </p>
    );
  };

  const renderTable = (item, index) => {
    let color = 'black';
    if (item.status == 'Finished') {
      color = grayColor[0];
    } else if (item.status == 'Happenning') {
      color = successColor[1];
    } else if (item.status == 'Upcoming') {
      color = primaryColor[0];
    }
    return (
      <TableRow key={'renderTable' + index} className={tableClasses.tableBodyRow}>
        <TableCell className={tableClasses.tableCell} key={'Time'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {item.time_from + '-' + item.time_to}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'product'}>
          <div className={classes.cellInfo}>
            <div className={classes.infoTextContainer}>
              <p
                className={
                  classes.text + ' ' + classes.infoTextPrimary + ' ' + classes.cursorHover
                }>
                {item.code}
              </p>

              <p className={classes.text + ' ' + classes.infoTextSecondary}>{item.name}</p>
            </div>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'remindersBookings'}>
          <div className={classes.flex_center}>
            <p className={classes.text + ' ' + classes.infoTextPrimary + ' ' + classes.cursorHover}>
              {item.remindersBookings}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'click_view'}>
          <div className={classes.flex_center}>
            <p className={classes.text + ' ' + classes.infoTextPrimary + ' ' + classes.cursorHover}>
              {item.click_view}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'status'}>
          {StatusText(item.status, color)}
        </TableCell>

        <TableCell className={tableClasses.tableCell} key={'status'}>
          <Switch
            checked={item.on_off}
            // onChange={handleChangeClassifiedValue(
            // item,
            //  index,
            // "status",
            //  "bool"
            //   )}
            name="checkedA"
          />
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'Action'}>
          <div className={shopClasses.proInfoContainer} key={'action'}>
            <Button
              id={'action-label' + item?.shopId}
              aria-owns={showAction.indexOf(item) !== -1 ? 'action-list-grow' + item?.shopId : null}
              aria-haspopup="true"
              color="white"
              size="sm"
              onClick={() => handleAction(item)}>
              {text.optionsTitle}
              <Icon className={shopClasses.btnFilter}>settings</Icon>
            </Button>
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
                shopClasses.popperNav
              }>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id={'action-list-grow' + item?.id}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}>
                  <Paper>
                    <ClickAwayListener onClickAway={() => handleAction(item)}>
                      <MenuList role="menu">
                        <MenuItem className={shopClasses.dropdownItem}>
                          <Link href={'/admin/flashsale/' + item.id}>
                            <a target="_blank">{text.table_button[0]}</a>
                          </Link>
                        </MenuItem>
                        <MenuItem className={shopClasses.dropdownItem}>
                          <Link href={'#'}>
                            <a target="_blank">{text.table_button[1]}</a>
                          </Link>
                        </MenuItem>
                        {(item.status == 'Upcoming' || item.status == 'Finished') && (
                          <MenuItem className={shopClasses.dropdownItem}>
                            <Link href={'/admin/flashsale/data?id=' + item.id}>
                              <a target="_blank">{text.table_button[2]}</a>
                            </Link>
                          </MenuItem>
                        )}
                        {(item.status == 'Upcoming' || item.status == 'Finished') && (
                          <MenuItem className={shopClasses.dropdownItem}>
                            <Link href={'#'}>
                              <a target="_blank">{text.table_button[3]}</a>
                            </Link>
                          </MenuItem>
                        )}

                        {item.status == 'Happenning' && (
                          <MenuItem className={shopClasses.dropdownItem}>
                            <Link href={'#'}>
                              <a target="_blank">{text.table_button[4]}</a>
                            </Link>
                          </MenuItem>
                        )}
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

  const TableData = () => {
    return (
      // <div className={tableClasses.tableResponsive}>
      <Table className={tableClasses.table}>
        {data !== undefined ? (
          <TableHead className={tableClasses['primary' + 'TableHeader']}>
            <TableRow className={tableClasses.tableHeadRow}>
              {text.tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={tableClasses.tableCell + ' ' + tableClasses.tableHeadCell}
                    key={key}
                    style={{
                      textAlign: `${key == text.tableHead.length - 1 ? 'right' : 'left'}`,
                    }}>
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {data.map((item, index) => {
            return renderTable(item, index);
          })}
        </TableBody>
      </Table>
      // </div>
    );
  };

  const handleChangeFilterType = (event) => {
    setFilterType(event.target.value);
  };

  const handleChangeFilterValue = (event) => {
    setFilterValue(event.target.value);
  };

  const CartListItem = () => {
    const handleChange = (event, newValue) => {
      setTabValue(newValue);
    };

    const handleChangeIndex = (index) => {
      setTabValue(index);
    };

    function TabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`full-width-tabpanel-${index}`}
          aria-labelledby={`full-width-tab-${index}`}
          {...other}>
          {value === index && <Typography>{children}</Typography>}
        </div>
      );
    }

    TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.any.isRequired,
      value: PropTypes.any.isRequired,
    };

    function a11yProps(index) {
      return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
      };
    }

    const AntTabs = withStyles({
      root: {
        borderBottom: '1px solid #e8e8e8',
      },
      indicator: {
        backgroundColor: '#1890ff',
      },
    })(Tabs);

    const AntTab = withStyles((theme) => ({
      root: {
        textTransform: 'none',
        fontSize: 16,
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
          color: '#40a9ff',
          opacity: 1,
        },
        '&$selected': {
          color: '#1890ff',
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          color: '#40a9ff',
        },
      },
      selected: {},
    }))((props) => <Tab disableRipple {...props} />);

    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>{text.title2}</h4>
          <p className={classes.cardCategoryWhite}>{text.subTitle2}</p>
        </CardHeader>
        <CardBody className={classes.cardBody}>
          <div className={classes.tabHeaderContainer}>
            <AntTabs
              value={tabValue}
              onChange={handleChange}
              aria-label="ant example"
              style={{ width: '100%' }}>
              {text.tabList.map((item, index) => (
                <AntTab label={item} {...a11yProps(index)} key={'tab' + index} />
              ))}
            </AntTabs>
            <Link href={'/admin/flashsale/addflashsale'}>
              <Button color="primary">
                <Icon className={classes.btnFilter}>add</Icon>
                {text.button[0]}
              </Button>
            </Link>
          </div>
          <div>
            <TabPanel value={tabValue} index={0} dir={theme.direction} className={classes.tabPanel}>
              {TableData()}
            </TabPanel>
          </div>
        </CardBody>
      </Card>
    );
  };

  return (
    <>
      <CartTotalInfo
        title={text.title}
        subTitle=""
        compareText={text.compareText}
        listValue={listValue}
        xs={3}
        sm={3}
        md={3}
        column={4}
      />
      {ShopFilter()}
      {CartListItem()}
    </>
  );
}

FlashSalePage.layout = Admin;

export default WithAuthentication(FlashSalePage);
