import React from 'react';
import Admin from 'layouts/Admin.js';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import TableAll from './components/TableAll';
import TableWait from './components/TableWait';
import TableRegistered from './components/TableRegistered';

function FlashSaleNatShopPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const tabs = ['All', 'Wait for confirmation', 'Registered'];

  return (
    <Box>
      <Tabs variant="soft-rounded" mt="8">
        <Flex justifyContent="space-between">
          <TabList w="auto" mb="16px" borderRadius="full" bg="white" p="1">
            {tabs.map((name, index) => (
              <Tab
                key={index}
                borderRadius="full"
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
          {/* <Button
            variant="primary"
            children="Add Voucher"
            onClick={() => router.push('/admin/voucher/add')}
          /> */}
        </Flex>
        <TabPanels>
          <TabPanel p="0">
            <TableAll />
          </TabPanel>
          <TabPanel p="0">
            <TableWait />
          </TabPanel>
          <TabPanel p="0">
            <TableRegistered />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

FlashSaleNatShopPage.layout = Admin;

export default WithAuthentication(FlashSaleNatShopPage);
