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
import ModalCustom from "components/ModalCustom/ModalCustom.js";
import Check from "@material-ui/icons/Check";
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
  TextField,
  Typography,
  useTheme,
  withStyles,
  Checkbox,

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
import shopStyle from 'assets/jss/natcash/views/shoplist/shoplistStyle.js';
import dashStyles from 'assets/jss/natcash/views/dashboardStyle.js';
import vi from 'date-fns/locale/vi';
import classNames from 'classnames';
import useWindowSize from 'components/Hooks/useWindowSize.js';
import CartTotalInfo from 'components/CartTotalInfo/CartTotalInfo.js';
import PropTypes from 'prop-types';

import { formatCurrency } from '../../../utilities/utils';

import { useRouter } from 'next/router';
// import styles from 'assets/jss/natcash/views/voucher/voucherStyle.js';
import styles from "assets/jss/natcash/views/voucher/addVoucherStyle.js";
import tableStyles from "assets/jss/natcash/components/tableStyle.js";
import taskStyles from "assets/jss/natcash/components/tasksStyle.js";


import imgMoney from 'assets/img/money.png';
import imgPercent from 'assets/img/percent.png';
// import { useTranslation } from 'react-i18next';
import CustomInput from '../../../components/CustomInput/CustomInput';
import Search from '@material-ui/icons/Search';
import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Image,
  Input,
  // Button,
  Text,
  // Tab,
  TabList,
  TabPanel,
  TabPanels,
  // Tabs,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import ModalUpdateInfo from './modalUpdateInfo';
