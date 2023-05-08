import React from 'react';
import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
import Admin from 'layouts/Admin';
import Card from 'components/Card/Card.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  TextField,
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';

import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useDisplayImage, useWindowDimensions } from 'hooks';
import _, { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { Close } from '@material-ui/icons';
import { setShowLoader } from 'redux/actions/app';
import { BASE_API_URL } from 'utilities/const';
import styles from 'assets/jss/natcash/views/shoplist/addShopStyle.js';
import { Box, Flex, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import SelectProduct from './components/SelectProduct';
import tableStyles from 'assets/jss/natcash/components/tableStyle.js';
import { Pagination } from '@material-ui/lab';

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
function CreateProduct() {
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useTableStyles = makeStyles(tableStyles);
  const tableClasses = useTableStyles();
  const { t } = useTranslation();
  const { height } = useWindowDimensions();

  const inputRef = React.useRef(null);
  const inputRef1 = React.useRef(null);

  const router = useRouter();

  const shop = !isEmpty(router.query) ? router.query : undefined;

  const [selectedIndex, setSelectedIndex] = React.useState(0);
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
        router.push('/admin/shopProduct');
      } finally {
        dispatch(setShowLoader(false));
      }
    },
    [shop]
  );

  //Todo Validation Schema
  const addUpdateShopValidationSchema = yup.object().shape({
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
      //validationSchema={addUpdateShopValidationSchema}
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

        const { onUploader: onUploader } = useDisplayImage((image) => {
          try {
            if (image && !values.images.includes(image)) {
              setFieldValue('images', [...values.images, image]);
            }
            if (inputRef && inputRef.current) {
              inputRef.current.value = '';
            }
          } catch (error) {
            console.log('error upload image', error);
          }
        });

        const { onUploader: onUploader1 } = useDisplayImage((video) => {
          try {
            if (video) {
              setFieldValue('video', video);
            }
            if (inputRef1 && inputRef1.current) {
              inputRef1.current.value = '';
            }
          } catch (error) {
            console.log('error upload video', error);
          }
        });

        const TABLE_HEAD = [
          t('product'),
          t('industry'),
          t('unit'),
          t('price'),
          t('origin'),
          t('brand'),
        ];

        // const data = [
        //   {
        //     product: {
        //       image: values.images[0],
        //       name: values.name,
        //       code: values.code,
        //     },
        //     industry: values.industry,
        //     unit: values.unit,
        //     price: values.price,
        //     origin: values.origin,
        //     trademark: values.trademark,
        //   },
        // ];

        const data = [
          {
            product: {
              image: values.images[0],
              name: 'Nước rửa bình sữa dnee 600ml',
              code: 'TP-6110',
            },
            industry: 'Đồ gia dụng',
            unit: 'Hộp',
            price: 130000,
            origin: 'Việt Nam',
            trademark: {
              id: 0,
              name: 'Vinamilk',
            },
          },
        ];

        const renderItem = (item, index) => {
          const { product, industry, unit, price, origin, trademark } = item;

          return (
            <TableRow
              key={index}
              className={tableClasses.tableBodyRow}
              style={{ backgroundColor: '#fff' }}>
              <TableCell className={tableClasses.tableCell} key="name">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <img style={{ width: 85, height: 62, marginRight: 12 }} src={product.image} />
                  <div>
                    <p>{product.name}</p>
                    <p style={{ marginTop: 6, color: '#BABABA' }}>{product.code}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className={tableClasses.tableCell} key="industry">
                <div className={classes.proInfoContainer}>
                  <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{industry}</p>
                </div>
              </TableCell>
              <TableCell className={tableClasses.tableCell} key="unit">
                <div className={classes.proInfoContainer}>
                  <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{unit}</p>
                </div>
              </TableCell>
              <TableCell className={tableClasses.tableCell} key="price">
                <div className={classes.proInfoContainer}>
                  <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{price}</p>
                </div>
              </TableCell>
              <TableCell className={tableClasses.tableCell} key="origin">
                <div className={classes.proInfoContainer}>
                  <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>{origin}</p>
                </div>
              </TableCell>
              <TableCell className={tableClasses.tableCell} key="trademark">
                <div className={classes.proInfoContainer}>
                  <p className={tableClasses.tableCell + ' ' + classes.txtOrderInfo}>
                    {trademark.name}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          );
        };

        return (
          <Form style={{ height: height - 150 + 'px', overflowY: 'auto' }}>
            <Card>
              <Flex
                mt={{ base: '16', md: '4' }}
                flexDirection={{ base: 'column', lg: 'row' }}
                alignItems={{ base: 'flex-start', lg: 'center' }}
                mx="4"
                bgGradient="linear(to-l, primary.100, primary.200)"
                p="4"
                transform="auto"
                borderRadius="2px"
                translateY="-50%">
                <Text textStyle="h3-t" color="text-white" mr="4">
                  {t('shopUser.create_new_product')}
                </Text>
                <Flex
                  mt={{ base: '2', md: '0' }}
                  flex={1}
                  display="flex"
                  justifyContent="space-around"
                  alignItems={{ base: 'flex-start', md: 'center' }}>
                  <Stack
                    flexDirection={{ base: 'column', md: 'row' }}
                    gap={{ base: '2', md: '6', xl: '100px' }}>
                    {['Thông tin chung', 'Thêm ảnh sản phẩm', 'Xác nhận'].map((item, index) => {
                      return (
                        <Flex alignItems="center" key={index}>
                          <Flex
                            mr="4"
                            w={{ base: '6', md: '41px' }}
                            h={{ base: '6', md: '41px' }}
                            borderRadius="full"
                            bg={index < selectedIndex ? 'white' : 'primary.100'}
                            justifyContent="center"
                            alignItems="center"
                            borderWidth={{ base: '2px', md: '4px' }}
                            borderColor={index < selectedIndex ? 'white' : 'gray.1300'}>
                            <Text
                              textStyle={{ base: 'h4', md: 'h6' }}
                              color={index < selectedIndex ? '#FF9A32' : 'gray.1300'}>
                              {index + 1}
                            </Text>
                          </Flex>
                          <Text textStyle={{ base: 'h2', md: 'h3' }} color="text-white">
                            {item}
                          </Text>
                        </Flex>
                      );
                    })}
                  </Stack>
                </Flex>
              </Flex>
              <Box p="4" mt={{ base: -'16', md: -'4' }}>
                {selectedIndex === 0 ? (
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
                      {/* <div className={classes.imageView} onClick={() => refInput.current.click()}>
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
                    </div> */}
                      {/* {selectedImages.length > 0 &&
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
                      })} */}
                    </GridItem>
                  </GridContainer>
                ) : selectedIndex === 1 ? (
                  <Box>
                    <Text textStyle="h3-t" color="text-basic">
                      Product Images
                    </Text>
                    <SimpleGrid
                      mt="5"
                      columns={{ base: 1, sm: 2, md: 3, xl: 5, '2xl': 6 }}
                      spacing={10}>
                      {Array(6)
                        .fill(6)
                        .map((item, index) => {
                          return (
                            <SelectProduct
                              key={index}
                              ref={inputRef}
                              title={`Image ${index + 1}`}
                              //@ts-ignore
                              image={values.images[index]}
                              inputProps={{ onChange: onUploader }}
                              removeImage={() => {
                                const newImages = values.images.filter((_, idx) => idx !== index);
                                setFieldValue('images', newImages);
                              }}
                            />
                          );
                        })}
                    </SimpleGrid>
                    <Text mt="8" textStyle="h3-t" color="text-basic">
                      Video Product
                    </Text>
                    <SimpleGrid
                      mt="5"
                      columns={{ base: 1, sm: 2, md: 3, xl: 5, '2xl': 6 }}
                      spacing={10}>
                      <SelectProduct
                        title={'Cover photo video'}
                        ref={inputRef1}
                        inputProps={{ onChange: onUploader1 }}
                      />
                    </SimpleGrid>
                  </Box>
                ) : (
                  <CardFooter>
                    <div
                      className={tableClasses.tableResponsive}
                      style={{ marginTop: '0', marginLeft: '20px' }}>
                      <Table className={tableClasses.table}>
                        {data && data.length > 0 && (
                          <TableHead className={tableClasses['primary' + 'TableHeader']}>
                            <TableRow className={tableClasses.tableHeadRow}>
                              {TABLE_HEAD.map((prop, key) => {
                                return (
                                  <TableCell
                                    className={
                                      tableClasses.tableCell + ' ' + tableClasses.tableHeadCell
                                    }
                                    style={{ textAlign: 'left' }}
                                    key={key}>
                                    {prop}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          </TableHead>
                        )}
                        <TableBody>
                          {data &&
                            data.length > 0 &&
                            data.map((item, index) => {
                              return renderItem(item, index);
                            })}
                        </TableBody>
                      </Table>
                    </div>
                  </CardFooter>
                )}
              </Box>
              <CardFooter style={{ display: 'flex', with: '100%', justifyContent: 'center' }}>
                <div className={classes.buttonCancel}>
                  <Button
                    color="gray"
                    onClick={() => {
                      if (selectedIndex === 0) {
                        router.back();
                      } else {
                        setSelectedIndex(selectedIndex - 1);
                      }
                    }}>
                    {selectedIndex === 0 ? t('cancel') : 'Back'}
                  </Button>
                </div>
                <Button
                  color="primary"
                  onClick={() => {
                    if (selectedIndex === 2) {
                      handleSubmit();
                    } else {
                      setSelectedIndex(selectedIndex + 1);
                    }
                  }}>
                  {selectedIndex === 2 ? t('confirm') : 'Next'}
                </Button>
              </CardFooter>
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
}

CreateProduct.layout = Admin;

export default WithAuthentication(CreateProduct);
