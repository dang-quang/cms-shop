import React from 'react';
import {
  AspectRatio,
  Center,
  Checkbox,
  Flex,
  HStack,
  Icon,
  Image,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import { IShopProduct } from 'constants/types';
import { useImageHandler } from 'hooks';
import { formatCurrency } from 'utilities/utils';
import { AiFillEdit, AiOutlineHeart } from 'react-icons/ai';
import { IoEyeOutline } from 'react-icons/io5';

interface SelectProductItemProps {
  item: IShopProduct;
  onClick?(): void;
  isChecked: boolean;
  isLast?: boolean;
  isDisable?: boolean;
  onUpdate?(): void;
}

const ShopProductItem: React.FC<SelectProductItemProps> = ({
  item,
  isChecked,
  isDisable,
  isLast,
  onClick,
  onUpdate,
}) => {
  const { id, image, name, price, stock, countLike, countView, soldQuantity, productDetail } = item;

  const _image = useImageHandler(image);

  const borderColor = isLast ? 'transparent' : 'border-5';

  return (
    <Tr aria-disabled={isDisable} _disabled={{ _hover: { cursor: 'not-allowed' }, opacity: 0.5 }}>
      <Td borderColor={borderColor}>
        <Flex alignItems="center">
          <Checkbox
            defaultChecked={isChecked}
            disabled={isDisable}
            isChecked={isChecked}
            onChange={onClick}
            mr="3"
          />
          <Flex alignItems="center">
            <AspectRatio w="60px" ratio={1} mr="2" borderRadius="4px" overflow="hidden">
              <Image w="100%" h="100%" objectFit="cover" src={_image} />
            </AspectRatio>
            <Flex flexDirection="column">
              <Text textStyle="h3-m" color="text-basic">
                {name}
              </Text>
              <Text color="text-body" textStyle="b-xs">
                ID: {id}
              </Text>
              <HStack mt="1" gap="1">
                <Flex alignItems="center" gap="1">
                  <Icon boxSize="12px" as={IoEyeOutline} color="text-body" />
                  <Text color="text-body" textStyle="h2">
                    {countView}
                  </Text>
                </Flex>
                <Flex alignItems="center" gap="1">
                  <Icon boxSize="12px" as={AiOutlineHeart} color="text-body" />
                  <Text color="text-body" textStyle="h2">
                    {countLike}
                  </Text>
                </Flex>
              </HStack>
            </Flex>
          </Flex>
        </Flex>
      </Td>
      <Td borderColor={borderColor}>
        <Text textStyle="h3" color="text-basic">
          Variations
        </Text>
      </Td>
      <Td borderColor={borderColor}>
        <Text textStyle="h3" color="text-basic">
          {formatCurrency(price)}
        </Text>
      </Td>
      <Td borderColor={borderColor}>
        <Text textStyle="h3" color="text-basic">
          {stock}
        </Text>
      </Td>
      <Td borderColor={borderColor}>
        <Text textStyle="h3" color="text-basic">
          {soldQuantity}
        </Text>
      </Td>
      <Td isNumeric borderColor={borderColor}>
        <Flex justifyContent="flex-end">
          <Center boxSize="40px" cursor="pointer" onClick={onUpdate} alignSelf="flex-end">
            <Icon as={AiFillEdit} w="18px" h="18px" color="text-basic" cursor="pointer" />
          </Center>
        </Flex>
      </Td>
    </Tr>
  );
};

export default ShopProductItem;