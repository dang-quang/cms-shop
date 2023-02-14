import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import FormControl from "@material-ui/core/FormControl";

import WithAuthentication from "components/WithAuthentication/WithAuthentication";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import adminStyles from "assets/jss/natcash/components/headerLinksStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import useWindowSize from "components/Hooks/useWindowSize.js";
// connect api

import styles from "assets/jss/natcash/views/inventory/CreateStockProductFormEcomStyle.js";
import { getCreateItemEcomScreen, createItemFromEcom } from "../../../utilities/ApiManage";
import { setShowLoader } from "../../../redux/actions/app";
import { NotificationContainer, NotificationManager} from "react-light-notifications";

function CreateStockProductFormEcom() {
  const dispatch = useDispatch();
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();
  const useDashStyles = makeStyles(dashStyles);
  const [isMobile, setIsMobile] = useState(false);
  const [storeStatusFilter, setStoreStatusFilter] = useState([]);
  const [selectedShop, setSelectedShop] = useState("");
  const [data, setData] = useState([]);

  const FILTER_STATUS = [
    {
      id: "en",
      value: [
        "If inventory’s SKU codes are matched with their Channel SKUs",
        "If inventory’s product names are matched with their listings’ product names (applicable for product listings without variants)",
      ],
    },
    {
      id: "vi",
      value: [
        "Trùng mã SKU",
        "Trùng tên sản phẩm (chỉ áp dụng cho sản phẩm không có phân loại. VD: màu sắc, kích thước,...)",
      ],
    },
  ];
  const Filter = [
    {
      id: "en",
      value: {
        title: "Products",
        value: [
          "Please choose your primary shop to import its product listings as inventory items",
          "All Inventory Channels and Channel SKUs will be linked if these following conditions are met:",
        ],
        button: ["Reset", "Create new inventory product"],
      },
    },
    {
      id: "vi",
      value: {
        title: "Sản phẩm",
        value: [
          "Chọn gian hàng chính đại diện cho sản phẩm kho",
          "Tự động liên kết các sản phẩm đang đăng bán trên kênh vào sản phẩm kho nếu:",
        ],
        button: ["Đặt lại", "Tạo sản phẩm kho"],
      },
    },
  ];
  const language = useSelector((state) => state.app.language);
  const listText = [
    {
      id: "en",
      title: "Import stock items from e-commerce marketplaces",
      filterStatus: FILTER_STATUS[0].value,
      fillter: Filter[0].value,
      txtSuccess: "Success",
      txtError: "Fail",
      txtChooseShop: "Please choose a shop"
    },
    {
      id: "vi",
      title: "Tạo sản phẩm kho từ kênh",
      filterStatus: FILTER_STATUS[1].value,
      fillter: Filter[1].value,
      txtSuccess: "Thành công",
      txtError: "Thất bại",
      txtChooseShop: "Bạn chưa chọn shop"
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
    const res = await getCreateItemEcomScreen()
    setData(res.data)
  }, []);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        setIsMobile(window.innerWidth < 1200);
      },
      false
    );
  }, []);

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

  const handleClickShop = (item) => {
    setSelectedShop(item)
  }

  const handelCreateIventoryProduct = async() => {
    if(!selectedShop){
      NotificationManager.error({
        title: text.title,
        message: text.txtChooseShop
      });
    }
    else{
      dispatch(setShowLoader(true));
      const sameSku = storeStatusFilter.indexOf(text.filterStatus[0]) !== -1
      const sameName = storeStatusFilter.indexOf(text.filterStatus[1]) !== -1
      const res = await createItemFromEcom(selectedShop.shop_id, sameSku, sameName)
      if(res.code == 200){
        NotificationManager.success({
          title: text.title,
          message: text.txtSuccess
        });
      }
      else {
        NotificationManager.error({
          title: text.title,
          message: text.txtError
        });
      }
      dispatch(setShowLoader(false));
    }
  };

  const shopListRadios = () => {
    return (
      <FormControl component="fieldset" style={{marginBottom: "20px"}}>
          <NotificationContainer />
          <GridContainer>
            {data.map((item) => {
              return (
                <GridItem>
                  <Button color={selectedShop == item ? "primary" : "white"} style={{ minWidth: "250px", height: "130px" }} onClick={() => handleClickShop(item)}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <img className={selectedShop == item ? classes.shopImageWhite : classes.shopImage} src={item.icon} />
                      <p className={classes.shopTxt}>{item.code}</p>
                      <p className={classes.txtPro}>
                      <span>{item.total_product}</span> {text.fillter.title}
                    </p>
                    </div>
                  </Button>
                </GridItem>
              );
            })}
          </GridContainer>
      </FormControl>
    );
  };

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{text.title}</h4>
        <p className={classes.cardCategoryWhite}>{text.subTitle}</p>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        <div class={classes.filterEleContent}>
          <p className={classes.titleFilter}>{text.fillter.value[0]}</p>
          {shopListRadios()}
        </div>

        <div class={classes.filterEleContent}>
          <p className={classes.titleFilter}>{text.fillter.value[1]}</p>
          <GridContainer>
            {text.filterStatus.map((item, index) => {
              return (
                <GridItem xs={12} sm={12} md={12}>
                  <div className={classes.filterTitleContainer}>
                    <Checkbox
                      checked={storeStatusFilter.indexOf(item) !== -1}
                      tabIndex={-1}
                      onClick={() => handleStoreStatus(item)}
                      checkedIcon={
                        <Check className={taskClasses.checkedIcon} />
                      }
                      icon={<Check className={taskClasses.uncheckedIcon} />}
                      classes={{
                        checked: taskClasses.checked,
                        root: taskClasses.root,
                      }}
                      style={{ padding: 5 }}
                    />
                    <p className={classes.Txt + " " + classes.checkBoxLabel}>
                      {item}
                    </p>
                  </div>
                </GridItem>
              );
            })}
          </GridContainer>
        </div>
      </CardBody>
      <CardFooter>
        <div className={classes.filterFooter}>
          <Button
            color="primary"
            onClick={() => {
              handelCreateIventoryProduct();
            }}
          >
            {text.fillter.button[1]}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

CreateStockProductFormEcom.layout = Admin;

export default WithAuthentication(CreateStockProductFormEcom);
