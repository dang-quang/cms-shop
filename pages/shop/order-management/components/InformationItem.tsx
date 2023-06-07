import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

interface InformationItemProps {
  title: string;
  isLast?: boolean;
  content?: string | number | React.ReactElement;
}

const InformationItem: React.FC<InformationItemProps> = ({ title, content, isLast }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderBottomWidth="1px"
      borderColor={isLast ? 'transparent' : 'border-1'}
      py="3"
      pr="2">
      <Text color="text-basic" textStyle="body-b">
        {title}
      </Text>
      {typeof content === 'string' || typeof content === 'number' ? (
        <Text color="text-basic" textStyle="body" maxW="70%" textAlign="right">
          {content}
        </Text>
      ) : (
        content
      )}
    </Flex>
  );
};

export default InformationItem;
