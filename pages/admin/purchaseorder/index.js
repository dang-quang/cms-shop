import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  Box,
  Typography,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Poppers from '@material-ui/core/Popper';
import SwipeableViews from 'react-swipeable-views';
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
import CustomInput from 'components/CustomInput/CustomInput.js';
import Search from '@material-ui/icons/Search';
import ModalCustom from 'components/ModalCustom/ModalCustom.js';
import Pagination from '@material-ui/lab/Pagination';

import { formatCurrency, formatNumber } from '../../../utilities/utils';
import {
  getAllSupplier,
  getAllStock,
  getInventoryItemList,
  getAllPurchaseOrder,
} from '../../../utilities/ApiManage';

import { useRouter } from 'next/router';
import styles from 'assets/jss/natcash/views/purchaseorder/purchaseOrderStyle.js';
import emptyFolder from 'assets/img/emptyFolder.png';

function PurchaseOrderPage() {
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
  const language = useSelector((state) => state.app.language);
  const [isShowModal, setIsShowModal] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAction, setShowAction] = useState([]);
  //
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [doSearch, setDoSearch] = useState(false);
  const [txtSearch, setTxtSearch] = useState('');
  const [doFilter, setDoFilter] = useState(false);

  const [filterValues, setFilterValues] = useState({
    status: '',
    supplier: '',
    stock: '',
  });

  const TABLE_HEAD = [
    {
      id: 'en',
      value: [
        'ID',
        'Reference ID',
        'Create date',
        'Status',
        'Supplier',
        'Stock',
        'Enter stock',
        'Total amount',
        'Action',
      ],
    },
    {
      id: 'vi',
      value: [
        'Mã',
        'Mã tham chiếu',
        'Ngày tạo',
        'Trạng thái',
        'Nhà cung cấp',
        'Kho nhập',
        'Nhập kho',
        'Tổng tiền',
        'Thao tác',
      ],
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

  const POPUP = [
    {
      id: 'en',
      title: 'Select filter',
      filterTitle: ['Status', 'Supplier', 'Stock'],
      button: ['Confirm', 'Reset'],
    },
    {
      id: 'vi',
      title: 'Chọn bộ lọc',
      filterTitle: ['Trạng thái', 'Nhà cung cấp', 'Kho hàng'],
      button: ['Xác nhận', 'Đặt lại'],
    },
  ];

  const LIST_ACTION = [
    {
      id: 'en',
      value: ['PO', 'Import coupon'],
    },
    {
      id: 'vi',
      value: ['PO', 'Phiếu nhập'],
    },
  ];

  const listText = [
    {
      id: 'en',
      title: 'List of purchase order',
      tableHead: TABLE_HEAD[0].value,
      table_button: TABLE_BUTTON[0].value,
      txtSearch: 'Find purchase order',
      txtFilter: 'Filter',
      popup: POPUP[0],
      txtAction: 'New',
      listAction: LIST_ACTION[0].value,
    },
    {
      id: 'vi',
      title: 'Danh sách phiếu đặt hàng',
      tableHead: TABLE_HEAD[1].value,
      table_button: TABLE_BUTTON[1].value,
      txtSearch: 'Tìm kiếm phiếu nhập',
      txtFilter: 'Bộ lọc',
      popup: POPUP[1],
      txtAction: 'Tạo mới',
      listAction: LIST_ACTION[1].value,
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

  const [data, setData] = useState([]);
  useEffect(async () => {
    dispatch(setShowLoader(true));
    let params = {};
    params.current_page = currentPage;
    if (txtSearch) {
      params.keyword = txtSearch;
    }
    if (filterValues.status) {
      params.status = filterValues.status;
    }
    if (filterValues.supplier) {
      params.supplier_id = filterValues.supplier;
    }
    if (filterValues.stock) {
      params.warehouse_id = filterValues.stock;
    }
    const res = await getAllPurchaseOrder(params);
    if (res.code == 200) {
      setData(res.data.data);
      // setCurrentPage(res.data.data_page.current_page);
      setTotalPage(res.data.data_page.total_page);
    }
    dispatch(setShowLoader(false));
  }, [doSearch, currentPage, doFilter]);

  const handleSelectPage = (event, value) => {
    setCurrentPage(value);
  };

  const handleChangeFilterValue = (prop) => (event) => {
    setFilterValues({ ...filterValues, [prop]: event.target.value });
  };

  const handleUpdate = () => {
    setShowUpdate(false);
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

  const resetFilter = () => {
    let obj = {
      status: '',
      supplier: '',
      stock: '',
    };
    setFilterValues(obj);
  };

  const submitFilter = () => {
    setDoFilter(!doFilter);
    setIsShowModal(false);
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

  const renderTable = (item, index) => {
    let stock_name = '';
    let supplier_name = '';
    stocks.map((whItem) => {
      if (whItem._id === item.stock_id) {
        stock_name = whItem.name;
      }
    });
    suppliers.map((splItem) => {
      if (splItem._id === item.supplier_id) {
        supplier_name = splItem.name;
      }
    });
    return (
      <TableRow key={index} className={tableClasses.tableBodyRow} key={index}>
        <TableCell className={tableClasses.tableCell}>
          <Link href={`/admin/purchaseorder/${item._id}`}>
            <p className={classes.text + ' ' + classes.infoTextPrimary + ' ' + classes.cursorHover}>
              {item.serial}
            </p>
          </Link>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {item.reference_id === '' ? '---' : item.reference_id}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {moment(item.create_date).format('yyyy-MM-DD hh:mm')}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          <p
            className={classes.text + ' ' + classes.infoTextPrimary}
            style={{ color: item.status === 'draft' ? grayColor[0] : primaryColor[0] }}>
            {item.status}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>{supplier_name}</p>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>{stock_name}</p>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>{item.enter_stock}</p>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {formatCurrency(item.total_amount_including_tax)}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
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
              anchorEl={Boolean(showAction.indexOf(item) !== -1)}
              transition
              disablePortal
              className={classes.popperNav2}>
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
                        <MenuItem className={classes.dropdownItem2}>123123</MenuItem>
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

  const FilterModal = () => {
    return (
      <ModalCustom
        width={600}
        title={text.popup.title}
        subTitle={''}
        // isShow={true}
        isShow={isShowModal}
        handleClose={() => setIsShowModal(false)}>
        <div className={classes.filterEleContent}>
          <p className={classes.titleFilter}>
            {text.popup.filterTitle[0] +
              ' - ' +
              text.popup.filterTitle[1] +
              ' - ' +
              text.popup.filterTitle[2]}
          </p>
          <GridContainer>
            <GridItem xs={4} sm={4} md={4}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel id="shop-select-label">{text.popup.filterTitle[0]}</InputLabel>
                <Select
                  labelId="select-outlined-label-1"
                  id="select-outlined"
                  value={filterValues.status}
                  onChange={handleChangeFilterValue('status')}
                  label={text.popup.filterTitle[0]}>
                  <MenuItem value={'finished'}>Finished</MenuItem>
                  <MenuItem value={'draft'}>Draft</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={4} sm={4} md={4}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel id="shop-select-label">{text.popup.filterTitle[1]}</InputLabel>
                <Select
                  labelId="select-outlined-label-1"
                  id="select-outlined"
                  value={filterValues.supplier}
                  onChange={handleChangeFilterValue('supplier')}
                  label={text.popup.filterTitle[1]}>
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
            <GridItem xs={4} sm={4} md={4}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel id="shop-select-label">{text.popup.filterTitle[2]}</InputLabel>
                <Select
                  labelId="select-outlined-label-1"
                  id="select-outlined"
                  value={filterValues.stock}
                  onChange={handleChangeFilterValue('stock')}
                  label={text.popup.filterTitle[2]}>
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
          </GridContainer>
          <div style={{ paddingTop: 20, float: 'right' }}>
            <Button onClick={() => resetFilter()}>{text.popup.button[1]}</Button>
            <Button color="primary" onClick={() => submitFilter()}>
              {text.popup.button[0]}
            </Button>
          </div>
        </div>
      </ModalCustom>
    );
  };

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{text.title}</h4>
      </CardHeader>
      {/* <CardBody className={classes.cardBody}>
        <div className={classes.flex_center} style={{ justifyContent: 'space-between' }}>
          <div className={dashClasses.filterSelections + ' ' + classes.flex_center}>
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
                  onClick={() => setDoSearch(!doSearch)}>
                  <Search />
                </Button>
              </div>
            </FormControl>
            <FormControl className={dashClasses.formControl}>
              <Button color="primary" onClick={() => setIsShowModal(true)}>
                {text.txtFilter}
                <Icon className={classes.btnFilter}>tune</Icon>
              </Button>
            </FormControl>
          </div>
          <FormControl
            className={dashClasses.formControl}
            style={{
              position: 'relative',
            }}>
            <Button color="primary" onClick={() => setShowUpdate(true)}>
              {text.txtAction}
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
                    <ClickAwayListener onClickAway={() => handleUpdate()}>
                      <MenuList role="menu">
                        <Link href="/admin/purchaseorder/addpurchaseorder">
                          <MenuItem className={classes.dropdownItem} onClick={() => handleUpdate()}>
                            {text.listAction[0]}
                          </MenuItem>
                        </Link>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Poppers>
          </FormControl>
        </div>
        {FilterModal()}
      </CardBody>
      <CardFooter>{TableData()}</CardFooter> */}
    </Card>
  );
}

PurchaseOrderPage.layout = Admin;

export default WithAuthentication(PurchaseOrderPage);
