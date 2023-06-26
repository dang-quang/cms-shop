import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  NumberInputFieldProps,
  Select,
  Text,
} from '@chakra-ui/react';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import router from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { textStyles } from 'theme/components/text';
import { globalStyles } from 'theme/styles';
import theme from 'theme/theme';
import { formatCurrency } from 'utilities/utils';
import DetailsAd from '../details';
import RegisterAd from '../register-ad';
import { adType } from './TableAll';

const fakeData = [
  {
    id: 1,
    des: '12312qdfasf',
    time: 'àgdgsgdsg',
    locate: 'dsfgdsgdsgds',
    price: 500000,
    image: 'https://picsum.photos/500',
    status: 1,
  },
  {
    id: 2,
    des: '12312qdfasf',
    time: 'àgdgsgdsg',
    locate: 'dsfgdsgdsgds',
    price: 500000,
    image: 'https://picsum.photos/500',
    status: 2,
  },
  {
    id: 3,
    des: '12312qdfasf',
    time: 'àgdgsgdsg',
    locate: 'dsfgdsgdsgds',
    price: 500000,
    image: 'https://picsum.photos/500',
  },
  {
    id: 4,
    des: '12312qdfasf',
    time: 'àgdgsgdsg',
    locate: 'dsfgdsgdsgds',
    price: 500000,
    image: 'https://picsum.photos/500',
  },
  {
    id: 5,
    des: '12312qdfasf',
    time: 'àgdgsgdsg',
    locate: 'dsfgdsgdsgds',
    price: 500000,
    image: 'https://picsum.photos/500',
  },
  {
    id: 6,
    des: '12312qdfasf',
    time: 'àgdgsgdsg',
    locate: 'dsfgdsgdsgds',
    price: 500000,
    image: 'https://picsum.photos/500',
  },
  {
    id: 7,
    des: '12312qdfasf',
    time: 'àgdgsgdsg',
    locate: 'dsfgdsgdsgds',
    price: 500000,
    image: 'https://picsum.photos/500',
  },
  {
    id: 8,
    des: '12312qdfasf',
    time: 'àgdgsgdsg',
    locate: 'dsfgdsgdsgds',
    price: 500000,
    image: 'https://picsum.photos/500',
  },
  {
    id: 9,
    des: '12312qdfasf',
    time: 'àgdgsgdsg',
    locate: 'dsfgdsgdsgds',
    price: 500000,
    image: 'https://picsum.photos/500',
  },
  {
    id: 10,
    des: '12312qdfasf',
    time: 'àgdgsgdsg',
    locate: 'dsfgdsgdsgds',
    price: 500000,
    image: 'https://picsum.photos/500',
  },
  {
    id: 11,
    des: '12312qdfasf',
    time: 'àgdgsgdsg',
    locate: 'dsfgdsgdsgds',
    price: 500000,
    image: 'https://picsum.photos/500',
  },
];

