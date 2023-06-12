import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Link from 'next/link';
import 'react-light-notifications/lib/main.css';
// @material-ui/core components
import { grayColor, primaryColor, successColor } from 'assets/jss/natcash.js';
// layout for this page
import Admin from 'layouts/Admin.js';
// core components
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
// import Button from 'components/CustomButtons/Button.js';
import {
  ClickAwayListener,
  FormControl,
  Grow,
  Icon,
  InputLabel,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  useTheme,
  withStyles,
} from '@material-ui/core';
// import {
//   AspectRatio,
//   Box,
//   Center,
//   Checkbox,
//   Flex,
//   Image,
//   Input,
//   Text,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   InputGroup,
//   InputRightElement,
// } from '@chakra-ui/react';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Poppers from '@material-ui/core/Popper';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import GridContainer from 'components/Grid/GridContainer.js';
import adminStyles from 'assets/jss/natcash/components/headerLinksStyle.js';
import tableStyles from 'assets/jss/natcash/components/tableStyle.js';
import taskStyles from 'assets/jss/natcash/components/tasksStyle.js';
import shopStyle from 'assets/jss/natcash/views/shoplist/shoplistStyle.js';
import dashStyles from 'assets/jss/natcash/views/dashboardStyle.js';
import vi from 'date-fns/locale/vi';
import classNames from 'classnames';
import useWindowSize from 'components/Hooks/useWindowSize.js';
import CartTotalInfo from 'components/CartTotalInfo/CartTotalInfo.js';
import PropTypes from 'prop-types';

import { formatCurrency } from '../../../utilities/utils';

import { useRouter } from 'next/router';
import styles from 'assets/jss/natcash/views/voucher/voucherStyle.js';

