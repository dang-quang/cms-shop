import React from 'react';
import {
  Tr,
  Icon,
  Flex,
  Text,
  Image,
  Center,
  Td,
  HStack,
  Box,
  AspectRatio,
} from '@chakra-ui/react';
import { EDiscountType, EVoucherStatus, EVoucherType, IVoucher } from 'constants/types';
import { formatCurrency } from 'utilities/utils';
import { AiFillEdit } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import Images from 'assets';
import dayjs from 'dayjs';

interface VoucherShopItemProps {
  index: number;
  item: IVoucher;
  isLast?: boolean;
  onUpdate?(): void;
  onDelete?(): void;
}

const VoucherShopItem: React.FC<VoucherShopItemProps> = ({ item, isLast, onUpdate, onDelete }) => {
  const {
    name,
    discountValue,
    startDate,
    endDate,
    shopRegister,
    status,
    quantity,
    voucherCode,
    type,
    typeDiscount,
  } = item;

  const { t } = useTranslation();

  const borderColor = isLast ? 'transparent' : 'border-5';

  let _startDate;
  let _endDate;

  if (startDate && endDate) {
    _startDate = new Date(startDate * 1000).toISOString();
    _endDate = new Date(endDate * 1000).toISOString();
  }

  return (
    <Tr>
      {/* <Td borderColor="gray.1300">
        <Text textStyle="h3" color="text-basic">
          {index + 1}
        </Text>
      </Td> */}
      <Td borderColor={borderColor}>
        <Flex>
          <AspectRatio ratio={1} boxSize="56px" mr="2" overflow="hidden">
            <Image
              w="100%"
              h="100%"
              objectFit="cover"
              src={
                typeDiscount === EDiscountType.PERCENT
                  ? Images.voucher_percent
                  : Images.voucher_cash
              }
            />
          </AspectRatio>
          <Box flex="1">
            <Text textStyle="h3-m" color="text-basic">
              {name}
            </Text>
            <Text textStyle="h2" color="text-basic">
              {t('voucher.code', { code: voucherCode })}
            </Text>
          </Box>
        </Flex>
      </Td>
      <Td borderColor={borderColor}>
        <Text textStyle="h3" color="text-basic">
          {type === EVoucherType.VOUCHER_SHOP
            ? t('voucher.voucher_shop')
            : t('voucher.voucher_product')}
        </Text>
      </Td>
      <Td isNumeric borderColor={borderColor}>
        <Text textStyle="h3" color="text-basic">
          {formatCurrency(discountValue ?? 0)}
        </Text>
      </Td>
      <Td isNumeric borderColor={borderColor}>
        <Text textStyle="h3" color="text-basic">
          {quantity}
        </Text>
      </Td>
      <Td borderColor={borderColor}>
        <Center>
          <Text textStyle="h3" color="text-basic">
            {shopRegister ?? 0}
          </Text>
        </Center>
      </Td>
      <Td borderColor={borderColor}>
        <Center flexDirection="column" alignItems="flex-start">
          <Flex
            py="1"
            px="2"
            bg={
              status === EVoucherStatus.UPCOMING
                ? 'red.700'
                : status === EVoucherStatus.HAPPENING
                ? 'green.200'
                : 'gray.2000'
            }
            alignItems="center"
            borderRadius="full">
            <Text
              textStyle="h2-m"
              color={
                status === EVoucherStatus.UPCOMING
                  ? 'red.600'
                  : status === EVoucherStatus.HAPPENING
                  ? 'green.100'
                  : 'gray.100'
              }
              textTransform="capitalize">
              {status === EVoucherStatus.UPCOMING
                ? t('upcoming')
                : status === EVoucherStatus.HAPPENING
                ? t('happening')
                : t('finished')}
            </Text>
          </Flex>
          <HStack mt="2">
            <Text textStyle="h3" color="text-basic">
              {dayjs(_startDate).format('DD-MM-YYYY HH:MM')}
            </Text>
            <Text>-</Text>
            <Text textStyle="h3" color="text-basic">
              {dayjs(_endDate).format('DD-MM-YYYY HH:MM')}
            </Text>
          </HStack>
        </Center>
      </Td>
      <Td isNumeric borderColor={borderColor}>
        {status !== EVoucherStatus.FINISHED && (
          <Flex justifyContent="flex-end">
            <HStack>
              <Center boxSize="40px" cursor="pointer" onClick={onUpdate}>
                <Icon as={AiFillEdit} w="18px" h="18px" color="text-basic" cursor="pointer" />
              </Center>
              <Center boxSize="40px" cursor="pointer" onClick={onDelete}>
                <Icon as={FiTrash2} w="18px" h="18px" color="text-basic" cursor="pointer" />
              </Center>
            </HStack>
          </Flex>
        )}
      </Td>
    </Tr>
  );
};

export default VoucherShopItem;
