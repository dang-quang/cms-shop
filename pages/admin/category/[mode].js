import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
import Admin from 'layouts/Admin.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import { FormControlLabel, FormGroup, makeStyles, Switch, TextField } from '@material-ui/core';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import styles from 'assets/jss/natcash/views/category/addCategoryStyle';
import { useTranslation } from 'react-i18next';
import { Autocomplete } from '@material-ui/lab';
import _ from 'lodash';
import { requestCreateEditCategory, requestsGetParentCategory } from 'utilities/ApiManage';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Close } from '@material-ui/icons';
import { BASE_API_URL } from 'utilities/const';
import { setShowLoader } from 'redux/actions/app';
import { AspectRatio, Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

const initialValues = {
  id: '',
  name: '',
  code: '',
  image: '',
  promotion: 0,
};

function AddProductCategory({ onUpdated }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { t } = useTranslation();
  const refInput = React.useRef(null);

  const category =
    !_.isEmpty(router.query) && router.query.mode === 'update' ? router.query : undefined;

  const [selectedImages, setSelectedImages] = React.useState([]);
  const [parentCategories, setParentCategories] = React.useState([]);

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
    async ({ id, name, code, parentId, promotion, image }, { setFieldError }) => {
      try {
        dispatch(setShowLoader(true));
        if (category) {
          const res = await requestCreateEditCategory({
            id,
            name,
            code: code,
            parentId: parentId && parentId.id,
            promotion,
            image,
          });
          if (res.code === 'MSG_SUCCESS') {
            router.push('/admin/category');
            onUpdated();
          } else if (res && res.code === 'ERR_CODE_CATEGORY') {
            setFieldError('code', `${res.message}`);
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
            promotion,
            image,
          });
          if (res.code === 'MSG_SUCCESS') {
            router.push('/admin/category');
          } else if (res && res.code === 'ERR_CODE_CATEGORY') {
            setFieldError('code', `${res.message}`);
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

          if (category && category.promotion) {
            setFieldValue('promotion', parseInt(category.promotion));
          }
        }, [category]);

        return (
          <Form>
            <Card>
              <CardHeader color="primary">
                <Text textStyle="h5" color="text-white">
                  {category ? 'Edit Category' : t('category.createCategory')}
                </Text>
              </CardHeader>
              <CardBody className={classes.cardBody}>
                <GridContainer>
                  <GridItem className={classes.viewItem} xs={12} sm={12} md={8}>
                    <Box mb="5">
                      <TextField
                        label={t('name')}
                        error={!!errors.name}
                        id="shopName"
                        variant="outlined"
                        fullWidth
                        value={values.name}
                        onChange={handleChange('name')}
                        autoComplete="off"
                        helperText={errors.name}
                      />
                    </Box>
                    <Autocomplete
                      id="parentId"
                      autoComplete
                      options={parentCategories || []}
                      includeInputInList
                      value={values.parentId}
                      onChange={(e, value) => setFieldValue('parentId', value)}
                      getOptionLabel={(option) => option.name}
                      renderOption={(option) => (
                        <React.Fragment>
                          <div style={{ alignItems: 'center' }}>
                            <p style={{ fontSize: '15px', margin: 0 }}>{option.name}</p>
                          </div>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="outlined-parentId"
                          label={t('category.parentCategoryCode')}
                          helperText={t('category.parentCategoryCodeDes')}
                          variant="outlined"
                          style={{ width: '100%', marginBottom: 20 }}
                        />
                      )}
                    />
                    <Flex mb="5" justifyContent="flex-start">
                      <FormGroup>
                        <FormControlLabel
                          label={t('category.applyPromotion')}
                          control={
                            <Switch
                              checked={values.promotion === 1 ? true : false}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFieldValue('promotion', 1);
                                } else {
                                  setFieldValue('promotion', 0);
                                }
                              }}
                              name="promotion"
                              color="primary"
                            />
                          }
                        />
                      </FormGroup>
                    </Flex>
                  </GridItem>
                  <GridItem className={classes.viewItem} xs={12} sm={12} md={4}>
                    <TextField
                      id="outlined-code"
                      label={t('category.categoryCode')}
                      variant="outlined"
                      value={values.code}
                      onChange={handleChange('code')}
                      error={!!errors.code}
                      helperText={!!errors.code ? errors.code : t('category.categoryCodeDes')}
                      style={{ width: '100%', marginBottom: 20 }}
                    />
                    <Box
                      mb="5"
                      zIndex={1}
                      position="relative"
                      onClick={() => refInput.current.click()}>
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
                        style={{ display: 'none', cursor: 'pointer' }}
                        onChange={(e) => handleImageChange(e, setFieldValue)}
                      />
                      <Box position="absolute" cursor="pointer" inset="0" />
                    </Box>
                    <Flex alignItems="flex-start">
                      {selectedImages.length > 0 &&
                        selectedImages.map((photo, index) => {
                          return (
                            <Center
                              alignSelf="flex-start"
                              key={index}
                              position="relative"
                              mr="3"
                              mb="3">
                              <Box
                                position="absolute"
                                right="2px"
                                top="2px"
                                cursor="pointer"
                                zIndex={99}
                                color="black"
                                _hover={{ color: 'gray.300' }}
                                _focus={{ color: 'gray.300' }}>
                                <Close onClick={() => handleRemoveImage(photo, setFieldValue)} />
                              </Box>
                              <AspectRatio ratio={1} boxSize="200px">
                                <img
                                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                  src={photo}
                                  key={photo}
                                />
                              </AspectRatio>
                            </Center>
                          );
                        })}
                    </Flex>
                  </GridItem>
                </GridContainer>
                <NotificationContainer />
              </CardBody>
              <CardFooter className={classes.flex_end}>
                <Button variant="control" onClick={() => router.back()} mr="6">
                  {t('cancel')}
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()}>
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
