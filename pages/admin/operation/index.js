import React, {useEffect, useState} from "react";
// react plugin for creating charts
import {Bar, Doughnut, Line} from "react-chartjs-2";
import Link from "next/link";
// @material-ui/core
import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import Button from "components/CustomButtons/Button.js";
import moment from "moment";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import useWindowSize from "components/Hooks/useWindowSize.js";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import styles from "assets/jss/natcash/views/dashboardStyle.js";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import vi from "date-fns/locale/vi";
import {addShop, getOperationScreen} from "../../../utilities/ApiManage";

// utilities
import {formatCurrency, formatNumber} from "../../../utilities/utils";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";

const fakeData = {
  "revenue": [
    {
      "date_of_report": 1631795098,
      "total_revenue_of_month": 60000000,
      "cancel_revenue_of_month": 3600000,
      "total_order_of_month": 216,
      "cancel_order_of_month": 24,
      "total_revenue_today": 4000000,
      "cancel_revenue_today": 300000,
      "total_order_today": 18,
      "cancel_order_today": 2,
      "_id": "6149df9972e2a06734a790a4",
      "bus": "stt",
      "shop_id": null,
      "channel_of_month": {
        "shopee": 200,
        "lazada": 16
      },
      "channel_today": {
        "shopee": 12,
        "lazada": 6
      },
      "data_month": [
        {
          "date_of_report": 1630499098,
          "total_revenue_of_month": 65802882,
          "cancel_revenue_of_month": 8449194,
          "total_order_of_month": 758,
          "cancel_order_of_month": 75,
          "total_revenue_today": 8774973,
          "cancel_revenue_today": 49128,
          "total_order_today": 99,
          "cancel_order_today": 3,
          "channel_of_month": {
            "shopee": 200,
            "lazada": 16
          },
          "channel_today": {
            "shopee": 12,
            "lazada": 6
          }
        },
        {
          "date_of_report": 1630585498,
          "total_revenue_of_month": 73993253,
          "cancel_revenue_of_month": 9426763,
          "total_order_of_month": 222,
          "cancel_order_of_month": 62,
          "total_revenue_today": 6708554,
          "cancel_revenue_today": 98321,
          "total_order_today": 79,
          "cancel_order_today": 2,
          "channel_of_month": {
            "shopee": 200,
            "lazada": 16
          },
          "channel_today": {
            "shopee": 12,
            "lazada": 6
          }
        },
        {
          "date_of_report": 1630671898,
          "total_revenue_of_month": 45893760,
          "cancel_revenue_of_month": 5143840,
          "total_order_of_month": 181,
          "cancel_order_of_month": 22,
          "total_revenue_today": 7428809,
          "cancel_revenue_today": 25246,
          "total_order_today": 86,
          "cancel_order_today": 3,
          "channel_of_month": {
            "shopee": 200,
            "lazada": 16
          },
          "channel_today": {
            "shopee": 12,
            "lazada": 6
          }
        },
        {
          "date_of_report": 1630758298,
          "total_revenue_of_month": 89601887,
          "cancel_revenue_of_month": 7579046,
          "total_order_of_month": 878,
          "cancel_order_of_month": 89,
          "total_revenue_today": 6347389,
          "cancel_revenue_today": 98119,
          "total_order_today": 81,
          "cancel_order_today": 3,
          "channel_of_month": {
            "shopee": 200,
            "lazada": 16
          },
          "channel_today": {
            "shopee": 12,
            "lazada": 6
          }
        },
        {
          "date_of_report": 1630844698,
          "total_revenue_of_month": 94752290,
          "cancel_revenue_of_month": 4004539,
          "total_order_of_month": 267,
          "cancel_order_of_month": 44,
          "total_revenue_today": 6198427,
          "cancel_revenue_today": 6972,
          "total_order_today": 29,
          "cancel_order_today": 3,
          "channel_of_month": {
            "shopee": 200,
            "lazada": 16
          },
          "channel_today": {
            "shopee": 12,
            "lazada": 6
          }
        },
        {
          "date_of_report": 1630931098,
          "total_revenue_of_month": 42114634,
          "cancel_revenue_of_month": 6900388,
          "total_order_of_month": 99,
          "cancel_order_of_month": 64,
          "total_revenue_today": 9187075,
          "cancel_revenue_today": 53890,
          "total_order_today": 12,
          "cancel_order_today": 3,
          "channel_of_month": {
            "shopee": 200,
            "lazada": 16
          },
          "channel_today": {
            "shopee": 12,
            "lazada": 6
          }
        },
        {
          "date_of_report": 1631017498,
          "total_revenue_of_month": 86209317,
          "cancel_revenue_of_month": 6843025,
          "total_order_of_month": 185,
          "cancel_order_of_month": 36,
          "total_revenue_today": 4445861,
          "cancel_revenue_today": 45309,
          "total_order_today": 56,
          "cancel_order_today": 3,
          "channel_of_month": {
            "shopee": 200,
            "lazada": 16
          },
          "channel_today": {
            "shopee": 12,
            "lazada": 6
          }
        },
        {
          "date_of_report": 1631103898,
          "total_revenue_of_month": 40521220,
          "cancel_revenue_of_month": 9602749,
          "total_order_of_month": 329,
          "cancel_order_of_month": 10,
          "total_revenue_today": 9656144,
          "cancel_revenue_today": 9150,
          "total_order_today": 96,
          "cancel_order_today": 2,
          "channel_of_month": {
            "shopee": 200,
            "lazada": 16
          },
          "channel_today": {
            "shopee": 12,
            "lazada": 6
          }
        },
        {
          "date_of_report": 1631190298,
          "total_revenue_of_month": 50794374,
          "cancel_revenue_of_month": 6661639,
          "total_order_of_month": 63,
          "cancel_order_of_month": 69,
          "total_revenue_today": 6517278,
          "cancel_revenue_today": 43508,
          "total_order_today": 23,
          "cancel_order_today": 1,
          "channel_of_month": {
            "shopee": 200,
            "lazada": 16
          },
          "channel_today": {
            "shopee": 12,
            "lazada": 6
          }
        },
        {
          "date_of_report": 1631276698,
          "total_revenue_of_month": 53045756,
          "cancel_revenue_of_month": 6357861,
          "total_order_of_month": 184,
          "cancel_order_of_month": 55,
          "total_revenue_today": 4099613,
          "cancel_revenue_today": 54208,
          "total_order_today": 12,
          "cancel_order_today": 2,
          "channel_of_month": {
            "shopee": 200,
            "lazada": 16
          },
          "channel_today": {
            "shopee": 12,
            "lazada": 6
          }
        },
        {
          "date_of_report": 1631363098,
          "total_revenue_of_month": 96672568,
          "cancel_revenue_of_month": 4371265,
          "total_order_of_month": 94,
          "cancel_order_of_month": 77,
          "total_revenue_today": 9006927,
          "cancel_revenue_today": 73462,
          "total_order_today": 9,
          "cancel_order_today": 2,
          "channel_of_month": {
            "shopee": 200,
            "lazada": 16
          },
          "channel_today": {
            "shopee": 12,
            "lazada": 6
          }
        },
        {
          "date_of_report": 1631449498,
          "total_revenue_of_month": 98019576,
          "cancel_revenue_of_month": 8645454,
          "total_order_of_month": 361,
          "cancel_order_of_month": 70,
          "total_revenue_today": 7910143,
          "cancel_revenue_today": 82326,
          "total_order_today": 30,
          "cancel_order_today": 1,
          "channel_of_month": {
            "shopee": 200,
            "lazada": 16
          },
          "channel_today": {
            "shopee": 12,
            "lazada": 6
          }
        },
        {
          "date_of_report": 1631535898,
          "total_revenue_of_month": 87530508,
          "cancel_revenue_of_month": 6036690,
          "total_order_of_month": 232,
          "cancel_order_of_month": 47,
          "total_revenue_today": 9138725,
          "cancel_revenue_today": 63929,
          "total_order_today": 86,
          "cancel_order_today": 3,
          "channel_of_month": {
            "shopee": 200,
            "lazada": 16
          },
          "channel_today": {
            "shopee": 12,
            "lazada": 6
          }
        },
        {
          "date_of_report": 1631622298,
          "total_revenue_of_month": 97712136,
          "cancel_revenue_of_month": 7424254,
          "total_order_of_month": 273,
          "cancel_order_of_month": 66,
          "total_revenue_today": 4333544,
          "cancel_revenue_today": 71042,
          "total_order_today": 38,
          "cancel_order_today": 2,
          "channel_of_month": {
            "shopee": 200,
            "lazada": 16
          },
          "channel_today": {
            "shopee": 12,
            "lazada": 6
          }
        },
        {
          "date_of_report": 1631708698,
          "total_revenue_of_month": 53717479,
          "cancel_revenue_of_month": 9848431,
          "total_order_of_month": 135,
          "cancel_order_of_month": 30,
          "total_revenue_today": 8573630,
          "cancel_revenue_today": 94847,
          "total_order_today": 84,
          "cancel_order_today": 1,
          "channel_of_month": {
            "shopee": 200,
            "lazada": 16
          },
          "channel_today": {
            "shopee": 12,
            "lazada": 6
          }
        }
      ],
      "__v": 0
    }
  ],
  "marketing": [
    {
      "date_of_report": 1631795098,
      "_id": "6149df4a95f56845a8f71c75",
      "bus": "stt",
      "shop_id": null,
      "traffic": 69,
      "view": 699,
      "convention_rate": 12.5,
      "message_unreply": 24,
      "traffic_of_month": 69,
      "view_of_month": 699,
      "convention_rate_of_month": 12.5,
      "message_unreply_of_month": 24,
      "__v": 0
    }
  ],
  "shop_perform": [
    {
      "date_of_report": 1631795098,
      "last_14days_of_month": [],
      "_id": "6149df4a95f56845a8f71c74",
      "bus": "stt",
      "shop_id": null,
      "item": 169,
      "order": 18,
      "revenue": 4000000,
      "pending": 2,
      "item_of_month": 169,
      "order_of_month": 18,
      "revenue_of_month": 4000000,
      "pending_of_month": 2,
      "__v": 0
    }
  ],
  "shop": [
    {
      "_id": "61404c62ce6737ed2d193735",
      "shopId": 54435575,
      "channel": "shopee",
      "icon": "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
      "avatar": "https://cf.shopee.vn/file/af4d8775fc8a526c58ce085d3760181d",
      "name": "Hệ Thống Cửa Hàng Mẹ Và Bé Shop Trẻ Thơ",
      "code": "OFC"
    },
    {
      "_id": "61404c91ce6737ed2d19373a",
      "shopId": 119716298,
      "channel": "shopee",
      "icon": "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
      "avatar": "https://cf.shopee.vn/file/8a1a938dbab79d2023d80b264d4141d1",
      "name": "AnlaBaby Shop",
      "code": "ANLA"
    },
    {
      "_id": "61404cadce6737ed2d19373d",
      "shopId": 358814233,
      "channel": "shopee",
      "icon": "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
      "avatar": "https://cf.shopee.vn/file/bf72c9e92772550522b1527f940d8886",
      "name": "Shop Trẻ Thơ KNIC",
      "code": "SMN"
    },
    {
      "_id": "61466d07430c42235083580d",
      "shopId": 200166558032,
      "avatar": "https://cdn.chanhtuoi.com/uploads/2020/06/logo-lazada-2.png",
      "channel": "lazada",
      "code": "VN33W4SRV7",
      "icon": "https://cdn.chanhtuoi.com/uploads/2020/06/logo-lazada-2.png",
      "name": "Shop Trẻ Thơ KNIC"
    }
  ]
};

