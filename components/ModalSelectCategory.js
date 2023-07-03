import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import _, { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { AiOutlineSearch } from 'react-icons/ai';
import { CategoryItem } from 'components';
import { filterParentCategories } from 'utilities/filterParentCategories';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from 'redux/actions/product';
import { listSearch } from 'utilities/listSearch';

const ModalSelectCategory = ({
  title,
  isOpen,
  onClose,
  data,
  categoryId,
  selectedItem,
  onCloseSelected,
  onConfirm,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [search, setSearch] = React.useState('');
  const [categories, setCategories] = React.useState([]);
  const [isConfirmed, { on: onConfirmed, off: offConfirmed }] = useBoolean(false);

  React.useEffect(() => {
    if (isEmpty(data)) {
      return;
    }

    if (categoryId) {
      const parentCategories = filterParentCategories(data, categoryId);

      if (isEmpty(parentCategories)) {
        return;
      }

      let _selectedCategory = [];

      for (let i = 0; i < parentCategories.length; i++) {
        if (i === 0) {
          _selectedCategory.push({
            list: data,
            selectedCategory: parentCategories[i],
          });
        } else {
          _selectedCategory.push({
            list: parentCategories[i - 1].listChild,
            selectedCategory: parentCategories[i],
          });
        }
      }
      setCategories(_selectedCategory);
      dispatch(setSelectedCategory(_selectedCategory));
    } else {
      setCategories([{ list: listSearch(data, search) }]);
    }
  }, [data, categoryId, search]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick size="5xl" isCentered>
      <ModalOverlay />
      <ModalContent p="2">
        <ModalHeader color="text-basic">{title}</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'none' }} onClick={onClose} />
        <Box mx="4" bg="bg-2" borderRadius="4px" p="4">
          <InputGroup maxW="270px" borderRadius="4px" overflow="hidden">
            <Input
              size="sm"
              placeholder={t('shop_product.search_category_name')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement
              pointerEvents="none"
              borderRadius="4px"
              cursor="pointer"
              h="full"
              bg="primary.100"
              w="32px">
              <Center>
                <Icon as={AiOutlineSearch} w="20px" h="20px" color="white" />
              </Center>
            </InputRightElement>
          </InputGroup>
          <Flex mt="4" bg="bg-1" borderRadius="4px" py="3" h="344px" overflowX="scroll">
            {categories &&
              categories.map((item, index) => {
                const { list } = item;
                return (
                  <Box
                    key={index}
                    w="270px"
                    minW="270px"
                    overflow="auto"
                    borderRightWidth="1px"
                    borderRightColor="border-5"
                    h="100%"
                    pl="1px"
                    pr="1">
                    {list &&
                      list.length > 0 &&
                      list.map((i, idx) => {
                        return (
                          <CategoryItem
                            item={i}
                            key={idx}
                            isSelected={item.selectedCategory === i}
                            onClick={() => {
                              offConfirmed();
                              let updatedCategories = [...categories];

                              // Remove additional levels
                              updatedCategories = updatedCategories.slice(0, index + 1);

                              if (!isEmpty(i.listChild)) {
                                // Add the selected category to the next level
                                updatedCategories.push({ list: i.listChild });
                              }

                              // Update the selected category at the current level
                              updatedCategories[index].selectedCategory = i;

                              setCategories(updatedCategories);
                            }}
                          />
                        );
                      })}
                  </Box>
                );
              })}
          </Flex>
        </Box>
        <ModalFooter justifyContent="space-between">
          <Flex alignItems="center">
            <Text color="text-note" textStyle="h3" as="span" mr="2">
              The currently selected :
            </Text>
            {isConfirmed ? (
              <Box>
                {isEmpty(selectedItem) || !selectedItem[0].selectedCategory ? (
                  <Text as="span" textStyle="h3" color="text-body">
                    No category has been chosen
                  </Text>
                ) : (
                  selectedItem.map((item, index) => (
                    <Text as="span" key={index}>
                      <Text as="span" textStyle="h3-b" color="text-basic" key={index}>
                        {item.selectedCategory ? `${item.selectedCategory.name} ` : ''}
                        {index < selectedItem.length - 1 && selectedItem[index + 1].selectedCategory
                          ? '> '
                          : ''}
                      </Text>
                    </Text>
                  ))
                )}
              </Box>
            ) : (
              <Box>
                {isEmpty(categories) || !categories[0].selectedCategory ? (
                  <Text as="span" textStyle="h3" color="text-body">
                    No category has been chosen
                  </Text>
                ) : (
                  categories.map((item, index) => (
                    <Text as="span" key={index}>
                      <Text as="span" textStyle="h3-b" color="text-basic" key={index}>
                        {item.selectedCategory ? `${item.selectedCategory.name} ` : ''}
                        {index < categories.length - 1 && categories[index + 1].selectedCategory
                          ? '> '
                          : ''}
                      </Text>
                    </Text>
                  ))
                )}
              </Box>
            )}
            {/* <Box>
              {isEmpty(categories) || !categories[0].selectedCategory ? (
                <Text as="span" textStyle="h3" color="text-body">
                  No category has been chosen
                </Text>
              ) : (
                categories.map((item, index) => (
                  <Text as="span" key={index}>
                    <Text as="span" textStyle="h3-b" color="text-basic" key={index}>
                      {item.selectedCategory ? `${item.selectedCategory.name} ` : ''}
                      {index < categories.length - 1 && categories[index + 1].selectedCategory
                        ? '> '
                        : ''}
                    </Text>
                  </Text>
                ))
              )}
            </Box> */}
          </Flex>
          <HStack gap="2">
            <Button
              variant="outline-control"
              size="sm"
              minW="80px"
              onClick={() => {
                if (!isEmpty(selectedItem)) {
                  setCategories(selectedItem);
                  onCloseSelected(selectedItem);
                } else {
                  setCategories([{ list: data }]);
                }
                onClose();
                onConfirmed();
              }}>
              {t('cancel')}
            </Button>
            <Button
              variant="primary"
              disabled={isEmpty(categories) || !categories[categories.length - 1].selectedCategory}
              size="sm"
              minW="80px"
              onClick={() => {
                onConfirm(categories);
                onClose();
                onConfirmed();
              }}>
              {t('confirm')}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalSelectCategory;
