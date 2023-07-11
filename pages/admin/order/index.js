import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Collapse from '@material-ui/core/Collapse';
import Link from 'next/link';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { primaryColor, whiteColor, blackColor, hexToRgb } from 'assets/jss/natcash.js';
import { formatCurrency, formatNumber } from '../../../utilities/utils';
// layout for this page
import Admin from 'layouts/Admin.js';
// core components
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Check from '@material-ui/icons/Check';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Search from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import GridContainer from 'components/Grid/GridContainer.js';
import adminStyles from 'assets/jss/natcash/components/headerLinksStyle.js';
import tableStyles from 'assets/jss/natcash/components/tableStyle.js';
import taskStyles from 'assets/jss/natcash/components/tasksStyle.js';
import { Icon } from '@material-ui/core';
import dashStyles from 'assets/jss/natcash/views/dashboardStyle.js';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Tooltip from '@material-ui/core/Tooltip';
import DateFnsUtils from '@date-io/date-fns';
import vi from 'date-fns/locale/vi';
import Poppers from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import classNames from 'classnames';
import CardInfo from 'components/CardInfo/CardInfo.js';
import useWindowSize from 'components/Hooks/useWindowSize.js';
import { CheckBoxOutlined, LocalShippingOutlined } from '@material-ui/icons';
import {
  getOrderScreen,
  getOrderList,
  getShipOrder,
  shipOrder,
  cancelOrder,
  getAirwayBill,
  createAirwayBill,
} from '../../../utilities/ApiManage';
import Pagination from '@material-ui/lab/Pagination';
import { setShowLoader } from '../../../redux/actions/app';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';

