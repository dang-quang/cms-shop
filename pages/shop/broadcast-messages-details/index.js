import React from 'react';
import Admin from 'layouts/Admin.js';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box, Text, Grid, GridItem, HStack, Button, useBoolean } from '@chakra-ui/react';
import { ModalConfirm, WithAuthentication } from 'components';
import _ from 'lodash';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { setShowLoader } from 'redux/actions/app';

function BroadcastMessagesDetails() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const formatDate = 'YYYY-MM-DD';
  const message = !_.isEmpty(router.query) ? router.query : undefined;
  const [isShowModal, { on: onShowModal, off: offShowModal }] = useBoolean(false);

  const data = React.useMemo(
    () => [
      {
        title: 'Title',
        value: message.title,
      },
      {
        title: 'Content',
        value: message.content,
      },
      {
        title: 'Publish Time',
        value:
          message && message.publishTime
            ? dayjs(parseInt(message.publishTime)).format(formatDate)
            : 0,
      },
      {
        title: 'ID',
        value: message.id,
      },
      {
        title: 'Deep Link',
        value: message.deepLink,
      },
    ],
    [message]
  );

  const handleDeleteMessage = React.useCallback(async () => {
    try {
      offShowModal();
      dispatch(setShowLoader(true));
      // const res = await requestDeleteVoucher({ id: selectedVoucher.id });
      // if (res.code === EAppKey.MSG_SUCCESS) {
      //   setSelectedVoucher(null);
      //   router.push('/admin/voucher');
      // } else {
      //   NotificationManager.error({
      //     title: t('error'),
      //     message: res.message ? res.message.text : 'Error',
      //   });
      // }
    } catch (error) {
      console.log('delete message error');
    } finally {
      dispatch(setShowLoader(false));
    }
  }, [message]);

  return (
    <Box>
      <HStack gap="6" mt="6">
        <Button
          variant="secondary"
          onClick={() => {
            router.push({
              pathname: '/shop/broadcast-messages/update',
              query: message,
            });
          }}
          w="150px">
          Update
        </Button>
        <Button variant="danger" onClick={onShowModal} w="150px">
          Delete
        </Button>
      </HStack>
      <Text textStyle="h5" color="text-basic" mt="6">
        {message.title}
      </Text>
      <Box
        mt="6"
        bg="white"
        borderRadius="4px"
        borderWidth="1px"
        position="relative"
        borderColor="gray.400">
        {data &&
          data.map((item, index) => {
            const { title, value } = item;
            return (
              <Grid
                key={index}
                templateColumns="repeat(10,1fr)"
                gap="6"
                borderBottomWidth="1px"
                borderColor={index < data.length - 1 ? 'gray.400' : 'transparent'}>
                <GridItem
                  colSpan={3}
                  alignItems="center"
                  justifyContent="flex-end"
                  display="flex"
                  p="4"
                  borderRightWidth="1px">
                  <Text textStyle="b-md" color="text-basic" textAlign="right">
                    {title}
                  </Text>
                </GridItem>
                <GridItem
                  textStyle="body"
                  color="text-basic"
                  colSpan={7}
                  alignItems="center"
                  display="flex"
                  p="4">
                  <Text>{value}</Text>
                </GridItem>
              </Grid>
            );
          })}
      </Box>
      <ModalConfirm
        isOpen={isShowModal}
        onClose={offShowModal}
        title="Confirm Deletion"
        description={t('deleteConfirm')}
        buttonLeft={{ title: t('cancel'), onClick: offShowModal }}
        buttonRight={{ title: t('confirm'), onClick: handleDeleteMessage }}
      />
    </Box>
  );
}

BroadcastMessagesDetails.layout = Admin;

export default WithAuthentication(BroadcastMessagesDetails);
