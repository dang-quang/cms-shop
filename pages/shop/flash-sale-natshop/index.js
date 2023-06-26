import React from 'react';
import Admin from 'layouts/Admin.js';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import TableAll from './components/TableAll';
import TableWait from './components/TableWait';
import TableRegistered from './components/TableRegistered';

function FlashSaleNatShopPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const tabs = ['All', 'Awaiting Registration', 'Registered'];

  return (
    <Box>
      <Text textStyle="h6-sb" color="text-basic" mt="4">
        Flash Sale NatShop
      </Text>
      <Tabs variant="soft-rounded" mt="8">
        <Flex justifyContent="space-between">
          <TabList h="48px" w="full" borderBottomWidth="1px" borderBottomColor="border-5">
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
                  fontWeight: '600',
                  color: 'primary.100',
                  borderBottomWidth: '3px',
                  borderBottomColor: 'primary.100',
                }}
                color="text-basic">
                {name}
              </Tab>
            ))}
          </TabList>
        </Flex>
        <TabPanels mt="6">
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
