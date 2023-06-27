import React from 'react';
import Admin from 'layouts/Admin.js';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { WithAuthentication } from 'components';
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import TableAll from './components/TableAll';
import TableLive from './components/TableLive';
import TableSoldOut from './components/TableSoldOut';
import TableDelist from './components/TableDelist';

import { HiPlus } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import {
  resetSearchProduct,
  setDoSearchProduct,
  setSearchProductName,
  setSearchProductStockMax,
  setSearchProductStockMin,
} from 'redux/actions/product';
import TableReviewing from './components/TableReviewing';

function ShopProducts() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const tabs = [t('all'), t('live'), t('sold_out'), t('reviewing'), t('de_listed')];

  const inputName = React.useRef();
  const inputStockMin = React.useRef();
  const inputStockMax = React.useRef();

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
          onClick={() => router.push('/shop/product/add')}
        />
      </Flex>
      <Box bg="bg-1" p="6" borderRadius="4px" mt="6">
        <Input ref={inputName} placeholder={t('search_product_name')} w="50%" />
        <HStack gap="1" w="50%" borderRadius="4px" mt="5" alignItems="center">
          <Text textStyle="h3" color="text-basic" mr="4">
            {t('stock')}
          </Text>
          <NumberInput flex="1">
            <NumberInputField ref={inputStockMin} placeholder="Min" />
          </NumberInput>
          <Box h="1px" w="1" bg="border-3" />
          <NumberInput flex="1">
            <NumberInputField ref={inputStockMax} placeholder="Max" />
          </NumberInput>
        </HStack>
        <HStack mt="5" gap="2">
          <Button
            size="sm"
            variant="primary"
            children={t('search')}
            w="80px"
            onClick={() => {
              dispatch(setSearchProductName(inputName.current.value));

              if (inputStockMin.current.value) {
                dispatch(setSearchProductStockMin(inputStockMin.current.value));
              }
              if (inputStockMin.current.value) {
                dispatch(setSearchProductStockMax(inputStockMax.current.value));
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
              inputStockMin.current.value = '';
              inputStockMax.current.value = '';
              dispatch(resetSearchProduct());
            }}
          />
        </HStack>
      </Box>
      <Tabs variant="soft-rounded" mt="8" bg="bg-1" pb="4" borderRadius="4px" position="relative">
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
    </Box>
  );
}

ShopProducts.layout = Admin;

export default WithAuthentication(ShopProducts);
