import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { USER_LOGOUT } from '../../redux/actions/user';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Hidden from '@material-ui/core/Hidden';
import Poppers from '@material-ui/core/Popper';
import Divider from '@material-ui/core/Divider';
// @material-ui/icons
import Icon from '@material-ui/core/Icon';
import Person from '@material-ui/icons/Person';
import Notifications from '@material-ui/icons/Notifications';
import Dashboard from '@material-ui/icons/Dashboard';
import Search from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
// core components
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import useWindowSize from 'components/Hooks/useWindowSize.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Link from 'next/link';

import styles from 'assets/jss/natcash/components/headerLinksStyle.js';
import { Input } from '@chakra-ui/react';

export default function AdminNavbarLinks() {
  const dispatch = useDispatch();
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const [openAddNew, setOpenAddNew] = React.useState(null);
  const [openDashboardMenu, setOpenDashboardMenu] = React.useState(null);
  const language = useSelector((state) => state.app.language);
  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
      setOpenDashboardMenu(null);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
      setOpenDashboardMenu(null);
    }
  };
  const handleClickAddNew = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenAddNew(null);
    } else {
      setOpenDashboardMenu(null);
      setOpenAddNew(event.currentTarget);
    }
  };
  const handleClickDashboardMenu = (event) => {
    if (openDashboardMenu && openDashboardMenu.contains(event.target)) {
      setOpenDashboardMenu(null);
    } else {
      setOpenDashboardMenu(event.currentTarget);
    }
  };
  const handleCloseDashboardMenu = () => {
    setOpenDashboardMenu(null);
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const handleCloseAddNew = () => {
    setOpenAddNew(null);
  };
  const handleLogout = () => {
    dispatch({ type: USER_LOGOUT });
  };
  const handleClickItemMenu = (link) => {
    setOpenDashboardMenu(null);
  };

  const addList = [
    {
      titleEN: 'Channel',
      titleVN: 'Kênh bán hàng',
      route: '/admin/connect',
      icon: 'storefront_icon',
    },
    {
      titleEN: 'Product',
      titleVN: 'Sản phẩm',
      route: '/',
      icon: 'local_mall',
    },
    {
      titleEN: 'Task',
      titleVN: 'Nhiệm vụ',
      route: '/',
      icon: 'assignment_icon',
    },
  ];

  function itemMenuDashBoard() {
    const menu = [
      {
        titleEN: 'Operation',
        titleVN: 'Tổng quan',
        route: '/admin/operation',
        icon: 'dashboard',
        backgroundColor: '#00e72d',
      },
      {
        titleEN: 'TG-CRM',
        titleVN: 'TG-CRM',
        route: '/admin/tg-crm',
        icon: 'rate_review',
        backgroundColor: '#ff0700',
      },
      {
        titleEN: 'TG-UI',
        titleVN: 'TG-UI',
        route: '/admin/tg-ui',
        icon: 'web',
        backgroundColor: '#d300ff',
      },
      {
        titleEN: 'TG-Task',
        titleVN: 'TG-Task',
        route: '/admin/tg-task',
        icon: 'assignment',
        backgroundColor: '#ff9400',
      },
      {
        titleEN: 'System',
        titleVN: 'Hệ thống',
        route: '/admin/system',
        icon: 'settings_applications',
        backgroundColor: '#007eff',
      },
    ];
    const listItem = menu.map((item, index) => (
      <GridItem xs={4} sm={4} md={4} key={index}>
        <Link href={item.route}>
          <div className={classes.itemMenu} onClick={handleClickItemMenu}>
            <div
              className={classes.itemIcon}
              style={{
                background: `radial-gradient(268.63% 268.63% at 0% 100%, ${item.backgroundColor} 0%, #F3F3F3 100%)`,
              }}>
              <Icon className={classes.menuIcon}>{item.icon}</Icon>
            </div>
            <p className={classes.itemMenuTxt}>{language == 'en' ? item.titleEN : item.titleVN}</p>
          </div>
        </Link>
      </GridItem>
    ));
    const listItemResponsive = menu.map((item, index) => (
      <Link href={item.route} key={index}>
        <MenuItem className={classes.dropdownItem}>
          {language == 'en' ? item.titleEN : item.titleVN}
        </MenuItem>
      </Link>
    ));
    return (
      <div className={classes.listItem}>
        {size.width > 959 && <GridContainer>{listItem}</GridContainer>}
        {size.width <= 959 && <MenuList role="menu">{listItemResponsive}</MenuList>}
      </div>
    );
  }
  return (
    <div style={{ position: 'relative', zIndex: 99 }}>
      {/* <div className={classes.searchWrapper}>
        <Input variant="search" placeholder="Search" maxW="180px" mr="4" />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div> */}
      <div className={classes.manager}>
        <Button
          color={size.width > 959 ? 'transparent' : 'white'}
          justIcon={size.width > 959}
          simple={!(size.width > 959)}
          aria-owns={openProfile ? 'addNew-menu-list-grow' : null}
          aria-haspopup="true"
          onClick={handleClickAddNew}
          className={classes.buttonLink}>
          <AddIcon className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Add New</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openAddNew)}
          anchorEl={openAddNew}
          transition
          disablePortal
          className={classNames({ [classes.popperClose]: !openAddNew }) + ' ' + classes.popperNav}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="addNew-menu-list-grow"
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleCloseAddNew}>
                  <MenuList role="menu">
                    {addList.map((item, index) => {
                      return (
                        <Link href={item.route} style={{ color: 'white' }} key={index}>
                          <MenuItem
                            onClick={handleCloseAddNew}
                            className={classes.dropdownItem + ' ' + classes.addList}>
                            <Icon className={classes.menuIcon2}>{item.icon}</Icon>
                            <p className={classes.noPM}>
                              {language == 'en' ? item.titleEN : item.titleVN}
                            </p>
                          </MenuItem>
                        </Link>
                      );
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <Button
        color={size.width > 959 ? 'transparent' : 'white'}
        justIcon={size.width > 959}
        simple={!(size.width > 959)}
        aria-owns={openDashboardMenu ? 'dashboard-menu-list-grow' : null}
        aria-haspopup="true"
        onClick={handleClickDashboardMenu}
        className={classes.buttonLink}>
        <Dashboard className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Menu</p>
        </Hidden>
      </Button>
      <Poppers
        open={Boolean(openDashboardMenu)}
        anchorEl={openDashboardMenu}
        transition
        disablePortal
        className={
          classNames({ [classes.popperClose]: !openDashboardMenu }) + ' ' + classes.popperNav
        }>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="dashboard-menu-list-grow"
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}>
            <Paper>
              <ClickAwayListener onClickAway={handleCloseDashboardMenu}>
                {itemMenuDashBoard()}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Poppers>
      <div className={classes.manager}>
        <Button
          color={size.width > 959 ? 'transparent' : 'white'}
          justIcon={size.width > 959}
          simple={!(size.width > 959)}
          aria-owns={openNotification ? 'notification-menu-list-grow' : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}>
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>5</span>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) + ' ' + classes.popperNav
          }>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItem onClick={handleCloseNotification} className={classes.dropdownItem}>
                      Mike John responded to your email
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotification} className={classes.dropdownItem}>
                      You have 5 new tasks
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotification} className={classes.dropdownItem}>
                      You{"'"}re now friend with Andrew
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotification} className={classes.dropdownItem}>
                      Another Notification
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotification} className={classes.dropdownItem}>
                      Another One
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        <Button
          color={size.width > 959 ? 'transparent' : 'white'}
          justIcon={size.width > 959}
          simple={!(size.width > 959)}
          aria-owns={openProfile ? 'profile-menu-list-grow' : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}>
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={classNames({ [classes.popperClose]: !openProfile }) + ' ' + classes.popperNav}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem onClick={handleCloseProfile} className={classes.dropdownItem}>
                      <Link href={'/admin/user-profile'}>
                        <span>Profile</span>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseProfile} className={classes.dropdownItem}>
                      Settings
                    </MenuItem>
                    <Divider light />
                    <MenuItem onClick={handleLogout} className={classes.dropdownItem}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
