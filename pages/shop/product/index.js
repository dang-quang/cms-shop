import React from 'react';
import Admin from 'layouts/Admin.js';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { WithAuthentication, ModalSelectCategory } from 'components';
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Input,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import TableAll from './components/TableAll';
import TableLive from './components/TableLive';
import TableSoldOut from './components/TableSoldOut';
import TableDelist from './components/TableDelist';

import { HiPlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetSearchProduct,
  setDoSearchProduct,
  setSearchProductCategory,
  setSearchProductName,
  setSearchProductStockMax,
  setSearchProductStockMin,
  setSelectedCategory,
  setSelectedCategorySearch,
} from 'redux/actions/product';
import TableReviewing from './components/TableReviewing';
import { requestGetListCategoryShop } from 'utilities/ApiShop';
import { EAppKey } from 'constants/types';
import { IconEdit } from 'components/Icons/Icons';
import { isEmpty } from 'lodash';
import { setLoading, setShopProductTabIndex } from 'redux/actions/app';
import { parseNumber } from 'utilities/parseNumber';

function ShopProducts() {
  const shopId = 143;
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const tabs = [t('all'), t('live'), t('sold_out'), t('reviewing'), t('de_listed')];

  const inputName = React.useRef();
  const [stockMin, setStockMin] = React.useState();
  const [stockMax, setStockMax] = React.useState();
  const selectedCategorySearch = useSelector((state) => state.product.selectedCategorySearch);
  const index = useSelector((state) => state.app.selectedProductTabIndex);

  const [categories, setCategories] = React.useState([]);
  const {
    isOpen: isOpenCategory,
    onOpen: onOpenCategory,
    onClose: onCloseCategory,
  } = useDisclosure();

  React.useEffect(() => {
    (async () => {
      const res = await requestGetListCategoryShop({ id: shopId });
      if (res && res.code === EAppKey.MSG_SUCCESS) {
        setCategories(res.categoryList);
      }
    })();
  }, []);

  React.useEffect(() => {
    const handleRouteChange = () => {
      dispatch(setSelectedCategorySearch([]));
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mt="4">
        <Text textStyle="h6-sb" color="text-basic">
          {t('shop_product.my_products')}
        </Text>
        <Button
          leftIcon={<HiPlus />}
          variant="primary"
          children={t('shop_product.add_new_product')}
          onClick={() => {
            dispatch(setSelectedCategory([]));
            router.push('/shop/product/add');
          }}
        />
      </Flex>
      <Box bg="bg-1" p="6" borderRadius="4px" mt="6">
        <SimpleGrid gap="6" columns={{ base: 1, lg: 2 }}>
          <HStack gap="2">
            <Text textStyle="h3" color="text-basic" flex="1">
              {t('product_name')}
            </Text>
            <Box flex="9">
              <Input ref={inputName} placeholder="Please input at least 2 character" />
            </Box>
          </HStack>
          <HStack gap="2">
            <Text textStyle="h3" color="text-basic" flex="1">
              {t('shop_product.category')}
            </Text>
            <Flex
              flex="9"
              borderWidth="1px"
              borderColor="border-5"
              cursor="pointer"
              onClick={onOpenCategory}
              borderRadius="4px"
              h="40px"
              _hover={{ borderColor: 'border-3' }}
              alignItems="center">
              <Box flex="1" px="4">
                {selectedCategorySearch && selectedCategorySearch.length > 0 ? (
                  selectedCategorySearch.map((item, index) => (
                    <Text as="span" key={index}>
                      <Text as="span" textStyle="h4" color="text-basic" key={index}>
                        {item && item.selectedCategory ? `${item.selectedCategory.name} ` : ''}
                        {index < selectedCategorySearch.length - 1 &&
                        selectedCategorySearch[index + 1] &&
                        selectedCategorySearch[index + 1].selectedCategory
                          ? '> '
                          : ''}
                      </Text>
                    </Text>
                  ))
                ) : (
                  <Text textStyle="h4" color="text-placeholder">
                    {t('shop_product.please_set_category')}
                  </Text>
                )}
              </Box>
              <Center w="40px">
                <Icon as={IconEdit} w="20px" h="20px" color="text-body" />
              </Center>
            </Flex>
          </HStack>
        </SimpleGrid>
        <SimpleGrid gap="6" columns={{ base: 1, lg: 2 }} mt="5">
          <HStack gap="2" flex="1">
            <Text textStyle="h3" color="text-basic" flex="1">
              {t('stock')}
            </Text>
            <Box flex="9">
              <HStack gap="1" flex="1">
                <NumberInput
                  flex="1"
                  value={stockMin}
                  onChange={(e) => setStockMin(parseNumber(e))}>
                  <NumberInputField placeholder={t('min')} />
                </NumberInput>
                <Box h="1px" w="1" bg="border-3" />
                <NumberInput
                  flex="1"
                  value={stockMax}
                  onChange={(e) => setStockMax(parseNumber(e))}>
                  <NumberInputField placeholder={t('max')} />
                </NumberInput>
              </HStack>
            </Box>
          </HStack>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, lg: 2 }} mt="5">
          <HStack gap="2">
            <Box flex="1" />
            <Box flex="9">
              <HStack gap="2">
                <Button
                  size="sm"
                  variant="primary"
                  children={t('search')}
                  w="80px"
                  onClick={() => {
                    dispatch(setSearchProductName(inputName.current.value));

                    if (stockMin) {
                      dispatch(setSearchProductStockMin(stockMin));
                    }
                    if (stockMax) {
                      dispatch(setSearchProductStockMax(stockMax));
                    }
                    if (!isEmpty(selectedCategorySearch)) {
                      let id =
                        selectedCategorySearch[selectedCategorySearch.length - 1].selectedCategory
                          .id;
                      dispatch(setSearchProductCategory(id));
                    }
                    dispatch(setDoSearchProduct(true));
                  }}
                />
                <Button
                  size="sm"
                  variant="outline-control"
                  children={t('reset')}
                  w="80px"
                  onClick={() => {
                    inputName.current.value = '';
                    setStockMin('');
                    setStockMax('');
                    dispatch(resetSearchProduct());
                  }}
                />
              </HStack>
            </Box>
          </HStack>
        </SimpleGrid>
      </Box>
      <Tabs
        variant="soft-rounded"
        mt="8"
        bg="bg-1"
        pb="4"
        borderRadius="4px"
        position="relative"
        isLazy
        index={index}
        onChange={(e) => {
          dispatch(setLoading(true));
          dispatch(setShopProductTabIndex(e));
          setTimeout(() => {
            dispatch(setLoading(false));
          }, 2000);
        }}>
        <TabList w="full" borderBottomWidth="1px" borderBottomColor="border-5" px="6" pt="4">
          {tabs.map((name, index) => (
            <Tab
              key={index}
              fontSize="14px"
              fontWeight="400"
              borderRadius="unset"
              textTransform="capitalize"
              borderBottomWidth="1px"
              borderBottomColor="transparent"
              _focus={{ showBox: 'none' }}
              _selected={{
                fontWeight: '500',
                color: 'primary.100',
                borderBottomWidth: '3px',
                borderBottomColor: 'primary.100',
              }}
              color="text-basic">
              {name}
            </Tab>
          ))}
        </TabList>
        <TabPanels p="6">
          <TabPanel p="0">
            <TableAll />
          </TabPanel>
          <TabPanel p="0">
            <TableLive />
          </TabPanel>
          <TabPanel p="0">
            <TableSoldOut />
          </TabPanel>
          <TabPanel p="0">
            <TableReviewing />
          </TabPanel>
          <TabPanel p="0">
            <TableDelist />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ModalSelectCategory
        title={t('select_category')}
        data={categories}
        isOpen={isOpenCategory}
        selectedItem={selectedCategorySearch}
        onClose={onCloseCategory}
        onCloseSelected={(e) => dispatch(setSelectedCategorySearch(e))}
        onConfirm={(e) => dispatch(setSelectedCategorySearch(e))}
      />
    </Box>
  );
}

ShopProducts.layout = Admin;

export default WithAuthentication(ShopProducts);
