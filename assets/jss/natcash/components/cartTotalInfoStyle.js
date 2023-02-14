import {
  blackColor,
  whiteColor,
  hexToRgb,
  successColor,
  warningColor,
  grayColor,
} from "assets/jss/natcash.js";

const redColor = "#ff4742";

const cartTotalInfoStyle = {
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
  itemTitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    marginBottom: "10px",
    flex: 1,
  },
  itemTitle: {
    fontSize: "16px",
    margin: "0 10px 0 0",
    fontWeight: "400",
  },
  icon: {
    fontSize: "18px",
    color: grayColor[0],
  },
  icon_success: {
    fontSize: "17px",
    color: successColor[1],
  },
  icon_warning: {
    fontSize: "17px",
    color: redColor,
  },
  itemValue: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  itemCompare: {
    display: "flex",
    alignItems: "center",
    margin: "0",
    color: grayColor[0],
    fontWeight: "400",
  },
  itemCompareValue_up: {
    color: successColor[1],
    marginLeft: "10px",
  },
  itemCompareValue_down: {
    color: redColor,
    marginLeft: "10px",
  },
  borderRight: {
    borderRight: "0.5px solid" + " " + grayColor[0],
  },
};

export default cartTotalInfoStyle;
