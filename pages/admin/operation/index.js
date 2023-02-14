import React, { useCallback, useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import Link from "next/link";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Success from "components/Typography/Success.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import CardInfo from "components/CardInfo/CardInfo.js";
import Button from "components/CustomButtons/Button.js";
import { bugs, website, server } from "variables/general.js";
import moment from "moment";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import useWindowSize from "components/Hooks/useWindowSize.js";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import vi from "date-fns/locale/vi";
import { addShop, getOperationScreen } from "../../../utilities/ApiManage";

// utilities
import { formatCurrency, formatNumber } from "../../../utilities/utils";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";
import { connect, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import styles from "assets/jss/natcash/views/dashboardStyle.js";

function Dashboard() {
  const router = useRouter();
  const { shop_id, code } = router.query;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useTableStyles = makeStyles(tableStyles);
  const tableClasses = useTableStyles();
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();
  const size = useWindowSize();
  const [showFilter, setShowFilter] = useState(false);
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const [storeStatusFilter, setStoreStatusFilter] = useState([]);
  const [fromDate, setFromDate] = useState(moment().format());
  const [toDate, setToDate] = useState(moment().format());
  const [connectStatusFilter, setConnectStatusFilter] = useState("");
  const [shopData, setShopData] = React.useState([]);
  const [shop, setShop] = React.useState("");
  const [revenue, setRevenue] = useState();
  const [marketing, setMarketing] = useState();
  const [shopPerform, setShopPerform] = useState();
  const [listShop, setListShop] = useState();
  const [doFilter, setDoFilter] = useState(false);
  const [filterDate, setFilterDate] = useState("today");
  const [filterEcom, setFilterEcom] = useState("all");
  const [filterShop, setFilterShop] = useState("all");

  const CARD_TITLE = [
    {
      id: "en",
      value: [
        "This month revenue",
        "Today revenue",
        "Today orders",
        "Pending orders",
      ],
    },
    {
      id: "vi",
      value: [
        "Doanh thu tháng này",
        "Doanh thu hôm nay",
        "Đơn hàng hôm nay",
        "Đơn hàng chờ xử lý",
      ],
    },
  ];

  const CARD_TITLE_2 = [
    {
      id: "en",
      value: ["Traffic", "View", "Convention rate", "Message unreply"],
    },
    {
      id: "vi",
      value: ["Traffic", "Lượt xem", "Tỷ lệ quy ước", "Tin nhắn chưa trả lời"],
    },
  ];

  const BUTTON = [
    {
      id: "en",
      value: ["Today", "This month", "Filter"],
    },
    {
      id: "vi",
      value: ["Hôm nay", "Tháng này", "Bộ lọc"],
    },
  ];

  // Tooltip title
  const TOOLTIP_TEXT = [
    {
      id: "en",
      value: [
        "Total buyer paid value of orders during the selected time period, exclusive of all discounts applied, store credit, shipping fees and surcharges.",
        "Total buyer paid value of orders which are on the way to customers during the selected time period, exclusive of all discounts applied, store credit, shipping fees and surcharges.",
        "Total buyer paid value of orders which are delivered successfully during the selected time period, exclusive of all discounts applied, store credit, shipping fees and surcharges.",
        "Total revenue of orders which are canceled, failed to deliver and returned.",
      ],
    },
    {
      id: "vi",
      value: [
        "Doanh thu được tính trên tất cả các đơn hàng  được tạo trong khoảng thời gian được chọn (bao gồm đơn hàng huỷ và hoàn), chưa bao gồm các chi phí như phí vận chuyển và chi phí khuyến mại.",
        "Tổng doanh thu của tất cả đơn hàng đang trên đường giao cho khách hàng được tạo trong khoảng thời gian được chọn, chưa bao gồm các loại phí như phí vận chuyển và khuyến mãi.",
        "Tổng doanh thu của tất cả đơn hàng đã giao thành công cho khách hàng được tạo trong khoảng thời gian được chọn, chưa bao gồm các loại phí như phí vận chuyển và khuyến mãi.",
        "Tổng doanh thu của đơn hàng được tạo trong khoảng thời gian được chọn nhưng bị huỷ, giao hàng thất bại và hàng hoàn.",
      ],
    },
  ];

  const CHART = [
    {
      id: "en",
      value: ["Total revenue", "shipped", "delivered", "CANCELLED & RETURNED"],
      title: ["Revenue trend", "Revenue by channel"],
      label: [
        "Total revenue",
        "Total cancelled/returned",
        "Orders",
        "Orders cancelled/returned",
      ],
    },
    {
      id: "vi",
      value: [
        "Tổng doanh thu",
        "Đang vận chuyển",
        "Giao thành công",
        "Hủy & Hoàn trả",
      ],
      title: ["Xu thế doanh thu", "Doanh thu kênh bán"],
      label: ["Tổng doanh thu", "Tổng hoàn/hủy", "Đơn hàng", "Đơn hoàn/hủy"],
    },
  ];

  const SELECT = [
    {
      id: "en",
      value: ["All"],
      title: ["Channel", "Shop"],
    },
    {
      id: "vi",
      value: ["Tất cả"],
      title: ["Kếnh", "Gian hàng"],
    },
  ];

  const CARD_HEADER = [
    {
      id: "en",
      value: ["Shop performance", "Best selling products", "Choose filter"],
      subValue: ["Today", "This month"],
    },
    {
      id: "vi",
      value: [
        "Hiệu suất hoạt động của gian hàng",
        "Sản phẩm bán chạy",
        "Chọn bộ lọc",
      ],
      subValue: ["Hôm nay", "Tháng này"],
    },
  ];

  //Table head
  const TABLE_HEAD = [
    {
      id: "en",
      shop: [
        "Shop Information",
        "Products",
        "Orders",
        "Pending Orders",
        "Revenue",
        "Trend L14D",
      ],
      product: ["Product information", "Items sold", "Revenue", "Trend L14D"],
    },
    {
      id: "vi",
      shop: [
        "Thông tin gian hàng",
        "Sản phẩm",
        "Đơn hàng",
        "Đơn hàng chờ xử lý",
        "Doanh thu",
        "Xu thế 14 ngày",
      ],
      product: [
        "Thông tin sản phẩm",
        "Đơn hàng",
        "Doanh thu",
        "Xu thế 14 ngày",
      ],
    },
  ];

  const language = useSelector((state) => state.app.language);
  const [text, setText] = useState({
    id: "en",
    card_title: CARD_TITLE[0].value,
    card_title_2: CARD_TITLE_2[0].value,
    button: BUTTON[0].value,
    tooltipTxt: TOOLTIP_TEXT[0].value,
    chart_title: CHART[0].title,
    chart_value: CHART[0].value,
    chart_label: CHART[0].label,
    select_title: SELECT[0].title,
    select_value: SELECT[0].value,
    card_header_value: CARD_HEADER[0].value,
    card_header_subValue: CARD_HEADER[0].subValue,
    table_head_shop: TABLE_HEAD[0].shop,
    table_head_product: TABLE_HEAD[0].product,
  });
  const listText = [
    {
      id: "en",
      card_title: CARD_TITLE[0].value,
      card_title_2: CARD_TITLE_2[0].value,
      button: BUTTON[0].value,
      tooltipTxt: TOOLTIP_TEXT[0].value,
      chart_title: CHART[0].title,
      chart_value: CHART[0].value,
      chart_label: CHART[0].label,
      select_title: SELECT[0].title,
      select_value: SELECT[0].value,
      card_header_value: CARD_HEADER[0].value,
      card_header_subValue: CARD_HEADER[0].subValue,
      table_head_shop: TABLE_HEAD[0].shop,
      table_head_product: TABLE_HEAD[0].product,
    },
    {
      id: "vi",
      card_title: CARD_TITLE[1].value,
      card_title_2: CARD_TITLE_2[1].value,
      button: BUTTON[1].value,
      tooltipTxt: TOOLTIP_TEXT[1].value,
      chart_title: CHART[1].title,
      chart_value: CHART[1].value,
      chart_label: CHART[1].label,
      select_title: SELECT[1].title,
      select_value: SELECT[1].value,
      card_header_value: CARD_HEADER[1].value,
      card_header_subValue: CARD_HEADER[1].subValue,
      table_head_shop: TABLE_HEAD[1].shop,
      table_head_product: TABLE_HEAD[1].product,
    },
  ];

  useEffect(() => {
    for (let i = 0; i < listText.length; i++) {
      if (language == listText[i].id) {
        setText(listText[i]);
        break;
      }
    }
  }, [language]);

  const getOperationData = async () => {
    var res = await getOperationScreen();
    setRevenue(res.data.revenue[0]);
    setListShop(res.data.shop);
    setShopPerform(res.data.shop_perform);
    setMarketing(res.data.marketing[0]);
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
      title: text.card_title[0],
      value: revenue ? formatCurrency(revenue?.total_revenue_of_month) : "0",
    },
    {
      icon: "monetization_on_outlined",
      title: text.card_title[1],
      value: revenue ? formatNumber(revenue?.total_revenue_today) : "0",
    },
    {
      icon: "shopping_cart_outlined",
      title: text.card_title[2],
      value: revenue ? formatNumber(revenue?.total_order_today) : "0",
    },
    {
      icon: "pending",
      title: text.card_title[3],
      value: "0",
    },
    {
      icon: "trending_up",
      title: text.card_title_2[0],
      value:
        filterDate == "today" ? (
          <>{formatNumber(marketing?.traffic)}</>
        ) : (
          <>{formatNumber(marketing?.traffic_of_month)}</>
        ),
    },
    {
      icon: "visibility_outlined",
      title: text.card_title_2[1],
      value:
        filterDate == "today" ? (
          <>{formatNumber(marketing?.view)}</>
        ) : (
          <>{formatNumber(marketing?.view_of_month)}</>
        ),
    },
    {
      icon: "align_vertical_bottom",
      title: text.card_title_2[2],
      value:
        filterDate == "today" ? (
          <>{formatNumber(marketing?.convention_rate)}</>
        ) : (
          <>{formatNumber(marketing?.convention_rate_of_month)}</>
        ),
    },
    {
      icon: "announcement",
      title: text.card_title_2[3],
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
    dataDoughnutChart: {
      labels: ["Shopee", "Lazada"],
      datasets: [
        {
          label: "# of Votes",
          data:
            filterDate == "today"
              ? [revenue?.channel_today.shopee, revenue?.channel_today.lazada]
              : [
                  revenue?.channel_of_month.shopee,
                  revenue?.channel_of_month.lazada,
                ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    dataLineChart: {
      labels: chartLineLabels,
      datasets: [
        {
          label: text.chart_label[0],
          data: totalRevenueToday,
          fill: false,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          yAxisID: "y",
        },
        {
          label: text.chart_label[1],
          data: cancelRevenueToday,
          fill: false,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          yAxisID: "y",
        },
        {
          label: text.chart_label[2],
          data: totalOrderToday,
          fill: false,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          yAxisID: "y1",
        },
        {
          label: text.chart_label[3],
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

  // Ecom data
  const ecomData = [
    {
      title: "Shopee",
      value: "shopee",
    },
    {
      title: "Lazada",
      value: "lazada",
    },
  ];

  const shopArr = [];
  const handleChangeEcom = (event) => {
    setFilterEcom(event.target.value);
    for (let i = 0; i < listShop?.length; i++) {
      if (listShop[i].channel == event.target.value) {
        shopArr.push(listShop[i]);
        setShopData(shopArr);
      }
    }
  };

  const handleChangeShop = (event) => {
    setFilterShop(event.target.value);
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
            {shop?.name}
          </p>
          <div className={classes.proContainer}>
            <div className={classes.shopInfoContainer}>
              <p className={tableClasses.tableCell + " " + classes.txtShopName}>
                {shop?.code}
              </p>
            </div>
          </div>
          <p className={tableClasses.tableCell + " " + classes.txtLienKet}>
            {language == "vi" ? "Đang hoạt động" : "Active"}
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
                {text.button[0]}
              </Button>
              <Button
                color={filterDate == "month" ? "info" : "gray"}
                onClick={() => setFilterDate("month")}
                className={classes.btnFilter}
              >
                {text.button[1]}
              </Button>
            </div>
            <div className={classes.filterSelections}>
              <FormControl className={classes.formControl}>
                <InputLabel id="ecom-select-label">
                  {text.select_title[0]}
                </InputLabel>
                <Select
                  labelId="ecom-select-label"
                  id="ecom-select"
                  defaultValue={filterEcom}
                  onChange={handleChangeEcom}
                >
                  <MenuItem value={"all"}>{text.select_value[0]}</MenuItem>
                  {ecomData.map((item) => (
                    <MenuItem value={item.value} key={item.value}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="shop-select-label">
                  {text.select_title[1]}
                </InputLabel>
                <Select
                  labelId="shop-select-label"
                  id="shop-select"
                  defaultValue={filterShop}
                  onChange={handleChangeShop}
                >
                  <MenuItem value={"all"}>{text.select_value[0]}</MenuItem>
                  {shopData.map((item) => (
                    <MenuItem value={item.shopId} key={item.shopId}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              {text.button[2]}
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
                      {text.card_header_value[2]}
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
                              {text.button[0]}
                            </Button>
                          </GridItem>
                          <GridItem xs={6} sm={6} md={6}>
                            <Button
                              color={filterDate == "month" ? "info" : ""}
                              onClick={() => setFilterDate("month")}
                              className={classes.btnFilterDate}
                            >
                              {text.button[1]}
                            </Button>
                          </GridItem>
                        </GridContainer>
                      </div>
                      <div>
                        <GridContainer style={{ margin: "14px 0" }}>
                          <GridItem xs={12} sm={12} md={12}>
                            <FormControl className={classes.formControl}>
                              <InputLabel id="ecom-select-label">
                                {text.select_title[0]}
                              </InputLabel>
                              <Select
                                labelId="ecom-select-label"
                                id="ecom-select"
                                defaultValue={filterEcom}
                                onChange={handleChangeEcom}
                              >
                                <MenuItem value={"all"}>
                                  {text.select_value[0]}
                                </MenuItem>
                                {ecomData.map((item) => (
                                  <MenuItem value={item.value} key={item.value}>
                                    {item.title}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </GridItem>
                        </GridContainer>
                        <GridContainer style={{ margin: "14px 0" }}>
                          <GridItem xs={12} sm={12} md={12}>
                            <FormControl className={classes.formControl}>
                              <InputLabel id="shop-select-label">
                                {text.select_title[1]}
                              </InputLabel>
                              <Select
                                labelId="shop-select-label"
                                id="shop-select"
                                defaultValue={filterShop}
                                onChange={handleChangeShop}
                              >
                                <MenuItem value={"all"}>
                                  {text.select_value[0]}
                                </MenuItem>
                                {shopData.map((item) => (
                                  <MenuItem
                                    value={item.shopId}
                                    key={item.shopId}
                                  >
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
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
        <GridItem xs={12} sm={12} md={8}>
          <Card chart>
            <CardHeader>
              <Line data={chartData.dataLineChart} options={config} />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle2}>{text.chart_title[0]}</h4>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <Tooltip title={text.tooltipTxt[0]} arrow>
                    <p className={classes.cardSubtitle}>
                      {text.chart_value[0]}
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
                  <Tooltip title={text.tooltipTxt[1]} arrow>
                    <p className={classes.cardSubtitle}>
                      {" "}
                      {text.chart_value[1]}
                    </p>
                  </Tooltip>
                  <p className={classes.cardMoney}>
                    <span>₫ </span>17,115,740
                  </p>
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <Tooltip title={text.tooltipTxt[2]} arrow>
                    <p className={classes.cardSubtitle}>
                      {" "}
                      {text.chart_value[2]}
                    </p>
                  </Tooltip>
                  <p className={classes.cardMoney}>
                    <span>₫ </span>22,480,940
                  </p>
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <Tooltip title={text.tooltipTxt[3]} arrow>
                    <p className={classes.cardSubtitle}>
                      {" "}
                      {text.chart_value[3]}
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
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader>
              <Doughnut data={chartData.dataDoughnutChart} />
            </CardHeader>
            <CardBody
              style={{ marginBottom: `${size.width < 769 ? "0" : "98px"}` }}
            >
              <h4 className={classes.cardTitle2}>{text.chart_title[1]}</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        {/* End Doughnut Chart */}
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>
                {text.card_header_value[0]}
              </h4>
              <p className={classes.cardCategoryWhite}>
                {filterDate == "today" ? (
                  <>{text.card_header_subValue[0]}</>
                ) : (
                  <>{text.card_header_subValue[1]}</>
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
                        {text.table_head_shop.map((prop, key) => {
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
                {text.card_header_value[1]}
              </h4>
              <p className={classes.cardCategoryWhite}>
                {filterDate == "today" ? (
                  <>{text.card_header_subValue[0]}</>
                ) : (
                  <>{text.card_header_subValue[1]}</>
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
                        {text.table_head_product.map((prop, key) => {
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
