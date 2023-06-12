import {
    AspectRatio,
    Box,
    Center,
    Checkbox,
    Flex,
    Image,
    Input,
    Button,
    HStack,
    Icon,
    Text,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Lorem,
    ModalContent,
    useDisclosure,
    FormControl,
    FormErrorMessage,
    Textarea,
    background,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    InputGroup,
    InputRightElement,
    useBoolean
} from '@chakra-ui/react';
import React from 'react';
import { FormGroup } from 'components';
import { Form, Formik } from 'formik';
import { IoIosCloudUpload } from 'react-icons/io';
import { useDisplayImage } from 'hooks';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiFillEdit, AiOutlineSearch } from 'react-icons/ai'
import { FiTrash2 } from 'react-icons/fi';

const formatDate = 'YYYY-MM-DDTHH:mm';

const initialValues = {
    // id: '',
    // name: '',
    // registerStart: dayjs().add(10, 'minutes').format(formatDate),
    // registerEnd: dayjs().add(1, 'hours').add(10, 'minutes').format(formatDate),
    // programStart: dayjs().add(10, 'minutes').format(formatDate),
    // programEnd: dayjs().add(1, 'hours').add(10, 'minutes').format(formatDate),
    // voucherSaveStart: dayjs().add(10, 'minutes').format(formatDate),
    // voucherSaveEnd: dayjs().add(1, 'hours').add(10, 'minutes').format(formatDate),
    // maxShopRegister: '',
    // quantityVoucher: '',
    // registerPrice: '',
    // minOrderPrice: '',
    // maxOrderPrice: '',
    // minDiscount: '',
    // maxDiscount: '',
    // typeDiscount: EDiscountType.CASH,
    // discountValue: '',
    // banner: '',
    // description: '',
    // typeLimit: EDiscountLimitType.AMOUNT,
    // discountLimit: '',
    // typeShopLimit: EShopLimitType.SHOP_LIMIT,
};

