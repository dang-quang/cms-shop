import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Admin from 'layouts/Admin.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
// import Table from '@material-ui/core/Table';
import Search from '@material-ui/icons/Search';
import tableStyles from 'assets/jss/natcash/components/tableStyle.js';
import taskStyles from 'assets/jss/natcash/components/tasksStyle.js';
import Pagination from '@material-ui/lab/Pagination';
import { useTranslation } from 'react-i18next';
import styles from 'assets/jss/natcash/views/productApproval/productApprovalStyle';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';
import {
  AspectRatio,
  Box,
  Center,
  Checkbox,
  Flex,
  Image,
  Input,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  InputGroup,
  InputRightElement,
  Button,
  useBoolean,
  useDisclosure,
  Thead,
  Tr,
  Th,
  Table
} from '@chakra-ui/react';
import { formatCurrency, formatNumber } from 'utilities/utils';
import { requestApproveProduct, requestGetListProductApprove } from 'utilities/ApiManage';
import { setShowLoader } from 'redux/actions/app';
import dayjs from 'dayjs';
import router from 'next/router';
import { RangeDatePickerItem } from 'components';
import { BASE_API_URL } from 'utilities/const';
import _, { isEmpty } from 'lodash';
import { EAppKey } from 'constants/types';
import { Formik, Form, Field, FieldArray } from 'formik';
import { setApproveProducts } from 'redux/actions/product';
import { setModalSelectProducts } from 'redux/actions/product';
import { HiPlus } from 'react-icons/hi';
import * as yup from 'yup';
import { ModalConfirm, ProductFlashSaleItem, WithAuthentication } from 'components';


const formatDate = 'YYYY-MM-DDTHH:mm';

const initialValues = {
  name: '',
  programStart: dayjs().add(10, 'minutes').format(formatDate),
  programEnd: dayjs().add(1, 'hours').add(10, 'minutes').format(formatDate),
  products: [],
  flashSaleProducts: [],
};


