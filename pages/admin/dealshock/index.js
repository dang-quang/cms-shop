import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  NotificationManager
} from "react-light-notifications";
import "react-light-notifications/lib/main.css";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoader } from "../../../redux/actions/app";
// @material-ui/core components
import {
  grayColor, primaryColor, successColor
} from "assets/jss/natcash.js";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import {
  Box, ClickAwayListener, FormControl, Grow, Icon, InputLabel, makeStyles, MenuItem, MenuList, Paper, Select, Tab,
  Table, TableBody, TableCell,
  TableFooter, TableHead, TableRow, Tabs, Typography, useTheme, withStyles
} from "@material-ui/core";
import Poppers from "@material-ui/core/Popper";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import adminStyles from "assets/jss/natcash/components/headerLinksStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import shopStyle from "assets/jss/natcash/views/shoplist/shoplistStyle.js";
import classNames from "classnames";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CartTotalInfo from "components/CartTotalInfo/CartTotalInfo.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import useWindowSize from "components/Hooks/useWindowSize.js";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import PropTypes from "prop-types";
import {
  getAllDealShock, getChannelData
} from "../../../utilities/ApiManage";
import { formatCurrency } from "../../../utilities/utils";

import styles from "assets/jss/natcash/views/dealshock/dealshockStyle.js";
import { useRouter } from "next/router";


