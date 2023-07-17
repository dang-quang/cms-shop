import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Link from 'next/link';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
// @material-ui/core components
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
  TextField,
  OutlinedInput,
  InputAdornment,
  Radio,
  RadioGroup,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

import Check from '@material-ui/icons/Check';
import DateFnsUtils from '@date-io/date-fns';
import Poppers from '@material-ui/core/Popper';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import adminStyles from 'assets/jss/natcash/components/headerLinksStyle.js';
import tableStyles from 'assets/jss/natcash/components/tableStyle.js';
import taskStyles from 'assets/jss/natcash/components/tasksStyle.js';
import shopStyle from 'assets/jss/natcash/views/shoplist/shoplistStyle.js';
import { Icon } from '@material-ui/core';
import dashStyles from 'assets/jss/natcash/views/dashboardStyle.js';
import vi from 'date-fns/locale/vi';
import classNames from 'classnames';
import useWindowSize from 'components/Hooks/useWindowSize.js';
import FormGroupCustom from 'components/FormCustom/FormGroupCustom.js';
import FormCellCustom from 'components/FormCustom/FormCellCustom.js';
import PropTypes from 'prop-types';

import { formatCurrency, formatNumber } from '../../../utilities/utils';

import { useRouter } from 'next/router';

import imgShop from 'assets/img/shop.png';
import imgProduct from 'assets/img/product.png';
import ModalCustom from 'components/ModalCustom/ModalCustom.js';
import styles from 'assets/jss/natcash/views/voucher/addVoucherStyle.js';

