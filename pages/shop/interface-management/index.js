import React from 'react';
import Admin from 'layouts/Admin';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import { NotificationContainer } from 'react-light-notifications';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { IconShop } from 'components/Icons/Icons';
import FeatureProductItem from './components/FeaturedProductItem';
import ModalUpdateInformationShop from './components/ModalUpdateInformationShop';
import ModalUpdateFeaturedProduct from './components/ModalUpdateFeaturedProduct';

const image = 'https://imgtr.ee/images/2023/05/10/l0smR.png';

const InterfaceManagement = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { isOpen: isOpenShop, onOpen: onOpenShop, onClose: onCloseShop } = useDisclosure();
  const { isOpen: isOpenProduct, onOpen: onOpenProduct, onClose: onCloseProduct } = useDisclosure();

  const data = [
    {
      id: '1',
      name: 'Bộ đồ thu đông',
      image: image,
      amount: 200000,
    },
    {
      id: '2',
      name: 'Bộ đồ thu đông',
      image: image,
      amount: 200000,
    },
    {
      id: '3',
      name: 'Bộ đồ thu đông',
      image: image,
      amount: 200000,
    },
    {
      id: '4',
      name: 'Bộ đồ thu đông',
      image: image,
      amount: 200000,
    },
  ];

  return (
    <Box>
      <Flex alignItems="center">
        <Icon as={IconShop} w="36px" h="37px" color="text-basic" />
        <Text ml="5" textStyle="h6-t-h7" color="text-basic">
          {t('shop_information')}
        </Text>
      </Flex>
      <Text mx={{ base: 'unset', sm: '6', xl: '10' }} mt="6" color="text-basic" textStyle="h5-h6">
        {t('general_information')}
      </Text>
      <Divider mt="2" orientation="horizontal" borderColor="border-1" />
      <Flex
        px={{ base: 'unset', sm: '6', xl: '10' }}
        flexDirection={{ base: 'column', lg: 'row' }}
        maxW={{ base: 'unset', xl: '85%' }}
        mt="8">
        <Flex flex="8" flexDirection={{ base: 'column', sm: 'row' }}>
          <Box mr={{ base: 'unset', sm: '4', xl: '100px' }}>
            <Box>
              <AspectRatio minW="180px" maxW={{ base: 'unset', sm: '180px' }} ratio={1}>
                <Image src={image} boxSize="full" objectFit="cover" alt="image_shop" />
              </AspectRatio>
              <Text textAlign="center" mt="4">
                Avatar
              </Text>
            </Box>
            <Box mt="6">
              <AspectRatio minW="180px" maxW={{ base: 'unset', sm: '180px' }} ratio={1}>
                <Image src={image} boxSize="full" objectFit="cover" alt="image_banner" />
              </AspectRatio>
              <Text textAlign="center" mt="4">
                Banner
              </Text>
            </Box>
          </Box>
          <Flex
            flex="1"
            flexDirection="column"
            justifyContent="center"
            mt={{ base: '6', sm: 'unset' }}
            mr={{ base: 'unset', lg: '4' }}>
            <Text color="text-basic" textStyle="b-md">
              {`${t('description')}: `}
              <Text as="span" color="text-basic" textStyle="c-md">
                Nếu như bạn đam mê mở một shop quần áo nhưng không có quá nhiều chi phí và diện tích
                cũng không được lớn. Vậy làm sao để thiết kế shop quần áo nhỏ 10m2 nhưng vẫn phải
                đẹp và đầy đủ công năng? Để giải quyết vấn đề khó khăn của bạn, chúng tôi ở đây sẽ
                mang lại cho bạn những kinh nghiệm để thiết kế một shop quần áo ưng ý nhất.{' '}
              </Text>
            </Text>
            <Text color="text-basic" textStyle="c-md" mt={{ base: '6', sm: '8', xl: '12' }}>
              {t('address')}: 09 Đường số 01, Khu dân cư Trung tâm phường 6, TP. Tân An, Long An
            </Text>
          </Flex>
        </Flex>
        <Flex
          flex="2"
          alignItems="center"
          justifyContent={{ base: 'flex-start', lg: 'center' }}
          mt={{ base: '6', lg: 'unset' }}>
          <Button variant="primary" children={t('update')} minW="112px" onClick={onOpenShop} />
        </Flex>
      </Flex>
      <Text mx={{ base: 'unset', sm: '6', xl: '10' }} mt="6" color="text-basic" textStyle="h5-h6">
        {t('featured_products')}
      </Text>
      <Divider mt="2" orientation="horizontal" borderColor="border-1" />
      <Flex
        px={{ base: 'unset', sm: '6', xl: '10' }}
        flexDirection={{ base: 'column', lg: 'row' }}
        maxW={{ base: 'unset', xl: '85%' }}
        mt="8">
        <Flex flex="8">
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 2, xl: 3, '2xl': 4 }}
            gap={{ base: '6', lg: '8', '2xl': '8' }}>
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                return <FeatureProductItem {...item} key={index} />;
              })}
          </SimpleGrid>
        </Flex>
        <Flex
          flex="2"
          alignItems="center"
          justifyContent={{ base: 'flex-start', lg: 'center' }}
          mt={{ base: '6', lg: 'unset' }}>
          <Button variant="primary" children={t('update')} minW="112px" onClick={onOpenProduct} />
        </Flex>
      </Flex>
      <ModalUpdateInformationShop isOpen={isOpenShop} onClose={onCloseShop} />
      <ModalUpdateFeaturedProduct isOpen={isOpenProduct} onClose={onCloseProduct} />
    </Box>
  );
};

InterfaceManagement.layout = Admin;

export default WithAuthentication(InterfaceManagement);
