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
import Button from 'components/CustomButtons/Button.js';
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
          <Text textStyle="h5" color="text-basic" marginBottom={'10px'}>
            [NGÀNH HÀNG THỜI TRANG] - [SIÊU SALE HÀNG HIỆU] - [00:00 09/09/2022 - 23:59 09/09/2022]
          </Text>
        </Box>
        <Box
          w={'70%'}
          borderWidth="0.3px"
          overflow="hidden"
          borderColor="#B4B4B4"
          justifyContent={'center'}
          alignItems={'center'}>
          <Flex m={'2px'} justifyContent={'space-between'}>
            <AspectRatio w="210px" ratio={2 / 1} mr="2" borderRadius="8px" overflow="hidden">
              <Image
                w="100%"
                h="100%"
                objectFit="cover"
                src={'https://cf.shopee.vn/file/sg-11134004-7qvg9-lh7djcs0g92vb7'}
              />
            </AspectRatio>
            <Box>
              <Flex
                h="100%"
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}>
                <Text textStyle="h5" color="text-basic">
                  Thời gian đăng ký
                </Text>
                <Text textStyle="h2" color="text-basic">
                  00:00 16-08-2022 - 13:30 05-09-2022
                </Text>
                <Text textStyle="h2" color="text-basic">
                  Hiện tại bạn có thể đăng ký 7 Khung giờ
                </Text>
              </Flex>
            </Box>
            <Box marginRight={'20px'}>
              <Flex
                h="100%"
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}>
                <Text textStyle="h5" color="text-basic">
                  Thời gian diễn ra
                </Text>
                <Text textStyle="h2" color="text-basic">
                  00:00 09-09-2022 - 23:59 09-09-2022
                </Text>
                <Text textStyle="h2" color="text-basic">
                  0 Khung giờ bạn đã đăng ký đang diễn ra
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Box>

      </CardBody>

    </>
  );
}

ShopInfomationPage.layout = Admin;

export default WithAuthentication(ShopInfomationPage);
