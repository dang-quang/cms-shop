import {
  grayColor, whiteColor
} from "assets/jss/natcash.js";
import { callbackify } from "util";

const blueColor = "rgba(51,143,250,1)"

const supportStyle = {
  mainContainer: {
    maxWidth: 1160,
    width: "100%",
    margin: "0 auto",
  },
  topHeader: {
    width: "100%",
    backgroundColor: blueColor,
    padding: "10px 0",
  },
  bottomHeader: {
    width: "100%",
    backgroundColor: whiteColor,
    padding: "10px 0",
  },
  flex_center: {
    display: "flex",
    alignItems: "center",
  },
  flex_center_between: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listItem: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  item: {
    paddingRight: 5,
    marginRight: 5,
    // borderRight: "1px solid " + whiteColor
  },
  item2: {
    paddingLeft: 15,
    marginLeft: 15,
  },
  itemText: {
    color: whiteColor,
    fontSize: 14,
    margin: 0,
    fontWeight: 400,
  },
  icon: {
    fontSize: 18,
    color: whiteColor,
    marginRight: 5,
  },
  itemText2: {
    fontSize: 16,
    margin: 0,
    fontWeight: 500,
  },
  icon2: {
    fontSize: 18,
    marginLeft: 5,
  },
  logo: {
    width: 60,
    height: "auto",
  },
  txtHover: {
    cursor: "pointer",
    // "&:hover": {
    //   color: primaryColor[0],
    // },
  },
  btnRegister: {
    marginLeft: "30px !important",
  },
  section_1: {
    width: "100%",
    height: '100%',
    backgroundColor: whiteColor,
    padding: "0 0 0",
    position: "relative",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
  mainTitle: {
    fontWeight: 400,
  },
  subTitle: {
    fontWeight: 400,
    color: grayColor[0],
    fontSize: 18,
  },
  txtLogo: {
    fontSize: "24px",
    fontWeight: 400,
    marginLeft: "20px",
  },
  pPaddingLeft1: {
    paddingLeft: "40px",
  },
  pPaddingLeft2: {
    paddingLeft: "80px",
  },
  listStyle: {
  }
};

export default supportStyle;
