import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import React from 'react';
import styles from './style';

function Dropdown({
  title,
  handleOnChange,
  options,
  defaultValue,
  value,
  helperErrorText,
  onFocus,
  disabled,
}) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <FormControl
      error={helperErrorText}
      variant="outlined"
      size="small"
      className={classes.form_control}>
      <InputLabel className={classes.input_label}>{title}</InputLabel>
      <Select
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={handleOnChange}
        onFocus={onFocus}>
        {options?.map((item, index) => (
          <MenuItem value={item.value} key={index}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      {helperErrorText && (
        <FormHelperText style={{ color: 'red' }}>{helperErrorText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default Dropdown;
