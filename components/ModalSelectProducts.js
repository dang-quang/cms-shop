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
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useBoolean,
  useToast,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import _, { isEmpty } from 'lodash';
import SelectProductItem from './SelectProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { setModalSelectProducts, setSelectedProducts } from 'redux/actions/product';
import { setShowLoader } from 'redux/actions/app';
import { EAppKey, EProductType } from 'constants/types';
import EmptyListItem from './EmptyListItem';
import { usePagination } from '@ajna/pagination';
import { PaginationPanel } from 'components';
import { RiArrowRightSLine } from 'react-icons/ri';

import { requestGetListCategoryShop, requestGetListShopProduct } from 'utilities/ApiShop';

const ModalSelectProducts = () => {
  const shopId = 143;
  const pageSize = 10;
  const toast = useToast();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const refInput = React.useRef(null);
  const isOpen = useSelector((state) => state.product.isOpenModalSelectProducts);
  const selectedProducts = useSelector((state) => state.product.selectedProducts);

  const [doSearch, { on: onSearch, off: offSearch }] = useBoolean(false);
  const [products, setProducts] = React.useState([]);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState();
  const [selectAll, { toggle: toggleSelectAll, off: offSelectAll, on: onSelectAll }] =
    useBoolean(false);
  const [focus, { on: onFocus, off: offFocus }] = useBoolean(false);

  const [selectedItems, setSelectedItems] = React.useState([]);

  const headers = [t('products'), t('sales'), t('price'), t('stock')];

  const { pages, pagesCount, currentPage, setCurrentPage, isDisabled } = usePagination({
    total: totalRecords,
    limits: {
      outer: 1,
      inner: 2,
    },
    initialState: {
      pageSize: pageSize,
      isDisabled: false,
      currentPage: 1,
    },
  });

  React.useEffect(() => {
    (async () => {
      const res = await requestGetListCategoryShop({ id: shopId, type: EProductType.STOCK });

      if (res && res.code === EAppKey.MSG_SUCCESS) {
        setCategories([{ list: res.categoryList }]);
      }
    })();
  }, []);

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
          setTotalRecords(res.totalProduct);
        } else {
          toast({
            position: 'top',
            title: t('no_data_exists'),
            status: 'error',
            duration: 2000,
            isClosable: true,
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
        let params = { id: shopId, page: currentPage, type: EProductType.STOCK };

        if (doSearch) {
          dispatch(setShowLoader(true));
          if (refInput.current.value) {
            params.keyWord = refInput.current.value;
          }

          if (category) {
            params.categoryId = category.id;
          }

          const res = await requestGetListShopProduct(params);

          if (res.code === EAppKey.MSG_SUCCESS && !isEmpty(res.dataProduct)) {
            setProducts(res.dataProduct);
            setTotalRecords(res.totalProduct);
          } else {
            setProducts([]);
            toast({
              position: 'top',
              title: t('no_results_found'),
              description: t('no_results_found_for_your_search'),
              status: 'error',
              duration: 2000,
              isClosable: true,
            });
          }
        }
      } finally {
        offSearch();
        dispatch(setShowLoader(false));
      }
    })();
  }, [doSearch, currentPage, category, refInput.current]);

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

  const handleSelectAll = React.useCallback(() => {
    if (isEmpty(products)) {
      return;
    }

    toggleSelectAll();

    if (!selectAll) {
      // If "Select All" is enabled
      const selectedCount = selectedItems.length;

      if (selectedCount >= 10) {
        return;
      }

      const updatedItems = [...selectedItems];

      products.forEach((item) => {
        const exist = updatedItems.some((i) => i.id === item.id);

        if (!exist && updatedItems.length < 10) {
          updatedItems.push(item);
        }
      });

      setSelectedItems(updatedItems);
    } else {
      // If "Select All" is disabled
      setSelectedItems([]);
    }
  }, [selectAll, products, selectedItems]);

  const handleSelectItem = React.useCallback(
    (item) => {
      const isSelected = selectedItems.some((i) => i.id === item.id);

      if (isSelected) {
        const updatedItems = selectedItems.filter((i) => i.id !== item.id);
        setSelectedItems(updatedItems);
        offSelectAll();
      } else {
        if (selectedItems.length >= 10) {
          return;
        }

        const updatedItems = [...selectedItems, item];
        setSelectedItems(updatedItems);

        const areAllItemsSelected = updatedItems.length === products.length;
        if (areAllItemsSelected) {
          onSelectAll();
        }
      }
    },
    [selectedItems, products, onSelectAll]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick size="6xl">
      <ModalOverlay />
      <ModalContent p="2" h="4xl">
        <ModalHeader color="text-basic">{t('select_products')}</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'none' }} onClick={onClose} />
        <ModalBody>
          <HStack
            gap="8"
            flexDirection={{ base: 'column', lg: 'row' }}
            alignItems={{ base: 'unset', lg: 'center' }}
            justifyContent="space-between">
            <HStack gap="2" flex="3">
              <Text textStyle="h3" color="text-basic">
                {t('category.category')}
              </Text>
              <Menu isOpen={focus} onClose={offFocus}>
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
                    <Text noOfLines={1}>{category ? category.name : 'All Categories'}</Text>
                    <Icon
                      color="text-basic"
                      as={focus ? ChevronUpIcon : ChevronDownIcon}
                      w="16px"
                      h="16px"
                    />
                  </Flex>
                </MenuButton>
                <MenuList
                  display="flex"
                  flexDirection="row"
                  bg="transparent"
                  py="0"
                  p="0"
                  shadow="none"
                  boxShadow="none"
                  border="none">
                  {categories &&
                    categories.map((item, index) => {
                      const { list } = item;
                      return (
                        <MenuList key={index} borderRadius="0px" shadow="none" boxShadow="none">
                          {list &&
                            list.length > 0 &&
                            list.map((i, idx) => {
                              return (
                                <MenuItem
                                  item={i}
                                  key={idx}
                                  minH="32px"
                                  onMouseEnter={() => {
                                    let updatedCategories = [...categories];

                                    // Remove additional levels
                                    updatedCategories = updatedCategories.slice(0, index + 1);

                                    if (!isEmpty(i.listChild)) {
                                      // Add the selected category to the next level
                                      updatedCategories.push({ list: i.listChild });
                                    }

                                    // Update the selected category at the current level
                                    updatedCategories[index].selectedCategory = i;

                                    setCategories(updatedCategories);
                                  }}
                                  onClick={() => {
                                    if (!isEmpty(i.listChild)) {
                                      onFocus();
                                    } else {
                                      setCategory(i);
                                      offFocus();
                                    }
                                  }}>
                                  <Flex
                                    h="32px"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    flex="1">
                                    <Text
                                      textStyle={item.selectedCategory === i ? 'h3-b' : 'h3'}
                                      color={
                                        item.selectedCategory === i ? 'text-primary' : 'basic'
                                      }>
                                      {i.name}
                                    </Text>
                                    {!isEmpty(i.listChild) && (
                                      <Icon
                                        as={RiArrowRightSLine}
                                        w="16px"
                                        h="16px"
                                        color={
                                          item.selectedCategory === i ? 'text-primary' : 'text-body'
                                        }
                                      />
                                    )}
                                  </Flex>
                                </MenuItem>
                              );
                            })}
                        </MenuList>
                      );
                    })}
                </MenuList>
              </Menu>
            </HStack>
            <HStack gap="2" flex="7">
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
                setCategory(null);
                refInput.current.value = '';
                onSearch();
              }}
            />
          </HStack>
          <Box
            mt="4"
            overflow="auto"
            position="relative"
            minH={isEmpty(products) ? '300px' : 'unset'}
            borderWidth="1px"
            borderRadius="4"
            borderColor="border-5"
            maxH="600px">
            <Table variant="simple" minW="4xl" maxH="4xl" overflow="auto">
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
              <Tbody overflow="auto" maxH="4xl">
                {isEmpty(products) ? (
                  <EmptyListItem />
                ) : (
                  products.map((item, index) => {
                    const isChecked =
                      selectedItems && !!selectedItems.find((i) => i.id === item.id);
                    const isDisable =
                      selectedProducts && !!selectedProducts.find((i) => i.id === item.id);
                    return (
                      <SelectProductItem
                        item={item}
                        key={index}
                        isChecked={isChecked}
                        //isLast={index === products.length - 1}
                        isDisable={isDisable}
                        onClick={() => handleSelectItem(item)}
                      />
                    );
                  })
                )}
              </Tbody>
            </Table>
            <Flex justifyContent="flex-end" mt="24px" mb="8px">
              <PaginationPanel
                alignSelf="flex-end"
                pagesCount={pagesCount}
                currentPage={currentPage}
                isDisabled={isDisabled}
                onPageChange={(page) => {
                  setMessages([]);
                  setCurrentPage(page);
                }}
                pages={pages}
              />
            </Flex>
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