const Header = () => {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([new Date(), new Date()]);
  const fromMoney = React.useRef<string | number>();
  const toMoney = React.useRef<string | number>();

  const refInput = React.useRef<HTMLInputElement>();
  const { t } = useTranslation();
  return (
    <Flex alignItems="center">
      <Flex justifyContent="space-between" alignItems="center" flex={1}>
        <Text>Khoảng giá</Text>
        <Flex flex={1} alignItems={'center'}>
          <NumberInput
            variant={'outline'}
            clampValueOnBlur={false}
            maxWidth={'100px'}
            marginLeft={'10px'}>
            <NumberInputField
              // ref={refInput}
              value={fromMoney.current}
              // style={{
              //   borderColor: 'black',
              //   textAlign: 'center',
              //   paddingInline: '15px',
              // }}
              placeholder={'Từ'}
            />
          </NumberInput>
          <Box width={'30px'} height={'1px'} backgroundColor={'black'} marginX={'10px'}></Box>
          <NumberInput clampValueOnBlur={false} maxWidth={'100px'} variant={'outline'}>
            <NumberInputField
              ref={refInput}
              value={toMoney.current}
              // style={{ borderColor: 'black', textAlign: 'center', paddingInline: '15px' }}
              placeholder={'Đến'}
              onChange={(t) => console.log(t.currentTarget.value)}
            />
          </NumberInput>
          <Select
            // placeholder={t('location')}
            backgroundColor={'#f6f6f6'}
            borderColor={'black'}
            textAlign="center"
            maxWidth={'150px'}
            defaultValue={undefined}
            marginX={'40px'}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <RangeDatepicker
            selectedDates={selectedDates}
            onDateChange={setSelectedDates}
            propsConfigs={{
              inputProps: {
                backgroundColor: '#f6f6f6',
                borderColor: 'black',
                maxWidth: '250px',
                textAlign: 'center',
              },
            }}
          />
        </Flex>
      </Flex>
      <Flex>
        <Button
          flex={1}
          colorScheme="teal"
          variant="solid"
          mr={'30px'}
          backgroundColor={'primary.100'}
          _hover={{
            backgroundColor: 'white',
            borderColor: 'primary.100',
            borderWidth: 1,
            color: 'primary.100',
          }}>
          Tìm kiếm
        </Button>
        <Button colorScheme="teal" variant="outline" flex={1}>
          Nhập lại
        </Button>
      </Flex>
    </Flex>
  );
};

