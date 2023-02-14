import React, { useState, useEffect, useCallback } from "react";
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
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import { useRouter } from "next/router";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import Link from "next/link";
import moment from "moment";
import Icon from "@material-ui/core/Icon";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { formatCurrency, formatPhoneNumber } from "../../../utilities/utils";
import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import { CheckBoxOutlined, LocalShippingOutlined } from "@material-ui/icons";
import CustomInput from "components/CustomInput/CustomInput.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import { getOrderDetail } from "../../../utilities/ApiManage";
import { setShowLoader } from "../../../redux/actions/app";
import Tooltip from "@material-ui/core/Tooltip";

function OrderDetailPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const useTableStyles = makeStyles(tableStyles);
  const tableClasses = useTableStyles();
  const [order, setOrder] = useState({ item_list: [], package_list: [] });
  const TABLE_HEAD = [
    { id: "en", value: ["Product name", "Price", "Quantity", "Sum"] },
    { id: "vi", value: ["Tên sản phẩm", "Giá", "Số lượng", "Giá trị"] },
  ];
  const ORDER_INFO = [
    {
      id: "en",
      value: [
        "Create date",
        "Payment method",
        "Decrease price",
        "Payment status",
        "Note",
      ],
    },
    {
      id: "vi",
      value: [
        "Ngày tạo",
        "Phương thức thanh toán",
        "Giảm giá",
        "Trạng thái thanh toán",
        "Ghi chú",
      ],
    },
  ];
  const TOOLTIP = [
    {
      id: "en",
      orderStatus: [
        "Paid",
        "Packed",
        "Delivered",
        "Unpaid",
        "Not packed",
        "Undelivered",
        "Cancelled",
        "Return",
        "Shipped",
        "Waiting for a reply to the order cancellation request",
      ],
    },
    {
      id: "vi",
      orderStatus: [
        "Đã thanh toán",
        "Đã đóng gói",
        "Giao thành công",
        "Chưa thanh toán",
        "Chưa đóng gói",
        "Chưa giao",
        "Đã hủy",
        "Hoàn trả",
        "Đang giao",
        "Chờ xử lý yêu cầu hủy đơn"
      ],
    },
  ];
  const SHIP_INFO = [
    { id: "en", value: ["Shipping unit", "Shipping code", "Shipping fee"] },
    { id: "vi", value: ["Đơn vị vận chuyển", "Mã vận đơn", "Phí vận chuyển"] },
  ];
  const CUSTOMER_INFO = [
    { id: "en", value: ["Name", "Email", "Phone", "Address"] },
    { id: "vi", value: ["Họ tên", "Email", "Số điện thoại", "Địa chỉ"] },
  ];
  const rand = () => Math.round(Math.random() * 5000000);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const language = useSelector((state) => state.app.language);
  const listText = [
    {
      id: "en",
      title: "Order",
      txtOrderInfo: "Order information",
      txtShip: "Shipping information",
      txtCustomer: "Customer information",
      orderInfo: ORDER_INFO[0].value,
      shipInfo: SHIP_INFO[0].value,
      customerInfo: CUSTOMER_INFO[0].value,
      txtListPro: "List Products",
      tableHead: TABLE_HEAD[0].value,
      txtTotal: "Total money",
      txtSave: "Save",
      txtPaid: "Paid",
      txtNotPaid: "Unpaid",
      orderStatus: TOOLTIP[0].orderStatus,
    },
    {
      id: "vi",
      title: "Đơn hàng",
      txtOrderInfo: "Thông tin đơn hàng",
      txtShip: "Thông tin vận chuyển",
      txtCustomer: "Thông tin khách hàng",
      orderInfo: ORDER_INFO[1].value,
      shipInfo: SHIP_INFO[1].value,
      customerInfo: CUSTOMER_INFO[1].value,
      txtListPro: "Danh sách sản phẩm",
      tableHead: TABLE_HEAD[1].value,
      txtTotal: "Tổng giá trị đơn hàng",
      txtSave: "Lưu lại",
      txtPaid: "Đã thanh toán",
      txtNotPaid: "Chưa thanh toán",
      orderStatus: TOOLTIP[1].orderStatus,
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
  useEffect(async () => {
    dispatch(setShowLoader(true));
    window.addEventListener(
      "resize",
      () => {
        setIsTablet(window.innerWidth < 1310);
      },
      false
    );
    window.addEventListener(
      "resize",
      () => {
        setIsMobile(window.innerWidth < 1000);
      },
      false
    );
    const res = await getOrderDetail(id)
    setOrder(res.data)
    dispatch(setShowLoader(false));
  }, []);

  const productInfo = (item) => {
    return (
      <div className={classes.proContainer}>
        <img className={classes.proImg} src={item?.image_info?.image_url? item?.image_info?.image_url: item?.product_main_image} />
        <div className={classes.proInfoContainer}>
          <Link href={"/admin/product/" + item.id}>
            <a
              target="_blank"
              className={tableClasses.tableCell + " " + classes.txtProductName}
            >
              {item?.item_name? item?.item_name: item?.name}
            </a>
          </Link>
          <div className={classes.proContainer}>
            <div className={classes.shopInfoContainer}>
              <Icon className={classes.codeIcon}>crop_free</Icon>
              <p className={tableClasses.tableCell + " " + classes.txtShopName}>
                {item?.item_sku? item?.item_sku: item.sku}
              </p>
            </div>
          </div>
          {item?.isConnect == false && (
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
      <TableRow key={index} className={tableClasses.tableBodyRow}>
        <TableCell className={tableClasses.tableCell} key={"productInfo"}>
          {productInfo(item)}
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"price"}>
          {formatCurrency(item.model_discounted_price)}
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"quantity"}>
          {item.model_quantity_purchased}
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"totalPrice"}>
          {formatCurrency(
            item.model_discounted_price * item.model_quantity_purchased
          )}
        </TableCell>
      </TableRow>
    );
  };
  return (
    <div>
      <Card plain className={classes.headerContent}>
        <CardHeader
          color="primary"
          plain
          className={classes.cardTitleContainer}
        >
          <div>
            <h4 className={classes.cardTitleWhite}>
              {text.title + " #" + order.order_sn}
            </h4>
            <div className={classes.formProContent}>
              <img className={classes.shopImg} src={order?.shop_icon} />
              <p className={classes.proInfoValue}>{order?.shop_code}</p>
            </div>
          </div>
          <div>
          {order.order_status != "CANCELLED" && order.order_status != "TO_RETURN" &&
          order.order_status != "IN_CANCEL" ? (
            <div className={classes.flex}>
              <Button
                color={order.pay_time ? "green" : "white"}
                aria-label="edit"
                justIcon
                round
                className={classes.iconStatus}
              >
                <Tooltip
                  title={
                    order.pay_time ? text.orderStatus[0] : text.orderStatus[3]
                  }
                  arrow
                >
                  <Icon>attach_money</Icon>
                </Tooltip>
              </Button>
              <Button
                color={
                  order.order_status == "PROCESSED" ||
                  order.order_status == "SHIPPED" ||
                  order.order_status == "TO_CONFIRM_RECEIVE" ||
                  order.order_status == "COMPLETED"
                    ? "green"
                    : "white"
                }
                aria-label="edit"
                justIcon
                round
                className={classes.iconStatus}
              >
                <Tooltip
                  title={
                    order.order_status == "PROCESSED" ||
                    order.order_status == "SHIPPED" ||
                    order.order_status == "TO_CONFIRM_RECEIVE" ||
                    order.order_status == "COMPLETED"
                      ? text.orderStatus[1]
                      : text.orderStatus[4]
                  }
                  arrow
                >
                  <CheckBoxOutlined />
                </Tooltip>
              </Button>
              <Button
                color={
                  order.order_status == "TO_CONFIRM_RECEIVE" ||
                  order.order_status == "COMPLETED"
                    ? "green"
                    : (order.order_status == "SHIPPED"? "" : "white")
                }
                aria-label="edit"
                justIcon
                round
                className={classes.iconStatus}
              >
                <Tooltip
                  title={
                    order.order_status == "TO_CONFIRM_RECEIVE" ||
                    order.order_status == "COMPLETED"
                      ? text.orderStatus[2]
                      : (order.order_status == "SHIPPED"? text.orderStatus[8] :text.orderStatus[5])
                  }
                  arrow
                >
                  <LocalShippingOutlined />
                </Tooltip>
              </Button>
            </div>
          ) : (
            <React.Fragment>
              <Button
                color={
                  order.order_status == "IN_CANCEL"? "" : "danger"
                }
                aria-label="edit"
                justIcon
                round
                className={classes.iconStatus}
              >
                <Tooltip
                  title={
                    order.order_status == "CANCELLED"
                      ? text.orderStatus[6]
                      : (order.order_status == "IN_CANCEL"? text.orderStatus[9] : text.orderStatus[7])
                  }
                  arrow
                >
                  <Icon>
                    {(order.order_status == "CANCELLED" || order.order_status == "IN_CANCEL") ? "clear" : "replay"}
                  </Icon>
                </Tooltip>
              </Button>
            </React.Fragment>
          )}
          </div>
        </CardHeader>
      </Card>
      <div
        style={{
          display: isTablet ? "block" : "flex",
          justifyContent: "space-between",
        }}
      >
        <Card style={{ width: isTablet ? "100%" : "65%" }}>
          <CardBody>
            <FormControl
              className={dashClasses.formControl + " " + classes.basicContainer}
              style={{ width: isMobile ? "100%" : "45%" }}
            >
              <p className={classes.titleChart}>{text.txtOrderInfo}</p>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        <div className={classes.basicInfoContainer}>
                          <p className={classes.basicInfoTitle}>
                            {text.orderInfo[0]}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCellValue}>
                        <p className={classes.basicInfoValue}>
                          {moment.unix(order?.create_time).format("DD/MM/yyyy")}
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        <div className={classes.basicInfoContainer}>
                          <p className={classes.basicInfoTitle}>
                            {text.orderInfo[1]}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCellValue}>
                        <p className={classes.basicInfoValue}>
                          {order?.payment_method}
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        <div className={classes.basicInfoContainer}>
                          <p className={classes.basicInfoTitle}>
                            {text.orderInfo[2]}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCellValue}>
                        <p className={classes.basicInfoValue}>
                          {formatCurrency(order?.decreasePrice)}
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        <div className={classes.basicInfoContainer}>
                          <p className={classes.basicInfoTitle}>
                            {text.orderInfo[3]}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCellValue}>
                        <p className={classes.basicInfoValue}>
                          {order?.pay_time ? text.txtPaid : text.txtNotPaid}
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow style={{ verticalAlign: "text-top" }}>
                      <TableCell
                        className={classes.tableCell}
                        style={{ border: "0" }}
                      >
                        <CustomInput
                          labelText={text.orderInfo[4]}
                          id="txtNote"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            multiline: true,
                            rows: 2,
                            value: order?.note,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        style={{ border: "0" }}
                      >
                        <div style={{ textAlign: "end" }}>
                          <Button id="update-label" color="primary">
                            {text.txtSave}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </FormControl>
            <FormControl
              className={dashClasses.formControl + " " + classes.basicContainer}
              style={{
                width: isMobile ? "100%" : "45%",
                marginLeft: isMobile ? "0" : "5%",
              }}
            >
              <p className={classes.titleChart}>{text.txtShip}</p>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        <div className={classes.basicInfoContainer}>
                          <p className={classes.basicInfoTitle}>
                            {text.shipInfo[0]}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCellValue}>
                        <p className={classes.basicInfoValue}>
                          {order?.shipping_carrier}
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        <div className={classes.basicInfoContainer}>
                          <p className={classes.basicInfoTitle}>
                            {text.shipInfo[1]}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCellValue}>
                          <p className={classes.basicInfoValue}>
                            {order?.tracking_number}
                          </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        className={classes.tableCell}
                        style={{ border: "0" }}
                      >
                        <div className={classes.basicInfoContainer}>
                          <p className={classes.basicInfoTitle}>
                            {text.shipInfo[2]}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell
                        className={classes.tableCellValue}
                        style={{ border: "0" }}
                      >
                        <p className={classes.basicInfoValue}>
                          {formatCurrency(order?.actual_shipping_fee? order.actual_shipping_fee : order?.estimated_shipping_fee)}
                        </p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </FormControl>
          </CardBody>
        </Card>
        <Card style={{ width: isTablet ? "100%" : "33%" }}>
          <CardBody>
            <FormControl
              className={dashClasses.formControl + " " + classes.basicContainer}
              style={{ width: "95%" }}
            >
              <p className={classes.titleChart}>{text.txtCustomer}</p>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        <div className={classes.basicInfoContainer}>
                          <p className={classes.basicInfoTitle}>
                            {text.customerInfo[0]}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCellValue}>
                        <p className={classes.basicInfoValue}>
                          {order?.recipient_address?.name? order?.recipient_address?.name: order?.recipient_address?.first_name + " " + order?.recipient_address?.last_name}
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        <div className={classes.basicInfoContainer}>
                          <p className={classes.basicInfoTitle}>
                            {text.customerInfo[1]}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCellValue}>
                        <p className={classes.basicInfoValue}>
                          {order?.recipient_address?.email}
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        <div className={classes.basicInfoContainer}>
                          <p className={classes.basicInfoTitle}>
                            {text.customerInfo[2]}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCellValue}>
                        <p className={classes.basicInfoValue}>
                          {formatPhoneNumber(order?.recipient_address?.phone)}
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow style={{ verticalAlign: "text-top" }}>
                      <TableCell
                        className={classes.tableCell}
                        style={{ border: "0", minWidth: "100px" }}
                      >
                        <div className={classes.basicInfoContainer}>
                          <p className={classes.basicInfoTitle}>
                            {text.customerInfo[3]}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell
                        className={classes.tableCellValue}
                        style={{ border: "0" }}
                      >
                        <p className={classes.basicInfoValue}>
                          {order?.recipient_address?.full_address? order?.recipient_address?.full_address: order?.recipient_address?.city}
                        </p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </FormControl>
          </CardBody>
        </Card>
      </div>
      <Card style={{ marginTop: "0" }}>
        <CardBody>
          <p className={classes.titleChart}>{text.txtListPro}</p>
          <div className={tableClasses.tableResponsive}>
            <Table className={tableClasses.table}>
              <TableHead className={tableClasses["TableHeader"]}>
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
              <TableBody>
                {order.item_list.map((item, index) => {
                  return renderProduct(item, index);
                })}
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className={classes.tableCellValue}
                    style={{ border: "0" }}
                  >
                    <p className={classes.titleTotal}>{text.txtTotal}</p>
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    style={{ border: "0" }}
                  >
                    <p className={classes.txtTotal}>
                      {formatCurrency(order.total_amount)}
                    </p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

