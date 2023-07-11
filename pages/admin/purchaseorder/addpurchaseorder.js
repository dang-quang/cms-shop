import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import moment from 'moment';
import Link from 'next/link';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
import { infoColor, grayColor } from 'assets/jss/natcash.js';
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
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  makeStyles,
  Checkbox,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Pagination from '@material-ui/lab/Pagination';
import Check from '@material-ui/icons/Check';
import DateFnsUtils from '@date-io/date-fns';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import GridContainer from 'components/Grid/GridContainer.js';
import TextField from '@material-ui/core/TextField';
import adminStyles from 'assets/jss/natcash/components/headerLinksStyle.js';
import tableStyles from 'assets/jss/natcash/components/tableStyle.js';
import taskStyles from 'assets/jss/natcash/components/tasksStyle.js';
import shopStyle from 'assets/jss/natcash/views/shoplist/shoplistStyle.js';
import { Icon } from '@material-ui/core';
import dashStyles from 'assets/jss/natcash/views/dashboardStyle.js';
import useWindowSize from 'components/Hooks/useWindowSize.js';
import ModalCustom from 'components/ModalCustom/ModalCustom.js';
import {
  getAllSupplier,
  getAllStock,
  getInventoryItemList,
  createNewPurchaseOrder,
} from 'utilities/ApiManage';
import { formatCurrency } from 'utilities/utils';

import styles from 'assets/jss/natcash/views/purchaseorder/addPurchaseOrderStyle.js';
import { setShowLoader } from 'redux/actions/app';

