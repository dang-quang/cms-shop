import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { FiTrash2 } from 'react-icons/fi';
import _ from 'lodash';
import { IoCloseOutline } from 'react-icons/io5';
import { HiPlus } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

const VariationItem = ({ item, index }) => {
  const { t } = useTranslation();
  const { name, options, isShow } = item;

  const { values, setFieldValue, setFieldTouched, validateField, errors } = useFormikContext();

  return (
    <Flex gap="4" flexDirection="column" bg="bg-2" borderRadius="4px" p="4" position="relative">
      <Flex>
        <Flex w="100px" justifyContent="flex-end" pr="4">
          <Text textAlign="right" textStyle="h3" color="text-basic" mt="2">
            {t('shop_product.variation', { number: index + 1 })}
          </Text>
        </Flex>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6" flex="1">
          <Flex>
            {!isShow && index === 1 ? (
              <Button
                size="sm"
                leftIcon={<HiPlus />}
                variant="outline-primary"
                children={t('shop_product.enable_variations')}
                onClick={() => setFieldValue(`variations.${1}.isShow`, true)}
              />
            ) : (
              <Box w="full">
                <FormControl isInvalid={!!errors.variations?.[index]?.name}>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder={`eg:${index === 0 ? 'colour' : 'size'} etc.`}
                      autoComplete="off"
                      value={name}
                      size="sm"
                      onChange={(e) => {
                        const { value } = e.target;
                        setFieldValue(`variations.${index}.name`, value);
                        setFieldTouched(`variations.${index}.name`, true, false);
                        //validateField(`variations.${index}`);

                        if (index === 0) {
                          for (let i = 0; i < values.list_variation.length; i++) {
                            const variation = values.list_variation[i];

                            variation.variations.forEach((subVariation, number) => {
                              setFieldValue(
                                `list_variation.${i}.variations.${number}.parentVariationTitle`,
                                value
                              );
                            });
                          }
                        } else {
                          for (let i = 0; i < values.list_variation.length; i++) {
                            const variation = values.list_variation[i];

                            variation.variations.forEach((subVariation, number) => {
                              setFieldValue(
                                `list_variation.${i}.variations.${number}.childVariationTitle`,
                                value
                              );
                            });
                          }
                        }
                      }}
                      pr="60px"
                      maxLength={14}
                    />
                    <InputRightElement
                      pointerEvents="none"
                      w="60px"
                      h="full"
                      borderLeftWidth="1px"
                      borderColor="border-5">
                      <Text textStyle="h4" color="text-body">
                        {name.length}/14
                      </Text>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.variations?.[index]?.name}</FormErrorMessage>
                </FormControl>
              </Box>
            )}
            <Box w="40px" />
          </Flex>
          <Flex />
        </SimpleGrid>
      </Flex>
      {isShow && (
        <Flex>
          <Flex w="100px" justifyContent="flex-end" pr="4">
            <Text textAlign="right" textStyle="h3" color="text-basic" mt="2">
              {t('shop_product.options')}
            </Text>
          </Flex>
          <SimpleGrid columns={{ base: 1, lg: 2 }} flex="1" spacing="4">
            {options.map((option, idx) => (
              <Flex key={idx}>
                <FormControl isInvalid={!!errors.variations?.[index]?.options?.[idx]}>
                  <InputGroup>
                    <Input
                      size="sm"
                      placeholder={index === 0 ? 'eg:Red, etc.' : 'eg:S,M, etc.'}
                      autoComplete="off"
                      flex="1"
                      value={option}
                      onChange={(e) => {
                        const { value } = e.target;
                        setFieldTouched(`variations.${index}.options`, true, false);
                        validateField(`variations.${index}.options`);

                        if (index === 0) {
                          if (!!values.list_variation?.[idx]?.variations) {
                            for (let i = 0; i < values.list_variation[idx].variations.length; i++) {
                              setFieldValue(
                                `list_variation.${idx}.variations.${i}.parentVariationValue`,
                                value
                              );
                            }
                          } else {
                            let _variation = [];

                            const newVariation = {
                              variations: _variation,
                            };

                            if (values.variations[1].options.length > 2) {
                              for (let i = 0; i < values.variations[1].options.length - 1; i++) {
                                _variation.push({
                                  parentVariationTitle: values.variations[0].name ?? '',
                                  childVariationTitle: values.variations[1].name ?? '',
                                  childVariationValue: values.variations[1].options[i],
                                  parentVariationValue: value,
                                  image: values.list_variation[idx]?.variations[0].image ?? '',
                                  price: '',
                                  stock: 0,
                                  //sku: '',
                                });
                              }
                            } else {
                              _variation.push({
                                parentVariationTitle: values.variations[0]?.name ?? '',
                                childVariationTitle: '',
                                childVariationValue: '',
                                parentVariationValue: value,
                                image: '',
                                price: '',
                                stock: 0,
                                //sku: '',
                              });
                            }

                            setFieldValue('list_variation', [
                              ...(values.list_variation ?? []),
                              newVariation,
                            ]);
                          }
                        } else {
                          for (let i = 0; i < values.list_variation.length; i++) {
                            if (!!values.list_variation?.[i]?.variations?.[idx]) {
                              setFieldValue(
                                `list_variation.${i}.variations.${idx}.childVariationValue`,
                                value
                              );
                            } else {
                              const newVariation = {
                                parentVariationTitle:
                                  values.list_variation?.[i].variations?.[0]
                                    ?.parentVariationTitle ?? '',
                                parentVariationValue:
                                  values.list_variation?.[i].variations?.[0]
                                    ?.parentVariationValue ?? '',
                                childVariationTitle:
                                  values.list_variation?.[i].variations?.[0]?.childVariationTitle ??
                                  '',
                                childVariationValue: e.target.value,
                                image: values.list_variation?.[i].variations?.[0]?.image ?? '',
                                price: '',
                                stock: 0,
                                //sku: '',
                              };
                              setFieldValue(`list_variation.${i}.variations`, [
                                ...(values.list_variation?.[i]?.variations ?? []),
                                newVariation,
                              ]);
                            }
                          }
                        }

                        // Create a copy of the variations array
                        const newVariations = [...values.variations];

                        // Get the options array for the corresponding variation
                        const options = newVariations[index].options;

                        // Set the value of the option at the current index
                        options[idx] = value;

                        if (idx === options.length - 1 && idx === options.length - 1) {
                          // Push an additional empty option into the options array
                          newVariations[index].options = [...options, ''];
                          setFieldValue('variations', newVariations);
                        } else {
                          // Update the variations array with the modified options array
                          newVariations[index].options = options;
                          setFieldValue('variations', newVariations);
                        }
                      }}
                      type="text"
                      pr="60px"
                      maxLength={20}
                    />
                    <InputRightElement
                      pointerEvents="none"
                      w="60px"
                      borderLeftWidth="1px"
                      h="full"
                      borderColor="border-5">
                      <Text textStyle="h4" color="text-body">
                        {option.length}/20
                      </Text>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.variations?.[index]?.options?.[idx]}</FormErrorMessage>
                </FormControl>
                <Center w="40px" h="32px" justifyContent="center">
                  {idx !== options.length - 1 && (
                    <Icon
                      as={FiTrash2}
                      w="16px"
                      h="16px"
                      color="text-body"
                      cursor={options.length === 2 && options[1] === '' ? 'not-allowed' : 'pointer'}
                      _hover={{
                        color:
                          options.length === 2 && options[1] === '' ? 'text-body' : 'text-basic',
                      }}
                      onClick={() => {
                        if (options.length === 2 && options[1] === '') {
                          return;
                        }

                        const newVariations = [...values.variations];

                        const _options = newVariations[index].options;

                        const updatedOptions = _options.filter((_, i) => i !== idx);

                        newVariations[index].options = updatedOptions;

                        setFieldValue('variations', newVariations);

                        if (index === 0) {
                          const _list_variation = values.list_variation.filter(
                            (_, number) => number !== idx
                          );
                          setFieldValue('list_variation', _list_variation);
                        } else {
                          for (let i = 0; i < values.list_variation.length; i++) {
                            const _variations = values.list_variation[i].variations.filter(
                              (_, number) => number !== idx
                            );
                            setFieldValue(`list_variation.${i}.variations`, _variations);
                          }
                        }
                      }}
                    />
                  )}
                </Center>
              </Flex>
            ))}
          </SimpleGrid>
        </Flex>
      )}
      {isShow && (
        <Center
          boxSize="40px"
          top="0"
          position="absolute"
          right="0"
          cursor="pointer"
          onClick={() => {
            if (index === 0) {
              if (values.variations[1] && values.variations[1].isShow) {
                const updatedVariations = [...values.variations];

                // Remove the first element
                updatedVariations.splice(0, 1);

                // Insert a new element after the second element
                updatedVariations.splice(2, 0, { name: '', options: [''], isShow: false });

                setFieldValue('variations', updatedVariations);
              } else {
                setFieldValue('variations', []);
                setFieldValue('list_variation', []);
                setFieldValue('set_variation.price', '');
                setFieldValue('set_variation.stock', '');
                //setFieldValue('set_variation.sku', '');
              }
            } else {
              setFieldValue(`variations.${1}`, { name: '', options: [''], isShow: false });

              setFieldValue(
                'list_variation',
                values.list_variation.map(function (variation, index) {
                  return {
                    ...variation,
                    variations: [
                      {
                        parentVariationTitle: variation.variations[0]?.parentVariationTitle ?? '',
                        childVariationTitle: '',
                        childVariationValue: '',
                        parentVariationValue: variation.variations[0]?.parentVariationValue ?? '',
                        image: variation.variations[0]?.image ?? '',
                        price: '',
                        stock: 0,
                        //sku: '',
                      },
                    ],
                  };
                })
              );
            }
          }}>
          <Icon as={IoCloseOutline} boxSize="24px" />
        </Center>
      )}
    </Flex>
  );
};

export default VariationItem;
