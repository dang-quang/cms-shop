import React from 'react';
import Admin from 'layouts/Admin.js';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';

import MyShop from './components/MyShop';
import NatShop from './components/NatShop';
import { HiPlus } from 'react-icons/hi';

function VoucherCoupon() {
  const router = useRouter();
  const { t } = useTranslation();

  const tabs = [t('my_shop'), t('nat_shop')];

  return (
    <Box>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mt="4"
        onClick={() => router.push('/shop/voucher-coupon/add')}>
        <Text textStyle="h6-sb" color="text-basic">
          {t('vouchers')}
        </Text>
        <Button leftIcon={<HiPlus />} variant="primary" children={t('voucher.add_voucher')} />
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
        <TabPanels mt="6" pl="8">
          <TabPanel p="0">
            <MyShop />
          </TabPanel>
          <TabPanel p="0">
            <NatShop />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

VoucherCoupon.layout = Admin;

export default WithAuthentication(VoucherCoupon);
