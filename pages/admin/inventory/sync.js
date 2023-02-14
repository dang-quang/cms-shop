import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
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
import adminStyles from "assets/jss/natcash/components/headerLinksStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";
import { Icon } from "@material-ui/core";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import vi from "date-fns/locale/vi";
import Poppers from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import classNames from "classnames";

function ProductPage() {
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
  const [showUpdate, setShowUpdate] = useState(false);
  const [doFilter, setDoFilter] = useState(false);
  const TABLE_HEAD = [
    {
      id: "en",
      value: [
        "Product information",
        "Stock",
        "Preventive",
        "Stock ampaign",
        "Available",
        "Updated",
        "Status",
      ],
    },
    {
      id: "vi",
      value: [
        "Thông tin sản phẩm",
        "Tồn kho",
        "Dự phòng",
        "Tồn kho Campaign",
        "Sẵn có",
        "Cập nhật",
        "Trạng thái",
      ],
    },
  ];
  const FILTER_STATUS = [
    {
      id: "en",
      value: ["In stock", "Low stock", "Out of stock", "Overselling"],
    },
    {
      id: "vi",
      value: [
        "Còn hàng",
        "Sắp hết hàng",
        "Hết hàng",
        "Bán vượt tồn kho hiện có",
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
  const menuCardInfo = [
    {
      id: "en",
      value: [
        { title: "Sync on", quantity: 3 },
        { title: "Sync off", quantity: 1 },
        { title: "Below the reserve", quantity: 7 },
        { title: "Selling over existing inventory", quantity: 2 },
      ],
    },
    {
      id: "vi",
      value: [
        { title: "Đang bật đồng bộ", quantity: 3 },
        { title: "Đang tắt đồng bộ", quantity: 1 },
        { title: "Dưới mức dự phòng", quantity: 7 },
        { title: "Bán vượt tồn kho hiện có", quantity: 2 },
      ],
    },
  ];
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
    {
      id: 1,
      productCode: "TP-71",
      productName: "Glico Icreo Nhật Bản số 0 (0-12 tháng)",
      image:
        "https://media.shoptretho.com.vn/upload/image/product/20180628/sua-bot-combiotic-hipp-so-1-800g-new-1.png",
      shopListing: 0,
      quantity: 20,
      available: 20,
      sold: 2,
      oos: 45,
      status: false,
      updateDate: "2021-08-18 10:38",
    },
    {
      id: 2,
      productCode: "TP-71",
      productName: "Sữa bột trẻ em",
      image:
        "https://media.shoptretho.com.vn/upload/image/product/20180628/sua-bot-combiotic-hipp-so-1-800g-new-1.png",
      shopListing: 1,
      quantity: 20,
      available: 18,
      sold: 4,
      oos: 5,
      status: true,
      updateDate: "2021-08-12 10:38",
    },
  ]);
  const language = useSelector((state) => state.app.language);
  const listText = [
    {
      id: "en",
      title: "Synchronize inventory",
      txtShop: "Shop",
      txtSearch: "Find by name or SKU",
      txtTypes: "categories",
      txtLink: "No link to product inventory",
      txtFilter: "Filter",
      txtUpdate: "Batch operations",
      tableHead: TABLE_HEAD[0].value,
      filterStatus: FILTER_STATUS[0].value,
      filterConstatus: FILTER_CONSTATUS[0].value,
      menuCard: menuCardInfo[0].value,
      listing: "listing(s)",
    },
    {
      id: "vi",
      title: "Đồng bộ tồn kho",
      txtSearch: "Tìm theo tên hoặc SKU",
      txtTypes: "phân loại",
      txtLink: "Chưa liên kết sản phẩm kho",
      txtFilter: "Bộ lọc",
      txtUpdate: "Thao tác hàng loạt",
      tableHead: TABLE_HEAD[1].value,
      filterStatus: FILTER_STATUS[1].value,
      filterConstatus: FILTER_CONSTATUS[1].value,
      menuCard: menuCardInfo[1].value,
      listing: "liên kết",
    },
  ];
  const [text, setText] = useState(listText[0]);
  const [ecom, setEcom] = useState("");
  const [shopData, setShopData] = useState([]);
  const [shop, setShop] = useState("");
  const [checked, setChecked] = useState([]);
  const [showProduct, setShowProduct] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [storeStatusFilter, setStoreStatusFilter] = useState([]);
  const [connectStatusFilter, setConnectStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState(moment().format());
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
  const productInfo = (item) => {
    return (
      <div className={classes.proContainer}>
        <img className={classes.proImg} src={item?.image} />
        <div className={classes.proInfoContainer}>
          {!item?.types && (
            <Link href={"/admin/inventory/" + item.id}>
              <a
                target="_blank"
                className={
                  tableClasses.tableCell + " " + classes.txtProductName
                }
              >
                {item?.productName}
              </a>
            </Link>
          )}
          {item?.types && (
            <p
              className={tableClasses.tableCell + " " + classes.txtProductName2}
            >
              {item?.productName}
            </p>
          )}
          <div className={classes.proContainer}>
            <div className={classes.shopInfoContainer}>
              <Icon className={classes.codeIcon}>grid_on_sharp</Icon>
              <p
                className={
                  tableClasses.tableCell + " " + classes.txtshopListing
                }
              >
                {item?.productCode}
              </p>
            </div>
            <div className={classes.shopInfoContainer}>
              <Link href={"/admin/inventory/" + item.id}>
                <a
                  target="_blank"
                  className={
                    tableClasses.tableCell +
                    " " +
                    classes.txtshopListing +
                    " " +
                    classes.txtLink
                  }
                >
                  {item?.shopListing} {text.listing}
                </a>
              </Link>
            </div>
          </div>
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
            {formatNumber(item.quantity)}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"available"}>
            {item.available}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"sold"}>
            {item.sold}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"oos"}>
            {item.oos}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"updateDate"}>
            {item.updateDate}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"status"}>
            <CustomSwitch
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
                  <p>{item.title}</p>
                  {item.quantity > 0 && (
                    <p className={classes.txtNumTitle}>
                      {formatNumber(item.quantity)}
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
                  }}
                />
                <Button color="white" aria-label="edit" justIcon round>
                  <Search />
                </Button>
              </div>
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
                      <div
                        class={classes.filterEleContent}
                        style={{ paddingBottom: "20px" }}
                      >
                        <p className={classes.titleFilter}>NGÀY TẠO</p>
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
                              label="Ngày bắt đầu"
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
                              label="Ngày kết thúc"
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
                            onClick={() => handleUpdate()}
                            className={classes.dropdownItem}
                          >
                            Sửa nè
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleUpdate()}
                            className={classes.dropdownItem}
                          >
                            Xóa nè
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Poppers>
            </FormControl>
          </div>
        </div>
        <div className={classes.selFilterTitleContainer}>
          <GridContainer>
            {storeStatusFilter &&
              doFilter &&
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
            {connectStatusFilter && doFilter && (
              <Button color="primary" size="sm" className={classes.filteTritle}>
                {connectStatusFilter}
              </Button>
            )}
            {fromDate && doFilter && (
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
  txtshopListing: {
    padding: "0 !important",
    margin: "0 !important",
    color: "#808080 !important",
  },
};

ProductPage.layout = Admin;

export default WithAuthentication(ProductPage);