const styles = {
  cardTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  headerContent: {
    marginBottom: "0 !important",
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
  footerContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    textAlign: "center",
    alignItems: "center",
  },
  proContent: {
    minWidth: "150px !important",
    padding: "0 50px",
  },
  formProContent: {
    display: "flex",
    alignItems: "center",
  },
  proImg: {
    width: "65px",
    height: "65px",
    padding: "10px",
    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
    borderRadius: "5px",
  },
  proInfoTitle: {
    fontSize: ".875rem",
    fontWeight: "500",
    marginRight: "20px",
    //color: primaryColor[0],
  },
  proInfoValue: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: whiteColor,
    },
  },
  createConenct: {
    marginLeft: "10px",
    color: primaryColor[0],
    "&:hover,&:focus": {
      color: primaryColor[0],
    },
  },
  titleChartContainer: {
    borderBottom: "1px solid #D2D2D2",
  },
  titleInfoChart: {
    marginBottom: "0 !important",
    width: "fit-content",
    borderBottom: "2px solid " + primaryColor[0],
    padding: "7px 10px",
    cursor: "pointer",
    marginLeft: "20px",
    "&:hover,&:focus": {
      color: primaryColor[0],
    },
  },
  titleChart: {
    fontSize: "20px",
    fontWeight: "500",
  },
  titleTotal: {
    fontSize: "20px",
    fontWeight: "500",
    marginRight: "50px !important",
  },
  chartContainer: {
    minWidth: "275px !important",
  },
  basicContainer: {
    minWidth: "275px !important",
    marginLeft: "2%",
  },
  basicInfoContainer: {
    display: "flex",
    alignItems: "center",
  },
  basicInfoIcon: {
    marginRight: "10px",
    color: "rgba(0, 0, 0, 0.87)",
  },
  basicInfoTitle: {},
  basicInfoValue: {
    fontWeight: "500",
  },
  tableCell: {
    padding: "0",
  },
  tableCellValue: {
    padding: "0",
    textAlign: "end",
  },
  shopImg: {
    width: "17px",
    height: "17px",
    borderRadius: "4px",
    marginRight: "5px",
    marginBottom: "3px",
  },
  iconStatus: {
    marginRight: "5px !important",
  },
  proContainer: {
    display: "flex",
  },
  proInfoContainer: {
    marginLeft: "10px",
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
  txtTotal: {
    fontSize: "15px !important",
    padding: "0 !important",
  },
};

OrderDetailPage.layout = Admin;

export default WithAuthentication(OrderDetailPage);
