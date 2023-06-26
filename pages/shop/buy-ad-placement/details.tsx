import React, { useState } from 'react';
import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import Admin from 'layouts/Admin';
import { WithAuthentication } from 'components';
import { useRouter } from 'next/router';
import { HorizontalText } from './components/QRShop';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from 'utilities/utils';
import { useDisplayImage } from 'hooks';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IoIosCloudUpload } from 'react-icons/io';
import Images from 'assets';
import ViewChangeImage from 'components/ViewChangeImage';

function DetailsAd({ item, close, typeAd }: { item: any; close: () => void; typeAd: any }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [image, setImage] = useState<any>();
  const { onUploader: onUploaderBanner } = useDisplayImage((image) => {
    try {
      if (image) {
        setImage(image);
      }
      if (inputRefBanner && inputRefBanner.current) {
        inputRefBanner.current.value = '';
      }
    } catch (error) {
      console.log('error upload banner', error);
    }
  });
  const inputRefBanner = React.useRef<any>();
  console.log('afgabdfghjkdfjkhdfhjk,dfg', router?.query);

  // const item = router?.query;

  return (
    <Box display={'flex'} flex={1} flexDirection={'column'} justifyContent={'center'}>
      <Text style={{ fontSize: 22, fontWeight: 'lighter' }}>Chi tiết QC</Text>
      <Flex flex={1} alignItems={'center'} justifyContent={'space-around'} mt={'70px'}>
        <Box display={'flex'} flex={1} alignItems={'center'} flexDirection={'column'}>
          <ViewChangeImage imageSrc={image} />
        </Box>
        <Flex flex={1}>
          <Box
            display={'flex'}
            flex={2}
            flexDirection={'column'}
            alignItems={'flex-start'}
            pl={'50px'}>
            <Text style={{ fontSize: 20, fontWeight: 'lighter' }}>Thông tin chi tiết</Text>
            <Box display={'flex'} flexDirection={'column'} ml={'50px'}>
              <HorizontalText text1={t('description')} text2={item.des} mY={'10px'} />
              <HorizontalText text1={t('time')} text2={item.time} mY={'10px'} />
              <HorizontalText text1={t('location')} text2={item.locate} mY={'10px'} />
              <HorizontalText text1={t('type')} text2={'QC Banner'} mY={'10px'} />
              <HorizontalText
                text1={t('price')}
                text2={` ${formatCurrency(item.price)}`}
                color2={'red'}
                mY={'10px'}
              />
            </Box>
            <Text style={{ fontSize: 20, fontWeight: 'lighter' }} mt={'30px'}>
              Tải Banner
            </Text>
            <Flex ml={'50px'} mb={'30px'} flexDirection={'column'}>
              <Button
                onClick={() => {
                  if (typeAd != 3) {
                    inputRefBanner?.current?.click();
                  }
                }}
                colorScheme="teal"
                alignSelf={'center'}
                variant="solid"
                mr={'30px'}
                backgroundColor={'primary.100'}
                _hover={{
                  backgroundColor: 'white',
                  borderColor: 'primary.100',
                  borderWidth: 1,
                  color: 'primary.100',
                }}>
                <Text>Chọn tệp</Text>
              </Button>
              <Box maxW={{ base: 'unset', '2xl': '60%' }}>
                <Box
                  zIndex={1}
                  position="relative"
                  onClick={() => {
                    if (typeAd != 3) {
                      inputRefBanner?.current?.click();
                    }
                  }}>
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    cursor="pointer"
                    zIndex={1}
                    h="100px"
                    w={'400px'}
                    maxW={'630px'}
                    borderWidth="1px"
                    borderRadius="4px"
                    mt={'30px'}
                    overflow="hidden"
                    borderColor={image ? 'transparent' : 'gray.700'}
                    position="relative">
                    {image ? (
                      <img
                        src={image}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <Flex flexDirection="column" alignItems="center" justifyContent="center">
                        <Icon as={IoIosCloudUpload} width="32px" height="32px" color="gray.100" />
                        <Text mt="1" textAlign={'center'}>
                          Upload an image of size (4x1)
                        </Text>
                      </Flex>
                    )}
                    {image &&
                      (typeAd != 3 ? (
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
                            setImage(undefined);
                          }}
                        />
                      ) : null)}
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
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <Flex flex={1} alignItems={'center'} justifyContent={'center'} mt={'50px'}>
        {typeAd != 3 ? (
          <Button
            flex={1}
            onClick={() => inputRefBanner?.current?.click()}
            maxW={'120px'}
            colorScheme="teal"
            alignSelf={'center'}
            variant="solid"
            marginRight={'40px'}
            mr={'30px'}
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
          flex={1}
          maxW={'120px'}
          ml={'100px'}
          onClick={() => {
            router.back();
          }}
          colorScheme="teal"
          alignSelf={'center'}
          borderColor={'black'}
          variant="outline"
          mr={'30px'}
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

// DetailsAd.layout = Admin;

export default DetailsAd;
