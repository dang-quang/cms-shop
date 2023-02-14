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

import styles from "assets/jss/natcash/components/cartTotalInfoStyle2.js";

export default function CartTotalInfo2(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { ...rest } = props;
  const language = useSelector((state) => state.app.language);

  return (
    <Card style={{ marginBottom: "60px" }}>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{props.title}</h4>
        <p className={classes.cardCategoryWhite}>{props.subTitle}</p>
      </CardHeader>
      <CardBody className={classes.cardBody}>
        <GridContainer>
          <GridItem xs={4} sm={4} md={4}>
            {props.listValue[0].title.map((item, index) => {
              return (
                <p className={classes.infoTitle} key={item}>
                  {item}
                  {props.listValue[0].value.map((item2, index2) => {
                    if (index == index2)
                      return (
                        <span className={classes.infoValue} key={item2}>
                          {item2}
                        </span>
                      );
                  })}
                </p>
              );
            })}
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            {props.listValue[1].title.map((item, index) => {
              return (
                <p className={classes.infoTitle} key={item}>
                  {item}
                  {props.listValue[1].value.map((item2, index2) => {
                    if (index == index2)
                      return (
                        <span className={classes.infoValue} key={item2}>
                          {item2}
                        </span>
                      );
                  })}
                </p>
              );
            })}
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            {props.listValue[2].title.map((item, index) => {
              return (
                <p className={classes.infoTitle} key={item}>
                  {item}
                  {props.listValue[2].value.map((item2, index2) => {
                    if (index == index2)
                      return (
                        <span className={classes.infoValue} key={item2}>
                          {item2}
                        </span>
                      );
                  })}
                </p>
              );
            })}
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
}
