import React from 'react';
import { Tr, Icon, Flex, Text, Image, Center, Td, AspectRatio, HStack, Button } from '@chakra-ui/react';
import { EVoucherStatus, IVoucher } from 'constants/types';
import { BASE_API_URL } from 'utilities/const';
import { formatCurrency } from 'utilities/utils';
import dayjs from 'dayjs';
import { AiFillEdit } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';

interface VoucherShopItemProps {
  index: number;
  item: IVoucher;
  onUpdate?(): void;
  onDelete?(): void;
}

const VoucherNatShopItem: React.FC<VoucherShopItemProps> = ({ item, index, onUpdate, onDelete }) => {
  const {
    banner,
    name,
    discountValue,
    quantityVoucher,
    shopRegister,
    programStart,
    programEnd,
    status,
  } = item;
  let _image = '';

  if (banner) {
    let firstChar = banner.substring(0, 4);

    if (firstChar === 'http' || firstChar === 'https') {
      _image = banner;
    } else {
      _image = BASE_API_URL + '/assets/' + banner;
    }
  }
  return (
    <Tr key={index}>
      <Td borderColor="gray.1300">
        <Text textStyle="h3" color="text-basic">
          {index + 1}
        </Text>
      </Td>
      <Td borderColor="gray.1300">
        <Flex>
          <AspectRatio w="180px" ratio={2 / 1} mr="2" borderRadius="8px" overflow="hidden">
            <Image w="100%" h="100%" objectFit="cover" src={_image} />
          </AspectRatio>
          <Text textStyle="h3-m" color="text-basic">
            {name}
          </Text>
        </Flex>
      </Td>
      <Td isNumeric borderColor="gray.1300">
        <Text textStyle="h3" color="text-basic">
          {formatCurrency(discountValue ?? 0)}
        </Text>
      </Td>
      <Td isNumeric borderColor="gray.1300">
        <Text textStyle="h3" color="text-basic">
          {quantityVoucher}
        </Text>
      </Td>
      <Td borderColor="gray.1300">
        <Center>
          <Text textStyle="h3" color="text-basic">
            {shopRegister ?? 0}
          </Text>
        </Center>
      </Td>
      <Td borderColor="gray.1300">
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
                ? 'Upcoming'
                : status === EVoucherStatus.HAPPENING
                  ? 'Happening'
                  : 'Finished'}
            </Text>
          </Flex>
          <HStack mt="2">
            <Text textStyle="h3" color="text-basic">
              {dayjs(programStart).format('DD-MM-YYYY HH:MM')}
            </Text>
            <Text>-</Text>
            <Text textStyle="h3" color="text-basic">
              {dayjs(programEnd).format('DD-MM-YYYY HH:MM')}
            </Text>
          </HStack>
        </Center>
      </Td>
      <Td isNumeric borderColor="gray.1300">
        <Button
          variant="primary"
          children="Register now"
          onClick={() =>
            router.push('/shop/flash-sale-natshop/product-approval-flashsale')
          }
        />
        {/* <Flex justifyContent="flex-end">
          <HStack>
            <Center boxSize="40px" cursor="pointer" onClick={onUpdate}>
              <Icon as={AiFillEdit} w="18px" h="18px" color="text-basic" cursor="pointer" />
            </Center>
            <Center boxSize="40px" cursor="pointer" onClick={onDelete}>
              <Icon as={FiTrash2} w="18px" h="18px" color="red.600" cursor="pointer" />
            </Center>
          </HStack>
        </Flex> */}
      </Td>
    </Tr>
  );
};

export default VoucherNatShopItem;
