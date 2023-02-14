import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Search from "@material-ui/icons/Search";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import {
  Table,
  TableBody,
  TableCell, TableHead, TableRow
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@material-ui/core/Icon";
import InputLabel from "@material-ui/core/InputLabel";
import Poppers from "@material-ui/core/Popper";
import classNames from "classnames";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import useWindowSize from "components/Hooks/useWindowSize.js";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import moment from "moment";
import { useRouter } from "next/router";

import defaultImage from "assets/img/defaultImage.jpg";
import adminStyles from "assets/jss/natcash/components/headerLinksStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import styles from "assets/jss/natcash/views/shoplist/shoplistDetailStyle.js";

// connect api
import { getShop } from "../../../utilities/ApiManage";

function ShopListDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useTableStyles = makeStyles(tableStyles);
  const tableClasses = useTableStyles();
  const useDashStyles = makeStyles(dashStyles);
  const useAdminStyles = makeStyles(adminStyles);
  const adminClasses = useAdminStyles();
  const dashClasses = useDashStyles();
  const [employee, setEmployee] = useState();
  const [showAction, setShowAction] = useState([]);
  const [roleText, setRoleText] = useState("");
  const [ecom, setEcom] = useState();

  const employeeData = [
    {
      id: "hoangnv",
      value: 1,
      name: "Nguyễn Văn Hoàng",
    },
    {
      id: "longnd",
      value: 2,
      name: "Nguyễn Duy Long",
    },
    {
      id: "taink",
      value: 3,
      name: "Nguyễn Khắc Tài",
    },
    {
      id: "truonglq",
      value: 4,
      name: "Lê Quang Trường",
    },
  ];
  const shopInfo = [
    {
      id: "en",
      value: [
        "Ecommerce type",
        "Create Date",
        "Update date",
        "You can share your management rights for employee accounts in and assign permissions to each account by granting them access rights.",
      ],
      button: {
        title: "Confirm",
        placeholder: "Employee",
      },
    },
    {
      id: "vi",
      value: [
        "Loại kênh",
        "Ngày tạo",
        "Ngày cập nhật",
        "Bạn có thể chia sẻ quyền quản lý của mình cho các tài khoản nhân viên trong và phân quyền cho từng tài khoản bằng cách cấp quyền truy cập cho họ",
      ],
      button: {
        title: "Xác nhận",
        placeholder: "Nhân viên",
      },
    },
  ];
  const options = [
    {
      id: "en",
      title: "options",
      value: ["Delete"],
    },
    {
      id: "vi",
      title: "tùy chọn",
      value: ["Xóa"],
    },
  ];
  const TABLE_HEAD = [
    { id: "en", value: ["Avatar", "Name", "Role", "Actions"] },
    { id: "vi", value: ["Ảnh", "Tên", "Quyền", "Thao tác"] },
  ];
  const PERMISSION = [
    { id: "en", value: ["Active", "Disable"] },
    { id: "vi", value: ["Kích hoạt", "Vô hiệu"] },
  ];

  const language = useSelector((state) => state.app.language);
  const [text, setText] = useState({
    id: "en",
    title: "Ecommerce",
    subTitle: "Ecommerce information",
    txtSearch: "Find employee",
    tableTitle: "List of authorized employees",
    tableHead: TABLE_HEAD[0].value,
    shopInfo: shopInfo[0].value,
    filterBtn: shopInfo[0].button,
    optionsTitle: options[0].title,
    options: options[0].value,
    permission: PERMISSION[0].value,
  });
  const listText = [
    {
      id: "en",
      title: "Ecommerce",
      subTitle: "Ecommerce information",
      txtSearch: "Find employee",
      tableTitle: "List of authorized employees",
      tableHead: TABLE_HEAD[0].value,
      shopInfo: shopInfo[0].value,
      filterBtn: shopInfo[0].button,
      optionsTitle: options[0].title,
      options: options[0].value,
      permission: PERMISSION[0].value,
    },
    {
      id: "vi",
      title: "Gian hàng",
      subTitle: "Thông tin gian hàng",
      txtSearch: "Tìm kiếm tài khoản",
      tableTitle: "Danh sách nhân viên đã được phân quyền",
      tableHead: TABLE_HEAD[1].value,
      shopInfo: shopInfo[1].value,
      filterBtn: shopInfo[1].button,
      optionsTitle: options[1].title,
      options: options[1].value,
      permission: PERMISSION[1].value,
    },
  ];
  const rand = () => Math.round(Math.random() * 5000000);
  const [isMobile, setIsMobile] = useState(false);

  const getShopData = async () => {
    var res = await getShop(id);
    setEcom(res.data);
  };

  useEffect(() => {
    getShopData();
  }, []);

  const handleChangeEmployee = (event) => {
    setEmployee(event.target.value);
  };

  useEffect(() => {
    for (let i = 0; i < listText.length; i++) {
      if (language == listText[i].id) {
        setText(listText[i]);
        break;
      }
    }
  }, [language]);
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

  const changePermission = (item) => {
    alert("ok ok");
    handleAction(item);
  };

  const renderTable = (item, index) => {
    return (
      <TableRow key={index} className={tableClasses.tableBodyRow}>
        <TableCell className={tableClasses.tableCell}>
          <img
            src={item?.avatar != undefined ? item.avatar : defaultImage}
            className={classes.tableImage}
          />
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          {item?.full_name}
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
          {item?.permission_name}
        </TableCell>
        <TableCell className={tableClasses.tableCell}>
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
                        <MenuItem
                          onClick={() => changePermission(item)}
                          className={classes.dropdownItem}
                        >
                          {text.permission[1]}
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleAction(item)}
                          className={classes.dropdownItem}
                        >
                          {text.options[0]}
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
    <div>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>{text.title}</h4>
          <p className={classes.cardCategoryWhite}>{text.subTitle}</p>
        </CardHeader>
        <CardBody className={classes.cardBody} style={{ paddingBottom: 0 }}>
          <div className={classes.cardBodyLeft}>
            <img
              className={classes.avatar}
              src={ecom?.avatar.length > 0 ? ecom?.avatar : defaultImage}
            ></img>
            <ul className={classes.info}>
              <li className={classes.infoText + " " + classes.infoName}>
                {ecom?.name} ({ecom?.code})
              </li>
              <li className={classes.infoText + " " + classes.infoTime}>
                {text.shopInfo[0]}: {ecom?.channel}
              </li>
              <li className={classes.infoText + " " + classes.infoTime}>
                {text.shopInfo[1]}:{" "}
                {moment(ecom?.create_time).format("DD-MM-YYYY")}
              </li>
              <li className={classes.infoText + " " + classes.infoTime}>
                {text.shopInfo[2]}:{" "}
                {moment(ecom?.update_time).format("DD-MM-YYYY")}
              </li>
              <li className={classes.warningText}>{text.shopInfo[3]}</li>
            </ul>
          </div>
          <div className={classes.cardBodyRight}>
            <FormControl className={classes.formControl}>
              <InputLabel id="employee-select-label">
                {text.filterBtn.placeholder}
              </InputLabel>
              <Select
                labelId="employee-select-label"
                id="employee-select"
                value={employee}
                onChange={handleChangeEmployee}
              >
                {employeeData.map((item) => (
                  <MenuItem value={item.value}>
                    {item.name} ({item.id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              color="green"
              // onClick={handleFilterWeek()}
              className={classes.btnConfirm}
            >
              {text.filterBtn.title}
            </Button>
          </div>
        </CardBody>
        <CardFooter
          className={classes.cardFooter}
          style={{ paddingTop: 0, display: "flex", flexDirection: "column" }}
        >
          <div className={classes.cardFooterTop}>
            <h4 className={classes.cardFooterTitle}>{text.tableTitle}</h4>
            <FormControl className={dashClasses.formControl}>
              <div>
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
          <div
            className={tableClasses.tableResponsive}
            style={{ marginTop: "0", marginLeft: "20px" }}
          >
            <Table className={tableClasses.table}>
              {ecom?.members_list !== undefined ? (
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
                            textAlign:
                              key == text.tableHead.length - 1
                                ? "right"
                                : "left",
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
                {ecom?.members_list.map((item, index) => {
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
        </CardFooter>
      </Card>
    </div>
  );
}

ShopListDetailPage.layout = Admin;

export default WithAuthentication(ShopListDetailPage);
