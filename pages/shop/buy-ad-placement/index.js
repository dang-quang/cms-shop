import React from 'react';
import Admin from 'layouts/Admin.js';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import TableAll from './components/TableAll';
import WaitConfirm from './components/WaitConfirm';
import Registered from './components/Registered';
function BuyAdPlacement() {
  const router = useRouter();
  const { t } = useTranslation();

  const tabs = ['All', 'Awaiting Registration', 'Registered'];

  return (
    <Box>
      <Text style={{ fontSize: 22, fontWeight: 'lighter' }}>Danh sách ad placement</Text>
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
        <TabPanels>
          <TabPanel>
            <TableAll type={1} />
          </TabPanel>
          <TabPanel>
            <TableAll type={2} />
          </TabPanel>
          <TabPanel>
            <TableAll type={3} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

BuyAdPlacement.layout = Admin;

export default WithAuthentication(BuyAdPlacement);
