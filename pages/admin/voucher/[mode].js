import React from 'react';
import { NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
import Admin from 'layouts/Admin.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import {
  MenuItem,
  FormControl,
  Select,
  makeStyles,
  withStyles,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import FormGroupCustom from 'components/FormCustom/FormGroupCustom.js';
import FormCellCustom from 'components/FormCustom/FormCellCustom.js';
import { useRouter } from 'next/router';
import styles from 'assets/jss/natcash/views/voucher/addVoucherStyle.js';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { useDisplayImage } from 'hooks';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { setShowLoader } from 'redux/actions/app';
import _ from 'lodash';
import { BASE_API_URL } from 'utilities/const';
import { requestCreateUpdateVoucher } from 'utilities/ApiManage';
import { EDiscountType, EDiscountLimitType, EShopLimitType, EAppKey } from 'constants/types';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IoIosCloudUpload } from 'react-icons/io';

const formatDate = 'YYYY-MM-DDTHH:mm';

const initialValues = {
  id: '',
  name: '',
  registerStart: dayjs().add(10, 'minutes').format(formatDate),
  registerEnd: dayjs().add(1, 'hours').add(10, 'minutes').format(formatDate),
  programStart: dayjs().add(10, 'minutes').format(formatDate),
  programEnd: dayjs().add(1, 'hours').add(10, 'minutes').format(formatDate),
  voucherSaveStart: dayjs().add(10, 'minutes').format(formatDate),
  voucherSaveEnd: dayjs().add(1, 'hours').add(10, 'minutes').format(formatDate),
  maxShopRegister: '',
  quantityVoucher: '',
  registerPrice: '',
  minOrderPrice: '',
  maxOrderPrice: '',
  minDiscount: '',
  maxDiscount: '',
  typeDiscount: EDiscountType.CASH,
  discountValue: '',
  banner: '',
  description: '',
  typeLimit: EDiscountLimitType.AMOUNT,
  discountLimit: '',
  typeShopLimit: EShopLimitType.SHOP_LIMIT,
};

function AddVoucherPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const inputRefBanner = React.useRef(null);

  const voucher =
    !_.isEmpty(router.query) && router.query.mode === 'update' ? router.query : undefined;

  const CustomRadio = withStyles({
    root: {
      color: 'gray',
      '&$checked': {
        color: '#f96606',
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  const handleSubmitVoucher = React.useCallback(
    async (
      {
        id,
        name,
        registerStart,
        registerEnd,
        programStart,
        programEnd,
        maxShopRegister,
        quantityVoucher,
        registerPrice,
        minOrderPrice,
        typeDiscount,
        discountValue,
        banner,
        description,
        typeLimit,
        discountLimit,
        typeShopLimit,
      },
      { setFieldError }
    ) => {
      try {
        dispatch(setShowLoader(true));
        let _banner = null;

        if (banner) {
          _banner = banner.replace(/^data:image\/(png|jpg);base64,/, '');
        }
        if (voucher) {
          const res = await requestCreateUpdateVoucher({
            id,
            name: name,
            registerStart: dayjs(registerStart).unix(),
            registerEnd: dayjs(registerEnd).unix(),
            programStart: dayjs(programStart).unix(),
            programEnd: dayjs(programEnd).unix(),
            maxShopRegister: typeShopLimit === EShopLimitType.SHOP_LIMIT ? maxShopRegister : 0,
            registerPrice: registerPrice,
            minOrderPrice: minOrderPrice,
            quantityVoucher,
            discountLimit,
            typeDiscount,
            discountValue,
            banner: _banner,
            description,
            typeLimit,
          });
          if (res.code === EAppKey.MSG_SUCCESS) {
            NotificationManager.success({
              title: t('success'),
              message: 'Update Voucher Success',
              //message: t('category_update_success'),
            });
            setTimeout(() => {
              router.push('/admin/voucher');
            }, 1000);
          } else {
            NotificationManager.error({
              title: t('error'),
              message: res.message ? res.message.text : 'Error',
            });
          }
        } else {
          const res = await requestCreateUpdateVoucher({
            name: name,
            registerStart: dayjs(registerStart).unix(),
            registerEnd: dayjs(registerEnd).unix(),
            programStart: dayjs(programStart).unix(),
            programEnd: dayjs(programEnd).unix(),
            maxShopRegister: typeShopLimit === EShopLimitType.SHOP_LIMIT ? maxShopRegister : 0,
            registerPrice: registerPrice,
            minOrderPrice: minOrderPrice,
            quantityVoucher,
            discountLimit,
            typeDiscount,
            discountValue,
            banner: _banner,
            description,
            typeLimit,
          });
          if (res.code === EAppKey.MSG_SUCCESS) {
            NotificationManager.success({
              title: t('success'),
              message: 'Create Voucher Success',
            });
            setTimeout(() => {
              router.push('/admin/voucher');
            }, 1000);
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
    [voucher]
  );

  const addUpdateVoucherValidationSchema = yup.object().shape({
    name: yup.string().required(t('error_field_empty')),
    registerPrice: yup
      .string()
      .required(t('error_field_empty'))
      .matches(/^[0-9()\s]*$/, t('errorInvalidPhone')),
    registerStart: yup
      .date()
      .min(dayjs().toDate(), 'Please enter a start time that is later than the current time.'),
    registerEnd: yup
      .date()
      .min(
        yup.ref('registerStart'),
        'Please enter a start time that is later than the register start time.'
      ),
    programStart: yup
      .date()
      .min(dayjs().toDate(), 'Please enter a start time that is later than the current time.'),
    programEnd: yup
      .date()
      .min(
        yup.ref('programStart'),
        'Please enter a start time that is later than the current time.'
      ),
    maxShopRegister: yup.string().when('typeShopLimit', {
      is: EShopLimitType.SHOP_LIMIT,
      then: yup.string().required(t('error_field_empty')),
    }),
    discountLimit: yup.string().when('typeDiscount', {
      is: EDiscountType.PERCENT,
      then: yup.string().required(t('error_field_empty')),
    }),
    discountValue: yup.string().required(t('error_field_empty')),
    minOrderPrice: yup.string().required(t('error_field_empty')),
    quantityVoucher: yup.string().required(t('error_field_empty')),
  });

  return (
    <Formik
      validateOnChange={false}
      validationSchema={addUpdateVoucherValidationSchema}
      enableReinitialize={true}
      initialValues={voucher ? voucher : initialValues}
      onSubmit={handleSubmitVoucher}>
      {({ handleChange, handleSubmit, setFieldValue, values, errors }) => {
        React.useEffect(() => {
          if (voucher && voucher.banner) {
            const str = BASE_API_URL + '/assets/' + voucher.banner;

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

              setFieldValue('banner', dataURL);
            };
          }
          if (voucher) {
            console.log('quang debug ===>', voucher.registerStart);
            setFieldValue('registerStart', dayjs(voucher.registerStart).format(formatDate));
            setFieldValue('registerEnd', dayjs(voucher.registerEnd).format(formatDate));
            setFieldValue('programStart', dayjs(voucher.programStart).format(formatDate));
            setFieldValue('programEnd', dayjs(voucher.programEnd).format(formatDate));
          }
        }, [voucher]);

        const { onUploader: onUploaderBanner } = useDisplayImage((image) => {
          try {
            if (image) {
              setFieldValue('banner', image);
            }
            if (inputRefBanner && inputRefBanner.current) {
              inputRefBanner.current.value = '';
            }
          } catch (error) {
            console.log('error upload banner', error);
          }
        });

        return (
          <Form>
            <Card>
              <CardHeader color="primary">
                <Text textStyle="h5" color="white">
                  {voucher ? 'Update Voucher Program' : 'Create New Voucher Program'}
                </Text>
              </CardHeader>
              <CardBody className={classes.cardBody}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormGroupCustom title="Information">
                      <FormCellCustom label={t('voucher.promotionName')} flexStart>
                        <TextField
                          id="input1"
                          label={''}
                          variant="outlined"
                          size="small"
                          fullWidth
                          inputProps={{
                            value: values.name,
                            onChange: handleChange('name'),
                          }}
                          placeholder="Input"
                          autoComplete="off"
                          error={!!errors.name}
                          helperText={!!errors.name ? errors.name : ''}
                        />
                      </FormCellCustom>
                      <FormCellCustom label="Registration time" flexStart>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              id="datetime-local"
                              type="datetime-local"
                              value={values.registerStart}
                              onChange={handleChange('registerStart')}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              fullWidth
                              inputProps={{
                                min: dayjs().format(formatDate),
                                max: dayjs(values.registerEnd).format(formatDate),
                              }}
                              error={!!errors.registerStart}
                              helperText={!!errors.registerStart ? errors.registerStart : ''}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              id="datetime-local"
                              type="datetime-local"
                              value={values.registerEnd}
                              onChange={handleChange('registerEnd')}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              fullWidth
                              inputProps={{
                                min: dayjs(values.registerStart).add(1, 'hours').format(formatDate),
                                max: dayjs().add(4, 'months').format(formatDate),
                              }}
                              error={!!errors.registerEnd}
                              helperText={!!errors.registerEnd && errors.registerEnd}
                            />
                          </GridItem>
                        </GridContainer>
                      </FormCellCustom>
                      <FormCellCustom flexStart label="Program time">
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              id="datetime-local"
                              type="datetime-local"
                              value={values.programStart}
                              onChange={handleChange('programStart')}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              fullWidth
                              inputProps={{
                                min: dayjs().format(formatDate),
                                max: dayjs(values.programEnd).format(formatDate),
                              }}
                              error={!!errors.programStart}
                              helperText={!!errors.programStart && errors.programStart}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              id="datetime-local"
                              type="datetime-local"
                              value={values.programEnd}
                              onChange={handleChange('programEnd')}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              fullWidth
                              inputProps={{
                                min: dayjs(values.programStart).format(formatDate),
                                max: dayjs().add(4, 'months').format(formatDate),
                              }}
                              error={!!errors.programEnd}
                              helperText={!!errors.programEnd && errors.programEnd}
                            />
                          </GridItem>
                        </GridContainer>
                      </FormCellCustom>
                      <FormCellCustom label="Registration price" flexStart>
                        <TextField
                          id="register-price"
                          label=""
                          variant="outlined"
                          size="small"
                          type="number"
                          inputProps={{
                            value: values.registerPrice,
                            onChange: handleChange('registerPrice'),
                          }}
                          fullWidth
                          placeholder="Input"
                          autoComplete="off"
                          error={!!errors.registerPrice}
                          helperText={!!errors.registerPrice && errors.registerPrice}
                        />
                      </FormCellCustom>
                      <FormCellCustom label="Maximum registration shop" flexStart>
                        <div className={classes.formCell}>
                          <FormControl component="fieldset">
                            <RadioGroup
                              aria-label="shop"
                              name="shop1"
                              value={values.typeShopLimit}
                              onChange={handleChange('typeShopLimit')}
                              className={classes.flex_center}>
                              <FormControlLabel
                                value={EShopLimitType.SHOP_LIMIT}
                                control={<CustomRadio />}
                                label="Set Shop"
                                style={{ color: '#000000' }}
                              />
                              <FormControlLabel
                                value={EShopLimitType.NO_LIMIT}
                                control={<CustomRadio />}
                                label="No Limit"
                                style={{ color: '#000000' }}
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </FormCellCustom>
                      {values.typeShopLimit === EShopLimitType.SHOP_LIMIT && (
                        <FormCellCustom flexStart>
                          <TextField
                            id="max-shop-register"
                            label=""
                            variant="outlined"
                            size="small"
                            inputProps={{
                              value: values.maxShopRegister,
                              onChange: handleChange('maxShopRegister'),
                            }}
                            type="number"
                            fullWidth
                            placeholder="Input"
                            autoComplete="off"
                            error={!!errors.maxShopRegister}
                            helperText={!!errors.maxShopRegister && errors.maxShopRegister}
                          />
                        </FormCellCustom>
                      )}
                      <FormCellCustom label="Program details" flexStart>
                        <TextField
                          multiline
                          minRows={12}
                          variant="outlined"
                          size="medium"
                          fullWidth
                          inputProps={{
                            value: values.description,
                            onChange: handleChange('description'),
                          }}
                          autoComplete="off"
                        />
                      </FormCellCustom>
                    </FormGroupCustom>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormGroupCustom title={t('voucher.setUpVoucher')}>
                      <FormCellCustom label="Discount Type | Amount" flexStart>
                        <Flex>
                          <FormControl variant="outlined" size="small">
                            <Select
                              id="select-outlined"
                              value={values.typeDiscount}
                              onChange={handleChange('typeDiscount')}>
                              <MenuItem value={EDiscountType.CASH}>Fix Amount</MenuItem>
                              <MenuItem value={EDiscountType.PERCENT}>By Percentage</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl
                            variant="outlined"
                            size="small"
                            style={{ flex: 1, marginLeft: 16 }}>
                            <TextField
                              variant="outlined"
                              size="small"
                              type="number"
                              fullWidth
                              value={values.discountValue}
                              onChange={handleChange('discountValue')}
                              autoComplete="off"
                              placeholder="Input"
                              error={!!errors.discountValue}
                              helperText={!!errors.discountValue && errors.discountValue}
                            />
                          </FormControl>
                        </Flex>
                      </FormCellCustom>
                      {values.typeDiscount === EDiscountType.PERCENT && (
                        <FormCellCustom label="Maximum Discount Price" flexStart>
                          <div className={classes.formCell}>
                            <FormControl component="fieldset">
                              <RadioGroup
                                value={values.typeLimit}
                                onChange={handleChange('typeLimit')}
                                className={classes.flex_center}>
                                <FormControlLabel
                                  value={EDiscountLimitType.AMOUNT}
                                  control={<CustomRadio />}
                                  label="Set Amount"
                                  style={{ color: '#000000' }}
                                />
                                <FormControlLabel
                                  value={EDiscountLimitType.NO_LIMIT}
                                  control={<CustomRadio />}
                                  label="No Limit"
                                  style={{ color: '#000000' }}
                                />
                              </RadioGroup>
                            </FormControl>
                          </div>
                        </FormCellCustom>
                      )}
                      {values.typeDiscount === EDiscountType.PERCENT &&
                        values.typeLimit === EDiscountLimitType.AMOUNT && (
                          <FormCellCustom flexStart>
                            <TextField
                              variant="outlined"
                              size="small"
                              fullWidth
                              value={values.discountLimit}
                              onChange={handleChange('discountLimit')}
                              type="number"
                              autoComplete="off"
                              style={{ flex: 1 }}
                              placeholder="Input"
                              error={!!errors.discountLimit}
                              helperText={!!errors.discountLimit && errors.discountLimit}
                            />
                          </FormCellCustom>
                        )}
                      <FormCellCustom label="Minimum Basket Price" flexStart>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={values.minOrderPrice}
                          onChange={handleChange('minOrderPrice')}
                          type="number"
                          autoComplete="off"
                          placeholder="Input"
                          error={!!errors.minOrderPrice}
                          helperText={!!errors.minOrderPrice && errors.minOrderPrice}
                        />
                      </FormCellCustom>
                      <FormCellCustom label="Usage Quantity" flexStart>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          inputProps={{
                            value: values.quantityVoucher,
                            onChange: handleChange('quantityVoucher'),
                          }}
                          placeholder="Input"
                          autoComplete="off"
                          type="number"
                          error={!!errors.quantityVoucher}
                          helperText={!!errors.quantityVoucher && errors.quantityVoucher}
                        />
                      </FormCellCustom>
                      <FormCellCustom flexStart label="Banner voucher" mt={46}>
                        <Box
                          zIndex={1}
                          position="relative"
                          onClick={() => inputRefBanner.current.click()}>
                          <Flex
                            justifyContent="center"
                            alignItems="center"
                            cursor="pointer"
                            zIndex={1}
                            h="210px"
                            borderWidth="1px"
                            borderRadius="4px"
                            overflow="hidden"
                            borderColor={values.banner ? 'transparent' : 'gray.400'}
                            position="relative">
                            {values.banner ? (
                              <img
                                src={values.banner}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            ) : (
                              <Flex
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center">
                                <Icon
                                  as={IoIosCloudUpload}
                                  width="32px"
                                  height="32px"
                                  color="gray.100"
                                />
                                <Text mt="1">Upload a File</Text>
                              </Flex>
                            )}
                            {values.banner && (
                              <Icon
                                cursor="pointer"
                                as={AiOutlineCloseCircle}
                                width="24px"
                                height="24px"
                                color="blue.200"
                                position="absolute"
                                right="4px"
                                top="4px"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFieldValue('banner', '');
                                }}
                              />
                            )}
                          </Flex>
                          <input
                            ref={inputRefBanner}
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            multiple
                            style={{ display: 'none', cursor: 'pointer' }}
                            onChange={onUploaderBanner}
                          />
                        </Box>
                      </FormCellCustom>
                    </FormGroupCustom>
                  </GridItem>
                </GridContainer>
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

AddVoucherPage.layout = Admin;

export default WithAuthentication(AddVoucherPage);
