import React from 'react';
import { Box, Flex, Grid, HStack, Text } from '@chakra-ui/react';

interface FormGroupProps {
  title: string;
  children: React.ReactElement;
}

const FormGroup: React.FC<FormGroupProps> = ({ title, children }) => {
  return (
    <Flex pl="xl">
      <Flex flex="3">
        <Text>{title}</Text>
      </Flex>
      <Box flex="7">{children}</Box>
    </Flex>
  );
};

export default FormGroup;
