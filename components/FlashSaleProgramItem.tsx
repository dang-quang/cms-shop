import React from 'react';
import { Flex, Text, Image, Center, Box, Button } from '@chakra-ui/react';
import { EFlashSaleRegisterStatus, EFlashSaleStatus, IProgramFlashSale } from 'constants/types';
import { useImageHandler, useRemainingRegistrationTime } from 'hooks';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

interface FlashSaleProgramItemProps {
  item: IProgramFlashSale;
  isLast?: boolean;
  onClick?(): void;
}

const FlashSaleProgramItem: React.FC<FlashSaleProgramItemProps> = ({ item, isLast, onClick }) => {
  const formatDate = `YYYY/MM/DD HH:MM:ss`;
  const { banner, name, programStart, programEnd, status, statusRegisterName, registerEnd } = item;

  const { t } = useTranslation();

  const _image = useImageHandler(banner);

  const { days, hours, minutes, seconds } = useRemainingRegistrationTime({
    registerEnd: registerEnd,
  });

  const renderRegistrationTime = () => {
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      return <Text>{t('registration_has_ended')}</Text>;
    }

    return (
      <>
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
      </>
    );
  };

  return (
    <Flex pt="2" pb="6" borderBottomWidth="1px" borderBottomColor="border-5">
      <Box w="350px" h="110px" mr="6" overflow="hidden">
        {status === EFlashSaleStatus.UPCOMING ? (
          <Box bg="bg-2" h="full" p="6">
            <Text textStyle="h5-b" color="text-placeholder" textTransform="uppercase">
              {t('program_ended')}
            </Text>
            <Text color="text-placeholder" textStyle="h3" mt="3">
              {`${t('on')} `}
              <Text as="span" color="text-placeholder" textStyle="h5">
                {t(dayjs(registerEnd).format('YYYY/MM/DD'))}
              </Text>
            </Text>
          </Box>
        ) : (
          <Image w="100%" h="100%" objectFit="cover" src={_image} />
        )}
      </Box>
      <Box flex="7">
        <Flex alignItems="center">
          <Center flexDirection="column" alignItems="flex-start" mr="5">
            <Flex
              py="1"
              px="2"
              bg={
                status === EFlashSaleStatus.UPCOMING
                  ? 'red.700'
                  : status === EFlashSaleStatus.HAPPENING
                  ? 'green.200'
                  : 'gray.2000'
              }
              alignItems="center"
              borderRadius="4px">
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
                  ? 'Upcoming'
                  : status === EFlashSaleStatus.HAPPENING
                  ? 'Happening'
                  : 'Finished'}
              </Text>
            </Flex>
          </Center>
          <Text textStyle="h5-sb" color="text-basic">
            {name}
          </Text>
        </Flex>
        <Text textStyle="h3" color="text-note" mt="3">
          {t('voucher.program_time')}
          <Text as="span" color="text-note" textStyle="h3">
            {dayjs(programStart).format(formatDate)}
          </Text>
          <Text as="span" color="text-note" textStyle="h3">
            {` ${t('to')} `}
          </Text>
          <Text as="span" color="text-note" textStyle="h3">
            {dayjs(programEnd).format(formatDate)}
          </Text>
        </Text>
        <Text textStyle="h3" color="text-note" mt="1">
          {t('confirmation_deadline')}
          <Text as="span" textStyle="h3" color="red">
            {dayjs(registerEnd).format(formatDate)}
          </Text>
        </Text>
      </Box>
      <Center flex="3">
        <Button
          size="sm"
          w="150px"
          variant={
            statusRegisterName === EFlashSaleRegisterStatus.UNREGISTERED
              ? 'primary'
              : 'outline-primary'
          }
          children={
            statusRegisterName === EFlashSaleRegisterStatus.UNREGISTERED
              ? t('register')
              : t('view_details')
          }
          onClick={onClick}
        />
      </Center>
    </Flex>
  );
};

export default FlashSaleProgramItem;
