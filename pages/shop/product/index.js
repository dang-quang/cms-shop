import React from 'react';
import Admin from 'layouts/Admin.js';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { WithAuthentication } from 'components';
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';

import TableAll from './components/TableAll';
import TableLive from './components/TableLive';
import TableSoldOut from './components/TableSoldOut';
import TableDelist from './components/TableDelist';

import { HiPlus } from 'react-icons/hi';

function ShopProducts() {
  const router = useRouter();
  const { t } = useTranslation();

  const tabs = [t('all'), t('live'), t('sold_out'), t('de_listed')];

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
      <Tabs variant="soft-rounded" mt="8" bg="bg-1" borderRadius="4px" position="relative">
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
            <TableDelist />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

ShopProducts.layout = Admin;

export default WithAuthentication(ShopProducts);
