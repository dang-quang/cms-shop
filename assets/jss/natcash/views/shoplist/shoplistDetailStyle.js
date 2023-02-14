import {
  primaryColor,
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from "assets/jss/natcash.js";

const shoplistDetailStyle = {
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
  cardBody: {
    display: "flex",
    "@media (max-width: 769px)": {
      flexDirection: "column !important",
    },
  },
  cardBodyLeft: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  cardBodyRight: {
    display: "flex",
    flex: 1,
    marginLeft: "80px",
    alignItems: "center",
    boxSizing: "border-box",
    "@media (max-width: 769px)": {
      marginLeft: 0,
    },
  },
  info: {
    marginLeft: "15px",
    padding: "0",
  },
  avatar: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: 9999,
  },
  infoText: {
    margin: "0 0 5px 0",
    fontWeight: "400",
    listStyle: "none",
  },
  infoName: {
    fontSize: "18px",
    fontWeight: "500",
  },
  warningText: {
    color: "red",
    listStyle: "none",
  },
  formControl: {
    minWidth: 180,
    marginRight: "5px",
    flex: 1,
  },
  cardFooterTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    "@media (max-width: 769px)": {
      flexDirection: "column !important",
      alignItems: "start",
    },
  },
  cardFooterTitle: {
    margin: "5px 0",
    fontWeight: "400",
    "@media (max-width: 769px)": {
      marginTop: "25px",
    },
  },
  tableImage: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: 99999,
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
  proInfoContainer: {
    float: "right",
  },
  txtOrderCode: {
    paddingLeft: "0 !important",
  },
};
export default shoplistDetailStyle;
