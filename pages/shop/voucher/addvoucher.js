import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Link from 'next/link';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
// @material-ui/core components
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
import FormGroupCustom from 'components/FormCustom/FormGroupCustom.js';
import FormCellCustom from 'components/FormCustom/FormCellCustom.js';
import PropTypes from 'prop-types';

import { formatCurrency, formatNumber } from '../../../utilities/utils';

import { useRouter } from 'next/router';

import imgShop from 'assets/img/shop.png';
import imgProduct from 'assets/img/product.png';
import ModalCustom from 'components/ModalCustom/ModalCustom.js';
import styles from 'assets/jss/natcash/views/voucher/addVoucherStyle.js';
import { useTranslation } from 'react-i18next';

function AddVoucherPage() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useTableStyles = makeStyles(tableStyles);
  const tableClasses = useTableStyles();
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();
  const [isShowModal, setIsShowModal] = useState(false);
  const [filterType, setFilterType] = useState('name');
  const [filterValue, setFilterValue] = useState('');
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checked, setChecked] = useState([]);
  const { t } = useTranslation();

  const [values, setValues] = React.useState({
    code_type: 'all',
    promotion_name: '',
    voucher_code: '',
    time_from: moment().format('yyyy-MM-DDThh:mm'),
    time_to: moment().add(1, 'hours').format('yyyy-MM-DDThh:mm'),
    voucher_type: 'promotion',
    discount_type: 'money',
    discount: '',
    discount_max_type: 'limit',
    discount_max: '',
    order_money_min: '',
    maximum_usage: '',
    display: 'many',
    added_product: [],
    status: '',
  });

  const TABLE_HEAD = [t('product'), t('sold'), t('price'), t('quantity')];

  //change value input form
  const handleChangeValue = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    setValues({
      ...values,
      ['voucher_code']: 'SHOP' + values.voucher_code,
    });
    alert('hi');
  };

  const CustomRadio = withStyles({
    root: {
      color: 'gray',
      '&$checked': {
        color: '#f96606',
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  const handleChangeCodeType = (value) => {
    setValues({ ...values, ['code_type']: value, display: 'many' });
  };

  const handleChangeFilterType = (event) => {
    setFilterType(event.target.value);
  };

  const handleChangeFilterValue = (event) => {
    setFilterValue(event.target.value);
  };

  const [dataProduct, setDataProduct] = useState([
    {
      id: '1234',
      avatar: 'https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11',
      name: 'Bình đun nước thông minh Moaz Bebe MB-002',
      sold: 23,
      original_price: 1210000,
      quantity: 5,
    },
    {
      id: '34524523',
      avatar: 'https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc',
      name: 'Sữa Meiji số 0/9 - 800g',
      sold: 30,
      original_price: 550000,
      quantity: 988,
    },
    {
      id: '1245362324',
      avatar: 'https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9',
      name: 'Chăn lưới OTK xuất Nga cho bé 3',
      sold: 10,
      original_price: 120000,
      quantity: 8,
    },
    {
      id: '124536232412',
      avatar: 'https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9',
      name: 'Chăn lưới OTK xuất Nga cho bé 2',
      sold: 10,
      original_price: 120000,
      quantity: 8,
    },
    {
      id: '124536232124',
      avatar: 'https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9',
      name: 'Chăn lưới OTK xuất Nga cho bé 1',
      sold: 10,
      original_price: 120000,
      quantity: 8,
    },
  ]);

  const handleCheckAll = () => {
    if (isCheckAll) {
      setIsCheckAll(false);
      setChecked([]);
    } else {
      setIsCheckAll(true);
      setChecked(dataProduct);
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
  const renderProduct = (item, index) => {
    return (
      <React.Fragment>
        <TableRow
          key={index}
          className={tableClasses.tableBodyRow}
          style={{
            backgroundColor: checked.indexOf(item) !== -1 ? '#fff6f0' : '#fff',
          }}>
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
          <TableCell
            className={tableClasses.tableCell + ' ' + tableClasses.cellWidth_400}
            key={'productInfo'}>
            <div className={classes.cellInfo}>
              <img src={item.avatar} className={classes.tableImage} />
              <div className={classes.infoTextContainer}>
                <p className={classes.text + ' ' + classes.infoTextPrimary}>{item.name}</p>
              </div>
            </div>
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={'sold'}>
            {item.sold}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={'OriginalPrice'}>
            {formatCurrency(item.original_price)}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={'Quantity'}>
            {item.quantity}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  const renderTable = (item, index) => {
    return (
      <TableRow key={index} className={tableClasses.tableBodyRow}>
        <TableCell
          className={tableClasses.tableCell + ' ' + tableClasses.cellWidth_400}
          key={'Product2'}>
          <div className={classes.cellInfo}>
            <img src={item.avatar} className={classes.tableImage} />
            <div className={classes.infoTextContainer}>
              <p className={classes.text + ' ' + classes.infoTextPrimary}>{item.name}</p>
            </div>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'Sold2'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>{item.sold}</p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'OriginalPrice2'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {formatCurrency(item.original_price)}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'Quantity2'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>{item.quantity}</p>
        </TableCell>
      </TableRow>
    );
  };

  const TableData = () => {
    return (
      <div className={tableClasses.tableResponsive}>
        <Table className={tableClasses.table + ' ' + tableClasses.tableCustom}>
          {values.added_product !== undefined ? (
            <TableHead
              className={
                tableClasses['primary' + 'TableHeader'] + ' ' + tableClasses.tableHeadCustom
              }>
              <TableRow className={tableClasses.tableHeadRow}>
                {TABLE_HEAD.map((prop, key) => {
                  return (
                    <TableCell
                      className={tableClasses.tableCell + ' ' + tableClasses.tableHeadCell}
                      key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {values.added_product?.map((item, index) => {
              return renderTable(item, index);
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  const FormGroupCustom_1 = () => {
    return (
      <FormGroupCustom title={t('basicInformation')}>
        {/* Code Type */}
        <FormCellCustom label={t('voucher.codeType')}>
          <div className={classes.formCell}>
            <Button
              color={'white'}
              justIcon={false}
              className={
                values.code_type == 'all'
                  ? classes.itemsContainer
                  : classes.itemsContainer + ' ' + classes.itemsContainer_active
              }
              onClick={() => handleChangeCodeType('all')}>
              <img className={classes.btnImg} src={imgShop} />
              <p className={classes.text}>{t('voucher.shopWide')}</p>
            </Button>
            <Button
              color={'white'}
              justIcon={false}
              className={
                values.code_type == 'product'
                  ? classes.itemsContainer
                  : classes.itemsContainer + ' ' + classes.itemsContainer_active
              }
              onClick={() => handleChangeCodeType('product')}>
              <img className={classes.btnImg} src={imgProduct} />
              <p className={classes.text}>{t('voucher.productVoucher')}</p>
            </Button>
          </div>
        </FormCellCustom>
        {/* Promotion Name */}
        <FormCellCustom label={t('voucher.promotionName')} helperText={t('voucher.nameDes')}>
          <div className={classes.formCell}>
            <TextField
              //   error={validateItemName ? false : true}
              id="input1"
              label={''}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                value: values.promotion_name,
                onChange: handleChangeValue('promotion_name'),
              }}
              placeholder={t('enterHere')}
              autoComplete="off"
            />
          </div>
        </FormCellCustom>
        {/* Voucher Code */}
        <FormCellCustom label={t('voucher.voucherCode')} helperText={t('category.categoryCodeDes')}>
          <div className={classes.formCell}>
            <FormControl fullWidth variant="outlined" size="small">
              <OutlinedInput
                id="outlined-adornment-amount-1"
                value={values.voucher_code}
                onChange={handleChangeValue('voucher_code')}
                startAdornment={<InputAdornment position="start">SHOP</InputAdornment>}
                placeholder={t('enterHere')}
                autoComplete="off"
              />
            </FormControl>
          </div>
        </FormCellCustom>
        {/* Time */}
        <FormCellCustom label={t('time')} helperText={t('voucher.timeDes')}>
          <div className={classes.formCell + ' ' + classes.flex_center}>
            <TextField
              id="datetime-local"
              // label="Next appointment"
              type="datetime-local"
              value={values.time_from}
              onChange={handleChangeValue('time_from')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <span
              style={{
                margin: '0 15px',
                width: '15px',
                height: '2px',
                backgroundColor: grayColor[0],
                display: 'block',
              }}></span>
            <TextField
              id="datetime-local"
              // label="Next appointment"
              type="datetime-local"
              value={values.time_to}
              onChange={handleChangeValue('time_to')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </FormCellCustom>
      </FormGroupCustom>
    );
  };

  const FormGroupCustom_2 = () => {
    return (
      <FormGroupCustom title={t('voucher.setUpVoucher')}>
        {/* Voucher type */}
        <FormCellCustom label={t('voucher.voucherType')} helperText={''}>
          <div className={classes.formCell}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="shop"
                name="shop1"
                value={values.voucher_type}
                onChange={handleChangeValue('voucher_type')}
                className={classes.flex_center}>
                <FormControlLabel
                  value={'promotion'}
                  control={<CustomRadio />}
                  label={t('voucher.promotion')}
                />
                <FormControlLabel
                  value={'recoin'}
                  control={<CustomRadio />}
                  label={t('voucher.refundPoints')}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </FormCellCustom>
        {/* Discount */}
        <FormCellCustom
          label={t('voucher.discountType')}
          helperText={values.voucher_type == 'recoin' ? t('voucher.discountTypeDes') : null}>
          <div className={classes.formCell}>
            {values.voucher_type == 'promotion' ? (
              <div className={classes.flex_center}>
                <FormControl variant="outlined" size="small">
                  <Select
                    labelId="select-outlined-label-1"
                    id="select-outlined"
                    value={values.discount_type}
                    onChange={handleChangeValue('discount_type')}>
                    <MenuItem value={'money'}>{t('voucher.byAmount')}</MenuItem>
                    <MenuItem value={'percent'}>{t('voucher.byPercent')}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" size="small" style={{ flex: 1 }}>
                  <OutlinedInput
                    id="outlined-adornment-amount-5"
                    value={values.discount}
                    onChange={handleChangeValue('discount')}
                    endAdornment={
                      <InputAdornment position="end">
                        {values.discount_type == 'money' ? '₫' : '%'}
                      </InputAdornment>
                    }
                    type="number"
                    autoComplete="off"
                    placeholder={t('enterHere')}
                  />
                </FormControl>
              </div>
            ) : (
              <FormControl variant="outlined" size="small" className={classes.flex_center}>
                <OutlinedInput
                  id="outlined-adornment-amount-5"
                  value={values.discount}
                  onChange={handleChangeValue('discount')}
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                  type="number"
                  autoComplete="off"
                  style={{ flex: 1 }}
                  placeholder={t('enterHere')}
                />
              </FormControl>
            )}
          </div>
        </FormCellCustom>
        {/* Discount maximum */}
        <FormCellCustom
          label={t('voucher.maxReduction')}
          helperText={values.discount_max_type == 'limit' ? t('voucher.maxReductionDes') : null}>
          <div className={classes.formCell + ' ' + classes.flex_center}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="shop"
                name="shop1"
                value={values.discount_max_type}
                onChange={handleChangeValue('discount_max_type')}
                className={classes.flex_center}>
                <FormControlLabel
                  value={'limit'}
                  control={<CustomRadio />}
                  label={t('voucher.limit')}
                />
                <FormControlLabel
                  value={'unlimited'}
                  control={<CustomRadio />}
                  label={t('voucher.unlimited')}
                />
              </RadioGroup>
            </FormControl>
            {values.discount_max_type == 'limit' && (
              <FormControl component="fieldset" size="small" style={{ flex: 1 }}>
                <OutlinedInput
                  id="outlined-adornment-amount-5"
                  value={values.discount_max}
                  onChange={handleChangeValue('discount_max')}
                  endAdornment={<InputAdornment position="end">₫</InputAdornment>}
                  type="number"
                  autoComplete="off"
                  style={{ flex: 1 }}
                  placeholder={t('enterHere')}
                />
              </FormControl>
            )}
          </div>
        </FormCellCustom>
        {/* Minimum order value */}
        <FormCellCustom label={t('voucher.minOrder')} helperText={''}>
          <div className={classes.formCell + ' ' + classes.flex_center}>
            <FormControl component="fieldset" size="small" style={{ flex: 1 }}>
              <OutlinedInput
                id="outlined-adornment-amount-5"
                value={values.order_money_min}
                onChange={handleChangeValue('order_money_min')}
                endAdornment={<InputAdornment position="end">₫</InputAdornment>}
                type="number"
                autoComplete="off"
                style={{ flex: 1 }}
                placeholder={t('enterHere')}
              />
            </FormControl>
          </div>
        </FormCellCustom>
        {/* Maximum usage */}
        <FormCellCustom label={t('voucher.maxUse')} helperText={t('voucher.maxUseDes')}>
          <div className={classes.formCell + ' ' + classes.flex_center}>
            <FormControl component="fieldset" size="small" style={{ flex: 1 }}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={''}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: values.maximum_usage,
                  onChange: handleChangeValue('maximum_usage'),
                }}
                placeholder={t('enterHere')}
                autoComplete="off"
              />
            </FormControl>
          </div>
        </FormCellCustom>
      </FormGroupCustom>
    );
  };

  const FormGroupCustom_3 = () => {
    return (
      <FormGroupCustom title={t('voucher.displayVoucher')}>
        {/* Display */}
        <FormCellCustom label={t('voucher.settingDisplay')} helperText={''}>
          <div className={classes.formCell}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="shop"
                name="shop1"
                value={values.display}
                onChange={handleChangeValue('display')}
                className={classes.flex_column}>
                <FormControlLabel
                  value={'many'}
                  control={<CustomRadio />}
                  label={t('voucher.showMulti')}
                />
                {values.code_type == 'all' ? (
                  <>
                    <FormControlLabel
                      value={'voucher'}
                      control={<CustomRadio />}
                      label={t('voucher.share')}
                    />
                  </>
                ) : (
                  <FormControlLabel
                    value={'noPublic'}
                    control={<CustomRadio />}
                    label={t('voucher.notPublic')}
                  />
                )}
              </RadioGroup>
            </FormControl>
          </div>
        </FormCellCustom>
        {/* Applicable products */}
        <FormCellCustom label={t('voucher.applicable')} helperText={''}>
          <div className={classes.formCell}>
            {values.code_type == 'all' ? (
              <p className={classes.text + ' ' + classes.checkBoxLabel}>
                {t('voucher.allProducts')}
              </p>
            ) : (
              <div className={classes.flex_center} style={{ justifyContent: 'space-between' }}>
                <p
                  className={classes.text + ' ' + classes.infoTextPrimary}
                  style={{ color: grayColor[0] }}>
                  {values.added_product?.length} {t('voucher.addedProducts')}
                </p>
                <Button color="primary" onClick={() => setIsShowModal(true)}>
                  {t('voucher.selectProduct')}
                </Button>
              </div>
            )}
          </div>
        </FormCellCustom>
      </FormGroupCustom>
    );
  };

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{t('voucher.createVoucher')}</h4>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        {FormGroupCustom_1()}
        {FormGroupCustom_2()}
        {FormGroupCustom_3()}
        {values.code_type == 'product' && values.added_product?.length > 0 && (
          <div className={classes.formCell} style={{ margin: '0 auto' }}>
            {TableData()}
          </div>
        )}
        <ModalCustom
          width={1000}
          title={t('voucher.addProducts')}
          subTitle={''}
          // isShow={true}
          isShow={isShowModal}
          handleClose={() => setIsShowModal(false)}>
          <div className={classes.flex_center}>
            <FormControl variant="outlined" size="small">
              <Select
                labelId="select-outlined-label-1"
                id="select-outlined"
                value={filterType}
                onChange={handleChangeFilterType}>
                <MenuItem value={'name'}>{t('voucher.byAmount')}</MenuItem>
                <MenuItem value={'id'}>{t('voucher.byPercent')}</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small" style={{ flex: 1 }}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={''}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: filterValue,
                  onChange: handleChangeFilterValue,
                }}
                placeholder={t('enterHere')}
                autoComplete="off"
                style={{ flex: 1 }}
              />
            </FormControl>
            <div style={{ marginLeft: '10px' }}>
              <Button color="primary">{t('search')}</Button>
              <Button color="gray">{t('reset')}</Button>
            </div>
          </div>
          <div className={tableClasses.tableResponsive} style={{ marginTop: '0' }}>
            <Table className={tableClasses.table}>
              {dataProduct !== undefined ? (
                <TableHead className={tableClasses['primary' + 'TableHeader']}>
                  <TableRow className={tableClasses.tableHeadRow}>
                    <TableCell className={tableClasses.tableCell}>
                      <Checkbox
                        checked={isCheckAll}
                        tabIndex={-1}
                        onClick={() => handleCheckAll()}
                        checkedIcon={<Check className={taskClasses.checkedIcon} />}
                        icon={<Check className={taskClasses.uncheckedIcon} />}
                        classes={{
                          checked: taskClasses.checked,
                          root: taskClasses.root,
                        }}
                      />
                    </TableCell>
                    {TABLE_HEAD.map((prop, key) => {
                      return (
                        <TableCell
                          className={tableClasses.tableCell + ' ' + tableClasses.tableHeadCell}
                          key={key}>
                          {prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
              ) : null}
              <TableBody>
                {dataProduct.map((item, index) => {
                  return renderProduct(item, index);
                })}
              </TableBody>
            </Table>
            <div className={classes.buttonContainer}>
              <Button
                color="primary"
                onClick={() => {
                  setValues({ ...values, ['added_product']: checked }), setIsShowModal(false);
                }}>
                {t('confirm')}
              </Button>
            </div>
          </div>
        </ModalCustom>
      </CardBody>
      <CardFooter className={classes.flex_end}>
        <Button color="primary" onClick={() => handleSubmit()}>
          {t('confirm')}
        </Button>
      </CardFooter>
    </Card>
  );
}

AddVoucherPage.layout = Admin;

export default WithAuthentication(AddVoucherPage);
