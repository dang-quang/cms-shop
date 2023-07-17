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
import CartTotalInfo2 from 'components/CardTotalInfo2/CartTotalInfo2.js';
import PropTypes from 'prop-types';

import { formatCurrency, formatNumber } from '../../../utilities/utils';

import { useRouter } from 'next/router';
import styles from 'assets/jss/natcash/views/voucher/voucherOrderStyle.js';

function VoucherOrderPage() {
  const router = useRouter();
  const id = router.query.id;
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
        setCardTotalData(item.voucher_info);
        setTableData(item.orders_voucher);
      }
    });
  }, []);

  const LIST_TITLE_VALUE = [
    {
      id: 'en',
      value: [
        'Promotion name',
        'Discount',
        'Code Type',
        'Quantity',
        'Voucher Type',
        'Time',
        'Applicable Products',
        'Saved',
        'Minimum order value',
        'Voucher Code',
        'Voucher display mode',
        'Used',
      ],
    },
    {
      id: 'vi',
      value: [
        'Tên chương trình giảm giá',
        'Giảm giá',
        'Loại mã',
        'Số lượng',
        'Loại Voucher',
        'Thời gian',
        'Sản phẩm được áp dụng',
        'Đã lưu',
        'Giá trị đơn hàng tối thiểu',
        'Mã voucher',
        'Chế độ hiển thị Voucher',
        'Đã dùng',
      ],
    },
  ];

  const TABLE_HEAD = [
    {
      id: 'en',
      value: ['Order ID', 'Product', 'Discount', 'Total amount', 'Order date', 'Status'],
    },
    {
      id: 'vi',
      value: ['Mã đơn hàng', 'Sản phẩm', 'Mức giảm', 'Tổng số tiền', 'Ngày đặt hàng', 'Trạng thái'],
    },
  ];

  const listText = [
    {
      id: 'en',
      title: 'Infomation',
      title2: 'Orders using Voucher',
      subTitle2: 'Total order',
      listTitleValue: LIST_TITLE_VALUE[0].value,
      tableHead: TABLE_HEAD[0].value,
      shop: 'Shop',
    },
    {
      id: 'vi',
      title: 'Thông tin cơ bản',
      title2: 'Đơn hàng sử dụng Voucher',
      subTitle2: 'Đơn hàng tổng cộng',
      listTitleValue: LIST_TITLE_VALUE[1].value,
      tableHead: TABLE_HEAD[1].value,
      shop: 'Gian hàng',
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
      id: 312313,
      shop_id: 54435575,
      shop_icon:
        'https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png',
      shop_code: 'STTMN',
      shop_name: 'ShopTreTho Miền Nam',
      voucher_info: {
        promotion_name: 'Follow T9',
        discount: 5000,
        code_type: 'All',
        quantity: 1000,
        voucher_type: 'promotion',
        time_from: '2021-09-14T14:07:11.747Z',
        time_to: '2021-09-21T14:07:11.747Z',
        applicable_products: 'all',
        saved: 769,
        minimum_order_value: 99000,
        voucher_code: 'SFP-180761592545280',
        voucher_display_mode: 'homepage',
        used: 333,
      },
      orders_voucher: [
        {
          id: 1234,
          order_id: '210909SWNW8YW5',
          product: ['https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11'],
          discount: 9000,
          total_amount: 196000,
          order_date: '14/08/2021',
          order_status: 'Finished',
        },
        {
          id: 5678,
          order_id: '210818VUKWW7H9',
          product: [
            'https://cf.shopee.vn/file/94f100cb953e89f1c7d66014dcdb337f',
            'https://cf.shopee.vn/file/8aeec7b29fb345999b858b266a8be02a',
            'https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11',
            'https://cf.shopee.vn/file/e4056b2747001d77569b2e6adca9976b',
            'https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc',
            'https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9',
          ],
          discount: 5000,
          total_amount: 114000,
          order_date: '15/09/2021',
          order_status: 'Finished',
        },
        {
          id: 9101,
          order_id: '210814JN08SU7S',
          product: [
            'https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11',
            'https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc',
            'https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9',
          ],
          discount: 20000,
          total_amount: 555000,
          order_date: '20/09/2021',
          order_status: 'Finished',
        },
      ],
    },
    {
      id: 123421,
      shop_id: 54435575,
      shop_icon:
        'https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png',
      shop_code: 'Anlababy',
      shop_name: 'Anlababy',
      voucher_info: {
        promotion_name: 'Follow T9',
        discount: 5000,
        code_type: 'All',
        quantity: 1000,
        voucher_type: 'promotion',
        time_from: '2021-09-14T14:07:11.747Z',
        time_to: '2021-09-21T14:07:11.747Z',
        applicable_products: 'all',
        saved: 769,
        minimum_order_value: 99000,
        voucher_code: 'SFP-180761592545280',
        voucher_display_mode: 'homepage',
        used: 333,
      },
      orders_voucher: [
        {
          id: 1234,
          order_id: '210909SWNW8YW5',
          product: ['https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11'],
          discount: 9000,
          total_amount: 196000,
          order_date: '14/08/2021',
          order_status: 'Finished',
        },
        {
          id: 5678,
          order_id: '210818VUKWW7H9',
          product: [
            'https://cf.shopee.vn/file/94f100cb953e89f1c7d66014dcdb337f',
            'https://cf.shopee.vn/file/8aeec7b29fb345999b858b266a8be02a',
            'https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11',
            'https://cf.shopee.vn/file/e4056b2747001d77569b2e6adca9976b',
            'https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc',
            'https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9',
          ],
          discount: 5000,
          total_amount: 114000,
          order_date: '15/09/2021',
          order_status: 'Finished',
        },
        {
          id: 9101,
          order_id: '210814JN08SU7S',
          product: [
            'https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11',
            'https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc',
            'https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9',
          ],
          discount: 20000,
          total_amount: 555000,
          order_date: '20/09/2021',
          order_status: 'Finished',
        },
      ],
    },
    {
      id: 432412,
      shop_id: 54435575,
      shop_icon:
        'https://www.freepnglogos.com/uploads/shopee-logo/shopee-bag-logo-free-transparent-icon-17.png',
      shop_code: 'OFC',
      shop_name: 'ShopTreTho Official',
      voucher_info: {
        promotion_name: 'Follow T9',
        discount: 5000,
        code_type: 'All',
        quantity: 1000,
        voucher_type: 'promotion',
        time_from: '2021-09-14T14:07:11.747Z',
        time_to: '2021-09-21T14:07:11.747Z',
        applicable_products: 'all',
        saved: 769,
        minimum_order_value: 99000,
        voucher_code: 'SFP-180761592545280',
        voucher_display_mode: 'homepage',
        used: 333,
      },
      orders_voucher: [
        {
          id: 1234,
          order_id: '210909SWNW8YW5',
          product: ['https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11'],
          discount: 9000,
          total_amount: 196000,
          order_date: '14/08/2021',
          order_status: 'Finished',
        },
        {
          id: 5678,
          order_id: '210818VUKWW7H9',
          product: [
            'https://cf.shopee.vn/file/94f100cb953e89f1c7d66014dcdb337f',
            'https://cf.shopee.vn/file/8aeec7b29fb345999b858b266a8be02a',
            'https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11',
            'https://cf.shopee.vn/file/e4056b2747001d77569b2e6adca9976b',
            'https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc',
            'https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9',
          ],
          discount: 5000,
          total_amount: 114000,
          order_date: '15/09/2021',
          order_status: 'Finished',
        },
        {
          id: 9101,
          order_id: '210814JN08SU7S',
          product: [
            'https://cf.shopee.vn/file/02708dde78032145eb7f7ffb9c992c11',
            'https://cf.shopee.vn/file/2cc6120227889bbb896b1a8d047361fc',
            'https://cf.shopee.vn/file/98e319478083a8b4a446ce038837f3a9',
          ],
          discount: 20000,
          total_amount: 555000,
          order_date: '20/09/2021',
          order_status: 'Finished',
        },
      ],
    },
  ]);

  const listValue = [
    {
      title: [
        text.listTitleValue[0],
        text.listTitleValue[1],
        text.listTitleValue[2],
        text.listTitleValue[3],
      ],
      value: [
        cardTotalData?.promotion_name,
        cardTotalData?.discount,
        cardTotalData?.code_type,
        cardTotalData?.quantity,
      ],
    },
    {
      title: [
        text.listTitleValue[4],
        text.listTitleValue[5],
        text.listTitleValue[6],
        text.listTitleValue[7],
      ],
      value: [
        cardTotalData?.voucher_type,
        moment(cardTotalData?.time_from).format('h:mm DD/MM/YYYY') +
          ' - ' +
          moment(cardTotalData?.time_to).format('h:mm DD/MM/YYYY'),
        cardTotalData?.applicable_products,
        cardTotalData?.saved,
      ],
    },
    {
      title: [
        text.listTitleValue[8],
        text.listTitleValue[9],
        text.listTitleValue[10],
        text.listTitleValue[11],
      ],
      value: [
        formatCurrency(cardTotalData?.minimum_order_value),
        cardTotalData?.voucher_code,
        cardTotalData?.voucher_display_mode,
        cardTotalData?.used,
      ],
    },
  ];

  const renderTable = (item, index) => {
    return (
      <TableRow key={'renderTable' + index} className={tableClasses.tableBodyRow}>
        <TableCell className={tableClasses.tableCell} key={'OrderID'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>{item.order_id}</p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'Product'}>
          <div className={classes.flex_center}>
            {item.product.map((product, pIndex) => {
              if (pIndex <= 2) {
                return <img src={item.product[pIndex]} className={classes.tableImage} />;
              } else if (pIndex > 2 && pIndex == item.product.length - 1) {
                return (
                  <>
                    <img src={item.product[3]} className={classes.tableImage} />
                    <p
                      className={classes.text + ' ' + classes.infoTextPrimary + ' ' + classes.more}>
                      {item.product.length - 4 > 0 && (
                        <span>
                          {'+'} {item.product.length - 4}
                        </span>
                      )}
                    </p>
                  </>
                );
              }
            })}
          </div>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'Discount'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {formatCurrency(item.discount)}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'TotalAmount'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>
            {formatCurrency(item.total_amount)}
          </p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'OrderDate'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>{item.order_date}</p>
        </TableCell>
        <TableCell className={tableClasses.tableCell} key={'Status'}>
          <p className={classes.text + ' ' + classes.infoTextPrimary}>{item.order_status}</p>
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
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>{text.title2}</h4>
          <p className={classes.cardCategoryWhite}>39 {text.subTitle2}</p>
        </CardHeader>
        <CardBody className={classes.cardBody}>{TableData()}</CardBody>
      </Card>
    );
  };

  return (
    <>
      <CartTotalInfo2
        title={text.title}
        subTitle={text.shop + ': ' + data?.shop_name}
        listValue={listValue}
      />
      {CartListItem()}
    </>
  );
}

VoucherOrderPage.layout = Admin;

export default WithAuthentication(VoucherOrderPage);
