import React from 'react';
import { Grid, GridItem, GridProps, Text } from '@chakra-ui/react';

interface FormGroupProps extends GridProps {
  title?: string;
  children: React.ReactElement;
}

const FormGroup: React.FC<FormGroupProps> = ({ title, children, ...rest }) => {
  return (
    <Grid
      templateColumns={{ base: 'unset', md: 'repeat(10,1fr)' }}
      templateRows={{ base: 'repeat(2,1fr)', md: 'unset' }}
      gap={{ base: '2', md: '6' }}
      {...rest}>
      <GridItem
        colSpan={3}
        rowSpan={{ base: 2, md: 1 }}
        alignItems="center"
        justifyContent={{ base: 'unset', md: 'flex-end' }}
        display="flex">
        <Text textStyle="b-md" color="text-basic" textAlign="right">
          {title}
        </Text>
      </GridItem>
      <GridItem colSpan={7} rowSpan={1}>
        {children}
      </GridItem>
    </Grid>
  );
};

export default FormGroup;
