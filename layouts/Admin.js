import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Navbar from 'components/Navbars/Navbar.js';
import Footer from 'components/Footer/Footer.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import FixedPlugin from 'components/FixedPlugin/FixedPlugin.js';

import routes from 'routes.js';

import styles from 'assets/jss/natcash/layouts/adminStyle.js';

import bgImage from 'assets/img/sidebar-2.jpg';
import logoWide from 'assets/img/logo-wide-white.png';
import Icon from '@material-ui/core/Icon';
import { drawerWidth, transition, container } from 'assets/jss/natcash.js';
import PageLoader from 'components/PageLoader/PageLoader.js';
import { loadTranslations } from 'ni18n';
import { ni18nConfig } from '../ni18n.config';
import { Box, Button, Flex, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { approveProducts, rejectProduct } from 'redux/actions/product';
import product from 'redux/reducers/product';
import _ from 'lodash';
import { EAppKey } from 'constants/types';
import { requestApproveProduct } from 'utilities/ApiManage';
import { setShowLoader, SHOW_SIDEBAR } from 'redux/actions/app';
import { NotificationManager } from 'react-light-notifications';

let ps;

export default function Admin({ children, ...rest }) {
  // used for checking current route
  const router = useRouter();
  const { t } = useTranslation();
  // styles
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const dispatch = useDispatch();
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState('white');
  const [fixedClasses, setFixedClasses] = React.useState('dropdown');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const showSidebar = useSelector((state) => state.app.showSidebar);
  const showLoader = useSelector((state) => state.app.showLoader);
  const selectedProducts = useSelector((state) => state.product.selectedProducts);

  const isShow = _.some(selectedProducts, (obj) => !_.isEmpty(obj.products));

  const handleApprove = React.useCallback(async () => {
    try {
      const ids = _.flatMap(selectedProducts, 'products').map(({ id }) => id);

      dispatch(setShowLoader(true));

      if (ids.length) {
        const res = await requestApproveProduct({ ids: ids, type: EAppKey.APPROVE });

        if (res && res.code === EAppKey.MSG_SUCCESS) {
          let notificationDisplayed = false; // Flag variable to track notification display

          if (!notificationDisplayed) {
            dispatch(setShowLoader(false));
            NotificationManager.success({
              title: 'Successful',
              message: 'The products have been approved successfully',
            });
            notificationDisplayed = true; // Set flag to true after displaying the notification
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
          router.push('/admin/product-approval');
        }
      }
    } finally {
      dispatch(setShowLoader(false));
    }
  }, [selectedProducts]);

  const handleReject = React.useCallback(async () => {
    try {
      const ids = _.flatMap(selectedProducts, 'products').map(({ id }) => id);

      dispatch(setShowLoader(true));

      if (ids.length) {
        const res = await requestApproveProduct({ ids: ids, type: EAppKey.REJECT });

        if (res && res.code === EAppKey.MSG_SUCCESS) {
          let notificationDisplayed = false; // Flag variable to track notification display

          if (!notificationDisplayed) {
            NotificationManager.success({
              title: 'Successful',
              message: 'The products have been rejected successfully',
            });
            notificationDisplayed = true; // Set flag to true after displaying the notification
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
          router.push('/admin/product-approval');
        }
      }
    } finally {
      dispatch(setShowLoader(false));
    }
  }, [selectedProducts]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return router.pathname !== '/admin/maps';
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
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
        style={{ width: `${showSidebar ? '' : '100%'}` }}>
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
      {isShow && (
        <Flex
          bg="bg-1"
          px="8"
          py="6"
          shadow="lg"
          justifyContent="flex-end"
          alignItems="center"
          insetX="0"
          bottom="0"
          position="absolute">
          <HStack gap="4">
            <Button variant="control" minW="120px" children={t('reject')} onClick={handleApprove} />
            <Button variant="primary" minW="120px" children={t('approve')} onClick={handleReject} />
          </HStack>
        </Flex>
      )}
    </div>
  );
}

export const getStaticProps = async (props) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, props.locale, ['translation'])),
    },
  };
};
