import {
  blackColor,
  whiteColor,
  hexToRgb,
  successColor,
  warningColor,
  grayColor,
} from "assets/jss/natcash.js";

const modalCustomStyle = {
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
    alignItems: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    minWidth: "300px !important",
    manWidth: "80%",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  flex_between: {
    display: "flex",
    justifyContent: "space-between",
  },
  btnClose: {
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
    },
  },
};

export default modalCustomStyle;
