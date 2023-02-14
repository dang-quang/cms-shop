import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import Modal from "@material-ui/core/Modal";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";
import Search from "@material-ui/icons/Search";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import {
  Table,
  TableBody,
  TableCell, TableHead, TableRow
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Checkbox from "@material-ui/core/Checkbox";
import Fade from "@material-ui/core/Fade";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@material-ui/core/Icon";
import Check from "@material-ui/icons/Check";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import Link from "next/link";
import { useRouter } from "next/router";

import adminStyles from "assets/jss/natcash/components/headerLinksStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import useWindowSize from "components/Hooks/useWindowSize.js";
import { formatCurrency } from "../../../utilities/utils";

import styles from "assets/jss/natcash/views/inventory/inventoryDetailStyle.js";
import { setShowLoader } from "../../../redux/actions/app";
import { getInventoryItemDetail, searchShopItem } from "../../../utilities/ApiManage";

function InventoryDetailPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useAdminStyles = makeStyles(adminStyles);
  const adminClasses = useAdminStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const useTableStyles = makeStyles(tableStyles);
  const tableClasses = useTableStyles();
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();
  const [isSwitch, setIsSwitch] = useState(false);
  const [checked, setChecked] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [showAction, setShowAction] = useState([]);
  const [keySearch, setKeySearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [doFilter, setDoFilter] = useState(false);
  const menuCardInfo = [
    {
      id: "en",
      value: [
        {
          title: "Physical stock",
          content: "1092",
          switch: false,
        },
        {
          title: "Processing stock",
          content: "1042",
          switch: false,
        },
        {
          title: "Campaign stock",
          content: "18",
          switch: false,
        },
        {
          title: "Safety stock",
          content: "2",
          switch: false,
        },
        {
          title: "Available stock",
          content: "2",
          switch: false,
        },
        {
          title: "Stock Sync",
          switch: true,
          status: false,
        },
      ],
    },
    {
      id: "vi",
      value: [
        {
          title: "Tồn kho hiện có",
          content: "1092",
          switch: false,
        },
        {
          title: "Tồn kho đang xử lý",
          content: "1042",
          switch: false,
        },
        {
          title: "Tồn kho campaign",
          content: "18",
          switch: false,
        },
        {
          title: "Tồn kho dự phòng",
          content: "2",
          switch: false,
        },
        {
          title: "Tồn kho có thể bán",
          content: "2",
          switch: false,
        },
        {
          title: "Đồng bộ tồn kho",
          switch: true,
          status: false,
        },
      ],
    },
  ];

  const tooltip = [
    {
      id: "en",
      menuCardInfo: [
        "The amount of items you have in your warehouse",
        "Stock has been assigned to pending orders, which are waiting to be fulfilled.",
        "Total stock quantity being reserved for a campaign like Crazy Deal or Flash Sale, etc.",
        "When stock sync is turned on, Safety stock prevents out of stock or overselling problems.",
        "Number of products that are available to sell on the platform. Available stock = Physical stock -  Processing stock - Campaign stock - Safety stock",
        "When stock sync is tunrned on, available stock will be synced to the stock level of all linked SKUs.",
      ],
    },
    {
      id: "vi",
      menuCardInfo: [
        "Tổng sản phẩm thực tế trong kho",
        "Tồn kho được giữ lại do có đơn hàng mới phát sinh cần xử lý.",
        "Tổng số tồn kho đã đăng kí tham gia các loại campaign như Deal Chớp Nhoáng, Deal Hủy Diệt, etc.",
        "Khi bật đồng bộ, tồn kho dự phòng giúp tránh tình trạng hết hàng hoặc bán vượt Tồn kho hiện có",
        "Số tồn kho sẵn sàng để bán trên kênh. Công thức tính Tồn kho có thể bán = Tồn kho hiện có - Tồn kho đang xử lý - Tồn kho campaign - Tồn kho dự phòng",
        "Khi bật đồng bộ tồn kho, Tồn kho có thể bán sẽ được đồng bộ với tồn kho trên kênh",
      ],
    },
  ];

  const [dataSearch, setDataSearch] = useState([]);

  const CARD_TITLE = [
    {
      id: "en",
      value: [
        "Products in stock",
        "Link existing listings to PowerSell inventory",
      ],
    },
    { id: "vi", value: ["Sản phẩm kho", "Liên kết sản phẩm trên kênh"] },
  ];

  const TABLE_HEAD = [
    {
      id: "en",
      value: [
        "Product information",
        "Stock",
        "Campaign stock",
        "Price",
        "Items Sold	",
        "Action",
      ],
    },
    {
      id: "vi",
      value: [
        "Thông tin sản phẩm",
        "Tồn kho",
        "Tồn kho campaign",
        "Giá bán",
        "Sản phẩm bán được",
        "Thao tác",
      ],
    },
  ];
  const TABLE_SEARCH_HEAD = [
    {
      id: "en",
      value: ["Product information", "Stock", "Price", "Action"],
    },
    {
      id: "vi",
      value: ["Thông tin sản phẩm", "Tồn kho", "Giá bán", "Thao tác"],
    },
  ];
  const Filter = [
    {
      id: "en",
      value: {
        title: "Finding product",
        value: [""],
        button: ["Reset", "Link"],
      },
    },
    {
      id: "vi",
      value: {
        title: "Tìm kiếm sản phẩm",
        value: [],
        button: ["Đặt lại", "Liên kết"],
      },
    },
  ];

  const language = useSelector((state) => state.app.language);
  const [text, setText] = useState({
    id: "en",
    title: "Warehouse Management",
    txtFilter: "Filter",
    tableHead: TABLE_HEAD[0].value,
    tableSearchHead: TABLE_SEARCH_HEAD[0].value,
    menuCard: menuCardInfo[0].value,
    fillter: Filter[0].value,
    isLink: "Linked",
    menuCardInfo: menuCardInfo[0],
    cardTitle: CARD_TITLE[0].value,
    searchPlaceholder: "Search product",
    btnUnlink: "UnLink",
    listCardTooltip: tooltip[0].menuCardInfo,
  });
  const listText = [
    {
      id: "en",
      title: "Warehouse Management",
      txtSearch: "Find by name or SKU",
      txtTypes: "categories",
      txtLink: "No link to product inventory",
      txtFilter: "Filter",
      Linked: "Linked",
      Link: "Link",
      tableHead: TABLE_HEAD[0].value,
      tableSearchHead: TABLE_SEARCH_HEAD[0].value,
      menuCard: menuCardInfo[0].value,
      fillter: Filter[0].value,
      menuCardInfo: menuCardInfo[0],
      cardTitle: CARD_TITLE[0].value,
      searchPlaceholder: "Search product",
      btnUnlink: "UnLink",
      listCardTooltip: tooltip[0].menuCardInfo,
    },
    {
      id: "vi",
      title: "Quản lý kho hàng",
      txtShop: "Gian hàng",
      txtSearch: "Find by name or SKU",
      txtTypes: "phân loại",
      txtLink: "Chưa liên kết sản phẩm kho",
      txtFilter: "Bộ lọc",
      Linked: "Đã liên kết",
      Link: "Liên kết",
      tableHead: TABLE_HEAD[1].value,
      tableSearchHead: TABLE_SEARCH_HEAD[1].value,
      menuCard: menuCardInfo[1].value,
      fillter: Filter[1].value,
      menuCardInfo: menuCardInfo[1],
      cardTitle: CARD_TITLE[1].value,
      searchPlaceholder: "Tìm sản phẩm",
      btnUnlink: "Bỏ liên kết",
      listCardTooltip: tooltip[1].menuCardInfo,
    },
  ];

  const [data, setData] = useState({ shop_items: [] });
  useEffect(async () => {
    dispatch(setShowLoader(true));
    const res = await getInventoryItemDetail(id)
    setData(res.data)
    dispatch(setShowLoader(false));
  }, []);

  useEffect(() => {
    for (let i = 0; i < listText.length; i++) {
      if (language == listText[i].id) {
        setText(listText[i]);
        break;
      }
    }
  }, [language]);

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

  const onChangeKeySearch = (e) => {
    setKeySearch(e.target.value);
  };

  const handleSearch = async () => {
    if (keySearch.length < 1) {
      setShowFilter(false);
    } else {
      dispatch(setShowLoader(true));
      setShowFilter(true);
      const res = await searchShopItem(keySearch)
      setDataSearch(res.data)
      dispatch(setShowLoader(false));
    }
  };

  const handleUnlink = (item) => {
    return null;
  };

  const handleSwitch = (item) => {
    return null;

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

  const renderCardInfo = () => {
    const listCardInfo = text.menuCardInfo.value.map((item, index) => (
      <GridItem
        xs={4}
        sm={4}
        md={2}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p className={classes.cardText}>
          {item.title}
          <Tooltip title={text.listCardTooltip[index]} placement="top" arrow>
            <Icon className={classes.codeIcon}>help_icon</Icon>
          </Tooltip>
        </p>
        {!item.switch && (
          <p className={classes.cardText + " " + classes.textContent}>
            {item.content}
          </p>
        )}
        {item.switch && (
          <CustomSwitch
            checked={item.status}
            onChange={() => handleSwitch(item)}
            name="checkedA"
          />
        )}
      </GridItem>
    ));
    return <GridContainer>{listCardInfo}</GridContainer>;
  };

  const productInfo = (item) => {
    return (
      <div className={classes.proContainer}>
        <img className={classes.proImg} src={item?.detail?.image?.image_url_list ? item?.detail?.image?.image_url_list[0] : item?.detail?.images[0]} />
        <div className={classes.proInfoContainer}>
          {!item?.types && (
            <Link href={"/admin/product/" + item.item_id}>
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
            <div className={classes.shopInfoContainer}>
              <img src={item?.shop_icon} className={classes.shopImage} />
              <p
                className={
                  tableClasses.tableCell + " " + classes.txtshopListing
                }
              >
                {item?.shop_code}
              </p>
            </div>
            {item.item_sku && (
              <div className={classes.shopInfoContainer}>
                <Icon className={classes.icon}>crop_free</Icon>
                <p
                  className={
                    tableClasses.tableCell + " " + classes.txtshopListing
                  }
                >
                  {item.item_sku}
                </p>
              </div>
            )}
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
            <TableCell className={tableClasses.tableCell} key={"productInfo"}>
              {productInfo(item)}
            </TableCell>
            <TableCell
              className={tableClasses.tableCell + " " + classes.textRight}
              key={"stock"}
            >
              {item.stock}
            </TableCell>
            <TableCell
              className={tableClasses.tableCell + " " + classes.textRight}
              key={"campaignStock"}
            >
              {item.campaignStock}
            </TableCell>
            <TableCell
              className={tableClasses.tableCell + " " + classes.textRight}
              key={"price"}
            >
              {item?.detail?.price_info ? formatCurrency(item?.detail?.price_info[0]?.current_price) : "---"}
            </TableCell>
            <TableCell
              className={tableClasses.tableCell + " " + classes.textRight}
              key={"itemsSold"}
            >
              {item.itemsSold}
            </TableCell>
            <TableCell
              className={tableClasses.tableCell + " " + classes.textRight}
            >
              <a
                href="javascript:void(0)"
                onClick={() => handleUnlink()}
                className={classes.btnLink}
              >
                <Icon
                  className={classes.codeIcon + " " + classes.btnLink}
                  style={{ transform: "rotate(120deg)" }}
                >
                  link_off_icon
                </Icon>
                {text.btnUnlink}
              </a>
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    );
  };
  const renderSearchProduct = (item, index) => {
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
            <TableCell className={tableClasses.tableCell} key={"productInfo"}>
              {!item?.inventory_item_id && (
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
              )}
            </TableCell>
            <TableCell className={tableClasses.tableCell} key={"productInfo"}>
              {productInfo(item)}
            </TableCell>
            <TableCell
              className={tableClasses.tableCell + " " + classes.textRight}
              key={"stock"}
            >
              {item.stock}
            </TableCell>
            <TableCell
              className={tableClasses.tableCell + " " + classes.textRight}
              key={"price"}
            >
              {formatCurrency(item?.detail?.price_info[0]?.current_price)}
            </TableCell>
            <TableCell
              className={tableClasses.tableCell + " " + classes.textRight}
            >
              {item.inventory_item_id && (
                <Link href={"/admin/inventory/" + item.inventory_item_id}>
                  <a target="_blank" className={classes.btnLinked}>
                    <Icon
                      className={classes.codeIcon + " " + classes.btnLinked}
                      style={{ transform: "rotate(120deg)" }}
                    >
                      link_off_icon
                    </Icon>
                    {text.Linked}
                  </a>
                </Link>
              )}
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    );
  };
  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>{text.cardTitle[0]}</h4>
        </CardHeader>
        <CardBody className={classes.cardBody}>
          <div className={classes.cardBodyUp + " " + classes.productInfo}>
            <img
              className={classes.productInfoImg}
              src={
                data?.detail?.image_list[0]
              }
            />
            <div className={classes.productInfoText}>
              <h4 className={classes.primaryText + " " + classes.productName}>
                {data.item_name}
              </h4>
              <ul className={classes.listTextWithIcon}>
                {data.item_sku && (
                  <li className={classes.textWithIcon}>
                    <Icon className={classes.icon}>crop_free</Icon>
                    <p className={classes.primaryText}>{data.item_sku}</p>
                  </li>
                )}
                {data?.detail?.barcode && (
                  <li className={classes.textWithIcon}>
                    <Icon
                      className={classes.icon}
                      style={{ transform: "rotate(90deg)" }}
                    >
                      format_align_justify
                    </Icon>
                    <p className={classes.primaryText}>{data?.detail?.barcode}</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className={classes.cardBodyDown}>{renderCardInfo()}</div>
        </CardBody>
      </Card>
      <Card style={{ marginTop: "50px" }}>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>{text.cardTitle[1]}</h4>
        </CardHeader>
        <CardBody className={classes.cardBody}>
          <FormControl className={dashClasses.formControl}>
            <div>
              <CustomInput
                formControlProps={{
                  className:
                    adminClasses.margin + " " + classes.searchContainer,
                }}
                inputProps={{
                  placeholder: `${text.searchPlaceholder}`,
                  value: keySearch,
                  onChange: onChangeKeySearch,
                }}
              />
              <Button
                color="white"
                aria-label="edit"
                justIcon
                round
                onClick={() => handleSearch()}
              >
                <Search />
              </Button>
            </div>
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
                  <CardBody className={classes.searchCard}>
                    <div
                      className={tableClasses.tableResponsive}
                      style={{ marginTop: "0" }}
                    >
                      <Table className={tableClasses.table}>
                        {dataSearch !== undefined ? (
                          <TableHead
                            className={tableClasses["primary" + "TableHeader"]}
                          >
                            <TableRow className={tableClasses.tableHeadRow}>
                              <TableCell
                                className={tableClasses.tableCell}
                              ></TableCell>
                              {text.tableSearchHead.map((prop, key) => {
                                return (
                                  <TableCell
                                    className={
                                      tableClasses.tableCell +
                                      " " +
                                      tableClasses.tableHeadCell
                                    }
                                    key={key}
                                    style={{
                                      textAlign: `${key >= 1 ? "right" : "left"
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
                          {dataSearch.map((item, index) => {
                            return renderSearchProduct(item, index);
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
                  </CardBody>
                  <CardFooter>
                    <div className={classes.filterFooter}>
                      <Button
                        color="primary"
                        onClick={() => {
                          setDoFilter(true), setShowFilter(false);
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
        </CardBody>
        <CardFooter>
          <div
            className={tableClasses.tableResponsive}
            style={{ marginTop: "0" }}
          >
            <Table className={tableClasses.table}>
              {data?.shop_items !== [] ? (
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
                            textAlign: `${key >= 1 ? "right" : "left"}`,
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
                {data?.shop_items.map((item, index) => {
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
    </div>
  );
}

InventoryDetailPage.layout = Admin;

export default WithAuthentication(InventoryDetailPage);
