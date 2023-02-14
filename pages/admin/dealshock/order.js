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
import { } from "@material-ui/core/styles";
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
import CartTotalInfo2 from "components/CardTotalInfo2/CartTotalInfo2.js";
import PropTypes from "prop-types";

import { formatCurrency, formatNumber } from "../../../utilities/utils";

import { useRouter } from "next/router";
import styles from "assets/jss/natcash/views/dealshock/dealShockOrderStyle.js";

function DealShockOrderPage() {
  const router = useRouter();
  const id = router.query.id;
  const theme = useTheme();
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
  const [data, setData] = useState();
  const [cardTotalData, setCardTotalData] = useState();
  const [infoData, setInfoData] = useState();
  
  
  const [tabValue, setTabValue] = React.useState(0);

  const language = useSelector((state) => state.app.language);
  useEffect(() => {
    dataReal.map((item, index) => {
      if (item.id == id) {
        setData(item);
        
        setCardTotalData(item.dealshock_info);
       
        
        //setTableData_2(item.data.listInfoDetail);
        //setInfoData(item.data.info)
      }
    });
  }, []);

  const LIST_TITLE_VALUE = [
    {
      id: "en",
      value: [
        "Shock Deal Type: ",
        "Conditions for receiving gifts:",
        "Shock Deal Name: ",
        "Program time:",
      ],
    },
    {
      id: "vi",
      value: [
        "Loại Deal Sốc:",
        "Điều kiện nhận quà:",
        "Tên Deal Sốc:",
        "Thời gian chương trình:",
      ],
    },
  ];
  const LIST_TITLE_VALUE_2 = [
    {
      id: "en",
      value: [
        "Revenue",
        "Order",
        "Combo Sold",
        "Products sold",
        "Buyer",
        "Revenue per Buyer",
      ],
    },
    {
      id: "vi",
      value: [
        "Doanh thu",
        "Đơn hàng",
        "Combo Khuyến Mãi đã bán",
        "Số lượng sản phẩm đã bán",
        "Người mua",
        "Doanh thu trên mỗi Người mua",
      ],
    },
  ];

  const TABLE_HEAD = [
    {
      id: "en",
      value: [
        "Order ID",
        "Product",
        "Classify",
        "Unit price",
        "Quantity",
        "Total amount",
        "Status",
      ],
    },
    {
      id: "vi",
      value: [
        "Mã đơn hàng",
        "Sản phẩm",
        "Phân loại",
        "Đơn giá",
        "Số lượng",
        "Thành tiền",
        "Trạng thái",
      ],
    },
  ];

  const TABLE_HEAD_2 = [
    {
      id: "en",
      value: [
        "Date",
        "Revenue",
        "Orders",
        "Combo sold",
        "Products sold",
        "Buyer",
        "Revenue per Buyer",
      ],
    },
    {
      id: "vi",
      value: [
        "Ngày",
        "Doanh thu",
        "Đơn hàng",
        "Combo đã bán",
        "Sản phẩm đã bán",
        "Người mua",
        "Doanh thu/Người mua"
      ],
    },
  ];

  const TAB_LIST = [
    {
      id: "en",
      value: ["Overview", "Deal Shock Data Details"],
    },
    {
      id: "vi",
      value: ["Tổng quan", "Chi tiết dữ liệu Deal Sốc"],
    },
  ];

  const BUTTON = [
    {
      id: "en",
      value: [
        "Export", "Download"
      ],
    },
    {
      id: "vi",
      value: [
        "Xuất", "Tải dữ liệu"
      ],
    },
  ];

  const TOOLTIP = [
    {
      id: "en",
      value: [
        "The total value of all promotional combos. This value includes shipping, excluding other promotions.",
        "Total of all confirmed orders with promotional combos.",
        "The total number of promotional combos in the confirmed order.",
        "Total number of products sold in promotional combos (confirmed order)",
        "Total number of buyers who purchased this promotional combo in all confirmed orders.",
        "Average combo promotion revenue per buyer (confirmed order)",
      ],
    },
    {
      id: "vi",
      value: [
        "Tổng giá trị của tất cả combo khuyến mãi. Giá trị này bao gồm cả phí vận chuyển, không bao gồm những khuyến mãi khác.",
        "Tổng số tất cả các đơn hàng đã được xác nhận có combo khuyến mãi.",
        "Tổng số combo khuyến mãi thuộc đơn hàng đã được xác nhận.",
        "Tổng số sản phẩm đã bán thuộc combo khuyến mãi (đơn hàng đã được xác nhận)",
        "Tổng số người mua đã mua combo khuyến mãi này trong tất cả các đơn hàng đã được xác nhận.",
        "Doanh thu trung bình của combo khuyến mãi trên mỗi người mua (đơn hàng đã xác nhận)",
      ],
    },
  ];

  const listText = [
    {
      id: "en",
      title: "Infomation",
      title2: "Order overview",
      subTitle2: ["Total", "products"],
      type_product:["Main product", "Gift"],
      listTitleValue: LIST_TITLE_VALUE[0].value,
      listTitleValue_2: LIST_TITLE_VALUE_2[0].value,
      tableHead: TABLE_HEAD[0].value,
      tableHead_2: TABLE_HEAD_2[0].value,
      shop: "Shop",
      tabList: TAB_LIST[0].value,
      button: BUTTON[0].value,
      txtClassify: "Classify",
      tooltip: TOOLTIP[0].value,
    },
    {
      id: "vi",
      title: "Thông tin cơ bản",
      title2: "Tổng quan đơn hàng",
      subTitle2: ["Tổng cộng", "sản phẩm"],
      type_product:["Sản phẩm chính", "Quà tặng"],
      listTitleValue: LIST_TITLE_VALUE[1].value,
      listTitleValue_2: LIST_TITLE_VALUE_2[1].value,
      tableHead: TABLE_HEAD[1].value,
      tableHead_2: TABLE_HEAD_2[1].value,
      shop: "Gian hàng",
     
      button: BUTTON[1].value,
      txtClassify: "Phân loại",
      tooltip: TOOLTIP[1].value,
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

 
  const [dataReal, setDataReal] = useState([
    {
      id: 312313,
      shop_id: 54435575,
     
      dealshock_info: {
        dealshock_type: "Mua Để Nhận Quà",
        dealshock_name: "aptamil tặng sữa",
        time_from: "2021-09-14T14:07:11.747Z",
        time_to: "2021-09-21T14:07:11.747Z",
        limited_order: "mua đ 99.00 để nhận quà",
      },
    orders:[
      
      {
        id: 111,
        order_id: "210909SWNW8YW5",
        status: "Finished",

        main_product: [
          {
            id: "1234",
            avatar: "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
            name: "Bình đun nước thông minh Moaz Bebe MB-002",
            discount_code: "Mã FMCGMALL - 8% đơn 250K",
            sold: 23,
            original_price: 1210000,
            quantity: 5,
            shipping_info: "Nhanh",
            barcode: "TP-7466",
            limited_order: 20,
         
          },
    
        ],
        sub_product: [
    
          {
            id: "34524523",
            avatar: "https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc",
            name: "Sữa Meiji số 0/9 - 800gg",
            sold: 30,
            discount_code: "Mã FMCGMALL - 8% đơn 250K",
            original_price: 550000,
            quantity: 2,
            shipping_info: "Nhanh",
            limited_order: 20,
            type_product: "Gift",
            barcode: "TP-7466",
           
          }
        ],
      },
      {
        id: 112,
        order_id: "210jjjjj777778",
        status: "Happenning",

        main_product: [
          {
            id: "1234",
            avatar: "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
            name: "Bình đun nước thông minh Moaz Bebe MB-002",
            discount_code: "Mã FMCGMALL - 8% đơn 250K",
            sold: 23,
            original_price: 1310000,
            quantity: 5,
            shipping_info: "Nhanh",
            barcode: "TP-7466",
            limited_order: 20,
         
          },
    
        ],
        sub_product: [
    
          {
            id: "34524523",
            avatar: "https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc",
            name: "Sữa Meiji số 0/9 - 800gg",
            sold: 30,
            discount_code: "Mã FMCGMALL - 8% đơn 250K",
            original_price: 550000,
            quantity: 1,
            shipping_info: "Nhanh",
            limited_order: 20,
            type_product: "Gift",
            barcode: "TP-7466",
           
          }
        ],
      },
    ]
        
    },
    {
      id: 124122,
      
      dealshock_info: {
        dealshock_type: "Mua Để Nhận quà 2",
        dealshock_name: "goo tặng sữa",
        time_from: "2021-09-14T14:07:11.747Z",
        time_to: "2021-09-21T14:07:11.747Z",
        limited_order: "Mua dd540.000 để nhận quà tặng",
      },
     
      orders:[
      
        {
          id: 111,
          order_id: "210909SWNW8YW5",
          status: "Finished",
  
          main_product: [
            {
              id: "1234",
              avatar: "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
              name: "Bình đun nước thông minh Moaz Bebe MB-002",
              discount_code: "Mã FMCGMALL - 8% đơn 250K",
              sold: 23,
              original_price: 1210000,
              quantity: 5,
              shipping_info: "Nhanh",
              barcode: "TP-7466",
              limited_order: 20,
           
            },
      
          ],
          sub_product: [
      
            {
              id: "34524523",
              avatar: "https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc",
              name: "Sữa Meiji số 0/9 - 800gg",
              sold: 30,
              discount_code: "Mã FMCGMALL - 8% đơn 250K",
              original_price: 550000,
              quantity: 2,
              shipping_info: "Nhanh",
              limited_order: 20,
              type_product: "Gift",
              barcode: "TP-7466",
             
            }
          ],
        },
        {
          id: 112,
          order_id: "210jjjjj777778",
          status: "Happenning",
  
          main_product: [
            {
              id: "1234",
              avatar: "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
              name: "Bình đun nước thông minh Moaz Bebe MB-002",
              discount_code: "Mã FMCGMALL - 8% đơn 250K",
              sold: 23,
              original_price: 1310000,
              quantity: 5,
              shipping_info: "Nhanh",
              barcode: "TP-7466",
              limited_order: 20,
           
            },
      
          ],
          sub_product: [
      
            {
              id: "34524523",
              avatar: "https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc",
              name: "Sữa Meiji số 0/9 - 800gg",
              sold: 30,
              discount_code: "Mã FMCGMALL - 8% đơn 250K",
              original_price: 550000,
              quantity: 1,
              shipping_info: "Nhanh",
              limited_order: 20,
              type_product: "Gift",
              barcode: "TP-7466",
             
            }
          ],
        },
      ]
     
        
      
    },
  ]);

  const listValue = [
    {
      title: [
        text.listTitleValue[0],
        text.listTitleValue[1],
      ],
      value: [
        cardTotalData?.dealshock_type,
        cardTotalData?.limited_order,
      ],
    },
    {
      title: [
        text.listTitleValue[2],
      ],
      value: [
        cardTotalData?.dealshock_name
      ],
    },
    {
      title: [
        text.listTitleValue[3],
      ],
      value: [
        moment(cardTotalData?.time_from).format("h:mm DD/MM/YYYY") +
        " - " +
        moment(cardTotalData?.time_to).format("h:mm DD/MM/YYYY"),
      ],
    },
  ];

  const listValue_2 = [
    {
      title: text.listTitleValue_2[0],
      tooltip: text.tooltip[0],
      value: formatCurrency(infoData?.revenue),
    },
    {
      title: text.listTitleValue_2[1],
      tooltip: text.tooltip[1],
      value: infoData?.order,
    },
    {
      title: text.listTitleValue_2[2],
      tooltip: text.tooltip[2],
      value: infoData?.combo_sold,
    },
    {
      title: text.listTitleValue_2[3],
      tooltip: text.tooltip[3],
      value: infoData?.products_sold,
    },
    {
      title: text.listTitleValue_2[4],
      tooltip: text.tooltip[4],
      value: infoData?.buyer,
    },
    {
      title: text.listTitleValue_2[5],
      tooltip: text.tooltip[5],
      value: formatCurrency(infoData?.revenue_per_buyer),
    },
  ];
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
    // let color = "black";
    // if (item.type_product == "MainProduct") {
    //   color = grayColor[0];
    // } else if (item.type_product == "Gift") {
    //   color = successColor[1];
    // } 
    let color = "black";
    if (item.status == "Finished") {
      color = grayColor[0];
    } else if (item.status == "Happenning") {
      color = successColor[1];
    } else if (item.status == "Upcoming") {
      color = primaryColor[0];
    } else {
      color = successColor[1]
    }
    return (
      <TableRow
        key={"renderTable" + index}
        className={tableClasses.tableBodyRow}
      >
        <TableCell className={tableClasses.tableCell} key={"OrderID"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.order_id}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Product"}>


          {item.main_product.map((mainProduct, stt) => {
           
            return (
              <div className={classes.cellInfo} key = {index}>
                <img
                  src={mainProduct.avatar}
                  className={classes.tableImage}
                />
                <div className={classes.infoTextContainer}>
                  <p
                    className={
                      classes.text +
                      " " +
                      classes.infoTextPrimary
                    }
                  >
                    {mainProduct.name}
                  </p>

                  <div className={classes.flex_center}>
                    <p className={classes.text + " " + classes.infoTextSecondary} style={{ marginRight: "10px" }}>
                      {text.txtClassify}: {item.type_product?.length > 0 ? item.type_product.length : "-"}
                    </p>
                    <p className={classes.text + " " + classes.infoTextSecondary}>
                      SKU: {mainProduct.barcode}
                    </p>
                  </div>
                 
                  <button className={classes.infoTextStatus1}>{text.type_product[0]}</button>
                </div>
              </div>
            )
          })}
           {item.sub_product.map((subProduct, stt) => {
            return (
              <div className={classes.cellInfo} style={{ marginTop: "20px" }}>
                <img
                  src={subProduct.avatar}
                  className={classes.tableImage}
                />
                <div className={classes.infoTextContainer}>
                  <p
                    className={
                      classes.text +
                      " " +
                      classes.infoTextPrimary
                    }
                  >
                    {subProduct.name}
                  </p>

                  <div className={classes.flex_center}>
                    <p className={classes.text + " " + classes.infoTextSecondary} style={{ marginRight: "10px" }}>
                      {text.txtClassify}: {item.type_product?.length > 0 ? item.type_product.length : "-"}
                    </p>
                    <p className={classes.text + " " + classes.infoTextSecondary}>
                      SKU: {subProduct.barcode}
                    </p>

                  </div>
                  <button className={classes. infoTextStatus1}>{text.type_product[1]}</button>

                </div>
              </div>
            )
          })}


        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"classify"}>
        {item.main_product.map((mainProduct, stt) => {
            return (
              <p className={classes.text + " " + classes.infoTextPrimary} style={{marginBottom: "60px"}}>
                {"-"}
              </p>
            )
          })}
          {item.sub_product.map((subProduct, stt) => {
            return (
              <p className={classes.text + " " + classes.infoTextPrimary} style={{marginBottom: "40px"}}>
                {"-"}
              </p>
            )
          })}
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Discount"}>
          {item.main_product.map((mainProduct, stt) => {
            return (
              <p className={classes.text + " " + classes.infoTextPrimary} style={{marginBottom: "60px"}}>
                {formatCurrency(mainProduct.original_price)}
              </p>
            )
          })}
          {item.sub_product.map((subProduct, stt) => {
            return (
              <div style={{marginBottom: "20px"}}>
                <p className={classes.text + " " + classes.infoTextPrimary} >
                  {formatCurrency(subProduct.original_price)}
                </p>
                <p className={classes.text + " " + classes.infoTextSecondary} style={{ textDecoration: "line-through" }}>
                  {formatCurrency(subProduct.original_price )}
                </p>
              </div>
            )
          })}
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Quantity"}>
          {item.main_product.map((mainProduct, stt) => {
            return (
              <p className={classes.text + " " + classes.infoTextPrimary} style={{marginBottom: "60px"}}>
                {mainProduct.quantity}
              </p>
            )
          })}
          {item.sub_product.map((subProduct, stt) => {
            return (
              <p className={classes.text + " " + classes.infoTextPrimary} style={{marginBottom: "40px"}}>
                {subProduct.quantity}
              </p>
            )
          })}
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"TotalAmount"}>
        {item.main_product.map((mainProduct, stt) => {
            return (
              <div>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {formatCurrency(mainProduct.original_price * mainProduct.quantity)}
          </p>
            {item.sub_product.map((subProduct, stt) => {
              return (
            <p className={classes.text + " " + classes.infoTextSecondary} style={{ textDecoration: "line-through" }}>
              {formatCurrency((subProduct.original_price * subProduct.quantity) + (mainProduct.original_price * mainProduct.quantity))}
            </p>
            )
          })}
         </div>
          )
          })}
        
         
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Status"}>
        {StatusText(item.status, color)}
        </TableCell>
      </TableRow>
    );
  };

  const TableData = () => {
   
    return (
      <div className={tableClasses.tableResponsive}>
        <Table className={tableClasses.table}>
          {data?.orders ?(
            <TableHead className={tableClasses["primary" + "TableHeader"]}>
              <TableRow className={tableClasses.tableHeadRow}>
                {text.tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={
                        tableClasses.tableCell +
                        " " +
                        tableClasses.tableHeadCell
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
            {data?.orders.map((item, index) => {
              return renderTable(item, index);
            })}
           
          </TableBody>
        </Table>
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
          {text.subTitle2[0] + ":  " +
            "  " + text.subTitle2[1]}
        </CardHeader>
        <CardBody className={classes.cardBody}>
          <div className={classes.tabHeaderContainer}>
            <AntTabs
              value={tabValue}
              onChange={handleChange}
              aria-label="ant example"
              style={{ width: "100%" }}
            >
              
            </AntTabs>
            <Link href={"/admin/order/addorder"}>
              {tabValue == 0 ? (

                <Button color="primary">
                  <Icon className={classes.btnFilter}>import_export_outlined</Icon>
                  {text.button[0]}
                </Button>
              ) : (
                <Button color="primary">
                  <Icon className={classes.btnFilter}>file_download</Icon>
                  {text.button[1]}
                </Button>
              )}
            </Link>
          </div>
          <div>
            <TabPanel
              value={tabValue}
              index={0}
              dir={theme.direction}
              className={classes.tabPanel}
            >
              {TableData()}
            </TabPanel>
            <TabPanel
              value={tabValue}
              index={1}
              dir={theme.direction}
              className={classes.tabPanel}
            >
           
              
            </TabPanel>
          </div>
        </CardBody>
      </Card>
    );
  };

  return (
    <>

      <CartTotalInfo2
        title={text.title}

        listValue={listValue}
      />
      {CartListItem()}
    </>
  );
}

DealShockOrderPage.layout = Admin;

export default WithAuthentication(DealShockOrderPage);
