import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { formatNumber } from "../../../utilities/utils";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import { Icon } from "@material-ui/core";
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
import CustomInput from "components/CustomInput/CustomInput.js";
import shopStyle from "assets/jss/natcash/views/shoplist/shoplistStyle.js";
import ModalCustom from "components/ModalCustom/ModalCustom.js";
import Search from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import GridContainer from "components/Grid/GridContainer.js";
import adminStyles from "assets/jss/natcash/components/headerLinksStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import styles from "assets/jss/natcash/views/qrshop/qrshopIndexStyle";
import { KeyboardDatePicker, MuiPickersUtilsProvider, } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import vi from "date-fns/locale/vi";
import Poppers from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import classNames from "classnames";
import { getRequestPayment, updateConfirmPayment, updateNotePayment } from "../../../utilities/ApiManage";
import Pagination from "@material-ui/lab/Pagination";
import { setShowLoader } from "../../../redux/actions/app";
import { NotificationContainer, NotificationManager, } from "react-light-notifications";
import { primaryColor } from "../../../assets/jss/natcash";
import { useTranslation } from "react-i18next";
import Router from "next/router";
import { activeCrm, addShop, getAllShop, getShopConnectCrmUrl, syncProduct, updateShop } from "../../../utilities/ApiManage";

const QrShopFakeData = [
  {
    id: '1',
    name: 'Shop 1',
    link: 'http://shop1/qr1',
    status: true,
    publish: "2021-10-28T13:20:36+07:00",
    update: "2021-10-28T13:20:36+07:00"
  }, {
    id: '2',
    name: 'Shop 2',
    link: 'http://shop1/qr2',
    status: true,
    publish: "2021-10-28T13:20:36+07:00",
    update: "2021-10-28T13:20:36+07:00"
  }, {
    id: '3',
    name: 'Shop 3',
    link: 'http://shop1/qr3',
    status: true,
    publish: "2021-10-28T13:20:36+07:00",
    update: "2021-10-28T13:20:36+07:00"
  }, {
    id: '4',
    name: 'Shop 4',
    link: 'http://shop1/qr4',
    status: true,
    publish: "2021-10-28T13:20:36+07:00",
    update: "2021-10-28T13:20:36+07:00"
  }, {
    id: '5',
    name: 'Shop 5',
    link: 'http://shop1/qr5',
    status: true,
    publish: "2021-10-28T13:20:36+07:00",
    update: "2021-10-28T13:20:36+07:00"
  }, {
    id: '6',
    name: 'Shop 6',
    link: 'http://shop1/qr6',
    status: true,
    publish: "2021-10-28T13:20:36+07:00",
    update: "2021-10-28T13:20:36+07:00"
  },
];

