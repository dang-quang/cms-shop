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

const formatDate = 'YYYY-MM-DDTHH:mm';

const initialValues = {
  name: '',
  programStart: dayjs().add(10, 'minutes').format(formatDate),
  programEnd: dayjs().add(1, 'hours').add(10, 'minutes').format(formatDate),
  products: [],
  flashSaleProducts: [],
};

const ProductFlashSale = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedProducts = useSelector((state) => state.product.selectedProducts);

  const [product, setProduct] = React.useState(null);

  const [selectAll, { toggle: toggleSelectAll, off: offSelectAll, on: onSelectAll }] =
    useBoolean(false);
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  //const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

  React.useEffect(() => {
    const handleRouteChange = () => {
      if (isEmpty(selectedProducts)) {
        return;
      }
      const confirmLeave = window.confirm('The information will not be saved. Sure to leave?');
      if (!confirmLeave) {
        router.events.emit('routeChangeError');
        throw 'routeChange aborted.';
      } else {
        dispatch(setSelectedProducts([]));
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
  }, [selectedProducts]);

  const handleSubmitVoucher = React.useCallback(
    async ({ name, programStart, programEnd, products, flashSaleProducts }) => {
      console.log('flashSaleProducts', flashSaleProducts);
      try {
        dispatch(setShowLoader(true));
      } finally {
        dispatch(setShowLoader(false));
      }
    },
    []
  );

  const validationSchema = yup.object().shape({
    name: yup.string().required(t('error_field_empty')),
    programStart: yup
      .date()
      .min(dayjs().toDate(), 'Please enter a start time that is later than the current time.'),
    programEnd: yup
      .date()
      .min(
        yup.ref('programStart'),
        'Please enter a start time that is later than the current time.'
      ),
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
              return value <= this.parent.price;
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
      {({ handleChange, handleSubmit, setFieldValue, values, errors }) => {
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
            });
          }
          setFieldValue('products', list);
        }, [selectedProducts]);

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

        return (
          <Box>
            <Text textStyle="h6-sb" color="text-basic" mt="6">
              Create New My Shop's Flash Sale
            </Text>
            <Box mt="6" bg="bg-1" shadow="md" borderRadius="4px" p="6">
              <Text textStyle="h5-b" color="text-basic" mb="6">
                Basic information
              </Text>
              <FormGroup title="Flash sale name">
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
            </Box>
            <Box mt="6" bg="bg-1" borderRadius="4px" shadow="md" p="6">
              <Flex alignItems="center" justifyContent="space-between">
                <Box>
                  <Text textStyle="h5-b" color="text-basic">
                    Shop's Flash Sale Products
                  </Text>
                  <Text textStyle="body" color="text-body" mt="2">
                    Please review the product criteria before adding items to your promotion.
                  </Text>
                </Box>
                <Button
                  display={!isEmpty(selectedProducts) ? 'block' : 'none'}
                  leftIcon={<HiPlus />}
                  variant="outline"
                  children="Add Products"
                  onClick={() => dispatch(setModalSelectProducts(true))}
                />
              </Flex>
              <Button
                display={isEmpty(selectedProducts) ? 'block' : 'none'}
                mt="2"
                leftIcon={<HiPlus />}
                variant="outline"
                children="Add Products"
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
                              <Th
                                borderBottomWidth="0px"
                                color="text-note"
                                textStyle="b-md"
                                textTransform="capitalize">
                                <Checkbox isChecked={selectAll} onChange={handleSelectAll} />
                              </Th>
                              <Th
                                borderBottomWidth="0px"
                                color="text-note"
                                textStyle="b-md"
                                textTransform="capitalize">
                                Product Name
                              </Th>
                              <Th
                                borderBottomWidth="0px"
                                color="text-note"
                                textStyle="b-md"
                                textTransform="capitalize">
                                Original Price
                              </Th>
                              <Th
                                borderBottomWidth="0px"
                                color="text-note"
                                textStyle="b-md"
                                textTransform="capitalize">
                                Discounted Price
                              </Th>
                              <Th
                                borderBottomWidth="0px"
                                color="text-note"
                                textStyle="b-md"
                                textTransform="capitalize">
                                Discount
                              </Th>
                              <Th
                                borderBottomWidth="0px"
                                color="text-note"
                                textStyle="b-md"
                                textTransform="capitalize">
                                Campaign Stock
                              </Th>
                              <Th
                                borderBottomWidth="0px"
                                color="text-note"
                                textStyle="b-md"
                                textTransform="capitalize">
                                Stock
                              </Th>
                              <Th
                                borderBottomWidth="0px"
                                color="text-note"
                                textStyle="b-md"
                                textTransform="capitalize">
                                Action
                              </Th>
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
                          title="Confirm Deletion"
                          description={t('deleteConfirm')}
                          buttonLeft={{ title: t('cancel'), onClick: onCloseDelete }}
                          buttonRight={{
                            title: t('confirm'),
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
              <Button variant="outline-control" minW="150px" mr="4" onClick={() => router.back()}>
                {t('cancel')}
              </Button>
              <Button
                variant="primary"
                minW="150px"
                isDisabled={isEmpty(values.flashSaleProducts)}
                onClick={() => handleSubmit()}>
                {t('confirm')}
              </Button>
            </Flex>
          </Box>
        );
      }}
    </Formik>
  );
};

ProductFlashSale.layout = Admin;

export default WithAuthentication(ProductFlashSale);
