import React from 'react';
import { useDispatch } from 'react-redux';
//@ts-ignore
import { NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
import Admin from 'layouts/Admin';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import { useTranslation } from 'react-i18next';
import { makeStyles, TextField, Switch, FormGroup, FormControlLabel } from '@material-ui/core';
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
import { useRouter } from 'next/router';
import { Close } from '@material-ui/icons';
import { setShowLoader } from 'redux/actions/app';
import { BASE_API_URL } from 'utilities/const';
import { IShop, IUser } from 'constants/types';
import { Text } from '@chakra-ui/react';

const initialValues = {
  id: '',
  shopName: '',
  shopCode: '',
  address: '',
  phone: '',
  avatar: '',
  shopType: '',
  description: '',
  status: 1,
  email: '',
  ownerShop: undefined,
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
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        dispatch(setShowLoader(true));
        const res = await requestGetOwnerShop();
        if (res && res.code === 'MSG_SUCCESS') {
          setUsers(res.data);
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
    async (
      {
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
      },
      { setFieldError }
    ) => {
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
            status,
          });
          if (res && res.code === 'MSG_SUCCESS') {
            router.push('/admin/shop-management');
          } else if (res && res.code === 'ERR_CODE_SHOP') {
            setFieldError('shopCode', `${res.message}`);
          } else {
            NotificationManager.error({
              title: t('error'),
              message: res.message ? res.message.text : 'Error',
            });
          }
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
            status,
          });
          dispatch(setShowLoader(false));
          if (res && res.code === 'MSG_SUCCESS') {
            router.push('/admin/shop-management');
          } else if (res && res.code === 'ERR_CODE_SHOP') {
            setFieldError('shopCode', `${res.message}`);
          } else {
            NotificationManager.error({
              title: t('error'),
              message: res.message ? res.message.text : 'Error',
            });
          }
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
    address: yup.string().required(t('errorAddressRequire')),
    shopCode: yup.string().required(t('errorShopCodeRequire')),
    shopType: yup.string().required(t('errorShopTypeRequire')),
    ownerShop: yup.object().required(t('errorOwnerShopRequire')),
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
              setFieldValue('ownerShop', {
                id: shop.ownerShop,
                fullName: shop.nameOwnerShop,
                msisdn: '',
              });
            }

            setFieldValue('status', parseInt(shop.status));
          }
        }, [shop, users]);

        return (
          <Form style={{ height: height - 150 + 'px', overflowY: 'auto' }}>
            <Card>
              <CardHeader color="primary">
                <Text textStyle="h5" color="text-white">
                  {shop ? t('addShop.edit_shop') : t('addShop.create_new_shop')}
                </Text>
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
                    <FormGroup>
                      <FormControlLabel
                        label={t('status')}
                        control={
                          <Switch
                            checked={values.status === 1 ? true : false}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFieldValue('status', 1);
                              } else {
                                setFieldValue('status', 0);
                              }
                            }}
                            name="status"
                            color="primary"
                          />
                        }
                      />
                    </FormGroup>
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
