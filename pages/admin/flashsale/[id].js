import moment from "moment";
import React, { useEffect, useState } from "react";
import "react-light-notifications/lib/main.css";
import { useSelector } from "react-redux";
// @material-ui/core components
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import {
  Checkbox, FormControl, FormControlLabel, InputAdornment, makeStyles, MenuItem, OutlinedInput, Radio,
  RadioGroup, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, withStyles
} from "@material-ui/core";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";

import Check from "@material-ui/icons/Check";
import adminStyles from "assets/jss/natcash/components/headerLinksStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import shopStyle from "assets/jss/natcash/views/shoplist/shoplistStyle.js";
import Switch from "components/CustomSwitch/Switch.js";
import FormCellCustom from "components/FormCustom/FormCellCustom.js";
import FormGroupCustom from "components/FormCustom/FormGroupCustom.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";

import { useRouter } from "next/router";
import { getAllShop } from "../../../utilities/ApiManage";
import { formatCurrency } from "../../../utilities/utils";

import styles from "assets/jss/natcash/views/flashsale/addFlashSaleStyle.js";
import ModalCustom from "components/ModalCustom/ModalCustom.js";

function FlashSaleDetailPage() {
  const router = useRouter();
  const { id } = router.query;
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
  // modal add product
  const [isShowModal, setIsShowModal] = useState(false);
  const [filterType, setFilterType] = useState("name");
  const [filterValue, setFilterValue] = useState("");
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checked, setChecked] = useState([]);
  const [isCheckAll_2, setIsCheckAll_2] = useState(false);
  const [checked_2, setChecked_2] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [data, setData] = useState([]);
  const [values, setValues] = React.useState({
    promotion_name: "",
    time_from: moment().format("yyyy-MM-DD"),
    time_to: moment().add(1, "hours").format("yyyy-MM-DDThh:mm"),
    time_frame: "TRUE",
    time_frame: "ONE",
    time_frame: "THREE",
    added_product: [

    ],
  });
  useEffect(() => {
    getShopData();
  }, []);

  const getShopData = async () => {
    let res = await getAllShop();
    setData(res.data);
  };




  const [batchSetting, setBatchSetting] = React.useState({
    discount: "",
    quantity_type: "unchanged",
    quantity_value: "",
    limit_type: "unchanged",
    limit_value: "",
  });

  const FORM_GROUP_CUSTOM = [
    {
      id: "en",
      value: ["Basic information", "Products running Flash Sale of Shop"],
      subTitle: ["You have selected ", " products for this time frame"],
    },
    {
      id: "vi",
      value: ["Thông tin cơ bản", "Sản phẩm chạy Flash Sale của Shop"],
      subTitle: ["Bạn đã chọn ", " sản phẩm Cho khung giờ này"],
    },
  ];

  const FORM_CELL_CUSTOM = [
    {
      id: "en",
      value: ["Day", "Time Frame / Product", "Product Criteria"],
    },
    {
      id: "vi",
      value: ["Ngày", "Khung giờ / Sản phẩm", "Tiêu chí sản phẩm"],
    },
  ];

  const CHECKBOX = [
    {
      id: "vi",
      value: [
        "Allowable inventory: 1~1000",
        "Promotion price: The price after the promotion is the lowest price in the past 7 days (excluding Shopee's Flash Sale price)",
        "Likes: Unlimited ",
        "Number of orders sold in the last 30 days: Unlimited",
        "Time to participate in the program by: >=1 day (The same product cannot be registered for Flash Sale for 1 consecutive day) ",
        "Allowed discount range: 5% ~ 90%",
        "Rating: Unlimited",
        "Pre-orders: Pre-orders are not accepted ",
        "Delivery within: Unlimited days ",
      ],
    },
    {
      id: "en",
      value: [
        "Tồn kho cho phép: 1~1000",
        "Giá khuyến mãi: Giá sau khuyến mãi là giá thấp nhất trong 7 ngày qua(không tính giá chạy Flash Sale của Shopee)",
        "Lượt thích: Không giới hạn",
        "Số đơn hàng bán được trong 30 ngày qua: Không giới hạn",
        "Thời gian tham gia chương trình tiết theo: >=1 ngày (Cùng một sản phẩm không thể đăng ký Flash Sale trong 1 ngày liên tiếp)",
        "Khoảng giảm giá cho phép: 5% ~ 90%",
        "Đánh giá: Không giới hạn",
        "Hàng đặt trước: Không chấp nhận hàng đặt trước",
        "Giao hàng trong: Không giới hạn ngày",
      ],
    },
  ];

  const POPUP = [
    {
      id: "en",
      title: "Product Rank",
      button: ["Search", "Reset", "Confirm"],
      select: ["By amount", "By percent"],
      radios: [
        "01:00:00-06:00:00 - Number of participating products 10",
        "06:00:00-09:00:00 - Number of participating products 10 ",
        "15:00:00-18:00:00 - Number of participating products 10 ",
      ],
    },
    {
      id: "vi",
      title: "Thứ hạng sản phẩm",
      button: ["Tìm", "Nhập lại", "Xác nhận",],
      select: ["Theo số tiền", "Theo phần trăm"],
      radios: [
        "01:00:00-06:00:00 - Số sản phẩm tham gia 10",
        "06:00:00-09:00:00 - Số sản phẩm tham gia 10",
        "15:00:00-18:00:00 - Số sản phẩm tham gia 10",
      ],
    },
  ];

  const TABLE_HEAD = [
    {
      id: "en",
      value: [
        "Product",
        "Original price",
        "Decrease Price",
        "Discount",
        "Stock",
        "Promotion Quantity",
        "Limited Order",
        "Status",
      ],
    },
    {
      id: "vi",
      value: [
        "Sản phẩm",
        "Giá gốc",
        "Giá sau giảm",
        " ",
        "Giảm giá",
        "Kho hàng",
        "Số lượng khuyến mãi",
        "Giới hạn đặt hàng",
        "Trạng thái",
      ],
    },
  ];

  const TABLE_HEAD_2 = [
    {
      id: "en",
      value: [
        "Rank",
        "Product",
        "Product classification",
        "Promotion quantity",
        "Promotion Price",
      ],
    },
    {
      id: "vi",
      value: [
        "Hạng",
        "Sản phẩm",
        "Phân loại hàng",
        "SL Khuyến mãi",
        "Giá Khuyến mãi",
      ],
    },
  ];

  const BATCH_SETTING = [
    {
      id: "en",
      text: ["Batch setting", "selected products"],
      button: ["Update", "Delete"],
      field: ["Promotion", "Quantity of promotional products", "Order Limits"],
      select: ["Unchanged", "Unlimited", "Limited"],
    },
    {
      id: "vi",
      text: ["Thiết lập hàng loạt", "sản phẩm đã chọn"],
      button: ["Cập nhật", "Xóa"],
      field: [
        "Khuyến mãi",
        "Số lượng sản phẩm khuyến mãi",
        "Giới hạn đặt hàng",
      ],
      select: ["Không thay đổi", "Không giới hạn", "Giới hạn"],
    },
  ];

  const BUTTONS = [
    {
      id: "en",
      value: ["Chọn sản phẩm", "Cancel", "Confirm"],
    },
    {
      id: "vi",
      value: ["Select product", "Hủy", "Xác nhận"],
    },
  ];

  const listText = [
    {
      id: "en",
      title: "Add new promotion",
      form_group_custom: FORM_GROUP_CUSTOM[0].value,
      form_group_custom_subtitle: FORM_GROUP_CUSTOM[0].subTitle,
      form_cell_custom: FORM_CELL_CUSTOM[0].value,

      placeholder: "Enter here",
      popup_title: POPUP[0].title,
      popup_button: POPUP[0].button,
      popup_select: POPUP[0].select,
      popup_radios: POPUP[0].radios,
      tableHead: TABLE_HEAD[0].value,
      tableHead_2: TABLE_HEAD_2[0].value,
      batch_setting: BATCH_SETTING[0],
      buttons: BUTTONS[0].value,
      checkbox: CHECKBOX[0].value,
    },
    {
      id: "vi",
      title: "Thêm chương trình khuyến mãi mới",
      form_group_custom: FORM_GROUP_CUSTOM[1].value,
      form_group_custom_subtitle: FORM_GROUP_CUSTOM[1].subTitle,
      form_cell_custom: FORM_CELL_CUSTOM[1].value,

      placeholder: "Nhập vào",
      popup_title: POPUP[1].title,
      popup_button: POPUP[1].button,
      popup_select: POPUP[1].select,
      popup_radios: POPUP[1].radios,
      tableHead: TABLE_HEAD[1].value,
      tableHead_2: TABLE_HEAD_2[1].value,
      batch_setting: BATCH_SETTING[1],
      buttons: BUTTONS[1].value,
      checkbox: CHECKBOX[1].value,
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

  const [dataReal, setDataReal] = React.useState([
    {
      id: 312313,
      promotion_name: "sale 21.9",
      time_from: moment().format("yyyy-MM-DD"),
      time_to: moment().add(1, "hours").format("yyyy-MM-DDThh:mm"),
      time_frame: "ONE",
      added_product: [
        {
          id: "1234",
          avatar: "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
          name: "Bình đun nước thông minh Moaz Bebe MB-002",
          discount_code: "Mã FMCGMALL - 8% đơn 250K",
          sold: 23,
          original_price: 1210000,
          quantity: 5,
          shipping_info: "Nhanh",
          status: true,
          limited_order: 20,
          classified: [
            {
              type: "Số 0( 0-1 tuổi)",
              price: 436650,
              decrease_price: 400000,
              discount: 20,
              stock: 10,
              promotion_quantity: 10,
              status: true,
              rank: 1,
              promotion_quantity: "đ436,65k",
              promotion_price: "1% OFF",
              revenue: "đ436,65k",
              order: 1,
              promotion_product: 1,
              reminders: 1,
              views: 1,
              clicks: 1,
            },
            {
              type: "(Số 3T)",
              price: 560000,
              decrease_price: 500000,
              discount: 20,
              stock: 10,
              promotion_quantity: "",
              status: false,
              rank: 1,
              promotion_quantity: "đ536,65k",
              promotion_price: "2% OFF",
              revenue: "đ236,65k",
              order: 1,
              promotion_product: 1,
              reminders: 1,
              views: 1,
              clicks: 1,
            },
          ],
        },
        {
          id: "34524523",
          avatar: "https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc",
          name: "Sữa Meiji số 0/9 - 800g",
          sold: 30,
          discount_code: "Mã FMCGMALL - 8% đơn 250K",
          original_price: 550000,
          quantity: 988,
          shipping_info: "Nhanh",
          status: true,
          limited_order: 20,

          classified: [
            {
              type: "Số 0( 0-1 tuổi)",
              price: 436650,
              decrease_price: 400000,
              discount: 20,
              stock: 10,
              promotion_quantity: 10,
              status: true,
              rank: 1,
              promotion_quantity: "đ136,65k",
              promotion_price: "2% OFF",
              revenue: "đ136,65k",
              order: 1,
              promotion_product: 1,
              reminders: 1,
              views: 1,
              clicks: 1,
            },
            {
              type: "(Số 3T)",
              price: 560000,
              decrease_price: 500000,
              discount: 20,
              stock: 10,
              promotion_quantity: "",
              status: false,
              rank: 1,
              promotion_quantity: "đ236,65k",
              promotion_price: "2% OFF",
              revenue: "đ236,65k",
              order: 1,
              promotion_product: 1,
              reminders: 1,
              views: 1,
              clicks: 1,
            },
          ],
        },
      ],
    },
    {
      id: 124122,
      promotion_name: "FS 15.9",
      time_from: moment().format("yyyy-MM-DD"),
      time_to: moment().add(1, "hours").format("yyyy-MM-DDThh:mm"),
      time_frame: "TRUE",
      added_product: [
        {
          id: "1234",
          avatar: "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
          name: "Bình đun nước thông minh Moaz Bebe MB-002",
          discount_code: "Mã FMCGMALL - 8% đơn 250K",
          sold: 23,
          original_price: 1210000,
          quantity: 5,
          shipping_info: "Nhanh",
          status: true,
          limited_order: 20,
          classified: [
            {
              type: "Số 0( 0-1 tuổi)",
              price: 436650,
              decrease_price: 400000,
              discount: 20,
              stock: 10,
              promotion_quantity: 10,
              status: true,
              rank: 1,
              promotion_quantity: "đ36,65k",
              promotion_price: "2% OFF",
              revenue: "đ36,65k",
              order: 1,
              promotion_product: 1,
              reminders: 1,
              views: 1,
              clicks: 1,
            },
            {
              type: "(Số 3T)",
              price: 560000,
              decrease_price: 500000,
              discount: 20,
              stock: 10,
              promotion_quantity: "",
              status: false,
              rank: 1,
              promotion_quantity: "đ36,65k",
              promotion_price: "2% OFF",
              revenue: "đ36,65k",
              order: 1,
              promotion_product: 1,
              reminders: 1,
              views: 1,
              clicks: 1,
            },
          ],
        },
        {
          id: "34524523",
          avatar: "https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc",
          name: "Sữa Meiji số 0/9 - 800g",
          sold: 30,
          discount_code: "Mã FMCGMALL - 8% đơn 250K",
          original_price: 550000,
          quantity: 988,
          shipping_info: "Nhanh",
          status: true,
          limited_order: 20,
          classified: [
            {
              type: "Số 0( 0-1 tuổi)",
              price: 436650,
              decrease_price: 400000,
              discount: 20,
              stock: 10,
              promotion_quantity: 10,
              status: true,
              rank: 1,
              promotion_quantity: "đ36,65k",
              promotion_price: "2% OFF",
              revenue: "đ36,65k",
              order: 1,
              promotion_product: 1,
              reminders: 1,
              views: 1,
              clicks: 1,
            },
            {
              type: "(Số 3T)",
              price: 560000,
              decrease_price: 500000,
              discount: 20,
              stock: 10,
              promotion_quantity: "",
              status: false,
              rank: 1,
              promotion_quantity: "đ36,65k",
              promotion_price: "2% OFF",
              revenue: "đ36,65k",
              order: 1,
              promotion_product: 1,
              reminders: 1,
              views: 1,
              clicks: 1,
            },
          ],
        },
      ],
    },
  ]);

  const [dataProduct, setDataProduct] = useState([
    {
      id: "1234",
      avatar: "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
      name: "Bình đun nước thông minh Moaz Bebe MB-002",
      discount_code: "Mã FMCGMALL - 8% đơn 250K",
      sold: 23,
      original_price: 1210000,
      quantity: 5,
      shipping_info: "Nhanh",
      status: true,
      limited_order: 20,
      time_frame: "ONE",

      classified: [
        {
          type: "Số 0( 0-1 tuổi)",
          price: 436650,
          decrease_price: 400000,
          discount: 20,
          stock: 10,
          promotion_quantity: 10,
          status: true,
          rank: 1,
          promotion_quantity: "đ436,65k",
          promotion_price: "1% OFF",
          revenue: "đ436,65k",
          order: 1,
          promotion_product: 1,
          reminders: 1,
          views: 1,
          clicks: 1,
        },
        {
          type: "(Số 3T)",
          price: 560000,
          decrease_price: 500000,
          discount: 20,
          stock: 10,
          promotion_quantity: "",
          status: false,
          rank: 1,
          promotion_quantity: "đ536,65k",
          promotion_price: "2% OFF",
          revenue: "đ236,65k",
          order: 1,
          promotion_product: 1,
          reminders: 1,
          views: 1,
          clicks: 1,
        },
      ],
    },
    {
      id: "34524523",
      avatar: "https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc",
      name: "Sữa Meiji số 0/9 - 800g",
      sold: 30,
      discount_code: "Mã FMCGMALL - 8% đơn 250K",
      original_price: 550000,
      quantity: 988,
      shipping_info: "Nhanh",
      status: true,
      limited_order: 20,
      time_frame: "TRUE",

      classified: [
        {
          type: "Số 0( 0-1 tuổi)",
          price: 436650,
          decrease_price: 400000,
          discount: 20,
          stock: 10,
          promotion_quantity: 10,
          status: true,
          rank: 1,
          promotion_quantity: "đ136,65k",
          promotion_price: "2% OFF",
          revenue: "đ136,65k",
          order: 1,
          promotion_product: 1,
          reminders: 1,
          views: 1,
          clicks: 1,
        },
        {
          type: "(Số 3T)",
          price: 560000,
          decrease_price: 500000,
          discount: 20,
          stock: 10,
          promotion_quantity: "",
          status: false,
          rank: 1,
          promotion_quantity: "đ236,65k",
          promotion_price: "2% OFF",
          revenue: "đ236,65k",
          order: 1,
          promotion_product: 1,
          reminders: 1,
          views: 1,
          clicks: 1,
        },
      ],
    },
    {
      id: "1245362324",
      avatar: "https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9",
      name: "Chăn lưới OTK xuất Nga cho bé",
      sold: 10,
      discount_code: "Mã FMCGMALL - 8% đơn 250K",
      original_price: 120000,
      quantity: 8,
      shipping_info: "Nhanh",
      status: true,
      limited_order: 20,
      time_frame: "THREE",

      classified: [
        {
          type: "Số 0( 0-1 tuổi)",
          price: 436650,
          decrease_price: 400000,
          discount: 20,
          stock: 10,
          promotion_quantity: 10,
          status: true,
          rank: 1,
          promotion_quantity: "đ36,65k",
          promotion_price: "2% OFF",
          revenue: "đ36,65k",
          order: 1,
          promotion_product: 1,
          reminders: 1,
          views: 1,
          clicks: 1,
        },
        {
          type: "(Số 3T)",
          price: 560000,
          decrease_price: 500000,
          discount: 20,
          stock: 10,
          promotion_quantity: "",
          status: false,
          rank: 1,
          promotion_quantity: "đ36,65k",
          promotion_price: "2% OFF",
          revenue: "đ36,65k",
          order: 1,
          promotion_product: 1,
          reminders: 1,
          views: 1,
          clicks: 1,
        },
      ],
    },
  ]);
  useEffect(() => {
    dataReal?.map((item, index) => {
      if (item.id == id) {
        setValues(item);
      }
    });
  }, []);

  const CustomRadio = withStyles({
    root: {
      color: "gray",
      "&$checked": {
        color: "#f96606",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  //change value input form
  const handleChangeValue = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  //change value batch setting
  const handleChangeBatchSetting = (prop) => (event) => {
    setBatchSetting({ ...batchSetting, [prop]: event.target.value });
  };

  const handleChangeFilterType = (event) => {
    setFilterType(event.target.value);
  };

  const handleChangeFilterValue = (event) => {
    setFilterValue(event.target.value);
  };

  const handleCheckAll = () => {
    if (isCheckAll) {
      setIsCheckAll(false);
      setChecked([]);
    } else {
      setIsCheckAll(true);
      setChecked(dataProduct);
    }
  };

  const handleCheckAll_2 = () => {
    if (isCheckAll_2) {
      setIsCheckAll_2(false);
      setChecked_2([]);
    } else {
      setIsCheckAll_2(true);
      setChecked_2(values.added_product);
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

  const handleToggle_2 = (item) => {
    const currentIndex_2 = checked_2.indexOf(item);
    const newChecked_2 = [...checked_2];
    if (currentIndex_2 === -1) {
      newChecked_2.push(item);
    } else {
      setIsCheckAll_2(false);
      newChecked_2.splice(currentIndex_2, 1);
    }
    setChecked_2(newChecked_2);
  };

  const handleSwitch = (item) => {
    // on - off
    var index = values.added_product.indexOf(item);
    let cloneData = [...values.added_product];
    let cloneItem = { ...cloneData[index] };
    cloneItem.status = !cloneItem.status;
    cloneData[index] = cloneItem;
    setValues({ ...values, ["added_product"]: cloneData });
    setIsCheckAll_2(false);

    const currentIndex_2 = checked_2.indexOf(item);
    const newChecked_2 = [...checked_2];
    if (currentIndex_2 !== -1) {
      newChecked_2.splice(currentIndex_2, 1);
    }
    setChecked_2(newChecked_2);
  };

  const handleChangeLimiterOrderItem = (item) => (event) => {
    let cloneData = [...values.added_product];
    var index = values.added_product.indexOf(item);
    let cloneItem = { ...cloneData[index] };
    cloneItem.limited_order = event.target.value;
    cloneData[index] = cloneItem;
    setValues({ ...values, ["added_product"]: cloneData });
    setIsCheckAll_2(false);
    setChecked_2([]);
  };

  const handleChangeClassifiedValue = (item, stt, value, type) => (event) => {
    let data = [...values.added_product];
    let cloneData = [...data[stt].classified];
    let index = values.added_product[stt].classified.indexOf(item);
    let cloneItem = { ...cloneData[index] };
    if (type == "bool") {
      cloneItem[value] = event.target.checked;
    } else {
      cloneItem[value] = event.target.value;
    }
    cloneData[index] = cloneItem;
    data[stt].classified = cloneData;
    setValues({ ...values, ["added_product"]: data });
    setIsCheckAll_2(false);
    setChecked_2([]);
  };

  const handleUpdateAddedProduct = () => {
    let data = [...values.added_product];
    checked_2.map((item, stt) => {
      let cloneData = [...data[stt].classified];
      data[stt].classified.map((props, number) => {
        let index = values.added_product[stt].classified.indexOf(props);
        let cloneItem = { ...cloneData[index] };
        // Update Decrease Price
        if (batchSetting.discount >= 0 && batchSetting.discount.length > 0) {
          cloneItem["decrease_price"] =
            cloneItem.price -
            (Number(batchSetting.discount) * cloneItem.price) / 100;
        }
        // Update Quantity Promotion
        if (
          batchSetting.quantity_type == "limited" &&
          batchSetting.quantity_value > 0
        ) {
          cloneItem["promotion_quantity"] = batchSetting.quantity_value;
        } else if (batchSetting.quantity_type == "unlimited") {
          cloneItem["promotion_quantity"] = "";
        }
        cloneData[index] = cloneItem;
        data[stt].classified = cloneData;
      });
      // Update Limited Order
      let index2 = data.indexOf(item);
      let cloneItem2 = { ...data[index2] };
      if (
        batchSetting.limit_type == "limited" &&
        batchSetting.limit_value > 0
      ) {
        cloneItem2.limited_order = batchSetting.limit_value;
      } else if (batchSetting.limit_type == "unlimited") {
        cloneItem2.limited_order = "";
      }
      data[index2] = cloneItem2;
    });
    setValues({ ...values, ["added_product"]: data });
    setIsCheckAll_2(false);
    setChecked_2([]);
  };

  const handleDeleteAddedProduct = () => {
    let cloneData = [...values.added_product];
    const newChecked = [...checked];
    checked_2.map((item) => {
      // remove obj form arr
      var index = values.added_product.indexOf(item);
      if (checked_2.length < values.added_product.length) {
        cloneData.splice(index, 1);
      } else {
        cloneData = [];
      }
      // remove item checked
      const currentIndex = checked.indexOf(item);
      if (currentIndex === -1) {
        newChecked.push(item);
      } else {
        setIsCheckAll(false);
        newChecked.splice(currentIndex, 1);
      }
    });
    setChecked(newChecked);
    setValues({
      ...values,
      ["added_product"]: cloneData,
    });
    setIsCheckAll_2(false);
    setChecked_2([]);
  };

  const handleSubmit = () => {
    alert("hi");
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
          <TableCell className={tableClasses.tableCell} key={"Rank"}>
            {item.classified.map((props, stt) => {
              return (
                <p
                  className={
                    classes.text +
                    " " +
                    classes.infoTextPrimary +
                    " " +
                    classes.classifiedMargin
                  }
                >
                  {props.rank}
                </p>
              );
            })}
          </TableCell>
          <TableCell
            className={
              tableClasses.tableCell + " " + tableClasses.cellWidth_400
            }
            key={"productInfo"}
          >
            <div className={classes.cellInfo}>
              <img src={item.avatar} className={classes.tableImage} />
              <div className={classes.infoTextContainer}>
                <p className={classes.text + " " + classes.infoTextPrimary}>
                  {item.name}
                </p>
                <p className={classes.text + " " + classes.infoTextSecondary}>
                  {item.discount_code}
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell className={tableClasses.tableCell}>
            {item.classified.map((props, stt) => {
              return (
                <p
                  className={
                    classes.text +
                    " " +
                    classes.infoTextPrimary +
                    " " +
                    classes.classifiedMargin
                  }
                >
                  {props.type}
                </p>
              );
            })}
          </TableCell>
          <TableCell
            className={tableClasses.tableCell}
            key={"Promotion quantity"}
          >
            {item.classified.map((props, stt) => {
              return (
                <p
                  className={
                    classes.text +
                    " " +
                    classes.infoTextPrimary +
                    " " +
                    classes.classifiedMargin
                  }
                >
                  {props.promotion_quantity}
                </p>
              );
            })}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"Promotion price"}>
            {item.classified.map((props, stt) => {
              return (
                <p
                  className={
                    classes.text +
                    " " +
                    classes.infoTextPrimary +
                    " " +
                    classes.classifiedMargin
                  }
                >
                  {props.promotion_price}
                </p>
              );
            })}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  const TableData = () => {
    return (
      <div className={tableClasses.tableResponsive}>
        <Table className={tableClasses.table + " " + tableClasses.tableCustom}>
          {values.added_product !== undefined ? (
            <TableHead
              className={
                tableClasses["primary" + "TableHeader"] +
                " " +
                tableClasses.tableHeadCustom
              }
            >
              <TableRow className={tableClasses.tableHeadRow}>
                <TableCell className={tableClasses.tableCell}>
                  <Checkbox
                    checked={isCheckAll_2}
                    tabIndex={-1}
                    onClick={() => handleCheckAll_2()}
                    checkedIcon={<Check className={taskClasses.checkedIcon} />}
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
            {values.added_product?.map((item, index) => {
              return renderTable(item, index);
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderTable = (item, index) => {
    return (
      <>
        <TableRow
          className={tableClasses.tableBodyRow}
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <TableCell className={tableClasses.tableCell}>
            <Checkbox
              checked={checked_2.indexOf(item) !== -1}
              tabIndex={-1}
              onClick={() => handleToggle_2(item)}
              checkedIcon={<Check className={taskClasses.checkedIcon} />}
              icon={<Check className={taskClasses.uncheckedIcon} />}
              classes={{
                checked: taskClasses.checked,
                root: taskClasses.root,
              }}
            />
          </TableCell>
          <TableCell className={tableClasses.tableCell}>
            <div className={classes.cellInfo}>
              <img src={item.avatar} className={classes.tableImage} />
              <div className={classes.infoTextContainer}>
                <p className={classes.text + " " + classes.infoTextPrimary}>
                  {item.name}
                </p>
                <p className={classes.text + " " + classes.infoTextSecondary}>
                  {item.discount_code}
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell className={tableClasses.tableCell}></TableCell>
          <TableCell className={tableClasses.tableCell}></TableCell>
          <TableCell className={tableClasses.tableCell}></TableCell>
          <TableCell className={tableClasses.tableCell}></TableCell>
          <TableCell className={tableClasses.tableCell}></TableCell>
          <TableCell className={tableClasses.tableCell}></TableCell>
          <TableCell className={tableClasses.tableCell}>
            <FormControl component="fieldset" size="small">
              <OutlinedInput
                id="outlined-adornment-amount-5"
                value={values.added_product[index].limited_order}
                onChange={handleChangeLimiterOrderItem(item)}
                autoComplete="off"
                type="number"
                placeholder={text.placeholder}
                className={classes.FieldMaxWidth}
              />
            </FormControl>
          </TableCell>
          <TableCell className={tableClasses.tableCell}></TableCell>
        </TableRow>
        <TableRow className={tableClasses.tableBodyRow}>
          <TableCell className={tableClasses.tableCell}></TableCell>
          <TableCell className={tableClasses.tableCell}>
            {values.added_product[index].classified.map((props, stt) => {
              return (
                <p
                  className={
                    classes.text +
                    " " +
                    classes.infoTextPrimary +
                    " " +
                    classes.classifiedMargin
                  }
                >
                  {props.type}
                </p>
              );
            })}
          </TableCell>
          <TableCell className={tableClasses.tableCell}>
            {values.added_product[index].classified.map((props, stt) => {
              return (
                <p
                  className={
                    classes.text +
                    " " +
                    classes.infoTextPrimary +
                    " " +
                    classes.classifiedMargin
                  }
                >
                  {formatCurrency(props.price)}
                </p>
              );
            })}
          </TableCell>
          <TableCell className={tableClasses.tableCell}>
            {values.added_product[index].classified.map((props, stt) => {
              return (
                <FormControl
                  component="fieldset"
                  size="small"
                  style={{ width: "100%" }}

                >
                  <OutlinedInput
                    id="outlined-adornment-amount-5"
                    value={props.decrease_price}
                    onChange={handleChangeClassifiedValue(
                      props,
                      index,
                      "decrease_price"
                    )}
                    autoComplete="off"
                    type="number"
                    placeholder={text.placeholder}
                    className={
                      classes.FieldMaxWidth + " " + classes.classifiedMargin2
                    }
                  />
                </FormControl>
              );
            })}
          </TableCell>
          <TableCell className={tableClasses.tableCell} style={{ paddingRight: "20px" }}>
            {values.added_product[index].classified.map((props, stt) => {
              return (
                <p >Hoặc</p>
              );
            })}
          </TableCell>
          <TableCell className={tableClasses.tableCell} >
            {values.added_product[index].classified.map((props, stt) => {
              return (
                <FormControl
                  component="fieldset"
                  size="small"
                  style={{ width: "100%" }}
                  padding-Left="0"
                >
                  <div className={classes.transportFlex}>

                    <OutlinedInput
                      id="outlined-adornment-amount-5"
                      value={props.discount}
                      onChange={handleChangeClassifiedValue(
                        props,
                        index,
                        "discount"
                      )}
                      autoComplete="off"
                      type="number"
                      placeholder={text.placeholder}
                      className={
                        classes.FieldMaxWidth + " " + classes.classifiedMargin2
                      }
                    />
                  </div>
                </FormControl>
              );
            })}
          </TableCell>
          <TableCell className={tableClasses.tableCell}>
            {values.added_product[index].classified.map((props, stt) => {
              return (
                <p
                  className={
                    classes.text +
                    " " +
                    classes.infoTextPrimary +
                    " " +
                    classes.classifiedMargin
                  }
                >
                  {props.stock}
                </p>
              );
            })}
          </TableCell>
          <TableCell className={tableClasses.tableCell}>
            {values.added_product[index].classified.map((props, stt) => {
              return (
                <FormControl
                  component="fieldset"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <OutlinedInput
                    id="outlined-adornment-amount-5"
                    value={props.promotion_quantity}
                    onChange={handleChangeClassifiedValue(
                      props,
                      index,
                      "promotion_quantity"
                    )}
                    autoComplete="off"
                    type="number"
                    placeholder={text.placeholder}
                    className={
                      classes.FieldMaxWidth + " " + classes.classifiedMargin2
                    }
                  />
                </FormControl>
              );
            })}
          </TableCell>
          <TableCell className={tableClasses.tableCell}></TableCell>
          <TableCell className={tableClasses.tableCell}>
            {values.added_product[index].classified.map((props, stt) => {
              return (
                <Switch
                  checked={props.status}
                  onChange={handleChangeClassifiedValue(
                    props,
                    index,
                    "status",
                    "bool"
                  )}
                  name="checkedA"
                />
              );
            })}
          </TableCell>
        </TableRow>
      </>
    );
  };

  const BatchSetting = () => {
    return (
      <div className={classes.batchSetting}>
        <div className={classes.batchSettingText + " " + classes.flex_center}>
          <p className={classes.batchSettingText_Title}>
            {text.batch_setting.text[0]}
          </p>
          <p className={classes.batchSettingText_subTitle}>
            {checked_2.length} {text.batch_setting.text[1]}
          </p>
        </div>

        <div className={classes.flex_center} style={{ alignItems: "end" }}>
          <div
            className={classes.batchSettingValue + " " + classes.flex_center}
            style={{ flex: 1, margin: "5px 0" }}
          >
            <FormControl component="fieldset" size="small">
              <p className={classes.textField}>{text.batch_setting.field[0]}</p>
              <OutlinedInput
                id="outlined-adornment-amount-5"
                value={batchSetting.discount}
                onChange={handleChangeBatchSetting("discount")}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                autoComplete="off"
                type="number"
                placeholder={text.placeholder}
                className={classes.batchSettingValue_margin}
              />
            </FormControl>
            <div className={classes.batchSettingValue_margin}>
              <p className={classes.textField}>{text.batch_setting.field[1]}</p>
              <div className={classes.flex_center}>
                <FormControl variant="outlined" size="small">
                  <Select
                    labelId="select-outlined-label-1"
                    id="select-outlined"
                    value={batchSetting.quantity_type}
                    onChange={handleChangeBatchSetting("quantity_type")}
                  >
                    <MenuItem value={"unchanged"}>
                      {text.batch_setting.select[0]}
                    </MenuItem>
                    <MenuItem value={"unlimited"}>
                      {text.batch_setting.select[1]}
                    </MenuItem>
                    <MenuItem value={"limited"}>
                      {text.batch_setting.select[2]}
                    </MenuItem>
                  </Select>
                </FormControl>
                {batchSetting.quantity_type == "limited" && (
                  <FormControl variant="outlined" size="small">
                    <OutlinedInput
                      id="outlined-adornment-amount-5"
                      value={batchSetting.quantity_value}
                      onChange={handleChangeBatchSetting("quantity_value")}
                      type="number"
                      autoComplete="off"
                      placeholder={text.placeholder}
                    />
                  </FormControl>
                )}
              </div>
            </div>
            <div className={classes.batchSettingValue_margin}>
              <p className={classes.textField}>{text.batch_setting.field[2]}</p>
              <div className={classes.flex_center}>
                <FormControl variant="outlined" size="small">
                  <Select
                    labelId="select-outlined-label-1"
                    id="select-outlined"
                    value={batchSetting.limit_type}
                    onChange={handleChangeBatchSetting("limit_type")}
                  >
                    <MenuItem value={"unchanged"}>
                      {text.batch_setting.select[0]}
                    </MenuItem>
                    <MenuItem value={"unlimited"}>
                      {text.batch_setting.select[1]}
                    </MenuItem>
                    <MenuItem value={"limited"}>
                      {text.batch_setting.select[2]}
                    </MenuItem>
                  </Select>
                </FormControl>
                {batchSetting.limit_type == "limited" && (
                  <FormControl variant="outlined" size="small">
                    <OutlinedInput
                      id="outlined-adornment-amount-5"
                      value={batchSetting.limit_value}
                      onChange={handleChangeBatchSetting("limit_value")}
                      type="number"
                      autoComplete="off"
                      placeholder={text.placeholder}
                    />
                  </FormControl>
                )}
              </div>
            </div>
          </div>
          <div
            className={classes.batchSettingAction + " " + classes.flex_center}
          >
            <Button color="primary" onClick={() => handleUpdateAddedProduct()}>
              {text.batch_setting.button[0]}
            </Button>
            <Button onClick={() => handleDeleteAddedProduct()}>
              {text.batch_setting.button[1]}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{text.title}</h4>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        {/* Basic information */}
        <FormGroupCustom title={text.form_group_custom[0]}>
          {/* flash sale Day */}
          <FormCellCustom label={text.form_cell_custom[0]}>
            <div className={classes.formCell}>
              <TextField
                id="datetime-local"
                type="date"
                value={values.time_from}
                onChange={handleChangeValue("time_from")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </FormCellCustom>
          {/* Time */}
          <FormCellCustom label={text.form_cell_custom[1]} helperText={""}>
            <div className={classes.formCell + " " + classes.flex_center}>
              <RadioGroup
                aria-label="shop"
                name="shop1"
                value={values.time_frame}
                onChange={handleChangeValue("time_frame")}
                className={classes.flex_column}
              >
                <FormControlLabel
                  value={"ONE"}
                  control={<CustomRadio />}
                  label={text.popup_radios[0]}
                />
                <FormControlLabel
                  value={"TRUE"}
                  control={<CustomRadio />}
                  label={text.popup_radios[1]}
                />
                <FormControlLabel
                  value={"THREE"}
                  control={<CustomRadio />}
                  label={text.popup_radios[2]}
                />
              </RadioGroup>
            </div>
          </FormCellCustom>
          <FormCellCustom label={text.form_cell_custom[2]}>
            <div className={classes.border}>
              <GridContainer color="primary">
                {text.checkbox.map((item, index) => {
                  return (
                    <GridItem xs={6} sm={6} md={6} key={index} color="primary">
                      <div className={classes.transportFlex}>
                        <div className={classes.transportType}></div>
                        <p
                          className={classes.text + " " + classes.checkBoxLabel}
                          style={{ flex: 1 }}
                        >
                          {item}
                        </p>
                      </div>
                    </GridItem>
                  );
                })}
              </GridContainer>
            </div>
          </FormCellCustom>
        </FormGroupCustom>
        {/* Products of Combo Promotion */}
        <FormGroupCustom
          title={text.form_group_custom[1]}
          subTitle={
            text.form_group_custom_subtitle[0] +
            " " +
            values.added_product?.length +
            "/10" +
            text.form_group_custom_subtitle[1]
          }
          hasButton={true}
          btnTitle={"Select Product"}
          onClick={() => setIsShowModal(true)}
        >
          {values.added_product.length > 0 && (
            <>
              {BatchSetting()}
              {TableData()}
            </>
          )}
        </FormGroupCustom>
        <ModalCustom
          width={1000}
          title={text.popup_title}
          subTitle={""}
          // isShow={true}
          isShow={isShowModal}
          handleClose={() => setIsShowModal(false)}
        >
          <div
            className={tableClasses.tableResponsive}
            style={{ marginTop: "0" }}
          >
            <Table className={tableClasses.table}>
              {dataProduct !== undefined ? (
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
                    {text.tableHead_2.map((prop, key) => {
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
                {dataProduct.map((item, index) => {
                  return renderProduct(item, index);
                })}
              </TableBody>
            </Table>
            <div className={classes.buttonContainer}>
              <Button
                color="primary"
                onClick={() => {
                  setValues({ ...values, ["added_product"]: checked }),
                    setIsShowModal(false);
                }}
              >
                {text.popup_button[2]}
              </Button>
            </div>
          </div>
        </ModalCustom>
      </CardBody>
      <CardFooter className={classes.flex_end}>
        <Button color="gray" onClick={() => handleSubmit()}>
          {text.buttons[1]}
        </Button>
        <Button color="primary" onClick={() => handleSubmit()}>
          {text.buttons[2]}
        </Button>
      </CardFooter>
    </Card>
  );
}

FlashSaleDetailPage.layout = Admin;

export default WithAuthentication(FlashSaleDetailPage);
