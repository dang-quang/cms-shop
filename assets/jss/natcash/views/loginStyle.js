import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from "assets/jss/natcash.js";

const loginStyle = {
  container: {
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  loginContainer: {
    maxWidth: "500px",
    minWidth: "300px",
    background: "rgba(0,0,0,.33) !important",
    borderRadius: "6px",
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
  txtInput: {
    color: "white",
    background: "transparent !important",
  },
  btnLogin: {
    width: "100%",
    margin: "30px 0 !important",
    textTransform: 'uppercase'
  },
  btnTest: {
    margin: "0 !important",
    background: "transparent !important",
    fontSize: "8px !important",
    float:"right !important",
    boxShadow: "none !important",
    color: "#6e6969 !important"
  },
};

export default loginStyle;
