import React, { useState, useEffect, useCallback } from 'react';
import Router from 'next/router';
import { setShowLoader } from '../../../redux/actions/app';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Link from 'next/link';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
// @material-ui/core components
import {} from '@material-ui/core/styles';
import {
  primaryColor,
  whiteColor,
  blackColor,
  hexToRgb,
  successColor,
  infoColor,
  orangeColor,
  grayColor,
} from 'assets/jss/natcash.js';
// layout for this page
import Admin from 'layouts/Admin.js';
// core components
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import {
  Modal,
  Tab,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tooltip,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  makeStyles,
  withStyles,
  useTheme,
  TextField,
  OutlinedInput,
  InputAdornment,
  Radio,
  RadioGroup,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

import Check from '@material-ui/icons/Check';
import DateFnsUtils from '@date-io/date-fns';
import Poppers from '@material-ui/core/Popper';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import adminStyles from 'assets/jss/natcash/components/headerLinksStyle.js';
import tableStyles from 'assets/jss/natcash/components/tableStyle.js';
import taskStyles from 'assets/jss/natcash/components/tasksStyle.js';
import shopStyle from 'assets/jss/natcash/views/shoplist/shoplistStyle.js';
import { Icon } from '@material-ui/core';
import dashStyles from 'assets/jss/natcash/views/dashboardStyle.js';
import vi from 'date-fns/locale/vi';
import classNames from 'classnames';
import useWindowSize from 'components/Hooks/useWindowSize.js';
import PropTypes from 'prop-types';
import Switch from 'components/CustomSwitch/Switch.js';

import { formatCurrency, formatNumber } from '../../../utilities/utils';
import { createNewStock } from '../../../utilities/ApiManage';
import { useRouter } from 'next/router';

import imgShop from 'assets/img/shop.png';
import imgProduct from 'assets/img/product.png';
import ModalCustom from 'components/ModalCustom/ModalCustom.js';
import styles from 'assets/jss/natcash/views/stock/addStockStyle.js';

function AddWarehousePage() {
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
    address: null,
    contact_person: null,
    email: null,
    phone: null,
    notes: null,
    default: false,
  });

  const ACTIONS = [
    {
      id: 'en',
      button: ['Confirm'],
      select: [
        'Stock Name *',
        'Stock Code',
        'Address *',
        'Contact person',
        'Email',
        'Contact phone',
        'Note',
        'Set as default repository. Note: When default is used for order processing',
      ],
    },
    {
      id: 'vi',
      button: ['Xác nhận'],
      select: [
        'Tên kho *',
        'Mã kho tham chiếu',
        'Địa chỉ *',
        'Người liên hệ',
        'Email',
        'Điện thoại liên hệ',
        'Ghi chú',
        'Đặt làm kho mặc định. Lưu ý: Kho mặc định được dùng để xử lý đơn hàng',
      ],
    },
  ];

  const listText = [
    {
      id: 'en',
      title: 'Create new stock',
      actions: ACTIONS[0],
    },
    {
      id: 'vi',
      title: 'Tạo mới kho hàng',
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

  //change value input form
  const handleChangeValue = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };
  const CustomSwitch = withStyles({
    switchBase: {
      color: '#fff',
      '&$checked': {
        color: '#f96606',
      },
      '&$checked + $track': {
        backgroundColor: '#f3a36f',
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const handleSubmit = async () => {
    dispatch(setShowLoader(true));
    let res = await createNewStock(values);
    dispatch(setShowLoader(false));
    if (res.code === 200) {
      if (addFrom === 'addpurchaseorder') {
        Router.push('/admin/purchaseorder/addpurchaseorder');
      } else {
        Router.push('/admin/operation');
      }
    } else {
      NotificationManager.error({
        title: 'Error',
        message: res.message ? res.message.text : 'Error',
      });
    }
  };

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
                onChange: handleChangeValue('name'),
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
                onChange: handleChangeValue('reference_id'),
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
              label={text.actions.select[2]}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                value: values.address,
                onChange: handleChangeValue('address'),
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
              label={text.actions.select[3]}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                value: values.contact_person,
                onChange: handleChangeValue('contact_person'),
              }}
              autoComplete="off"
              className={classes.custom_field}
            />
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <TextField
              //   error={validateItemName ? false : true}
              id="input1"
              label={text.actions.select[4]}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                value: values.email,
                onChange: handleChangeValue('email'),
              }}
              autoComplete="off"
              className={classes.custom_field}
            />
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
                value: values.phone,
                onChange: handleChangeValue('phone'),
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
              label={text.actions.select[6]}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                value: values.notes,
                onChange: handleChangeValue('notes'),
              }}
              autoComplete="off"
              multiline
              rows={10}
              className={classes.custom_field}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <div className={classes.flex_center}>
            <CustomSwitch checked={values.default} onChange={handleChange} name="default" />
            <p className={classes.infoTextPrimary}>{text.actions.select[7]}</p>
          </div>
        </GridContainer>
      </CardBody>
      <CardFooter className={classes.flex_end}>
        <Button color="primary" onClick={handleSubmit}>
          {text.actions.button[0]}
        </Button>
      </CardFooter>
    </Card>
  );
}

AddWarehousePage.layout = Admin;

export default WithAuthentication(AddWarehousePage);
