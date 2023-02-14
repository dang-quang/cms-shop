import { primaryColor, blackColor, hexToRgb } from "assets/jss/natcash.js";

const checkboxAdnRadioStyle = {
  root: {
    "&:hover": {
      backgroundColor: "unset",
    },
    padding: 0,
  },
  labelRoot: {
    marginLeft: "-14px",
  },
  checked: {
    color: primaryColor[0] + "!important",
  },
  checkedIcon: {
    width: "20px",
    height: "20px",
    border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
    borderRadius: "3px",
  },
  uncheckedIcon: {
    width: "0px",
    height: "0px",
    padding: "10px",
    border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
    borderRadius: "3px",
  },
  radio: {
    color: primaryColor[0] + "!important",
  },
  radioChecked: {
    width: "20px",
    height: "20px",
    border: "1px solid " + primaryColor[0],
    borderRadius: "50%",
  },
  radioUnchecked: {
    width: "0px",
    height: "0px",
    padding: "10px",
    border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
    borderRadius: "50%",
  },
  lable: {
    fontSize: 16,
    fontWeight: 400,
    color: blackColor,
    cursor: "pointer",
  },
  checkboxContainer: {
    display: "flex",
    alignItem: "center",
  },
  checkbox: {
    marginRight: 10,
  },
};

export default checkboxAdnRadioStyle;
