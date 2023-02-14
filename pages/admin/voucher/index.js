import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Link from "next/link";
import {
  NotificationContainer,
  NotificationManager,
} from "react-light-notifications";
import "react-light-notifications/lib/main.css";
// @material-ui/core components
import {} from "@material-ui/core/styles";
import {
  primaryColor,
  whiteColor,
  blackColor,
  hexToRgb,
  successColor,
  infoColor,
  orangeColor,
  grayColor,
} from "assets/jss/natcash.js";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
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
  Box,
  Typography,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Poppers from "@material-ui/core/Popper";
import SwipeableViews from "react-swipeable-views";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import GridContainer from "components/Grid/GridContainer.js";
import adminStyles from "assets/jss/natcash/components/headerLinksStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";
import shopStyle from "assets/jss/natcash/views/shoplist/shoplistStyle.js";
import { Icon } from "@material-ui/core";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import vi from "date-fns/locale/vi";
import classNames from "classnames";
import useWindowSize from "components/Hooks/useWindowSize.js";
import CartTotalInfo from "components/CartTotalInfo/CartTotalInfo.js";
import PropTypes from "prop-types";

import { formatCurrency, formatNumber } from "../../../utilities/utils";

import { useRouter } from "next/router";
import styles from "assets/jss/natcash/views/voucher/voucherStyle.js";

import imgMoney from "assets/img/money.png";
import imgPercent from "assets/img/percent.png";

