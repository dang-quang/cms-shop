import React from 'react';
import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
import Admin from 'layouts/Admin';
import Card from 'components/Card/Card.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import { useTranslation } from 'react-i18next';
import { makeStyles, TextField, Switch, FormGroup, FormControlLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';

import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useWindowDimensions } from 'hooks';
import _, { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { setShowLoader } from 'redux/actions/app';
import { BASE_API_URL } from 'utilities/const';
import styles from 'assets/jss/natcash/views/shoplist/addShopStyle.js';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Close } from '@material-ui/icons';

const brands = [
  {
    id: 0,
    name: 'Vinamilk',
  },
  {
    id: 1,
    name: 'Fami',
  },
];

// interface FormValue {
//   id?: string;
//   name: string;
//   code: string;
//   price: string;
//   industry: string;
//   origin: string;
//   unit: string;
//   trademark?: string;
//   status: number;
//   code_generate: number;
//   images: string[];
//   video: string;
// }

const initialValues = {
  id: '',
  name: '',
  code: '',
  price: '',
  industry: '',
  origin: '',
  unit: '',
  status: 1,
  code_generate: 0,
  images: [],
  video: '',
};
function UpdateProduct() {
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { t } = useTranslation();
  const { height } = useWindowDimensions();

  const inputRef = React.useRef(null);

  const router = useRouter();

  const shop = !isEmpty(router.query) ? router.query : undefined;

  const [selectedImages, setSelectedImages] = React.useState([]);

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
    async ({}, { setFieldError }) => {
      try {
        dispatch(setShowLoader(true));
      } finally {
        dispatch(setShowLoader(false));
      }
    },
    [shop]
  );

  //Todo Validation Schema
  const updateShopValidationSchema = yup.object().shape({
    name: yup.string().required(t('errorShopNameRequire')),
    phone: yup
      .string()
      .required(t('errorPhoneRequire'))
      .matches(/^[0-9-+s()]*$/, t('errorInvalidPhone')),
    address: yup.string().required(t('errorAddressRequire')),
    code: yup.string().required(t('errorShopCodeRequire')),
    shopType: yup.string().required(t('errorShopTypeRequire')),
    //ownerShop: yup.object().required(t('errorOwnerShopRequire')),
    email: yup.string().required(t('errorEmailRequire')).email(t('errorInvalidEmail')),
    //description: yup.string().required('errorDescriptionRequire'),
    //avatar: yup.string().required(t('errorImageRequire')),
  });

  return (
    <Formik
      validateOnChange={false}
      //validationSchema={updateShopValidationSchema}
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleSubmitShop}>
      {({ handleChange, handleSubmit, setFieldValue, values, errors }) => {
        // React.useEffect(() => {
        //   if (shop) {
        //     if (shop.avatar) {
        //       const str = BASE_API_URL + '/assets/' + shop.avatar;

        //       const img = new Image();
        //       img.crossOrigin = 'anonymous';
        //       img.src = str;
        //       img.onload = async () => {
        //         const canvas = document.createElement('canvas');
        //         canvas.width = img.width;
        //         canvas.height = img.height;
        //         const ctx = canvas.getContext('2d');
        //         ctx.drawImage(img, 0, 0);
        //         const dataURL = canvas.toDataURL('image/png');

        //         setFieldValue('avatar', dataURL.replace(/^data:image\/(png|jpg);base64,/, ''));
        //       };

        //       setSelectedImages([str]);
        //     }

        //   }
        // }, [shop]);

        return (
          <Form style={{ height: height - 150 + 'px', overflowY: 'auto' }}>
            <Card>
              <Flex
                position="absolute"
                right="4"
                left="4"
                flexDirection={{ base: 'column', lg: 'row' }}
                alignItems={{ base: 'flex-start', lg: 'center' }}
                bgGradient="linear(to-l, primary.100, primary.200)"
                p="4"
                transform="auto"
                borderRadius="2px"
                translateY="-50%">
                <Text textStyle="h3-t" color="text-white" mr="4">
                  {t('shopUser.update_product')}
                </Text>
              </Flex>
              <Box p="4" mt="8">
                <GridContainer>
                  <GridItem className={classes.viewItem} xs={12} sm={12} md={8}>
                    <div style={{ marginBottom: 20, width: '100%' }}>
                      <TextField
                        label={t('shopUser.name')}
                        error={!!errors.name}
                        id="name"
                        variant="outlined"
                        fullWidth
                        value={values.name}
                        onChange={handleChange('name')}
                        autoComplete="off"
                        helperText={errors.name}
                      />
                    </div>
                    <GridContainer>
                      <GridItem className={classes.viewItem} xs={12} sm={6} md={6}>
                        <TextField
                          id="outlined-price"
                          label={t('shopUser.price')}
                          variant="outlined"
                          style={{ marginBottom: 20, width: '100%' }}
                          value={values.price}
                          onChange={handleChange('price')}
                          autoComplete="off"
                          error={!!errors.price}
                          helperText={errors.price}
                        />
                      </GridItem>
                      <GridItem className={classes.viewItem} xs={12} sm={6} md={6}>
                        <TextField
                          id="outlined-industry"
                          label={t('shopUser.industry')}
                          variant="outlined"
                          style={{ marginBottom: 20, width: '100%' }}
                          value={values.industry}
                          onChange={handleChange('industry')}
                          autoComplete="off"
                          error={!!errors.industry}
                          helperText={errors.industry}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem className={classes.viewItem} xs={12} sm={6} md={6}>
                        <TextField
                          id="outlined-basic"
                          label={t('shopUser.unit')}
                          variant="outlined"
                          style={{ width: '100%', marginBottom: 20 }}
                          value={values.unit}
                          onChange={handleChange('unit')}
                          autoComplete="off"
                          error={!!errors.unit}
                          helperText={errors.unit}
                        />
                      </GridItem>
                      <GridItem className={classes.viewItem} xs={12} sm={6} md={6}>
                        <TextField
                          id="outlined-origin"
                          label={t('shopUser.origin')}
                          variant="outlined"
                          style={{ width: '100%', marginBottom: 20 }}
                          value={values.origin}
                          onChange={handleChange('origin')}
                          autoComplete="off"
                          error={!!errors.origin}
                          helperText={errors.origin}
                        />
                      </GridItem>
                    </GridContainer>
                    <Autocomplete
                      id="ownerShop"
                      autoComplete
                      options={brands || []}
                      includeInputInList
                      value={values.trademark}
                      onChange={(e, value) => {
                        setFieldValue('trademark', value);
                      }}
                      getOptionLabel={({ name }) => `${name}`}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="outlined-trademark"
                          label={t('shopUser.trademark')}
                          variant="outlined"
                          error={!!errors.trademark}
                          helperText={errors.trademark}
                          style={{ width: '100%', marginBottom: 20 }}
                        />
                      )}
                    />
                    <FormGroup style={{ width: 'fit-content' }}>
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
                      id="outlined-product-code"
                      label={t('shopUser.product_code')}
                      variant="outlined"
                      value={values.code}
                      onChange={handleChange('code')}
                      error={!!errors.code}
                      helperText={errors.code}
                      style={{ width: '100%', marginBottom: 20 }}
                    />
                    <div className={classes.imageView} onClick={() => inputRef.current.click()}>
                      <TextField
                        id="outlined-shop-code"
                        variant="outlined"
                        value="Choose file"
                        disabled
                        fullWidth
                      />
                      <input
                        ref={inputRef}
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
              </Box>
              <CardFooter style={{ display: 'flex', with: '100%', justifyContent: 'center' }}>
                <div className={classes.buttonCancel}>
                  <Button color="gray" onClick={() => router.back()}>
                    {t('cancel')}
                  </Button>
                </div>
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

UpdateProduct.layout = Admin;

export default WithAuthentication(UpdateProduct);
