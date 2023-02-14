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
import { formatNumber } from "../../../utilities/utils";
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
import TextField from "@material-ui/core/TextField";
import { getInventoryItemList, getInventoryScreen } from "../../../utilities/ApiManage";
import { setShowLoader } from "../../../redux/actions/app";
import { NotificationContainer, NotificationManager} from "react-light-notifications";
import Pagination from "@material-ui/lab/Pagination";

function InventoryPage() {
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const useAdminStyles = makeStyles(adminStyles);
  const adminClasses = useAdminStyles();
  const classes = useStyles();
  const useTableStyles = makeStyles(tableStyles);
  const tableClasses = useTableStyles();
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const [showFilter, setShowFilter] = useState(false);
  const [showAction, setShowAction] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showUpdate2, setShowUpdate2] = useState(false);
  const [doFilter, setDoFilter] = useState(0);
  const [menuCardData, setMenuCardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [txtSearch, setTxtSearch] = useState("");
  const [doSearch, setDoSearch] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const TABLE_HEAD = [
    {
      id: "en",
      value: [
        "Product information",
        "Stock",
        "Available",
        "Sold",
        "Average sales",
        "OOS",
        "Last update",
        "Action",
      ],
    },
    {
      id: "vi",
      value: [
        "Thông tin sản phẩm",
        "Tồn kho",
        "Sẵn có",
        "Đã bán",
        "Tốc độ bán",
        "Hết hàng",
        "Cập nhật",
        "Thao tác",
      ],
    },
  ];
  const Filter = [
    {
      id: "en",
      value: {
        title: "Choose filter",
        value: ["Stock", "Created date", "Stock level", "Channel SKU mapping"],
        button: ["Reset", "Apply"],
      },
    },
    {
      id: "vi",
      value: {
        title: "Chọn bộ lọc",
        value: [
          "Tồn kho",
          "Ngày tạo",
          "Tồn kho",
          "Trạng thái liên kết sản phẩm đăng bán",
        ],
        button: ["Đặt lại", "Áp dụng"],
      },
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
  const FILTER_STATUS_2 = [
    {
      id: "en",
      value: ["Sync error", "Approved campaign reserved stock"],
    },
    {
      id: "vi",
      value: ["Đồng bộ lỗi", "Có tham gia campaign"],
    },
  ];
  const SELECT_BUTTON = [
    {
      id: "en",
      btnAdd: {
        title: "New inventory product",
        value: ["Manual creation", "From active channels"],
      },
      btnActions: {
        title: "Select items",
        value: ["Remove inventory", "Sync inventory"],
      },
    },
    {
      id: "vi",
      btnAdd: {
        title: "Tạo sản phẩm kho",
        value: ["Tạo sản phẩm thủ công", "Tạo sản phẩm từ kênh"],
      },
      btnActions: {
        title: "Thao tác hàng loạt",
        value: ["Xóa sản phẩm kho", "Đồng bộ tồn kho"],
      },
    },
  ];
  const menuCardInfo = [
    {
      id: "en",
      value: [
        { title: "All Inventory", value: "" },
        { title: "Out of stock", value: "OUT_OF_STOCK" },
        { title: "Out of stock soon", value: "OUT_OF_STOCK_SOON" },
        { title: "Oversold", quantity: "OVERSOLD" },
      ],
    },
    {
      id: "vi",
      value: [
        { title: "Tổng sản phẩm kho", value: "" },
        { title: "Hết hàng", value: "OUT_OF_STOCK"},
        { title: "Sắp hết hàng", value: "OUT_OF_STOCK_SOON" },
        { title: "Bán vượt Tồn kho hiện có", quantity: "OVERSOLD" },
      ],
    },
  ];
  const [data, setData] = useState([]);
  const options = [
    { id: "en", title: "options", value: ["Link channel SKUs", "Delete"] },
    {
      id: "vi",
      title: "tùy chọn",
      value: ["Liên kết sản phẩm trên kênh", "Xóa"],
    },
  ];
  const language = useSelector((state) => state.app.language);
  const [text, setText] = useState({
    id: "en",
    title: "Warehouse Management",
    txtFilter: "Filter",
    selectButton: SELECT_BUTTON[0],
    tableHead: TABLE_HEAD[0].value,
    fillter: Filter[0].value,
    filterStatus: FILTER_STATUS[0].value,
    filterStatus2: FILTER_STATUS_2[0].value,
    filterConstatus: FILTER_CONSTATUS[0].value,
    menuCard: menuCardInfo[0].value,
    optionsTitle: options[0].title,
    options: options[0].value,
    listing: "listing(s)",
  });
  const listText = [
    {
      id: "en",
      title: "Warehouse Management",
      txtSearch: "Find by name or SKU",
      txtTypes: "categories",
      txtLink: "No link to product inventory",
      txtFilter: "Filter",
      selectButton: SELECT_BUTTON[0],
      tableHead: TABLE_HEAD[0].value,
      fillter: Filter[0].value,
      filterStatus: FILTER_STATUS[0].value,
      filterStatus2: FILTER_STATUS_2[0].value,
      filterConstatus: FILTER_CONSTATUS[0].value,
      menuCard: menuCardInfo[0].value,
      optionsTitle: options[0].title,
      options: options[0].value,
      listing: "listing(s)",
      txtFilterDate: "Update date",
      txtFilterReset: "Reset",
      txtFilterFrom: "From",
      txtFilterTo: "To",
      txtFilterApply: "Apply",
    },
    {
      id: "vi",
      title: "Quản lý kho hàng",
      txtShop: "Gian hàng",
      txtSearch: "Find by name or SKU",
      txtTypes: "phân loại",
      txtLink: "Chưa liên kết sản phẩm kho",
      txtFilter: "Bộ lọc",
      selectButton: SELECT_BUTTON[1],
      tableHead: TABLE_HEAD[1].value,
      fillter: Filter[1].value,
      filterStatus: FILTER_STATUS[1].value,
      filterStatus2: FILTER_STATUS_2[1].value,
      filterConstatus: FILTER_CONSTATUS[1].value,
      menuCard: menuCardInfo[1].value,
      optionsTitle: options[1].title,
      options: options[1].value,
      listing: "liên kết",
      txtFilterDate: "Ngày cập nhật",
      txtFilterReset: "Đặt lại",
      txtFilterFrom: "Từ ngày",
      txtFilterTo: "Đến ngày",
      txtFilterApply: "Áp dụng",
    },
  ];
  const [checked, setChecked] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [storeStatusFilter, setStoreStatusFilter] = useState([]);
  const [connectStatusFilter, setConnectStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState(
    moment().subtract(30, "days").format()
  );
  const [toDate, setToDate] = useState(moment().format());
  const [filterDate, setFilterDate] = useState(false);
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

  useEffect(async () => {
    dispatch(setShowLoader(true));
    const res = await getInventoryScreen()
    if(res?.code == 200){
      setData(res.data.item_list)
      setMenuCardData(res.data.item_count_by_status);
      setCurrentPage(res.data.data_page.current_page);
      setTotalPage(res.data.data_page.total_page);
    }
    dispatch(setShowLoader(false));
  }, []);

  useEffect(async () => {
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
    if (selectedTitle.value) {
      params.stock_status = selectedTitle.value;
    }
    const res = await getInventoryItemList(params);
    if (res.code == 200) {
      if (res.data.item_list.length > 0) {
        setData(res.data.item_list);
        setCurrentPage(res.data.data_page.current_page);
        setTotalPage(res.data.data_page.total_page);
        setMenuCardData(res.data.item_count_by_status);
      }
    }
    dispatch(setShowLoader(false));
  }, [doSearch, doFilter, selectedTitle, currentPage]);

  const handleTitle = async (item) => {
    setSelectedTitle(item);
    setCurrentPage(1);
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
    setDoFilter(0);
  };

  const handleUpdate = () => {
    setShowUpdate(!showUpdate);
  };
  const handleUpdate2 = () => {
    setShowUpdate2(!showUpdate2);
  };
  const handleAction = (item) => {
    const currentIndex = showAction.indexOf(item);
    const newAction = [...showAction];
    if (currentIndex === -1) {
      newAction.push(item);
    } else {
      newAction.splice(currentIndex, 1);
    }
    setShowAction(newAction);
  };
  const handleSelectPage = (event, value) => {
    setCurrentPage(value);
  };
  const resetFilterDate = () => {
    setFromDate(moment().subtract(30, "days").format());
    setToDate(moment().format());
    setFilterDate(false);
    setDoFilter(0);
  };
  const handleInputSearch = (event) => {
    setTxtSearch(event.target.value);
    setCurrentPage(1);
  };

  const productInfo = (item) => {
    return (
      <div className={classes.proContainer}>
        <img className={classes.proImg} src={item?.detail?.image_list[0]} />
        <div className={classes.proInfoContainer}>
          {!item?.types && (
            <Link href={"/admin/inventory/" + item.item_id}>
              <a
                target="_blank"
                className={
                  tableClasses.tableCell + " " + classes.txtProductName
                }
              >
                {item?.item_name}
              </a>
            </Link>
          )}
          <div className={classes.proContainer}>
            {item?.item_sku &&(
              <div className={classes.shopInfoContainer}>
              <Icon className={classes.codeIcon}>crop_free</Icon>
              <p
                className={
                  tableClasses.tableCell + " " + classes.txtshopListing
                }
              >
                {item?.item_sku}
              </p>
              </div>
            )}
            <div className={classes.shopInfoContainer}>
              <Icon className={classes.codeIcon}>link</Icon>
              <p
                className={
                  tableClasses.tableCell + " " + classes.txtshopListing
                }
              >
                {item?.shop_items.length + " " + text.listing}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProduct = (item, index) => {
    return (
      <React.Fragment>
        {!item?.types && (
          <TableRow
            key={index}
            className={tableClasses.tableBodyRow}
            style={{
              backgroundColor:
                checked.indexOf(item) !== -1 ? "#fff6f0" : "#fff",
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
              {formatNumber(item?.quantity)}
            </TableCell>
            <TableCell className={tableClasses.tableCell} key={"available"}>
              {item?.available}
            </TableCell>
            <TableCell className={tableClasses.tableCell} key={"sold"}>
              {item?.sold}
            </TableCell>
            <TableCell className={tableClasses.tableCell} key={"averageSales"}>
              {item?.averageSales}
            </TableCell>
            <TableCell className={tableClasses.tableCell} key={"oos"}>
              {item?.oos}
            </TableCell>
            <TableCell className={tableClasses.tableCell} key={"updateDate"}>
              {moment.unix(item?.update_time).format("DD/MM/YYYY HH:mm")}
            </TableCell>
            <TableCell className={tableClasses.tableCell} key={"action"}>
              <div className={classes.proInfoContainer}>
                <Button
                  id={"action-label" + item?.id}
                  aria-owns={
                    showAction.indexOf(item) !== -1
                      ? "action-list-grow" + item?.id
                      : null
                  }
                  aria-haspopup="true"
                  color="white"
                  size="sm"
                  onClick={() => handleAction(item)}
                >
                  <Icon className={classes.btnFilter} style={{ margin: 0 }}>
                    settings
                  </Icon>
                </Button>
                <Poppers
                  open={Boolean(showAction.indexOf(item) !== -1)}
                  anchorEl={showAction.indexOf(item) !== -1}
                  transition
                  disablePortal
                  className={
                    classNames({
                      [classes.popperClose]: !showAction.indexOf(item) !== -1,
                    }) +
                    " " +
                    classes.popperNav2
                  }
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id={"action-list-grow" + item?.id}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener
                          onClickAway={() => handleAction(item)}
                        >
                          <MenuList role="menu">
                            <MenuItem className={classes.dropdownItem2}>
                              <Link href={"/admin/inventory/" + item.id}>
                                <a target="_blank">{text?.options[0]}</a>
                              </Link>
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleAction(item)}
                              className={classes.dropdownItem2}
                            >
                              {text?.options[1]}
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Poppers>
              </div>
            </TableCell>
          </TableRow>
        )}
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
                <div className={classes.selectContainer}
                style={{
                  backgroundColor:
                    selectedTitle == item ? primaryColor[3] : "",
                }}
                onClick={() => handleTitle(item)}>
                  <p>{item.title}</p>
                  {menuCardData[Object.keys(menuCardData)[index]] > 0 && (
                    <p className={classes.txtNumTitle}>
                      {formatNumber(menuCardData[Object.keys(menuCardData)[index]])}
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
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
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
                  <Button color="white" aria-label="edit" justIcon round onClick={() => setDoSearch(!doSearch)}>
                    <Search />
                  </Button>
                </div>
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
                        <h4 className={classes.cardTitleWhite}>
                          {text.fillter.title}
                        </h4>
                      </CardHeader>
                      <CardBody>
                        <div className={classes.filterEleContent}>
                          <p className={classes.titleFilter}>
                            {text.fillter.value[0]}
                          </p>
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
                          className={classes.filterEleContent}
                          style={{ paddingBottom: "20px" }}
                        >
                          <p className={classes.titleFilter}>
                            {text.fillter.value[2]}
                          </p>
                          <GridContainer>
                            <TextField
                              id="standard-number"
                              label="Nhỏ nhất"
                              type="number"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              style={{ margin: "0 40px", width: "150px" }}
                            />
                            <TextField
                              id="standard-number"
                              label="Lớn nhất"
                              type="number"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              style={{ margin: "0 40px", width: "150px" }}
                            />
                          </GridContainer>
                        </div>
                        <div className={classes.filterEleContent}>
                          <p className={classes.titleFilter}>
                            {text.fillter.value[3]}
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
                        <div className={classes.filterEleContent}>
                          <GridContainer>
                            {text.filterStatus2.map((item, index) => {
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
                      </CardBody>
                      <CardFooter>
                        <div className={classes.filterFooter}>
                          <Button
                            color="white"
                            onClick={() => resetFilter()}
                            style={{ marginRight: "20px" }}
                          >
                            {text.fillter.button[0]}
                          </Button>
                          <Button
                            color="primary"
                            onClick={() => {
                              setDoFilter(doFilter + 1), setShowFilter(false);
                            }}
                          >
                            {text.fillter.button[1]}
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </Fade>
                </Modal>
              </FormControl>
            </div>
            <div>
              <FormControl className={dashClasses.formControl}>
                <Button
                  id="update-label"
                  color="primary"
                  onClick={() => handleUpdate()}
                >
                  {text.selectButton.btnActions.title}
                  <Icon className={classes.btnFilter}>
                    expand_more_outlined
                  </Icon>
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
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={() => handleUpdate()}>
                          <MenuList role="menu">
                            <MenuItem
                              onClick={() => handleUpdate()}
                              className={classes.dropdownItem}
                            >
                              {text.selectButton.btnActions.value[0]}
                            </MenuItem>
                            <Link href="/admin/inventory/sync">
                              <a target="_blank">
                              <MenuItem
                                onClick={() => handleUpdate()}
                                className={classes.dropdownItem}
                              >
                                {text.selectButton.btnActions.value[1]}
                              </MenuItem>
                            </a>
                            </Link>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Poppers>
              </FormControl>
              <FormControl className={dashClasses.formControl}>
                <Button
                  id="update-label"
                  color="primary"
                  onClick={() => handleUpdate2()}
                >
                  {text.selectButton.btnAdd.title}
                  <Icon className={classes.btnFilter}>
                    expand_more_outlined
                  </Icon>
                </Button>
                <Poppers
                  open={Boolean(showUpdate2)}
                  anchorEl={showUpdate2}
                  transition
                  disablePortal
                  className={
                    classNames({ [classes.popperClose]: !showUpdate2 }) +
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
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={() => handleUpdate2()}>
                          <MenuList role="menu">
                          <Link href="/admin/inventory/create">
                              <a target="_blank">
                              <MenuItem
                                onClick={() => handleUpdate2()}
                                className={classes.dropdownItem}
                              >
                                {text.selectButton.btnAdd.value[0]}
                              </MenuItem>
                              </a>
                            </Link>
                            <Link href="/admin/inventory/create-ecom">
                              <a target="_blank">
                              <MenuItem
                                onClick={() => handleUpdate2()}
                                className={classes.dropdownItem}
                              >
                                {text.selectButton.btnAdd.value[1]}
                              </MenuItem>
                              </a>
                            </Link>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Poppers>
              </FormControl>
            </div>
          </div>
        </div>
        <div className={classes.selFilterTitleContainer}>
          <GridContainer>
            {storeStatusFilter &&
              doFilter > 0  &&
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
    cursor: "pointer",
    "&:hover,&:focus": {
      color: primaryColor[0],
    },
  },
  txtProductName2: {
    display: "block",
    fontSize: "15px !important",
    padding: "0 !important",
    margin: "0 !important",
    marginBottom: "4px !important",
    color: "rgba(0, 0, 0, 0.87)",
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
  txtshopListing: {
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
    overflow: "auto",
    paddingTop: "80px",
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
    textTransform: "uppercase",
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
  txtLink: {
    color: "#0168fa !important",
  },
  popperNav2: {
    zIndex: "1",
    top: "auto !important",
    right: "0 !important",
    left: "auto !important"
  },
  dropdownItem2: {
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
    "& a": {
      color: "#333",
    },
    "&:hover a": {
      color: "#fff",
    },
  },
  btnAction: {
    float: "right",
  },
};

InventoryPage.layout = Admin;

export default WithAuthentication(InventoryPage);
