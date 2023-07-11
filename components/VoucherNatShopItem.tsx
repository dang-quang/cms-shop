import React from 'react';
import { Flex, Text, Image, Center, Box, Button } from '@chakra-ui/react';
import { EVoucherRegisterStatus, EVoucherStatus, IProgramVoucher } from 'constants/types';
import { useImageHandler, useRemainingRegistrationTime } from 'hooks';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

interface VoucherShopItemProps {
  item: IProgramVoucher;
  isLast?: boolean;
  onClick?(): void;
}

const VoucherNatShopItem: React.FC<VoucherShopItemProps> = ({ item, isLast, onClick }) => {
  const formatDate = 'HH:MM DD-MM-YYYY';
  const {
    banner,
    name,
    programStart,
    programEnd,
    status,
    statusRegisterName,
    registerStart,
    registerEnd,
  } = item;

  const { t } = useTranslation();

  const _image = useImageHandler(banner);

  const { days, hours } = useRemainingRegistrationTime({
    registerStart: registerStart,
    registerEnd: registerEnd,
  });

  return (
    <Flex pt="2" pb="6" borderBottomWidth="1px" borderBottomColor="border-5">
      <Box w="350px" h="110px" mr="6" overflow="hidden">
        <Image w="100%" h="100%" objectFit="cover" src={_image} />
      </Box>
      <Box flex="7">
        <Flex alignItems="center">
          <Center flexDirection="column" alignItems="flex-start" mr="5">
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
              borderRadius="4px">
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
                  ? 'Upcoming'
                  : status === EVoucherStatus.HAPPENING
                  ? 'Happening'
                  : 'Finished'}
              </Text>
            </Flex>
          </Center>
          <Text textStyle="h5" color="text-basic">
            {name}
          </Text>
        </Flex>
        <Text textStyle="h3" color="text-note" mt="3">
          {t('voucher.program_time', {
            start: dayjs(programStart).format(formatDate),
            end: dayjs(programEnd).format(formatDate),
          })}
        </Text>
        <Text textStyle="h3" color="text-note" mt="1">
          {t('voucher.register_end_time')}
          {days > 0 && (
            <Text as="span">
              <Text color="red" as="span">
                {` ${days}`}
              </Text>{' '}
              {days > 1 ? t('days') : t('day')}
            </Text>
          )}
          {hours > 0 && (
            <Text as="span">
              <Text color="red" as="span">
                {` ${hours}`}
              </Text>{' '}
              {hours > 1 ? t('hours') : t('hour')}
            </Text>
          )}
        </Text>
      </Box>
      <Center flex="3">
        <Button
          size="sm"
          w="150px"
          variant={
            statusRegisterName !== EVoucherRegisterStatus.UNREGISTERED
              ? 'primary'
              : 'outline-primary'
          }
          children={
            statusRegisterName !== EVoucherRegisterStatus.UNREGISTERED
              ? t('register')
              : t('view_details')
          }
          onClick={onClick}
        />
      </Center>
    </Flex>
  );
};

export default VoucherNatShopItem;
