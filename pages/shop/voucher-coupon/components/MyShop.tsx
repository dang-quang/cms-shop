import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import TableAllMyShop from './TableAllMyShop';
import TableHappeningMyShop from './TableHappeningMyShop';
import TableUpcomingMyShop from './TableUpcomingMyShop';
import TableFinishedMyShop from './TableFinishedMyShop';

const MyShop = () => {
  const { t } = useTranslation();

  const tabs = [t('all'), t('happening'), t('upcoming'), t('finished')];

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
            <TableAllMyShop />
          </TabPanel>
          <TabPanel p="0">
            <TableHappeningMyShop />
          </TabPanel>
          <TabPanel p="0">
            <TableUpcomingMyShop />
          </TabPanel>
          <TabPanel p="0">
            <TableFinishedMyShop />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MyShop;
