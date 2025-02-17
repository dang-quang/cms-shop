import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Admin from 'layouts/Admin';
import { useTranslation } from 'react-i18next';

import { FieldArray, Form, Formik } from 'formik';
import * as yup from 'yup';
import { useMultiImageUpload } from 'hooks';
import _, { debounce, isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { setShowLoader, setLoading } from 'redux/actions/app';
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  // Menu,
  // MenuButton,
  // MenuItem,
  // MenuList,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Table,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  //useBoolean,
  useDisclosure,
  useToast,
  Wrap,
} from '@chakra-ui/react';
//import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  FormGroup,
  ModalSelectCategory,
  ProductImage,
  VariationItem,
  VariationTableItem,
  WithAuthentication,
} from 'components';
import { RiImageAddFill } from 'react-icons/ri';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AiFillEdit } from 'react-icons/ai';
import { HiPlus } from 'react-icons/hi';

import { EAppKey, EMode } from 'constants/types';
import { parseNumber } from 'utilities/parseNumber';
import {
  requestCreateUpdateProduct,
  requestGetListCategory,
  requestGetProductInfo,
} from 'utilities/ApiShop';
import { setSelectedCategory } from 'redux/actions/product';
import { BASE_API_URL } from 'utilities/const';
import { loadImage } from 'utilities/loadImage';

const initialValues = {
  id: '',
  category_id: '',
  images: [],
  name: '',
  categories: [],
  description: '',
  brands: [],
  brand: undefined,
  variations: [],
  list_variation: [],
  set_variation: {
    price: '',
    stock: '',
    //sku: '',
  },
  price: '',
  stock: 0,
};

