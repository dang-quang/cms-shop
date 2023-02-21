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
  flex_end: {
    display: "flex",
    justifyContent: "end !important",
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
  viewItem:{
    // with: '100%',
    flexDirection:'row',
    justifyContent: "space-between",
    display:  "flex",
    marginBottom: 15
  }
};

export default addVoucherStyle;
