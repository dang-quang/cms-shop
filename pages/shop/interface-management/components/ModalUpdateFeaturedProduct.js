import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setShowLoader } from 'redux/actions/app';

import numeral from 'numeral';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { IconDelete } from 'components/Icons/Icons';

const feature_products = [
  {
    id: 0,
    image:
      'https://user-images.githubusercontent.com/42206067/237604355-7f173c2d-519e-4347-9da1-3419a49cb47a.png',
    name: 'Áo giữ nhiệt nam',
    price: 50000,
  },
  {
    id: 1,
    image:
      'https://user-images.githubusercontent.com/42206067/237604363-d7e20d2f-c78f-4694-a371-589ecd0758a8.png',
    name: 'Áo phông nam cotton',
    price: 200000,
  },
];

const ModalUpdateFeaturedProduct = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [product, setProduct] = React.useState();
  const [products, setProducts] = React.useState(feature_products);

  const handleUpdate = React.useCallback(async ({}) => {
    try {
      dispatch(setShowLoader(true));
    } finally {
      dispatch(setShowLoader(false));
    }
  }, []);

  const productsTableHeader = [t('no'), t('product'), t('price'), t('delete')];

  const select_products = [
    {
      id: 3,
      image:
        'https://user-images.githubusercontent.com/42206067/237605215-9efe529d-c4c0-4b25-9a82-a70f48ef95bd.png',
      name: 'Áo polo',
      price: 50000,
    },
    {
      id: 4,
      image:
        'https://user-images.githubusercontent.com/42206067/237604363-d7e20d2f-c78f-4694-a371-589ecd0758a8.png',
      name: 'Áo phông nam cotton',
      price: 200000,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex
            mt="-6"
            flexDirection={{ base: 'column', lg: 'row' }}
            alignItems={{ base: 'flex-start', lg: 'center' }}
            bg="primary.100"
            p="4"
            transform="auto"
            borderRadius="2px">
            <Text textStyle="b-sm" color="text-white" textTransform="capitalize" mr="4">
              {t('featured_products')}
            </Text>
          </Flex>
          <Text textStyle="b-sm" color="text-basic" mt="4" mb="4">
            {t('select_featured_products')}
          </Text>
          <HStack
            alignItems="unset"
            justifyContent="unset"
            gap="6"
            mt="8"
            px={{ base: '0', md: '4' }}>
            <Autocomplete
              disablePortal
              autoHighlight
              style={{ flex: 1 }}
              id="feature_product"
              options={select_products}
              getOptionLabel={({ name }) => `${name}`}
              value={product || { id: '', name: '' }}
              onChange={(e, value) => {
                setProduct(value);
              }}
              renderOption={(props, option) => (
                <Flex>
                  <Image
                    w="87px"
                    objectFit="contain"
                    h="60px"
                    borderRadius="2px"
                    mr="3"
                    src={props.image}
                  />
                  <Text textStyle="h3-b" color="text-basic">
                    {props.name}
                  </Text>
                </Flex>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="outlined-trademark"
                  label={t('search')}
                  variant="outlined"
                  style={{ width: '100%' }}
                />
              )}
            />
            <Button children={t('add')} size="lg" variant="primary" minW="150px" />
          </HStack>
          <Box px={{ base: '0', md: '4' }}>
            {products && products.length > 0 && (
              <Box
                px="6"
                borderWidth="1px"
                py="4"
                borderRadius="16px"
                borderColor="bg-border-1"
                mt="12">
                <Text textStyle="h5" color="text-basic">
                  {t('products')}
                </Text>
                <Box overflow="scroll" mt="4">
                  <Table variant="simple" minW="2xl">
                    <Thead h="52px" px="0">
                      <Tr>
                        {productsTableHeader.map((item, index) => {
                          return (
                            <Th
                              borderColor="bg-border-1"
                              fontSize="15px"
                              fontWeight="400"
                              textTransform="capitalize"
                              key={index}
                              isNumeric={index === 3 ? true : false}
                              p="0"
                              color="text-body">
                              {item}
                            </Th>
                          );
                        })}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {products.map((i, idx) => {
                        const { image, name, price } = i;
                        return (
                          <React.Fragment key={idx}>
                            <Tr p="20" pb="20" b>
                              <Td p="0" borderWidth="0">
                                <Text textStyle="h3-b" color="text-basic">
                                  {idx + 1}
                                </Text>
                              </Td>
                              <Td p="0" borderWidth="0">
                                <Flex py="3" alignItems="center">
                                  <Image
                                    src={image}
                                    w="87px"
                                    objectFit="contain"
                                    h="60px"
                                    borderRadius="2px"
                                    mr="3"
                                  />
                                  <Text textStyle="h3-b" color="text-basic">
                                    {name}
                                  </Text>
                                </Flex>
                              </Td>
                              <Td p="0" borderWidth="0">
                                <Text textStyle="h3-b" color="text-basic">
                                  {numeral(price).format('0,0')}
                                </Text>
                              </Td>
                              <Td p="0" borderWidth="0" isNumeric>
                                <Flex justifyContent="flex-end">
                                  <Center boxSize="40px" cursor="pointer">
                                    <Icon
                                      as={IconDelete}
                                      w="24px"
                                      h="24px"
                                      color="primary.100"
                                      cursor="pointer"
                                    />
                                  </Center>
                                </Flex>
                              </Td>
                            </Tr>
                          </React.Fragment>
                        );
                      })}
                    </Tbody>
                  </Table>
                </Box>
              </Box>
            )}
          </Box>
        </ModalBody>
        <ModalFooter justifyContent="center" mt="8">
          <Button variant="control" mr={3} onClick={onClose} minW="135px" marginRight={12}>
            {t('close')}
          </Button>
          <Button variant="primary" minW="135px" onClick={handleUpdate}>
            {t('confirm')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalUpdateFeaturedProduct;
