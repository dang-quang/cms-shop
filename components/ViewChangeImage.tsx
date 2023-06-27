import React, { useEffect, useState } from 'react';
import { Box, Flex, Icon, Text, Image } from '@chakra-ui/react';
import { IoMdArrowBack, IoMdSearch, IoMdCart, IoMdStar } from 'react-icons/io';

import { MdOutlineFmdGood } from 'react-icons/md';

const fake = [
  {
    image:
      'https://testeuapi.natcom.com.ht/assets/natshop/category/20230612/category_1686564485212.jpg',
    price: '105.000d',
  },
  {
    image:
      'https://testeuapi.natcom.com.ht/assets/natshop/category/20230612/category_1686562303071.jpg',
    price: '105.000d',
  },
  {
    image:
      'https://testeuapi.natcom.com.ht/assets/natshop/category/20230612/category_1686562475246.jpg',
    price: '105.000d',
  },
  {
    image:
      'https://testeuapi.natcom.com.ht/assets/natshop/category/20230612/category_1686562430626.jpg',
    price: '105.000d',
  },
];

const fakeProduct = [
  {
    name: 'Tinh dầu nước hoa để phòng Mẫu mới',
    image: 'https://ajax-filters-bc.diviengine.com/sampledata/images/Hoodie-Women-3.jpg',
    price: '105.000d',
  },
  {
    name: 'Tinh dầu nước hoa để phòng Mẫu mới đến từ Châu Âu',
    image: 'https://ajax-filters-bc.diviengine.com/sampledata/images/Divi-Ninja.jpg',
    price: '105.000d',
  },
  {
    name: 'Áo polo nam local brand 360 boutique chất liệu cao cấp',
    image:
      'https://lzd-img-global.slatic.net/g/p/730799d703dbb0cc5fa87aae387447cd.jpg_200x200q80.jpg',
    price: '105.000d',
  },
  {
    name: 'Quần am Vettino, quần tây nam đen hàn quốc co dãn',
    image:
      'https://ajax-filters-bc.diviengine.com/sampledata/images/divi-Simplified-croptop-white.jpg',
    price: '105.000d',
  },
];

function ViewChangeImage({ imageSrc }: { imageSrc: any }) {
  const [image, setImage] = useState<any>(imageSrc);

  useEffect(() => {
    if (imageSrc) {
      setImage(imageSrc);
    }
  }, [imageSrc]);

  return (
    <Box style={{ width: 300 }} display={'flex'} flexDirection={'column'}>
      <Flex justifyContent={'space-between'}>
        <Flex>
          <Icon as={IoMdArrowBack} color={'primary.100'} width="24px" height="24px" />
          <Icon
            as={IoMdSearch}
            color={'black'}
            width="24px"
            height="24px"
            style={{ marginLeft: 40 }}
          />
          <Text fontWeight={'medium'}>Việt Nam</Text>
        </Flex>
        <Icon as={IoMdCart} color={'primary.100'} width="24px" height="24px" />
      </Flex>
      <Flex
        marginTop={'3'}
        borderRadius={8}
        flexDirection={'column'}
        marginX={'1'}
        bg={'white'}
        boxShadow="xl"
        p={'2'}
        borderWidth={0.5}>
        <Flex alignItems={'center'} width={'100%'} justifyContent={'space-between'}>
          <Flex alignItems={'center'}>
            <Image
              src="https://picsum.photos/300"
              style={{ width: 25, height: 25, borderRadius: 30 }}
            />
            <Box ml={'10px'}>
              <Text fontSize={10} fontWeight={'semibold'}>
                Việt Nam Store
              </Text>
              <Text fontSize={10} fontWeight={'semibold'}>
                150 products
              </Text>
            </Box>
          </Flex>
          <Text color={'primary.100'} fontSize={12}>
            Xem
          </Text>
        </Flex>
        <Flex width={'100%'} justifyContent={'space-between'} alignItems={'center'} mt={'2'}>
          {fake.map((ele) => {
            return (
              <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Image src={ele.image} style={{ width: 50, height: 40 }}></Image>
                <Text fontSize={10}>{ele.price}</Text>
              </Box>
            );
          })}
        </Flex>
      </Flex>
      <Box
        style={{ width: 300, height: 60, marginTop: 10 }}
        alignItems={'center'}
        alignSelf={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        bg={'green'}>
        {image ? (
          <img src={image} style={{ width: 300, height: 60, objectFit: 'cover' }} />
        ) : (
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            bg={'#8d8484'}
            style={{ width: 300, height: 60 }}>
            <Text mt="1" textAlign={'center'}>
              Vị trí banner
            </Text>
          </Flex>
        )}
      </Box>
      <Flex
        w={'100%'}
        justifyContent={'space-between'}
        alignItems={'center'}
        style={{ marginTop: 10 }}>
        <Text bg={'gray.500'} color={'primary.100'} p={'1'} fontSize={10} borderRadius={50}>
          Lieen quan
        </Text>
        <Text color={'black'} p={'1'} fontSize={10} borderRadius={50}>
          Lieen quan
        </Text>
        <Text color={'black'} p={'1'} fontSize={10} borderRadius={50}>
          Lieen quan
        </Text>
      </Flex>
      <Box flex={1} bg={'#efefef'} mt={'2'} borderRadius={8} pt={2}>
        <Text fontSize={12} ml={'4px'}>
          Kết quả tìm kiếm
        </Text>
        <Flex flex={1} flexWrap={'wrap'} justifyContent={'space-between'} px={'5px'}>
          {fakeProduct.map((ele) => {
            return (
              <Box style={{ width: 140 }}>
                <Image src={ele.image} style={{ width: 140, height: 100 }} />
                <Text fontSize={10}>{ele.name}</Text>
                <Text fontSize={12} color={'primary.100'}>
                  {ele.price}
                </Text>
                <Flex>
                  <Icon as={IoMdStar} width={2} height={2} color={'yellow'} />
                  <Icon as={IoMdStar} width={2} height={2} color={'yellow'} />
                  <Icon as={IoMdStar} width={2} height={2} color={'yellow'} />
                  <Icon as={IoMdStar} width={2} height={2} color={'yellow'} />
                  <Icon as={IoMdStar} width={2} height={2} color={'yellow'} />
                </Flex>
                <Flex alignItems={'center'} mt={1}>
                  <Icon as={MdOutlineFmdGood} width={2} height={2} color={'gray.100'} />
                  <Text color={'gray.100'} fontSize={8}>
                    Tp. Ho Chi Minh
                  </Text>
                </Flex>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}

export default ViewChangeImage;
