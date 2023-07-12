import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Admin from 'layouts/Admin.js';
import {
  Box,
  Checkbox,
  Flex,
  Input,
  Text,
  FormControl,
  FormErrorMessage,
  SimpleGrid,
  useBoolean,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-light-notifications';

import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { ModalConfirm, ProductFlashSaleItem, WithAuthentication } from 'components';
import _, { isEmpty } from 'lodash';
import { Formik, FieldArray } from 'formik';
import { FormGroup } from 'components';
import * as yup from 'yup';
import { HiPlus } from 'react-icons/hi';
import { setModalSelectProducts, setSelectedProducts } from 'redux/actions/product';
import { setShowLoader } from 'redux/actions/app';
import { requestCreateShopFlashSale } from 'utilities/ApiShop';
import { EAppKey } from 'constants/types';

const formatDate = 'YYYY-MM-DDTHH:mm';

const initialValues = {
  name: '',
  startAt: dayjs().add(10, 'minutes').format(formatDate),
  endAt: dayjs().add(1, 'hours').add(10, 'minutes').format(formatDate),
  products: [],
  flashSaleProducts: [],
};

const CreateShopFlashSale = () => {
  const shopId = 143;
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedProducts = useSelector((state) => state.product.selectedProducts);

  const headers = [
    '',
    t('flash_sale_shop.product_name'),
    t('flash_sale_shop.original_price'),
    t('flash_sale_shop.discounted_price'),
    t('discount'),
    t('flash_sale_shop.campaign_stock'),
    t('stock'),
    t('enable_disable'),
    t('action'),
  ];

  const [product, setProduct] = React.useState(null);

  const [selectAll, { toggle: toggleSelectAll, off: offSelectAll, on: onSelectAll }] =
    useBoolean(false);
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const { isOpen: isOpenNotice, onOpen: onOpenNotice, onClose: onCloseNotice } = useDisclosure();

  const handleSubmitVoucher = React.useCallback(
    async ({ name, startAt, endAt, products }, { setFieldValue }) => {
      try {
        dispatch(setShowLoader(true));
        //TODO If you add flash sale in the program, then transmit the programId
        //programId
        let _details = [];
        let params = {
          name: name,
          startAt: dayjs(startAt).unix(),
          endAt: dayjs(endAt).unix(),
          shopId: shopId,
        };
        for (let i = 0; i < products.length; i++) {
          const product = products[i];
          _details.push({
            productId: product.id,
            reduceValue: parseFloat(product.discounted_price),
            productQuantity: parseFloat(product.campaign_stock),
          });
        }
        params.details = _details;
        const res = await requestCreateShopFlashSale(params);
        if (res && res.code === EAppKey.MSG_SUCCESS) {
          setFieldValue('products', []);
          dispatch(setSelectedProducts([]));
          NotificationManager.success({
            title: t('success'),
            message: 'Create Flash Sale Success',
          });
          setTimeout(() => {
            router.push('/shop/flash-sale-shop');
          }, 1000);
        } else {
          NotificationManager.error({
            title: t('error'),
            message: res.message ? res.message.text : t('error'),
          });
        }
      } finally {
        dispatch(setShowLoader(false));
      }
    },
    []
  );

  const validationSchema = yup.object().shape({
    name: yup.string().required(t('error_field_empty')),
    startAt: yup
      .date()
      .min(dayjs().toDate(), 'Please enter a start time that is later than the current time.'),
    endAt: yup
      .date()
      .min(yup.ref('startAt'), 'End time must be later than the start time.')
      .test('check-seconds', 'End time must be later than the start time.', function (value) {
        const startAt = this.resolve(yup.ref('startAt'));
        if (!startAt || !value) {
          return true;
        }
        return startAt.getTime() < value.getTime();
      }),
    products: yup.array().of(
      yup.object().shape({
        discounted_price: yup
          .number()
          .required('Discounted price is required.')
          .min(0, 'Discounted price must be greater than or equal to 0.')
          .test(
            'discounted-price',
            'Promotion price must less than original price',
            function (value) {
              return value < this.parent.price;
            }
          ),
        campaign_stock: yup
          .number()
          .required('Campaign stock is required.')
          .min(1, 'Stock should be more than 1 and less than stock')
          .test(
            'campaign-stock',
            `Stock should be more than 1 and less than stock`,
            function (value) {
              const stock = this.parent.stock;
              return value > 1 && value <= stock;
            }
          ),
      })
    ),
  });

  return (
    <Formik
      validateOnChange={false}
      validationSchema={validationSchema}
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleSubmitVoucher}>
      {({ handleChange, handleSubmit, setFieldValue, setFieldError, values, errors }) => {
        React.useEffect(() => {
          if (isEmpty(selectedProducts)) {
            return;
          }

          let list = [];

          for (let i = 0; i < selectedProducts.length; i++) {
            list.push({
              ...selectedProducts[i],
              discounted_price: selectedProducts[i].price,
              discount_percent: 0,
              campaign_stock: selectedProducts[i].stock,
              isEnable: false,
            });
          }
          setFieldValue('products', list);
        }, [selectedProducts]);

        React.useEffect(() => {
          const handleRouteChange = () => {
            if (isEmpty(values.products)) {
              return;
            }
            const confirmLeave = window.confirm(t('sure_to_leave'));
            if (!confirmLeave) {
              router.events.emit('routeChangeError');
              throw 'routeChange aborted.';
            } else {
              dispatch(setSelectedProducts([]));
              setFieldValue('products', []);
            }
          };

          const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
          };

          window.onbeforeunload = handleBeforeUnload;

          router.events.on('routeChangeStart', handleRouteChange);

          return () => {
            window.onbeforeunload = null;
            router.events.off('routeChangeStart', handleRouteChange);
          };
        }, [values.products]);

        const handleSelectAll = React.useCallback(() => {
          if (isEmpty(values.products)) {
            return;
          }

          toggleSelectAll();
          if (selectAll) {
            setFieldValue('flashSaleProducts', []);
          } else {
            setFieldValue('flashSaleProducts', values.products);
          }
        }, [selectAll, values.products]);

        const handleDeleteProduct = React.useCallback(
          async (remove) => {
            onCloseDelete();
            const indexToRemove = values.products.findIndex((item) => item.id === product.id);
            if (indexToRemove !== -1) {
              remove(indexToRemove);
            }
            const newList = _.filter(values.products, (i) => i.id !== product.id);
            dispatch(setSelectedProducts(newList));
            setProduct(null);
          },
          [product]
        );

        const handleSelectItem = React.useCallback(
          (item) => {
            const exist = values.flashSaleProducts.find((i) => i.id === item.id);
            if (exist) {
              const updatedProducts = values.flashSaleProducts.filter((i) => i.id !== item.id);
              setFieldValue('flashSaleProducts', updatedProducts);

              const isEqual = _.isEqual(updatedProducts, values.products);
              if (isEqual && !selectAll) {
                return;
              }
              offSelectAll();
            } else {
              // If item is not selected, add it to the array
              if (!isEmpty(values.flashSaleProducts)) {
                let list = [...values.flashSaleProducts, item];

                setFieldValue('flashSaleProducts', list);

                const areArraysEqual = _.isEqualWith(list, values.products, (obj1, obj2) => {
                  return obj1.id === obj2.id;
                });
                if (!areArraysEqual) {
                  return;
                }
                onSelectAll();
              } else {
                setFieldValue('flashSaleProducts', [item]);
              }
            }
          },
          [values.flashSaleProducts, values.products]
        );

        const onSwitch = React.useCallback(
          (isEnable, index) => {
            if (isEnable) {
              const product = values.products[index];

              if (!product.discounted_price || product.discounted_price < 0) {
                setFieldError(
                  `products.${index}.discounted_price`,
                  product.discounted_price
                    ? 'Promotion price must be greater than or equal to 0.'
                    : t('error_field_empty')
                );
              } else if (product.discounted_price >= product.price) {
                setFieldError(
                  `products.${index}.discounted_price`,
                  'Promotion price must be less than the original price'
                );
              } else {
                setFieldError(`products.${index}.discounted_price`, '');
              }

              if (
                !product.campaign_stock ||
                product.campaign_stock < 1 ||
                product.campaign_stock > product.stock
              ) {
                setFieldError(
                  `products.${index}.campaign_stock`,
                  product.campaign_stock
                    ? 'Stock should be more than 1 and less than stock'
                    : 'Campaign stock is required.'
                );
              } else {
                setFieldError(`products.${index}.campaign_stock`, '');
              }

              if (
                product.discounted_price &&
                product.campaign_stock &&
                product.discounted_price >= 0 &&
                product.discounted_price < product.price &&
                product.campaign_stock >= 1 &&
                product.campaign_stock <= product.stock
              ) {
                setFieldValue(`products.${index}.isEnable`, true);
              }
            } else {
              setFieldValue(`products.${index}.isEnable`, false);
            }
          },
          [values.products]
        );

        const handleEnableAll = React.useCallback(() => {
          values.products.forEach((product, index) => {
            onSwitch(true, index);
          });
        }, [values.products]);

        return (
          <Box>
            <Text textStyle="h6-sb" color="text-basic" mt="6">
              {t('flash_sale_shop.create_shop_flash_sale')}
            </Text>
            <Box mt="6" bg="bg-1" shadow="md" borderRadius="4px" p="6">
              <Text textStyle="h5-b" color="text-basic" mb="6">
                {t('basicInformation')}
              </Text>
              <FormGroup title={t('flash_sale_shop.flash_sale_name')}>
                <FormControl isInvalid={!!errors.name}>
                  <Input
                    placeholder={t('input')}
                    autoComplete="off"
                    value={values.name}
                    onChange={handleChange('name')}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title={t('flash_sale_shop.program_time')} mt="6">
                <SimpleGrid columns={{ base: 1, xl: 2 }} gap="5" pr={{ base: 'unset', xl: '20%' }}>
                  <FormControl isInvalid={!!errors.startAt}>
                    <Input
                      type="datetime-local"
                      value={values.startAt}
                      onChange={handleChange('startAt')}
                      min={dayjs().format(formatDate)}
                    />
                    <FormErrorMessage>{errors.startAt}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.endAt}>
                    <Input
                      type="datetime-local"
                      value={values.endAt}
                      onChange={handleChange('endAt')}
                      min={dayjs(values.startAt).format(formatDate)}
                      max={dayjs(values.startAt).endOf('day').format(formatDate)}
                    />
                    <FormErrorMessage>{errors.endAt}</FormErrorMessage>
                  </FormControl>
                </SimpleGrid>
              </FormGroup>
            </Box>
            <Box mt="6" bg="bg-1" borderRadius="4px" shadow="md" p="6">
              <Flex alignItems="center" justifyContent="space-between">
                <Box>
                  <Text textStyle="h5-b" color="text-basic">
                    {t('flash_sale_shop.shop_flash_sale_products')}
                  </Text>
                  <Text textStyle="body" color="text-body" mt="2">
                    {t('flash_sale_shop.please_review_the_product')}
                  </Text>
                </Box>
                <Button
                  display={!isEmpty(selectedProducts) ? 'block' : 'none'}
                  leftIcon={<HiPlus />}
                  variant="outline"
                  children={t('flash_sale_shop.add_products')}
                  onClick={() => dispatch(setModalSelectProducts(true))}
                />
              </Flex>
              <Button
                display={isEmpty(selectedProducts) ? 'block' : 'none'}
                mt="2"
                leftIcon={<HiPlus />}
                variant="outline"
                children={t('flash_sale_shop.add_products')}
                onClick={() => dispatch(setModalSelectProducts(true))}
              />
              {values.products && values.products.length > 0 && (
                <FieldArray
                  name="products"
                  render={({ remove }) => {
                    return (
                      <Box
                        mt="8"
                        overflow="auto"
                        position="relative"
                        borderWidth="1px"
                        borderRadius="4"
                        borderColor="border-5">
                        <Table variant="simple" minW="5xl">
                          <Thead h="52px" bg="bg-2">
                            <Tr>
                              {headers.map((item, index) => {
                                return (
                                  <Th
                                    key={index}
                                    borderBottomWidth="0px"
                                    minW={index === 1 ? '250px' : 'unset'}
                                    color="text-note"
                                    textStyle="b-md"
                                    textTransform="capitalize">
                                    {index === 0 ? (
                                      <Checkbox isChecked={selectAll} onChange={handleSelectAll} />
                                    ) : (
                                      item
                                    )}
                                  </Th>
                                );
                              })}
                            </Tr>
                          </Thead>
                          {values.products &&
                            values.products.length > 0 &&
                            values.products.map((item, idx) => {
                              const isChecked = !!values.flashSaleProducts.find(
                                (i) => i.id === item.id
                              );
                              return (
                                <ProductFlashSaleItem
                                  key={idx}
                                  item={item}
                                  isChecked={isChecked}
                                  onDelete={() => {
                                    setProduct(item);
                                    onOpenDelete();
                                  }}
                                  onSwitch={() => onSwitch(!values.products[idx].isEnable, idx)}
                                  isLast={idx === values.products.length - 1}
                                  onClick={() => handleSelectItem(item)}
                                  discountedPrice={{
                                    onChange: (e) => {
                                      setFieldValue(
                                        `products.${idx}.discounted_price`,
                                        e.target.value
                                      );
                                      const roundedValue = Math.floor(
                                        ((values.products[idx].price - parseFloat(e.target.value)) /
                                          values.products[idx].price) *
                                          100
                                      );

                                      if (roundedValue < 0) {
                                        setFieldValue(`products.${idx}.discount_percent`, 0);
                                      } else {
                                        setFieldValue(
                                          `products.${idx}.discount_percent`,
                                          roundedValue
                                        );
                                      }
                                      const updatedFlashSaleProducts = [
                                        ...values.flashSaleProducts,
                                      ];
                                      updatedFlashSaleProducts[idx] = {
                                        ...updatedFlashSaleProducts[idx],
                                        discounted_price: e.target.value,
                                        discount_percent: roundedValue,
                                      };

                                      setFieldValue('flashSaleProducts', updatedFlashSaleProducts);
                                    },
                                    errors:
                                      errors.products &&
                                      errors.products.length > 0 &&
                                      errors.products[idx] &&
                                      errors.products[idx].discounted_price,
                                  }}
                                  discount={{
                                    onChange: (e) => {
                                      const discountValue = parseFloat(e.target.value);
                                      const clampedDiscount = Math.min(
                                        Math.max(discountValue, 0),
                                        100
                                      );
                                      const discountedPrice =
                                        values.products[idx].price -
                                        (values.products[idx].price * clampedDiscount) / 100;

                                      setFieldValue(
                                        `products.${idx}.discount_percent`,
                                        clampedDiscount
                                      );

                                      if (discountedPrice) {
                                        setFieldValue(
                                          `products.${idx}.discounted_price`,
                                          discountedPrice
                                        );
                                      } else {
                                        setFieldValue(
                                          `products.${idx}.discounted_price`,
                                          values.products[idx].price
                                        );
                                      }

                                      const updatedFlashSaleProducts = [
                                        ...values.flashSaleProducts,
                                      ];
                                      updatedFlashSaleProducts[idx] = {
                                        ...updatedFlashSaleProducts[idx],
                                        discount_percent: clampedDiscount,
                                        discounted_price: discountedPrice,
                                      };

                                      setFieldValue('flashSaleProducts', updatedFlashSaleProducts);
                                    },
                                  }}
                                  campaignStock={{
                                    onChange: (e) => {
                                      setFieldValue(
                                        `products.${idx}.campaign_stock`,
                                        e.target.value
                                      );

                                      const updatedFlashSaleProducts = [
                                        ...values.flashSaleProducts,
                                      ];
                                      updatedFlashSaleProducts[idx] = {
                                        ...updatedFlashSaleProducts[idx],
                                        campaign_stock: e.target.value,
                                      };

                                      setFieldValue('flashSaleProducts', updatedFlashSaleProducts);
                                    },
                                    errors:
                                      errors.products &&
                                      errors.products.length > 0 &&
                                      errors.products[idx] &&
                                      errors.products[idx].campaign_stock,
                                  }}
                                />
                              );
                            })}
                        </Table>
                        <ModalConfirm
                          isOpen={isOpenDelete}
                          onClose={onCloseDelete}
                          title={t('delete')}
                          description={t('flash_sale_shop.description_delete_product')}
                          buttonLeft={{ title: t('cancel'), onClick: onCloseDelete }}
                          buttonRight={{
                            title: t('delete'),
                            onClick: () => handleDeleteProduct(remove),
                          }}
                        />
                      </Box>
                    );
                  }}
                />
              )}
            </Box>
            <Flex mt="6" alignItems="center" justifyContent="flex-end">
              <Button
                variant="outline-control"
                minW="80px"
                size="sm"
                mr="4"
                onClick={() => router.back()}>
                {t('cancel')}
              </Button>
              <Button
                variant="primary"
                minW="80px"
                size="sm"
                isDisabled={isEmpty(values.products)}
                onClick={() => {
                  const flashSaleEnable = values.products.filter((i) => i.isEnable === true);
                  if (!isEmpty(flashSaleEnable)) {
                    handleSubmit();
                  } else {
                    onOpenNotice();
                  }
                }}>
                {t('confirm')}
              </Button>
            </Flex>
            <ModalConfirm
              isOpen={isOpenNotice}
              onClose={onCloseNotice}
              title={t('notice')}
              description={t('no_product_is_enabled')}
              buttonLeft={{
                title: t('sure_and_leave'),
                onClick: () => {
                  onCloseNotice();
                  handleSubmit();
                },
              }}
              buttonRight={{
                title: t('enable_all'),
                onClick: () => {
                  onCloseNotice();
                  handleEnableAll();
                },
              }}
            />
          </Box>
        );
      }}
    </Formik>
  );
};

CreateShopFlashSale.layout = Admin;

export default WithAuthentication(CreateShopFlashSale);