const ProductApproval = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const selectedProducts = useSelector((state) => state.product.selectedProducts);
  const [product, setProduct] = React.useState(null);
  const [selectAll, { toggle: toggleSelectAll, off: offSelectAll, on: onSelectAll }] =
    useBoolean(false);
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const tabs = ['Chi tiết chương trình', 'Điều kiện tham gia'];
  const refInput = React.useRef();
  const [doSearch, setDoSearch] = useState(false);
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

  return (
    <Formik
      validateOnChange={false}
      // validationSchema={validationSchema}
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
          <Card>
            <CardHeader color="primary">
              <Text textStyle="h5" color="white">
                {t('sideBar.productApproval')}
              </Text>
            </CardHeader>

            <CardBody className={classes.cardBody}>
              <Box>
                <Text textStyle="h5" color="text-basic" marginBottom={'10px'}>
                  [NGÀNH HÀNG THỜI TRANG] - [SIÊU SALE HÀNG HIỆU] - [00:00 09/09/2022 - 23:59 09/09/2022]
                </Text>
              </Box>
              <Box
                w={'70%'}
                borderWidth="0.3px"
                overflow="hidden"
                borderColor="#B4B4B4"
                justifyContent={'center'}
                alignItems={'center'}>
                <Flex m={'2px'} justifyContent={'space-between'}>
                  <AspectRatio w="210px" ratio={2 / 1} mr="2" borderRadius="8px" overflow="hidden">
                    <Image
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      src={'https://cf.shopee.vn/file/sg-11134004-7qvg9-lh7djcs0g92vb7'}
                    />
                  </AspectRatio>
                  <Box>
                    <Flex
                      h="100%"
                      flexDirection={'column'}
                      justifyContent={'center'}
                      alignItems={'center'}>
                      <Text textStyle="h5" color="text-basic">
                        Thời gian đăng ký
                      </Text>
                      <Text textStyle="h2" color="text-basic">
                        00:00 16-08-2022 - 13:30 05-09-2022
                      </Text>
                      <Text textStyle="h2" color="text-basic">
                        Hiện tại bạn có thể đăng ký 7 Khung giờ
                      </Text>
                    </Flex>
                  </Box>
                  <Box marginRight={'20px'}>
                    <Flex
                      h="100%"
                      flexDirection={'column'}
                      justifyContent={'center'}
                      alignItems={'center'}>
                      <Text textStyle="h5" color="text-basic">
                        Thời gian diễn ra
                      </Text>
                      <Text textStyle="h2" color="text-basic">
                        00:00 09-09-2022 - 23:59 09-09-2022
                      </Text>
                      <Text textStyle="h2" color="text-basic">
                        0 Khung giờ bạn đã đăng ký đang diễn ra
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
              <Tabs variant="soft-rounded" mt="8">
                <Flex justifyContent="space-between">
                  <TabList w="auto" mb="16px" borderRadius="full" bg="white" p="1">
                    {tabs.map((name, index) => (
                      <Tab
                        key={index}
                        borderRadius="3px"
                        textStyle="b-lg"
                        fontWeight="500"
                        textTransform="capitalize"
                        _focus={{ border: 'none' }}
                        _selected={{
                          bg: 'primary.100',
                          color: 'white',
                        }}
                        color="text-body">
                        {name}
                      </Tab>
                    ))}
                  </TabList>
                </Flex>
                <TabPanels>
                  <TabPanel p="0">
                    <Box w={'50%'}>
                      <Text>
                        [NGÀNH HÀNG THỜI TRANG] - [SIÊU SALE HÀNG HIỆU] - [00:00 09/09/2022 - 23:59
                        09/09/2022] - GIÁ TRÊN 199K Đây là chương trình diễn ra vào ngày 09.09 dành riêng
                        cho Ngành hàng Thời Trang Hỗ trợ Người bán tăng doanh số và thu hút thêm khách
                        hàng mới. Shopee không trợ giá. Freeship từ 0Đ toàn sàn + Thời gian đăng kí:
                        [00:00 - 16/08/2022] đến [13:30 - 05/09/2022] + Thời gian xét duyệt: [13:31 -
                        05/09/2022] đến [16:00 - 05/09/2022] thêm
                      </Text>
                    </Box>
                  </TabPanel>
                  <TabPanel p="0">
                    <Box w={'50%'}>
                      <Text>
                        Điều kiện của shop Không giới hạn Điều kiện Mã giảm giá Số mã có thể sử dụng : 30
                        ~ 100 Giá trị đơn hàng tối thiểu : ₫0 ~ ₫0 Thời gian bắt đầu lưu Mã giảm giá : Sớm
                        hơn hoặc đúng 2023/06/01 00:00:00 Thời gian kết thúc lưu Mã giảm giá : Muộn hơn
                        hoặc đúng 2023/06/06 23:59:59 Loại Mã giảm giá : Mã giảm giá toàn Shop Thiết lập
                        hiển thị mã giảm giá : Hiển thị nhiều nơi Loại Mã giảm giá Giảm theo phần trăm
                        Phần trăm giảm : 10%GIẢM ~ 10%GIẢM Giảm tối đa : ₫10.000 ~ ₫100.000 Hoàn xu Phần
                        trăm giảm : 10% ~ 10% Giảm tối đa : ₫10.000 ~ ₫100.000
                      </Text>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>

            <CardBody className={classes.cardBody}>
              <Flex
                flexDirection={{ base: 'column', md: 'row' }}
                alignItems={{ base: 'unset', md: 'center' }}
                justifyContent={{ base: 'flex-start', md: 'space-between' }}>
                <Flex
                  flexDirection={{ base: 'column', sm: 'row' }}
                  alignItems={{ base: 'unset', sm: 'center' }}
                  flex="1">
                  <Flex mx={{ base: 'unset', sm: '2' }} flex="1" alignItems="center">
                    <Input
                      ref={refInput}
                      variant="search"
                      placeholder="Enter product code, name."
                      flex="1"
                      maxW="400px"
                    />
                    <Center
                      h="100%"
                      mx="2"
                      cursor="pointer"
                      boxSize="40px"
                      w="40px"
                      borderRadius="full"
                      color="gray.400"
                      shadow="md"
                      onClick={() => setDoSearch(!doSearch)}>
                      <Search />
                    </Center>
                    {/* <RangeDatePickerItem
                selectedDates={selectedDates}
                onDateChange={setSelectedDates}
                maxDate={moment().toDate()}
              /> */}
                  </Flex>
                </Flex>
              </Flex>
            </CardBody>

            <Box mt="6" bg="bg-1" borderRadius="4px" shadow="md" p="6">
              <Text textStyle="h5-sb" color="text-basic">
                Shop's Flash Sale Products
              </Text>
              <Text textStyle="body" color="text-body" mt="2">
                Please review the product criteria before adding items to your promotion.
              </Text>
              <Button
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


            <NotificationContainer />
          </Card>
        )
      }}
    </Formik>
  );
}

ProductApproval.layout = Admin;

// export default ProductApproval;
export default WithAuthentication(ProductApproval);
