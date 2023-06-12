import React from 'react';
import { useDispatch } from 'react-redux';
import Admin from 'layouts/Admin.js';
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
  FormControl,
  FormErrorMessage,
  InputGroup,
  SimpleGrid,
  InputRightElement,
  Icon,
  useBoolean,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import { useTranslation } from 'react-i18next';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';

import dayjs from 'dayjs';
import router from 'next/router';
import { RangeDatePickerItem } from 'components';
import _ from 'lodash';
import { Formik, Form, Field, FieldArray } from 'formik';
import { FormGroup } from 'components';
import { AiOutlineSearch } from 'react-icons/ai';
import * as yup from 'yup';
import { HiPlus } from 'react-icons/hi';
import { setModalSelectProducts } from 'redux/actions/product';

const formatDate = 'YYYY-MM-DDTHH:mm';

const initialValues = {
  name: '',
  programStart: dayjs().add(10, 'minutes').format(formatDate),
  programEnd: dayjs().add(1, 'hours').add(10, 'minutes').format(formatDate),
};

const ProductFlashSale = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const TO_DATE = dayjs().toDate();
  const FROM_DATE = dayjs().subtract(30, 'days').toDate();

  const refInput = React.useRef();
  const [doSearch, { on: onSearch, off: offSearch }] = useBoolean(false);
  const [products, setProducts] = React.useState([]);

  // const renderProduct = React.useCallback(
  //   (item, index) => {
  //     const { categoryName, createAt, createBy, image, name, price, shopCode, productCode } = item;

  //     let _image = '';

  //     var firstChar = image.substring(0, 4);

  //     if (firstChar === 'http' || firstChar === 'https') {
  //       _image = image;
  //     } else {
  //       _image = BASE_API_URL + '/assets/' + image;
  //     }

  //     const isItemChecked = (() => {
  //       for (let i = 0; i < selectedProducts[currentPage - 1]?.products?.length; i++) {
  //         if (selectedProducts[currentPage - 1]?.products[i].id === item.id) {
  //           return true;
  //         }
  //       }
  //       return false;
  //     })();

  //     return (
  //       <React.Fragment key={index}>
  //         <TableRow
  //           key={index}
  //           onClick={() => handleSelect(item)}
  //           className={tableClasses.tableBodyRow}
  //           style={{
  //             cursor: 'pointer',
  //             backgroundColor: isItemChecked ? '#fff6f0' : '#fff',
  //             height: 100,
  //           }}>
  //           <TableCell key="check">
  //             <Checkbox isChecked={isItemChecked} onChange={() => handleSelect(item)} />
  //           </TableCell>
  //           <TableCell className={tableClasses.tableCell} key="shopCode2">
  //             <Flex alignItems="center">
  //               <AspectRatio
  //                 overflow="hidden"
  //                 w="80px"
  //                 ratio={1 / 1}
  //                 shadow="sm"
  //                 borderRadius="6px">
  //                 <Image src={_image} w="100%" h="100%" objectFit="contain" />
  //               </AspectRatio>
  //               <Flex flexDirection="column" ml="3" flex="1">
  //                 <Text textStyle="h4" color="text-basic" noOfLines={2}>
  //                   {name}
  //                 </Text>
  //                 <Text mt="2" textStyle="c-sm" color="text-body" mr="1">
  //                   {shopCode}
  //                   <Text as="span" mx="3">
  //                     -
  //                   </Text>
  //                   <Text as="span" textStyle="c-sm" color="text-body">
  //                     {productCode}
  //                   </Text>
  //                 </Text>
  //               </Flex>
  //             </Flex>
  //           </TableCell>
  //           <TableCell className={tableClasses.tableCell} key="shopCode">
  //             <Text textStyle="h3" color="text-basic">
  //               {formatCurrency(price ?? 0)}
  //             </Text>
  //           </TableCell>
  //           <TableCell className={tableClasses.tableCell} key="shopCode1">
  //             <InputGroup style={{ width: 110 }}>
  //               <Input
  //                 placeholder="Input"
  //                 autoComplete="off"
  //                 // style={{ }}
  //                 value={0}
  //                 onChange={() => {}}
  //               />
  //               <InputRightElement w="30px" borderLeftWidth="1px">
  //                 <Center h="full">
  //                   <Text textStyle="h2">HTG</Text>
  //                 </Center>
  //               </InputRightElement>
  //             </InputGroup>
  //           </TableCell>
  //           <TableCell className={tableClasses.tableCell} key="shopCode3">
  //             <InputGroup style={{ width: 110 }}>
  //               <Input placeholder="Input" autoComplete="off" value={0} onChange={() => {}} />
  //               <InputRightElement w="60px" borderLeftWidth="1px">
  //                 <Center h="full">
  //                   <Text textStyle="h2">% Giảm</Text>
  //                 </Center>
  //               </InputRightElement>
  //             </InputGroup>
  //           </TableCell>

  //           <TableCell className={tableClasses.tableCell} key="createBy">
  //             <Text textStyle="h3" color="text-basic">
  //               1000
  //             </Text>
  //           </TableCell>
  //           <TableCell className={tableClasses.tableCell} key={'publish'}>
  //             <Text textStyle="h3" color="text-basic">
  //               30
  //             </Text>
  //           </TableCell>
  //           <TableCell className={tableClasses.tableCell} key={'publish1'}>
  //             <Text textStyle="h3" color="text-basic">
  //               5
  //             </Text>
  //           </TableCell>
  //         </TableRow>
  //       </React.Fragment>
  //     );
  //   },
  //   [selectedProducts, currentPage]
  // );

  const handleSubmitVoucher = React.useCallback(async ({ name, programStart, programEnd }) => {
    try {
      dispatch(setShowLoader(true));
    } finally {
      dispatch(setShowLoader(false));
    }
  }, []);

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
  });

  return (
    <Formik
      validateOnChange={false}
      validationSchema={validationSchema}
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleSubmitVoucher}>
      {({ handleChange, handleSubmit, setFieldValue, values, errors }) => {
        return (
          <Box>
            <Text textStyle="h6-sb" color="text-basic" mt="6">
              Create new new program
            </Text>
            <Box mt="6" bg="bg-1" shadow="md" borderRadius="4px" p="6">
              <Text textStyle="h5-sb" color="text-basic" mb="6">
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
              {/* <InputGroup maxW="570px" borderRadius="4px" overflow="hidden" mt="6">
                <Input ref={refInput} placeholder="Search product name" />
                <InputRightElement
                  borderRadius="4px"
                  cursor="pointer"
                  h="full"
                  bg="primary.100"
                  w="100px">
                  <Center onClick={() => setDoSearch(!doSearch)}>
                    <Icon as={AiOutlineSearch} w="24px" h="24px" color="white" />
                  </Center>
                </InputRightElement>
              </InputGroup> */}
            </Box>
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
            </Box>
            <NotificationContainer />
          </Box>
        );
      }}
    </Formik>
  );
};

ProductFlashSale.layout = Admin;

export default WithAuthentication(ProductFlashSale);
