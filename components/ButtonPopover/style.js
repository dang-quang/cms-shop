import {
  defaultFont,
  grayColor,
  primaryBoxShadow,
  primaryColor,
  whiteColor,
} from "assets/jss/natcash.js";

const style = (theme) => ({
  buttonPopover: {
    margin: "0 !important",
    padding: "6.5px 20px !important",
    fontSize: "14px",
    fontWeight: 300,
  },
  popper: {
    marginTop: "10px",
    zIndex: 10,
  },
  dropdownItem: {
    ...defaultFont,
    backgroundColor: whiteColor,
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    WebkitTransition: "all 150ms linear",
    MozTransition: "all 150ms linear",
    OTransition: "all 150ms linear",
    MsTransition: "all 150ms linear",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    lineHeight: "1.42857143",
    color: grayColor[8],
    whiteSpace: "nowrap",
    height: "unset",
    minHeight: "unset",
    "&:hover": {
      backgroundColor: primaryColor[0],
      color: whiteColor,
      ...primaryBoxShadow,
    },
  },
  btnAction: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: whiteColor,
    borderColor: whiteColor,
    fontSize: "14px",
    fontWeight: 300,
    marginLeft: "10px",
    lineHeight: "1.5",
  },
});

export default style;
