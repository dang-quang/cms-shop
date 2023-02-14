import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import styles from "assets/jss/natcash/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logoWide from "assets/img/logo-wide-white.png";
import Icon from "@material-ui/core/Icon";
import { drawerWidth, transition, container } from "assets/jss/natcash.js";
import { SHOW_SIDEBAR } from "../redux/actions/app";
import PageLoader from "components/PageLoader/PageLoader.js";
import {loadTranslations} from "ni18n";
import {ni18nConfig} from "../ni18n.config";

let ps;

export default function Admin({ children, ...rest }) {
  // used for checking current route
  const router = useRouter();
  // styles
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const dispatch = useDispatch();
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("white");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const showSidebar = useSelector((state) => state.app.showSidebar);
  const showLoader = useSelector((state) => state.app.showLoader);
  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return router.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  //toggle Sidebar
  const toggleSidebar = () => {
    dispatch({ type: SHOW_SIDEBAR, showSidebar: !showSidebar });
  };
  return (
    <div className={classes.wrapper}>
      {showSidebar ? (
        <Sidebar
          routes={routes}
          logo={logoWide}
          image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
          {...rest}
        />
      ) : null}
      {showLoader && <PageLoader />}
      <div
        className={classes.mainPanel}
        ref={mainPanel}
        style={{ width: `${showSidebar ? "" : "100%"}` }}
      >
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
          onClick={toggleSidebar}
          showSidebar={showSidebar}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <React.Fragment>
            <div className={classes.content}>
              <div className={classes.container}>{children}</div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className={classes.map}>{children}</div>
          </React.Fragment>
        )}
        {getRoute() ? <Footer /> : null}
        {/*<FixedPlugin*/}
        {/*  handleImageClick={handleImageClick}*/}
        {/*  handleColorClick={handleColorClick}*/}
        {/*  bgColor={color}*/}
        {/*  bgImage={image}*/}
        {/*  handleFixedClick={handleFixedClick}*/}
        {/*  fixedClasses={fixedClasses}*/}
        {/*/>*/}
      </div>
    </div>
  );
}


export const getStaticProps = async (props) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, props.locale, [
        'translation',
      ])),
    },
  }
}