function Dashboard() {
  const router = useRouter();
  const { shop_id, code } = router.query;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useTableStyles = makeStyles(tableStyles);
  const tableClasses = useTableStyles();
  const size = useWindowSize();
  const [showFilter, setShowFilter] = useState(false);
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const [fromDate, setFromDate] = useState(moment().format());
  const [toDate, setToDate] = useState(moment().format());
  const [revenue, setRevenue] = useState();
  const [marketing, setMarketing] = useState();
  const [shopPerform, setShopPerform] = useState();
  const [listShop, setListShop] = useState();
  const [filterDate, setFilterDate] = useState("today");
  const {t} = useTranslation();

  const SHOP_TABLE_HEAD = [
      t('operation.shopInfo'),
      t('operation.products'),
      t('operation.orders'),
      t('operation.unpaidOrders'),
      t('voucher.revenue'),
      t('operation.trendL14d'),
  ];

  const PRODUCT_TABLE_HEAD = [
    t('operation.productInfo'),
    t('operation.itemSold'),
    t('voucher.revenue'),
    t('operation.trendL14d'),
  ];


  const getOperationData = async () => {
    // var res = await getOperationScreen();
    setRevenue(fakeData.revenue[0]);
    setListShop(fakeData.shop);
    setShopPerform(fakeData.shop_perform);
    setMarketing(fakeData.marketing[0]);
  };

  useEffect(() => {
    if (shop_id) {
      addShop(shop_id, code, "shopee");
    }
    getOperationData();
  }, []);

  const chartLineLabels = [];
  const totalRevenueToday = [];
  const cancelRevenueToday = [];
  const totalOrderToday = [];
  const cancelOrderToday = [];
  for (let i = 0; i < revenue?.data_month.length; i++) {
    chartLineLabels.push(i + 1);
    totalRevenueToday.push(revenue?.data_month[i].total_revenue_today);
    cancelRevenueToday.push(revenue?.data_month[i].cancel_revenue_today);
    totalOrderToday.push(revenue?.data_month[i].total_order_today);
    cancelOrderToday.push(revenue?.data_month[i].cancel_order_today);
  }

  const cardInfoData = [
    {
      icon: "monetization_on_outlined",
      title: t('operation.monthRevenue'),
      value: revenue ? formatCurrency(revenue?.total_revenue_of_month) : "0",
    },
    {
      icon: "monetization_on_outlined",
      title: t('operation.todayRevenue'),
      value: revenue ? formatNumber(revenue?.total_revenue_today) : "0",
    },
    {
      icon: "shopping_cart_outlined",
      title: t('operation.todayOrders'),
      value: revenue ? formatNumber(revenue?.total_order_today) : "0",
    },
    {
      icon: "pending",
      title: t('operation.unpaidOrders'),
      value: "0",
    },
    {
      icon: "trending_up",
      title: t('operation.traffic'),
      value:
        filterDate == "today" ? (
          <>{formatNumber(marketing?.traffic)}</>
        ) : (
          <>{formatNumber(marketing?.traffic_of_month)}</>
        ),
    },
    {
      icon: "visibility_outlined",
      title: t('operation.view'),
      value:
        filterDate == "today" ? (
          <>{formatNumber(marketing?.view)}</>
        ) : (
          <>{formatNumber(marketing?.view_of_month)}</>
        ),
    },
    {
      icon: "align_vertical_bottom",
      title: t('operation.conventionRate'),
      value:
        filterDate == "today" ? (
          <>{formatNumber(marketing?.convention_rate)}</>
        ) : (
          <>{formatNumber(marketing?.convention_rate_of_month)}</>
        ),
    },
    {
      icon: "announcement",
      title: t('operation.unreply'),
      value:
        filterDate == "today" ? (
          <>{formatNumber(marketing?.message_unreply)}</>
        ) : (
          <>{formatNumber(marketing?.message_unreply_of_month)}</>
        ),
    },
  ];

  function getCardInfo() {
    return (
      <>
        {cardInfoData.map((item, index) => (
          <GridItem
            xs={3}
            sm={3}
            md={3}
            style={{
              marginRight: size.width < 725 ? "90px" : "",
            }}
            key={item.title}
          >
            <Button
              color="white"
              style={{
                minWidth: "170px",
                width: "100%",
                height: "130px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Icon className={classes.iconShopData}>{item.icon}</Icon>
                {item.title}
                <p className={classes.txtShopDataValue}>{item.value}</p>
              </div>
            </Button>
          </GridItem>
        ))}
      </>
    );
  }

  // Chart Data
  const chartData = {
    // dataDoughnutChart: {
    //   labels: ["Shopee", "Lazada"],
    //   datasets: [
    //     {
    //       label: "# of Votes",
    //       data:
    //         filterDate == "today"
    //           ? [revenue?.channel_today.shopee, revenue?.channel_today.lazada]
    //           : [
    //               revenue?.channel_of_month.shopee,
    //               revenue?.channel_of_month.lazada,
    //             ],
    //       backgroundColor: [
    //         "rgba(255, 99, 132, 0.2)",
    //         "rgba(54, 162, 235, 0.2)",
    //         "rgba(255, 206, 86, 0.2)",
    //         "rgba(75, 192, 192, 0.2)",
    //         "rgba(153, 102, 255, 0.2)",
    //         "rgba(255, 159, 64, 0.2)",
    //       ],
    //       borderColor: [
    //         "rgba(255, 99, 132, 1)",
    //         "rgba(54, 162, 235, 1)",
    //         "rgba(255, 206, 86, 1)",
    //         "rgba(75, 192, 192, 1)",
    //         "rgba(153, 102, 255, 1)",
    //         "rgba(255, 159, 64, 1)",
    //       ],
    //       borderWidth: 1,
    //     },
    //   ],
    // },
    dataLineChart: {
      labels: chartLineLabels,
      datasets: [
        {
          label: t('operation.totalRevenue'),
          data: totalRevenueToday,
          fill: false,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          yAxisID: "y",
        },
        {
          label: t('operation.totalCancel'),
          data: cancelRevenueToday,
          fill: false,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          yAxisID: "y",
        },
        {
          label: t('operation.orders'),
          data: totalOrderToday,
          fill: false,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          yAxisID: "y1",
        },
        {
          label: t('operation.ordersCancel'),
          data: cancelOrderToday,
          fill: false,
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          yAxisID: "y1",
        },
      ],
    },
  };

  const config = {
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };


  //Table Data
  const [data, setData] = useState({
    product: [
      {
        id: 1,
        productCode: "TP-71",
        productName: "Glico Icreo Nhật Bản số 0 (0-12 tháng)",
        image:
          "https://media.shoptretho.com.vn/upload/image/product/20180628/sua-bot-combiotic-hipp-so-1-800g-new-1.png",
        shopName: "STTMN",
        shopIcon:
          "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
        quantity: 20,
        price: 250000,
        order: 10,
        sales: 2500000,
        status: "Đã kích hoạt",
        isConnect: false,
        types: [
          {
            id: 1,
            typeCode: "TP-711",
            typeName: "900g",
            image:
              "https://media.shoptretho.com.vn/upload/image/product/20180628/sua-bot-combiotic-hipp-so-1-800g-new-1.png",
            quantity: 15,
            price: 250000,
            order: 4,
            sales: 1000000,
            isConnect: false,
          },
          {
            id: 1,
            typeCode: "TP-712",
            typeName: "650g",
            image:
              "https://media.shoptretho.com.vn/upload/image/product/20180628/sua-bot-combiotic-hipp-so-1-800g-new-1.png",
            quantity: 10,
            price: 200000,
            order: 6,
            sales: 1200000,
            isConnect: false,
          },
        ],
        dataBarChart: {
          labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
          datasets: [
            {
              label: "",
              data: [5, 4, 7, 2, 46, 2, 42, 43, 12, 43, 11, 12, 13, 14],
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
          scales: { xAxes: [{ display: false }], yAxes: [{ display: false }] },
        },
      },
      {
        id: 2,
        productCode: "TP-71",
        productName: "Sữa bột trẻ em",
        image:
          "https://media.shoptretho.com.vn/upload/image/product/20180628/sua-bot-combiotic-hipp-so-1-800g-new-1.png",
        shopName: "STTMN",
        shopIcon:
          "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
        quantity: 20,
        price: 250000,
        order: 10,
        sales: 2500000,
        status: "Đã kích hoạt",
        isConnect: true,
        dataBarChart: {
          labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
          datasets: [
            {
              label: "",
              data: [4, 2, 12, 4, 43, 26, 34, 8, 2, 10, 31, 7, 13, 14],
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
        },
      },
      {
        id: 3,
        productCode: "SU-331",
        productName: "Sữa bột trẻ em",
        image:
          "https://media.shoptretho.com.vn/upload/image/product/20180628/sua-bot-combiotic-hipp-so-1-800g-new-1.png",
        shopName: "STTOfficial",
        shopIcon:
          "https://group.lazada.com/static/ipr_annual_report/images/xxl-lazada-logo.svg",
        quantity: 20,
        price: 250000,
        order: 10,
        sales: 2500000,
        status: "Đã kích hoạt",
        isConnect: false,
        types: [
          {
            id: 1,
            typeCode: "SU-3311",
            typeName: "900g",
            image:
              "https://media.shoptretho.com.vn/upload/image/product/20180628/sua-bot-combiotic-hipp-so-1-800g-new-1.png",
            quantity: 15,
            price: 250000,
            order: 4,
            sales: 1000000,
            isConnect: false,
          },
          {
            id: 1,
            typeCode: "SU-3312",
            typeName: "650g",
            image:
              "https://media.shoptretho.com.vn/upload/image/product/20180628/sua-bot-combiotic-hipp-so-1-800g-new-1.png",
            quantity: 10,
            price: 200000,
            order: 6,
            sales: 1200000,
            isConnect: false,
          },
        ],
        dataBarChart: {
          labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
          datasets: [
            {
              label: "",
              data: [11, 2, 23, 4, 5, 6, 1, 8, 9, 10, 11, 12, 51, 14],
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
        },
      },
      {
        id: 4,
        productCode: "SP-321",
        productName: "Bỉm trẻ em",
        image:
          "https://dairymart.vn/wp-content/uploads/2018/09/b%E1%BB%89m-bobby-t%C3%A3-d%C3%A1n-l23.jpg",
        shopName: "STT",
        shopIcon:
          "https://group.lazada.com/static/ipr_annual_report/images/xxl-lazada-logo.svg",
        quantity: 20,
        price: 250000,
        order: 10,
        sales: 2500000,
        status: "Đã kích hoạt",
        isConnect: true,
        dataBarChart: {
          labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
          datasets: [
            {
              label: "",
              data: [11, 24, 23, 4, 5, 25, 7, 8, 55, 10, 11, 12, 3, 14],
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
        },
      },
      {
        id: 5,
        productCode: "KT-0023",
        productName: "Bánh ăn dặm",
        image: "https://toplist.vn/images/800px/banh-an-dam-gerber-590833.jpg",
        shopName: "STTMN",
        shopIcon:
          "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
        quantity: 20,
        price: 250000,
        order: 10,
        sales: 2500000,
        status: "Chưa kích hoạt",
        isConnect: false,
        dataBarChart: {
          labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
          datasets: [
            {
              label: "",
              data: [1, 14, 3, 123, 5, 6, 151, 23, 67, 33, 5, 64, 13, 14],
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
        },
      },
    ],
    // shop: [
    //   {
    //     id: 1,
    //     shopName: "ShopTreTho Miền Nam",
    //     shopShortName: "STTMN",
    //     image:
    //       "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
    //     quantityProduct: 20,
    //     order: 100,
    //     pendingOrders: 20,
    //     sales: 2500000,
    //     isActive: true,
    //     dataBarChart: {
    //       labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    //       datasets: [
    //         {
    //           label: "",
    //           data: [5, 4, 7, 2, 46, 2, 42, 43, 12, 43, 11, 12, 13, 14],
    //           backgroundColor: ["rgba(54, 162, 235, 0.2)"],
    //           borderColor: ["rgba(54, 162, 235, 1)"],
    //           borderWidth: 1,
    //         },
    //       ],
    //     },
    //   },
    // ],
  });
  const [checked, setChecked] = useState([]);
  const [showProduct, setShowProduct] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
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
  const handleShowProduct = (item) => {
    const currentIndex = showProduct.indexOf(item);
    const newShowProduct = [...showProduct];
    if (currentIndex === -1) {
      newShowProduct.push(item);
    } else {
      newShowProduct.splice(currentIndex, 1);
    }
    setShowProduct(newShowProduct);
  };
  const productInfo = (item) => {
    return (
      <div className={classes.proContainer}>
        <img className={classes.proImg} src={item?.image} />
        <div className={classes.proInfoContainer}>
          <Link href={"/admin/product/" + item.id}>
            <a
              target="_blank"
              className={tableClasses.tableCell + " " + classes.txtProductName}
            >
              {item?.productName}
            </a>
          </Link>
          <div className={classes.proContainer}>
            <div className={classes.shopInfoContainer}>
              <img className={classes.shopImg} src={item?.shopIcon} />
              <p className={tableClasses.tableCell + " " + classes.txtShopName}>
                {item?.shopName}
              </p>
            </div>
            <div className={classes.shopInfoContainer}>
              <Icon className={classes.codeIcon}>crop_free</Icon>
              <p className={tableClasses.tableCell + " " + classes.txtShopName}>
                {item?.productCode}
              </p>
            </div>
          </div>
          {item?.isConnect && (
            <p className={tableClasses.tableCell + " " + classes.txtLienKet}>
              Chưa liên kết sản phẩm kho
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderProduct = (item, index) => {
    return (
      <React.Fragment key={index}>
        <TableRow
          className={tableClasses.tableBodyRow}
          style={{
            backgroundColor: checked.indexOf(item) !== -1 ? "#fdf7ff" : "#fff",
          }}
        >
          <TableCell className={tableClasses.tableCell} key={"productInfo"}>
            {productInfo(item)}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"order"}>
            {item.order}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"sales"}>
            {formatCurrency(item.sales)}
          </TableCell>
          <TableCell
            className={tableClasses.tableCell}
            key={"trend"}
            style={{ maxWidth: "100px" }}
          >
            <Bar data={item.dataBarChart} />
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };
  const shopInfo = (id) => {
    let shop;
    listShop?.map((item, index) => {
      if (item.shopId == id) {
        shop = item;
      }
    });
    return (
      <div className={classes.proContainer}>
        <img className={classes.proImg} src={shop?.avatar} />
        <div className={classes.proInfoContainer}>
          <p
            className={tableClasses.tableCell}
            style={{
              fontSize: "15px",
              padding: "0",
              margin: "0",
              marginBottom: "4px",
            }}
          >
            {/*sdfdsfasdf*/}
          </p>
          <div className={classes.proContainer}>
            <div className={classes.shopInfoContainer}>
              <p className={tableClasses.tableCell + " " + classes.txtShopName}>
                {/*ádfsdaf*/}
              </p>
            </div>
          </div>
          <p className={tableClasses.tableCell + " " + classes.txtLienKet}>
            {t('active')}
          </p>
        </div>
      </div>
    );
  };
  const renderShop = (item, index) => {
    return (
      <React.Fragment key={index}>
        <TableRow
          className={tableClasses.tableBodyRow}
          style={{
            backgroundColor: checked.indexOf(item) !== -1 ? "#fdf7ff" : "#fff",
          }}
        >
          <TableCell className={tableClasses.tableCell} key={"shopInfo"}>
            {shopInfo(item.shopId)}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"quantity"}>
            {filterDate == "month" ? item.item_of_month : item.item}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"order"}>
            {filterDate == "month" ? item.order_of_month : item.order}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"pending"}>
            {filterDate == "month" ? item.pending_of_month : item.pending}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"sales"}>
            {filterDate == "month"
              ? formatCurrency(item.revenue_of_month)
              : formatCurrency(item.revenue)}
          </TableCell>
          <TableCell
            className={tableClasses.tableCell}
            key={"trend"}
            style={{ maxWidth: "100px" }}
          >
            {/* <Bar data={item.dataBarChart} /> */}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };
  return (
    <div>
      <GridContainer
        style={{
          flexWrap: `${size.width < 541 ? "nowrap" : "wrap"}`,
          overflowX: `${size.width < 541 ? "scroll" : ""}`,
        }}
      >
        {getCardInfo()}
      </GridContainer>
      <div
        className={classes.filterContainer}
        style={{
          flexDirection: `${size.width < 541 ? "column" : "row"}`,
          marginTop: "25px",
        }}
      >
        {/* pc filter */}
        {size.width > 540 && (
          <FormControl
            className={classes.formControl}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className={classes.filterDate}>
              <Button
                color={filterDate == "today" ? "info" : "gray"}
                onClick={() => setFilterDate("today")}
                className={classes.btnFilter}
              >
                {t('operation.today')}
              </Button>
              <Button
                color={filterDate == "month" ? "info" : "gray"}
                onClick={() => setFilterDate("month")}
                className={classes.btnFilter}
              >
                {t('operation.thisMonth')}
              </Button>
            </div>
          </FormControl>
        )}
        {/* end pc filter */}
        {/* mobile filter */}
        {size.width < 541 && (
          <FormControl className={dashClasses.formControl}>
            <Button
              color="primary"
              style={{ padding: "10px 30px", width: "100px" }}
              onClick={() => setShowFilter(true)}
            >
              {t('filter')}
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
              }}
            >
              <Fade in={showFilter}>
                <Card className={classes.modalContainer}>
                  <CardHeader>
                    <h4 className={classes.cardTitleWhite}>
                      {t('operation.chooseFilter')}
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <div class={classes.filterEleContent}>
                      <div
                        className={classes.filterDate}
                        style={{ marginRight: 0 }}
                      >
                        <GridContainer>
                          <GridItem xs={6} sm={6} md={6}>
                            <Button
                              color={filterDate == "today" ? "info" : ""}
                              onClick={() => setFilterDate("today")}
                              className={classes.btnFilterDate}
                            >
                              {t('operation.today')}
                            </Button>
                          </GridItem>
                          <GridItem xs={6} sm={6} md={6}>
                            <Button
                              color={filterDate == "month" ? "info" : ""}
                              onClick={() => setFilterDate("month")}
                              className={classes.btnFilterDate}
                            >
                              {t('operation.thisMonth')}
                            </Button>
                          </GridItem>
                        </GridContainer>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Fade>
            </Modal>
          </FormControl>
        )}
        {/* end mobile filter */}
      </div>
      {/* ---------------------------------------------------------------------------- */}
      <GridContainer>
        {/* Line Chart */}
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader>
              <Line data={chartData.dataLineChart} options={config} />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle2}>{t('operation.revenueTrend')}</h4>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <Tooltip title={t('operation.totalRevenueTip')} arrow>
                    <p className={classes.cardSubtitle}>
                      {t('operation.totalRevenue')}
                    </p>
                  </Tooltip>
                  <p className={classes.cardMoney}>
                    <span>₫ </span>
                    {filterDate == "today" ? (
                      <>{formatNumber(revenue?.total_revenue_today)}</>
                    ) : (
                      <>{formatNumber(revenue?.total_revenue_of_month)}</>
                    )}
                  </p>
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <Tooltip title={t('operation.unpaidTip')} arrow>
                    <p className={classes.cardSubtitle}>
                      {" "}
                      {t('operation.unpaid')}
                    </p>
                  </Tooltip>
                  <p className={classes.cardMoney}>
                    <span>₫ </span>17,115,740
                  </p>
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <Tooltip title={t('operation.paidTip')} arrow>
                    <p className={classes.cardSubtitle}>
                      {" "}
                      {t('operation.paid')}
                    </p>
                  </Tooltip>
                  <p className={classes.cardMoney}>
                    <span>₫ </span>22,480,940
                  </p>
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <Tooltip title={t('operation.canceledTip')} arrow>
                    <p className={classes.cardSubtitle}>
                      {" "}
                      {t('operation.cancelAndReturn')}
                    </p>
                  </Tooltip>
                  <p className={classes.cardMoney}>
                    <span>₫ </span>
                    {filterDate == "today" ? (
                      <>{formatNumber(revenue?.cancel_revenue_today)}</>
                    ) : (
                      <>{formatNumber(revenue?.cancel_revenue_of_month)}</>
                    )}
                  </p>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        {/* End Line Chart */}
        {/* Doughnut Chart */}
        {/*<GridItem xs={12} sm={12} md={4}>*/}
        {/*  <Card chart>*/}
        {/*    <CardHeader>*/}
        {/*      <Doughnut data={chartData.dataDoughnutChart} />*/}
        {/*    </CardHeader>*/}
        {/*    <CardBody*/}
        {/*      style={{ marginBottom: `${size.width < 769 ? "0" : "98px"}` }}*/}
        {/*    >*/}
        {/*      <h4 className={classes.cardTitle2}>{t('operation.revenueChannel')}</h4>*/}
        {/*    </CardBody>*/}
        {/*    <CardFooter chart>*/}
        {/*      <div className={classes.stats}>*/}
        {/*        <AccessTime /> campaign sent 2 days ago*/}
        {/*      </div>*/}
        {/*    </CardFooter>*/}
        {/*  </Card>*/}
        {/*</GridItem>*/}
        {/* End Doughnut Chart */}
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>
                {t('operation.shopPerform')}
              </h4>
              <p className={classes.cardCategoryWhite}>
                {filterDate == "today" ? (
                  <>{t('operation.today')}</>
                ) : (
                    <>{t('operation.thisMonth')}</>
                )}
              </p>
            </CardHeader>
            <CardBody style={{ paddingTop: 0 }}>
              <div className={tableClasses.tableResponsive}>
                <Table className={tableClasses.table}>
                  {shopPerform !== undefined ? (
                    <TableHead
                      className={tableClasses["primary" + "TableHeader"]}
                    >
                      <TableRow className={tableClasses.tableHeadRow}>
                        {SHOP_TABLE_HEAD.map((prop, key) => {
                          return (
                            <TableCell
                              className={
                                tableClasses.tableCell +
                                " " +
                                tableClasses.tableHeadCell
                              }
                              key={"tableHead" + key}
                            >
                              {prop}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                  ) : null}
                  <TableBody>
                    {shopPerform?.map((item, index) => {
                      return renderShop(item, index);
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>
                {t('operation.bestSelling')}
              </h4>
              <p className={classes.cardCategoryWhite}>
                {filterDate == "today" ? (
                    <>{t('operation.today')}</>
                ) : (
                    <>{t('operation.thisMonth')}</>
                )}
              </p>
            </CardHeader>
            <CardBody style={{ paddingTop: 0 }}>
              <div className={tableClasses.tableResponsive}>
                <Table className={tableClasses.table}>
                  {data.product !== undefined ? (
                    <TableHead
                      className={tableClasses["primary" + "TableHeader"]}
                    >
                      <TableRow className={tableClasses.tableHeadRow}>
                        {PRODUCT_TABLE_HEAD.map((prop, key) => {
                          return (
                            <TableCell
                              className={
                                tableClasses.tableCell +
                                " " +
                                tableClasses.tableHeadCell
                              }
                              key={"tableHeadRow" + key}
                            >
                              {prop}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                  ) : null}
                  <TableBody>
                    {data.product.map((item, index) => {
                      return renderProduct(item, index);
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

Dashboard.layout = Admin;

export default WithAuthentication(Dashboard);
// export default Dashboard;
