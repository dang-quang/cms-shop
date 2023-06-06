import React, { useState, useEffect, useCallback } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  primaryColor,
  whiteColor,
  blackColor,
  hexToRgb,
  successColor,
  infoColor,
  orangeColor,
} from 'assets/jss/natcash.js';
// layout for this page
import Admin from 'layouts/Admin.js';
// core components
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import { useRouter } from 'next/router';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import dashStyles from 'assets/jss/natcash/views/dashboardStyle.js';
import Link from 'next/link';
import moment from 'moment';
import Icon from '@material-ui/core/Icon';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import { setShowLoader } from 'redux/actions/app';
import { getProductDetail } from 'utilities/ApiManage';

function ProductDetailPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const [product, setProduct] = useState({
    image: { image_url_list: [] },
    stock_info: [],
    price_info: [],
  });
  const [data, setData] = useState([]);
  const rand = () => Math.round(Math.random() * 5000000);
  const [listDate, setListDate] = useState([]);
  const [listDataFake, setListDataFake] = useState([]);
  const [listDataFake2, setListDataFake2] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const dataChart = {
    labels: listDate,
    datasets: [
      {
        type: 'line',
        label: 'Giá khuyến mại',
        borderColor: infoColor[0],
        borderWidth: 2,
        fill: false,
        data: listDataFake,
      },
      {
        type: 'line',
        label: 'Giá sau mã giảm giá',
        borderColor: '#ffe100',
        borderWidth: 2,
        fill: false,
        data: listDataFake2,
      },
      {
        type: 'bar',
        label: 'Doanh thu',
        backgroundColor: primaryColor[0],
        data: listDataFake,
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };
  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        setIsMobile(window.innerWidth < 1379);
      },
      false
    );

    data.map((item, index) => {
      if (item.item_id == id) setProduct(item);
    });
    var now = moment();
    var beginDate = moment().subtract(30, 'days');
    for (let i = 29; i > 0; i--) {
      let cdate = moment().subtract(i, 'days');
      var cdateNum = cdate.date();
      if (cdateNum < 10 && cdateNum > 1) {
        listDate.push('0' + cdateNum);
      } else {
        if (cdateNum == 1) {
          var cmonth = cdate.month() + 1;
          if (cmonth < 10) {
            listDate.push('0' + cdateNum + '/' + '0' + cmonth);
          } else {
            listDate.push('0' + cdateNum + '/' + cmonth);
          }
        } else {
          listDate.push(cdateNum);
        }
      }
    }
    listDate.push(now.date());
    for (let i = 0; i < 30; i++) {
      var fake = rand();
      var fake2 = rand();
      listDataFake.push(fake);
      listDataFake2.push(fake2);
    }
  }, [listDate]);

  const options = {
    legend: {
      display: false,
    },
  };

  useEffect(async () => {
    dispatch(setShowLoader(true));
    const res = await getProductDetail(id);
    setProduct(res.data);
    dispatch(setShowLoader(false));
  }, []);

  const CustomSwitch = withStyles({
    switchBase: {
      color: '#fff',
      '&$checked': {
        color: '#f96606',
      },
      '&$checked + $track': {
        backgroundColor: '#f3a36f',
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>{product.item_name}</h4>
        </CardHeader>
        <CardBody className={classes.bodyContainer}>
          <div className={classes.proContainer}>
            <FormControl className={dashClasses.formControl + ' ' + classes.proContent}>
              <img
                className={classes.proImg}
                src={
                  product?.detail?.image?.image_url_list
                    ? product?.detail?.image?.image_url_list[0]
                    : product?.detail?.images[0]
                }
              />
            </FormControl>
            <FormControl className={dashClasses.formControl + ' ' + classes.proContent}>
              <div className={classes.formProContent}>
                <p className={classes.proInfoTitle}>Giá bán</p>
                {product?.detail?.has_model ? (
                  <p className={classes.proInfoValue}>---</p>
                ) : (
                  <p className={classes.proInfoValue}>
                    {/* {product?.price_info[0]?.current_price} */}
                  </p>
                )}
              </div>
              <div className={classes.formProContent}>
                <p className={classes.proInfoTitle}>Tồn kho</p>
                <p className={classes.proInfoValue}>
                  {/* {product?.stock_info[0]?.current_stock} */}
                </p>
              </div>
            </FormControl>
            <FormControl className={dashClasses.formControl + ' ' + classes.proContent}>
              <div className={classes.formProContent}>
                <p className={classes.proInfoTitle}>Tên gian hàng</p>
                <img className={classes.shopImg} src={product?.shop_icon} />
                <p className={classes.proInfoValue}>{product?.shop_code}</p>
              </div>
              <div className={classes.formProContent}>
                <p className={classes.proInfoTitle}>Trạng thái</p>
                <CustomSwitch
                  checked={product.status}
                  // onChange={() => handleSwitch(item)}
                  name="checkedA"
                />
              </div>
            </FormControl>
            <FormControl className={dashClasses.formControl + ' ' + classes.proContent}>
              <div className={classes.formProContent}>
                <p className={classes.proInfoTitle}>Mã SKU</p>
                <p className={classes.proInfoValue}>{product?.item_sku}</p>
              </div>
            </FormControl>
            <FormControl className={dashClasses.formControl + ' ' + classes.proContent}>
              <div className={classes.formProContent}>
                <p className={classes.proInfoTitle}>Sản phẩm kho</p>
                {product?.isConnect ? (
                  <p className={classes.proInfoValue}>{product?.productName}</p>
                ) : (
                  <div className={classes.formProContent}>
                    <p className={classes.proInfoValue}>Chưa có liên kết</p>
                    <Link href={'/admin/product/' + product.id}>
                      <a className={classes.createConenct}>Tạo ngay</a>
                    </Link>
                  </div>
                )}
              </div>
            </FormControl>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <div className={classes.titleChartContainer}>
            <p className={classes.titleInfoChart}>Thống kê</p>
          </div>
          <FormControl
            className={dashClasses.formControl + ' ' + classes.chartContainer}
            style={{ width: isMobile ? '100%' : '70%' }}>
            <p className={classes.titleChart}>Xu hướng doanh thu 30 ngày qua</p>
            <Bar data={dataChart} options={options} style={{ marginLeft: '30px' }}></Bar>
          </FormControl>
          <FormControl
            className={dashClasses.formControl + ' ' + classes.basicContainer}
            style={{ width: isMobile ? '35%' : '25%' }}>
            <p className={classes.titleChart}>Thông tin cơ bản</p>
            <div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.tableCell}>
                      <div className={classes.basicInfoContainer}>
                        <Icon className={classes.basicInfoIcon}>local_atm</Icon>
                        <p className={classes.basicInfoTitle}>Doanh thu</p>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <p className={classes.basicInfoValue}>12000000</p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell}>
                      <div className={classes.basicInfoContainer}>
                        <Icon className={classes.basicInfoIcon}>money</Icon>
                        <p className={classes.basicInfoTitle}>SL sản phẩm</p>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <p className={classes.basicInfoValue}>12</p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell}>
                      <div className={classes.basicInfoContainer}>
                        <Icon className={classes.basicInfoIcon}>local_atm</Icon>
                        <p className={classes.basicInfoTitle}>Giá trung bình</p>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <p className={classes.basicInfoValue}>142000</p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell}>
                      <div className={classes.basicInfoContainer}>
                        <ConfirmationNumberOutlinedIcon
                          className={classes.basicInfoIcon}></ConfirmationNumberOutlinedIcon>
                        <p className={classes.basicInfoTitle}>Đơn có voucher</p>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <p className={classes.basicInfoValue}>0.0%</p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell}>
                      <div className={classes.basicInfoContainer}>
                        <Icon className={classes.basicInfoIcon}>speed</Icon>
                        <p className={classes.basicInfoTitle}>Tốc độ bán</p>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <p className={classes.basicInfoValue}>0.57 sản phẩm/ngày</p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell}>
                      <div className={classes.basicInfoContainer}>
                        <Icon className={classes.basicInfoIcon}>pause_presentation</Icon>
                        <p className={classes.basicInfoTitle}>Dự kiến hết hàng</p>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <p className={classes.basicInfoValue}>0 ngày</p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </FormControl>
        </CardBody>
      </Card>
    </div>
  );
}

