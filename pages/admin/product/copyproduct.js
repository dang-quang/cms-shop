import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  primaryColor
} from "assets/jss/natcash.js";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import { Icon } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Check from "@material-ui/icons/Check";
import Search from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import adminStyles from "assets/jss/natcash/components/headerLinksStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Switch from "components/CustomSwitch/Switch.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";

import styles from "assets/jss/natcash/views/product/productStyle.js";
import {
  NotificationContainer,
  NotificationManager
} from "react-light-notifications";
import { setShowLoader } from "../../../redux/actions/app";
import { copyProduct, getProductList, getProductScreen } from "../../../utilities/ApiManage";

function CopyProductPage() {
  const dispatch = useDispatch();
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
  const [isAutoRename, setIsAutoRename] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [channelData, setChannelData] = useState([])
  const [txtSearch, setTxtSearch] = useState("");
  const [doSearch, setDoSearch] = useState(false);

  const TABLE_HEAD = [
    {
      id: "en",
      value: ["Product information", "SKU", "Shop"],
    },
    {
      id: "vi",
      value: ["Thông tin sản phẩm", "Mã SKU", "Gian hàng"],
    },
  ];
  const ACTIONS = [
    {
      id: "en",
      value: ["From", "To", "Auto rename"],
      button: ["Copy"],
    },
    {
      id: "vi",
      value: ["Từ", "Tới", "Tự động đổi tên"],
      button: ["Sao chép"],
    },
  ];

  const [data, setData] = useState([]);
  const language = useSelector((state) => state.app.language);
  const listText = [
    {
      id: "en",
      title: "Copy product",
      txtChannel: "Channel",
      txtShop: "Shop",
      txtSearch: "Find by name or SKU",
      txtTypes: "categories",
      txtLink: "No link to product inventory",
      txtUpdate: "Action",
      tableHead: TABLE_HEAD[0].value,
      filterConstatus: ACTIONS[0].value,
      button: ACTIONS[0].button,
      txtSuccess: "Success",
      txtFail: "Fail",
      txtWarning: "Please choose shop and product"
    },
    {
      id: "vi",
      title: "Sao chép sản phẩm",
      txtChannel: "Kênh",
      txtShop: "Gian hàng",
      txtSearch: "Tìm theo tên hoặc SKU",
      txtTypes: "phân loại",
      txtLink: "Chưa liên kết sản phẩm kho",
      txtUpdate: "Thao tác",
      tableHead: TABLE_HEAD[1].value,
      filterConstatus: ACTIONS[1].value,
      button: ACTIONS[1].button,
      txtSuccess: "Thành công",
      txtFail: "Thất bại",
      txtWarning: "Xin hãy chọn shop và sản phẩm cần sao chép"
    },
  ];
  const [text, setText] = useState(listText[0]);
  const [ecom, setEcom] = useState("");
  const [ecom2, setEcom2] = useState("");
  const [shopData, setShopData] = useState([]);
  const [shopData2, setShopData2] = useState([]);
  const [shop, setShop] = useState("");
  const [shop2, setShop2] = useState("");
  const [checked, setChecked] = useState([]);
  const [showProduct, setShowProduct] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
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
    dispatch(setShowLoader(true))
    const res = await getProductScreen()
    setData(res.data.item_list)
    setTotalPage(res.data.data_page.total_page)
    setChannelData(res.data.channel_data);
    dispatch(setShowLoader(false))
  }, []);

  useEffect(async () => {
    dispatch(setShowLoader(true));
    setChecked([]);
    let params = {};
    params.current_page = currentPage;
    if (txtSearch) {
      params.keyword = txtSearch;
    }
    if (shop > -1 && shopData.length > 0) {
      params.shop_id = Number(shopData[shop].shopId);
    }
    const res = await getProductList(params)
    setData(res.data.item_list)
    setTotalPage(res.data.data_page.total_page)
    dispatch(setShowLoader(false))
  }, [doSearch, shop, shopData, currentPage]);

  const handleCopy = async () => {
    if (typeof shop2 === 'string' || !checked) {
      NotificationManager.error({
        title: text.title,
        message: text.txtWarning,
      });
    }
    else {
      dispatch(setShowLoader(true))
      var list_id = []
      checked.forEach((item) => {
        list_id.push(item.item_id)
      })
      const res = await copyProduct(list_id, shopData2[shop2].shopId, isAutoRename)
      if (res.code != 200) {
        NotificationManager.error({
          title: text.title,
          message: text.txtFail,
        });
      }
      else {
        NotificationManager.success({
          title: text.title,
          message: text.txtSuccess,
        });
      }
      dispatch(setShowLoader(false))
    }
  }

  const handleInputSearch = (event) => {
    setTxtSearch(event.target.value);
    setCurrentPage(1);
  };
  const handleSelectPage = (event, value) => {
    setCurrentPage(value);
  };
  const handleChangeEcom = (event) => {
    setEcom(event.target.value);
    setShop(0);
    if (event.target.value == -1) {
      setShopData([]);
    } else {
      setShopData(channelData[event.target.value].shop_data);
    }
  };
  const handleChangeEcom2 = (event) => {
    setEcom2(event.target.value);
    setShop2(0);
    if (event.target.value == -1) {
      setShopData2([]);
    } else {
      setShopData2(channelData[event.target.value].shop_data);
    }
  };
  const handleChangeShop = (event) => {
    setShop(event.target.value);
  };
  const handleChangeShop2 = (event) => {
    setShop2(event.target.value);
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
  const CustomRadio = withStyles({
    root: {
      color: "gray",
      "&$checked": {
        color: "#f96606",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);
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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeAutoRename = () => {
    setIsAutoRename(!isAutoRename);
  };

  const productInfo = (item) => {
    return (
      <div className={classes.proContainer}>
        <img className={classes.proImg} src={item?.detail?.image?.image_url_list ? item?.detail?.image?.image_url_list[0] : item?.detail?.images[0]} />
        <div className={classes.proInfoContainer}>
          <Link href={"/admin/product/" + item.item_id}>
            <a
              target="_blank"
              className={tableClasses.tableCell + " " + classes.txtProductName}
            >
              {item.item_name}
            </a>
          </Link>
          <div className={classes.proContainer}>
            {item.has_model && (
              <div
                className={
                  classes.shopInfoContainer + " " + classes.shopInfoMore
                }
                style={{ cursor: "pointer" }}
                onClick={() => handleShowProduct(item)}
              >
                {showProduct.indexOf(item) !== -1 ? (
                  <Icon
                    className={classes.codeIcon}
                    style={{ color: primaryColor[0] }}
                  >
                    expand_less_outlined
                  </Icon>
                ) : (
                  <Icon
                    className={classes.codeIcon}
                    style={{ color: primaryColor[0] }}
                  >
                    expand_more_outlined
                  </Icon>
                )}
                <p
                  className={
                    tableClasses.tableCell + " " + classes.txtMoreTypes
                  }
                >
                  {item.model_data.model.length + " " + text.txtTypes}
                </p>
              </div>
            )}
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
          <TableCell className={tableClasses.tableCell} key={"sku"}>
            {item?.item_sku}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"shop"}>
            {item?.shop_code}
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
                <TableCell className={tableClasses.tableCell} key={"sku"}>
                  {subItem?.model_sku}
                </TableCell>
                <TableCell className={tableClasses.tableCell} key={"shop"}>
                  {item?.shop_name}
                </TableCell>
              </TableRow>
            );
          })}
      </React.Fragment>
    );
  };

  return (
    <Card>
      <NotificationContainer />
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{text.title}</h4>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        <div
          className={dashClasses.filterSelections}
          style={{
            display: "block",
          }}
        >
          <div style={{ display: "flex" }}>
            {/* search */}
            <FormControl
              className={
                dashClasses.formControl + " " + classes.fullWidthFormControl
              }
            >
              <CustomInput
                formControlProps={{
                  className:
                    adminClasses.margin + " " + classes.customWidthSearch + " " + classes.searchContainer,
                }}
                inputProps={{
                  placeholder: text.txtSearch,
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
            </FormControl>
            {/* end search */}
            <Button color="primary" onClick={handleCopy}>
              {text.button[0]}
              <Icon className={classes.btnFilter}>content_copy</Icon>
            </Button>
          </div>
          <div className={classes.proContainer}>
            <GridContainer style={{ width: "100%" }}>
              {/* shop copied */}
              <GridItem xs={5} sm={5} md={5}>
                <div className={classes.filterShopContainer}>
                  <p className={classes.text}>{text.filterConstatus[0]}</p>
                  <FormControl
                    className={dashClasses.formControl}
                    style={{ marginRight: "25px" }}
                  >
                    <InputLabel id="ecom-select-label">
                      {text.txtChannel}
                    </InputLabel>
                    <Select
                      labelId="ecom-select-label"
                      id="ecom-select"
                      value={ecom}
                      onChange={handleChangeEcom}
                    >
                      {channelData.map((item, index) => (
                        <MenuItem className={classes.dropdownItem} value={index}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={dashClasses.formControl}
                    style={{ marginRight: "25px" }}
                  >
                    <InputLabel id="shop-select-label">
                      {text.txtShop}
                    </InputLabel>
                    <Select
                      labelId="shop-select-label"
                      id="shop-select"
                      value={shop}
                      onChange={handleChangeShop}
                    >
                      {shopData.map((item, index) => (
                        <MenuItem className={classes.dropdownItem} value={index}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </GridItem>
              {/* end shop copied */}
              {/* shop pasted */}
              <GridItem xs={5} sm={5} md={5}>
                <div className={classes.filterShopContainer}>
                  <p className={classes.text}>{text.filterConstatus[1]}</p>
                  <FormControl
                    className={dashClasses.formControl}
                    style={{ marginRight: "25px" }}
                  >
                    <InputLabel id="ecom-select-label">
                      {text.txtChannel}
                    </InputLabel>
                    <Select
                      labelId="ecom-select-label"
                      id="ecom-select"
                      value={ecom2}
                      onChange={handleChangeEcom2}
                    >
                      {channelData.map((item, index) => (
                        <MenuItem className={classes.dropdownItem} value={index}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={dashClasses.formControl}
                    style={{ marginRight: "25px" }}
                  >
                    <InputLabel id="shop-select-label">
                      {text.txtShop}
                    </InputLabel>
                    <Select
                      labelId="shop-select-label"
                      id="shop-select"
                      value={shop2}
                      onChange={handleChangeShop2}
                    >
                      {shopData2.map((item, index) => (
                        <MenuItem className={classes.dropdownItem} value={index}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </GridItem>
              {/* end shop pasted */}
              <GridItem xs={2} sm={2} md={2}>
                <div
                  className={
                    classes.filterShopContainer + " " + classes.cutom4_span
                  }
                >
                  <p className={classes.text}>{text.filterConstatus[2]}</p>
                  <Checkbox
                    checked={isAutoRename}
                    checkedIcon={<Check className={taskClasses.checkedIcon} />}
                    icon={<Check className={taskClasses.uncheckedIcon} />}
                    classes={{
                      checked: taskClasses.checked,
                      root: taskClasses.root,
                    }}
                    onChange={handleChangeAutoRename}
                  />
                </div>
              </GridItem>
            </GridContainer>
          </div>
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
        </div>
      </CardFooter>
    </Card>
  );
}

CopyProductPage.layout = Admin;

export default WithAuthentication(CopyProductPage);
