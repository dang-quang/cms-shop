import React, { useState } from "react";
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
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";

import styles from "assets/jss/natcash/components/modalCustomStyle.js";

export default function ModalCustom(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { children, isShow, handleClose, className, ...rest } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classNames(classes.modal, className)}
      open={isShow}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isShow}>
        <Card
          className={classes.modalContainer}
          style={{
            width: props.width + "px",
            maxWidth: props.maxWidth + "px",
          }}
        >
          <CardHeader color="primary" className={classes.flex_between}>
            <div>
              <h4 className={classes.cardTitleWhite}>{props.title}</h4>
              <p className={classes.cardCategoryWhite}>{props.subTitle}</p>
            </div>
            <Icon className={classes.btnClose} onClick={handleClose}>
              close
            </Icon>
          </CardHeader>
          <CardBody>{children}</CardBody>
        </Card>
      </Fade>
    </Modal>
  );
}
