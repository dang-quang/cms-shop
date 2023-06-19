import React from 'react';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { IconRightArrow } from 'components/Icons/Icons';
import { isEmpty } from 'lodash';

interface ICategory {
  id: number;
  code: string;
  name: string;
  parentId: number;
  status?: number;
  promotion?: number;
  image?: string;
  createAt?: number;
  updateAt?: number | null;
  listChild?: ICategory[];
}

interface CategoryItemProps {
  item: ICategory;
  onClick?(): void;
  isSelected?: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item, isSelected, onClick }) => {
  const { name, listChild } = item;
  return (
    <Flex
      _hover={{
        bg: 'bg-2',
      }}
      h="32px"
      alignItems="center"
      justifyContent="space-between"
      cursor="pointer"
      onClick={onClick}
      px="4">
      <Text
        textStyle={isSelected ? 'h3-b' : 'h3'}
        color={isSelected ? 'text-primary' : 'text-basic'}>
        {name}
      </Text>
      {!isEmpty(listChild) && (
        <Icon
          as={IconRightArrow}
          w="16px"
          h="16px"
          color={isSelected ? 'text-primary' : 'text-body'}
        />
      )}
    </Flex>
  );
};

export default CategoryItem;
