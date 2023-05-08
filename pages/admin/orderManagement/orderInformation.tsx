import React from 'react';
import Admin from 'layouts/Admin';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';

import { NotificationContainer } from 'react-light-notifications';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { IconOrder } from 'components/Icons/Icons';

const OrderInformation = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const TABLE_HEAD = [
    //t('qrManagement.stt'),
    'Number Order',
    'Status',
    'User Name',
    'Address',
    'Total',
    'Create At',
    t('action'),
  ];

  const data = [
    {
      id: 0,
      number_order: 299045978638333,
      status: 'Đã nhận',
      name_user: 'Nguyễn Văn A',
      address: 'Hồ Chí Minh',
      total: 123000,
      create_at: '2022-08-12',
    },
    {
      id: 1,
      number_order: 299045978638333,
      status: 'Đã hủy',
      name_user: 'Nguyễn Thị C',
      address: 'Hà Nội',
      total: 123000,
      create_at: '2022-08-12',
    },
    {
      id: 2,
      number_order: 299045978638333,
      status: 'Thành công',
      name_user: 'Giang dinh li',
      address: 'Hồ Chí Minh',
      total: 123000,
      create_at: '2022-08-12',
    },
  ];

  return (
    <Box>
      <NotificationContainer />
      <Flex alignItems="center">
        <Icon as={IconOrder} w="34px" h="40px" color="text-basic" />
        <Text ml="5" textStyle="h7" color="text-basic">
          Order information
        </Text>
      </Flex>
      <Text mt="8" textStyle="h6" color="text-basic">
        Đơn hàng #210720D0KFC7B0
      </Text>
      {/* <CardHeader color="primary">
        <Text>Order information</Text>
      </CardHeader> */}
    </Box>
  );
};

OrderInformation.layout = Admin;

export default WithAuthentication(OrderInformation);
