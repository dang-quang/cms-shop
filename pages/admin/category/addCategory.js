import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
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
  IconButton,
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
import { requestCreateEditCategory, requestsGetParentCategory } from '../../../utilities/ApiManage';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Close, PhotoCamera } from '@material-ui/icons';
import { BASE_API_URL } from '../../../utilities/const';

const initialValues = {
  id: '',
  name: '',
  code: '',
  image: '',
  promotion: '',
};

function AddProductCategory({ onUpdated }) {
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { t } = useTranslation();

  const router = useRouter();
  const category = !_.isEmpty(router.query) ? router.query : undefined;

  const [selectedImages, setSelectedImages] = React.useState([]);
  const [parentCategories, setParentCategories] = React.useState([]);

  const CustomRadio = withStyles({
    root: {
      color: 'gray',
      '&$checked': {
        color: '#f96606',
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  React.useEffect(() => {
    (async () => {
      try {
        dispatch(setShowLoader(true));

        const res = await requestsGetParentCategory();

        if (res.code === 'MSG_SUCCESS' && res.data && res.data.length > 0) {
          if (category) {
            const list = res.data.filter((e) => e.id !== parseInt(category.id));
            setParentCategories(list);
          } else {
            setParentCategories(res.data);
          }
        }
      } finally {
        dispatch(setShowLoader(false));
      }
    })();
  }, [category]);

  const handleRemoveImage = (photo, setFieldValue) => {
    const currentIndex = selectedImages.indexOf(photo);
    const newListImages = [...selectedImages];
    newListImages.splice(currentIndex, 1);
    setSelectedImages(newListImages);
    setFieldValue('image', '');
  };

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const arr = reader.result.split(',');
        setFieldValue('image', arr[1]);
      };
      reader.readAsDataURL(file);
    }
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setSelectedImages(filesArray);
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const handleSubmitCategory = React.useCallback(
    async ({ id, name, code, parentId, promotion, image }) => {
      try {
        dispatch(setShowLoader(true));
        if (category) {
          console.log('quang debug parentId =====>', parentId);
          const res = await requestCreateEditCategory({
            id,
            name,
            code: code,
            parentId: parentId && parentId.id,
            promotion: promotion === 'true' ? 1 : 0,
            image,
          });
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
            name: name,
            code: code,
            parentId: parentId && parentId.id,
            promotion: promotion === 'true' ? 1 : 0,
            image,
          });
          dispatch(setShowLoader(false));
          if (res.code === 'MSG_SUCCESS') {
            Router.push('/admin/category');
          } else {
            NotificationManager.error({
              title: t('error'),
              message: res.message ? res.message.text : 'Error',
            });
          }
          closeDialog();
        }
      } finally {
        dispatch(setShowLoader(false));
      }
    },
    [category]
  );

  const addUpdateCategoryValidationSchema = yup.object().shape({
    name: yup.string().required(t('errorNameRequire')),
    code: yup
      .string()
      .required(t('errorCodeRequire'))
      .matches(/^[A-Z0-9]{1,5}$/, t('category.categoryCodeDes')),
    promotion: yup.boolean().required(t('errorPromotionRequire')),
  });

  return (
    <Formik
      validateOnChange={false}
      validationSchema={addUpdateCategoryValidationSchema}
      enableReinitialize={true}
      initialValues={category ? category : initialValues}
      onSubmit={handleSubmitCategory}>
      {({ handleChange, handleSubmit, setFieldValue, values, errors }) => {
        React.useEffect(() => {
          if (category && category.promotion === '1') {
            setFieldValue('promotion', 'true');
          } else {
            setFieldValue('promotion', 'false');
          }

          if (category && category.image) {
            const str = BASE_API_URL + '/assets/' + category.image;

            setSelectedImages([str]);

            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = str;
            img.onload = async () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              const dataURL = canvas.toDataURL('image/png');

              setFieldValue('image', dataURL.replace(/^data:image\/(png|jpg);base64,/, ''));
            };
          }

          if (category && category.parentId) {
            setFieldValue('parentId', {
              id: parseInt(category.parentId),
              name: category.parentName,
            });
          }
        }, [category]);

        return (
          <Form>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  {category ? 'Edit Category' : t('category.createCategory')}
                </h4>
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
                  <FormCellCustom
                    error={!!errors.code}
                    label={t('category.categoryCode')}
                    helperText={errors.code ? errors.code : t('category.categoryCodeDes')}>
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
                        error={!!errors.code}
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
                        value={values.parentId}
                        options={parentCategories || [{ name: '', id: '' }]}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => setFieldValue('parentId', newValue)}
                        renderOption={(option) => (
                          <React.Fragment>
                            <div style={{ alignItems: 'center' }}>
                              <p style={{ fontSize: '15px', margin: 0 }}>{option.name}</p>
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
                  <FormCellCustom
                    error={!!errors.promotion}
                    label={t('category.applyPromotion')}
                    helperText={!!errors.promotion && errors.promotion}>
                    <div className={classes.formCell}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="promotion"
                          name="promotion"
                          value={values.promotion}
                          onChange={handleChange('promotion')}
                          className={classes.flex_center}>
                          <FormControlLabel
                            value="true"
                            control={<CustomRadio />}
                            label={t('yes')}
                          />
                          <FormControlLabel
                            value="false"
                            control={<CustomRadio />}
                            label={t('no')}
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </FormCellCustom>
                  <FormCellCustom label={t('image')} helperText={''}>
                    <div className={classes.imageForm}>
                      {selectedImages.length > 0 ? (
                        selectedImages.map((photo, index) => {
                          return (
                            <div key={index} className={classes.imgContainer}>
                              <Close
                                className={classes.btnClose}
                                onClick={() => handleRemoveImage(photo, setFieldValue)}
                              />
                              <img src={photo} alt="" key={photo} className={classes.imageUpload} />
                            </div>
                          );
                        })
                      ) : (
                        <>
                          <input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            multiple
                            style={{ display: 'none' }}
                            onChange={(e) => handleImageChange(e, setFieldValue)}
                          />
                          <label
                            htmlFor="icon-button-file"
                            style={{ borderColor: !!errors.image && 'red' }}
                            className={classes.imageUpload + ' ' + classes.imageBtn}>
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span">
                              <PhotoCamera />
                            </IconButton>
                          </label>
                        </>
                      )}
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