function VoucherDetailPage() {
  const router = useRouter();
  const { id } = router.query;
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
  const [isShowModal, setIsShowModal] = useState(false);
  const [filterType, setFilterType] = useState('name');
  const [filterValue, setFilterValue] = useState('');
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checked, setChecked] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const language = useSelector((state) => state.app.language);

  const [values, setValues] = React.useState({
    code_type: 'all',
    promotion_name: '',
    voucher_code: '',
    time_from: moment().format('yyyy-MM-DDThh:mm'),
    time_to: moment().add(1, 'hours').format('yyyy-MM-DDThh:mm'),
    voucher_type: 'promotion',
    discount_type: 'money',
    discount: '',
    discount_max_type: 'limit',
    discount_max: '',
    order_money_min: '',
    maximum_usage: '',
    display: 'many',
    display_channel: [],
    added_product: [],
    status: '',
  });

  const [dataReal, setDataReal] = useState([
    {
      id: 432412,
      code_type: 'product',
      promotion_name: '15.9',
      voucher_code: 'SHOP1509K',
      time_from: '2021-09-14T07:16:50',
      time_to: '2021-09-15T08:16:50',
      voucher_type: 'promotion',
      discount_type: 'percent',
      discount: '40',
      discount_max_type: 'unlimited',
      discount_max: '10000',
      order_money_min: '100000',
      maximum_usage: '10',
      display: 'noPublic',
      display_channel: [],
      added_product: [
        {
          id: '1234',
          avatar: 'https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11',
          name: 'Bình đun nước thông minh Moaz Bebe MB-002',
          sold: 23,
          original_price: 1210000,
          quantity: 5,
        },
        {
          id: '1245362324',
          avatar: 'https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9',
          name: 'Chăn lưới OTK xuất Nga cho bé',
          sold: 10,
          original_price: 120000,
          quantity: 8,
        },
      ],
      status: 'Upcoming',
    },
    {
      id: 312313,
      code_type: 'all',
      promotion_name: 'sale giữa tháng',
      voucher_code: 'SHOP5249K',
      time_from: '2021-09-14T17:16:50',
      time_to: '2021-09-15T18:16:50',
      voucher_type: 'promotion',
      discount_type: 'money',
      discount: '40000',
      discount_max_type: 'limit',
      discount_max: '249000',
      order_money_min: '100000',
      maximum_usage: '20',
      display: 'channels',
      display_channel: ['live', 'feed'],
      added_product: [],
      status: 'Finished',
    },
  ]);

  const upcoming = values.status == 'Upcoming' ? false : true;
  const all = true;

  useEffect(() => {
    dataReal?.map((item, index) => {
      if (item.id == id) {
        setValues(item);
      }
    });
  }, []);
  const TABLE_HEAD = [
    {
      id: 'en',
      value: ['Product', 'Sold', 'Original price', 'Quantity'],
    },
    {
      id: 'vi',
      value: ['Sản phẩm', 'Tồn kho', 'Giá gốc', 'Số Lượng Hàng'],
    },
  ];

  const TABLE_HEAD_2 = [
    {
      id: 'en',
      value: ['Product', 'Sold', 'Price', 'Stock'],
    },
    {
      id: 'vi',
      value: ['Sản phẩm', 'Đã bán', 'Giá', 'Kho hàng'],
    },
  ];

  const FORM_GROUP_CUSTOM = [
    {
      id: 'en',
      value: ['Basic information', 'Set up voucher', 'Display voucher and applicable products'],
    },
    {
      id: 'vi',
      value: [
        'Thông tin cơ bản',
        'Thiết lập mã giảm giá',
        'Hiển thị mã giảm giá và các sản phẩm áp dụng',
      ],
    },
  ];

  const FORM_CELL_CUSTOM = [
    {
      id: 'en',
      value: [
        'Code type',
        'Promotion name',
        'Voucher code',
        'Time',
        'Voucher type',
        'Discount type | Discount',
        'Maximum reduction',
        'Minimum order amount',
        'Maximum usage',
        'Setting display',
        'Applicable products',
      ],
    },
    {
      id: 'vi',
      value: [
        'Loại mã',
        'Tên chương trình',
        'Mã voucher',
        'Thời gian',
        'Loại mã giảm giá',
        'Loại giảm giá | Mức giảm',
        'Mức giảm tối đa',
        'Giá trị đơn hàng tối thiểu',
        'Lượt sử dụng tối đa',
        'Thiết lập hiển thị',
        'Sản phẩm được áp dụng',
      ],
    },
  ];

  const HELPER_TEXT = [
    {
      id: 'en',
      value: [
        'Voucher name not visible to buyers',
        'Please enter only alphabetic characters (A-Z), numbers (0-9); maximum 5 characters. Full voucher code is:SHOP',
        'The duration of the promation must not exceed 180 days',
        'Equivalent: - Shopee Coin',
        'Total usable vouchers',
      ],
    },
    {
      id: 'vi',
      value: [
        'Tên mã giảm giá không hiển thị với người mua',
        'Vui lòng chỉ nhập các kí tự chữ cái (A-Z), số (0-9); tối đa 5 kí tự. Mã giảm giá đầy đủ là:SHOP',
        'Thời gian của chương trình không được quá 180 ngày',
        'Tương đương: - Shopee Xu',
        'Tổng số Mã giảm giá có thể sử dụng',
      ],
    },
  ];

  const APPLICABLE_PRODUCTS = [
    {
      id: 'en',
      value: ['All products', 'Added products'],
    },
    {
      id: 'vi',
      value: ['Tất cả sản phẩm', 'Sản phẩm được chọn'],
    },
  ];

  const ACTIONS = [
    {
      id: 'en',
      button: ['Shopwide voucher', 'Product Voucher', 'Select product', 'Edit'],
      radio: [
        'Promotion',
        'Refund Coins',
        'Limit',
        'Unlimited',
        'Show multiple places',
        'Share via voucher code',
        'Channels',
        'Not Public',
      ],
      select: ['By amount', 'By percent'],
    },
    {
      id: 'vi',
      button: ['Voucher toàn shop', 'Voucher sản phẩm', 'Chọn sản phẩm', 'Chỉnh sửa'],
      radio: [
        'Khuyến mãi',
        'Hoàn xu',
        'Giới hạn',
        'Không giới hạn',
        'Hiển thị nhiều nơi',
        'Chia sẻ thông qua mã voucher',
        'Các kênh',
        'Không công khai',
      ],
      select: ['Theo số tiền', 'Theo phần trăm'],
    },
  ];

  const POPUP = [
    {
      id: 'en',
      title: 'Add products',
      button: ['Search', 'Reset', 'Confirm'],
      select: ['By amount', 'By percent'],
    },
    {
      id: 'vi',
      title: 'Thêm sản phẩm',
      button: ['Tìm', 'Nhập lại', 'Xác nhận'],
      select: ['Theo số tiền', 'Theo phần trăm'],
    },
  ];

  const checkBoxChannels = [
    {
      name: 'Shopee Live',
      value: 'live',
    },
    {
      name: 'Shopee Feed',
      value: 'feed',
    },
  ];

  const listText = [
    {
      id: 'en',
      title: 'Voucher detail',
      tableHead: TABLE_HEAD[0].value,
      tableHead_2: TABLE_HEAD_2[0].value,
      form_group_custom: FORM_GROUP_CUSTOM[0].value,
      form_cell_custom: FORM_CELL_CUSTOM[0].value,
      helper_text: HELPER_TEXT[0].value,
      placeholder: 'Enter here',
      applicable_products_text: APPLICABLE_PRODUCTS[0].value,
      buttons: ACTIONS[0].button,
      radios: ACTIONS[0].radio,
      selects: ACTIONS[0].select,
      popup_title: POPUP[0].title,
      popup_button: POPUP[0].button,
      popup_select: POPUP[0].select,
    },
    {
      id: 'vi',
      title: 'Chi tiết mã giảm giá',
      tableHead: TABLE_HEAD[1].value,
      tableHead_2: TABLE_HEAD_2[1].value,
      form_group_custom: FORM_GROUP_CUSTOM[1].value,
      form_cell_custom: FORM_CELL_CUSTOM[1].value,
      helper_text: HELPER_TEXT[1].value,
      placeholder: 'Nhập vào',
      applicable_products_text: APPLICABLE_PRODUCTS[1].value,
      buttons: ACTIONS[1].button,
      radios: ACTIONS[1].radio,
      selects: ACTIONS[1].select,
      popup_title: POPUP[1].title,
      popup_button: POPUP[1].button,
      popup_select: POPUP[1].select,
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

  //change value input form
  const handleChangeValue = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    setValues({
      ...values,
      ['voucher_code']: 'SHOP' + values.voucher_code,
    });
    alert('hi');
  };

  const CustomRadio = withStyles({
    root: {
      color: 'gray',
      '&$checked': {
        color: '#f96606',
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  const handleChangeCodeType = (value) => {
    setValues({ ...values, ['code_type']: value, display: 'many' });
  };

  const handleChangeFilterType = (event) => {
    setFilterType(event.target.value);
  };

  const handleChangeFilterValue = (event) => {
    setFilterValue(event.target.value);
  };

  const handleSetDisplayChannel = (item) => {
    const currentIndex = values.display_channel.indexOf(item);
    const newStatus = [...values.display_channel];
    if (currentIndex === -1) {
      newStatus.push(item);
    } else {
      newStatus.splice(currentIndex, 1);
    }
    setValues({ ...values, ['display_channel']: newStatus });
  };

  const [dataProduct, setDataProduct] = useState([
    {
      id: '1234',
      avatar: 'https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11',
      name: 'Bình đun nước thông minh Moaz Bebe MB-002',
      sold: 23,
      original_price: 1210000,
      quantity: 5,
    },
    {
      id: '34524523',
      avatar: 'https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc',
      name: 'Sữa Meiji số 0/9 - 800g',
      sold: 30,
      original_price: 550000,
      quantity: 988,
    },
    {
      id: '1245362324',
      avatar: 'https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9',
      name: 'Chăn lưới OTK xuất Nga cho bé',
      sold: 10,
      original_price: 120000,
      quantity: 8,
    },
  ]);

  const handleCheckAll = () => {
    if (isCheckAll) {
      setIsCheckAll(false);
      setChecked([]);
    } else {
      setIsCheckAll(true);
      setChecked(dataProduct);
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
  const renderProduct = (item, index) => {
    return (
      <React.Fragment>
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
          <TableCell
            className={tableClasses.tableCell + ' ' + tableClasses.cellWidth_400}
            key={'productInfo'}>
            <div className={classes.cellInfo}>
              <img src={item.avatar} className={classes.tableImage} />
              <div className={classes.infoTextContainer}>
                <p className={classes.text + ' ' + classes.infoTextPrimary}>{item.name}</p>
              </div>
            </div>
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={'sold'}>
            {item.sold}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={'OriginalPrice'}>
            {formatCurrency(item.original_price)}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={'Quantity'}>
            {item.quantity}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  const renderTable = (item, index) => {
    return (
      <TableRow key={index} className={tableClasses.tableBodyRow}>
        <TableCell
          className={tableClasses.tableCell + ' ' + tableClasses.cellWidth_400}
          key={'Product2'}>
          <div className={classes.cellInfo}>
            <img src={item.avatar} className={classes.tableImage} />
            <div className={classes.infoTextContainer}>
              <p className={classes.text + ' ' + classes.infoTextPrimary}>{item.name}</p>
            </div>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'Sold2'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>{item.sold}</p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'OriginalPrice2'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {formatCurrency(item.original_price)}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'Quantity2'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>{item.quantity}</p>
        </TableCell>
      </TableRow>
    );
  };

  const TableData = () => {
    return (
      <div className={tableClasses.tableResponsive}>
        <Table className={tableClasses.table + ' ' + tableClasses.tableCustom}>
          {dataProduct !== undefined ? (
            <TableHead
              className={
                tableClasses['primary' + 'TableHeader'] + ' ' + tableClasses.tableHeadCustom
              }>
              <TableRow className={tableClasses.tableHeadRow}>
                {text.tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={tableClasses.tableCell + ' ' + tableClasses.tableHeadCell}
                      key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {values.added_product?.map((item, index) => {
              return renderTable(item, index);
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  const FormGroupCustom_1 = () => {
    return (
      <FormGroupCustom title={text.form_group_custom[0]}>
        {/* Code Type */}
        <FormCellCustom label={text.form_cell_custom[0]}>
          <div className={classes.formCell}>
            <Button
              color={'white'}
              justIcon={false}
              className={
                values.code_type == 'all'
                  ? classes.itemsContainer
                  : classes.itemsContainer + ' ' + classes.itemsContainer_active
              }
              onClick={() => handleChangeCodeType('all')}
              disabled={all}>
              <img className={classes.btnImg} src={imgShop} />
              <p className={classes.text}>{text.buttons[0]}</p>
            </Button>
            <Button
              color={'white'}
              justIcon={false}
              className={
                values.code_type == 'product'
                  ? classes.itemsContainer
                  : classes.itemsContainer + ' ' + classes.itemsContainer_active
              }
              onClick={() => handleChangeCodeType('product')}
              disabled={all}>
              <img className={classes.btnImg} src={imgProduct} />
              <p className={classes.text}>{text.buttons[1]}</p>
            </Button>
          </div>
        </FormCellCustom>
        {/* Promotion Name */}
        <FormCellCustom label={text.form_cell_custom[1]} helperText={text.helper_text[0]}>
          <div className={classes.formCell}>
            <TextField
              //   error={validateItemName ? false : true}
              id="input1"
              label={''}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                value: values.promotion_name,
                onChange: handleChangeValue('promotion_name'),
              }}
              placeholder={text.placeholder}
              autoComplete="off"
              disabled={upcoming}
            />
          </div>
        </FormCellCustom>
        {/* Voucher Code */}
        <FormCellCustom label={text.form_cell_custom[2]} helperText={text.helper_text[1]}>
          <div className={classes.formCell}>
            <FormControl fullWidth variant="outlined" size="small">
              <OutlinedInput
                id="outlined-adornment-amount-1"
                value={values.voucher_code.replace('SHOP', '')}
                onChange={handleChangeValue('voucher_code')}
                startAdornment={<InputAdornment position="start">SHOP</InputAdornment>}
                placeholder={text.placeholder}
                autoComplete="off"
                disabled={all}
              />
            </FormControl>
          </div>
        </FormCellCustom>
        {/* Time */}
        <FormCellCustom label={text.form_cell_custom[3]} helperText={text.helper_text[2]}>
          <div className={classes.formCell + ' ' + classes.flex_center}>
            <TextField
              id="datetime-local"
              // label="Next appointment"
              type="datetime-local"
              value={values.time_from}
              onChange={handleChangeValue('time_from')}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={upcoming}
            />
            <span
              style={{
                margin: '0 15px',
                width: '15px',
                height: '2px',
                backgroundColor: grayColor[0],
                display: 'block',
              }}></span>
            <TextField
              id="datetime-local"
              // label="Next appointment"
              type="datetime-local"
              value={values.time_to}
              onChange={handleChangeValue('time_to')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={upcoming}
            />
          </div>
        </FormCellCustom>
      </FormGroupCustom>
    );
  };

  const FormGroupCustom_2 = () => {
    return (
      <FormGroupCustom title={text.form_group_custom[1]}>
        {/* Voucher type */}
        <FormCellCustom label={text.form_cell_custom[4]} helperText={''}>
          <div className={classes.formCell}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="shop"
                name="shop1"
                value={values.voucher_type}
                onChange={handleChangeValue('voucher_type')}
                className={classes.flex_center}>
                <FormControlLabel
                  value={'promotion'}
                  control={<CustomRadio />}
                  label={text.radios[0]}
                  disabled={all}
                />
                <FormControlLabel
                  value={'recoin'}
                  control={<CustomRadio />}
                  label={text.radios[1]}
                  disabled={all}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </FormCellCustom>
        {/* Discount */}
        <FormCellCustom
          label={text.form_cell_custom[5]}
          helperText={
            values.voucher_type == 'recoin'
              ? 'Người mua sẽ nhận được -% từ số tiền thanh toán bằng Shopee xu. Quy tắc đổi xu: ₫20000 = 20000 Shopee xu.'
              : null
          }>
          <div className={classes.formCell}>
            {values.voucher_type == 'promotion' ? (
              <div className={classes.flex_center}>
                <FormControl variant="outlined" size="small">
                  <Select
                    labelId="select-outlined-label-1"
                    id="select-outlined"
                    value={values.discount_type}
                    onChange={handleChangeValue('discount_type')}
                    disabled={upcoming}>
                    <MenuItem value={'money'}>{text.selects[0]}</MenuItem>
                    <MenuItem value={'percent'}>{text.selects[1]}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" size="small" style={{ flex: 1 }}>
                  <OutlinedInput
                    id="outlined-adornment-amount-5"
                    value={values.discount}
                    onChange={handleChangeValue('discount')}
                    endAdornment={
                      <InputAdornment position="end">
                        {values.discount_type == 'money' ? '₫' : '%'}
                      </InputAdornment>
                    }
                    type="number"
                    autoComplete="off"
                    placeholder={text.placeholder}
                    disabled={upcoming}
                  />
                </FormControl>
              </div>
            ) : (
              <FormControl variant="outlined" size="small" className={classes.flex_center}>
                <OutlinedInput
                  id="outlined-adornment-amount-5"
                  value={values.discount}
                  onChange={handleChangeValue('discount')}
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                  type="number"
                  autoComplete="off"
                  style={{ flex: 1 }}
                  placeholder={text.placeholder}
                  disabled={upcoming}
                />
              </FormControl>
            )}
          </div>
        </FormCellCustom>
        {/* Discount maximum */}
        <FormCellCustom
          label={text.form_cell_custom[6]}
          helperText={values.discount_max_type == 'limit' ? text.helper_text[3] : null}>
          <div className={classes.formCell + ' ' + classes.flex_center}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="shop"
                name="shop1"
                value={values.discount_max_type}
                onChange={handleChangeValue('discount_max_type')}
                className={classes.flex_center}>
                <FormControlLabel
                  value={'limit'}
                  control={<CustomRadio />}
                  label={text.radios[2]}
                  disabled={upcoming}
                />
                <FormControlLabel
                  value={'unlimited'}
                  control={<CustomRadio />}
                  label={text.radios[3]}
                  disabled={upcoming}
                />
              </RadioGroup>
            </FormControl>
            {values.discount_max_type == 'limit' && (
              <FormControl component="fieldset" size="small" style={{ flex: 1 }}>
                <OutlinedInput
                  id="outlined-adornment-amount-5"
                  value={values.discount_max}
                  onChange={handleChangeValue('discount_max')}
                  endAdornment={<InputAdornment position="end">₫</InputAdornment>}
                  type="number"
                  autoComplete="off"
                  style={{ flex: 1 }}
                  placeholder={text.placeholder}
                  disabled={upcoming}
                />
              </FormControl>
            )}
          </div>
        </FormCellCustom>
        {/* Minimum order value */}
        <FormCellCustom label={text.form_cell_custom[7]} helperText={''}>
          <div className={classes.formCell + ' ' + classes.flex_center}>
            <FormControl component="fieldset" size="small" style={{ flex: 1 }}>
              <OutlinedInput
                id="outlined-adornment-amount-5"
                value={values.order_money_min}
                onChange={handleChangeValue('order_money_min')}
                endAdornment={<InputAdornment position="end">₫</InputAdornment>}
                type="number"
                autoComplete="off"
                style={{ flex: 1 }}
                placeholder={text.placeholder}
                disabled={upcoming}
              />
            </FormControl>
          </div>
        </FormCellCustom>
        {/* Maximum usage */}
        <FormCellCustom label={text.form_cell_custom[8]} helperText={text.helper_text[4]}>
          <div className={classes.formCell + ' ' + classes.flex_center}>
            <FormControl component="fieldset" size="small" style={{ flex: 1 }}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={''}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.maximum_usage,
                  onChange: handleChangeValue('maximum_usage'),
                }}
                placeholder={text.placeholder}
                autoComplete="off"
                disabled={upcoming}
              />
            </FormControl>
          </div>
        </FormCellCustom>
      </FormGroupCustom>
    );
  };

  const FormGroupCustom_3 = () => {
    return (
      <FormGroupCustom title={text.form_group_custom[2]}>
        {/* Display */}
        <FormCellCustom label={text.form_cell_custom[9]} helperText={''}>
          <div className={classes.formCell}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="shop"
                name="shop1"
                value={values.display}
                onChange={handleChangeValue('display')}
                className={classes.flex_column}>
                <FormControlLabel
                  value={'many'}
                  control={<CustomRadio />}
                  label={text.radios[4]}
                  disabled={upcoming}
                />
                {values.code_type == 'all' ? (
                  <>
                    <FormControlLabel
                      value={'voucher'}
                      control={<CustomRadio />}
                      label={text.radios[5]}
                      disabled={upcoming}
                    />
                    <FormControlLabel
                      value={'channels'}
                      control={<CustomRadio />}
                      label={text.radios[6]}
                      disabled={upcoming}
                    />
                  </>
                ) : (
                  <FormControlLabel
                    value={'noPublic'}
                    control={<CustomRadio />}
                    label={text.radios[7]}
                    disabled={upcoming}
                  />
                )}
              </RadioGroup>
              {values.display == 'channels' && (
                <div className={classes.checkboxContainer + ' ' + classes.flex_center}>
                  {checkBoxChannels.map((item, index) => {
                    return (
                      <div className={classes.checkboxItem + ' ' + classes.flex_center} key={index}>
                        <Checkbox
                          checked={values.display_channel.indexOf(item.value) !== -1}
                          tabIndex={-1}
                          onClick={() => handleSetDisplayChannel(item.value)}
                          checkedIcon={<Check className={taskClasses.checkedIcon} />}
                          icon={<Check className={taskClasses.uncheckedIcon} />}
                          classes={{
                            checked: taskClasses.checked,
                            root: taskClasses.root,
                          }}
                          disabled={upcoming}
                        />
                        <p className={classes.text + ' ' + classes.checkBoxLabel}>{item.name}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </FormControl>
          </div>
        </FormCellCustom>
        {/* Applicable products */}
        <FormCellCustom label={text.form_cell_custom[10]} helperText={''}>
          <div className={classes.formCell}>
            {values.code_type == 'all' ? (
              <p className={classes.text + ' ' + classes.checkBoxLabel}>
                {text.applicable_products_text[0]}
              </p>
            ) : (
              <div className={classes.flex_center} style={{ justifyContent: 'space-between' }}>
                <p
                  className={classes.text + ' ' + classes.infoTextPrimary}
                  style={{ color: grayColor[0] }}>
                  {values.added_product?.length} {text.applicable_products_text[1]}
                </p>
                <Button color="primary" onClick={() => setIsShowModal(true)} disabled={upcoming}>
                  {text.buttons[2]}
                </Button>
              </div>
            )}
          </div>
        </FormCellCustom>
      </FormGroupCustom>
    );
  };

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{text.title}</h4>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        {FormGroupCustom_1()}
        {FormGroupCustom_2()}
        {FormGroupCustom_3()}
        {values.code_type == 'product' && values.added_product?.length > 0 && (
          <div className={classes.formCell} style={{ margin: '0 auto' }}>
            {TableData()}
          </div>
        )}
        <ModalCustom
          width={1000}
          title={text.popup_title}
          subTitle={''}
          // isShow={true}
          isShow={isShowModal}
          handleClose={() => setIsShowModal(false)}>
          <div className={classes.flex_center}>
            <FormControl variant="outlined" size="small">
              <Select
                labelId="select-outlined-label-1"
                id="select-outlined"
                value={filterType}
                onChange={handleChangeFilterType}>
                <MenuItem value={'name'}>{text.popup_select[0]}</MenuItem>
                <MenuItem value={'id'}>{text.popup_select[1]}</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small" style={{ flex: 1 }}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={''}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: filterValue,
                  onChange: handleChangeFilterValue,
                }}
                placeholder={text.placeholder}
                autoComplete="off"
                style={{ flex: 1 }}
              />
            </FormControl>
            <div style={{ marginLeft: '10px' }}>
              <Button color="primary">{text.popup_button[0]}</Button>
              <Button color="gray">{text.popup_button[1]}</Button>
            </div>
          </div>
          <div className={tableClasses.tableResponsive} style={{ marginTop: '0' }}>
            <Table className={tableClasses.table}>
              {dataProduct !== undefined ? (
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
                    {text.tableHead_2.map((prop, key) => {
                      return (
                        <TableCell
                          className={tableClasses.tableCell + ' ' + tableClasses.tableHeadCell}
                          key={key}>
                          {prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
              ) : null}
              <TableBody>
                {dataProduct.map((item, index) => {
                  return renderProduct(item, index);
                })}
              </TableBody>
            </Table>
            <div className={classes.buttonContainer}>
              <Button
                color="primary"
                onClick={() => {
                  setValues({ ...values, ['added_product']: checked }), setIsShowModal(false);
                }}>
                {text.popup_button[2]}
              </Button>
            </div>
          </div>
        </ModalCustom>
      </CardBody>
      <CardFooter className={classes.flex_end}>
        <Button color="primary" onClick={() => handleSubmit()} disabled={upcoming}>
          {text.buttons[3]}
        </Button>
      </CardFooter>
    </Card>
  );
}

VoucherDetailPage.layout = Admin;

export default WithAuthentication(VoucherDetailPage);
