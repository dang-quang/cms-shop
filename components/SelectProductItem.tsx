import React from 'react';
import { AspectRatio, Checkbox, Flex, Image, Td, Text, Tr } from '@chakra-ui/react';
import { IProduct } from 'constants/types';
import { useImageHandler } from 'hooks';
import { formatCurrency } from 'utilities/utils';

interface SelectProductItemProps {
  item: IProduct;
  onClick?(): void;
  isChecked: boolean;
  isLast?: boolean;
  isDisable?: boolean;
}

const SelectProductItem: React.FC<SelectProductItemProps> = ({
  item,
  onClick,
  isChecked,
  isDisable,
  isLast,
}) => {
  const { id, image, name, sales, price, stock } = item;

  const _image = useImageHandler(image);

  const borderColor = isLast ? 'transparent' : 'border-5';

  return (
    <Tr aria-disabled={isDisable} _disabled={{ _hover: { cursor: 'not-allowed' }, opacity: 0.5 }}>
      <Td borderColor={borderColor}>
        <Flex alignItems="center">
          <Checkbox disabled={isDisable} isChecked={isChecked} onChange={onClick} mr="3" />
          <Flex alignItems="center">
            <AspectRatio w="40px" ratio={1} mr="2" borderRadius="4px" overflow="hidden">
              <Image w="100%" h="100%" objectFit="cover" src={_image} />
            </AspectRatio>
            <Flex flexDirection="column">
              <Text textStyle="h3-m" color="text-basic">
                {name}
              </Text>
              <Text mt="1" color="text-body" textStyle="b-xs">
                ID: {id}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Td>
      <Td borderColor={borderColor}>
        <Text textStyle="h3" color="text-basic">
          {sales}
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
    </Tr>
  );
};

export default SelectProductItem;