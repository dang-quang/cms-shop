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

const AddStockStyle = {
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
    fontWeight: 400
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
  custom_field: {
    marginBottom: 20,
  },
};

export default AddStockStyle;
