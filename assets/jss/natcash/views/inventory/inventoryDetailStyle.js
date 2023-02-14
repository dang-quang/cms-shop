import {
  primaryColor,
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from "assets/jss/natcash.js";

const inventoryDetailStyle = {
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
  codeIcon: {
    fontSize: "16px",
    marginRight: "5px",
    color: "#808080",
  },
  productInfo: {
    display: "flex",
    alignItems: "start",
    // borderBottom: "0.3px solid #808080",
    paddingBottom: "10px",
  },
  productInfoImg: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
    borderRadius: "4px",
    padding: "2px",
  },
  searchCard:{
    overflowY: "auto"
  },
  primaryText: {
    margin: 0,
  },
  productInfoText: {
    marginLeft: "15px",
  },
  productName: {
    fontWeight: "500",
    color: "#808080",
  },
  listTextWithIcon: {
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
  },
  textWithIcon: {
    display: "flex",
    alignItems: "center",
    marginRight: "20px",
  },
  icon: {
    fontSize: "16px",
    marginRight: "5px",
    color: "#808080",
  },
  cardText: {
    textAlign: "center",
    margin: "5px 0",
  },
  textContent: {
    fontSize: "18px !important",
  },
  codeIcon: {
    fontSize: "16px",
    margin: "0 5px",
    color: "#0168fa",
  },

  txtProductName: {
    display: "block",
    fontSize: "15px !important",
    padding: "0 !important",
    margin: "0 !important",
    marginBottom: "4px !important",
    color: "rgba(0, 0, 0, 0.87)",
    cursor: "pointer",
    "&:hover,&:focus": {
      color: primaryColor[0],
    },
  },
  txtProductName2: {
    display: "block",
    fontSize: "15px !important",
    padding: "0 !important",
    margin: "0 !important",
    marginBottom: "4px !important",
    color: "rgba(0, 0, 0, 0.87)",
  },
  img: {
    width: "60px",
    height: "60px",
    position: "absolute",
    borderRadius: "10px",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "auto",
  },
  cardBody: {
    alignItems: "center",
  },
  btnFilter: {
    marginLeft: "5px",
    fontSize: "20px",
  },
  proContainer: {
    display: "flex",
  },
  proInfoContainer: {
    marginLeft: "10px",
  },
  proImg: {
    width: "65px",
    height: "65px",
    padding: "2px",
    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
    borderRadius: "4px",
  },
  shopInfoContainer: {
    display: "flex",
    marginRight: "20px",
  },
  txtshopListing: {
    padding: "0 !important",
    margin: "0 !important",
    color: "#808080 !important",
  },

  popperNav: {
    marginTop: "55px",
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
  },
  selFilterTitleContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: "40px",
    marginTop: "15px",
  },
  filteTritle: {
    marginRight: "10px !important",
  },
  txtLink: {
    color: "#0168fa !important",
  },
  btnAction: {
    float: "right",
  },
  shopImage: {
    width: "15px",
    height: "15px",
    borderRadius: "4px",
    marginRight: "5px",
  },
  textRight: {
    textAlign: "right",
  },
  btnLink: {
    color: "red",
    "&:hover, &:focus": {
      color: "red",
    },
  },
  btnLinked: {
    color: "green",
    "&:hover, &:focus": {
      color: "green",
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
    width: "70% !important",
    minWidth: "300px !important",
    maxHeight: "800px !important",
  },
  filterFooter: {
    justifyContent: "flex-end",
    display: "flex",
    width: "100%",
  },
};
export default inventoryDetailStyle;
