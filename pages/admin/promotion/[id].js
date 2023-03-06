import React, { useState, useEffect, useCallback } from "react";
import Router from "next/router";
import { setShowLoader } from "../../../redux/actions/app";
import { useSelector, useDispatch } from "react-redux";
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
  TextField,
  OutlinedInput,
  InputAdornment,
  Radio,
  RadioGroup,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Check from "@material-ui/icons/Check";
import DateFnsUtils from "@date-io/date-fns";
import Poppers from "@material-ui/core/Popper";
import SwipeableViews from "react-swipeable-views";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import adminStyles from "assets/jss/natcash/components/headerLinksStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";
import shopStyle from "assets/jss/natcash/views/shoplist/shoplistStyle.js";
import { Icon } from "@material-ui/core";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import vi from "date-fns/locale/vi";
import classNames from "classnames";
import useWindowSize from "components/Hooks/useWindowSize.js";
import FormGroupCustom from "components/FormCustom/FormGroupCustom.js";
import FormCellCustom from "components/FormCustom/FormCellCustom.js";
import PropTypes from "prop-types";
import Switch from "components/CustomSwitch/Switch.js";
import { getChannelData, getProductList, updatePromotionMarketing, getAllPromotionMarketing  } from "../../../utilities/ApiManage";
import { formatCurrency, formatNumber } from "../../../utilities/utils";

import { useRouter } from "next/router";

import imgShop from "assets/img/shop.png";
import imgProduct from "assets/img/product.png";
import ModalCustom from "components/ModalCustom/ModalCustom.js";
import styles from "assets/jss/natcash/views/promotion/addPromotionStyle.js";

function PromotionDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useTableStyles = makeStyles(tableStyles);
  const tableClasses = useTableStyles();
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const language = useSelector((state) => state.app.language);
  // modal add product
  const [isShowModal, setIsShowModal] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checked, setChecked] = useState([]);
  const [isCheckAll_2, setIsCheckAll_2] = useState(false);
  const [checked_2, setChecked_2] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [doFilter, setDoFilter] = useState(false);
  const [changeData, setChangeData] = useState(false);
  //
  const [isChangeFreeShipping, setIsChangeFreeShipping] = useState(false);
  const [channels, setChannels] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  //
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  //
  const [selectedId, setSelectedId] = useState([]);
  //
  const [pStatus, setPStatus] = useState("")
  //
  const [values, setValues] = React.useState({
    shop_id: "",
    promotion_name: "",
    time_from: moment().format("yyyy-MM-DDThh:mm"),
    time_to: moment().add(1, "hours").format("yyyy-MM-DDThh:mm"),
    list_products: [],
  });

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
      value: ["Basic information"],
      subTitle: ["products added"],
    },
    {
      id: "vi",
      value: ["Thông tin cơ bản"],
      subTitle: ["sản phẩm đã thêm"],
    },
  ];

  const FORM_CELL_CUSTOM = [
    {
      id: "en",
      value: ["Promotion name", "Time", "The shop applies the promotion"],
    },
    {
      id: "vi",
      value: [
        "Tên chương trình khuyến mãi",
        "Thời gian",
        "Gian hàng áp dụng khuyến mãi",
      ],
    },
  ];

  const HELPER_TEXT = [
    {
      id: "en",
      value: [
        "Promotion name will not be visible to buyers (150 < characters)",
        "Please select the store where the promotion will be applied",
      ],
    },
    {
      id: "vi",
      value: [
        "Tên chương trình khuyến mãi sẽ không hiển thị với người mua (150 < ký tự)",
        "Vui lòng chọn gian hàng sẽ được áp dụng khuyến mãi",
      ],
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

  const TABLE_HEAD = [
    {
      id: "en",
      value: [
        "Product",
        "Price",
        "Decrease Price",
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
        "Giá",
        "Giá sau giảm",
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
      value: ["Product", "Price", "Stock"],
    },
    {
      id: "vi",
      value: ["Sản phẩm", "Giá", "Kho hàng"],
    },
  ];

  const BATCH_SETTING = [
    {
      id: "en",
      text: ["Batch setting", "selected products"],
      button: ["Update", "Delete"],
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
      button: ["Cập nhật", "Xóa"],
      field: [
        "Khuyến mãi",
        "Số lượng sản phẩm khuyến mãi",
        "Giới hạn mua tối đa của mỗi khách hàng",
      ],
      select: ["Không thay đổi", "Không giới hạn", "Giới hạn"],
    },
  ];

  const BUTTONS = [
    {
      id: "en",
      value: ["Chọn sản phẩm", "Confirm"],
    },
    {
      id: "vi",
      value: ["Select product", "Xác nhận"],
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

  const NOTIFICATIONS = [
    {
      id: "en",
      type: ["Error", "Notification"],
      value: [
        "The shop with the promotion is not valid",
        "Invalid promotion name",
        "Invalid time",
        "No promotional products yet",
        "Stock product must be greater than 0: ",
        "Invalid Promotion Quantity: ",
        "The price after the discount is not valid: ",
        "Invalid product status: ",
      ],
    },
    {
      id: "vi",
      type: ["Lỗi", "Thông báo"],
      value: [
        "Gian hàng áp dụng khuyến mãi không hợp lệ",
        "Tên chương trình không hợp lệ",
        "Thời gian không hợp lệ",
        "Chưa có sản phẩm khuyến mãi",
        "Tồn kho sản phẩm phải lớn hơn 0: ",
        "Số lượng khuyến mãi không hợp lệ: ",
        "Giá sau giảm không hợp lệ: ",
        "Trạng thái sản phẩm không hợp lệ: ",
      ],
    },
  ];

  const listText = [
    {
      id: "en",
      title: "Add new promotion",
      form_group_custom: FORM_GROUP_CUSTOM[0].value,
      form_group_custom_subtitle: FORM_GROUP_CUSTOM[0].subTitle,
      form_cell_custom: FORM_CELL_CUSTOM[0].value,
      helper_text: HELPER_TEXT[0].value,
      placeholder: "Enter here",
      popup_title: POPUP[0].title,
      popup_button: POPUP[0].button,
      popup_select: POPUP[0].select,
      tableHead: TABLE_HEAD[0].value,
      tableHead_2: TABLE_HEAD_2[0].value,
      batch_setting: BATCH_SETTING[0],
      buttons: BUTTONS[0].value,
      shopFilter: SHOP_FILTER[0].value,
      all: "All",
      notifications: NOTIFICATIONS[0],
    },
    {
      id: "vi",
      title: "Thêm chương trình khuyến mãi mới",
      form_group_custom: FORM_GROUP_CUSTOM[1].value,
      form_group_custom_subtitle: FORM_GROUP_CUSTOM[1].subTitle,
      form_cell_custom: FORM_CELL_CUSTOM[1].value,
      helper_text: HELPER_TEXT[1].value,
      placeholder: "Nhập vào",
      popup_title: POPUP[1].title,
      popup_button: POPUP[1].button,
      popup_select: POPUP[1].select,
      tableHead: TABLE_HEAD[1].value,
      tableHead_2: TABLE_HEAD_2[1].value,
      batch_setting: BATCH_SETTING[1],
      buttons: BUTTONS[1].value,
      shopFilter: SHOP_FILTER[1].value,
      all: "Tất cả",
      notifications: NOTIFICATIONS[1],
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

  const [dataProduct, setDataProduct] = useState([]);

  const CustomRadio = withStyles({
    root: {
      color: "gray",
      "&$checked": {
        color: "#f96606",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  const getAllPromotion = async () => {
    var res = await getAllPromotionMarketing();
    var res2 = await getChannelData();
    res.data.data.map((item, index) => {
      if (item._id === id) {
        setValues(item);
        setChecked(item.list_products)
        setPStatus(item.status);
        res2.data.map((channel, cIndex) => {
          channel.shop_data.map((shop, sIndex) => {
            if (shop.shopId == item.shop_id) {
              setSelectedChannel(channel.name);
              setShopData(channel.shop_data);
            }
          });
        });
        setChannels(res2.data);
      }
    });
  };

  const getShop = async (id) => {};

  useEffect(() => {
    dispatch(setShowLoader(true));
    getAllPromotion()
    dispatch(setShowLoader(false));
  }, []);

  useEffect(async () => {
    dispatch(setShowLoader(true));
    let params = {};
    params.current_page = currentPage;
    if (values.shop_id) {
      params.shop_id = Number(values.shop_id);
    }
    if (filterValue) {
      params.keyword = filterValue;
    }
    const res = await getProductList(params);
    setTotalPage(res.data.data_page.total_page);
    // Change product data for modal
    let listProducts = [];
    res.data.item_list.map((item, index) => {
      let product = {};
      let list_sku = [];
      if (selectedChannel === "Lazada") {
        item.detail.skus.map((subItem, subIndex) => {
          let sku = {};
          sku.variant = subItem.Variation3;
          sku.price = subItem.price;
          sku.stock = subItem.sellableStock;
          sku.decrease_price = subItem.price;
          sku.promotion_qty = sku.stock;
          sku.status = true;
          list_sku.push(sku);
        });
      } else if (selectedChannel === "Shopee") {
        if (!item.detail.model_data) {
          let subItem = item.detail;
          let sku = {};
          sku.variant = "";
          sku.price = subItem.price_info[0].original_price;
          sku.stock = subItem.stock_info[0].current_stock;
          sku.decrease_price = subItem.price_info[0].original_price;
          sku.promotion_qty = sku.stock;
          sku.status = true;
          list_sku.push(sku);
        } else {
          item.detail.model_data.model.map((subItem, subIndex) => {
            let tier_variant = item.detail.model_data.tier_variation[0];
            let sku = {};
            sku.variant = tier_variant.option_list[subIndex].option;
            sku.price = subItem.price_info[0].original_price;
            sku.stock =
              subItem.stock_info[0].current_stock +
              subItem.stock_info[1].current_stock;
            sku.decrease_price = subItem.price_info[0].original_price;
            sku.promotion_qty = sku.stock;
            sku.status = true;
            list_sku.push(sku);
          });
        }
      }
      product.item_id = item.item_id;
      product.image = 
        selectedChannel === "Lazada"
          ? (item.detail.images ? item.detail.images[0] : "")
          : (item.detail.image ? item.detail.image.image_url_list[0]: "");
      product.name = item.item_name;
      product.list_sku = list_sku;
      product.shop_id = item.shop_id;
      product.shop_code = item.shop_code;
      product.shop_icon = item.shop_icon;
      product.limited_order = ""
      listProducts.push(product);
    });
    setDataProduct(listProducts);
    dispatch(setShowLoader(false));
  }, [doFilter, currentPage, changeData]);
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
    } else {
      setIsCheckAll(true);
      let selectedProduct = dataProduct;
      const newChecked = [...checked];
      selectedProduct.map((item) => {
        const currentIndex = checked.indexOf(item);
        if (currentIndex === -1) {
          newChecked.push(item);
        }
      });
      setChecked(newChecked);
    }
  };

  const handleCheckAll_2 = () => {
    if (isCheckAll_2) {
      setIsCheckAll_2(false);
      setChecked_2([]);
    } else {
      setIsCheckAll_2(true);
      setChecked_2(values.list_products);
    }
  };

  const handleToggle = (item) => {
    let selectId = [];
    checked.map((cItem) => {
      selectId.push(cItem.item_id);
    });
    setSelectedId(selectId);
    const sIndex = selectedId.indexOf(item.item_id);
    const currentIndex = checked.indexOf(item);
    const newChecked = [...checked];
    if (currentIndex === -1 && sIndex === -1 && event.target.checked === true) {
      newChecked.push(item);
    } else {
      setIsCheckAll(false);
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

  const handleChangeLimiterOrderItem = (item) => (event) => {
    let cloneData = [...values.list_products];
    var index = values.list_products.indexOf(item);
    let cloneItem = { ...cloneData[index] };
    cloneItem.limited_order = event.target.value;
    cloneData[index] = cloneItem;
    setValues({ ...values, ["list_products"]: cloneData });
    setIsCheckAll_2(false);
    setChecked_2([]);
  };

  const handleChangeClassifiedValue = (item, stt, value, type) => (event) => {
    let data = [...values.list_products];
    let cloneData = [...data[stt].list_sku];
    let index = values.list_products[stt].list_sku.indexOf(item);
    let cloneItem = { ...cloneData[index] };
    if (type == "bool") {
      cloneItem[value] = event.target.checked;
    } else {
      cloneItem[value] = event.target.value;
    }
    cloneData[index] = cloneItem;
    data[stt].list_sku = cloneData;
    setValues({ ...values, ["list_products"]: data });
    setIsCheckAll_2(false);
    setChecked_2([]);
  };

  const handleUpdateAddedProduct = () => {
    let data = [...values.list_products];
    checked_2.map((item, stt) => {
      let cloneData = [...data[stt].list_sku];
      data[stt].list_sku.map((props, number) => {
        let index = values.list_products[stt].list_sku.indexOf(props);
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
          cloneItem["promotion_qty"] = batchSetting.quantity_value;
        } else if (batchSetting.quantity_type == "unlimited") {
          cloneItem["promotion_qty"] = "";
        }
        cloneData[index] = cloneItem;
        data[stt].list_sku = cloneData;
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
    setValues({ ...values, ["list_products"]: data });
    setIsCheckAll_2(false);
    setChecked_2([]);
  };

  const handleDeleteAddedProduct = () => {
    let cloneData = [...values.list_products];
    const newChecked = [...checked];
    checked_2.map((item) => {
      // remove obj form arr
      var index = values.list_products.indexOf(item);
      if (checked_2.length < values.list_products.length) {
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
      ["list_products"]: cloneData,
    });
    setIsCheckAll_2(false);
    setChecked_2([]);
  };

  const handleSubmit = async () => {
    let isValidTime =
      moment(values.time_to).unix() > moment(values.time_from).unix();
    if (!values.shop_id) {
      // validate shop
      NotificationManager.error({
        title: text.notifications.type[0],
        message: text.notifications.value[0],
      });
    } else if (
      // validate promotion name
      !values.promotion_name ||
      values.promotion_name.length > 150 ||
      values.promotion_name.length == 0
    ) {
      NotificationManager.error({
        title: text.notifications.type[0],
        message: text.notifications.value[1],
      });
    } else if (!isValidTime) {
      // validate time
      NotificationManager.error({
        title: text.notifications.type[0],
        message: text.notifications.value[2],
      });
    } else if (!values.list_products.length) {
      // validate promotion products
      NotificationManager.error({
        title: text.notifications.type[0],
        message: text.notifications.value[3],
      });
    } else if (values.list_products.length) {
      let err = 0
      values.list_products.map((item, index) => {
        let stock = 0;
        let status_qty = 0;
        item.list_sku.map((sku, stt) => {
          stock += parseInt(sku.stock);
          if (sku.status) {
            status_qty += 1;
          }
        });
        if (!stock) {
          NotificationManager.error({
            title: text.notifications.type[0],
            message: text.notifications.value[4] + item.name,
          });
          err += 1;
        } else if (!status_qty) {
          NotificationManager.error({
            title: text.notifications.type[0],
            message: text.notifications.value[7] + item.name,
          });
          err += 1;
        } else {
          item.list_sku.map((sku, stt) => {
            if (sku.status) {
              if (
                parseInt(sku.decrease_price) <= 0 ||
                parseInt(sku.decrease_price) >= parseInt(sku.price)
              ) {
                NotificationManager.error({
                  title: text.notifications.type[0],
                  message: sku.variant
                    ? text.notifications.value[6] + sku.variant
                    : text.notifications.value[6] + item.name,
                });
                err += 1;
              } else if (parseInt(sku.stock) <= 0) {
                NotificationManager.error({
                  title: text.notifications.type[0],
                  message: sku.variant
                    ? text.notifications.value[4] + sku.variant
                    : text.notifications.value[4] + item.name,
                });
                err += 1;
              } else if (
                parseInt(sku.promotion_qty) <= 0 ||
                parseInt(sku.promotion_qty) > parseInt(sku.stock)
              ) {
                NotificationManager.error({
                  title: text.notifications.type[0],
                  message: sku.variant
                    ? text.notifications.value[5] + sku.variant
                    : text.notifications.value[5] + item.name,
                });
                err += 1;
              }
            }
          });
        }
      });
      if (!err) {
        // check validate if success => call api create
        dispatch(setShowLoader(true));
        let res = await updatePromotionMarketing(values);
        dispatch(setShowLoader(false));
        if (res.code === 200) {
          Router.push("/admin/promotion");
        } else {
          NotificationManager.error({
            title: text.notifications.type[0],
            message: res.message ? res.message.text : "Error",
          });
        }
      }
    }
  };

  const handleChangeChannel = (event) => {
    setSelectedChannel(event.target.value);
    channels.map((item, index) => {
      if (item.name === event.target.value) {
        setShopData(item.shop_data);
        setValues({
          ...values,
          ["shop_id"]: item.shop_data[0].shopId,
          ["list_products"]: [],
        });
        setChecked([]);
      }
    });
    // setIsChangeFreeShipping(!isChangeFreeShipping)
  };

  const handleChangeShop = (event) => {
    setValues({
      ...values,
      ["shop_id"]: event.target.value,
      ["list_products"]: [],
    });
    setChecked([]);
    // setIsChangeFreeShipping(!isChangeFreeShipping)
  };

  //change value filter form
  const handleChangeFilter = (event) => {
    setFilterValue(event.target.value);
  };

  const handleSelectPage = (event, value) => {
    setCurrentPage(value);
    setIsCheckAll(false);
  };

  const ShopFilter = () => {
    return (
      <div className={classes.shopFilterContainer}>
        {/* filter channel */}
        <FormControl
          className={dashClasses.formControl}
          style={{ marginRight: "25px" }}
        >
          <InputLabel id="ecom-select-label">{text.shopFilter[0]}</InputLabel>
          <Select
            labelId="ecom-select-label"
            id="ecom-select"
            value={selectedChannel}
            onChange={handleChangeChannel}
            disabled={pStatus == "Finished" || pStatus == "Happening"}
          >
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
            value={values.shop_id}
            onChange={handleChangeShop}
            disabled={pStatus == "Finished" || pStatus == "Happening"}
          >
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

  const renderProduct = (item, index) => {
    let stock = 0;
    item.list_sku.map((sku, stt) => {
      stock += sku.stock;
    });
    return (
      <React.Fragment key={index}>
        <TableRow className={tableClasses.tableBodyRow}>
          <TableCell className={tableClasses.tableCell}>
            <Checkbox
              tabIndex={-1}
              onChange={() => handleToggle(item)}
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
          >
            <div className={classes.cellInfo}>
              <img src={item.image} className={classes.tableImage} />
              <div className={classes.infoTextContainer}>
                <p className={classes.text + " " + classes.infoTextPrimary}>
                  {item.name}
                </p>
                <div
                  className={classes.flex_center}
                  style={{ cursor: "pointer" }}
                >
                  <img className={classes.shopImg} src={item.shop_icon} />
                  <span className={classes.shopApplied}>{item.shop_code}</span>
                </div>
              </div>
            </div>
          </TableCell>
          <TableCell className={tableClasses.tableCell}>
            <p className={classes.text + " " + classes.infoTextPrimary}>
              {formatCurrency(item.list_sku[0]?.price)}
            </p>
          </TableCell>
          <TableCell className={tableClasses.tableCell}>
            <p className={classes.text + " " + classes.infoTextPrimary}>
              {stock}
            </p>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  const TableData = () => {
    return (
      <div className={tableClasses.tableResponsive}>
        <Table className={tableClasses.table + " " + tableClasses.tableCustom}>
          {values.list_products !== undefined ? (
            <TableHead
              className={
                tableClasses["primary" + "TableHeader"] +
                " " +
                tableClasses.tableHeadCustom
              }
            >
              <TableRow className={tableClasses.tableHeadRow}>
                <TableCell className={tableClasses.tableCell}>
                  {pStatus != "Finished" && (
                    <Checkbox
                      checked={isCheckAll_2}
                      tabIndex={-1}
                      onClick={() => handleCheckAll_2()}
                      checkedIcon={
                        <Check className={taskClasses.checkedIcon} />
                      }
                      icon={<Check className={taskClasses.uncheckedIcon} />}
                      classes={{
                        checked: taskClasses.checked,
                        root: taskClasses.root,
                      }}
                    />
                  )}
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
            {values.list_products?.map((item, index) => {
              return renderTable(item, index);
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderTable = (item, index) => {
    return (
      <React.Fragment key={index}>
        <TableRow
          className={tableClasses.tableBodyRow}
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <TableCell className={tableClasses.tableCell}>
          {pStatus != "Finished" && (
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
          )}
          </TableCell>
          <TableCell className={tableClasses.tableCell}>
            <div className={classes.cellInfo}>
              <img src={item.image} className={classes.tableImage} />
              <div className={classes.infoTextContainer}>
                <Tooltip title={item.name} placement="right-start">
                  <p
                    className={[
                      classes.text,
                      classes.infoTextPrimary,
                      classes.textLineClamp,
                    ].join(" ")}
                  >
                    {item.name}
                  </p>
                </Tooltip>
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
          <TableCell
            className={tableClasses.tableCell}
            style={{ width: "200px" }}
          >
            <FormControl component="fieldset" size="small">
              <OutlinedInput
                id="outlined-adornment-amount-5"
                value={values.list_products[index].limited_order}
                onChange={handleChangeLimiterOrderItem(item)}
                autoComplete="off"
                type="number"
                placeholder={text.placeholder}
                className={classes.FieldMaxWidth}
                disabled={pStatus == "Finished"}
              />
            </FormControl>
          </TableCell>
          <TableCell className={tableClasses.tableCell}></TableCell>
        </TableRow>
        <TableRow className={tableClasses.tableBodyRow}>
          <TableCell className={tableClasses.tableCell}></TableCell>
          <TableCell className={tableClasses.tableCell}>
            {values.list_products[index].list_sku.map((props, stt) => {
              return (
                <p
                  className={
                    classes.text +
                    " " +
                    classes.infoTextPrimary +
                    " " +
                    classes.classifiedMargin
                  }
                  key={stt}
                >
                  {!props.variant ? "---" : props.variant}
                </p>
              );
            })}
          </TableCell>
          <TableCell className={tableClasses.tableCell}>
            {values.list_products[index].list_sku.map((props, stt) => {
              return (
                <p
                  className={
                    classes.text +
                    " " +
                    classes.infoTextPrimary +
                    " " +
                    classes.classifiedMargin
                  }
                  key={stt}
                >
                  {formatCurrency(props.price)}
                </p>
              );
            })}
          </TableCell>
          <TableCell className={tableClasses.tableCell}>
            {values.list_products[index].list_sku.map((props, stt) => {
              return (
                <FormControl
                  component="fieldset"
                  size="small"
                  style={{ width: "100%" }}
                  key={stt}
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
                    disabled={pStatus == "Finished"}
                  />
                </FormControl>
              );
            })}
          </TableCell>
          <TableCell className={tableClasses.tableCell}>
            {values.list_products[index].list_sku.map((props, stt) => {
              return (
                <p
                  className={
                    classes.text +
                    " " +
                    classes.infoTextPrimary +
                    " " +
                    classes.classifiedMargin
                  }
                  key={stt}
                >
                  {props.stock}
                </p>
              );
            })}
          </TableCell>
          <TableCell className={tableClasses.tableCell}>
            {values.list_products[index].list_sku.map((props, stt) => {
              return (
                <FormControl
                  component="fieldset"
                  size="small"
                  style={{ width: "100%" }}
                  key={stt}
                >
                  <OutlinedInput
                    id="outlined-adornment-amount-5"
                    value={props.promotion_qty}
                    onChange={handleChangeClassifiedValue(
                      props,
                      index,
                      "promotion_qty"
                    )}
                    autoComplete="off"
                    type="number"
                    placeholder={text.placeholder}
                    className={
                      classes.FieldMaxWidth + " " + classes.classifiedMargin2
                    }
                    disabled={pStatus == "Finished"}
                  />
                </FormControl>
              );
            })}
          </TableCell>
          <TableCell className={tableClasses.tableCell}></TableCell>
          <TableCell className={tableClasses.tableCell}>
            {values.list_products[index].list_sku.map((props, stt) => {
              return (
                <div className={classes.classifiedMargin}>
                  <Switch
                    checked={props.status}
                    onChange={handleChangeClassifiedValue(
                      props,
                      index,
                      "status",
                      "bool"
                    )}
                    name="checkedA"
                    key={stt}
                    disabled={pStatus == "Finished"}
                  />
                </div>
              );
            })}
          </TableCell>
        </TableRow>
      </React.Fragment>
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
          <FormCellCustom
            label={text.form_cell_custom[2]}
            helperText={text.helper_text[1]}
          >
            {ShopFilter()}
          </FormCellCustom>
          {/* Combo Name */}
          <FormCellCustom
            label={text.form_cell_custom[0]}
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
                placeholder={text.placeholder}
                autoComplete="off"
                disabled={pStatus == "Finished"}
              />
            </div>
          </FormCellCustom>
          {/* Time */}
          <FormCellCustom label={text.form_cell_custom[1]} helperText={""}>
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
                disabled={pStatus == "Finished" || pStatus == "Happening"}
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
                disabled={pStatus == "Finished"}
              />
            </div>
          </FormCellCustom>
        </FormGroupCustom>
        {/* Products of Combo Promotion */}
        <FormGroupCustom
          title={text.form_group_custom[0]}
          subTitle={
            values.list_products?.length +
            " " +
            text.form_group_custom_subtitle[0]
          }
          hasButton={pStatus != "Finished"}
          btnTitle={"Select Product"}
          onClick={() => {
            setIsShowModal(true), setChangeData(!changeData);
          }}
        >
          {values.list_products.length > 0 && (
            <>
              {pStatus != "Finished" && BatchSetting()}
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
          <div className={classes.flex_center}>
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
                  onChange: handleChangeFilter,
                }}
                placeholder={text.placeholder}
                autoComplete="off"
                style={{ flex: 1 }}
              />
            </FormControl>
            <div style={{ marginLeft: "10px" }}>
              <Button color="primary" onClick={() => setDoFilter(!doFilter)}>
                {text.popup_button[0]}
              </Button>
            </div>
          </div>
          <div
            className={tableClasses.tableScrollModal}
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
          </div>
          <div
            className={[
              tableClasses.flex_center_between,
              tableClasses.paginationContainer,
            ].join(" ")}
          >
            <Pagination
              count={totalPage}
              page={currentPage}
              onChange={handleSelectPage}
            />
            <Button
              color="primary"
              onClick={() => {
                setValues({ ...values, ["list_products"]: checked }),
                setIsShowModal(false),
                setIsCheckAll(false);
              }}
            >
              {text.popup_button[2]}
            </Button>
          </div>
        </ModalCustom>
        <NotificationContainer />
      </CardBody>
      {pStatus != "Finished" && (
        <CardFooter className={classes.flex_end}>
          <Button color="primary" onClick={() => handleSubmit()}>
            {text.buttons[1]}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

PromotionDetailPage.layout = Admin;

export default WithAuthentication(PromotionDetailPage);
