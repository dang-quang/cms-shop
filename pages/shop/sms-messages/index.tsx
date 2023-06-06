import React from 'react';
import Admin from 'layouts/Admin.js';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';

import TableAll from './components/TableAll';
import TableAwaitingRegistration from './components/TableAwaitingRegistration';
import TableRegistered from './components/TableRegistered';

function SMSMessages() {
  const router = useRouter();
  const { t } = useTranslation();

  const tabs = ['All', 'Awaiting Registration', 'Registered'];

  return (
    <Box>
      <Text textStyle="h6-sb" color="text-basic" mt="4">
        SMS Package List
      </Text>
      <Tabs variant="soft-rounded" mt="4">
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
                  fontWeight: '500',
                  color: 'primary.100',
                  borderBottomWidth: '1px',
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
            <TableAwaitingRegistration />
          </TabPanel>
          <TabPanel p="0">
            <TableRegistered />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

SMSMessages.layout = Admin;

export default WithAuthentication(SMSMessages);
