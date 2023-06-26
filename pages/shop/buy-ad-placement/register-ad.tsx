import { Box, Flex, Input, Image, Button } from '@chakra-ui/react';
import React from 'react';
import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import Admin from 'layouts/Admin';
import { RangeDatePickerItem, WithAuthentication } from 'components';
import { formatCurrency } from 'utilities/utils';
import Images from 'assets';

function RegisterAd({ data, close, typeAd }: { data: any; close: () => void; typeAd: any }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = React.useState([new Date(), new Date()]);
  const [endDate, setEndDate] = React.useState(new Date());
  const keyWordRef = React.useRef();

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Flex flex={1}>
        <Box flex="4">
          <Box flex={1} display={'flex'} justifyContent={'space-between'} flexDirection={'column'}>
            <Flex flex={1} alignItems={'center'} mb="10">
              <Text as={'span'} mr="6" fontWeight={'800'}>
                Nhập từ khóa:
              </Text>
              <Input ref={keyWordRef} flex="1" borderColor={'black'} maxW={'50%'} />
            </Flex>
            <Text fontWeight={'800'} mb="5">
              Thông tin từ khóa
            </Text>

            <Flex alignItems="center">
              <Text mr="6">Expries: </Text>
              <RangeDatePickerItem onDateChange={setSelectedDate} selectedDates={selectedDate} />
            </Flex>
            <Flex alignItems="center" mt={'5'}>
              <Text mr="6">Cost: </Text>
              <Text
                fontWeight={'semibold'}
                borderColor={'black'}
                bgColor={'F6F6F6'}
                borderWidth={1}
                borderRadius={'4'}
                padding="1"
                color={'red'}>
                {formatCurrency('5000')}
              </Text>
            </Flex>
          </Box>
        </Box>
        <Box flex="3">
          <Image src={Images.qc_shop} style={{ width: 300, height: 350 }}></Image>
        </Box>
      </Flex>
      <Flex mt={'20'} justifyContent={'flex-end'}>
        {typeAd != 3 ? (
          <Button
            maxW={'120px'}
            colorScheme="teal"
            variant="solid"
            mr={'10'}
            backgroundColor={'primary.100'}
            _hover={{
              backgroundColor: 'white',
              borderColor: 'primary.100',
              borderWidth: 1,
              color: 'primary.100',
            }}>
            <Text>{'Đăng ký'}</Text>
          </Button>
        ) : null}

        <Button
          maxW={'120px'}
          onClick={close}
          colorScheme="teal"
          borderColor={'black'}
          variant="outline"
          color={'black'}
          // backgroundColor={'primary.100'}
          _hover={{
            backgroundColor: 'white',
            borderColor: 'primary.100',
            borderWidth: 1,
            color: 'primary.100',
          }}>
          <Text>Cancel</Text>
        </Button>
      </Flex>
    </Box>
  );
}

export default RegisterAd;
