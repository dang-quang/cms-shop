import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import styles from "assets/jss/natcash/components/formStyle.js";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

function Form(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { className, children, plain, profile, chart, ...rest } = props;
  const formClasses = classNames({
    [classes.container]: true,
    [className]: className !== undefined,
  });
  return <div className={formClasses}>{children}</div>;
}

export default Form;
