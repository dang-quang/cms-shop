import React from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RangeDatePickerItem, WithAuthentication } from 'components';

import TableAllNatShop from './components/TableAllNatShop';
import TableRegisteredNatShop from './components/TableRegisteredNatShop';
import TableReviewingNatShop from './components/TableReviewingNatShop';

import { setLoading } from 'redux/actions/app';

import { EFlashSaleRegisterStatus } from 'constants/types';
import {
  resetSearchProgramFlashSale,
  setDoSearchFlashSale,
  setNatShopFlashSaleTabIndex,
  setSearchProgramFlashSaleDate,
  setSearchProgramFlashSaleName,
} from 'redux/actions/flashSale';
import Admin from 'layouts/Admin';

const FlashSaleNatShop = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const tabs = [t('all'), t('reviewing'), t('registered')];

  const refName = React.useRef(null);
  const index = useSelector((state) => state.flashSale.natShopFlashSaleTabIndex);

  const [dates, setDates] = React.useState([]);

  return (
    <Box>
      <Text mt="4" textStyle="h6-sb" color="text-basic">
        {t('flash_sale_shop.nat_shop_flash_sale')}
      </Text>
      <Box mt="8" bg="bg-1" borderRadius="4px" px="6" py="4">
        <Tabs
          mt="4"
          isLazy
          index={index}
          onChange={(e) => {
            dispatch(setLoading(true));
            dispatch(setNatShopFlashSaleTabIndex(e));
            setTimeout(() => {
              dispatch(setLoading(false));
            }, 2000);
          }}
          variant="soft-rounded">
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
          <Flex mt="6" gap={{ base: '3', xl: '6' }} flexDirection={{ base: 'column', xl: 'row' }}>
            <Input
              maxW="570px"
              ref={refName}
              h="42px"
              placeholder={t('search_flash_sale_program_name')}
            />
            <RangeDatePickerItem
              selectedDates={dates}
              onDateChange={setDates}
              onClear={() => setDates([])}
            />
          </Flex>
          <HStack gap="2" mt={{ base: '3', xl: '6' }}>
            <Button
              size="sm"
              variant="primary"
              children={t('search')}
              w="80px"
              onClick={() => {
                dispatch(setSearchProgramFlashSaleName(refName.current.value));
                if (dates.length > 1) {
                  dispatch(setSearchProgramFlashSaleDate(dates));
                }
                dispatch(setDoSearchFlashSale(true));
              }}
            />
            <Button
              size="sm"
              variant="outline-control"
              children={t('reset')}
              w="80px"
              onClick={() => {
                refName.current.value = '';
                setDates([]);
                dispatch(resetSearchProgramFlashSale());
              }}
            />
          </HStack>
          <TabPanels mt="6">
            <TabPanel p="0" key="ALL">
              <TableAllNatShop />
            </TabPanel>
            <TabPanel p="0" key={EFlashSaleRegisterStatus.PENDING}>
              <TableReviewingNatShop />
            </TabPanel>
            <TabPanel p="0" key={EFlashSaleRegisterStatus.APPROVED}>
              <TableRegisteredNatShop />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

FlashSaleNatShop.layout = Admin;

export default WithAuthentication(FlashSaleNatShop);