function CreateProduct() {
  const maxImages = 6;
  const toast = useToast();
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const refImages = React.useRef(null);
  const selectedCategory = useSelector((state) => state.product.selectedCategory);
  const { loading } = useSelector((state) => state.app);

  const product =
    !_.isEmpty(router.query) && router.query.mode === EMode.UPDATE ? router.query : undefined;

  const {
    isOpen: isOpenCategory,
    onOpen: onOpenCategory,
    onClose: onCloseCategory,
  } = useDisclosure();
  //const [focus, { on: onFocus, off: offFocus }] = useBoolean(false);

  const handleSubmitProduct = React.useCallback(
    async ({ id, images, name, description, list_variation, price, stock }) => {
      try {
        dispatch(setShowLoader(true));
        dispatch(setLoading(true));

        let _product;
        let _details = [];

        _product = {
          //TODO add shop Id - need update authentication flow
          shopId: 143,
          categoryId: selectedCategory[selectedCategory.length - 1].selectedCategory.id,
          name: name,
          description: description,
        };

        for (let i = 0; i < images.length; i++) {
          if (images[i]) {
            const modifiedImage = images[i].replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
            if (i === 0) {
              _product['image'] = modifiedImage;
            } else {
              _product[`image${i}`] = modifiedImage;
            }
          }
        }
        if (list_variation.length > 0) {
          let listVariationVariations = list_variation.flatMap((item) => item.variations);

          for (let i = 0; i < listVariationVariations.length; i++) {
            listVariationVariations[i].image = listVariationVariations[i].image.replace(
              /^data:image\/(png|jpg|jpeg);base64,/,
              ''
            );
            listVariationVariations[i].stock = parseFloat(listVariationVariations[i].stock);
            listVariationVariations[i].price = parseFloat(listVariationVariations[i].price);
          }

          _details = listVariationVariations;

          _product.details = _details;
          let totalStock = 0;
          let minPrice = Infinity;
          list_variation.forEach((item) => {
            item.variations.forEach((variation) => {
              if (!!variation.stock) {
                totalStock += parseFloat(variation.stock);
              }
              if (parseFloat(variation.price) < minPrice) {
                minPrice = parseFloat(variation.price);
              }
            });
          });

          _product.price = minPrice;
          _product.stock = totalStock;
        } else {
          _product.price = parseFloat(price);
          _product.stock = parseFloat(stock);
        }

        if (product) {
          _product.id = parseFloat(product.id);

          const res = await requestCreateUpdateProduct(_product);
          if (res.code === EAppKey.MSG_SUCCESS) {
            toast({
              position: 'top',
              title: t('success'),
              description: t('update_product_success'),
              status: 'success',
              duration: 2000,
              isClosable: true,
              onCloseComplete: () => {
                dispatch(setSelectedCategory([]));
                router.push('/shop/product');
                dispatch(setLoading(false));
              },
            });
          } else {
            toast({
              position: 'top',
              title: t('error'),
              description: t('update_product_failed'),
              status: 'error',
              duration: 2000,
              isClosable: true,
              onCloseComplete: () => {
                dispatch(setLoading(false));
              },
            });
          }
        } else {
          const res = await requestCreateUpdateProduct(_product);
          if (res.code === EAppKey.MSG_SUCCESS) {
            toast({
              position: 'top',
              title: t('success'),
              description: t('create_product_success'),
              status: 'success',
              duration: 2000,
              isClosable: true,
              onCloseComplete: () => {
                dispatch(setSelectedCategory([]));
                router.push('/shop/product');
                dispatch(setLoading(false));
              },
            });
          } else {
            toast({
              position: 'top',
              title: t('error'),
              description: t('create_product_failed'),
              status: 'error',
              duration: 2000,
              isClosable: true,
              onCloseComplete: () => {
                dispatch(setLoading(false));
              },
            });
          }
        }
      } finally {
        dispatch(setShowLoader(false));
      }
    },
    [product, selectedCategory]
  );

  const validationSchema = yup.object().shape({
    images: yup
      .array()
      .required(t('error_field_empty'))
      .min(1, t('shop_product.error_image_missing')),
    name: yup
      .string()
      .required(t('error_field_empty'))
      .matches(/^\S(.*\S)?$/, t('error_whitespace_not_allowed'))
      .min(10, t('shop_product.error_product_name_too_short'), { min: 10 }),
    description: yup
      .string()
      .required(t('error_field_empty'))
      .min(100, t('shop_product.error_product_description_too_short')),
    set_variation: yup.object().shape({
      price: yup.number().min(1000, ({ min }) => t('error_price_minimum', { min })),
    }),
    variations: yup.array().of(
      yup.object().shape({
        name: yup.string().when('isShow', {
          is: true,
          then: yup
            .string()
            .required(t('error_field_empty'))
            .test('unique-name', t('shop_product.name_variations_exist'), function (value) {
              const { variations } = this.options.context;
              const existingVariation =
                variations &&
                variations.find(
                  (variation) => variation.name === value && variation !== this.parent
                );
              return !existingVariation;
            }),
          otherwise: yup.string(),
        }),
        isShow: yup.boolean(),
        options: yup.lazy((value) => {
          if (value && value.length > 1) {
            return yup.array().of(
              yup
                .string()
                .trim()
                .test('unique', t('shop_product.name_variations_exist'), function (option) {
                  if (option === '' || option === undefined) {
                    return true;
                  }
                  return this.parent.filter((item) => item === option).length === 1;
                })
            );
          }

          return yup
            .array()
            .of(
              yup
                .string()
                .trim()
                .required((_, index) => {
                  return index === 0 && this.options.context.isShow && value.length > 0
                    ? t('error_field_empty')
                    : null;
                })
            )
            .min(1, t('error_field_empty'));
        }),
      })
    ),
    list_variation: yup.array().of(
      yup.object().shape({
        variations: yup
          .array()
          .of(
            yup.object().shape({
              price: yup
                .number()
                .typeError(t('error_price_minimum'))
                .min(1000, t('error_price_minimum'))
                .required(t('error_field_empty')),
            })
          )
          .min(1, t('error_field_empty')),
      })
    ),
    price: yup
      .number()
      .min(1000, t('error_price_minimum'))
      .when('list_variation', {
        is: (listVariation) => !listVariation || listVariation.length === 0,
        then: yup.number().required(t('error_field_empty')),
      }),
    //TODO if the product has brand
    //brand: yup.object().required(t('error_field_empty')),
  });

  return (
    <Formik
      validateOnChange={false}
      validationSchema={validationSchema}
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleSubmitProduct}>
      {({
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldError,
        validateField,
        values,
        errors,
        isSubmitting,
      }) => {
        const validateDebounced = debounce(validateField, 300);

        React.useEffect(() => {
          (async () => {
            const res = await requestGetListCategory({});
            if (res && res.code === EAppKey.MSG_SUCCESS) {
              setFieldValue('categories', res.categoryList);
            }
          })();
        }, []);

        React.useEffect(() => {
          (async () => {
            try {
              if (product) {
                dispatch(setShowLoader(true));
                const res = await requestGetProductInfo({ productId: parseFloat(product.id) });

                if (res && res.code === EAppKey.MSG_SUCCESS) {
                  let _product = res.product;
                  let variations = res.variationInfo;
                  let list_variation = res.productDetailInfo;

                  if (_product && !isEmpty(_product.listImage)) {
                    const loadImages = async () => {
                      const _images = [];

                      await Promise.allSettled(
                        _product.listImage.map(
                          (image) =>
                            new Promise((resolve) => {
                              const str = BASE_API_URL + '/assets/' + image;
                              const img = new Image();

                              img.crossOrigin = 'anonymous';
                              img.src = str;

                              img.onload = async () => {
                                const canvas = document.createElement('canvas');
                                canvas.width = img.width;
                                canvas.height = img.height;

                                const ctx = canvas.getContext('2d');
                                ctx.drawImage(img, 0, 0);

                                const dataURL = canvas.toDataURL('image/png');
                                _images.push(dataURL);
                                resolve();
                              };

                              img.onerror = () => {
                                console.error('Failed to load image: ' + str);
                                resolve(); // Resolve even if the image fails to load
                              };
                            })
                        )
                      );

                      setFieldValue('images', _images);
                    };

                    loadImages();
                  }

                  setFieldValue('name', _product.name);
                  setFieldValue('description', _product.description);
                  setFieldValue('category_id', _product.categoryId);
                  if (!_product.productDetail || isEmpty(_product.productDetail)) {
                    setFieldValue('price', _product.price);
                    setFieldValue('stock', _product.stock);
                  }

                  let _variations = [];

                  if (isEmpty(variations) || isEmpty(list_variation)) {
                    return;
                  }

                  for (const i in variations) {
                    const _options = Array.from(variations[i].details, (details) => details.name);
                    const newName = variations[i].name;

                    const existingIndex = _variations.findIndex((item) => item.name === newName);

                    if (existingIndex === -1) {
                      _variations.push({
                        name: newName,
                        options: Array.from(new Set(_options)),
                        isShow: true,
                      });
                    } else {
                      const uniqueOptions = new Set([
                        ..._variations[existingIndex].options,
                        ..._options,
                      ]);
                      _variations[existingIndex].options = Array.from(uniqueOptions);
                    }
                  }

                  setFieldValue('variations', _variations);

                  if (!!list_variation && !isEmpty(list_variation)) {
                    const list3 = await Promise.all(
                      _variations[0].options.map(async (parentVariation, index) => {
                        const variations = await Promise.all(
                          list_variation
                            .filter((product) => product.name.includes(parentVariation))
                            .map(async (product) => {
                              const childVariationIndex = _variations[1].options.indexOf(
                                product.name.split(', ')[2]
                              );

                              const str = BASE_API_URL + '/assets/' + product.image;
                              const _image = await loadImage(str);

                              return {
                                id: product.id,
                                parentVariationTitle: _variations[0].name,
                                childVariationTitle: _variations[1].name,
                                childVariationValue: _variations[1].options[childVariationIndex],
                                parentVariationValue: parentVariation,
                                image: _image,
                                price: product.price,
                                stock: product.stock,
                              };
                            })
                        );

                        return { variations };
                      })
                    );

                    setFieldValue('list_variation', list3);
                  }

                  _variations = _variations.map((i) => {
                    return {
                      ...i,
                      options: [...i.options, ''],
                    };
                  });

                  setFieldValue('variations', _variations);
                }
              }
            } catch (e) {
              console.log('error get product by id', e);
            } finally {
              setTimeout(() => {
                dispatch(setShowLoader(false));
              }, 1000);
            }
          })();
        }, [product, values.categories]);

        const { onUploader } = useMultiImageUpload((images) => {
          try {
            let updatedImages = [...values.images];
            const remainingSlots = maxImages - updatedImages.length;
            const imagesToAdd = images.slice(0, remainingSlots);

            if (imagesToAdd.length === 0) {
              toast({
                title: t('shop_product.maximum_of_files_allowed', { number: maxImages }),
                status: 'error',
                position: 'top',
              });
              return;
            }

            updatedImages = [...updatedImages, ...imagesToAdd];
            setFieldValue('images', updatedImages);
            validateField('images');
          } catch (error) {
            console.log('error upload image', error);
          }
        });

        const handleDragEnd = (result) => {
          if (!result.destination) return;

          const updatedItems = [...values.images];
          const [removed] = updatedItems.splice(result.source.index, 1);
          updatedItems.splice(result.destination.index, 0, removed);

          setFieldValue('images', updatedItems);
        };

        return (
          <Form>
            <Box mt="6" bg="bg-1" shadow="md" borderRadius="4px" p="6">
              <Text textStyle="h5-b" color="text-basic" mb="6">
                {t('basic_information')}
              </Text>
              <FormGroup title={t('shop_product.product_images')}>
                <Text color="red" textStyle="b-xs">
                  *{' '}
                  <Text as="span" color="text-basic" textStyle="b-sm">
                    {t('ratio_image')}
                  </Text>
                </Text>
              </FormGroup>
              <FormGroup title="" mt="2">
                <FormControl isInvalid={!!errors.images}>
                  <FieldArray
                    name="images"
                    render={({ remove }) => {
                      return (
                        <DragDropContext onDragEnd={handleDragEnd}>
                          <Droppable droppableId="droppable" direction="horizontal">
                            {(provided) => (
                              <Wrap
                                spacing="4"
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                {values.images.map((item, index) => (
                                  <Draggable
                                    key={`${item}-${index}`}
                                    draggableId={item}
                                    index={index}>
                                    {(provided) => (
                                      <Flex
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        <ProductImage
                                          image={item}
                                          isCover={index === 0}
                                          onDelete={() => remove(index)}
                                        />
                                      </Flex>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                                <AspectRatio
                                  onClick={() => refImages.current.click()}
                                  borderStyle="dashed"
                                  cursor="pointer"
                                  display={values.images.length >= maxImages ? 'none' : 'block'}
                                  w="80px"
                                  ratio={1 / 1}
                                  borderWidth="1px"
                                  borderColor="border-3"
                                  borderRadius="4px"
                                  flexDirection="column"
                                  _hover={{
                                    bg: 'primary.600',
                                    borderColor: 'primary.100',
                                  }}>
                                  <Box w="100%" h="100%" flexDirection="column">
                                    <Icon as={RiImageAddFill} boxSize="20px" color="text-primary" />
                                    <Text textStyle="b-xs" color="text-primary" mt="1">
                                      {t('add_image')}
                                    </Text>
                                    <Text textStyle="b-xs" color="text-primary" mt="1">
                                      {values.images.length}/{maxImages}
                                    </Text>
                                    <Input
                                      ref={refImages}
                                      accept="image/*"
                                      id="icon-button-file"
                                      type="file"
                                      multiple
                                      display="none"
                                      onChange={onUploader}
                                    />
                                  </Box>
                                </AspectRatio>
                              </Wrap>
                            )}
                          </Droppable>
                        </DragDropContext>
                      );
                    }}
                  />
                  <FormErrorMessage>{errors.images}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title={t('product_name')} mt="6" isRequire>
                <FormControl isInvalid={!!errors.name}>
                  <InputGroup>
                    <Input
                      id="name"
                      name="name"
                      placeholder={t('input')}
                      autoComplete="off"
                      value={values.name}
                      onChange={(e) => {
                        handleChange(e);
                        validateDebounced('name');
                      }}
                      pr="100px"
                      maxLength={120}
                    />
                    <InputRightElement
                      pointerEvents="none"
                      w="100px"
                      borderLeftWidth="1px"
                      borderColor="border-5">
                      <Center h="full">
                        <Text textStyle="h4" color="text-body">
                          {values.name.length}/120
                        </Text>
                      </Center>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title={t('shop_product.category')} mt="6" isRequire>
                <Flex
                  borderWidth="1px"
                  borderColor="border-5"
                  cursor="pointer"
                  onClick={onOpenCategory}
                  borderRadius="4px"
                  h="40px"
                  _hover={{ borderColor: 'border-3' }}
                  alignItems="center">
                  <Box flex="1" px="4">
                    {selectedCategory && selectedCategory.length > 0 ? (
                      selectedCategory.map((item, index) => (
                        <Text as="span" key={index}>
                          <Text as="span" textStyle="h4" color="text-basic" key={index}>
                            {item && item.selectedCategory ? `${item.selectedCategory.name} ` : ''}
                            {index < selectedCategory.length - 1 &&
                            selectedCategory[index + 1] &&
                            selectedCategory[index + 1].selectedCategory
                              ? '> '
                              : ''}
                          </Text>
                        </Text>
                      ))
                    ) : (
                      <Text textStyle="h4" color="text-placeholder">
                        {t('shop_product.please_set_category')}
                      </Text>
                    )}
                  </Box>
                  <Center w="100px">
                    <Icon as={AiFillEdit} w="20px" h="20px" color="text-body" />
                  </Center>
                </Flex>
              </FormGroup>
              {/* <FormGroup title={t('shop_product.brand')} mt="6" isRequire>
                <FormControl isInvalid={!!errors.brand}>
                  <Menu onClose={offFocus} matchWidth>
                    <MenuButton
                      bg="bg-1"
                      w="full"
                      h="40px"
                      borderWidth="1px"
                      borderRadius="4px"
                      borderColor={!!errors.brand ? 'red' : 'border-5'}
                      _hover={{ borderColor: !!errors.brand ? 'red' : 'border-3' }}
                      _active={{ bg: 'bg-1' }}
                      onClick={onFocus}>
                      <Flex flex="1" justifyContent="space-between" px="4" alignItems="center">
                        {values.brand ? (
                          <Text noOfLines={1} color="text-basic" textStyle="h4">
                            {brand.name}
                          </Text>
                        ) : (
                          <Text textStyle="h4" color="text-placeholder">
                            {t('shop_product.please_select')}
                          </Text>
                        )}
                        <Icon
                          color="text-basic"
                          as={focus ? ChevronUpIcon : ChevronDownIcon}
                          w="16px"
                          h="16px"
                        />
                      </Flex>
                    </MenuButton>
                    {!isEmpty(values.brands) && (
                      <MenuList w="full">
                        {values.brands.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              minH="48px"
                              onClick={() => setFieldValue('brand', item)}>
                              <span>{item.name}</span>
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    )}
                  </Menu>
                  <FormErrorMessage>{errors.brand}</FormErrorMessage>
                </FormControl>
              </FormGroup> */}
              <FormGroup
                title={t('shop_product.product_description')}
                mt="6"
                isRequire
                isCentered={false}>
                <FormControl isInvalid={!!errors.description}>
                  <InputGroup>
                    <Box w="full">
                      <Textarea
                        id="description"
                        name="description"
                        maxLength={3000}
                        rows={6}
                        placeholder=" "
                        autoComplete="off"
                        value={values.description}
                        onChange={(e) => {
                          handleChange(e);
                          validateDebounced('description');
                        }}
                      />
                    </Box>
                  </InputGroup>
                  <Flex alignItems="center" justifyContent="space-between">
                    {errors.description ? (
                      <FormErrorMessage>{errors.description}</FormErrorMessage>
                    ) : (
                      <Text></Text>
                    )}
                    <FormHelperText color="text-body">
                      {values.description.length}/3000
                    </FormHelperText>
                  </Flex>
                </FormControl>
              </FormGroup>
            </Box>
            <Box mt="6" bg="bg-1" shadow="md" borderRadius="4px" p="6">
              <Text
                textStyle="h5-b"
                color="text-basic"
                mb="6"
                opacity={isEmpty(selectedCategory) ? 0.6 : 1}>
                {t('shop_product.sales_information')}
              </Text>
              {isEmpty(selectedCategory) ? (
                <Text opacity={0.6} color="text-basic" textStyle="h4">
                  {t('shop_product.available_after_select_category')}
                </Text>
              ) : (
                <>
                  <FormGroup title={t('shop_product.variations')} mt="6" isCentered={false}>
                    <FieldArray
                      name="variations"
                      render={() => {
                        return (
                          <Box spacing="4">
                            {isEmpty(values.variations) ? (
                              <Button
                                leftIcon={<HiPlus />}
                                variant="border-outline-primary"
                                children={t('shop_product.enable_variations')}
                                onClick={() => {
                                  setFieldValue('variations', [
                                    { name: '', options: [''], isShow: true },
                                    { name: '', options: [''], isShow: false },
                                  ]);
                                  setFieldValue('list_variation', [
                                    {
                                      variations: [
                                        {
                                          parentVariationTitle: '',
                                          childVariationTitle: '',
                                          childVariationValue: '',
                                          parentVariationValue: '',
                                          image: '',
                                          price: '',
                                          stock: 0,
                                          //sku: '',
                                        },
                                      ],
                                    },
                                  ]);
                                }}
                              />
                            ) : (
                              <Flex flexDirection="column" gap="6">
                                {values.variations.map((variation, index) => {
                                  return (
                                    <VariationItem item={variation} index={index} key={index} />
                                  );
                                })}
                              </Flex>
                            )}
                          </Box>
                        );
                      }}
                    />
                  </FormGroup>
                  {!isEmpty(values.list_variation) && (
                    <FormGroup title={t('shop_product.variation_list')} isCentered={false} mt="6">
                      <Flex flex="1">
                        <SimpleGrid columns={2} flex="1">
                          <FormControl isInvalid={!!errors?.set_variation?.price}>
                            <InputGroup>
                              <Box w="full">
                                <NumberInput
                                  id="set_variation.price"
                                  name="set_variation.price"
                                  mr="-1px"
                                  _hover={{ zIndex: 1 }}
                                  zIndex={!!errors?.set_variation?.price ? 1 : 'unset'}
                                  value={values.set_variation.price}
                                  onChange={(e) => {
                                    setFieldValue('set_variation.price', parseNumber(e));
                                    validateDebounced('set_variation.price');
                                  }}>
                                  <NumberInputField
                                    pl="54px"
                                    borderTopRightRadius="0px"
                                    borderBottomRightRadius="0px"
                                    placeholder={t('price')}
                                  />
                                </NumberInput>
                              </Box>
                              <InputLeftElement
                                pointerEvents="none"
                                h="full"
                                w="50px"
                                borderRightWidth="1px"
                                borderColor="border-5">
                                <Text textStyle="h2" color="text-body">
                                  HTG
                                </Text>
                              </InputLeftElement>
                            </InputGroup>
                            <FormErrorMessage>{errors?.set_variation?.price}</FormErrorMessage>
                          </FormControl>
                          <FormControl isInvalid={!!errors?.set_variation?.stock}>
                            <InputGroup>
                              <Box w="full">
                                <NumberInput
                                  _hover={{ zIndex: 1 }}
                                  value={values.set_variation.stock}
                                  onChange={(e) => {
                                    setFieldValue('set_variation.stock', parseNumber(e));
                                  }}>
                                  <NumberInputField borderRadius="0px" placeholder={t('stock')} />
                                </NumberInput>
                              </Box>
                            </InputGroup>
                            <FormErrorMessage>{errors?.set_variation?.stock}</FormErrorMessage>
                          </FormControl>
                          {/* <FormControl isInvalid={!!errors?.set_variation?.sku}>
                        <InputGroup>
                          <Box w="full">
                            <Input
                              placeholder={t('sku')}
                              ml="-1px"
                              borderTopLeftRadius="0px"
                              borderBottomLeftRadius="0px"
                              _hover={{ zIndex: 1 }}
                              value={values.set_variation.sku}
                              onChange={(e) => setFieldValue('set_variation.sku', e.target.value)}
                            />
                          </Box>
                        </InputGroup>
                        <FormErrorMessage>{errors?.set_variation?.sku}</FormErrorMessage>
                      </FormControl> */}
                        </SimpleGrid>
                        <Button
                          variant="primary"
                          children={t('apply_to_all')}
                          w="140px"
                          ml="4"
                          disabled={
                            values.set_variation.price === '' && values.set_variation.stock === ''
                            // && values.set_variation.sku === ''
                          }
                          onClick={() => {
                            const { price, stock } = values.set_variation;

                            if (!!price && price < 1000) {
                              setFieldError('set_variation.price', t('error_price_minimum'));
                              return;
                            }

                            if (!!errors?.set_variation?.price) {
                              setFieldError('set_variation.price', '');
                            }

                            const _list_variation = values.list_variation.map((variation) => ({
                              ...variation,
                              variations: variation.variations.map((item) => ({
                                ...item,
                                price: price !== '' ? price : item.price,
                                stock: stock !== '' ? stock : item.stock,
                                //sku,
                              })),
                            }));

                            setFieldValue('list_variation', _list_variation);
                          }}
                        />
                      </Flex>
                      <Box borderRadius="4px" mt="6">
                        <Table
                          variant="simple"
                          borderRadius="4px"
                          borderWidth="1px"
                          borderColor="border-5">
                          <Thead
                            h="52px"
                            bg="bg-2"
                            borderWidth="1px"
                            borderColor="border-5"
                            borderRadius="4px">
                            <Tr>
                              <Th
                                w="15%"
                                borderBottomWidth="0px"
                                color="text-note"
                                borderRightWidth="1px"
                                borderWidth="1px"
                                textStyle="b-md"
                                borderColor="border-5"
                                textTransform="none">
                                <Center>
                                  {values.variations[0].name
                                    ? values.variations[0].name
                                    : 'Variation 1'}
                                </Center>
                              </Th>
                              {values.variations[1].isShow && (
                                <Th
                                  w="15%"
                                  borderBottomWidth="0px"
                                  color="text-note"
                                  borderRightWidth="1px"
                                  textStyle="b-md"
                                  borderColor="border-5"
                                  textTransform="none">
                                  <Center>
                                    {values.variations[1].name
                                      ? values.variations[1].name
                                      : 'Variation 2'}
                                  </Center>
                                </Th>
                              )}
                              <Th
                                w="35%"
                                borderBottomWidth="0px"
                                color="text-note"
                                borderRightWidth="1px"
                                textStyle="b-md"
                                borderColor="border-5"
                                textTransform="capitalize">
                                <Center>{t('price')}</Center>
                              </Th>
                              <Th
                                w="35%"
                                borderBottomWidth="0px"
                                color="text-note"
                                borderRightWidth="1px"
                                textStyle="b-md"
                                borderColor="border-5"
                                textTransform="capitalize">
                                <Center>{t('stock')}</Center>
                              </Th>
                              {false && (
                                <Th
                                  w="25%"
                                  borderBottomWidth="0px"
                                  color="text-note"
                                  borderRightWidth="1px"
                                  textStyle="b-md"
                                  borderColor="border-5"
                                  textTransform="capitalize">
                                  <Center>{t('sku')}</Center>
                                </Th>
                              )}
                            </Tr>
                          </Thead>
                          {values.list_variation.map((item, index) => {
                            return <VariationTableItem item={item} key={index} index={index} />;
                          })}
                        </Table>
                      </Box>
                    </FormGroup>
                  )}
                  {isEmpty(values.list_variation) && (
                    <>
                      <FormGroup title={t('price')} isRequire mt="6">
                        <FormControl isInvalid={!!errors?.price}>
                          <InputGroup>
                            <Box w="full">
                              <NumberInput
                                id="price"
                                name="price"
                                w="50%"
                                value={values.price}
                                onChange={(e) => {
                                  setFieldValue('price', parseNumber(e));
                                  validateDebounced('price');
                                }}>
                                <NumberInputField pl="54px" placeholder={t('input')} />
                              </NumberInput>
                            </Box>
                            <InputLeftElement
                              pointerEvents="none"
                              h="full"
                              w="50px"
                              borderRightWidth="1px"
                              borderColor="border-5">
                              <Text textStyle="h2" color="text-body">
                                HTG
                              </Text>
                            </InputLeftElement>
                          </InputGroup>
                          <FormErrorMessage>{errors?.price}</FormErrorMessage>
                        </FormControl>
                      </FormGroup>
                      <FormGroup title={t('stock')} isRequire mt="6">
                        <FormControl isInvalid={!!errors?.stock}>
                          <InputGroup>
                            <NumberInput
                              id="stock"
                              name="stock"
                              w="50%"
                              autoComplete="off"
                              value={values.stock}
                              onChange={(e) => {
                                setFieldValue('stock', parseNumber(e));
                              }}>
                              <NumberInputField placeholder={t('input')} />
                            </NumberInput>
                          </InputGroup>
                          <FormErrorMessage>{errors?.stock}</FormErrorMessage>
                        </FormControl>
                      </FormGroup>
                    </>
                  )}
                </>
              )}
            </Box>
            <Flex mt="6" alignItems="center" justifyContent="flex-end">
              <Button
                variant="outline-control"
                minW="80px"
                size="sm"
                mr="4"
                disabled={isSubmitting || loading}
                onClick={() => router.back()}>
                {t('cancel')}
              </Button>
              <Button
                variant="primary"
                minW="80px"
                size="sm"
                disabled={isEmpty(selectedCategory) || isSubmitting || loading}
                onClick={() => handleSubmit()}>
                {t('confirm')}
              </Button>
            </Flex>
            <ModalSelectCategory
              data={values.categories}
              title={t('shop_product.edit_category')}
              categoryId={values.category_id}
              isOpen={isOpenCategory}
              selectedItem={selectedCategory}
              onClose={onCloseCategory}
              onCloseSelected={(e) => dispatch(setSelectedCategory(e))}
              onConfirm={(e) => dispatch(setSelectedCategory(e))}
            />
          </Form>
        );
      }}
    </Formik>
  );
}

CreateProduct.layout = Admin;

export default WithAuthentication(CreateProduct);
