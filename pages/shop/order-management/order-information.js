import React from 'react';
import Admin from 'layouts/Admin';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
//@ts-ignore
import { NotificationContainer } from 'react-light-notifications';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Select,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { IconOrder } from 'components/Icons/Icons';
import InformationItem from './components/InformationItem';
import numeral from 'numeral';

const OrderInformation = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [note, setNote] = React.useState('');

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

  const orderInformation = React.useMemo(
    () => [
      {
        title: t('create_at'),
        content: '2021-07-19',
      },
      {
        title: t('payment_method'),
        content: 'Tiền mặt',
      },
      {
        title: t('discount'),
        content: 8000,
      },
    ],
    []
  );

  const customerInformation = React.useMemo(
    () => [
      {
        title: t('full_name'),
        content: 'Hồ Thị Phương Sáu',
      },
      {
        title: t('email'),
        content: '',
      },
      {
        title: t('phone_number'),
        content: '84373551559',
      },
      {
        title: t('address'),
        content: '64 Dã Tượng, Phường Duy Tân, Thành Phố Kon Tum, Kon Tum',
      },
    ],
    []
  );

  return (
    <Box>
      <NotificationContainer />
      <Flex alignItems="center">
        <Icon as={IconOrder} w="34px" h="40px" color="text-basic" />
        <Text ml="5" textStyle="h6-t-h7" color="text-basic">
          {t('order_information')}
        </Text>
      </Flex>
      <Text mt="8" textStyle="h5-h6" color="text-basic">
        {t('number_order', { number: '#210720D0KFC7B0' })}
      </Text>
      <SimpleGrid mt="6" columns={{ base: 1, lg: 2 }} gap={{ base: '4', lg: '6' }}>
        <Box borderWidth="1px" py="4" px="6" borderRadius="16px" borderColor="bg-border-1">
          <Text textStyle="h5" color="text-basic">
            {t('order_information')}
          </Text>
          <Divider mt="4" orientation="horizontal" borderColor="bg-border-1" />
          {orderInformation.map((item, index) => {
            return <InformationItem key={index} {...item} />;
          })}
          <InformationItem
            title={t('payment_status')}
            content={
              <Select
                width="fit-content"
                borderColor="transparent"
                textStyle="h4"
                cursor="pointer"
                px="0px"
                _focus={{
                  borderWidth: '0px',
                  borderColor: 'transparent',
                }}
                _hover={{
                  borderColor: 'transparent',
                }}
                _active={{
                  borderColor: 'transparent',
                }}>
                <option value="option1">Received</option>
                <option value="option2">Canceled</option>
                <option value="option3">Successful</option>
              </Select>
            }
          />
          <Flex py="3" justifyContent="space-between">
            <Text textStyle="body-b" color="text-basic">
              {t('note')}
            </Text>
            <Textarea
              value={note}
              maxW="75%"
              borderColor="bg-border-1"
              onChange={(e) => setNote(e.target.value)}
              placeholder={t('note')}
              height={{ base: '60px', xl: '120px' }}
            />
          </Flex>
          <Flex justifyContent="flex-end">
            <Button variant="success" children={t('save')} minW="135px" />
          </Flex>
        </Box>
        <Box borderWidth="1px" py="4" px="6" borderRadius="16px" borderColor="bg-border-1">
          <Text textStyle="h5" color="text-basic">
            {t('customer_information')}
          </Text>
          <Divider mt="4" orientation="horizontal" borderColor="bg-border-1" />
          {customerInformation.map((item, index) => {
            return (
              <InformationItem
                key={index}
                {...item}
                isLast={index === customerInformation.length - 1}
              />
            );
          })}
        </Box>
      </SimpleGrid>
      {data && data.length > 0 && (
        <Box borderWidth="1px" py="4" px="6" borderRadius="16px" borderColor="bg-border-1" mt="4">
          <Text textStyle="h5" color="text-basic">
            {t('products')}
          </Text>
          <Box overflow="scroll" mt="4">
            <Table variant="simple" minW="2xl">
              <Thead h="52px" px="0">
                <Tr>
                  {productsTableHeader.map((item, index) => {
                    return (
                      <Th
                        borderColor="bg-border-1"
                        fontSize="15px"
                        fontWeight="400"
                        textTransform="capitalize"
                        key={index}
                        w={index === 0 ? '50%' : 'unset'}
                        isNumeric={index === 3 ? true : false}
                        p="0"
                        color="text-body">
                        {item}
                      </Th>
                    );
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {data.map((i, idx) => {
                  const { product, amount, quantity } = i;
                  return (
                    <React.Fragment key={idx}>
                      <Tr p="20" pb="20" b>
                        <Td p="0" borderWidth="0">
                          <Flex py="3">
                            <Image
                              src={product.image}
                              w="87px"
                              objectFit="contain"
                              h="60px"
                              borderRadius="2px"
                              mr="3"
                            />
                            <Box>
                              <Text textStyle="h3-b" color="text-basic">
                                {product.name}
                              </Text>
                              <Text textStyle="h2-b" color="text-body" mt="2">
                                {product.code}
                              </Text>
                            </Box>
                          </Flex>
                        </Td>
                        <Td p="0" borderWidth="0">
                          <Text textStyle="h3-b" color="text-basic">
                            {numeral(amount).format('0,0')}
                          </Text>
                        </Td>
                        <Td borderWidth="0">
                          <Text textStyle="h3-b" color="text-basic">
                            {quantity}
                          </Text>
                        </Td>
                        <Td p="0" borderWidth="0" isNumeric>
                          <Text textStyle="h3-b" color="text-basic">
                            <Text textStyle="h3-b" color="text-basic">
                              {numeral(amount * quantity).format('0,0')}
                            </Text>
                          </Text>
                        </Td>
                      </Tr>
                    </React.Fragment>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Box>
      )}
    </Box>
  );
};

OrderInformation.layout = Admin;

export default WithAuthentication(OrderInformation);
