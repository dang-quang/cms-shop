import React from 'react';
import Admin from 'layouts/Admin';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
//@ts-ignore
import { NotificationContainer } from 'react-light-notifications';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Box, Divider, Flex, Icon, Text } from '@chakra-ui/react';
import { IconOrder } from 'components/Icons/Icons';

const InterfaceManagement = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const productsTableHeader = [t('product'), t('price'), t('quantity'), t('total')];

  const data = [
    {
      id: '1',
      product: {
        image:
          'https://user-images.githubusercontent.com/42206067/237035176-b772c3b7-b2c6-4bfd-8460-7f995d5ae5f7.png',
        name: 'Lion head ring with crystal',
        code: 'TP-7171',
      },
      amount: 1250000,
      quantity: 2,
    },
    {
      id: '2',
      product: {
        image:
          'https://user-images.githubusercontent.com/42206067/237035196-c1ba4b35-4199-4457-abad-4c23013459a0.png',
        name: 'Lipsy lace body dress in a black',
        code: 'TP-7171',
      },
      amount: 1250000,
      quantity: 2,
    },
  ];

  return (
    <Box>
      <NotificationContainer />
      <Flex alignItems="center">
        <Icon as={IconOrder} w="34px" h="40px" color="text-basic" />
        <Text ml="5" textStyle="h7" color="text-basic">
          {t('order_information')}
        </Text>
      </Flex>
      <Divider mt="4" orientation="horizontal" borderColor="bg-border-1" />
    </Box>
  );
};

InterfaceManagement.layout = Admin;

export default WithAuthentication(InterfaceManagement);
