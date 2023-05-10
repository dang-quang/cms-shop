import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import numeral from 'numeral';

// export interface IFeatureProduct {
//   id?: string;
//   name: string;
//   amount: number;
//   image: string;
// }

// interface FeatureProductItemProps {
//   item: IFeatureProduct;
// }

const imageDemo = 'https://imgtr.ee/images/2023/05/10/l0smR.png';

const FeatureProductItem = ({ item }) => {
  const { name, amount } = item;

  return (
    <Box>
      <Image src={imageDemo} objectFit="cover" alt="image_shop" />
      <Text mt="2" textAlign="center" color="text-basic">
        {name}
      </Text>
      <Text mt="1" textStyle="b-md" color="text-basic" textAlign="center">
        List price:{' '}
        <Text textStyle="c-md" as="span" color="primary.100">
          {numeral(amount).format('0,0')}đ
        </Text>
      </Text>
    </Box>
  );
};

export default FeatureProductItem;
