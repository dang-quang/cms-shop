import {
  Button,
  ClickAwayListener,
  Fade,
  Grow,
  Link,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
} from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import classNames from "classnames";
import React from "react";
import RegularButton from "../CustomButtons/Button";

import styles from "./style";

export default function ButtonPopover({ children, options, color, ...props }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <div>
      <RegularButton
        variant="contained"
        color={color || "primary"}
        onClick={handleClick("bottom")}
        className={classes.buttonPopover}
        {...props}
      >
        {children}
      </RegularButton>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        className={classes.popper}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList role="menu">{options}</MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

export function OptionPopover({ onClick, title, link }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  if (link) {
    return (
      <Link href={link} style={{ textDecoration: "none" }}>
        <MenuItem className={classes.dropdownItem}>{title}</MenuItem>
      </Link>
    );
  }

  return (
    <MenuItem onClick={onClick} className={classes.dropdownItem}>
      {title}
    </MenuItem>
  );
}
