import React from 'react';
import { Box, BoxProps, Center, Image, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Images from 'assets';

interface EmptyListItemProps extends BoxProps {
  children?: any;
  image?: any;
  title?: string;
}

const EmptyListItem: React.FC<EmptyListItemProps> = ({ children, title, ...rest }) => {
  const { t } = useTranslation();
  return (
    <Box minH="220px" position="absolute" insetX="0" {...rest}>
      <Center h="220px" position="absolute" insetX="0" flexDirection="column" alignSelf="center">
        {children ? children : <Image w="150px" h="100px" src={Images.no_data} />}
        <Text
          textStyle="b-sm"
          textAlign="center"
          opacity={1}
          color={children ? 'text-body' : 'text-primary'}
          mt="2">
          {title ? title : t('no_data_found')}
        </Text>
      </Center>
    </Box>
  );
};

export default EmptyListItem;
