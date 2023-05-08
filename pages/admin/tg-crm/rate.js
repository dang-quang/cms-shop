import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Collapse from '@material-ui/core/Collapse';
import Link from 'next/link';
// @material-ui/core components
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { primaryColor, whiteColor, blackColor, hexToRgb } from 'assets/jss/natcash.js';
import { formatCurrency, formatNumber } from '../../../utilities/utils';
// layout for this page
import Admin from 'layouts/Admin.js';
// core components
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Search from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Switch from '@material-ui/core/Switch';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import adminStyles from 'assets/jss/natcash/components/headerLinksStyle.js';
import tableStyles from 'assets/jss/natcash/components/tableStyle.js';
import taskStyles from 'assets/jss/natcash/components/tasksStyle.js';
import { Icon } from '@material-ui/core';
import dashStyles from 'assets/jss/natcash/views/dashboardStyle.js';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import vi from 'date-fns/locale/vi';
import Poppers from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import classNames from 'classnames';
import CardInfo from 'components/CardInfo/CardInfo.js';
import useWindowSize from 'components/Hooks/useWindowSize.js';
import { CheckBoxOutlined, LocalShippingOutlined } from '@material-ui/icons';

import defaultImage from 'assets/img/customer-ava.png';
// connect api
import { getRateScreen, getCommentList, replyComment } from '../../../utilities/ApiManage';
import { setShowLoader } from '../../../redux/actions/app';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { NotificationContainer, NotificationManager } from 'react-light-notifications';

import styles from 'assets/jss/natcash/views/menu/shopReviewStyle.js';

