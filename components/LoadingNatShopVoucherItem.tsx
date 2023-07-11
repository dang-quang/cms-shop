import React from 'react';
import { Flex, BoxProps, Skeleton, VStack } from '@chakra-ui/react';

interface LoadingNatShopVoucherItemProps extends BoxProps {}

const LoadingNatShopVoucherItem: React.FC<LoadingNatShopVoucherItemProps> = ({ ...rest }) => {
  const startColor = 'gray.200';
  const endColor = 'gray.500';

  return (
    <Flex gap="6" pt="2" pb="6" alignItems="center" {...rest}>
      <Skeleton w="250px" h="110px" isLoaded={false} startColor={startColor} endColor={endColor} />
      <VStack alignItems="flex-start" gap="2" flex="1" w="full">
        <Skeleton isLoaded={false} startColor={startColor} endColor={endColor} />
        <Skeleton isLoaded={false} startColor={startColor} endColor={endColor} w="80%" />
        <Skeleton isLoaded={false} startColor={startColor} endColor={endColor} w="50%" />
      </VStack>
    </Flex>
  );
};

export default LoadingNatShopVoucherItem;
