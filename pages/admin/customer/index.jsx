import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import CardHeader from "../../../components/Card/CardHeader";
import WithAuthentication from "../../../components/WithAuthentication/WithAuthentication";
import Admin from "../../../layouts/Admin";
import useLanguage from "../../../lib/hooks/useLanguage";
import customerManagementText from "./components/customer-text";

import {
  Button,
  Grid,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import classNames from "classnames";
import ButtonPopover, {
  OptionPopover,
} from "../../../components/ButtonPopover/button-popover";
import CheckboxCustom from "../../../components/CheckboxCustom/checkbox-custom";
import Dropdown from "../../../components/Dropdown/dropdown";
import GridCustom from "../../../components/GridCustom/grid-custom";

import { Pagination } from "@material-ui/lab";
import CustomerFormModal from "./components/customer-form-modal";
import customerStyle from "../../../assets/jss/natcash/views/customer-style";

const departmentOptions = [
  { title: "Tất cả", value: 0 },
  { title: "Ban giám đốc", value: 1 },
  { title: "Ban kiểm soát", value: 2 },
];

function HumanResourceManagement() {
  const useStyles = makeStyles(customerStyle);
  const classes = useStyles();
  const [text] = useLanguage(customerManagementText);
  const [keyWord, setkeyWord] = useState("");
  const [customerGroup, setCustomerGroup] = useState(0);
  const [active, setActive] = useState(true);
  const [customers, setCustomers] = useState(tableData);
  const [isOpenCustomerModal, setIsOpenCustomerModal] = useState(false);
  const [currentCustomerInfo, setCurrentCustomerInfo] = useState();

  const onCloseCustomerModal = () => {
    setIsOpenCustomerModal(false);
    setCurrentCustomerInfo(null);
  };

  return (
    <div>
      <Card>
        <CardHeader
          color="primary"
          title={text.title}
          className={classes.cardHeader}
        >
          <div className={classes.btnContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.btnAction}
            >
              {text.button.search}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsOpenCustomerModal(true)}
              className={classes.btnAction}
            >
              {text.button.addBtn}
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <GridCustom itemAlign={"center"} container spacing={3}>
            <Grid item xs={4}>
              <TextField
                label={text.search.keyWord}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: keyWord,
                  onChange: (e) => setkeyWord(e.target.value),
                }}
                placeholder="..."
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={3}>
              <Dropdown
                title={text.search.customerGroup}
                options={departmentOptions}
                value={customerGroup}
                handleOnChange={(e) => setCcustomerGroup(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <CheckboxCustom
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                classNameContainer={classes.mr_20}
                lable={text.search.active}
              />
            </Grid>
          </GridCustom>
        </CardBody>
      </Card>
      {customers && (
        <TableData
          customers={customers}
          setCurrentCustomerInfo={setCurrentCustomerInfo}
        />
      )}
      {(isOpenCustomerModal || currentCustomerInfo) && (
        <CustomerFormModal
          customerInfo={currentCustomerInfo}
          handleClose={onCloseCustomerModal}
        />
      )}
    </div>
  );
}

const tableData = [
  {
    index: "1",
    customerCode: "2000745",
    fullname: "Nguyễn Hồng Lực",
    customerGroup: "Khách lẻ",
    phoneNumber: "0333632823",
    note: "Chị Hoa_0904012131- Sữa Xách Tay",
    address: "112 Khuất Duy Tiến, Thanh Xuân, HN",
    email: "",
  },
  {
    index: "1",
    customerCode: "4132745",
    fullname: "Nguyễn Hồng Lực 2",
    customerGroup: "Khách lẻ",
    phoneNumber: "0333632823",
    note: "CANDY MART",
    address: "112 Khuất Duy Tiến, Thanh Xuân, HN",
    email: "",
  },
];

function TableData({ customers, setCurrentCustomerInfo }) {
  const useStyles = makeStyles(customerStyle);
  const classes = useStyles();
  const [text] = useLanguage(customerManagementText);

  const tableHeader = text.table.header;

  const onClickEditCustomer = (customerCode) => {
    const selectedCustomer = customers.find(
      (customer) => customer.customerCode === customerCode
    );
    setCurrentCustomerInfo(selectedCustomer);
  };

  return (
    <Card>
      <CardBody>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {tableHeader.map((item, index) => {
                return (
                  <TableCell
                    key={index}
                    className={classes.tableCell}
                    align={tableHeader.length - 1 === index ? "right" : "left"}
                  >
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((props, key) => {
              return (
                <TableRow hover key={key}>
                  <TableCell>{props.index}</TableCell>
                  <TableCell>
                    <p
                      className={classes.m_0}
                      style={{ textTransform: "uppercase" }}
                    >
                      {props.fullname}
                    </p>
                    <p
                      className={classNames(classes.m_0, classes.staffIdlable)}
                    >
                      {props.note}
                    </p>
                  </TableCell>
                  <TableCell>{props.customerGroup}</TableCell>
                  <TableCell>{props.phoneNumber}</TableCell>
                  <TableCell>{props.address}</TableCell>
                  <TableCell>{props.email}</TableCell>

                  <TableCell style={{ textAlign: "end" }}>
                    <ButtonPopover
                      options={
                        <>
                          <OptionPopover
                            title={text.button.edit}
                            onClick={() =>
                              onClickEditCustomer(props.customerCode)
                            }
                          />
                        </>
                      }
                      color="white"
                    >
                      <Icon
                        className={classes.iconSetting}
                        style={{ margin: 0 }}
                      >
                        settings
                      </Icon>
                    </ButtonPopover>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardBody>
      <CardFooter className={classes.cardFooter}>
        <Pagination count={2} page={3} onChange={() => {}} />
      </CardFooter>
    </Card>
  );
}

HumanResourceManagement.layout = Admin;

export default WithAuthentication(HumanResourceManagement);
