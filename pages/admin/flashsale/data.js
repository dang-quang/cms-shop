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
import CartTotalInfo2 from "components/CardTotalInfo2/CartTotalInfo2.js";
import PropTypes from "prop-types";

import { formatCurrency, formatNumber } from "../../../utilities/utils";

import { useRouter } from "next/router";
import styles from "assets/jss/natcash/views/flashsale/flashSaleDataStyle.js";

function DataFlashSalePage() {
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
  const [tableData, setTableData] = useState();

  const language = useSelector((state) => state.app.language);
  useEffect(() => {
    dataReal.map((item, index) => {
      if (item.id == id) {
        setData(item);
        setCardTotalData(item.promotion_info);
        setTableData(item.rank);
      }
    });
  }, []);
  
  const TAB_LIST = [
    {
      id: "en",
      value: ["All", "Happenning", "Upcoming", "Finished"],
    },
    {
      id: "vi",
      value: ["Tất cả", "Đang diễn ra", "Sắp diễn ra", "Đã kết thúc"],
    },
  ];
  const LIST_TITLE_VALUE = [
    {
      id: "en",
      value: ["Reminders","Views", "Clicks", "Click Rate", "Revenue", "Order", "Buyer","Revenue Buyers"],
    },
    {
      id: "vi",
      value: [
        "Lượt nhắc nhở",
        "Lượt xem",
        "Lượt click",
        "Tỉ lệ click",
        "Doanh thu",
        "Đơn hàng",
        "Người mua",
        "Doanh thu/Người mua",
      ],
    },
  ];

  const TABLE_HEAD = [
    {
      id: "en",
      value: [
        "Rank",
        "Product",
        "Classify",
        "Promotion Quantity", 
        "Promotion Price",
        "Revenue",
        "Order",
        "Products",
        "Reminders",
        "views",
        "Clicks",
    
      ],
    },
    {
      id: "vi",
      value: [
        "Thứ hạng",
        "Sản phẩm",
        "Phân loại hàng",
        "SL khuyến mãi",
        "Giá Khuyến Mãi",
        "Doanh thu",
        "Đơn hàng",
        "Sản phẩm",
        "Lượt nhắc",
        "Lượt xem",
        "Lượt click",
      ],
    },
  ];

  const TOOLTIP = [
    {
      id: "en",
      value: [
        "Total value of confirmed orders with this promotion.",
        "Number of products in the confirmed order with this promotion",
        "Number of confirmed orders with this promotion.",
        "Number of buyers with confirmed orders with the promotion.",
        "Revenue on the number of buyers who have confirmed orders with this promotion.",
      ],
    },
    {
      id: "vi",
      value: [
        "Tổng giá trị đơn hàng đã xác nhận với chương trình khuyến mãi này.",
        "Số sản phẩm thuộc đơn hàng đã xác nhận với chương trình khuyến mãi này.",
        "Số đơn hàng đã xác nhận với chương trình khuyến mãi này.",
        "Số người mua có đơn hàng đã xác nhận với chương trình khuyến mãi.",
        "Doanh thu trên số người mua có  đơn hàng đã xác nhận với chương trình khuyến mãi này.",
      ],
    },
  ];

  const listText = [
    {
      id: "en",
      title: "",
      title2: "Product Rank",
      subTitle2: "Total order",
      status: TAB_LIST[0].value,
      listTitleValue: LIST_TITLE_VALUE[0].value,
      tableHead: TABLE_HEAD[0].value,
      txtClassify: "Classify",
      tooltip: TOOLTIP[0].value,
      time: ["Edit time","Flash sale time takes place", "Time frame"],
    },
    {
      id: "vi",
      title: "",
      
      title2: "Thứ hạng sản phẩm",
      subTitle2: "Đơn hàng tổng cộng",
      tabList: TAB_LIST[1].value,
      listTitleValue: LIST_TITLE_VALUE[1].value,
      tableHead: TABLE_HEAD[1].value,
      txtClassify: "Phân loại",
      tooltip: TOOLTIP[1].value,
      time: ["Thời gian chỉnh sửa", "Thời gian flash sale diễn ra", "Khung thời gian",]
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

  const [dataReal, setDataReal] = useState([
    {
      id: 312313,
      shop_id: 54435575,
      shop_icon:
        "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
      shop_code: "STTMN",
      shop_name: "ShopTreTho Miền Nam",
      
      promotion_info: {
        promotion_name: "sale 21.9",
        status: "Happenning",
        time_from: moment().format("yyyy-MM-DDThh:mm"),
        time_to: moment().add(1, "hours").format("yyyy-MM-DDThh:mm"),
        reminders:1,
        views:23,
        clicks:15,
        click_rate:"1:15",
        revenue:formatCurrency("48657"),
        order:2,
        buyer:5,
        revenue_buyers: 23,               
      },
      rank: [
        {
          id: 1234,
          rank: 1,
          product: {
            product_id: 1412412,
            product_name: "Xe cân bằng trẻ em Cruzee nhiều màu",
            image: "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
            discount_code: "Mã FMCGMALL - 8% đơn 250K",
            product_type: [
              {
                classify: "Số 0( 0-1 tuổi)",
                promotion_price:"1% OFF",
                promotional_quantity: 12,
                revenue:formatCurrency(4366500),
                order: 2,
                products: 2,
                reminders: 1,
                views: 1,
                clicks: 1,

                
              },
              {
                classify: "Số 9( 1-3T)",
                promotion_price:"2% OFF",
                promotional_quantity: 1,
                revenue:formatCurrency(500),
                order: 1,
                products: 2,
                reminders: 1,
                views: 1,
                clicks: 1,

                
              },
            ],
          },
        },
        {
         id: 1424,
          rank: 2,
          product: {
            product_id: 1421241,
            product_name: "Sữa Meiji số 0/9 - 800g",
            image: "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
            discount_code: "Mã FMCGMALL - 8% đơn 250K",
            product_type: [
              {
                classify: "Số 0( 0-1 tuổi)",
                promotion_price:"2% OFF",
                promotional_quantity: 1,
                revenue:formatCurrency(12456),
                order: 1,
                products: 1,
                reminders: 2,
                views: 3,
                clicks: 4,

              },
            ],
          },
        },
      ],
    },
    
    {
      id: 124122,
      shop_id: 54435575,
      shop_icon:
        "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
      shop_code: "Anlababy",
      shop_name: "Anlababy",
      
      promotion_info: {
        promotion_name: "FS 15.9",
        status: "Finished",
        time_from: moment().format("yyyy-MM-DDThh:mm"),
      time_to: moment().add(1, "hours").format("yyyy-MM-DDThh:mm"),
        reminders:1,
        views:23,
        clicks:15,
        click_rate:"1:15",
        revenue:formatCurrency("579988"),
        order:2,
        buyer:5,
        revenue_buyers: 23,
      },
      rank: [
        {
          id: 1234,
          rank: 1,
          product: {
            product_id: 1412412,
            product_name: "Xe cân bằng trẻ em Cruzee nhiều màu",
            image: "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
            discount_code: "Mã FMCGMALL - 8% đơn 250K",
            product_type: [
              {
                classify: "Số 0( 0-1 tuổi)",
                promotion_price:"1% OFF",
                promotional_quantity: 12,
                revenue:formatCurrency(1366500),
                order: 1,
                products: 1,
                reminders: 1,
                views: 1,
                clicks: 1,

                
              },
              {
                classify: "Số 9( 1-3T)",
                promotion_price:"2% OFF",
                promotional_quantity: 13,
                revenue:formatCurrency(2366500),
                order: 2,
                products: 2,
                reminders: 2,
                views: 2,
                clicks: 2,

                
              },
            ],
          },
        },
        {
         id: 1424,
          rank: 3,
          product: {
            product_id: 1421241,
            product_name: "Sữa Meiji số 0/9 - 800g",
            image: "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
            discount_code: "Mã FMCGMALL - 8% đơn 250K",
            product_type: [
              {
                
                classify: "Số 0( 0-1 tuổi)",
                promotion_price:"3% OFF",
                promotional_quantity: 14,
                revenue:formatCurrency(123456),
                order: 3,
                products: 3,
                reminders: 3,
                views: 3,
                clicks: 3,

               
              },
            ],
          },
        },
      ],
    },
    {
      id: 124333,
      shop_id: 54435575,
      shop_icon:
        "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
      shop_code: "Anlababy",
      shop_name: "Anlababy",
      
      promotion_info: {
        promotion_name: "FS 15.9",
        status: "Upcoming",
        time_from: moment().format("yyyy-MM-DDThh:mm"),
      time_to: moment().add(1, "hours").format("yyyy-MM-DDThh:mm"),
        reminders:1,
        views:23,
        clicks:15,
        click_rate:"1:15",
        revenue:formatCurrency("579988"),
        order:2,
        buyer:5,
        revenue_buyers: 23,
      },
      rank: [
        {
          id: 1234,
          rank: 1,
          product: {
            product_id: 1412412,
            product_name: "Xe cân bằng trẻ em Cruzee nhiều màu",
            image: "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
            discount_code: "Mã FMCGMALL - 8% đơn 250K",
            product_type: [
              {
                classify: "Số 0( 0-1 tuổi)",
                promotion_price:"1% OFF",
                promotional_quantity: 12,
                revenue:formatCurrency(1366500),
                order: 1,
                products: 1,
                reminders: 1,
                views: 1,
                clicks: 1,

                
              },
              {
                classify: "Số 9( 1-3T)",
                promotion_price:"2% OFF",
                promotional_quantity: 13,
                revenue:formatCurrency(2366500),
                order: 2,
                products: 2,
                reminders: 2,
                views: 2,
                clicks: 2,

                
              },
            ],
          },
        },
        {
         id: 1424,
          rank: 3,
          product: {
            product_id: 1421241,
            product_name: "Sữa Meiji số 0/9 - 800g",
            image: "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
            discount_code: "Mã FMCGMALL - 8% đơn 250K",
            product_type: [
              {
                
                classify: "Số 0( 0-1 tuổi)",
                promotion_price:"3% OFF",
                promotional_quantity: 14,
                revenue:formatCurrency(123456),
                order: 3,
                products: 3,
                reminders: 3,
                views: 3,
                clicks: 3,

               
              },
            ],
          },
        },
      ],
    },
  ]);

  const listValue = [
    {
      title: text.listTitleValue[0],
      tooltip: text.tooltip[0],
      value: cardTotalData?.reminders,
      compareValue: "",
      type: "",
    },
    {
      title: text.listTitleValue[1],
      tooltip: text.tooltip[1],
      value: cardTotalData?.views,
      compareValue: "",
      type: "",
    },
    {
      title: text.listTitleValue[2],
      tooltip: text.tooltip[2],
      value: cardTotalData?.clicks,
      compareValue: "",
      type: "",
    },
    {
      title: text.listTitleValue[3],
      tooltip: text.tooltip[3],
      value: cardTotalData?.click_rate,
      compareValue: "",
      type: "",
    },
    {
      title: text.listTitleValue[4],
      tooltip: text.tooltip[4],
      value: formatCurrency(cardTotalData?.revenue),
      compareValue: "",
      type: "",
    },
    {
      title: text.listTitleValue[5],
      tooltip: text.tooltip[5],
      value: cardTotalData?.order,
      compareValue: "",
      type: "",
    },
    {
      title: text.listTitleValue[6],
      tooltip: text.tooltip[6],
      value: cardTotalData?.buyer,
      compareValue: "",
      type: "",
    },
    {
      title: text.listTitleValue[7],
      tooltip: text.tooltip[7],
      value: cardTotalData?.revenue_buyers,
      compareValue: "",
      type: "",
    },
  ];

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
        <TableCell className={tableClasses.tableCell} key={"Rank"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.rank}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Product"}>
          <div className={classes.cellInfo}>
            <img src={item.product?.image} className={classes.tableImage} />
            <div className={classes.infoTextContainer}>
              <p className={classes.text + " " + classes.infoTextPrimary}>
                {item.product.product_name}
              </p>
              <p className={classes.text + " " + classes.infoTextSecondary}>
                {item.product.discount_code}
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Classify"}>
            {item.product.product_type.map((props) => {
                return <p className={classes.text + " " + classes.infoTextPrimary}>{props.classify}</p>;
            })}
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Promotional quantity"}>
            {item.product.product_type.map((props) => {
                return <p className={classes.text + " " + classes.infoTextPrimary}>{props.promotional_quantity}</p>;
            })}
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Promotion price"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.product.product_type.map((props) => {
                return <p className={classes.text + " " + classes.infoTextPrimary}>{props.promotion_price}</p>;
            })}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"revenue"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.product.product_type.map((props) => {
                return <p className={classes.text + " " + classes.infoTextPrimary}>{props.revenue}</p>;
            })}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Order"}>
         <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.product.product_type.map((props) => {
                return <p className={classes.text + " " + classes.infoTextPrimary}>{props.order}</p>;
            })}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Products"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.product.product_type.map((props) => {
                return <p className={classes.text + " " + classes.infoTextPrimary}>{props.products}</p>;
            })}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Reminders"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.product.product_type.map((props) => {
                return <p className={classes.text + " " + classes.infoTextPrimary}>{props.reminders}</p>;
            })}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Views"}>
         <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.product.product_type.map((props) => {
                return <p className={classes.text + " " + classes.infoTextPrimary}>{props.views}</p>;
            })}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"clicks"}>
         <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.product.product_type.map((props) => {
                return <p className={classes.text + " " + classes.infoTextPrimary}>{props.clicks}</p>;
            })}
          </p>
        </TableCell>
       
      </TableRow>
    
    );
  };

  const TableData = () => {
    return (
      <div className={tableClasses.tableResponsive}>
        <Table className={tableClasses.table}>
          {tableData !== undefined ? (
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
            {tableData?.map((item, index) => {
              return renderTable(item, index);
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  const CartListItem = () => {
    return (
      <Card>
        <CardHeader color="primary" >
          <h4 className={classes.cardTitleWhite}>{text.title2}</h4>
        <p className={classes.cardCategoryWhite}
        >
         {"(" + text.time[2] +
         ": " +
         cardTotalData?.time_from +
         " - " +
         cardTotalData?.time_to +
         ")"
        }
         </p>
        </CardHeader>
        <CardBody className={classes.cardBody}>{TableData()}</CardBody>
      </Card>
    );
  };

 
  return (
    <>
      <CartTotalInfo
        title={text.title + " " + cardTotalData?.promotion_name+ " " +cardTotalData?.status}
        
        
        subTitle={
        
         
          text.time[0] +
          ": " +
          cardTotalData?.time_from +
          " - " +
          cardTotalData?.time_to +
          " "+
          text.time[1] +
          ": " +
          cardTotalData?.time_from +
          " - " +
          cardTotalData?.time_to
        }

        compareText={text.compareText}
        listValue={listValue}
        xs={3}
        sm={3}
        md={3}
        column={9}
        
      />
      
      {CartListItem()}
      
    </>
  );
}

DataFlashSalePage.layout = Admin;

export default WithAuthentication(DataFlashSalePage);
