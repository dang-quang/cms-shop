import {
  primaryColor,
  whiteColor,
  blackColor,
  hexToRgb,
  successColor,
  infoColor,
  orangeColor,
  grayColor,
  warningColor,
} from "assets/jss/natcash.js";

const purchaseOrderStyle = {
  cardBody: {
    alignItems: "center",
  },
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
  shopFilterContainer: {
    marginBottom: "60px",
  },
  cardListItemContainer: {
    marginTop: "30px",
  },
  tabHeaderContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnFilter: {
    marginRight: "5px",
    fontSize: "20px",
  },
  tabPanel: {
    "& > div": {
      padding: "0",
    },
  },
  tableImage: {
    width: "60px",
    height: "60px",
  },
  tableIcon: {
    width: "15px",
    height: "15px",
    marginRight: "5px",
  },
  cellInfo: {
    display: "flex",
    alignItems: "center",
  },
  infoTextContainer: {
    marginLeft: "10px",
  },
  text: {
    margin: 0,
  },
  infoTextPrimary: {
    fontSize: "16px",
    fontWeight: 400,
  },
  infoTextSecondary: {
    color: grayColor[0],
  },
  cursorHover: {
    cursor: "pointer",
    "&:hover": {
      color: infoColor[0],
    },
  },
  infoTextStatus: {
    border: "1px solid",
    borderRadius: "4px",
    width: "fit-content",
    padding: "0 4px",
    fontWeight: 400,
  },
  popperNav: {
    position: "absolute",
    zIndex: "99",
    top: 0,
    right: "0 !important",
    marginTop: "55px",
  },
  flex_center: {
    display: "flex",
    alignItems: "center",
  },
  marginBottom_20: {
    marginBottom: "20px",
  },
  formControl: {
    width: "100%",
  },
  btnFilter: {
    marginLeft: "5px",
    fontSize: "20px",
  },
  flex_center: {
    display: "flex",
    alignItems: "center",
  },
  filterEleContent: {
    paddingBottom: 5,
  },
  titleFilter: {
    color: primaryColor[0],
    textTransform: "uppercase",
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
  popperNav2: {
    zIndex: "1",
    top: "auto !important",
    right: "0 !important",
    left: "auto !important",
  },
  dropdownItem2: {
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
  proInfoContainer: {
    position: "relative",
  },
};
export default purchaseOrderStyle;
