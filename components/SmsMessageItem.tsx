import React from 'react';
import { AspectRatio, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { ESMSStatus, ISMSMessage } from 'constants/types';
import { BASE_API_URL } from 'utilities/const';
import { formatCurrency } from 'utilities/utils';
import dayjs from 'dayjs';

interface SmsMessageItemProps {
  item: ISMSMessage;
  onRegister?(): void;
}

const SmsMessageItem: React.FC<SmsMessageItemProps> = ({ item, onRegister }) => {
  const formatDate = 'YYYY/MM/DD';
  const { image, code, quantity, startDate, endDate, price, status } = item;

  let _image = '';

  if (image) {
    let firstChar = image.substring(0, 4);

    if (firstChar === 'http' || firstChar === 'https') {
      _image = image;
    } else {
      _image = BASE_API_URL + '/assets/' + image;
    }
  }

  return (
    <Box shadow="md" _hover={{ shadow: 'lg' }} p="2" borderRadius="4px" overflow="hidden">
      <AspectRatio ratio={1 / 0.65} borderRadius="4" overflow="hidden">
        <Image src={_image} w="100%" h="100%" objectFit="cover" />
      </AspectRatio>
      <Text textStyle="h4" color="text-basic" mt="2">
        Code: {code}
      </Text>
      <Text textStyle="h4" color="text-basic" mt="2">
        Quantity: {quantity}
      </Text>
      <Text textStyle="h4" color="text-basic" mt="2">
        Time: {dayjs(startDate).format(formatDate)} - {dayjs(endDate).format(formatDate)}
      </Text>
      <Text textStyle="h4" color="text-basic" mt="2">
        Price: {formatCurrency(price)}
      </Text>
      <Box mt="4">
        {status === ESMSStatus.AWAITING_REGISTRATION ? (
          <Flex
            py="1"
            px="2"
            bg="warning.200"
            alignItems="center"
            borderRadius="full"
            w="fit-content"
            alignSelf="flex-start">
            <Text textStyle="h2-m" color="warning.100" textTransform="capitalize">
              Awaiting Registration
            </Text>
          </Flex>
        ) : status === ESMSStatus.REGISTERED ? (
          <Flex
            py="1"
            px="2"
            bg="green.200"
            alignItems="center"
            borderRadius="full"
            w="fit-content"
            alignSelf="flex-start">
            <Text textStyle="h2-m" color="green.100" textTransform="capitalize">
              Registered
            </Text>
          </Flex>
        ) : (
          <Button variant="primary" size="md" onClick={onRegister} children="Register" />
        )}
      </Box>
    </Box>
  );
};

export default SmsMessageItem;
