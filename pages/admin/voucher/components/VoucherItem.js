import React from 'react';
import { AspectRatio, Center, Flex, HStack, Icon, Image, Td, Text, Tr } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { BASE_API_URL } from 'utilities/const';
import { formatCurrency } from 'utilities/utils';
import { EVoucherStatus } from 'constants/types';
import { AiFillEdit } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';

const VoucherItem = ({ item, index, onUpdate, onDelete }) => {
  let _image = '';

  if (item.banner) {
    let firstChar = banner.substring(0, 4);

    if (firstChar === 'http' || firstChar === 'https') {
      _image = item.banner;
    } else {
      _image = BASE_API_URL + '/assets/' + item.banner;
    }
  }

  return (
    <Tr cursor="pointer">
      <Td borderColor="gray.1300">
        <Text textStyle="h3" color="text-basic">
          {index}
        </Text>
      </Td>
      <Td borderColor="gray.1300">
        <Flex>
          <AspectRatio w="180px" ratio={2 / 1} mr="2" borderRadius="8px" overflow="hidden">
            <Image w="100%" h="100%" objectFit="cover" src={_image} />
          </AspectRatio>
          <Text textStyle="h3-m" color="text-basic">
            abc
          </Text>
        </Flex>
      </Td>
      <Td isNumeric borderColor="gray.1300">
        <Text textStyle="h3" color="text-basic">
          {formatCurrency(item.discountValue ?? 0)}
        </Text>
      </Td>
      <Td isNumeric borderColor="gray.1300">
        <Text textStyle="h3" color="text-basic">
          {item.quantityVoucher}
        </Text>
      </Td>
      <Td borderColor="gray.1300">
        <Center>
          <Text textStyle="h3" color="text-basic">
            {item.shopRegister}
          </Text>
        </Center>
      </Td>
      <Td borderColor="gray.1300">
        <Center flexDirection="column" alignItems="flex-start">
          <Flex
            py="1"
            px="2"
            bg={
              item.status === EVoucherStatus.UPCOMING
                ? 'red.700'
                : item.status === EVoucherStatus.HAPPENING
                ? 'green.200'
                : 'gray.2000'
            }
            alignItems="center"
            borderRadius="full">
            <Text
              textStyle="h2-m"
              color={
                item.status === EVoucherStatus.UPCOMING
                  ? 'red.600'
                  : item.status === EVoucherStatus.HAPPENING
                  ? 'green.100'
                  : 'gray.100'
              }
              textTransform="capitalize">
              {item.status === EVoucherStatus.UPCOMING
                ? 'Upcoming'
                : item.status === EVoucherStatus.HAPPENING
                ? 'Happening'
                : 'Finished'}
            </Text>
          </Flex>
          <HStack mt="2">
            <Text textStyle="h3" color="text-basic">
              {dayjs(item.programStart).format('DD-MM-YYYY HH:MM')}
            </Text>
            <Text>-</Text>
            <Text textStyle="h3" color="text-basic">
              {dayjs(item.programEnd).format('DD-MM-YYYY HH:MM')}
            </Text>
          </HStack>
        </Center>
      </Td>
      <Td isNumeric borderColor="gray.1300">
        <Flex justifyContent="flex-end">
          <HStack>
            <Center boxSize="40px" cursor="pointer" onClick={onUpdate}>
              <Icon as={AiFillEdit} w="18px" h="18px" color="text-basic" cursor="pointer" />
            </Center>
            <Center boxSize="40px" cursor="pointer" onClick={onDelete}>
              <Icon as={FiTrash2} w="18px" h="18px" color="red.600" cursor="pointer" />
            </Center>
          </HStack>
        </Flex>
      </Td>
    </Tr>
  );
};

export default VoucherItem;