import ModalUpdateProduct from './modalUpdateProduct';
import { useTranslation } from "react-i18next";
import Button from "components/CustomButtons/Button.js";


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

  // modal slect product
  const [isShowModal, setIsShowModal] = useState(false);
  const [filterType, setFilterType] = useState("name");
  const [filterValue, setFilterValue] = useState("");
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checked, setChecked] = useState([])
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();
  const [values, setValues] = React.useState({
    code_type: "all",
    promotion_name: "",
    voucher_code: "",
    time_from: moment().format("yyyy-MM-DDThh:mm"),
    time_to: moment().add(1, "hours").format("yyyy-MM-DDThh:mm"),
    voucher_type: "promotion",
    discount_type: "money",
    discount: "",
    discount_max_type: "limit",
    discount_max: "",
    order_money_min: "",
    maximum_usage: "",
    display: "many",
    added_product: [],
    status: "",
  });
  const TABLE_HEAD = [
    'product',
    'sold',
    'price',
    'quantity'
  ];
  const [dataProduct, setDataProduct] = useState([
    {
      id: "1234",
      avatar: "https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11",
      name: "Bình đun nước thông minh Moaz Bebe MB-002",
      sold: 23,
      original_price: 1210000,
      quantity: 5,
    },
    {
      id: "34524523",
      avatar: "https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc",
      name: "Sữa Meiji số 0/9 - 800g",
      sold: 30,
      original_price: 550000,
      quantity: 988,
    },
    {
      id: "1245362324",
      avatar: "https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9",
      name: "Chăn lưới OTK xuất Nga cho bé 3",
      sold: 10,
      original_price: 120000,
      quantity: 8,
    },
    {
      id: "124536232412",
      avatar: "https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9",
      name: "Chăn lưới OTK xuất Nga cho bé 2",
      sold: 10,
      original_price: 120000,
      quantity: 8,
    },
    {
      id: "124536232124",
      avatar: "https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9",
      name: "Chăn lưới OTK xuất Nga cho bé 1",
      sold: 10,
      original_price: 120000,
      quantity: 8,
    },
  ]);



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


  const handleChangeFilterType = (event) => {
    setFilterType(event.target.value);
  };

  const handleChangeFilterValue = (event) => {
    setFilterValue(event.target.value);
  };


  const handleCheckAll = () => {
    if (isCheckAll) {
      setIsCheckAll(false);
      setChecked([]);
    } else {
      setIsCheckAll(true);
      setChecked(dataProduct);
    }
  };

  const handleToggle = (item) => {
    const currentIndex = checked.indexOf(item);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      setIsCheckAll(false);
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const renderProduct = (item, index) => {
    return (
      <React.Fragment>
        <TableRow
          key={index}
          className={tableClasses.tableBodyRow}
          style={{
            backgroundColor: checked.indexOf(item) !== -1 ? "#fff6f0" : "#fff",
          }}
        >
          <TableCell className={tableClasses.tableCell}>
            <Checkbox
              checked={checked.indexOf(item) !== -1}
              tabIndex={-1}
              onClick={() => handleToggle(item)}
              checkedIcon={<Check className={taskClasses.checkedIcon} />}
              icon={<Check className={taskClasses.uncheckedIcon} />}
              classes={{
                checked: taskClasses.checked,
                root: taskClasses.root,
              }}
            />
          </TableCell>
          <TableCell
            className={
              tableClasses.tableCell + " " + tableClasses.cellWidth_400
            }
            key={"productInfo"}
          >
            <div className={classes.cellInfo}>
              <img src={item.avatar} className={classes.tableImage} />
              <div className={classes.infoTextContainer}>
                <p className={classes.text + " " + classes.infoTextPrimary}>
                  {item.name}
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"sold"}>
            {item.sold}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"OriginalPrice"}>
            {formatCurrency(item.original_price)}
          </TableCell>
          <TableCell className={tableClasses.tableCell} key={"Quantity"}>
            {item.quantity}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };


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
          <Box borderWidth="0.3px" borderColor="#B4B4B4" marginTop="20px" marginBottom="20px" height={"1px"}></Box>

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
              <Box flexDirection="column" width='150px' textAlign='center'>
                <Image src='https://www.phutungtt.com/wp-content/uploads/2022/09/logo-shopee-trong-tin-part.png' w={150} height={150} />
                <Text textStyle="h3" color="text-basic" marginBottom={'10px'} >
                  Avata
                </Text>
              </Box>
              <Box flexDirection="column" width='280px' textAlign='center'>
                {/* <Image src='https://down-ws-vn.img.susercontent.com/e03048a5576062894717bb1ab92241f2' w={150} height={150} /> */}
                <AspectRatio
                  w="280px"
                  ratio={2 / 1}
                  mr="2"
                  borderRadius="8px"
                  overflow="hidden">
                  <Image src='https://a.ipricegroup.com/media/Eye/Shopee__Logo__x_iPrice_Thailand.jpg' w="100%" h="100%" objectFit="cover" />
                </AspectRatio>
                <Text textStyle="h3" color="text-basic" marginBottom={'10px'} >
                  Banner
                </Text>
              </Box>
            </Flex>
            <Box alignItems='center' justifyContent='center' marginLeft={'20px'} h='300px' w={'50%'}>
              <Text textStyle="h3" color="text-basic" marginBottom={'10px'} >
                Mô tả: Nếu như bạn đam mê mở một shop quần áo nhưng không có quá nhiều chi phí và diện tích cũng không được lớn. Vậy làm sao để thiết kế shop quần áo nhỏ 10m2 nhưng vẫn phải đẹp và đầy đủ công năng? Để giải quyết vấn đề khó khăn của bạn, chúng tôi ở đây sẽ mang lại cho bạn những kinh nghiệm để thiết kế một shop quần áo ưng ý nhất.
              </Text>
              <Text textStyle="h3" color="text-basic" marginBottom={'10px'}>
                Địa chỉ:  09 Đường số 01, Khu dân cư Trung tâm phường 6, TP. Tân An, Long An
              </Text>
            </Box>
            <Box alignItems='center' marginLeft={'20px'}>
              {/* <Button
                size="lg"
                variant="primary"
                children="Update"
                onClick={() => router.push('/admin/voucher/add')}
              /> */}
              <ModalUpdateInfo />
            </Box>
          </Flex>

          <Box marginTop='20px'>
            <Text textStyle="h4" color="text-basic" marginBottom={'5px'}>
              Featured products
            </Text>
          </Box>
          <Box borderWidth="0.3px" borderColor="#B4B4B4" marginTop="20px" marginBottom="20px" height={"1px"}></Box>
          <Flex flexDirection='row' justifyContent='space-between' alignItems='center' w='89%'>
            <Flex
              flexDirection='column'
              justifyContent="center"
              alignItems="center">
              <Image src='https://shopdunk.com/images/thumbs/0008502_macbook-air-m2-2022-8gb-ram-256gb-ssd_240.png  ' w='60%' justifyContent='center' />
              <Text>Bộ đồ thu đông</Text>
              <Flex flexDirection='row' textAlign='center'>
                <Text textStyle="h3" color="text-basic">Giá niêm yết:</Text>
                <Text textStyle="h3" color="red" marginLeft='3px'>  200.000đ</Text>
              </Flex>
            </Flex>
            <Flex
              flexDirection='column'
              justifyContent="center"
              alignItems="center">
              <Image src='https://shopdunk.com/images/thumbs/0012005_airpods-max_240.webp' w='60%' />
              <Text>Bộ đồ thu đông</Text>
              <Flex flexDirection='row' textAlign='center'>
                <Text textStyle="h3" color="text-basic">Giá niêm yết:</Text>
                <Text textStyle="h3" color="red" marginLeft='3px'>  200.000đ</Text>
              </Flex>
            </Flex>
            <Flex
              flexDirection='column'
              justifyContent="center"
              alignItems="center">
              <Image src='https://shopdunk.com/images/thumbs/0007301_ipad-pro-m2-129-inch-wifi-128gb_240.png' w='60%' />
              <Text>Bộ đồ thu đông</Text>
              <Flex flexDirection='row' textAlign='center'>
                <Text textStyle="h3" color="text-basic">Giá niêm yết:</Text>
                <Text textStyle="h3" color="red" marginLeft='3px'>  200.000đ</Text>
              </Flex>
            </Flex>
            <Flex
              flexDirection='column'
              justifyContent="center"
              alignItems="center">
              <Image src='https://shopdunk.com/images/thumbs/0007808_iphone-14-pro-max-128gb_240.png' w='60%' />
              <Text>Bộ đồ thu đông</Text>
              <Flex flexDirection='row' textAlign='center'>
                <Text textStyle="h3" color="text-basic">Giá niêm yết:</Text>
                <Text textStyle="h3" color="red" marginLeft='3px'>  200.000đ</Text>
              </Flex>
            </Flex>
            <Flex
              flexDirection='column'
              justifyContent="center"
              alignItems="center">
              {/* <ModalUpdateProduct /> */}
              <Button color="primary" onClick={() => setIsShowModal(true)}>
                {t('voucher.selectProduct')}
              </Button>


            </Flex>
          </Flex>
        </Box>


        {/* Modal selet product */}
        <ModalCustom
          width={1000}
          title={t('voucher.addProducts')}
          subTitle={""}
          // isShow={true}
          isShow={isShowModal}
          handleClose={() => setIsShowModal(false)}
        >
          <div className={classes.flex_center}>
            <FormControl variant="outlined" size="small">
              <Select
                labelId="select-outlined-label-1"
                id="select-outlined"
                value={filterType}
                onChange={handleChangeFilterType}
              >
                <MenuItem value={"name"}>{t('voucher.byAmount')}</MenuItem>
                <MenuItem value={"id"}>{t('voucher.byPercent')}</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small" style={{ flex: 1 }}>
              <TextField
                //   error={validateItemName ? false : true}
                id="input1"
                label={""}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  value: filterValue,
                  onChange: handleChangeFilterValue,
                }}
                placeholder={t('enterHere')}
                autoComplete="off"
                style={{ flex: 1 }}
              />
            </FormControl>
            <div style={{ marginLeft: "10px" }}>
              <Button color="primary">{t('search')}</Button>
              <Button color="gray">{t('reset')}</Button>
            </div>
          </div>
          <div
            className={tableClasses.tableResponsive}
            style={{ marginTop: "0" }}
          >
            <Table className={tableClasses.table}>
              {dataProduct !== undefined ? (
                <TableHead className={tableClasses["primary" + "TableHeader"]}>
                  <TableRow className={tableClasses.tableHeadRow}>
                    <TableCell className={tableClasses.tableCell}>
                      <Checkbox
                        checked={isCheckAll}
                        tabIndex={-1}
                        onClick={() => handleCheckAll()}
                        checkedIcon={
                          <Check className={taskClasses.checkedIcon} />
                        }
                        icon={<Check className={taskClasses.uncheckedIcon} />}
                        classes={{
                          checked: taskClasses.checked,
                          root: taskClasses.root,
                        }}
                      />
                    </TableCell>
                    {TABLE_HEAD.map((prop, key) => {
                      return (
                        <TableCell
                          className={
                            tableClasses.tableCell +
                            " " +
                            tableClasses.tableHeadCell
                          }
                          key={key}
                        >
                          {prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
              ) : null}
              <TableBody>
                {dataProduct.map((item, index) => {
                  return renderProduct(item, index);
                })}
              </TableBody>
            </Table>
            <div className={classes.buttonContainer}>
              <Button
                size="sm"
                color="primary"
                onClick={() => {
                  setValues({ ...values, ["added_product"]: checked }),
                    setIsShowModal(false);
                }}
              >
                {t('confirm')}
              </Button>
            </div>
          </div>
        </ModalCustom>

      </CardBody>

    </>
  );
}

ShopInfomationPage.layout = Admin;

export default ShopInfomationPage;
// export default WithAuthentication(ShopInfomationPage);