function VoucherPage() {
  const router = useRouter();
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
  const [fromDate, setFromDate] = useState(
    moment().subtract(30, "days").format()
  );
  const [toDate, setToDate] = useState(moment().format());
  const [isMobile, setIsMobile] = useState(false);
  const [doFilter, setDoFilter] = useState(0);

  const language = useSelector((state) => state.app.language);

  const TOOLTIP = [
    {
      id: "en",
      value: [
        "The total number of Shop Vouchers that have been used on all confirmed orders, calculated during the selected time period.",
        "Total number of unique shoppers who have used at least one Shop Voucher, across all confirmed orders during the selected time period.",
        "The total number of products sold for which the Shop Voucher applies, based on all confirmed orders during the selected time period.",
        "Total value of orders with confirmed Shop Vouchers applied, calculated during the selected time period.",
      ],
    },
    {
      id: "vi",
      value: [
        "Tổng số lượng Voucher Của Shop đã được sử dụng tính trên toàn bộ các đơn hàng được xác nhận, tính trong khoảng thời gian đã chọn.",
        "Tổng số lượng người mua duy nhất đã sử dụng ít nhất một Voucher Của Shop, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.",
        "Tổng số lượng sản phẩm có áp dụng Voucher Của Shop đã bán, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn.",
        "Tổng giá trị của các đơn hàng có áp dụng Voucher Của Shop đã được xác nhận, tính trong khoảng thời gian đã chọn.",
      ],
    },
  ];

  const LIST_TITLE_VALUE = [
    {
      id: "en",
      value: ["Quantity used", "Buyer", "Quantity sold", "Revenue"],
    },
    {
      id: "vi",
      value: ["Số lượng đã dùng", "Người mua", "Số lượng đã bán", "Doanh thu"],
    },
  ];

  const SHOP_FILTER = [
    {
      id: "en",
      value: ["Channel", "Shop"],
    },
    {
      id: "vi",
      value: ["Kênh", "Gian hàng"],
    },
  ];

  const TAB_LIST = [
    {
      id: "en",
      value: ["All", "Happening", "Upcoming", "Finished"],
    },
    {
      id: "vi",
      value: ["Tất cả", "Đang diễn ra", "Sắp diễn ra", "Đã kết thúc"],
    },
  ];

  const TABLE_HEAD = [
    {
      id: "en",
      value: [
        "Code | Name",
        "Type",
        "Discount",
        "Can be used",
        "Used",
        "Status | Time",
        "Action",
      ],
    },
    {
      id: "vi",
      value: [
        "Mã Voucher | Tên",
        "Loại mã",
        "Giảm giá",
        "Số mã có thể sử dụng",
        "Đã dùng",
        "Trạng thái | Thời gian",
        "Thao tác",
      ],
    },
  ];

  const BUTTON = [
    {
      id: "en",
      value: [
        "Add new",
        "Apply",
        "Reset",
        "Detail",
        "Orders",
        "Copy",
        "Delete",
      ],
    },
    {
      id: "vi",
      value: [
        "Thêm mới",
        "Áp dụng",
        "Đặt lại",
        "Chi tiết",
        "Đơn hàng",
        "Sao chép",
        "Xóa",
      ],
    },
  ];

  const DATE_FILTER = [
    {
      id: "en",
      value: ["Choose date", "Apply", "Reset"],
    },
    {
      id: "vi",
      value: ["Chọn ngày", "Từ ngày", "Đến ngày"],
    },
  ];

  const listText = [
    {
      id: "en",
      title: "Shop voucher",
      title2: "List voucher",
      subTitle2:
        "Create Shopwide Coupons or Product Coupons now to attract buyers.",
      compareText: "Compared to 7 days ago",
      tooltip: TOOLTIP[0].value,
      listTitleValue: LIST_TITLE_VALUE[0].value,
      shopFilter: SHOP_FILTER[0].value,
      tabList: TAB_LIST[0].value,
      tableHead: TABLE_HEAD[0].value,
      button: BUTTON[0].value,
      dateFilter: DATE_FILTER[0].value,
      textAll: "All",
      voucherType: ["All product", "Product", "Whole shop"],
    },
    {
      id: "vi",
      title: "Mã giảm giá của shop",
      title2: "Danh sách mã giảm giá",
      subTitle2:
        "Tạo Mã giảm giá toàn shop hoặc Mã giảm giá sản phẩm ngay bây giờ để thu hút người mua.",
      compareText: "So với 7 ngày trước",
      tooltip: TOOLTIP[1].value,
      listTitleValue: LIST_TITLE_VALUE[1].value,
      shopFilter: SHOP_FILTER[1].value,
      tabList: TAB_LIST[1].value,
      tableHead: TABLE_HEAD[1].value,
      button: BUTTON[1].value,
      dateFilter: DATE_FILTER[1].value,
      textAll: "Tất cả",
      voucherType: ["Tất cả sản phẩm", "Sản phẩm", "Toàn shop"],
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
      value: 19,
      compareValue: "55.81%",
      type: "up",
    },
    {
      title: text.listTitleValue[1],
      tooltip: text.tooltip[1],
      value: 19,
      compareValue: "54.76%",
      type: "down",
    },
    {
      title: text.listTitleValue[2],
      tooltip: text.tooltip[2],
      value: 27,
      compareValue: "56.45%",
      type: "down",
    },
    {
      title: text.listTitleValue[3],
      tooltip: text.tooltip[3],
      value: "5.203.660",
      compareValue: "72.29%",
      type: "down",
    },
  ];

  const ecomData = [
    {
      title: "Shopee",
      value: "Shopee",
      shop: [
        {
          title: "ShopTreTho MienNam Shopee",
          value: "ShopTreTho MienNam Shopee",
        },
        {
          title: "ShopTreTho MienBac Shopee",
          value: "ShopTreTho MienBac Shopee",
        },
      ],
    },
    {
      title: "Lazada",
      value: "Lazada",
      shop: [
        {
          title: "ShopTreTho MienNam Lazada",
          value: "ShopTreTho MienNam Lazada",
        },
        {
          title: "ShopTreTho MienBac Lazada",
          value: "ShopTreTho MienBac Lazada",
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
    setFromDate(moment().subtract(30, "days").format());
    setToDate(moment().format());
    setFilterDate(false);
    setDoFilter(0);
  };

  const ShopFilter = () => {
    return (
      <div className={classes.shopFilterContainer}>
        {/* filter channel */}
        <FormControl
          className={dashClasses.formControl}
          style={{ marginRight: "25px" }}
        >
          <InputLabel id="ecom-select-label">{text.shopFilter[0]}</InputLabel>
          <Select
            labelId="ecom-select-label"
            id="ecom-select"
            defaultValue={-1}
            value={ecom}
            onChange={handleChangeEcom}
          >
            <MenuItem className={classes.dropdownItem} value={-1} key="all">
              {text.textAll}
            </MenuItem>
            {ecomData.map((item) => (
              <MenuItem
                className={classes.dropdownItem}
                value={item.value}
                key={item.title}
              >
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* filter shop */}
        <FormControl
          className={dashClasses.formControl}
          style={{ marginRight: "25px" }}
        >
          <InputLabel id="shop-select-label-2">{text.shopFilter[1]}</InputLabel>
          <Select
            labelId="shop-select-label-2"
            id="shop-select-2"
            defaultValue={-1}
            value={shop}
            onChange={handleChangeShop}
          >
            <MenuItem className={classes.dropdownItem} value={-1} key="all">
              {text.textAll}
            </MenuItem>
            {shopData?.map((item) => (
              <MenuItem
                className={classes.dropdownItem}
                value={item.value}
                key={item.title}
              >
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* filter date */}
        <FormControl>
          
          <Button
            color="white"
            id={"filter-date-label"}
            aria-owns={filterDate ? "filter-date" : null}
            aria-haspopup="true"
            className={classes.filteTritle}
            onClick={() => setFilterDate(true)}
          >
            {moment(fromDate).format("DD/MM/yyyy") +
              " - " +
              moment(toDate).format("DD/MM/yyyy")}
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
              " " +
              classes.popperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id={"filter-date"}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={() => setFilterDate(false)}>
                    <div style={{ width: isMobile ? "190px" : "460px" }}>
                      <div style={{ padding: "7px 15px", borderRadius: "4px" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "17px",
                            fontWeight: "400",
                            color: primaryColor[0],
                          }}
                        >
                          {text.dateFilter[0]}
                        </p>
                        <div style={{ marginTop: "10px" }}>
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={vi}
                          >
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
                                  "aria-label": "change date",
                                }}
                                style={{ margin: "0 40px", width: "150px" }}
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
                                  "aria-label": "change date",
                                }}
                                style={{ margin: "0 40px", width: "150px" }}
                              />
                            </GridContainer>
                          </MuiPickersUtilsProvider>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "15px",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            color="white"
                            size="sm"
                            style={{ marginRight: "10px" }}
                            onClick={() => resetFilterDate()}
                          >
                            {text.button[2]}
                          </Button>
                          <Button
                            color="primary"
                            size="sm"
                            onClick={() => {
                              setDoFilter(doFilter + 1);
                              setFilterDate(false);
                            }}
                          >
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
      code: "SHOP5249K",
      name: "sale giữa tháng",
      shop_id: 54435575,
      shop_icon:
        "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
      shop_code: "STTMN",
      shop_name: "ShopTreTho Miền Nam",
      type: "product",
      product_quantity: 2,
      discount: 249000,
      discount_type: "money",
      canUse: 100,
      used: 10,
      status: "Finished",
      time_from: "00:00 15/09/2021",
      time_to: "23:59 15/09/2021",
    },
    {
      id: 123421,
      code: "SHOP1509K",
      name: "15.9",
      shop_id: 54435575,
      shop_icon:
        "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
      shop_code: "Anlababy",
      shop_name: "ShopTreTho Miền Nam",
      type: "all",
      discount: 40,
      discount_type: "percent",
      canUse: 30,
      used: 26,
      status: "Happening",
      time_from: "00:00 15/09/2021",
      time_to: "23:59 15/09/2021",
    },
    {
      id: 432412,
      code: "SHOP1509K",
      name: "15.9",
      shop_id: 54435575,
      shop_icon:
        "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
      shop_code: "OFC",
      shop_name: "ShopTreTho Miền Nam",
      type: "all",
      discount: 40,
      discount_type: "percent",
      canUse: 30,
      used: 26,
      status: "Upcoming",
      time_from: "00:00 15/09/2021",
      time_to: "23:59 15/09/2021",
    },
  ]);

  const StatusText = (text, color) => {
    return (
      <p
        className={classes.text + " " + classes.infoTextStatus}
        style={{ color: color }}
      >
        {text}
      </p>
    );
  };

  const renderTable = (item, index) => {
    let color = "black";
    if (item.status == "Finished") {
      color = grayColor[0];
    } else if (item.status == "Happening") {
      color = successColor[1];
    } else if (item.status == "Upcoming") {
      color = primaryColor[0];
    }
    return (
      <TableRow
        key={"renderTable" + index}
        className={tableClasses.tableBodyRow}
      >
        <TableCell className={tableClasses.tableCell} key={"CodeName"}>
          <div className={classes.cellInfo}>
            <img
              src={item.discount_type == "money" ? imgMoney : imgPercent}
              className={classes.tableImage}
            />
            <div className={classes.infoTextContainer}>
              <Link
                href={
                  item.status == "Happening" ? "" : "/admin/voucher/" + item.id
                }
              >
                <p
                  className={
                    classes.text +
                    " " +
                    classes.infoTextPrimary +
                    " " +
                    classes.cursorHover
                  }
                >
                  {item.code}
                </p>
              </Link>
              <p className={classes.text + " " + classes.infoTextSecondary}>
                {item.name}
              </p>
              <div className={classes.flex_center}>
                <img src={item.shop_icon} className={classes.tableIcon} />
                <p className={classes.text + " " + classes.infoTextSecondary}>
                  {item.shop_code}
                </p>
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Type"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.type == "product" ? text.voucherType[1] : text.voucherType[2]}
          </p>
          <p className={classes.text + " " + classes.infoTextSecondary}>
            {item.type == "product"
              ? `(${item.product_quantity} ${text.voucherType[1]})`
              : text.voucherType[0]}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Discount"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.discount_type == "money"
              ? formatCurrency(item.discount)
              : item.discount + "%"}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"CanBeUsed"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.canUse}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Used"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.used}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"StatusUpdate"}>
          {StatusText(item.status, color)}
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.time_from}
          </p>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.time_to}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Action"}>
          <div className={shopClasses.proInfoContainer} key={"action"}>
            <Button
              id={"action-label" + item?.shopId}
              aria-owns={
                showAction.indexOf(item) !== -1
                  ? "action-list-grow" + item?.shopId
                  : null
              }
              aria-haspopup="true"
              color="white"
              size="sm"
              onClick={() => handleAction(item)}
            >
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
                " " +
                shopClasses.popperNav
              }
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id={"action-list-grow" + item?.id}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={() => handleAction(item)}>
                      <MenuList role="menu">
                        {(item.status == "Upcoming" ||
                          item.status == "Finished") && (
                          <MenuItem className={shopClasses.dropdownItem}>
                            <Link
                              href={
                                "/admin/voucher/" +
                                item.id +
                                "?status=" +
                                item.status
                              }
                            >
                              <a target="_blank">{text.button[3]}</a>
                            </Link>
                          </MenuItem>
                        )}
                        {(item.status == "Happening" ||
                          item.status == "Finished") && (
                          <MenuItem className={shopClasses.dropdownItem}>
                            <Link href={"/admin/voucher/order?id=" + item.id}>
                              <a target="_blank">{text.button[4]}</a>
                            </Link>
                          </MenuItem>
                        )}
                        {(item.status == "Upcoming" ||
                          item.status == "Finished") && (
                          <MenuItem className={shopClasses.dropdownItem}>
                            <Link href={"/admin/shop/" + item.shopId}>
                              <a target="_blank">{text.button[5]}</a>
                            </Link>
                          </MenuItem>
                        )}
                        {item.status == "Upcoming" && (
                          <MenuItem className={shopClasses.dropdownItem}>
                            <Link href={"/admin/shop/" + item.shopId}>
                              <a target="_blank">{text.button[6]}</a>
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
          <TableHead className={tableClasses["primary" + "TableHeader"]}>
            <TableRow className={tableClasses.tableHeadRow}>
              {text.tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={
                      tableClasses.tableCell + " " + tableClasses.tableHeadCell
                    }
                    key={key}
                    style={{
                      textAlign: `${
                        key == text.tableHead.length - 1 ? "right" : "left"
                      }`,
                    }}
                  >
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
          {...other}
        >
          {value === index && (
            <Box p={3}>
              <Typography>{children}</Typography>
            </Box>
          )}
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
        "aria-controls": `full-width-tabpanel-${index}`,
      };
    }

    const AntTabs = withStyles({
      root: {
        borderBottom: "1px solid #e8e8e8",
      },
      indicator: {
        backgroundColor: "#1890ff",
      },
    })(Tabs);

    const AntTab = withStyles((theme) => ({
      root: {
        textTransform: "none",
        fontSize: 16,
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(","),
        "&:hover": {
          color: "#40a9ff",
          opacity: 1,
        },
        "&$selected": {
          color: "#1890ff",
          fontWeight: theme.typography.fontWeightMedium,
        },
        "&:focus": {
          color: "#40a9ff",
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
              style={{ width: "100%" }}
            >
              {text.tabList.map((item, index) => (
                <AntTab
                  label={item}
                  {...a11yProps(index)}
                  key={"tab" + index}
                />
              ))}
            </AntTabs>
            <Link href={"/admin/voucher/addvoucher"}>
              <Button color="primary">
                <Icon className={classes.btnFilter}>add</Icon>
                {text.button[0]}
              </Button>
            </Link>
          </div>
          {/* <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={tabValue}
            onChangeIndex={handleChangeIndex}
            className={classes.swipeableViews}
          > */}
          <div>
            <TabPanel
              value={tabValue}
              index={0}
              dir={theme.direction}
              className={classes.tabPanel}
            >
              {TableData()}
            </TabPanel>
          </div>
          {/* </SwipeableViews> */}
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

VoucherPage.layout = Admin;

export default WithAuthentication(VoucherPage);
