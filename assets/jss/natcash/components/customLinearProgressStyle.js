import {
  primaryColor,
  dangerColor,
  successColor,
  grayColor,
  infoColor
} from "assets/jss/natcash.js";

const customLinearProgressStyle = {
  root: {
    height: "8px",
    marginBottom: "20px",
    overflow: "hidden",
  },
  bar: {
    height: "8px",
  },
  primary: {
    backgroundColor: primaryColor[0],
  },
  danger: {
    backgroundColor: dangerColor[0],
  },
  success: {
    backgroundColor: "#61bd4f",
  },
  info: {
    backgroundColor: "#5185e4",
  },
  gray: {
    backgroundColor: grayColor[0],
  },
  primaryBackground: {
    background: "rgba(156, 39, 176, 0.2)",
  },
  dangerBackground: {
    background: "rgba(244, 67, 54, 0.2)",
  },
  successBackground: {
    background: "rgba(76, 175, 80, 0.2)",
  },
  infoBackground: {
    background: "rgba(0, 124, 212, 0.2)",
  },
  grayBackground: {
    background: "rgba(221, 221, 221, 0.2)",
  },
};

export default customLinearProgressStyle;
