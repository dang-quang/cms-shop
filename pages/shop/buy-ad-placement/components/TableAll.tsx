import React from 'react';
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import QRShop from './QRShop';

export const adType = {
  QCSHOP: 'QCShop',
  QCBANNER: 'QCBanner',
};

function TableAll(props: any) {
  const tabs = ['QC Shop', 'QC Banner'];
  if (props.type == 1) {
    return (
      <Box>
        <Text style={{ fontSize: 22, fontWeight: 'lighter' }}>Chọn loại quảng cáo</Text>
        <Tabs variant="soft-rounded">
          <Flex justifyContent="space-between">
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
                    fontWeight: '500',
                    color: 'primary.100',
                    borderBottomWidth: '1px',
                    borderBottomColor: 'primary.100',
                  }}
                  color="text-basic">
                  {name}
                </Tab>
              ))}
            </TabList>
          </Flex>
          <TabPanels>
            <TabPanel>
              <QRShop type={props?.type} adType={adType.QCSHOP} />
            </TabPanel>
            <TabPanel>
              <QRShop type={props?.type} adType={adType.QCBANNER} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    );
  } else {
    return <QRShop type={props?.type} />;
  }
  return (
    <Box>
      <Text style={{ fontSize: 22, fontWeight: 'lighter' }}>Chọn loại quảng cáo</Text>
      <Tabs variant="soft-rounded">
        <Flex justifyContent="space-between">
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
                  fontWeight: '500',
                  color: 'primary.100',
                  borderBottomWidth: '1px',
                  borderBottomColor: 'primary.100',
                }}
                color="text-basic">
                {name}
              </Tab>
            ))}
          </TabList>
        </Flex>
        <TabPanels>
          <TabPanel></TabPanel>
          <TabPanel>
            <p>fdfdsfds</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default TableAll;
