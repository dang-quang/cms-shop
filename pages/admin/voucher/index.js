import React from 'react';
import Admin from 'layouts/Admin.js';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import TableAll from './components/TableAll';
import TableHappening from './components/TableHappening';
import TableUpcoming from './components/TableUpcoming';
import TableFinished from './components/TableFinished';
import { HiPlus } from 'react-icons/hi';

function VoucherPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const tabs = ['All', 'Happening', 'Upcoming', 'Finished'];

  return (
    <Box>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mt="4"
        onClick={() => router.push('/admin/voucher/add')}>
        <Text textStyle="h6-sb" color="text-basic">
          Voucher
        </Text>
        <Button leftIcon={<HiPlus />} variant="primary" children="Add Voucher" />
      </Flex>
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
        <TabPanels mt="6">
          <TabPanel p="0">
            <TableAll />
          </TabPanel>
          <TabPanel p="0">
            <TableHappening />
          </TabPanel>
          <TabPanel p="0">
            <TableUpcoming />
          </TabPanel>
          <TabPanel p="0">
            <TableFinished />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

VoucherPage.layout = Admin;

export default WithAuthentication(VoucherPage);
