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

const addVoucherStyle = {
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
  infoTextPrimary: {
    fontSize: "16px",
    fontWeight: 400,
  },
  infoTextSecondary: {
    color: grayColor[0],
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
  itemsContainer: {
    width: "fit-content",
    height: "60px !important",
    cursor: "pointer",
    marginRight: "20px !important",
    overflow: "hidden",
    position: "relative",
    "&:after": {
      position: "absolute",
      content: '""',
      top: -30,
      right: -30,
      width: "60px",
      height: "60px",
      backgroundColor: "red",
      transform: "rotate(45deg)",
      zIndex: 1,
    },
    "&:before": {
      position: "absolute",
      content: '"✔"',
      top: 0,
      right: 2,
      fontSize: "20px",
      color: "white",
      zIndex: 2,
    },
  },
  itemsContainer_active: {
    border: "1px solid " + grayColor[0] + "!important",
    boxShadow: "none !important",
    "&:after": {
      backgroundColor: grayColor[0] + "!important",
    },
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
};

export default addVoucherStyle;
