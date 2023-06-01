import React from 'react';
import Admin from 'layouts/Admin.js';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import TableAll from './components/TableAll';
import TableHappening from './components/TableHappening';
import TableUpcoming from './components/TableUpcoming';
import TableFinished from './components/TableFinished';

function VoucherPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const tabs = ['All', 'Happening', 'Upcoming', 'Finished'];

  return (
    <Box>
      <Tabs display={{ base: 'none', xl: 'block' }} variant="soft-rounded" mt="8">
        <Flex justifyContent="space-between">
          <TabList w="auto" mb="16px">
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
          <Button
            variant="primary"
            children="Add Voucher"
            onClick={() => router.push('/admin/voucher/add')}
          />
        </Flex>
        <TabPanels>
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
