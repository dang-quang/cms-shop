import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  NotificationManager
} from "react-light-notifications";
import "react-light-notifications/lib/main.css";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import {
  grayColor, primaryColor, successColor
} from "assets/jss/natcash.js";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import {
  Box, FormControl, makeStyles, Tab,
  Table, TableBody, TableCell, TableHead, TableRow, Tabs, Typography, useTheme, withStyles
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import adminStyles from "assets/jss/natcash/components/headerLinksStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import shopStyle from "assets/jss/natcash/views/shoplist/shoplistStyle.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import Switch from "components/CustomSwitch/Switch.js";
import useWindowSize from "components/Hooks/useWindowSize.js";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import PropTypes from "prop-types";
import { setShowLoader } from "../../../redux/actions/app";
import { getPackage, getPaymentHistory } from "../../../utilities/ApiManage";

import { formatCurrency } from "../../../utilities/utils";

import styles from "assets/jss/natcash/views/rolesmanager/rolesManagerStyle.js";
import { useRouter } from "next/router";

import imgDoanhNghiep from "assets/img/doanhnghiep.png";
import imgKhoiDong from "assets/img/khoidong.png";
import imgKinhDoanh from "assets/img/kinhdoanh.png";

function RoleManagerPage() {
  const dispatch = useDispatch();
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
  const [filterType, setFilterType] = useState("promotion_name");
  const [filterValue, setFilterValue] = useState("");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

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

  const LIST_TITLE_VALUE = [
    {
      id: "en",
      value: ["Revenue", "Order", "Promotion combo orders", "Quantity sold"],
    },
    {
      id: "vi",
      value: [
        "Doanh thu",
        "Đơn hàng",
        "Đơn hàng combo khuyến mãi",
        "Số lượng đã bán",
      ],
    },
  ];

  const TAB_LIST = [
    {
      id: "en",
      value: ["Service list", "Payment history"],
    },
    {
      id: "vi",
      value: ["Danh sách dịch vụ", "Lịch sử thanh toán"],
    },
  ];

  const TABLE_HEAD = [
    {
      id: "en",
      value: ["Name", "Package registration period", "Payment", "Automatic limit", "Status"],
    },
    {
      id: "vi",
      value: [
        "Tên",
        "Thời gian đăng kí gói",
        "Phương thức thanh toán",
        "Giới hạn tự động",
        "Trạng thái",
      ],
    },
  ];
  const TABLE_HEAD_1 = [
    {
      id: "en",
      value: ["Name", "Type of service", "Package", "Time", "Payment", "Amount", "Status"],
    },
    {
      id: "vi",
      value: [
        "Tên",
        "Loại dịch vụ",
        "Gói",
        "Thời gian đăng kí",
        "Phương thức thanh toán",
        "Tổng tiền",
        "Trạng thái",
      ],
    },
  ];

  const BUTTON = [
    {
      id: "en",
      value: ["Add new", "Apply", "Reset", "Search", "Retype"],
    },
    {
      id: "vi",
      value: ["Thêm mới", "Áp dụng", "Đặt lại", "Tìm", "Nhập lại"],
    },
  ];


  const FILTER_BOX = [
    {
      id: "en",
      title: "Add products",
      button: ["Search", "Reset", "Confirm"],
      select: ["By promotion name", "By product name, By product id"],
    },
    {
      id: "vi",
      title: "Thêm sản phẩm",
      button: ["Tìm", "Nhập lại", "Xác nhận"],
      select: ["Tên chương trình", "Tên sản phẩm", "Mã sản phẩm"],
    },
  ];

  const TABLE_BUTTON = [
    {
      id: "en",
      value: ["Detail", "Copy", "Orders and data", "Preview", "End", "Delete"],
    },
    {
      id: "vi",
      value: [
        "Chi tiết",
        "Sao chép",
        "Đơn hàng và dữ liệu",
        "Xem trước",
        "Kết thúc",
        "Xóa",
      ],
    },
  ];

  const listText = [
    {
      id: "en",
      title2: "Packages registered and paid",
      tabList: TAB_LIST[0].value,
      tabFilter: FORM[0].value,
      tableHead: TABLE_HEAD[0].value,
      tableHead1: TABLE_HEAD_1[0].value,
      button: BUTTON[0].value,
      filter_box_button: FILTER_BOX[0].button,
      filter_box_select: FILTER_BOX[0].select,
      placeholder: "Enter here",
      table_button: TABLE_BUTTON[0].value,
    },
    {
      id: "vi",
      title2: "Gói đã đăng ký và thanh toán",
      tabList: TAB_LIST[1].value,
      tabFilter: FORM[1].value,
      tableHead: TABLE_HEAD[1].value,
      tableHead1: TABLE_HEAD_1[1].value,
      button: BUTTON[1].value,
      filter_box_button: FILTER_BOX[1].button,
      filter_box_select: FILTER_BOX[1].select,
      placeholder: "Nhập vào",
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

  useEffect(() => {
    dispatch(setShowLoader(true));
    getPackageData();
    getHistoryPayment();
    dispatch(setShowLoader(false));
  }, []);

  const getPackageData = async () => {
    let res = await getPackage();
    setData(res.data);
  };
  const getHistoryPayment = async () => {
    let res = await getPaymentHistory();
    setData1(res.data);
  };


  // const [data1, setData1] = useState([
  //   {
  //     id: 312313,
  //     name: "ẠKKHSG1",
  //     type: "Kinh doanh",
  //     package: "Kinh doanh",
  //     payment: "Miễn phí",
  //     amount: 3213213,
  //     status: "Đã thanh toán",
  //     time_from: "10/09/2021",
  //     time_to: "12/09/2021",
  //   },
  //   {
  //       id: 312313,
  //       name: "ẠKKHSG2",
  //       type: "Kinh doanh",
  //       package: "Kinh doanh",
  //       payment: "Miễn phí",
  //       amount: 123456,
  //       status: "Đã thanh toán",
  //       time_from: "10/09/2021",
  //       time_to: "12/09/2021",
  //     },
  // ]);
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
    } else if (item.status == "Đã thanh toán") {
      color = successColor[1];
    } else if (item.status == "Không giới hạn") {
      color = primaryColor[0];
    }
    let img
    if (item.type === "Kinh doanh") {
      img = imgKinhDoanh
    } else if (item.type === "Khởi động") {
      img = imgKhoiDong
    } else {
      img = imgDoanhNghiep
    }
    return (
      <TableRow
        key={"renderTable" + index}
        className={tableClasses.tableBodyRow}
      >
        <TableCell className={tableClasses.tableCell} key={"type"}>
          <div className={classes.cellInfo}>
            <div className={[classes.infoTextContainer, classes.flex_center].join(" ")}>
              <img src={img} className={classes.imgMargin} />
              <p
                className={
                  classes.text +
                  " " +
                  classes.infoTextPrimary +
                  " " +
                  classes.cursorHover
                }
              >
                {item.type}
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"time"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {moment.unix(item.start_date).format("DD/MM/YYYY")}
          </p>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {moment.unix(item.end_date).format("DD/MM/YYYY")}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"payment"}>
          <div className={classes.flex_center}>
            <p className={classes.text + " " + classes.infoTextPrimary}>
              {item.payment}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"auto"}>
          <div className={classes.flex_center}>
            <Switch
              checked={item.auto}
              name="checkedA"
            />
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"status"}>
          {StatusText(item.status, color)}
        </TableCell>
      </TableRow>
    );
  };

  const renderTable1 = (item, index) => {
    let color = "black";
    if (item.status == "Finished") {
      color = grayColor[0];
    } else if (item.status == "Đã thanh toán") {
      color = successColor[1];
    } else if (item.status == "Không giới hạn") {
      color = primaryColor[0];
    }
    return (
      <TableRow
        key={"renderTable" + index}
        className={tableClasses.tableBodyRow}
      >
        <TableCell className={tableClasses.tableCell} key={"name"}>
          <div className={classes.cellInfo}>
            <div className={classes.infoTextContainer}>
              <p
                className={
                  classes.text +
                  " " +
                  classes.infoTextPrimary +
                  " " +
                  classes.cursorHover
                }
              >
                {item.name}
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"type"}>
          <div className={classes.flex_center}>
            <p className={classes.text + " " + classes.infoTextPrimary}>
              {item.type}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"duration"}>
          <div className={classes.flex_center}>
            <p className={classes.text + " " + classes.infoTextPrimary}>
              {item.duration + "Day"}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Time"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {moment.unix(item.start_date).format("DD/MM/YYYY")}
          </p>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {moment.unix(item.end_date).format("DD/MM/YYYY")}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"payment"}>
          <div className={classes.flex_center}>
            <p className={classes.text + " " + classes.infoTextPrimary}>
              {item.payment}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"amount"}>
          <div className={classes.flex_center}>
            <p className={classes.text + " " + classes.infoTextPrimary}>
              {formatCurrency(item.total_amount)}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"status"}>
          {StatusText(item.status, color)}
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
  const TableData_1 = () => {
    return (
      // <div className={tableClasses.tableResponsive}>
      <Table className={tableClasses.table}>
        {data !== undefined ? (
          <TableHead className={tableClasses["primary" + "TableHeader"]}>
            <TableRow className={tableClasses.tableHeadRow}>
              {text.tableHead1.map((prop, key) => {
                return (
                  <TableCell
                    className={
                      tableClasses.tableCell + " " + tableClasses.tableHeadCell
                    }
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {data1.map((item, index) => {
            return renderTable1(item, index);
          })}
        </TableBody>
      </Table>
      // </div>
    );
  };


  const handleChangeFilterValue = (event) => {
    setFilterValue(event.target.value);
  };
  const handelSearch = async () => {
    dispatch(setShowLoader(true));
    let res = await getPaymentHistory(filterValue);
    dispatch(setShowLoader(false));
    if (res.code === 200) {
      setData1(res.data);
    } else {
      NotificationManager.error({
        title: "Error",
        message: res.message ? res.message : "Error",
      });
    }
  };

  const FilterBox = () => {
    return (
      <div className={classes.flex_center} style={{ margin: "10px 0" }}>
        <FormControl variant="outlined" size="small" style={{ flex: 1 }}>
          <TextField
            //   error={validateItemName ? false : true}
            id="input1"
            label={""}
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
        <div style={{ marginLeft: "10px" }}>
          <Button color="primary" onClick={() => handelSearch()}>{text.filter_box_button[0]}</Button>
          <Button color="gray">{text.filter_box_button[1]}</Button>
        </div>
      </div>
    );
  };

  const CartListItem = () => {
    const handleChange = (event, newValue) => {
      setTabValue(newValue);
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
          </div>
          <div>
            <TabPanel
              value={tabValue}
              index={1}
              dir={theme.direction}
              className={classes.tabPanel}
            >
              {FilterBox()}
              {TableData_1()}
            </TabPanel>
            <TabPanel
              value={tabValue}
              index={0}
              dir={theme.direction}
              className={classes.tabPanel}
            >
              {TableData()}
            </TabPanel>
          </div>
        </CardBody>
      </Card>
    );
  };

  return (
    <>
      {CartListItem()}
    </>
  );
}

RoleManagerPage.layout = Admin;

export default WithAuthentication(RoleManagerPage);
