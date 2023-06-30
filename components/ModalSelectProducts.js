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
import { requestGetListCategoryShop, requestGetListShopProduct } from 'utilities/ApiShop';
import EmptyListItem from './EmptyListItem';
import { usePagination } from '@ajna/pagination';
import { PaginationPanel } from 'components';

const ModalSelectProducts = () => {
  const shopId = 143;
  const pageSize = 10;
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
        setCategories(res.categoryList);
        console.log('quang debug rres', res.categoryList);
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
        let params = { id: shopId, page: currentPage, type: EProductType.STOCK, pagesize: 20 };

        if (doSearch) {
          dispatch(setShowLoader(true));
          if (refInput.current.value) {
            params.keyWord = refInput.current.value;
          }

          const res = await requestGetListShopProduct(params);

          if (res.code === EAppKey.MSG_SUCCESS && !isEmpty(res.dataProduct)) {
            setProducts(res.dataProduct);
            setTotalRecords(res.totalProduct);
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
  }, [doSearch, currentPage]);

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
                    <Text noOfLines={1}>{category ? category.name : 'All Categories'}</Text>
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
