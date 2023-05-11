import React from 'react';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { setShowLoader } from 'redux/actions/app';
import { useTranslation } from 'react-i18next';
import { Box, TextField } from '@material-ui/core';

// interface ModalUpdateInformationShopProps {
//   shop: IShop;
//   onClose?(): void;
// }

// export interface IShop {
//   avatar: string;
//   banner: string;
//   address: string;
//   description: string;
// }

const initialValues = {
  avatar: '',
  banner: '',
  address: '',
  description: '',
};

const ModalUpdateInformationShop = ({ onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmitShop = React.useCallback(async ({}) => {
    try {
      dispatch(setShowLoader(true));
    } finally {
      dispatch(setShowLoader(false));
    }
  }, []);

  const refInput = React.useRef(null);

  const [selectedImages, setSelectedImages] = React.useState([]);

  const handleRemoveImage = React.useCallback(
    (photo, setFieldValue) => {
      const currentIndex = selectedImages.indexOf(photo);
      const newListImages = [...selectedImages];
      newListImages.splice(currentIndex, 1);
      setSelectedImages(newListImages);
      setFieldValue('avatar', '');
    },
    [selectedImages]
  );

  const handleImageChange = React.useCallback((e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const arr = reader.result.split(',');
        setFieldValue('avatar', arr[1]);
      };
      reader.readAsDataURL(file);
    }
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setSelectedImages(filesArray);
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
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
      {({ handleChange, handleSubmit, setFieldValue, values, errors }) => {
        return (
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
                <Stack spacing={{ base: '6', lg: '10', xl: '16' }}>
                  <Box zIndex={1} position="relative" onClick={() => refInput.current.click()}>
                    <Text textStyle="b-md" color="text-body" mb="4">
                      Avatar Shop
                    </Text>
                    <TextField
                      id="outlined-shop-code"
                      variant="outlined"
                      value="Choose file"
                      disabled
                      fullWidth
                    />
                    <input
                      ref={refInput}
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      multiple
                      style={{ display: 'none', cursor: 'pointer' }}
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                    />
                  </Box>
                  <Box zIndex={1} position="relative" onClick={() => refInput.current.click()}>
                    <Text textStyle="b-md" color="text-body" mb="4">
                      Banner Shop
                    </Text>
                    <TextField
                      id="outlined-shop-code"
                      variant="outlined"
                      value="Choose file"
                      disabled
                      fullWidth
                    />
                    <input
                      ref={refInput}
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      multiple
                      style={{ display: 'none', cursor: 'pointer' }}
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                    />
                  </Box>
                  <Textarea
                    //value={note}
                    size="lg"
                    borderColor="bg-border-1"
                    //onChange={(e) => setNote(e.target.value)}
                    placeholder={t('address')}
                    height={{ base: '60px', xl: '120px' }}
                  />
                </Stack>
              </ModalBody>
              <ModalFooter justifyContent="center">
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost">Secondary Action</Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ModalUpdateInformationShop;
