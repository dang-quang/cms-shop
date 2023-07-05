import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import TableAllNatShop from './TableAllNatShop';
import TableHappeningNatShop from './TableHappeningNatShop';
import TableUpcomingNatShop from './TableUpcomingNatShop';
import TableFinishedNatShop from './TableFinishedNatShop';

const NatShop = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const tabs = [t('all'), t('happening'), t('upcoming'), t('finished')];

  return (
    <Box>
      <Tabs variant="soft-rounded" mt="4">
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
        <TabPanels mt="6">
          <TabPanel p="0">
            <TableAllNatShop />
          </TabPanel>
          <TabPanel p="0">
            <TableHappeningNatShop />
          </TabPanel>
          <TabPanel p="0">
            <TableUpcomingNatShop />
          </TabPanel>
          <TabPanel p="0">
            <TableFinishedNatShop />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default NatShop;
