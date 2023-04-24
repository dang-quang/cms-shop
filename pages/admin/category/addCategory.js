import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { setShowLoader } from '../../../redux/actions/app';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
// @material-ui/core components
// layout for this page
import Admin from 'layouts/Admin.js';
// core components
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  withStyles,
} from '@material-ui/core';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import FormGroupCustom from 'components/FormCustom/FormGroupCustom.js';
import FormCellCustom from 'components/FormCustom/FormCellCustom.js';
import styles from 'assets/jss/natcash/views/category/addCategoryStyle';
import { useTranslation } from 'react-i18next';
import { Autocomplete } from '@material-ui/lab';
import _ from 'lodash';
import { requestCreateEditCategory } from '../../../utilities/ApiManage';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

const listShop = [
  {
    id: '1',
    name: 'Nat shop',
  },
  {
    id: '2',
    name: 'Second shop',
  },
  {
    id: '3',
    name: 'Third shop',
  },
  {
    id: '4',
    name: 'Four shop',
  },
  {
    id: '5',
    name: 'Five shop',
  },
  {
    id: '6',
    name: 'Six shop',
  },
];

const initialValues = {
  id: '',
  name: '',
  autoCode: false,
  code: '',
  parentId: '',
  promotion: false,
};

function AddProductCategory({ category, onUpdated }) {
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { t } = useTranslation();

  const CustomRadio = withStyles({
    root: {
      color: 'gray',
      '&$checked': {
        color: '#f96606',
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  const _category = category;

  const handleSubmitCategory = async ({ id, name, autoCode, code, parentId, promotion }) => {
    dispatch(setShowLoader(true));
    if (_category) {
      const res = await requestCreateEditCategory({
        id,
        name,
        code,
        parentId,
        promotion,
      });
      dispatch(setShowLoader(false));
      if (res.code === 'MSG_SUCCESS') {
        Router.push('/admin/category');
        onUpdated();
      } else {
        NotificationManager.error({
          title: t('error'),
          message: res.message ? res.message.text : 'Error',
        });
      }
      closeDialog();
    } else {
      const res = await requestCreateEditCategory({
        name,
        code,
        parentId,
        promotion,
      });
      dispatch(setShowLoader(false));
      if (res.code === 200) {
        Router.push('/admin/category');
      } else {
        NotificationManager.error({
          title: t('error'),
          message: res.message ? res.message.text : 'Error',
        });
      }
      closeDialog();
    }
  };

  //Todo Validation Schema
  const addUpdateCategoryValidationSchema = yup.object().shape({
    name: yup.string().required(t('errorNameRequire')),
    code: yup.string().required(t('errorCodeRequire')),
    parentId: yup.string().required(t('errorTypeRequire')),
    promotion: yup.string().required(t('errorImageRequire')),
  });

  return (
    <Formik
      validateOnChange={false}
      validationSchema={addUpdateCategoryValidationSchema}
      enableReinitialize={true}
      initialValues={category ? category : initialValues}
      onSubmit={handleSubmitCategory}>
      {({ handleChange, handleSubmit, setFieldValue, values, errors }) => {
        return (
          <Form>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{t('category.createCategory')}</h4>
              </CardHeader>
              <CardBody className={classes.cardBody}>
                <FormGroupCustom title={t('basicInformation')}>
                  <FormCellCustom
                    error={!!errors.name}
                    label={t('sideBar.category')}
                    helperText={errors.name ? errors.name : t('category.categoryName')}>
                    <div className={classes.formCell}>
                      <TextField
                        label={''}
                        variant="outlined"
                        size="small"
                        fullWidth
                        inputProps={{
                          value: values.name,
                          onChange: handleChange('name'),
                        }}
                        placeholder={t('enterHere')}
                        autoComplete="off"
                        error={!!errors.name}
                      />
                    </div>
                  </FormCellCustom>
                  <FormCellCustom label={t('category.autoProduceCategory')} helperText={''}>
                    <div className={classes.formCell}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          value={values.autoCode}
                          onChange={handleChange('autoCode')}
                          className={classes.flex_center}>
                          <FormControlLabel
                            value={'Yes'}
                            control={<CustomRadio />}
                            label={t('yes')}
                          />
                          <FormControlLabel
                            value={'No'}
                            control={<CustomRadio />}
                            label={t('no')}
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </FormCellCustom>
                  <FormCellCustom
                    label={t('category.categoryCode')}
                    helperText={t('category.categoryCodeDes')}>
                    <div className={classes.formCell}>
                      <TextField
                        label={''}
                        variant="outlined"
                        size="small"
                        fullWidth
                        inputProps={{
                          value: values.code,
                          onChange: handleChange('code'),
                        }}
                        placeholder={t('enterHere')}
                        autoComplete="off"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <span className={classes.infoText}>DM</span>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                  </FormCellCustom>
                  <FormCellCustom
                    label={t('category.parentCategoryCode')}
                    helperText={t('category.parentCategoryCodeDes')}>
                    <div className={classes.formCell}>
                      <Autocomplete
                        limitTags={2}
                        size="small"
                        options={listShop}
                        getOptionLabel={(option) => option.name}
                        onChange={handleChange('parentId')}
                        renderOption={(option) => (
                          <React.Fragment>
                            <div style={{ alignItems: 'center' }}>
                              <p style={{ fontSize: '15px', margin: 0 }}>{option.name}</p>
                              {/*<p className={classes.txtMemberSelect}>{"@" + option.email.split("@")[0]}</p>*/}
                            </div>
                          </React.Fragment>
                        )}
                        style={{ margin: '10px 0px' }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label={t('category.parentCategoryCode')}
                            placeholder={t('notSet')}
                          />
                        )}
                      />
                    </div>
                  </FormCellCustom>
                  <FormCellCustom label={t('category.applyPromotion')} helperText={''}>
                    <div className={classes.formCell}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="shop"
                          name="shop1"
                          value={values.promotion}
                          onChange={handleChange('promotion')}
                          className={classes.flex_center}>
                          <FormControlLabel
                            value={'Yes'}
                            control={<CustomRadio />}
                            label={t('yes')}
                          />
                          <FormControlLabel
                            value={'No'}
                            control={<CustomRadio />}
                            label={t('no')}
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </FormCellCustom>
                </FormGroupCustom>
                <NotificationContainer />
              </CardBody>
              <CardFooter className={classes.flex_end}>
                <Button color="gray" onClick={() => Router.back()}>
                  {t('cancel')}
                </Button>
                <Button color="primary" onClick={() => handleSubmit()}>
                  {t('confirm')}
                </Button>
              </CardFooter>
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
}

AddProductCategory.layout = Admin;

export default WithAuthentication(AddProductCategory);
