import React from 'react';
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
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
import { AiOutlineSearch } from 'react-icons/ai';
import _, { isEmpty } from 'lodash';
import SelectProductItem from './SelectProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { setModalSelectProducts, setSelectedProducts } from 'redux/actions/product';
import Images from 'assets';

const data = [
  {
    id: 23744991650,
    name: 'Polo',
    image:
      'https://user-images.githubusercontent.com/42206067/244660279-c5cfa99d-67dc-45de-82f1-e7c660b06d74.png',
    sales: 0,
    price: 200000,
    stock: 423,
  },
  {
    id: 23744991651,
    name: 'Mangto',
    image:
      'https://user-images.githubusercontent.com/42206067/244660267-bfb9dba1-1bc6-4792-a1e8-139eb3bf35bd.png',
    sales: 0,
    price: 1000000,
    stock: 1120,
  },
];

const categories_data = [
  { id: '0', name: 'All Categories' },
  { id: 1, name: 'Men Shoes' },
];

const ModalSelectProducts = () => {
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

  React.useEffect(() => {
    (async () => {
      setProducts(data);
      setCategories(categories_data);
    })();
  }, [data, categories_data]);

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
      const exist = selectedItems.find((i) => i.id === item.id);
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

          const areArraysEqual = _.isEqualWith(arr, products, (obj1, obj2) => {
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
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick size="6xl">
      <ModalOverlay />
      <ModalContent p="2">
        <ModalHeader color="text-basic">Select Products</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'none' }} onClick={onClose} />
        <ModalBody>
          <Flex
            flexDirection={{ base: 'column', lg: 'row' }}
            alignItems={{ base: 'unset', lg: 'center' }}
            justifyContent="space-between">
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
            <HStack
              mt={{ base: '6', lg: 'unset' }}
              flex="1"
              gap="4"
              justifyContent={{ base: 'unset', lg: 'flex-end' }}>
              <InputGroup maxW="570px" borderRadius="4px" overflow="hidden">
                <Input ref={refInput} placeholder="Search product name, id" />
                <InputRightElement
                  borderRadius="4px"
                  cursor="pointer"
                  h="full"
                  bg="primary.100"
                  w="100px">
                  <Center onClick={onSearch}>
                    <Icon as={AiOutlineSearch} w="24px" h="24px" color="white" />
                  </Center>
                </InputRightElement>
              </InputGroup>
              <Button
                w="100px"
                variant="outline-control"
                children="Reset"
                onClick={() => {
                  refInput.current.value = '';
                  onSearch();
                }}
              />
            </HStack>
          </Flex>
          <Box
            mt="8"
            overflow="auto"
            position="relative"
            minH={isEmpty(products) ? '300px' : 'unset'}
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
                    <Checkbox isChecked={selectAll} onChange={handleSelectAll} mr="2" />
                    Products
                  </Th>
                  <Th
                    borderBottomWidth="0px"
                    color="text-note"
                    textStyle="b-md"
                    textTransform="capitalize">
                    Sales
                  </Th>
                  <Th
                    borderBottomWidth="0px"
                    color="text-note"
                    textStyle="b-md"
                    textTransform="capitalize">
                    Price
                  </Th>
                  <Th
                    borderBottomWidth="0px"
                    color="text-note"
                    textStyle="b-md"
                    textTransform="capitalize">
                    Stock
                  </Th>
                </Tr>
              </Thead>
              {isEmpty(products) ? (
                <Box minH="220px" position="absolute" insetX="0">
                  <Center
                    h="220px"
                    position="absolute"
                    insetX="0"
                    flexDirection="column"
                    alignSelf="center">
                    <Image w="150px" h="100px" src={Images.no_data} />
                    <Text textStyle="body" textAlign="center" color="primary.100" mt="1">
                      No products found
                    </Text>
                  </Center>
                </Box>
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
          <Button variant="outline-control" minW="150px" mr="4" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button
            variant="primary"
            disabled={isEmpty(selectedItems)}
            minW="150px"
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
