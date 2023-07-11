import React from 'react';
import {
  Box,
  Center,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import TableAllMyShop from './TableAllMyShop';
import TableHappeningMyShop from './TableHappeningMyShop';
import TableUpcomingMyShop from './TableUpcomingMyShop';
import TableFinishedMyShop from './TableFinishedMyShop';

import { EVoucherStatus } from 'constants/types';
import { setLoading, setMyShopVoucherTabIndex } from 'redux/actions/app';
import { AiOutlineSearch } from 'react-icons/ai';
import { setDoSearchVoucher, setSearchVoucherName } from 'redux/actions/voucher';

const MyShop = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const tabs = [t('all'), t('happening'), t('upcoming'), t('finished')];

  const refName = React.useRef(null);

  const index = useSelector((state) => state.app.myShopVoucherTabIndex);

  return (
    <Box>
      <Tabs
        variant="soft-rounded"
        mt="4"
        isLazy
        index={index}
        onChange={(e) => {
          dispatch(setLoading(true));
          dispatch(setMyShopVoucherTabIndex(e));
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
        <InputGroup maxW="570px" borderRadius="4px" overflow="hidden" mt="6">
          <Input ref={refName} placeholder="Search voucher name, code" />
          <InputRightElement
            onClick={() => {
              dispatch(setSearchVoucherName(refName.current.value));
              dispatch(setDoSearchVoucher(true));
            }}
            borderRadius="4px"
            cursor="pointer"
            h="full"
            bg="primary.100"
            w="100px">
            <Center>
              <Icon as={AiOutlineSearch} w="24px" h="24px" color="white" />
            </Center>
          </InputRightElement>
        </InputGroup>
        <TabPanels mt="6">
          <TabPanel p="0" key="ALL">
            <TableAllMyShop />
          </TabPanel>
          <TabPanel p="0" key={EVoucherStatus.HAPPENING}>
            <TableHappeningMyShop />
          </TabPanel>
          <TabPanel p="0" key={EVoucherStatus.UPCOMING}>
            <TableUpcomingMyShop />
          </TabPanel>
          <TabPanel p="0" key={EVoucherStatus.FINISHED}>
            <TableFinishedMyShop />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MyShop;
