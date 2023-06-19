import React from 'react';
import { Flex, Grid, GridItem, GridProps, Text } from '@chakra-ui/react';

interface FormGroupProps extends GridProps {
  title?: string;
  children: React.ReactElement;
  isRequire?: boolean;
  isCentered?: boolean;
}

const FormGroup: React.FC<FormGroupProps> = ({
  title,
  children,
  isRequire,
  isCentered = true,
  ...rest
}) => {
  return (
    <Grid
      templateColumns={{ base: 'unset', md: 'repeat(10,1fr)' }}
      templateRows={{ base: 'repeat(2,1fr)', md: 'unset' }}
      gap={{ base: '2', md: '6' }}
      {...rest}>
      <GridItem
        colSpan={2}
        rowSpan={{ base: 2, md: 1 }}
        alignItems={isCentered ? 'center' : 'unset'}
        justifyContent={{ base: 'unset', md: 'flex-end' }}
        display="flex">
        <Flex>
          <Text textStyle="h3" color="text-basic" textAlign="right" mt={isCentered ? 'unset' : '2'}>
            {isRequire && (
              <Text textStyle="b-xs" as="span" color="red" mr="1">
                *
              </Text>
            )}
            {title}
          </Text>
        </Flex>
      </GridItem>
      <GridItem colSpan={8} rowSpan={1}>
        {children}
      </GridItem>
    </Grid>
  );
};

export default FormGroup;
