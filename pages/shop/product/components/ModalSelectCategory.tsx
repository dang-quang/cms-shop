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
import { FieldArray, useFormikContext } from 'formik';
import CategoryItem from './CategoryItem';

const data = [
  {
    id: 121,
    code: 'IP1',
    name: 'IPhone',
    parentId: null,
    status: 1,
    promotion: 0,
    image: 'natshop/category/20230612/category_1686562303071.jpg',
    createAt: 1686562303000,
    updateAt: null,
    listChild: [
      {
        id: 123,
        code: 'IP12',
        name: 'IPhone 12',
        parentId: 121,
        status: 1,
        promotion: 0,
        image: 'natshop/category/20230612/category_1686562303071.jpg',
        createAt: 1686542400000,
        updateAt: null,
        listChild: [
          {
            id: 127,
            code: 'IP20',
            name: 'IPhone 12 CC',
            parentId: 123,
            status: 1,
            promotion: 0,
            image: 'natshop/category/20230612/category_1686564485212.jpg',
            createAt: 1686715200000,
            updateAt: null,
            listChild: [
              {
                id: 128,
                code: null,
                name: 'IPhone 12 CC DD',
                parentId: 127,
                status: 1,
                promotion: 0,
                image: 'natshop/category/20230612/category_1686562303071.jpg',
                createAt: 1686715200000,
                updateAt: null,
                listChild: null,
              },
            ],
          },
        ],
      },
      {
        id: 122,
        code: 'IP11',
        name: 'IPhone 11',
        parentId: 121,
        status: 1,
        promotion: 0,
        image: 'natshop/category/20230612/category_1686562377930.jpg',
        createAt: 1686562377000,
        updateAt: null,
        listChild: null,
      },
      {
        id: 124,
        code: 'IP13',
        name: 'IPhone 13',
        parentId: 121,
        status: 1,
        promotion: 0,
        image: 'natshop/category/20230612/category_1686562430626.jpg',
        createAt: 1686562430000,
        updateAt: null,
        listChild: null,
      },
      {
        id: 125,
        code: 'IP14',
        name: 'IPhone 14',
        parentId: 121,
        status: 1,
        promotion: 0,
        image: 'natshop/category/20230612/category_1686562475246.jpg',
        createAt: 1686562475000,
        updateAt: null,
        listChild: null,
      },
      {
        id: 126,
        code: '123',
        name: 'Macbook Air 1',
        parentId: 121,
        status: 1,
        promotion: 0,
        image: 'natshop/category/20230612/category_1686564485212.jpg',
        createAt: 1686564485000,
        updateAt: null,
        listChild: null,
      },
    ],
  },
  {
    id: 105,
    code: 'MAC',
    name: 'Macbook',
    parentId: null,
    status: 1,
    promotion: 0,
    image: 'natshop/category/20230612/category_1686562745565.jpg',
    createAt: 1686562745000,
    updateAt: null,
    listChild: [
      {
        id: 107,
        code: 'MAC2',
        name: 'Macbook Pro',
        parentId: 105,
        status: 1,
        promotion: 0,
        image: 'natshop/category/20230612/category_1686562793070.jpg',
        createAt: 1686562793000,
        updateAt: null,
        listChild: null,
      },
      {
        id: 106,
        code: 'MAC1',
        name: 'Macbook Air',
        parentId: 105,
        status: 1,
        promotion: 0,
        image: 'natshop/category/20230612/category_1686562769620.jpg',
        createAt: 1686562769000,
        updateAt: null,
        listChild: null,
      },
    ],
  },
];

interface ModalSelectCategoryProps {
  isOpen?: boolean;
  onClose?(): void;
  onConfirm?(e: any[]): void;
}

const ModalSelectCategory: React.FC<ModalSelectCategoryProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const [search, setSearch] = React.useState<string>('');
  const { values, setFieldValue } = useFormikContext();

  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        if (isEmpty(data)) {
          return;
        }
        //setFieldValue('categories', [{ list: data }]);
        setCategories([{ list: data }]);
      } catch (error) {
        console.log('get categories error', error);
      }
    })();
  }, [data]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick size="5xl" isCentered>
      <ModalOverlay />
      <ModalContent p="2">
        <ModalHeader color="text-basic">{t('shop_product.edit_category')}</ModalHeader>
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
              categories.map((item: any, index: number) => {
                const { list } = item;
                return (
                  <Box
                    bg="1"
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
                      list.map((i: any, idx: number) => {
                        return (
                          <CategoryItem
                            item={i}
                            key={idx}
                            isSelected={item.selectedCategory === i}
                            onClick={() => {
                              let updatedCategories = [...categories];

                              // Remove additional levels
                              updatedCategories = updatedCategories.slice(0, index + 1);

                              if (!isEmpty(i.listChild)) {
                                // Add the selected category to the next level
                                updatedCategories.push({ list: i.listChild });
                              }

                              // Update the selected category at the current level
                              updatedCategories[index].selectedCategory = i;

                              //setFieldValue('categories', updatedCategories);
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
            <Box>
              {isEmpty(categories) || !categories[0].selectedCategory ? (
                <Text as="span" textStyle="h3" color="text-body">
                  No category has been chosen
                </Text>
              ) : (
                categories.map((item: any, index: number) => (
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
          </Flex>
          <HStack gap="4">
            <Button
              variant="outline-control"
              minW="150px"
              onClick={() => {
                if (!isEmpty(values.category)) {
                  // If selectedCategory exists, set it back as the selected category
                  // setFieldValue('selectedCategory', values.selectedCategory);
                  // setFieldValue('categories', values.category);
                  setCategories([{ list: data }]);
                  setFieldValue('category', []);
                } else {
                  //setFieldValue('categories', );
                  setCategories([{ list: data }]);
                }
                onClose();
              }}>
              {t('cancel')}
            </Button>
            <Button
              variant="primary"
              disabled={isEmpty(categories) || !categories[categories.length - 1].selectedCategory}
              minW="150px"
              onClick={() => {
                onConfirm(categories);
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