function ShopReviewPage() {
  const dispatch = useDispatch();
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useAdminStyles = makeStyles(adminStyles);
  const useTableStyles = makeStyles(tableStyles);
  const adminClasses = useAdminStyles();
  const tableClasses = useTableStyles();
  const useTaskStyles = makeStyles(taskStyles);
  const taskClasses = useTaskStyles();
  const useDashStyles = makeStyles(dashStyles);
  const dashClasses = useDashStyles();
  const [isMobile, setIsMobile] = useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [replyDetail, setReplyDetail] = useState('');
  const [shopRating, setShopRating] = useState('');
  const [activeItem, setActiveItem] = useState(1);
  const [autoReply, setAutoReply] = useState('');
  const [listProduct, setListProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedShop, setSelectedShop] = useState('');
  const [replyAll, setReplyAll] = useState('');
  const [noReply, setNoReply] = useState(0);
  const [isMore, setIsMore] = useState(false);
  const [nextCursor, setNextCursor] = useState(0);
  // const [filterValues, setFilterValues] = React.useState({
  //   selectShop: "",
  //   filter: "",
  //   time: "",
  //   rating: "",
  //   selectProduct: "",
  //   shopReply: "",
  //   comment: "",
  // });
  const [switchValue, setSwitchValue] = useState({
    rating1: true,
    rating2: true,
    rating3: true,
    rating4: true,
    rating5: true,
  });
  const [modalItem, setModalItem] = useState({
    id: '',
    customerName: '',
    customerAvatar: '',
    productName: '',
    ratings: 0,
    comment: '',
    commentTime: '',
    reply: '',
    replyTime: '',
    isReply: false,
  });

  const TABLE_HEAD = [
    {
      id: 'en',
      value: ['Customer', "Product's name", 'Customer ratings', 'Reply comment', 'Action'],
    },
    {
      id: 'vi',
      value: ['Người mua', 'Tên sản phẩm', 'Khách hàng đánh giá', 'Trả lời đánh giá', 'Thao tác'],
    },
  ];
  const [data, setData] = useState([]);
  const [replyData, setReplyData] = useState([
    {
      shopCode: 'STT',
      rating: [
        {
          id: 1,
          active: true,
          value: [
            'Shoptretho cảm ơn quý khách đã tin tưởng ủng hộ sản phẩm ạ!',
            'Shop xin chân thành cảm ơn bạn đã tin tưởng và ủng hộ Shop, Shop rất vui khi sản phẩm nhận được sự hài lòng từ bạn. Shop hi vọng được phục vụ bạn trong những đơn hàng tiếp theo.',
          ],
        },
        {
          id: 2,
          active: false,
          value: ['Shoptretho cảm ơn quý khách đã tin tưởng ủng hộ sản phẩm ạ!'],
        },
        {
          id: 3,
          active: true,
          value: [
            'Shop xin chân thành cảm ơn bạn đã tin tưởng và ủng hộ Shop, Shop rất vui khi sản phẩm nhận được sự hài lòng từ bạn. Shop hi vọng được phục vụ bạn trong những đơn hàng tiếp theo.',
          ],
        },
        {
          id: 4,
          active: false,
          value: [],
        },
        {
          id: 5,
          active: false,
          value: [],
        },
      ],
    },
    {
      shopCode: 'KNIC',
      rating: [
        {
          id: 1,
          active: true,
          value: [
            'Shoptretho cảm ơn quý khách đã tin tưởng ủng hộ sản phẩm ạ!',
            'Shop xin chân thành cảm ơn bạn đã tin tưởng và ủng hộ Shop, Shop rất vui khi sản phẩm nhận được sự hài lòng từ bạn. Shop hi vọng được phục vụ bạn trong những đơn hàng tiếp theo.',
          ],
        },
        {
          id: 2,
          active: false,
          value: ['Shoptretho cảm ơn quý khách đã tin tưởng ủng hộ sản phẩm ạ!'],
        },
        {
          id: 3,
          active: true,
          value: [
            'Shop xin chân thành cảm ơn bạn đã tin tưởng và ủng hộ Shop, Shop rất vui khi sản phẩm nhận được sự hài lòng từ bạn. Shop hi vọng được phục vụ bạn trong những đơn hàng tiếp theo.',
          ],
        },
        {
          id: 4,
          active: false,
          value: [],
        },
        {
          id: 5,
          active: false,
          value: [],
        },
      ],
    },
  ]);

  const [replyDataSelected, setReplyDataSelected] = useState({});

  const options = [
    {
      id: 'en',
      title: 'options',
      value: ['Decentralization', 'Edit', 'Delete'],
    },
    { id: 'vi', title: 'tùy chọn', value: ['Phân quyền', 'Sửa', 'Xóa'] },
  ];
  const Filter = [
    {
      id: 'en',
      value: {
        title: 'Change shopId',
        value: ['Stock', 'Created date', 'Stock level', 'Channel SKU mapping'],
        button: ['Reset', 'Confirm'],
      },
    },
    {
      id: 'vi',
      value: {
        title: 'Đổi mã gian hàng',
        value: ['Tồn kho', 'Ngày tạo', 'Tồn kho', 'Trạng thái liên kết sản phẩm đăng bán'],
        button: ['Đặt lại', 'Xác nhận'],
      },
    },
  ];
  const FORM = [
    {
      id: 'en',
      value: {
        title: ['Item Infomation', 'Additional Information', 'Images'],
        value: [
          'Select Shop',
          'Filter',
          'Time',
          'Rating',
          'Select product',
          'Shop reply',
          'Enter the comment to send',
        ],
        button: ['Reply comment', 'Reply'],
      },
    },
    {
      id: 'vi',
      value: {
        title: ['Thông tin cơ bản', 'Thông tin thêm', 'Hình ảnh'],
        value: [
          'Chọn Shop',
          'Lọc',
          'Thời gian',
          'Đánh giá',
          'Chọn sản phẩm',
          'Shop trả lời',
          'Nhập bình luận cần gửi',
        ],
        button: ['Trả lời đánh giá', 'Trả lời'],
      },
    },
  ];
  const TABLE_SEARCH_HEAD = [
    {
      id: 'en',
      value: ['Product information', 'Stock', 'Price', 'Action'],
    },
    {
      id: 'vi',
      value: ['Thông tin sản phẩm', 'Tồn kho', 'Giá bán', 'Thao tác'],
    },
  ];
  const language = useSelector((state) => state.app.language);
  const [text, setText] = useState({
    id: 'en',
    title: 'Shop Review',
    tableHead: TABLE_HEAD[0].value,
    optionsTitle: options[0].title,
    options: options[0].value,
    fillter: Filter[0].value,
    form: FORM[0].value,
    tableSearchHead: TABLE_SEARCH_HEAD[0].value,
    tab: ['Respond to multiple ratings'],
    cusQuantity: ['Send to', 'Customer'],
    txtReply: 'Reply Comment',
    txtSuccess: 'Success',
    txtFail: 'Fail',
  });
  const listText = [
    {
      id: 'en',
      title: 'Shop Review',
      tableHead: TABLE_HEAD[0].value,
      optionsTitle: options[0].title,
      options: options[0].value,
      fillter: Filter[0].value,
      form: FORM[0].value,
      tableSearchHead: TABLE_SEARCH_HEAD[0].value,
      tab: ['Respond to multiple ratings'],
      cusQuantity: ['Send to', 'Customer'],
      txtReply: 'Reply Comment',
      txtSuccess: 'Success',
      txtFail: 'Fail',
    },
    {
      id: 'vi',
      title: 'Đánh giá cửa hàng',
      tableHead: TABLE_HEAD[1].value,
      optionsTitle: options[1].title,
      options: options[1].value,
      fillter: Filter[1].value,
      form: FORM[1].value,
      tableSearchHead: TABLE_SEARCH_HEAD[1].value,
      tab: ['Phản hồi nhiều đánh giá'],
      cusQuantity: ['Gửi tới', 'Khách hàng'],
      txtReply: 'Phản hồi đánh giá',
      txtSuccess: 'Thành công',
      txtFail: 'Thất bại',
    },
  ];

  useEffect(() => {
    for (let i = 0; i < listText.length; i++) {
      if (language == listText[i].id) {
        setText(listText[i]);
        break;
      }
    }
  }, [language]);
  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        setIsMobile(window.innerWidth < 1200);
      },
      false
    );
  }, []);

  const [shopList, setShopList] = useState([]);

  useEffect(async () => {
    dispatch(setShowLoader(true));
    var res = await getRateScreen();
    if (res.code == 200) {
      setShopList(res.data.list_shop);
      setData(res.data.list_comment);
      // setShopRating(res.data.list_shop[0].code);
      setListProduct(res.data.list_product);
      setNoReply(res.data.no_reply);
      setSelectedShop(res.data.list_shop[0].shopId);
      setIsMore(res.data.data_page.more);
      setNextCursor(res.data.data_page.next_cursor);
    }
    dispatch(setShowLoader(false));
  }, []);

  useEffect(async () => {
    if (selectedShop) {
      dispatch(setShowLoader(true));
      getData();
    }
  }, [selectedShop, selectedProduct]);

  const getData = async () => {
    var params = {
      shop_id: selectedShop,
    };
    if (selectedProduct) {
      params.item_id = selectedProduct.item_id;
    }
    var res = await getCommentList(params);
    if (res.code == 200) {
      setData(res.data.list_comment);
      setNoReply(res.data.no_reply);
      setListProduct(res.data.list_product);
      setIsMore(res.data.data_page.more);
      setNextCursor(res.data.data_page.next_cursor);
    }
    dispatch(setShowLoader(false));
  };

  const handleScroll = async (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && isMore) {
      dispatch(setShowLoader(true));
      var params = {
        shop_id: selectedShop,
        cursor: nextCursor,
      };
      if (selectedProduct) {
        params.item_id = selectedProduct.item_id;
      }
      var res = await getCommentList(params);
      if (res.code == 200) {
        setData([...data, ...res.data.list_comment]);
        setNoReply(noReply + res.data.no_reply);
        setListProduct(res.data.list_product);
        setIsMore(res.data.data_page.more);
        setNextCursor(res.data.data_page.next_cursor);
      }
      dispatch(setShowLoader(false));
    }
  };

  // useEffect(() => {
  //   for (let i = 0; i < replyData.length; i++) {
  //     if (shopRating == replyData[i].shopCode) {
  //       setReplyDataSelected(replyData[i]);
  //     }
  //   }
  // }, [shopRating]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}>
        {value === index && <Typography>{children}</Typography>}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleReplyCmt = async () => {
    dispatch(setShowLoader(true));
    var listId = [];
    data.forEach((cmt) => {
      if (!cmt.comment_reply) {
        listId.push(cmt.comment_id);
      }
    });
    var params = {
      shop_id: selectedShop,
      list_comment_id: listId,
      comment: replyAll,
    };
    const res = await replyComment(params);
    if (res.code == 200) {
      NotificationManager.success({
        title: text.txtReply,
        message: text.txtSuccess,
      });
      getData();
    } else {
      NotificationManager.error({
        title: text.txtReply,
        message: text.txtFail,
      });
      dispatch(setShowLoader(false));
    }
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleChangeShop = (prop) => (event) => {
    setSelectedShop(event.target.value);
  };

  const handleChangeReplyDetail = (event) => {
    setReplyDetail(event.target.value);
  };

  const AntTabs = withStyles({
    root: {
      borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
      backgroundColor: '#1890ff',
    },
  })(Tabs);

  const AntTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      fontSize: 16,
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        color: '#40a9ff',
        opacity: 1,
      },
      '&$selected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: '#40a9ff',
      },
    },
    selected: {},
  }))((props) => <Tab disableRipple {...props} />);

  const handelOpenModal = (item) => {
    setShowFilter(true);
    setReplyDetail('');
    setModalItem(item);
  };
  const handleReplyCTM = async () => {
    setShowFilter(false);
    dispatch(setShowLoader(true));
    var params = {
      shop_id: selectedShop,
      comment_id: modalItem.comment_id,
      comment: replyDetail,
    };
    const res = await replyComment(params);
    if (res.code == 200) {
      NotificationManager.success({
        title: text.txtReply,
        message: text.txtSuccess,
      });
      let cloneData = [...data];
      for (var i = 0; i < data.length; i++) {
        if (data[i].comment_id == modalItem.comment_id) {
          cloneData[i]['comment_reply'] = {
            hidden: 'false',
            reply: replyDetail,
          };
        }
      }
      setData(cloneData);
      setNoReply(noReply - 1);
    } else {
      NotificationManager.error({
        title: text.txtReply,
        message: text.txtFail,
      });
    }
    dispatch(setShowLoader(false));
  };

  const handleChangeSwitch = (event) => {
    setSwitchValue({
      ...switchValue,
      [event.target.name]: event.target.checked,
    });
  };

  const customerInfo = (item) => {
    return (
      <div className={classes.proContainer}>
        <img
          className={classes.proImg}
          src={item?.customer_avatar ? item.customer_avatar : defaultImage}
        />
        <div className={classes.proInfoContainer}>
          <p className={tableClasses.tableCell + ' ' + classes.txtProductName2}>
            {item?.buyer_username}
          </p>
        </div>
      </div>
    );
  };

  const customerRatings = (item) => {
    return (
      <div className={classes.proFlexColumn}>
        <div className={classes.starRating}>
          {item.rating_star == 1 && (
            <>
              <Icon className={classes.icon}>star</Icon>
              <Icon className={classes.icon + ' ' + classes.starIcon}>star</Icon>
              <Icon className={classes.icon + ' ' + classes.starIcon}>star</Icon>
              <Icon className={classes.icon + ' ' + classes.starIcon}>star</Icon>
              <Icon className={classes.icon + ' ' + classes.starIcon}>star</Icon>
            </>
          )}
          {item.rating_star == 2 && (
            <>
              <Icon className={classes.icon}>star</Icon>
              <Icon className={classes.icon}>star</Icon>
              <Icon className={classes.icon + ' ' + classes.starIcon}>star</Icon>
              <Icon className={classes.icon + ' ' + classes.starIcon}>star</Icon>
              <Icon className={classes.icon + ' ' + classes.starIcon}>star</Icon>
            </>
          )}
          {item.rating_star == 3 && (
            <>
              <Icon className={classes.icon}>star</Icon>
              <Icon className={classes.icon}>star</Icon>
              <Icon className={classes.icon}>star</Icon>
              <Icon className={classes.icon + ' ' + classes.starIcon}>star</Icon>
              <Icon className={classes.icon + ' ' + classes.starIcon}>star</Icon>
            </>
          )}
          {item.rating_star == 4 && (
            <>
              <Icon className={classes.icon}>star</Icon>
              <Icon className={classes.icon}>star</Icon>
              <Icon className={classes.icon}>star</Icon>
              <Icon className={classes.icon}>star</Icon>
              <Icon className={classes.icon + ' ' + classes.starIcon}>star</Icon>
            </>
          )}
          {item.rating_star == 5 && (
            <>
              <Icon className={classes.icon}>star</Icon>
              <Icon className={classes.icon}>star</Icon>
              <Icon className={classes.icon}>star</Icon>
              <Icon className={classes.icon}>star</Icon>
              <Icon className={classes.icon}>star</Icon>
            </>
          )}
        </div>
        <div className={classes.proInfoContainer}>
          <p className={tableClasses.tableCell + ' ' + classes.txtProductName2}>{item?.comment}</p>
        </div>
      </div>
    );
  };

  const renderTable = (item, index) => {
    return (
      <React.Fragment>
        {!item?.types && (
          <TableRow key={index} className={tableClasses.tableBodyRow}>
            <TableCell className={tableClasses.tableCell} key={'productInfo'}>
              {customerInfo(item)}
            </TableCell>
            <TableCell className={tableClasses.tableCell}>{item.item_name}</TableCell>
            <TableCell className={tableClasses.tableCell}>{customerRatings(item)}</TableCell>
            <TableCell className={tableClasses.tableCell}>{item?.comment_reply?.reply}</TableCell>
            <TableCell className={tableClasses.tableCell}>
              <Button
                className={classes.btnRep}
                onClick={() => handelOpenModal(item)}
                color="primary"
                disabled={item.comment_reply ? true : false}>
                {text.form.button[1]}
              </Button>
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    );
  };

  const renderModal = () => {
    return (
      <FormControl className={dashClasses.formControl}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={showFilter}
          onClose={() => setShowFilter(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={showFilter}>
            <Card className={classes.modalContainer}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Trả lời đánh giá</h4>
              </CardHeader>
              <CardBody>
                <div className={classes.filterEleContent} style={{ paddingBottom: '20px' }}>
                  <div className={classes.proContainer}>
                    <img
                      className={classes.proImg}
                      src={modalItem.customer_avatar ? modalItem.customer_avatar : defaultImage}
                    />
                    <div className={classes.proInfoContainer}>
                      <p className={tableClasses.tableCell + ' ' + classes.txtProductName2}>
                        {modalItem.buyer_username}
                      </p>
                      <p className={tableClasses.tableCell + ' ' + classes.txtProductName2}>
                        {moment.unix(modalItem.create_time).format('DD/MM/YYYY HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={classes.proContainer + ' ' + classes.marginBottom_10}>
                  <p className={tableClasses.tableCell + ' ' + classes.txtProductName2}>
                    {modalItem.comment}
                  </p>
                </div>
                <div className={classes.proContainer}>
                  <TextField
                    id="input2"
                    label={text.form.value[6]}
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={replyDetail}
                    onChange={handleChangeReplyDetail}
                    autoComplete="off"
                    multiline
                    rows={6}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className={classes.filterFooter}>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleReplyCTM();
                    }}
                    disabled={replyDetail.length > 0 ? false : true}>
                    {text.fillter.button[1]}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Fade>
        </Modal>
      </FormControl>
    );
  };

  return (
    <Card>
      <NotificationContainer />
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{text.title}</h4>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        <div>
          <div className={classes.demo1}>
            <AntTabs value={value} onChange={handleChange} aria-label="ant example">
              <AntTab label={text.tab[0]} {...a11yProps(0)} />
              {/* <AntTab label="Thiết lập tự động phản hồi" {...a11yProps(1)} /> */}
            </AntTabs>
          </div>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}>
            {/* <TabPanel
              value={value}
              index={0}
              dir={theme.direction}
              className={classes.tabPanel}
            > */}
            <div className={classes.tabPanel}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <div className={classes.girdLeft}>
                    <p className={classes.noteTxt}>
                      {text.cusQuantity[0]}: <span>{noReply}</span> {text.cusQuantity[1]}
                    </p>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl + ' ' + classes.marginBottom_10}
                      size="small">
                      <InputLabel id="select-outlined-label-1">{text.form.value[0]}</InputLabel>
                      <Select
                        labelId="select-outlined-label-1"
                        id="select-outlined"
                        value={selectedShop}
                        onChange={handleChangeShop()}
                        label={text.form.value[0]}>
                        {shopList.map((item, index) => {
                          return <MenuItem value={item.shopId}>{item.name}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                    {/* <FormControl
                      variant="outlined"
                      className={
                        classes.formControl + " " + classes.marginBottom_10
                      }
                      size="small"
                    >
                      <InputLabel id="select-outlined-label-1">
                        {text.form.value[1]}
                      </InputLabel>
                      <Select
                        labelId="select-outlined-label-1"
                        id="select-outlined"
                        value={filterValues.filter}
                        onChange={handleChangeValue("filter")}
                        label={text.form.value[1]}
                      >
                        <MenuItem value="">
                          <em>Toàn bộ</em>
                        </MenuItem>
                        <MenuItem value={20}>Đã comment</MenuItem>
                        <MenuItem value={30}>Chưa comment</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={
                        classes.formControl + " " + classes.marginBottom_10
                      }
                      size="small"
                    >
                      <InputLabel id="select-outlined-label-1">
                        {text.form.value[2]}
                      </InputLabel>
                      <Select
                        labelId="select-outlined-label-1"
                        id="select-outlined"
                        value={filterValues.time}
                        onChange={handleChangeValue("time")}
                        label={text.form.value[2]}
                      >
                        <MenuItem value="">
                          <em>Toàn bộ</em>
                        </MenuItem>
                        <MenuItem value={10}>1 tuần gần đây</MenuItem>
                        <MenuItem value={20}>1 tháng gần đây</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={
                        classes.formControl + " " + classes.marginBottom_10
                      }
                      size="small"
                    >
                      <InputLabel id="select-outlined-label-1">
                        {text.form.value[3]}
                      </InputLabel>
                      <Select
                        labelId="select-outlined-label-1"
                        id="select-outlined"
                        value={filterValues.rating}
                        onChange={handleChangeValue("rating")}
                        label={text.form.value[3]}
                      >
                        <MenuItem value="">
                          <em>Tất cả</em>
                        </MenuItem>
                        <MenuItem value={1}>1 sao</MenuItem>
                        <MenuItem value={2}>2 sao</MenuItem>
                        <MenuItem value={3}>3 sao</MenuItem>
                        <MenuItem value={4}>4 sao</MenuItem>
                        <MenuItem value={5}>5 sao</MenuItem>
                      </Select>
                    </FormControl> */}
                    <FormControl
                      variant="outlined"
                      className={classes.formControl + ' ' + classes.marginBottom_10}
                      size="small">
                      <Autocomplete
                        size="small"
                        value={selectedProduct}
                        onChange={(event, newValue) => setSelectedProduct(newValue)}
                        options={listProduct}
                        getOptionLabel={(option) => option.item_name}
                        renderInput={(params) => (
                          <TextField {...params} label={text.form.value[4]} variant="outlined" />
                        )}
                      />
                    </FormControl>
                    {/* <FormControl
                      variant="outlined"
                      className={
                        classes.formControl + " " + classes.marginBottom_10
                      }
                      size="small"
                    >
                      <InputLabel id="select-outlined-label-1">
                        {text.form.value[5]}
                      </InputLabel>
                      <Select
                        labelId="select-outlined-label-1"
                        id="select-outlined"
                        value={filterValues.shopReply}
                        onChange={handleChangeValue("shopReply")}
                        label={text.form.value[5]}
                      >
                        <MenuItem value="">
                          <em>Toàn bộ</em>
                        </MenuItem>
                        <MenuItem value={10}>Đã trả lời</MenuItem>
                        <MenuItem value={20}>Chưa trả lời</MenuItem>
                      </Select>
                    </FormControl> */}
                    <TextField
                      // error={validateItemName ? false : true}
                      id="input1"
                      label={text.form.value[6]}
                      variant="outlined"
                      size="small"
                      fullWidth
                      inputProps={{
                        value: replyAll,
                        onChange: (e) => setReplyAll(e.target.value),
                      }}
                      className={classes.marginBottom_10}
                      autoComplete="off"
                      multiline
                      rows={6}
                      // helperText={validateItemName ? "" : "Incorrect entry"}
                    />
                    <Button
                      className={classes.btnFullSize}
                      onClick={() => handleReplyCmt()}
                      color="primary"
                      disabled={noReply == 0 ? true : false}>
                      {text.form.button[0]}
                    </Button>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <div
                    className={tableClasses.tableResponsive}
                    style={{ marginTop: '0', height: '750px' }}
                    onScroll={(e) => handleScroll(e)}>
                    <Table className={tableClasses.table}>
                      {data !== undefined ? (
                        <TableHead className={tableClasses['primary' + 'TableHeader']}>
                          <TableRow className={tableClasses.tableHeadRow}>
                            {text.tableHead.map((prop, key) => {
                              return (
                                <TableCell
                                  className={
                                    tableClasses.tableCell + ' ' + tableClasses.tableHeadCell
                                  }
                                  key={key}
                                  style={{
                                    textAlign: `${key == 2 ? 'center' : null}`,
                                  }}>
                                  {prop}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </TableHead>
                      ) : null}
                      <TableBody>
                        {data.map((item, index) => {
                          return renderTable(item, index);
                        })}
                      </TableBody>
                    </Table>
                    {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={2}
          page={1}
          // onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
                  </div>
                </GridItem>
              </GridContainer>
            </div>
            {/* </TabPanel> */}
            {/* <TabPanel
              value={value}
              index={1}
              dir={theme.direction}
              className={classes.tabPanel}
            >
              <div style={{ marginTop: "16px" }}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl
                      variant="outlined"
                      className={
                        classes.formControl + " " + classes.marginBottom_10
                      }
                      size="small"
                    >
                      <InputLabel id="select-outlined-label-1">
                        {text.form.value[0]}
                      </InputLabel>
                      <Select
                        labelId="select-outlined-label-1"
                        id="select-outlined"
                        value={shopRating}
                        onChange={handleChangeShopRating}
                        label={text.form.value[0]}
                      >
                        {shopList.map((item, index) => {
                          return (
                            <MenuItem value={item.code}>{item.name}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <ul className={classes.ratingList}>
                      <li className={classes.ratingItem}>
                        <p
                          className={classes.ratingTitle}
                          style={{ color: activeItem == 1 ? "#f50057" : null }}
                          onClick={() => setActiveItem(1)}
                        >
                          Khách đánh giá 1 sao
                        </p>
                        <Switch
                          checked={switchValue.rating1}
                          onChange={handleChangeSwitch}
                          name="rating1"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                        />
                      </li>
                      <li className={classes.ratingItem}>
                        <p
                          className={classes.ratingTitle}
                          style={{ color: activeItem == 2 ? "#f50057" : null }}
                          onClick={() => setActiveItem(2)}
                        >
                          Khách đánh giá 2 sao
                        </p>

                        <Switch
                          checked={switchValue.rating2}
                          onChange={handleChangeSwitch}
                          name="rating2"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                        />
                      </li>
                      <li className={classes.ratingItem}>
                        <p
                          className={classes.ratingTitle}
                          style={{ color: activeItem == 3 ? "#f50057" : null }}
                          onClick={() => setActiveItem(3)}
                        >
                          Khách đánh giá 3 sao
                        </p>

                        <Switch
                          checked={switchValue.rating3}
                          onChange={handleChangeSwitch}
                          name="rating3"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                        />
                      </li>
                      <li className={classes.ratingItem}>
                        <p
                          className={classes.ratingTitle}
                          style={{ color: activeItem == 4 ? "#f50057" : null }}
                          onClick={() => setActiveItem(4)}
                        >
                          Khách đánh giá 4 sao
                        </p>

                        <Switch
                          checked={switchValue.rating4}
                          onChange={handleChangeSwitch}
                          name="rating4"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                        />
                      </li>
                      <li className={classes.ratingItem}>
                        <p
                          className={classes.ratingTitle}
                          style={{ color: activeItem == 5 ? "#f50057" : null }}
                          onClick={() => setActiveItem(5)}
                        >
                          Khách đánh giá 5 sao
                        </p>

                        <Switch
                          checked={switchValue.rating5}
                          onChange={handleChangeSwitch}
                          name="rating5"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                        />
                      </li>
                    </ul>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5}>
                    <TextField
                      id="input3"
                      label={text.form.value[6]}
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={autoReply}
                      onChange={handleChangeAutoReply}
                      autoComplete="off"
                      multiline
                      rows={6}
                      className={classes.marginBottom_10}
                    />
                    <Button
                      className={classes.btnFullSize}
                      onClick={() => handleReplyCmt()}
                      color="primary"
                    >
                      {text.form.button[0]}
                    </Button>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    3
                  </GridItem>
                </GridContainer>
              </div>
            </TabPanel> */}
          </SwipeableViews>
          <div style={{ height: 0 }}>{renderModal()}</div>
        </div>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

ShopReviewPage.layout = Admin;

export default WithAuthentication(ShopReviewPage);
