import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Text,
  Th,
  Thead,
  Tr,
  useBoolean,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import _, { isEmpty } from 'lodash';
import SelectProductItem from './SelectProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { setModalSelectProducts, setSelectedProducts } from 'redux/actions/product';
import { setShowLoader } from 'redux/actions/app';
import { EAppKey, EProductType } from 'constants/types';
import { NotificationManager } from 'react-light-notifications';
import { requestGetListShopProduct } from 'utilities/ApiShop';
import EmptyListItem from './EmptyListItem';

// const data = [
//   {
//     id: 23744991650,
//     name: 'Polo',
//     image:
//       'https://user-images.githubusercontent.com/42206067/244660279-c5cfa99d-67dc-45de-82f1-e7c660b06d74.png',
//     sales: 0,
//     price: 200000,
//     stock: 423,
//   },
//   {
//     id: 23744991651,
//     name: 'Mangto',
//     image:
//       'https://user-images.githubusercontent.com/42206067/244660267-bfb9dba1-1bc6-4792-a1e8-139eb3bf35bd.png',
//     sales: 0,
//     price: 1000000,
//     stock: 1120,
//   },
// ];

const categories_data = [
  { id: '0', name: 'All Categories' },
  { id: 1, name: 'Men Shoes' },
];

const ModalSelectProducts = () => {
  const shopId = 143;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const refInput = React.useRef(null);
  const isOpen = useSelector((state) => state.product.isOpenModalSelectProducts);
  const selectedProducts = useSelector((state) => state.product.selectedProducts);

  const [doSearch, { on: onSearch, off: offSearch }] = useBoolean(false);
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState(categories_data[0]);
  const [selectAll, { toggle: toggleSelectAll, off: offSelectAll, on: onSelectAll }] =
    useBoolean(false);
  const [focus, { on: onFocus, off: offFocus }] = useBoolean(false);

  const [selectedItems, setSelectedItems] = React.useState([]);

  const headers = [t('products'), t('sales'), t('price'), t('stock')];

  React.useEffect(() => {
    (async () => {
      setCategories(categories_data);
    })();
  }, [categories_data]);

  React.useEffect(() => {
    (async () => {
      try {
        dispatch(setShowLoader(true));
        const res = await requestGetListShopProduct({
          id: shopId,
          page: 1,
          type: EProductType.STOCK,
        });

        if (res && res.code === EAppKey.MSG_SUCCESS && !isEmpty(res.dataProduct)) {
          setProducts(res.dataProduct);
        } else {
          NotificationManager.error({
            title: t('error'),
            message: t('no_data_exists'),
          });
        }
      } catch (e) {
        console.log('get products error', e);
      } finally {
        dispatch(setShowLoader(false));
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        let params = { id: shopId, page: 1, type: EProductType.STOCK };

        if (doSearch) {
          dispatch(setShowLoader(true));
          if (refInput.current.value) {
            params.keyWord = refInput.current.value;
          }

          const res = await requestGetListShopProduct(params);

          if (res.code === EAppKey.MSG_SUCCESS && !isEmpty(res.dataProduct)) {
            setProducts(res.dataProduct);
          } else {
            setProducts([]);
            NotificationManager.error({
              title: t('no_results_found'),
              message: t('no_results_found_for_your_search'),
            });
          }
        }
      } finally {
        offSearch();
        dispatch(setShowLoader(false));
      }
    })();
  }, [doSearch]);

  React.useEffect(() => {
    if (!isEmpty(selectedProducts) && isOpen) {
      setSelectedItems(selectedProducts);

      const areArraysEqual = _.isEqual(selectedProducts, products);

      if (!areArraysEqual) {
        return;
      }
      onSelectAll();
    } else {
      setSelectedItems([]);
      offSelectAll();
    }
  }, [selectedProducts, isOpen, products]);

  const onClose = React.useCallback(() => {
    dispatch(setModalSelectProducts(false));
    setSelectedItems([]);
    offSelectAll();
  }, []);
  2;
  const handleSelectAll = React.useCallback(() => {
    if (isEmpty(products)) {
      return;
    }

    toggleSelectAll();
    if (selectAll) {
      setSelectedItems(selectedProducts);
    } else {
      setSelectedItems(products);
    }
  }, [selectAll, products, selectedProducts]);

  const handleSelectItem = React.useCallback(
    (item) => {
      const exist = selectedItems && selectedItems.find((i) => i.id === item.id);
      if (exist) {
        const updatedProducts = selectedItems.filter((i) => i.id !== item.id);
        setSelectedItems(updatedProducts);

        const isEqual = _.isEqual(updatedProducts, products);
        if (isEqual && !selectAll) {
          return;
        }
        offSelectAll();
      } else {
        // If item is not selected, add it to the array
        if (!isEmpty(selectedItems)) {
          let _selectedItems = [...selectedItems, item];

          setSelectedItems(_selectedItems);

          const areArraysEqual = _.isEqualWith(_selectedItems, products, (obj1, obj2) => {
            return obj1.id === obj2.id;
          });
          if (!areArraysEqual) {
            return;
          }
          onSelectAll();
        } else {
          setSelectedItems([item]);
        }
      }
    },
    [selectedItems, products, selectAll]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick size="5xl">
      <ModalOverlay />
      <ModalContent p="2">
        <ModalHeader color="text-basic">{t('select_products')}</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'none' }} onClick={onClose} />
        <ModalBody>
          <HStack
            gap="8"
            flexDirection={{ base: 'column', lg: 'row' }}
            alignItems={{ base: 'unset', lg: 'center' }}
            justifyContent="space-between">
            <HStack gap="2">
              <Text textStyle="h3" color="text-basic">
                {t('category.category')}
              </Text>
              <Menu onClose={offFocus}>
                <MenuButton
                  bg="bg-1"
                  w="200px"
                  h="40px"
                  borderWidth="1px"
                  borderRadius="4px"
                  borderColor="border-5"
                  _hover={{ borderColor: 'border-3' }}
                  _active={{ bg: 'bg-1' }}
                  onClick={onFocus}>
                  <Flex flex="1" justifyContent="space-between" px="2" alignItems="center">
                    <Text noOfLines={1}>{category.name}</Text>
                    <Icon
                      color="text-basic"
                      as={focus ? ChevronUpIcon : ChevronDownIcon}
                      w="16px"
                      h="16px"
                    />
                  </Flex>
                </MenuButton>
                <MenuList>
                  {categories &&
                    categories.map((item, index) => {
                      return (
                        <MenuItem key={index} minH="48px" onClick={() => setCategory(item)}>
                          <span>{item.name}</span>
                        </MenuItem>
                      );
                    })}
                </MenuList>
              </Menu>
            </HStack>
            <HStack gap="2" flex="1">
              <Text textStyle="h3" color="text-basic">
                {t('search')}
              </Text>
              <Input ref={refInput} placeholder={t('input')} />
            </HStack>
          </HStack>
          <HStack mt="5" flex="1" gap="2">
            <Button
              w="80px"
              variant="primary"
              children={t('search')}
              size="sm"
              onClick={onSearch}
            />
            <Button
              w="80px"
              size="sm"
              variant="outline-control"
              children={t('reset')}
              onClick={() => {
                refInput.current.value = '';
                onSearch();
              }}
            />
          </HStack>
          <Text mt="4" color="text-basic" textStyle="h2">
            {t('products_found', { number: products.length })}
          </Text>
          <Box
            mt="4"
            overflow="auto"
            position="relative"
            minH={isEmpty(products) ? '300px' : 'unset'}
            borderWidth="1px"
            borderRadius="4"
            borderColor="border-5">
            <Table variant="simple" minW="4xl">
              <Thead h="52px" bg="bg-2">
                <Tr>
                  {headers.map((item, index) => {
                    return (
                      <Th
                        key={index}
                        borderBottomWidth="0px"
                        color="text-note"
                        textStyle="b-md"
                        w={index === 0 ? '40%' : '20%'}
                        textTransform="capitalize">
                        {index === 0 && (
                          <Checkbox isChecked={selectAll} onChange={handleSelectAll} mr="2" />
                        )}
                        {item}
                      </Th>
                    );
                  })}
                </Tr>
              </Thead>
              {isEmpty(products) ? (
                <EmptyListItem />
              ) : (
                products.map((item, index) => {
                  const isChecked = selectedItems && !!selectedItems.find((i) => i.id === item.id);
                  const isDisable =
                    selectedProducts && !!selectedProducts.find((i) => i.id === item.id);
                  return (
                    <SelectProductItem
                      item={item}
                      key={index}
                      isChecked={isChecked}
                      isLast={index === products.length - 1}
                      isDisable={isDisable}
                      onClick={() => handleSelectItem(item)}
                    />
                  );
                })
              )}
            </Table>
          </Box>
        </ModalBody>
        <ModalFooter>
          {!isEmpty(selectedItems) && (
            <Text color="text-body" textStyle="h2" mr="6">
              <Text color="text-basic" textStyle="h2-b" as="span">
                {selectedItems.length}
              </Text>{' '}
              product(s) selected (Max.{' '}
              <Text color="text-basic" textStyle="h2-b" as="span">
                10
              </Text>
              )
            </Text>
          )}
          <Button variant="outline-control" minW="80px" size="sm" mr="4" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button
            variant="primary"
            disabled={isEmpty(selectedItems)}
            minW="80px"
            size="sm"
            onClick={() => {
              dispatch(setSelectedProducts(selectedItems));
              dispatch(setModalSelectProducts(false));
            }}>
            {t('confirm')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalSelectProducts;
