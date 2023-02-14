import {drawerWidth, transition, container, primaryColor} from "assets/jss/natcash.js";

const appStyle = (theme) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
    position: "relative",
  },
  content: {
    marginTop: "30px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)",
  },
  container,
  map: {
    marginTop: "30px",
  },
  btnToggleSidebar: {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "9999",
  },
});

export default appStyle;
