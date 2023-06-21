import React from 'react';
import {
  AspectRatio,
  Box,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import { RiImageAddFill } from 'react-icons/ri';
import { useDisplayImage } from 'hooks';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { parseNumber } from 'utilities/parseNumber';
import ProductImage from './ProductImage';

const VariationTableItem = ({ item, index, isLast }) => {
  const { variations } = item;
  const { t } = useTranslation();
  const refImage = React.useRef(null);

  const { setFieldValue, errors, values } = useFormikContext();

  const borderColor = isLast ? 'transparent' : 'border-5';

  const { onUploader } = useDisplayImage((image) => {
    try {
      if (image) {
        for (let i = 0; i < variations.length; i++) {
          setFieldValue(`list_variation.${index}.variations.${i}.imgUri`, image);
        }
      }
      if (refImage && refImage.current) {
        refImage.current.value = '';
      }
    } catch (error) {
      console.log('error upload image', error);
    }
  });

  return (
    <Tr>
      <Td borderColor={borderColor} borderWidth="1px" flex="1" m="-1px" p="0">
        <Flex flexDirection="column" alignItems="center" p="6" flex="1">
          <Text textStyle="h3" color="text-basic" mb="1" noOfLines={2}>
            {variations[0]?.parentVariationValue}
          </Text>
          {variations[0]?.imgUri ? (
            <ProductImage
              image={variations[0].imgUri}
              onDelete={() => {
                for (let i = 0; i < variations.length; i++) {
                  setFieldValue(`list_variation.${index}.variations.${i}.imgUri`, '');
                }
              }}
            />
          ) : (
            <AspectRatio
              onClick={() => refImage.current.click()}
              borderStyle="dashed"
              cursor="pointer"
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
                <Input
                  ref={refImage}
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  multiple
                  display="none"
                  onChange={onUploader}
                />
              </Box>
            </AspectRatio>
          )}
        </Flex>
      </Td>
      {values.variations[1].isShow && (
        <Td borderColor={borderColor} borderWidth="1px" flex="1" m="-1px" p="0">
          {variations.map((i, idx) => {
            return (
              <Center
                key={idx}
                flex="1"
                borderBottomWidth="1px"
                borderColor={idx < variations.length - 1 ? 'border-5' : 'transparent'}
                p="6">
                <Center w="full" h="32px">
                  <Text color="basic" textStyle="h3">
                    {i.childVariationValue}
                  </Text>
                </Center>
              </Center>
            );
          })}
        </Td>
      )}
      <Td borderColor={borderColor} borderWidth="1px" flex="1" m="-1px" p="0">
        {variations.length > 0 &&
          variations.map((i, idx) => {
            return (
              <Center
                key={idx}
                flex="1"
                borderBottomWidth="1px"
                borderColor={idx < variations.length - 1 ? 'border-5' : 'transparent'}
                p="6">
                <FormControl
                  w="100%"
                  isInvalid={!!errors?.list_variation?.[index]?.variations[idx]?.price}>
                  <InputGroup flex="1">
                    <Box w="full">
                      <NumberInput
                        size="sm"
                        value={i.price}
                        onChange={(e) =>
                          setFieldValue(
                            `list_variation.${index}.variations.${idx}.price`,
                            parseNumber(e)
                          )
                        }>
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
                  <FormErrorMessage>
                    {errors?.list_variation?.[index]?.variations[idx]?.price}
                  </FormErrorMessage>
                </FormControl>
              </Center>
            );
          })}
      </Td>
      <Td borderColor={borderColor} borderWidth="1px" flex="1" m="-1px" p="0">
        {variations.length > 0 &&
          variations.map((i, idx) => {
            return (
              <Center
                key={idx}
                flex="1"
                borderBottomWidth="1px"
                borderColor={idx < variations.length - 1 ? 'border-5' : 'transparent'}
                p="6">
                <FormControl
                  w="100%"
                  isInvalid={!!errors?.list_variation?.[index]?.variations[idx]?.stock}>
                  <NumberInput
                    size="sm"
                    value={i.stock}
                    onChange={(e) =>
                      setFieldValue(
                        `list_variation.${index}.variations.${idx}.stock`,
                        parseNumber(e)
                      )
                    }>
                    <NumberInputField placeholder={t('input')} />
                  </NumberInput>
                  <FormErrorMessage>
                    {errors?.list_variation?.[index]?.variations[idx]?.stock}
                  </FormErrorMessage>
                </FormControl>
              </Center>
            );
          })}
      </Td>
      {false && (
        <Td borderColor={borderColor} borderWidth="1px" flex="1" m="-1px" p="0">
          {variations.length > 0 &&
            variations.map((i, idx) => {
              return (
                <Center
                  key={idx}
                  flex="1"
                  borderBottomWidth="1px"
                  borderColor={idx < variations.length - 1 ? 'border-5' : 'transparent'}
                  p="6">
                  <FormControl
                    w="100%"
                    isInvalid={!!errors?.list_variation?.[index]?.variations[idx]?.sku}>
                    <Input
                      size="sm"
                      value={i.sku}
                      placeholder={t('input')}
                      onChange={(e) =>
                        setFieldValue(
                          `list_variation.${index}.variations.${idx}.sku`,
                          e.target.value
                        )
                      }
                    />
                    <FormErrorMessage>
                      {errors?.list_variation?.[index]?.variations[idx]?.sku}
                    </FormErrorMessage>
                  </FormControl>
                </Center>
              );
            })}
        </Td>
      )}
    </Tr>
  );
};

export default VariationTableItem;