function AddPurchaseOrderPage() {
  const dispatch = useDispatch();
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
  const language = useSelector((state) => state.app.language);
  // Modal select product
  const [isShowModal, setIsShowModal] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checked, setChecked] = useState([]);
  const [doFilter, setDoFilter] = useState(false);
  //Phân trang
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  //
  const [selectedId, setSelectedId] = useState([]);
  //
  const [currentStep, setCurrentStep] = useState(1);
  const [supplierInfo, setSupplierInfo] = useState({
    name: '',
    address: '',
    contact_person: '',
    email: '',
    phone: '',
  });
  const [stockInfo, setStockInfo] = useState({
    name: '',
    address: '',
    contact_person: '',
    email: '',
    phone: '',
  });
  const [values, setValues] = React.useState({
    supplier_id: '',
    po_type: '',
    reference_id: '',
    order_date: moment().format(),
    create_date: moment().format(),
    delivery_date: moment().format(),
    currency: '',
    payment_methods: '',
    stock_id: '',
    list_products: [],
    notes: '',
    total_amount_of_goods: 0,
    discount: 0,
    other_fee: 0,
    total_amount_excluding_tax: 0,
    tax: 0,
    total_amount_including_tax: 0,
    status: 'draft',
  });

  const CARD = [
    {
      id: 'en',
      title: [
        'Create purchase order',
        'Supplier',
        'General information',
        'Import Stock',
        'List product',
        'Notes and purchase order fees',
      ],
      subTitle: [
        'No supplier yet? Choose create new now',
        'No stock yet? Choose create new now',
        'selected products',
      ],
    },
    {
      id: 'vi',
      title: [
        'Tạo phiếu nhập hàng',
        'Nhà cung cấp',
        'Thông tin chung',
        'Chuyển đến kho',
        'Danh sách sản phẩm',
        'Ghi chú và phí đặt hàng',
      ],
      subTitle: [
        'Chưa có nhà cung cấp? Chọn tạo mới ngay',
        'Chưa có kho hàng? Chọn tạo mới ngay',
        'sản phẩm đã chọn',
      ],
    },
  ];

  const STEP = [
    {
      id: 'en',
      value: ['General information', 'Select product', 'Preview and create new'],
    },
    {
      id: 'vi',
      value: ['Thông tin chung', 'Chọn sản phẩm', 'Xem trước và tạo mới'],
    },
  ];

  const ACTIONS = [
    {
      id: 'en',
      button: [
        'Create New Supplier',
        'Create New Stock',
        'Reset',
        'Save Draft',
        'Continue',
        'Create new',
        'Select product',
        'Check price',
      ],
      select: [
        'Supplier *',
        'Address',
        'Contact person',
        'Email',
        'Contact phone',
        'PO type *',
        'Reference ID',
        'Order date *',
        'Delivery date (desired) *',
        'Currency *',
        'Payment methods',
        'Stock *',
        'Notes',
        'Total amount of goods (VND)',
        'Discount (VND)',
        'Other fee (VND)',
        'Total amount (excluding tax) (VND)',
        'Tax (%)',
        'Total amount (including tax) (VND)',
      ],
    },
    {
      id: 'vi',
      button: [
        'Tạo nhà cung cấp mới',
        'Tạo kho hàng mới',
        'Đặt lại',
        'Lưu nháp',
        'Tiếp tục',
        'Tạo mới',
        'Chọn sản phẩm',
        'Kiểm tra giá',
      ],
      select: [
        'Nhà cung cấp *',
        'Địa chỉ',
        'Người liên hệ',
        'Email',
        'Điện thoại liên hệ',
        'Loại PO *',
        'Mã tham chiếu',
        'Ngày đặt hàng *',
        'Ngày giao hàng (mong muốn) *',
        'Loại tiền *',
        'Phương thức thanh toán',
        'Kho nhập *',
        'Ghi chú',
        'Tổng tiền hàng (đ)',
        'Giảm giá (đ)',
        'Phí khác (đ)',
        'Tổng tiền (chưa thuế) (đ)',
        'Thuế (%)',
        'Tổng tiền (bao gồm thuế) (đ)',
      ],
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

  const TABLE_HEAD_MODAL = [
    {
      id: 'en',
      value: ['Product', 'Quantity', 'Unit', 'Price'],
    },
    {
      id: 'vi',
      value: ['Sản phẩm', 'Số lượng', 'ĐVT', 'Đơn giá'],
    },
  ];

  const TABLE_HEAD = [
    {
      id: 'en',
      value: [
        'Product',
        'Quantity',
        'Unit',
        'Price',
        'Qty | Inventory unit',
        'Import unit price',
        'Total money',
        'Action',
      ],
    },
    {
      id: 'vi',
      value: [
        'Sản phẩm',
        'Số lượng',
        'ĐVT',
        'Đơn giá',
        'SL | ĐTV nhập kho',
        'Đơn giá nhập kho',
        'Thành tiền',
        'Thao tác',
      ],
    },
  ];

  const listText = [
    {
      id: 'en',
      card: CARD[0],
      step: STEP[0].value,
      actions: ACTIONS[0],
      popup_title: POPUP[0].title,
      popup_button: POPUP[0].button,
      popup_select: POPUP[0].select,
      tableHead_modal: TABLE_HEAD_MODAL[0].value,
      tableHead: TABLE_HEAD[0].value,
      placeholder: 'Enter here',
      createDate: 'Create date',
      errLog: 'You need to enter required data',
    },
    {
      id: 'vi',
      card: CARD[1],
      step: STEP[1].value,
      actions: ACTIONS[1],
      popup_title: POPUP[1].title,
      popup_button: POPUP[1].button,
      popup_select: POPUP[1].select,
      tableHead_modal: TABLE_HEAD_MODAL[1].value,
      tableHead: TABLE_HEAD[1].value,
      placeholder: 'Nhập vào',
      createDate: 'Ngày tạo',
      errLog: 'Bạn cần nhập đủ dữ liệu bắt buộc',
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

  //Call API
  const [suppliers, setSuppliers] = useState([]);
  const getSuppliers = async () => {
    let res = await getAllSupplier();
    setSuppliers(res.data);
  };
  const [stocks, setStocks] = useState([]);
  const getStocks = async () => {
    let res = await getAllStock();
    setStocks(res.data);
  };
  useEffect(() => {
    dispatch(setShowLoader(true));
    getSuppliers();
    getStocks();
    dispatch(setShowLoader(false));
  }, []);

  useEffect(async () => {
    let params = {};
    params.current_page = currentPage;
    if (filterValue) {
      params.keyword = filterValue;
    }
    dispatch(setShowLoader(true));
    let res = await getInventoryItemList(params);
    if (res.code == 200) {
      let products = [];
      res?.data?.item_list?.map((item) => {
        let product = {};
        product.category_id = item.category_id;
        product.item_id = item.item_id;
        product.image = item.detail.image_list[0];
        product.item_name = item.item_name;
        product.item_sku = item.item_sku;
        product.quantity = 1;
        product.unit = 'piece';
        product.price = 0;
        product.import_qty = 1;
        product.import_unit = 'Cái';
        product.price_importQty = 0;
        product.total_amount = 0;
        products.push(product);
      });
      setData({ ...data, ['products']: products });
      setCurrentPage(res.data.data_page.current_page);
      setTotalPage(res.data.data_page.total_page);
    }
    dispatch(setShowLoader(false));
  }, [currentPage, doFilter]);

  const handleSelectPage = (event, value) => {
    setCurrentPage(value);
    setIsCheckAll(false);
  };

  const [data, setData] = useState({
    po_type: [
      {
        name: 'Outright',
        value: 'outright',
      },
      {
        name: 'Consignment',
        value: 'consignment',
      },
      {
        name: 'Hybrid Retail',
        value: 'hybrid_retail',
      },
    ],
    currency: [
      {
        name: 'VND',
        value: 'vnd',
      },
      {
        name: '$',
        value: 'dollar',
      },
    ],
    products: [],
  });

  const listPreviewData = [
    {
      title: text.card.title[2],
      data: [
        { title: text.actions.select[5], value: values.po_type },
        { title: text.actions.select[6], value: values.reference_id },
        {
          title: text.createDate,
          value: moment(values.create_date).format('DD-MM-yyyy hh:mm'),
        },
        {
          title: text.actions.select[7],
          value: moment(values.order_date).format('DD-MM-yyyy hh:mm'),
        },
        {
          title: text.actions.select[8],
          value: moment(values.delivery_date).format('DD-MM-yyyy hh:mm'),
        },
        { title: text.actions.select[9], value: values.currency },
        { title: text.actions.select[10], value: values.payment_methods },
      ],
    },
    {
      title: text.card.title[1],
      data: [
        { title: text.actions.select[0], value: supplierInfo.name },
        { title: text.actions.select[2], value: supplierInfo.contact_person },
        { title: text.actions.select[3], value: supplierInfo.email },
        { title: text.actions.select[4], value: supplierInfo.phone },
        { title: text.actions.select[1], value: supplierInfo.address },
      ],
    },
    {
      title: text.card.title[3],
      data: [
        { title: text.actions.select[11], value: stockInfo.name },
        { title: text.actions.select[2], value: stockInfo.contact_person },
        { title: text.actions.select[3], value: stockInfo.email },
        { title: text.actions.select[4], value: stockInfo.phone },
        { title: text.actions.select[1], value: stockInfo.address },
      ],
    },
  ];

  //change value input form
  const handleChangeValue = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    if (prop == 'supplier_id') {
      suppliers.map((item, index) => {
        if (item._id == event.target.value) {
          setSupplierInfo(item);
        }
      });
    } else if (prop == 'stock_id') {
      stocks.map((item, index) => {
        if (item._id == event.target.value) {
          setStockInfo(item);
        }
      });
    }
  };

  //change value filter form
  const handleChangeFilter = (event) => {
    setFilterValue(event.target.value);
  };

  const handleChangeDateValue = (prop) => (date) => {
    setValues({ ...values, [prop]: date });
  };

  const handelReset = () => {
    let resetData = {
      name: '',
      address: '',
      contact_person: '',
      email: '',
      phone: '',
    };
    setValues({
      supplier_id: '',
      po_type: '',
      reference_id: '',
      order_date: moment().format(),
      delivery_date: moment().format(),
      currency: '',
      payment_methods: '',
      stock_id: '',
    });
    setSupplierInfo(resetData);
    setStockInfo(resetData);
  };

  const handleCheckAll = () => {
    if (isCheckAll) {
      setIsCheckAll(false);
    } else {
      setIsCheckAll(true);
      let selectedProduct = data.products;
      const newChecked = [...checked];
      selectedProduct.map((item) => {
        const currentIndex = checked.indexOf(item);
        if (currentIndex === -1) {
          newChecked.push(item);
        }
      });
      setChecked(newChecked);
    }
  };

  const handleToggle = (item) => {
    let selectId = [];
    checked.map((cItem) => {
      selectId.push(cItem.item_id);
    });
    setSelectedId(selectId);
    const sIndex = selectedId.indexOf(item.item_id);
    const currentIndex = checked.indexOf(item);
    const newChecked = [...checked];
    if (currentIndex === -1 && sIndex === -1) {
      newChecked.push(item);
    } else {
      setIsCheckAll(false);
    }
    setChecked(newChecked);
  };

  const deleteSelectedProduct = (item) => {
    const currentIndex = values.list_products.indexOf(item);
    const newChecked = [...values.list_products];
    newChecked.splice(currentIndex, 1);
    setValues({ ...values, ['list_products']: newChecked });
    setChecked(newChecked);
  };

  const handelChangeProductValue = (item, props) => (event) => {
    let data = { ...values };
    let index = data.list_products.indexOf(item);
    let cloneData = [...data.list_products];
    let cloneItem = { ...cloneData[index] };
    cloneItem[props] = event.target.value;
    if (props === 'quantity') {
      cloneItem['import_qty'] = event.target.value;
    } else if (props === 'unit') {
      cloneItem['import_unit'] = event.target.value;
    } else if (props === 'price') {
      cloneItem['price_importQty'] = event.target.value;
    }
    cloneItem['total_amount'] =
      parseInt(cloneItem['import_qty']) * parseInt(cloneItem['price_importQty']);
    cloneData[index] = cloneItem;
    data.list_products = cloneData;
    setValues({ ...data });
    setChecked(cloneData);
  };
  const [isCheckPrice, setIsCheckPrice] = useState(false);
  useEffect(() => {
    handleCheckPrice();
  }, [isCheckPrice]);

  const handleCheckPrice = async () => {
    let cloneData = { ...values };
    let price = 0;
    cloneData.list_products.map((item) => {
      price += item.total_amount;
    });
    cloneData.total_amount_of_goods = price;
    cloneData.total_amount_excluding_tax =
      parseInt(cloneData.total_amount_of_goods) -
      parseInt(cloneData.discount) +
      parseInt(cloneData.other_fee);
    cloneData.total_amount_including_tax =
      parseInt(cloneData.total_amount_excluding_tax) -
      (parseInt(cloneData.total_amount_excluding_tax) * parseInt(cloneData.tax)) / 100;
    setValues(cloneData);
  };

  const handelValidate = () => {
    if (currentStep === 1) {
      if (
        !values.supplier_id ||
        !values.po_type ||
        !values.order_date ||
        !values.delivery_date ||
        !values.currency ||
        !values.stock_id
      ) {
        NotificationManager.error({
          title: 'Error',
          message: text.errLog,
        });
      } else {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 2) {
      if (values.list_products.length < 1) {
        NotificationManager.error({
          title: 'Error',
          message: text.errLog,
        });
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleSubmit = async (type) => {
    if (type === 'finished') {
      let obj = values;
      obj.status = type;
      setValues(obj);
    }
    dispatch(setShowLoader(true));
    let res = await createNewPurchaseOrder(values);
    dispatch(setShowLoader(false));
    if (res.code === 200) {
      Router.push('/admin/purchaseorder');
    } else {
      NotificationManager.error({
        title: 'Error',
        message: res.message ? res.message.text : 'Error',
      });
    }
  };

  // components
  const stepContainer = () => {
    return (
      <CardHeader color="primary" className={classes.stepContainer}>
        <div className={classes.flex_center} style={{ justifyContent: 'space-between' }}>
          <h4 className={classes.cardTitleWhite} style={{ fontSize: 18 }}>
            {text.card.title[0]}
          </h4>
          <div className={classes.flex_center}>
            <p
              className={
                currentStep >= 1
                  ? classes.activeStep + ' ' + classes.step + ' ' + classes.flex_center
                  : classes.step + ' ' + classes.flex_center
              }>
              <span
                className={
                  currentStep >= 1
                    ? classes.stepNumber + ' ' + classes.activeStepNumber
                    : classes.stepNumber
                }>
                1
              </span>
              {text.step[0]}
            </p>
            <p
              className={
                currentStep >= 2
                  ? classes.activeStep + ' ' + classes.step + ' ' + classes.flex_center
                  : classes.step + ' ' + classes.flex_center
              }>
              <span
                className={
                  currentStep >= 2
                    ? classes.stepNumber + ' ' + classes.activeStepNumber
                    : classes.stepNumber
                }>
                2
              </span>
              {text.step[1]}
            </p>
            <p
              className={
                currentStep == 3
                  ? classes.activeStep + ' ' + classes.step + ' ' + classes.flex_center
                  : classes.step + ' ' + classes.flex_center
              }>
              <span
                className={
                  currentStep == 3
                    ? classes.stepNumber + ' ' + classes.activeStepNumber
                    : classes.stepNumber
                }>
                3
              </span>
              {text.step[2]}
            </p>
          </div>
        </div>
      </CardHeader>
    );
  };

  const chooseSupplier = () => {
    return (
      <Card>
        <CardHeader color="primary" className={classes.flex_center_between}>
          <div className={classes.flex_column}>
            <h4 className={classes.cardTitleWhite}>{text.card.title[1]}</h4>
            <p className={classes.cardCategoryWhite}>{text.card.subTitle[0]}</p>
          </div>
          <Button color="primary">
            <Link href={'/admin/supplier/addsupplier?from=addpurchaseorder'}>
              <span>{text.actions.button[0]}</span>
            </Link>
          </Button>
        </CardHeader>
        <CardBody className={classes.cardBody} style={{ marginTop: 20 }}>
          <GridContainer>
            {/* Supplier Name*/}
            <GridItem xs={12} sm={4} md={4}>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                className={classes.custom_field}>
                <InputLabel id="demo-simple-select-outlined-label">
                  {text.actions.select[0]}
                </InputLabel>
                <Select
                  value={values.supplier_id}
                  onChange={handleChangeValue('supplier_id')}
                  label={text.actions.select[0]}>
                  {suppliers.map((item, index) => {
                    return (
                      <MenuItem value={item._id} key={index}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </GridItem>
            {/* Supplier Address */}
            <GridItem xs={12} sm={8} md={8}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[1]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: supplierInfo.address,
                  //   onChange: handleChangeValue(""),
                }}
                autoComplete="off"
                className={classes.custom_field}
                disabled
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            {/* Supplier Contact person */}
            <GridItem xs={4} sm={4} md={4}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[2]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: supplierInfo.contact_person,
                  //   onChange: handleChangeValue(""),
                }}
                autoComplete="off"
                className={classes.custom_field}
                disabled
              />
            </GridItem>
            {/* Supplier Email */}
            <GridItem xs={4} sm={4} md={4}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[3]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: supplierInfo.email,
                  //   onChange: handleChangeValue(""),
                }}
                autoComplete="off"
                className={classes.custom_field}
                disabled
              />
            </GridItem>
            {/* Supplier Phone Number */}
            <GridItem xs={4} sm={4} md={4}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[4]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: supplierInfo.phone,
                  //   onChange: handleChangeValue(""),
                }}
                autoComplete="off"
                className={classes.custom_field}
                disabled
              />
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    );
  };

  const generalInformation = () => {
    return (
      <Card>
        <CardHeader color="primary" className={classes.flex_center_between}>
          <h4 className={classes.cardTitleWhite}>{text.card.title[2]}</h4>
        </CardHeader>
        <CardBody className={classes.cardBody} style={{ marginTop: 20 }}>
          <GridContainer>
            {/* PO Type*/}
            <GridItem xs={12} sm={4} md={4}>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                className={classes.custom_field}>
                <InputLabel id="demo-simple-select-outlined-label">
                  {text.actions.select[5]}
                </InputLabel>
                <Select
                  value={values.po_type}
                  onChange={handleChangeValue('po_type')}
                  label={text.actions.select[5]}>
                  {data.po_type.map((item, index) => {
                    return (
                      <MenuItem value={item.value} key={index}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </GridItem>
            {/* Reference ID */}
            <GridItem xs={12} sm={4} md={4}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[6]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.reference_id,
                  onChange: handleChangeValue('reference_id'),
                }}
                autoComplete="off"
                className={classes.custom_field}
              />
            </GridItem>
            <GridItem xs={false} sm={4} md={4}></GridItem>
          </GridContainer>
          <GridContainer>
            {/* Order Date */}
            <GridItem xs={4} sm={4} md={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  id="date-picker-inline"
                  label={text.actions.select[7]}
                  value={values.order_date}
                  onChange={handleChangeDateValue('order_date')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  fullWidth
                  className={classes.custom_field}
                />
              </MuiPickersUtilsProvider>
            </GridItem>
            {/* Delivery Date */}
            <GridItem xs={4} sm={4} md={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  id="date-picker-inline"
                  label={text.actions.select[8]}
                  value={values.delivery_date}
                  onChange={handleChangeDateValue('delivery_date')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  fullWidth
                  className={classes.custom_field}
                />
              </MuiPickersUtilsProvider>
            </GridItem>
            <GridItem xs={4} sm={4} md={4}>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                className={classes.custom_field}>
                <InputLabel id="demo-simple-select-outlined-label">
                  {text.actions.select[9]}
                </InputLabel>
                <Select
                  value={values.currency}
                  onChange={handleChangeValue('currency')}
                  label={text.actions.select[9]}>
                  {data.currency.map((item, index) => {
                    return (
                      <MenuItem value={item.value} key={index}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </GridItem>
          </GridContainer>
          <GridContainer>
            {/* Payment Methods */}
            <GridItem xs={4} sm={4} md={4}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[10]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.payment_methods,
                  onChange: handleChangeValue('payment_methods'),
                }}
                autoComplete="off"
                className={classes.custom_field}
              />
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  };

  const chooseStock = () => {
    return (
      <Card>
        <CardHeader color="primary" className={classes.flex_center_between}>
          <div className={classes.flex_column}>
            <h4 className={classes.cardTitleWhite}>{text.card.title[3]}</h4>
            <p className={classes.cardCategoryWhite}>{text.card.subTitle[1]}</p>
          </div>
          <Button color="primary">
            <Link href={'/admin/stock/addstock?from=addpurchaseorder'}>
              <span>{text.actions.button[1]}</span>
            </Link>
          </Button>
        </CardHeader>
        <CardBody className={classes.cardBody} style={{ marginTop: 20 }}>
          <GridContainer>
            {/* Stock Name*/}
            <GridItem xs={12} sm={4} md={4}>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                className={classes.custom_field}>
                <InputLabel id="demo-simple-select-outlined-label">
                  {text.actions.select[11]}
                </InputLabel>
                <Select
                  value={values.stock_id}
                  onChange={handleChangeValue('stock_id')}
                  label={text.actions.select[11]}>
                  {stocks.map((item, index) => {
                    return (
                      <MenuItem value={item._id} key={index}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </GridItem>
            {/* Stock Address */}
            <GridItem xs={12} sm={8} md={8}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[1]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: stockInfo.address,
                  //   onChange: handleChangeValue(""),
                }}
                autoComplete="off"
                className={classes.custom_field}
                disabled
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            {/* Stock Contact person */}
            <GridItem xs={4} sm={4} md={4}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[2]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: stockInfo.contact_person,
                  //   onChange: handleChangeValue(""),
                }}
                autoComplete="off"
                className={classes.custom_field}
                disabled
              />
            </GridItem>
            {/* Stock Email */}
            <GridItem xs={4} sm={4} md={4}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[3]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: stockInfo.email,
                  //   onChange: handleChangeValue(""),
                }}
                autoComplete="off"
                className={classes.custom_field}
                disabled
              />
            </GridItem>
            {/* Stock Phone Number */}
            <GridItem xs={4} sm={4} md={4}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[4]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: stockInfo.phone,
                  //   onChange: handleChangeValue(""),
                }}
                autoComplete="off"
                className={classes.custom_field}
                disabled
              />
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    );
  };

  const tableModal = (item, index) => {
    return (
      <TableRow key={index} className={tableClasses.tableBodyRow}>
        <TableCell className={tableClasses.tableCell}>
          <Checkbox
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
        <TableCell className={tableClasses.tableCell + ' ' + tableClasses.cellWidth_400}>
          <div className={classes.cellInfo}>
            <img src={item.image} className={classes.tableImage} />
            <div className={classes.infoTextContainer}>
              <p className={classes.text + ' ' + classes.infoTextPrimary}>{item.item_name}</p>
              <p className={classes.text + ' ' + classes.infoTextSecondary}>{item.item_sku}</p>
            </div>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>{item.quantity}</TableCell>
        <TableCell className={tableClasses.tableCell}>{item.unit}</TableCell>
        <TableCell className={tableClasses.tableCell}>{item.price}</TableCell>
      </TableRow>
    );
  };

  const modalSelectProduct = () => {
    return (
      <ModalCustom
        width={1000}
        title={text.popup_title}
        subTitle={''}
        // isShow={true}
        isShow={isShowModal}
        handleClose={() => setIsShowModal(false)}>
        <div className={classes.flex_center}>
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
                onChange: handleChangeFilter,
              }}
              placeholder={text.placeholder}
              autoComplete="off"
              style={{ flex: 1 }}
            />
          </FormControl>
          <div style={{ marginLeft: '10px' }}>
            <Button color="primary" onClick={() => setDoFilter(!doFilter)}>
              {text.popup_button[0]}
            </Button>
          </div>
        </div>
        <div className={classes.tableResponsive} style={{ marginTop: '0' }}>
          <Table className={tableClasses.table}>
            {data.products !== undefined ? (
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
                  {text.tableHead_modal.map((prop, key) => {
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
              {data.products.map((item, index) => {
                return tableModal(item, index);
              })}
            </TableBody>
          </Table>
        </div>
        <div className={[classes.flex_center_between, classes.paginationContainer].join(' ')}>
          <Pagination count={totalPage} page={currentPage} onChange={handleSelectPage} />
          <Button
            color="primary"
            onClick={() => {
              setValues({ ...values, ['list_products']: checked }),
                setIsShowModal(false),
                setIsCheckAll(false);
            }}>
            {text.popup_button[2]}
          </Button>
        </div>
      </ModalCustom>
    );
  };

  const TableData = () => {
    return (
      <div className={tableClasses.tableResponsive}>
        <Table className={tableClasses.table + ' ' + tableClasses.tableCustom}>
          {values.list_products !== undefined ? (
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
            {values.list_products?.map((item, index) => {
              return renderTable(item, index);
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderTable = (item, index) => {
    return (
      <TableRow key={index} className={tableClasses.tableBodyRow}>
        <TableCell className={tableClasses.tableCell} style={{ width: 330 }}>
          <div className={classes.cellInfo}>
            <img src={item.image} className={classes.tableImage} />
            <div className={classes.infoTextContainer}>
              <p className={classes.text + ' ' + classes.infoTextPrimary}>{item.item_name}</p>
              <p className={classes.text + ' ' + classes.infoTextSecondary}>{item.item_sku}</p>
            </div>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} style={{ width: 80 }}>
          <TextField
            //   error={validateItemName ? false : true}
            id="input1"
            label={''}
            variant="outlined"
            size="small"
            fullWidth
            inputProps={{
              value: item.quantity,
              onChange: handelChangeProductValue(item, 'quantity'),
            }}
            type="number"
            placeholder={text.placeholder}
            autoComplete="off"
            disabled={currentStep == 3 ? true : false}
          />
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          <FormControl variant="outlined" size="small" style={{ width: 100 }}>
            <Select
              labelId="select-outlined-label-1"
              id="select-outlined"
              value={item.unit}
              onChange={handelChangeProductValue(item, 'unit')}
              disabled={currentStep == 3 ? true : false}>
              <MenuItem value={item.unit}>{item.unit}</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
        <TableCell className={tableClasses.tableCell} style={{ width: 135 }}>
          <FormControl component="fieldset" size="small">
            <OutlinedInput
              id="outlined-adornment-amount-5"
              value={item.price}
              onChange={handelChangeProductValue(item, 'price')}
              endAdornment={<InputAdornment position="end">₫</InputAdornment>}
              type="number"
              autoComplete="off"
              disabled={currentStep == 3 ? true : false}
            />
          </FormControl>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {item.import_qty + ' | ' + item.import_unit}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {formatCurrency(item.price_importQty)}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {formatCurrency(item.total_amount)}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          <Button
            color="white"
            size="sm"
            onClick={() => deleteSelectedProduct(item)}
            disabled={currentStep == 3 ? true : false}>
            <Icon className={classes.btnFilter} style={{ margin: 0 }}>
              delete
            </Icon>
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  const listProductContainer = () => {
    return (
      <Card>
        <CardHeader color="primary" className={classes.flex_center_between}>
          <div className={classes.flex_column}>
            <h4 className={classes.cardTitleWhite}>{text.card.title[4]}</h4>
            <p className={classes.cardCategoryWhite}>
              {values.list_products?.length + ' ' + text.card.subTitle[2]}
            </p>
          </div>
          <Button
            color="primary"
            onClick={() => setIsShowModal(true)}
            disabled={currentStep == 3 ? true : false}>
            {text.actions.button[6]}
          </Button>
        </CardHeader>
        <CardBody className={classes.cardBody}>{TableData()}</CardBody>
        <CardFooter></CardFooter>
      </Card>
    );
  };

  const notesAndCosts = () => {
    return (
      <Card>
        <CardHeader color="primary" className={classes.flex_center_between}>
          <h4 className={classes.cardTitleWhite}>{text.card.title[5]}</h4>
        </CardHeader>
        <CardBody className={classes.cardBody} style={{ marginTop: 20 }}>
          <GridContainer>
            <GridItem sm={12} xs={8} md={8}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[12]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.notes,
                  onChange: handleChangeValue('notes'),
                }}
                multiline
                rows={10}
                autoComplete="off"
                className={classes.custom_field}
                disabled={currentStep == 3 ? true : false}
              />
            </GridItem>
            <GridItem sm={12} xs={4} md={4}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[13]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.total_amount_of_goods,
                  onChange: handleChangeValue('total_amount_of_goods'),
                }}
                autoComplete="off"
                type="number"
                className={classes.custom_field}
                disabled
              />
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[14]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.discount,
                  onChange: handleChangeValue('discount'),
                }}
                autoComplete="off"
                type="number"
                className={classes.custom_field}
                disabled={currentStep == 3 ? true : false}
              />
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[15]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.other_fee,
                  onChange: handleChangeValue('other_fee'),
                }}
                autoComplete="off"
                type="number"
                className={classes.custom_field}
                disabled={currentStep == 3 ? true : false}
              />
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[16]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.total_amount_excluding_tax,
                  onChange: handleChangeValue('total_amount_excluding_tax'),
                }}
                autoComplete="off"
                type="number"
                className={classes.custom_field}
                disabled
              />
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[17]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.tax,
                  onChange: handleChangeValue('tax'),
                }}
                autoComplete="off"
                type="number"
                className={classes.custom_field}
                disabled={currentStep == 3 ? true : false}
              />
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={text.actions.select[18]}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.total_amount_including_tax,
                  // onChange: handleChangeValue("total_amount_including_tax"),
                }}
                autoComplete="off"
                type="number"
                className={classes.custom_field}
                disabled
              />
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  };

  const previewContainer = () => {
    return (
      <GridContainer>
        {listPreviewData.map((item, index) => {
          return (
            <GridItem sm={4} xs={4} md={4} key={index}>
              <Card style={{ minHeight: 390 }}>
                <CardHeader color="primary" className={classes.flex_center_between}>
                  <h4 className={classes.cardTitleWhite}>{item.title}</h4>
                </CardHeader>
                <CardBody className={classes.cardBody}>
                  {item.data.map((props, stt) => {
                    return (
                      <div
                        className={classes.flex_center_between + ' ' + classes.previewField}
                        style={{
                          borderBottom:
                            stt + 1 != item.data.length ? '1px solid ' + grayColor[0] : null,
                        }}
                        key={stt}>
                        <p className={classes.text + ' ' + classes.infoTextSecondary}>
                          {props.title}
                        </p>
                        <p
                          className={classes.text + ' ' + classes.infoTextPrimary}
                          style={{ color: infoColor[0], fontSize: 16 }}>
                          {props.value ? props.value : '---'}
                        </p>
                      </div>
                    );
                  })}
                </CardBody>
              </Card>
            </GridItem>
          );
        })}
      </GridContainer>
    );
  };

  return (
    <>
      {stepContainer()}
      {currentStep == 1 && (
        <>
          <div className={classes.card_custom}>{chooseSupplier()}</div>
          <div className={classes.card_custom}>{generalInformation()}</div>
          <div className={classes.card_custom}>{chooseStock()}</div>
        </>
      )}
      {currentStep == 2 && (
        <>
          <div className={classes.card_custom}>{listProductContainer()}</div>
          {modalSelectProduct()}
          <div className={classes.card_custom}>{notesAndCosts()}</div>
        </>
      )}
      {currentStep == 3 && (
        <>
          <div className={classes.card_custom}>{previewContainer()}</div>
          <div className={classes.card_custom}>{listProductContainer()}</div>
          <div className={classes.card_custom}>{notesAndCosts()}</div>
        </>
      )}
      <div className={classes.flex_end}>
        {currentStep == 1 && (
          <Button onClick={() => handelReset()}>{text.actions.button[2]}</Button>
        )}
        <Button onClick={() => handleSubmit('draft')}>{text.actions.button[3]}</Button>
        {currentStep == 2 && (
          <Button onClick={() => setIsCheckPrice(!isCheckPrice)}>{text.actions.button[7]}</Button>
        )}
        {currentStep < 3 ? (
          <Button
            color="primary"
            onClick={() => {
              handelValidate(), setIsCheckPrice(!isCheckPrice);
            }}>
            {text.actions.button[4]}
          </Button>
        ) : (
          <Button color="primary" onClick={() => handleSubmit('finished')}>
            {text.actions.button[5]}
          </Button>
        )}
      </div>
    </>
  );
}

AddPurchaseOrderPage.layout = Admin;

export default WithAuthentication(AddPurchaseOrderPage);
