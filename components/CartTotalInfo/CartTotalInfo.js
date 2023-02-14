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

import styles from "assets/jss/natcash/components/cartTotalInfoStyle.js";

export default function CartTotalInfo(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { ...rest } = props;
  const language = useSelector((state) => state.app.language);

  return (
    <Card>
    {props.title.length > 0 || props.subTitle.length > 0 ? (
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{props.title}</h4>
        <p className={classes.cardCategoryWhite}>{props.subTitle}</p>
      </CardHeader>
    ) : null}
      <CardBody className={classes.cardBody}>
        <GridContainer>
          {props.listValue.map((item, index) => {
            return (
              <GridItem xs={props.xs} sm={props.sm} md={props.md} key={item.title}>
                <div className={index < props.column - 1 ? classes.borderRight : null} style={{height: "100%", display:"flex", flexDirection: "column", justifyContent:"space-between"}}>
                  <div className={classes.itemTitleContainer}>
                    <p className={classes.itemTitle}>{item.title}</p>
                    <Tooltip title={item.tooltip} placement="right-start">
                      <Icon className={classes.icon}>help_outline</Icon>
                    </Tooltip>
                  </div>
                  <span className={classes.itemValue}>{item.value}</span>
                  <p className={classes.itemCompare}>
                    {props.compareText}
                    <span
                      className={
                        item.type == "up"
                          ? classes.itemCompareValue_up
                          : classes.itemCompareValue_down
                      }
                    >
                      {item.compareValue}
                    </span>
                    {item.compareValue?.length > 0 ? (
                    <Icon
                      className={
                        item.type == "up"
                          ? classes.icon_success
                          : classes.icon_warning
                      }
                    >
                      {item.type == "up" ? "arrow_upward" : "arrow_downward"}
                    </Icon>
                    ):null}
                  </p>
                </div>
              </GridItem>
            );
          })}
        </GridContainer>
      </CardBody>
    </Card>
  );
}
