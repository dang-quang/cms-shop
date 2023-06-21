import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Input,
  Icon,
  Flex,
  InputGroup,
  InputRightElement,
  useBoolean,
  Text,
  Image,
  Center,
  HStack,
  Button,
  useDisclosure,
  Checkbox,
} from '@chakra-ui/react';
import { usePagination } from '@ajna/pagination';
import { useTranslation } from 'react-i18next';

import Images from 'assets';
import { isEmpty } from 'lodash';
import { requestGetListShopProduct, requestUpdateStatusProduct } from 'utilities/ApiShop';
import { useDispatch } from 'react-redux';
import { setShowLoader } from 'redux/actions/app';
import { EAppKey, EProductType } from 'constants/types';
import { NotificationManager } from 'react-light-notifications';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { ModalConfirm, PaginationPanel, ShopProductItem } from 'components';

const TableLive = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const pageSize = 50;

  const [products, setProducts] = React.useState([]);
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [selectAll, { toggle: toggleSelectAll, off: offSelectAll, on: onSelectAll }] =
    useBoolean(false);
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const { isOpen: isOpenDeList, onOpen: onOpenDeList, onClose: onCloseDeList } = useDisclosure();
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [search, setSearch] = React.useState('');
  const [doSearch, { on: onSearch, off: offSearch }] = useBoolean(false);

  const headers = [
    t('product_name'),
    t('shop_product.variations'),
    t('price'),
    t('stock'),
    t('sales'),
    t('action'),
  ];

  const { pages, pagesCount, currentPage, setCurrentPage, isDisabled } = usePagination({
    total: totalRecords,
    limits: {
      outer: 1,
      inner: 2,
    },
    initialState: {
      pageSize: pageSize,
      isDisabled: false,
      currentPage: 1,
    },
  });

  React.useEffect(() => {
    (async () => {
      try {
        dispatch(setShowLoader(true));
        const res = await requestGetListShopProduct({
          id: 143,
          page: 1,
          type: EProductType.STOCK,
        });

        if (res && res.code === EAppKey.MSG_SUCCESS && res.dataProduct) {
          setProducts(res.dataProduct);
          setTotalPage(res.totalPages);
          setTotalRecords(res.totalRecords);
        } else {
          NotificationManager.error({
            title: t('error'),
            message: `No data exists`,
          });
        }
      } catch (e) {
        console.log('get shop products error', e);
      } finally {
        dispatch(setShowLoader(false));
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        let key;
        if (doSearch) {
          dispatch(setShowLoader(true));
          if (doSearch) {
            key = search;
          }

          const res = await requestGetListShopProduct({
            keyWord: key,
            page: currentPage,
            type: EProductType.STOCK,
          });

          if (res.code === EAppKey.MSG_SUCCESS && res.data && res.data.results) {
            setProducts(res.data.results === null ? [] : res.data.results);
            setTotalPage(res.data.totalPages);
            setTotalRecords(res.data.totalRecords);
          } else {
            setProducts([]);
            setTotalPage(1);
            setTotalRecords(0);
            NotificationManager.error({
              title: t('no_results_found'),
              message: t('no_results_found_for_your_search'),
            });
          }
        }
      } finally {
        dispatch(setShowLoader(false));
        offSearch();
      }
    })();
  }, [doSearch, currentPage, search]);

  const handleSelectAll = React.useCallback(() => {
    if (isEmpty(products)) {
      return;
    }

    toggleSelectAll();
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products);
    }
  }, [selectAll, products]);

  const handleSelectItem = React.useCallback(
    (item) => {
      const exist = selectedProducts.find((i) => i.id === item.id);

      if (exist) {
        const updatedProducts = selectedProducts.filter((i) => i.id !== item.id);
        setSelectedProducts(updatedProducts);
      } else {
        const updatedProducts = [...selectedProducts, item];
        setSelectedProducts(updatedProducts);
      }

      const areAllSelected = selectedProducts.length === products.length;
      if (areAllSelected && !selectAll) {
        offSelectAll();
      } else if (!areAllSelected && selectAll) {
        onSelectAll();
      }
    },
    [selectedProducts, products, selectAll]
  );

  const handleDeleteProducts = React.useCallback(async () => {
    try {
      offShowModal();
      dispatch(setShowLoader(true));

      const ids = Array.from(products, (product) => product.id);

      const res = await requestUpdateStatusProduct({ ids: ids, type: EAppKey.DELETE });
      if (res.code === EAppKey.MSG_SUCCESS) {
        setSelectedProducts([]);
        router.push('/admin/product');
      } else {
        NotificationManager.error({
          title: t('error'),
          message: res.message ? res.message.text : 'Error',
        });
      }
    } catch (error) {
      console.log('delete product error');
    } finally {
      dispatch(setShowLoader(false));
    }
  }, [selectedProducts]);

  const handleDeListProducts = React.useCallback(async () => {
    try {
      offShowModal();
      dispatch(setShowLoader(true));

      const ids = Array.from(products, (product) => product.id);

      const res = await requestUpdateStatusProduct({ ids: ids, type: EAppKey.DELIST });
      if (res.code === EAppKey.MSG_SUCCESS) {
        setSelectedProducts([]);
        router.push('/admin/product');
      } else {
        NotificationManager.error({
          title: t('error'),
          message: res.message ? res.message.text : 'Error',
        });
      }
    } catch (error) {
      console.log('delist product error');
    } finally {
      dispatch(setShowLoader(false));
    }
  }, [selectedProducts]);

  return (
    <Box>
      <InputGroup maxW="570px" borderRadius="4px" overflow="hidden">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('search_product_name')}
        />
        <InputRightElement borderRadius="4px" cursor="pointer" h="full" bg="primary.100" w="100px">
          <Center onClick={onSearch}>
            <Icon as={AiOutlineSearch} w="24px" h="24px" color="white" />
          </Center>
        </InputRightElement>
      </InputGroup>
      <Box
        mt="8"
        overflow="auto"
        position="relative"
        minH={isEmpty(products) ? '300px' : 'unset'}
        borderWidth="1px"
        borderRadius="4"
        borderColor="border-5">
        <Table variant="simple" minW="5xl">
          <Thead h="52px" bg="bg-2">
            <Tr>
              {headers.map((item, index) => {
                return (
                  <Th
                    key={index}
                    borderBottomWidth="0px"
                    w={index === 0 ? '35%' : 'unset'}
                    color="text-note"
                    textStyle="b-md"
                    textTransform="capitalize"
                    isNumeric={index === headers.length - 1}>
                    {index === 0 && (
                      <Checkbox isChecked={selectAll} onChange={handleSelectAll} mr="2" />
                    )}
                    {item}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          {isEmpty(products) ? (
            <Box h="220px" position="absolute" insetX="0">
              <Center
                h="220px"
                position="absolute"
                insetX="0"
                flexDirection="column"
                alignSelf="center">
                <Image w="150px" h="100px" src={Images.no_data} />
                <Text textStyle="body" textAlign="center" color="primary.100" mt="1">
                  {t('no_products_found')}
                </Text>
              </Center>
            </Box>
          ) : (
            products.map((item, index) => {
              const isChecked =
                selectedProducts && !!selectedProducts.find((i) => i.id === item.id);

              return (
                <ShopProductItem
                  item={item}
                  key={index}
                  isChecked={isChecked}
                  isLast={index === products.length - 1}
                  onClick={() => handleSelectItem(item)}
                />
              );
            })
          )}
        </Table>
        {!isEmpty(products) && (
          <Flex
            justifyContent="space-between"
            alignItems="center"
            borderTopWidth="1px"
            borderColor="border-5"
            px="6"
            py="4">
            <PaginationPanel
              pagesCount={pagesCount}
              currentPage={currentPage}
              isDisabled={isDisabled}
              onPageChange={(page) => {
                setProducts([]);
                setCurrentPage(page);
              }}
              pages={pages}
            />
            <Text textStyle="h4-m">
              {t('results_page', {
                start: (currentPage - 1) * 50 + 1,
                end: (currentPage - 1) * 50 + products.length,
                total: totalRecords ?? 0,
              })}
            </Text>
          </Flex>
        )}
        {!isEmpty(selectedProducts) && (
          <Flex justifyContent="space-between" alignItems="center" px="6" py="4">
            <HStack>
              <Checkbox isChecked={selectAll} onChange={handleSelectAll} />
              <Text color="text-basic" textStyle="h3">
                {t('select_all')}
              </Text>
            </HStack>
            <HStack gap="4">
              <Button
                variant="outline-control"
                minW="120px"
                children={t('delete')}
                onClick={onOpenDelete}
              />
              <Button
                variant="outline-control"
                minW="120px"
                children={t('de_listed')}
                onClick={onOpenDeList}
              />
            </HStack>
          </Flex>
        )}
      </Box>
      <ModalConfirm
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        title={t('shop_product.delete_product')}
        description={t('shop_product.delete_product_description')}
        buttonLeft={{ title: t('cancel'), onClick: onCloseDelete }}
        buttonRight={{ title: t('delete'), onClick: handleDeleteProducts }}
      />
      <ModalConfirm
        isOpen={isOpenDeList}
        onClose={onCloseDeList}
        title={t('shop_product.delist_selected_products', { number: selectedProducts.length })}
        description={t('shop_product.delist_selected_products_description')}
        buttonLeft={{ title: t('cancel'), onClick: onCloseDelete }}
        buttonRight={{ title: t('confirm'), onClick: handleDeListProducts }}
      />
    </Box>
  );
};

export default TableLive;
