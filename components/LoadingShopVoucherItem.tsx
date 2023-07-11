import React from 'react';
import { Box, BoxProps, Skeleton, VStack } from '@chakra-ui/react';

interface LoadingShopVoucherItemProps extends BoxProps {}

const LoadingShopVoucherItem: React.FC<LoadingShopVoucherItemProps> = ({ ...rest }) => {
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
        <VStack gap="1" flex="1" w="full">
          <Skeleton isLoaded={false} startColor={startColor} endColor={endColor} />
          <Skeleton isLoaded={false} startColor={startColor} endColor={endColor} />
        </VStack>
        <VStack gap="1" flex="1" w="full">
          <Skeleton isLoaded={false} startColor={startColor} endColor={endColor} />
          <Skeleton isLoaded={false} startColor={startColor} endColor={endColor} />
        </VStack>
        <VStack gap="1" flex="1" w="full">
          <Skeleton isLoaded={false} startColor={startColor} endColor={endColor} />
          <Skeleton isLoaded={false} startColor={startColor} endColor={endColor} />
        </VStack>
      </VStack>
    </Box>
  );
};

export default LoadingShopVoucherItem;
