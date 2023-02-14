import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";
import {
  primaryColor,
  whiteColor,
  blackColor,
  hexToRgb,
  successColor,
  infoColor,
  orangeColor,
} from "assets/jss/natcash.js";
import classNames from "classnames";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import { useRouter } from "next/router";
import moment from "moment";
import Icon from "@material-ui/core/Icon";
import {
  Modal,
} from "@material-ui/core";
import { formatCurrency, formatNumber } from "../../../utilities/utils";
import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import {
  CloseOutlined,
  ExitToAppOutlined,
  GroupOutlined,
  MonetizationOnOutlined,
  MoneyOffOutlined,
  ReplyOutlined,
  ShoppingBasketOutlined,
  ShoppingCartOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@material-ui/icons";
import { SHOW_SIDEBAR } from "../../../redux/actions/app";
import { dangerColor, grayColor } from "../../../assets/jss/natcash";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import DateFnsUtils from "@date-io/date-fns";
import vi from "date-fns/locale/vi";
import { setShowLoader } from "../../../redux/actions/app";
import { getCrmScreen } from "../../../utilities/ApiManage";

function CMRDashBoardPage() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [showReport, setShowReport] = useState(false);
  const [cardData, setCardData] = useState([
    "4 (747,245 VND)",
    "0",
    "1.332 - 0.19%",
    "10",
    "4",
  ]);
  const CARD_TITLE = [
    {
      id: "en",
      value: ["Order", "Canceled order", "Advertisement", "Product", "Buyer"],
    },
    {
      id: "vi",
      value: ["Đơn hàng", "Đơn hủy", "Quảng cáo", "Sản phẩm", "Người mua"],
    },
  ];
  const [shopData, setShopData] = useState([
    {
      shopAvatar:
        "https://vcdn.tikicdn.com/ts/seller/69/a7/af/7819d91ef5987c1cc5952c147e870c00.jpg",
      shopName: "anlababy",
      data: ["474,100 VND", "2", "6", "2", "69", "165", "0", "0", "0", "0 VND"],
    },
    {
      shopAvatar:
        "https://vcdn.tikicdn.com/ts/seller/69/a7/af/7819d91ef5987c1cc5952c147e870c00.jpg",
      shopName: "sttmn",
      data: ["474,100 VND", "2", "6", "2", "69", "165", "0", "0", "0", "0 VND"],
    },
  ]);
  const SHOP_TITLE = [
    {
      id: "en",
      value: [
        { title: "Revenue", icon: MonetizationOnOutlined },
        { title: "Order", icon: ShoppingCartOutlined },
        { title: "Product", icon: ShoppingBasketOutlined },
        { title: "Total buyer", icon: GroupOutlined },
        { title: "Access", icon: ExitToAppOutlined },
        { title: "View", icon: VisibilityOutlined },
        { title: "Unreplied message", icon: ReplyOutlined },
        { title: "Unseen message", icon: VisibilityOffOutlined },
        { title: "Canceled order", icon: CloseOutlined },
        { title: "Total value canceled order", icon: MoneyOffOutlined },
      ],
    },
    {
      id: "vi",
      value: [
        { title: "Doanh thu", icon: MonetizationOnOutlined },
        { title: "Đơn hàng", icon: ShoppingCartOutlined },
        { title: "Sản phẩm", icon: ShoppingBasketOutlined },
        { title: "Tổng người mua", icon: GroupOutlined },
        { title: "Lượt truy cập", icon: ExitToAppOutlined },
        { title: "Lượt xem", icon: VisibilityOutlined },
        { title: "Tin nhắn chưa trả lời", icon: ReplyOutlined },
        { title: "Tin nhắn chưa đọc", icon: VisibilityOffOutlined },
        { title: "Đơn hủy", icon: CloseOutlined },
        { title: "Tổng giá trị đơn hủy", icon: MoneyOffOutlined },
      ],
    },
  ];

  const [filterMess, setFilterMess] = useState(null);
  const [listCheckedProduct, setListCheckedProduct] = useState([]);
  const [listCheckedStatus, setListCheckedStatus] = useState([]);
  const [listCheckedTag, setListCheckedTag] = useState([]);
  const [listCheckedShop, setListCheckedShop] = useState([]);
  const [timeFilterFrom, setTimeFilterFrom] = useState(moment().format());
  const [timeFilterTo, setTimeFilterTo] = useState(moment().format());
  const [listShop, setListShop] = useState([
    { id: 1, name: "shoptrethomiennam" },
    { id: 2, name: "anlababy" },
    { id: 3, name: "shoptretho_official" },
  ]);
  const LAST_MESS_TYPE = [
    { id: "en", value: ["Sent a product", "Sent a video", "Sent an image"] },
    {
      id: "vi",
      value: ["Đã gửi một sản phẩm", "Đã gửi một video", "Đã gửi một hình ảnh"],
    },
  ];
  const [listTag, setListTag] = useState([
    { name: "Khách quen", color: primaryColor[0] },
    { name: "Đã mua", color: successColor[0] },
    { name: "Chưa mua", color: dangerColor[0] },
  ]);
  const SELECT_DATA = [
    { id: "en", value: ["All order", "Confirmed order", "Inprogress order"] },
    {
      id: "vi",
      value: ["Tất cả đơn hàng", "Đơn đã xác nhận", "Đơn chưa xác nhận"],
    },
  ];
  const FILTER_TIME = [
    {
      id: "en",
      value: [
        { title: "To 2 PM today", value: 1 },
        { title: "To 9 PM today", value: 2 },
        { title: "From start of the day till now", value: 3 },
      ],
    },
    {
      id: "vi",
      value: [
        { title: "Tới 14h hôm nay", value: 1 },
        { title: "Tới 21h hôm nay", value: 2 },
        { title: "Từ đầu ngày đến bây giờ", value: 3 },
      ],
    },
  ];
  const FILTER_STATUS = [
    {
      id: "en",
      value: [
        { title: "All order", value: 1 },
        { title: "Confirmed order", value: 2 },
      ],
    },
    {
      id: "vi",
      value: [
        { title: "Tất cả đơn hàng", value: 1 },
        { title: "Đơn đã xác nhận", value: 2 },
      ],
    },
  ];
  const FILTER_DATA_TITLE = [
    {
      id: "en",
      value: [
        "Revenue",
        "Order",
        "Conversion rate",
        "Revenue/order",
        "Access",
        "View",
      ],
    },
    {
      id: "vi",
      value: [
        "Doanh thu",
        "Đơn hàng",
        "Tỷ lệ chuyển đổi",
        "Doanh thu/đơn",
        "Lượt truy cập",
        "Lượt xem",
      ],
    },
  ];
  const UTILS_TAB = [
    {
      id: "en",
      value: [
        {
          id: 0,
          name: "Order",
          subTabs: ["All", "Not paid", "Wait for shipping"],
        },
        { id: 1, name: "Product" },
        { id: 2, name: "Voucher", subTabs: ["Active", "Not Active"] },
      ],
    },
    {
      id: "vi",
      value: [
        {
          id: 0,
          name: "Đơn hàng",
          subTabs: ["Tất cả", "Chưa thanh toán", "Chờ lấy hàng"],
        },
        { id: 1, name: "Sản phẩm" },
        { id: 2, name: "Voucher", subTabs: ["Đang chạy", "Chưa chạy"] },
      ],
    },
  ];

  const [showAddNote, setShowAddNote] = useState(false);
  const [selectedUtilTab, setSelectedUtilTab] = useState("");
  const [selectedSubUtilTab, setSelectedSubUtilTab] = useState("");
  const [filterData, setFilterData] = useState([
    { value: "131,50 VND", subValue: "17,03%", isLower: true },
    { value: "2", subValue: "00,00%", isLower: true },
    { value: "1,33%", subValue: "0,26%", isLower: false },
    { value: "131,50 VND", subValue: "17,03%", isLower: true },
    { value: "75", subValue: "23,03%", isLower: true },
    { value: "171", subValue: "5,03%", isLower: false },
  ]);
  const [filterTime, setFilterTime] = useState(1);
  const [filterStatus, setFilterStatus] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const language = useSelector((state) => state.app.language);
  const listText = [
    {
      id: "en",
      txtFilterFrom: "From",
      txtFilterTo: "To",
      txtApply: "Apply",
      title1: "Message",
      title2: "Statistics of the day",
      title3: "Utilities",
      txtOrder: "Order",
      txtShipId: "Bill of lading code",
      txtFilterStatus: "Filter by status",
      txtFilterTag: "Filter by tag",
      txtFilterShop: "Filter by shop",
      txtFilterTime: "Filter by time",
      txtOrderSort: "order",
      txtSold: "Sold",
      txtAvailable: "Available",
      txtProChoose: "selected products",
      txtSend: "Send",
      txtCancel: "Cancel",
      txtMinValue: "Minimun order value",
      txtSearch: "Search",
      txtCancel: "Cancel",
      txtReport: "View activity reports",
      txtReportTitle: "Sales analysis",
      txtCompare: "Compared to yesterday",
      txtMessPlaceholder: "Enter message...",
      txtOrderId: "Order ID",
      txtTotalPayment: "Total payment",
      txtShip: "Shipping",
      txtFinishtime: "Finish time",
      txtExpecTime: "Delivery before",
      txtNote: "Note",
      txtAddNote: "Add note",
      txtDetail: "See details",
      cardTitle: CARD_TITLE[0].value,
      shopTitle: SHOP_TITLE[0].value,
      selectData: SELECT_DATA[0].value,
      filterTime: FILTER_TIME[0].value,
      filterStatus: FILTER_STATUS[0].value,
      filterDataTitle: FILTER_DATA_TITLE[0].value,
      lastMessType: LAST_MESS_TYPE[0].value,
      utilTab: UTILS_TAB[0].value,
    },
    {
      id: "vi",
      txtFilterFrom: "Từ ngày",
      txtFilterTo: "Đến ngày",
      txtApply: "Áp dụng",
      title1: "Tin nhắn",
      title2: "Thống kê trong ngày",
      title3: "Tiện ích",
      txtOrder: "Đơn hàng",
      txtShipId: "Mã vận đơn",
      txtFilterStatus: "Lọc theo trạng thái",
      txtFilterTag: "Lọc theo tag",
      txtFilterShop: "Lọc theo shop",
      txtFilterTime: "Lọc theo thời gian",
      txtOrderSort: "đơn",
      txtSold: "Đã bán",
      txtAvailable: "Có sẵn",
      txtProChoose: "sản phẩm đã chọn",
      txtSend: "Gửi",
      txtCancel: "Hủy",
      txtMinValue: "Đơn tối thiểu",
      txtSearch: "Tìm kiếm",
      txtReport: "Xem báo cáo hoạt động",
      txtReportTitle: "Phân tích bán hàng",
      txtCompare: "So với hôm qua",
      txtMessPlaceholder: "Nhập tin nhắn...",
      txtOrderId: "Mã đơn hàng",
      txtTotalPayment: "Tổng tiền thanh toán",
      txtShip: "Thông tin vận chuyển",
      txtFinishtime: "Thời gian hoàn thành",
      txtExpecTime: "Giao trước ngày",
      txtNote: "Ghi chú",
      txtAddNote: "Thêm lưu ý",
      txtDetail: "Xem chi tiết",
      cardTitle: CARD_TITLE[1].value,
      shopTitle: SHOP_TITLE[1].value,
      selectData: SELECT_DATA[1].value,
      filterTime: FILTER_TIME[1].value,
      filterStatus: FILTER_STATUS[1].value,
      filterDataTitle: FILTER_DATA_TITLE[1].value,
      lastMessType: LAST_MESS_TYPE[1].value,
      utilTab: UTILS_TAB[1].value,
    },
  ];
  const [text, setText] = useState(listText[0]);
  const [selectTitle, setSelectTitle] = useState(text.selectData[0]);
  useEffect(() => {
    for (let i = 0; i < listText.length; i++) {
      if (language == listText[i].id) {
        setText(listText[i]);
        setSelectTitle(listText[i].selectData[0]);
        setSelectedUtilTab(listText[i].utilTab[0]);
        setSelectedSubUtilTab(0);
        break;
      }
    }
    dispatch({ type: SHOW_SIDEBAR, showSidebar: true });
  }, [language]);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        setIsMobile(window.innerWidth < 1310);
      },
      false
    );
  }, []);

  useEffect(async () => {
    dispatch(setShowLoader(true))
    const res = await getCrmScreen()
    if(res.code == 200){
      setCardData(res.data.sum_data)
      setShopData(res.data.shop_data)
    }
    dispatch(setShowLoader(false))
  }, []);

  const renderShopData = (item, index) => {
    return text.shopTitle.map((tit, titIdx) => (
      <GridItem xs={3} sm={3} md={3}>
        <Button color="white" style={{ width: "100%", height: "130px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <tit.icon className={classes.iconShopData}></tit.icon>
            {tit.title}
            {item.operation && titIdx!=0 && titIdx!= 9 && (
              <p className={classes.txtShopDataValue}>{formatNumber(item?.operation[Object.keys(item?.operation)[titIdx]])}</p>
            )}
            {item.operation && (titIdx==0 || titIdx== 9) && (
              <p className={classes.txtShopDataValue}>{formatCurrency(item?.operation[Object.keys(item?.operation)[titIdx]])}</p>
            )}
          </div>
        </Button>
      </GridItem>
    ));
  };

  const renderCard2 = () => {
    return (
      <Card className={classes.headerContent}>
        <CardHeader color="primary" className={classes.cardTitleContainer}>
          <div className={classes.flexCenter}>
            <h4 className={classes.cardTitleWhite}>{text.title2}</h4>
            <div style={{ marginLeft: "30px" }}>
              {/* <Select
                    labelId="ecom-select-label"
                    id="ecom-select"
                    value={selectTitle}
                    onChange={(item) => setSelectTitle(item.target.value)}
                    style={{color: "white"}}
                  >
                    {text.selectData.map((item) => (
                      <MenuItem className={classes.dropdownItem} value={item.value}>{item.title}</MenuItem>
                    ))}
                  </Select> */}
              <CustomDropdown
                navDropdown
                buttonText={selectTitle}
                buttonProps={{
                  color: "transparent",
                }}
                dropdownList={text.selectData}
                onClick={(item) => setSelectTitle(item)}
              />
            </div>
          </div>
        </CardHeader>
        <div style={{ padding: "0.9375rem 20px" }}>
          <div
            className={classes.cardTitleContainer}
            style={{
              margin: "0 4%",
              marginBottom: "20px",
              display: isMobile ? "block" : "flex",
            }}
          >
              <div style={{ display: "flex" }}>
                <p className={classes.txtTitleStatisItem}>{text.cardTitle[0] + ":"}</p>
                <p className={classes.txtTitleStatisValue}>{cardData.order + " (" + formatCurrency(cardData.revenue)+ ")"}</p>
              </div>
              <div style={{ display: "flex" }}>
                <p className={classes.txtTitleStatisItem}>{text.cardTitle[1]  + ":"}</p>
                <p className={classes.txtTitleStatisValue}>{cardData.cancel + " (" + formatCurrency(cardData.cancel_revenue)+ ")"}</p>
              </div>
              <div style={{ display: "flex" }}>
                <p className={classes.txtTitleStatisItem}>{text.cardTitle[2]  + ":"}</p>
                <p className={classes.txtTitleStatisValue}>{cardData.advertise + " - " + cardData.advertise_percent + "%"}</p>
              </div>
              <div style={{ display: "flex" }}>
                <p className={classes.txtTitleStatisItem}>{text.cardTitle[3]  + ":"}</p>
                <p className={classes.txtTitleStatisValue}>{cardData.product}</p>
              </div>
          </div>
        </div>
        <div
          style={{
            padding: "0 20px",
          }}
        >
          {shopData.map((item, index) => (
            <div>
              <div
                className={classes.shopInfoContainer}
                style={{ display: isMobile ? "block" : "flex" }}
              >
                <div className={classes.flexCenter}>
                  <img
                    src={item?.shop?.avatar}
                    className={classes.imgShopAvaLarge}
                  ></img>
                  <p className={classes.txtShopName}>{item?.shop?.name}</p>
                </div>
                <div>
                  <Button
                    id="update-label"
                    color="primary"
                    size="sm"
                    onClick={() => setShowReport(true)}
                  >
                    {text.txtReport}
                  </Button>
                </div>
              </div>
              <Card style={{ marginTop: "10px" }}>
                <CardBody>
                  <GridContainer>{renderShopData(item, index)}</GridContainer>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={showReport}
          onClose={() => setShowReport(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          style={{ overflow: "auto" }}
        >
          <Fade in={showReport}>
            <Card className={classes.modalContainer}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  {text.txtReportTitle}
                </h4>
              </CardHeader>
              <CardBody>
                <div
                  className={classes.flexCenter}
                  style={{
                    marginBottom: "25px",
                  }}
                >
                  <div style={{ marginRight: "30px" }}>
                    <InputLabel id="time-select-label">
                      {text.txtChannel}
                    </InputLabel>
                    <Select
                      labelId="time-select-label"
                      id="time-select"
                      value={filterTime}
                      onChange={(item) => setFilterTime(item.target.value)}
                    >
                      {text.filterTime.map((item) => (
                        <MenuItem
                          className={classes.dropdownItem}
                          value={item.value}
                        >
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <InputLabel id="status-select-label">
                      {text.txtChannel}
                    </InputLabel>
                    <Select
                      labelId="status-select-label"
                      id="status-select"
                      value={filterStatus}
                      onChange={(item) => setFilterStatus(item.target.value)}
                    >
                      {text.filterStatus.map((item) => (
                        <MenuItem
                          className={classes.dropdownItem}
                          value={item.value}
                        >
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
                <GridContainer>
                  {text.filterDataTitle.map((item, index) => (
                    <GridItem xs={12} sm={12} md={6}>
                      <Button
                        color="white"
                        style={{
                          width: "100%",
                          height: "130px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            width: "100%",
                          }}
                        >
                          {item}
                          <p className={classes.txtShopDataValue}>
                            {filterData[index].value}
                          </p>
                          <div
                            className={classes.flexCenter}
                            style={{
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <p>{text.txtCompare}</p>
                            <p
                              style={{
                                color: filterData[index].isLower
                                  ? dangerColor[0]
                                  : successColor[0],
                              }}
                            >
                              {filterData[index].subValue}
                            </p>
                          </div>
                        </div>
                      </Button>
                    </GridItem>
                  ))}
                </GridContainer>
              </CardBody>
            </Card>
          </Fade>
        </Modal>
      </Card>
    );
  };

  return (
    <div style={{ display: isMobile ? "block" : "flex" }}>{renderCard2()}</div>
  );
}

const styles = {
  cardTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
  },
  headerContent: {
    marginBottom: "0 !important",
    marginLeft: "1% !important",
    marginRight: "1% !important",
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
  imgShopAva: {
    width: "22px",
    height: "22px",
    borderRadius: "200px",
  },
  txtTitleStatisItem: {
    margin: "0 !important",
    fontSize: "15px",
    fontWeight: "500",
  },
  txtTitleStatisValue: {
    margin: "0 5px !important",
    fontSize: "15px",
  },
  imgShopAvaLarge: {
    width: "50px",
    height: "50px",
    borderRadius: "200px",
    marginRight: "10px",
    marginLeft: "15px",
  },
  txtShopName: {
    fontSize: "17px",
    margin: "0 !important",
  },
  shopInfoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconShopData: {
    width: "30px !important",
    height: "30px !important",
    marginBottom: "5px !important",
  },
  txtShopDataValue: {
    color: primaryColor[0],
    margin: "5px 0 !important",
    fontSize: "17px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    width: "48% !important",
    minWidth: "340px !important",
  },
  tableCell: {
    border: "0",
    padding: "0",
  },
  tooltip: {
    backgroundColor: "white",
    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
  },
  checkBox: {
    padding: "9px",
    "&:hover": {
      backgroundColor: "unset",
    },
  },
};

CMRDashBoardPage.layout = Admin;

export default WithAuthentication(CMRDashBoardPage);
