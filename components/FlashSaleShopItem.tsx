import React from 'react';
import { Center, Flex, HStack, Icon, Switch, Td, Text, Tr } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { AiFillEdit } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import { EFlashSaleStatus, EShowFlashSaleType } from 'constants/types';
import { useTranslation } from 'react-i18next';

interface FlashSaleShopItemProps {
  item: any;
  isLast?: boolean;
  onUpdate?(): void;
  onDelete?(): void;
  onChange?(): void;
}

const FlashSaleShopItem: React.FC<FlashSaleShopItemProps> = ({
  item,
  isLast,
  onUpdate,
  onDelete,
  onChange,
}) => {
  const formatTime = 'HH:MM DD-MM-YYYY';
  const { t } = useTranslation();
  const { endAt, name, startAt, status, isShow } = item;

  const borderColor = isLast ? 'transparent' : 'border-5';

  return (
    <Tr>
      <Td borderColor={borderColor}>
        <HStack mt="2" w="300px">
          <Text textStyle="h3" color="text-basic">
            {dayjs(startAt).format(formatTime)}
          </Text>
          <Text>-</Text>
          <Text textStyle="h3" color="text-basic">
            {dayjs(endAt).format(formatTime)}
          </Text>
        </HStack>
      </Td>
      <Td borderColor={borderColor}>
        <Flex w="300px" flex="1">
          <Text textStyle="h3-m" noOfLines={1} color="text-basic">
            {name}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor}>
        <Flex
          py="1"
          px="2"
          w="fit-content"
          bg={
            status === EFlashSaleStatus.UPCOMING
              ? 'red.700'
              : status === EFlashSaleStatus.HAPPENING
              ? 'green.200'
              : 'gray.2000'
          }
          alignItems="center"
          borderRadius="full">
          <Text
            textStyle="h2-m"
            color={
              status === EFlashSaleStatus.UPCOMING
                ? 'red.600'
                : status === EFlashSaleStatus.HAPPENING
                ? 'green.100'
                : 'gray.100'
            }
            textTransform="capitalize">
            {status === EFlashSaleStatus.UPCOMING
              ? t('upcoming')
              : status === EFlashSaleStatus.HAPPENING
              ? t('happening')
              : t('expired')}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor}>
        <Switch
          disabled={status === EFlashSaleStatus.FINISHED}
          isChecked={isShow === EShowFlashSaleType.TURN_ON}
          onChange={onChange}
          name="promotion"
          variant="success"
        />
      </Td>
      <Td isNumeric borderColor={borderColor}>
        {status !== EFlashSaleStatus.FINISHED && (
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

export default FlashSaleShopItem;
