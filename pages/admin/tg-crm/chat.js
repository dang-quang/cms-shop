import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { Bar } from 'react-chartjs-2';
import {
  primaryColor,
  whiteColor,
  blackColor,
  hexToRgb,
  successColor,
  infoColor,
  orangeColor,
} from 'assets/jss/natcash.js';
import classNames from 'classnames';
// layout for this page
import Admin from 'layouts/Admin.js';
// core components
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import { useRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Search';
import dashStyles from 'assets/jss/natcash/views/dashboardStyle.js';
import Link from 'next/link';
import moment from 'moment';
import Icon from '@material-ui/core/Icon';
import {
  Modal,
  Tab,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tooltip,
} from '@material-ui/core';
import { formatCurrency, formatNumber } from '../../../utilities/utils';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import {
  AssignmentOutlined,
  CameraAlt,
  Chat,
  CheckBoxOutlined,
  CheckCircleOutline,
  CheckOutlined,
  Close,
  CloseOutlined,
  DateRangeOutlined,
  ExitToAppOutlined,
  GroupOutlined,
  HourglassEmptyOutlined,
  Image,
  Info,
  LibraryBooksOutlined,
  LocalOfferOutlined,
  LocalShippingOutlined,
  LocationOnOutlined,
  MonetizationOnOutlined,
  MoneyOffOutlined,
  Reply,
  ReplyOutlined,
  SaveAltOutlined,
  SendOutlined,
  ShareOutlined,
  ShoppingBasketOutlined,
  ShoppingCartOutlined,
  StoreOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@material-ui/icons';
import CustomInput from 'components/CustomInput/CustomInput.js';
import tableStyles from 'assets/jss/natcash/components/tableStyle.js';
import taskStyles from 'assets/jss/natcash/components/tasksStyle.js';
import Checkbox from '@material-ui/core/Checkbox';
import Check from '@material-ui/icons/Check';
import adminStyles from 'assets/jss/natcash/components/headerLinksStyle.js';
import { SHOW_SIDEBAR } from '../../../redux/actions/app';
import customerAva from 'assets/img/customer-ava.png';
import customerAvaWhite from 'assets/img/customer-ava-white.png';
import defaultSticker from 'assets/img/default-sticker.png';
import { dangerColor, grayColor } from '../../../assets/jss/natcash';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField, InputBase } from '@material-ui/core';
import CustomDropdown from '../../../components/CustomDropdown/CustomDropdown';
import NavPills from '../../../components/NavPills/NavPills';
import headerStyles from 'assets/jss/natcash/components/headerLinksStyle.js';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Poppers from '@material-ui/core/Popper';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import DateFnsUtils from '@date-io/date-fns';
import vi from 'date-fns/locale/vi';

function ChatPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const useTableStyles = makeStyles(tableStyles);
  const tableClasses = useTableStyles();
  const useAdminStyles = makeStyles(adminStyles);
  const adminClasses = useAdminStyles();
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();
  const useHeaderStyles = makeStyles(headerStyles);
  const headerClasses = useHeaderStyles();
  const [selectedMess, setSelectedMess] = useState('');
  const [showImage, setShowImage] = useState(null);
  const messageEl = useRef(null);
  const inputFile = useRef(null);
  const CARD_TITLE = [
    {
      id: 'en',
      value: ['Order', 'Canceled order', 'Advertisement', 'Product', 'Buyer'],
    },
    {
      id: 'vi',
      value: ['Đơn hàng', 'Đơn hủy', 'Quảng cáo', 'Sản phẩm', 'Người mua'],
    },
  ];
  const SHOP_TITLE = [
    {
      id: 'en',
      value: [
        { title: 'Revenue', icon: MonetizationOnOutlined },
        { title: 'Order', icon: ShoppingCartOutlined },
        { title: 'Product', icon: ShoppingBasketOutlined },
        { title: 'Total buyer', icon: GroupOutlined },
        { title: 'Access', icon: ExitToAppOutlined },
        { title: 'View', icon: VisibilityOutlined },
        { title: 'Unreplied message', icon: ReplyOutlined },
        { title: 'Unseen message', icon: VisibilityOffOutlined },
        { title: 'Canceled order', icon: CloseOutlined },
        { title: 'Total value canceled order', icon: MoneyOffOutlined },
      ],
    },
    {
      id: 'vi',
      value: [
        { title: 'Doanh thu', icon: MonetizationOnOutlined },
        { title: 'Đơn hàng', icon: ShoppingCartOutlined },
        { title: 'Sản phẩm', icon: ShoppingBasketOutlined },
        { title: 'Tổng người mua', icon: GroupOutlined },
        { title: 'Lượt truy cập', icon: ExitToAppOutlined },
        { title: 'Lượt xem', icon: VisibilityOutlined },
        { title: 'Tin nhắn chưa trả lời', icon: ReplyOutlined },
        { title: 'Tin nhắn chưa đọc', icon: VisibilityOffOutlined },
        { title: 'Đơn hủy', icon: CloseOutlined },
        { title: 'Tổng giá trị đơn hủy', icon: MoneyOffOutlined },
      ],
    },
  ];

  const [conversation, setConversation] = useState([
    {
      shop_avatar:
        'https://vcdn.tikicdn.com/ts/seller/69/a7/af/7819d91ef5987c1cc5952c147e870c00.jpg',
      tag: {
        name: 'Khách quen',
        color: primaryColor[0],
      },
      to_location: 'TP. Hồ Chí Minh',
      finish_order: 2,
      finish_order_value: 205330,
      process_order: 1,
      process_order_value: 1093000,
      conversation_id: '38732689394223980',
      to_id: 9030508,
      to_name: 'tsx_buyer1003',
      to_avatar: '',
      shop_id: 7459434,
      unread_count: 0,
      pinned: false,
      last_read_message_id: '2064780411604648076',
      latest_message_id: '2064780411604648076',
      latest_message_type: 'text',
      latest_message_content: {
        text: 'Sao em ko đặt được hàng shop nhỉ?',
      },
      latest_message_from_id: 9030508,
      last_message_timestamp: 1614853200441470571,
      last_message_option: 16512,
      max_general_option_hide_time: '9223372036854775',
    },
    {
      shop_avatar:
        'https://vcdn.tikicdn.com/ts/seller/69/a7/af/7819d91ef5987c1cc5952c147e870c00.jpg',
      to_location: 'Bắc Ninh',
      finish_order: 2,
      finish_order_value: 205330,
      process_order: 0,
      process_order_value: 0,
      conversation_id: '38732690586147679',
      to_id: 1200954207,
      to_name: 'testsgymt.sg',
      to_avatar: '',
      shop_id: 7459434,
      unread_count: 0,
      pinned: false,
      last_read_message_id: '2063269119293227148',
      latest_message_id: '2063269119293227148',
      latest_message_type: 'product',
      latest_message_content: null,
      latest_message_from_id: 1200954207,
      last_message_timestamp: 1614132560106927110,
      last_message_option: 0,
      max_general_option_hide_time: '9223372036854775',
    },
    {
      shop_avatar:
        'https://vcdn.tikicdn.com/ts/seller/69/a7/af/7819d91ef5987c1cc5952c147e870c00.jpg',
      tag: {
        name: 'Đã mua',
        color: successColor[0],
      },
      to_location: 'TP. Hồ Chí Minh',
      finish_order: 2,
      finish_order_value: 205330,
      process_order: 1,
      process_order_value: 1093000,
      conversation_id: '2234662903192365',
      to_id: 520298,
      to_name: 'wnnsgseller1',
      to_avatar: 'https://cf.shopee.sg/file/0375cad334948af20f1840e1b89d3183',
      shop_id: 7459434,
      unread_count: 0,
      pinned: false,
      last_read_message_id: '2062815381336178828',
      latest_message_id: '2062815381336178828',
      latest_message_type: 'text',
      latest_message_content: {
        text: 'Cảm ơn shop',
      },
      latest_message_from_id: 9018157,
      last_message_timestamp: 1613916200989929976,
      last_message_option: 0,
      max_general_option_hide_time: '9223372036854775',
    },
    {
      shop_avatar:
        'https://vcdn.tikicdn.com/ts/seller/69/a7/af/7819d91ef5987c1cc5952c147e870c00.jpg',
      to_location: 'TP. Hồ Chí Minh',
      finish_order: 2,
      finish_order_value: 205330,
      process_order: 1,
      process_order_value: 1093000,
      conversation_id: '38732690586055680',
      to_id: 1200862208,
      to_name: 'ymtsg01',
      to_avatar: '',
      shop_id: 7459434,
      unread_count: 0,
      pinned: false,
      last_read_message_id: '2060581150381916300',
      latest_message_id: '2060581150381916300',
      latest_message_type: 'video',
      latest_message_content: null,
      latest_message_from_id: 1200862208,
      last_message_timestamp: 1612850836649659784,
      last_message_option: 0,
      max_general_option_hide_time: '9223372036854775',
    },
    {
      shop_avatar:
        'https://vcdn.tikicdn.com/ts/seller/69/a7/af/7819d91ef5987c1cc5952c147e870c00.jpg',
      to_location: 'Hà Nội',
      finish_order: 1,
      finish_order_value: 205330,
      process_order: 0,
      process_order_value: 0,
      conversation_id: '38732689394223977',
      to_id: 9030505,
      to_name: 'tsx_buyer1000',
      to_avatar: 'https://cf.shopee.sg/file/3b615d321fd7c5abeefe7d158bb192af',
      shop_id: 7459434,
      unread_count: 8,
      pinned: false,
      last_read_message_id: '2052121489177706636',
      latest_message_id: '2060458778819657868',
      latest_message_type: 'text',
      latest_message_content: {
        text: 'thanks shop',
      },
      latest_message_from_id: 9030505,
      last_message_timestamp: 1629878498343461649,
      last_message_option: 0,
      max_general_option_hide_time: '9223372036854775',
    },
  ]);
  const [messData, setMessData] = useState([
    {
      message_id: '2064918473403891852',
      from_id: 9018093,
      to_shop_id: 7459434,
      message_type: 'text',
      content: {
        text: 'Hello shop👨‍👩‍👧‍👦',
      },
      conversation_id: '38732414516304685',
      created_timestamp: 1614919033,
      region: 'SG',
      status: 'normal',
      message_option: 0,
      source: 'openapi',
    },
    {
      message_id: '2064918473403891852',
      from_id: 9018093,
      to_shop_id: 7459434,
      message_type: 'text',
      content: {
        text: 'Mình hỏi chút',
      },
      conversation_id: '38732414516304685',
      created_timestamp: 1614919033,
      region: 'SG',
      status: 'normal',
      message_option: 0,
      source: 'openapi',
    },
    {
      message_id: '2064918409346367628',
      to_id: 9018157,
      from_shop_id: 7459370,
      message_type: 'text',
      content: {
        text: 'Chào bạn, shop giúp gì được cho bạn ạ?',
      },
      conversation_id: '38732414516304685',
      created_timestamp: 1614919002,
      region: 'SG',
      status: 'normal',
      message_option: 0,
      source: 'openapi',
    },
    {
      message_id: '2064917973646262412',
      to_id: 9018157,
      from_shop_id: 7459370,
      message_type: 'image',
      content: {
        url: 'https://media.shoptretho.com.vn/upload/image/brand/20190617/khai-truong-le-van-viet.png',
        file_server_id: 0,
      },
      conversation_id: '38732414516304685',
      created_timestamp: 1614918795,
      region: 'SG',
      status: 'normal',
      message_option: 0,
      source: 'openapi',
    },
    {
      message_id: '2065664455783563404',
      from_id: 9030508,
      to_shop_id: 7459434,
      message_type: 'item',
      content: {
        shop_id: 7459434,
        item_id: 3400023141,
        item_name: 'Sữa Morinaga Kodomil số 3 hương vani',
        item_img: 'https://cf.shopee.vn/file/b0d8dc6ee5f7f6b7610aaf86f8e54862',
        item_sku: 'SUA-0932',
        item_price: 320000,
      },
      conversation_id: '38732689394223980',
      created_timestamp: 1615274745,
      region: 'SG',
      status: 'normal',
      message_option: 0,
      source: 'openapi',
    },
    {
      message_id: '2064918473403891852',
      from_id: 9018093,
      to_shop_id: 7459434,
      message_type: 'text',
      content: {
        text: 'Sản phẩm này còn ko ạ?',
      },
      conversation_id: '38732414516304685',
      created_timestamp: 1614919033,
      region: 'SG',
      status: 'normal',
      message_option: 0,
      source: 'openapi',
    },
    {
      message_id: '2064918409346367628',
      to_id: 9018157,
      from_shop_id: 7459370,
      message_type: 'text',
      content: {
        text: 'Dạ shop còn hàng bạn nhé. Bạn đặt hàng luôn đi ạ!',
      },
      conversation_id: '38732414516304685',
      created_timestamp: 1614919002,
      region: 'SG',
      status: 'normal',
      message_option: 0,
      source: 'openapi',
    },
    {
      message_id: '2065662871859183756',
      from_id: 9018157,
      to_shop_id: 7459370,
      message_type: 'order',
      content: {
        shop_id: 7459434,
        order_sn: '20090750D6VT5A',
        order_status: 'Chờ lấy hàng',
        total_amount: 450000,
        item_img: 'https://cf.shopee.vn/file/b0d8dc6ee5f7f6b7610aaf86f8e54862',
      },
      conversation_id: '38732414516304685',
      created_timestamp: 1615273990,
      region: 'SG',
      status: 'normal',
      message_option: 6464,
      source: 'openapi',
    },
    {
      message_id: '2064918409346367628',
      to_id: 9018157,
      from_shop_id: 7459370,
      message_type: 'text',
      content: {
        text: 'Ok bạn hiền',
      },
      conversation_id: '38732414516304685',
      created_timestamp: 1614919002,
      region: 'SG',
      status: 'normal',
      message_option: 0,
      source: 'openapi',
    },
    {
      message_id: '2064918409346367628',
      to_id: 9018157,
      from_shop_id: 7459370,
      message_type: 'sticker',
      content: {
        sticker_id: '0002',
        sticker_package_id: 'xiaoyun1612780154',
      },
      conversation_id: '38732414516304685',
      created_timestamp: 1614919002,
      region: 'SG',
      status: 'normal',
      message_option: 0,
      source: 'openapi',
    },
  ]);
  const [listOrder, setListOrder] = useState([
    {
      shop_name: 'STTMN',
      shop_icon:
        'https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png',
      actual_shipping_fee: 0,
      actual_shipping_fee_confirmed: false,
      buyer_cancel_reason: '',
      buyer_cpf_id: null,
      buyer_user_id: 9193214,
      buyer_username: 'local_apitest.my',
      cancel_by: 'system',
      cancel_reason: 'BACKEND_LOGISTICS_NOT_STARTED',
      cod: false,
      create_time: 1607930885,
      credit_card_number: '',
      currency: 'MYR',
      days_to_ship: 2,
      dropshipper: '',
      dropshipper_phone: '',
      estimated_shipping_fee: 4,
      fulfillment_flag: null,
      goods_to_declare: false,
      item_list: [
        {
          item_id: 2600144043,
          item_img: 'https://cf.shopee.vn/file/89e11aec4508fe5e78197fae5d169894',
          item_name: 'Sữa bột trẻ em demo',
          item_sku: 'sku',
          model_id: 0,
          model_name: '',
          model_sku: '',
          model_quantity_purchased: 1,
          model_original_price: 1000,
          model_discounted_price: 1000,
          wholesale: false,
          weight: 1,
          add_on_deal: false,
          main_item: false,
          add_on_deal_id: 0,
          promotion_type: '',
          promotion_id: 0,
          order_item_id: 2600144043,
          promotion_group_id: 0,
        },
        {
          item_img: 'https://cf.shopee.vn/file/89e11aec4508fe5e78197fae5d169894',
          item_id: 2600144043,
          item_name: 'Bỉm trẻ em size L',
          item_sku: 'sku',
          model_id: 0,
          model_name: '',
          model_sku: '',
          model_quantity_purchased: 1,
          model_original_price: 1000,
          model_discounted_price: 1000,
          wholesale: false,
          weight: 1,
          add_on_deal: false,
          main_item: false,
          add_on_deal_id: 0,
          promotion_type: '',
          promotion_id: 0,
          order_item_id: 2600144043,
          promotion_group_id: 0,
        },
      ],
      message_to_seller: '',
      note: '',
      note_update_time: 0,
      order_sn: '201214JASXYXY6',
      order_status: 'Giao thành công',
      package_list: [
        {
          package_number: '61630084074470',
          logistics_status: 'Giao thành công',
          shipping_carrier: 'Standard Delivery',
          item_list: [
            {
              item_id: 2600144043,
              model_id: 0,
            },
          ],
        },
      ],
      pay_time: 1607930885,
      payment_method: 'Bank Transfer',
      pickup_done_time: 0,
      recipient_address: {
        name: 'Oc cho Hoang',
        phone: '60107777779',
        town: '',
        district: '',
        city: 'Asajaya',
        state: 'Sarawak',
        region: 'MY',
        zipcode: '40009',
        full_address: '',
      },
      region: 'MY',
      ship_by_date: 1608103685,
      shipping_carrier: 'Standard Delivery',
      split_up: false,
      total_amount: 1004,
      update_time: 1608134691,
      finish_time: 1608103685,
      money_data: [2300000, 24500000, 3000, 0, 0, 400, 17200, 0],
    },
    {
      shop_name: 'STTMN',
      shop_icon:
        'https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png',
      actual_shipping_fee: 0,
      actual_shipping_fee_confirmed: false,
      buyer_cancel_reason: '',
      buyer_cpf_id: null,
      buyer_user_id: 9193214,
      buyer_username: 'local_apitest.my',
      cancel_by: 'system',
      cancel_reason: 'BACKEND_LOGISTICS_NOT_STARTED',
      cod: false,
      create_time: 1607930885,
      credit_card_number: '',
      currency: 'MYR',
      days_to_ship: 2,
      dropshipper: '',
      dropshipper_phone: '',
      estimated_shipping_fee: 4,
      fulfillment_flag: null,
      goods_to_declare: false,
      item_list: [
        {
          item_id: 2600144043,
          item_img: 'https://cf.shopee.vn/file/89e11aec4508fe5e78197fae5d169894',
          item_name: 'Sữa bột trẻ em demo',
          item_sku: 'sku',
          model_id: 0,
          model_name: '',
          model_sku: '',
          model_quantity_purchased: 1,
          model_original_price: 1000,
          model_discounted_price: 1000,
          wholesale: false,
          weight: 1,
          add_on_deal: false,
          main_item: false,
          add_on_deal_id: 0,
          promotion_type: '',
          promotion_id: 0,
          order_item_id: 2600144043,
          promotion_group_id: 0,
        },
        {
          item_img: 'https://cf.shopee.vn/file/89e11aec4508fe5e78197fae5d169894',
          item_id: 2600144043,
          item_name: 'Bỉm trẻ em size L',
          item_sku: 'sku',
          model_id: 0,
          model_name: '',
          model_sku: '',
          model_quantity_purchased: 1,
          model_original_price: 1000,
          model_discounted_price: 1000,
          wholesale: false,
          weight: 1,
          add_on_deal: false,
          main_item: false,
          add_on_deal_id: 0,
          promotion_type: '',
          promotion_id: 0,
          order_item_id: 2600144043,
          promotion_group_id: 0,
        },
      ],
      message_to_seller: '',
      note: '',
      note_update_time: 0,
      order_sn: '201214JASXYXY6',
      order_status: 'Chờ lấy hàng',
      package_list: [
        {
          package_number: '61630084074470',
          logistics_status: 'Giao thành công',
          shipping_carrier: 'Standard Delivery',
          item_list: [
            {
              item_id: 2600144043,
              model_id: 0,
            },
          ],
        },
      ],
      pay_time: 1607930885,
      payment_method: 'Bank Transfer',
      pickup_done_time: 0,
      recipient_address: {
        name: 'Oc cho Hoang',
        phone: '60107777779',
        town: '',
        district: '',
        city: 'Asajaya',
        state: 'Sarawak',
        region: 'MY',
        zipcode: '40009',
        full_address: '',
      },
      region: 'MY',
      ship_by_date: 1608103685,
      shipping_carrier: 'Standard Delivery',
      split_up: false,
      total_amount: 1004,
      update_time: 1608134691,
      money_data: [2300000, 24500000, 3000, 0, 0, 400, 17200, 0],
    },
  ]);

  const [listProduct, setListProduct] = useState([
    {
      shop_name: 'STTMN',
      shop_icon:
        'https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png',
      is_connect: false,
      item_id: 138346,
      category_id: 100991,
      item_name: 'Sữa Morinaga Kodomil số 3 hương vani',
      description:
        '- Thành phần: toferrin nhằm tăng cường sức đề kháng cho trẻ.\n\n- Kodomil bổ sung thành phần lợi khuẩn',
      item_sku: 'SU-1004',
      create_time: 1629274395,
      update_time: 1629514738,
      attribute_list: [
        {
          attribute_id: 100010,
          original_attribute_name: 'Shelf Life',
          is_mandatory: false,
          attribute_value_list: [
            {
              value_id: 580,
              original_value_name: '6 Months',
              value_unit: '',
            },
          ],
        },
        {
          attribute_id: 100016,
          original_attribute_name: 'Pack Type',
          is_mandatory: false,
          attribute_value_list: [
            {
              value_id: 374,
              original_value_name: 'Bundle',
              value_unit: '',
            },
          ],
        },
        {
          attribute_id: 100125,
          original_attribute_name: 'Baby Life Stage',
          is_mandatory: false,
          attribute_value_list: [
            {
              value_id: 1086,
              original_value_name: 'Growing-Up Milk (3+ years)',
              value_unit: '',
            },
          ],
        },
        {
          attribute_id: 100135,
          original_attribute_name: 'Recommended Age',
          is_mandatory: true,
          attribute_value_list: [
            {
              value_id: 5566,
              original_value_name: '>=2 years old',
              value_unit: '',
            },
          ],
        },
      ],
      image: {
        image_url_list: [
          'https://cf.shopee.vn/file/b0d8dc6ee5f7f6b7610aaf86f8e54862',
          'https://cf.shopee.vn/file/f7395e32bea70e428f181626f8bc24d4',
        ],
        image_id_list: ['b0d8dc6ee5f7f6b7610aaf86f8e54862', 'f7395e32bea70e428f181626f8bc24d4'],
      },
      weight: '0.850',
      dimension: {
        package_length: 0,
        package_width: 0,
        package_height: 0,
      },
      logistic_info: [
        {
          logistic_id: 50018,
          logistic_name: 'J&T Express',
          enabled: true,
          is_free: false,
        },
        {
          logistic_id: 50010,
          logistic_name: 'Viettel Post',
          enabled: true,
          is_free: false,
        },
      ],
      pre_order: {
        is_pre_order: false,
        days_to_ship: 2,
      },
      condition: 'NEW',
      size_chart: '',
      item_status: 'NORMAL',
      has_model: true,
      brand: {
        brand_id: 1140462,
        original_brand_name: 'morigana',
      },
      item_dangerous: 0,
      model_data: {
        tier_variation: [
          {
            name: 'Trọng lượng',
            option_list: [
              {
                option: '850g',
              },
              {
                option: '600g',
              },
            ],
          },
          {
            name: 'Hạn sử dụng',
            option_list: [
              {
                option: '6 tháng',
              },
              {
                option: '12 tháng',
              },
            ],
          },
        ],
        model: [
          {
            model_id: 256314,
            promotion_id: 0,
            tier_index: [1, 1],
            stock_info: [
              {
                stock_type: 2,
                current_stock: 54,
                normal_stock: 54,
                reserved_stock: 0,
              },
              {
                stock_type: 1,
                current_stock: 0,
                normal_stock: 0,
                reserved_stock: 0,
              },
            ],
            price_info: [
              {
                current_price: 300000,
                original_price: 300000,
                inflated_price_of_current_price: 300000,
                inflated_price_of_original_price: 300000,
              },
            ],
            model_sku: 'SU-60012',
            order: 3,
            sales: 1800000,
          },
          {
            model_id: 256315,
            promotion_id: 0,
            tier_index: [0, 0],
            stock_info: [
              {
                stock_type: 2,
                current_stock: 32,
                normal_stock: 32,
                reserved_stock: 0,
              },
              {
                stock_type: 1,
                current_stock: 0,
                normal_stock: 0,
                reserved_stock: 0,
              },
            ],
            price_info: [
              {
                current_price: 340000,
                original_price: 340000,
                inflated_price_of_current_price: 340000,
                inflated_price_of_original_price: 340000,
              },
            ],
            model_sku: 'SU-85006',
            order: 5,
            sales: 1500000,
            status: false,
          },
          {
            model_id: 256316,
            promotion_id: 0,
            tier_index: [0, 1],
            stock_info: [
              {
                stock_type: 2,
                current_stock: 75,
                normal_stock: 75,
                reserved_stock: 0,
              },
              {
                stock_type: 1,
                current_stock: 0,
                normal_stock: 0,
                reserved_stock: 0,
              },
            ],
            price_info: [
              {
                current_price: 400000,
                original_price: 400000,
                inflated_price_of_current_price: 400000,
                inflated_price_of_original_price: 400000,
              },
            ],
            model_sku: 'SU-85012',
            order: 2,
            sales: 1000000,
          },
          {
            model_id: 256317,
            promotion_id: 0,
            tier_index: [1, 0],
            stock_info: [
              {
                stock_type: 2,
                current_stock: 12,
                normal_stock: 12,
                reserved_stock: 0,
              },
              {
                stock_type: 1,
                current_stock: 0,
                normal_stock: 0,
                reserved_stock: 0,
              },
            ],
            price_info: [
              {
                current_price: 250000,
                original_price: 250000,
                inflated_price_of_current_price: 250000,
                inflated_price_of_original_price: 250000,
              },
            ],
            model_sku: 'SU-60006',
            order: 3,
            sales: 1200000,
          },
        ],
      },
      order: 15,
      sales: 4300000,
      stock_info: [
        {
          stock_type: 2,
          current_stock: 322,
          normal_stock: 322,
          reserved_stock: 0,
        },
      ],
      price_info: {
        from_price: 45000,
        to_price: 75000,
      },
      sold_count: 30,
    },
    {
      shop_name: 'STTMN',
      shop_icon:
        'https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png',
      is_connect: true,
      item_id: 138348,
      category_id: 101001,
      item_name: 'Tã - bỉm quần Moony M58',
      description: 'Thiết kếdịu nhẹ mềm mại mà còn cho tự nhiên, từ đó tránh hăm bí khi mặc tã.',
      item_sku: 'BIM-09321',
      create_time: 1629274866,
      update_time: 1629279638,
      price_info: [
        {
          currency: 'VND',
          original_price: 430000,
          current_price: 430000,
        },
      ],
      stock_info: [
        {
          stock_type: 2,
          current_stock: 123,
          normal_stock: 123,
          reserved_stock: 0,
        },
      ],
      image: {
        image_url_list: [
          'https://cf.shopee.vn/file/89e11aec4508fe5e78197fae5d169894',
          'https://cf.shopee.vn/file/3662b6b384af6884a33b793289b1ad46',
        ],
        image_id_list: ['89e11aec4508fe5e78197fae5d169894', '3662b6b384af6884a33b793289b1ad46'],
      },
      weight: '0.500',
      dimension: {
        package_length: 0,
        package_width: 0,
        package_height: 0,
      },
      logistic_info: [
        {
          logistic_id: 50018,
          logistic_name: 'J&T Express',
          enabled: true,
          is_free: false,
        },
        {
          logistic_id: 50010,
          logistic_name: 'Viettel Post',
          enabled: true,
          is_free: false,
        },
      ],
      pre_order: {
        is_pre_order: false,
        days_to_ship: 2,
      },
      condition: 'NEW',
      size_chart: '',
      item_status: 'NORMAL',
      has_model: false,
      promotion_id: 0,
      brand: {
        brand_id: 1125291,
        original_brand_name: 'Goo.n',
      },
      item_dangerous: 0,
      order: 12,
      status: true,
      sold_count: 30,
    },
    {
      shop_name: 'STTMN',
      shop_icon:
        'https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png',
      is_connect: true,
      item_id: 138348,
      category_id: 101001,
      item_name: 'Tã - bỉm quần Moony M58',
      description: 'Thiết kếdịu nhẹ mềm mại mà còn cho tự nhiên, từ đó tránh hăm bí khi mặc tã.',
      item_sku: 'BIM-09321',
      create_time: 1629274866,
      update_time: 1629279638,
      price_info: [
        {
          currency: 'VND',
          original_price: 430000,
          current_price: 430000,
        },
      ],
      stock_info: [
        {
          stock_type: 2,
          current_stock: 123,
          normal_stock: 123,
          reserved_stock: 0,
        },
      ],
      image: {
        image_url_list: [
          'https://cf.shopee.vn/file/89e11aec4508fe5e78197fae5d169894',
          'https://cf.shopee.vn/file/3662b6b384af6884a33b793289b1ad46',
        ],
        image_id_list: ['89e11aec4508fe5e78197fae5d169894', '3662b6b384af6884a33b793289b1ad46'],
      },
      weight: '0.500',
      dimension: {
        package_length: 0,
        package_width: 0,
        package_height: 0,
      },
      logistic_info: [
        {
          logistic_id: 50018,
          logistic_name: 'J&T Express',
          enabled: true,
          is_free: false,
        },
        {
          logistic_id: 50010,
          logistic_name: 'Viettel Post',
          enabled: true,
          is_free: false,
        },
      ],
      pre_order: {
        is_pre_order: false,
        days_to_ship: 2,
      },
      condition: 'NEW',
      size_chart: '',
      item_status: 'NORMAL',
      has_model: false,
      promotion_id: 0,
      brand: {
        brand_id: 1125291,
        original_brand_name: 'Goo.n',
      },
      item_dangerous: 0,
      order: 12,
      status: true,
      sold_count: 30,
    },
    {
      shop_name: 'STTMN',
      shop_icon:
        'https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png',
      is_connect: true,
      item_id: 138348,
      category_id: 101001,
      item_name: 'Tã - bỉm quần Moony M58',
      description: 'Thiết kếdịu nhẹ mềm mại mà còn cho tự nhiên, từ đó tránh hăm bí khi mặc tã.',
      item_sku: 'BIM-09321',
      create_time: 1629274866,
      update_time: 1629279638,
      price_info: [
        {
          currency: 'VND',
          original_price: 430000,
          current_price: 430000,
        },
      ],
      stock_info: [
        {
          stock_type: 2,
          current_stock: 123,
          normal_stock: 123,
          reserved_stock: 0,
        },
      ],
      image: {
        image_url_list: [
          'https://cf.shopee.vn/file/89e11aec4508fe5e78197fae5d169894',
          'https://cf.shopee.vn/file/3662b6b384af6884a33b793289b1ad46',
        ],
        image_id_list: ['89e11aec4508fe5e78197fae5d169894', '3662b6b384af6884a33b793289b1ad46'],
      },
      weight: '0.500',
      dimension: {
        package_length: 0,
        package_width: 0,
        package_height: 0,
      },
      logistic_info: [
        {
          logistic_id: 50018,
          logistic_name: 'J&T Express',
          enabled: true,
          is_free: false,
        },
        {
          logistic_id: 50010,
          logistic_name: 'Viettel Post',
          enabled: true,
          is_free: false,
        },
      ],
      pre_order: {
        is_pre_order: false,
        days_to_ship: 2,
      },
      condition: 'NEW',
      size_chart: '',
      item_status: 'NORMAL',
      has_model: false,
      promotion_id: 0,
      brand: {
        brand_id: 1125291,
        original_brand_name: 'Goo.n',
      },
      item_dangerous: 0,
      order: 12,
      status: true,
      sold_count: 30,
    },
  ]);
  const [listVoucher, setListVoucher] = useState([
    {
      voucher_img: 'https://cf.shopee.vn/file/89e11aec4508fe5e78197fae5d169894',
      voucher_id: 1,
      voucher_code: 'MKTSTEST',
      voucher_name: 'testte',
      voucher_type: 1,
      reward_type: 1,
      usage_quantity: 1,
      current_usage: 0,
      start_time: 1622206196,
      end_time: 1622209796,
      is_admin: false,
      voucher_purpose: 0,
      discount_amount: 50000,
      min_basket_price: '1500000',
    },
    {
      voucher_img: 'https://cf.shopee.vn/file/89e11aec4508fe5e78197fae5d169894',
      voucher_id: 1,
      voucher_code: 'MKTSTEST',
      voucher_name: 'testte',
      voucher_type: 1,
      reward_type: 1,
      usage_quantity: 1,
      current_usage: 0,
      start_time: 1622206196,
      end_time: 1622209796,
      is_admin: false,
      voucher_purpose: 0,
      discount_amount: 11000,
      min_basket_price: '1500000',
    },
    {
      voucher_img: 'https://cf.shopee.vn/file/89e11aec4508fe5e78197fae5d169894',
      voucher_id: 1,
      voucher_code: 'MKTSTEST',
      voucher_name: 'testte',
      voucher_type: 1,
      reward_type: 1,
      usage_quantity: 1,
      current_usage: 0,
      start_time: 1622206196,
      end_time: 1622209796,
      is_admin: false,
      voucher_purpose: 0,
      discount_amount: 11000,
      min_basket_price: '1500000',
    },
    {
      voucher_img: 'https://cf.shopee.vn/file/89e11aec4508fe5e78197fae5d169894',
      voucher_id: 1,
      voucher_code: 'MKTSTEST',
      voucher_name: 'testte',
      voucher_type: 1,
      reward_type: 1,
      usage_quantity: 1,
      current_usage: 0,
      start_time: 1622206196,
      end_time: 1622209796,
      is_admin: false,
      voucher_purpose: 0,
      discount_amount: 11000,
      min_basket_price: '1500000',
    },
  ]);
  const [filterMess, setFilterMess] = useState(null);
  const [listCheckedProduct, setListCheckedProduct] = useState([]);
  const [listCheckedStatus, setListCheckedStatus] = useState([]);
  const [listCheckedTag, setListCheckedTag] = useState([]);
  const [listCheckedShop, setListCheckedShop] = useState([]);
  const [timeFilterFrom, setTimeFilterFrom] = useState(moment().format());
  const [timeFilterTo, setTimeFilterTo] = useState(moment().format());
  const [listShop, setListShop] = useState([
    { id: 1, name: 'shoptrethomiennam' },
    { id: 2, name: 'anlababy' },
    { id: 3, name: 'shoptretho_official' },
  ]);
  const LAST_MESS_TYPE = [
    { id: 'en', value: ['Sent a product', 'Sent a video', 'Sent an image'] },
    {
      id: 'vi',
      value: ['Đã gửi một sản phẩm', 'Đã gửi một video', 'Đã gửi một hình ảnh'],
    },
  ];
  const [listTag, setListTag] = useState([
    { name: 'Khách quen', color: primaryColor[0] },
    { name: 'Đã mua', color: successColor[0] },
    { name: 'Chưa mua', color: dangerColor[0] },
  ]);
  const MESS_FILTER = [
    { id: 'seen', icon: VisibilityOffOutlined, isMore: false },
    { id: 'share', icon: Reply, isMore: false },
    { id: 'status', icon: AssignmentOutlined, isMore: true },
    { id: 'tag', icon: LocalOfferOutlined, isMore: true },
    { id: 'shop', icon: StoreOutlined, isMore: true },
    { id: 'time', icon: DateRangeOutlined, isMore: true },
    { id: 'close', icon: Close, isMore: false },
  ];
  const SELECT_DATA = [
    { id: 'en', value: ['All order', 'Confirmed order', 'Inprogress order'] },
    {
      id: 'vi',
      value: ['Tất cả đơn hàng', 'Đơn đã xác nhận', 'Đơn chưa xác nhận'],
    },
  ];
  const FILTER_TIME = [
    {
      id: 'en',
      value: [
        { title: 'To 2 PM today', value: 1 },
        { title: 'To 9 PM today', value: 2 },
        { title: 'From start of the day till now', value: 3 },
      ],
    },
    {
      id: 'vi',
      value: [
        { title: 'Tới 14h hôm nay', value: 1 },
        { title: 'Tới 21h hôm nay', value: 2 },
        { title: 'Từ đầu ngày đến bây giờ', value: 3 },
      ],
    },
  ];
  const FILTER_STATUS = [
    {
      id: 'en',
      value: [
        { title: 'All order', value: 1 },
        { title: 'Confirmed order', value: 2 },
      ],
    },
    {
      id: 'vi',
      value: [
        { title: 'Tất cả đơn hàng', value: 1 },
        { title: 'Đơn đã xác nhận', value: 2 },
      ],
    },
  ];
  const FILTER_DATA_TITLE = [
    {
      id: 'en',
      value: ['Revenue', 'Order', 'Conversion rate', 'Revenue/order', 'Access', 'View'],
    },
    {
      id: 'vi',
      value: [
        'Doanh thu',
        'Đơn hàng',
        'Tỷ lệ chuyển đổi',
        'Doanh thu/đơn',
        'Lượt truy cập',
        'Lượt xem',
      ],
    },
  ];
  const UTILS_TAB = [
    {
      id: 'en',
      value: [
        {
          id: 0,
          name: 'Order',
          subTabs: ['All', 'Not paid', 'Wait for shipping'],
        },
        { id: 1, name: 'Product' },
        { id: 2, name: 'Voucher', subTabs: ['Active', 'Not Active'] },
      ],
    },
    {
      id: 'vi',
      value: [
        {
          id: 0,
          name: 'Đơn hàng',
          subTabs: ['Tất cả', 'Chưa thanh toán', 'Chờ lấy hàng'],
        },
        { id: 1, name: 'Sản phẩm' },
        { id: 2, name: 'Voucher', subTabs: ['Đang chạy', 'Chưa chạy'] },
      ],
    },
  ];
  const TOOLTIP_MONEY = [
    {
      id: 'en',
      value: [
        'Total payment',
        'Total',
        'Shipping fee',
        'Tax',
        'Credit card offer',
        'Shoppe Coint',
        'Voucher',
        'Discount from wallet',
      ],
    },
    {
      id: 'vi',
      value: [
        'Tổng giá trị thanh toán',
        'Số tiền',
        'Vận chuyển',
        'Thuế',
        'Ưu đãi thẻ tín dụng',
        'Shopee xu',
        'Voucher',
        'Giảm từ ví',
      ],
    },
  ];
  const LIST_FILTER_STATUS = [
    {
      id: 'en',
      value: ['Canceled', 'Ưait for confirmation', 'Waiting for goods', 'Delivering', 'Delivered'],
    },
    {
      id: 'vi',
      value: ['Đã hủy', 'Chờ xác nhận', 'Chờ lấy hàng', 'Đang giao', 'Đã giao'],
    },
  ];
  const [showAddNote, setShowAddNote] = useState(false);
  const [selectedUtilTab, setSelectedUtilTab] = useState('');
  const [selectedSubUtilTab, setSelectedSubUtilTab] = useState('');
  const [filterData, setFilterData] = useState([
    { value: '131,50 VND', subValue: '17,03%', isLower: true },
    { value: '2', subValue: '00,00%', isLower: true },
    { value: '1,33%', subValue: '0,26%', isLower: false },
    { value: '131,50 VND', subValue: '17,03%', isLower: true },
    { value: '75', subValue: '23,03%', isLower: true },
    { value: '171', subValue: '5,03%', isLower: false },
  ]);
  const [filterTime, setFilterTime] = useState(1);
  const [filterStatus, setFilterStatus] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const language = useSelector((state) => state.app.language);
  const listText = [
    {
      id: 'en',
      txtFilterFrom: 'From',
      txtFilterTo: 'To',
      txtApply: 'Apply',
      title1: 'Message',
      title2: 'Statistics of the day',
      title3: 'Utilities',
      txtOrder: 'Order',
      txtShipId: 'Bill of lading code',
      txtFilterStatus: 'Filter by status',
      txtFilterTag: 'Filter by tag',
      txtFilterShop: 'Filter by shop',
      txtFilterTime: 'Filter by time',
      txtOrderSort: 'order',
      txtSold: 'Sold',
      txtAvailable: 'Available',
      txtProChoose: 'selected products',
      txtSend: 'Send',
      txtCancel: 'Cancel',
      txtMinValue: 'Minimun order value',
      txtSearch: 'Search',
      txtCancel: 'Cancel',
      txtReport: 'View activity reports',
      txtReportTitle: 'Sales analysis',
      txtCompare: 'Compared to yesterday',
      txtMessPlaceholder: 'Enter message...',
      txtOrderId: 'Order ID',
      txtTotalPayment: 'Total payment',
      txtShip: 'Shipping',
      txtFinishtime: 'Finish time',
      txtExpecTime: 'Delivery before',
      txtNote: 'Note',
      txtAddNote: 'Add note',
      txtDetail: 'See details',
      cardTitle: CARD_TITLE[0].value,
      shopTitle: SHOP_TITLE[0].value,
      selectData: SELECT_DATA[0].value,
      filterTime: FILTER_TIME[0].value,
      filterStatus: FILTER_STATUS[0].value,
      filterDataTitle: FILTER_DATA_TITLE[0].value,
      lastMessType: LAST_MESS_TYPE[0].value,
      utilTab: UTILS_TAB[0].value,
      toolTipMoney: TOOLTIP_MONEY[0].value,
      listFitlerStatus: LIST_FILTER_STATUS[0].value,
    },
    {
      id: 'vi',
      txtFilterFrom: 'Từ ngày',
      txtFilterTo: 'Đến ngày',
      txtApply: 'Áp dụng',
      title1: 'Tin nhắn',
      title2: 'Thống kê trong ngày',
      title3: 'Tiện ích',
      txtOrder: 'Đơn hàng',
      txtShipId: 'Mã vận đơn',
      txtFilterStatus: 'Lọc theo trạng thái',
      txtFilterTag: 'Lọc theo tag',
      txtFilterShop: 'Lọc theo shop',
      txtFilterTime: 'Lọc theo thời gian',
      txtOrderSort: 'đơn',
      txtSold: 'Đã bán',
      txtAvailable: 'Có sẵn',
      txtProChoose: 'sản phẩm đã chọn',
      txtSend: 'Gửi',
      txtCancel: 'Hủy',
      txtMinValue: 'Đơn tối thiểu',
      txtSearch: 'Tìm kiếm',
      txtReport: 'Xem báo cáo hoạt động',
      txtReportTitle: 'Phân tích bán hàng',
      txtCompare: 'So với hôm qua',
      txtMessPlaceholder: 'Nhập tin nhắn...',
      txtOrderId: 'Mã đơn hàng',
      txtTotalPayment: 'Tổng tiền thanh toán',
      txtShip: 'Thông tin vận chuyển',
      txtFinishtime: 'Thời gian hoàn thành',
      txtExpecTime: 'Giao trước ngày',
      txtNote: 'Ghi chú',
      txtAddNote: 'Thêm lưu ý',
      txtDetail: 'Xem chi tiết',
      cardTitle: CARD_TITLE[1].value,
      shopTitle: SHOP_TITLE[1].value,
      selectData: SELECT_DATA[1].value,
      filterTime: FILTER_TIME[1].value,
      filterStatus: FILTER_STATUS[1].value,
      filterDataTitle: FILTER_DATA_TITLE[1].value,
      lastMessType: LAST_MESS_TYPE[1].value,
      utilTab: UTILS_TAB[1].value,
      toolTipMoney: TOOLTIP_MONEY[1].value,
      listFitlerStatus: LIST_FILTER_STATUS[1].value,
    },
  ];
  const [text, setText] = useState(listText[0]);
  const [selectTitle, setSelectTitle] = useState(text.selectData[0]);
  useEffect(() => {
    for (let i = 0; i < listText.length; i++) {
      if (language == listText[i].id) {
        setText(listText[i]);
        setSelectTitle(listText[i].selectData[0]);
        setSelectedUtilTab(listText[i].utilTab[0]);
        setSelectedSubUtilTab(0);
        break;
      }
    }
    dispatch({ type: SHOW_SIDEBAR, showSidebar: false });
  }, [language]);
  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        setIsMobile(window.innerWidth < 1310);
      },
      false
    );
  }, []);

  useEffect(() => {
    handleSetMessDefault();
  }, []);

  const handleSetMessDefault = () => {
    conversation.map((item, index) => {
      if (index === 0) {
        setSelectedMess(item);
        setTimeout(() => handleMessageEl(), 100);
      }
    });
  };

  const handleSetMess = (item) => {
    setSelectedMess(item);
    setTimeout(() => handleMessageEl(), 100);
  };

  const AntTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      minWidth: 150,
      fontWeight: '400',
      '&:hover': {
        color: primaryColor[0],
        opacity: 1,
      },
      '&$selected': {
        color: primaryColor[0],
      },
      '&:focus': {
        color: primaryColor[0],
      },
    },
    selected: {},
  }))((props) => <Tab disableRipple {...props} />);

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}>
        {value === index && <p>{children}</p>}
      </div>
    );
  }

  const handleToggle = (item) => {
    const currentIndex = listCheckedProduct.indexOf(item);
    const newlistCheckedProduct = [...listCheckedProduct];
    if (currentIndex === -1) {
      newlistCheckedProduct.push(item);
    } else {
      // setIsCheckAll(false);
      newlistCheckedProduct.splice(currentIndex, 1);
    }
    setListCheckedProduct(newlistCheckedProduct);
  };

  const handleCheckStatus = (item) => {
    const currentIndex = listCheckedStatus.indexOf(item);
    const newlistCheckedProduct = [...listCheckedStatus];
    if (currentIndex === -1) {
      newlistCheckedProduct.push(item);
    } else {
      // setIsCheckAll(false);
      newlistCheckedProduct.splice(currentIndex, 1);
    }
    setListCheckedStatus(newlistCheckedProduct);
  };
  const handleCheckTag = (item) => {
    const currentIndex = listCheckedTag.indexOf(item);
    const newlistCheckedProduct = [...listCheckedTag];
    if (currentIndex === -1) {
      newlistCheckedProduct.push(item);
    } else {
      // setIsCheckAll(false);
      newlistCheckedProduct.splice(currentIndex, 1);
    }
    setListCheckedTag(newlistCheckedProduct);
  };
  const handleCheckShop = (item) => {
    const currentIndex = listCheckedShop.indexOf(item);
    const newlistCheckedProduct = [...listCheckedShop];
    if (currentIndex === -1) {
      newlistCheckedProduct.push(item);
    } else {
      // setIsCheckAll(false);
      newlistCheckedProduct.splice(currentIndex, 1);
    }
    setListCheckedShop(newlistCheckedProduct);
  };

  const handleChangeSelectSubTab = (event, newValue) => {
    setSelectedSubUtilTab(newValue);
  };

  const handleMessageEl = () => {
    if (messageEl.current != null) {
      messageEl.current.scrollTop = messageEl.current.scrollHeight;
    }
  };

  const handleInputFile = () => {
    if (inputFile) {
      inputFile.current.click();
    }
  };

  const CustomInputChat = withStyles({
    root: {
      '&.Mui-focused': {
        border: '2px solid ' + primaryColor[0],
      },
    },
  })(InputBase);

  const renderFilterMess = () => {
    const filterStatus = () => (
      <div className={classes.tooltip} style={{ width: '185px' }}>
        <div style={{ padding: '7px 15px', borderRadius: '4px' }}>
          <p
            style={{
              margin: 0,
              fontSize: '17px',
              fontWeight: '400',
              color: primaryColor[0],
            }}>
            {text.txtFilterStatus}
          </p>
          <div>
            {text.listFitlerStatus.map((item, index) => (
              <div className={classes.flexCenter}>
                <Checkbox
                  checked={listCheckedStatus.indexOf(item) !== -1}
                  tabIndex={-1}
                  onClick={() => handleCheckStatus(item)}
                  checkedIcon={<Check className={taskClasses.checkedIcon} />}
                  icon={<Check className={taskClasses.uncheckedIcon} />}
                  root
                  classes={{
                    checked: taskClasses.checked,
                    root: classes.checkBox,
                  }}
                />
                <p style={{ margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
    const filterTag = () => (
      <div className={classes.tooltip} style={{ width: '200px' }}>
        <div style={{ padding: '7px 15px', borderRadius: '4px' }}>
          <p
            style={{
              margin: 0,
              fontSize: '17px',
              fontWeight: '400',
              color: primaryColor[0],
            }}>
            {text.txtFilterTag}
          </p>
          <div>
            {listTag.map((item, index) => (
              <div className={classes.flexCenter}>
                <Checkbox
                  checked={listCheckedTag.indexOf(item) !== -1}
                  tabIndex={-1}
                  onClick={() => handleCheckTag(item)}
                  checkedIcon={<Check className={taskClasses.checkedIcon} />}
                  icon={<Check className={taskClasses.uncheckedIcon} />}
                  root
                  classes={{
                    checked: taskClasses.checked,
                    root: classes.checkBox,
                  }}
                />
                <Button style={{ backgroundColor: item.color, height: '23px' }} size="sm">
                  {item.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
    const filterShop = () => (
      <div className={classes.tooltip} style={{ width: '225px' }}>
        <div style={{ padding: '7px 15px', borderRadius: '4px' }}>
          <p
            style={{
              margin: 0,
              fontSize: '17px',
              fontWeight: '400',
              color: primaryColor[0],
            }}>
            {text.txtFilterShop}
          </p>
          <div>
            {listShop.map((item, index) => (
              <div className={classes.flexCenter}>
                <Checkbox
                  checked={listCheckedShop.indexOf(item) !== -1}
                  tabIndex={-1}
                  onClick={() => handleCheckShop(item)}
                  checkedIcon={<Check className={taskClasses.checkedIcon} />}
                  icon={<Check className={taskClasses.uncheckedIcon} />}
                  root
                  classes={{
                    checked: taskClasses.checked,
                    root: classes.checkBox,
                  }}
                />
                <p style={{ margin: 0 }}>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
    const filterTime = () => (
      <div className={classes.tooltip} style={{ width: isMobile ? '190px' : '460px' }}>
        <div style={{ padding: '7px 15px', borderRadius: '4px' }}>
          <p
            style={{
              margin: 0,
              fontSize: '17px',
              fontWeight: '400',
              color: primaryColor[0],
            }}>
            {text.txtFilterTime}
          </p>
          <div className={classes.flexCenter} style={{ marginTop: '10px' }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={vi}>
              <GridContainer>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label={text.txtFilterFrom}
                  value={timeFilterFrom}
                  onChange={(value) => setTimeFilterFrom(value)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  style={{
                    margin: isMobile ? '0 20px' : '0 40px',
                    width: '150px',
                  }}
                />
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label={text.txtFilterTo}
                  value={timeFilterTo}
                  onChange={(value) => setTimeFilterTo(value)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  style={{
                    margin: isMobile ? '0 20px' : '0 40px',
                    width: '150px',
                  }}
                />
              </GridContainer>
            </MuiPickersUtilsProvider>
          </div>
          <div
            className={classes.flexCenter}
            style={{ marginTop: '15px', justifyContent: 'flex-end' }}>
            <Button color="white" size="sm" style={{ marginRight: '10px' }}>
              {text.txtCancel}
            </Button>
            <Button color="primary" size="sm">
              {text.txtApply}
            </Button>
          </div>
        </div>
      </div>
    );
    switch (filterMess?.id) {
      case 'status':
        return filterStatus();
      case 'tag':
        return filterTag();
      case 'shop':
        return filterShop();
      case 'time':
        return filterTime();
      default:
        return <div></div>;
    }
  };

  const renderToolTipInfo = (item) => {
    return (
      <div style={{ padding: '7px 15px', borderRadius: '4px' }}>
        <Table style={{ width: '300px' }}>
          <TableBody>
            {item.money_data.map((mon, monIndex) => (
              <TableRow>
                <TableCell className={classes.tableCell}>
                  <p style={{ margin: 0 }}>{text.toolTipMoney[monIndex]}</p>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <p
                    style={{
                      margin: 0,
                      color: monIndex == 0 ? primaryColor[0] : '',
                    }}>
                    {formatCurrency(mon)}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderSubTabContent = () => {
    const tabOrder = () =>
      listOrder.map((item, index) => (
        <Card style={{ marginTop: '0', marginBottom: '20px' }}>
          <CardBody>
            <div
              className={classes.flexCenter}
              style={{ justifyContent: 'space-between', marginBottom: '7px' }}>
              <p style={{ margin: 0, fontWeight: '500', color: successColor[0] }}>
                {item.order_status}
              </p>
              <p style={{ margin: 0, color: '#a6a6a6' }}>
                {moment.unix(item.create_time).format('HH:mm:ss, DD/MM/YYYY')}
              </p>
            </div>
            <div className={classes.flexCenter}>
              <p style={{ margin: 0 }}>{text.txtOrderId + ':'}</p>
              <p
                style={{
                  margin: 0,
                  color: primaryColor[0],
                  fontWeight: '500',
                  margin: '0 5px',
                  fontSize: '15px',
                }}>
                {item.order_sn}
              </p>
              <Button
                justIcon
                color="transparent"
                style={{ width: '30px', height: '30px', minWidth: '0' }}
                onClick={() => {
                  navigator.clipboard.writeText(item.order_sn);
                }}>
                <LibraryBooksOutlined className={classes.iconCopy}></LibraryBooksOutlined>
              </Button>
            </div>
            {item.package_list &&
              item.package_list.map((pack, packIdx) => (
                <div className={classes.flexCenter}>
                  <p style={{ margin: 0 }}>{text.txtShipId + ':'}</p>
                  <p
                    style={{
                      margin: 0,
                      color: primaryColor[0],
                      fontWeight: '500',
                      margin: '0 5px',
                      fontSize: '15px',
                    }}>
                    {pack.package_number}
                  </p>
                  <Button
                    justIcon
                    color="transparent"
                    style={{ width: '30px', height: '30px', minWidth: '0' }}
                    onClick={() => {
                      navigator.clipboard.writeText(pack.package_number);
                    }}>
                    <LibraryBooksOutlined className={classes.iconCopy}></LibraryBooksOutlined>
                  </Button>
                </div>
              ))}
            {item.item_list.map((pro, proIdx) => (
              <div className={classes.flexCenter} style={{ margin: '5px 0' }}>
                <img src={pro.item_img} className={classes.proImg}></img>
                <div>
                  <p style={{ margin: 0 }}>
                    {pro.item_name}
                    {item.model_name && ' [' + item.model_name + ']'}
                  </p>
                  <div className={classes.flexCenter}>
                    <p style={{ margin: 0, color: primaryColor[0] }}>
                      {formatCurrency(pro.model_original_price)}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        color: successColor[0],
                        marginLeft: '5px',
                      }}>
                      {'x' + pro.model_quantity_purchased}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div
              className={classes.flexCenter}
              style={{ justifyContent: 'space-between', margin: '7px 0' }}>
              <p style={{ margin: 0 }}>{text.txtTotalPayment}</p>
              <div className={classes.flexCenter}>
                <p
                  style={{
                    margin: 0,
                    color: primaryColor[0],
                    fontWeight: '500',
                    fontSize: '15px',
                  }}>
                  {formatCurrency(item.total_amount)}
                </p>
                <Tooltip
                  title={renderToolTipInfo(item)}
                  classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
                  placement="bottom"
                  arrow>
                  <Info className={classes.iconInfo}></Info>
                </Tooltip>
              </div>
            </div>
            <div
              className={classes.flexCenter}
              style={{ justifyContent: 'space-between', margin: '7px 0' }}>
              <p style={{ margin: 0 }}>{text.txtShip}</p>
              <div className={classes.flexCenter}>
                <p style={{ margin: 0, fontWeight: '500', fontSize: '15px' }}>
                  {item.shipping_carrier}
                </p>
                <Tooltip
                  title={renderToolTipInfo(item)}
                  classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
                  placement="bottom"
                  arrow>
                  <Info className={classes.iconInfo}></Info>
                </Tooltip>
              </div>
            </div>
            {item.finish_time ? (
              <div>
                <div style={{ marginLeft: '30px' }}>
                  {item.package_list.map((pack, packIdx) => (
                    <p
                      style={{
                        margin: 0,
                        backgroundColor: grayColor[10],
                        padding: '5px 20px',
                        borderRadius: '4px',
                      }}>
                      {pack.logistics_status}
                    </p>
                  ))}
                </div>
                <div
                  className={classes.flexCenter}
                  style={{ justifyContent: 'space-between', margin: '7px 0' }}>
                  <p style={{ margin: 0 }}>{text.txtFinishtime}</p>
                  <div className={classes.flexCenter}>
                    <p style={{ margin: 0, fontWeight: '400' }}>
                      {moment.unix(item.finish_time).format('HH:mm:ss, DD/MM/YYYY')}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div
                  className={classes.flexCenter}
                  style={{ justifyContent: 'space-between', margin: '7px 0' }}>
                  <p style={{ margin: 0 }}>{text.txtExpecTime}</p>
                  <div className={classes.flexCenter}>
                    <p style={{ margin: 0, fontWeight: '400' }}>
                      {moment
                        .unix(item.create_time)
                        .add(item.days_to_ship, 'day')
                        .format('HH:mm:ss, DD/MM/YYYY')}
                    </p>
                  </div>
                </div>
                <div
                  className={classes.flexCenter}
                  style={{ justifyContent: 'space-between', margin: '7px 0' }}>
                  <p style={{ margin: 0 }}>{text.txtNote}</p>
                  <div className={classes.flexCenter}>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: '500',
                        color: successColor[0],
                        cursor: 'pointer',
                      }}
                      onClick={() => setShowAddNote(!showAddNote)}>
                      {'+ ' + text.txtAddNote}
                    </p>
                  </div>
                </div>
                {showAddNote && (
                  <div
                    className={classes.flexCenter}
                    style={{
                      position: 'relative',
                      width: '100%',
                      marginRight: '20px',
                      marginBottom: '10px',
                    }}>
                    <CustomInputChat
                      className={classes.txtMessage}
                      placeholder={text.txtAddNote}></CustomInputChat>
                    <Button
                      justIcon
                      color="primary"
                      style={{
                        margin: '10px 0',
                        position: 'absolute',
                        right: '0',
                      }}>
                      <CheckOutlined className={classes.iconSend}></CheckOutlined>
                    </Button>
                  </div>
                )}
              </div>
            )}
            <div className={classes.flexCenter} style={{ justifyContent: 'flex-end' }}>
              <Button size="sm" color="success">
                {text.txtDetail}
              </Button>
            </div>
          </CardBody>
        </Card>
      ));
    const tabProduct = () => (
      <div>
        <div
          className={classes.flexCenter}
          style={{ justifyContent: 'center', flexDirection: 'column' }}>
          <div
            className={classes.searchContainer}
            style={{ width: '90%', justifyContent: 'center' }}>
            <CustomInput
              formControlProps={{
                className: adminClasses.margin + ' ' + classes.searchInputContainer,
              }}
              inputProps={{
                placeholder: text.txtSearch,
                className: classes.inputSearch,
              }}
            />
            <Button color="white" aria-label="edit" justIcon round>
              <Search />
            </Button>
          </div>
          <div
            style={{
              height: window.innerHeight - 370 + 'px',
              overflowY: 'auto',
              width: '100%',
            }}>
            <div style={{ padding: '0.9375rem 10px' }}>
              {listProduct.map((item, index) => (
                <Card style={{ marginTop: '0', marginBottom: '20px' }}>
                  <CardBody>
                    <div>
                      <div className={classes.flexCenter} style={{ margin: '5px 0' }}>
                        <Checkbox
                          checked={listCheckedProduct.indexOf(item) !== -1}
                          tabIndex={-1}
                          onClick={() => handleToggle(item)}
                          checkedIcon={<Check className={taskClasses.checkedIcon} />}
                          icon={<Check className={taskClasses.uncheckedIcon} />}
                          root
                          classes={{
                            checked: taskClasses.checked,
                            root: classes.checkBox,
                          }}
                        />
                        <img src={item.image.image_url_list[0]} className={classes.proImg}></img>
                        <div>
                          <p style={{ margin: 0 }}>{item.item_name}</p>
                          <div className={classes.flexCenter}>
                            {item.has_model ? (
                              <p style={{ margin: 0, color: primaryColor[0] }}>
                                {formatCurrency(item.price_info.from_price) +
                                  ' - ' +
                                  formatCurrency(item.price_info.to_price)}
                              </p>
                            ) : (
                              <p style={{ margin: 0, color: primaryColor[0] }}>
                                {formatCurrency(item.price_info[0].current_price)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={classes.grayLine} style={{ marginTop: '10px' }}></div>
                      <div
                        className={classes.flexCenter}
                        style={{
                          justifyContent: 'space-between',
                          paddingTop: '10px',
                        }}>
                        <div>
                          <p style={{ margin: 0, color: primaryColor[0] }}>
                            {text.txtAvailable +
                              ': ' +
                              formatNumber(item.stock_info[0].current_stock)}
                          </p>
                          <p style={{ margin: 0 }}>
                            {text.txtSold + ': ' + formatNumber(item.sold_count)}
                          </p>
                        </div>
                        <div className={classes.flexCenter}>
                          <Button size="sm" color="success" style={{ marginRight: '10px' }}>
                            {text.txtDetail}
                          </Button>
                          <Button size="sm" color="primary">
                            {text.txtSend}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div style={{ padding: '0.9375rem 10px' }}>
          <div className={classes.grayLine} style={{ marginTop: '10px' }}></div>
          <div
            className={classes.flexCenter}
            style={{
              justifyContent: 'space-between',
              paddingTop: '10px',
              paddingRight: '10px',
              paddingLeft: '10px',
            }}>
            <p style={{ margin: 0 }}>
              {listCheckedProduct.length + '/' + listProduct.length + ' ' + text.txtProChoose}
            </p>
            <div className={classes.flexCenter}>
              <Button
                size="sm"
                color="danger"
                style={{ marginRight: '10px' }}
                onClick={() => setListCheckedProduct([])}>
                {text.txtCancel}
              </Button>
              <Button size="sm" color="primary">
                {text.txtSend}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
    const tabVoucher = () => (
      <div>
        {listVoucher.map((item, index) => (
          <Card style={{ marginTop: '0', marginBottom: '20px' }}>
            <CardBody>
              <div>
                <div className={classes.flexCenter} style={{ margin: '5px 0' }}>
                  <img src={item.voucher_img} className={classes.proImg}></img>
                  <div>
                    <p
                      style={{
                        margin: 0,
                        color: primaryColor[0],
                        fontWeight: '500',
                        fontSize: '15px',
                      }}>
                      {formatCurrency(item.discount_amount)}
                    </p>
                    <p style={{ margin: 0 }}>{item.voucher_name}</p>
                    <p style={{ margin: 0, color: '#a6a6a6' }}>{item.voucher_code}</p>
                    <p style={{ margin: 0, color: '#a6a6a6' }}>
                      {text.txtMinValue + ': ' + formatCurrency(item.min_basket_price)}
                    </p>
                  </div>
                </div>
                <div className={classes.grayLine} style={{ marginTop: '10px' }}></div>
                <div
                  className={classes.flexCenter}
                  style={{
                    justifyContent: 'space-between',
                    paddingTop: '10px',
                  }}>
                  <div className={classes.flexCenter}>
                    <p style={{ margin: 0 }}>
                      {moment.unix(item.start_time).format('DD/MM/YYYY') +
                        ' - ' +
                        moment.unix(item.end_time).format('DD/MM/YYYY')}
                    </p>
                  </div>
                  <Button size="sm" color="primary">
                    {text.txtSend}
                  </Button>
                </div>
              </div>
              <div></div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
    switch (selectedUtilTab.id) {
      case 0:
        return tabOrder();
      case 1:
        return tabProduct();
      case 2:
        return tabVoucher();
      default:
        return tabOrder();
    }
  };

  const renderMess = (item, type) => {
    var timestamp = item.created_timestamp;
    var isNear = false;
    if (
      timestamp < moment().add(1, 'day').format('X') &&
      timestamp > moment().subtract(1, 'day').format('X')
    ) {
      isNear = true;
    }
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: type == 'SHOP' ? 'flex-end' : '',
          }}>
          {item.message_type != 'order' && item.message_type != 'item' && type != 'SHOP' && (
            <img
              src={selectedMess.to_avatar ? selectedMess.to_avatar : customerAva}
              className={classes.imgCustomerSmall}
              style={{
                width: isMobile ? '25px' : '40px',
                height: isMobile ? '25px' : '40px',
              }}></img>
          )}
          <div style={{ maxWidth: '75%' }}>
            {item.message_type == 'text' && (
              <p className={type == 'SHOP' ? classes.txtMessChatShop : classes.txtMessChat}>
                {item.content.text}
              </p>
            )}
            {item.message_type == 'image' && (
              <img
                src={item.content.url}
                className={classes.imgMessChat}
                style={{ maxWidth: isMobile ? '175px' : '300px' }}
                onClick={() => setShowImage(item.content.url)}></img>
            )}
            {item.message_type == 'sticker' && (
              <img
                src={defaultSticker}
                style={{ width: '100px', height: '100px', margin: '0 15px' }}></img>
            )}
            {item.message_type != 'order' && item.message_type != 'item' && (
              <p className={classes.txtTimeMess}>
                {isNear
                  ? moment.unix(timestamp).format('HH:mm')
                  : moment.unix(timestamp).format('DD/MM HH:mm')}
              </p>
            )}
          </div>
          {item.message_type != 'order' && item.message_type != 'item' && type == 'SHOP' && (
            <img
              src={selectedMess.shop_avatar}
              className={classes.imgCustomerSmall}
              style={{
                width: isMobile ? '25px' : '40px',
                height: isMobile ? '25px' : '40px',
              }}></img>
          )}
        </div>
        {item.message_type == 'item' && (
          <div className={classes.messOrderContainer}>
            <img src={item.content.item_img} className={classes.proImg}></img>
            <div>
              <p style={{ margin: 0 }}>
                {item.content.item_name}
                {item.content.item_sku && ' [' + item.content.item_sku + ']'}
              </p>
              <p style={{ margin: 0, color: primaryColor[0] }}>
                {formatCurrency(item.content.item_price)}
              </p>
            </div>
          </div>
        )}
        {item.message_type == 'order' && (
          <div className={classes.messOrderContainer}>
            <img src={item.content.item_img} className={classes.proImg}></img>
            <div>
              <p style={{ margin: 0 }}>{text.txtOrderId + ' ' + item.content.order_sn}</p>
              <div className={classes.flexCenter}>
                <p style={{ margin: 0, marginRight: '5px' }}>{text.txtTotalPayment + ': '}</p>
                <p style={{ margin: 0, color: primaryColor[0] }}>
                  {formatCurrency(item.content.total_amount)}
                </p>
              </div>
              <p style={{ margin: 0, color: successColor[0], fontWeight: '500' }}>
                {item.content.order_status}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };
  const renderCardMess = () => {
    return (
      <React.Fragment>
        <Card
          className={classes.headerContent}
          style={{ width: isMobile ? '100%' : '65%', minWidth: '315px' }}>
          <CardHeader
            color="primary"
            className={classes.cardTitleContainer}
            style={{
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: isMobile ? 'flex-start' : 'space-between',
            }}>
            <div className={classes.flexCenter}>
              <img
                src={selectedMess.to_avatar ? selectedMess.to_avatar : customerAvaWhite}
                className={classes.imageCustomerAva}></img>
              <div>
                <h4 className={classes.cardTitleWhite}>{selectedMess.to_name}</h4>
                <div className={classes.flexCenter}>
                  <LocationOnOutlined></LocationOnOutlined>
                  <p style={{ margin: '0' }}>{selectedMess.to_location}</p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: isMobile ? '10px' : '0' }}>
              <div className={classes.flexCenter} style={{ marginBottom: '10px' }}>
                <CheckCircleOutline></CheckCircleOutline>
                <p style={{ margin: '0', marginLeft: '10px', fontSize: '15px' }}>
                  {formatCurrency(selectedMess.finish_order_value) +
                    ' [' +
                    selectedMess.finish_order +
                    ' ' +
                    text.txtOrderSort +
                    ']'}
                </p>
              </div>
              <div className={classes.flexCenter}>
                <HourglassEmptyOutlined></HourglassEmptyOutlined>
                <p style={{ margin: '0', marginLeft: '10px', fontSize: '15px' }}>
                  {formatCurrency(selectedMess.process_order_value) +
                    ' [' +
                    selectedMess.process_order +
                    ' ' +
                    text.txtOrderSort +
                    ']'}
                </p>
              </div>
            </div>
          </CardHeader>
          <div
            style={{
              height: window.innerHeight - 300 + 'px',
              overflowY: 'auto',
              padding: isMobile ? '0 7px' : '0 20px',
            }}
            ref={messageEl}>
            <div style={{ padding: isMobile ? '1.9375rem 0' : '1.9375rem 20px' }}>
              {messData.map((item, index) => {
                return item.from_id ? renderMess(item, 'CUSTOMER') : renderMess(item, 'SHOP');
              })}
            </div>
          </div>
          <div className={classes.bottomMessContainer}>
            <div className={classes.grayLine}></div>
            <div className={classes.flexCenter} style={{ padding: '10px 20px', overflowY: 'auto' }}>
              <LocalOfferOutlined
                style={{ marginRight: '10px', color: grayColor[0] }}></LocalOfferOutlined>
              {listTag.map((item, index) => (
                <Button
                  style={{
                    backgroundColor: item.color ? item.color : primaryColor[0],
                    height: '20px',
                    margin: '0 10px',
                  }}>
                  {item.name}
                </Button>
              ))}
            </div>
            <div className={classes.grayLine}></div>
            <input id="myInput" type="file" ref={inputFile} style={{ display: 'none' }} />
            <div
              className={classes.flexCenter}
              style={{
                justifyContent: isMobile ? 'flex-start' : 'space-between',
                display: isMobile ? 'block' : 'flex',
              }}>
              <Button justIcon color="transparent" style={{ margin: '10px' }}>
                <CameraAlt className={classes.iconMessage}></CameraAlt>
              </Button>
              <Button
                justIcon
                color="transparent"
                style={{ margin: '10px' }}
                onClick={() => handleInputFile()}>
                <Image className={classes.iconMessage}></Image>
              </Button>
              <Button justIcon color="transparent" style={{ margin: '10px' }}>
                <Chat className={classes.iconMessage}></Chat>
              </Button>
              <div
                className={classes.flexCenter}
                style={{
                  position: 'relative',
                  padding: isMobile ? '10px 20px' : '0',
                  width: isMobile ? 'auto' : '100%',
                  marginRight: '20px',
                }}>
                <CustomInputChat
                  className={classes.txtMessage}
                  placeholder={text.txtMessPlaceholder}></CustomInputChat>
                <Button
                  justIcon
                  color="primary"
                  style={{ margin: '10px 0', position: 'absolute', right: '0' }}>
                  <SendOutlined className={classes.iconSend}></SendOutlined>
                </Button>
              </div>
            </div>
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={showImage != null}
            onClose={() => setShowImage(null)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}>
            <Fade in={showImage != null}>
              <img
                src={showImage}
                style={{ maxWidth: '80%', minWidth: '350px', height: 'auto' }}></img>
            </Fade>
          </Modal>
        </Card>
        <Card
          className={classes.headerContent}
          style={{ width: isMobile ? '100%' : '30%', minWidth: '315px' }}>
          <CardHeader color="primary" className={classes.cardTitleContainer}>
            <div className={classes.flexCenter}>
              <h4 className={classes.cardTitleWhite}>{text.title3}</h4>
            </div>
          </CardHeader>
          <div style={{ padding: '0.9375rem 10px' }}>
            <div className={classes.flexCenter} style={{ overflowX: 'auto' }}>
              {text.utilTab.map((item, index) => (
                <div style={{ width: 100 / text.utilTab.length + '%' }}>
                  <Button
                    color="transparent"
                    style={{ margin: '0', width: '100%' }}
                    onClick={() => {
                      setSelectedUtilTab(item), setSelectedSubUtilTab(0);
                    }}>
                    <p
                      style={{
                        margin: 0,
                        color: selectedUtilTab == item ? primaryColor[0] : 'rgba(0, 0, 0, 0.87)',
                      }}>
                      {item.name}
                    </p>
                  </Button>
                  <div
                    style={{
                      width: '100%',
                      height: '2px',
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                      backgroundColor: selectedUtilTab == item ? primaryColor[0] : grayColor[10],
                    }}></div>
                </div>
              ))}
            </div>
          </div>
          {selectedUtilTab.subTabs ? (
            selectedUtilTab.subTabs.length > 2 ? (
              <React.Fragment>
                <Tabs
                  value={selectedSubUtilTab}
                  onChange={handleChangeSelectSubTab}
                  classes={{
                    indicator: classes.indicator,
                  }}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example">
                  {selectedUtilTab.subTabs.map((item, index) => (
                    <AntTab label={item} {...a11yProps(index)} />
                  ))}
                </Tabs>
                <div
                  style={{
                    height: window.innerHeight - 300 + 'px',
                    overflowY: 'auto',
                    padding: '0.9375rem 10px',
                  }}>
                  {renderSubTabContent()}
                </div>
                {/* <TabPanel value={selectedSubUtilTab} index={0}>
                    Item One
                  </TabPanel>
                  <TabPanel value={selectedSubUtilTab} index={1}>
                    Item Two
                  </TabPanel> */}
              </React.Fragment>
            ) : (
              <div>
                <div className={classes.flexCenter}>
                  {selectedUtilTab.subTabs.map((item, index) => (
                    <div
                      style={{
                        width: selectedUtilTab.subTabs.length == 2 ? '50%' : 'auto',
                      }}>
                      <Button
                        color="transparent"
                        style={{
                          margin: '0',
                          textTransform: 'none',
                          width: selectedUtilTab.subTabs.length == 2 ? '100%' : 'auto',
                        }}
                        onClick={() => setSelectedSubUtilTab(index)}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '0.875rem',
                            color: selectedSubUtilTab == index ? primaryColor[0] : '#8f8f8f',
                          }}>
                          {item}
                        </p>
                      </Button>
                      <div
                        style={{
                          width: '100%',
                          height: '2px',
                          transition: '0.3s',
                          backgroundColor:
                            selectedSubUtilTab == index ? primaryColor[0] : grayColor[10],
                        }}></div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    height: window.innerHeight - 300 + 'px',
                    overflowY: 'auto',
                    padding: '0.9375rem 10px',
                  }}>
                  {renderSubTabContent()}
                </div>
              </div>
            )
          ) : (
            renderSubTabContent()
          )}
        </Card>
      </React.Fragment>
    );
  };

  return (
    <div style={{ display: isMobile ? 'block' : 'flex' }}>
      <Card
        className={classes.headerContent}
        style={{ width: isMobile ? '100%' : '25%', minWidth: '315px' }}>
        <CardHeader color="primary" className={classes.cardTitleContainer}>
          <div>
            <h4 className={classes.cardTitleWhite}>{text.title1}</h4>
          </div>
        </CardHeader>
        <CardBody className={classes.cardMess}>
          <FormControl className={dashClasses.formControl + ' ' + classes.frmMessage}>
            <div className={classes.searchContainer}>
              <CustomInput
                formControlProps={{
                  className: adminClasses.margin + ' ' + classes.searchInputContainer,
                }}
                inputProps={{
                  placeholder: text.txtSearch,
                  className: classes.inputSearch,
                }}
              />
              <Button color="white" aria-label="edit" justIcon round>
                <Search />
              </Button>
            </div>
            <div className={classes.filterContainer}>
              {MESS_FILTER.map((item, index) => (
                <div className={classes.filterItemContainer} style={{ position: 'relative' }}>
                  <Button
                    color="transparent"
                    aria-owns={filterMess == item ? 'filter-list-grow' + item?.id : null}
                    aria-haspopup="true"
                    style={{ padding: '5px 2px' }}
                    onClick={() => setFilterMess(item)}>
                    <item.icon className={classes.filterIcon}></item.icon>
                    {item.isMore && (
                      <Icon className={classes.filterMore}>expand_more_outlined</Icon>
                    )}
                  </Button>
                  {item.isMore && (
                    <Poppers
                      open={Boolean(filterMess?.id == item.id)}
                      anchorEl={filterMess?.id == item.id}
                      transition
                      disablePortal
                      className={
                        classNames({
                          [classes.popperClose]: filterMess != item,
                        }) +
                        ' ' +
                        classes.popperNav
                      }>
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          id={'filter-list-grow' + item?.id}
                          style={{
                            transformOrigin:
                              placement === 'bottom' ? 'center top' : 'center bottom',
                          }}>
                          <Paper>
                            <ClickAwayListener onClickAway={() => setFilterMess(null)}>
                              {renderFilterMess()}
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Poppers>
                  )}
                </div>
              ))}
            </div>
          </FormControl>
        </CardBody>
        <div className={classes.messContainer} style={{ height: window.innerHeight - 300 + 'px' }}>
          {conversation.map((item, index) => {
            var timestamp = item.last_message_timestamp / 1000000000;
            var isNear = false;
            if (
              timestamp < moment().add(1, 'day').format('X') &&
              timestamp > moment().subtract(1, 'day').format('X')
            ) {
              isNear = true;
            }
            return (
              <div
                className={classes.messItemContainer}
                style={{
                  backgroundColor: selectedMess == item ? primaryColor[3] : '',
                  padding: item.tag ? '12px 7px 25px 7px' : '12px 7px',
                }}
                onClick={() => handleSetMess(item)}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={item.to_avatar ? item.to_avatar : customerAva}
                    className={classes.imgCustomer}></img>
                  {item.unread_count > 0 && (
                    <p className={classes.txtUnreadCount}>{item.unread_count}</p>
                  )}
                </div>
                <div className={classes.messNameTimeContainer}>
                  <div className={classes.messNameContainer}>
                    <p
                      style={{
                        margin: '0',
                        fontWeight: item.unread_count > 0 ? '500' : '100',
                      }}>
                      {item.to_name}
                    </p>
                    {item.latest_message_type == 'product' && (
                      <p className={classes.txtLastMess}>{text.lastMessType[0]}</p>
                    )}
                    {item.latest_message_type == 'video' && (
                      <p className={classes.txtLastMess}>{text.lastMessType[1]}</p>
                    )}
                    {item.latest_message_type == 'image' && (
                      <p className={classes.txtLastMess}>{text.lastMessType[2]}</p>
                    )}
                    {item.latest_message_type == 'text' && (
                      <p
                        className={classes.txtLastMess}
                        style={{
                          fontWeight: item.unread_count > 0 ? '500' : '100',
                        }}>
                        {item.latest_message_content.text}
                      </p>
                    )}
                  </div>
                  <div className={classes.messNameContainer}>
                    <div style={{ display: 'flex' }}>
                      <p
                        style={{
                          margin: '0',
                          color: '#a6a6a6',
                          fontSize: '12px',
                        }}>
                        {isNear
                          ? moment.unix(timestamp).format('HH:mm')
                          : moment.unix(timestamp).format('DD/MM')}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          marginLeft: '7px',
                          position: 'relative',
                        }}>
                        <img src={item.shop_avatar} className={classes.imgShopAva}></img>
                        <Reply className={classes.iconReplyMess}></Reply>
                        {item.tag && (
                          <Button
                            size="sm"
                            style={{
                              backgroundColor: item.tag.color ? item.tag.color : primaryColor[0],
                              height: '23px',
                              position: 'absolute',
                              right: '0',
                              bottom: '-30px',
                            }}>
                            {item.tag.name}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      {selectedMess && renderCardMess()}
    </div>
  );
}

const styles = {
  cardTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  headerContent: {
    marginBottom: '0 !important',
    marginLeft: '1% !important',
    marginRight: '1% !important',
  },
  frmMessage: {
    width: '100% !important',
    marginRight: '0 !important',
  },
  searchContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  searchInputContainer: {
    width: '100%',
  },
  inputSearch: {
    marginTop: '0 !important',
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
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    paddingBottom: '10px',
  },
  filterItemContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  filterIcon: {
    width: '23px !important',
    height: '23px !important',
    marginRight: '0 !important',
    fontSize: '23px',
    color: '#808080',
  },
  filterMore: {
    fontSize: '16px',
    color: '#808080',
  },
  cardMess: {
    paddingBottom: '0 !important',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
  },
  messContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    overflowY: 'auto',
  },
  messItemContainer: {
    display: 'flex',
    margin: '0 10px',
    cursor: 'pointer',
    borderRadius: '3px',
    '&:hover,&:focus': {
      backgroundColor: grayColor[10],
    },
  },
  messNameContainer: {
    marginLeft: '7px',
  },
  messNameTimeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  txtLastMess: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '150px',
    margin: '0',
    color: '#a6a6a6',
    fontSize: '14px',
  },
  imgCustomer: {
    width: '50px',
    height: '50px',
    borderRadius: '200px',
  },
  imgCustomerSmall: {
    width: '40px',
    height: '40px',
    borderRadius: '200px',
  },
  imgShopAva: {
    width: '22px',
    height: '22px',
    borderRadius: '200px',
  },
  txtUnreadCount: {
    backgroundColor: dangerColor[0],
    textAlign: 'center',
    borderRadius: '100px',
    color: 'white',
    width: '23px',
    height: '23px',
    border: '1px solid white',
    position: 'absolute',
    margin: '0 !important',
    top: '-5px',
    right: '-5px',
  },
  iconReplyMess: {
    fontSize: '20px',
    color: '#0442C9',
    marginTop: '2px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCustomerAva: {
    width: '55px',
    height: '55px',
    borderRadius: '200px',
    marginRight: '10px',
  },
  grayLine: {
    width: '100%',
    height: '1px',
    backgroundColor: 'rgba(224, 224, 224, 1)',
  },
  bottomMessContainer: {
    width: '100%',
  },
  iconMessage: {
    width: '30px !important',
    height: '30px !important',
    color: primaryColor[0] + ' !important',
  },
  iconSend: {
    width: '30px !important',
    height: '30px !important',
    color: 'white !important',
  },
  txtMessage: {
    border: '2px solid ' + grayColor[10],
    borderRadius: '4px',
    padding: '3px 50px 3px 10px',
    width: '100%',
  },
  txtMessChat: {
    backgroundColor: grayColor[10],
    padding: '7px 15px',
    margin: '0 15px',
    borderRadius: '15px',
    fontSize: '15px',
  },
  txtMessChatShop: {
    backgroundColor: '#fff5ef',
    padding: '7px 15px',
    margin: '0 15px',
    borderRadius: '15px',
    fontSize: '15px',
    color: primaryColor[0],
  },
  txtTimeMess: {
    margin: '0',
    color: '#a6a6a6',
    fontSize: '12px',
    textAlign: 'end',
    margin: '0 30px',
    marginBottom: '15px',
  },
  txtTimeMessShop: {
    margin: '0',
    color: '#a6a6a6',
    fontSize: '12px',
    textAlign: 'start',
    margin: '0 30px',
    marginBottom: '15px',
  },
  imgMessChat: {
    height: 'auto',
    borderRadius: '15px',
    margin: '0 15px',
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      opacity: '0.7',
    },
  },
  proImg: {
    width: '65px',
    height: '65px',
    padding: '2px',
    boxShadow: '0 1px 4px 0 rgb(0 0 0 / 14%)',
    borderRadius: '4px',
    marginRight: '10px',
    backgroundColor: 'white',
  },
  messOrderContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: grayColor[10],
    padding: '10px 20px',
    borderRadius: '4px',
    marginBottom: '15px',
  },
  indicator: {
    backgroundColor: primaryColor[0],
  },
  iconCopy: {
    color: '#a6a6a6',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  iconInfo: {
    width: '20px',
    height: '20px',
    marginLeft: '5px',
    cursor: 'pointer',
    color: '#a6a6a6',
  },
  tableCell: {
    border: '0',
    padding: '0',
  },
  tooltip: {
    backgroundColor: 'white',
    boxShadow: '0 1px 4px 0 rgb(0 0 0 / 14%)',
  },
  arrow: {
    color: 'white',
  },
  checkBox: {
    padding: '9px',
    '&:hover': {
      backgroundColor: 'unset',
    },
  },
  popperNav: {
    zIndex: '99',
    top: '45px !important',
    left: '-70px !important',
  },
};

ChatPage.layout = Admin;

export default WithAuthentication(ChatPage);
