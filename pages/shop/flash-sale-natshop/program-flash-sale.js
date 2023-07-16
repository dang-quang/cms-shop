import React from 'react';
import Admin from 'layouts/Admin.js';
import { WithAuthentication } from 'components';
import { useRouter } from 'next/router';
import { useImageHandler } from 'hooks';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Flex,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBoolean,
} from '@chakra-ui/react';

import dayjs from 'dayjs';

function ProgramFlashSaleDetails() {
  const formatDate = 'YYYY/MM/DD HH:MM:ss';
  const router = useRouter();
  const { t } = useTranslation();

  const flashSale = !_.isEmpty(router.query) ? router.query : undefined;
  const lineCount = flashSale.description.split('\n').length;

  const banner = useImageHandler(flashSale.banner);
  const [isExpanded, { toggle: toggleExpand }] = useBoolean(false);

  const tabs = [t('program_details')];

  const data = [
    {
      title: t('register_time'),
      time: `${dayjs(flashSale.registerStart).format(formatDate)} - ${dayjs(
        flashSale.registerEnd
      ).format(formatDate)}`,
    },
    {
      title: t('occurrence_time'),
      time: `${dayjs(flashSale.programStart).format(formatDate)} - ${dayjs(
        flashSale.programEnd
      ).format(formatDate)}`,
    },
  ];

  return (
    <Box>
      <Box mt="6" bg="bg-1" borderRadius="4px" p="6">
        <Text textStyle="h6-sb" color="text-basic">
          {flashSale.name}
        </Text>
        <Flex h="150px" borderWidth="1px" mt="4" borderColor="border-5">
          <Box flex="4">
            <Image src={banner} w="100%" h="100%" objectFit="cover" />
          </Box>
          <Flex flex="6" py="6">
            {data &&
              data.map((item, index) => {
                const { title, time } = item;
                return (
                  <Box
                    flex="1"
                    pl="8"
                    borderRightWidth="1px"
                    borderColor={index < data.length - 1 ? 'border-5' : 'transparent'}>
                    <Text color="text-basic" textStyle="h5">
                      {title}
                    </Text>
                    <Text color="text-note" textStyle="h3" mt="2">
                      {time}
                    </Text>
                  </Box>
                );
              })}
          </Flex>
        </Flex>
        <Tabs variant="soft-rounded" mt="8">
          <TabList h="48px" w="full" borderBottomWidth="1px" borderBottomColor="border-5">
            {tabs.map((name, index) => (
              <Tab
                key={index}
                fontSize="14px"
                fontWeight="400"
                borderRadius="unset"
                textTransform="capitalize"
                borderBottomWidth="1px"
                borderBottomColor="transparent"
                _focus={{ showBox: 'none' }}
                _selected={{
                  fontWeight: '600',
                  color: 'primary.100',
                  borderBottomWidth: '3px',
                  borderBottomColor: 'primary.100',
                }}
                color="text-basic">
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box
                as="div"
                maxH={isExpanded ? 'unset' : '5em'}
                overflow="hidden"
                textOverflow="ellipsis"
                display="-webkit-box"
                whiteSpace={isExpanded || lineCount > 3 ? 'normal' : 'nowrap'}
                WebkitLineClamp={5}
                WebkitBoxOrient="vertical"
                textStyle="h3"
                color="text-note">
                {flashSale.description}
              </Box>
              {lineCount > 5 && (
                <Text
                  cursor="pointer"
                  textStyle="h3"
                  color="blue.200"
                  onClick={toggleExpand}
                  mt="2">
                  {isExpanded ? t('collapse') : t('more')}
                </Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Text textStyle="h4" color="text-basic">
          {t('flash_sale_shop.register_flash_sale')}
        </Text>
        <Button
          size="sm"
          w="120px"
          variant="primary"
          children={t('create')}
          mt="4"
          onClick={() => router.push({ pathname: '/shop/voucher-coupon/add', query: flashSale })}
        />
      </Box>
    </Box>
  );
}

ProgramFlashSaleDetails.layout = Admin;

export default WithAuthentication(ProgramFlashSaleDetails);
