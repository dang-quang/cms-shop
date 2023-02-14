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
  
  const addFlashSaleStyle = {
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
    text: {
      margin: 0,
      fontSize: "14px",
      color: "black",
    },
    text_2: {
      margin: 0,
      fontSize: "14px",
      color: grayColor[0],
      fontWeight: 400,
      marginRight: "5px",
    },
    infoTextPrimary: {
      fontSize: "16px",
      fontWeight: 400,
    },
    infoTextSecondary: {
      color: grayColor[0],
      fontWeight: 400,
    },
    flex_center: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    titleFormGroup: {
      fontSize: "20px",
      fontWeight: 400,
    },
    labelCell: {
      textAlign: "right",
    },
    btnImg: {
      marginRight: "10px",
    },
    formCell: {
      maxWidth: "80%",
    },
    flex_column: {
      display: "flex",
      flexDirection: "column",
    },
    flex_row: {
      display: "flex",
      flexDirection: "row",
    },
    flex_end: {
      display: "flex",
      justifyContent: "end !important",
    },
    checkboxContainer: {
      marginLeft: "30px",
      border: "1px solid " + grayColor[0] + "!important",
      borderRadius: "4px",
      padding: "5px 5px",
    },
    checkboxItem: {
      marginRight: "15px",
    },
    checkBoxLabel: {
      fontWeight: 400,
      color: grayColor[0],
    },
    //table
    more: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
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
    tableImage: {
      width: "50px",
      height: "50px",
    },
    infoTextContainer: {
      marginLeft: "10px",
    },
    margin_0_5: {
      margin: "0 5px",
    },
    //Table Product
    proContainer: {
      display: "flex",
    },
    proImg: {
      width: "65px",
      height: "65px",
      padding: "2px",
      borderRadius: "4px",
    },
    proInfoContainer: {
      marginLeft: "10px",
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
    buttonContainer: {
      display: "flex",
      justifyContent: "end",
    },
    batchSetting: {
      display: "flex",
      flexDirection: "column",
      padding: "15px 25px",
      margin: "15px 0",
      backgroundColor: "#ECECEC",
      minHeight: 100,
    },
    batchSettingText: {
      fontWeight: 400,
      "& p": {
        margin: "10px 0",
      },
    },
    batchSettingText_Title: {
      fontSize: "18px",
    },
    batchSettingText_subTitle: {
      color: grayColor[0],
      marginLeft: "10px !important",
    },
    infoTextWarning: {
      color: "red",
      fontSize: "14px",
      fontWeight: 400,
    },
    textHover: {
      "&:hover,&:focus": {
        color: infoColor[0],
        cursor: "pointer",
      },
    },
    marginBottom_15: {
      marginBottom: "15px",
    },
    promotionModalContainer: {
      marginBottom: "20px",
      borderBottom: "1px solid " + grayColor[0],
    },
    batchSettingValue_margin: {
      marginRight: "20px",
    },
    textField: {
      margin: 0,
      fontWeight: 400,
    },
    FieldMaxWidth: {
      maxWidth: 120,
    },
    classifiedMargin: {
      marginBottom: 15,
    },
    classifiedMargin2: {
      marginBottom: 5,
    },
    transportFlex:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingLeft:"0px",
        //padding-right:
      },
    border:{
      borderStyle: "groove",
      padding: "20px",
      borderRadius: "10px",
    },
    transportType: {
      width: "5px",
      height: "5px",
      marginRight: "7px",
      marginTop: "6px",
      borderRadius: "9999px",
      border: "3px solid red"
  },
    
  };
  
  export default addFlashSaleStyle;
  