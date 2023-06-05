import React from 'react';
import Admin from 'layouts/Admin.js';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Flex,
  Button,
  InputGroup,
  Input,
  useBoolean,
  InputRightElement,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Text,
  Center,
  HStack,
  Image,
} from '@chakra-ui/react';
import { ModalConfirm, PaginationPanel, WithAuthentication } from 'components';
import { AiFillEdit, AiOutlineEye, AiOutlineSearch } from 'react-icons/ai';
import { isEmpty } from 'lodash';
import { BASE_API_URL } from 'utilities/const';
import dayjs from 'dayjs';
import { FiTrash2 } from 'react-icons/fi';
import { usePagination } from '@ajna/pagination';
import { setShowLoader } from 'redux/actions/app';
import { useDispatch } from 'react-redux';
import Images from 'assets';

const messages_data = [
  {
    id: 1,
    name: 'Test noti',
    title: 'Về nhà ăn Tết 🎁🎁🎁...',
    content: 'Về nhà ăn Tết 🎁🎁🎁...',
    publishTime: dayjs().unix(),
    sendTo: 'Tất cả khách hàng',
    deepLink: 'https://example.com/path/page',
  },
  {
    id: 2,
    name: 'Test noti',
    title: 'Về nhà ăn Tết 🎁🎁🎁...',
    content: 'Về nhà ăn Tết 🎁🎁🎁...',
    publishTime: dayjs().unix(),
    sendTo: 'Linh Phạm, Namnd',
    deepLink: 'https://example.com/path/page',
  },
];

function BroadcastMessages() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const headers = [
    t('serial_number'),
    'Topic name',
    'Title',
    'Content Message',
    'Publish Time',
    'Send to',
    'Actions',
  ];

  const pageSize = 50;
  const searchRef = React.useRef();
  const [doSearch, { on: onSearch, off: offSearch }] = useBoolean(false);
  const [messages, setMessages] = React.useState(messages_data || []);
  const [selectedMessage, setSelectedMessage] = React.useState(null);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [isShowModal, { on: onShowModal, off: offShowModal }] = useBoolean(false);

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
  }, [selectedMessage]);

  return (
    <Box>
      <Flex
        mt="4"
        flexDirection={{ base: 'column', xl: 'row' }}
        justifyContent="space-between"
        alignItems="center">
        <InputGroup maxW="420px">
          <Input ref={searchRef} variant="search" placeholder={'Message Name/Code'} />
          <InputRightElement>
            <Flex
              justifyContent="center"
              alignItems="center"
              h="100%"
              px="3"
              cursor="pointer"
              onClick={onSearch}>
              <Icon as={AiOutlineSearch} w="24px" h="24px" color="text-basic" />
            </Flex>
          </InputRightElement>
        </InputGroup>
        <Button
          size="lg"
          variant="primary"
          children="Add Message"
          onClick={() => router.push('/shop/broadcast-messages/add')}
        />
      </Flex>
      <Box
        mt="6"
        bg="white"
        borderRadius="4px"
        overflow="auto"
        borderWidth="1px"
        position="relative"
        borderColor="gray.400"
        pb="4">
        <Table variant="simple" minW="1200px">
          <Thead h="52px" bg="primary.100">
            <Tr>
              {headers.map((item, index) => {
                return (
                  <Th
                    borderBottomWidth="0px"
                    key={index}
                    color="white"
                    textStyle="b-md"
                    textTransform="capitalize"
                    isNumeric={index === headers.length - 1}>
                    {item}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          {isEmpty(messages) ? (
            <Box minH="220px">
              <Center
                h="220px"
                position="absolute"
                insetX="0"
                flexDirection="column"
                alignSelf="center">
                <Image w="150px" h="100px" src={Images.no_data} />
                <Text textStyle="body" textAlign="center" color="primary.100" mt="1">
                  No Data Found
                </Text>
              </Center>
            </Box>
          ) : (
            <>
              {messages.map((item, index) => {
                const { name, title, content, publishTime, sendTo } = item;
                return (
                  <Tr key={index} cursor="pointer" onClick={() => {}}>
                    <Td borderColor="gray.1300">
                      <Text textStyle="h3" color="text-basic">
                        {index + 1}
                      </Text>
                    </Td>
                    <Td borderColor="gray.1300">
                      <Text textStyle="h3" color="text-basic">
                        {name}
                      </Text>
                    </Td>
                    <Td borderColor="gray.1300">
                      <Text textStyle="h3" color="text-basic">
                        {title}
                      </Text>
                    </Td>
                    <Td borderColor="gray.1300">
                      <Text textStyle="h3" color="text-basic">
                        {content}
                      </Text>
                    </Td>
                    <Td borderColor="gray.1300">
                      <Text textStyle="h3" color="text-basic">
                        {dayjs(publishTime).format('DD-MM-YYYY')}
                      </Text>
                    </Td>
                    <Td borderColor="gray.1300">
                      <Text textStyle="h3" color="text-basic">
                        {sendTo}
                      </Text>
                    </Td>
                    <Td isNumeric borderColor="gray.1300">
                      <Flex justifyContent="flex-end">
                        <HStack>
                          <Center
                            boxSize="40px"
                            cursor="pointer"
                            onClick={() => {
                              router.push({
                                pathname: '/shop/broadcast-messages-details',
                                query: item,
                              });
                            }}>
                            <Icon
                              as={AiOutlineEye}
                              w="18px"
                              h="18px"
                              color="text-basic"
                              cursor="pointer"
                            />
                          </Center>
                          <Center
                            boxSize="40px"
                            cursor="pointer"
                            onClick={() => {
                              router.push({
                                pathname: '/shop/broadcast-messages/update',
                                query: item,
                              });
                            }}>
                            <Icon
                              as={AiFillEdit}
                              w="18px"
                              h="18px"
                              color="text-basic"
                              cursor="pointer"
                            />
                          </Center>
                          <Center
                            boxSize="40px"
                            cursor="pointer"
                            onClick={() => {
                              setSelectedMessage(item);
                              onShowModal();
                            }}>
                            <Icon
                              as={FiTrash2}
                              w="18px"
                              h="18px"
                              color="text-basic"
                              cursor="pointer"
                            />
                          </Center>
                        </HStack>
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </>
          )}
        </Table>
      </Box>
      <Flex justifyContent="space-between" alignItems="center">
        <PaginationPanel
          pagesCount={pagesCount}
          currentPage={currentPage}
          isDisabled={isDisabled}
          onPageChange={(page) => {
            setMessages([]);
            setCurrentPage(page);
          }}
          pages={pages}
          mt="24px"
          mb="8px"
        />
        <Text textStyle="h4-m">
          {t('results_page', {
            start: (currentPage - 1) * 50 + 1,
            end: (currentPage - 1) * 50 + messages.length,
            total: totalRecords,
          })}
        </Text>
      </Flex>
      <ModalConfirm
        isOpen={isShowModal}
        onClose={onShowModal}
        title="Confirm Deletion"
        description={t('deleteConfirm')}
        buttonLeft={{ title: t('cancel'), onClick: offShowModal }}
        buttonRight={{ title: t('confirm'), onClick: handleDeleteMessage }}
      />
    </Box>
  );
}

BroadcastMessages.layout = Admin;

export default WithAuthentication(BroadcastMessages);
