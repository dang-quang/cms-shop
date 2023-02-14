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
import { addShop } from "../../../utilities/ApiManage";

// utilities
import { formatCurrency } from "../../../utilities/utils";

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
  const [doFilter, setDoFilter] = useState(false);
  useEffect(() => {
    if (shop_id) {
      addShop(shop_id, code, "shopee");
    }
  }, []);
  const FILTER_CONSTATUS = [
    "Tất cả trạng thái",
    "Có liên kết với sản phẩm trên kênh",
    "Chưa liên kết với sản phẩm trên kênh",
  ];

  const FILTER_STATUS = [
    "Còn hàng",
    "Sắp hết hàng",
    "Hết hàng",
    "Bán vượt tồn kho hiện tại",
  ];
  const menuCardInfo = [
    {
      title: "Doanh thu tháng này",
      subContent: "₫",
      content: "60.000.000",
      pablo: "16%",
    },
    {
      title: "Doanh thu hôm nay",
      subContent: "₫",
      content: "4.000.000",
      pablo: "info",
    },
    {
      title: "Đơn hàng hôm nay",
      subContent: "",
      content: "18",
      pablo: "-30.8%",
    },
    {
      title: "Đơn hàng chờ xử lý",
      subContent: "",
      content: "4",
      pablo: "",
    },
  ];
  function getCardInfo() {
    const listCardInfo = menuCardInfo.map((item) => (
      <CardInfo
        title={item.title}
        subContent={item.subContent}
        content={item.content}
        pablo={item.pablo}
      />
    ));
    return (
      <GridContainer
        style={{
          flexWrap: `${size.width < 541 ? "nowrap" : "wrap"}`,
          overflowX: `${size.width < 541 ? "scroll" : ""}`,
        }}
      >
        {listCardInfo}
      </GridContainer>
    );
  }
  // Tooltip title
  const tooltipTxt = {
    lineChart: {
      totalRevenue:
        "Doanh thu được tính trên tất cả các đơn hàng  được tạo trong khoảng thời gian được chọn (bao gồm đơn hàng huỷ và hoàn), chưa bao gồm các chi phí như phí vận chuyển và chi phí khuyến mại.",
      shipped:
        "Tổng doanh thu của tất cả đơn hàng đang trên đường giao cho khách hàng được tạo trong khoảng thời gian được chọn, chưa bao gồm các loại phí như phí vận chuyển và khuyến mãi.",
      delivered:
        "Tổng doanh thu của tất cả đơn hàng đã giao thành công cho khách hàng được tạo trong khoảng thời gian được chọn, chưa bao gồm các loại phí như phí vận chuyển và khuyến mãi.",
      cancelledReturned:
        "Tổng doanh thu của đơn hàng được tạo trong khoảng thời gian được chọn nhưng bị huỷ, giao hàng thất bại và hàng hoàn.",
    },
  };
  // Chart Data
  const chartData = {
    dataDoughnutChart: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
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
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "First dataset",
          data: [33, 53, 85, 41, 44, 65],
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
        {
          label: "Second dataset",
          data: [33, 25, 35, 51, 54, 76],
          fill: false,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "#742774",
        },
      ],
    },
  };
  const options = {
    legend: {
      display: false,
    },
  };
  // Ecom data
  const ecomData = [
    {
      title: "Shopee",
      value: 1,
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
      value: 2,
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
    {
      title: "Sendo",
      value: 3,
      shop: [],
    },
  ];
  const [ecom, setEcom] = React.useState("");
  const [shopData, setShopData] = React.useState([]);
  const [shop, setShop] = React.useState("");

  const handleChangeEcom = (event) => {
    setEcom(event.target.value);
    if (event.target.value == -1) {
      setShopData([]);
    } else {
      setShopData(ecomData[event.target.value - 1].shop);
    }
  };
  const handleChangeShop = (event) => {
    setShop(event.target.value);
  };
  // Filter Date
  var now = moment();
  var monday = now.clone().weekday(1);
  var isNowWeekday = now.isBetween(monday, null, "[]");


  // function filterByToday() {}
  // function handelFilterWeek() {}
  // function handelFilterMonth() {}

  //Table head
  const TABLE_HEAD = {
    product: ["Thông tin sản phẩm", "Đơn hàng", "Doanh thu", "Xu thế 14 ngày"],
    shop: [
      "Thông tin gian hàng",
      "Sản phẩm",
      "Đơn hàng",
      "Đơn hàng chờ xử lý",
      "Doanh thu",
      "Xu thế 14 ngày",
    ],
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
    shop: [
      {
        id: 1,
        shopName: "ShopTreTho Miền Nam",
        shopShortName: "STTMN",
        image:
          "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
        quantityProduct: 20,
        order: 100,
        pendingOrders: 20,
        sales: 2500000,
        isActive: true,
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
        },
      },
      {
        id: 2,
        shopName: "ShopTreTho Official",
        shopShortName: "STTOFC",
        image:
          "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
        quantityProduct: 50,
        order: 420,
        pendingOrders: 43,
        sales: 8500000,
        isActive: true,
        dataBarChart: {
          labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
          datasets: [
            {
              label: "",
              data: [
                1800000, 300000, 500000, 6200000, 4600000, 4210000, 42, 43, 12,
                43, 11, 12, 13, 8500000,
              ],
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ],
        },
      },
    ],
  });
  const [checked, setChecked] = useState([]);
  const [showProduct, setShowProduct] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const handleCheckAll = () => {
    if (isCheckAll) {
      setIsCheckAll(false);
      setChecked([]);
    } else {
      setIsCheckAll(true);
      setChecked(data);
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
  const productTypeInfo = (item) => {
    return (
      <div className={classes.proContainer} style={{ marginLeft: "40px" }}>
        <img className={classes.proImg} src={item?.image} />
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
            {item?.typeName}
          </p>
          <div className={classes.proContainer}>
            <div className={classes.shopInfoContainer}>
              <Icon className={classes.codeIcon}>crop_free</Icon>
              <p className={tableClasses.tableCell + " " + classes.txtShopName}>
                {item?.typeCode}
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
      <React.Fragment>
        <TableRow
          key={index}
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
            <Bar data={item.dataBarChart} options={options} />
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };
  const shopInfo = (item) => {
    return (
      <div className={classes.proContainer}>
        <img className={classes.proImg} src={item?.image} />
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
            {item?.shopName}
          </p>
          <div className={classes.proContainer}>
            <div className={classes.shopInfoContainer}>
              <p className={tableClasses.tableCell + " " + classes.txtShopName}>
                {item?.shopShortName}
              </p>
            </div>
          </div>
          {item?.isActive && (
            <p className={tableClasses.tableCell + " " + classes.txtLienKet}>
              Đang hoạt động
            </p>
          )}
        </div>
      </div>
    );
  };
  const renderShop = (item, index) => {
    return (
      <React.Fragment>
        <TableRow
          key={index}
          className={tableClasses.tableBodyRow}
          style={{
            backgroundColor: checked.indexOf(item) !== -1 ? "#fdf7ff" : "#fff",
          }}
        >
          <TableCell className={tableClasses.tableCell} key={"shopInfo"}>
            {shopInfo(item)}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"order"}>
            {item.quantityProduct}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"order"}>
            {item.order}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"order"}>
            {item.pendingOrders}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"sales"}>
            {formatCurrency(item.sales)}
          </TableCell>
          <TableCell
            className={tableClasses.tableCell}
            key={"trend"}
            style={{ maxWidth: "100px" }}
          >
            <Bar data={item.dataBarChart} options={options} />
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  //filter
  const resetFilter = () => {
    setStoreStatusFilter([]), setConnectStatusFilter([]);
    setDoFilter(false);
  };
  const handleStoreStatus = (item) => {
    const currentIndex = storeStatusFilter.indexOf(item);
    const newStatus = [...storeStatusFilter];
    if (currentIndex === -1) {
      newStatus.push(item);
    } else {
      newStatus.splice(currentIndex, 1);
    }
    setStoreStatusFilter(newStatus);
  };
  return (
    <div>
      {getCardInfo()}
      <div
        className={classes.filterContainer}
        style={{ flexDirection: `${size.width < 541 ? "column" : "row"}` }}
      >
        {/* pc filter */}
        {size.width > 540 && (
          <FormControl
            className={classes.formControl}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className={classes.filterDate}>
              <Button
                color="info"
                // onClick={() => filterByToday()}
                className={classes.btnFilter}
              >
                Hôm nay
              </Button>
              <Button
                color="info"
                // onClick={handelFilterWeek()}
                className={classes.btnFilter}
              >
                Tuần này
              </Button>
              <Button
                color="info"
                // onClick={handelFilterMonth()}
                className={classes.btnFilter}
              >
                Tháng này
              </Button>
            </div>
            <div className={classes.filterSelections}>
              <FormControl className={classes.formControl}>
                <InputLabel id="ecom-select-label">Kênh</InputLabel>
                <Select
                  labelId="ecom-select-label"
                  id="ecom-select"
                  value={ecom}
                  onChange={handleChangeEcom}
                >
                  <MenuItem value={-1}>Tất cả</MenuItem>
                  {ecomData.map((item) => (
                    <MenuItem value={item.value}>{item.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="shop-select-label">Gian hàng</InputLabel>
                <Select
                  labelId="shop-select-label"
                  id="shop-select"
                  value={shop}
                  onChange={handleChangeShop}
                >
                  <MenuItem value={-1}>Tất cả</MenuItem>
                  {shopData.map((item) => (
                    <MenuItem value={item.value}>{item.title}</MenuItem>
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
              Bộ lọc
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
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Chọn bộ lọc</h4>
                  </CardHeader>
                  <CardBody>
                    <div class={classes.filterEleContent}>
                      <p className={classes.titleFilter}>THỜI GIAN</p>
                      <div
                        className={classes.filterDate}
                        style={{ marginRight: 0 }}
                      >
                        <GridContainer>
                          <GridItem xs={4} sm={4} md={4}>
                            <Button
                              color="info"
                              // onClick={() => filterByToday()}
                              className={classes.btnFilterDate}
                            >
                              Hôm nay
                            </Button>
                          </GridItem>
                          <GridItem xs={4} sm={4} md={4}>
                            <Button
                              color="info"
                              // onClick={handelFilterWeek()}
                              className={classes.btnFilterDate}
                            >
                              Tuần này
                            </Button>
                          </GridItem>
                          <GridItem xs={4} sm={4} md={4}>
                            <Button
                              color="info"
                              // onClick={handelFilterMonth()}
                              className={classes.btnFilterDate}
                            >
                              Tháng này
                            </Button>
                          </GridItem>
                        </GridContainer>
                      </div>
                      <p className={classes.titleFilter}>KÊNH/GIAN HÀNG</p>
                      <div>
                        <GridContainer style={{ margin: "14px 0" }}>
                          <GridItem xs={12} sm={12} md={12}>
                            <FormControl className={classes.formControl}>
                              <InputLabel id="ecom-select-label">
                                Kênh
                              </InputLabel>
                              <Select
                                labelId="ecom-select-label"
                                id="ecom-select"
                                value={ecom}
                                onChange={handleChangeEcom}
                              >
                                <MenuItem value={-1}>Tất cả</MenuItem>
                                {ecomData.map((item) => (
                                  <MenuItem value={item.value}>
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
                                Gian hàng
                              </InputLabel>
                              <Select
                                labelId="shop-select-label"
                                id="shop-select"
                                value={shop}
                                onChange={handleChangeShop}
                              >
                                <MenuItem value={-1}>Tất cả</MenuItem>
                                {shopData.map((item) => (
                                  <MenuItem value={item.value}>
                                    {item.title}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </GridItem>
                        </GridContainer>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <div className={classes.filterFooter}>
                      <Button
                        color="white"
                        onClick={() => resetFilter()}
                        style={{ marginRight: "20px" }}
                      >
                        Đặt lại
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => {
                          setDoFilter(true), setShowFilter(false);
                        }}
                      >
                        Áp dụng
                      </Button>
                    </div>
                  </CardFooter>
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
            <CardHeader color="white">
              <Line data={chartData.dataLineChart} />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle2}>Xu thế doanh thu</h4>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <Tooltip title={tooltipTxt.lineChart.totalRevenue} arrow>
                    <p className={classes.cardSubtitle}>TỔNG DOANH THU</p>
                  </Tooltip>
                  <p className={classes.cardMoney}>
                    <span>₫ </span>131,177,190
                  </p>
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <Tooltip title={tooltipTxt.lineChart.shipped} arrow>
                    <p className={classes.cardSubtitle}>ĐANG VẬN CHUYỂN</p>
                  </Tooltip>
                  <p className={classes.cardMoney}>
                    <span>₫ </span>17,115,740
                  </p>
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <Tooltip title={tooltipTxt.lineChart.delivered} arrow>
                    <p className={classes.cardSubtitle}>GIAO THÀNH CÔNG</p>
                  </Tooltip>
                  <p className={classes.cardMoney}>
                    <span>₫ </span>22,480,940
                  </p>
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <Tooltip title={tooltipTxt.lineChart.cancelledReturned} arrow>
                    <p className={classes.cardSubtitle}>HUỶ & HOÀN TRẢ</p>
                  </Tooltip>
                  <p className={classes.cardMoney}>
                    <span>₫ </span>27,998,560
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
            <CardHeader color="white">
              <Doughnut data={chartData.dataDoughnutChart} />
            </CardHeader>
            <CardBody
              style={{ marginBottom: `${size.width < 769 ? "0" : "98px"}` }}
            >
              <h4 className={classes.cardTitle2}>Doanh thu kênh bán</h4>
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
                Hiệu suất hoạt động của gian hàng
              </h4>
              <p className={classes.cardCategoryWhite}>Tuần này</p>
            </CardHeader>
            <CardBody style={{ paddingTop: 0 }}>
              <div className={tableClasses.tableResponsive}>
                <Table className={tableClasses.table}>
                  {data.shop !== undefined ? (
                    <TableHead
                      className={tableClasses["primary" + "TableHeader"]}
                    >
                      <TableRow className={tableClasses.tableHeadRow}>
                        {TABLE_HEAD.shop.map((prop, key) => {
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
                    {data.shop.map((item, index) => {
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
              <h4 className={classes.cardTitleWhite}>Sản phẩm bán chạy</h4>
              <p className={classes.cardCategoryWhite}>Tuần này</p>
            </CardHeader>
            <CardBody style={{ paddingTop: 0 }}>
              <div className={tableClasses.tableResponsive}>
                <Table className={tableClasses.table}>
                  {data.product !== undefined ? (
                    <TableHead
                      className={tableClasses["primary" + "TableHeader"]}
                    >
                      <TableRow className={tableClasses.tableHeadRow}>
                        {TABLE_HEAD.product.map((prop, key) => {
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
