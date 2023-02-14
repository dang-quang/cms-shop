import {
  drawerWidth,
  transition,
  boxShadow,
  defaultFont,
  primaryColor,
  primaryBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
  blackColor,
  blueColor,
  hexToRgb,
} from "assets/jss/natcash.js";

const sidebarStyle = (theme) => ({
  drawerPaper: {
    border: "none",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    zIndex: "1",
    ...boxShadow,
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      position: "fixed",
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
      ...boxShadow,
      position: "fixed",
      display: "block",
      top: "0",
      height: "100vh",
      right: "0",
      left: "auto",
      zIndex: "1032",
      visibility: "visible",
      overflowY: "visible",
      borderTop: "none",
      textAlign: "left",
      paddingRight: "0px",
      paddingLeft: "0",
      transform: `translate3d(${drawerWidth}px, 0, 0)`,
      ...transition,
    },
  },
  drawerPaperRTL: {
    [theme.breakpoints.up("md")]: {
      left: "auto !important",
      right: "0 !important",
    },
    [theme.breakpoints.down("sm")]: {
      left: "0  !important",
      right: "auto !important",
    },
  },
  logo: {
    position: "relative",
    padding: "15px 15px",
    zIndex: "4",
    backgroundColor: primaryColor[0],
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: "0",

      height: "1px",
      right: "15px",
      width: "calc(100% - 30px)",
      backgroundColor: "rgba(" + hexToRgb(grayColor[6]) + ", 0.3)",
    },
  },
  logoLink: {
    ...defaultFont,
    textTransform: "uppercase",
    padding: "5px 0",
    display: "block",
    fontSize: "18px",
    textAlign: "left",
    fontWeight: "400",
    lineHeight: "30px",
    textDecoration: "none",
    backgroundColor: "transparent",
    "&,&:hover": {
      color: whiteColor,
    },
  },
  logoLinkRTL: {
    textAlign: "right",
  },
  logoImage: {
    width: "30px",
    display: "inline-block",
    maxHeight: "30px",
    marginLeft: "10px",
    marginRight: "15px",
  },
  img: {
    width: "165px",
    top: "15px",
    position: "absolute",
    verticalAlign: "middle",
    border: "0",
  },
  background: {
    position: "absolute",
    zIndex: "1",
    height: "100%",
    width: "100%",
    display: "block",
    top: "0",
    left: "0",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    "&:after": {
      position: "absolute",
      zIndex: "3",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      background: blueColor,
      opacity: ".8",
    },
  },
  list: {
    marginTop: "20px",
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0",
    listStyle: "none",
    position: "unset",
  },
  item: {
    position: "relative",
    display: "block",
    textDecoration: "none",
    "&:hover,&:focus,&:visited,&": {
      color: whiteColor,
    },
  },
  itemLink: {
    width: "auto",
    transition: "all 300ms linear",
    margin: "0 5px",
    borderRadius: "3px",
    position: "relative",
    display: "flex",
    padding: "10px 15px",
    backgroundColor: "transparent",
    ...defaultFont,
  },
  itemIcon: {
    width: "24px",
    height: "30px",
    fontSize: "24px",
    lineHeight: "30px",
    float: "left",
    marginRight: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    color: "rgba(" + hexToRgb(whiteColor) + ", 0.8)",
  },
  itemIconRTL: {
    marginRight: "3px",
    marginLeft: "15px",
    float: "right",
  },
  itemText: {
    ...defaultFont,
    margin: "0",
    lineHeight: "30px",
    fontSize: "14px",
    color: whiteColor,
  },
  itemTextRTL: {
    textAlign: "right",
  },
  whiteFont: {
    color: whiteColor,
  },
  purple: {
    backgroundColor: primaryColor[0],
    ...primaryBoxShadow,
    "&:hover,&:focus": {
      backgroundColor: primaryColor[0],
      ...primaryBoxShadow,
    },
  },
  blue: {
    backgroundColor: infoColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(infoColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(infoColor[0]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: infoColor[0],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(infoColor[0]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(infoColor[0]) +
        ",.2)",
    },
  },
  green: {
    backgroundColor: successColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(successColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(successColor[0]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: successColor[0],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(successColor[0]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(successColor[0]) +
        ",.2)",
    },
  },
  orange: {
    backgroundColor: warningColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(warningColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(warningColor[0]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: warningColor[0],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(warningColor[0]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(warningColor[0]) +
        ",.2)",
    },
  },
  red: {
    backgroundColor: dangerColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(dangerColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(dangerColor[0]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: dangerColor[0],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(dangerColor[0]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(dangerColor[0]) +
        ",.2)",
    },
  },
  white: {
    backgroundColor: whiteColor,
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(whiteColor) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(whiteColor) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: whiteColor,
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(whiteColor) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(whiteColor) +
        ",.2)",
    },
    "& $itemText": {
      color: grayColor[8],
    },
    "& $itemIcon": {
      color: "rgba(" + hexToRgb(grayColor[8]) + ", 0.8)",
    },
  },
  sidebarWrapper: {
    position: "relative",
    height: "calc(100vh - 75px)",
    overflow: "auto",
    width: "260px",
    zIndex: "4",
    overflowScrolling: "touch",
    paddingBottom: "65px",
  },
  activePro: {
    [theme.breakpoints.up("md")]: {
      position: "fixed",
      width: "100%",
      maxWidth: "260px",
      bottom: "0",
      background: "#2B5BB5",
    },
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
    display: "flex",
    alignItems: "center",
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
  popperNav: {
    position: "absolute",
    top: "-105px !important",
    left: "3% !important",
    width: "95% !important",
  },
  iconLanguage: {
    width: "25px",
    height: "25px",
    marginRight: "15px",
  },
  listSubMenu: {
    paddingLeft: "54px !important",
  },
});

export default sidebarStyle;
