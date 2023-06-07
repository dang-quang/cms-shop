import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import TableAllMyShop from './TableAllMyShop';

const MyShop = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const tabs = ['All', 'Happening', 'Upcoming', 'Finished'];

  return (
    <Box>
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
            <TableAllMyShop />
          </TabPanel>
          {/* <TabPanel p="0">
            <TableAwaitingRegistration />
          </TabPanel> */}
          {/* <TabPanel p="0">
            <TableRegistered />
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MyShop;
