import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import RTLNavbarLinks from "./RTLNavbarLinks.js";
import Button from "components/CustomButtons/Button.js";
import Icon from "@material-ui/core/Icon";

import styles from "assets/jss/natcash/components/headerStyle.js";
import {useTranslation} from "react-i18next";

export default function Header(props) {
  // used for checking current route
  const router = useRouter();
  // create styles for this component
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const sidebar = useSelector((state) => state.app.sidebar);
  const language = useSelector((state) => state.app.language);
  const { t } = useTranslation()
  function makeBrand() {
    // verifies if routeName is the one active (in browser input)
    function activeRoute(routeName) {
      return router.route.indexOf(routeName) > -1 ? true : false;
    }
    var name = sidebar;
    props.routes.map((prop) => {
      if (activeRoute(prop.layout + prop.path)) {
        return (name = t(`sideBar.${prop.name}`))
      }
      prop.subMenu?.map((item) => {
        if (activeRoute(item.layout + item.path)) {
          return (name = t(`sideBar.${item.name}`))
        }
      });
    });

    return name;
  }
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button
            color="transparent"
            onClick={props.onClick}
            className={classes.title}
          >
            {props.showSidebar ? (
              <Icon>more_vert</Icon>
            ) : (
              <Icon>view_list</Icon>
            )}
            <span style={{ padding: "0 5px" }}></span>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
  showSidebar: PropTypes.bool,
};
