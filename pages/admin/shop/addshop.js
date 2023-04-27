import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
import Admin from 'layouts/Admin.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import ImageUpload from './ImageUpload';
import { useTranslation } from 'react-i18next';
import { MenuItem, makeStyles, TextField, FormHelperText, Switch } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';

import styles from 'assets/jss/natcash/views/shoplist/addShopStyle.js';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useWindowDimensions } from 'hooks';
import { isEmpty } from 'lodash';
import { requestGetOwnerShop, requestsCreateEditShop } from 'utilities/ApiManage';
import { Router, useRouter } from 'next/router';
import { Close } from '@material-ui/icons';
import { BASE_API_URL } from 'utilities/const';
import { setShowLoader } from 'redux/actions/app';

const initialValues = {
  id: '',
  shopName: '',
  shopCode: '',
  address: '',
  phone: '',
  avatar: '',
  shopType: '',
  description: '',
  status: false,
  email: '',
};
function AddShop() {
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { t } = useTranslation();
  const { height } = useWindowDimensions();

  const refInput = React.useRef(null);

  const router = useRouter();
  const shop = !isEmpty(router.query) ? router.query : undefined;

  const [selectedImages, setSelectedImages] = React.useState([]);
  const [users, setUser] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        dispatch(setShowLoader(true));
        const res = await requestGetOwnerShop();
        if (res && res.code === 'MSG_SUCCESS') {
          setUser(res.data);
        }
      } finally {
        dispatch(setShowLoader(false));
      }
    })();
  }, []);

  const handleRemoveImage = React.useCallback(
    (photo, setFieldValue) => {
      const currentIndex = selectedImages.indexOf(photo);
      const newListImages = [...selectedImages];
      newListImages.splice(currentIndex, 1);
      setSelectedImages(newListImages);
      setFieldValue('avatar', '');
    },
    [selectedImages]
  );

  const handleImageChange = React.useCallback((e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const arr = reader.result.split(',');
        setFieldValue('avatar', arr[1]);
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
  }, []);

  const handleSubmitShop = React.useCallback(
    async ({
      id,
      shopName,
      shopCode,
      address,
      phone,
      ownerShop,
      avatar,
      shopType,
      description,
      status,
      email,
    }) => {
      try {
        dispatch(setShowLoader(true));
        if (shop) {
          const res = await requestsCreateEditShop({
            id,
            shopName,
            shopCode,
            phone,
            email,
            address,
            shopType,
            ownerShop: ownerShop.id,
            avatar,
            description,
            status: status === true ? 1 : 0,
          });
          if (res && res.code === 'MSG_SUCCESS') {
            Router.push('/admin/shop');
            onUpdated();
          } else {
            NotificationManager.error({
              title: t('error'),
              message: res.message ? res.message.text : 'Error',
            });
          }
          closeDialog();
        } else {
          const res = await requestsCreateEditShop({
            shopName,
            shopCode,
            phone,
            email,
            address,
            shopType,
            ownerShop: ownerShop.id,
            avatar,
            description,
            status: status === true ? 1 : 0,
          });
          dispatch(setShowLoader(false));
          if (res && res.code === 'MSG_SUCCESS') {
            setTimeout(() => {
              Router.push('/admin/shop');
            }, 200);
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
    [shop]
  );

  //Todo Validation Schema
  const addUpdateShopValidationSchema = yup.object().shape({
    shopName: yup.string().required(t('errorShopNameRequire')),
    phone: yup
      .string()
      .required(t('errorPhoneRequire'))
      .matches(/^[0-9-+s()]*$/, t('errorInvalidPhone')),
    ownerShop: yup.string().required(t('errorContactRequire')),
    address: yup.string().required(t('errorAddressRequire')),
    shopCode: yup.string().required(t('errorShopCodeRequire')),
    shopType: yup.string().required(t('errorShopTypeRequire')),
    ownerShop: yup.string().required(t('errorOwnerShopRequire')),
    email: yup.string().required(t('errorEmailRequire')).email(t('errorInvalidEmail')),
    //description: yup.string().required('errorDescriptionRequire'),
    //avatar: yup.string().required(t('errorImageRequire')),
  });

  return (
    <Formik
      validateOnChange={false}
      validationSchema={addUpdateShopValidationSchema}
      enableReinitialize={true}
      initialValues={shop ? shop : initialValues}
      onSubmit={handleSubmitShop}>
      {({ handleChange, handleSubmit, setFieldValue, values, errors }) => {
        React.useEffect(() => {
          if (shop) {
            if (shop.avatar) {
              const str = BASE_API_URL + '/assets/' + shop.avatar;

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

                setFieldValue('avatar', dataURL.replace(/^data:image\/(png|jpg);base64,/, ''));
              };

              setSelectedImages([str]);
            }

            if (shop.ownerShop) {
              const user = users.find((i) => {
                i.ownerShop === parseInt(shop.ownerShop);
              });

              if (!user) {
                return;
              }
              setFieldValue('ownerShop', user);
            }

            if (shop.status && shop.status === 1) {
              setFieldValue('status', true);
            } else {
              setFieldValue('status', false);
            }
          }
        }, [shop, users]);

        return (
          <Form style={{ height: height - 150 + 'px', overflowY: 'auto' }}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Create new shop</h4>
              </CardHeader>
              <CardBody className={classes.cardBody} style={{ paddingBottom: 20 }}>
                <GridContainer>
                  <GridItem className={classes.viewItem} xs={12} sm={12} md={8}>
                    <div style={{ marginBottom: 20, width: '100%' }}>
                      <TextField
                        label={t('addShop.shopName')}
                        error={!!errors.shopName}
                        id="shopName"
                        variant="outlined"
                        fullWidth
                        value={values.shopName}
                        onChange={handleChange('shopName')}
                        autoComplete="off"
                        helperText={errors.shopName}
                      />
                    </div>
                    <GridContainer>
                      <GridItem className={classes.viewItem} xs={12} sm={6} md={6}>
                        <TextField
                          id="outlined-basic"
                          label={t('addShop.phoneNumber')}
                          variant="outlined"
                          style={{ marginBottom: 20, width: '100%' }}
                          value={values.phone}
                          onChange={handleChange('phone')}
                          autoComplete="off"
                          type="number"
                          error={!!errors.phone}
                          helperText={errors.phone}
                        />
                      </GridItem>
                      <GridItem className={classes.viewItem} xs={12} sm={6} md={6}>
                        <TextField
                          id="outlined-email"
                          label={t('addShop.email')}
                          variant="outlined"
                          style={{ marginBottom: 20, width: '100%' }}
                          value={values.email}
                          inputMode="email"
                          onChange={handleChange('email')}
                          autoComplete="off"
                          error={!!errors.email}
                          helperText={errors.email}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem className={classes.viewItem} xs={12} sm={6} md={6}>
                        <TextField
                          id="outlined-basic"
                          label={t('addShop.address')}
                          variant="outlined"
                          style={{ width: '100%', marginBottom: 20 }}
                          value={values.address}
                          onChange={handleChange('address')}
                          autoComplete="off"
                          error={!!errors.address}
                          helperText={errors.address}
                        />
                      </GridItem>
                      <GridItem className={classes.viewItem} xs={12} sm={6} md={6}>
                        <TextField
                          id="outlined-typeStore"
                          label={t('addShop.typeStore')}
                          variant="outlined"
                          style={{ width: '100%', marginBottom: 20 }}
                          value={values.shopType}
                          onChange={handleChange('shopType')}
                          autoComplete="off"
                          error={!!errors.shopType}
                          helperText={errors.shopType}
                        />
                      </GridItem>
                    </GridContainer>
                    <Autocomplete
                      label={t('addShop.ownerShop')}
                      id="ownerShop"
                      autoComplete
                      options={users || []}
                      includeInputInList
                      value={values.ownerShop}
                      onChange={(e, value) => {
                        setFieldValue('ownerShop', value);
                      }}
                      getOptionLabel={({ fullName, msisdn }) =>
                        `Name: ${fullName} - Phone number: ${msisdn}`
                      }
                      getOptionSelected={({ fullName, msisdn }) =>
                        `Name: ${fullName} - Phone number: ${msisdn}`
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="outlined-ownerShop"
                          label={t('addShop.ownerShop')}
                          variant="outlined"
                          error={!!errors.ownerShop}
                          helperText={errors.ownerShop}
                          style={{ width: '100%', marginBottom: 20 }}
                        />
                      )}
                    />
                    <TextField
                      id="outlined-description"
                      label={t('description')}
                      value={values.description}
                      onChange={handleChange('description')}
                      variant="outlined"
                      error={!!errors.description}
                      helperText={errors.description}
                      multiline
                      minRows={4}
                      style={{ width: '100%', marginBottom: 20 }}
                    />
                    <Switch
                      checked={values.status}
                      onChange={handleChange('status')}
                      name="status"
                      color="primary"
                    />
                  </GridItem>
                  <GridItem className={classes.viewItem} xs={12} sm={12} md={4}>
                    <TextField
                      id="outlined-shop-code"
                      label={t('addShop.referenceStoreCode')}
                      variant="outlined"
                      value={values.shopCode}
                      onChange={handleChange('shopCode')}
                      error={!!errors.shopCode}
                      helperText={errors.shopCode}
                      style={{ width: '100%', marginBottom: 20 }}
                    />
                    <div className={classes.imageView} onClick={() => refInput.current.click()}>
                      <TextField
                        id="outlined-shop-code"
                        variant="outlined"
                        value="Choose file"
                        disabled
                        fullWidth
                      />
                      <input
                        ref={refInput}
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        multiple
                        style={{ display: 'none', cursor: 'pointer' }}
                        onChange={(e) => handleImageChange(e, setFieldValue)}
                      />
                      <div className={classes.box} />
                    </div>
                    {selectedImages.length > 0 &&
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
                      })}
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter style={{ display: 'flex', with: '100%', justifyContent: 'center' }}>
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

AddShop.layout = Admin;

export default WithAuthentication(AddShop);
