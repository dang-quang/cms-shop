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
import { EShowProductType, IShopProduct } from 'constants/types';
import { useImageHandler } from 'hooks';
import { formatCurrency } from 'utilities/utils';
import { AiFillEdit, AiOutlineHeart } from 'react-icons/ai';
import { IoEyeOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const { image, name, price, stock, countLike, countView, soldQuantity, isShow } = item;

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
          <Flex>
            <AspectRatio w="65px" ratio={1} mr="2" borderRadius="4px" overflow="hidden">
              <Image w="100%" h="100%" objectFit="cover" src={_image} />
            </AspectRatio>
            <Flex flexDirection="column" flex="1">
              {isShow !== EShowProductType.ACTIVE && (
                <Flex
                  p="1"
                  w="fit-content"
                  bg={isShow === EShowProductType.PENDING ? 'warning.200' : 'gray.2000'}
                  alignItems="center"
                  borderRadius="4px">
                  <Text
                    textStyle="h2-m"
                    color={isShow === EShowProductType.PENDING ? 'warning.100' : 'gray.100'}
                    textTransform="capitalize">
                    {isShow === EShowProductType.PENDING ? t('reviewing') : t('de_listed')}
                  </Text>
                </Flex>
              )}
              <Text textStyle="h3-m" color="text-basic">
                {name}
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
      {/* <Td borderColor={borderColor}>
        <Text textStyle="h3" color="text-basic">
          Variations
        </Text>
      </Td> */}
      <Td borderColor={borderColor}>
        <Text textStyle="h3" color="text-basic">
          {formatCurrency(price)}
        </Text>
      </Td>
      <Td borderColor={borderColor}>
        <Text textStyle="h3" color={stock === 0 ? 'red' : 'text-basic'}>
          {stock === 0 ? t('sold_out') : stock}
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
