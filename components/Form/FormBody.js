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

function FormBody(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { className, children, plain, profile, chart, ...rest } = props;
  return <div className={classes.formBody}>{children}</div>;
}

export default FormBody;
