import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Collapse from "@material-ui/core/Collapse";
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  primaryColor,
  whiteColor,
  blackColor,
  hexToRgb,
} from "assets/jss/natcash.js";
import { formatCurrency, formatNumber } from "../../../utilities/utils";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import CustomInput from "components/CustomInput/CustomInput.js";
import Search from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import adminStyles from "assets/jss/natcash/components/headerLinksStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";
import { Icon } from "@material-ui/core";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import Switch from "components/CustomSwitch/Switch.js";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import DateFnsUtils from "@date-io/date-fns";
import vi from "date-fns/locale/vi";
import Poppers from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import classNames from "classnames";
import { getProductScreen, getProductList } from "../../../utilities/ApiManage";
import { setShowLoader } from "../../../redux/actions/app";
import { NotificationContainer, NotificationManager} from "react-light-notifications";
import Pagination from "@material-ui/lab/Pagination";

function ProductPage() {
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const useAdminStyles = makeStyles(adminStyles);
  const useTableStyles = makeStyles(tableStyles);
  const adminClasses = useAdminStyles();
  const classes = useStyles();
  const tableClasses = useTableStyles();
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const [showFilter, setShowFilter] = useState(false);
  const [showFilter2, setShowFilter2] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [doFilter, setDoFilter] = useState(0);
  const [filterDate, setFilterDate] = useState(false);
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [channelData, setChannelData] = useState([])
  const [doSearch, setDoSearch] = useState(false);
  const [channel, setChannel] = useState("");
  const [txtSearch, setTxtSearch] = useState("");
  const TABLE_HEAD = [
    {
      id: "en",
      value: [
        "Product information",
        "Stock",
        "Sell price",
        "Order",
        "Profit",
        "Status",
      ],
    },
    {
      id: "vi",
      value: [
        "Thông tin sản phẩm",
        "Tồn kho",
        "Giá bán",
        "Đơn hàng",
        "Doanh thu",
        "Trạng thái",
      ],
    },
  ];
  const FILTER_STATUS = [
    {
      id: "en",
      value: [
        "Stocking",
        "Out of stock soon",
        "Out of stock",
        "Oversold current stock",
      ],
    },
    {
      id: "vi",
      value: [
        "Còn hàng",
        "Sắp hết hàng",
        "Hết hàng",
        "Bán vượt tồn kho hiện tại",
      ],
    },
  ];
  const FILTER_CONSTATUS = [
    {
      id: "en",
      value: [
        "All status",
        "Link to the product on the floor",
        "Not link to the product on the floor",
      ],
    },
    {
      id: "vi",
      value: [
        "Tất cả trạng thái",
        "Có liên kết với sản phẩm trên kênh",
        "Chưa liên kết với sản phẩm trên kênh",
      ],
    },
  ];
  const MENU_CARD_INFO = [
    {
      id: "en",
      value: [
        "All",
        "Best sell",
        "Out of stock soon",
        "Out of stock",
        "Not link to the product on the inventory",
      ],
    },
    {
      id: "vi",
      value: [
        "Tất cả",
        "Bán chạy",
        "Sắp hết hàng",
        "Hết hàng",
        "Chưa liên kết sản phẩm kho",
      ],
    },
  ];
  const [menuCardData, setMenuCardData] = useState("");
  // const [data, setData] = useState([
  //   {id: 1, productCode:"TP-71", productName: "Glico Icreo Nhật Bản số 0 (0-12 tháng)", image:"https://media.shoptretho.com.vn/upload/image/product/20180628/sua-bot-combiotic-hipp-so-1-800g-new-1.png", shopName:"STTMN", shopIcon: "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png", quantity: 20, price: 250000, order: 10, sales: 2500000, status: true, isConnect: false,
  //           types: [
  //             {id: 1, typeCode: "TP-711", typeName:"900g", image:"https://media.shoptretho.com.vn/upload/image/product/20180628/sua-bot-combiotic-hipp-so-1-800g-new-1.png", quantity: 15, price: 250000, order: 4, sales: 1000000, isConnect: false},
  //             {id: 1, typeCode: "TP-712", typeName:"650g", image:"https://media.shoptretho.com.vn/upload/image/product/20180628/sua-bot-combiotic-hipp-so-1-800g-new-1.png", quantity: 10, price: 200000, order: 6, sales: 1200000, isConnect: false},
  //           ]
  //   },
  //   {id: 2, productCode:"TP-71", productName: "Sữa bột trẻ em", image:"https://media.shoptretho.com.vn/upload/image/product/20180628/sua-bot-combiotic-hipp-so-1-800g-new-1.png", shopName:"STTMN", shopIcon: "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png", quantity: 20, price: 250000, order: 10, sales: 2500000, status: false, isConnect: true},
  //   {id: 3, productCode:"SU-331", productName: "Sữa bột trẻ em", image:"https://media.shoptretho.com.vn/upload/image/product/20180628/sua-bot-combiotic-hipp-so-1-800g-new-1.png", shopName:"STTOfficial", shopIcon: "https://group.lazada.com/static/ipr_annual_report/images/xxl-lazada-logo.svg", quantity: 20, price: 250000, order: 10, sales: 2500000, status: false, isConnect: false,
  //           types: [
  //             {id: 1, typeCode: "SU-3311", typeName:"900g", image:"https://media.shoptretho.com.vn/upload/image/product/20180628/sua-bot-combiotic-hipp-so-1-800g-new-1.png", quantity: 15, price: 250000, order: 4, sales: 1000000, isConnect: false},
  //             {id: 1, typeCode: "SU-3312", typeName:"650g", image:"https://media.shoptretho.com.vn/upload/image/product/20180628/sua-bot-combiotic-hipp-so-1-800g-new-1.png", quantity: 10, price: 200000, order: 6, sales: 1200000, isConnect: false},
  //           ]
  //   },
  //   {id: 4, productCode:"SP-321", productName: "Bỉm trẻ em", image:"https://dairymart.vn/wp-content/uploads/2018/09/b%E1%BB%89m-bobby-t%C3%A3-d%C3%A1n-l23.jpg", shopName:"STT", shopIcon: "https://group.lazada.com/static/ipr_annual_report/images/xxl-lazada-logo.svg", quantity: 20, price: 250000, order: 10, sales: 2500000, status: true, isConnect: true},
  //   {id: 5, productCode:"KT-0023", productName: "Bánh ăn dặm", image:"https://toplist.vn/images/800px/banh-an-dam-gerber-590833.jpg", shopName:"STTMN", shopIcon: "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png", quantity: 20, price: 250000, order: 10, sales: 2500000, status: false, isConnect: false},
  // ])

  const [data, setData] = useState([
    // {
    //   shop_name: "STTMN",
    //   shop_icon:
    //     "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
    //   is_connect: false,
    //   item_id: 138346,
    //   category_id: 100991,
    //   item_name: "Sữa Morinaga Kodomil số 3 hương vani",
    //   description:
    //     "- Thành phần: toferrin nhằm tăng cường sức đề kháng cho trẻ.\n\n- Kodomil bổ sung thành phần lợi khuẩn",
    //   item_sku: "SU-1004",
    //   create_time: 1629274395,
    //   update_time: 1629514738,
    //   attribute_list: [
    //     {
    //       attribute_id: 100010,
    //       original_attribute_name: "Shelf Life",
    //       is_mandatory: false,
    //       attribute_value_list: [
    //         {
    //           value_id: 580,
    //           original_value_name: "6 Months",
    //           value_unit: "",
    //         },
    //       ],
    //     },
    //     {
    //       attribute_id: 100016,
    //       original_attribute_name: "Pack Type",
    //       is_mandatory: false,
    //       attribute_value_list: [
    //         {
    //           value_id: 374,
    //           original_value_name: "Bundle",
    //           value_unit: "",
    //         },
    //       ],
    //     },
    //     {
    //       attribute_id: 100125,
    //       original_attribute_name: "Baby Life Stage",
    //       is_mandatory: false,
    //       attribute_value_list: [
    //         {
    //           value_id: 1086,
    //           original_value_name: "Growing-Up Milk (3+ years)",
    //           value_unit: "",
    //         },
    //       ],
    //     },
    //     {
    //       attribute_id: 100135,
    //       original_attribute_name: "Recommended Age",
    //       is_mandatory: true,
    //       attribute_value_list: [
    //         {
    //           value_id: 5566,
    //           original_value_name: ">=2 years old",
    //           value_unit: "",
    //         },
    //       ],
    //     },
    //   ],
    //   image: {
    //     image_url_list: [
    //       "https://cf.shopee.vn/file/b0d8dc6ee5f7f6b7610aaf86f8e54862",
    //       "https://cf.shopee.vn/file/f7395e32bea70e428f181626f8bc24d4",
    //     ],
    //     image_id_list: [
    //       "b0d8dc6ee5f7f6b7610aaf86f8e54862",
    //       "f7395e32bea70e428f181626f8bc24d4",
    //     ],
    //   },
    //   weight: "0.850",
    //   dimension: {
    //     package_length: 0,
    //     package_width: 0,
    //     package_height: 0,
    //   },
    //   logistic_info: [
    //     {
    //       logistic_id: 50018,
    //       logistic_name: "J&T Express",
    //       enabled: true,
    //       is_free: false,
    //     },
    //     {
    //       logistic_id: 50010,
    //       logistic_name: "Viettel Post",
    //       enabled: true,
    //       is_free: false,
    //     },
    //   ],
    //   pre_order: {
    //     is_pre_order: false,
    //     days_to_ship: 2,
    //   },
    //   condition: "NEW",
    //   size_chart: "",
    //   item_status: "NORMAL",
    //   has_model: true,
    //   brand: {
    //     brand_id: 1140462,
    //     original_brand_name: "morigana",
    //   },
    //   item_dangerous: 0,
    //   model_data: {
    //     tier_variation: [
    //       {
    //         name: "Trọng lượng",
    //         option_list: [
    //           {
    //             option: "850g",
    //           },
    //           {
    //             option: "600g",
    //           },
    //         ],
    //       },
    //       {
    //         name: "Hạn sử dụng",
    //         option_list: [
    //           {
    //             option: "6 tháng",
    //           },
    //           {
    //             option: "12 tháng",
    //           },
    //         ],
    //       },
    //     ],
    //     model: [
    //       {
    //         model_id: 256314,
    //         promotion_id: 0,
    //         tier_index: [1, 1],
    //         stock_info: [
    //           {
    //             stock_type: 2,
    //             current_stock: 54,
    //             normal_stock: 54,
    //             reserved_stock: 0,
    //           },
    //           {
    //             stock_type: 1,
    //             current_stock: 0,
    //             normal_stock: 0,
    //             reserved_stock: 0,
    //           },
    //         ],
    //         price_info: [
    //           {
    //             current_price: 300000,
    //             original_price: 300000,
    //             inflated_price_of_current_price: 300000,
    //             inflated_price_of_original_price: 300000,
    //           },
    //         ],
    //         model_sku: "SU-60012",
    //         order: 3,
    //         sales: 1800000,
    //       },
    //       {
    //         model_id: 256315,
    //         promotion_id: 0,
    //         tier_index: [0, 0],
    //         stock_info: [
    //           {
    //             stock_type: 2,
    //             current_stock: 32,
    //             normal_stock: 32,
    //             reserved_stock: 0,
    //           },
    //           {
    //             stock_type: 1,
    //             current_stock: 0,
    //             normal_stock: 0,
    //             reserved_stock: 0,
    //           },
    //         ],
    //         price_info: [
    //           {
    //             current_price: 340000,
    //             original_price: 340000,
    //             inflated_price_of_current_price: 340000,
    //             inflated_price_of_original_price: 340000,
    //           },
    //         ],
    //         model_sku: "SU-85006",
    //         order: 5,
    //         sales: 1500000,
    //         status: false,
    //       },
    //       {
    //         model_id: 256316,
    //         promotion_id: 0,
    //         tier_index: [0, 1],
    //         stock_info: [
    //           {
    //             stock_type: 2,
    //             current_stock: 75,
    //             normal_stock: 75,
    //             reserved_stock: 0,
    //           },
    //           {
    //             stock_type: 1,
    //             current_stock: 0,
    //             normal_stock: 0,
    //             reserved_stock: 0,
    //           },
    //         ],
    //         price_info: [
    //           {
    //             current_price: 400000,
    //             original_price: 400000,
    //             inflated_price_of_current_price: 400000,
    //             inflated_price_of_original_price: 400000,
    //           },
    //         ],
    //         model_sku: "SU-85012",
    //         order: 2,
    //         sales: 1000000,
    //       },
    //       {
    //         model_id: 256317,
    //         promotion_id: 0,
    //         tier_index: [1, 0],
    //         stock_info: [
    //           {
    //             stock_type: 2,
    //             current_stock: 12,
    //             normal_stock: 12,
    //             reserved_stock: 0,
    //           },
    //           {
    //             stock_type: 1,
    //             current_stock: 0,
    //             normal_stock: 0,
    //             reserved_stock: 0,
    //           },
    //         ],
    //         price_info: [
    //           {
    //             current_price: 250000,
    //             original_price: 250000,
    //             inflated_price_of_current_price: 250000,
    //             inflated_price_of_original_price: 250000,
    //           },
    //         ],
    //         model_sku: "SU-60006",
    //         order: 3,
    //         sales: 1200000,
    //       },
    //     ],
    //   },
    //   order: 15,
    //   sales: 4300000,
    //   stock_info: [
    //     {
    //       stock_type: 2,
    //       current_stock: 322,
    //       normal_stock: 322,
    //       reserved_stock: 0,
    //     },
    //   ],
    // },
    // {
    //   shop_name: "STTMN",
    //   shop_icon:
    //     "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
    //   is_connect: true,
    //   item_id: 138348,
    //   category_id: 101001,
    //   item_name: "Tã - bỉm quần Moony M58",
    //   description:
    //     "Thiết kếdịu nhẹ mềm mại mà còn cho tự nhiên, từ đó tránh hăm bí khi mặc tã.",
    //   item_sku: "BIM-09321",
    //   create_time: 1629274866,
    //   update_time: 1629279638,
    //   price_info: [
    //     {
    //       currency: "VND",
    //       original_price: 430000,
    //       current_price: 430000,
    //     },
    //   ],
    //   stock_info: [
    //     {
    //       stock_type: 2,
    //       current_stock: 123,
    //       normal_stock: 123,
    //       reserved_stock: 0,
    //     },
    //   ],
    //   image: {
    //     image_url_list: [
    //       "https://cf.shopee.vn/file/89e11aec4508fe5e78197fae5d169894",
    //       "https://cf.shopee.vn/file/3662b6b384af6884a33b793289b1ad46",
    //     ],
    //     image_id_list: [
    //       "89e11aec4508fe5e78197fae5d169894",
    //       "3662b6b384af6884a33b793289b1ad46",
    //     ],
    //   },
    //   weight: "0.500",
    //   dimension: {
    //     package_length: 0,
    //     package_width: 0,
    //     package_height: 0,
    //   },
    //   logistic_info: [
    //     {
    //       logistic_id: 50018,
    //       logistic_name: "J&T Express",
    //       enabled: true,
    //       is_free: false,
    //     },
    //     {
    //       logistic_id: 50010,
    //       logistic_name: "Viettel Post",
    //       enabled: true,
    //       is_free: false,
    //     },
    //   ],
    //   pre_order: {
    //     is_pre_order: false,
    //     days_to_ship: 2,
    //   },
    //   condition: "NEW",
    //   size_chart: "",
    //   item_status: "NORMAL",
    //   has_model: false,
    //   promotion_id: 0,
    //   brand: {
    //     brand_id: 1125291,
    //     original_brand_name: "Goo.n",
    //   },
    //   item_dangerous: 0,
    //   order: 12,
    //   sales: 3480000,
    //   status: true,
    // },
  ]);
  const [listRadio, setListRadio] = useState([
    {
      id: "1",
      label: "Tất cả sản phẩm",
    },
    {
      id: "2",
      label: "Tất cả sản phẩm theo bộ lọc hiện tại",
    },
    {
      id: "3",
      label: "Sản phẩm đang chọn",
    },
  ]);
  const language = useSelector((state) => state.app.language);
  const listText = [
    {
      id: "en",
      title: "Product",
      txtChannel: "Channel",
      txtShop: "Shop",
      txtSearch: "Find by name or SKU",
      txtTypes: "categories",
      txtLink: "No link to product inventory",
      txtFilter: "Filter",
      txtFilterTitle: "Choose filter",
      txtFilterDate: "CREATE DATE",
      txtFilterFrom: "From",
      txtFilterTo: "To",
      txtFilterDate: "Create time",
      txtFilterReset: "Reset",
      txtFilterApply: "Apply",
      txtUpdate: "Action",
      tableHead: TABLE_HEAD[0].value,
      filterStatus: FILTER_STATUS[0].value,
      filterConstatus: FILTER_CONSTATUS[0].value,
      menuCard: MENU_CARD_INFO[0].value,
      txtAll: "All"
    },
    {
      id: "vi",
      title: "Sản phẩm",
      txtChannel: "Kênh",
      txtShop: "Gian hàng",
      txtSearch: "Tìm theo tên hoặc SKU",
      txtTypes: "phân loại",
      txtLink: "Chưa liên kết sản phẩm kho",
      txtFilter: "Bộ lọc",
      txtFilterTitle: "Chọn bộ lọc",
      txtFilterDate: "NGÀY TẠO",
      txtFilterFrom: "Từ ngày",
      txtFilterTo: "Đến ngày",
      txtFilterDate: "Ngày tạo",
      txtFilterReset: "Đặt lại",
      txtFilterApply: "Áp dụng",
      txtUpdate: "Thao tác",
      tableHead: TABLE_HEAD[1].value,
      filterStatus: FILTER_STATUS[1].value,
      filterConstatus: FILTER_CONSTATUS[1].value,
      menuCard: MENU_CARD_INFO[1].value,
      txtAll: "Tất cả"
    },
  ];
  const [text, setText] = useState(listText[0]);
  const [shopData, setShopData] = useState([]);
  const [shop, setShop] = useState("");
  const [checked, setChecked] = useState([]);
  const [showProduct, setShowProduct] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [storeStatusFilter, setStoreStatusFilter] = useState([]);
  const [connectStatusFilter, setConnectStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState(moment().subtract(30, "days").format());
  const [toDate, setToDate] = useState(moment().format());
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    for (let i = 0; i < listText.length; i++) {
      if (language == listText[i].id) {
        setText(listText[i]);
        break;
      }
    }
  }, [language]);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        setIsMobile(window.innerWidth < 1200);
      },
      false
    );
  }, []);

  useEffect(async() => {
    dispatch(setShowLoader(true))
    const res = await getProductScreen()
    setData(res.data.item_list)
    setTotalPage(res.data.data_page.total_page)
    setChannelData(res.data.channel_data);
    setMenuCardData(res.data.item_count_by_status)
    dispatch(setShowLoader(false))
  }, []);
  
  useEffect(async() => {
    dispatch(setShowLoader(true));
    setChecked([]);
    let params = {};
    params.current_page = currentPage;
    if (txtSearch) {
      params.keyword = txtSearch;
    }
    if (doFilter) {
      params.time_from = moment(fromDate).unix();
      params.time_to = moment(toDate).unix();
    }
    // if (selectedTitle.value) {
    //   params.order_status = selectedTitle.value;
    // }
    if (shop > -1 && shopData.length > 0) {
      params.shop_id = Number(shopData[shop].shopId);
    }
    const res = await getProductList(params)
    setData(res.data.item_list)
    setTotalPage(res.data.data_page.total_page)
    setMenuCardData(res.data.item_count_by_status)
    dispatch(setShowLoader(false))
  }, [doSearch, doFilter, shop, shopData, currentPage]);

  const resetFilterDate = () => {
    setFromDate(moment().subtract(30, "days").format());
    setToDate(moment().format());
    setFilterDate(false);
    setDoFilter(0);
  };
  const handleSelectPage = (event, value) => {
    setCurrentPage(value);
  };

  const handleInputSearch = (event) => {
    setTxtSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleChangeChannel = (event) => {
    setChannel(event.target.value);
    setShop(-1);
    if (event.target.value == -1) {
      setShopData([]);
    } else {
      setShopData(channelData[event.target.value].shop_data);
    }
  };
  const handleChangeShop = (event) => {
    setShop(event.target.value);
  };
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
  const resetFilter = () => {
    setStoreStatusFilter([]), setConnectStatusFilter([]);
    setDoFilter(false);
  };
  const CustomSwitch = withStyles({
    switchBase: {
      color: "#fff",
      "&$checked": {
        color: "#f96606",
      },
      "&$checked + $track": {
        backgroundColor: "#f3a36f",
      },
    },
    checked: {},
    track: {},
  })(Switch);
  const CustomRadio = withStyles({
    root: {
      color: "gray",
      "&$checked": {
        color: "#f96606",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);
  const handleUpdate = () => {
    setShowUpdate(false);
  };

  const handleSwitch = (item) => {
    var index = data.indexOf(item);
    let cloneData = [...data];
    let cloneItem = { ...cloneData[index] };
    cloneItem.status = !cloneItem.status;
    cloneData[index] = cloneItem;
    setData(cloneData);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const productInfo = (item) => {
    return (
      <div className={classes.proContainer}>
        <img className={classes.proImg} src={item?.detail?.image?.image_url_list? item?.detail?.image?.image_url_list[0] : item?.detail?.images[0]} />
        <div className={classes.proInfoContainer}>
          <Link href={"/admin/product/" + item.item_id}>
            <a
              target="_blank"
              className={tableClasses.tableCell + " " + classes.txtProductName}
            >
              {item.item_name}
            </a>
          </Link>
          <div className={classes.proContainer}>
            {item.has_model && (
              <div
                className={
                  classes.shopInfoContainer + " " + classes.shopInfoMore
                }
                style={{ cursor: "pointer" }}
                onClick={() => handleShowProduct(item)}
              >
                {showProduct.indexOf(item) !== -1 ? (
                  <Icon
                    className={classes.codeIcon}
                    style={{ color: primaryColor[0] }}
                  >
                    expand_less_outlined
                  </Icon>
                ) : (
                  <Icon
                    className={classes.codeIcon}
                    style={{ color: primaryColor[0] }}
                  >
                    expand_more_outlined
                  </Icon>
                )}
                <p
                  className={
                    tableClasses.tableCell + " " + classes.txtMoreTypes
                  }
                >
                  {item.model_data.model.length + " " + text.txtTypes}
                </p>
              </div>
            )}
            <div className={classes.shopInfoContainer}>
              <img className={classes.shopImg} src={item?.shop_icon} />
              <p className={tableClasses.tableCell + " " + classes.txtShopName}>
                {item?.shop_code}
              </p>
            </div>
            {item?.item_sku && (
              <div className={classes.shopInfoContainer}>
              <Icon className={classes.codeIcon}>crop_free</Icon>
              <p className={tableClasses.tableCell + " " + classes.txtShopName}>
                {item.item_sku}
              </p>
            </div>
            )}         
          </div>
          {item?.is_connect == false && (
            <p className={tableClasses.tableCell + " " + classes.txtLienKet}>
              {text.txtLink}
            </p>
          )}
        </div>
      </div>
    );
  };
  const productTypeInfo = (item, index) => {
    var name = "";
    item.tier_index.map((ti, idx) => {
      name =
        name +
        data[index].model_data.tier_variation[idx].option_list[ti].option +
        ",";
    });
    name = name.slice(0, -1);
    return (
      <div className={classes.proContainer} style={{ marginLeft: "40px" }}>
        <img
          className={classes.proImg}
          src={data[index].image.image_url_list[0]}
        />
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
            {name}
          </p>
          <div className={classes.proContainer}>
            <div className={classes.shopInfoContainer}>
              <Icon className={classes.codeIcon}>crop_free</Icon>
              <p className={tableClasses.tableCell + " " + classes.txtShopName}>
                {item?.model_sku}
              </p>
            </div>
          </div>
          {item?.is_connect && (
            <p className={tableClasses.tableCell + " " + classes.txtLienKet}>
              {text.txtLink}
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
            backgroundColor: checked.indexOf(item) !== -1 ? "#fff6f0" : "#fff",
          }}
        >
          <TableCell className={tableClasses.tableCell}>
            <Checkbox
              checked={checked.indexOf(item) !== -1}
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
          <TableCell className={tableClasses.tableCell} key={"productInfo"}>
            {productInfo(item)}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"quantity"}>
            {/* {formatNumber(item?.stock_info[0]?.current_stock)} */}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"price"}>
            {/* {item.has_model
              ? "---"
              : formatCurrency(item?.price_info[0]?.current_price)} */}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"order"}>
            {formatNumber(item.order)}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"sales"}>
            {formatCurrency(item.sales)}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"status"}>
            <Switch
              checked={item.status}
              onChange={() => handleSwitch(item)}
              name="checkedA"
            />
          </TableCell>
        </TableRow>
        {item?.has_model &&
          showProduct.indexOf(item) !== -1 &&
          item.model_data.model.map((subItem, subIdx) => {
            return (
              <TableRow
                key={index}
                className={
                  tableClasses.tableBodyRow + " " + classes.tableTransition
                }
                style={{
                  backgroundColor:
                    checked.indexOf(item) !== -1 ? "#fff6f0" : "#fff",
                }}
              >
                <TableCell className={tableClasses.tableCell}></TableCell>
                <TableCell
                  className={tableClasses.tableCell}
                  key={"productInfo"}
                  style={{ paddingLeft: "70px !important" }}
                >
                  {productTypeInfo(subItem, index)}
                </TableCell>
                <TableCell className={tableClasses.tableCell} key={"quantity"}>
                  {formatNumber(subItem.stock_info[0].current_stock)}
                </TableCell>
                <TableCell className={tableClasses.tableCell} key={"price"}>
                  {formatCurrency(subItem.price_info[0].current_price)}
                </TableCell>
                <TableCell className={tableClasses.tableCell} key={"order"}>
                  {formatNumber(subItem.order)}
                </TableCell>
                <TableCell className={tableClasses.tableCell} key={"sales"}>
                  {formatCurrency(subItem.sales)}
                </TableCell>
                <TableCell className={tableClasses.tableCell} key={"status"}>
                  {subItem.status}
                </TableCell>
              </TableRow>
            );
          })}
      </React.Fragment>
    );
  };

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{text.title}</h4>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        <div className={classes.selectTitleContainer}>
          <GridContainer>
            {text.menuCard.map((item, index) => {
              return (
                <div className={classes.selectContainer}>
                  <p>{item}</p>
                  {menuCardData[Object.keys(menuCardData)[index]] > 0 && (
                    <p className={classes.txtNumTitle}>
                      {formatNumber(
                        menuCardData[Object.keys(menuCardData)[index]]
                      )}
                    </p>
                  )}
                </div>
              );
            })}
          </GridContainer>
        </div>
        <div>
          <div
            className={dashClasses.filterSelections}
            style={{
              marginLeft: "25px",
              position: "relative",
              display: "block",
            }}
          >
            <FormControl className={dashClasses.formControl}>
              <div style={{ marginRight: "15px" }}>
                <CustomInput
                  formControlProps={{
                    className:
                      adminClasses.margin + " " + classes.searchContainer,
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
                  onClick={() => setDoSearch(!doSearch)}
                >
                  <Search />
                </Button>
              </div>
            </FormControl>
            <FormControl
              className={dashClasses.formControl}
              style={{ marginRight: "25px" }}
            >
              <InputLabel id="ecom-select-label">{text.txtChannel}</InputLabel>
              <Select
                labelId="ecom-select-label"
                id="ecom-select"
                value={channel}
                onChange={handleChangeChannel}
                className={classes.select}
              >
                <MenuItem className={classes.dropdownItem} value={-1}>
                  {text.txtAll}
                </MenuItem>
                {channelData.map((item, index) => (
                  <MenuItem className={classes.dropdownItem} value={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              className={dashClasses.formControl}
              style={{ marginRight: "25px" }}
            >
              <InputLabel id="shop-select-label">{text.txtShop}</InputLabel>
              <Select
                labelId="shop-select-label"
                id="shop-select"
                value={shop}
                onChange={handleChangeShop}
                className={classes.select}
              >
                <MenuItem className={classes.dropdownItem} value={-1}>
                  {text.txtAll}
                </MenuItem>
                {shopData.map((item, index) => (
                  <MenuItem className={classes.dropdownItem} value={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                      <ClickAwayListener
                        onClickAway={() => setFilterDate(false)}
                      >
                        <div style={{ width: isMobile ? "190px" : "460px" }}>
                          <div
                            style={{ padding: "7px 15px", borderRadius: "4px" }}
                          >
                            <p
                              style={{
                                margin: 0,
                                fontSize: "17px",
                                fontWeight: "400",
                                color: primaryColor[0],
                              }}
                            >
                              {text.txtFilterDate}
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
                                    label={text.txtFilterFrom}
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
                                    label={text.txtFilterTo}
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
                                {text.txtFilterReset}
                              </Button>
                              <Button
                                color="primary"
                                size="sm"
                                onClick={() => {
                                  setDoFilter(doFilter + 1);
                                  setFilterDate(false);
                                }}
                              >
                                {text.txtFilterApply}
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
            <FormControl className={dashClasses.formControl}>
              <Button color="primary" onClick={() => setShowFilter(true)}>
                {text.txtFilter}
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
                        <p className={classes.titleFilter}>TỒN KHO</p>
                        <GridContainer>
                          {text.filterStatus.map((item, index) => {
                            return (
                              <div className={classes.filterTitleContainer}>
                                <Checkbox
                                  checked={
                                    storeStatusFilter.indexOf(item) !== -1
                                  }
                                  tabIndex={-1}
                                  onClick={() => handleStoreStatus(item)}
                                  checkedIcon={
                                    <Check
                                      className={taskClasses.checkedIcon}
                                    />
                                  }
                                  icon={
                                    <Check
                                      className={taskClasses.uncheckedIcon}
                                    />
                                  }
                                  classes={{
                                    checked: taskClasses.checked,
                                    root: taskClasses.root,
                                  }}
                                />
                                <p>{item}</p>
                              </div>
                            );
                          })}
                        </GridContainer>
                      </div>
                      
                      <div class={classes.filterEleContent}>
                        <p className={classes.titleFilter}>
                          TRẠNG THÁI LIÊN KẾT SẢN PHẨM ĐĂNG BÁN
                        </p>
                        <GridContainer>
                          {text.filterConstatus.map((item, index) => {
                            return (
                              <div className={classes.filterTitleContainer}>
                                <Checkbox
                                  checked={connectStatusFilter == item}
                                  tabIndex={-1}
                                  onClick={() => setConnectStatusFilter(item)}
                                  checkedIcon={
                                    <Check
                                      className={taskClasses.checkedIcon}
                                    />
                                  }
                                  icon={
                                    <Check
                                      className={taskClasses.uncheckedIcon}
                                    />
                                  }
                                  classes={{
                                    checked: taskClasses.checked,
                                    root: taskClasses.root,
                                  }}
                                />
                                <p>{item}</p>
                              </div>
                            );
                          })}
                        </GridContainer>
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
            <FormControl
              className={dashClasses.formControl}
              style={{
                marginRight: "25px",
                position: isMobile ? "static" : "absolute",
                right: "0",
              }}
            >
              <Button
                id="update-label"
                color="primary"
                onClick={() => setShowUpdate(true)}
              >
                {text.txtUpdate}
                <Icon className={classes.btnFilter}>expand_more_outlined</Icon>
              </Button>
              <Poppers
                open={Boolean(showUpdate)}
                anchorEl={showUpdate}
                transition
                disablePortal
                className={
                  classNames({ [classes.popperClose]: !showUpdate }) +
                  " " +
                  classes.popperNav
                }
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="notification-menu-list-grow"
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={() => handleUpdate()}>
                        <MenuList role="menu">
                          <MenuItem
                            className={classes.dropdownItem}
                            onClick={() => handleUpdate()}
                          >
                            Cập nhật thông tin hàng loạt
                          </MenuItem>
                          <Link href="/admin/product/copyproduct">
                            <MenuItem
                              className={classes.dropdownItem}
                              onClick={() => handleUpdate()}
                            >
                              Sao chép sản phẩm trên kênh...
                            </MenuItem>
                          </Link>
                          <MenuItem
                            className={classes.dropdownItem}
                            onClick={() => handleUpdate()}
                          >
                            <span onClick={() => setShowFilter2(true)}>
                              Xuất danh sách sản phẩm
                            </span>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Poppers>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={showFilter2}
                onClose={() => setShowFilter2(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={showFilter2}>
                  <Card className={classes.modalContainer}>
                    <CardHeader color="primary">
                      <h4 className={classes.cardTitleWhite}>
                        Xuất danh sách sản phẩm
                      </h4>
                    </CardHeader>
                    <CardBody>
                      <div class={classes.filterEleContent}>
                        <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="shop"
                            name="shop1"
                            value={value}
                            onChange={handleChange}
                          >
                            {listRadio.map((item) => {
                              return (
                                <div className={classes.radioFormLabel}>
                                  <FormControlLabel
                                    value={item.id}
                                    control={<CustomRadio />}
                                    className={classes.radioFCL}
                                    label={item.label}
                                  />
                                </div>
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </CardBody>
                    <CardFooter>
                      <div className={classes.filterFooter}>
                        <Button
                          color="primary"
                          onClick={() => {
                            setShowFilter2(false);
                          }}
                        >
                          Tải File
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Fade>
              </Modal>
            </FormControl>
          </div>
        </div>
        <div className={classes.selFilterTitleContainer}>
          <GridContainer>
            {storeStatusFilter &&
              doFilter > 0 &&
              storeStatusFilter.map((item, index) => {
                return (
                  <Button
                    color="primary"
                    size="sm"
                    className={classes.filteTritle}
                  >
                    {item}
                  </Button>
                );
              })}
            {connectStatusFilter && doFilter > 0 && (
              <Button color="primary" size="sm" className={classes.filteTritle}>
                {connectStatusFilter}
              </Button>
            )}
            {fromDate && doFilter > 0 && (
              <Button color="primary" size="sm" className={classes.filteTritle}>
                {moment(fromDate).format("DD/MM/yyyy") +
                  " - " +
                  moment(toDate).format("DD/MM/yyyy")}
              </Button>
            )}
          </GridContainer>
        </div>
      </CardBody>
      <CardFooter>
        <div
          className={tableClasses.tableResponsive}
          style={{ marginTop: "0" }}
        >
          <Table className={tableClasses.table}>
            {data !== undefined ? (
              <TableHead className={tableClasses["primary" + "TableHeader"]}>
                <TableRow className={tableClasses.tableHeadRow}>
                  <TableCell className={tableClasses.tableCell}>
                    <Checkbox
                      checked={isCheckAll}
                      tabIndex={-1}
                      onClick={() => handleCheckAll()}
                      checkedIcon={
                        <Check className={taskClasses.checkedIcon} />
                      }
                      icon={<Check className={taskClasses.uncheckedIcon} />}
                      classes={{
                        checked: taskClasses.checked,
                        root: taskClasses.root,
                      }}
                    />
                  </TableCell>
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
              {data.map((item, index) => {
                return renderProduct(item, index);
              })}
            </TableBody>
          </Table>
          <div style={{ margin: "15px 0" }}>
            <Pagination
              count={totalPage}
              page={currentPage}
              onChange={handleSelectPage}
            />
          </div>
          {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={2}
          page={1}
          // onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
        </div>
      </CardFooter>
    </Card>
  );
}

const styles = {
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  txtProductName: {
    display: "block",
    fontSize: "15px !important",
    padding: "0 !important",
    margin: "0 !important",
    marginBottom: "4px !important",
    color: "rgba(0, 0, 0, 0.87)",
    "&:hover,&:focus": {
      color: primaryColor[0],
    },
  },
  img: {
    width: "60px",
    height: "60px",
    position: "absolute",
    borderRadius: "10px",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "auto",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardBody: {
    alignItems: "center",
  },
  selectContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover,&:focus": {
      backgroundColor: primaryColor[3],
    },
    marginLeft: "30px",
    padding: "0 10px",
    borderRadius: "4px",
  },
  selectTitleContainer: {
    display: "flex",
    alignItems: "center",
  },
  txtNumTitle: {
    padding: "0 10px",
    backgroundColor: "#f77927",
    borderRadius: "10px",
    color: "#fff",
    marginLeft: "5px",
  },
  searchContainer: {
    margin: "0 !important",
  },
  btnFilter: {
    marginLeft: "5px",
    fontSize: "20px",
  },
  tableTransition: {
    transition: "height .5s",
  },
  proContainer: {
    display: "flex",
  },
  proInfoContainer: {
    marginLeft: "10px",
  },
  proImg: {
    width: "65px",
    height: "65px",
    padding: "2px",
    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
    borderRadius: "4px",
  },
  shopImg: {
    width: "15px",
    height: "15px",
    borderRadius: "4px",
    marginRight: "5px",
  },
  shopInfoContainer: {
    display: "flex",
    marginRight: "20px",
  },
  codeIcon: {
    fontSize: "16px",
    marginRight: "5px",
    color: "#808080",
  },
  txtShopName: {
    padding: "0 !important",
    margin: "0 !important",
    color: "#808080 !important",
  },
  txtMoreTypes: {
    padding: "0 !important",
    margin: "0 !important",
    color: primaryColor[0],
  },
  shopInfoMore: {
    "&:hover,&:focus": {
      backgroundColor: primaryColor[3],
    },
    padding: "0 2px",
    borderRadius: "4px",
  },
  txtLienKet: {
    padding: "1px 3px !important",
    margin: "0 !important",
    marginTop: "4px !important",
    borderRadius: "4px",
    border: "0.5px solid #dbdbdb",
    width: "fit-content",
    color: "#808080",
    backgroundColor: "#f5f5f5",
    fontSize: "11px !important",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    width: "40% !important",
    minWidth: "300px !important",
  },
  filterTitleContainer: {
    display: "flex",
    marginLeft: "20px",
  },
  filterEleContent: {
    justifyContent: "space-between",
    borderBottom: "1px solid #D2D2D2",
  },
  filterFooter: {
    justifyContent: "flex-end",
    display: "flex",
    width: "100%",
  },
  titleFilter: {
    color: primaryColor[0],
  },
  popperNav: {
    marginTop: "55px",
  },
  dropdownItem: {
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    WebkitTransition: "all 150ms linear",
    MozTransition: "all 150ms linear",
    OTransition: "all 150ms linear",
    MsTransition: "all 150ms linear",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    lineHeight: "1.42857143",
    color: "#333",
    whiteSpace: "nowrap",
    height: "unset",
    minHeight: "unset",
    "&:hover": {
      backgroundColor: primaryColor[0],
      color: "#fff",
    },
    "&.Mui-selected": {
      backgroundColor: primaryColor[0],
      color: "white",
    },
    "&.Mui-selected:hover": {
      backgroundColor: primaryColor[0],
      color: "white",
    },
  },
  selFilterTitleContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: "40px",
    marginTop: "15px",
  },
  filteTritle: {
    marginRight: "10px !important",
  },
};

ProductPage.layout = Admin;

export default WithAuthentication(ProductPage);
