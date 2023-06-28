import React from 'react';
import { Box, BoxProps, Center, Image, Text } from '@chakra-ui/react';
import Images from 'assets';
import { useTranslation } from 'react-i18next';

interface EmptyListItemProps extends BoxProps {}

const EmptyListItem: React.FC<EmptyListItemProps> = ({ ...rest }) => {
  const { t } = useTranslation();
  return (
    <Box minH="220px" position="absolute" insetX="0" {...rest}>
      <Center h="220px" position="absolute" insetX="0" flexDirection="column" alignSelf="center">
        <Image w="150px" h="100px" src={Images.no_data} />
        <Text textStyle="body" textAlign="center" color="primary.100" mt="1">
          {t('no_data_found')}
        </Text>
      </Center>
    </Box>
  );
};

export default EmptyListItem;
