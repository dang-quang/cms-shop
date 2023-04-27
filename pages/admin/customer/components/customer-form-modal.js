import { Grid, makeStyles, TextField } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import CheckboxCustom from '../../../../components/CheckboxCustom/checkbox-custom';
import RegularButton from '../../../../components/CustomButtons/Button';
import Dropdown from '../../../../components/Dropdown/dropdown';
import ModalCustom from '../../../../components/ModalCustom/ModalCustom';
import validateText from '../../../../variables/validate-text';
import customerStyle from '../../../../assets/jss/natcash/views/customer-style';
import { useLanguage } from 'hooks';

const literacyOptions = [
  { title: 'Cao đẳng', value: 0 },
  { title: 'Thạc sĩ', value: 1 },
];

export const customerManagementText = [
  {
    id: 'en',
    title: 'Customer Management',
    search: {
      keyWord: 'Keyword',
      customerGroup: 'Customer group',
      active: 'Active',
    },
    placeholder: {
      choosevalue: 'Choose the value below',
    },
    button: {
      search: 'Search',
      addBtn: 'Add',
      exportFile: 'Export file',
      account: 'Account',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
    },
    table: {
      header: ['#', 'Customer name', 'Customer group', 'Phone', 'Address', 'Email', 'Act'],
      headerModal: ['#', 'Id', 'Name'],
    },
    modal: {
      title: 'Customer information',
      fields: {
        customerCode: 'Customer Code',
        isActive: 'Active',
        isAppliedDiscount: 'Apply Discount',
        fullname: 'Full name',
        address: 'Address',
        customerGroup: 'Customer Group',
        email: 'Email',
        phoneNumber: 'Phone number',
        province: 'Province',
        district: 'District',
        idCardNumber: 'Id Card Number',
        fax: 'Fax',
        account: 'Account',
        bank: 'Bank',
        note: 'Note',
      },
    },
  },
  {
    id: 'vi',
    title: 'Quản lý khách hàng',
    search: {
      keyWord: 'Từ khoá',
      customerGroup: 'Nhóm khách hàng',
      active: 'Hoạt động',
    },
    placeholder: {
      choosevalue: 'Chọn giá trị bên dưới',
    },
    button: {
      search: 'Tìm kiếm',
      addBtn: 'Thêm',
      exportFile: 'Xuất file',
      account: 'Tài khoản',
      edit: 'Sửa',
      save: 'Lưu',
      cancel: 'Huỷ',
      delete: 'Xoá',
    },
    table: {
      header: [
        '#',
        'Tên Khách Hàng',
        'Nhóm Khách Hàng',
        'Điện Thoại',
        'Địa Chỉ',
        'Email',
        'Hành động',
      ],
      headerModal: ['#', 'Mã', 'Tên'],
    },
    modal: {
      title: 'Thông tin khách hàng',
      fields: {
        customerCode: 'Mã khách hàng',
        isActive: 'Kích hoạt',
        isAppliedDiscount: 'Áp dụng chiết khấu',
        fullname: 'Họ tên',
        address: 'Địa chỉ',
        customerGroup: 'Nhóm khách hàng',
        email: 'Email',
        phoneNumber: 'Số điện thoại',
        province: 'Tỉnh thành',
        district: 'Quận huyện',
        idCardNumber: 'CMND',
        fax: 'Fax',
        account: 'Tài Khoản',
        bank: 'Ngân hàng',
        note: 'Ghi chú',
      },
    },
  },
];

