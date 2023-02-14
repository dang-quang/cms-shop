import React from "react";
import { useSelector } from "react-redux";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Tooltip from "@material-ui/core/Tooltip";
import { Icon } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/natcash/components/formGroupCustomStyle.js";

export default function FormGroupCustom(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { children, ...rest } = props;
  const language = useSelector((state) => state.app.language);

  return (
    <>
      <div className={classes.flex_end}>
        <div>
          <p className={classes.titleFormGroup}>{props.title}</p>
          <p className={classes.subTitleFormGroup}>{props.subTitle}</p>
          <p className={classes.subTitleFormGroup}>{props.subTitle_2}</p>
        </div>
        <div>
        {props.hasButton == true && (
          <Button color="primary" onClick={props.onClick}>
            {props.btnTitle}
          </Button>
        )}
        </div>
      </div>
      {children}
    </>
  );
}
FormGroupCustom.propTypes = {
  children: PropTypes.node,
};
