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
import { requestGetOwnerShop, requestsCreateEditShop } from 'utilities/ApiManage';
import { useRouter } from 'next/router';
import { Close } from '@material-ui/icons';
import { setShowLoader } from 'redux/actions/app';
import { BASE_API_URL } from 'utilities/const';
import { Button, Flex, Text } from '@chakra-ui/react';
import _ from 'lodash';

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
function ShopDetails() {
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { t } = useTranslation();
  const { height } = useWindowDimensions();

  const refInput = React.useRef(null);
  const router = useRouter();

  const shop = !_.isEmpty(router.query) ? router.query : undefined;

  const [selectedImages, setSelectedImages] = React.useState([]);

  const addUpdateShopValidationSchema = yup.object().shape({
    shopName: yup.string().required(t('errorShopNameRequire')),
    phone: yup
      .string()
      .required(t('errorPhoneRequire'))
      .matches(/^[0-9-+s()]*$/, t('errorInvalidPhone')),
    address: yup.string().required(t('errorAddressRequire')),
    shopCode: yup
      .string()
      .matches(/^[A-Z0-9]{1,5}$/, t('category.categoryCodeDes'))
      .required(t('errorCodeRequire')),
    shopType: yup.string().required(t('errorShopTypeRequire')),
    ownerShop: yup.object().required(t('errorOwnerShopRequire')),
    email: yup.string().required(t('errorEmailRequire')).email(t('errorInvalidEmail')),
  });

  return (
    <Formik
      validateOnChange={false}
      validationSchema={addUpdateShopValidationSchema}
      enableReinitialize={true}
      initialValues={shop ? shop : initialValues}>
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
        }, [shop]);

        return (
          <Form style={{ height: height - 150 + 'px', overflowY: 'auto' }}>
            <Card>
              <CardHeader color="primary">
                <Text textStyle="h5" color="text-white">
                  Shop Details
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
                        disabled
                        InputProps={{
                          classes: {
                            root: classes.inputRoot,
                            disabled: classes.disabled,
                          },
                        }}
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
                          disabled
                          InputProps={{
                            classes: {
                              root: classes.inputRoot,
                              disabled: classes.disabled,
                            },
                          }}
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
                          disabled
                          InputProps={{
                            classes: {
                              root: classes.inputRoot,
                              disabled: classes.disabled,
                            },
                          }}
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
                          disabled
                          InputProps={{
                            classes: {
                              root: classes.inputRoot,
                              disabled: classes.disabled,
                            },
                          }}
                        />
                      </GridItem>
                      <GridItem className={classes.viewItem} xs={12} sm={6} md={6}>
                        <TextField
                          id="outlined-type-shop"
                          label={t('addShop.typeShop')}
                          variant="outlined"
                          style={{ width: '100%', marginBottom: 20 }}
                          value={values.shopType}
                          onChange={handleChange('shopType')}
                          autoComplete="off"
                          error={!!errors.shopType}
                          helperText={errors.shopType}
                          disabled
                          InputProps={{
                            classes: {
                              root: classes.inputRoot,
                              disabled: classes.disabled,
                            },
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <Autocomplete
                      id="ownerShop"
                      autoComplete
                      options={[]}
                      includeInputInList
                      value={values.ownerShop}
                      onChange={(e, value) => {
                        setFieldValue('ownerShop', value);
                      }}
                      getOptionLabel={({ fullName, msisdn }) =>
                        `Name: ${fullName} - Phone number: ${msisdn}`
                      }
                      disabled
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="outlined-ownerShop"
                          label={t('addShop.ownerShop')}
                          variant="outlined"
                          error={!!errors.ownerShop}
                          helperText={errors.ownerShop}
                          style={{ width: '100%', marginBottom: 20 }}
                          disabled
                          InputProps={{
                            classes: {
                              root: classes.inputRoot,
                              disabled: classes.disabled,
                            },
                          }}
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
                      disabled
                      InputProps={{
                        classes: {
                          root: classes.inputRoot,
                          disabled: classes.disabled,
                        },
                      }}
                    />
                    <FormGroup>
                      <FormControlLabel
                        label={t('status')}
                        control={
                          <Switch
                            checked={values.status === 1 ? true : false}
                            onChange={() => {}}
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
                      label={t('addShop.referenceShopCode')}
                      variant="outlined"
                      value={values.shopCode}
                      onChange={handleChange('shopCode')}
                      error={!!errors.shopCode}
                      helperText={
                        !!errors.shopCode ? errors.shopCode : t('category.categoryCodeDes')
                      }
                      style={{ width: '100%', marginBottom: 20 }}
                      disabled
                      InputProps={{
                        classes: {
                          root: classes.inputRoot,
                          disabled: classes.disabled,
                        },
                      }}
                    />
                    <div className={classes.imageView} onClick={() => refInput.current.click()}>
                      <TextField
                        id="outlined-shop-code"
                        variant="outlined"
                        label={t('upload_image_of_shop')}
                        fullWidth
                      />
                      <input
                        ref={refInput}
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        multiple
                        disabled
                        style={{ display: 'none', cursor: 'pointer' }}
                      />
                      <div className={classes.box} />
                    </div>
                    {selectedImages.length > 0 &&
                      selectedImages.map((photo, index) => {
                        return (
                          <div key={index} className={classes.imgContainer}>
                            <img src={photo} alt="" key={photo} className={classes.imageUpload} />
                          </div>
                        );
                      })}
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
}

ShopDetails.layout = Admin;

export default WithAuthentication(ShopDetails);
