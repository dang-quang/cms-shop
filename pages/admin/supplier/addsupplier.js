import Router from "next/router";
import React, { useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-light-notifications";
import "react-light-notifications/lib/main.css";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoader } from "../../../redux/actions/app";
// @material-ui/core components
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import {
  FormControl,
  InputLabel, makeStyles, MenuItem, Select, TextField
} from "@material-ui/core";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";

import adminStyles from "assets/jss/natcash/components/headerLinksStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";
import dashStyles from "assets/jss/natcash/views/dashboardStyle.js";
import shopStyle from "assets/jss/natcash/views/shoplist/shoplistStyle.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import WithAuthentication from "components/WithAuthentication/WithAuthentication";

import { useRouter } from "next/router";
import { createNewSupplier } from "../../../utilities/ApiManage";

import styles from "assets/jss/natcash/views/supplier/addSupplierStyle.js";

function AddSupplierPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const addFrom = router.query.from;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useShopStyles = makeStyles(shopStyle);
  const shopClasses = useShopStyles();
  const useAdminStyles = makeStyles(adminStyles);
  const useTableStyles = makeStyles(tableStyles);
  const adminClasses = useAdminStyles();
  const tableClasses = useTableStyles();
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const language = useSelector((state) => state.app.language);

  const [values, setValues] = React.useState({
    name: null,
    reference_id: null,
    netSuite_vendor_id: null,
    address: null,
    currency: null,
    payment_methods: null,
    contact_person: null,
    email: null,
    phone: null,
    notes: null
  });

  const ACTIONS = [
    {
      id: "en",
      button: [
        "Confirm",
      ],
      select: [
        "Supplier Name *",
        "Reference supplier ID",
        "NetSuite Vendor ID",
        "Address *",
        "Currency *",
        "Payment methods",
        "Contact person",
        "Email",
        "Contact phone",
        "Note",
      ],
    },
    {
      id: "vi",
      button: [
        "Xác nhận",
      ],
      select: [
        "Tên nhà cung cấp *",
        "Mã NCC tham chiếu",
        "NetSuite Vendor ID",
        "Địa chỉ *",
        "Loại tiền tệ *",
        "Phương thức thanh toán",
        "Người liên hệ",
        "Email",
        "Điện thoại liên hệ",
        "Ghi chú",
      ],
    },
  ];

  const listText = [
    {
      id: "en",
      title: "Create a new supplier",
      actions: ACTIONS[0],
    },
    {
      id: "vi",
      title: "Tạo mới nhà cung cấp",
      actions: ACTIONS[1],
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

  const [selectCurrency, setSelectCurrency] = useState({
    currency: [
      {
        name: "VND",
        value: "vnd",
      },
      {
        name: "$",
        value: "dollar",
      },
    ],
  });

  //change value input form
  const handleChangeValue = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handelSubmit = async () => {
    dispatch(setShowLoader(true));
    let res = await createNewSupplier(values)
    dispatch(setShowLoader(false));
    if (res.code === 200) {
      if (addFrom === "addpurchaseorder") {
        Router.push("/admin/purchaseorder/addpurchaseorder");
      } else {
        Router.push("/admin/operation");
      }
    } else {
      NotificationManager.error({
        title: "Error",
        message: res.message ? res.message.text : "Error",
      });
    }
  }

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{text.title}</h4>
      </CardHeader>
      <CardBody className={classes.cardBody} style={{ marginTop: 20 }}>
        <GridContainer>
          <GridItem xs={4} sm={4} md={4}>
            <TextField
              //   error={validateItemName ? false : true}
              id="input1"
              label={text.actions.select[0]}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                value: values.name,
                onChange: handleChangeValue("name"),
              }}
              autoComplete="off"
              className={classes.custom_field}
            />
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <TextField
              //   error={validateItemName ? false : true}
              id="input1"
              label={text.actions.select[1]}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                value: values.reference_id,
                onChange: handleChangeValue("reference_id"),
              }}
              autoComplete="off"
              className={classes.custom_field}
            />
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <TextField
              //   error={validateItemName ? false : true}
              id="input1"
              label={text.actions.select[2]}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                value: values.netSuite_vendor_id,
                onChange: handleChangeValue("netSuite_vendor_id"),
              }}
              autoComplete="off"
              className={classes.custom_field}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <TextField
              //   error={validateItemName ? false : true}
              id="input1"
              label={text.actions.select[3]}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                value: values.address,
                onChange: handleChangeValue("address"),
              }}
              autoComplete="off"
              className={classes.custom_field}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={4} sm={4} md={4}>
            <FormControl
              variant="outlined"
              size="small"
              fullWidth
              className={classes.custom_field}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                {text.actions.select[4]}
              </InputLabel>
              <Select
                value={values.currency}
                onChange={handleChangeValue("currency")}
                label={text.actions.select[4]}
              >
                {selectCurrency.currency.map((item, index) => {
                  return <MenuItem value={item.value} key={index}>{item.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <TextField
              //   error={validateItemName ? false : true}
              id="input1"
              label={text.actions.select[5]}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                value: values.payment_methods,
                onChange: handleChangeValue("payment_methods"),
              }}
              autoComplete="off"
              className={classes.custom_field}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={4} sm={4} md={4}>
            <TextField
              //   error={validateItemName ? false : true}
              id="input1"
              label={text.actions.select[6]}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                value: values.contact_person,
                onChange: handleChangeValue("contact_person"),
              }}
              autoComplete="off"
              className={classes.custom_field}
            />
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <TextField
              //   error={validateItemName ? false : true}
              id="input1"
              label={text.actions.select[7]}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                value: values.email,
                onChange: handleChangeValue("email"),
              }}
              autoComplete="off"
              className={classes.custom_field}
            />
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <TextField
              //   error={validateItemName ? false : true}
              id="input1"
              label={text.actions.select[8]}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                value: values.phone,
                onChange: handleChangeValue("phone"),
              }}
              type="number"
              autoComplete="off"
              className={classes.custom_field}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <TextField
              //   error={validateItemName ? false : true}
              id="input1"
              label={text.actions.select[9]}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                value: values.notes,
                onChange: handleChangeValue("notes"),
              }}
              autoComplete="off"
              multiline
              rows={10}
              className={classes.custom_field}
            />
          </GridItem>
        </GridContainer>
        <NotificationContainer />
      </CardBody>
      <CardFooter className={classes.flex_end}>
        <Button color="primary" onClick={handelSubmit}>{text.actions.button[0]}</Button>
      </CardFooter>
    </Card>
  );
}

// name: "",
//     reference_id: "",
//     netSuite_vendor_id: "",
//     address: "",
//     currency: "",
//     payment_methods: "",
//     contact_person: "",
//     email: "",
//     contact_phone: "",
//     notes: ""

AddSupplierPage.layout = Admin;

export default WithAuthentication(AddSupplierPage);
