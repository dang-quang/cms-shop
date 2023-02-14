import {
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
} from "assets/jss/natcash.js";

const hexColorToRGB = function (hexColor) {
  let detectShorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i; // #000 vs #000000
  hexColor = hexColor.replace(detectShorthand, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const hex_array = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor); // #000000 to #ffffff
  return hex_array
    ? {
        r: parseInt(hex_array[1], 16), // 0-255
        g: parseInt(hex_array[2], 16), // 0-255
        b: parseInt(hex_array[3], 16), // 0-255
      }
    : null;
};
const hexToRGBAlpha = function (hexColor, alpha) {
  let rgb = hexColorToRGB(hexColor);
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
};

const navPillsStyle = (theme) => ({
  root: {
    paddingLeft: "0",
    marginBottom: "0",
    overflow: "visible !important",
    lineHeight: "24px",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "500",
    position: "relative",
    display: "block",
    color: "inherit",
  },
  flexContainer: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexWrap: "wrap",
    },
  },
  displayNone: {
    display: "none !important",
  },
  fixed: {
    overflow: "visible !important",
  },
  horizontalDisplay: {
    display: "block",
  },
  pills: {
    float: "left",
    position: "relative",
    display: "block",
    borderRadius: "4px",
    minWidth: "100px",
    textAlign: "center",
    transition: "all .3s",
    padding: "10px 15px",
    color: "#555555",
    height: "auto",
    opacity: "1",
    maxWidth: "100%",
    margin: "0 5px",
  },
  pillsWithIcons: {
    borderRadius: "4px",
  },
  tabIcon: {
    width: "30px",
    height: "30px",
    display: "block",
    margin: "15px 0 !important",
    "&, & *": {
      letterSpacing: "normal !important",
    },
  },
  horizontalPills: {
    width: "100%",
    float: "none !important",
    "& + button": {
      margin: "10px 0",
    },
  },
  contentWrapper: {
    marginTop: "20px",
  },
  primary: {
    "&,&:hover": {
      color: "#FFFFFF",
      backgroundColor: primaryColor[0],
      boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px ${hexToRGBAlpha(
        primaryColor[0],
        0.4
      )}`,
    },
  },
  info: {
    "&,&:hover": {
      color: "#FFFFFF",
      backgroundColor: infoColor[0],
      boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px ${hexToRGBAlpha(
        infoColor[0],
        0.4
      )}`,
    },
  },
  success: {
    "&,&:hover": {
      color: "#FFFFFF",
      backgroundColor: successColor,
      boxShadow: `0 2px 2px 0 ${hexToRGBAlpha(
        successColor[0],
        0.14
      )}, 0 3px 1px -2px ${hexToRGBAlpha(
        successColor[0],
        0.2
      )}, 0 1px 5px 0 ${hexToRGBAlpha(successColor[0], 0.12)}`,
    },
  },
  warning: {
    "&,&:hover": {
      color: "#FFFFFF",
      backgroundColor: warningColor[0],
      boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px ${hexToRGBAlpha(
        warningColor[0],
        0.4
      )}`,
    },
  },
  danger: {
    "&,&:hover": {
      color: "#FFFFFF",
      backgroundColor: dangerColor[0],
      boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px ${hexToRGBAlpha(
        dangerColor[0],
        0.4
      )}`,
    },
  },
  rose: {
    "&,&:hover": {
      color: "#FFFFFF",
      backgroundColor: roseColor[0],
      boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px ${hexToRGBAlpha(
        roseColor[0],
        0.4
      )}`,
    },
  },
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabWrapper: {
    color: "inherit",
    position: "relative",
    fontSize: "12px",
    lineHeight: "24px",
    fontWeight: "500",
    textTransform: "uppercase",
    "&,& *": {
      letterSpacing: "normal",
    },
  },
});

export default navPillsStyle;
