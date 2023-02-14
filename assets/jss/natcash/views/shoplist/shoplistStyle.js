import {
  primaryColor,
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from "assets/jss/natcash.js";

const shoplistStyle = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  txtOrderCode: {
    display: "block",
    fontSize: "15px !important",
    fontWeight: "400 !important",
    padding: "0 !important",
    margin: "0 !important",
    marginBottom: "4px !important",
    color: "rgba(0, 0, 0, 0.87)",
    "&:hover,&:focus": {
      color: primaryColor[0],
    },
  },
  txtOrderInfo: {
    fontSize: "15px !important",
    padding: "0 !important",
    margin: "0 !important",
    marginBottom: "4px !important",
  },
  cardBody: {
    alignItems: "center",
  },
  searchContainer: {
    margin: "0 !important",
  },
  tableTransition: {
    transition: "height .5s",
  },
  proContainer: {
    display: "flex",
  },
  proInfoContainer: {
    float: "right",
  },
  proImg: {
    width: "65px",
    height: "65px",
    padding: "2px",
    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
    borderRadius: "4px",
  },
  popperNav: {
    zIndex: "1",
    top: "auto !important",
    left: "auto !important",
  },
  dropdownItem: {
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    WebkitTransition: "all 150ms linear",
    MozTransition: "all 150ms linear",
    OTransition: "all 150ms linear",
    MsTransition: "all 150ms linear",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    lineHeight: "1.42857143",
    color: "#333",
    whiteSpace: "nowrap",
    height: "unset",
    minHeight: "unset",
    "&:hover": {
      backgroundColor: primaryColor[0],
      color: "#fff",
    },
    "& a": {
      color: "#333",
    },
    "&:hover a": {
      color: "#fff",
    },
  },
  tableImage: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  tableHeadCell: {
    "&:lastChild": {
      textAlign: "right",
    },
  },
  shopInfo: {
    display: "flex",
  },
  shopInfoTxt: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "15px",
    flex: 1,
  },
  text: {
    margin: "0",
  },
  btnText: {
    cursor: "pointer",
    "&:hover,&:focus": {
      color: primaryColor[0],
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    paddingTop: "80px",
  },
  modalContainer: {
    width: "40% !important",
    minWidth: "300px !important",
  },
  filterFooter: {
    justifyContent: "flex-end",
    display: "flex",
    width: "100%",
  },
  filterEleContent: {
    display: "flex",
  },
  inputText: {
    border: "none",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    "&:focus": {
      color: primaryColor[0],
    },
    "&:hover": {
      color: primaryColor[0],
    },
  },
  inputShopName: {
    fontSize: "15px",
    marginBottom: "5px",
  },
};
export default shoplistStyle;
