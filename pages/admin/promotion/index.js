import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShowLoader } from '../../../redux/actions/app';
import moment from 'moment';
import Link from 'next/link';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
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
  TableFooter,
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
import Search from '@material-ui/icons/Search';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Pagination from '@material-ui/lab/Pagination';
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
import { formatCurrency, formatNumber } from '../../../utilities/utils';
import {
  getChannelData,
  getAllPromotionMarketing,
  updatePromotionMarketing,
  deletePromotionMarketing,
} from '../../../utilities/ApiManage';
import { useRouter } from 'next/router';
import styles from 'assets/jss/natcash/views/promotion/promotionStyle.js';

function PromotionPage() {
  const dispatch = useDispatch();
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
  //
  //filter
  const [txtSearch, setTxtSearch] = useState('');
  //
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [currentStatus, setCurrentStatus] = useState('');
  //
  const [isChangeData, setIsChangeData] = useState(false);
  const [channels, setChannels] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [selectedShop, setSelectedShop] = useState('all');
  const [data, setData] = useState([
    {
      id: 312313,
      code: 12154625,
      name: 'sale 21.9',
      product: [
        'https://cf.shopee.vn/file/94f100cb953e89f1c7d66014dcdb337f',
        'https://cf.shopee.vn/file/8aeec7b29fb345999b858b266a8be02a',
        'https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11',
        'https://cf.shopee.vn/file/e4056b2747001d77569b2e6adca9976b',
        'https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc',
        'https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9',
      ],
      status: 'Happening',
      time_from: '00:00 15/09/2021',
      time_to: '23:59 15/09/2021',
    },
    {
      id: 124122,
      code: 12154625,
      name: 'FS 15.9',
      product: [
        'https://cf.shopee.vn/file/94f100cb953e89f1c7d66014dcdb337f',
        'https://cf.shopee.vn/file/8aeec7b29fb345999b858b266a8be02a',
        'https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11',
      ],
      status: 'Finished',
      time_from: '00:00 15/09/2021',
      time_to: '23:59 15/09/2021',
    },
    {
      id: 124122,
      code: 12154625,
      name: 'FS 15.9',
      product: [
        'https://cf.shopee.vn/file/94f100cb953e89f1c7d66014dcdb337f',
        'https://cf.shopee.vn/file/8aeec7b29fb345999b858b266a8be02a',
        'https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11',
      ],
      status: 'Upcoming',
      time_from: '00:00 15/09/2021',
      time_to: '23:59 15/09/2021',
    },
  ]);

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
        'The total value of orders for which the confirmed promotion applies is calculated for the selected time period, including shipping and excluding other promotions.',
        'The total number of products sold for which the promotion applies, based on all confirmed orders during the selected time period.',
        'The total number of confirmed orders including products for which the promotion applies, for the selected time period.',
        'The total number of unique buyers who purchased the product for which the promotion was applied, across all confirmed orders during the selected time period.',
      ],
    },
    {
      id: 'vi',
      value: [
        'Tổng giá trị của các đơn hàng có áp dụng khuyến mãi được xác nhận tính trong khoảng thời gian đã chọn, đã bao gồm phí vận chuyển và không bao gồm các chương trình khuyến mãi khác.',
        'Tổng số lượng sản phẩm có áp dụng khuyến mãi đã bán, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.',
        'Tổng số lượng các đơn hàng bao gồm sản phẩm có áp dụng khuyến mãi được xác nhận, tính trong khoảng thời gian đã chọn.',
        'Tổng số lượng người mua duy nhất đã mua sản phẩm có áp dụng khuyến mãi, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.',
      ],
    },
  ];

  const LIST_TITLE_VALUE = [
    {
      id: 'en',
      value: ['Revenue', 'Quantity sold', 'Order', 'Buyer'],
    },
    {
      id: 'vi',
      value: ['Doanh thu', 'Số lượng đã bán', 'Đơn hàng', 'Người mua'],
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
      value: [
        {
          title: 'All',
          status: '',
        },
        {
          title: 'Happening',
          status: 'Happening',
        },
        {
          title: 'Upcoming',
          status: 'Upcoming',
        },
        {
          title: 'Finished',
          status: 'Finished',
        },
      ],
    },
    {
      id: 'vi',
      value: [
        {
          title: 'Tất cả',
          status: '',
        },
        {
          title: 'Đang diễn ra',
          status: 'Happening',
        },
        {
          title: 'Sắp diễn ra',
          status: 'Upcoming',
        },
        {
          title: 'Đã kết thúc',
          status: 'Finished',
        },
      ],
    },
  ];
  const TAB_FILTER = [
    {
      id: 'en',
      value: ['Happening', 'Input'],
    },
    {
      id: 'vi',
      value: ['Tên chương trình', 'Nhập vào'],
    },
  ];

  const TABLE_HEAD = [
    {
      id: 'en',
      value: ['Name', 'Product', 'Status', 'Time', 'Action'],
    },
    {
      id: 'vi',
      value: ['Tên chương trình', 'Sản phẩm', 'Trạng thái', 'Thời gian', 'Thao tác'],
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

  const TABLE_BUTTON = [
    {
      id: 'en',
      value: ['Detail', 'Copy', 'Data', 'End', 'Delete'],
    },
    {
      id: 'vi',
      value: ['Chi tiết', 'Sao chép', 'Dữ liệu', 'Kết thúc', 'Xóa'],
    },
  ];

  const listText = [
    {
      id: 'en',
      title: "Shop's Promotion",
      title2: 'List of promotion',
      subTitle2: "Let's start creating Promotions for your own store",
      compareText: 'Compared to 7 days ago',
      tooltip: TOOLTIP[0].value,
      listTitleValue: LIST_TITLE_VALUE[0].value,
      shopFilter: SHOP_FILTER[0].value,
      tabList: TAB_LIST[0].value,
      tabFilter: FORM[0].value,
      tableHead: TABLE_HEAD[0].value,
      button: BUTTON[0].value,
      dateFilter: DATE_FILTER[0].value,
      textAll: 'All',
      placeholder: 'Enter here',
      table_button: TABLE_BUTTON[0].value,
      txtSearch: 'Find by name',
    },
    {
      id: 'vi',
      title: 'Chương Trình Của Shop',
      title2: 'Danh sách chương trình',
      subTitle2: 'Hãy bắt đầu tạo Chương Trình Khuyến Mãi cho riêng gian hàng của bạn',
      compareText: 'So với 7 ngày trước',
      tooltip: TOOLTIP[1].value,
      listTitleValue: LIST_TITLE_VALUE[1].value,
      shopFilter: SHOP_FILTER[1].value,
      tabList: TAB_LIST[1].value,
      tabFilter: FORM[1].value,
      tableHead: TABLE_HEAD[1].value,
      button: BUTTON[1].value,
      dateFilter: DATE_FILTER[1].value,
      textAll: 'Tất cả',
      placeholder: 'Nhập vào',
      table_button: TABLE_BUTTON[1].value,
      txtSearch: 'Tìm kiếm theo tên',
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

  const getShop = async () => {
    var res = await getChannelData();
    setChannels(res.data);
  };

  useEffect(() => {
    getShop();
  }, []);

  useEffect(async () => {
    dispatch(setShowLoader(true));
    let params = {};
    if (txtSearch) {
      params.keyword = txtSearch;
    }
    if (selectedShop != 'all') {
      params.shop_id = parseInt(selectedShop);
    }
    if (currentStatus) {
      params.status = currentStatus;
    }
    params.current_page = currentPage;
    let res = await getAllPromotionMarketing(params);
    if (res.code == 200) {
      setData(res.data.data);
      setCurrentPage(res.data.data_page.current_page);
      setTotalPage(res.data.data_page.total_page);
    }
    dispatch(setShowLoader(false));
  }, [currentPage, isChangeData]);

  const listValue = [
    {
      title: text.listTitleValue[0],
      tooltip: text.tooltip[0],
      value: formatCurrency(5203660),
      compareValue: '81.92%',
      type: 'down',
    },
    {
      title: text.listTitleValue[1],
      tooltip: text.tooltip[1],
      value: 19,
      compareValue: '74.69%',
      type: 'down',
    },
    {
      title: text.listTitleValue[2],
      tooltip: text.tooltip[2],
      value: 27,
      compareValue: '56.45%',
      type: 'up',
    },
    {
      title: text.listTitleValue[3],
      tooltip: text.tooltip[3],
      value: 19,
      compareValue: '72.29%',
      type: 'down',
    },
  ];

  const handleChangeEcom = (event) => {
    setEcom(event.target.value);
    for (let i = 0; i < ecomData.length; i++) {
      if (event.target.value == ecomData[i].value) {
        setShopData(ecomData[i].shop);
        setShop(-1);
      }
    }
  };

  const handleSelectPage = (event, value) => {
    setCurrentPage(value);
  };

  const handleInputSearch = (event) => {
    setTxtSearch(event.target.value);
    setCurrentPage(1);
  };

  // select shop
  const handleChangeChannel = (event) => {
    setSelectedChannel(event.target.value);
    channels.map((item, index) => {
      if (item.name === event.target.value) {
        setShopData(item.shop_data);
        setSelectedShop(item.shop_data[0].shopId);
      }
    });
    if (event.target.value === 'all') {
      setShopData([]);
      setSelectedShop('all');
    }
    setIsChangeData(!isChangeData);
  };

  const handleChangeShop = (event) => {
    setSelectedShop(event.target.value);
    setIsChangeData(!isChangeData);
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

  const handleChangeStatusSF = (status) => {
    setCurrentStatus(status);
    setIsChangeData(!isChangeData);
  };

  const onDeletePromotion = async (id) => {
    dispatch(setShowLoader(true));
    let res = await deletePromotionMarketing(id);
    if (res.code == 200) {
      setIsChangeData(!isChangeData);
    } else {
      NotificationManager.error({
        title: text.notifications.type[0],
        message: res.message ? res.message.text : 'Error',
      });
    }
    dispatch(setShowLoader(false));
  };

  const onUpdatePromotion = async (item) => {
    dispatch(setShowLoader(true));
    item.status = 'Finished';
    let res = await updatePromotionMarketing(item);
    if (res.code === 200) {
      setIsChangeData(!isChangeData);
    } else {
      NotificationManager.error({
        title: 'Error',
        message: res.message ? res.message.text : 'Error',
      });
    }
    dispatch(setShowLoader(false));
  };

  const ShopFilter = () => {
    return (
      <div className={classes.shopFilterContainer} style={{ marginTop: 30 }}>
        <FormControl className={dashClasses.formControl}>
          <div style={{ marginRight: '15px' }}>
            <CustomInput
              formControlProps={{
                className: adminClasses.margin,
              }}
              inputProps={{
                placeholder: text.txtSearch,
                onChange: handleInputSearch,
              }}
            />
            <Button
              color="white"
              aria-label="edit"
              justIcon
              round
              onClick={() => setIsChangeData(!isChangeData)}>
              <Search />
            </Button>
          </div>
        </FormControl>
        {/* filter channel */}
        <FormControl className={dashClasses.formControl} style={{ marginRight: '25px' }}>
          <InputLabel id="ecom-select-label">{text.shopFilter[0]}</InputLabel>
          <Select
            labelId="ecom-select-label"
            id="ecom-select"
            value={selectedChannel}
            onChange={handleChangeChannel}>
            <MenuItem className={classes.dropdownItem} value={'all'}>
              {text.textAll}
            </MenuItem>
            {channels.map((item, index) => (
              <MenuItem className={classes.dropdownItem} value={item.name} key={index}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* filter shop */}
        <FormControl className={dashClasses.formControl} style={{ marginRight: '25px' }}>
          <InputLabel id="shop-select-label-2">{text.shopFilter[1]}</InputLabel>
          <Select
            labelId="shop-select-label-2"
            id="shop-select-2"
            defaultValue={-1}
            value={selectedShop}
            onChange={handleChangeShop}>
            {selectedChannel === 'all' && (
              <MenuItem className={classes.dropdownItem} value={'all'}>
                {text.textAll}
              </MenuItem>
            )}
            {shopData?.map((item, index) => (
              <MenuItem className={classes.dropdownItem} value={item.shopId} key={index}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
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
    } else if (item.status == 'Happening') {
      color = successColor[1];
    } else if (item.status == 'Upcoming') {
      color = primaryColor[0];
    }
    return (
      <TableRow key={index} className={tableClasses.tableBodyRow}>
        <TableCell className={tableClasses.tableCell}>
          <div className={classes.cellInfo}>
            <div className={classes.infoTextContainer}>
              <Link href={'/admin/promotion/' + item._id}>
                <p
                  className={
                    classes.text + ' ' + classes.infoTextPrimary + ' ' + classes.cursorHover
                  }>
                  {item.promotion_name}
                </p>
              </Link>
              {channels.map((channel, cIndex) => {
                return (
                  <React.Fragment key={cIndex}>
                    {channel.shop_data.map((shop, stt) => {
                      if (shop.shopId === item.shop_id) {
                        return (
                          <Tooltip title={shop.name} placement="right-start" key={stt}>
                            <div className={classes.flex_center} style={{ cursor: 'pointer' }}>
                              <img className={classes.shopImg} src={shop.icon} />
                              <span className={classes.shopApplied}>{shop.code}</span>
                            </div>
                          </Tooltip>
                        );
                      }
                    })}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          <div className={classes.flex_center}>
            {item.list_products?.map((product, pIndex) => {
              if (pIndex <= 2) {
                return <img src={product.image} className={classes.tableImage} key={pIndex} />;
              } else if (pIndex > 2 && pIndex == item.list_products.length - 1) {
                return (
                  <>
                    <img src={product.image} className={classes.tableImage} key={pIndex} />
                    <p
                      className={classes.text + ' ' + classes.infoTextPrimary + ' ' + classes.more}>
                      {item.list_products.length - 4 > 0 && (
                        <span>
                          {'+'} {item.list_products.length - 4}
                        </span>
                      )}
                    </p>
                  </>
                );
              }
            })}
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>{StatusText(item.status, color)}</TableCell>
        <TableCell className={tableClasses.tableCell}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {moment(item.time_from).format('DD/MM/yyyy HH:mm')}
          </p>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {moment(item.time_to).format('DD/MM/yyyy HH:mm')}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          <div className={shopClasses.proInfoContainer}>
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
              anchorEl={Boolean(showAction.indexOf(item) !== -1)}
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
                          <Link href={'/admin/promotion/' + item._id}>
                            <a target="_blank">{text.table_button[0]}</a>
                          </Link>
                        </MenuItem>
                        <MenuItem className={shopClasses.dropdownItem}>
                          <Link href={'#'}>
                            <a target="_blank">{text.table_button[1]}</a>
                          </Link>
                        </MenuItem>
                        {(item.status == 'Happening' || item.status == 'Finished') && (
                          <MenuItem className={shopClasses.dropdownItem}>
                            <Link href={'/admin/promotion/data?id=' + item._id}>
                              <a target="_blank">{text.table_button[2]}</a>
                            </Link>
                          </MenuItem>
                        )}
                        {item.status == 'Happening' && (
                          <MenuItem
                            className={shopClasses.dropdownItem}
                            onClick={() => onUpdatePromotion(item)}>
                            <span>{text.table_button[3]}</span>
                          </MenuItem>
                        )}
                        {item.status == 'Upcoming' && (
                          <MenuItem
                            className={shopClasses.dropdownItem}
                            onClick={() => onDeletePromotion(item._id)}>
                            <span>{text.table_button[4]}</span>
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
        <TableFooter>
          <Pagination
            count={totalPage}
            page={currentPage}
            onChange={handleSelectPage}
            style={{ padding: '10px 0 0 0' }}
          />
        </TableFooter>
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
                <AntTab
                  label={item.title}
                  {...a11yProps(index)}
                  key={index}
                  onClick={() => handleChangeStatusSF(item.status)}
                />
              ))}
            </AntTabs>
            <Link href={'/admin/promotion/addpromotion'}>
              <Button color="primary">
                <Icon className={classes.btnFilter}>add</Icon>
                {text.button[0]}
              </Button>
            </Link>
          </div>
          <div>
            {text.tabList.map((item, index) => (
              <TabPanel
                value={tabValue}
                index={index}
                dir={theme.direction}
                className={classes.tabPanel}
                key={index}>
                {TableData()}
              </TabPanel>
            ))}
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

PromotionPage.layout = Admin;

export default WithAuthentication(PromotionPage);