function QRShop(props: any) {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([new Date(), new Date()]);
  const fromMoney = React.useRef<string | number>();
  const toMoney = React.useRef<string | number>();
  const { t } = useTranslation();
  const [adChoosing, setAdChoosing] = useState<any>();

  const onClickReset = () => {
    // fromMoney.current = '';onClickReset
    // toMoney.current = '';
    refInput.current.value = '';
    setSelectedDates([new Date(), new Date()]);
  };

  const refInput = React.useRef<HTMLInputElement>();

  // React.useEffect(() => {
  //   console.log('dfdsffds', refInput.current.value);
  // }, [refInput.current.value]);

  const closeModal = () => {
    setAdChoosing(undefined);
  };

  return (
    <Box>
      {/* <Header /> */}
      <Flex alignItems="center">
        <Flex justifyContent="space-between" alignItems="center" flex={1}>
          <Text>Khoảng giá</Text>
          <Flex flex={1} alignItems={'center'}>
            <NumberInput clampValueOnBlur={false} maxWidth={'100px'} marginLeft={'10px'}>
              <NumberInputField
                // ref={refInput}
                value={fromMoney.current}
                style={{
                  borderColor: 'black',
                  textAlign: 'center',
                  paddingInline: '15px',
                }}
                placeholder={'Từ'}
              />
            </NumberInput>
            <Box width={'30px'} height={'1px'} backgroundColor={'black'} marginX={'10px'}></Box>

            <NumberInput clampValueOnBlur={false} maxWidth={'100px'} ref={refInput}>
              <NumberInputField
                value={toMoney.current}
                style={{ borderColor: 'black', textAlign: 'center', paddingInline: '15px' }}
                placeholder={'Đến'}
                onChange={(t) => console.log(t.currentTarget.value)}
              />
            </NumberInput>
            <Select
              // placeholder={t('location')}
              backgroundColor={'#f6f6f6'}
              borderColor={'black'}
              textAlign="center"
              maxWidth={'150px'}
              defaultValue={undefined}
              marginX={'40px'}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <RangeDatepicker
              selectedDates={selectedDates}
              onDateChange={setSelectedDates}
              propsConfigs={{
                inputProps: {
                  backgroundColor: '#f6f6f6',
                  borderColor: 'black',
                  maxWidth: '250px',
                  textAlign: 'center',
                },
              }}
            />
          </Flex>
        </Flex>
        <Flex>
          <Button
            flex={1}
            colorScheme="teal"
            variant="solid"
            mr={'30px'}
            backgroundColor={'primary.100'}
            _hover={{
              backgroundColor: 'white',
              borderColor: 'primary.100',
              borderWidth: 1,
              color: 'primary.100',
            }}>
            {t('search')}
          </Button>
          <Button colorScheme="teal" variant="outline" flex={1} onClick={onClickReset}>
            Nhập lại
          </Button>
        </Flex>
      </Flex>
      <Box maxHeight={'500px'} overflow={'auto'} mt={'30px'}>
        {fakeData.map((ele, index) => (
          <ItemAdLocate
            item={ele}
            idx={index}
            type={props?.type}
            chooseReg={() => setAdChoosing(ele)}
          />
        ))}
      </Box>
      <Modal isOpen={adChoosing} closeOnOverlayClick size="6xl" onClose={closeModal}>
        <ModalOverlay />
        <ModalContent p="2">
          {/* <ModalHeader color="text-basic">Register Advertisement</ModalHeader> */}
          <ModalCloseButton _focus={{ boxShadow: 'none' }} onClick={closeModal} />
          <ModalBody>
            {props.adType == adType.QCSHOP ? (
              <RegisterAd data={adChoosing} close={closeModal} typeAd={props?.type} />
            ) : (
              <DetailsAd item={adChoosing} close={closeModal} typeAd={props?.type} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

const ItemAdLocate = ({
  item,
  idx,
  type,
  chooseReg,
}: {
  item: any;
  idx: number;
  type: number;
  chooseReg: () => void;
}) => {
  const { t } = useTranslation();

  const checkStatus = (status: number) => {
    if (status == 1) {
      return (
        <Text textStyle={'20'} flex={0.6} alignSelf={'center'} color={'green'}>
          Đã xử lý
        </Text>
      );
    } else {
      return (
        <Text textStyle={'20'} flex={0.6} alignSelf={'center'} color={'primary.100'}>
          Chờ xác nhận
        </Text>
      );
    }
  };

  return (
    <Flex
      key={`${idx + Math.random()}`}
      flex={1}
      onClick={() => chooseReg()}
      borderBottomWidth={0.5}
      borderColor={'rgba(51, 51, 51, 1)'}
      paddingY={'40px'}>
      <Flex flex={1}>
        <Image src={item.image} style={{ width: 350, height: 150 }} flex={1} />
        <Box display="flex" flexDirection={'column'} alignItems={'center'} my={'10px'} flex={2}>
          <Flex flexDirection={'column'} justifyContent={'space-between'} flex={1}>
            <Flex flexDirection={'column'} alignItems={'flex-start'}>
              <HorizontalText text1={t('description')} text2={item.des} />
              <HorizontalText text1={t('time')} text2={item.time} />
              <HorizontalText text1={t('location')} text2={item.locate} />
            </Flex>
            <HorizontalText
              text1={t('price')}
              text2={` ${formatCurrency(item.price)}`}
              color2={'red'}
            />
          </Flex>
        </Box>
        {item?.status && type != 1 ? checkStatus(item?.status) : null}
        <Flex flex={1} justifyContent={'center'}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              chooseReg();
            }}
            alignSelf={'center'}
            colorScheme="teal"
            variant="solid"
            mr={'30px'}
            backgroundColor={'primary.100'}
            _hover={{
              backgroundColor: 'white',
              borderColor: 'primary.100',
              borderWidth: 1,
              color: 'primary.100',
            }}>
            {type == 1 ? t('register_now') : 'Xem chi tiết'}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const HorizontalText = ({
  text1,
  text2,
  color2,
  mY,
}: {
  text1: string;
  text2: string;
  color2?: string;
  mY?: string;
}) => {
  return (
    <Text textStyle={'h4-m'} marginY={mY ? mY : '2px'}>
      {text1}:
      <Text as={'span'} color={color2 ? color2 : 'black'} textStyle={'h4-l'}>
        {` ${text2}`}
      </Text>
    </Text>
  );
};

export default QRShop;
