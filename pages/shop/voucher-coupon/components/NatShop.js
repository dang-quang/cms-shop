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
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RangeDatePickerItem } from 'components';

import { setLoading, setNatShopVoucherTabIndex } from 'redux/actions/app';
import {
  resetSearchProgramVoucher,
  setDoSearchVoucher,
  setSearchProgramVoucherDate,
  setSearchProgramVoucherName,
} from 'redux/actions/voucher';

import TableAllNatShop from './TableAllNatShop';
import TableReviewingNatShop from './TableReviewingNatShop';
import TableRegisteredNatShop from './TableRegisteredNatShop';

import { EVoucherRegisterStatus } from 'constants/types';

const NatShop = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const tabs = [t('all'), t('reviewing'), t('registered')];

  const refName = React.useRef(null);
  const index = useSelector((state) => state.app.natShopVoucherTabIndex);

  const [dates, setDates] = React.useState([]);

  return (
    <Box>
      <Tabs
        mt="4"
        isLazy
        index={index}
        onChange={(e) => {
          dispatch(setLoading(true));
          dispatch(setNatShopVoucherTabIndex(e));
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
          <Input maxW="570px" ref={refName} h="42px" placeholder="Search voucher program name" />
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
              dispatch(setSearchProgramVoucherName(refName.current.value));
              if (dates.length > 1) {
                dispatch(setSearchProgramVoucherDate(dates));
              }
              dispatch(setDoSearchVoucher(true));
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
              dispatch(resetSearchProgramVoucher());
            }}
          />
        </HStack>
        <TabPanels mt="6">
          <TabPanel p="0" key="ALL">
            <TableAllNatShop />
          </TabPanel>
          <TabPanel p="0" key={EVoucherRegisterStatus.PENDING}>
            <TableReviewingNatShop />
          </TabPanel>
          <TabPanel p="0" key={EVoucherRegisterStatus.APPROVED}>
            <TableRegisteredNatShop />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default NatShop;