import imgMoney from 'assets/img/money.png';
import imgPercent from 'assets/img/percent.png';
import { useTranslation } from 'react-i18next';
import CustomInput from '../../../components/CustomInput/CustomInput';
import Search from '@material-ui/icons/Search';
import {
  AspectRatio,
  Box,
  Center,
  Checkbox,
  Flex,
  Image,
  Input,
  Button,
  Text,
  // Tab,
  TabList,
  TabPanel,
  TabPanels,
  // Tabs,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

function ShopInfomationPage() {
  const router = useRouter();
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const useAdminStyles = makeStyles(adminStyles);
  const adminClasses = useAdminStyles();
  const useShopStyles = makeStyles(shopStyle);
  const shopClasses = useShopStyles();
  const useTableStyles = makeStyles(tableStyles);
  const tableClasses = useTableStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const theme = useTheme();
  //filter date
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();
  const TAB_LIST = [t('all'), t('happening'), t('upcoming'), t('finished')];

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        setIsMobile(window.innerWidth < 1200);
      },
      false
    );
  }, []);

  const listValue = [
    {
      title: t('voucher.quantityUsed'),
      tooltip: t('voucher.quantityUsedTooltip'),
      value: 19,
      compareValue: '55.81%',
      type: 'up',
    },
    {
      title: t('voucher.buyer'),
      tooltip: t('voucher.buyerTooltip'),
      value: 19,
      compareValue: '54.76%',
      type: 'down',
    },
    {
      title: t('voucher.quantitySold'),
      tooltip: t('voucher.quantitySoldTooltip'),
      value: 27,
      compareValue: '56.45%',
      type: 'down',
    },
    {
      title: t('voucher.revenue'),
      tooltip: t('voucher.revenueTooltip'),
      value: '5.203.660',
      compareValue: '72.29%',
      type: 'down',
    },
  ];

  return (
    <>
      <Card>
        <CardHeader color="primary">
          <Text textStyle="h5" color="white">
            {t('sideBar.productApproval')}
          </Text>
        </CardHeader>
      </Card>

      <CardBody className={classes.cardBody}>
        <Box>
          <Text textStyle="h6" color="text-basic" marginBottom={'10px'}>
            Shop infomation
          </Text>
        </Box>
        <Box
          w={'100%'}
          // borderWidth="0.3px"
          overflow="hidden"
          // borderColor="#B4B4B4"
          justifyContent={'center'}
          alignItems={'center'}>
          <Box
            borderWidth="0.3px"
            borderColor="#B4B4B4"
            marginTop="20px"
            marginBottom="20px"
            height={'1px'}></Box>

          {/* <Flex flexDirection={'column'}>
            <Box backgroundImage={'https://down-ws-vn.img.susercontent.com/e03048a5576062894717bb1ab92241f2'} w={'375px'} h={'162px'}>

            </Box>
            <Box w={'375px'} h={'82px'} position='absolute' bottom={'15px'}>
              <Flex flexDirection={'row'} marginLeft='10px' marginTop='10px'>
                <Image
                  borderRadius='full'
                  boxSize='60px'
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAABJlBMVEXP2NxgfYtjf412j5uMoavO19uis7vG0dVxi5fBzNJyjJhjgI56kp5hfoxxi5h5kZ2ouL9ohJGInaipucCHnah3kJyxv8bL1NnM1dlphJGXqrN4kZzM1tqUp7Gnt76InqlkgY6wvsWGnKdrhpOnuL+xwMZ8lJ+3xMvAzNGCmaTFz9Sdr7fN1trN19tlgY5qhZJkgI6/y9COoqzL1dlphJJ0jZp7k566x8y7x81ng5CywMegsrp4kZ14kJyhs7uJn6nH0dZlgY+Fm6bG0daWqrO2xMqzwcfF0NXBzdK3xcu0wsh7k5+qusG0wsmzwchuiJVviZaYq7S7yM2Kn6m8yM6/y9GInqiWqbKNoqxzjJmjtLyqucGfsbmdr7iwv8WKoKpuiZVif42PQ9RwAAABzUlEQVR4Xu3YVZLjShBA0UyBmZmamXuYmZmZ3tv/Jua3Y8JWTdsKKR1zzwruR1aVlDIdAAAAAAAAAAAAAAAAAADyN1t+3fPqfiOTl7kQ1qp6QqkZinmdnP6hcFVs6wY6RtATwx75OlY7K2ZlczpBzmx194ZONOyKTbc0QiAmrWikFTHoIKeRKgdiz7o6LIo919XhophzRp3yYs01dcqINavqtCTWXFAnX6y5ok7nxZqyOhWJNjAeHERzVx6Py7Y6PRZzqnP4wSQ1dajN4U9AIRSDOhqpIyYFGuGs2HRuqBMNR/O3rKlYXjG1dazhbTGsF4yd557YtlFwrHpNCpslPeHZ81DmQj7T8OvFYt9vfM3LPwkAgOzDzMLdUqV/qHqnXymtLmRe3hPD9h/s7RzpGEc7e1v7Yk+4dX/zWCMsbw6eiClPgzV107XPL8SI3cEr/Wuv3+xK+t4ueXoq3rv3kq4PrbKeWvnjtqRn9MnTqXiDkaTkUkGn9uWypKK5rDM4/CYp+K4z+iGJW9SZrSc+z57OzEt6rtsag6ok6qfGYkOS1NJY/JIk/aexyEmS/tdYHEuSNCbzGU000UQTTTQAAAAAAAAAAAAAAAAAAL8BwZgl987F+p8AAAAASUVORK5CYII='
                  alt='Dan Abramov'
                />
                <Flex marginLeft='10px'>
                  <Text color='white' textStyle='h4' fontWeight='bold'>Shop thời trang</Text>
                </Flex>
              </Flex>

            </Box>
          </Flex> */}

          <Flex>
            <Flex flexDirection="column">
              <Box flexDirection="column" width="150px" textAlign="center">
                <Image
                  src="https://www.phutungtt.com/wp-content/uploads/2022/09/logo-shopee-trong-tin-part.png"
                  w={150}
                  height={150}
                />
                <Text textStyle="h3" color="text-basic" marginBottom={'10px'}>
                  Avata
                </Text>
              </Box>
              <Box flexDirection="column" width="280px" textAlign="center">
                {/* <Image src='https://down-ws-vn.img.susercontent.com/e03048a5576062894717bb1ab92241f2' w={150} height={150} /> */}
                <AspectRatio w="280px" ratio={2 / 1} mr="2" borderRadius="8px" overflow="hidden">
                  <Image
                    src="https://a.ipricegroup.com/media/Eye/Shopee__Logo__x_iPrice_Thailand.jpg"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                </AspectRatio>
                <Text textStyle="h3" color="text-basic" marginBottom={'10px'}>
                  Banner
                </Text>
              </Box>
            </Flex>
            <Box
              alignItems="center"
              justifyContent="center"
              marginLeft={'20px'}
              h="300px"
              w={'50%'}>
              <Text textStyle="h3" color="text-basic" marginBottom={'10px'}>
                Mô tả: Nếu như bạn đam mê mở một shop quần áo nhưng không có quá nhiều chi phí và
                diện tích cũng không được lớn. Vậy làm sao để thiết kế shop quần áo nhỏ 10m2 nhưng
                vẫn phải đẹp và đầy đủ công năng? Để giải quyết vấn đề khó khăn của bạn, chúng tôi ở
                đây sẽ mang lại cho bạn những kinh nghiệm để thiết kế một shop quần áo ưng ý nhất.
              </Text>
              <Text textStyle="h3" color="text-basic" marginBottom={'10px'}>
                Địa chỉ: 09 Đường số 01, Khu dân cư Trung tâm phường 6, TP. Tân An, Long An
              </Text>
            </Box>
            <Box alignItems="center" marginLeft={'20px'}>
              <Button
                variant="primary"
                children="Update"
                onClick={() => router.push('/admin/voucher/add')}
              />
            </Box>
          </Flex>

          <Box marginTop="20px">
            <Text textStyle="h4" color="text-basic" marginBottom={'5px'}>
              Featured products
            </Text>
          </Box>
          <Box
            borderWidth="0.3px"
            borderColor="#B4B4B4"
            marginTop="20px"
            marginBottom="20px"
            height={'1px'}></Box>
          <Flex flexDirection="row" justifyContent="space-between" w="70%">
            <Box textAlign="center">
              <Image
                src="https://shopdunk.com/images/thumbs/0008502_macbook-air-m2-2022-8gb-ram-256gb-ssd_240.png  "
                w={150}
                height={150}
              />
              <Text>Bộ đồ thu đông</Text>
              <Flex flexDirection="row" textAlign="center">
                <Text textStyle="h3" color="text-basic">
                  Giá niêm yết:
                </Text>
                <Text textStyle="h3" color="red" marginLeft="3px">
                  {' '}
                  200.000đ
                </Text>
              </Flex>
            </Box>
            <Box textAlign="center">
              <Image
                src="https://shopdunk.com/images/thumbs/0012005_airpods-max_240.webp"
                w={150}
                height={150}
              />
              <Text>Bộ đồ thu đông</Text>
              <Flex flexDirection="row" textAlign="center">
                <Text textStyle="h3" color="text-basic">
                  Giá niêm yết:
                </Text>
                <Text textStyle="h3" color="red" marginLeft="3px">
                  {' '}
                  200.000đ
                </Text>
              </Flex>
            </Box>
            <Box textAlign="center">
              <Image
                src="https://shopdunk.com/images/thumbs/0007301_ipad-pro-m2-129-inch-wifi-128gb_240.png"
                w={150}
                height={150}
              />
              <Text>Bộ đồ thu đông</Text>
              <Flex flexDirection="row" textAlign="center">
                <Text textStyle="h3" color="text-basic">
                  Giá niêm yết:
                </Text>
                <Text textStyle="h3" color="red" marginLeft="3px">
                  {' '}
                  200.000đ
                </Text>
              </Flex>
            </Box>
            <Box textAlign="center">
              <Image
                src="https://shopdunk.com/images/thumbs/0007808_iphone-14-pro-max-128gb_240.png"
                w={150}
                height={150}
              />
              <Text>Bộ đồ thu đông</Text>
              <Flex flexDirection="row" textAlign="center">
                <Text textStyle="h3" color="text-basic">
                  Giá niêm yết:
                </Text>
                <Text textStyle="h3" color="red" marginLeft="3px">
                  {' '}
                  200.000đ
                </Text>
              </Flex>
            </Box>
            <Box>
              <Button
                variant="primary"
                children="Add Voucher"
                onClick={() => router.push('/admin/voucher/add')}
              />
            </Box>
          </Flex>
        </Box>
      </CardBody>
    </>
  );
}

ShopInfomationPage.layout = Admin;

export default ShopInfomationPage;
// export default WithAuthentication(ShopInfomationPage);
