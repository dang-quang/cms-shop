import React from 'react';
import { useSelector } from 'react-redux';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Tooltip from '@material-ui/core/Tooltip';
import { Icon } from '@material-ui/core';

import styles from 'assets/jss/natcash/components/formCellCustomStyle.js';

export default function FormCellCustom(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { children, gridLable, gridChildren, error, ...rest } = props;
  const language = useSelector((state) => state.app.language);

  return (
    <div className={classes.formCellContainer}>
      <GridContainer>
        <GridItem xs={gridLable || 3} sm={gridLable || 3} md={gridLable || 3}>
          <p className={classes.text + ' ' + classes.infoTextPrimary + ' ' + classes.labelCell}>
            {props.label}
          </p>
        </GridItem>
        <GridItem xs={gridChildren || 9} sm={gridChildren || 9} md={gridChildren || 9}>
          {children}
          <span style={{ color: error && 'red' }} className={classes.helperTextCustom}>
            {props.helperText}
          </span>
        </GridItem>
      </GridContainer>
    </div>
  );
}
FormCellCustom.propTypes = {
  children: PropTypes.node,
};