function DealShockPage() {
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
  const [filterDate, setFilterDate] = useState("");
  const [txtSearch, setTxtSearch] = useState("");
  const [fromDate, setFromDate] = useState(
    moment().subtract(30, "days").format()
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [currentStatus, setCurrentStatus] = useState("");
  const [isChangeDealShock, setIsChangeDealShock] = useState(false);
  const [channels, setChannels] = useState([]);
  const [selectedShop, setSelectedShop] = useState("all");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [toDate, setToDate] = useState(moment().format());
  const [isMobile, setIsMobile] = useState(false);
  const [doFilter, setDoFilter] = useState(0);
  const [filterType, setFilterType] = useState("promotion_name");
  const [filterValue, setFilterValue] = useState("");
  const [cardTotalData, setCardTotalData] = useState();
  const language = useSelector((state) => state.app.language);

  const FORM = [
    {
      id: "en",
      value: ["Name", "Search"],
    },
    {
      id: "vi",
      value: ["Tên", "Tìm kiếm"],
    },
  ];

  const TOOLTIP = [
    {
      id: "en",
      value: [
        "The total value of orders including products from the confirmed Promotion Combo (including shipping but excluding other promotions), calculated during the selected time period.",
        "The total number of confirmed orders including products from the Promotion Combo, calculated during the selected time period.",
        "The total number of Promotional Combos sold across all confirmed orders, calculated during the selected time period.",
        "The total number of products from the Promotion Combo sold across all confirmed orders, calculated during the selected time period.",
      ],
    },
    {
      id: "vi",
      value: [
        "Tổng giá trị của các đơn hàng bao gồm sản phẩm từ Combo Khuyến Mãi được xác nhận (bao gồm phí vận chuyển nhưng không bao gồm những khuyến mãi khác), tính trong khoảng thời gian đã chọn.",
        "Tổng số lượng các đơn hàng bao gồm sản phẩm từ Combo Khuyến Mãi được xác nhận, tính trong khoảng thời gian đã chọn.",
        "Tổng số lượng Combo Khuyến Mãi đã bán tính trên toàn bộ các đơn hàng được xác nhận, tính trong khoảng thời gian đã chọn.",
        "Tổng số lượng sản phẩm từ Combo Khuyến Mãi đã bán tính trên toàn bộ các đơn hàng được xác nhận, tính trong khoảng thời gian đã chọn.",
      ],
    },
  ];

  const LIST_TITLE_VALUE = [
    {
      id: "en",
      value: ["Revenue", "Revenue from bundled products", "Order", "Buyer"],
    },
    {
      id: "vi",
      value: [
        "Doanh thu",
        "Doanh thu sản phẩm mua kèm",
        "Đơn hàng",
        "Người mua",
      ],
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
      value: [
        {
          title: "All",
          status: "",
        },
        {
          title: "Happening",
          status: "Happening",
        },
        {
          title: "Upcoming",
          status: "Upcoming",
        },
        {
          title: "Finished",
          status: "Finished",
        },
      ],
    },
    {
      id: "vi",
      value: [
        {
          title: "Tất cả",
          status: "",
        },
        {
          title: "Đang diễn ra",
          status: "Happening",
        },
        {
          title: "Sắp diễn ra",
          status: "Upcoming",
        },
        {
          title: "Đã kết thúc",
          status: "Finished",
        },
      ],
    },
  ];


  const TABLE_HEAD = [
    {
      id: "en",
      value: ["Name Deal Shock", "Type Deal Shock", "Main product", "Bundled products|Gift", "Status", "Time", "Action"],
    },
    {
      id: "vi",
      value: [
        "Tên Deal Sốc",
        "Loại Deal Sốc",
        "Sản phẩm chính",
        "Sp mua kèm|Quà tặng",
        "Trạng thái",
        "Thời gian",
        "Thao tác",
      ],
    },
  ];

  const BUTTON = [
    {
      id: "en",
      value: ["Create new", "Apply", "Reset", "Search", "Retype"],
    },
    {
      id: "vi",
      value: ["Tạo mới", "Áp dụng", "Đặt lại", "Tìm", "Nhập lại"],
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

  const FILTER_BOX = [
    {
      id: "en",
      title: "Add products",
      button: ["Search", "Reset", "Confirm"],
      select: ["By promotion name", "By Deal Shock name, By Deal Shock id"],
    },
    {
      id: "vi",
      title: "Thêm sản phẩm",
      button: ["Tìm", "Nhập lại", "Xác nhận"],
      select: ["Tên chương trình", "Tên Deal Shock", "Mã Deal Shock"],
    },
  ];

  const TABLE_BUTTON = [
    {
      id: "en",
      value: ["Detail", "Copy", "Orders",],
    },
    {
      id: "vi",
      value: [
        "Chi tiết",
        "Sao chép",
        "Đơn hàng",

      ],
    },
  ];

  const listText = [
    {
      id: "en",
      title: "Deal Shock",
      title2: "List combo",
      subTitle2:
        "Create Deal shock with attractive offers that will attract more buyers!",
      compareText: "Compared to 7 days ago",
      tooltip: TOOLTIP[0].value,
      listTitleValue: LIST_TITLE_VALUE[0].value,
      shopFilter: SHOP_FILTER[0].value,
      tabList: TAB_LIST[0].value,
      tabFilter: FORM[0].value,
      tableHead: TABLE_HEAD[0].value,
      button: BUTTON[0].value,
      dateFilter: DATE_FILTER[0].value,
      textAll: "All",
      filter_box_button: FILTER_BOX[0].button,
      filter_box_select: FILTER_BOX[0].select,
      placeholder: "Find by name DealShock",
      table_button: TABLE_BUTTON[0].value,
      time: ["From", "to",],
    },
    {
      id: "vi",
      title: "Deal Sốc",
      title2: "Danh sách chương trình",
      subTitle2: "Tạo Deal sốc với ưu đãi hấp dẫn sẽ thu hút người mua.",
      compareText: "So với 7 ngày trước",
      tooltip: TOOLTIP[1].value,
      listTitleValue: LIST_TITLE_VALUE[1].value,
      shopFilter: SHOP_FILTER[1].value,
      tabList: TAB_LIST[1].value,
      tabFilter: FORM[1].value,
      tableHead: TABLE_HEAD[1].value,
      button: BUTTON[1].value,
      dateFilter: DATE_FILTER[1].value,
      textAll: "All",
      filter_box_button: FILTER_BOX[1].button,
      filter_box_select: FILTER_BOX[1].select,
      placeholder: "Tìm theo tên DealShock",
      table_button: TABLE_BUTTON[1].value,
      time: ["Từ", "đến",]
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
      value: formatCurrency(10000),
      compareValue: "81.92%",
      type: "down",
    },
    {
      title: text.listTitleValue[1],
      tooltip: text.tooltip[1],
      value: formatCurrency(11000),
      compareValue: "74.69%",
      type: "down",
    },
    {
      title: text.listTitleValue[2],
      tooltip: text.tooltip[2],
      value: 27,
      compareValue: "56.45%",
      type: "up",
    },
    {
      title: text.listTitleValue[3],
      tooltip: text.tooltip[3],
      value: "2",
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

  const handleChangeChannel = (event) => {
    setSelectedChannel(event.target.value);
    channels.map((item, index) => {
      if (item.name === event.target.value) {
        setShopData(item.shop_data);
        setSelectedShop(item.shop_data[0].shopId);
      }
    });
    if (event.target.value === "all") {
      setShopData([]);
      setSelectedShop("all")
    }
    setIsChangeDealShock(!isChangeDealShock)
  };

  const handleChangeShop = (event) => {
    setSelectedShop(event.target.value);
    setIsChangeDealShock(!isChangeDealShock)
  };
  const handleUpdateDealShock = async (item) => {
    dispatch(setShowLoader(true));
    let obj = item;
    obj.status = "Finished";
    let res = await updateShippingFee(obj);
    if (res.code === 200) {
      setIsChangeFreeShipping(!isChangeFreeShipping);
    } else {
      NotificationManager.error({
        title: "Error",
        message: res.message ? res.message.text : "Error",
      });
    }
    dispatch(setShowLoader(false));
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
  const handleInputSearch = (event) => {
    setTxtSearch(event.target.value);
    setCurrentPage(1);
  };

  const [data, setData] = useState([
    {
      id: 312313,
      name: "Mua 1 tặng 1",
      type: "Mua Để Nhận Quà",
      main_product: [
        "https://cf.shopee.vn/file/94f100cb953e89f1c7d66014dcdb337f",
        "https://cf.shopee.vn/file/8aeec7b29fb345999b858b266a8be02a",
        "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
        "https://cf.shopee.vn/file/e4056b2747001d77569b2e6adca9976b",
        "https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc",
        "https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9",
      ],
      sub_product: [
        "https://cf.shopee.vn/file/94f100cb953e89f1c7d66014dcdb337f",
        "https://cf.shopee.vn/file/8aeec7b29fb345999b858b266a8be02a",
        "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
        "https://cf.shopee.vn/file/e4056b2747001d77569b2e6adca9976b",
        "https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc",
        "https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9",
      ],
      status: "Happenning",
      time_from: "00:00 15/09/2021",
      time_to: "23:59 15/09/2021",
    },
    {
      id: 124122,
      name: "mua 2 tặng 1",
      type: "Mua Kèm Deal Sốc",
      main_product: [
        "https://cf.shopee.vn/file/94f100cb953e89f1c7d66014dcdb337f",
        "https://cf.shopee.vn/file/8aeec7b29fb345999b858b266a8be02a",
        "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
        "https://cf.shopee.vn/file/e4056b2747001d77569b2e6adca9976b",
        "https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc",
        "https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9",

      ],
      sub_product: [
        "https://cf.shopee.vn/file/94f100cb953e89f1c7d66014dcdb337f",
        "https://cf.shopee.vn/file/8aeec7b29fb345999b858b266a8be02a",
        "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",

      ],
      status: "Finished",
      time_from: "00:00 15/09/2021",
      time_to: "23:59 15/09/2021",
    },
    {
      id: 124122,
      name: "mua 3 tặng 1",
      type: "Mua Để Nhận Quà",
      main_product: [
        "https://cf.shopee.vn/file/94f100cb953e89f1c7d66014dcdb337f",
        "https://cf.shopee.vn/file/8aeec7b29fb345999b858b266a8be02a",
        "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
        "https://cf.shopee.vn/file/e4056b2747001d77569b2e6adca9976b",
        "https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc",
        "https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9",
      ],
      sub_product: [
        "https://cf.shopee.vn/file/94f100cb953e89f1c7d66014dcdb337f",
        "https://cf.shopee.vn/file/8aeec7b29fb345999b858b266a8be02a",
        "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",

      ],
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
  const handleChangeStatusSF = (status) => {
    setCurrentStatus(status)
    setIsChangeDealShock(!isChangeDealShock)
  }
  const getShop = async () => {
    var res = await getChannelData();
    setChannels(res.data);
  };


  useEffect(() => {
    dispatch(setShowLoader(true));
    getShop();
    dispatch(setShowLoader(false));
  }, []);

  useEffect(async () => {
    dispatch(setShowLoader(true));
    let params = {};
    if (txtSearch) {
      params.keyword = txtSearch;
    }
    if (selectedShop != "all") {
      params.shop = parseInt(selectedShop)
    }
    if (currentStatus) {
      params.status = currentStatus
    }
    params.current_page = currentPage;
    let res = await getAllDealShock(params);
    if (res.code == 200) {
      setData(res.data.data);
      setCurrentPage(res.data.data_page.current_page);
      setTotalPage(res.data.data_page.total_page);
    }
    dispatch(setShowLoader(false));
  }, [isChangeDealShock, currentPage]);

  const renderTable = (item, index) => {
    let color = "black";
    if (item.status == "Finished") {
      color = grayColor[0];
    } else if (item.status == "Happenning") {
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
            <div className={classes.infoTextContainer}>
              <Link href={`/admin/dealshock/ + ${item.id}`}>
                <p
                  className={
                    classes.text +
                    " " +
                    classes.infoTextPrimary +
                    " " +
                    classes.cursorHover
                  }
                >
                  {item.deal_name}
                </p>
              </Link>

            </div>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Type"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.deal_type}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Main product"}>
          <div className={classes.flex_center}>
            {item.products?.main_product.map((main_product, pIndex) => {
              if (pIndex <= 0) {
                return (
                  <img
                    src={main_product.image}
                    className={classes.tableImage}
                  />
                );
              } else if (pIndex > 2 && pIndex == item.main_product.length - 1) {
                return (
                  <>
                    <img src={item.main_product[1]} className={classes.tableImage} />
                    <p
                      className={
                        classes.text +
                        " " +
                        classes.infoTextPrimary +
                        " " +
                        classes.more
                      }
                    >
                      {item.main_product.length - 2 > 0 && (
                        <span>
                          {"+"} {item.main_product.length - 2}
                        </span>
                      )}
                    </p>
                  </>
                );
              }
            })}
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Bundled product|gift"}>
          <div className={classes.flex_center}>
            {item.products?.sub_product.map((sub_product, pIndex) => {
              if (pIndex <= 0) {
                return (
                  <img
                    src={sub_product.image}
                    className={classes.tableImage}
                  />
                );
              } else if (pIndex > 2 && pIndex == item.sub_product.length - 1) {
                return (
                  <>
                    <img src={item.sub_product[1]} className={classes.tableImage} />
                    <p
                      className={
                        classes.text +
                        " " +
                        classes.infoTextPrimary +
                        " " +
                        classes.more
                      }
                    >
                      {item.sub_product.length - 2 > 0 && (
                        <span>
                          {"+"} {item.sub_product.length - 2}
                        </span>
                      )}
                    </p>
                  </>
                );
              }
            })}
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"StatusUpdate"}>
          {StatusText(item.status, color)}
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Time"}>
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
                        <MenuItem className={shopClasses.dropdownItem}>
                          <Link href={`/admin/dealshock/${item.id}`}>
                            <a target="_blank">{text.table_button[0]}</a>
                          </Link>
                        </MenuItem>

                        <MenuItem className={shopClasses.dropdownItem}>
                          <Link href={"#"}>
                            <a target="_blank">{text.table_button[1]}</a>
                          </Link>
                        </MenuItem>

                        {(item.status == "Happenning" ||
                          item.status == "Finished" || item.status == "Upcoming") && (
                            <MenuItem className={shopClasses.dropdownItem}>
                              <Link href={"/admin/dealshock/order?id=" + item.id}>
                                <a target="_blank">{text.table_button[2]}</a>
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
  const handleSelectPage = (event, value) => {
    setCurrentPage(value);
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
                      textAlign: `${key == text.tableHead.length - 1 ? "right" : "left"
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
        <TableFooter>
          <Pagination
            count={totalPage}
            page={currentPage}
            onChange={handleSelectPage}
            style={{ padding: "10px 0 0 0" }}
          />
        </TableFooter>
      </Table>
      // </div>
    );
  };

  const handleChangeFilterType = (event) => {
    setFilterType(event.target.value);
  };

  // const handleChangeFilterValue = (event) => {
  //   setFilterValue(event.target.value);
  // };
  const ShopFilter = () => {
    return (
      <div className={classes.shopFilterContainer} style={{ marginTop: 30 }}>
        <FormControl className={dashClasses.formControl}>
          <div style={{ marginRight: "15px" }}>
            <CustomInput
              formControlProps={{
                className: adminClasses.margin,
              }}
              inputProps={{
                placeholder: text.placeholder,
                onChange: handleInputSearch,
              }}
            />
            <Button
              color="white"
              aria-label="edit"
              justIcon
              round
              onClick={() => setIsChangeDealShock(!isChangeDealShock)}
            >
              <Search />
            </Button>
          </div>
        </FormControl>
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
            value={selectedChannel}
            onChange={handleChangeChannel}
          >
            <MenuItem className={classes.dropdownItem} value={"all"}>
              {text.textAll}
            </MenuItem>
            {channels.map((item, index) => (
              <MenuItem
                className={classes.dropdownItem}
                value={item.name}
                key={index}
              >
                {item.name}
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
            {selectedChannel === "all" && (
              <MenuItem className={classes.dropdownItem} value={"all"}>
                {text.all}
              </MenuItem>
            )}
            {shopData?.map((item, index) => (
              <MenuItem
                className={classes.dropdownItem}
                value={item.shopId}
                key={index}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </div>
    );
  };

  const FilterBox = () => {
    return (
      <div className={classes.flex_center} style={{ margin: "10px 0" }}>
        <FormControl variant="outlined" size="small">
          <Select
            labelId="select-outlined-label-1"
            id="select-outlined"
            value={filterType}
            onChange={handleChangeFilterType}
          >
            <MenuItem value={"promotion_name"}>
              {text.filter_box_select[0]}
            </MenuItem>
            <MenuItem value={"product_name"}>
              {text.filter_box_select[1]}
            </MenuItem>
            <MenuItem value={"product_id"}>
              {text.filter_box_select[2]}
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small" style={{ flex: "1" }}>
          <TextField
            //   error={validateItemName ? false : true}
            id="input1"
            label={""}
            variant="outlined"
            size="small"

            width="20px"
            inputProps={{
              // value: filterValue,
              value: setFilterDate,
              // onChange: handleChangeFilterValue,
              onChange: handleInputSearch,
            }}
            placeholder={text.placeholder}
            autoComplete="off"
            style={{ flex: 1 }}
          />
        </FormControl>
        <div style={{ marginLeft: "10px" }}>
          <Button color="primary">{text.filter_box_button[0]}</Button>
          <Button color="gray">{text.filter_box_button[1]}</Button>
        </div>
      </div>
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
                  label={item.title}
                  {...a11yProps(index)}
                  key={index}
                  onClick={() => handleChangeStatusSF(item.status)}
                />
              ))}
            </AntTabs>
            <Link href={"/admin/dealshock/adddealshock"}>
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
                key={index}
              >
                {/* {FilterBox()} */}
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
        title={text.title + " (" +
          text.time[0] +
          ": " +
          moment(fromDate).format("DD/MM/yyyy") + " " +
          text.time[1] + " " +
          moment(toDate).format("DD/MM/yyyy") + ")"
        }
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

DealShockPage.layout = Admin;

export default WithAuthentication(DealShockPage);
