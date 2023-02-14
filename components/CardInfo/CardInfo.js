import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Danger from "components/Typography/Danger.js";
import Success from "components/Typography/Success.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import useWindowSize from "components/Hooks/useWindowSize.js";

import styles from "assets/jss/natcash/components/cardInfoStyle.js";
export default function CardInfo(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const size = useWindowSize();
  if(props.cardOrder){
    return (
      <GridItem
        xs={12}
        sm={6}
        md={3}
        style={{ minWidth: `${size.width < 541 ? "75%" : "unset"}` }}
      >
        <Card style={{ margin: `${size.width <= 1510 ? "10px 0" : "30px 0"}` }}>
          {size.width > 1510 && (
            <CardHeader color="info" stats icon style={{textAlign: "left"}}>
              <p className={classes.cardCategory}>{props.title}</p>
              <h3 className={classes.cardTitle}>
                <small>{props.subContent}</small> {props.content}
              </h3>
            </CardHeader>
          )}
          {size.width <= 1510 && (
            <CardHeader color="info" stats icon style={{ textAlign: "left" }}>
              <p
                className={classes.cardCategory}
                style={{ fontSize: `${size.width <= 1110 ? "12px" : "14px"}` }}
              >
                {props.title}
              </p>
              <h3
                className={classes.cardTitle}
                style={{ fontSize: `${size.width <= 1110 ? "20px" : "1.825em"}` }}
              >
                <small>{props.subContent}</small> {props.content}
              </h3>
            </CardHeader>
          )}
        </Card>
      </GridItem>
    );
  }
  else {
    return (
      <GridItem
        xs={12}
        sm={6}
        md={3}
        style={{ minWidth: `${size.width < 541 ? "75%" : "unset"}` }}
      >
        <Card style={{ margin: `${size.width <= 1510 ? "10px 0" : "30px 0"}` }}>
          {size.width > 1510 && (
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>{props.title}</p>
              <h3 className={classes.cardTitle}>
                <small>{props.subContent}</small> {props.content}
              </h3>
            </CardHeader>
          )}
          {size.width <= 1510 && (
            <CardHeader color="info" stats icon style={{ textAlign: "left" }}>
              <p
                className={classes.cardCategory}
                style={{ fontSize: `${size.width <= 1110 ? "12px" : "14px"}` }}
              >
                {props.title}
              </p>
              <h3
                className={classes.cardTitle}
                style={{ fontSize: `${size.width <= 1110 ? "20px" : "1.825em"}` }}
              >
                <small>{props.subContent}</small> {props.content}
              </h3>
            </CardHeader>
          )}
          <CardFooter stats>
            <div className={classes.stats}>
              <Success>
                <Warning />
              </Success>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                {props.pablo}
              </a>
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    );
  }
}
