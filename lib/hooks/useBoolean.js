import React from 'react';

/**
 * React hook to manage boolean (on - off) states
 *
 * @param initialState the initial boolean state value
 */

const useBoolean = (initialState = false) => {
  const [value, setValue] = React.useState < boolean > initialState;

  const on = React.useCallback(() => {
    setValue(true);
  }, []);

  const off = React.useCallback(() => {
    setValue(false);
  }, []);

  const toggle = React.useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, { on, off, toggle }];
};

export default useBoolean;
