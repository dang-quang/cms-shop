import React from 'react';
import { Box, BoxProps, HStack, Skeleton, VStack } from '@chakra-ui/react';

interface LoadingShopProductItemProps extends BoxProps {}

const LoadingShopProductItem: React.FC<LoadingShopProductItemProps> = ({ ...rest }) => {
  const startColor = 'gray.200';
  const endColor = 'gray.500';

  return (
    <Box minH="220px" position="absolute" insetX="0" {...rest}>
      <VStack
        h="220px"
        position="absolute"
        insetX="0"
        flexDirection="column"
        alignSelf="center"
        p="6">
        <HStack gap="1" flex="1" w="full">
          <Skeleton boxSize="56px" isLoaded={false} startColor={startColor} endColor={endColor} />
          <VStack gap="2" flex="1" alignItems="flex-start">
            <Skeleton isLoaded={false} startColor={startColor} endColor={endColor} />
            <Skeleton w="50%" isLoaded={false} startColor={startColor} endColor={endColor} />
          </VStack>
        </HStack>
        <HStack gap="1" flex="1" w="full">
          <Skeleton boxSize="56px" isLoaded={false} startColor={startColor} endColor={endColor} />
          <VStack gap="2" flex="1" alignItems="flex-start">
            <Skeleton isLoaded={false} startColor={startColor} endColor={endColor} />
            <Skeleton w="50%" isLoaded={false} startColor={startColor} endColor={endColor} />
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default LoadingShopProductItem;
