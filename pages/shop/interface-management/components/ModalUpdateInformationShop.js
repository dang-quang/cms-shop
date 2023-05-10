import React from 'react';
import {
  Button,
  Flex,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { setShowLoader } from 'redux/actions/app';
import { useTranslation } from 'react-i18next';

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

// const initialValues: IShop = {
//   avatar: '',
//   banner: '',
//   address: '',
//   description: '',
// };

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
                <Text textStyle="b-sm" color="text-basic" mt="4">
                  Thông tin cơ bản
                </Text>
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
