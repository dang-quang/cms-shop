/*eslint-disable*/
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Language from '@material-ui/icons/Language';
import Poppers from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import iconHaiti from 'assets/img/icon_haiti.png';
import iconFrance from 'assets/img/icon_france.png';
import iconUk from 'assets/img/icon_uk.png';
import { CHANGE_LANGUAGE } from '../../redux/actions/app';
// core components
import AdminNavbarLinks from 'components/Navbars/AdminNavbarLinks.js';
import RTLNavbarLinks from 'components/Navbars/RTLNavbarLinks.js';

import styles from 'assets/jss/natcash/components/sidebarStyle.js';
import { useTranslation } from 'react-i18next';

export default function Sidebar(props) {
  const [showLanguage, setShowLanguage] = useState(false);
  const [languageName, setLanguageName] = useState('Language');
  const language = useSelector((state) => state.app.language);
  const sidebar = useSelector((state) => state.app.sidebar);
  const dispatch = useDispatch();
  // used for checking current route
  const router = useRouter();
  // creates styles for this component
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]';
    })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

  const handleChangeLanguage = (language) => {
    dispatch({ type: CHANGE_LANGUAGE, language });
    i18n.changeLanguage(language);
    setShowLanguage(false);
  };

  const selectLanguage = () => {
    setShowLanguage(true);
  };
  useEffect(() => {
    switch (language) {
      case 'en':
        setLanguageName('English');
        return;
      case 'ht':
        setLanguageName('Kreyol');
        return;
      case 'fr':
        setLanguageName('FranCais');
        return;
      default:
        setLanguageName('English');
        return;
    }
  }, [language]);
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return router.route.indexOf(routeName) > -1 ? true : false;
  }

  function getIcon() {
    switch (language) {
      case 'en':
        return iconUk;
      case 'ht':
        return iconHaiti;
      case 'fr':
        return iconFrance;
      default:
        return iconUk;
    }
  }

  function activeSidebarItem(prop) {
    if (sidebar != undefined) {
      return sidebar.indexOf(prop.parent) > -1 ? true : false;
    } else {
      return router.route.indexOf(prop.parent) > -1 ? true : false;
    }
  }

  const { color, logo, image, logoText, routes } = props;
  var links = (
    <List className={classes.list} style={{ paddingBottom: isSafari ? '100px' : '0' }}>
      {routes.map((prop, key) => {
        var activePro = ' ';
        var listItemClasses;
        listItemClasses = classNames({
          [' ' + classes[color]]: activeRoute(prop.layout + prop.path),
        });
        const whiteFontClasses = classNames({
          [' ' + classes.whiteFont]:
            activeRoute(prop.layout + prop.path) || prop.path === '/upgrade-to-pro',
        });
        return (
          <div key={key}>
            {activeSidebarItem(prop) && (
              <>
                {!prop.subMenu ? (
                  <Link href={prop.path === '/' ? '/#' : prop.layout + prop.path}>
                    <a className={activePro + classes.item}>
                      <ListItem button className={classes.itemLink + listItemClasses}>
                        {typeof prop.icon === 'string' ? (
                          <Icon
                            className={classNames(classes.itemIcon, whiteFontClasses, {
                              [classes.itemIconRTL]: props.rtlActive,
                            })}>
                            {prop.icon}
                          </Icon>
                        ) : (
                          <prop.icon
                            className={classNames(classes.itemIcon, whiteFontClasses, {
                              [classes.itemIconRTL]: props.rtlActive,
                            })}
                          />
                        )}
                        <ListItemText
                          primary={props.rtlActive ? prop.rtlName : t(`sideBar.${prop.name}`)}
                          className={classNames(classes.itemText, whiteFontClasses, {
                            [classes.itemTextRTL]: props.rtlActive,
                          })}
                          disableTypography={true}
                        />
                      </ListItem>
                    </a>
                  </Link>
                ) : (
                  <div key={key}>
                    <a className={activePro + classes.item}>
                      <ListItem button className={classes.itemLink + listItemClasses}>
                        {typeof prop.icon === 'string' ? (
                          <Icon
                            className={classNames(classes.itemIcon, whiteFontClasses, {
                              [classes.itemIconRTL]: props.rtlActive,
                            })}>
                            {prop.icon}
                          </Icon>
                        ) : (
                          <prop.icon
                            className={classNames(classes.itemIcon, whiteFontClasses, {
                              [classes.itemIconRTL]: props.rtlActive,
                            })}
                          />
                        )}
                        <ListItemText
                          primary={props.rtlActive ? prop.rtlName : t(`sideBar.${prop.name}`)}
                          className={classNames(classes.itemText, whiteFontClasses, {
                            [classes.itemTextRTL]: props.rtlActive,
                          })}
                          disableTypography={true}
                        />
                      </ListItem>
                    </a>
                    <div>
                      {prop.subMenu.map((item, key2) => {
                        var listSubItemClasses;
                        listSubItemClasses = classNames({
                          [' ' + classes[color]]: activeRoute(item.layout + item.path),
                        });

                        // console.log('tung', listSubItemClasses, activeRoute(item.layout + item.path), item.path, item.layout);

                        return item.path === '/' ? null : (
                          <Link href={item.layout + item.path} key={'key2_' + key2}>
                            <a className={activePro + classes.item}>
                              <ListItem
                                button
                                className={
                                  classes.itemLink + listSubItemClasses + ' ' + classes.listSubMenu
                                }>
                                <ListItemText
                                  primary={
                                    item.rtlActive ? item.rtlName : t(`sideBar.${item.name}`)
                                  }
                                  className={classNames(classes.itemText, whiteFontClasses, {
                                    [classes.itemTextRTL]: item.rtlActive,
                                  })}
                                  disableTypography={true}
                                />
                              </ListItem>
                            </a>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
      <div className={classes.activePro + ' ' + classes.item} onClick={() => selectLanguage()}>
        <ListItem button className={classes.itemLink}>
          <img src={getIcon()} className={classes.iconLanguage}></img>
          <ListItemText
            primary={languageName}
            className={classNames(classes.itemText, classes.whiteFont)}
            disableTypography={true}
          />
        </ListItem>
        <Poppers
          open={Boolean(showLanguage)}
          anchorEl={showLanguage}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !showLanguage }) + ' ' + classes.popperNav
          }>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id={'action-list-grow'}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}>
              <Paper>
                <ClickAwayListener onClickAway={() => setShowLanguage(false)}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={() => handleChangeLanguage('en')}
                      className={classes.dropdownItem}>
                      <img src={iconUk} className={classes.iconLanguage}></img>
                      {t('english')}
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleChangeLanguage('ht')}
                      className={classes.dropdownItem}>
                      <img src={iconHaiti} className={classes.iconLanguage}></img>
                      {t('creole')}
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleChangeLanguage('fr')}
                      className={classes.dropdownItem}>
                      <img src={iconFrance} className={classes.iconLanguage}></img>
                      {t('france')}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </List>
  );

  var brand = (
    <div className={classes.logo}>
      <a
        href="/admin/operation"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive,
        })}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? 'left' : 'right'}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}>
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
            {links}
          </div>
          {image !== undefined ? (
            <div className={classes.background} style={{ backgroundImage: 'url(' + image + ')' }} />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? 'right' : 'left'}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}>
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div className={classes.background} style={{ backgroundImage: 'url(' + image + ')' }} />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(['white', 'purple', 'blue', 'green', 'orange', 'red']),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
