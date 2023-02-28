import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import moment from "moment";
import Link from "next/link";
import "react-light-notifications/lib/main.css";
// @material-ui/core components
import {grayColor, primaryColor, successColor,} from "assets/jss/natcash.js";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import {
  Box,
  ClickAwayListener,
  FormControl,
  Grow,
  Icon,
  InputLabel,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  useTheme,
  withStyles,
} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Poppers from "@material-ui/core/Popper";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import GridContainer from "components/Grid/GridContainer.js";
import adminStyles from "assets/jss/natcash/components/headerLinksStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";
import shopStyle from "assets/jss/natcash/views/shoplist/shoplistStyle.js";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import vi from "date-fns/locale/vi";
import classNames from "classnames";
import useWindowSize from "components/Hooks/useWindowSize.js";
import CartTotalInfo from "components/CartTotalInfo/CartTotalInfo.js";
import PropTypes from "prop-types";

import {formatCurrency} from "../../../utilities/utils";

import {useRouter} from "next/router";
import styles from "assets/jss/natcash/views/voucher/voucherStyle.js";

import imgMoney from "assets/img/money.png";
import imgPercent from "assets/img/percent.png";
import {useTranslation} from "react-i18next";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Search from "@material-ui/icons/Search";

function VoucherPage() {
  const router = useRouter();
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const useAdminStyles = makeStyles(adminStyles);
  const adminClasses = useAdminStyles();
  const useShopStyles = makeStyles(shopStyle);
  const shopClasses = useShopStyles();
  const useTableStyles = makeStyles(tableStyles);
  const tableClasses = useTableStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const theme = useTheme();
  const [showAction, setShowAction] = useState([]);
  //filter date
  const [filterDate, setFilterDate] = useState(false);
  const [fromDate, setFromDate] = useState(
    moment().subtract(30, "days").format()
  );
  const [toDate, setToDate] = useState(moment().format());
  const [isMobile, setIsMobile] = useState(false);
  const [doFilter, setDoFilter] = useState(0);
  const [doSearch, setDoSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [txtSearch, setTxtSearch] = useState("");

  const {t} = useTranslation();

  const TAB_LIST = [
      t('all'),
      t('happening'),
      t('upcoming'),
      t('finished')
  ];

  const TABLE_HEAD = [
        t('voucher.codeAndName'),
        t('voucher.type'),
        t('voucher.discount'),
        t('voucher.canBeUsed'),
        t('voucher.used'),
        t('voucher.statusAndTime'),
        t('action'),
  ];

  useEffect(() => {
    window.addEventListener(
        "resize",
        () => {
          setIsMobile(window.innerWidth < 1200);
        },
        false
    );
  }, []);

  const listValue = [
    {
      title: t('voucher.quantityUsed'),
      tooltip: t('voucher.quantityUsedTooltip'),
      value: 19,
      compareValue: "55.81%",
      type: "up",
    },
    {
      title: t('voucher.buyer'),
      tooltip: t('voucher.buyerTooltip'),
      value: 19,
      compareValue: "54.76%",
      type: "down",
    },
    {
      title: t('voucher.quantitySold'),
      tooltip: t('voucher.quantitySoldTooltip'),
      value: 27,
      compareValue: "56.45%",
      type: "down",
    },
    {
      title: t('voucher.revenue'),
      tooltip: t('voucher.revenueTooltip'),
      value: "5.203.660",
      compareValue: "72.29%",
      type: "down",
    },
  ];



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

  const ShopFilter = () => {
    return (
      <div className={classes.shopFilterContainer}>
        <FormControl className={dashClasses.formControl}>
          <div style={{marginRight: "15px"}}>
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
              <Search/>
            </Button>
          </div>
        </FormControl>
        {/* filter date */}
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
                  <ClickAwayListener onClickAway={() => setFilterDate(false)}>
                    <div style={{ width: isMobile ? "190px" : "460px" }}>
                      <div style={{ padding: "7px 15px", borderRadius: "4px" }}>
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
    );
  };

  const [data, setData] = useState([
    {
      id: 312313,
      code: "SHOP5249K",
      name: "sale giữa tháng",
      shop_id: 54435575,
      shop_icon:
        "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
      shop_name: "ShopTreTho Miền Nam",
      type: "product",
      product_quantity: 2,
      discount: 249000,
      discount_type: "money",
      canUse: 100,
      used: 10,
      status: "Finished",
      time_from: "00:00 15/09/2021",
      time_to: "23:59 15/09/2021",
    },
    {
      id: 123421,
      code: "SHOP1509K",
      name: "15.9",
      shop_id: 54435575,
      shop_icon:
        "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
      shop_name: "ShopTreTho Miền Nam",
      type: "all",
      discount: 40,
      discount_type: "percent",
      canUse: 30,
      used: 26,
      status: "Happening",
      time_from: "00:00 15/09/2021",
      time_to: "23:59 15/09/2021",
    },
    {
      id: 432412,
      code: "SHOP1509K",
      name: "15.9",
      shop_id: 54435575,
      shop_icon:
        "https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png",
      shop_name: "ShopTreTho Miền Nam",
      type: "all",
      discount: 40,
      discount_type: "percent",
      canUse: 30,
      used: 26,
      status: "Upcoming",
      time_from: "00:00 15/09/2021",
      time_to: "23:59 15/09/2021",
    },
  ]);

  const StatusText = (text, color) => {
    return (
      <p
        className={classes.text + " " + classes.infoTextStatus}
        style={{ color: color }}
      >
        {text}
      </p>
    );
  };

  const renderTable = (item, index) => {
    let color = "black";
    if (item.status == "Finished") {
      color = grayColor[0];
    } else if (item.status == "Happening") {
      color = successColor[1];
    } else if (item.status == "Upcoming") {
      color = primaryColor[0];
    }
    return (
      <TableRow
        key={"renderTable" + index}
        className={tableClasses.tableBodyRow}
      >
        <TableCell className={tableClasses.tableCell} key={"CodeName"}>
          <div className={classes.cellInfo}>
            <img
              src={item.discount_type == "money" ? imgMoney : imgPercent}
              className={classes.tableImage}
            />
            <div className={classes.infoTextContainer}>
              <Link
                href={
                  item.status == "Happening" ? "" : "/admin/voucher/" + item.id
                }
              >
                <p
                  className={
                    classes.text +
                    " " +
                    classes.infoTextPrimary +
                    " " +
                    classes.cursorHover
                  }
                >
                  {item.code}
                </p>
              </Link>
              <p className={classes.text + " " + classes.infoTextSecondary}>
                {item.name}
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Type"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.type == "product" ? t('sideBar.product') : t('voucher.wholeShop')}
          </p>
          <p className={classes.text + " " + classes.infoTextSecondary}>
            {item.type == "product"
              ? `(${item.product_quantity} ${t('sideBar.product')})`
              : t('voucher.allProduct')}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Discount"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.discount_type == "money"
              ? formatCurrency(item.discount)
              : item.discount + "%"}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"CanBeUsed"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.canUse}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Used"}>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.used}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"StatusUpdate"}>
          {StatusText(item.status, color)}
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.time_from}
          </p>
          <p className={classes.text + " " + classes.infoTextPrimary}>
            {item.time_to}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"Action"}>
          <div className={shopClasses.proInfoContainer} key={"action"}>
            <Button
              id={"action-label" + item?.shopId}
              aria-owns={
                showAction.indexOf(item) !== -1
                  ? "action-list-grow" + item?.shopId
                  : null
              }
              aria-haspopup="true"
              color="white"
              size="sm"
              onClick={() => handleAction(item)}
            >
              {/*{t('options')}*/}
              <Icon className={shopClasses.btnFilter}>settings</Icon>
            </Button>
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
                shopClasses.popperNav
              }
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id={"action-list-grow" + item?.id}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={() => handleAction(item)}>
                      <MenuList role="menu">
                          <MenuItem className={shopClasses.dropdownItem}>
                            <Link
                              href={
                                "/admin/voucher/" +
                                item.id +
                                "?status=" +
                                item.status
                              }
                            >
                              <a target="_blank">{t('detail')}</a>
                            </Link>
                          </MenuItem>
                        {item.status == "Upcoming" && (
                          <MenuItem className={shopClasses.dropdownItem}>
                            <Link href={"/admin/shop/" + item.shopId}>
                              <a target="_blank">{t('edit')}</a>
                            </Link>
                          </MenuItem>
                        )}
                        {item.status == "Upcoming" && (
                          <MenuItem className={shopClasses.dropdownItem}>
                            <Link href={"/admin/shop/" + item.shopId}>
                              <a target="_blank">{t('delete')}</a>
                            </Link>
                          </MenuItem>
                        )}
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

  const TableData = () => {
    return (
      // <div className={tableClasses.tableResponsive}>
      <Table className={tableClasses.table}>
        {data !== undefined ? (
          <TableHead className={tableClasses["primary" + "TableHeader"]}>
            <TableRow className={tableClasses.tableHeadRow}>
              {TABLE_HEAD.map((prop, key) => {
                return (
                  <TableCell
                    className={
                      tableClasses.tableCell + " " + tableClasses.tableHeadCell
                    }
                    key={key}
                    style={{
                      textAlign: `${
                        key == TABLE_HEAD.length - 1 ? "right" : "left"
                      }`,
                    }}
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
            return renderTable(item, index);
          })}
        </TableBody>
      </Table>
      // </div>
    );
  };

  const CartListItem = () => {
    const handleChange = (event, newValue) => {
      setTabValue(newValue);
    };

    const handleChangeIndex = (index) => {
      setTabValue(index);
    };

    function TabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`full-width-tabpanel-${index}`}
          aria-labelledby={`full-width-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box p={3}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }

    TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.any.isRequired,
      value: PropTypes.any.isRequired,
    };

    function a11yProps(index) {
      return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
      };
    }

    const AntTabs = withStyles({
      root: {
        borderBottom: "1px solid #e8e8e8",
      },
      indicator: {
        backgroundColor: "#1890ff",
      },
    })(Tabs);

    const AntTab = withStyles((theme) => ({
      root: {
        textTransform: "none",
        fontSize: 16,
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(","),
        "&:hover": {
          color: "#40a9ff",
          opacity: 1,
        },
        "&$selected": {
          color: "#1890ff",
          fontWeight: theme.typography.fontWeightMedium,
        },
        "&:focus": {
          color: "#40a9ff",
        },
      },
      selected: {},
    }))((props) => <Tab disableRipple {...props} />);

    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>{t('voucher.listVoucher')}</h4>
          <p className={classes.cardCategoryWhite}>{t('voucher.listVoucherDes')}</p>
        </CardHeader>
        <CardBody className={classes.cardBody}>
          <div className={classes.tabHeaderContainer}>
            <AntTabs
              value={tabValue}
              onChange={handleChange}
              aria-label="ant example"
              style={{ width: "100%" }}
            >
              {TAB_LIST.map((item, index) => (
                <AntTab
                  label={item}
                  {...a11yProps(index)}
                  key={"tab" + index}
                />
              ))}
            </AntTabs>
            <Link href={"/admin/voucher/addvoucher"}>
              <Button color="primary">
                <Icon className={classes.btnFilter}>add</Icon>
                {t('addNew')}
              </Button>
            </Link>
          </div>
          {/* <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={tabValue}
            onChangeIndex={handleChangeIndex}
            className={classes.swipeableViews}
          > */}
          <div>
            <TabPanel
              value={tabValue}
              index={0}
              dir={theme.direction}
              className={classes.tabPanel}
            >
              {TableData()}
            </TabPanel>
          </div>
          {/* </SwipeableViews> */}
        </CardBody>
      </Card>
    );
  };

  return (
    <>
      <CartTotalInfo
        title={t('sideBar.voucher')}
        subTitle=""
        compareText={t('voucher.comparedSeven')}
        listValue={listValue}
        xs={3}
        sm={3}
        md={3}
        column={4}
      />
      {ShopFilter()}
      {CartListItem()}
    </>
  );
}

VoucherPage.layout = Admin;

export default WithAuthentication(VoucherPage);
