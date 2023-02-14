import {
  primaryColor,
  whiteColor,
  blackColor,
  hexToRgb,
  successColor,
  infoColor,
  orangeColor,
  grayColor,
} from "assets/jss/natcash.js";

const dealShockOrderStyle = {
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

  tableImage: {
    width: "40px",
    height: "40px",
    objectFit: "cover",
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
  flex_center: {
    display: "flex",
    alignItems: "center",
  },
  more: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
  },
  tabHeaderContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabPanel: {
    "& > div": {
      padding: "0",
    },
  },
  
  infoTextStatus: {
    border: "1px solid",
    borderRadius: "4px",
    width: "fit-content",
    padding: "0 4px",
    fontWeight: 400,
  },
  infoTextStatus1: {
    border: "1px solid Green",
    color: "Green",
    borderRadius: "4px",
    width: "fit-content",
    padding: "0 4px",
    fontWeight: 400,
  },
};

export default dealShockOrderStyle;