const styles = {
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
  },
  proContent: {
    minWidth: '150px !important',
    padding: '0 50px',
  },
  formProContent: {
    display: 'flex',
    alignItems: 'center',
  },
  proImg: {
    width: '100px',
    height: '100px',
    padding: '10px',
    boxShadow: '0 1px 4px 0 rgb(0 0 0 / 14%)',
    borderRadius: '5px',
  },
  proInfoTitle: {
    fontSize: '.875rem',
    fontWeight: '500',
    marginRight: '20px',
    //color: primaryColor[0],
  },
  proInfoValue: {
    fontSize: '.875rem',
  },
  createConenct: {
    marginLeft: '10px',
    color: primaryColor[0],
    '&:hover,&:focus': {
      color: primaryColor[0],
    },
  },
  titleChartContainer: {
    borderBottom: '1px solid #D2D2D2',
  },
  titleInfoChart: {
    marginBottom: '0 !important',
    width: 'fit-content',
    borderBottom: '2px solid ' + primaryColor[0],
    padding: '7px 10px',
    cursor: 'pointer',
    marginLeft: '20px',
    '&:hover,&:focus': {
      color: primaryColor[0],
    },
  },
  titleChart: {
    fontSize: '20px',
    fontWeight: '500',
    marginLeft: '20px',
  },
  chartContainer: {
    minWidth: '275px !important',
  },
  basicContainer: {
    minWidth: '275px !important',
    marginLeft: '2%',
  },
  basicInfoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  basicInfoIcon: {
    marginRight: '10px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  basicInfoTitle: {
    marginRight: '50px',
  },
  basicInfoValue: {
    fontWeight: '500',
  },
  tableCell: {
    border: '0',
    padding: '0',
  },
  shopImg: {
    width: '17px',
    height: '17px',
    borderRadius: '4px',
    marginRight: '5px',
    marginBottom: '3px',
  },
};

ProductDetailPage.layout = Admin;

export default WithAuthentication(ProductDetailPage);
