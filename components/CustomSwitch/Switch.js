import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { primaryColor } from "../../assets/jss/natcash";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

export default function RegularSwitch(props) {
    const styles={
        switchBase: {
            color: primaryColor[0] + "!important",
            },
        switchIcon: {
            boxShadow: "0 1px 3px 1px rgba(0, 0, 0, 0.4)",
            color: "#FFFFFF !important",
            border: "1px solid rgba(0, 0, 0, .54)",
            },
        switchBar: {
            width: "30px",
            height: "15px",
            backgroundColor: "rgb(80, 80, 80)",
            borderRadius: "15px",
            opacity: "0.7!important",
            },
        switchChecked: {
            "& + $switchBar": {
                backgroundColor: primaryColor[0] + " !important",
            },
            "& $switchIcon": {
                borderColor: "#f96606",
            },
        },
    }
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const {
    children,
    className,
    ...rest
  } = props;
  return (
    <Switch 
        {...rest} 
        classes={{
            switchBase: classes.switchBase,
            checked: classes.switchChecked,
            thumb: classes.switchIcon,
            track: classes.switchBar,
        }}>
      {children}
    </Switch>
  );
}

RegularSwitch.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "transparent",
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  className: PropTypes.string,
  // use this to pass the classes props from Material-UI
  muiClasses: PropTypes.object,
  children: PropTypes.node,
};
