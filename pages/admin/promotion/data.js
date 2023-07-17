import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Link from 'next/link';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';
import 'react-light-notifications/lib/main.css';
// @material-ui/core components
import {} from '@material-ui/core/styles';
import {
  primaryColor,
  whiteColor,
  blackColor,
  hexToRgb,
  successColor,
  infoColor,
  orangeColor,
  grayColor,
} from 'assets/jss/natcash.js';
// layout for this page
import Admin from 'layouts/Admin.js';
// core components
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import {
  Modal,
  Tab,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tooltip,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  makeStyles,
  withStyles,
  useTheme,
  Box,
  Typography,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Poppers from '@material-ui/core/Popper';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import GridContainer from 'components/Grid/GridContainer.js';
import adminStyles from 'assets/jss/natcash/components/headerLinksStyle.js';
import tableStyles from 'assets/jss/natcash/components/tableStyle.js';
import taskStyles from 'assets/jss/natcash/components/tasksStyle.js';
import shopStyle from 'assets/jss/natcash/views/shoplist/shoplistStyle.js';
import { Icon } from '@material-ui/core';
import dashStyles from 'assets/jss/natcash/views/dashboardStyle.js';
import vi from 'date-fns/locale/vi';
import classNames from 'classnames';
import useWindowSize from 'components/Hooks/useWindowSize.js';
import CartTotalInfo from 'components/CartTotalInfo/CartTotalInfo.js';
import CartTotalInfo2 from 'components/CardTotalInfo2/CartTotalInfo2.js';
import PropTypes from 'prop-types';

import { formatCurrency, formatNumber } from '../../../utilities/utils';

import { useRouter } from 'next/router';
import styles from 'assets/jss/natcash/views/promotion/promotionDataStyle.js';

function DataPromotionPage() {
  const router = useRouter();
  const id = router.query.id;
  const theme = useTheme();
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useShopStyles = makeStyles(shopStyle);
  const shopClasses = useShopStyles();
  const useAdminStyles = makeStyles(adminStyles);
  const useTableStyles = makeStyles(tableStyles);
  const adminClasses = useAdminStyles();
  const tableClasses = useTableStyles();
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const [data, setData] = useState();
  const [cardTotalData, setCardTotalData] = useState();
  const [tableData, setTableData] = useState();

  const language = useSelector((state) => state.app.language);
  useEffect(() => {
    dataReal.map((item, index) => {
      if (item.id == id) {
        setData(item);
        setCardTotalData(item.promotion_info);
        setTableData(item.rank);
      }
    });
  }, []);

  const LIST_TITLE_VALUE = [
    {
      id: 'en',
      value: ['Revenue', 'Sold', 'Order', 'Buyer', 'Revenue per Buyer'],
    },
    {
      id: 'vi',
      value: ['Doanh thu', 'Số lượng đã bán', 'Đơn hàng', 'Người mua', 'Doanh thu/Người mua'],
    },
  ];

  const TABLE_HEAD = [
    {
      id: 'en',
      value: [
        'Rank',
        'Product',
        'Classify',
        'Price',
        'Discount',
        'Promotion Price',
        'Sold',
        'Revenue',
      ],
    },
    {
      id: 'vi',
      value: [
        'Thứ hạng',
        'Sản phẩm',
        'Phân loại hàng',
        'Giá',
        'Khuyến Mãi',
        'Giá Khuyến Mãi',
        'Đã bán',
        'Doanh thu',
      ],
    },
  ];

  const TOOLTIP = [
    {
      id: 'en',
      value: [
        'Total value of confirmed orders with this promotion.',
        'Number of products in the confirmed order with this promotion',
        'Number of confirmed orders with this promotion.',
        'Number of buyers with confirmed orders with the promotion.',
        'Revenue on the number of buyers who have confirmed orders with this promotion.',
      ],
    },
    {
      id: 'vi',
      value: [
        'Tổng giá trị đơn hàng đã xác nhận với chương trình khuyến mãi này.',
        'Số sản phẩm thuộc đơn hàng đã xác nhận với chương trình khuyến mãi này.',
        'Số đơn hàng đã xác nhận với chương trình khuyến mãi này.',
        'Số người mua có đơn hàng đã xác nhận với chương trình khuyến mãi.',
        'Doanh thu trên số người mua có  đơn hàng đã xác nhận với chương trình khuyến mãi này.',
      ],
    },
  ];

  const listText = [
    {
      id: 'en',
      title: 'Infomation of promotion',
      title2: 'Product Rank',
      subTitle2: 'Total order',
      listTitleValue: LIST_TITLE_VALUE[0].value,
      tableHead: TABLE_HEAD[0].value,
      shop: 'Shop',
      txtClassify: 'Classify',
      tooltip: TOOLTIP[0].value,
      shop: 'Shop',
      time: 'Time',
    },
    {
      id: 'vi',
      title: 'Thông tin chương trình ',
      title2: 'Thứ hạng sản phẩm',
      subTitle2: 'Đơn hàng tổng cộng',
      listTitleValue: LIST_TITLE_VALUE[1].value,
      tableHead: TABLE_HEAD[1].value,
      shop: 'Gian hàng',
      txtClassify: 'Phân loại',
      tooltip: TOOLTIP[1].value,
      shop: 'Gian hàng',
      time: 'Thời gian',
    },
  ];
  const [text, setText] = useState(listText[0]);
  useEffect(() => {
    for (let i = 0; i < listText.length; i++) {
      if (language == listText[i].id) {
        setText(listText[i]);
        break;
      }
    }
  }, [language]);

  const [dataReal, setDataReal] = useState([
    {
      id: '618388e28db32c3b18e1fed8',
      shop_id: 54435575,
      shop_icon:
        'https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png',
      shop_code: 'STTMN',
      shop_name: 'ShopTreTho Miền Nam',
      promotion_info: {
        promotion_name: 'sale 21.9',
        time_from: '2021-09-14',
        time_to: '2021-09-21',
        revenue: 5203660,
        sold: 19,
        order: 27,
        buyer: 19,
        revenue_per_buyer: 203660,
      },
      rank: [
        {
          id: 1234,
          rank: 1,
          product: {
            product_id: 1412412,
            product_name: 'Xe cân bằng trẻ em Cruzee nhiều màu',
            image: 'https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11',
            discount_code: 'Mã FMCGMALL - 8% đơn 250K',
            product_type: [
              {
                name: 'Số 0( 0-1 tuổi)',
                price: 4366500,
                discount: 1,
                promotion_price: 4366500,
                sold: 1,
                revenue: 4366500,
              },
              {
                name: 'Số 9( 1-3T)',
                price: 5609500,
                discount: 1,
                promotion_price: 5609500,
                sold: 1,
                revenue: 5609500,
              },
            ],
          },
        },
        {
          id: 1424,
          rank: 2,
          product: {
            product_id: 1421241,
            product_name: 'Sữa Meiji số 0/9 - 800g',
            image: 'https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11',
            discount_code: 'Mã FMCGMALL - 8% đơn 250K',
            product_type: [
              {
                name: 'Số 0( 0-1 tuổi)',
                price: 4366500,
                discount: 1,
                promotion_price: 4366500,
                sold: 1,
                revenue: 4366500,
              },
            ],
          },
        },
      ],
    },
    {
      id: 124122,
      shop_id: 54435575,
      shop_icon:
        'https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png',
      shop_code: 'Anlababy',
      shop_name: 'Anlababy',
      promotion_info: {
        promotion_name: 'FS 15.9',
        time_from: '2021-09-14',
        time_to: '2021-09-21',
        revenue: 5203660,
        sold: 19,
        order: 27,
        buyer: 19,
        revenue_per_buyer: 203660,
      },
      rank: [
        {
          id: 1234,
          rank: 1,
          product: {
            product_id: 1412412,
            product_name: 'Xe cân bằng trẻ em Cruzee nhiều màu',
            image: 'https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11',
            discount_code: 'Mã FMCGMALL - 8% đơn 250K',
            product_type: [
              {
                name: 'Số 0( 0-1 tuổi)',
                price: 4366500,
                discount: 1,
                promotion_price: 4366500,
                sold: 1,
                revenue: 4366500,
              },
              {
                name: 'Số 9( 1-3T)',
                price: 5609500,
                discount: 1,
                promotion_price: 5609500,
                sold: 1,
                revenue: 5609500,
              },
            ],
          },
        },
        {
          id: 1424,
          rank: 1,
          product: {
            product_id: 1421241,
            product_name: 'Sữa Meiji số 0/9 - 800g',
            image: 'https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11',
            discount_code: 'Mã FMCGMALL - 8% đơn 250K',
            product_type: [
              {
                name: 'Số 0( 0-1 tuổi)',
                price: 4366500,
                discount: 1,
                promotion_price: 4366500,
                sold: 1,
                revenue: 4366500,
              },
            ],
          },
        },
      ],
    },
  ]);

  const listValue = [
    {
      title: text.listTitleValue[0],
      tooltip: text.tooltip[0],
      value: formatCurrency(cardTotalData?.revenue),
      compareValue: '',
      type: '',
    },
    {
      title: text.listTitleValue[1],
      tooltip: text.tooltip[1],
      value: cardTotalData?.sold,
      compareValue: '',
      type: '',
    },
    {
      title: text.listTitleValue[2],
      tooltip: text.tooltip[2],
      value: cardTotalData?.order,
      compareValue: '',
      type: '',
    },
    {
      title: text.listTitleValue[3],
      tooltip: text.tooltip[3],
      value: cardTotalData?.buyer,
      compareValue: '',
      type: '',
    },
    {
      title: text.listTitleValue[4],
      tooltip: text.tooltip[4],
      value: formatCurrency(cardTotalData?.revenue_per_buyer),
      compareValue: '',
      type: '',
    },
  ];

  const renderTable = (item, index) => {
    return (
      <TableRow key={'renderTable' + index} className={tableClasses.tableBodyRow}>
        <TableCell className={tableClasses.tableCell} key={'Rank'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>{item.rank}</p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'Product'}>
          <div className={classes.cellInfo}>
            <img src={item.product?.image} className={classes.tableImage} />
            <div className={classes.infoTextContainer}>
              <p className={classes.text + ' ' + classes.infoTextPrimary}>
                {item.product.product_name}
              </p>
              <p className={classes.text + ' ' + classes.infoTextSecondary}>
                {item.product.discount_code}
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'Classify'}>
          {item.product.product_type.map((props) => {
            return <p className={classes.text + ' ' + classes.infoTextPrimary}>{props.name}</p>;
          })}
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'Price'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {item.product.product_type.map((props) => {
              return (
                <p className={classes.text + ' ' + classes.infoTextPrimary}>
                  {formatCurrency(props.price)}
                </p>
              );
            })}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'Discount'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {item.product.product_type.map((props) => {
              return (
                <p className={classes.text + ' ' + classes.infoTextPrimary}>
                  {props.discount + '%'}
                </p>
              );
            })}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'Promotion Price'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {item.product.product_type.map((props) => {
              return (
                <p className={classes.text + ' ' + classes.infoTextPrimary}>
                  {formatCurrency(props.promotion_price)}
                </p>
              );
            })}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'Sold'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {item.product.product_type.map((props) => {
              return <p className={classes.text + ' ' + classes.infoTextPrimary}>{props.sold}</p>;
            })}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'Revenue'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {item.product.product_type.map((props) => {
              return (
                <p className={classes.text + ' ' + classes.infoTextPrimary}>
                  {formatCurrency(props.revenue)}
                </p>
              );
            })}
          </p>
        </TableCell>
      </TableRow>
    );
  };

  const TableData = () => {
    return (
      <div className={tableClasses.tableResponsive}>
        <Table className={tableClasses.table}>
          {tableData !== undefined ? (
            <TableHead className={tableClasses['primary' + 'TableHeader']}>
              <TableRow className={tableClasses.tableHeadRow}>
                {text.tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={tableClasses.tableCell + ' ' + tableClasses.tableHeadCell}
                      key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData?.map((item, index) => {
              return renderTable(item, index);
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  const CartListItem = () => {
    return (
      <Card style={{ marginTop: 65 }}>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>{text.title2}</h4>
        </CardHeader>
        <CardBody className={classes.cardBody}>{TableData()}</CardBody>
      </Card>
    );
  };

  return (
    <>
      <CartTotalInfo
        title={text.title + ': ' + cardTotalData?.promotion_name}
        subTitle={
          text.shop +
          ': ' +
          data?.shop_name +
          ' --- ' +
          text.time +
          ': ' +
          cardTotalData?.time_from +
          ' - ' +
          cardTotalData?.time_to
        }
        compareText={text.compareText}
        listValue={listValue}
        xs={2}
        sm={2}
        md={2}
        column={0}
      />
      {CartListItem()}
    </>
  );
}

DataPromotionPage.layout = Admin;

export default WithAuthentication(DataPromotionPage);
