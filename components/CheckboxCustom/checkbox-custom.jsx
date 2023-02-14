import { Checkbox, makeStyles } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import styles from "assets/jss/natcash/checkboxAdnRadioStyle.js";
import classNames from "classnames";
import React from "react";

export default function CheckboxCustom({
  checked,
  handleToggle,
  lable,
  classNameContainer,
  ...rest
}) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <div className={classNames(classes.checkboxContainer, classNameContainer)}>
      <label className={classes.lable}>
        <Checkbox
          checked={checked}
          checkedIcon={<Check className={classes.checkedIcon} />}
          icon={<Check className={classes.uncheckedIcon} />}
          classes={{
            checked: classes.checked,
            root: classes.root,
          }}
          handleToggle
          className={classes.checkbox}
          {...rest}
        />
        {lable}
      </label>
    </div>
  );
}
