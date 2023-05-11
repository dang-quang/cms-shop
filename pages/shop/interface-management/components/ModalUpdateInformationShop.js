import React from 'react';
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useDisplayImage } from 'hooks';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setShowLoader } from 'redux/actions/app';

import { TextField } from '@material-ui/core';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import * as yup from 'yup';
import Images from 'assets';

const initialValues = {
  avatar: '',
  banner: '',
  address: '',
  description: '',
};

const ModalUpdateInformationShop = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const inputRefAvatar = React.useRef(null);
  const inputRefBanner = React.useRef(null);

  const handleSubmitShop = React.useCallback(async ({}) => {
    try {
      dispatch(setShowLoader(true));
    } finally {
      dispatch(setShowLoader(false));
    }
  }, []);

  //Todo Validation Schema
  const updateShopValidationSchema = yup.object().shape({
    //avatar: yup.string().required(t('errorImageRequire')),
    //banner: yup.string().required(t('errorShopBannerRequire')),
    //address: yup.string().required(t('errorAddressRequire')),
    //description: yup.string().required('errorDescriptionRequire'),
  });

  return (
    <Formik
      validateOnChange={false}
      //validationSchema={updateShopValidationSchema}
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleSubmitShop}>
      {({ handleChange, handleSubmit, setFieldValue, values }) => {
        const { onUploader: onUploaderAvatar } = useDisplayImage((image) => {
          try {
            if (image) {
              setFieldValue('avatar', image);
            }
            if (inputRef && inputRef.current) {
              inputRef.current.value = '';
            }
          } catch (error) {
            console.log('error upload avatar', error);
          }
        });

        const { onUploader: onUploaderBanner } = useDisplayImage((video) => {
          try {
            if (video) {
              setFieldValue('banner', video);
            }
            if (inputRef1 && inputRef1.current) {
              inputRef1.current.value = '';
            }
          } catch (error) {
            console.log('error upload banner', error);
          }
        });

        return (
          <Modal isOpen={isOpen} onClose={onClose} size="5xl">
            <Form>
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
                    <Text textStyle="b-sm" color="text-white" mr="4">
                      Cập nhật thông tin của Shop
                    </Text>
                  </Flex>
                  <Text textStyle="b-sm" color="text-basic" mt="4" mb="4">
                    Thông tin cơ bản
                  </Text>
                  <Flex flexDirection={{ base: 'column', md: 'row' }} px={{ base: '0', md: '4' }}>
                    <VStack flex="7.5" spacing={{ base: '6', lg: '10' }} alignItems="unset">
                      <Box
                        zIndex={1}
                        position="relative"
                        onClick={() => inputRefAvatar.current.click()}>
                        <Text textStyle="b-md" color="text-body" mb="4">
                          Avatar Shop
                        </Text>
                        <Box cursor="pointer" zIndex={1}>
                          <TextField
                            id="outlined-shop-code"
                            variant="outlined"
                            value="Choose file"
                            disabled
                            fullWidth
                            style={{ zIndex: -1 }}
                          />
                        </Box>
                        <input
                          ref={inputRefAvatar}
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                          multiple
                          style={{ display: 'none', cursor: 'pointer' }}
                          onChange={onUploaderAvatar}
                        />
                      </Box>
                      <Box
                        zIndex={1}
                        position="relative"
                        onClick={() => inputRefBanner.current.click()}>
                        <Text textStyle="b-md" color="text-body" mb="4">
                          Banner Shop
                        </Text>
                        <Box cursor="pointer" zIndex={1}>
                          <TextField
                            id="outlined-shop-code"
                            variant="outlined"
                            value="Choose file"
                            disabled
                            fullWidth
                            style={{ zIndex: -1 }}
                          />
                        </Box>
                        <input
                          ref={inputRefBanner}
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                          multiple
                          style={{ display: 'none', cursor: 'pointer' }}
                          onChange={onUploaderBanner}
                        />
                      </Box>
                      <Box>
                        <Text textStyle="b-md" color="text-body">
                          {t('address')}
                        </Text>
                        <Textarea
                          mt="2"
                          value={values.address}
                          onChange={handleChange('address')}
                          placeholder={t('address')}
                          height={{ base: '70px', md: '100px', xl: '140px' }}
                        />
                      </Box>
                    </VStack>
                    <Flex
                      mt={{ base: '6', md: 'unset' }}
                      flex="2.5"
                      flexDirection={{ base: 'column', sm: 'row', md: 'column' }}
                      ml={{ base: 'unset', md: '4', xl: '100px' }}>
                      <Box flex={{ base: 'unset', sm: '1', md: 'unset' }}>
                        <Box position="relative">
                          <AspectRatio
                            minW="180px"
                            ratio={1.2 / 1}
                            borderRadius="4"
                            overflow="hidden">
                            <Image
                              src={values.avatar || Images.default_thumbnail}
                              boxSize="full"
                              objectFit="cover"
                              alt="image_shop"
                            />
                          </AspectRatio>
                          {values.avatar && (
                            <Icon
                              cursor="pointer"
                              as={AiOutlineCloseCircle}
                              width="24px"
                              height="24px"
                              color="blue.200"
                              position="absolute"
                              right="4px"
                              top="4px"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFieldValue('avatar', '');
                              }}
                            />
                          )}
                        </Box>
                        <Text textAlign="center" mt="4">
                          Avatar
                        </Text>
                      </Box>
                      <Box
                        mt={{ base: '6', sm: 'unset', md: '6' }}
                        ml={{ base: 'unset', sm: '6', md: 'unset' }}
                        flex={{ base: 'unset', sm: '1', md: 'unset' }}>
                        <Box position="relative">
                          <AspectRatio
                            minW="180px"
                            ratio={1.2 / 1}
                            borderRadius="4"
                            overflow="hidden">
                            <Image
                              src={values.banner || Images.default_thumbnail}
                              boxSize="full"
                              objectFit="cover"
                              alt="image_banner"
                            />
                          </AspectRatio>
                          {values.banner && (
                            <Icon
                              cursor="pointer"
                              as={AiOutlineCloseCircle}
                              width="24px"
                              height="24px"
                              color="blue.200"
                              position="absolute"
                              right="4px"
                              top="4px"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFieldValue('banner', '');
                              }}
                            />
                          )}
                        </Box>
                        <Text textAlign="center" mt="4">
                          Banner
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                  <Box px={{ base: '0', md: '4' }} mt="2">
                    <Text textStyle="b-md" color="text-body">
                      {t('description')}
                    </Text>
                    <Textarea
                      mt="3"
                      value={values.description}
                      size="lg"
                      borderColor="bg-border-1"
                      onChange={handleChange('description')}
                      placeholder={t('address')}
                      height={{ base: '80px', md: '120px', xl: '160px' }}
                    />
                  </Box>
                </ModalBody>
                <ModalFooter justifyContent="center">
                  <Button variant="control" mr={3} onClick={onClose} minW="135px" marginRight={12}>
                    Close
                  </Button>
                  <Button variant="primary" minW="135px" onClick={() => handleSubmit()}>
                    Xác nhận
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default ModalUpdateInformationShop;