function ShopListPage() {
  const useShopStyles = makeStyles(shopStyle);
  const shopClasses = useShopStyles();
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const [isShowModal, setIsShowModal] = useState(false);
  const useAdminStyles = makeStyles(adminStyles);
  const useTableStyles = makeStyles(tableStyles);
  const adminClasses = useAdminStyles();
  const classes = useStyles();
  const tableClasses = useTableStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const [showAction, setShowAction] = useState([]);
  const [doFilter, setDoFilter] = useState(0);
  const [doSearch, setDoSearch] = useState(false);
  const [filterDate, setFilterDate] = useState(false);
  const { t } = useTranslation();

  const TABLE_HEAD = [
    t('qrManagement.stt'),
    'Shop code',
    'Shop name',
    'Address',
    'Phone',
    'Status',
    'Type',
    t('action'),
  ];

  const [selectedTitle, setSelectedTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [txtSearch, setTxtSearch] = useState("");
  const [fromDate, setFromDate] = useState(
    moment().subtract(30, "days").format()
  );
  const [toDate, setToDate] = useState(moment().format());
  const [isMobile, setIsMobile] = useState(false);
  const [checked, setChecked] = useState([]);

  const [data, setData] = useState([]);
  const getShopData = async () => {
    var res = await getAllShop();
    console.log('getShopData', res);
    setData(res.data);
  };

  useEffect(() => {
    getShopData();
  }, []);

  const MENU_TITLE_INFO = [
    {
      name: t('all'),
      value: "ALL",
    },
    {
      name: t('qrManagement.notActive'),
      value: "NOTACTIVE",
    },
    {
      name: t('qrManagement.active'),
      value: "ACTIVE",
    },
  ];

  const menuTitleData = {
    "ready_to_ship": 51,
    "processed": 10,
    "shipped": 47,
    "to_confirm_receive": 105,
    "to_return": 0,
    "cancelled": 519
  }
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        setIsMobile(window.innerWidth < 1570);
      },
      false
    );
  }, []);

  const resetFilterDate = () => {
    setFromDate(moment().subtract(30, "days").format());
    setToDate(moment().format());
    setFilterDate(false);
    setDoFilter(0);
  };
  const handleSelectPage = (event, value) => {
    setCurrentPage(value);
  };
  const handleTitle = (item) => {
    setSelectedTitle(item);
    setCurrentPage(1);
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
  const handleInputSearch = (event) => {
    setTxtSearch(event.target.value);
    setCurrentPage(1);
  };
  const renderShop = (item, index) => {
    console.log('renderShop', item);
    return (
      <TableRow
        key={index}
        className={tableClasses.tableBodyRow}
        style={{
          backgroundColor: checked.indexOf(item) !== -1 ? "#fff6f0" : "#fff",
        }}
      >
        <TableCell className={tableClasses.tableCell} key={"shopInfo3"}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + " " + classes.txtOrderInfo}>
              {index}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"shopInfo"}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + " " + classes.txtOrderInfo}>
              {item.code}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"name"}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + " " + classes.txtOrderInfo}>
              {item.name}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"shopInfo"}>
        <div className={classes.proInfoContainer}>
          <p className={tableClasses.tableCell + " " + classes.txtOrderInfo}>
            Ha Noi
          </p>
        </div>
      </TableCell>
        <TableCell className={tableClasses.tableCell} key={"link"}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + " " + classes.txtOrderInfo}>
            0912012344
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"status"}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + " " + classes.txtOrderInfo}>
              {item.status ? t('qrManagement.active') : t('qrManagement.notActive')}
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"detail"}>
          <div className={classes.proInfoContainer}>
            <p className={tableClasses.tableCell + " " + classes.txtOrderInfo}>
            {/* {moment(item.update).format("DD/MM/YYYY")}*/}
            Clothers
            </p>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          <div className={classes.text + " " + classes.infoTextStatus + " " + classes.flex_center}>
            <a
              target="_blank"
              className={tableClasses.tableCell + " " + classes.txtOrderCode + " " + classes.cursor}>
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
                onClick={() => handleAction(item)}>
                <Icon className={shopClasses.btnFilter}>settings</Icon>
              </Button>
            </a>
            <Poppers
              open={Boolean(showAction.indexOf(item) !== -1)}
              anchorEl={showAction.indexOf(item) !== -1}
              transition
              disablePortal
              className={
                classNames({
                  [shopClasses.popperClose]: !showAction.indexOf(item) !== -1,
                }) +
                " " +
                classes.actionPopperNav
              }
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id={"action-list-grow" + item?.order_sn}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={() => handleAction(item)}>
                      <MenuList role="menu">
                        <MenuItem className={classes.dropdownItem}
                          onClick={() => {
                            Router.push('/admin/shop/addshop');
                          }}
                        >
                          {t('detail')}
                        </MenuItem>
                        <MenuItem className={classes.dropdownItem}
                          onClick={() => {
                            Router.push('/admin/shop/addshop');
                          }}
                        >
                          {t('edit')}
                        </MenuItem>
                        <MenuItem className={classes.dropdownItem}
                          onClick={() => {
                            setIsShowModal(true);
                          }}
                        >
                          {t('delete')}
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
    );
  };

  return (
    <Card>
      <NotificationContainer />
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{t('sideBar.shopManagement')}</h4>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        <div className={classes.selectTitleContainer}>
          <GridContainer>
            {MENU_TITLE_INFO.map((item, index) => {
              return (
                <div
                  className={classes.selectContainer}
                  style={{
                    backgroundColor:
                      selectedTitle.value == item.value ? primaryColor[3] : "",
                  }}
                  onClick={() => handleTitle(item)}
                >
                  <p>{item.name}</p>
                  {menuTitleData[Object.keys(menuTitleData)[index - 1]] > 0 && (
                    <p className={classes.txtNumTitle}>
                      {formatNumber(
                        menuTitleData[Object.keys(menuTitleData)[index - 1]]
                      )}
                    </p>
                  )}
                </div>
              );
            })}
          </GridContainer>
        </div>
        <div
          className={dashClasses.filterSelections + " " + classes.flex_center_between}
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
                    placeholder: t('findBy'),
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
            <FormControl className={dashClasses.formControl}
              style={{ marginRight: "25px" }}>
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
                  classes.datePopperNav
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
                              {t('chooseDate')}
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
                                    label={t('from')}
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
                                    label={t('to')}
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
                                {t('reset')}
                              </Button>
                              <Button
                                color="primary"
                                size="sm"
                                onClick={() => {
                                  setDoFilter(doFilter + 1);
                                  setFilterDate(false);
                                }}
                              >
                                {t('apply')}
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
          </div>
          <FormControl
            className={dashClasses.formControl}
            style={{
              marginRight: "25px",
              position: isMobile ? "static" : "absolute",
              right: "0",
            }}
          >
            <Link href={"/admin/shop/addshop"}>
              <Button id="update-label" color="green">
                CREATE NEW SHOP
              </Button>
            </Link>

          </FormControl>
        </div>
        <ModalCustom
          width={600}
          title={t('confirmation')}
          subTitle={""}
          // isShow={true}
          isShow={isShowModal}
          handleClose={() => setIsShowModal(false)}
        >
          <div className={classes.flex_center}>
            <FormControl variant="outlined" size="small" style={{ flex: 1 }}>
              <p style={{ flex: 1 }}>
                {t('deleteConfirm')}
              </p>
            </FormControl>
          </div>
          <div
            className={tableClasses.tableResponsive}
            style={{ marginTop: "0", flexDirection: "row-reverse", display: 'flex', }}
          >
            <div className={classes.buttonContainer}>
              <Button
                color="primary"
                onClick={() => { }}
              >
                {t('submit')}
              </Button>
            </div>
            <div className={classes.buttonContainer}>
              <Button
                color="gray"
                onClick={() => setIsShowModal(false)}
              >
                {t('cancel')}
              </Button>
            </div>
          </div>
        </ModalCustom>
      </CardBody>
      <CardFooter>
        <div
          className={tableClasses.tableResponsive}
          style={{ marginTop: "0", marginLeft: "20px" }}
        >
          <Table className={tableClasses.table}>
            {data !== undefined ? (
              <TableHead className={tableClasses["primary" + "TableHeader"]}>
                <TableRow className={tableClasses.tableHeadRow}>
                  {TABLE_HEAD.map((prop, key) => {
                    return (
                      <TableCell
                        className={
                          tableClasses.tableCell +
                          " " +
                          tableClasses.tableHeadCell
                        }
                        style={{
                          textAlign: "left",
                          // width: key == 4 || key == 0 ? "200px" : null,
                        }}
                        key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
            ) : null}
            <TableBody>
              {data.map((item, index) => {
                return renderShop(item, index);
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
        </div>
      </CardFooter>
    </Card>
  );
}

ShopListPage.layout = Admin;

export default WithAuthentication(ShopListPage);