export default function CustomerFormModal({ customerInfo, handleClose }) {
  const useStyles = makeStyles(customerStyle);
  const classes = useStyles();
  const [text] = useLanguage(customerManagementText);
  const [valText] = useLanguage(validateText);

  const validationSchema = yup.object({
    customerCode: yup.string().required(valText.required),
    fullname: yup.string().required(valText.required),
  });

  const { values, setFieldValue, touched, errors, dirty, isSubmitting, submitForm } = useFormik({
    initialValues: {
      customerCode: customerInfo?.customerCode || '',
      isActive: customerInfo?.isActive || false,
      isAppliedDiscount: customerInfo?.isAppliedDiscount || false,
      fullname: customerInfo?.fullname || '',
      address: customerInfo?.address || '',
      customerGroup: customerInfo?.customerGroup || '',
      email: customerInfo?.email || '',
      phoneNumber: customerInfo?.phoneNumber || '',
      province: customerInfo?.province || '',
      district: customerInfo?.district || '',
      idCardNumber: customerInfo?.idCardNumber || '',
      fax: customerInfo?.fax || '',
      account: customerInfo?.account || '',
      bank: customerInfo?.bank || '',
      note: customerInfo?.note || '',
    },
    validationSchema,
    onSubmit: () => {},
  });

  return (
    <ModalCustom maxWidth={950} title={text.modal.title} isShow={true} handleClose={handleClose}>
      <GridContainer>
        <GridItem itemAlign={'center'} container spacing={3}>
          <Grid item xs={3}>
            <TextField
              label={text.modal.fields.customerCode}
              variant="outlined"
              size="small"
              fullWidth
              placeholder="..."
              autoComplete="off"
              value={values.customerCode}
              onChange={(e) => setFieldValue('customerCode', e.target.value)}
              onBlur={() => setFieldValue('customerCode', values.customerCode?.trim())}
              error={touched.customerCode && errors.customerCode}
              helperText={touched.customerCode && errors.customerCode}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={text.modal.fields.fullname}
              variant="outlined"
              size="small"
              fullWidth
              placeholder="..."
              autoComplete="off"
              value={values.fullname}
              onChange={(e) => setFieldValue('fullname', e.target.value)}
              onBlur={() => setFieldValue('fullname', values.fullname?.trim())}
              error={touched.fullname && errors.fullname}
              helperText={touched.fullname && errors.fullname}
            />
          </Grid>
          <Grid item xs={2}>
            <CheckboxCustom
              lable={text.modal.fields.isActive}
              checked={values.isActive}
              onChange={(e) => setFieldValue('isActive', e.target.checked)}
            />
          </Grid>
          <Grid item xs={3}>
            <CheckboxCustom
              lable={text.modal.fields.isAppliedDiscount}
              checked={values.isAppliedDiscount}
              onChange={(e) => setFieldValue('isAppliedDiscount', e.target.checked)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={text.modal.fields.idCardNumber}
              variant="outlined"
              size="small"
              fullWidth
              placeholder="..."
              autoComplete="off"
              value={values.idCardNumber}
              onChange={(e) => setFieldValue('idCardNumber', e.target.value)}
              onBlur={() => setFieldValue('idCardNumber', values.idCardNumber?.trim())}
              error={touched.idCardNumber && errors.idCardNumber}
              helperText={touched.idCardNumber && errors.idCardNumber}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={text.modal.fields.phoneNumber}
              variant="outlined"
              size="small"
              fullWidth
              placeholder="..."
              autoComplete="off"
              value={values.phoneNumber}
              onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
              onBlur={() => setFieldValue('phoneNumber', values.phoneNumber?.trim())}
              error={touched.phoneNumber && errors.phoneNumber}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={text.modal.fields.email}
              variant="outlined"
              size="small"
              fullWidth
              placeholder="..."
              autoComplete="off"
              value={values.email}
              onChange={(e) => setFieldValue('email', e.target.value)}
              onBlur={() => setFieldValue('email', values.email?.trim())}
              error={touched.email && errors.email}
              helperText={touched.email && errors.email}
            />
          </Grid>
          <Grid item xs={2}>
            <Dropdown
              title={text.modal.fields.province}
              options={literacyOptions}
              value={values.province}
              handleOnChange={(e) => setFieldValue('province', e.target.value)}
              helperErrorText={touched.province && errors.province}
            />
          </Grid>
          <Grid item xs={2}>
            <Dropdown
              title={text.modal.fields.district}
              options={literacyOptions}
              value={values.district}
              handleOnChange={(e) => setFieldValue('district', e.target.value)}
              helperErrorText={touched.district && errors.district}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label={text.modal.fields.address}
              variant="outlined"
              size="small"
              fullWidth
              placeholder="..."
              autoComplete="off"
              value={values.address}
              onChange={(e) => setFieldValue('address', e.target.value)}
              onBlur={() => setFieldValue('address', values.address?.trim())}
              error={touched.address && errors.address}
              helperText={touched.address && errors.address}
            />
          </Grid>
          <Grid item xs={3}>
            <Dropdown
              title={text.modal.fields.customerGroup}
              options={literacyOptions}
              value={values.customerGroup}
              handleOnChange={(e) => setFieldValue('customerGroup', e.target.value)}
              helperErrorText={touched.customerGroup && errors.customerGroup}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label={text.modal.fields.fax}
              variant="outlined"
              size="small"
              fullWidth
              placeholder="..."
              autoComplete="off"
              value={values.fax}
              onChange={(e) => setFieldValue('fax', e.target.value)}
              onBlur={() => setFieldValue('fax', values.fax?.trim())}
              error={touched.fax && errors.fax}
              helperText={touched.fax && errors.fax}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label={text.modal.fields.account}
              variant="outlined"
              size="small"
              fullWidth
              placeholder="..."
              autoComplete="off"
              value={values.account}
              onChange={(e) => setFieldValue('account', e.target.value)}
              onBlur={() => setFieldValue('account', values.account?.trim())}
              error={touched.account && errors.account}
              helperText={touched.account && errors.account}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label={text.modal.fields.bank}
              variant="outlined"
              size="small"
              fullWidth
              placeholder="..."
              autoComplete="off"
              value={values.bank}
              onChange={(e) => setFieldValue('bank', e.target.value)}
              onBlur={() => setFieldValue('bank', values.bank?.trim())}
              error={touched.bank && errors.bank}
              helperText={touched.bank && errors.bank}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={text.modal.fields.note}
              variant="outlined"
              size="small"
              multiline
              rows={4}
              fullWidth
              placeholder="..."
              autoComplete="off"
              value={values.note}
              onChange={(e) => setFieldValue('note', e.target.value)}
              onBlur={() => setFieldValue('note', values.note?.trim())}
              error={touched.note && errors.note}
              helperText={touched.note && errors.note}
            />
          </Grid>
        </GridItem>
      </GridContainer>
      <div className={classes.flexItemRight} style={{ marginTop: 20 }}>
        <RegularButton color="primary" onClick={submitForm}>
          OK
        </RegularButton>
      </div>
    </ModalCustom>
  );
}