function ModalUpdateProduct() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const inputRefBanner = React.useRef(null);
    const inputRefAvata = React.useRef(null);
    const searchRef = React.useRef();
    const [doSearch, { on: onSearch, off: offSearch }] = useBoolean(false);

    const headers = ['#', 'Tên sản phẩm', 'Giá', ''];

    const voucher = {};
    const handleSubmitVoucher = React.useCallback(async (
        {

        },
        { setFieldError }
    ) => { })

    const isItemChecked = (() => {
        // for (let i = 0; i < selectedProducts[currentPage - 1]?.products?.length; i++) {
        //   if (selectedProducts[currentPage - 1]?.products[i].id === item.id) {
        //     return true;
        //   }
        // }
        return false;
    })();
    return (
        <>
            {/* <Button onClick={() => {
                variant = "primary"
                background=
                // setOverlay(<OverlayOne />)
            }}>Update</Button> */}
            <Button
                size="lg"
                variant="primary"
                children="Add Voucher"
                onClick={() => {
                    onOpen()
                }}
            />

            <Modal
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior={'inside'}
                size='4xl'>
                {/* {overlay} */}
                <ModalOverlay
                    bg='none'
                    backdropFilter='auto'
                    backdropInvert='20%'
                    backdropBlur='2px'
                />
                <ModalContent>
                    <ModalHeader>Select product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Box mb='20px'>
                            {/* <FormControl
                            // isInvalid={!!errors.name}
                            >
                                <Input
                                    placeholder="Input"
                                    autoComplete="off"
                                // value={values.name}
                                // onChange={handleChange('name')}
                                />
                                <FormErrorMessage>{"errors.name"}</FormErrorMessage>
                            </FormControl> */}
                            <InputGroup maxW="570px" borderRadius="4px" overflow="hidden" mt="6">
                                <Input ref={searchRef} placeholder="Search message name, code" />
                                <InputRightElement borderRadius="4px" cursor="pointer" h="full" bg="primary.100" w="100px">
                                    <Center onClick={onSearch}>
                                        <Icon as={AiOutlineSearch} w="24px" h="24px" color="white" />
                                    </Center>
                                </InputRightElement>
                            </InputGroup>
                        </Box>

                        <Box
                            bg="white"
                            borderRadius="4px"
                            overflow="auto"
                            borderWidth="1px"
                            borderColor="gray.400"
                            pb="2">
                            <Table variant="simple">
                                <Thead h="30px" bg="primary.100">
                                    <Tr>
                                        <Th>
                                            <Checkbox
                                                // isChecked={selectedProducts[currentPage - 1].isSelectAll}
                                                tabIndex={-1}
                                                // onChange={() => handleCheckAll()}
                                                ml="2"
                                            />
                                        </Th>
                                        {headers.map((item, index) => {
                                            return (
                                                <Th
                                                    borderBottomWidth="0px"
                                                    key={index}
                                                    color="white"
                                                    textStyle="b-md"
                                                    textTransform="capitalize"
                                                    isNumeric={index === 3 || index === headers.length - 1}
                                                >
                                                    {item}
                                                </Th>
                                            );
                                        })}
                                    </Tr>
                                </Thead>

                                {/* <>
              {vouchers.map((item, index) => {
                if (!item) {
                  return;
                }

                let _image = '';

                if (item && item.banner) {
                  let firstChar = item.banner.substring(0, 4);

                  if (firstChar === 'http' || firstChar === 'https') {
                    _image = item.banner;
                  } else {
                    _image = BASE_API_URL + '/assets/' + item.banner;
                  }
                } */}

                                {/* return ( */}
                                <Tr h='30px' key={1}>
                                    <Td borderColor="gray.1300" w={1}>
                                        <Checkbox isChecked={isItemChecked}
                                        // onChange={() => handleSelect(item)} 
                                        />
                                    </Td>
                                    <Td borderColor="gray.1300">
                                        <Text textStyle="h3" color="text-basic">
                                            {1}
                                        </Text>
                                    </Td>
                                    <Td borderColor="gray.1300">
                                        <Flex alignItems='center'>
                                            <AspectRatio
                                                w="50px"
                                                ratio={1 / 1}
                                                mr="2"
                                                borderRadius="8px"
                                                overflow="hidden">
                                                <Image w="100%" h="100%" objectFit="cover" src={'https://shopdunk.com/images/thumbs/0008734_iphone-14-pro-128gb_240.png'} />
                                            </AspectRatio>
                                            <Text textStyle="h3-m" color="text-basic">
                                                áo phông giữ nhiệt
                                            </Text>
                                        </Flex>
                                    </Td>
                                    <Td borderColor="gray.1300">
                                        {/* <Center> */}
                                        <Text textStyle="h3" color="text-basic">
                                            12.0000
                                        </Text>
                                        {/* </Center> */}
                                    </Td>

                                    <Td isNumeric borderColor="gray.1300">
                                        <Flex justifyContent="flex-end">
                                            <HStack>
                                                <Center
                                                    boxSize="40px"
                                                    cursor="pointer"
                                                    onClick={() => {
                                                        router.push({
                                                            pathname: '/admin/voucher/update',
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
                                                        setSelectedVoucher(item);
                                                        onShowModal();
                                                    }}>
                                                    <Icon
                                                        as={FiTrash2}
                                                        w="18px"
                                                        h="18px"
                                                        color="red.600"
                                                        cursor="pointer"
                                                    />
                                                </Center>
                                            </HStack>
                                        </Flex>
                                    </Td>
                                </Tr>
                                {/* ); */}
                                {/* })} */}
                                {/* </> */}

                            </Table>
                        </Box>

                    </ModalBody>

                    <ModalFooter>
                        {/* <Button mr={3} variant='ghost' onClick={onClose}>cancel</Button> */}
                        {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Save
                        </Button> */}
                        <Button
                            size="sm"
                            // variant="primary"
                            children="Cancel"
                            onClick={() => {
                                onClose()
                            }}
                        />
                        <Box mr={'20px'} />
                        <Button
                            size="sm"
                            variant="primary"
                            children="Update"
                            onClick={() => {
                                onClose()
                            }}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalUpdateProduct;