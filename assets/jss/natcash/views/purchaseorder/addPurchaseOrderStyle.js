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

const grayColorCustom = "#e1e1e1";

const AddPurchaseOrderStyle = {
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
    fontSize: "14px",
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
  stepContainer: {
    marginTop: "25px !important",
    marginBottom: "45px !important",
  },
  flex_center_between: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  step: {
    color: grayColorCustom,
    margin: 0,
    marginLeft: 50,
    fontWeight: 400,
    cursor: "pointer",
  },
  stepNumber: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 9999,
    border: "3px solid " + grayColorCustom,
    marginRight: 10,
    fontSize: 18,
    fontWeight: 500,
  },
  activeStep: {
    color: whiteColor,
  },
  activeStepNumber: {
    backgroundColor: whiteColor,
    color: primaryColor[0],
    border: "3px solid " + whiteColor,
  },
  custom_field: {
    marginBottom: 20,
  },
  card_custom: {
    marginBottom: "60px",
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
  previewField:{
    padding: "10px 0",
  },
  tableResponsive:{
    maxHeight: 350,
    overflow: "auto",
  },
  paginationContainer:{
    paddingTop: 10,
    borderTop: `1px solid ${primaryColor[0]} !important`
  }
};

export default AddPurchaseOrderStyle;
