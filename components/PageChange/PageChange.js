import React from "react";
import { useRouter } from "next/router";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import classNames from "classnames";

import styles from "assets/jss/natcash/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo.png";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import sideStyles from "assets/jss/natcash/components/sidebarStyle.js";
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import Skeleton from '@material-ui/lab/Skeleton';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import useWindowSize from "components/Hooks/useWindowSize.js";

let ps;

export default function PageChange(props) {
  // used for checking current route
  const router = useRouter();
  // styles
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useSideStyles = makeStyles(sideStyles);
  const sideClasses = useSideStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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

  var brand = (
    <div className={sideClasses.logo}>
      <a
        href="/admin"
        className={classNames(sideClasses.logoLink)}
      >
        <div className={sideClasses.logoImage}>
          <img src={logo} alt="logo" className={sideClasses.img} />
        </div>
        {'natcash'}
      </a>
    </div>
  );


  return (
    <div className={classes.wrapper}>
        <div>
            <Hidden mdUp implementation="css">
                <Drawer
                variant="temporary"
                anchor={"left"}
                open={mobileOpen}
                classes={{
                    paper: classNames(sideClasses.drawerPaper),
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                >
                {brand}
                <div className={sideClasses.sidebarWrapper}>
                    {/* {<AdminNavbarLinks />} */}
                    
                </div>
                {image !== undefined ? (
                    <div
                    className={sideClasses.background}
                    style={{ backgroundImage: "url(" + image + ")" }}
                    />
                ) : null}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                anchor={"left"}
                variant="permanent"
                open
                classes={{
                    paper: classNames(sideClasses.drawerPaper),
                }}
                >
                {brand}
                <div className={sideClasses.sidebarWrapper}>
                    <div style={{margin: "15px 10px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Skeleton variant="circle" width={35} height={35} />
                        <Skeleton variant="text" width={200} height={50}/>
                    </div>
                    <div style={{margin: "15px 10px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Skeleton variant="circle" width={35} height={35} />
                        <Skeleton variant="text" width={200} height={50}/>
                    </div>
                    <div style={{margin: "15px 10px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Skeleton variant="circle" width={35} height={35} />
                        <Skeleton variant="text" width={200} height={50}/>
                    </div>
                    <div style={{margin: "15px 10px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Skeleton variant="circle" width={35} height={35} />
                        <Skeleton variant="text" width={200} height={50}/>
                    </div>
                </div>
                {image !== undefined ? (
                    <div
                    className={sideClasses.background}
                    style={{ backgroundImage: "url(" + image + ")" }}
                    />
                ) : null}
                </Drawer>
            </Hidden>
            </div>
      <div
        className={classes.mainPanel}
        ref={mainPanel}
      >
        {/* <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
        /> */}
          <React.Fragment>
            <div className={classes.content}>
              <div className={classes.container} style={{marginTop: "10px"}}>
                  <GridContainer
                  style={{
                    display: `${size.width < 541 ? "block" : "flex"}`,
                  }}
                  >
                    <GridItem xs={3} sm={3} md={3}>
                        <div>
                        <Skeleton variant="rect" height={130} style={{marginBottom: "5px", width: size.width < 541? "300px" : "100%"}}/>
                          <Skeleton variant="text" width={225}/>
                          <Skeleton variant="text" width={155} style={{ marginBottom: "20px"}}/>
                        </div>
                    </GridItem >
                    <GridItem xs={3} sm={3} md={3}>
                    <div>
                    <Skeleton variant="rect" height={130} style={{marginBottom: "5px", width: size.width < 541? "300px" : "100%"}}/>
                          <Skeleton variant="text" width={225}/>
                          <Skeleton variant="text" width={155} style={{ marginBottom: "20px"}}/>
                        </div>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                    <div>
                    <Skeleton variant="rect" height={130} style={{marginBottom: "5px", width: size.width < 541? "300px" : "100%"}}/>
                          <Skeleton variant="text" width={225}/>
                          <Skeleton variant="text" width={155} style={{ marginBottom: "20px"}}/>
                        </div>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                        <div>
                          <Skeleton variant="rect" height={130} style={{marginBottom: "5px", width: size.width < 541? "300px" : "100%"}}/>
                          <Skeleton variant="text" width={225}/>
                          <Skeleton variant="text" width={155} style={{ marginBottom: "20px"}}/>
                        </div>
                    </GridItem>
                  </GridContainer>
                  <Skeleton variant="text" style={{  width: "45%", minWidth: "300px"}}/>
                  <Skeleton variant="text" style={{ marginBottom: "20px", width: "30%", minWidth: "235px"}}/>
                  <div style={{display: size.width < 541? "block" : "flex"}}>
                    <div style={{width: size.width < 541? "300px" : "65%"}}>
                      <Skeleton variant="rect" height={500} style={{marginBottom: "5px", marginRight: "20px"}}/>
                      <div style={{display: "flex", alignItems: "center"}}>
                          <Skeleton variant="circle" width={35} height={35} style={{marginRight: "10px"}}/>
                          <Skeleton variant="text" width={200} height={50}/>
                      </div>
                    </div>
                    <Skeleton variant="rect" height={500} style={{marginLeft: "10px", marginBottom: "5px", width: size.width < 541? "300px" : "35%"}}/>
                  </div>
              </div>
            </div>
          </React.Fragment>
      </div>
    </div>
  );
}
