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
  const inputRefBanner = React.useRef(null);

  const voucher =
    !_.isEmpty(router.query) && router.query.mode === 'update' ? router.query : undefined;

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
        'The end time must be greater than the start time by at least 1 hour.'
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
            setFieldValue(
              'registerStart',
              dayjs(parseFloat(voucher.registerStart)).format(formatDate)
            );
            setFieldValue('registerEnd', dayjs(parseFloat(voucher.registerEnd)).format(formatDate));
            setFieldValue(
              'programStart',
              dayjs(parseFloat(voucher.programStart)).format(formatDate)
            );
            setFieldValue('programEnd', dayjs(parseFloat(voucher.programEnd)).format(formatDate));
            if (voucher.maxShopRegister === 0) {
              setFieldValue('typeShopLimit', EShopLimitType.NO_LIMIT);
            } else {
              setFieldValue('typeShopLimit', EShopLimitType.SHOP_LIMIT);
            }
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
            <Text textStyle="h6-sb" color="text-basic" mt="4">
              {voucher ? 'Update Voucher Program' : 'Create New Voucher Program'}
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
              <FormGroup title="Registration time" mt="6">
                <SimpleGrid columns={{ base: 1, xl: 2 }} gap="5" pr={{ base: 'unset', xl: '20%' }}>
                  <FormControl isInvalid={!!errors.registerStart}>
                    <Input
                      type="datetime-local"
                      placeholder="Select Date and Time"
                      value={values.registerStart}
                      onChange={handleChange('registerStart')}
                      min={dayjs().format(formatDate)}
                    />
                    <FormErrorMessage>{errors.registerStart}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.registerEnd}>
                    <Input
                      type="datetime-local"
                      placeholder="Select Date and Time"
                      value={values.registerEnd}
                      onChange={handleChange('registerEnd')}
                      min={dayjs().format(formatDate)}
                      max={dayjs().add(4, 'months').format(formatDate)}
                    />
                    <FormErrorMessage>{errors.registerEnd}</FormErrorMessage>
                  </FormControl>
                </SimpleGrid>
              </FormGroup>
              <FormGroup title="Program time" mt="6">
                <SimpleGrid columns={{ base: 1, xl: 2 }} gap="5" pr={{ base: 'unset', xl: '20%' }}>
                  <FormControl isInvalid={!!errors.programStart}>
                    <Input
                      type="datetime-local"
                      placeholder="Select Date and Time"
                      value={values.programStart}
                      onChange={handleChange('programStart')}
                      min={dayjs().format(formatDate)}
                    />
                    <FormErrorMessage>{errors.programStart}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.programEnd}>
                    <Input
                      type="datetime-local"
                      placeholder="Select Date and Time"
                      value={values.programEnd}
                      onChange={handleChange('programEnd')}
                      min={dayjs().format(formatDate)}
                      max={dayjs().add(4, 'months').format(formatDate)}
                    />
                    <FormErrorMessage>{errors.programEnd}</FormErrorMessage>
                  </FormControl>
                </SimpleGrid>
              </FormGroup>
              <FormGroup title="Registration price" mt="6">
                <FormControl isInvalid={!!errors.registerPrice}>
                  <InputGroup>
                    <Input
                      placeholder="Input"
                      autoComplete="off"
                      value={values.registerPrice}
                      onChange={handleChange('registerPrice')}
                    />
                    <InputRightElement w="100px" borderLeftWidth="1px">
                      <Center h="full">
                        <Text textStyle="h4">HTG</Text>
                      </Center>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.registerPrice}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title="Maximum registration shop" mt="6">
                <RadioGroup
                  defaultValue={EShopLimitType.SHOP_LIMIT}
                  value={values.typeShopLimit}
                  onChange={handleChange('typeShopLimit')}
                  size="lg"
                  pr="20%">
                  <Stack spacing={5} direction="row">
                    <Radio value={EShopLimitType.SHOP_LIMIT} flex="1">
                      Limited
                    </Radio>
                    <Radio value={EShopLimitType.NO_LIMIT} flex="1">
                      No Limited
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormGroup>
              {values.typeShopLimit === EShopLimitType.SHOP_LIMIT && (
                <FormGroup mt="6">
                  <FormControl isInvalid={!!errors.maxShopRegister}>
                    <Input
                      placeholder="Input"
                      autoComplete="off"
                      value={values.maxShopRegister}
                      type="number"
                      onChange={handleChange('maxShopRegister')}
                    />
                    <FormErrorMessage>{errors.maxShopRegister}</FormErrorMessage>
                  </FormControl>
                </FormGroup>
              )}
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
              <FormGroup title="Banner voucher" mt="6">
                <Box maxW={{ base: 'unset', '2xl': '60%' }}>
                  <Box
                    zIndex={1}
                    position="relative"
                    onClick={() => inputRefBanner.current.click()}>
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      cursor="pointer"
                      zIndex={1}
                      h="140px"
                      borderWidth="1px"
                      borderRadius="4px"
                      overflow="hidden"
                      borderColor={values.banner ? 'transparent' : 'border-5'}
                      _hover={{ borderColor: 'border-3' }}
                      position="relative">
                      {values.banner ? (
                        <img
                          src={values.banner}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <Flex flexDirection="column" alignItems="center" justifyContent="center">
                          <Icon as={IoIosCloudUpload} width="32px" height="32px" color="gray.100" />
                          <Text mt="1">Upload an image of banner voucher</Text>
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
                </Box>
              </FormGroup>
              <FormGroup title="Program details" mt="6">
                <Textarea
                  rows={6}
                  placeholder="Description"
                  autoComplete="off"
                  value={values.description}
                  onChange={handleChange('description')}
                />
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
}

AddVoucherPage.layout = Admin;

export default WithAuthentication(AddVoucherPage);