function OrderPage() {
  const dispatch = useDispatch();
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const useAdminStyles = makeStyles(adminStyles);
  const useTableStyles = makeStyles(tableStyles);
  const adminClasses = useAdminStyles();
  const classes = useStyles();
  const tableClasses = useTableStyles();
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const [showFilter, setShowFilter] = useState(false);
  const [showAction, setShowAction] = useState([]);
  const [doFilter, setDoFilter] = useState(0);
  const [doSearch, setDoSearch] = useState(false);
  const [filterDate, setFilterDate] = useState(false);
  const [shipData, setShipData] = useState(null);
  const [selectedAddressShip, setSelectedAddressShip] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [listAddress, setListAddress] = useState([]);
  const [showSelectAddress, setShowSelectAddress] = useState(false);
  const DEFAULT_SHIP_TIME = [
    {
      date: moment().startOf('day').add(16, 'hours').unix(),
      pickup_time_id: moment().startOf('day').add(16, 'hours').unix().toString(),
    },
    {
      date: moment().add(1, 'days').startOf('day').add(16, 'hours').unix(),
      pickup_time_id: moment().startOf('day').add(16, 'hours').unix().toString(),
    },
    {
      date: moment().add(2, 'days').startOf('day').add(16, 'hours').unix(),
      pickup_time_id: moment().startOf('day').add(16, 'hours').unix().toString(),
    },
    {
      date: moment().add(3, 'days').startOf('day').add(16, 'hours').unix(),
      pickup_time_id: moment().startOf('day').add(16, 'hours').unix().toString(),
    },
  ];
  const [listTimeShip, setListTimeShip] = useState(DEFAULT_SHIP_TIME);
  const [selectedTimeShip, setSelectedTimeShip] = useState(DEFAULT_SHIP_TIME[0]);
  const TABLE_HEAD = [
    {
      id: 'en',
      value: [
        'Order information',
        'Create date',
        'Status',
        'Shipping carrier',
        'Customer name',
        'Total money',
        'Actions',
      ],
    },
    {
      id: 'vi',
      value: [
        'Thông tin đơn hàng',
        'Ngày tạo',
        'Trạng thái',
        'Đơn vị vận chuyển',
        'Tên khách hàng',
        'Tổng tiền',
        'Hành động',
      ],
    },
  ];
  const FILTER_HANDLE = [
    { id: 'en', value: ['Seller', 'Floor', 'Seller & floor'] },
    { id: 'vi', value: ['Người bán', 'Kênh', 'Người bán & kênh'] },
  ];
  const FILTER_TICK = [
    { id: 'en', value: ['Already in 1 ticket', 'Not in bill ticket'] },
    { id: 'vi', value: ['Đã nằm trong 1 phiếu', 'Chưa có trong phiếu nào'] },
  ];
  const FILTER_SMART = [
    { id: 'en', value: ['Slow delivery order', 'Slow processing order'] },
    { id: 'vi', value: ['Đơn giao hàng chậm', 'Đơn xử lý chậm'] },
  ];
  const MENU_TITLE_INFO = [
    {
      id: 'en',
      value: [
        {
          name: 'All',
          value: '',
        },
        {
          name: 'Ready to ship',
          value: 'READY_TO_SHIP',
        },
        {
          name: 'Processed',
          value: 'PROCESSED',
        },
        {
          name: 'Shipped',
          value: 'SHIPPED',
        },
        {
          name: 'Received',
          value: 'TO_CONFIRM_RECEIVE',
        },
        {
          name: 'Return',
          value: 'TO_RETURN',
        },
        {
          name: 'Cancel',
          value: 'CANCELLED',
        },
      ],
    },
    {
      id: 'vi',
      value: [
        {
          name: 'Tất cả',
          value: '',
        },
        {
          name: 'Sẵn sàng giao',
          value: 'READY_TO_SHIP',
        },
        {
          name: 'Đã xử lý',
          value: 'PROCESSED',
        },
        {
          name: 'Đang giao',
          value: 'SHIPPED',
        },
        {
          name: 'Đã nhận',
          value: 'TO_CONFIRM_RECEIVE',
        },
        {
          name: 'Hoàn',
          value: 'TO_RETURN',
        },
        {
          name: 'Hủy',
          value: 'CANCELLED',
        },
      ],
    },
  ];
  const [menuTitleData, setMenuTitleData] = useState([]);
  const [data, setData] = useState([]);
  const MENU_CARD_INFO = [
    {
      id: 'en',
      value: ['ALL ORDER', 'ORDER DELIVERED', 'ORDER NOT DELIVERED', 'CANCELED ORDER'],
    },
    {
      id: 'vi',
      value: ['TẤT CẢ ĐƠN', 'ĐƠN ĐÃ GIAO', 'ĐƠN CHƯA GIAO', 'ĐƠN HỦY'],
    },
  ];
  const [menuCardData, setMenuCardData] = useState([]);
  const [channelData, setChannelData] = useState([
    {
      title: 'Shopee',
      value: 1,
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
      value: 2,
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
    {
      title: 'Sendo',
      value: 3,
      shop: [],
    },
  ]);
  const TOOLTIP = [
    {
      id: 'en',
      orderStatus: [
        'Paid',
        'Packed',
        'Delivered',
        'Unpaid',
        'Not packed',
        'Undelivered',
        'Cancelled',
        'Return',
        'Shipped',
        'Waiting for a reply to the order cancellation request',
      ],
    },
    {
      id: 'vi',
      orderStatus: [
        'Đã thanh toán',
        'Đã đóng gói',
        'Giao thành công',
        'Chưa thanh toán',
        'Chưa đóng gói',
        'Chưa giao',
        'Đã hủy',
        'Hoàn trả',
        'Đang giao',
        'Chờ xử lý yêu cầu hủy đơn',
      ],
    },
  ];
  const CANCEL_REASON = [
    {
      id: 'en',
      value: [
        {
          name: 'Out of stock',
          value: 'OUT_OF_STOCK',
        },
        {
          name: 'Customer request',
          value: 'CUSTOMER_REQUEST',
        },
        {
          name: 'Undeliverable area',
          value: 'UNDELIVERABLE_AREA',
        },
        {
          name: 'Cod not supported',
          value: 'COD_NOT_SUPPORTED',
        },
      ],
    },
    {
      id: 'vi',
      value: [
        {
          name: 'Hết hàng',
          value: 'OUT_OF_STOCK',
        },
        {
          name: 'Yêu cầu của khách',
          value: 'CUSTOMER_REQUEST',
        },
        {
          name: 'Khu vực không thể giao',
          value: 'UNDELIVERABLE_AREA',
        },
        {
          name: 'Không hỗ trợ thu tiền',
          value: 'COD_NOT_SUPPORTED',
        },
      ],
    },
  ];
  const [channel, setChannel] = useState('');
  const [shopData, setShopData] = useState([]);
  const [shop, setShop] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [txtSearch, setTxtSearch] = useState('');
  const [handleFilter, setHandleFilter] = useState('');
  const [tickFilter, setTickFilter] = useState('');
  const [smartFilter, setSmartFilter] = useState([]);
  const [fromDate, setFromDate] = useState(moment().subtract(30, 'days').format());
  const [toDate, setToDate] = useState(moment().format());
  const [isMobile, setIsMobile] = useState(false);
  const [checked, setChecked] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(null);
  const language = useSelector((state) => state.app.language);
  const listText = [
    {
      id: 'en',
      title: 'Order',
      txtChannel: 'Channel',
      txtShop: 'Shop',
      txtAll: 'All',
      txtSearch: 'Find by code',
      txtProduct: 'products',
      txtFilter: 'Filter',
      txtFilterTitle: 'Choose filter',
      txtFilterDate: 'CREATE DATE',
      txtFilterFrom: 'From',
      txtFilterTo: 'To',
      txtFilterHandle: 'ORDER ARE PROCESSED BY',
      txtFilterTick: 'PICKUP TICKET',
      txtFilterSmart: 'SMART CARD',
      txtFilterDate: 'Create time',
      txtFilterReset: 'Reset',
      txtFilterApply: 'Apply',
      txtExcel: 'Export Excel',
      txtCancelReason: 'Choose cancel reason',
      txtCancelOrder: 'Cancel order',
      txtOption: 'Options',
      txtOptionSub1: 'Send message',
      txtOptionSub2: 'Ready for delivery',
      txtOptionSub3: 'Accept order cancellation',
      txtOptionSub4: 'Reject order cancellation',
      txtOptionSub5: 'Cancel order',
      txtOptionSub6: 'Print airway bill',
      txtUpdate: 'Action',
      txtUpdateSub1: 'Ready to Ship',
      txtUpdateSub2: 'Print bill',
      txtUpdateSub3: 'Print waybill',
      txtSuccess: 'Success',
      txtFail: 'Fail',
      txtTime: 'Time',
      txtShipCarrier: 'Shipping carrier',
      txtOk: 'OK',
      txtPickupAddress: 'Pick up address',
      txtChange: 'Change',
      txtSelectAddress: 'Select pick up address',
      txtErrorReadyShip: "Orders must be in same shop and status 'Ready to ship'",
      txtErrorReadyShip1: 'Please choose at least 1 order',
      txtErrorPrint: 'Order can not print now',
      txtErrorPrintShop: 'Các đơn hàng phải thuộc cùng 1 shop',
      tableHead: TABLE_HEAD[0].value,
      filterHandle: FILTER_HANDLE[0].value,
      filterTick: FILTER_TICK[0].value,
      filterSmart: FILTER_SMART[0].value,
      menutitle: MENU_TITLE_INFO[0].value,
      menuCard: MENU_CARD_INFO[0].value,
      orderStatus: TOOLTIP[0].orderStatus,
      cancelReason: CANCEL_REASON[0].value,
    },
    {
      id: 'vi',
      title: 'Đơn hàng',
      txtChannel: 'Kênh',
      txtShop: 'Gian hàng',
      txtAll: 'Tất cả',
      txtSearch: 'Tìm theo mã',
      txtProduct: 'sản phẩm',
      txtFilter: 'Bộ lọc',
      txtFilterTitle: 'Chọn bộ lọc',
      txtFilterDate: 'NGÀY TẠO',
      txtFilterFrom: 'Từ ngày',
      txtFilterTo: 'Đến ngày',
      txtFilterHandle: 'ĐƠN HÀNG ĐƯỢC XỬ LÝ BỞI',
      txtFilterTick: 'PHIẾU LẤY HÀNG',
      txtFilterSmart: 'THẺ THÔNG MINH',
      txtFilterDate: 'Ngày tạo',
      txtFilterReset: 'Đặt lại',
      txtFilterApply: 'Áp dụng',
      txtExcel: 'Xuất Excel',
      txtCancelReason: 'Chọn lý do hủy đơn',
      txtCancelOrder: 'Hủy đơn',
      txtOption: 'Tùy chọn',
      txtOptionSub1: 'Nhắn tin',
      txtOptionSub2: 'Sẵn sàng giao',
      txtOptionSub3: 'Chấp nhận yêu cầu hủy đơn',
      txtOptionSub4: 'Từ chối yêu cầu hủy đơn',
      txtOptionSub5: 'Hủy đơn hàng',
      txtOptionSub6: 'In phiếu vận chuyển',
      txtUpdate: 'Thao tác',
      txtUpdateSub1: 'Sẵn sàng giao',
      txtUpdateSub2: 'In hóa đơn',
      txtUpdateSub3: 'In phiếu vận chuyển',
      txtSuccess: 'Thành công',
      txtFail: 'Thất bại',
      txtTime: 'Thời gian',
      txtShipCarrier: 'Đơn vị vận chuyển',
      txtOk: 'Xác nhận',
      txtPickupAddress: 'Địa chỉ lấy hàng',
      txtChange: 'Đổi',
      txtSelectAddress: 'Chọn địa chỉ giao hàng',
      txtErrorReadyShip: "Các đơn hàng phải thuộc cùng 1 shop và trạng thái 'Sẵn sàng giao'",
      txtErrorReadyShip1: 'Hãy chọn ít nhất 1 đơn hàng',
      txtErrorPrint: 'Đơn hàng chưa thể in lúc này',
      txtErrorPrintShop: 'Các đơn hàng phải thuộc cùng 1 shop',
      tableHead: TABLE_HEAD[1].value,
      filterHandle: FILTER_HANDLE[1].value,
      filterTick: FILTER_TICK[1].value,
      filterSmart: FILTER_SMART[1].value,
      menutitle: MENU_TITLE_INFO[1].value,
      menuCard: MENU_CARD_INFO[1].value,
      orderStatus: TOOLTIP[1].orderStatus,
      cancelReason: CANCEL_REASON[1].value,
    },
  ];
  const [text, setText] = useState(listText[0]);
  const [cancelReason, setCancelReason] = useState(text.cancelReason[0]);
  useEffect(() => {
    for (let i = 0; i < listText.length; i++) {
      if (language == listText[i].id) {
        setText(listText[i]);
        setCancelReason(listText[i].cancelReason[0]);
        break;
      }
    }
  }, [language]);
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
    const res = await getOrderScreen();
    setData(res.data.order_list);
    setChannelData(res.data.channel_data);
    setMenuCardData(res.data.order_sum_by_status);
    setMenuTitleData(res.data.order_count_by_status);
    setCurrentPage(res.data.data_page.current_page);
    setTotalPage(res.data.data_page.total_page);
    dispatch(setShowLoader(false));
  }, []);
  useEffect(async () => {
    dispatch(setShowLoader(true));
    setChecked([]);
    let params = {};
    params.current_page = currentPage;
    if (txtSearch) {
      params.order_sn = txtSearch;
    }
    if (doFilter) {
      params.time_from = moment(fromDate).unix();
      params.time_to = moment(toDate).unix();
    }
    if (selectedTitle.value) {
      params.order_status = selectedTitle.value;
    }
    if (shop > -1 && shopData.length > 0) {
      params.shop_id = Number(shopData[shop].shopId);
    }
    const res = await getOrderList(params);
    if (res.code == 200) {
      if (res.data.order_list.length > 0) {
        setData(res.data.order_list);
        setCurrentPage(res.data.data_page.current_page);
        setTotalPage(res.data.data_page.total_page);
        setMenuTitleData(res.data.order_count_by_status);
      }
    }
    dispatch(setShowLoader(false));
  }, [doSearch, doFilter, selectedTitle, shop, shopData, currentPage]);

  const handleSelectPage = (event, value) => {
    setCurrentPage(value);
  };

  const handleChangeChannel = (event) => {
    setChannel(event.target.value);
    setShop(-1);
    if (event.target.value == -1) {
      setShopData([]);
    } else {
      setShopData(channelData[event.target.value].shop_data);
    }
  };

  const handleApplyButton = async () => {
    setDoFilter(doFilter + 1);
    setShowFilter(false);
    setCurrentPage(1);
  };
  const handleTitle = async (item) => {
    setSelectedTitle(item);
    setCurrentPage(1);
  };
  const handleInputSearch = (event) => {
    setTxtSearch(event.target.value);
    setCurrentPage(1);
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
  const readyToShip = async (item) => {
    setSelectedOrder(item);
    dispatch(setShowLoader(true));
    handleAction(item);
    const res = await getShipOrder(item.order_sn);
    setShipData(res.data);
    setListAddress(res.data.pickup.address_list);
    res.data.pickup.address_list.forEach((item) => {
      if (
        item.address_flag.indexOf('pickup_address') !== -1 ||
        item.address_flag.indexOf('default_address') !== -1
      ) {
        setSelectedAddressShip(item);
        if (item.time_slot_list.length > 0) {
          setListTimeShip(item.time_slot_list);
          setSelectedTimeShip(item.time_slot_list[0]);
        }
        return;
      }
    });
    dispatch(setShowLoader(false));
  };
  const handleSelectAddress = (item) => {
    setSelectedAddressShip(item);
    setShowSelectAddress(false);
  };
  const doReadyToShip = async () => {
    setShipData(null);
    dispatch(setShowLoader(true));
    const pickup = {
      address_id: selectedAddressShip.address_id,
      pickup_time_id: selectedTimeShip.pickup_time_id,
    };
    let ordersn = '';
    if (selectedOrder) ordersn = selectedOrder.order_sn;
    else if (checked.length > 0) {
      checked.forEach((item) => {
        ordersn = ordersn + item.order_sn + ',';
      });
      ordersn = ordersn.slice(0, -1);
    }
    const res = await shipOrder(ordersn, pickup);
    if (res.data?.error || res.code != 200) {
      NotificationManager.error({
        title: text.txtOptionSub2,
        message: text.txtFail,
      });
    } else {
      NotificationManager.success({
        title: text.txtOptionSub2,
        message: res.data.length + ' ' + text.title + ' ' + text.txtSuccess,
      });
    }
    setSelectedOrder(null);
    dispatch(setShowLoader(false));
  };
  const printAirwayBill = async (item) => {
    dispatch(setShowLoader(true));
    handleAction(item);
    const res = await createAirwayBill(item.order_sn);
    if (res.data.error) {
      NotificationManager.error({
        title: text.txtOptionSub2,
        message: text.txtErrorPrint,
      });
    } else {
      const res1 = await getAirwayBill(item.order_sn);
      window.open(res1);
    }
    dispatch(setShowLoader(false));
  };
  const doPrintAirwayBill = async () => {
    dispatch(setShowLoader(true));
    let ordersn = '';
    if (checked.length > 0) {
      checked.forEach((item) => {
        ordersn = ordersn + item.order_sn + ',';
      });
      ordersn = ordersn.slice(0, -1);
    }
    const res = await createAirwayBill(ordersn);
    if (res.data.error) {
      NotificationManager.error({
        title: text.txtOptionSub2,
        message: text.txtErrorPrint,
      });
    } else {
      let err = false;
      res.data.response.result_list.forEach((item) => {
        if (item.fail_error) {
          err = true;
          NotificationManager.error({
            title: text.txtOptionSub2,
            message: text.txtErrorPrint + ' ' + item.order_sn,
          });
        }
      });
      if (!err) {
        const res1 = await getAirwayBill(ordersn);
        window.open(res1);
      }
    }
    dispatch(setShowLoader(false));
  };
  const handlePrintAllOrder = async () => {
    setShowUpdate(false);
    let shopId = checked[0]?.shop_id;
    var isError = false;
    checked.forEach((item) => {
      if (item.shop_id != shopId) {
        isError = true;
      }
    });
    if (checked.length == 0) {
      NotificationManager.error({
        title: text.txtOptionSub2,
        message: text.txtErrorReadyShip1,
      });
    } else if (isError) {
      NotificationManager.error({
        title: text.txtOptionSub2,
        message: text.txtErrorPrintShop,
      });
    } else {
      doPrintAirwayBill();
    }
  };
  const handleCancelOrder = async (item) => {
    handleAction(item);
    setConfirmCancel(item);
  };
  const doCancelOrder = async () => {
    setShowLoader(true);
    const res = await cancelOrder(confirmCancel.order_sn, cancelReason.value);
    if (res.data?.error || res.code != 200) {
      NotificationManager.error({
        title: text.txtOptionSub5,
        message: text.txtFail,
      });
    } else {
      NotificationManager.success({
        title: text.txtOptionSub5,
        message: text.txtSuccess,
      });
    }
    setConfirmCancel(null);
    setShowLoader(false);
  };
  const handleCheckAll = () => {
    if (isCheckAll) {
      setIsCheckAll(false);
      setChecked([]);
    } else {
      setIsCheckAll(true);
      setChecked(data);
    }
  };
  const handleToggle = (item) => {
    const currentIndex = checked.indexOf(item);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      setIsCheckAll(false);
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const handleUpdate = () => {
    setShowUpdate(false);
  };
  const handleShipAllOrder = async () => {
    setShowUpdate(false);
    let shopId = checked[0]?.shop_id;
    var isError = false;
    checked.forEach((item) => {
      if (item.order_status != 'READY_TO_SHIP' || item.shop_id != shopId) {
        isError = true;
      }
    });
    if (checked.length == 0) {
      NotificationManager.error({
        title: text.txtOptionSub2,
        message: text.txtErrorReadyShip1,
      });
    } else if (isError) {
      NotificationManager.error({
        title: text.txtOptionSub2,
        message: text.txtErrorReadyShip,
      });
    } else {
      setShowLoader(true);
      const res = await getShipOrder(checked[0].order_sn);
      setShipData(res.data);
      setListAddress(res.data.pickup.address_list);
      res.data.pickup.address_list.forEach((item) => {
        if (
          item.address_flag.indexOf('pickup_address') !== -1 ||
          item.address_flag.indexOf('default_address') !== -1
        ) {
          setSelectedAddressShip(item);
          if (item.time_slot_list.length > 0) {
            setListTimeShip(item.time_slot_list);
            setSelectedTimeShip(item.time_slot_list[0]);
          }
          return;
        }
      });
      setShowLoader(false);
    }
  };
  const handleCloseShip = () => {
    setSelectedOrder(null);
    setShipData(null);
  };
  const handleSmartFilter = (item) => {
    const currentIndex = smartFilter.indexOf(item);
    const newStatus = [...smartFilter];
    if (currentIndex === -1) {
      newStatus.push(item);
    } else {
      newStatus.splice(currentIndex, 1);
    }
    setSmartFilter(newStatus);
  };
  const resetFilterDate = () => {
    setFromDate(moment().subtract(30, 'days').format());
    setToDate(moment().format());
    setFilterDate(false);
    setDoFilter(0);
  };
  const resetFilter = () => {
    setHandleFilter(''), setTickFilter('');
    setSmartFilter([]);
    setDoFilter(0);
  };

  const renderCardInfo = () => {
    const listCardInfo = text.menuCard.map((item, index) => (
      <CardInfo
        title={item}
        content={formatNumber(menuCardData[Object.keys(menuCardData)[index]])}
        cardOrder={true}
      />
    ));
    return <GridContainer>{listCardInfo}</GridContainer>;
  };

  const orderInfo = (item) => {
    return (
      <div className={classes.proContainer}>
        <div className={classes.proInfoContainer}>
          <Link href={'/admin/order/' + item.order_sn}>
            <a target="_blank" className={tableClasses.tableCell + ' ' + classes.txtOrderCode}>
              {item.order_sn}
            </a>
          </Link>
          <div className={classes.proContainer}>
            <div className={classes.shopInfoContainer}>
              <img className={classes.shopImg} src={item?.shop_icon} />
              <p className={tableClasses.tableCell + ' ' + classes.txtShopName}>
                {item?.shop_code}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const orderStatus = (item) => {
    return (
      <div className={classes.statusContainer}>
        <div className={classes.proInfoContainer}>
          {item.order_status != 'CANCELLED' &&
          item.order_status != 'TO_RETURN' &&
          item.order_status != 'IN_CANCEL' ? (
            <div className={classes.flex}>
              <Button
                color={item.detail.pay_time ? 'green' : 'white'}
                aria-label="edit"
                justIcon
                round
                className={classes.iconStatus}>
                <Tooltip
                  title={item.detail.pay_time ? text.orderStatus[0] : text.orderStatus[3]}
                  arrow>
                  <Icon>attach_money</Icon>
                </Tooltip>
              </Button>
              <Button
                color={
                  item.order_status == 'PROCESSED' ||
                  item.order_status == 'SHIPPED' ||
                  item.order_status == 'TO_CONFIRM_RECEIVE' ||
                  item.order_status == 'COMPLETED'
                    ? 'green'
                    : 'white'
                }
                aria-label="edit"
                justIcon
                round
                className={classes.iconStatus}>
                <Tooltip
                  title={
                    item.order_status == 'PROCESSED' ||
                    item.order_status == 'SHIPPED' ||
                    item.order_status == 'TO_CONFIRM_RECEIVE' ||
                    item.order_status == 'COMPLETED'
                      ? text.orderStatus[1]
                      : text.orderStatus[4]
                  }
                  arrow>
                  <CheckBoxOutlined />
                </Tooltip>
              </Button>
              <Button
                color={
                  item.order_status == 'TO_CONFIRM_RECEIVE' || item.order_status == 'COMPLETED'
                    ? 'green'
                    : item.order_status == 'SHIPPED'
                    ? ''
                    : 'white'
                }
                aria-label="edit"
                justIcon
                round
                className={classes.iconStatus}>
                <Tooltip
                  title={
                    item.order_status == 'TO_CONFIRM_RECEIVE' || item.order_status == 'COMPLETED'
                      ? text.orderStatus[2]
                      : item.order_status == 'SHIPPED'
                      ? text.orderStatus[8]
                      : text.orderStatus[5]
                  }
                  arrow>
                  <LocalShippingOutlined />
                </Tooltip>
              </Button>
            </div>
          ) : (
            <React.Fragment>
              <Button
                color={item.order_status == 'IN_CANCEL' ? '' : 'danger'}
                aria-label="edit"
                justIcon
                round
                className={classes.iconStatus}>
                <Tooltip
                  title={
                    item.order_status == 'CANCELLED'
                      ? text.orderStatus[6]
                      : item.order_status == 'IN_CANCEL'
                      ? text.orderStatus[9]
                      : text.orderStatus[7]
                  }
                  arrow>
                  <Icon>
                    {item.order_status == 'CANCELLED' || item.order_status == 'IN_CANCEL'
                      ? 'clear'
                      : 'replay'}
                  </Icon>
                </Tooltip>
              </Button>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  };

  const renderOrder = (item, index) => {
    return (
      <TableRow
        key={index}
        className={tableClasses.tableBodyRow}
        style={{
          backgroundColor: checked.indexOf(item) !== -1 ? '#fff6f0' : '#fff',
        }}>
        <TableCell className={tableClasses.tableCell}>
          <Checkbox
            checked={checked.indexOf(item) !== -1}
            tabIndex={-1}
            onClick={() => handleToggle(item)}
            checkedIcon={<Check className={taskClasses.checkedIcon} />}
            icon={<Check className={taskClasses.uncheckedIcon} />}
            classes={{
              checked: taskClasses.checked,
              root: taskClasses.root,
            }}
          />
        </TableCell>
        <TableCell style={{ width: 100 }} className={tableClasses.tableCell} key={'orderInfo'}>
          {orderInfo(item)}
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'date'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>
              {item.detail.statuses
                ? moment(item.detail.create_at).format('DD/MM/YYYY')
                : moment.unix(item.create_time).format('DD/MM/YYYY')}
            </p>
            <p className={tableClasses.tableCell + ' ' + classes.txtShopName}>
              {item.detail.statuses
                ? moment(item.detail.create_at).format('HH:mm')
                : moment.unix(item.create_time).format('HH:mm')}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'status'}>
          {orderStatus(item)}
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'ship'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>
              {item?.detail?.shipping_carrier}
            </p>
            <p className={tableClasses.tableCell + ' ' + classes.txtShopName}>
              {item?.tracking_number}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'customer'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>
              {item?.detail?.recipient_address?.name}
            </p>
            <p className={tableClasses.tableCell + ' ' + classes.txtShopName}>
              {item?.detail?.recipient_address?.state}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'detail'}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>
              {formatCurrency(item?.total_amount)}
            </p>
            <p className={tableClasses.tableCell + ' ' + classes.txtShopName}>
              {item?.detail?.item_list
                ? item?.detail?.item_list.length + ' ' + text.txtProduct
                : ''}
            </p>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.proInfoContainer}>
            <Button
              id={'action-label' + item?.id}
              aria-owns={showAction.indexOf(item) !== -1 ? 'action-list-grow' + item?.id : null}
              aria-haspopup="true"
              color="white"
              size="sm"
              onClick={() => handleAction(item)}>
              <Icon className={classes.btnFilter} style={{ margin: 0 }}>
                settings
              </Icon>
            </Button>
            <Poppers
              open={Boolean(showAction.indexOf(item) !== -1)}
              anchorEl={showAction.indexOf(item) !== -1}
              transition
              disablePortal
              className={
                classNames({
                  [classes.popperClose]: !showAction.indexOf(item) !== -1,
                }) +
                ' ' +
                classes.popperNav
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
                        <MenuItem
                          onClick={() => handleAction(item)}
                          className={classes.dropdownItem}>
                          {text.txtOptionSub1}
                        </MenuItem>
                        {item.order_status == 'READY_TO_SHIP' && (
                          <MenuItem
                            onClick={() => readyToShip(item)}
                            className={classes.dropdownItem}>
                            {text.txtOptionSub2}
                          </MenuItem>
                        )}
                        {(item.order_status == 'PROCESSED' ||
                          item.order_status == 'READY_TO_SHIP') && (
                          <MenuItem
                            onClick={() => printAirwayBill(item)}
                            className={classes.dropdownItem}>
                            {text.txtOptionSub6}
                          </MenuItem>
                        )}
                        {item.order_status == 'IN_CANCEL' && (
                          <React.Fragment>
                            <MenuItem
                              onClick={() => handleAction(item)}
                              className={classes.dropdownItem}>
                              {text.txtOptionSub3}
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleAction(item)}
                              className={classes.dropdownItem}>
                              {text.txtOptionSub4}
                            </MenuItem>
                          </React.Fragment>
                        )}
                        {(item.order_status == 'UNPAID' ||
                          item.order_status == 'READY_TO_SHIP' ||
                          item.order_status == 'PROCESSED') && (
                          <MenuItem
                            onClick={() => handleCancelOrder(item)}
                            className={classes.dropdownItem}>
                            {text.txtOptionSub5}
                          </MenuItem>
                        )}
                        {/* <MenuItem
                          onClick={() => handleAction(item)}
                          className={classes.dropdownItem}
                        >
                          {text.txtOptionSub3}
                        </MenuItem> */}
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
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{text.title}</h4>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        <div className={classes.selectTitleContainer}>
          {/* {renderCardInfo()} */}
          <GridContainer>
            {text.menutitle.map((item, index) => {
              return (
                <div
                  className={classes.selectContainer}
                  style={{
                    backgroundColor: selectedTitle == item ? primaryColor[3] : '',
                  }}
                  onClick={() => handleTitle(item)}>
                  <p>{item.name}</p>
                  {menuTitleData[Object.keys(menuTitleData)[index - 1]] > 0 && (
                    <p className={classes.txtNumTitle}>
                      {formatNumber(menuTitleData[Object.keys(menuTitleData)[index - 1]])}
                    </p>
                  )}
                </div>
              );
            })}
          </GridContainer>
        </div>
        <div>
          <div
            className={dashClasses.filterSelections}
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
                    placeholder: text.txtSearch,
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
              <InputLabel id="ecom-select-label">{text.txtChannel}</InputLabel>
              <Select
                labelId="ecom-select-label"
                id="ecom-select"
                value={channel}
                onChange={handleChangeChannel}
                className={classes.select}>
                <MenuItem className={classes.dropdownItem} value={-1}>
                  {text.txtAll}
                </MenuItem>
                {channelData.map((item, index) => (
                  <MenuItem className={classes.dropdownItem} value={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={dashClasses.formControl} style={{ marginRight: '25px' }}>
              <InputLabel id="shop-select-label">{text.txtShop}</InputLabel>
              <Select
                labelId="shop-select-label"
                id="shop-select"
                value={shop}
                onChange={handleChangeShop}
                className={classes.select}>
                <MenuItem className={classes.dropdownItem} value={-1}>
                  {text.txtAll}
                </MenuItem>
                {shopData.map((item, index) => (
                  <MenuItem className={classes.dropdownItem} value={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <Button
                color="white"
                id={'filter-date-label'}
                aria-owns={filterDate ? 'filter-date' : null}
                aria-haspopup="true"
                className={classes.filteTritle}
                onClick={() => setFilterDate(true)}>
                {moment(fromDate).format('DD/MM/yyyy') +
                  ' - ' +
                  moment(toDate).format('DD/MM/yyyy')}
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
                              {text.txtFilterDate}
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
                                    label={text.txtFilterFrom}
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
                                    label={text.txtFilterTo}
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
                                {text.txtFilterReset}
                              </Button>
                              <Button
                                color="primary"
                                size="sm"
                                onClick={() => {
                                  setDoFilter(doFilter + 1);
                                  setFilterDate(false);
                                }}>
                                {text.txtFilterApply}
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
            <FormControl className={dashClasses.formControl}>
              <Button color="primary" onClick={() => setShowFilter(true)}>
                {text.txtFilter}
                <Icon className={classes.btnFilter}>tune</Icon>
              </Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={showFilter}
                onClose={() => setShowFilter(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}>
                <Fade in={showFilter}>
                  <Card className={classes.modalContainer}>
                    <CardHeader color="primary" className={classes.flex + ' ' + classes.jC_sb}>
                      <h4 className={classes.cardTitleWhite}>{text.txtFilterTitle}</h4>
                      <Icon className={classes.btnClose} onClick={() => setShowFilter(false)}>
                        close
                      </Icon>
                    </CardHeader>
                    <CardBody>
                      <div class={classes.filterEleContent}>
                        <p className={classes.titleFilter}>{text.txtFilterHandle}</p>
                        <GridContainer>
                          {text.filterHandle.map((item, index) => {
                            return (
                              <div className={classes.filterTitleContainer}>
                                <Checkbox
                                  checked={handleFilter == item}
                                  tabIndex={-1}
                                  onClick={() => setHandleFilter(item)}
                                  checkedIcon={<Check className={taskClasses.checkedIcon} />}
                                  icon={<Check className={taskClasses.uncheckedIcon} />}
                                  classes={{
                                    checked: taskClasses.checked,
                                    root: taskClasses.root,
                                  }}
                                />
                                <p>{item}</p>
                              </div>
                            );
                          })}
                        </GridContainer>
                      </div>
                      <div class={classes.filterEleContent}>
                        <p className={classes.titleFilter}>{text.txtFilterTick}</p>
                        <GridContainer>
                          {text.filterTick.map((item, index) => {
                            return (
                              <div className={classes.filterTitleContainer}>
                                <Checkbox
                                  checked={tickFilter == item}
                                  tabIndex={-1}
                                  onClick={() => setTickFilter(item)}
                                  checkedIcon={<Check className={taskClasses.checkedIcon} />}
                                  icon={<Check className={taskClasses.uncheckedIcon} />}
                                  classes={{
                                    checked: taskClasses.checked,
                                    root: taskClasses.root,
                                  }}
                                />
                                <p>{item}</p>
                              </div>
                            );
                          })}
                        </GridContainer>
                      </div>
                      <div class={classes.filterEleContent}>
                        <p className={classes.titleFilter}>{text.txtFilterSmart}</p>
                        <GridContainer>
                          {text.filterSmart.map((item, index) => {
                            return (
                              <div className={classes.filterTitleContainer}>
                                <Checkbox
                                  checked={smartFilter.indexOf(item) !== -1}
                                  tabIndex={-1}
                                  onClick={() => handleSmartFilter(item)}
                                  checkedIcon={<Check className={taskClasses.checkedIcon} />}
                                  icon={<Check className={taskClasses.uncheckedIcon} />}
                                  classes={{
                                    checked: taskClasses.checked,
                                    root: taskClasses.root,
                                  }}
                                />
                                <p>{item}</p>
                              </div>
                            );
                          })}
                        </GridContainer>
                      </div>
                    </CardBody>
                    <CardFooter>
                      <div className={classes.filterFooter}>
                        <Button
                          color="white"
                          onClick={() => resetFilter()}
                          style={{ marginRight: '20px' }}>
                          {text.txtFilterReset}
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => {
                            handleApplyButton();
                          }}>
                          {text.txtFilterApply}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Fade>
              </Modal>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={confirmCancel != null}
                onClose={() => setConfirmCancel(null)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}>
                <Fade in={confirmCancel != null}>
                  <Card className={classes.modalContainer}>
                    <CardHeader color="primary" className={classes.flex + ' ' + classes.jC_sb}>
                      <h4 className={classes.cardTitleWhite}>
                        {text.txtOptionSub5 + ' #' + confirmCancel?.order_sn}
                      </h4>
                      <Icon className={classes.btnClose} onClick={() => setConfirmCancel(null)}>
                        close
                      </Icon>
                    </CardHeader>
                    <CardBody>
                      <div class={classes.filterEleContent}>
                        <p className={classes.titleFilter}>{text.txtCancelReason}</p>
                        <GridContainer>
                          {text.cancelReason.map((item, index) => {
                            return (
                              <div className={classes.filterTitleContainer}>
                                <Checkbox
                                  checked={cancelReason == item}
                                  tabIndex={-1}
                                  onClick={() => setCancelReason(item)}
                                  checkedIcon={<Check className={taskClasses.checkedIcon} />}
                                  icon={<Check className={taskClasses.uncheckedIcon} />}
                                  classes={{
                                    checked: taskClasses.checked,
                                    root: taskClasses.root,
                                  }}
                                />
                                <p>{item.name}</p>
                              </div>
                            );
                          })}
                        </GridContainer>
                      </div>
                    </CardBody>
                    <CardFooter>
                      <div className={classes.filterFooter}>
                        <Button
                          color="primary"
                          onClick={() => {
                            doCancelOrder();
                          }}>
                          {text.txtCancelOrder}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Fade>
              </Modal>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={shipData != null}
                onClose={() => handleCloseShip()}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}>
                <Fade in={shipData != null}>
                  <Card className={classes.modalContainer}>
                    <CardHeader color="primary" className={classes.flex + ' ' + classes.jC_sb}>
                      <h4 className={classes.cardTitleWhite}>{text.txtOptionSub2}</h4>
                      <Icon className={classes.btnClose} onClick={() => handleCloseShip()}>
                        close
                      </Icon>
                    </CardHeader>
                    <CardBody>
                      <div class={classes.filterEleContent}>
                        <p className={classes.titleFilter}>{text.txtShipCarrier}</p>
                        <GridContainer>
                          <div className={classes.filterTitleContainer}>
                            <p>{selectedOrder?.detail?.package_list[0]?.shipping_carrier}</p>
                          </div>
                        </GridContainer>
                      </div>
                      <div class={classes.filterEleContent}>
                        <p className={classes.titleFilter}>{text.txtTime}</p>
                        <GridContainer>
                          {listTimeShip.map((item, index) => {
                            return (
                              <div className={classes.filterTitleContainer}>
                                <Checkbox
                                  checked={selectedTimeShip == item}
                                  tabIndex={-1}
                                  onClick={() => setSelectedTimeShip(item)}
                                  checkedIcon={<Check className={taskClasses.checkedIcon} />}
                                  icon={<Check className={taskClasses.uncheckedIcon} />}
                                  classes={{
                                    checked: taskClasses.checked,
                                    root: taskClasses.root,
                                  }}
                                />
                                <p>{moment.unix(item.date).format('DD/MM/YYYY')}</p>
                              </div>
                            );
                          })}
                        </GridContainer>
                      </div>
                      <div class={classes.filterEleContent}>
                        <p className={classes.titleFilter}>{text.txtPickupAddress}</p>
                        <GridContainer>
                          <Card className={classes.gridAddress}>
                            <CardBody>
                              <div
                                className={classes.filterTitleContainer}
                                style={{ flexDirection: 'column' }}>
                                <Button
                                  size="sm"
                                  color="primary"
                                  onClick={() => {
                                    setShowSelectAddress(true);
                                  }}
                                  style={{
                                    width: '45px',
                                    position: 'absolute',
                                    right: 5,
                                    top: 0,
                                  }}>
                                  {text.txtChange}
                                </Button>
                                <p style={{ margin: 0 }}>{selectedAddressShip?.address}</p>
                                <p style={{ margin: 0 }}>{selectedAddressShip?.district}</p>
                                <p style={{ margin: 0 }}>{selectedAddressShip?.city}</p>
                                <p style={{ margin: 0 }}>{selectedAddressShip?.state}</p>
                              </div>
                            </CardBody>
                          </Card>
                        </GridContainer>
                      </div>
                    </CardBody>
                    <CardFooter>
                      <div className={classes.filterFooter}>
                        <Button
                          color="primary"
                          onClick={() => {
                            doReadyToShip();
                          }}>
                          {text.txtOk}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Fade>
              </Modal>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={showSelectAddress}
                onClose={() => setShowSelectAddress(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}>
                <Fade in={showSelectAddress}>
                  <Card className={classes.modalContainer}>
                    <CardHeader color="primary" className={classes.flex + ' ' + classes.jC_sb}>
                      <h4 className={classes.cardTitleWhite}>{text.txtSelectAddress}</h4>
                      <Icon
                        className={classes.btnClose}
                        onClick={() => setShowSelectAddress(false)}>
                        close
                      </Icon>
                    </CardHeader>
                    <CardBody className={classes.modalSelectAddress}>
                      <div class={classes.filterEleContent}>
                        <GridContainer>
                          {listAddress.map((item, index) => {
                            return (
                              <Card
                                className={classes.selectAddressItem}
                                onClick={() => handleSelectAddress(item)}>
                                <CardBody>
                                  <div
                                    className={classes.filterTitleContainer}
                                    style={{ flexDirection: 'column' }}>
                                    <p style={{ margin: 0, maxWidth: '90%' }}>{item?.address}</p>
                                    <p style={{ margin: 0 }}>{item?.district}</p>
                                    <p style={{ margin: 0 }}>{item?.city}</p>
                                    <p style={{ margin: 0 }}>{item?.state}</p>
                                  </div>
                                </CardBody>
                              </Card>
                            );
                          })}
                        </GridContainer>
                      </div>
                    </CardBody>
                  </Card>
                </Fade>
              </Modal>
            </FormControl>
            <FormControl
              className={dashClasses.formControl}
              style={{
                marginRight: isMobile ? '10px' : '165px',
                position: isMobile ? 'static' : 'absolute',
                right: '0',
              }}>
              <Button id="update-label" color="primary" onClick={() => setShowUpdate(true)}>
                {text.txtUpdate}
                <Icon className={classes.btnFilter}>expand_more_outlined</Icon>
              </Button>
              <Poppers
                open={Boolean(showUpdate)}
                anchorEl={showUpdate}
                transition
                disablePortal
                className={
                  classNames({ [classes.popperClose]: !showUpdate }) + ' ' + classes.popperUpdate
                }>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="notification-menu-list-grow"
                    style={{
                      transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                    }}>
                    <Paper>
                      <ClickAwayListener onClickAway={() => handleUpdate()}>
                        <MenuList role="menu">
                          <MenuItem
                            className={classes.dropdownItem}
                            onClick={() => handleShipAllOrder()}>
                            {text.txtUpdateSub1}
                          </MenuItem>
                          <MenuItem className={classes.dropdownItem} onClick={() => handleUpdate()}>
                            {text.txtUpdateSub2}
                          </MenuItem>
                          <MenuItem
                            className={classes.dropdownItem}
                            onClick={() => handlePrintAllOrder()}>
                            {text.txtUpdateSub3}
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Poppers>
            </FormControl>
            <FormControl
              className={dashClasses.formControl}
              style={{
                marginRight: '25px',
                position: isMobile ? 'static' : 'absolute',
                right: '0',
              }}>
              <Button id="update-label" color="green">
                {text.txtExcel}
              </Button>
            </FormControl>
          </div>
        </div>
        <div className={classes.selFilterTitleContainer}>
          <GridContainer>
            {handleFilter && doFilter > 0 && (
              <Button color="primary" size="sm" className={classes.filteTritle}>
                {handleFilter}
              </Button>
            )}
            {tickFilter && doFilter > 0 && (
              <Button color="primary" size="sm" className={classes.filteTritle}>
                {tickFilter}
              </Button>
            )}
            {smartFilter &&
              doFilter > 0 &&
              smartFilter.map((item, index) => {
                return (
                  <Button color="primary" size="sm" className={classes.filteTritle}>
                    {item}
                  </Button>
                );
              })}
          </GridContainer>
        </div>
      </CardBody>
      <CardFooter>
        <div
          className={tableClasses.tableResponsive}
          style={{ marginTop: '0', marginLeft: '20px' }}>
          <Table className={tableClasses.table}>
            {data !== undefined ? (
              <TableHead className={tableClasses['primary' + 'TableHeader']}>
                <TableRow className={tableClasses.tableHeadRow}>
                  <TableCell className={tableClasses.tableCell}>
                    <Checkbox
                      checked={isCheckAll}
                      tabIndex={-1}
                      onClick={() => handleCheckAll()}
                      checkedIcon={<Check className={taskClasses.checkedIcon} />}
                      icon={<Check className={taskClasses.uncheckedIcon} />}
                      classes={{
                        checked: taskClasses.checked,
                        root: taskClasses.root,
                      }}
                    />
                  </TableCell>
                  {text.tableHead.map((prop, key) => {
                    return (
                      <TableCell
                        className={tableClasses.tableCell + ' ' + tableClasses.tableHeadCell}
                        style={{
                          textAlign: key == 2 ? 'center' : 'left',
                          width: key == 4 || key == 0 ? '200px' : null,
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
              {data.map((item, index) => {
                return renderOrder(item, index);
              })}
            </TableBody>
          </Table>
          <div style={{ margin: '15px 0' }}>
            <Pagination count={totalPage} page={currentPage} onChange={handleSelectPage} />
          </div>
          {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={2}
          page={1}
          // onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
        </div>
      </CardFooter>
    </Card>
  );
}

const styles = {
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: '10px',
    color: '#c0c1c2',
    display: 'block',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '260px',
  },
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  txtOrderCode: {
    display: 'block',
    fontSize: '15px !important',
    padding: '0 !important',
    margin: '0 !important',
    marginBottom: '4px !important',
    color: 'rgba(0, 0, 0, 0.87)',
    '&:hover,&:focus': {
      color: primaryColor[0],
    },
  },
  txtOrderInfo: {
    fontSize: '15px !important',
    padding: '0 !important',
    margin: '0 !important',
    marginBottom: '4px !important',
  },
  img: {
    width: '60px',
    height: '60px',
    position: 'absolute',
    borderRadius: '10px',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto',
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardBody: {
    alignItems: 'center',
  },
  selectContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover,&:focus': {
      backgroundColor: primaryColor[3],
    },
    marginLeft: '30px',
    padding: '0 10px',
    borderRadius: '4px',
  },
  selectTitleContainer: {
    alignItems: 'center',
  },
  txtNumTitle: {
    padding: '0 10px',
    backgroundColor: '#f77927',
    borderRadius: '10px',
    color: '#fff',
    marginLeft: '5px',
  },
  searchContainer: {
    margin: '0 !important',
  },
  btnFilter: {
    marginLeft: '5px',
    fontSize: '20px',
  },
  tableTransition: {
    transition: 'height .5s',
  },
  proContainer: {
    display: 'flex',
  },
  statusContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  proInfoContainer: {},
  proImg: {
    width: '65px',
    height: '65px',
    padding: '2px',
    boxShadow: '0 1px 4px 0 rgb(0 0 0 / 14%)',
    borderRadius: '4px',
  },
  iconStatus: {
    marginRight: '5px !important',
  },
  shopImg: {
    width: '15px',
    height: '15px',
    borderRadius: '4px',
    marginRight: '5px',
  },
  shopInfoContainer: {
    display: 'flex',
    marginRight: '20px',
  },
  codeIcon: {
    fontSize: '16px',
    marginRight: '5px',
    color: '#808080',
  },
  txtShopName: {
    padding: '0 !important',
    margin: '0 !important',
    color: '#808080 !important',
  },
  txtMoreTypes: {
    padding: '0 !important',
    margin: '0 !important',
    color: primaryColor[0],
  },
  shopInfoMore: {
    '&:hover,&:focus': {
      backgroundColor: primaryColor[3],
    },
    padding: '0 2px',
    borderRadius: '4px',
  },
  txtLienKet: {
    padding: '1px 3px !important',
    margin: '0 !important',
    marginTop: '4px !important',
    borderRadius: '4px',
    border: '0.5px solid #dbdbdb',
    width: 'fit-content',
    color: '#808080',
    backgroundColor: '#f5f5f5',
    fontSize: '11px !important',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: '40% !important',
    minWidth: '300px !important',
  },
  filterTitleContainer: {
    display: 'flex',
    marginLeft: '20px',
  },
  filterEleContent: {
    justifyContent: 'space-between',
    borderBottom: '1px solid #D2D2D2',
  },
  filterFooter: {
    justifyContent: 'flex-end',
    display: 'flex',
    width: '100%',
  },
  titleFilter: {
    color: primaryColor[0],
  },
  popperNav: {
    zIndex: '1',
    top: 'auto !important',
    left: 'auto !important',
  },
  popperUpdate: {
    marginTop: '55px',
    zIndex: '9',
  },
  dropdownItem: {
    fontSize: '13px',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '2px',
    WebkitTransition: 'all 150ms linear',
    MozTransition: 'all 150ms linear',
    OTransition: 'all 150ms linear',
    MsTransition: 'all 150ms linear',
    transition: 'all 150ms linear',
    display: 'block',
    clear: 'both',
    fontWeight: '400',
    lineHeight: '1.42857143',
    color: '#333',
    whiteSpace: 'nowrap',
    height: 'unset',
    minHeight: 'unset',
    '&:hover': {
      backgroundColor: primaryColor[0],
      color: '#fff',
    },
    '&.Mui-selected': {
      backgroundColor: primaryColor[0],
      color: 'white',
    },
    '&.Mui-selected:hover': {
      backgroundColor: primaryColor[0],
      color: 'white',
    },
  },
  selFilterTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '40px',
    marginTop: '15px',
  },
  filteTritle: {
    marginRight: '10px !important',
  },
  select: {
    '&:before': {
      borderColor: '#D2D2D2 !important',
    },
    '&:after': {
      borderColor: primaryColor[0],
    },
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jC_sb: {
    justifyContent: 'space-between',
  },
  btnClose: {
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 1px 4px 0 rgb(0 0 0 / 14%)',
    },
  },
  gridAddress: {
    margin: '0 15px !important',
  },
  selectAddressItem: {
    margin: '15px !important',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: primaryColor[0],
      color: '#fff',
    },
  },
  modalSelectAddress: {
    height: '700px',
    overflowY: 'auto',
  },
};

OrderPage.layout = Admin;

export default WithAuthentication(OrderPage);
