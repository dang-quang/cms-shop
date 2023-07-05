import React from 'react';
import Admin from 'layouts/Admin.js';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import TableAll from './components/TableAll';
import TableHappening from './components/TableHappening';
import TableUpcoming from './components/TableUpcoming';
import TableFinished from './components/TableFinished';
import { HiPlus } from 'react-icons/hi';
import { WithAuthentication } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setShopPlashSaleTabIndex } from 'redux/actions/app';
import { EFlashSaleStatus } from 'constants/types';

function VoucherPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const tabs = [t('all'), t('happening'), t('upcoming'), t('finished')];

  const index = useSelector((state) => state.app.selectedFlashSaleTabIndex);

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mt="4">
        <Text textStyle="h6-sb" color="text-basic">
          {t('flash_sale_shop.shop_flash_sale')}
        </Text>
        <Button
          leftIcon={<HiPlus />}
          variant="primary"
          children={t('create')}
          onClick={() => router.push('/shop/flash-sale-shop/create')}
        />
      </Flex>
      <Box mt="8" bg="bg-1" borderRadius="4px" px="6" py="4">
        <Tabs
          isLazy
          variant="soft-rounded"
          index={index}
          onChange={(e) => {
            dispatch(setLoading(true));
            dispatch(setShopPlashSaleTabIndex(e));
            setTimeout(() => {
              dispatch(setLoading(false));
            }, 2000);
          }}>
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
          <TabPanels mt="6" key="ALL">
            <TabPanel p="0">
              <TableAll />
            </TabPanel>
            <TabPanel p="0" key={EFlashSaleStatus.HAPPENING}>
              <TableHappening />
            </TabPanel>
            <TabPanel p="0" key={EFlashSaleStatus.UPCOMING}>
              <TableUpcoming />
            </TabPanel>
            <TabPanel p="0" key={EFlashSaleStatus.FINISHED}>
              <TableFinished />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

VoucherPage.layout = Admin;

export default WithAuthentication(VoucherPage);
