import React from 'react';
import { NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
import Admin from 'layouts/Admin.js';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useDisplayImage } from 'hooks';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { setShowLoader } from 'redux/actions/app';
import _ from 'lodash';
import { BASE_API_URL } from 'utilities/const';
import { requestCreateUpdateVoucher } from 'utilities/ApiManage';
import { EDiscountType, EDiscountLimitType, EShopLimitType, EAppKey, EMode } from 'constants/types';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IoIosCloudUpload } from 'react-icons/io';
import { FormGroup } from 'components';

const formatDate = 'YYYY-MM-DDTHH:mm';

const initialValues = {
  id: '',
  name: '',
  user: '',
  title: '',
  deepLink: '',
  publishTime: dayjs().unix(),
  content: '',
};

const user_data = [
  'Dan Abrahmov',
  'Kola Tioluwani',
  'Kent Dodds',
  'Ryan Florence',
  'Prosper Otemuyiwa',
  'Christian Nwamba',
  'Segun Adebayo',
];

function AddUpdateMessagePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRefBanner = React.useRef(null);

  const message =
    !_.isEmpty(router.query) && router.query.mode === EMode.UPDATE ? router.query : undefined;

  const handleSubmitVoucher = React.useCallback(
    async ({ id, name, user, title, deepLink, publishTime, content }, { setFieldError }) => {
      try {
        dispatch(setShowLoader(true));
        if (message) {
          // const res = await requestCreateUpdateVoucher({
          //   id,
          //   name: name,
          //   user: user,
          //   title: title,
          //   deepLink: deepLink,
          //   publishTime: dayjs(publishTime).unix(),
          //   content: content,
          // });
          // if (res.code === EAppKey.MSG_SUCCESS) {
          //   NotificationManager.success({
          //     title: t('success'),
          //     message: 'Update Message Success',
          //     //message: t('category_update_success'),
          //   });
          //   setTimeout(() => {
          //     router.push('/shop/broadcast-messages');
          //   }, 1000);
          // } else {
          //   NotificationManager.error({
          //     title: t('error'),
          //     message: res.message ? res.message.text : 'Error',
          //   });
          // }
        } else {
          // const res = await requestCreateUpdateVoucher({
          //   name: name,
          //   user: user,
          //   title: title,
          //   deepLink: deepLink,
          //   publishTime: dayjs(publishTime).unix(),
          //   content: content,
          // });
          // if (res.code === EAppKey.MSG_SUCCESS) {
          //   NotificationManager.success({
          //     title: t('success'),
          //     message: 'Create Message Success',
          //   });
          //   setTimeout(() => {
          //     router.push('/shop/broadcast-messages');
          //   }, 1000);
          // } else {
          //   NotificationManager.error({
          //     title: t('error'),
          //     message: res.message ? res.message.text : 'Error',
          //   });
          // }
        }
      } finally {
        dispatch(setShowLoader(false));
      }
    },
    [message]
  );

  const addUpdateMessageValidationSchema = yup.object().shape({
    name: yup.string().required(t('error_field_empty')),
  });

  return (
    <Formik
      validateOnChange={false}
      validationSchema={addUpdateMessageValidationSchema}
      enableReinitialize={true}
      initialValues={message ? message : initialValues}
      onSubmit={handleSubmitVoucher}>
      {({ handleChange, handleSubmit, setFieldValue, values, errors }) => {
        return (
          <Form>
            <Text textStyle="h6-sb" color="text-basic" mt="4">
              {message ? 'Update Message' : 'Create New Message'}
            </Text>

            <Box
              mt="4"
              bg="bg-1"
              shadow="md"
              py={{ base: '6', xl: '8' }}
              pl={{ base: '6', xl: '8' }}
              pr={{ base: '10', xl: '100px' }}>
              <Text textStyle="h5-b" color="primary.100" mb="6">
                Basic information
              </Text>
              <FormGroup title="Topic Name">
                <FormControl isInvalid={!!errors.name}>
                  <Input
                    placeholder="Input"
                    autoComplete="off"
                    value={values.name}
                    onChange={handleChange('name')}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title="Send To" mt="6">
                <FormControl isInvalid={!!errors.user}>
                  <Select value={values.user} onChange={handleChange('user')}>
                    {user_data.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.user}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title="Title" mt="6">
                <FormControl isInvalid={!!errors.title}>
                  <Input
                    placeholder="Input"
                    autoComplete="off"
                    value={values.title}
                    onChange={handleChange('title')}
                  />
                  <FormErrorMessage>{errors.title}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title="Deep Link" mt="6">
                <FormControl isInvalid={!!errors.deepLink}>
                  <Input
                    placeholder="Input"
                    autoComplete="off"
                    value={values.deepLink}
                    onChange={handleChange('deepLink')}
                  />
                  <FormErrorMessage>{errors.deepLink}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title="Publish Time" mt="6">
                <FormControl isInvalid={!!errors.publishTime}>
                  <Input
                    maxW={{ base: 'unset', xl: '70%' }}
                    type="datetime-local"
                    placeholder="Select Date and Time"
                    value={values.publishTime}
                    onChange={handleChange('publishTime')}
                    min={dayjs().format(formatDate)}
                    max={dayjs().add(4, 'months').format(formatDate)}
                  />
                  <FormErrorMessage>{errors.publishTime}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <FormGroup title="Content" mt="6">
                <FormControl isInvalid={!!errors.content}>
                  <Textarea
                    rows={6}
                    placeholder="Content"
                    autoComplete="off"
                    value={values.content}
                    onChange={handleChange('content')}
                  />
                  <FormErrorMessage>{errors.content}</FormErrorMessage>
                </FormControl>
              </FormGroup>
              <HStack justifyContent="flex-end" gap="6" mt="6">
                <Button variant="control" onClick={() => router.back()} w="150px">
                  {t('cancel')}
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()} w="150px">
                  {t('confirm')}
                </Button>
              </HStack>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}

AddUpdateMessagePage.layout = Admin;

export default WithAuthentication(AddUpdateMessagePage);
