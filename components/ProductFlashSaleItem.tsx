import React, { ChangeEvent } from 'react';
import {
  AspectRatio,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import { useImageHandler } from 'hooks';
import { formatCurrency } from 'utilities/utils';
import { FiTrash2 } from 'react-icons/fi';

interface ProductFlashSaleItemProps {
  item: any;
  isLast?: boolean;
  isChecked?: boolean;
  discountedPrice: {
    onChange?(e: ChangeEvent<HTMLInputElement>): void;
    errors: string;
  };
  discount: {
    onChange?(e: ChangeEvent<HTMLInputElement>): void;
    errors: string;
  };
  campaignStock: {
    onChange?(e: ChangeEvent<HTMLInputElement>): void;
    errors: string;
  };
  onClick?(): void;
  onDelete?(): void;
}

const ProductFlashSaleItem: React.FC<ProductFlashSaleItemProps> = ({
  item,
  isChecked,
  isLast,
  discountedPrice,
  discount,
  campaignStock,
  onClick,
  onDelete,
}) => {
  const { id, image, name, price, stock, discounted_price, discount_percent, campaign_stock } =
    item;

  const _image = useImageHandler(image);

  const borderColor = isLast ? 'transparent' : 'border-5';
  return (
    <Tr _disabled={{ _hover: { cursor: 'not-allowed' }, opacity: 0.5 }}>
      <Td borderColor={borderColor}>
        <Checkbox isChecked={isChecked} onChange={onClick} />
      </Td>
      <Td borderColor={borderColor}>
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
      </Td>
      <Td borderColor={borderColor}>
        <Text textStyle="h3" color="text-basic">
          {formatCurrency(price)}
        </Text>
      </Td>
      <Td borderColor={borderColor}>
        <FormControl isInvalid={!!discountedPrice.errors} w="fit-content" maxW="140px">
          <InputGroup>
            <Input
              size="xs"
              placeholder=" "
              w="fit-content"
              textAlign="center"
              value={discounted_price}
              type="number"
              onChange={discountedPrice.onChange}
              pl="50px"
            />
            <InputLeftElement
              h="full"
              w="50px"
              borderRightWidth="1px"
              pr="2"
              borderColor="border-5">
              <Center ml="2">
                <Text textStyle="h2" color="text-body">
                  HTG
                </Text>
              </Center>
            </InputLeftElement>
          </InputGroup>
          <FormErrorMessage>{discountedPrice.errors}</FormErrorMessage>
        </FormControl>
      </Td>
      <Td borderColor={borderColor}>
        <InputGroup maxW="140px">
          <Input
            size="xs"
            placeholder=" "
            w="fit-content"
            textAlign="center"
            type="number"
            value={discount_percent}
            onChange={discount.onChange}
            pr="50px"
          />
          <InputRightElement h="full" w="50px" borderColor="border-5" borderLeftWidth="1px" pl="4">
            <Center mr="4">
              <Text textStyle="h2" color="text-body">
                %OFF
              </Text>
            </Center>
          </InputRightElement>
        </InputGroup>
      </Td>
      <Td borderColor={borderColor}>
        <FormControl isInvalid={!!campaignStock.errors} w="fit-content" maxW="140px">
          <Input
            size="xs"
            placeholder=" "
            w="fit-content"
            textAlign="center"
            value={campaign_stock}
            type="number"
            onChange={campaignStock.onChange}
          />
          <FormErrorMessage>{campaignStock.errors}</FormErrorMessage>
        </FormControl>
      </Td>
      <Td borderColor={borderColor}>
        <Text textStyle="h3" color="text-basic">
          {stock}
        </Text>
      </Td>
      <Td borderColor={borderColor}>
        <Center boxSize="40px" cursor="pointer" onClick={onDelete}>
          <Icon as={FiTrash2} w="18px" h="18px" color="text-basic" cursor="pointer" />
        </Center>
      </Td>
    </Tr>
  );
};

export default ProductFlashSaleItem;
