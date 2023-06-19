import React from 'react';
import { AspectRatio, Box, Flex, Icon, Image, Text, useBoolean, WrapItem } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';

interface ProductImageProps {
  image: string;
  isCover?: boolean;
  onDelete?(): void;
}

const ProductImage: React.FC<ProductImageProps> = ({ image, isCover, onDelete }) => {
  const [show, { on, off }] = useBoolean(false);

  return (
    <WrapItem>
      <AspectRatio
        cursor="all-scroll"
        w="80px"
        ratio={1 / 1}
        borderRadius="4px"
        overflow="hidden"
        position="relative"
        onMouseEnter={on}
        onMouseLeave={off}>
        <Box>
          <AspectRatio
            w="80px"
            ratio={1 / 1}
            borderWidth="1px"
            borderColor="border-5"
            borderRadius="4px"
            overflow="hidden">
            <Image w="100%" h="100%" objectFit="contain" src={image} />
          </AspectRatio>
          {isCover && !show && (
            <>
              <Box
                filter="blur(12px)"
                overflow="hidden"
                bg="gray.800"
                backdropFilter="auto"
                backdropBlur="0px"
                position="absolute"
                bottom="0"
                insetX="-1"
                h="30%"
              />
              <Flex
                justifyContent="center"
                alignItems="center"
                position="absolute"
                bottom="0"
                insetX="0"
                h="30%">
                <Text color="red" position="absolute" textAlign="center">
                  *{' '}
                  <Text textStyle="h2-b" color="white" as="span">
                    Cover
                  </Text>
                </Text>
              </Flex>
            </>
          )}
          {show && (
            <>
              <Box
                filter="blur(12px)"
                overflow="hidden"
                bg="gray.800"
                backdropFilter="auto"
                backdropBlur="0px"
                position="absolute"
                bottom="0"
                insetX="-1"
                h="30%"
              />
              <Flex
                onClick={onDelete}
                cursor="pointer"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                bottom="0"
                insetX="0"
                h="30%">
                <Icon as={FiTrash2} w="16px" h="16px" color="white" />
              </Flex>
            </>
          )}
        </Box>
      </AspectRatio>
    </WrapItem>
  );
};

export default ProductImage;
