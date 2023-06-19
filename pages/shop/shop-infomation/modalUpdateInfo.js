import {
    AspectRatio,
    Box,
    Center,
    Checkbox,
    Flex,
    Image,
    Input,
    // Button,
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
} from '@chakra-ui/react';
import React from 'react';
import { FormGroup } from 'components';
import { Form, Formik } from 'formik';
import { IoIosCloudUpload } from 'react-icons/io';
import { useDisplayImage } from 'hooks';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Button from "components/CustomButtons/Button.js";

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

function ModalUpdateInfo() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const inputRefBanner = React.useRef(null);
    const inputRefAvata = React.useRef(null);

    const voucher = {};
    const handleSubmitVoucher = React.useCallback(async (
        {
            id,
            name,
            registerStart,
            registerEnd,
            programStart,
            programEnd,
            maxShopRegister,
            quantityVoucher,
            registerPrice,
            minOrderPrice,
            typeDiscount,
            discountValue,
            banner,
            description,
            typeLimit,
            discountLimit,
            typeShopLimit,
        },
        { setFieldError }
    ) => { })
    return (
        <>
            <Button color="primary" onClick={() => onOpen()}>
                Update
            </Button>
            {/* <Button onClick={() => {
                // setOverlay(<OverlayOne />)
                onOpen()
            }}>Update</Button> */}

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
                    <ModalHeader>Update Infomation Shop</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Formik
                            validateOnChange={false}
                            // validationSchema={addUpdateVoucherValidationSchema}
                            enableReinitialize={true}
                            initialValues={voucher ? voucher : initialValues}
                            onSubmit={handleSubmitVoucher}>
                            {({ handleChange, handleSubmit, setFieldValue, values, errors }) => {
                                const { onUploader: onUploaderBanner } = useDisplayImage((image) => {
                                    try {
                                        if (image) {
                                            setFieldValue('banner', image);
                                        }
                                        if (inputRefBanner && inputRefBanner.current) {
                                            inputRefBanner.current.value = '';
                                        }
                                    } catch (error) {
                                        console.log('error upload banner', error);
                                    }
                                });
                                const { onUploader: onUploaderAvata } = useDisplayImage((image) => {
                                    try {
                                        if (image) {
                                            setFieldValue('avata', image);
                                        }
                                        if (inputRefAvata && inputRefAvata.current) {
                                            inputRefAvata.current.value = '';
                                        }
                                    } catch (error) {
                                        console.log('error upload avata', error);
                                    }
                                });
                                return (
                                    <Box>
                                        <Flex flexDirection={'row'} justifyContent='space-around' alignItems='center'>
                                            {/* <FormGroup title="Avata" mt="3"> */}

                                            <AspectRatio ratio={1 / 1}
                                                w='140px'
                                                zIndex={1}
                                                position="relative"
                                                onClick={() => inputRefAvata.current.click()}>
                                                <Box w='100%' h='100%'>
                                                    <Flex
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        cursor="pointer"
                                                        zIndex={1}
                                                        h="100%"
                                                        w="100%"
                                                        borderWidth="1px"
                                                        borderRadius="4px"
                                                        overflow="hidden"
                                                        borderColor={values.avata ? 'transparent' : 'gray.700'}
                                                        position="relative">
                                                        {values.avata ? (
                                                            <img
                                                                src={values.avata}
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            />
                                                        ) : (
                                                            <Flex flexDirection="column" alignItems="center" justifyContent="center">
                                                                <Icon as={IoIosCloudUpload} width="32px" height="32px" color="gray.100" />
                                                                <Text mt="1">Upload avata</Text>
                                                            </Flex>
                                                        )}
                                                        {values.avata && (
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
                                                                    setFieldValue('avata', '');
                                                                }}
                                                            />
                                                        )}
                                                    </Flex>
                                                    <input
                                                        ref={inputRefAvata}
                                                        accept="image/*"
                                                        id="icon-button-file"
                                                        type="file"
                                                        multiple
                                                        style={{ display: 'none', cursor: 'pointer' }}
                                                        onChange={onUploaderAvata}
                                                    />
                                                </Box>
                                            </AspectRatio>
                                            {/* </FormGroup> */}
                                            {/* <FormGroup title="Banner voucher" mt="3"> */}
                                            <Box maxW={{ base: 'unset', '2xl': '50%' }}>
                                                <Box
                                                    zIndex={1}
                                                    position="relative"
                                                    onClick={() => inputRefBanner.current.click()}>
                                                    <Flex
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        cursor="pointer"
                                                        zIndex={1}
                                                        h="140px"
                                                        w='350px'
                                                        borderWidth="1px"
                                                        borderRadius="4px"
                                                        overflow="hidden"
                                                        borderColor={values.banner ? 'transparent' : 'gray.700'}
                                                        position="relative">
                                                        {values.banner ? (
                                                            <img
                                                                src={values.banner}
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            />
                                                        ) : (
                                                            <Flex flexDirection="column" alignItems="center" justifyContent="center">
                                                                <Icon as={IoIosCloudUpload} width="32px" height="32px" color="gray.100" />
                                                                <Text mt="1">Upload an image of banner</Text>
                                                            </Flex>
                                                        )}
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
                                                    </Flex>
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
                                            </Box>
                                            {/* </FormGroup> */}
                                        </Flex>
                                        {/* <Flex flexDirection={'row'} mt='20px'> */}
                                        <FormGroup title="Address" mt='20px'>
                                            <FormControl
                                            // isInvalid={!!errors.name}
                                            >
                                                <Input
                                                    placeholder="Input"
                                                    autoComplete="off"
                                                    value={values.name}
                                                    onChange={handleChange('name')}
                                                />
                                                <FormErrorMessage>{errors.name}</FormErrorMessage>
                                            </FormControl>
                                        </FormGroup>
                                        {/* </Flex> */}
                                        {/* <Flex flexDirection={'row'} mt='20px'> */}
                                        <FormGroup title="Program details" mt="6">
                                            <Textarea
                                                rows={6}
                                                placeholder="Description"
                                                autoComplete="off"
                                                value={values.description}
                                                onChange={handleChange('description')}
                                            />
                                        </FormGroup>
                                        {/* </Flex> */}
                                    </Box>

                                );
                            }}
                        </Formik>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} variant='ghost'>cancel</Button>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalUpdateInfo;