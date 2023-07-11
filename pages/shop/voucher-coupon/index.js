import React from 'react';
import Admin from 'layouts/Admin.js';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';

import MyShop from './components/MyShop';
import NatShop from './components/NatShop';

import { HiPlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { WithAuthentication } from 'components';
import { setShopVoucherTabIndex } from 'redux/actions/app';

function VoucherCoupon() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const tabs = [t('my_shop'), t('nat_shop')];

  const index = useSelector((state) => state.app.shopVoucherTabIndex);

  return (
    <Box>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mt="4"
        h="10"
        onClick={() => router.push('/shop/voucher-coupon/add')}>
        <Text textStyle="h6-sb" color="text-basic">
          {t('vouchers')}
        </Text>
        {index === 0 && (
          <Button leftIcon={<HiPlus />} variant="primary" children={t('voucher.add_voucher')} />
        )}
      </Flex>
      <Box mt="8" bg="bg-1" borderRadius="4px" px="6" py="4">
        <Tabs
          variant="soft-rounded"
          index={index}
          onChange={(e) => dispatch(setShopVoucherTabIndex(e))}>
          <TabList w="full" borderBottomWidth="1px" borderBottomColor="border-5">
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
          <TabPanels mt="6" pl="8">
            <TabPanel p="0" key="MY_SHOP">
              <MyShop />
            </TabPanel>
            <TabPanel p="0" key="NAT_SHOP">
              <NatShop />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

VoucherCoupon.layout = Admin;

export default WithAuthentication(VoucherCoupon);
