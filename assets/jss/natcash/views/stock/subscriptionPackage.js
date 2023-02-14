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
  
  const subscriptionPackage = {
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
    infoTextStatus: {
      border: "1px solid",
      borderRadius: "4px",
      width: "fit-content",
      padding: "0 4px",
      fontWeight: 400,
    },
    popperNav: {
      position: "relative",
      zIndex: "99",
      top: "auto !important",
      left: "auto !important",
    },
    flex_center: {
      display: "flex",
      alignItems: "center",
    },
    cursorHover: {
      cursor: "pointer",
      "&:hover": {
        color: infoColor[0],
      },
    },
    cbb_find: {
      paddingRight: "133px",
    },
    marginBottom_20: {
      marginBottom: "20px",
    },
    formControl: {
      width: "100%",
    },
    retypeButton: {
      mmarginTop: "7px",
      left: "173px",
      top: -"6px",
    },
  };
  
  export default subscriptionPackage;
  