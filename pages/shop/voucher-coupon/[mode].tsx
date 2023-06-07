import React from 'react';
import { NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
import Admin from 'layouts/Admin.js';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
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
import { FormGroup } from 'components';

const formatDate = 'YYYY-MM-DDTHH:mm';

const initialValues = {
  id: '',
  name: '',
  code: '',
  startDate: dayjs().add(10, 'minutes').format(formatDate),
  endDate: dayjs().add(1, 'hours').add(10, 'minutes').format(formatDate),
  typeDiscount: EDiscountType.CASH,
  typeLimit: EDiscountLimitType.AMOUNT,
  discountLimit: '',
  minOrderPrice: '',
  quantityVoucher: '',
  minDiscount: '',
  maxDiscount: '',
  discountValue: '',
};

const AddUpdateVoucherCoupon = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRefBanner = React.useRef(null);

  const voucher =
    !_.isEmpty(router.query) && router.query.mode === 'update' ? router.query : undefined;

  const handleSubmitVoucher = React.useCallback(
    async (
      {
        id,
        name,
        code,
        startDate,
        endDate,
        quantityVoucher,
        minOrderPrice,
        typeDiscount,
        discountValue,
        typeLimit,
        discountLimit,
      },
      { setFieldError }
    ) => {
      try {
        dispatch(setShowLoader(true));
        if (voucher) {
          // const res = await requestCreateUpdateVoucher({
          //   id,
          //   name: name,
          //   registerStart: dayjs(registerStart).unix(),
          //   registerEnd: dayjs(registerEnd).unix(),
          //   programStart: dayjs(programStart).unix(),
          //   programEnd: dayjs(programEnd).unix(),
          //   maxShopRegister: typeShopLimit === EShopLimitType.SHOP_LIMIT ? maxShopRegister : 0,
          //   registerPrice: registerPrice,
          //   minOrderPrice: minOrderPrice,
          //   quantityVoucher,
          //   discountLimit,
          //   typeDiscount,
          //   discountValue,
          //   banner: _banner,
          //   description,
          //   typeLimit,
          // });
          // if (res.code === EAppKey.MSG_SUCCESS) {
          //   NotificationManager.success({
          //     title: t('success'),
          //     message: 'Update Voucher Success',
          //     //message: t('category_update_success'),
          //   });
          //   setTimeout(() => {
          //     router.push('/admin/voucher');
          //   }, 1000);
          // } else {
          //   NotificationManager.error({
          //     title: t('error'),
          //     message: res.message ? res.message.text : 'Error',
          //   });
          // }
        } else {
          // const res = await requestCreateUpdateVoucher({
          //   name: name,
          //   registerStart: dayjs(registerStart).unix(),
          //   registerEnd: dayjs(registerEnd).unix(),
          //   programStart: dayjs(programStart).unix(),
          //   programEnd: dayjs(programEnd).unix(),
          //   maxShopRegister: typeShopLimit === EShopLimitType.SHOP_LIMIT ? maxShopRegister : 0,
          //   registerPrice: registerPrice,
          //   minOrderPrice: minOrderPrice,
          //   quantityVoucher,
          //   discountLimit,
          //   typeDiscount,
          //   discountValue,
          //   banner: _banner,
          //   description,
          //   typeLimit,
          // });
          // if (res.code === EAppKey.MSG_SUCCESS) {
          //   NotificationManager.success({
          //     title: t('success'),
          //     message: 'Create Voucher Success',
          //   });
          //   setTimeout(() => {
          //     router.push('/admin/voucher');
          //   }, 1000);
          // } else {
          //   NotificationManager.error({
          //     title: t('error'),
          //     message: res.message ? res.message.text : 'Error',
          //   });
          // }
        }
      } finally {
        dispatch(setShowLoader(false));
      }
    },
    [voucher]
  );

  const addUpdateValidationSchema = yup.object().shape({
    name: yup.string().required(t('error_field_empty')),
    code: yup
      .string()
      .required(t('error_field_empty'))
      .matches(/^[A-Z0-9]{1,5}$/, t('error_code_format')),
    startDate: yup
      .date()
      .min(dayjs().toDate(), 'Please enter a start time that is later than the current time.'),
    endDate: yup
      .date()
      .min(
        yup.ref('registerStart'),
        'The end time must be greater than the start time by at least 1 hour.'
      ),
    discountLimit: yup.string().when('typeDiscount', {
      is: EDiscountType.PERCENT,
      then: yup.string().required(t('error_field_empty')),
    }),
    discountValue: yup
      .string()
      .when('typeDiscount', {
        is: EDiscountType.PERCENT,
        then: yup
          .string()
          .required(t('error_field_empty'))
          .matches(/^\d+(\.\d+)?$/, t('errorInvalid'))
          .test('maxPercent', t('errorPercentMax'), function (value) {
            return parseFloat(value) <= 100;
          }),
      })
      .when('typeDiscount', {
        is: EDiscountType.CASH,
        then: yup.string().required(t('error_field_empty')),
      }),
    minOrderPrice: yup.string().required(t('error_field_empty')),
    quantityVoucher: yup.string().required(t('error_field_empty')),
  });

  return (
    <Formik
      validateOnChange={false}
      validationSchema={addUpdateValidationSchema}
      enableReinitialize={true}
      initialValues={voucher ? voucher : initialValues}
      onSubmit={handleSubmitVoucher}>
      {({ handleChange, handleSubmit, setFieldValue, values, errors }) => {
        return (
          <Form>
            <Text textStyle="h6-sb" color="primary.100" mt="4">
              {voucher ? 'Update Voucher Coupon' : 'Create New Voucher Coupon'}
            </Text>
            <Box
              mt="4"
              bg="bg-1"
              shadow="md"
              py={{ base: '6', xl: '8' }}
              pl={{ base: '6', xl: '8' }}
              pr={{ base: '10', xl: '100px' }}>
              <Text textStyle="h5-sb" color="primary.100" mb="6">
                Basic information
              </Text>
              <FormGroup title="Promotion name">
                <FormControl isInvalid={!!errors.name}>
                  <Input
                    placeholder="Input"
                    autoComplete="off"
                    value={values.name}
                    onChange={handleChange('name')}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title="Voucher code" mt="6">
                <FormControl isInvalid={!!errors.code}>
                  <Input
                    placeholder="Input"
                    autoComplete="off"
                    value={values.code}
                    onChange={handleChange('code')}
                  />
                  <FormErrorMessage>{errors.code}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title="Usage time" mt="6">
                <SimpleGrid columns={{ base: 1, xl: 2 }} gap="5" pr={{ base: 'unset', xl: '20%' }}>
                  <FormControl isInvalid={!!errors.startDate}>
                    <Input
                      type="datetime-local"
                      placeholder="Select Date and Time"
                      value={values.startDate}
                      onChange={handleChange('startDate')}
                      min={dayjs().format(formatDate)}
                    />
                    <FormErrorMessage>{errors.startDate}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.endDate}>
                    <Input
                      type="datetime-local"
                      placeholder="Select Date and Time"
                      value={values.endDate}
                      onChange={handleChange('endDate')}
                      min={dayjs().format(formatDate)}
                      max={dayjs().add(4, 'months').format(formatDate)}
                    />
                    <FormErrorMessage>{errors.endDate}</FormErrorMessage>
                  </FormControl>
                </SimpleGrid>
              </FormGroup>
              <Text textStyle="h5-sb" color="primary.100" mt="6">
                {t('voucher.setUpVoucher')}
              </Text>
              <FormGroup title="Discount Type | Amount" mt="6">
                <Grid templateColumns="repeat(10,1fr)" gap="5">
                  <GridItem colSpan={3}>
                    <Select
                      defaultValue={EDiscountType.CASH}
                      value={values.typeDiscount}
                      onChange={handleChange('typeDiscount')}>
                      <option value={EDiscountType.CASH}>Fix Amount</option>
                      <option value={EDiscountType.PERCENT}>By Percentage</option>
                    </Select>
                  </GridItem>
                  <GridItem colSpan={7}>
                    <InputGroup>
                      <FormControl isInvalid={!!errors.discountValue}>
                        <Input
                          placeholder="Input"
                          autoComplete="off"
                          value={values.discountValue}
                          type="number"
                          onChange={handleChange('discountValue')}
                        />
                        <FormErrorMessage>{errors.discountValue}</FormErrorMessage>
                      </FormControl>
                      <InputRightElement pointerEvents="none" w="100px" borderLeftWidth="1px">
                        <Center h="full">
                          <Text textStyle="h4">
                            {values.typeDiscount === EDiscountType.CASH ? 'HTG' : '%'}
                          </Text>
                        </Center>
                      </InputRightElement>
                    </InputGroup>
                  </GridItem>
                </Grid>
              </FormGroup>
              {values.typeDiscount === EDiscountType.PERCENT && (
                <FormGroup title="Maximum Discount Price" mt="6">
                  <RadioGroup
                    value={values.typeLimit}
                    onChange={handleChange('typeLimit')}
                    size="lg"
                    pr="20%">
                    <HStack spacing={5} direction="row">
                      <Radio value={EDiscountLimitType.AMOUNT} flex="1">
                        Limited
                      </Radio>
                      <Radio value={EDiscountLimitType.NO_LIMIT} flex="1">
                        No Limited
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormGroup>
              )}
              {values.typeDiscount === EDiscountType.PERCENT &&
                values.typeLimit === EDiscountLimitType.AMOUNT && (
                  <FormGroup mt="6">
                    <FormControl isInvalid={!!errors.discountLimit}>
                      <InputGroup>
                        <Input
                          placeholder="Input"
                          autoComplete="off"
                          value={values.discountLimit}
                          type="number"
                          onChange={handleChange('discountLimit')}
                        />
                        <InputRightElement w="100px" borderLeftWidth="1px">
                          <Center h="full">
                            <Text textStyle="h4">HTG</Text>
                          </Center>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.discountLimit}</FormErrorMessage>
                    </FormControl>
                  </FormGroup>
                )}
              <FormGroup title="Minimum Basket Price" mt="6">
                <FormControl isInvalid={!!errors.minOrderPrice}>
                  <InputGroup>
                    <Input
                      placeholder="Input"
                      autoComplete="off"
                      value={values.minOrderPrice}
                      type="number"
                      onChange={handleChange('minOrderPrice')}
                    />
                    <InputRightElement w="100px" borderLeftWidth="1px">
                      <Center h="full">
                        <Text textStyle="h4">HTG</Text>
                      </Center>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.minOrderPrice}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title="Usage Quantity" mt="6">
                <FormControl isInvalid={!!errors.quantityVoucher}>
                  <Input
                    placeholder="Input"
                    autoComplete="off"
                    value={values.quantityVoucher}
                    type="number"
                    onChange={handleChange('quantityVoucher')}
                  />
                  <FormErrorMessage>{errors.quantityVoucher}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <HStack justifyContent="flex-end" gap="6" mt="6">
                <Button variant="control" onClick={() => router.back()} w="150px">
                  {t('cancel')}
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()} w="150px">
                  {t('confirm')}
                </Button>
              </HStack>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

AddUpdateVoucherCoupon.layout = Admin;

export default WithAuthentication(AddUpdateVoucherCoupon);
