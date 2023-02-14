import moment from "moment";
import React, { useEffect, useState } from "react";
import "react-light-notifications/lib/main.css";
import { useSelector } from "react-redux";
// @material-ui/core components

import {
  grayColor
} from "assets/jss/natcash.js";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import {
  Checkbox, FormControl, InputAdornment, makeStyles, MenuItem, OutlinedInput, Radio, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, withStyles
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
import FormCellCustom from "components/FormCustom/FormCellCustom.js";
import FormGroupCustom from "components/FormCustom/FormGroupCustom.js";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";

import { formatCurrency } from "../../../utilities/utils";

import imgBuy from "assets/img/buy.png";
import imgGift from "assets/img/gift.png";
import styles from "assets/jss/natcash/views/dealshock/addDealShockStyle.js";
import Switch from "components/CustomSwitch/Switch.js";
import ModalCustom from "components/ModalCustom/ModalCustom.js";
import { useRouter } from "next/router";

function DealShockDetailPage() {
  const useStyles = makeStyles(styles);
  const router = useRouter();
  const { id } = router.query;
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
  const [isShowModal, setIsShowModal] = useState(false);

  const [filterType, setFilterType] = useState("name");

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checked, setChecked] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [addedType, setAddedType] = useState("");
  const [deleteType, setdeleteType] = useState("");
  const [filterValue1, setFilterValue1] = useState("");
  const [filterValue2, setFilterValue2] = useState("");
  const [filterValue3, setFilterValue3] = useState("");
  const [isCheckAll_2, setIsCheckAll_2] = useState(false);
  const [checked_2, setChecked_2] = useState([]);
  const [isCheckAll_3, setIsCheckAll_3] = useState(false);
  const [checked_3, setChecked_3] = useState([]);

  const [values, setValues] = React.useState({
    deal_type: "all",
    promotion_name: "",
    time_from: moment().format("yyyy-MM-DDThh:mm"),
    time_to: moment().add(1, "hours").format("yyyy-MM-DDThh:mm"),
    limited_order: "",
    condition_price: "",
    condition_quantity: "",

    main_product: [],
    sub_product: [],
  });
  const [dataReal, setDataReal] = useState([
    {
      id: 312313,
      deal_type: "buyToGift",
      promotion_name: "Mua 1 tặng 1",
      time_from: "2021-09-14T07:16:50",
      time_to: "2021-09-15T08:16:50",
      limited_order: "10",
      condition_price: "1000",
      condition_quantity: "5",

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
          status: true,
          limited_order: 20,

          classified: [
            {
              type: "Số 0( 0-1 tuổi)",
              price: 436650,
              decrease_price: 400000,
              decrease_percent: 10,
              stock: 10,
              promotion_quantity: 10,
              status: true,
            },
            {
              type: "(Số 3T)",
              price: 560000,
              decrease_price: 500000,
              decrease_percent: 12,
              stock: 10,
              stock: 10,
              promotion_quantity: "",
              status: false,
            },
          ],
        },

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
              decrease_percent: 10,
              stock: 10,
              promotion_quantity: 10,
              status: true,
            },
            {
              type: "(Số 3T)",
              price: 560000,
              decrease_price: 500000,
              decrease_percent: 12,
              stock: 10,
              stock: 10,
              promotion_quantity: "",
              status: false,
            },
          ],
        },
      ],
      sub_product: [
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
              decrease_percent: 10,
              stock: 10,
              stock: 10,
              promotion_quantity: 10,
              status: true,
            },
            {
              type: "(Số 3T)",
              price: 560000,
              decrease_price: 500000,
              decrease_percent: 10,
              stock: 10,
              promotion_quantity: "",
              status: false,
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

          classified: [
            {
              type: "Số 0( 0-1 tuổi)",
              price: 436650,
              decrease_price: 400000,
              decrease_percent: 10,
              stock: 10,
              stock: 10,
              promotion_quantity: 10,
              status: true,
            },
            {
              type: "(Số 3T)",
              price: 560000,
              decrease_price: 500000,
              decrease_percent: 10,
              stock: 10,
              stock: 10,
              promotion_quantity: "",
              status: false,
            },
          ],
        },
      ],
    },
    {
      id: 124122,
      deal_type: "all",
      promotion_name: "Mua 1 tặng 1",
      time_from: "2021-09-14T07:16:50",
      time_to: "2021-09-15T08:16:50",
      limited_order: "10",
      condition_price: "1000",
      condition_quantity: "5",

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
          status: true,
          limited_order: 20,

          classified: [
            {
              type: "Số 0( 0-1 tuổi)",
              price: 436650,
              decrease_price: 400000,
              decrease_percent: 10,
              stock: 10,
              promotion_quantity: 10,
              status: true,
            },
            {
              type: "(Số 3T)",
              price: 560000,
              decrease_price: 500000,
              decrease_percent: 12,
              stock: 10,
              stock: 10,
              promotion_quantity: "",
              status: false,
            },
          ],
        },

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
              decrease_percent: 10,
              stock: 10,
              promotion_quantity: 10,
              status: true,
            },
            {
              type: "(Số 3T)",
              price: 560000,
              decrease_price: 500000,
              decrease_percent: 12,
              stock: 10,
              stock: 10,
              promotion_quantity: "",
              status: false,
            },
          ],
        },
      ],
      sub_product: [
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
              decrease_percent: 10,
              stock: 10,
              stock: 10,
              promotion_quantity: 10,
              status: true,
            },
            {
              type: "(Số 3T)",
              price: 560000,
              decrease_price: 500000,
              decrease_percent: 10,
              stock: 10,
              promotion_quantity: "",
              status: false,
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

          classified: [
            {
              type: "Số 0( 0-1 tuổi)",
              price: 436650,
              decrease_price: 400000,
              decrease_percent: 10,
              stock: 10,
              stock: 10,
              promotion_quantity: 10,
              status: true,
            },
            {
              type: "(Số 3T)",
              price: 560000,
              decrease_price: 500000,
              decrease_percent: 10,
              stock: 10,
              stock: 10,
              promotion_quantity: "",
              status: false,
            },
          ],
        },
      ],
    },
  ]);
  const upcoming = values.status == "Upcoming" ? false : true;
  const all = true;

  useEffect(() => {
    dataReal?.map((item, index) => {
      if (item.id == id) {
        setValues(item);
      }
    });
  }, []);
  const language = useSelector((state) => state.app.language);

  const TABLE_HEAD = [
    {
      id: "en",
      value: [
        "Product",
        "Current selling price ",
        "Quantity",
        "Shipping Information",
        "Status",
      ],
    },
    {
      id: "vi",
      value: [
        "Sản phẩm",
        "Giá bán hiện tại",
        "Số Lượng Hàng",
        "Thông tin vận chuyển",
        "Trạng thái",
      ],
    },
  ];
  const TABLE_HEAD_2 = [
    {
      id: "en",
      value: [
        "Product",
        "Current selling price ",
        "Quantity",
        "Shipping Information",
      ],
    },
    {
      id: "vi",
      value: [
        "Sản phẩm",
        "Giá bán hiện tại",
        "Số Lượng Hàng",
        "Thông tin vận chuyển",
      ],
    },
  ];
  const TABLE_HEAD_3 = [
    {
      id: "en",
      value: [
        "Product",
        "Original price",
        "Price drops later",
        "Discount",
        "Stock",
        "Promotion quantity",
        "Order Quantity",
        "On/Off",
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
        "Số lượng đặt hàng",
        "Bật/Tắt",
      ],
    },
  ];
  const TABLE_HEAD_4 = [
    {
      id: "en",
      value: ["Product", "Original price", "Price drops later", "Discount"],
    },
    {
      id: "vi",
      value: ["Sản phẩm", "Giá gốc", "Giá sau giảm", "Giảm giá"],
    },
  ];
  const FORM_GROUP_CUSTOM = [
    {
      id: "en",
      value: ["Basic information", "Main Products", "Bundled Products"],
      subTitle: [
        "The maximum amount of each customer can buy is 100 main products in the same program Shock Deal ",
        "Buyers can enjoy products with promotional prices when they purchase any major product ",
        "product is on, on total ",
        " product",
      ],
    },
    {
      id: "vi",
      value: ["Thông tin cơ bản", "Sản Phẩm Chính", "Sản Phẩm Mua Kèm"],
      subTitle: [
        "Số lượng tối đa mỗi khách được mua là 100 sản phẩm chính trong cùng 1 chương trình Mua Kèm Deal Sốc",
        "Người mua có thể tận hưởng các sản phẩm mua kèm giá khuyến mãi khi họ mua bất kỳ sản phẩm chính nào",
        "sản phẩm được bật, trên tổng ",
        " sản phẩm",
      ],
    },
  ];

  const FORM_CELL_CUSTOM = [
    {
      id: "en",
      value: [
        "Type Deal Shock",
        "Program name Buy With Shock Deal",
        "Time",
        "Voucher Limited product bundles ",
      ],
    },
    {
      id: "vi",
      value: [
        "Loại Deal Sốc",
        "Tên chương trình Mua Kèm Deal Sốc",
        "Thời gian",
        "Giới hạn sản phẩm mua kèm",
      ],
    },
  ];
  const FORM_CELL_CUSTOM_2 = [
    {
      id: "en",
      value: [
        "Type Deal Shock",
        "Program Name Buy To Receive Gifts",
        "Time",
        "Conditions for receiving gifts ",
      ],
    },
    {
      id: "vi",
      value: [
        "Loại Deal Sốc",
        "Tên chương trình Mua Để Nhận Quà",
        "Thời gian",
        "Điều kiện nhận quà",
      ],
    },
  ];
  const HELPER_TEXT = [
    {
      id: "en",
      value: [
        "Voucher name not visible to buyers",
        "The program end time must be at least 1 hour after the start time when the program has been created, the show time can only be adjusted to shorten.",
        "The maximum number of shock deal products per customer is allowed to purchase with each order.",
      ],
    },
    {
      id: "vi",
      value: [
        "Tên mã giảm giá không hiển thị với người mua",
        "Thời gian kết thúc chương trình phải sau thời gian bắt đầu tối thiểu 1 tiếng khi chương trình đã được tạo, thời gian chương trình diễn ra chỉ có thể được điều chỉnh để rút ngắn.",
        "Số lượng tối đa sản phẩm deal sốc mỗi khách được phép mua kèm cho mỗi đơn hàng.",
      ],
    },
  ];
  const HELPER_TEXT_2 = [
    {
      id: "en",
      value: [
        "Program name Buy to receive gifts is not visible to buyers",
        "Buy",
        "to receive ",
        "gift",
      ],
    },
    {
      id: "vi",
      value: [
        "Tên chương trình Mua để nhận quà không hiển thị với người mua",
        "Mua ",
        " để nhận ",
        " quà tặng",
      ],
    },
  ];
  const APPLICABLE_PRODUCTS = [
    {
      id: "en",
      value: ["All products", "Added products"],
    },
    {
      id: "vi",
      value: ["Tất cả sản phẩm", "Sản phẩm được chọn"],
    },
  ];
  const BATCH_SETTING = [
    {
      id: "en",
      text: ["Batch setting", "selected products"],
      button: ["Disable", "Active", "Delete", "Update"],
      field: [
        "Promotion",
        "Quantity of promotional products",
        "Maximum purchase limit per customer",
      ],
      select: ["Unchanged", "Unlimited", "Limited"],
    },
    {
      id: "vi",
      text: ["Thiết lập hàng loạt", "sản phẩm đã chọn"],
      button: ["Vô hiệu hóa", "Kích hoạt", "Xóa", "Cập nhật"],
      field: [
        "Khuyến mãi",
        "Số lượng sản phẩm khuyến mãi",
        "Giới hạn mua tối đa của mỗi khách hàng",
      ],
      select: ["Không thay đổi", "Không giới hạn", "Giới hạn"],
    },
  ];
  const ACTIONS = [
    {
      id: "en",
      button: [
        "Buy With Shock Deal",
        "Buy To Receive Gifts",
        "Add product",
        "Cancel",
        "Confirm",
      ],
      radio: [
        "Promotion",
        "Refund Coins",
        "Limit",
        "Unlimited",
        "Show multiple places",
        "Share via voucher code",
        "Channels",
        "Not Public",
      ],
      select: ["By amount", "By percent"],
    },
    {
      id: "vi",
      button: [
        "Mua Kèm Deal Sốc",
        "Mua Để Nhận Quà",
        "Thêm sản phẩm",
        "Hủy",
        "Xác nhận",
      ],
      radio: [
        "Khuyến mãi",
        "Hoàn xu",
        "Giới hạn",
        "Không giới hạn",
        "Hiển thị nhiều nơi",
        "Chia sẻ thông qua mã voucher",
        "Các kênh",
        "Không công khai",
      ],
      select: ["Theo số tiền", "Theo phần trăm"],
    },
  ];

  const POPUP = [
    {
      id: "en",
      title: "Add products",
      button: ["Search", "Reset", "Confirm"],
      select: ["By amount", "By percent"],
    },
    {
      id: "vi",
      title: "Thêm sản phẩm",
      button: ["Tìm", "Nhập lại", "Xác nhận"],
      select: ["Theo số tiền", "Theo phần trăm"],
    },
  ];

  const checkBoxChannels = [
    {
      name: "Shopee Live",
      value: "live",
    },
    {
      name: "Shopee Feed",
      value: "feed",
    },
  ];

  const listText = [
    {
      id: "en",
      title: "Create Deal Shock",
      form_group_custom_subtitle: FORM_GROUP_CUSTOM[0].subTitle,
      tableHead: TABLE_HEAD[0].value,
      tableHead_2: TABLE_HEAD_2[0].value,
      tableHead_3: TABLE_HEAD_3[0].value,
      tableHead_4: TABLE_HEAD_4[0].value,
      form_group_custom: FORM_GROUP_CUSTOM[0].value,
      form_cell_custom: FORM_CELL_CUSTOM[0].value,
      form_cell_custom_2: FORM_CELL_CUSTOM_2[0].value,
      helper_text: HELPER_TEXT[0].value,
      helper_text_2: HELPER_TEXT_2[0].value,
      placeholder: ["Enter here", "Quantity less than 50 "],
      applicable_products_text: APPLICABLE_PRODUCTS[0].value,
      buttons: ACTIONS[0].button,
      radios: ACTIONS[0].radio,
      selects: ACTIONS[0].select,
      popup_title: POPUP[0].title,
      popup_button: POPUP[0].button,
      popup_select: POPUP[0].select,
      batch_setting: BATCH_SETTING[0],
    },
    {
      id: "vi",
      title: "Tạo Deal Sốc",
      form_group_custom_subtitle: FORM_GROUP_CUSTOM[1].subTitle,
      tableHead: TABLE_HEAD[1].value,
      tableHead_2: TABLE_HEAD_2[1].value,
      tableHead_3: TABLE_HEAD_3[1].value,
      tableHead_4: TABLE_HEAD_4[1].value,
      form_group_custom: FORM_GROUP_CUSTOM[1].value,
      form_cell_custom: FORM_CELL_CUSTOM[1].value,
      form_cell_custom_2: FORM_CELL_CUSTOM_2[1].value,
      helper_text: HELPER_TEXT[1].value,
      helper_text_2: HELPER_TEXT_2[1].value,
      placeholder: ["Nhập vào", "Số lượng ít hơn 50"],
      applicable_products_text: APPLICABLE_PRODUCTS[1].value,
      buttons: ACTIONS[1].button,
      radios: ACTIONS[1].radio,
      selects: ACTIONS[1].select,
      popup_title: POPUP[1].title,
      popup_button: POPUP[1].button,
      popup_select: POPUP[1].select,
      batch_setting: BATCH_SETTING[1],
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

  //change value input form
  const handleChangeValue = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handelSubmit = () => {
    setValues({
      ...values,
      ["voucher_code"]: "SHOP" + values.voucher_code,
    });
  };

  const CustomRadio = withStyles({
    root: {
      color: "gray",
      "&$checked": {
        color: "#f96606",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  const handleChangeCodeType = (value) => {
    setValues({ ...values, ["deal_type"]: value, display: "many" });
  };

  const handleChangeFilterType = (event) => {
    setFilterType(event.target.value);
  };


  const handleChangeFilterValue1 = (event) => {
    setFilterValue1(event.target.value);
  };
  const handleChangeFilterValue2 = (event) => {
    setFilterValue2(event.target.value);
  };
  const handleChangeFilterValue3 = (event) => {
    setFilterValue3(event.target.value);
  };
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

      classified: [
        {
          type: "Số 0( 0-1 tuổi)",
          price: 436650,
          decrease_price: 400000,
          decrease_percent: 10,
          stock: 10,
          promotion_quantity: 10,
          status: true,
        },
        {
          type: "(Số 3T)",
          price: 560000,
          decrease_price: 500000,
          decrease_percent: 12,
          stock: 10,
          stock: 10,
          promotion_quantity: "",
          status: false,
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
          decrease_percent: 10,
          stock: 10,
          stock: 10,
          promotion_quantity: 10,
          status: true,
        },
        {
          type: "(Số 3T)",
          price: 560000,
          decrease_price: 500000,
          decrease_percent: 10,
          stock: 10,
          promotion_quantity: "",
          status: false,
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

      classified: [
        {
          type: "Số 0( 0-1 tuổi)",
          price: 436650,
          decrease_price: 400000,
          decrease_percent: 10,
          stock: 10,
          stock: 10,
          promotion_quantity: 10,
          status: true,
        },
        {
          type: "(Số 3T)",
          price: 560000,
          decrease_price: 500000,
          decrease_percent: 10,
          stock: 10,
          stock: 10,
          promotion_quantity: "",
          status: false,
        },
      ],
    },
  ]);

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
      setChecked_2(values.main_product);
    }
  };
  const handleCheckAll_3 = () => {
    if (isCheckAll_3) {
      setIsCheckAll_3(false);
      setChecked_3([]);
    } else {
      setIsCheckAll_3(true);
      setChecked_3(values.sub_product);
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
  const handleToggle_3 = (item) => {
    const currentIndex_3 = checked_3.indexOf(item);
    const newChecked_3 = [...checked_3];
    if (currentIndex_3 === -1) {
      newChecked_3.push(item);
    } else {
      setIsCheckAll_3(false);
      newChecked_3.splice(currentIndex_3, 1);
    }
    setChecked_3(newChecked_3);
  };

  const handleSwitch = (item) => {
    // on - off
    var index = values.main_product.indexOf(item);
    let cloneData = [...values.main_product];

    let cloneItem = { ...cloneData[index] };
    cloneItem.status = !cloneItem.status;

    cloneData[index] = cloneItem;
    setValues({ ...values, ["main_product"]: cloneData });
    setIsCheckAll_2(false);

    const currentIndex_2 = checked_2.indexOf(item);
    const newChecked_2 = [...checked_2];
    if (currentIndex_2 !== -1) {
      newChecked_2.splice(currentIndex_2, 1);
    }
    setChecked_2(newChecked_2);
  };
  const handleChangeClassifiedValue = (item, stt, value, type) => (event) => {
    let data = [...values.sub_product];
    let cloneData = [...data[stt].classified];
    let index = values.sub_product[stt].classified.indexOf(item);
    let cloneItem = { ...cloneData[index] };
    if (type == "bool") {
      cloneItem[value] = event.target.checked;
    } else {
      cloneItem[value] = event.target.value;
    }
    cloneData[index] = cloneItem;
    data[stt].classified = cloneData;
    setValues({ ...values, ["sub_product"]: data });
    setIsCheckAll_2(false);
    setChecked_2([]);
  };
  const handleDisableProductMain = () => {
    let cloneData = [...values.main_product];
    checked_2.map((item) => {
      var index = values.main_product.indexOf(item);
      let cloneItem = { ...cloneData[index] };
      cloneItem.status = false;
      cloneData[index] = cloneItem;
    });
    setValues({ ...values, ["main_product"]: cloneData });
    setIsCheckAll_2(false);
    setChecked_2([]);
  };
  const handleActiveProductMain = () => {
    let cloneData = [...values.main_product];
    checked_2.map((item) => {
      var index = values.main_product.indexOf(item);
      let cloneItem = { ...cloneData[index] };
      cloneItem.status = true;
      cloneData[index] = cloneItem;
    });
    setValues({ ...values, ["main_product"]: cloneData });
    setIsCheckAll_2(false);
    setChecked_2([]);
  };
  const addProductType = (type) => {
    setValues({ ...values, [type]: checked }), setIsShowModal(false);
  };
  const handleDeleteProductMain = (type) => {
    const newChecked = [...checked];
    if (type == "main_product") {
      let cloneData = [...values.main_product];

      checked_2.map((item) => {
        // remove obj form arr
        var index = values.main_product.indexOf(item);
        if (checked_2.length < values.main_product.length) {
          cloneData.splice(index, 1);
        } else {
          cloneData = [];
        }
        const currentIndex = checked.indexOf(item);
        if (currentIndex === -1) {
          newChecked.push(item);
        } else {
          setIsCheckAll(false);
          newChecked.splice(currentIndex, 1);
        }
      });

      setValues({
        ...values,
        ["main_product"]: cloneData,
      });
      setIsCheckAll_2(false);
      setChecked_2([]);
    }
    else {
      let cloneData = [...values.sub_product];

      checked_3.map((item) => {
        // remove obj form arr
        var index = values.sub_product.indexOf(item);
        if (checked_3.length < values.sub_product.length) {
          cloneData.splice(index, 1);
        } else {
          cloneData = [];
        }
        const currentIndex = checked.indexOf(item);
        if (currentIndex === -1) {
          newChecked.push(item);
        } else {
          setIsCheckAll(false);
          newChecked.splice(currentIndex, 1);
        }
      });

      setValues({
        ...values,
        ["sub_product"]: cloneData,
      });
      setIsCheckAll_3(false);
      setChecked_3([]);
    }
    // remove item checked


    setChecked(newChecked);
  };


  const handleUpdateProductSub = () => {
    let data = [...values.sub_product];
    checked_2.map((item, stt) => {
      let cloneData = [...data[stt].classified];
      data[stt].classified.map((props, number) => {
        let index = values.sub_product[stt].classified.indexOf(props);
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
    setValues({ ...values, ["sub_product"]: data });
    setIsCheckAll_2(false);
    setChecked_2([]);
  };
  const handleChangeLimiterOrderItem = (item) => (event) => {
    let cloneData = [...values.sub_product];
    var index = values.sub_product.indexOf(item);
    let cloneItem = { ...cloneData[index] };
    cloneItem.limited_order = event.target.value;
    cloneData[index] = cloneItem;
    setValues({ ...values, ["sub_product"]: cloneData });
    setIsCheckAll_2(false);
    setChecked_2([]);
  };

  const [batchSetting, setBatchSetting] = React.useState({
    discount: "",
    quantity_type: "unchanged",
    quantity_value: "",
    limit_type: "unchanged",
    limit_value: "",
  });
  //change value batch setting
  const handleChangeBatchSetting = (prop) => (event) => {
    setBatchSetting({ ...batchSetting, [prop]: event.target.value });
  };
  //batchSettings Sản Phẩm Chính
  const BatchSetting = () => {
    return (
      <div className={classes.batchSetting}>
        <div className={classes.batchSettingText}>
          <p className={classes.batchSettingText_Title}>
            {text.batch_setting.text[0]}
          </p>
          <p className={classes.batchSettingText_subTitle}>
            {checked_2.length} {text.batch_setting.text[1]}
          </p>
        </div>
        <div className={classes.batchSettingAction}>
          <Button onClick={() => handleDisableProductMain()}>
            {text.batch_setting.button[0]}
          </Button>
          <Button onClick={() => handleActiveProductMain()}>
            {text.batch_setting.button[1]}
          </Button>
          <Button
            onClick={() => { setdeleteType("main_product"), handleDeleteProductMain(deleteType) }}>
            {text.batch_setting.button[2]}
          </Button>
        </div>
      </div>
    );
  };
  //batchSettings Sản Phẩm Mua Kèm
  const BatchSettings = () => {
    return (
      <div className={classes.batchSetting}>
        <div className={classes.batchSettingText}>
          <p className={classes.batchSettingText_Title}>
            {text.batch_setting.text[0]}
          </p>
          <p className={classes.batchSettingText_subTitle}>
            {checked_3.length} {text.batch_setting.text[1]}
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
                placeholder={text.placeholder[0]}
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
                      placeholder={text.placeholder[0]}
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
                      placeholder={text.placeholder[0]}
                    />
                  </FormControl>
                )}
              </div>
            </div>
          </div>
          <div
            className={
              classes.batchSettingValue_margin + " " + classes.flex_center
            }
          >
            <Button color="primary" onClick={() => handleUpdateProductSub()}>
              {text.batch_setting.button[3]}
            </Button>
            <Button onClick={() => { setdeleteType("sub_product"), handleDeleteProductMain(deleteType) }}>
              {text.batch_setting.button[2]}
            </Button>
          </div>
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
              //checked={checked.indexOf(item) !== -1}
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
              </div>
            </div>
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"OriginalPrice"}>
            {formatCurrency(item.original_price)}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"Quantity"}>
            {item.quantity}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"shipping_info"}>
            {item.shipping_info}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  const renderTable = (item, index) => {
    return (
      <TableRow key={index} className={tableClasses.tableBodyRow}>
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
        <TableCell
          className={tableClasses.tableCell + " " + tableClasses.cellWidth_400}
          key={"Product2"}
        >
          <div className={classes.cellInfo}>
            <img src={item.avatar} className={classes.tableImage} />
            <div className={classes.infoTextContainer}>
              <p className={classes.text + " " + classes.infoTextPrimary}>
                {item.name}
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"OriginalPrice2"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {formatCurrency(item.original_price)}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Quantity2"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.quantity}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"shipping_info2"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.shipping_info}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Status2"}>
          <Switch
            checked={item.status}
            onChange={() => handleSwitch(item)}
            name="checkedA"
          />
        </TableCell>
      </TableRow>
    );
  };

  const renderTable1 = (item, index) => {
    return (
      <>
        <TableRow
          className={tableClasses.tableBodyRow}
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <TableCell className={tableClasses.tableCell}>
            <Checkbox
              checked={checked_3.indexOf(item) !== -1}
              tabIndex={-1}
              onClick={() => handleToggle_3(item)}
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
                value={values.sub_product[index].limited_order}
                onChange={handleChangeLimiterOrderItem(item)}
                autoComplete="off"
                type="number"
                placeholder={text.placeholder[0]}
                className={classes.FieldMaxWidth}
              />
            </FormControl>
          </TableCell>
          <TableCell className={tableClasses.tableCell}></TableCell>
        </TableRow>
        <TableRow className={tableClasses.tableBodyRow}>
          <TableCell className={tableClasses.tableCell}></TableCell>
          <TableCell className={tableClasses.tableCell}>
            {values.sub_product[index].classified.map((props, stt) => {
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
            {values.sub_product[index].classified.map((props, stt) => {
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
            {values.sub_product[index].classified.map((props, stt) => {
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

                    endAdornment={<InputAdornment position="end">₫</InputAdornment>}
                    autoComplete="off"
                    type="number"
                    placeholder={text.placeholder[0]}
                    className={
                      classes.FieldMaxWidth + " " + classes.classifiedMargin2
                    }
                  />
                </FormControl>
              );
            })}
          </TableCell>
          <TableCell
            className={tableClasses.tableCell}
            style={{ paddingRight: "20px" }}
          >
            {values.sub_product[index].classified.map((props, stt) => {
              return <p>Hoặc</p>;
            })}
          </TableCell>
          <TableCell className={tableClasses.tableCell}>
            {values.sub_product[index].classified.map((props, stt) => {
              return (
                <FormControl
                  component="fieldset"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <OutlinedInput
                    id="outlined-adornment-amount-5"
                    value={props.decrease_percent}
                    onChange={handleChangeClassifiedValue(
                      props,
                      index,
                      "decrease_percent"
                    )}
                    endAdornment={<InputAdornment position="start">%</InputAdornment>}
                    autoComplete="off"
                    type="number"
                    placeholder={text.placeholder[0]}
                    className={
                      classes.FieldMaxWidth + " " + classes.classifiedMargin2
                    }
                  />
                </FormControl>
              );
            })}
          </TableCell>
          <TableCell className={tableClasses.tableCell}>
            {values.sub_product[index].classified.map((props, stt) => {
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
            {values.sub_product[index].classified.map((props, stt) => {
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
                    placeholder={text.placeholder[0]}
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
            {values.sub_product[index].classified.map((props, stt) => {
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

  const TableData = () => {
    return (
      <div className={tableClasses.tableResponsive}>
        <Table className={tableClasses.table + " " + tableClasses.tableCustom}>
          {values.main_product !== undefined ? (
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
            {values.main_product?.map((item, index) => {
              return renderTable(item, index);
            })}
          </TableBody>
        </Table>
      </div>
    );
  };
  const TableData1 = () => {
    return (
      <div className={tableClasses.tableResponsive}>
        <Table className={tableClasses.table + " " + tableClasses.tableCustom}>
          {values.sub_product !== undefined ? (
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
                    checked={isCheckAll_3}
                    tabIndex={-1}
                    onClick={() => handleCheckAll_3()}
                    checkedIcon={<Check className={taskClasses.checkedIcon} />}
                    icon={<Check className={taskClasses.uncheckedIcon} />}
                    classes={{
                      checked: taskClasses.checked,
                      root: taskClasses.root,
                    }}
                  />
                </TableCell>
                {text.tableHead_3.map((prop, key) => {
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
            {values.sub_product?.map((item, index) => {
              return renderTable1(item, index);
            })}
          </TableBody>
        </Table>
      </div>
    );
  };
  const FormGroupCustom_1 = () => {
    return (
      <FormGroupCustom title={text.form_group_custom[0]}>
        {/* Code Type */}
        <FormCellCustom label={text.form_cell_custom[0]}>
          <div className={classes.formCell}>
            <Button
              color={"white"}
              justIcon={false}
              className={
                values.deal_type == "all"
                  ? classes.itemsContainer
                  : classes.itemsContainer + " " + classes.itemsContainer_active
              }
              onClick={() => handleChangeCodeType("all")}
              disabled={all}
            >
              <img className={classes.btnImg} src={imgBuy} />
              <p className={classes.text}>{text.buttons[0]}</p>
            </Button>
            <Button
              color={"white"}
              justIcon={false}
              className={
                values.deal_type == "buyToGift"
                  ? classes.itemsContainer
                  : classes.itemsContainer + " " + classes.itemsContainer_active
              }
              onClick={() => handleChangeCodeType("buyToGift")}
              disabled={all}
            >
              <img className={classes.btnImg} src={imgGift} />
              <p className={classes.text}>{text.buttons[1]}</p>
            </Button>
          </div>
        </FormCellCustom>
        {/* Promotion Name */}
        {values.deal_type == "all" && (
          <FormCellCustom
            label={text.form_cell_custom[1]}
            helperText={text.helper_text[0]}
          >
            <div className={classes.formCell}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={""}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.promotion_name,
                  onChange: handleChangeValue("promotion_name"),
                }}
                placeholder={text.placeholder[0]}
                autoComplete="off"
                disabled={upcoming}
              />
            </div>
          </FormCellCustom>
        )}

        {values.deal_type == "buyToGift" && (
          <FormCellCustom
            label={text.form_cell_custom_2[1]}
            helperText={text.helper_text_2[0]}
          >
            <div className={classes.formCell}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={""}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.promotion_name,
                  onChange: handleChangeValue("promotion_name"),
                }}
                placeholder={text.placeholder[0]}
                autoComplete="off"
                disabled={upcoming}
              />
            </div>
          </FormCellCustom>
        )}
        {/* time */}
        <FormCellCustom
          label={text.form_cell_custom[2]}
          helperText={text.helper_text[1]}
          style={{
            margin: "0 15px",
            width: "15px",
            height: "2px",
          }}
        >
          <div className={classes.formCell + " " + classes.flex_center}>
            <TextField
              id="datetime-local"
              // label="Next appointment"
              type="datetime-local"
              value={values.time_from}
              onChange={handleChangeValue("time_from")}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={upcoming}
            />
            <span
              style={{
                margin: "0 15px",
                width: "15px",
                height: "2px",
                backgroundColor: grayColor[0],
                display: "block",
              }}
            ></span>
            <TextField
              id="datetime-local"
              // label="Next appointment"
              type="datetime-local"
              value={values.time_to}
              onChange={handleChangeValue("time_to")}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={upcoming}
            />
          </div>
        </FormCellCustom>
        {/* limited_order */}
        {values.deal_type == "all" && (
          <FormCellCustom
            label={text.form_cell_custom[3]}
            helperText={text.helper_text[2]}
          >
            <div className={classes.formCell}>
              <TextField
                id="input1"
                label={""}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.limited_order,
                  onChange: handleChangeValue("limited_order"),
                }}
                type="number"
                placeholder={text.placeholder[0]}
                autoComplete="off"
                disabled={upcoming}
              />
            </div>
          </FormCellCustom>
        )}
        {values.deal_type == "buyToGift" && (
          <FormCellCustom label={text.form_cell_custom_2[3]}>
            <div className={classes.formCell + " " + classes.transportFlex}>
              <FormControl component="fieldset" size="small">
                <div className={classes.flex_center}>
                  <span className={classes.text_2}>
                    {text.helper_text_2[1]}
                  </span>
                  <OutlinedInput
                    id="outlined-adornment-amount-5"
                    value={values.condition_price}
                    onChange={handleChangeValue("condition_price")}
                    endAdornment={
                      <InputAdornment position="end">₫</InputAdornment>
                    }
                    type="number"
                    autoComplete="off"
                    disabled={upcoming}
                  />
                  <span className={classes.text_2}>
                    {text.helper_text_2[2]}
                  </span>

                  <OutlinedInput
                    id="outlined-adornment-amount-5"
                    value={values.condition_quantity}
                    onChange={handleChangeValue("condition_quantity")}
                    type="number"
                    autoComplete="off"
                    placeholder={text.placeholder[1]}
                    disabled={upcoming}
                  />
                  <span className={classes.text_2}>
                    {text.helper_text_2[3]}
                  </span>
                </div>
              </FormControl>
            </div>
          </FormCellCustom>
        )}
      </FormGroupCustom>
    );
  };

  const FormGroupCustom_2 = () => {
    return (
      <FormGroupCustom
        title={text.form_group_custom[1]}
        subTitle={text.form_group_custom_subtitle[0]}
        subTitle_2={
          values.main_product?.length +
          " " +
          text.form_group_custom_subtitle[2] +
          " 3" +
          text.form_group_custom_subtitle[3]
        }
        hasButton={true}
        btnTitle={text.buttons[2]}
        onClick={() => {
          setIsShowModal(true), setAddedType("main_product");

        }}
        subContainer={
          <div>
            <TextField
              //   error={validateItemName ? false : true}
              id="input1"
              label={""}
              variant="outlined"
              size="small"
              width="400px"
              inputProps={{
                value: filterValue1,
                onChange: handleChangeFilterValue1,
              }}
              className={classes.search}
              placeholder={text.placeholder[0]}
              autoComplete="off"
            />
            <Button color="primary">{text.popup_button[0]}</Button>
          </div>
        }
      >
        {values.main_product.length > 0 && (
          <>
            {BatchSetting()}
            {TableData()}
          </>
        )}
        <ModalCustom
          width={1000}
          title={text.popup_title}
          subTitle={""}
          isShow={true}
          isShow={isShowModal}
          handleClose={() => setIsShowModal(false)}
        >
          <div className={classes.flex_center}>
            <FormControl variant="outlined" size="small">
              <Select
                labelId="select-outlined-label-1"
                id="select-outlined"
                value={filterType}
                onChange={handleChangeFilterType}
              >
                <MenuItem value={"name"}>{text.popup_select[0]}</MenuItem>
                <MenuItem value={"id"}>{text.popup_select[1]}</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small" style={{ flex: 1 }}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={""}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: filterValue2,
                  onChange: handleChangeFilterValue2,
                }}
                placeholder={text.placeholder[0]}
                autoComplete="off"
                style={{ flex: 1 }}
              />
            </FormControl>
            <div style={{ marginLeft: "10px" }}>
              <Button color="primary">{text.popup_button[0]}</Button>
              <Button color="gray">{text.popup_button[1]}</Button>
            </div>
          </div>
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
              <Button color="primary" onClick={() => addProductType(addedType)}>
                {text.popup_button[2]}
              </Button>
            </div>
          </div>
        </ModalCustom>
      </FormGroupCustom>
    );
  };

  const FormGroupCustom_3 = () => {
    return (
      <div>
        {" "}
        {values.main_product.length > 0 && (
          <FormGroupCustom
            title={text.form_group_custom[2]}
            subTitle={text.form_group_custom_subtitle[1]}
            subTitle_2={
              values.sub_product?.length +
              " " +
              text.form_group_custom_subtitle[2] +
              " 1" +
              text.form_group_custom_subtitle[3]
            }
            hasButton={true}
            btnTitle={text.buttons[2]}
            onClick={() => {
              setIsShowModal(true), setAddedType("sub_product");
            }}
            subContainer={
              <div>
                <TextField
                  //   error={validateItemName ? false : true}
                  id="input2"
                  label={""}
                  variant="outlined"
                  size="small"
                  width="400px"
                  inputProps={{
                    value: filterValue3,
                    onChange: handleChangeFilterValue3,
                  }}
                  className={classes.search}
                  placeholder={text.placeholder[0]}
                  autoComplete="off"
                />
                <Button color="primary">{text.popup_button[0]}</Button>
              </div>
            }
          >
            {values.sub_product.length > 0 && (
              <>
                {BatchSettings()}
                {TableData1()}
              </>
            )}
          </FormGroupCustom>
        )}
      </div>
    );
  };
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{text.title}</h4>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        {FormGroupCustom_1()}
        {FormGroupCustom_2()}
        {FormGroupCustom_3()}
      </CardBody>
      <CardFooter className={classes.flex_end}>
        <Button color="gray" onClick={() => handelSubmit()}>
          {text.buttons[3]}
        </Button>
        <Button color="primary" onClick={() => handelSubmit()}>
          {text.buttons[4]}
        </Button>
      </CardFooter>
    </Card>
  );
}

DealShockDetailPage.layout = Admin;

export default WithAuthentication(DealShockDetailPage);
