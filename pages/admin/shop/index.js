import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-light-notifications";
import "react-light-notifications/lib/main.css";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Search from "@material-ui/icons/Search";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import { Icon } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Poppers from "@material-ui/core/Popper";
import adminStyles from "assets/jss/natcash/components/headerLinksStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import classNames from "classnames";
import Switch from "components/CustomSwitch/Switch.js";
import useWindowSize from "components/Hooks/useWindowSize.js";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import { setShowLoader } from "../../../redux/actions/app";
// connect api
import Cookies from 'js-cookie';
import { CHANNEL } from "../../../redux/actions/app";
import { activeCrm, addShop, getAllShop, getShopConnectCrmUrl, syncProduct, updateShop } from "../../../utilities/ApiManage";

import styles from "assets/jss/natcash/views/shoplist/shoplistStyle.js";
import { useRouter } from "next/router";

function ShopListPage() {
  const router = useRouter();
  const { shop_id, code } = router.query;
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useAdminStyles = makeStyles(adminStyles);
  const useTableStyles = makeStyles(tableStyles);
  const adminClasses = useAdminStyles();
  const tableClasses = useTableStyles();
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const [showFilter, setShowFilter] = useState(false);
  const [showAction, setShowAction] = useState([]);
  const [handleFilter, setHandleFilter] = useState("");
  const [tickFilter, setTickFilter] = useState("");
  const [smartFilter, setSmartFilter] = useState([]);
  const [fromDate, setFromDate] = useState(moment().format());
  const [toDate, setToDate] = useState(moment().format());
  const [isMobile, setIsMobile] = useState(false);
  const [codeShop, setCode] = useState("");
  const [modalItem, setModalItem] = useState({});
  const [isValidCode, setIsValidCode] = useState(true);
  const [helperTextInput, setHelperTextInput] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopCode, setShopCode] = useState("");
  const channel = useSelector((state) => state.app.channel);
  const dispatch = useDispatch();
  useEffect(() => {
    if (code) {
      if (channel && channel !== null && channel !== 'null') {
        addShop(shop_id, code, channel);
        dispatch({ type: CHANNEL, channel: null });
      }
      else {
        activeCrm(Cookies.get('shop_id'), true, code);
      }
    }
  }, []);

  const TABLE_HEAD = [
    { id: "en", value: ["Channel", "CRM", "Shop infomation", "Actions"] },
    { id: "vi", value: ["Kênh", "CRM", "Thông tin gian hàng", "Thao tác"] },
  ];
  const options = [
    {
      id: "en",
      title: "options",
      value: ["Decentralization", "Product sync", "Edit", "Delete"],
    },
    { id: "vi", title: "tùy chọn", value: ["Phân quyền", "Đồng bộ sản phẩm", "Sửa", "Xóa",] },
  ];
  const Filter = [
    {
      id: "en",
      value: {
        title: "Change shopId",
        value: ["Stock", "Created date", "Stock level", "Channel SKU mapping"],
        button: ["Reset", "Confirm"],
      },
    },
    {
      id: "vi",
      value: {
        title: "Đổi mã gian hàng",
        value: [
          "Tồn kho",
          "Ngày tạo",
          "Tồn kho",
          "Trạng thái liên kết sản phẩm đăng bán",
        ],
        button: ["Đặt lại", "Xác nhận"],
      },
    },
  ];

  const NOTIFICATION = [
    {
      id: "en",
      value: {
        title: ["Error", "Notification"],
        message: [
          "Please enter < 10 characters. No: spaces, accents and special characters",
          "Something well wrong! Please try again later",
          "Change shop code successfully",
          "Successfully renamed shop",
        ],
      },
    },
    {
      id: "vi",
      value: {
        title: ["Lỗi", "Thông báo"],
        message: [
          "Vui lòng nhập < 10 ký tự. Không có: khoảng trắng, dấu và ký tự đặc biệt",
          "Có lỗi xảy ra! Vui Lòng thử lại sau",
          "Đổi mã shop thành công",
          "Đổi tên shop thành công",
        ],
      },
    },
  ];
  const language = useSelector((state) => state.app.language);
  const listText = [
    {
      id: "en",
      title: "Shop",
      subTitle: "List of linked shops",
      txtSearch: "Find by account",
      tableHead: TABLE_HEAD[0].value,
      optionsTitle: options[0].title,
      options: options[0].value,
      fillter: Filter[0].value,
      btnEdit: "Edit",
      notification: NOTIFICATION[0].value,
    },
    {
      id: "vi",
      title: "Gian hàng",
      subTitle: "Gian hàng đã liên kết",
      txtSearch: "Tìm kiếm tài khoản",
      tableHead: TABLE_HEAD[1].value,
      optionsTitle: options[1].title,
      options: options[1].value,
      fillter: Filter[1].value,
      btnEdit: "Sửa",
      notification: NOTIFICATION[1].value,
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
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        setIsMobile(window.innerWidth < 1200);
      },
      false
    );
  }, []);

  const [data, setData] = useState([]);
  const getShopData = async () => {
    var res = await getAllShop();
    setData(res.data);
  };

  useEffect(() => {
    getShopData();
  }, []);

  const handleConnect = async (item) => {
    dispatch({ type: CHANNEL, channel: null });
    if (!item.active_crm) {
      var res = await getShopConnectCrmUrl(item.shopId, item.channel);
      if (res) {
        var url = res;
        const win = window.open(url, "_blank");
        if (win != null) {
          win.focus();
        }
      }
    }
    else {
      activeCrm(item.shopId, false);
    }
    return;
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
  const handleActionSync = async (item) => {
    dispatch(setShowLoader(true));
    let res = await syncProduct(item);
    dispatch(setShowLoader(false));
    if (res.code === 200) {
      // Router.push("/admin/shop");
      NotificationManager.success({
        title: "Success",
        message: "Success",
      });
    } else {
      NotificationManager.error({
        title: "Error",
        message: res.message ? res.message : "Error",
      });
    }
  };

  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  function hasUnicode(str) {
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 127) return true;
    }
    return false;
  }

  // Update shop name
  const handleBlurShopName = async (item) => {
    const rest = await updateShop(item.shopId, shopName, item.code);
    if (shopName !== item.name) {
      if (rest.code == 200) {
        NotificationManager.success({
          title: `${text.notification.title[1]}`,
          message: `${text.notification.message[3]}`,
        });
      } else {
        NotificationManager.error({
          title: `${text.notification.title[0]}`,
          message: `${text.notification.message[1]}`,
        });
      }
    }
  };

  const onClickShopName = (item) => {
    setShopName(item.name);
  };

  const onChangeShopName = (e) => {
    setShopName(e.target.value);
  };

  // Update shop code
  const onClickShopCode = (item) => {
    setShopCode(item.code);
  };

  const onChangeShopCode = (e) => {
    setShopCode(e.target.value);
  };

  const handleBlurShopCode = async (item) => {
    if (shopCode !== item.code) {
      if (
        shopCode.length > 20 ||
        shopCode.length <= 0 ||
        format.test(shopCode) ||
        hasUnicode(shopCode)
      ) {
        NotificationManager.error({
          title: `${text.notification.title[1]}`,
          message: `${text.notification.message[0]}`,
        });
      } else {
        const rest = await updateShop(item.shopId, item.name, shopCode);
        if (rest.code == 200) {
          NotificationManager.success({
            title: `${text.notification.title[1]}`,
            message: `${text.notification.message[2]}`,
          });
        } else {
          NotificationManager.error({
            title: `${text.notification.title[0]}`,
            message: `${text.notification.message[1]}`,
          });
        }
      }
    }
  };
  const renderTable = (item, index) => {
    return (
      <TableRow key={index} className={tableClasses.tableBodyRow}>
        <TableCell className={tableClasses.tableCell} key={"shopImage"}>
          <img src={item.icon} className={classes.tableImage} />
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"shopType"}>
          <Switch
            checked={item.active_crm}
            onChange={() => handleConnect(item)}
            name="checkedA"
            disabled={(item.channel == "shopee" || item.channel == "lazada") ? false : true}
          />
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={"shopInfo"}>
          <div className={classes.shopInfo}>
            <img src={item.avatar} className={classes.tableImage} />
            <div className={classes.shopInfoTxt}>
              <Tooltip title={text.btnEdit + " " + "🖊"} placement="right-start">
                <input
                  type="text"
                  id="shopName"
                  name="shopName"
                  defaultValue={item?.name}
                  className={classes.inputText + " " + classes.inputShopName}
                  onBlur={() => handleBlurShopName(item)}
                  onClick={() => onClickShopName(item)}
                  onChange={onChangeShopName}
                />
              </Tooltip>
              <Tooltip title={text.btnEdit + " " + "🖊"} placement="right-start">
                <input
                  type="text"
                  id="shopCode"
                  name="shopCode"
                  defaultValue={item?.code}
                  className={classes.inputText + " " + classes.inputShopType}
                  onBlur={() => handleBlurShopCode(item)}
                  onClick={() => onClickShopCode(item)}
                  onChange={onChangeShopCode}
                />
              </Tooltip>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.proInfoContainer} key={"action"}>
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
              {text.optionsTitle}
              <Icon className={classes.btnFilter}>expand_more_outlined</Icon>
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
                classes.popperNav
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
                        <MenuItem className={classes.dropdownItem}>
                          <Link href={"/admin/shop/" + item.shopId}>
                            <a target="_blank">{text?.options[0]}</a>
                          </Link>
                        </MenuItem>
                        <MenuItem className={classes.dropdownItem}>
                          <Link href={"/admin/shop/" + item.shopId}>
                            <a target="_blank">{text?.options[2]}</a>
                          </Link>
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleActionSync(item)}
                          className={classes.dropdownItem}
                        >
                          {text?.options[1]}
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleAction(item)}
                          className={classes.dropdownItem}
                        >
                          {text?.options[3]}
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
        <h4 className={classes.cardTitleWhite}>{text.title}</h4>
        <p className={classes.cardCategoryWhite}>{text.subTitle}</p>
      </CardHeader>
      <CardBody className={classes.cardBody}>
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
                    placeholder: `${text.txtSearch}`,
                  }}
                />
                <Button color="white" aria-label="edit" justIcon round>
                  <Search />
                </Button>
              </div>
            </FormControl>
          </div>
        </div>
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
                  {text.tableHead.map((prop, key) => {
                    return (
                      <TableCell
                        className={
                          tableClasses.tableCell +
                          " " +
                          tableClasses.tableHeadCell
                        }
                        key={key}
                        style={{
                          textAlign: `${key == text.tableHead.length - 1 ? "right" : "left"
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
              {data?.map((item, index) => {
                return renderTable(item, index);
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
        <NotificationContainer />
      </CardFooter>
    </Card>
  );
}

ShopListPage.layout = Admin;

export default WithAuthentication(ShopListPage);
