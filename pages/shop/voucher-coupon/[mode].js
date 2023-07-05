import React from 'react';
import { NotificationManager } from 'react-light-notifications';
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
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
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
import { EDiscountType, EDiscountLimitType, EAppKey, EVoucherType } from 'constants/types';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IoIosCloudUpload } from 'react-icons/io';
import { FormGroup } from 'components';
import { requestCreateUpdateVoucherShop } from 'utilities/ApiShop';
import { parseNumber } from 'utilities/parseNumber';

const formatDate = 'YYYY-MM-DDTHH:mm';

const initialValues = {
  id: '',
  name: '',
  voucherCode: '',
  startDate: dayjs().add(10, 'minutes').format(formatDate),
  endDate: dayjs().add(1, 'hours').add(10, 'minutes').format(formatDate),
  typeDiscount: EDiscountType.CASH,
  typeLimit: EDiscountLimitType.AMOUNT,
  maxDiscount: '',
  minOrderValue: '',
  quantityVoucher: '',
  minDiscount: '',
  discountValue: '',
};

const AddUpdateVoucherCoupon = () => {
  const shopId = 143;
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRefBanner = React.useRef(null);

  const voucher =
    !_.isEmpty(router.query) && router.query.mode === 'update' ? router.query : undefined;

  const handleSubmitVoucher = React.useCallback(
    async ({
      id,
      name,
      voucherCode,
      startDate,
      endDate,
      quantityVoucher,
      minOrderValue,
      typeDiscount,
      discountValue,
      maxDiscount,
      maxUsage,
      description,
      banner,
    }) => {
      try {
        dispatch(setShowLoader(true));
        let _banner = null;

        if (banner) {
          _banner = banner.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
        }
        if (voucher) {
          const res = await requestCreateUpdateVoucherShop({
            id: parseFloat(id),
            //TODO shop id
            shopId: shopId,
            type: EVoucherType.VOUCHER_SHOP,
            programName: name,
            voucherCode: voucherCode,
            startDate: dayjs(startDate).unix(),
            endDate: dayjs(endDate).unix(),
            typeDiscount: typeDiscount,
            discountValue: discountValue,
            maxDiscount: maxDiscount,
            minOrderValue: minOrderValue,
            quantityVoucher: quantityVoucher,
            maxUsage: maxUsage,
            image: _banner,
            description: description,
          });
          if (res.code === EAppKey.MSG_SUCCESS) {
            NotificationManager.success({
              title: t('success'),
              message: t('voucher.update_voucher_success'),
            });
            setTimeout(() => {
              router.push('/shop/voucher-coupon');
            }, 1000);
          } else {
            NotificationManager.error({
              title: t('error'),
              message: res.message ? res.message.text : t('error'),
            });
          }
        } else {
          const res = await requestCreateUpdateVoucherShop({
            //TODO shop id
            shopId: shopId,
            type: EVoucherType.VOUCHER_SHOP,
            programName: name,
            voucherCode: voucherCode,
            startDate: dayjs(startDate).unix(),
            endDate: dayjs(endDate).unix(),
            typeDiscount: typeDiscount,
            discountValue: discountValue,
            maxDiscount: maxDiscount,
            minOrderValue: minOrderValue,
            quantityVoucher: quantityVoucher,
            maxUsage: maxUsage,
            image: _banner,
            description: description,
          });
          if (res.code === EAppKey.MSG_SUCCESS) {
            NotificationManager.success({
              title: t('success'),
              message: t('voucher.create_voucher_success'),
            });
            setTimeout(() => {
              router.push('/shop/voucher-coupon');
            }, 1000);
          } else {
            NotificationManager.error({
              title: t('error'),
              message: res.message ? res.message.text : t('error'),
            });
          }
        }
      } finally {
        dispatch(setShowLoader(false));
      }
    },
    [voucher]
  );

  const validationSchema = yup.object().shape({
    name: yup.string().required(t('error_field_empty')),
    voucherCode: yup
      .string()
      .required(t('error_field_empty'))
      .matches(/^[A-Z0-9]{1,5}$/, t('error_code_format')),
    startDate: yup.date().min(dayjs().toDate(), t('error_start_time')),
    endDate: yup.date().test('is-greater', t('error_end_time'), function (value) {
      const startDate = this.resolve(yup.ref('startDate'));
      const endDate = dayjs(value).toDate();
      const minEndDate = dayjs(startDate).add(1, 'hour').toDate();
      return endDate >= minEndDate;
    }),
    maxDiscount: yup.string().when('typeDiscount', {
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
    minOrderValue: yup.string().required(t('error_field_empty')),
    quantityVoucher: yup.string().required(t('error_field_empty')),
  });

  return (
    <Formik
      validateOnChange={false}
      validationSchema={validationSchema}
      enableReinitialize={true}
      initialValues={voucher ? voucher : initialValues}
      onSubmit={handleSubmitVoucher}>
      {({ handleChange, handleSubmit, setFieldValue, values, errors }) => {
        React.useEffect(() => {
          if (voucher) {
            if (voucher.image) {
              const str = BASE_API_URL + '/assets/' + voucher.image;

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

            if (voucher.maxDiscount && parseFloat(voucher.maxDiscount) > 0) {
              setFieldValue('typeLimit', EDiscountLimitType.AMOUNT);
            } else {
              setFieldValue('typeLimit', EDiscountLimitType.NO_LIMIT);
            }

            setFieldValue('quantityVoucher', parseFloat(voucher.quantity));

            const _startDate = new Date(parseInt(voucher.startDate) * 1000).toISOString();
            const _endDate = new Date(parseInt(voucher.endDate) * 1000).toISOString();

            setFieldValue('startDate', dayjs(_startDate).format(formatDate));
            setFieldValue('endDate', dayjs(_endDate).format(formatDate));
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
              {voucher
                ? t('voucher.update_voucher_coupon')
                : t('voucher.create_new_voucher_coupon')}
            </Text>
            <Box
              mt="4"
              bg="bg-1"
              shadow="md"
              py={{ base: '6', xl: '8' }}
              pl={{ base: '6', xl: '8' }}
              pr={{ base: '10', xl: '100px' }}>
              <Text textStyle="h5-b" color="primary.100" mb="6">
                {t('basic_information')}
              </Text>
              <FormGroup title={t('voucher.promotionName')}>
                <FormControl isInvalid={!!errors.name}>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t('input')}
                    autoComplete="off"
                    value={values.name}
                    onChange={handleChange('name')}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title={t('voucher.voucherCode')} mt="6">
                <FormControl isInvalid={!!errors.voucherCode}>
                  <Input
                    placeholder={t('input')}
                    autoComplete="off"
                    value={values.voucherCode}
                    onChange={handleChange('voucherCode')}
                  />
                  <FormErrorMessage>{errors.voucherCode}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title={t('voucher.usage_time')} mt="6">
                <SimpleGrid columns={{ base: 1, xl: 2 }} gap="5" pr={{ base: 'unset', xl: '20%' }}>
                  <FormControl isInvalid={!!errors.startDate}>
                    <Input
                      type="datetime-local"
                      placeholder={t('select_date_and_time')}
                      value={values.startDate}
                      onChange={handleChange('startDate')}
                      min={dayjs().format(formatDate)}
                    />
                    <FormErrorMessage>{errors.startDate}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.endDate}>
                    <Input
                      type="datetime-local"
                      placeholder={t('select_date_and_time')}
                      value={values.endDate}
                      onChange={handleChange('endDate')}
                      min={dayjs().format(formatDate)}
                      max={dayjs().add(4, 'months').format(formatDate)}
                    />
                    <FormErrorMessage>{errors.endDate}</FormErrorMessage>
                  </FormControl>
                </SimpleGrid>
              </FormGroup>
              <Text textStyle="h5-b" color="primary.100" mt="6">
                {t('voucher.setUpVoucher')}
              </Text>
              <FormGroup title={t('voucher.discount_type_amount')} mt="6">
                <Grid templateColumns="repeat(10,1fr)" gap="5">
                  <GridItem colSpan={3}>
                    <Select
                      defaultValue={EDiscountType.CASH}
                      value={values.typeDiscount}
                      onChange={handleChange('typeDiscount')}>
                      <option value={EDiscountType.CASH}>{t('fix_amount')}</option>
                      <option value={EDiscountType.PERCENT}>{t('by_percentage')}</option>
                    </Select>
                  </GridItem>
                  <GridItem colSpan={7}>
                    <InputGroup>
                      <FormControl isInvalid={!!errors.discountValue}>
                        <NumberInput
                          flex="1"
                          id="discountValue"
                          name="discountValue"
                          value={values.discountValue}
                          onChange={(e) => {
                            setFieldValue('discountValue', parseNumber(e));
                          }}>
                          <NumberInputField placeholder={t('input')} />
                        </NumberInput>
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
                <FormGroup title={t('voucher.maximum_discount_price')} mt="6">
                  <RadioGroup
                    value={values.typeLimit}
                    onChange={handleChange('typeLimit')}
                    size="lg"
                    pr="20%">
                    <HStack spacing={5} direction="row">
                      <Radio value={EDiscountLimitType.AMOUNT} flex="1">
                        {t('limited')}
                      </Radio>
                      <Radio value={EDiscountLimitType.NO_LIMIT} flex="1">
                        {t('no_limited')}
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </FormGroup>
              )}
              {values.typeDiscount === EDiscountType.PERCENT &&
                values.typeLimit === EDiscountLimitType.AMOUNT && (
                  <FormGroup mt="6">
                    <FormControl isInvalid={!!errors.maxDiscount}>
                      <InputGroup>
                        <NumberInput
                          flex="1"
                          id="maxDiscount"
                          name="maxDiscount"
                          value={values.maxDiscount}
                          onChange={(e) => {
                            setFieldValue('maxDiscount', parseNumber(e));
                          }}>
                          <NumberInputField placeholder={t('input')} />
                        </NumberInput>
                        <InputRightElement w="100px" borderLeftWidth="1px">
                          <Center h="full">
                            <Text textStyle="h4">HTG</Text>
                          </Center>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.maxDiscount}</FormErrorMessage>
                    </FormControl>
                  </FormGroup>
                )}
              <FormGroup title={t('voucher.minimum_basket_price')} mt="6">
                <FormControl isInvalid={!!errors.minOrderValue}>
                  <InputGroup>
                    <NumberInput
                      flex="1"
                      id="minOrderValue"
                      name="minOrderValue"
                      value={values.minOrderValue}
                      onChange={(e) => {
                        setFieldValue('minOrderValue', parseNumber(e));
                      }}>
                      <NumberInputField placeholder={t('input')} />
                    </NumberInput>
                    <InputRightElement w="100px" borderLeftWidth="1px">
                      <Center h="full">
                        <Text textStyle="h4">HTG</Text>
                      </Center>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.minOrderValue}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title={t('voucher.usage_quantity')} mt="6">
                <FormControl isInvalid={!!errors.quantityVoucher}>
                  <NumberInput
                    id="quantityVoucher"
                    name="quantityVoucher"
                    value={values.quantityVoucher}
                    onChange={(e) => {
                      setFieldValue('quantityVoucher', parseNumber(e));
                    }}>
                    <NumberInputField placeholder={t('input')} />
                  </NumberInput>
                  <FormErrorMessage>{errors.quantityVoucher}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title={t('max_usage_per_user')} mt="6">
                <FormControl>
                  <NumberInput
                    id="maxUsage"
                    name="maxUsage"
                    value={values.maxUsage}
                    onChange={(e) => {
                      setFieldValue('maxUsage', parseNumber(e));
                    }}>
                    <NumberInputField placeholder={t('input')} />
                  </NumberInput>
                  <FormErrorMessage>{errors.quantityVoucher}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title={t('voucher.banner_voucher')} mt="6">
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
                          <Text mt="1">{t('voucher.upload_an_image_of_banner_voucher')}</Text>
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
              <FormGroup title={t('voucher.program_details')} mt="6">
                <Textarea
                  id="description"
                  name="description"
                  rows={6}
                  placeholder={t('description')}
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
};

AddUpdateVoucherCoupon.layout = Admin;

export default WithAuthentication(AddUpdateVoucherCoupon);
